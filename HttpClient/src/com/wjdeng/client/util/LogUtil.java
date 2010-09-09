package com.wjdeng.client.util;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

/**
 * @author 
 */
public class LogUtil {
	
	public static Logger getLogger(String name) {
		return LogManager.getLogger(name);
	}
}