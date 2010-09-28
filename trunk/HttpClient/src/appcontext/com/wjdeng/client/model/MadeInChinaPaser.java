/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AlibabaPaser.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
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
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.FormFields;
import net.htmlparser.jericho.Source;

import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.URLContentManage;

public class MadeInChinaPaser implements IPaser {

	private String path = "http://www.made-in-china.com/";

	private String cmdSubmit(Document doc, String url) {
		//this.getClass().getClassLoader().getResource("").getPath();
		URLContentManage um = new URLContentManage();
		try {
			um.getContentByURL(this.path+"/script/pd_top.js");
		}  catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		if (null == url)
			return "";
		if (url.indexOf("javascript:") == -1)
			return "";
		StringBuffer js = new StringBuffer(
				" function cmdSubmit(pForm, pAction, pCode, pPage, pOrder) ");
		js.append(" return '&order='+pOrder+'&page='+pPage+'&code='+pCode} ");
		js.append(url);
		ScriptEngineManager smanager = new ScriptEngineManager();
		ScriptEngine sengine = smanager.getEngineByName("javascript");
		String uparam = "";
		try {
			sengine.getContext().getWriter().write(js.toString());
			uparam = sengine.eval("cmdSubmit('I',' am ',' test ',' js ')")
					.toString();
			
			Invocable inv = (Invocable) sengine;
			inv.invokeFunction("", "","","","");
			sengine.getContext().getAttribute("", ScriptContext.GLOBAL_SCOPE);
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*
		 * js.append("var form;var document;");
		 * js.append("document.getElementById = function(id){"); Element ele =
		 * doc.getSource().getElementById("form2"); js.append("");
		 * js.append(""); js.append("");
		 * 
		 * js.append("}"); js.append("");
		 */
		/*
		 * var form = document.getElementById("form2");  
		  if (pForm != null)  form = pForm;  
		  if (pAction != "" && form.action) 
		  form.action.value = pAction;  
		  if (pPage != "" && form.page) 
		  form.page.value = pPage;  
		  if (pOrder != "" && form.order) 
		  form.order.value = pOrder;  
		  if (pCode != "" && form.code) 
		  form.code.value = pCode;  form.submit()
		 */
		Element ele = doc.getSource().getElementById("form2");
		FormFields form = ele.getFormFields();
		form.setValue("pPage", null);
		form.setValue("order", null);
		form.setValue("pCode", null);
		ele.getAttributeValue("action");
		Map<String, String[]> map = form.getDataSet();
		StringBuffer sb = new StringBuffer();
		for (String key : map.keySet()) {
			String[] val = map.get(key);
			if (null != val) {
				for (String value : val) {
					sb.append("&").append(key).append("=").append(value);
				}
			}
		}
		sb.append(uparam);
		// FormField pPage =form.get("pPage");
		return "";
	}

	@Override
	public Map<String, String> execuPaseInforPage(Document doc,AppContext appContext) {
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
	public String getNextPageUrl(Document doc,AppContext appContext) {
		Iterator<Element> it = doc.getAllElementsByClass("pageNum")
				.iterator();
		while (it.hasNext()) {
			Iterator<Element> ait = it.next().getAllElements("a").iterator();
			while (ait.hasNext()) {
				Element ele = ait.next();
				if ("Next".equals(ele.getContent().toString())) {
					String url =  ele.getAttributeValue("href");
					if(url.startsWith("java")){
						String javaScript = appContext.getContentByUrl(path+"/script/pd_top.js");
						doc.includeJavascript(javaScript);
						doc.eval(url);
						System.out.println(doc.eval("window.location.href;"));
					}
					return this.path + url;
				}
			}
		}
		return "";
	}

	@Override
	public Set<String> getPageListUrl(Document doc,AppContext appContext) {
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
