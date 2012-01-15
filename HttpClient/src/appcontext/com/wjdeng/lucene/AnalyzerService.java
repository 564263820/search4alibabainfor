package com.wjdeng.lucene;

import org.apache.lucene.analysis.Analyzer;

import com.chenlb.mmseg4j.analysis.MaxWordAnalyzer;

/**
 * IKAnalyzer单例
 * 
 * @author chenchen
 * @version 1.0
 */
public class AnalyzerService {

	private static Analyzer iAnalyzer = new MaxWordAnalyzer(); 

	private AnalyzerService() {
	}
	
	/**
	 * 饿汉创建IKAnalyzer单例
	 * 
	 * @param force 强制创建新的实例
	 * @return
	 */
	public static Analyzer getIKAnalyzerInstance(boolean force) {
		if (force || iAnalyzer == null) {
			iAnalyzer = new MaxWordAnalyzer();
		}
		return iAnalyzer;
	}

	/**
	 * 饿汉创建IKAnalyzer单例
	 * 
	 * @return
	 */
	public static Analyzer getIKAnalyzerInstance() {
		return getIKAnalyzerInstance(false);
	}

	/**
	 * 关闭IKAnalyzer
	 */
	public static void close() {
		if (iAnalyzer != null) {
			iAnalyzer.close();
		}
	}
}