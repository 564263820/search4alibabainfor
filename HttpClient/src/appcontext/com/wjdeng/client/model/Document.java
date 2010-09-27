/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 30, 2010
 * File Name       : Document.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import net.htmlparser.jericho.Attribute;
import net.htmlparser.jericho.Attributes;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;

public class Document extends Segment {

	private final String url;

	public Document(Source source, String url) {
		super(source, source.getBegin(), source.getEnd());
		this.url = url;
	}

	public String getUrl() {
		return url;
	}
	
	/**
	 * 
	 * 获取id节点的json字符串<br>
	 * 要获取Element调用 getSource().getElementById(id);
	 * @param id
	 * @return
	 */
	public String getElementById(String id){
		//super.get
		StringBuilder sb  = new StringBuilder();
		Element  ele= this.getSource().getElementById(id);
		sb.append("{ local:'").append(ele.getBegin()).append("' ");//位置
		Attributes  atts = ele.getAttributes();
		for(Attribute att : atts){
			sb.append(att.getName()).append(":'").append(att.getValue());
		}
		return "";
	}

}
