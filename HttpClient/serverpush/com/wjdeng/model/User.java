/******************************************************************************** 
 * Create Author   : jove
 * Create Date     : Oct 14, 2009
 * File Name       : User.java
 ********************************************************************************/
package com.wjdeng.model;


/**
 * @author jove
 * @version 1.0
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
	
	public User() {
	}

	public User(long id) {
		this.id = id;
	}

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
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

}