package com.wjdeng.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wjdeng.imp.URLContentManage;

/*******************************************************************************
 * Create Author : JoveDeng Create Date : Apr 22, 2010 File Name :
 * MainFrame.java
 * 
 ******************************************************************************/

public class MainFrame extends HttpServlet {

	private HttpServletRequest request;

	/**
	 * Constructor of the object.
	 */
	public MainFrame() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy();
	}

	/**
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.request = request;
		String url = request.getParameter("url");
		String model = request.getParameter("model");// 解析模型参数
		System.out.println(request.getRequestedSessionId());
		// model="alibabaContract";
		if (url == null || "".equals(url)) {
			getServletContext().getRequestDispatcher("/index.jsp").forward(
					request, response);
			return;
		} else if ("input".equals(url)) {
			getServletContext().getRequestDispatcher("/input.jsp").forward(
					request, response);
			return;
		}
		url = url.trim();
		URLContentManage um = new URLContentManage();
		System.out.println(url);
		Map<String, Object> map;
		try {
			map = um.getContentByURL(url);
			String str = (String) map.get(URLContentManage.KEY_CONTENT);// 抓取到的页面html
			String charset = (String) map.get(URLContentManage.KEY_CHARSET);// 页面字符集
			response.setCharacterEncoding(charset);
			PrintWriter out = response.getWriter();
			// str =str.replaceFirst("<base href=\"http://www.alibaba.com\">", "");
			// str =str.replaceFirst("<base", "<x");
			str = str.substring(str.indexOf("<body"));
			str = str.substring(str.indexOf(">") + 1);
			response.setContentType("text/html");
			// str=str.replaceAll("script", "x");
			// str=str.replaceAll("text/javascript", "x");
			// str=str.replaceAll("text/Javascript", "x");
			// str=str.replaceAll("iframe", "x");
			// System.out.println(str);
			out.append(creatPageFlag(url));// 放置页面标记
			RequestDispatcher dis = getServletContext().getRequestDispatcher(
					"/" + model + "input.jsp");
			dis.include(request, response);
			out.println(str);
			out.flush();
			out.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

	/**
	 * 
	 * 产生页面标记
	 * 
	 * @return
	 */
	private String creatPageFlag(String url) {
		// String frameId = request.getParameter("frameid");
		// if(frameId==null || "".equals(frameId)){
		Long time = System.currentTimeMillis();
		Double d = Math.random();
		String frameId = time.toString() + d.toString();
		// }
		this.getServletContext().setAttribute("pageFlag_wjdeng",
				"pageFlag_wjdeng");
		String flagtag = "<input name='pageFlag_wjdeng' value='" + frameId
				+ "' id='pageFlag_wjdeng' />";
		flagtag += "<input name='PageSrcUrl' value='" + url
				+ "' id='PageSrcUrl' />";
		return flagtag;
	}

}
