/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : ModelManager.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;


import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.Tag;


public class ModelManager {
	
	private static Map<String,ModeParament> map = null;
	
	
	private ModelManager(){
		if(map==null){
			map = new java.util.Hashtable<String,ModeParament>();
			try {
				Source source=new Source(ModelManager.class.getClassLoader().getResource("data/init.xml"));
				List<Element> elementList = source.getAllElements("model");
				for(Element el : elementList){
					source.getAllElements("url");
					String name  = el.getFirstElement("name").getContent().toString();
					String className = el.getFirstElement("class").getContent().toString();
					String url = el.getFirstElement("url").getContent().toString();
					ModeParament mp = new ModeParament(url,className,name);
					Element mdele = el.getFirstElement("method");
					if(null != mdele){
						mp.setMethod(mdele.getContent().toString());
					}
					map.put(mp.getModeName(), mp);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	public static ModeParament getModeParamByUrlString(String url){
		if(map==null){
			new ModelManager();
		}
		Set<String> keys=map.keySet();
		for(String key :keys){
			if(url.indexOf(key)>-1){
				ModeParament tem = map.get(key);
				ModeParament mode = new ModeParament(tem.getUrl(),tem.getModeclass(),tem.getModeName());
				return mode;
			}
		}
		return null;
	}

}

