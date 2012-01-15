/******************************************************************************** 
 * Create Author   : wjdeng
 * Create Date     : Dec 28, 2010
 * File Name       : SystemMessgeServices.java
 ********************************************************************************/
package com.wjdeng;

import java.util.List;
import java.util.Set;


import com.wjdeng.model.MsgDataModel;
import com.wjdeng.User;

/**
 * 
 * 系统实时消息管理及为各个在线用户发送消息Services接口
 *
 * @author Administrator
 * @version 1.0
 */
public interface SystemMessgeServices {
	
	/**
	 * 
	 * 获得当前请求用户的消息集合页面(面向页面ajax长连接请求调用)
	 * @param user 请求用户
	 * @param sessionId 当前用户的sessionId
	 * @param clientKey 当前seseion所打开的页面键
	 * @param keepConnect 服务器端用来判断是否需要,探测当前session所打开的所有其它页面是否有效
	 * @return
	 */
	public  List<MsgDataModel> propmtMSG(User user,String sessionId ,String clientKey,String keepConnect);
	
	
	/**
	 * 
	 * 添加一条消息(将此消息发送给登录用户)
	 * @param msg
	 * @param userId 用户id
	 * @return
	 */
	public void sendMsg(MsgDataModel msg,Long userId);
	
	/**
	 * 
	 * 为指定session发送消息
	 * @param msg
	 * @param sessionId
	 * @return
	 */
	public boolean sendMsg2SessionId(MsgDataModel msg, String sessionId);
	
	/**
	 * 
	 * 将此消息发送给指定的页面
	 * 
	 * @param msg
	 * @param clientKey 需要推送消息的页面列表
	 * @return 返回已经失效的客户端（断开连接）
	 */
	public List<String> sendMsg(MsgDataModel msg,List<String> clientKey);
	
	
	/**
	 * 
	 * 销毁一个客户端所有等待消息的线程及集合
	 * @param sessionId
	 */
	public void destoryedMsgSet(String sessionId);
	
	
	public Set<Long> getOnlineUsers();
	
	public Long countOnlineUser();
	
	public Long countOnlineSession();
}

