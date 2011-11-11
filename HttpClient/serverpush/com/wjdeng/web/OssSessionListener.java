/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : May 7, 2010
 * File Name       : OssSessionListener.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.web;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.wjdeng.SystemMessgeServices;


public class OssSessionListener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent seEvent) {
		// TODO Auto-generated method stub
		//javax.servlet.http.HttpServletRequestWrapper

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent seEvent) {
		HttpSession session =  seEvent.getSession();
		SystemMessgeServices msg = null;//(SystemMessgeServices) ServerBeanFactory.getBean("systemMessgeServices");
		msg.destoryedMsgSet(session.getId());
		
	}

}

