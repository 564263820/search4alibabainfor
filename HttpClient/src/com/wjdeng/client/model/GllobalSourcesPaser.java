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

public class GllobalSourcesPaser implements IPaser{
	
	private String path = "http://www.globalsources.com";
	
	@Override
	public Map<String, String> execuPaseInforPage(Document doc) {
		Map<String, String> contentmap = new HashMap<String, String>();
		
		List<Element> list  = doc.getAllElements("name", "ContactDetails", true);
		if(!list.isEmpty()){
			Element eltem =list.get(0);
			
			int start = doc.getSource().getPreviousStartTag(eltem.getContent().getBegin()).getPreviousTag().getPreviousTag().getPreviousTag().getBegin();
			Iterator<Element> it = doc.getSource().getNextElement(start).getAllElements("p").iterator();//.get(0).getTextExtractor().toString();
			//doc.getSource().getNextElement(start).getAllElements("p")
			while(it.hasNext()){
				Element ele = it.next();
				List<Element> stronglist = ele.getAllElements("strong");
				String contentStr = ele.getTextExtractor().toString();
				for(Element strele :stronglist){
					if(null == strele.getContent().getFirstElement())continue;
					String name = strele.getContent().getFirstElement().getName();
					if("b".equals(name)){
						String cname = strele.getContent().getFirstElement().getTextExtractor().toString();
						contentmap.put("Company Name:", cname);
						contentStr = contentStr.substring(contentStr.indexOf(cname)+cname.length());
						String[] carray = contentStr.split(":");
						for(int i=0 ;i<carray.length-1;i++){
							String[] key = SysUtils.splitLastStr(carray[i], " ");
							if(i==0){
								contentmap.put("Street Address:", key[0]);
							}
							if(key.length>1 && "E-mail:".equals(key[1])){
								continue;
							}
							if((i+1)<carray.length && key.length>1){
								String tem =carray[i+1];
								if((i+2)<carray.length){
									tem = SysUtils.splitLastStr(carray[i+1], " ")[0];
								}
								contentmap.put(key[1],tem );
							}
						}
						contentmap.put("Websit: ", doc.getUrl());
						//return contentmap;
						break;
					}
				}
				if(contentStr.indexOf("Key Contact:")>-1){
					String contactPerson=contentStr.substring(contentStr.indexOf("Key Contact:")+"Key Contact:".length());
					contentmap.put("Contact Person:", contactPerson);
				}
			}
		}
		contentmap.put("contentmap", doc.getUrl());
		return contentmap;
	}

	@Override
	public String getNextPageUrl(Document doc) {
		Iterator<Element> it = doc.getAllElementsByClass("prodlist-pgs").iterator();
		while(it.hasNext()){
			Element d = it.next();
			//System.out.println(d.getContent().toString());
			d.getAllElements("a");
			Iterator<Element> ait =d.getAllElements("b").iterator();
			while(ait.hasNext()){
				Element ele =doc.getSource().getNextElement(ait.next().getEnd());
				if(ele!=null){
					if("a".equals(ele.getName())){
						return ele.getAttributeValue("href");
					}
				}
			}
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc) {
		Element tele = doc.getAllElementsByClass("lsttabon").get(0).getAllElements("span").get(0);
		String titletab = tele.getContent().toString();
		Set<String> vurl = new HashSet<String>();
		//if("Detail View".equals(titletab)){
			Element eletable = doc.getAllElementsByClass("productlist").get(0);
			List<Element> eleTrs = eletable.getAllElements("tr");
			for(Element eleTr : eleTrs){
				//String reg = "(*){1,}";
				Pattern pa = Pattern.compile("[^\"\']{1,}");//eleTr.getAllElements("title", pa);
				Iterator<Element> it  = eleTr.getAllElements("title", pa).iterator();
				while(it.hasNext()){
					Element a = it.next();
					if("a".equals(a.getName())){
						String href = a.getAttributeValue("href");
						//href = SysUtils.getUrlroot(href);
						vurl.add(href);
						break;
					}
				}
			}
		//}
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

