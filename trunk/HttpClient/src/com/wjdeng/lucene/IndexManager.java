/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Sep 16, 2010
 * File Name       : IndexManager.java
 *
 ********************************************************************************/
package com.wjdeng.lucene;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.MultiReader;
import org.apache.lucene.index.IndexWriter.MaxFieldLength;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;

import com.wjdeng.lucene.config.LuceneConfig;

public class IndexManager {
	
	private static IndexManager index;
	
	private IndexWriter diskIndexWrite;
	
	private IndexWriter ramIndexWrite;
	
	private IndexManager(){
		try {
			FSDirectory diskDir  = FSDirectory.open(new File(LuceneConfig.getIndexFilePath()));
			diskIndexWrite = new IndexWriter(diskDir,AnalyzerService.getIKAnalyzerInstance(), MaxFieldLength.UNLIMITED);
			
			RAMDirectory ramDir = new RAMDirectory();
			ramIndexWrite = new IndexWriter(ramDir,AnalyzerService.getIKAnalyzerInstance(), MaxFieldLength.UNLIMITED);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static IndexManager Instance(){
		if(index==null){
			index = new IndexManager();
		}
		return index;
	}
	
	
	public void writeIndex(Map<String,String> val){
		try {
			Document doc = new Document();
			Field filed = null;
			for(String key :val.keySet()){
				String value = val.get(key);
				filed = LuceneConfig.getField(key, value);
				if(filed!=null){
					doc.add(filed);
				}
			}
			this.ramIndexWrite.addDocument(doc);
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 *将内存索引合并到磁盘索引中 
	 */
	public void  doFlush(){
		try {
			synchronized(ramIndexWrite){
				this.ramIndexWrite.commit();
				this.diskIndexWrite.addIndexesNoOptimize(new Directory[] {ramIndexWrite.getDirectory()});
				this.diskIndexWrite.commit();
				this.ramIndexWrite.deleteAll();
			}
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private IndexReader getIndexReader() throws IOException{
		IndexReader ramd=  this.ramIndexWrite.getReader();
		IndexReader diskd = this.diskIndexWrite.getReader();
		MultiReader mReader = new MultiReader(new IndexReader[]{ramd,diskd});
		return mReader;
	}
	
	
	public IndexSearcher getIndexSearcher() throws IOException{
		IndexSearcher indexSearcher = new IndexSearcher(this.getIndexReader());
		return indexSearcher;
	}

}

