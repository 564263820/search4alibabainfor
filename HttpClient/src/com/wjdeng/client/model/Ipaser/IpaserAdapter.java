/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 27, 2010
 * File Name       : IpaserAdapter.java
 *
 ********************************************************************************/
package com.wjdeng.client.model.Ipaser;

import com.wjdeng.client.model.Document;

public interface IpaserAdapter {
	
	public void setIpaser(IPaser paser);
	
	public boolean hasNext();
	
	public Document nextUrl();

}

