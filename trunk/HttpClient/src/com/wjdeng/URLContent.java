/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 22, 2010
 * File Name       : URLContent.java
 ********************************************************************************/
package com.wjdeng;

import java.util.Map;

/**
 * 
 * urlԴ��ȡ
 *
 * @author JoveDeng
 * @version 1.0
 * @since Apex OssWorks 5.5
 */
public interface URLContent {

	public Map<String, Object> getContentByURL(String url) throws Exception;
}
