/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : Paser.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.client.model.Ipaser;

import java.util.Map;
import java.util.Set;

import com.wjdeng.client.model.Document;

public interface IPaser {
	
	/**
	 * 
	 * 解析需要抓取信息的页面
	 * @param doc html解析源
	 * @return
	 */
	public Map<String,String> execuPaseInforPage(Document doc);
	
	/**
	 * 
	 * 获取下一页地址
	 * @param doc
	 * @return
	 */
	public String getNextPageUrl(Document doc);
	
	/**
	 * 
	 * 获取信息页面地址列表
	 * @param doc
	 * @return
	 */
	public Set<String> getPageListUrl(Document doc);

}

