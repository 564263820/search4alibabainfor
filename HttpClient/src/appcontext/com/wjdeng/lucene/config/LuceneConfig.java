/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 14, 2010
 * File Name       : LuceneConfig.java
 *
 ********************************************************************************/
package com.wjdeng.lucene.config;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;

import com.wjdeng.client.util.StringUtils;

/**
 * 
 * 配置文件位置:src/data/indexfile/indexConfig.properties 
 *
 *此类在初始化时从indexConfig.properties文件中 加载lucene字段的配置
 * @author Administrator
 * @version 1.0
 * @since Apex OssWorks 5.5
 */
final public class LuceneConfig {

	/**
	 * 索引文件路径
	 */
	private static String IndexFilePath;
	
	/**
	 * 配置映射
	 */
	private static Properties ConfigMap ;
	
	/**
	 * 所有字段的名称
	 */
	private static Set<String> fieldNames;
	
	private static Properties getConfigMap(){
		if(ConfigMap==null){
			try {
				Properties p = new Properties();
				p.load(LuceneConfig.class.getClassLoader().getResource("data/indexfile/indexConfig.properties").openStream());
				ConfigMap=p;
			}  catch (IOException e) {
				e.printStackTrace();
			}
		}
		return ConfigMap;
	}
	
	private static final class STORE{
		private static Map<String, Store> store = new HashMap<String, Store>();
		
		static{
			store.put("YES", Field.Store.YES);
			store.put("NO", Field.Store.NO);
			store.put("COMPRESS", Field.Store.COMPRESS);
		}
		public static Store getStore(String key){
			key = StringUtils.trim2empty(key)+".Store";
			return store.get(getConfigMap().get(key));
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
			return index.get(getConfigMap().get(key));
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
		ConfigMap=getConfigMap();
		if(ConfigMap!=null){
			return ConfigMap.getProperty(key);
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
		String fieldName = getFieldName(key);
		if(key.indexOf(".Store")>-1 || key.indexOf(".Index")>-1)return null;
		if(null != fieldName){
			Field field = new Field(fieldName,value,LuceneConfig.STORE.getStore(key),LuceneConfig.INDEX.getIndex(key));
			return field;
		}
		return null;
	}
	
	/**
	 * 
	 * 获取所有已经在配置文件中配置过的所有字段集合
	 * @param value
	 * @return
	 */
	public static Set<Field> getFields(Map<String,String> value){
		Set<Field> set = new HashSet<Field>();
		for(String key : value.keySet()){
			Field field = getField(key,value.get(key));
			if(null != field){
				set.add(field);
			}
		}
		return set;
	}
	
	/**
	 * 
	 * 获取当前配置过的所有字段名称
	 * @return
	 */
	public static Set<String> getAllFieldNames(){
		if(fieldNames==null){
			fieldNames = new HashSet<String>();
			for(Object name : getConfigMap().keySet()){
				if(name.toString().indexOf(".Store")>-1 || name.toString().indexOf(".Index")>-1)continue;
				fieldNames.add(name.toString());
			}
		}
		return fieldNames;
	}
	
}
