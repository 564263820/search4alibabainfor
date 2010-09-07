/******************************************************************************** 
 * Create Author   : JoveDeng
 * Create Date     : Apr 26, 2010
 * File Name       : ExcelUtil.java
 *
 * Apex OssWorks是上海泰信科技有限公司自主研发的一款IT运维产品，公司拥有完全自主知识产权及专利，
 * 本系统的源代码归公司所有，任何团体或个人不得以任何形式拷贝、反编译、传播，更不得作为商业用途，对
 * 侵犯产品知识产权的任何行为，上海泰信科技有限公司将依法对其追究法律责任。
 *
 * Copyright 1999 - 2009 Tekview Technology Co.,Ltd. All right reserved.
 ********************************************************************************/
package com.wjdeng.imp;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jxl.Workbook;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableHyperlink;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import com.wjdeng.client.model.ctronl.ModeParament;
import com.wjdeng.client.util.SysUtils;

public class ExcelUtils {
	
	public ExcelUtils(){
		
	}
	
	public String createExcelUtil(ModeParament mp ,OutputStream out ) throws IOException,WriteException,Exception{
		//创建一个可写入的excel文件对象
        WritableWorkbook workbook;
        String filename = SysUtils.getFilePath(mp.getModeName())+"_.xls";
		List<Map<String,String>> maps = mp.getMlist();
		if(out !=null){
			workbook = Workbook.createWorkbook(out);
		}else{
			workbook = Workbook.createWorkbook(new File(filename));
		}
        //使用第一张工作表
        WritableSheet sheet = workbook.createSheet(mp.getModeName()+"客户资料", 0); 
		Map<String,Integer> head = null;
		for(int i=0 ;i<maps.size();i++){
			Map<String,String> map = maps.get(i);
			Set<String> set  = map.keySet();
			head = this.writeReportHeader(sheet, set, head);//刷新title行
			this.addDataToExcel(sheet, head, map ,i+1);//增加一行
		}
		 // 关闭对象，释放资源
		workbook.write();
		workbook.close();
		return filename;
	}
	
	public void createExcelUtil(List<Map<String,String>> maps){
		//创建一个可写入的excel文件对象
		try {
			ModeParament mp = new ModeParament("","","");
			mp.setMlist(maps);
			this.createExcelUtil(mp,null);
		}  catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	
	
	
	//生成Excel文件的表头
	private Map<String,Integer> writeReportHeader(WritableSheet sheet ,Set<String> set,Map<String,Integer> haveHead){
		if(null ==haveHead) haveHead = new HashMap<String,Integer>();
		int col = haveHead.size();
	      try{
	    	  WritableFont wfc = new WritableFont(WritableFont.ARIAL, 11, WritableFont.BOLD, false,
	    			  UnderlineStyle.NO_UNDERLINE, jxl.format.Colour.BLACK);
	    	  WritableCellFormat wcfFC = new WritableCellFormat(wfc);
	    	  for(String title:set){
	    		  if(haveHead.containsKey(title))continue;
	    		  Label assetNumLabel = new Label(col, 0, title, wcfFC);
	    		  sheet.addCell(assetNumLabel);
	    		  sheet.setColumnView(0,title.length() + 10);
	    		  haveHead.put(title, col);
	    		  col++;
	    	  }
	      }catch(Exception e){
	    	  e.printStackTrace();
	      }
	      return haveHead;
	}
	
	/**
	 * 
	 * 添加到Excel文件
	 * @param sheet
	 * @param asset
	 * @param index
	 * @throws Exception
	 */
	private void addDataToExcel(WritableSheet sheet,Map<String,Integer> head, Map<String,String> data,int row)throws Exception{
		Set<String> set = data.keySet();
		for(String title :set){
			String assetNum =SysUtils.HtmlToText(data.get(title));
			int index  = head.get(title);
			if("Website".equals(title)){
				try{
					WritableHyperlink  assetNumlink =  new WritableHyperlink(index,row,0,0,new URL(assetNum),assetNum);
					sheet.addHyperlink(assetNumlink);
				}catch(MalformedURLException me){
					Label assetNumLabel = new jxl.write.Label(index,row , assetNum);
					sheet.addCell(assetNumLabel);
				}
			}else{
				Label assetNumLabel = new jxl.write.Label(index,row , assetNum);
				sheet.addCell(assetNumLabel);
			}
		}
	    /*
	    */
	}

	
	
	
}

