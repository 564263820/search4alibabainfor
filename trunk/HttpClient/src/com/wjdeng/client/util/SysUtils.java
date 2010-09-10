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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SysUtils {

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
		;
		String[] tem = url.split("//");
		String surl = "";
		if (tem.length > 1) {
			surl = tem[1];
		} else {
			surl = tem[0];
		}
		surl = surl.substring(0, surl.indexOf("/"));
		if (SysUtils.trim2empty(surl).length() < 3)
			return "";
		if (SysUtils.trim2empty(surl).indexOf(".") == -1)
			return "";
		surl = "http://" + surl;
		return surl;
	}

	public static void wirtfile(String str) {
		try {
			String filePath  = SysUtils.class.getClassLoader().getResource("").getPath();
			filePath =filePath.replaceAll("%20", " ");
			/*String filePath = "D:" + File.separator + "alibabhtml";
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.mkdir();
			}*/
			filePath += File.separator + System.currentTimeMillis() + ".html";
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}
			FileWriter resultFile = new FileWriter(myFilePath);
			PrintWriter myFile = new PrintWriter(resultFile);
			String strContent = str;
			myFile.println(strContent);
			resultFile.close();
		} catch (IOException e) {
			LogUtil.getLogger(SysUtils.class.getSimpleName()).error(e);
		}

	}

	public static void main(String[] arg) {
		String s = "1fe/feifel";
		System.out.println(SysUtils.formatDateTime(System.currentTimeMillis()));
		SysUtils.wirtfile("feaf");
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

	/**
	 * 格式化时间
	 */
	public static String formatDateTime(long num) {
		Date date = new Date(num);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh点mm分ss秒");
		String formattedDate = formatter.format(date);
		return formattedDate;
	}

	/**
	 * HTML标签转换
	 * 
	 * @param sourcestr
	 * @return &lt;&lt;&quot;&quot;&amp;<br>
	 *         <br>
	 *         <br>
	 *         &amp;&amp;
	 */
	public static String HtmlToText(String htmlContent) {
		if (htmlContent == null || "".equals(htmlContent.trim())) {
			return "";
		}
		String result = htmlContent.replaceAll("&lt;", "<").replaceAll("&gt;",
				">").replaceAll("&quot;", Matcher.quoteReplacement("\""))
				.replaceAll("&amp;", "&").replaceAll("&nbsp;", "").replaceAll(
						"&#39;", "'").replaceAll(Matcher.quoteReplacement("%"),
						Matcher.quoteReplacement("\\%")).replaceAll("\n", "")
				.replaceAll("\t", "").replaceAll(" ", "");
		return result;
	}
	
	/**
	 * 
	 * 文件路径及全名
	 * @param modeName
	 * @return
	 */
	public static String  getFilePath( String modeName){
		try {
			String path = SysUtils.class.getClassLoader().getResource("").getPath();
			path = java.net.URLDecoder.decode(path, "utf-8");
			String filePath = path + File.separator + SysUtils.formatDateTime(System.currentTimeMillis()) + "_";
			String fileName = filePath + modeName;
			File pathFile = new File(filePath);
			if(!pathFile.exists()){
				pathFile.mkdir();
			}
			File file = new File(fileName);
			if (file.exists() && file.isFile()) {
				file.delete();
			}
			return fileName;
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 
	 * 文件路径及全名
	 * @param modeName
	 * @return
	 */
	public static String  getFilePathStr( String modeName){
		String path  = SysUtils.class.getClassLoader().getResource("").getPath();
		path =path.replaceAll("%20", " ");
		String filePath =path+ File.separator+"_";
		String fileName = filePath + modeName;
		File pathFile = new File(filePath);
		if(!pathFile.exists()){//如果文件夹不存在，创建文件夹
			//pathFile.mkdirs();
		}else{//文件夹存在，则先删除该文件夹下原来的文件
			try {
				File file = new File(fileName);
				if (file.exists()&& file.isFile()){
					file.delete();
				}
			} catch (Exception e) {
				return null;
			}
		}
		return fileName;
	}
	
	
	public static boolean IsUrl(String str)  
    {  
        String regex = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";  
        return match(regex, str);  
    } 
	
	 /**
     * 
     * 正则表达式校验字符串
     * @param regex 正则表达式
     * @param str 需要校验的字符
     * @return
     */
    public static boolean match(String regex,String str){
    	 java.util.regex.Pattern pattern=java.util.regex.Pattern.compile(regex); 
         java.util.regex.Matcher match=pattern.matcher(str); 
         return match.matches();
    }
	
	

}
