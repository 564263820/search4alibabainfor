/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 30, 2010
 * File Name       : Document.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;

public class Document extends Segment {
	
	private final String url;
	
	public Document(Source source,String url) {
		super(source, source.getBegin(), source.getEnd());
		this.url = url;
	}

	public String getUrl() {
		return url;
	}
	

}

