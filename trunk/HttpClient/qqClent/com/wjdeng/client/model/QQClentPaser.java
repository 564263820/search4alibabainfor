/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : QQClentPaser.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import net.htmlparser.jericho.Element;

import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.SysUtils;

public class QQClentPaser implements IPaser {

	@Override
	public Map<String, String> execuPaseInforPage(Document doc,AppContext appContext) {
		Map<String, String> contentmap = new HashMap<String, String>();
		List<Element> list = doc.getAllElementsByClass("tables data");
		return contentmap;
	}

	@Override
	public String getNextPageUrl(Document doc,AppContext appContext) {
		
		Element ele = doc.getFirstElementByClass("nextPage");
		if (null != ele) {
			String next = ele.getAttributeValue("href");
			// System.out.println("alibaba nex..........."+next);
			return next;
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc,AppContext appContext) {
		Map<String ,String> map = new HashMap<String, String>();
		Map<String ,String> searcheKeyWord = (Map<String ,String>) appContext.getAttribute("searcheKeyWord");
		Set<String> vurl = new HashSet<String>();
		return vurl;
	}

	public static void main(String[] s) {
		
		String str = "http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		String regEx = "userbehavior";
		boolean result = Pattern.compile(regEx).matcher(str).find();
		System.out.println(result);
		

	}

}
