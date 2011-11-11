/******************************************************************************** 
 * Create Author   : wjdeng
 * Create Date     : Dec 28, 2010
 * File Name       : SystemMessgeServicesImpl.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.apache.log4j.Logger;

import com.wjdeng.SystemMessgeServices;
import com.wjdeng.model.SystemMsgDataEntity;
import com.wjdeng.model.User;

/**
 * 
 * 系统消息管理及消息发送Services实现类。<br>
 * 当浏览器打开一个引入了/js/common/SysMSGUtil.js的页面时，该页面就会被服务器自动推送消息。(目前系统统一在/WEB-INF/jsps/common/bottom.jsp页面引入了SysMSGUtil.js文件)<br>
 * 消息处理机制会步骤如下：<br>
 * 1.浏览器会发送一个长连接请求从服务器(即此类的propmtMSG方法)，等待服务的即时消息送达。<br>
 * 2.服务器会为每一个打开的窗口或标签页面维护一个消息阻塞队列，服务将不间断的从阻塞队列中获取消息推送到浏览器。<br>
 * 3.浏览器打开的每一个窗口或标签页都是一个单独的客户端(以下都称为:客户端),他们有单独的clientKey，<br>
 * 4.并且服务器会及时清理废弃的客户端阻塞队列。<br>
 * 5.浏览器关闭一个页面此页面的客户端将被废弃，或者点击链接进入一个新的页面服务器会为新页面建立一个新的客户端，原有的客户端被废弃。
 * 废弃的客户端所占用服务器资源会在30秒后清理。<br>
 *
 *
 * 注:此类在spring中不需要也不能配置事务,否则存在事务超时的缺陷
 * @author wjdeng
 * 
 * @version 1.0
 * @since Apex OssWorks 5.5
 */
public class SystemMessgeServicesImpl implements SystemMessgeServices {
    
    	private Logger logger = Logger.getLogger(SystemMessgeServicesImpl.class);
	
	
	/**
	 * 每个用户对应当前登录的session集合,一个用户可以多出登录则一个用户对应多个session<br>
	 * 以用户id为key,以该用户所有已经登录的sessionId集合为value
	 */
	private static final Map<Long,Set<String>> session_user = new ConcurrentHashMap<Long,Set<String>>();
	
	/**
	 * 每个session对应的消息集合,以sessionId为key,以消息id列表为value <br>
	 * map结构描述<br>
	 * Map( key:	sessionId ,  <br>
	 * 		value:  Map( 	key:	clientKey  , <br>
	 * 						value:	BlockingQueue(SystemMsgDataEntity) <br>
	 * 					)<br>
	 * 		) ;<br>
	 * 
	 */
	private static final Map<String,Map<String,BlockingQueue<SystemMsgDataEntity>>> session_client = new ConcurrentHashMap<String,Map<String,BlockingQueue<SystemMsgDataEntity>>>();
	
	/**
	 * 已经进入等待状态的客户端
	 */
	private static final Map<String,String> waitMsgSet = new ConcurrentHashMap<String,String>();
	
	/**
	 * 失效的客户端集合,便于收集与销毁废弃的客户端
	 * Map( key: 	clientKey,<br>
	 * 		value:	[sessionId,time])
	 */
	private static final Map<String,String[]> disable_client = new  ConcurrentHashMap<String,String[]>();
	
	
	private static boolean Init = false;
	
	/**
	 * 
	 * 判断客户端是否需要销毁,如果需要则进行销毁
	 * @param clientKey
	 */
	private boolean isDestroyClient(String clientKey,String sessionId){
		//clientKey = StringUtils.trimToNull(clientKey);
		if(clientKey == null){
			return false;
		}
		String[] info = disable_client.get(clientKey);
		if(null != info){
			long time  = Long.valueOf(info[1]);
			//该客户端在销毁队列中存在时间超过30秒 认为该客户端已经无效了 销毁该客户端
			if(System.currentTimeMillis() - time >30000){
				this.unDestroyClient(clientKey);
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 
	 * 将客户端从待销毁列表中移除
	 * @param clientKey
	 */
	private void unDestroyClient(String clientKey){
		//clientKey = StringUtils.trimToNull(clientKey);
		if(clientKey!=null){
			disable_client.remove(clientKey);
		}
	}
	
	
	@Override
	public Long sendMsg(SystemMsgDataEntity msg) {
		if(msg!=null){
			
			if(msg.getReceiver()!=null){
				//1.消息的接收人
				Long userId  = msg.getReceiver().getId();
				if(userId!=null){
					//2.使用该用户登录的所有session
					Set<String> sessions = session_user.get(userId);
					if(sessions==null)return null;
					Iterator<String> it  = sessions.iterator();
					while(it.hasNext()){
						String sessionId = it.next();
						try {
							Map<String,BlockingQueue<SystemMsgDataEntity>>  allClient= session_client.get(sessionId);
							if(null == allClient){
								it.remove();
								continue;
							}
							//3.为所有的session的所打开的所有页面都发送消息
							for(java.util.Map.Entry<String, BlockingQueue<SystemMsgDataEntity>> entry: allClient.entrySet()){
								BlockingQueue<SystemMsgDataEntity>  bq = entry.getValue();
								this.desMsg(msg);
								bq.put(msg);
							}
							//此处打印的数目比实际的客户端要多.这是由于由于失效的客户端在30秒钟后才被清理.在正常情况下比实际情况多出一个是正常的
							System.out.println("为用户session为:"+sessionId+"的"+allClient.size()+"个客户端发送消息成功.......");
						} catch (InterruptedException e) {
						    logger.error(e.getMessage());
						    logger.error("为id为:"+msg.getReceiver().getId()+"的用户发送 消息失败! 标题:"+msg.getTitle()+"  内容:"+msg.getMemo());
						}
					}
				}
				return null;
			}
		}
		return null;
	}

	
	/**
	 * 
	 * 初始化每个用户的sesion集合 及每个session所打开的页面
	 * @param user
	 * @param sessionId
	 */
	private String initMsgSet(User user,String sessionId,String clientKey){
		if(null ==clientKey){
			clientKey =System.currentTimeMillis()+"_"+Math.random();
		}
		Map<String,BlockingQueue<SystemMsgDataEntity>> msgMap = session_client.get(sessionId);
		if(msgMap==null){
			//1.该用户没有登录过,初始化消息集合
			msgMap = new HashMap<String, BlockingQueue<SystemMsgDataEntity>>();
		}
		//2.当前用户一个session所拥有的客户端集合.
		session_client.put(sessionId, msgMap);
		BlockingQueue<SystemMsgDataEntity> msgs = msgMap.get(clientKey);
		if(msgs==null){
			msgs = new LinkedBlockingQueue<SystemMsgDataEntity>();
		}
		msgMap.put(clientKey, msgs);
		//3.当前用户的所有session集合
		Set<String> sessionSet = session_user.get(user.getId());
		if(sessionSet ==null){
			//4. 该用户第一次登录
			sessionSet = new ConcurrentSkipListSet<String>();
			session_user.put(user.getId(), sessionSet);
		}
		sessionSet.add(sessionId);//将当前sessionId添加到使用当前用户登录的所有session集合中
		return clientKey;
	}
	
	/**
	 * 销毁已经退出的sessionId
	 */
	public  void destoryedMsgSet(String sessionId){
		Map<String,BlockingQueue<SystemMsgDataEntity>>  allClient= session_client.get(sessionId);
		for(java.util.Map.Entry<String, BlockingQueue<SystemMsgDataEntity>> entry: allClient.entrySet()){
			String key = entry.getKey();
			BlockingQueue<SystemMsgDataEntity>  bq = entry.getValue();
			//发送一条废弃的消息,通知目前等待作废,是浏览器重新发起获取消息请求来等待消息的送达.
			try {
				bq.put((new SystemMsgDataEntity()).setDisable(true).setClientKey(key));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		session_client.remove(sessionId);
		waitMsgSet.remove(sessionId);
	}
	
	/**
	 * 查找需要销毁的客户端并进行销毁<br>
	 * 当前sessionId的客户端可能存在正在等待消息的线程,当对应的页面关闭或离开后此线程已经是无效的线程,给这个线程发送一条废弃的消息,使此线程停止等待消息运行到结束
	 * @param sessionId
	 * @param clientKey
	 */
	private void findDisabledClientAndDestory(String sessionId,String clientKey){
	    Map<String,BlockingQueue<SystemMsgDataEntity>>  allClient= session_client.get(sessionId);
		if(allClient!=null){
			//遍历该session用户下的所有客户端
			Iterator<Entry<String, BlockingQueue<SystemMsgDataEntity>>>  it  = allClient.entrySet().iterator();
			//System.out.println(sessionId+"..................共有客户端:"+allClient.size());
			while(it.hasNext()){
				java.util.Map.Entry<String, BlockingQueue<SystemMsgDataEntity>> entry = it.next();
				String key = entry.getKey();
				if(key.equals(clientKey))continue;//当前请求页面,不作处理
				BlockingQueue<SystemMsgDataEntity>  bq = entry.getValue();
				try {
    				    	//发送一条废弃的消息,通知目前等待作废,是浏览器重新发起获取消息请求来等待消息的送达.
					bq.put((new SystemMsgDataEntity()).setDisable(true).setClientKey(key));
					//销毁客户端,页面响应时间超过30秒 
					if(this.isDestroyClient(key, sessionId)){
						it.remove();
					}
				} catch (InterruptedException e) {
				    this.logger.error(e.getMessage());
				    this.logger.error("销毁无用的客户端发生异常.");
				}
			}
		}
	}
	



	
	/**
	 * (消息机制说明:<br>
	 * 当用户打开一个页面或者打开一个新的tab页,<br>
	 * 页面都会发送一个请求到服务器端获取消息,<br>
	 * 服务器则会有一个线程一直等待有消息的送达然后发送给客户端页面。<br>
	 * 如果用户离开这些页面,这些等待的线程就废弃掉了，这些废弃的线程称为废弃的页面。服务器需要处理掉这些等待的线程,减少垃圾占用。)
	 * 获得当前请求用户的消息集合页面
	 * @param user 请求用户
	 * @param sessionId 当前用户的sessionId
	 * @param clientKey 当前seseion所打开的页面键
	 * @param keepConnect 服务器端用来判断是否需要执行探测当前session所打开的所有其它页面是否有效的操作
	 * @return  Map  key: 
	 */
	@Override
	public  List<SystemMsgDataEntity> propmtMSG(User user,String sessionId ,String clientKey,String keepConnect) {
		if(user==null)return null;
		//if(null == StringUtils.trimToNull(sessionId))return null;
		List<SystemMsgDataEntity> mslist =this.getInitMsgList(clientKey);
		//1.处理当前session所有已经废弃的页面---
		if(!"keepConnect".equals(keepConnect) && null!=waitMsgSet.get(sessionId)){
		    //当前sessionId的客户端可能存在正在等待消息的线程,当对应的页面关闭或离开后此线程已经是无效的线程,给这个线程发送一条废弃的消息,使此线程停止等待消息运行到结束
		    this.findDisabledClientAndDestory(sessionId, clientKey);
		}
		//2.获取当前sessionId的客户端 所有的page页面  (key:客户端key ,value:消息队列)
		Map<String,BlockingQueue<SystemMsgDataEntity>> clients  =session_client.get(sessionId);
		//3.处理消息的发送---
		//当该sessionId客户端第一次访问或者该sessionId的客户端打开一个新页面
		if(null == clients || (clients!=null && clients.get(clientKey)==null)){
			//为该页面初始化消息存储对象
			clientKey = this.initMsgSet(user, sessionId,clientKey);
			//给客户端推送一条废弃的消息并且指定clientKey,要求客户端以clientKey重新发起消息请求.
			mslist.add(this.getDisableMsgEntity(clientKey));
			return operationReturnMsgList(mslist,clientKey,sessionId);
		}else{//该页面不是第一次访问
		    	try {
			    BlockingQueue<SystemMsgDataEntity> msgs = clients.get(clientKey);
			    if(msgs.size()>0){//消息集合中已经有未传送到客户端的消息
				//取消该sessionId的客户端已经废弃的消息等待列队
				Iterator<SystemMsgDataEntity> it = msgs.iterator();
				while(it.hasNext()){
					SystemMsgDataEntity msg = it.next();
					if(msg!=null &&msg.getDisable()!=null && !msg.getDisable()) {
					    	mslist.add(msg);
						this.desMsg(msg);
					}
					it.remove();
				}
			    }
			    if(mslist.size()>0)return operationReturnMsgList(mslist,clientKey,sessionId);;
			    //消息集合中没有有消息,等待消息的送达
			    waitMsgSet.put(sessionId,Long.valueOf(System.currentTimeMillis()).toString());//等待消息的客户端
			    //消息集合中的消息为空,等待消息的送达.
			    SystemMsgDataEntity fmsg = msgs.take();//等待消息的送达。推送机制的核心在这里............
			    waitMsgSet.remove(sessionId);//该客户端已经获取到消息,取消等待
			    if(fmsg.getDisable()!=null && fmsg.getDisable()){
				mslist.add(fmsg);
				return operationReturnMsgList(mslist,clientKey,sessionId);
			    }
			    mslist.add(fmsg);
			    Iterator<SystemMsgDataEntity> it = msgs.iterator();
			    while(it.hasNext()){
				mslist.add(it.next());
				it.remove();
			    }
			} catch (InterruptedException e) {
			    logger.error("推送消息异常:"+user.getName()+" ... "+user.getId());
			    logger.error(e.getMessage());
			   //发生错误给客户端推送一条废弃的消息并且指定clientKey,要求客户端以clientKey重新发起消息请求.
			    mslist.add(this.getDisableMsgEntity(clientKey));
			}
		}
		System.out.println(mslist.size()+"..............................");
		return operationReturnMsgList(mslist,clientKey,sessionId);//获取消息完毕
	}
	
	/***
	 * 
	 * 返回客户端消息列表
	 * @return
	 */
	private List<SystemMsgDataEntity> getInitMsgList(String clientKey){
	    //将客户端从待销毁列表中移除
	    unDestroyClient(clientKey);
	    return new ArrayList<SystemMsgDataEntity>();
	}
	
	/**
	 * 
	 * 返回消息列表前进行相关处理
	 * @param mslist
	 * @param clientKey
	 * @return
	 */
	private List<SystemMsgDataEntity> operationReturnMsgList(List<SystemMsgDataEntity> mslist,String clientKey,String sessionId){
	    //将该客户端加入待销毁列表
	    disable_client.put(clientKey, new String[]{sessionId,System.currentTimeMillis()+""});
	    return mslist;
	}
	
	/**
	 * 
	 * 给客户端构造一条废弃的消息并且指定clientKey,要求客户端以clientKey重新发起消息请求.
	 * @param clientKey
	 * @return
	 */
	private SystemMsgDataEntity getDisableMsgEntity(String clientKey){
	    SystemMsgDataEntity fmsg = new SystemMsgDataEntity();
	    //给客户端推送一条废弃的消息并且指定clientKey,要求客户端以clientKey重新发起消息请求.
	    fmsg.setDisable(true).setClientKey(clientKey);
	    return fmsg;
	}

	
	/**
	 * 
	 * 清理发送给客户端的消息实体,无用的引用信息不发送给客户端.
	 * @param msg
	 */
	private void  desMsg(SystemMsgDataEntity msg){
		if(null !=msg){
			User reuser  = msg.getReceiver();
			if(reuser!=null){
				User tru = new User();
				tru.setId(reuser.getId());
				tru.setRealName(reuser.getRealName());
				tru.setName(reuser.getName());
				msg.setReceiver(tru);
				
			}
			
			User ceuser  = msg.getCreateUser();
			if(ceuser!=null){
				User tcu = new User();
				tcu.setId(ceuser.getId());
				tcu.setRealName(ceuser.getRealName());
				tcu.setName(ceuser.getName());
				msg.setCreateUser(tcu);
			}
		}
	}
	
	
	public void init(){
	    Lock lock = new ReentrantLock();
	    lock.lock();
	    if(!Init){
            	    Init = true;
            	    Thread th  = new Thread(new Runnable(){
            		@Override
            		public void run() {
            			try {
            			    Thread.sleep(600000L);//10分钟轮询 要求等待时间过长的页面重新发送等待请求
            			    for(Entry<String, String[]>  entry :disable_client.entrySet()){
            				String clientKey = entry.getKey();
            				String[] info = entry.getValue();
            				long time  = Long.valueOf(info[1]);
            				String sessionId  = info[0];
            				if(System.currentTimeMillis() - time >30000L){//响应时间超过30秒销毁该请求页面
            				    session_client.get(sessionId).remove(clientKey);
            				}
            				/*if(session_client.get(sessionId).size()==0){
            				    session_client.remove(sessionId);
            				    waitMsgSet.remove(sessionId);
            				}*/
            			    }
            			    for(String sessionId :waitMsgSet.keySet()){
            				 Map<String,BlockingQueue<SystemMsgDataEntity>>  allClient= session_client.get(sessionId);
            				if(allClient!=null){
            					//遍历该session用户下的所有客户端
            					Iterator<Entry<String, BlockingQueue<SystemMsgDataEntity>>>  it  = allClient.entrySet().iterator();
            					while(it.hasNext()){
            						java.util.Map.Entry<String, BlockingQueue<SystemMsgDataEntity>> entry = it.next();
            						String key = entry.getKey();
            						BlockingQueue<SystemMsgDataEntity>  bq = entry.getValue();
            						try {
            		    				    	//发送一条废弃的消息,通知目前等待作废,是浏览器重新发起获取消息请求来等待消息的送达.
            							bq.put((new SystemMsgDataEntity()).setDisable(true).setClientKey(key));
            						} catch (InterruptedException e) {
            						    logger.error(e.getMessage());
            						    logger.error("销毁无用的客户端发生异常.");
            						}
            					}
            				}
            				
            			    }
            			    
            			} catch (InterruptedException e) {
            			    e.printStackTrace();
            			}
            		}});
            	    th.start();
	    }
	    lock.unlock();
	    
	}

	
	


}

