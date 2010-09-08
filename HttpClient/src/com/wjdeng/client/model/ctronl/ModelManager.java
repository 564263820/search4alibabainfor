/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : ModelManager.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;


import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;


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
				mode.setMethod(tem.getMethod());
				return mode;
			}
		}
		return null;
	}

}

