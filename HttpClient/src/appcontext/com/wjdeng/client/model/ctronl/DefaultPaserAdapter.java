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
import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.util.StringKeyMsg;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.lucene.IndexManager;
import com.wjdeng.lucene.SearchService;

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
	public Map<String, String> execuPaseInforPage(Document doc,AppContext appContext) {
		Map<String, String> dmap = this.paser.execuPaseInforPage(doc,appContext);
		if(dmap.size()==0)return dmap;
		Map<String, String> rmap = new HashMap<String, String>();
		Map<String, String> smap = new HashMap<String, String>();
		String cn = dmap.get(StringKeyMsg.getMsgByKey(StringKeyMsg.complanyKey+par.getModeName()));
		if(keySet.contains(StringUtils.trim2empty(cn))){
			return null;
		}else{
			keySet.add(cn);
		}
		for(String key: dmap.keySet()){
			String tem  = StringKeyMsg.getMsgByKey(par.getModeName()+"."+key);
			String val  = dmap.get(key);
			if("Tel".equals(tem)||"Mobile".equals(tem)){
				smap.put(tem, val);
			}
			rmap.put(tem, val);
		}
		if(smap.size()==0)return dmap;
		if(!SearchService.Instance().isExist(smap)){//索引查询该信息是否已经存在
			IndexManager.Instance().writeIndex(rmap);
			return rmap;
		}
		return rmap;
	}

	@Override
	public String getNextPageUrl(Document doc,AppContext appContext) {
		nextUrl = this.paser.getNextPageUrl(doc,appContext);
		//this.par.setCurPage(par.getCurPage()+1);
		return nextUrl;
	}

	@Override
	public Set<String> getPageListUrl(Document doc,AppContext appContext) {
		return this.paser.getPageListUrl(doc,appContext);
	}

	@Override
	public boolean hasNext() {
		String url = getNextPageUrl(this.doc,appContext);
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
		if(null == nextUrl)nextUrl = getNextPageUrl(doc,appContext);
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

