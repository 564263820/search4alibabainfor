/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 25, 2010
 * File Name       : ModeParament.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.ctronl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wjdeng.client.model.Document;
import com.wjdeng.client.model.ctronl.event.Event;
import com.wjdeng.client.model.ctronl.event.Listener;
import com.wjdeng.imp.URLContentManage;

/**
 * 参数模块，记录解析模块的各种状态及待处理事件
 * 
 * @author jiage
 * 
 */
public class ModeParament {

	URLContentManage urlConnectio = new URLContentManage();
	/**
	 * 模块名
	 */
	private final String modeName;

	/** 解析器 */
	private final String modeclass;

	/** 解析模块网站域名 */
	private final String url;

	/**
	 * 入口地址
	 */
	private String entranceUrl;

	/**
	 * 页面抓取翻页深度
	 */
	private Integer deep = -1;

	private String method;

	/**
	 * 当前正在处理的页数
	 */
	private Integer curPage =0;

	/**
	 * 当前主文档
	 */
	private Document curDoc;

	private boolean endTask = false;

	/**
	 * 最新新抓取的临时页面数据
	 */
	private List<Map<String, String>> datatemp = new ArrayList<Map<String, String>>();

	/**
	 * 抓取的数据集合
	 */
	private List<Map<String, String>> mlist = new ArrayList<Map<String, String>>();

	/**
	 * 解析一个客户数据成功事件列表
	 */
	private List<Listener> afterPaserInforList = new ArrayList<Listener>();

	/**
	 * 抓取一分页后事件列表
	 */
	private List<Listener> afterNextPageList = new ArrayList<Listener>();

	/**
	 * 抓取结束事件列表
	 */
	private List<Listener> endListenerList = new ArrayList<Listener>();

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	void addListener4End(Listener listener) {
		if (null != listener) {
			this.endListenerList.add(listener);
		}

	}

	/**
	 * 增加一个解析后的事件
	 * 
	 * @param listener
	 */
	void addListener4AfterPaserInfor(Listener listener) {
		if (null != listener) {
			this.afterPaserInforList.add(listener);
		}

	}

	/**
	 * 增加一个翻页事件
	 * 
	 * @param listener
	 */
	void addListener4AfterNextPage(Listener listener) {
		if (null != listener) {
			this.afterNextPageList.add(listener);
		}
	}

	public ModeParament(String startUrl, String paserClass, String modeName) {
		this.url = startUrl;
		this.modeclass = paserClass;
		this.modeName = modeName;
	}

	public String getModeName() {
		return modeName;
	}

	public String getModeclass() {
		return modeclass;
	}

	public String getUrl() {
		return url;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public List<Map<String, String>> getMlist() {
		return mlist;
	}

	public void setMlist(List<Map<String, String>> mlist) {
		this.mlist = mlist;
	}

	public Integer getCurPage() {
		return curPage;
	}

	public Document getCurDoc() {
		return curDoc;
	}

	public List<Map<String, String>> getDatatemp() {
		return datatemp;
	}

	/**
	 * 当前正在处理的文档
	 * @param curDoc
	 */
	protected void setCurDoc(Document curDoc) {
		this.curDoc = curDoc;
	}

	/**
	 * 重新设置当前所在页面
	 * 
	 * @param curPage
	 */
	protected void setCurPage(Integer curPage) {
		if (curPage != null) {
			this.curPage = curPage;
			this.notifyafterNextPageListner();
		}
		if (this.curPage == this.deep) {
			this.notifyafterEndListner();
		}
	}

	protected void addDatatemp(Map<String, String> datatemp) {
		if (null != datatemp) {
			this.datatemp.add(datatemp);
			this.notifyAfterPaserListner();
		}
	}

	/**
	 * 广播解析一个客户信息完成
	 */
	private void notifyAfterPaserListner() {
		final ModeParament tem = this;
		for (Listener listener : this.afterPaserInforList) {
			listener.execute(new Event() {
				@Override
				public ModeParament getModeParament() {
					return tem;
				}
			});
		}
	}

	/**
	 * 广播进行一个分页后
	 */
	private void notifyafterNextPageListner() {
		final ModeParament tem = this;
		for (Listener listener : this.afterNextPageList) {
			listener.execute(new Event() {
				@Override
				public ModeParament getModeParament() {
					return tem;
				}
			});
		}
	}

	/**
	 * 广播指定任务完成
	 */
	private void notifyafterEndListner() {
		final ModeParament tem = this;
		for (Listener listener : this.endListenerList) {
			listener.execute(new Event() {
				@Override
				public ModeParament getModeParament() {
					return tem;
				}
			});
		}
		this.setEndTask(true);
	}

	protected Integer getDeep() {
		return deep;
	}

	protected String getEntranceUrl() {
		return entranceUrl;
	}

	protected void setEntranceUrl(String entranceUrl) {
		this.entranceUrl = entranceUrl;
	}

	protected void setDeep(Integer deep) {
		this.deep = deep;
	}

	public boolean isEndTask() {
		return endTask;
	}

	void setEndTask(boolean endTask) {
		this.endTask = endTask;
	}

	protected URLContentManage getUrlConnectio() {
		return urlConnectio;
	}
}
