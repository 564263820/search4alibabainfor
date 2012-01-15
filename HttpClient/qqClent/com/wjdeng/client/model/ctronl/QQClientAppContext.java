/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Dec 20, 2010
 * File Name       : QQClientAppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
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
			connection.setCookie("pgv_pvid", "3024370100");//pgv_pvid=3024370100; pgv_flv=9.0 r45; pgv_info=pgvReferrer=&ssid=s2836044620
			connection.setCookie("pgv_flv", "9.0 r45");
			connection.setCookie("pgv_info", "pgvReferrer=&ssid=s2836044620");
			connection.setCookie("ptui_width", "370");
			connection.setCookie("ptui_height", "192");
			doc.setUrlConnection(connection);
			String pinginfo = "http://pingfore.qq.com/pingd?dm=web2.qq.com&url=web2.qq.com&tt=WebQQ2.0&rdm=-&rurl=-&pvid=-&scr=1440x900&scl=24-bit&lang=zh-cn&java=1&cc=undefined&pf=Win32&tz=-8&flash=10.1%20r85&ct=-&vs=tcss.3.2&ext=2&reserved1=&rand=50415";
			connection.getContentByURL(pinginfo,true);
			doc.loadCompiledAllPageJS();//加载所有的js文件
			String ptui = " function ptuiCB(a,b,c,d,e){alert(c);alert(e)};";
			doc.includeJavascript(ptui);
			/*byte[] bytes =(byte[]) app.getModeParament().getUrlConnection().getContentByURL(vercodUrl).get(URLContentManage.KEY_CONTENT_BYTES);
			if(null != bytes){
				SysUtils.wirtfile(bytes,"jpeg");//获取校验码
				get_user_friends2
			}*/
			connection.removeCookieValueByName("login_param");
			String httpUrl =this.getLogonUrl(doc);//获取登录地址
			String loginproxy = "http://web2.qq.com/loginproxy.html?login_level=3";
			Map<String, Object> temmap = connection.getContentByURL(loginproxy,true);
			String logonState =temmap.get(URLContentManage.KEY_CONTENT).toString();//登录请求 获得登录状态
			System.out.println(logonState);//登陆成功。。		
			String plog = "http://tj.qstatic.com/getlog?t="+System.currentTimeMillis();
			plog+="&p="+URLEncoder.encode("pass_ptlogin$start$"+user+"$0$0", HTTP.UTF_8);
			connection.getContentByURL(plog,true);
			//URLDecoder.decode("&p=pass_ptlogin$start$11ba40ebcb832d54$0$0", HTTP.UTF_8);
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis();
			plog+="&p="+URLEncoder.encode("loadEqqAllJs$start$"+user+"$0$0", HTTP.UTF_8);
			connection.getContentByURL(plog,true);
			//doc.includeJavascript("function ptui_reportSpeed(a,b){alert(a);alert(b)};");
			//doc.eval("ptui_reportSpeed();");
			
			connection.getContentByURL("http://d.web2.qq.com/proxy.html?v=20101025002",true);
			
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis();
			plog+="&p="+URLEncoder.encode("eqqLoginCgi$start$"+user+"$0$0", HTTP.UTF_8);
			connection.getContentByURL(plog,true);
			
			plog="http://tj.qstatic.com/getlog?t="+System.currentTimeMillis();
			plog+="&p="+URLEncoder.encode("loadEqqAllJs$end_loadEqqAllJs$"+user+"$0$0", HTTP.UTF_8);
			connection.getContentByURL(plog,true);
			this.connection.removeCookieValueByName("login_param");
			String ptwebqq  =this.connection.getCookieValueByName("ptwebqq");
			Math.random();
			Random a = new Random(this.getClass().hashCode());
			String clientId = a.nextInt(99)+ (String) doc.eval("String((new Date()).getTime() % 1000000);");
			String log2url = "http://d.web2.qq.com/channel/login2?";//二次验证登陆

			
			log2url = "{\"status\":\"\",\"ptwebqq\":\""+ptwebqq+"\",\"passwd_sig\":\"\",\"clientid\":\""+clientId+"\",\"psessionid\":null}";
			log2url = "http://d.web2.qq.com/channel/login2?r="+log2url;
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


//147	28.158420	183.62.125.17	192.168.0.126	HTTP	HTTP/1.1 500 Internal Server Error 
//r=%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%22cacebb9bed422b8f4f3a5967c4dd973e6d8b4cc59914ff1b7dab82678e1e0b29%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid%22%3A%2222774031%22%2C%22psessionid%22%3Anull%7D%09%0A
//r=%7B%22status%22%3A%22%22%2C%22ptwebqq%22%3A%22804528d30c8509c702362abfd72fb667523c00cafc1aa74536e8747e8eb6e03e%22%2C%22passwd_sig%22%3A%22%22%2C%22clientid%22%3A%2263588550%22%2C%22psessionid%22%3Anull%7D
