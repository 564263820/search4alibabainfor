/******************************************************************************** 
 * Create Author   : wjdeng
 * Create Date     : Dec 28, 2010
 * File Name       : SystemMessgeServices.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng;

import java.util.List;


import com.wjdeng.model.SystemMsgDataEntity;
import com.wjdeng.model.User;

/**
 * 
 * 系统实时消息管理及为各个在线用户发送消息Services接口
 *
 * @author Administrator
 * @version 1.0
 * @since Apex OssWorks 5.5
 */
public interface SystemMessgeServices {
	
	/**
	 * 
	 * 获得当前请求用户的消息集合页面
	 * @param user 请求用户
	 * @param sessionId 当前用户的sessionId
	 * @param clientKey 当前seseion所打开的页面键
	 * @param keepConnect 服务器端用来判断是否需要,探测当前session所打开的所有其它页面是否有效
	 * @return
	 */
	public  List<SystemMsgDataEntity> propmtMSG(User user,String sessionId ,String clientKey,String keepConnect);
	
	
	/**
	 * 
	 * 添加一条消息(保存此条消息,并且将此消息发送给登录用户)
	 * @param msg
	 * @return
	 */
	public Long sendMsg(SystemMsgDataEntity msg);
	
	
	/**
	 * 
	 * 销毁一个客户端所有等待消息的线程及集合
	 * @param sessionId
	 */
	public void destoryedMsgSet(String sessionId);
}

