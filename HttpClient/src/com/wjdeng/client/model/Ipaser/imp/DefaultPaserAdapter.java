/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 27, 2010
 * File Name       : DefaultPaserImp.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
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

