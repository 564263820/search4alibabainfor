/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : Paser.java
 *
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

