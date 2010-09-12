/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 3, 2010
 * File Name       : PaserCtroLServlet.java
 *
 ********************************************************************************/
package com.wjdeng.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
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

import com.wjdeng.client.model.ctronl.AppContext;
import com.wjdeng.client.model.ctronl.AppStatus;
import com.wjdeng.client.model.ctronl.ContinueRunCommand;
import com.wjdeng.client.model.ctronl.ModeParament;
import com.wjdeng.client.model.ctronl.PuaseCommand;
import com.wjdeng.client.model.ctronl.event.Event;
import com.wjdeng.client.model.ctronl.event.Listener;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.ExcelUtils;

public class PaserCtroLServlet extends HttpServlet {
	
	private static String nullKey="end";
	
	static public Map<String,ModeParament> map = new HashMap<String,ModeParament>();
	
	static public Map<String,StringBuffer> writContentMap = new HashMap<String,StringBuffer>();

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
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	
	private void downloadExcel(HttpServletResponse response,ModeParament par){
		if(par==null)return;
		response.setContentType("application/x-msdownload");
		String fileName = par.getModeName()+SysUtils.formatDateTime(System.currentTimeMillis())+".xls";
		ExcelUtils eu = new ExcelUtils();
		try {
			fileName =new String(fileName.getBytes("GBK"),"iso8859-1");
			response.setHeader("Content-Disposition", "attachment; filename="+fileName);
			synchronized(par){
				eu.createExcelUtil(par,response.getOutputStream());
			}
		}  catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(final HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {
		//this.getServletContext().getRequestDispatcher(path);
		//System.out.print(request.getRequestedSessionId());
		response.setHeader("Cache-Control", "no-cache");
		response.setContentType("text/html;charset=UTF-8");  
		String url = request.getParameter("url");
		url =java.net.URLDecoder.decode(url,"utf-8");
		String operation = request.getParameter("operation");
		ModeParament par =map.get(request.getRequestedSessionId());
		if(par==null){
			/*if(!SysUtils.IsUrl(url)){
				response.getWriter().write(getStatusJson(AppStatus.error,"填写的网址不正确！"));
				return;
			}*/
			if(!this.testNet(url, request, response))return;
		}
		if("retry".equals(operation)){
			writContentMap.remove(request.getRequestedSessionId());
			map.remove(request.getRequestedSessionId());
			if(null != par){
				AppContext.exeCommand(new PuaseCommand(), par);//停止
			}
			par = null;
		}else if("pause".equals(operation)){
			AppContext.exeCommand(new PuaseCommand(), par);//暂停
			response.getWriter().write(getStatusJson(AppStatus.end,"暂停!"));
			return;
		}else if("continuerun".equals(operation)){
			AppContext.exeCommand(new ContinueRunCommand(), par);//继续 回复运行
		}else if("downloadExcel".equals(operation)){
			this.downloadExcel(response, par);
			return;
		}
		StringBuffer sb = writContentMap.get(request.getRequestedSessionId());
		if(sb==null){
			sb = new StringBuffer();
			sb.append(nullKey);
			writContentMap.put(request.getRequestedSessionId(),sb);
		}
		try {
			if(!"running".equals(StringUtils.trim2null(operation))){//任务没有在运行中
				this.runTask(sb, par, request);//执行任务
			}
			par =map.get(request.getRequestedSessionId());
			
			while(true){
				Thread.sleep(50);
				StringBuffer content = writContentMap.get(request.getRequestedSessionId());
				synchronized(content){
					if(!(content.length()==3 && content.indexOf(nullKey)==0)){
						response.getWriter().write(content.toString());
						content.delete(0, content.length());
						content.append(nullKey);
						return;
					}else if(par.isEndTask()){
						response.getWriter().write(getStatusJson(AppStatus.end,"任务终止!"));
						return;
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			LogUtil.getLogger(this.getClass().getSimpleName()).error(e);
			PrintWriter p = new PrintWriter(SysUtils.getFilePath("log"));
			e.printStackTrace(p);
			p.flush();
			p.close();
			response.getWriter().write(getStatusJson(AppStatus.error,e.getMessage()));
		}
	}
	
	private void runTask(StringBuffer sb,ModeParament par,HttpServletRequest request) throws Exception{
		String url = request.getParameter("url");
		url =java.net.URLDecoder.decode(url,"utf-8");
		String deepStr = request.getParameter("deep");
		Integer deep =-1;
		if(StringUtils.trim2null(deepStr)!=null ){
			deep = new Integer(deepStr).intValue();
		}
		//String operation = request.getParameter("operation");
		AppContext app;
		if(par ==null ){
			app = AppContext.getAppContext(url,deep);
		}else {
			app = AppContext.getAppContext(par);
		}
		par =app.getModeParament();
		map.put(request.getRequestedSessionId(), par);
		final Thread th= new Thread(app);
		th.start();
		app.addListener4AfterNextPage(new nextPage(sb));
		app.addListener4AfterPaserInfor(new getPageInfor(sb));
		app.addListener4End(new endtask(sb));
	}
	
	
	private String getStatusJson(AppStatus satu ,String msg){
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
	
	private void creatJson(List<Map<String, String>> list ,StringBuffer sb){
		for(Map<String,String> map : list){
			StringBuffer temp = new StringBuffer();
			Set<String> keys = map.keySet();
			for(String key : keys){
				if(StringUtils.trim2null(key)==null) continue;
				temp.append("'").append(StringUtils.string2Json(StringUtils.trim2empty(key))).append("':'");
				temp.append(StringUtils.string2Json(StringUtils.trim2empty(map.get(key)))).append("',");
			}
			if(temp.length()>0){
				temp.delete(temp.length()-1, temp.length());
				temp.insert(0, "{");
				temp.append("},");
				sb.append(temp);
			}
		}
		list.clear();
	}
	
	class getPageInfor implements Listener{
		private StringBuffer sb;
		public getPageInfor(StringBuffer sb){
			this.sb = sb;
		}

		@Override
		public void execute(Event ev) {
			synchronized(sb){
				if(!(sb.length()==3 && sb.indexOf(nullKey)==0))return;
				sb.delete(0, sb.length());
				List<Map<String, String>> list= ev.getModeParament().getDatatemp();
				creatJson(list,sb);
				if(sb.length()>0){
					sb.delete(sb.length()-1, sb.length());
				}
				sb.insert(0, "{ data:[");
				sb.append("]");
				sb.append(", state : 'running' ");
				sb.append(", url : '").append(ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(",msg:'' }");
			}
		}
	}
	
	class nextPage implements Listener{
		private StringBuffer sb;
		public nextPage(StringBuffer sb){
			this.sb = sb;
		}
		

		@Override
		public void execute(Event ev) {
			synchronized(sb){
				if(!(sb.length()==3 && sb.indexOf(nullKey)==0))return;
				sb.delete(0, sb.length());
				List<Map<String, String>> list= ev.getModeParament().getDatatemp();
				creatJson(list,sb);
				if(sb.length()>0){
					sb.delete(sb.length()-1, sb.length());
				}
				sb.insert(0, "{ data:[");
				sb.append("]");
				sb.append(", state : 'running' ");
				sb.append(", url : '").append(ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(", msg:'分页完成!当前第：").append(ev.getModeParament().getCurPage()+1).append("页。' }");
			}
			
		}
		
	}
	
	class endtask implements Listener{
		private StringBuffer sb;
		public endtask(StringBuffer sb){
			this.sb = sb;
		}
		

		@Override
		public void execute(Event ev) {
			synchronized(sb){
				if(!(sb.length()==3 && sb.indexOf(nullKey)==0))return;
				sb.delete(0, sb.length());
				List<Map<String, String>> list= ev.getModeParament().getDatatemp();
				creatJson(list,sb);
				if(sb.length()>0){
					sb.delete(sb.length()-1, sb.length());
				}
				sb.insert(0, "{ data:[");
				sb.append("]");
				sb.append(", state : 'end' ");
				sb.append(", url : '").append(ev.getModeParament().getCurDoc().getUrl()).append("'");
				sb.append(",msg:'' }");
			}
			
		}
		
	}
	
	
	private boolean  testNet(String url,HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
		try{
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
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
	}

}

