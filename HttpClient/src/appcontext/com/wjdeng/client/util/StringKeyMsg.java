/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 9, 2010
 * File Name       : StringKeyMsg.java
 *
 ********************************************************************************/
package com.wjdeng.client.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class StringKeyMsg {
	final public static String complanyKey = "CompanyName";
	private static StringKeyMsg keys ;
	private static Map<String,String> properties;

	private void buildMyProperties() throws UnsupportedEncodingException, IOException{
		String path = this.getClass().getClassLoader().getResource("data/columKey.properties").getPath();
		path = URLDecoder.decode(path, "utf-8");
		FileReader fr = new FileReader(new File(path));
		BufferedReader brf = new BufferedReader(fr);
		while(brf.ready()){
			String str = brf.readLine();
			setKeyProperties(properties, str);
		}
	}
	
	private void setKeyProperties(Map<String,String> map ,String str){
		if(null != str ){
			StringBuilder sb = new StringBuilder();
			for(int i=0 ;i<str.length();i++){
				char c = str.charAt(i);
				if(c==' '&& sb.length()==0){
					continue;
				}else if(c=='='){
					if(sb.length()>0) map.put(sb.toString(), str.substring(i+1,str.length()));
					return;
				}else if(c=='#'){
					return;
				}else{
					sb.append(c);
				}
			}
		}
	}
	
	
	private StringKeyMsg() {
		try {
			properties = new HashMap<String, String>();
			this.buildMyProperties();
		} catch (Exception e) {
			LogUtil.getLogger(this.getClass().getSimpleName()).error(e);
		}
	}

	public static String getMsgByKey(String key) {
		if(keys==null)keys= new StringKeyMsg();
		return properties.get(StringUtils.trim2empty(key));
	}
	
	public static String trimKey(String key){
		StringBuilder sb = new StringBuilder();
		for(int i=0 ;i<key.length();i++){
			char c = key.charAt(i);
			if(c==' '){
				continue;
			}else if(c==':'){
				continue;
			}else{
				sb.append(c);
			}
		}
		return sb.toString();
	}

}
