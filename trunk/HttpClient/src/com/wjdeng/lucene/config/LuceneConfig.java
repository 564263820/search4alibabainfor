/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 14, 2010
 * File Name       : LuceneConfig.java
 *
 ********************************************************************************/
package com.wjdeng.lucene.config;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;

import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;

import com.wjdeng.client.util.StringUtils;


final public class LuceneConfig {

	private static String IndexFilePath;
	
	private static Properties FieldMap ;
	
	private static final class STORE{
		private static Map<String, Store> store = new HashMap<String, Store>();
		static{
			store.put("YES", Field.Store.YES);
			store.put("NO", Field.Store.NO);
			store.put("COMPRESS", Field.Store.COMPRESS);
		}
		public static Store getStore(String key){
			key = StringUtils.trim2empty(key)+".Store";
			return store.get(key);
		}
	}
	
	/**
	 * 
	 * 索引方式
	 *
	 * @author Administrator
	 * @version 1.0
	 * @since Apex OssWorks 5.5
	 */
	private static final class INDEX{
		private static Map<String, Index> index = new HashMap<String, Index>();
		static{
			//NO,ANALYZED,NOT_ANALYZED,NOT_ANALYZED_NO_NORMS,ANALYZED_NO_NORMS
			index.put("NO", Field.Index.NO);
			index.put("ANALYZED", Field.Index.ANALYZED);
			index.put("NOT_ANALYZED", Field.Index.NOT_ANALYZED);
			index.put("NOT_ANALYZED_NO_NORMS", Field.Index.NOT_ANALYZED_NO_NORMS);
			index.put("ANALYZED_NO_NORMS", Field.Index.ANALYZED_NO_NORMS);
		}
		public static Index getIndex(String key){
			key = StringUtils.trim2empty(key)+".Index";
			return index.get(key);
		}
	}
	
	/**
	 * 
	 * 索引文件存放位置
	 * @return
	 */
	public static String getIndexFilePath(){
		if(IndexFilePath==null){
			try {
				String path =LuceneConfig.class.getClassLoader().getResource("data/indexfile/indexConfig.properties").getPath();
				IndexFilePath = java.net.URLDecoder.decode(path, "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} 
		}
		return IndexFilePath;
	}
	
	/**
	 * 
	 * 获取存储字段
	 * @param key
	 * @return
	 */
	private static String getFieldName(String key){
		if(FieldMap==null){
			try {
				Properties p = new Properties();
				p.load(LuceneConfig.class.getClassLoader().getResource("data/indexfile/indexConfig.properties").openStream());
				FieldMap=p;
			}  catch (IOException e) {
				e.printStackTrace();
			}
		}
		if(FieldMap!=null){
			return FieldMap.getProperty(key);
			
		}
		return "";
	}
	
	/**
	 * 根据键值获取一个Lucene的Document字段
	 * 从网页上抓取的数据结果以<code>List<Map<String,String>>数据结构存储</code>,其中<code>Map</code>每一个实体构成一个<code>Field</code>
	 * @param key
	 * @param value
	 * @return
	 */
	public static Field getField(String key,String value){
		key = StringUtils.trim2empty(key);
		value = StringUtils.trim2empty(value);
		String fieldName = FieldMap.getProperty(key);
		if(null != fieldName){
			Field field = new Field(fieldName,value,LuceneConfig.STORE.getStore(key),LuceneConfig.INDEX.getIndex(key));
			return field;
		}
		return null;
	}
	
}
