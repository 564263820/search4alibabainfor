/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 10, 2010
 * File Name       : InitListener.java
 *
 ********************************************************************************/
package com.wjdeng.web;

import java.io.File;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.PropertyConfigurator;
import org.apache.log4j.xml.DOMConfigurator;

import com.wjdeng.client.util.LogUtil;

public class InitListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {
			String path = arg0.getServletContext().getInitParameter(
					"log4jConfigLocation");
			path = this.getClass().getClassLoader().getResource("").getPath()
					+ path;
			path = java.net.URLDecoder.decode(path, "utf-8");
			PropertyConfigurator.configure(path);
			LogUtil.getLogger(InitListener.class.getSimpleName()).info(
					"test  log4j config");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

}
