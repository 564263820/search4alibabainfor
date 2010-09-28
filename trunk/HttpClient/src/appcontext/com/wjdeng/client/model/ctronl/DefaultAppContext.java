/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : AppContext.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import net.htmlparser.jericho.Source;

import org.apache.http.client.ClientProtocolException;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.api.AppContext;
import com.wjdeng.client.model.api.IPaser;
import com.wjdeng.client.model.ctronl.event.Event;
import com.wjdeng.client.model.ctronl.event.Listener;
import com.wjdeng.client.util.LogUtil;
import com.wjdeng.client.util.StringUtils;
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
public class DefaultAppContext implements AppContext {
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

	private DefaultAppContext(ModeParament par) {
		this.par = par;
	}
	
	public void setAttribute(String key,Object value){
		par.setAttribute(key, value);
	}
	
	public Object getAttribute(String key){
		return par.getAttribute(key);
	}

	public static AppContext Instance(String url, Integer deep)
			throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception("暂不支持该：" + url + "网站？");
		}
		par.setDeep(deep);
		par.setEntranceUrl(url);
		return new DefaultAppContext(par);
	}

	public static AppContext Instance(String url) throws Exception {
		ModeParament par = ModelManager.getModeParamByUrlString(url);
		if (par == null) {
			throw new Exception("暂不支持该：" + url + "网站？");
		}
		par.setEntranceUrl(url);
		return new DefaultAppContext(par);
	}

	public static AppContext Instance(ModeParament par) throws Exception {
		if (par == null) {
			return null;
		}
		return new DefaultAppContext(par);
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
		IPaser paser = ModelManager.getHtmlPaser(par);// 获取解析器
		DefaultPaserAdapter dpa = new DefaultPaserAdapter(doc, paser, this);// 创建循环迭代
																			// 代理
		Set<String> pages = new HashSet<String>();// 已经解析过资料的url地址 过滤重复地址
		Document doct = doc;
		par.setCurDoc(doct);
		int deep = par.getDeep();
		int tem=0;
		do{
			Set<String> urlset= dpa.getPageListUrl(doct,this);
			for(String purl :urlset){
				if(par.isEndTask())return par;//任务结束
				if(tem== deep)return par;
				if(pages.contains(purl))continue;// 过滤重复地址
				pages.add(purl);
				Document temDoc = this.getHtmlDocByUrl(purl);
				Map<String, String> datatemp = dpa.execuPaseInforPage(temDoc,this);
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
		String str = this.getContentByUrl(url);
		return new Document(new Source(str), url);
	}
	
	/**
	 * 
	 * 获取指定地址的内容
	 * @param url
	 * @return
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	public String getContentByUrl(String url) {
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
		StringUtils.wirtfile(str);
		return str;
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
			//String url1 = "http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
			String url1 = "http://www.alibaba.com/Inflatable-Toys_sid2620?npp=2620--CN----Zhejiang--------------------";
			// boolean b=
			// url.equals("http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true");
			// System.out.println(b);
			String url = "http://www.alibaba.com/Toy-Cars_sid2606?npp=2606--CN----Shanghai--------------------";
			//String url3= "http://www.alibaba.com/Toy-Cars_sid2606?npp=2606--CN----Zhejiang--------------------";
			String url4="http://www.alibaba.com/Toy-Cars_sid2606?npp=2606--CN----Jiangsu--------------------";
			String url5="http://www.alibaba.com/Toy-Cars_sid2606?npp=2606--CN----Anhui--------------------";
			
			String url2="http://www.alibaba.com/Fitness-Body-Building_sid2009?npp=2009--CN----Zhejiang--------------------";
			//	String url = "AppContext app = AppContext.getAppContext(url, 18)";
			//List<Map<String,String>> mlist = AppContext.getAppContext().getContent("http://www.alibaba.com/trade/search?SearchText=zhejiang&Country=&CatId=43&IndexArea=product_en&fsb=y");
			//List<Map<String,String>> mlist = AppContext.getAppContext().getContent("http://www.busytrade.com/selling-leads/3-185/Folk-Crafts.html");
			//http://www.busytrade.com/selling-leads/2-2064/Toy-Agents.html
			//String url ="http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&query=auto+part&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
			//ModeParament par = AppContext.getAppContext(url).getContent();
			//String url =  "http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true";
		    //boolean b= url.equals("http://www.globalsources.com/gsol/GeneralManager?&design=clean&language=en&supplier_search=off&stateVal=Zhejiang&query=christmas+items&loc=t&type=new&point_search=on&product_search=on&search_what=1&page=search/ProductSearchResults&ctryVal=China%20(mainland)&action=GetPoint&action=DoFreeTextSearch&AGG=N&cpallfrProd=kw&compare_table=true&point_id=3000000149681&catalog_id=2000000003844&supp_list=true");
			//System.out.println(b);
			String url6= "http://www.alibaba.com/Fitness-Body-Building_sid2009?npp=2009--CN----Zhejiang--------------------";
			String url7= "http://www.alibaba.com/Fitness-Body-Building_sid2009?npp=2009--CN----Shanghai--------------------";
			String url8= "http://www.alibaba.com/Fitness-Body-Building_sid2009?npp=2009--CN----Jiangsu--------------------";
			String url9= "http://www.alibaba.com/Fitness-Body-Building_sid2009?npp=2009--CN----Anhui--------------------";
			String url0= "http://www.made-in-china.com/productdirectory.do?action=hunt&code=2300000000&order=0&style=b&page=1&memberLevel=&asFlag=&comProvince=nolimit&propertyValues=&from=hunt&word=scooter&mode=and&comName=&comCode=&subCode=&size=30&viewType=1&toTradeMarkets=&sizeHasChanged=0&viewMoreOrLessClass=viewMore";
		    AppContext  app =DefaultAppContext.Instance(url0,40);
			Thread th = new Thread(app);
			//Thread th= new Thread(app);
			th.start();
			
			/*AppContext  app2 =AppContext.getAppContext(url1,40);
			Thread th2 = new Thread(app2);
			th2.start();
			
			AppContext  app3 =AppContext.getAppContext(url3,40);
			Thread th3 = new Thread(app3);
			th3.start();
			
			AppContext  app4 =AppContext.getAppContext(url4,40);
			Thread th4 = new Thread(app4);
			th4.start();
			
			
			AppContext  app5 =AppContext.getAppContext(url5,40);
			Thread th5 = new Thread(app5);
			th5.start();*/
			
			ModeParament par = app.getModeParament();
			par.addListener4AfterNextPage(new Listener() {
				@Override
				public void execute(Event ev) {
					 System.out.println("分页了哈");

				}
			});
			par.addListener4AfterPaserInfor(new Listener() {
				@Override
				public void execute(Event ev) {
					System.out.println(ev.getModeParament().getUrl());
				}
			});
			par.addListener4End(new Listener() {
				@Override
				public void execute(Event ev) {
					// ev.getModeParament().getDatatemp();
					System.out.println(System.currentTimeMillis());
					/*List<Map<String, String>>  list =ev.getModeParament().getDatatemp();
					for(Map<String, String> map :list){
						IndexManager.Instance().writeIndex(map);
					}
					System.out.println(System.currentTimeMillis());
					IndexManager.Instance().doFlush();*/
					 System.out.println("抓完");
					ExcelUtils eu = new ExcelUtils();
					eu.createExcelUtil(ev.getModeParament());
					//Map<String, String> rmap = new HashMap<String, String>();
					//rmap.put("CompanyName", "Industrial");
					/*List<Map<String, String>> re=SearchService.Instance().searchAll(rmap);
					for(Map<String, String> rm: re){
						StringBuilder sb = new StringBuilder();
						for(String key:rm.keySet()){
							sb.append(key+":"+rm.get(key) +" |  ");
						}
						System.out.println(sb.toString());
					}*/
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
