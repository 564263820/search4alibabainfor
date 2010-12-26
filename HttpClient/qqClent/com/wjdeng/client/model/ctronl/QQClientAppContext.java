/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Dec 20, 2010
 * File Name       : QQClientAppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.Map;
import java.util.Scanner;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.protocol.HTTP;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IDocument;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.URLContentManage;

/**
 *
 *
 * @author Administrator
 * @version 1.0
 * @since Apex OssWorks 5.5
 */
public class QQClientAppContext{
	
	private String user = "1732960362";
	
	private String passw = "000000aaaaaa";//
	
	
	
	private String entUrl = "http://web2.qq.com";
	
	private String logonWinUrl = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http%3A%2F%2Fweb2.qq.com%2Floginproxy.html%3Fstrong%3Dtrue&f_url=loginerroralert";
	
	private String vercodUrl = "http://captcha.qq.com/getimage?aid=1003903&r="+ Math.random();
	
	/**
	 * 运行环境参数
	 */
	private ModeParament par;

	public QQClientAppContext() {
		try {
			AppContext  app = DefaultAppContext.Instance(entUrl);
			//this.getDocument(entUrl, app); //请求主界面
			Document doc = (Document) this.getDocument(logonWinUrl, app); //请求登录界面
			doc.setUrlConnection(app.getModeParament().getUrlConnection());
			doc.loadCompiledAllPageJS();
			/*byte[] bytes =(byte[]) app.getModeParament().getUrlConnection().getContentByURL(vercodUrl).get(URLContentManage.KEY_CONTENT_BYTES);
			if(null != bytes){
				SysUtils.wirtfile(bytes,"jpeg");//获取校验码
			}*/
			String httpUrl =this.getLogonUrl(doc);//获取登录地址
			System.out.println(httpUrl);
			Map<String, Object> temmap = app.getModeParament().getUrlConnection().getContentByURL(httpUrl,true);
			String logonState =temmap.get(URLContentManage.KEY_CONTENT).toString();//登录请求 获得登录状态
			System.out.println(logonState);//登陆成功。。
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/***
	 * 
	 * 获取登陆地址
	 * 
	 * @param doc
	 * @return
	 */
	private String getLogonUrl(IDocument doc){
		//java.util.Scanner scaner = new Scanner(System.in);
		//verifycode =scaner.next();
		String p = doc.eval("hex_md5('"+passw+"')").toString();
		StringBuilder sb = new StringBuilder();
		/*String setJs = "var sform  = document.getElementById('loginform'); sform.u.value='"+user+"';sform.p.value='"+p+"';";
		setJs = setJs + "onFormSubmit(document.getElementById('loginform'))";
		doc.eval(setJs);*/
		sb.append(" var form = document.getElementById('loginform'); \n");//
		sb.append(" form.u.value='").append(user).append("';\n");
		sb.append("  form.p.value='").append(p).append("';\n");
		sb.append("check();\n");//检查验证码 并获取校验码
		sb.append("form.submit();\n");
		String httpUrl = doc.eval(sb.toString()).toString();
		return httpUrl;
	}
	
	private IDocument getDocument(String url ,AppContext app) throws ClientProtocolException, IOException, Exception{
		URLContentManage conection = app.getModeParament().getUrlConnection();
		Map<String, Object> map  = conection.getContentByURL(url,true);
		String content = map.get(URLContentManage.KEY_CONTENT).toString();
		content = new String(content.getBytes(HTTP.ISO_8859_1),HTTP.UTF_8);
		IDocument document =  new Document(new Source(content) , url);
		return document;
	}
	
	
	public static void main(String[] s) {
		QQClientAppContext app = new QQClientAppContext();
		
	}
}

