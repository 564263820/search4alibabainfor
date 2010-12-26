/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 22, 2010
 * File Name       : URLContentUtils.java
 *
 *
 ********************************************************************************/
package com.wjdeng.imp;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import com.wjdeng.URLContent;
import com.wjdeng.client.model.api.IDocument;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.SysUtils;

public class URLContentManage implements URLContent {

	private HttpClient client = new DefaultHttpClient();

	public static String KEY_CONTENT = "content";
	
	public static String KEY_CONTENT_BYTES = "content_bytes";

	public static String KEY_CHARSET = "CharSet";
	
	public URLContentManage(){
		HttpParams params = new BasicHttpParams();
		params.setParameter(HTTP.USER_AGENT, "	Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.9) Gecko/20100824 Firefox/3.6.9");
		((AbstractHttpClient) client).setParams(params);
	}

	public Map<String, Object> getContentByURL(String url, boolean get)
			throws ClientProtocolException, IOException ,Exception{
		if (!get) {
			return this.getContentByURL(url);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		if(url==null)return map;
		HttpGet httget = new HttpGet(url);
		HttpResponse response;
		response = client.execute(httget);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			String conteT =response.getHeaders("Content-Type").toString();
			if(conteT.indexOf("image")>-1){
			   byte[] content =EntityUtils.toByteArray(entity);
				map.put(KEY_CONTENT_BYTES, content);
			}else{
				String content = EntityUtils.toString(entity);
				map.put(KEY_CONTENT, content);
				map.put(KEY_CONTENT_BYTES, content.getBytes());
			}
			map.put(KEY_CHARSET, EntityUtils.getContentCharSet(entity));
		}
		this.clearMuCookie();
		LogUtil.getLogger(this.getClass().getSimpleName()).warn("获取" + url + "内容成功！");
		return map;
	}
	
	private HttpGet createHttpGet(String url ){
		HttpGet httpget = new HttpGet(url);
		HttpParams params = new BasicHttpParams();
		params.setParameter("", "");
		httpget.setParams(params);
		return httpget;
	}
	
	/**
	 * 
	 * 清理混淆cooke
	 */
	private void clearMuCookie(){
		List<Cookie> list  = ((AbstractHttpClient) client).getCookieStore().getCookies();
		StringBuilder sb  = new StringBuilder();
		//((AbstractHttpClient) client).setParams(params)
		String sid = "";
		String name  ="";
		BasicCookieStore bcook = new BasicCookieStore();
		((AbstractHttpClient) client).setCookieStore(bcook);
		//((AbstractHttpClient) client).
		for(int i=0 ;i<list.size();i++){
			Cookie  cook = list.get(i);
			name  = cook.getName();
			if("JSESSIONID".equals(name)){
				if("".equals(sid)){
					sid = cook.getValue();
				}else{
					continue;
				}
			}
			bcook.addCookie(cook);
			sb.append(cook.getName()).append("=").append(cook.getValue()).append("; ");
		}
		System.out.println(sb.toString());
	}
	


	
	public Map<String, Object> getContentByURL(String url)
			throws ClientProtocolException, IOException,Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		if(url==null)return map;
		HttpClient client = new DefaultHttpClient();
		List<NameValuePair> nvps = new ArrayList<NameValuePair>();
		String urltem = this.setPairByUrl(url, nvps);
		HttpPost httpost = new HttpPost(urltem);
		HttpResponse response;
		httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
		response = client.execute(httpost);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			String conteT =response.getFirstHeader("Content-Type").toString();
			if(conteT.indexOf("image")>-1){
				byte[] content =EntityUtils.toByteArray(entity);
				map.put(KEY_CONTENT_BYTES, content);
			}else{
				String content = EntityUtils.toString(entity);
				map.put(KEY_CONTENT, content);
				map.put(KEY_CONTENT_BYTES, content.getBytes());
			}
			map.put(KEY_CHARSET, EntityUtils.getContentCharSet(entity));
		}
		clearMuCookie();
		LogUtil.getLogger(this.getClass().getSimpleName()).warn(url);
		return map;
	}

	private String setPairByUrl(String url, List<NameValuePair> list) {
		String[] sta = url.split("&");
		for (int i = 1; i < sta.length; i++) {
			String[] params = sta[i].split("=");
			String name = params[0];
			String value = "";
			if (params.length > 1)
				value = params[1];
			list.add(new BasicNameValuePair(name, value));

		}
		return sta[0];
	}

	public static void main(String[] arg) {
		java.net.URL urlt;
		try {
			String ulr = "http://ptlogin2.qq.com/check?uin=1732960362&appid=1003903&r=0.6346154530793598";
				//String ulr = "http://ptlogin2.qq.com/check?uin=dffds@qq.com&appid=1003903&r=0.3902226305408123";
			urlt = new URL(ulr );
			URLConnection  urlc = urlt.openConnection();
			urlc.connect();
			java.io.BufferedReader br = new BufferedReader(new InputStreamReader(new BufferedInputStream(urlc.getInputStream())));
			StringBuilder sb = new StringBuilder();
			while(br.ready()){
				sb.append(br.readLine());
			}
			String st = new String(sb.toString().getBytes(),"utf-8");
			System.out.println(st);
		} catch (MalformedURLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		/*
		//String s = new String(urlc.getBytes(),"utf-8");
		List<String> list = new ArrayList<String>();
		//list.add("http://www.alibaba.com/");
		list.add("http://www.163.com");
		
		list.add("http://192.168.0.126:8080/MainFrame");
		list.add("http://192.168.0.126:8080/MainFrame");
		list.add("http://192.168.0.126:8080/MainFrame");
		list.add("http://192.168.0.126:8080/MainFrame");
		list.add("http://192.168.0.126:8080/MainFrame");
		list.add("http://192.168.0.126:8080/MainFrame");
		URLContentManage um = new URLContentManage();
		for (String url : list) {
			try {
				Map<String, Object> map = um.getContentByURL(url, true);
				//Source s = new Source(map.get(KEY_CONTENT).toString());
				//Element el =s.getFirstElement("body").getFirstElementByClass("homeL");
				String s =map.get(KEY_CONTENT).toString();
				s  = new String(s.getBytes("gbk"),"gbk");
				System.out.println(s);
				//SysUtils.wirtfile(el.getTextExtractor().toString());
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}*/
	}

	@Override
	public void closeClient() {
		// TODO Auto-generated method stub
		
	}


}
