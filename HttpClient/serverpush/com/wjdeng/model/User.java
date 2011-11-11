/******************************************************************************** 
 * Create Author   : Andy Cui
 * Create Date     : Oct 14, 2009
 * File Name       : User.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 * @author Apex Team
 * @version 1.0
 * @since Apex OssWorks 5.5
 * 
 * @hibernate.class dynamic-insert="true" dynamic-update="true"
 *                  table="apex_user" lazy="false"
 * @hibernate.cache usage="read-write"
 */
public class User implements java.io.Serializable {

	private static final long serialVersionUID = 2500471860354748649L;

	private long id;

	/** 登录时用的用户名，不是姓名 */
	private String name;

	/** 真实姓名 */
	private String realName;

	/** 密码（需加密） */
	private String password;

	/** 用户状态（1 ：启用；２ ：禁用；其他预留） */
	private int enabled;

	/** 是否可以删除,默认可以删除 */
	private boolean deletable = true;

	/** 是否在线 ,默认为不在线 */
	private boolean online = false;

	/** 最后一次登陆时间 */
	private long lastLoginTime;


	private String taskNotifier;

	/** 邮编 */
	private String zipcode;

	/** 国家 */
	private String country;

	/** 城市 */
	private String city;

	/** 具体住址 */
	private String address;

	/** 手机号码 */
	private String mobile;

	/** 办公电话 */
	private String office;

	/** 传真 */
	private String fax;

	/** 电子邮件 */
	private String mail;

	/** msn */
	private String msn;

	/** 职位 */
	private String title;

	/** 工号 */
	private String employeeNo;

	/**
	 * 上网帐号
	 */
	private String internetAccount;

	/**
	 * 该用户是否是自助式服务台用户，true是自助式服务台用户，false则是运维人员
	 */
	private boolean ssdUser;

	/**
	 * 知识库用户积分
	 */
	private Integer klScores;
	/**
	 * 系统名称，多个系统用逗号分隔，保存个常量，比如存OSS或者NM，<br>
	 */
	private String appName;

	public User() {
	}

	public User(long id) {
		this.id = id;
	}

	/**
	 * hibernate中的主键
	 * 
	 * @hibernate.id column="id" generator-class="native" type="long"
	 *               unsaved-value="0"
	 */
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	/**
	 * 是否可以被删除，比如root不允许被删除
	 * 
	 * @hibernate.property type="boolean"
	 */
	public boolean isDeletable() {
		return deletable;
	}

	public void setDeletable(boolean deletable) {
		this.deletable = deletable;
	}

	/**
	 * 用户帐号名
	 * 
	 * @hibernate.property type="string"
	 * @hibernate.property unique="true"
	 * @hibernate.property not-null="true"
	 */
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 是否在线
	 * 
	 * @hibernate.property type="boolean" column="isOnline"
	 */
	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

	/**
	 * 密码
	 * 
	 * @hibernate.property type="string"
	 */
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * SLA使用
	 * 
	 * @hibernate.property type="string"
	 */
	public String getTaskNotifier() {
		return taskNotifier;
	}

	/**
	 * @param taskNotifier
	 *            the taskNotifier to set
	 */
	public void setTaskNotifier(String taskNotifier) {
		this.taskNotifier = taskNotifier;
	}

	/**
	 * @return 用户状态（1 ：启用；２ ：禁用；其他预留）
	 * @hibernate.property type="int"
	 */
	public int getEnabled() {
		return enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	/**
	 * 
	 * 最后一次登陆时间
	 * 
	 * @hibernate.property type="long"
	 */
	public long getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(long lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	/**
	 * 最后一次登录时间的字符串表示
	 * <p>
	 * 格式 ：yyyy-MM-dd HH:mm:ss
	 * 
	 * @return
	 */
	public String getLastLoginTimeStr() {
		if (this.lastLoginTime == 0)
			return "";
		Date date = new Date(this.lastLoginTime);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(date);
	}

	/**
	 * @hibernate.property type="boolean"
	 * @return the ssdUser
	 */
	public boolean isSsdUser() {
		return ssdUser;
	}

	/**
	 * @param ssdUser
	 *            the ssdUser to set
	 */
	public void setSsdUser(boolean ssdUser) {
		this.ssdUser = ssdUser;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the realName
	 */
	public String getRealName() {
		return realName;
	}

	/**
	 * @param realName
	 *            the realName to set
	 */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the zipcode
	 */
	public String getZipcode() {
		return zipcode;
	}

	/**
	 * @param zipcode
	 *            the zipcode to set
	 */
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * @param country
	 *            the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the mobile
	 */
	public String getMobile() {
		return mobile;
	}

	/**
	 * @param mobile
	 *            the mobile to set
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the office
	 */
	public String getOffice() {
		return office;
	}

	/**
	 * @param office
	 *            the office to set
	 */
	public void setOffice(String office) {
		this.office = office;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the fax
	 */
	public String getFax() {
		return fax;
	}

	/**
	 * @param fax
	 *            the fax to set
	 */
	public void setFax(String fax) {
		this.fax = fax;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the mail
	 */
	public String getMail() {
		return mail;
	}

	/**
	 * @param mail
	 *            the mail to set
	 */
	public void setMail(String mail) {
		this.mail = mail;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the msn
	 */
	public String getMsn() {
		return msn;
	}

	/**
	 * @param msn
	 *            the msn to set
	 */
	public void setMsn(String msn) {
		this.msn = msn;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @hibernate.property type="string"
	 * @return the employeeNo
	 */
	public String getEmployeeNo() {
		return employeeNo;
	}

	/**
	 * @param employeeNo
	 *            the employeeNo to set
	 */
	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}


	/**
	 * @hibernate.property type="string"
	 * @return the internetAccount
	 */
	public String getInternetAccount() {
		return internetAccount;
	}

	public void setInternetAccount(String internetAccount) {
		this.internetAccount = internetAccount;
	}

	/**
	 * @hibernate.property type="int" column="kl_scores"
	 * @return the klScores
	 */
	public Integer getKlScores() {
		return klScores == null ? 0 : klScores;
	}

	public void setKlScores(Integer klScores) {
		this.klScores = klScores;
	}

	/**
	 * 
	 * @hibernate.property type="string"
	 */
	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

}