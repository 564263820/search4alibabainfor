/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Dec 20, 2010
 * File Name       : QQClientAppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.Map;

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
	
	private String verifycode="";//验证码
	
	private String passMD5local = "Qmd5.js";
	
	private String entUrl = "http://web2.qq.com";
	
	private String logonWinUrl = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http%3A%2F%2Fweb2.qq.com%2Floginproxy.html%3Fstrong%3Dtrue&f_url=loginerroralert";
	
	
	/**
	 * 运行环境参数
	 */
	private ModeParament par;

	public QQClientAppContext() {
		try {
			AppContext  app = DefaultAppContext.Instance(entUrl);
			//this.getDocument(entUrl, app); //请求主界面
			Document doc = (Document) this.getDocument(logonWinUrl, app); //请求登录界面
			//doc.includeJavascript(SysUtils.getFileRader(this.passMD5local));
			//doc.includeJavascript(SysUtils.getFileRader("qqcommon.js"));
			//doc.eval("imgLoadReport();");
			doc.setUrlConnection(app.getModeParament().getUrlConnection());
			doc.loadCompiledAllPageJS();
			String httpUrl =this.getLogonUrl(doc);//获取登录地址
			String logonState = app.getModeParament().getUrlConnection().getContentByURL(httpUrl).get(URLContentManage.KEY_CONTENT).toString();//登录请求 获得登录状态
			System.out.println(new String(logonState.getBytes(HTTP.ISO_8859_1),HTTP.UTF_8));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void getVerifycodeFromDoc(IDocument doc){
		Element ele =doc.getElementById("verifyinput");
		String display = ele.getAttributeValue("style");
		
		
	}
	
	private String getLogonUrl(IDocument doc){
		String p = doc.eval("hex_md5('"+passw+"')").toString();
		StringBuilder sb = new StringBuilder();
		sb.append(" var form = document.getElementById('loginform'); \n");
		sb.append("  form.u.value='").append(user).append("';\n");
		sb.append("  form.p.value='").append(p).append("';\n");
		if(null != SysUtils.trim2null(verifycode)){
			sb.append("  form.verifycode.value='").append(verifycode).append("';\n");
		}else{
			//sb.append("  form.verifycode.value='!EFB';\n");			
		}
		sb.append("  form.submit();\n");
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

