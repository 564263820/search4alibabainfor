/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.http.client.ClientProtocolException;

import net.htmlparser.jericho.Source;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.Ipaser.IPaser;
import com.wjdeng.client.model.ctronl.event.Event;
import com.wjdeng.client.model.ctronl.event.Listener;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.ExcelUtils;
import com.wjdeng.imp.URLContentManage;

/**
 * 
 * 
 * 
 * @author Administrator
 * @version 1.0
 * @since
 */
public class AppContext implements Runnable {
	/**
	 * 运行环境参数集合
	 */
	ThreadLocal<ModeParament> parLoacl = new ThreadLocal<ModeParament>();
	/**
	 * 运行环境参数
	 */
	private final ModeParament par;

	public ModeParament getModeParament() {
		return this.par;
	}

	private AppContext(ModeParament par) {
		this.par = par;
	}

	public static AppContext getAppContext(String url, Integer deep)
			throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception("暂不支持该：" + url + "网站？");
		}
		par.setDeep(deep);
		par.setEntranceUrl(url);
		return new AppContext(par);
	}

	public static AppContext getAppContext(String url) throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception("暂不支持该：" + url + "网站？");
		}
		par.setEntranceUrl(url);
		return new AppContext(par);
	}

	public static AppContext getAppContext(ModeParament par) throws Exception {
		if (par == null) {
			return null;
		}
		return new AppContext(par);
	}

	public static IPaser getHtmlPaser(ModeParament par) {
		if (par == null)
			return null;
		if (!"".equals(SysUtils.trim2empty(par.getModeclass()))) {
			try {
				IPaser paser = (IPaser) Class.forName(par.getModeclass())
						.newInstance();
				return paser;
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static ModeParament getModeParamentByUrl(String url)
			throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception(url + "未找到解析器，请检查配置。" + url + "是否是目前能够解析的网站？");
		}
		return par;
	}

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	public void addListener4End(Listener listener) {
		if (null != listener) {
			this.par.addListener4End(listener);
		}

	}

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	public void addListener4AfterPaserInfor(Listener listener) {
		if (null != listener) {
			this.par.addListener4AfterPaserInfor(listener);
		}

	}

	/**
	 * 增加一个翻页事件
	 * 
	 * @param listener
	 */
	public void addListener4AfterNextPage(Listener listener) {
		if (null != listener) {
			this.par.addListener4AfterNextPage(listener);
		}
	}

	/**
	 * 
	 * 执行一个命令
	 * 
	 * @param command
	 */
	public static void exeCommand(Command command, ModeParament par) {
		if (par != null && command != null) {
			command.executCommand(par);
		}
	}

	@SuppressWarnings("unchecked")
	public ModeParament getContent() throws ClientProtocolException,
			IOException {
		ModeParament par = getModeParament();// 解析模块运行时环境
		parLoacl.set(par);
		Document doc = getHtmlDocByUrl(par.getEntranceUrl());
		IPaser paser = getHtmlPaser(par);// 获取解析器
		DefaultPaserAdapter dpa = new DefaultPaserAdapter(doc, paser, this);// 创建循环迭代
																			// 代理
		Set<String> pages = new HashSet<String>();// 已经解析过资料的url地址 过滤重复地址
		Document doct = doc;
		par.setCurDoc(doct);
		int deep = par.getDeep();
		int tem=0;
		do{
			Set<String> urlset= dpa.getPageListUrl(doct);
			for(String purl :urlset){
				if(par.isEndTask())return par;//任务结束
				if(tem== deep)return par;
				if(pages.contains(purl))continue;// 过滤重复地址
				pages.add(purl);
				Document temDoc = this.getHtmlDocByUrl(purl);
				Map<String, String> datatemp = dpa.execuPaseInforPage(temDoc);
				par.setCurDoc(temDoc);
				par.addDatatemp(datatemp);// 获取的当前客户数据存入参数对象中并触发解析一个客户数据成功事件
				par.getMlist().add(datatemp);
			}
			tem++;
			par.setCurPage(tem);
			if (tem == deep)
				break;
			doct = dpa.nextUrl();// 下一页
		}while(dpa.hasNext());
		return par;
	}

	/**
	 * 
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	public Document getHtmlDocByUrl(String url) {
		ModeParament par = parLoacl.get();
		URLContentManage um = par.getUrlConnectio();
		Map<String, Object> map = null;
		String str = "";
		try {
			url=enrichUrl(url);
			if("get".equals(par.getMethod())){
					map = um.getContentByURL(url,true);
			}else{
				map = um.getContentByURL(url);
			}
			str = (String) map.get(URLContentManage.KEY_CONTENT);// 抓取到的页面html
		} catch (Exception e) {
			LogUtil.getLogger(this.getClass().getSimpleName()).error(
					" 抓取" + url + "失败");
			e.printStackTrace();
		}
		// System.out.println(str);
		StringUtils.wirtfile(str);
		return new Document(new Source(str), url);
	}
	
	private String enrichUrl(String url){
		if(url.indexOf("http:")==-1 && url.indexOf(".")==-1){
			return par.getUrl()+url;
		}else if(url.indexOf("http:")==-1 && url.indexOf(".")!=-1){
			return "http://"+url;
		}
		return url;
	}
	
	
	
	
	
	public static void main(String[] s){
		try {
			// List<Map<String,String>> mlist =
			// AppContext.getAppContext().getContent("http://www.alibaba.com/trade/search?SearchText=zhejiang&Country=&CatId=43&IndexArea=product_en&fsb=y");
			// List<Map<String,String>> mlist =
			// AppContext.getAppContext().getContent("http://www.busytrade.com/selling-leads/3-185/Folk-Crafts.html");
			// http://www.busytrade.com/selling-leads/2-2064/Toy-Agents.html
			// String url
			// ="http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&query=auto+part&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
			// String url =
			// "http://www.alibaba.com/products/christmas_items/CN----Zhejiang------------_1-CN,------------.html";
			// ModeParament par = AppContext.getAppContext(url).getContent();
			//String url = "http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
			String url = "http://www.alibaba.com/LED-Bulbs-Tubes_sid390402?npp=390402--CN----Anhui";
			// boolean b=
			// url.equals("http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true");
			// System.out.println(b);
			AppContext app = AppContext.getAppContext(url, 18);
			Thread th = new Thread(app);
			//List<Map<String,String>> mlist = AppContext.getAppContext().getContent("http://www.alibaba.com/trade/search?SearchText=zhejiang&Country=&CatId=43&IndexArea=product_en&fsb=y");
			//List<Map<String,String>> mlist = AppContext.getAppContext().getContent("http://www.busytrade.com/selling-leads/3-185/Folk-Crafts.html");
			//http://www.busytrade.com/selling-leads/2-2064/Toy-Agents.html
			//String url ="http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&query=auto+part&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
			//ModeParament par = AppContext.getAppContext(url).getContent();
			//String url =  "http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
		    //boolean b= url.equals("http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true");
			//System.out.println(b);
		    //AppContext  app =AppContext.getAppContext(url,18);
			//Thread th= new Thread(app);
			th.start();
			ModeParament par = app.getModeParament();
			par.addListener4AfterNextPage(new Listener() {
				@Override
				public void execute(Event ev) {
					// System.out.println("分页了哈");

				}
			});
			par.addListener4AfterPaserInfor(new Listener() {
				@Override
				public void execute(Event ev) {
					ev.getModeParament().getDatatemp();
					// System.out.println("一个");
					// ev.getModeParament().getCurDoc().getUrl();
				}
			});
			par.addListener4End(new Listener() {
				@Override
				public void execute(Event ev) {
					// ev.getModeParament().getDatatemp();
					 System.out.println("抓完");
					ExcelUtils eu = new ExcelUtils();
					eu.createExcelUtil(ev.getModeParament().getMlist());
				}
			});
			// ev.getModeParament().getCurDoc().getUrl();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		try {
			this.getContent();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
