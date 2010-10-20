/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AlibabaPaser.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysUtils;

public class MadeInChinaPaser implements IPaser {

	private String path = "http://www.made-in-china.com/";


	@Override
	public Map<String, String> execuPaseInforPage(Document doc,AppContext appContext) {
		Map<String, String> contentmap = new HashMap<String, String>();
		Element contacttable = doc.getSource().getElementById("contact");
		if(null==contacttable){
			contacttable = doc.getFirstElementByClass("contacttable");
		}
		if(contacttable!=null){
			List<Element> trs = contacttable.getAllElements("tr");
			for(Element tr :trs){
				String title = StringUtils.trim2null(tr.getFirstElement("th").getTextExtractor().toString());
				if(null != title ){
					String content  = "";
					if("Homepage:".equals(title)){
						content  = StringUtils.trim2null(tr.getFirstElement("a").getAttributeValue("href"));
					}
					if(tr.getFirstElement("td")!=null){
						content  = StringUtils.trim2null(tr.getFirstElement("td").getTextExtractor().toString());
						contentmap.put(title, content);
					}
				}
			}
		}
		return contentmap;
	}

	@Override
	public String getNextPageUrl(Document doc,AppContext appContext) {
		Iterator<Element> it = doc.getAllElementsByClass("pageNum")
				.iterator();
		while (it.hasNext()) {
			Iterator<Element> ait = it.next().getAllElements("a").iterator();
			while (ait.hasNext()) {
				Element ele = ait.next();
				if ("Next".equals(ele.getContent().toString())) {
					String url =  ele.getAttributeValue("href");
					if(url.startsWith("javascript")){
						String javaScript = appContext.getContentByUrl(path+"/script/pd_top.js");
						doc.includeJavascript(javaScript);
						doc.eval(url);
						return path+doc.eval("window.location.href;");
					}
					return this.path + url;
				}
			}
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc,AppContext appContext) {
		Set<String> vurl = new HashSet<String>();
		List<Element> prolist  = doc.getAllElementsByClass("prolist");
		for(Element elepro :prolist){
			List<Element> alist  = elepro.getAllElements("a");
			for(Element aele : alist){
				if(aele.getChildElements().isEmpty()){
					String href =aele.getAttributeValue("href");
					href = SysUtils.getUrlroot(href);
					href += "/contact-info.html";
					vurl.add(href);
				}
			}
		}
		return vurl;
	}

	public static void main(String[] s) {
		StringBuffer js = new StringBuffer(
				" function cmdSubmit(pForm, pAction, pCode, pPage, pOrder) ");
		js.append(" return '&order='+pOrder+'&page='+pPage+'&code='+pCode} ");
		// js.append(url);
		ScriptEngineManager smanager = new ScriptEngineManager();
		ScriptEngine sengine = smanager.getEngineByName("javascript");
		String uparam = "";
		try {
			Document doc = new Document(new Source(""),"abc");
			sengine.put("document", doc);
			sengine.put("window", doc);
			Compilable compilable = (Compilable) sengine;
			CompiledScript comptScript = compilable.compile(new FileReader(MadeInChinaPaser.class.getClassLoader().getResource("data/test.js").getPath()));
			//System.out.println(comptScript.eval());
			//System.out.println(comptScript.eval(sengine.getContext()));
			CompiledScript comptScript2 = compilable.compile("var wode={s:'s1'};eval('var b = new Object(); b._s=8')");
			comptScript.eval(sengine.getContext());
			comptScript2.eval(sengine.getContext());
			Invocable inv = (Invocable) sengine;
			System.out.println(inv.invokeFunction("hex_md5", "10864111wjdeng"));
			System.out.println(sengine.eval("b._s"));
			
			//comptScript.eval("md5_vm_test()");
			//comptScript.
			//Bindings binding = sengine.createBindings();
			// javax.script.CompiledScript cs =
			// sengine.getFactory().getScriptEngine().
			//uparam = sengine.eval("cmdSubmit('I',' am ',' test ',' js ')").toString();
			//System.out.println(uparam);
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} /*
			 * catch (IOException e) { // TODO Auto-generated catch block
			 * e.printStackTrace(); }
			 */ catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		String str = "http://us.my.alibaba.com/userbehavior/contactPersonUpdate.htm?memberId=f%2B63TPzd45lTE0EYPTxtqblHad5z3Es60Nu%2Fg37wnsyBBpp%2Bh9FqSA%3D%3D";
		String regEx = "userbehavior";
		boolean result = Pattern.compile(regEx).matcher(str).find();
		//System.out.println(result);
		
		// ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);

	}

}
