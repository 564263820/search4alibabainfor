/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : ModelManager.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.util.SysUtils;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

public class ModelManager {

	private static Map<String, ModeParament> map = null;

	private ModelManager() {
		if (map == null) {
			map = new java.util.Hashtable<String, ModeParament>();
			try {
				Source source = new Source(ModelManager.class.getClassLoader()
						.getResource("data/init.xml"));
				List<Element> elementList = source.getAllElements("model");
				for (Element el : elementList) {
					source.getAllElements("url");
					String name = el.getFirstElement("name").getContent()
							.toString();
					String className = el.getFirstElement("class").getContent()
							.toString();
					String url = el.getFirstElement("url").getContent()
							.toString();
					ModeParament mp = new ModeParament(url, className, name);
					Element mdele = el.getFirstElement("method");
					if (null != mdele) {
						mp.setMethod(mdele.getContent().toString());
					}
					map.put(mp.getModeName(), mp);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static ModeParament getModeParamByUrlString(String url) {
		if (map == null) {
			new ModelManager();
		}
		Set<String> keys = map.keySet();
		for (String key : keys) {
			if (url.indexOf(key) > -1) {
				ModeParament tem = map.get(key);
				ModeParament mode = new ModeParament(tem.getUrl(), tem
						.getModeclass(), tem.getModeName());
				mode.setMethod(tem.getMethod());
				return mode;
			}
		}
		return null;
	}
	
	public static IPaser getHtmlPaser(ModeParament par) {
		if (par == null)
			return null;
		if (!"".equals(SysUtils.trim2empty(par.getModeclass()))) {
			try {
				IPaser paser = (IPaser) Class.forName(par.getModeclass())
						.newInstance();
				return paser;
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static ModeParament getModeParamentByUrl(String url)
			throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception(url + "未找到解析器，请检查配置。" + url + "是否是目前能够解析的网站？");
		}
		return par;
	}

}
