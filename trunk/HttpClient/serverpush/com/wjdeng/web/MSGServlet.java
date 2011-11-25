/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 3, 2010
 * File Name       : PaserCtroLServlet.java
 *
 ********************************************************************************/
package com.wjdeng.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.wjdeng.SystemMessgeServices;
import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.ctronl.AppStatus;
import com.wjdeng.client.model.ctronl.ContinueRunCommand;
import com.wjdeng.client.model.ctronl.DefaultAppContext;
import com.wjdeng.client.model.ctronl.ModeParament;
import com.wjdeng.client.model.ctronl.PuaseCommand;
import com.wjdeng.client.model.ctronl.event.Event;
import com.wjdeng.client.model.ctronl.event.Listener;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.ExcelUtils;
import com.wjdeng.model.MsgDataModel;
import com.wjdeng.model.User;

public class MSGServlet extends HttpServlet {
	
	private SystemMessgeServices systemMessgeServices;
	
	/**
	 */
	public MSGServlet() {
		super();
	}

	/**
	 */
	public void destroy() {
		super.destroy();
	}

	/**
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
		this.doPost(request, response);
	}


	/**
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
	public void doPost(final HttpServletRequest request,
			final HttpServletResponse response) throws ServletException,
			IOException {
	}
	
	
	/**
	 * 
	 * 获取消息记录通过iframe方式
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public void getMSG(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("");
		String sessionId =request.getSession().getId();
		String clientKey = SysUtils.trim2null(request.getParameter("clientKey"));
		String keepConnect = SysUtils.trim2null(request.getParameter("keepConnect"));
		List<MsgDataModel> msglist= systemMessgeServices.propmtMSG(user, sessionId,clientKey,keepConnect);
		String str=JSONArray.fromObject(msglist).toString();
		request.setAttribute("msgs", str);
		request.getRequestDispatcher("/WEB-INF/jsps/common/sysMsgCallBackScript.jsp").include(request, response);
	}
	
	
	/**
	 * 
	 * 获取消息记录通过ajax方式
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public void getMSGByAjax(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("");
		String sessionId =request.getSession().getId();
		String clientKey = SysUtils.trim2null(request.getParameter("clientKey"));
		String keepConnect = SysUtils.trim2null(request.getParameter("keepConnect"));
		List<MsgDataModel> msglist= systemMessgeServices.propmtMSG(user, sessionId,clientKey,keepConnect);
		String str=JSONArray.fromObject(msglist).toString();
		response.getWriter().write(str);
	}
	
	
	/**
	 * 
	 * 浏览器端给指定用户发送一条消息
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return 
	 * @throws Exception
	 */
	public void sendMSG( HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("");
		String receiverId = SysUtils.trim2null(request.getParameter("receiverId"));
		String msgstr = SysUtils.trim2null(request.getParameter("msgstr"));
		if(receiverId==null)return ;
		User rec = new User();
		rec.setId(Long.valueOf(receiverId));
		MsgDataModel msg  = new MsgDataModel();
		msg.setCreateUser(user);
		msg.setReceiver(rec);
		msg.setMemo(msgstr);
		msg.setCreateTime(System.currentTimeMillis());
		systemMessgeServices.sendMsg(msg);
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
	}

}
