/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Dec 20, 2010
 * File Name       : QQClientAppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.Map;
import java.util.Random;

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
	
	private URLContentManage  connection;
	
	/**
	 * 运行环境参数
	 */
	private ModeParament par;

	public QQClientAppContext() {
		try {
			AppContext  app = DefaultAppContext.Instance(entUrl);
			//this.getDocument(entUrl, app); //请求主界面
			Document doc = (Document) this.getDocument(logonWinUrl, app); //请求登录界面
			connection =app.getModeParament().getUrlConnection();
			doc.setUrlConnection(connection);
			doc.loadCompiledAllPageJS();
			String ptui = " function ptuiCB(a,b,c,d,e){alert(c);alert(e)};";
			doc.includeJavascript(ptui);
			/*byte[] bytes =(byte[]) app.getModeParament().getUrlConnection().getContentByURL(vercodUrl).get(URLContentManage.KEY_CONTENT_BYTES);
			if(null != bytes){
				SysUtils.wirtfile(bytes,"jpeg");//获取校验码
				get_user_friends2
			}*/
			String httpUrl =this.getLogonUrl(doc);//获取登录地址
			String loginproxy = "http://web2.qq.com/loginproxy.html?strong=true";
			Map<String, Object> temmap = connection.getContentByURL(loginproxy,true);
			String logonState =temmap.get(URLContentManage.KEY_CONTENT).toString();//登录请求 获得登录状态
			String plog = "http://tj.qstatic.com/getlog?t="+System.currentTimeMillis()+"&p=pass_ptlogin%24start%2411ba40ebcb832d54%240%240";
			connection.getContentByURL(plog,true);
			Thread.currentThread().sleep(100);
			
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis()+"&p=loadEqqAllJs%24start%2482891911%240%240";
			connection.getContentByURL(plog,true);
			Thread.currentThread().sleep(100);
			//doc.includeJavascript("function ptui_reportSpeed(a,b){alert(a);alert(b)};");
			doc.eval("ptui_reportSpeed();");
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis()+"&p=eqqLoginCgi%24start%2482891911%240%240";
			connection.getContentByURL(plog,true);
			Thread.currentThread().sleep(100);
			
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis()+"&p=loadEqqAllJs%24end_loadEqqAllJs%2482891911%240%240";
			connection.getContentByURL(plog,true);
			Thread.currentThread().sleep(100);
			
			System.out.println(logonState);//登陆成功。。		
			String ptwebqq  =this.connection.getCookieValueByName("ptwebqq");
			Math.random();
			Random a = new Random(this.getClass().hashCode());
			String clientId = a.nextInt(99)+ (String) doc.eval("String((new Date()).getTime() % 1000000);");
			String log2url = "http://d.web2.qq.com/channel/login2?";//二次验证登陆
			//r=%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%22"+ptwebqq+"%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid":"48247021","psessionid":null}
			log2url+="%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%22"+ptwebqq+"%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid%22%3A%"+clientId+"%22%2C%22psessionid%22%3Anull%7D";
			temmap =this.connection.getContentByURL(log2url, false, "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
			System.out.println(temmap.get(URLContentManage.KEY_CONTENT));//登陆成功。。	
			//r={"status":"","ptwebqq":"1e836fb862aad64d8b40eb02cccda1d1b2c5253fdd8849fd5e1d4271941ffe2e","passwd_sig":"","clientid":"53555591","psessionid":null}
			//r=%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%221e836fb862aad64d8b40eb02cccda1d1b2c5253fdd8849fd5e1d4271941ffe2e%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid%22%3A%2253555591%22%2C%22psessionid%22%3Anull%7D
			//String frends = "http://s.web2.qq.com/api/get_user_friends2?r=%7B%22h%22%3A%22hello%22%2C%22vfwebqq%22%3A%22f7a21c56aec6168dd97c729508c05b30c945a474a6b568f90398089c04f7eefad8840b46b13bc7a8%22%7D";
			//System.out.println(this.getContent(frends, app));
			//http://d.web2.qq.com/channel/login2?r=%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%221e836fb862aad64d8b40eb02cccda1d1b2c5253fdd8849fd5e1d4271941ffe2e%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid%22%3A%2253555591%22%2C%22psessionid%22%3Anull%7D
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

