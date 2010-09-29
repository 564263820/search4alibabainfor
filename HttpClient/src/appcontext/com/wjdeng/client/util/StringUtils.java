/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : StringUtils.java
 *
 ********************************************************************************/
package com.wjdeng.client.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Pattern;

public class StringUtils {

	public static String trim2empty(String src) {
		if (src == null)
			return "";
		return src.trim();
	}

	public static String trim2null(String src) {
		if (src == null)
			return null;
		src = src.trim();
		if ("".equals(src))
			return null;
		return src;
	}

	/**
	 * 
	 * 获取域全名
	 * 
	 * @param url
	 * @return
	 */
	public static String getUrlroot(String url) {
		String str = "(http(s)?://)?+([\\w-]+\\.)+[\\w-]+(/)?";
		if (Pattern.compile(str).matcher(url).matches()) {
			return url;
		}
		
		String[] tem = url.split("//");
		String surl = "";
		if (tem.length > 1) {
			surl = tem[1];
		} else {
			surl = tem[0];
		}
		if(surl.indexOf("/")>-1){
			surl = surl.substring(0, surl.indexOf("/"));
		}
		if (StringUtils.trim2empty(surl).length() < 3)
			return "";
		if (StringUtils.trim2empty(surl).indexOf(".") == -1)
			return "";
		surl = "http://" + surl;
		return surl;
	}

	public static void wirtfile(String str) {
		try {
			String filePath = "D:" + File.separator + "alibabhtml";
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.mkdir();
			}
			filePath += File.separator + System.currentTimeMillis() + ".html";
			myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}
			FileWriter resultFile = new FileWriter(myFilePath);
			PrintWriter myFile = new PrintWriter(resultFile);
			String strContent = str;
			myFile.println(strContent);
			resultFile.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static void main(String[] arg) {
		String s = "1fe/feifel";
		System.out.println(StringUtils.getUrlroot(s));
		StringUtils.wirtfile("feaf");
	}

	/**
	 * 将字符串srcstr按分隔字符串searchstr在其中的最后一个位置起分成2段装入数组返回
	 * 
	 * @param srcstr
	 * @param searchstr
	 * @return
	 */
	public static String[] splitLastStr(String srcstr, String searchstr) {
		int loca = srcstr.lastIndexOf(searchstr);
		if (loca > 0) {
			return new String[] {
					srcstr.substring(0, loca),
					srcstr
							.substring(loca + searchstr.length(), srcstr
									.length()) };
		} else {
			return new String[] { srcstr };
		}
	}

	public static String string2Json(String s) {
		StringBuilder sb = new StringBuilder(s.length() + 20);
		// sb.append('\"');
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			switch (c) {
			case '\'':
				sb.append("\\\"");
				break;
			case '\"':
				sb.append("\\\"");
				break;
			case '\\':
				sb.append("\\\\");
				break;
			case '/':
				sb.append("\\/");
				break;
			case '\b':
				sb.append("\\b");
				break;
			case '\f':
				sb.append("\\f");
				break;
			case '\n':
				sb.append("\\n");
				break;
			case '\r':
				sb.append("\\r");
				break;
			case '\t':
				sb.append("\\t");
				break;
			default:
				sb.append(c);
			}
		}
		// sb.append('\"');
		return sb.toString();
	}

}
