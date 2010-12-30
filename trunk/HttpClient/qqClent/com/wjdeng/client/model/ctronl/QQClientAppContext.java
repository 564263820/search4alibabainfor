/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Dec 20, 2010
 * File Name       : QQClientAppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.Map;

import net.htmlparser.jericho.Source;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.protocol.HTTP;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IDocument;
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
				get_user_friends2
5263
5303
			}*/
			String httpUrl =this.getLogonUrl(doc);//获取登录地址
			/*Map<String, Object> temmap = app.getModeParament().getUrlConnection().getContentByURL(httpUrl,true);
			String logonState =temmap.get(URLContentManage.KEY_CONTENT).toString();//登录请求 获得登录状态
			System.out.println(logonState);//登陆成功。。*/			
			String frends = "http://s.web2.qq.com/api/get_user_friends2?r=%7B%22h%22%3A%22hello%22%2C%22vfwebqq%22%3A%22f7a21c56aec6168dd97c729508c05b30c945a474a6b568f90398089c04f7eefad8840b46b13bc7a8%22%7D";
			System.out.println(this.getContent(frends, app));
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
	private String getLogonUrl(Document doc){
		StringBuilder sb = new StringBuilder();
		sb.append(" var form = document.getElementById('loginform'); \n");//
		sb.append(" form.u.value='").append(user).append("';\n");
		sb.append("  form.p.value='").append(passw).append("';\n");
		sb.append("check();\n");//检查验证码 并获取校验码
		sb.append("onFormSubmit(form);//form.submit();\n");
		String httpUrl = doc.eval(sb.toString()).toString();
		return httpUrl;
	}
	
	private IDocument getDocument(String url ,AppContext app) throws ClientProtocolException, IOException, Exception{
		URLContentManage conection = app.getModeParament().getUrlConnection();
		Map<String, Object> map  = conection.getContentByURL(url,true);
		String content = map.get(URLContentManage.KEY_CONTENT).toString();
		content = new String(content.getBytes(HTTP.ISO_8859_1),HTTP.UTF_8);
		//System.out.println(content);
		IDocument document =  new Document(new Source(content) , url);
		return document;
	}
	
	private String getContent(String url  ,AppContext app) throws ClientProtocolException, IOException, Exception{
		URLContentManage conection = app.getModeParament().getUrlConnection();
		Map<String, Object> map  = conection.getContentByURL(url,true);
		String content = map.get(URLContentManage.KEY_CONTENT).toString();
		content = new String(content.getBytes(HTTP.ISO_8859_1),HTTP.UTF_8);
		return content;
	}
	
	
	public static void main(String[] s) {
		QQClientAppContext app = new QQClientAppContext();
		
	}
}

