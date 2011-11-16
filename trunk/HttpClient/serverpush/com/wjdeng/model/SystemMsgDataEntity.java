package com.wjdeng.model;

import java.io.Serializable;


/**
 * @hibernate.class dynamic-insert="true" dynamic-update="true" table="itsm_system_msg" lazy="true"
 * 
 */
public class SystemMsgDataEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;// 数据库自曾ID

	private Long createTime; // 创建时间

	private User createUser; // 创建人
	
	private User receiver; // 接收人

	private String title; // 标题

	private String memo; // 描述

	private Boolean read; // 是否阅读

	private Boolean disable; // 是否失效

	private String newTitle; // 用于页面展示
	
	private String url;//处理地址
	
	public SystemMsgDataEntity(){
		
	}
	
	public SystemMsgDataEntity(SystemMsgDataEntity model){
	    this.createTime  = model.getCreateTime();
	    this.createUser = model.getCreateUser();
	    this.receiver = model.getReceiver();
	    this.title = model.getTitle();
	    this.memo = model.getMemo();
	    this.disable = model.disable;
	    this.newTitle = model.getNewTitle();
	    this.url = model.url;
	}
	
	//浏览器页面key值,不存储.此属性为系统系统生成
	private String clientKey;

	/**
	 * @hibernate.property  type="string"
	 * @return
	 */
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


	/**
	 * @hibernate.id column="id" generator-class="native" type="long"
	 * @return
	 */
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	/**
	 * @hibernate.property type="long"
	 * @return
	 */
	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	/**
	 * @hibernate.many-to-one class="com.tekview.apex.itsm.common.bo.security.User" column="createUser" not-null="false" 
	 * @return
	 */
	public User getCreateUser() {
		return createUser;
	}

	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}

	/**
	 * @hibernate.property type="string"
	 * @return
	 */
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @hibernate.property  type="string" length="20000"
	 * @return
	 */
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

	/**
	 * 
	 * @hibernate.property type="boolean"
	 */
	public Boolean getRead() {
		return read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	/**
	 * 
	 * @hibernate.property type="boolean"
	 */
	public Boolean getDisable() {
		return disable;
	}

	public SystemMsgDataEntity setDisable(Boolean disable) {
		this.disable = disable;
		return this;
	}

	/**
	 * @hibernate.many-to-one class="com.tekview.apex.itsm.common.bo.security.User" column="receiver" not-null="true"
	 * @return
	 */
	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public String getClientKey() {
		return clientKey;
	}

	public SystemMsgDataEntity setClientKey(String clientKey) {
		this.clientKey = clientKey;
		return this;
	}

}
