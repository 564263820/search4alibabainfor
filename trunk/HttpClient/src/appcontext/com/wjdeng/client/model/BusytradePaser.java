/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AlibabaPaser.java
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

import com.wjdeng.client.model.Ipaser.IPaser;
import com.wjdeng.client.util.SysUtils;

public class BusytradePaser implements IPaser {

	private String path = "http://www.busytrade.com";

	@Override
	public Map<String, String> execuPaseInforPage(Document doc) {
		Map<String, String> contentmap = new HashMap<String, String>();
		List<Element> list = doc.getAllElementsByClass("table_info");
		for (Element el : list) {
			List<Element> trs = el.getAllElements("tr");
			for (Element tr : trs) {
				if ("display:none".equals(tr.getAttributeValue("style"))) {
					continue;
				}
				List<Element> ths = tr.getAllElements("td");
				String key = "";
				try {
					String content = "";
					key = ths.get(0).getContent().toString();
					if ("MSN Chat".equals(key)) {
						continue;
					} else if ("Website".equals(key)) {
						content = tr.getAllElements("td").get(1)
								.getChildElements().get(0).getContent()
								.toString();
					} else {
						content = tr.getAllElements("td").get(1).getContent()
								.toString();
					}
					contentmap.put(key, content);
				} catch (IndexOutOfBoundsException e) {
					System.out.print(key + ":获取内容失败");
					// e.printStackTrace();
					continue;
				}
			}

		}
		return contentmap;
	}

	@Override
	public String getNextPageUrl(Document doc) {
		Iterator<Element> it = doc.getAllElementsByClass("width_page")
				.iterator();
		while (it.hasNext()) {
			Iterator<Element> ait = it.next().getAllElements("a").iterator();
			while (ait.hasNext()) {
				Element ele = ait.next();
				if ("Next &gt;".equals(ele.getContent().toString())) {
					return this.path + ele.getAttributeValue("href");
				}
			}
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc) {
		Iterator<Element> navit = doc.getAllElementsByClass("navbg").iterator();
		Set<String> vurl = new HashSet<String>();
		if (navit.hasNext()) {
			Element navele = navit.next();
			String nav = navele.getContent().getFirstElement().getContent()
					.toString();
			if ("Selling Leads".equals(nav) || "Products".equals(nav)) {
				Iterator<Element> it = doc.getAllElementsByClass(
						"country_name_").iterator();
				while (it.hasNext()) {
					Element ele = doc.getSource().getNextElement(
							it.next().getEnd());
					String href = ele.getFirstElement("a").getAttributeValue(
							"href");
					href = SysUtils.getUrlroot(href);
					href += "/contact_us.html";
					vurl.add(href);
				}
			} else if ("Companies".equals(nav)) {
				Iterator<Element> it = doc.getAllElementsByClass("more2")
						.iterator();
				while (it.hasNext()) {
					Element ele = it.next().getParentElement();
					String href = ele.getFirstElement("a").getAttributeValue(
							"href");
					href = SysUtils.getUrlroot(href);
					href += "/contact_us.html";
					vurl.add(href);
				}
			}
		}
		return vurl;
	}

	public static void main(String[] s) {
		// String str= "(([http://]+[www.])+([*^.]+[.]+[*^.]+[/])){3,200}";
		/*
		 * String str = "([\\w-])?+(userbehavior)+([\\w-])?"; //[*b*]"; Pattern
		 * pa = Pattern.compile(str); //pa.matcher("").replaceFirst(""); //pa.
		 * System.out.println(
		 * pa.matcher("http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D")
		 * .find() //.matches() );
		 */

		String str = "http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		String regEx = "userbehavior";
		boolean result = Pattern.compile(regEx).matcher(str).find();
		System.out.println(result);

	}

}
