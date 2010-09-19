/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 27, 2010
 * File Name       : DefaultPaserImp.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.http.client.ClientProtocolException;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.Ipaser.IPaser;
import com.wjdeng.client.model.Ipaser.IpaserAdapter;
import com.wjdeng.client.util.StringKeyMsg;
import com.wjdeng.client.util.StringUtils;

public class DefaultPaserAdapter implements IPaser,IpaserAdapter {
	
	private IPaser paser;
	
	private String nextUrl;
	
	private Document doc;
	
	private ModeParament par ;
	
	private AppContext appContext;
	
	private Set<String> keySet = new HashSet<String>();

	public DefaultPaserAdapter(String url) {
		doc=appContext.getHtmlDocByUrl(url);
	}
	
	
	public DefaultPaserAdapter(Document doc,IPaser paser,AppContext app ){
		this.doc=doc;
		this.paser = paser;
		this.appContext =app;
		this.par = app.getModeParament();
	}
	
	@Override
	public Map<String, String> execuPaseInforPage(Document doc) {
		Map<String, String> dmap = this.paser.execuPaseInforPage(doc);
		Map<String, String> rmap = new HashMap<String, String>();
		String cn = dmap.get(StringKeyMsg.getMsgByKey(StringKeyMsg.complanyKey+par.getModeName()));
		if(keySet.contains(StringUtils.trim2empty(cn))){
			return null;
		}else{
			keySet.add(cn);
		}
		for(String key: dmap.keySet()){
			String tem  = StringKeyMsg.getMsgByKey(par.getModeName()+"."+key);
			rmap.put(tem, dmap.get(key));
		}
		return rmap;
	}

	@Override
	public String getNextPageUrl(Document doc) {
		nextUrl = this.paser.getNextPageUrl(doc);
		//this.par.setCurPage(par.getCurPage()+1);
		return nextUrl;
	}

	@Override
	public Set<String> getPageListUrl(Document doc) {
		return this.paser.getPageListUrl(doc);
	}

	@Override
	public boolean hasNext() {
		String url = getNextPageUrl(this.doc);
		if("".equals(url)){
			par.setCurPage(par.getDeep());
			return false;
		}else{
			nextUrl = url;
			return true;
		}
	}

	@Override
	public Document nextUrl() throws ClientProtocolException, IOException {
		if(null == nextUrl)getNextPageUrl(doc);
		if(null == nextUrl)return null;
		this.doc=appContext.getHtmlDocByUrl(nextUrl);
		par.setCurDoc(doc);
		par.setEntranceUrl(doc.getUrl());
		//System.out.println(doc.getFirstElement().getContent().toString());
		return doc;
	}

	@Override
	public void setIpaser(IPaser paser) {
		this.paser = paser;
	}



}

