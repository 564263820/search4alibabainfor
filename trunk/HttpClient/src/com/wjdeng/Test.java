/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 22, 2010
 * File Name       : Test.java
 *
 ********************************************************************************/
package com.wjdeng;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class Test {

	private String test() throws Exception {
		HttpClient client = new DefaultHttpClient();
		List<NameValuePair> nvps = new ArrayList<NameValuePair>();
		nvps.add(new BasicNameValuePair("", ""));
		HttpGet get = new HttpGet(
				"http://www.alibaba.com/trade/search?SearchText=car&Country=&CatId=100001627&IndexArea=product_en&sq=y");
		HttpResponse response = client.execute(get);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			String str = EntityUtils.toString(entity);
			System.out.println(str);
			System.out.println(EntityUtils.getContentCharSet(entity));
			return str;
		}
		return null;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Test test = new Test();
		try {

			test.test();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
