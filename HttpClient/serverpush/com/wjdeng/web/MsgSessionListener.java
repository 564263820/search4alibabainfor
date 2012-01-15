/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : May 7, 2010
 * File Name       : OssSessionListener.java
 *
 ********************************************************************************/
package com.wjdeng.web;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.wjdeng.SystemMessgeServices;


public class MsgSessionListener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent seEvent) {

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent seEvent) {
		HttpSession session =  seEvent.getSession();
		SystemMessgeServices msg = null;
		msg.destoryedMsgSet(session.getId());
		
	}

}

