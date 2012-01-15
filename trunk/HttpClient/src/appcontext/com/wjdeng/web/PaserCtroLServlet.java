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
import com.wjdeng.imp.SystemMessgeServicesImpl;
import com.wjdeng.model.MsgDataModel;

public class PaserCtroLServlet extends HttpServlet {

	private static String nullKey = "end";

	static public Map<String, ModeParament> map = new HashMap<String, ModeParament>();

	static public Map<String, StringBuffer> writContentMap = new HashMap<String, StringBuffer>();
	
	/**
	 * 当前session抓取到的临时数据
	 */
	static public Map<String, List<Map<String, String>>> pageInfoMap = new HashMap<String, List<Map<String, String>>>();

	/**
	 */
	public PaserCtroLServlet() {
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
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("text/html;charset=UTF-8");
		String url = request.getParameter("url");
		url = java.net.URLDecoder.decode(url, "utf-8");
		String operation = request.getParameter("operation");
		ModeParament par = map.get(request.getRequestedSessionId());
		if (par == null) {
			/*
			 * if(!SysUtils.IsUrl(url)){
			 * response.getWriter().write(getStatusJson(AppStatus.error,"填写的网址不正确！"));
			 * return; }
			 */
			if (!this.testNet(url, request, response))
				return;
		}
		if ("retry".equals(operation)) {
			if (null != par) {
				DefaultAppContext.exeCommand(new PuaseCommand(), par);// 停止
			}
			par = null;
		} else if ("pause".equals(operation)) {
			DefaultAppContext.exeCommand(new PuaseCommand(), par);// 暂停
		} else if ("continuerun".equals(operation)) {
			DefaultAppContext.exeCommand(new ContinueRunCommand(), par);// 继续 回复运行
		} else if ("downloadExcel".equals(operation)) {
			this.downloadExcel(response, par);
			map.remove(request.getRequestedSessionId());
		}
		
	}
	
	
	
	private void runTask(String url,int deep,final String sessionId) throws Exception{
		AppContext app;
		ModeParament  par=null;
		if (par == null) {
			app = DefaultAppContext.Instance(url, deep);
		} else {
			app = DefaultAppContext.Instance(par);
		}
		par = app.getModeParament();
		map.put(sessionId, par);
		final Thread th = new Thread(app);
		th.start();
		final SystemMessgeServices msgService =SystemMessgeServicesImpl.getInstance();
		app.addListener4AfterNextPage(new Listener(){
			String session = sessionId;
			
			@Override
			public void execute(Event ev) {
				//new MsgDataModel().setAttribute("", obj)
				msgService.sendMsg2SessionId(new MsgDataModel(),this.session);
				ev.getModeParament().getDatatemp();
				
			}});
		app.addListener4AfterPaserInfor(new Listener(){

			@Override
			public void execute(Event ev) {
				// TODO Auto-generated method stub
				
			}});
		app.addListener4End(new Listener(){

			@Override
			public void execute(Event ev) {
				// TODO Auto-generated method stub
				
			}});
		
	}

	private void downloadExcel(HttpServletResponse response, ModeParament par) {
		if (par == null)
			return;
		response.setContentType("application/x-msdownload");
		String fileName = par.getModeName()
				+ SysUtils.formatDateTime(System.currentTimeMillis()) + ".xls";
		ExcelUtils eu = new ExcelUtils();
		try {
			fileName = new String(fileName.getBytes("GBK"), "iso8859-1");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ fileName);
			synchronized (par) {
				eu.createExcelUtil(par, response.getOutputStream());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
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
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("text/html;charset=UTF-8");
		String url = request.getParameter("url");
		url = java.net.URLDecoder.decode(url, "utf-8");
		String operation = request.getParameter("operation");
		ModeParament par = map.get(request.getRequestedSessionId());
		if (par == null) {
			/*
			 * if(!SysUtils.IsUrl(url)){
			 * response.getWriter().write(getStatusJson(AppStatus.error,"填写的网址不正确！"));
			 * return; }
			 */
			if (!this.testNet(url, request, response))
				return;
		}
		if ("retry".equals(operation)) {
			writContentMap.remove(request.getRequestedSessionId());
			map.remove(request.getRequestedSessionId());
			if (null != par) {
				DefaultAppContext.exeCommand(new PuaseCommand(), par);// 停止
			}
			par = null;
		} else if ("pause".equals(operation)) {
			DefaultAppContext.exeCommand(new PuaseCommand(), par);// 暂停
			response.getWriter().write(getStatusJson(AppStatus.end, "暂停!"));
			return;
		} else if ("continuerun".equals(operation)) {
			DefaultAppContext.exeCommand(new ContinueRunCommand(), par);// 继续 回复运行
		} else if ("downloadExcel".equals(operation)) {
			this.downloadExcel(response, par);
			map.remove(request.getRequestedSessionId());
			return;
		}
		
		List<Map<String, String>> cls = pageInfoMap.get(request.getRequestedSessionId());
		StringBuffer sb = writContentMap.get(request.getRequestedSessionId());
		if (sb == null) {
			sb = new StringBuffer();
			writContentMap.put(request.getRequestedSessionId(), sb);//记录当前运行状态
			cls = new ArrayList<Map<String,String>>();
			pageInfoMap.put(request.getRequestedSessionId(),cls);;
		}
		try {
			if (!"running".equals(StringUtils.trim2null(operation))) {// 任务没有在运行中
				runTask(sb, par,cls, request);// 执行任务
			}
			par = map.get(request.getRequestedSessionId());

			while (true) {
				synchronized (sb) {
					sb.wait();
					if (cls.size()>0||sb.length()>0) {
						sb.insert(0, "{ ");
						sb.append(" , data:[");
						this.creatJson(cls, sb);
						sb.append("] }");
						response.getWriter().write(sb.toString());
						sb.delete(0, sb.length());
						return;
					} else if (par.isEndTask()) {
						response.getWriter().write( getStatusJson(AppStatus.end, "任务终止!"));
						return;
					}
				}
			}
		} catch (Exception e) {
			LogUtil.getLogger(getClass().getSimpleName()).error(e);
			response.getWriter().write(getStatusJson(AppStatus.error, e.getMessage()));
		}
	}

	private void runTask(StringBuffer sb, ModeParament par,List<Map<String,String>> cls,
			HttpServletRequest request) throws Exception {
		String url = request.getParameter("url");
		url = java.net.URLDecoder.decode(url, "utf-8");
		String deepStr = request.getParameter("deep");
		Integer deep = -1;
		if (StringUtils.trim2null(deepStr) != null) {
			deep = new Integer(deepStr).intValue();
		}
		// String operation = request.getParameter("operation");
		AppContext app;
		if (par == null) {
			app = DefaultAppContext.Instance(url, deep);
		} else {
			app = DefaultAppContext.Instance(par);
		}
		par = app.getModeParament();
		map.put(request.getRequestedSessionId(), par);
		final Thread th = new Thread(app);
		th.start();
		app.addListener4AfterNextPage(new nextPage(sb,cls));
		app.addListener4AfterPaserInfor(new getPageInfor(sb,cls));
		app.addListener4End(new endtask(sb,cls));
	}

	private String getStatusJson(AppStatus satu, String msg) {
		StringBuffer sb = new StringBuffer();
		sb.append("{ data:[");
		sb.append("]");
		sb.append(", state : '").append(satu.name()).append("' ");
		sb.append(", url : ' ' ");
		sb.append(", msg : '").append(msg).append("'");
		sb.append("}");
		System.out.println(sb);
		return sb.toString();
	}

	private void creatJson(Collection<Map<String, String>> list, StringBuffer sb) {
		for (Map<String, String> map : list) {
			StringBuffer temp = new StringBuffer();
			Set<String> keys = map.keySet();
			for (String key : keys) {
				if (StringUtils.trim2null(key) == null)
					continue;
				temp.append("'").append(
						StringUtils.string2Json(StringUtils.trim2empty(key)))
						.append("':'");
				temp.append(
						StringUtils.string2Json(StringUtils.trim2empty(map
								.get(key)))).append("',");
			}
			if (temp.length() > 0) {
				temp.delete(temp.length() - 1, temp.length());
				temp.insert(0, "{");
				temp.append("},");
				sb.append(temp);
			}
		}
		list.clear();
	}

	/**
	 * 
	 * 完成一个信息页面的解析
	 *
	 * @author Administrator
	 * @version 1.0
	 */
	class getPageInfor implements Listener {
		private StringBuffer sb;
		
		final private List<Map<String, String>> cls;

		final protected List<Map<String, String>> getCls() {
			return cls;
		}

		public getPageInfor(StringBuffer sb,List<Map<String, String>> cls) {
			this.sb = sb;
			this.cls=cls;
		}

		@Override
		public void execute(Event ev) {
			synchronized (sb) {
				sb.delete(0, sb.length());
				sb.append(" state : 'running' ");
				sb.append(", url : '").append(
						ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(",msg:'' ");
				List<Map<String, String>> list = ev.getModeParament().getDatatemp();
				cls.addAll(list);
				list.clear();
				/*List<Map<String, String>>  listt =ev.getModeParament().getDatatemp();
				for(Map<String, String> map :listt){
					IndexManager.Instance().writeIndex(map);
				}*/
				//IndexManager.Instance().commit();
				sb.notifyAll();
			}
		}
	}

	/**
	 * 
	 * 分页完成
	 *
	 * @author Administrator
	 * @version 1.0
	 */
	class nextPage implements Listener {
		final private StringBuffer sb;
		
		final  List<Map<String, String>> cls;

		public nextPage(StringBuffer sb,List<Map<String, String>> cls) {
			this.sb = sb;
			this.cls=cls;
		}

		@Override
		public void execute(Event ev) {
			synchronized (sb) {
				sb.delete(0, sb.length());
				sb.append(" state : 'running' ");
				sb.append(", url : '").append(
						ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(", msg:'分页完成!当前第：").append(ev.getModeParament().getCurPage() + 1).append("页。' ");
				List<Map<String, String>> list = ev.getModeParament().getDatatemp();
				cls.addAll(list);
				list.clear();
				//IndexManager.Instance();
				sb.notifyAll();
			}

		}

		protected List<Map<String, String>> getCls() {
			return cls;
		}

	}

	/**
	 * 
	 * 任务结束
	 *
	 * @author Administrator
	 * @version 1.0
	 */
	class endtask implements Listener {
		final private StringBuffer sb;
		
		final private List<Map<String, String>> cls;

		protected List<Map<String, String>> getCls() {
			return cls;
		}

		public endtask(StringBuffer sb,List<Map<String, String>> cls) {
			this.sb = sb;
			this.cls=cls;
		}

		@Override
		public void execute(Event ev) {
			synchronized (sb) {
				sb.delete(0, sb.length());
				sb.append(" state : 'end' ");
				sb.append(", url : '").append(ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(", msg:'' ");
				List<Map<String, String>> list = ev.getModeParament().getDatatemp();
				cls.addAll(list);
				list.clear();
				sb.notifyAll();
			}

		}

	}

	/**
	 * 
	 * 测试网络
	 * @param url
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	private boolean testNet(String url, HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpClient client = new DefaultHttpClient();
			HttpGet httget = new HttpGet(url);
			HttpResponse rp;
			rp = client.execute(httget);
			HttpEntity entity = rp.getEntity();
			EntityUtils.toString(entity);
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.getLogger(this.getClass().getSimpleName()).error(e);
			response.getWriter().write(this.getStatusJson(AppStatus.error, "访问该网站失败！"));
			return false;
		}
		return true;
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
