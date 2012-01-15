/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 27, 2010
 * File Name       : IDocument.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.api;

import java.io.Reader;
import java.util.List;

import com.wjdeng.imp.URLContentManage;

import net.htmlparser.jericho.Element;

public interface IDocument {
	
	/**
	 * 
	 * 根据id获取页面元素
	 * @param id
	 * @return
	 */
	public Element getElementById(String id);
	
	
	
	/**
	 * 
	 * 根据节点名称获取页面元素
	 * @param tagName
	 * @return
	 */
	public String getElementsByTagName(String tagName);
	
	/**
	 * 
	 * 执行JavaScript
	 * @param script
	 * @return
	 */
	public Object eval(String script);
	
	/**
	 * 
	 * 单独引入javascript代码片段,并编译
	 * @param scriptStr
	 */
	public void includeJavascript(String scriptStr);
	
	
	public void includeJavascript(Reader reader);
	
	/**
	 * 
	 * 获取该文档所有引入的javascript文件地址列表
	 * @return
	 */
	public List<String> getAllJavaScriptUrls();
	
	
	
}

