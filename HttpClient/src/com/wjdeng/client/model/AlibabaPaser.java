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
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.SysUtils;

public class AlibabaPaser implements IPaser{

	@Override
	public Map<String, String> execuPaseInforPage(Document doc) {
		Map<String, String> contentmap = new HashMap<String, String>();
		List<Element> list =doc.getAllElementsByClass("tables data");
		//List<Element> list =doc.getAllElementsByClass("mainNavigat");
		for(Element el :list){
			List<Element> trs =el.getAllElements("tr");
			//listtem.get(5).getAttributeValue("href");
			for(Element tr :trs){
				List<Element> ths =  tr.getAllElements("th");
				if(ths.isEmpty())continue;
				String key = ths.get(0).getContent().toString();
				if(key!=null && key.indexOf("AliExpress.com Store:")>-1)continue;
				String content = "";
				try {
					if("Contact Person:".equals(key)){
						//tr.getAllElements("td").get(1).getAllElementsByClass("contactName").get("0");Website:
						String reg = "(http://)?+([\\w-]+\\.)+[\\w-]+(userbehavior/contactPersonUpdate.htm)+(/[\\w-]*)?";
						Pattern pa = Pattern.compile(reg);
						content = tr.getAllElementsByClass("contactName").get(0).getAllElements("a").get(0).getContent().toString();
						//System.out.println(content);
						//content = tr.getAllElements("td").get(0).getAllElements("a").get(0).getContent().toString();
					}else if("Website:".equals(key)){
						content = tr.getAllElements("td").get(0).getAllElements("a").get(0).getContent().toString();
					}else{
						
						content =tr.getAllElements("td").get(0).getContent().toString();
					}
				} catch (IndexOutOfBoundsException e) {
					System.out.print(key+":获取内容失败");
					//e.printStackTrace();
					continue;
				}
				contentmap.put(key, content);
			}
			
		}
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			LogUtil.getLogger(this.getClass().getSimpleName()).warn(e);
		}
		return contentmap;
	}

	@Override
	public String getNextPageUrl(Document doc) {
		Element ele = doc.getFirstElementByClass("nextPage");
		if(null != ele){
			String next= ele.getAttributeValue("href");
			//System.out.println("alibaba nex..........."+next);
			return next;
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc) {
		Pattern pa = Pattern.compile("itemBox *"); 
		Set<String> vurl = new HashSet<String>();
		Iterator<Element> it =doc.getAllElementsByClass("itemBox").iterator();//doc.getAllElements("class", pa).iterator();
		while(it.hasNext()){
			Element ele =it.next();
			//pa = Pattern.compile("^[javaScript:*]");
			String str = "(http(s)?://)?+([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";
			pa = Pattern.compile(str);
			List<Element> elist = ele.getAllElements("href", pa);
			for(Element tele : elist){
				String href = tele.getAttributeValue("href");
				href = SysUtils.getUrlroot(href);
				href+="/contactinfo.html";
				vurl.add(href);
				//System.out.println(href);
			}
		}
		return vurl;
	}
	
	public static void main(String[] s){
		//String str= "(([http://]+[www.])+([*^.]+[.]+[*^.]+[/])){3,200}";
		/*String str = "([\\w-])?+(userbehavior)+([\\w-])?";
		//[*b*]";
		Pattern pa = Pattern.compile(str); 
		//pa.matcher("").replaceFirst("");
		//pa.
		System.out.println(
				pa.matcher("http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D")
				.find()
				//.matches()
				);*/
		
		String str="http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		String regEx="userbehavior";
		boolean result=Pattern.compile(regEx).matcher(str).find();
		System.out.println(result);
		
	}

}

