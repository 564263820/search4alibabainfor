package com.wjdeng.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;


public class MsgDataModel implements Serializable {
	
	public MsgDataModel() {

	}

	public MsgDataModel(MsgDataModel model) {
		this.createTime = model.getCreateTime();
		this.createUser = model.getCreateUser();
		this.title = model.getTitle();
		this.memo = model.getMemo();
		this.disable = model.disable;
		this.newTitle = model.getNewTitle();
		this.url = model.url;
		this.typeKey = model.getTypeKey();
		this.contentObje = model.contentObje;
	}

	private static final long serialVersionUID = 1L;

	/**
	 * 消息生成时间
	 */
	private Long createTime; 

	/**
	 * 
	// 创建人
	 */
	private Muser createUser; 

	/**
	 * 
	// 接收人
	 */

	/***
	 * 
	// 标题
	 */
	private String title; 
	
	/**
	 * 
	// 描述
	 */
	private String memo;
    
	/**
	 * 
	// 是否失效
	 */
	private Boolean disable = false; 

	/** 用于页面展示
	 * 
	 */
	private String newTitle; 

	/**
	 *
	//处理地址
	 */
	private String url;
	
	/**
	 * js监听事件的类型key, 在js响应页面在获取到该消息后会以该消息为参数调用js监听方法
	 * js示例用法见:SysMSGUtil.js文件中 propmtMsgContext.addMsgListener("INFO",showMSGBox);
	 */
	private String typeKey;

	/**
	 *	浏览器页面key值,此属性为系统系统生成
	 *  对外只读 
	 */
	private String clientKey;

	/***
	 * 消息体中包含的附加信息
	 * 比如说发送一条告警信息给客户端,需要调用  setAttribute( "alarm",alarm);
	 */
	private Map<String, Object> contentObje = new HashMap<String, Object>();

	/***
	 * 
	 * 为消息同种附加一条自定义信息数据(必须是可序列化的)
	 * @param key
	 * @param obj
	 */
	public void setAttribute(String key, Object obj) {
		this.contentObje.put(key, obj);
	}
	
	public Object getAttribute(String key) {
		return this.contentObje.get(key);
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getNewTitle() {
		if (title != null && title.length() > 12) {
			newTitle = title.substring(0, 12) + "...";
			//newTitle = SysUtil.TextToHtml(newTitle);
		} else {
			newTitle = title;
		}
		return newTitle;
	}

	public void setNewTitle(String newTitle) {
		this.newTitle = newTitle;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	public Muser getCreateUser() {
		return createUser;
	}

	public void setCreateUser(DefalutUser createUser) {
		if (createUser != null) {
			this.createUser = new Muser();
			this.createUser.setId(createUser.getId());
			this.createUser.setRealName(createUser.getRealName());
			this.createUser.setName(createUser.getName());
		}
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getCreateUserName() {
		if (createUser != null) {
			return createUser.getRealName();
		} else {
			return "";
		}
	}

	public Boolean getDisable() {
		return disable;
	}

	protected MsgDataModel setDisable(Boolean disable) {
		this.disable = disable;
		return this;
	}


	public String getClientKey() {
		return clientKey;
	}

	protected MsgDataModel setClientKeyS(String clientKey) {
		this.clientKey = clientKey;
		return this;
	}
	
	/**
	 * 发往客户端的user需要尽量精简
	 * @author wjdeng
	 * @version 1.0
	 */
	public class Muser{
		private long id;
		private String name;
		private String RealName;
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getRealName() {
			return RealName;
		}
		public void setRealName(String realName) {
			RealName = realName;
		}
	}

	public String getTypeKey() {
		return typeKey;
	}

	public void setTypeKey(String typeKey) {
		this.typeKey = typeKey;
	}

	public Map<String, Object> getContentObje() {
		return contentObje;
	}

}
