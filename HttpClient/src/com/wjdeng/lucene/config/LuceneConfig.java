/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 14, 2010
 * File Name       : LuceneConfig.java
 *
 ********************************************************************************/
package com.wjdeng.lucene.config;

import org.apache.lucene.document.Field;


final public class LuceneConfig {

	final public static class IndexFeild {
		/**搜索关键字（此条记录是通过该关键在网站上搜索出的结果）*/
		public static final String IndexKeyWord="IndexKeyWord";
		
		public static final  String CompanyName="CompanyName";
		
		public static final  String Websit="Websit";
		
		public static final  String Address="Address";
		
		public static final  String Fax="Fax";
		
		public static final  String Tel="Tel";
		
		public static final  String Mobile="Mobile";
		
	}
	
	public static final class STORE {
		
		public static final Field.Store IndexKeyWord=Field.Store.YES;
		
		public static final Field.Store CompanyName=Field.Store.YES;
		
		public static final Field.Store Websit=Field.Store.YES;
		
		public static final Field.Store Address=Field.Store.YES;
		
		public static final Field.Store Fax=Field.Store.YES;
		
		public static final Field.Store Tel=Field.Store.YES;
		
		public static final Field.Store Mobile=Field.Store.YES;
		
	}
	
	
	public static final class INDEX {
		
		public static final Field.Index IndexKeyWord = Field.Index.ANALYZED;//分词 并索引
		
		public static final Field.Index CompanyName = Field.Index.ANALYZED;//分词 并索引
		
		public static final Field.Index Websit = Field.Index.ANALYZED;//分词 并索引
		
		public static final Field.Index Address = Field.Index.ANALYZED;//分词 并索引
		
		public static final Field.Index Fax = Field.Index.NOT_ANALYZED;//不分词但索引
		
		public static final Field.Index Tel = Field.Index.ANALYZED;//分词 并索引
		
		public static final Field.Index Mobile = Field.Index.ANALYZED;//分词 并索引

		
	}
}
