/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 10, 2010
 * File Name       : InitListener.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
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
			String path = arg0.getServletContext().getInitParameter("log4jConfigLocation");
			path = this.getClass().getClassLoader().getResource("").getPath()+path;
			path =java.net.URLDecoder.decode(path,"utf-8");
			PropertyConfigurator.configure(path);
			LogUtil.getLogger(InitListener.class.getSimpleName()).info("test  log4j config");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} 
	}

}

