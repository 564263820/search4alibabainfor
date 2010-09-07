/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 27, 2010
 * File Name       : DefaultPaserImp.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.Ipaser.imp;

import java.util.Map;
import java.util.Set;

import net.htmlparser.jericho.Source;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.Ipaser.IPaser;
import com.wjdeng.client.model.Ipaser.IpaserAdapter;
import com.wjdeng.client.model.ctronl.AppContext;

public class DefaultPaserAdapter implements IPaser,IpaserAdapter {
	
	private IPaser paser;
	
	private String nextUrl;
	
	private Document doc;

	public DefaultPaserAdapter(String url){
		doc=AppContext.getHtmlDocByUrl(url);
	}
	
	public DefaultPaserAdapter(Document doc){
		this.doc=doc;
	}
	
	@Override
	public Map<String, String> execuPaseInforPage(Document doc) {
		return this.paser.execuPaseInforPage(doc);
	}

	@Override
	public String getNextPageUrl(Document doc) {
		nextUrl = this.paser.getNextPageUrl(doc);
		return nextUrl;
	}

	@Override
	public Set<String> getPageListUrl(Document doc) {
		return this.paser.getPageListUrl(doc);
	}

	@Override
	public boolean hasNext() {
		String url = this.paser.getNextPageUrl(this.doc);
		if("".equals(url)){
			return false;
		}else{
			nextUrl = url;
			return true;
		}
	}

	@Override
	public Document nextUrl() {
		this.doc=AppContext.getHtmlDocByUrl(nextUrl);
		//System.out.println(doc.getFirstElement().getContent().toString());
		return doc;
	}

	@Override
	public void setIpaser(IPaser paser) {
		this.paser = paser;
	}



}

