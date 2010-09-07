package com.wjdeng.web;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 30, 2010
 * File Name       : SessionListener.java
 ********************************************************************************/

public class SessionListener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		PaserCtroLServlet.map.remove(arg0.getSession().getId());
		PaserCtroLServlet.writContentMap.remove(arg0.getSession().getId());
	}

}

