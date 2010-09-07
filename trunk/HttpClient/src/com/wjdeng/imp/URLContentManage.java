/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 22, 2010
 * File Name       : URLContentUtils.java
 *
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.imp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import com.wjdeng.URLContent;
import com.wjdeng.client.util.SysUtils;

public class URLContentManage implements URLContent {
	
	public static String KEY_CONTENT="content";
	
	public static String KEY_CHARSET="CharSet";

	public Map<String, Object> getContentByURL(String url,boolean get){
		if(!get){
			return this.getContentByURL(url);
		}
		//System.out.println(url);
		Map<String, Object> map = new HashMap<String, Object>();
		HttpClient client = new DefaultHttpClient();
		HttpGet httget = new HttpGet(url);
		HttpResponse response;
		try {
			response = client.execute(httget);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				map.put(KEY_CONTENT, EntityUtils.toString(entity));
				map.put(KEY_CHARSET, EntityUtils.getContentCharSet(entity));
			}
		} catch (ClientProtocolException e) {
			SysUtils.wirtfile(e.getMessage());
			System.out.print(e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			SysUtils.wirtfile(e.getMessage());
			System.out.print(e.getMessage());
			e.printStackTrace();
		}
		return map;
	}
	
	
	public Map<String, Object> getContentByURL(String url){
		//System.out.println(url);
		Map<String, Object> map = new HashMap<String, Object>();
		HttpClient client = new DefaultHttpClient();
		List <NameValuePair> nvps = new ArrayList <NameValuePair>();
		String urltem = this.setPairByUrl(url, nvps);
		HttpPost httpost = new HttpPost(urltem);
		HttpResponse response;
		try {
			httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
			response = client.execute(httpost);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				map.put(KEY_CONTENT, EntityUtils.toString(entity));
				map.put(KEY_CHARSET, EntityUtils.getContentCharSet(entity));
			}
		} catch (ClientProtocolException e) {
			SysUtils.wirtfile(e.getMessage());
			System.out.print(e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			SysUtils.wirtfile(e.getMessage());
			System.out.print(e.getMessage());
			e.printStackTrace();
		}
		return map;
	}
	
	
	private String  setPairByUrl(String url,List <NameValuePair> list){
		String[] sta = url.split("&");
		for(int i=1;i<sta.length;i++){
			String[] params = sta[i].split("=");
			String name = params[0];
			String value ="";
			if(params.length>1)value= params[1];
			list.add(new BasicNameValuePair(name, value));
			
		}
		return sta[0];
	}

}
