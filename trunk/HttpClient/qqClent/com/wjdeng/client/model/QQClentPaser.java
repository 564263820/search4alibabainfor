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
		for (Element el : list) {
			List<Element> trs = el.getAllElements("tr");
			for (Element tr : trs) {
				List<Element> ths = tr.getAllElements("th");
				if (ths.isEmpty())
					continue;
				String key = ths.get(0).getContent().toString();
				if (key != null && key.indexOf("AliExpress.com Store:") > -1)
					continue;
				String content = "";
				try {
					if ("Contact Person:".equals(key)) {
						// tr.getAllElements("td").get(1).getAllElementsByClass("contactName").get("0");Website:
						//String reg = "(http://)?+([\\w-]+\\.)+[\\w-]+(userbehavior/contactPersonUpdate.htm)+(/[\\w-]*)?";
						//Pattern pa = Pattern.compile(reg);
						content = tr.getAllElementsByClass("contactName")
								.get(0).getAllElements("a").get(0).getContent()
								.toString();
						// System.out.println(content);
						// content =
						// tr.getAllElements("td").get(0).getAllElements("a").get(0).getContent().toString();
					} else if ("Website:".equals(key)) {
						content = tr.getAllElements("td").get(0)
								.getAllElements("a").get(0).getContent()
								.toString();
					} else {

						content = tr.getAllElements("td").get(0).getContent()
								.toString();
					}
				} catch (IndexOutOfBoundsException e) {
					System.out.print(key + ":获取内容失败");
					// e.printStackTrace();
					continue;
				}
				Map<String ,String> map =(Map<String, String>) appContext.getAttribute("searcheKeyWord");
				if(null !=map)contentmap.putAll(map);
				contentmap.put(key, content);
			}

		}
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			LogUtil.getLogger(this.getClass().getSimpleName()).warn(e);
		}
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
		if(searcheKeyWord==null){
			Element ele = doc.getFirstElementByClass("keywords");
			if(ele!=null){
				map.put("IndexKeyWord", ele.getContent().toString());
			}
			List<Element> lele = doc.getAllElementsByClass("historyItem");
			for(Element hise : lele){
				String key = hise.getFirstElementByClass("pTitle").getContent().toString();
				String content = hise.getFirstElementByClass("sIcon").getContent().toString();
				map.put(key, content);
			}
			if(map.size()>0)
			appContext.setAttribute("searcheKeyWord", map);
		}
		
		Pattern pa = Pattern.compile("itemBox *");
		Set<String> vurl = new HashSet<String>();
		Iterator<Element> it = doc.getAllElementsByClass("itemBox").iterator();// doc.getAllElements("class",
																				// pa).iterator();
		while (it.hasNext()) {
			Element ele = it.next();
			// pa = Pattern.compile("^[javaScript:*]");
			String str = "(http(s)?://)?+([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";
			pa = Pattern.compile(str);
			List<Element> elist = ele.getAllElements("href", pa);
			for (Element tele : elist) {
				String href = tele.getAttributeValue("href");
				href = SysUtils.getUrlroot(href);
				href += "/contactinfo.html";
				vurl.add(href);
				// System.out.println(href);
			}
		}
		return vurl;
	}

	public static void main(String[] s) {
		
		String str = "http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		String regEx = "userbehavior";
		boolean result = Pattern.compile(regEx).matcher(str).find();
		System.out.println(result);
		

	}

}
