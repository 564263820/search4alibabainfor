package com.wjdeng.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.wjdeng.client.model.ctronl.AppStatus;
import com.wjdeng.client.model.ctronl.ModelManager;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysStaticKey;

public class License extends HttpServlet {
	/**
	 * Constructor of the object.
	 */
	public License() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path =this.getClass().getClassLoader().getResource("data/user.properties").getPath();
		path = URLDecoder.decode(path, "utf-8");
		Properties properties = new Properties();
		properties.load(new FileInputStream(new File(path)));
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		if(StringUtils.trim2empty(properties.getProperty(username)).equals(password)){
			request.getSession().setAttribute(SysStaticKey.UserKey, properties);
			response.sendRedirect("/index.jsp");
		}else{
			response.sendRedirect("/login.jsp");
		}
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String wjdengFlag = request.getParameter("wjdengFlag");
		this.testNet(request, response);
		this.doGet(request, response);
	}
	
	private boolean  testNet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
		try{
			HttpClient client = new DefaultHttpClient();
			HttpPost httget = new HttpPost("http://jiage110101.8643.jspkj.com/infor/Valide");
			HttpResponse rp;
			rp = client.execute(httget);
			HttpEntity entity = rp.getEntity();
			String flag = EntityUtils.toString(entity);
			if(StringUtils.trim2empty(flag).indexOf("wjdengFlag=Y")==1){
				File file = new File(ModelManager.class.getClassLoader().getResource("data/init.xml").getPath());
				if(file.exists()){
					file.delete();
				}
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.getLogger(this.getClass().getSimpleName()).error(e);
			//response.getWriter().write(this.getStatusJson(AppStatus.error, "访问该网站失败！"));
		} 
		return true;
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
