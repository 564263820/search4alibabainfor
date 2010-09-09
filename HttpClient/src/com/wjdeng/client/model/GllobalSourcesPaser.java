/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AlibabaPaser.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

import org.apache.http.client.ClientProtocolException;

import com.wjdeng.client.model.Ipaser.IPaser;
import com.wjdeng.client.model.ctronl.AppContext;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.URLContentManage;

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
			while(it.hasNext()){
				Element ele = it.next();
				List<Element> stronglist = ele.getAllElements("strong");
				String contentStr = ele.getTextExtractor().toString();
				for(Element strele :stronglist){
					if(null == strele.getContent().getFirstElement())continue;
					String name = strele.getContent().getFirstElement().getName();
					if("b".equals(name)){
						contentStr = "Company Name:"+contentStr.trim();
						this.setCotent(contentStr, contentmap);
						}
						contentmap.put("Websit:", doc.getUrl());
				}
				if(contentStr.indexOf("Key Contact:")>-1){
					String contactPerson=contentStr.substring(contentStr.indexOf("Key Contact:")+"Key Contact:".length());
					contactPerson = "Contact Person:"+contactPerson.trim();
					this.setCotent(contentStr, contentmap);
				}
			}
		}
		return contentmap;
	}
	
	private void setCotent(String contentStr,Map<String, String> contentmap){
		String[] items=contentStr.split("\n");
		String lastKey="" ;
		for(String item :items){
			String[] carray = item.split(":");
			if(carray.length>1){
				lastKey = carray[0];
				contentmap.put(lastKey,  carray[1]);
			}else{
				contentmap.put(lastKey,contentmap.get(lastKey)+item);
			}
		}
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
		
		//String str="http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		//String regEx="userbehavior";
		//boolean result=Pattern.compile(regEx).matcher(str).find();
		String url = "url://chinaholygood.manufacturer.globalsources.com/si/6008837067662/Homepage.htm";
		try {
			File file  = new File(GllobalSourcesPaser.class.getClassLoader().getResource("test.txt").getPath());
			java.io.InputStreamReader isr = new InputStreamReader(new java.io.BufferedInputStream(new FileInputStream(file)));
			BufferedReader br = new BufferedReader(isr);
			StringBuffer sb = new StringBuffer();
			while(br.ready()){
				sb.append(br.readLine());
			}
			System.out.println(sb.toString());
			/*URLContentManage um= new URLContentManage();
			Map<String,Object> map = um.getContentByURL(url,true);
			Document doc=AppContext.getHtmlDocByUrl((String) map.get("KEY_CONTENT"));
			*/
			GllobalSourcesPaser paser = new GllobalSourcesPaser();
			paser.execuPaseInforPage(new Document(new Source(sb.toString()),""));
			//paser.execuPaseInforPage(doc);
			
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//System.out.println(result);
		
	}

}

