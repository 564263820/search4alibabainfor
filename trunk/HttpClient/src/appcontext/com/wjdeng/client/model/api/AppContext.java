/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 20, 2010
 * File Name       : AppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.api;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.ctronl.ModeParament;
import com.wjdeng.client.model.ctronl.event.Listener;

public interface AppContext extends Runnable{
	
	public ModeParament getModeParament();
	
	public void setAttribute(String key,Object value);
	
	public Object getAttribute(String key);

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	public void addListener4End(Listener listener) ;

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	public void addListener4AfterPaserInfor(Listener listener) ;

	/**
	 * 增加一个翻页事件
	 * 
	 * @param listener
	 */
	public void addListener4AfterNextPage(Listener listener) ;


	@SuppressWarnings("unchecked")
	public ModeParament getContent() throws ClientProtocolException, IOException ;

	/**
	 * 
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	public Document getHtmlDocByUrl(String url) ;
	
	public String getContentByUrl(String url) ;

}

