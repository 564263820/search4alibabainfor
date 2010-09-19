/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 9, 2010
 * File Name       : StringKeyMsg.java
 *
 ********************************************************************************/
package com.wjdeng.client.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Properties;

public class StringKeyMsg {
	final public static String complanyKey = "Sys_CompanyName";
	private static StringKeyMsg keys = new StringKeyMsg();
	private static Properties properties;

	private StringKeyMsg() {
		properties = new Properties();
		try {
			String path = this.getClass().getClassLoader().getResource(
					"data/columKey.properties").getPath();
			path = URLDecoder.decode(path, "utf-8");
			properties.load(new FileInputStream(new File(path)));
		} catch (Exception e) {
			LogUtil.getLogger(this.getClass().getSimpleName()).error(e);
		}
	}

	public static String getMsgByKey(String key) {
		return properties.getProperty(key);
	}

}
