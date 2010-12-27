/******************************************************************************** 
 * Create Author   : Administrator
 * Create Date     : Aug 30, 2010
 * File Name       : Document.java
 *
 ********************************************************************************/
package com.wjdeng.client.model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import net.htmlparser.jericho.Attribute;
import net.htmlparser.jericho.Attributes;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.FormField;
import net.htmlparser.jericho.FormFields;
import net.htmlparser.jericho.HTMLElementName;
import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;

import org.apache.http.protocol.HTTP;

import com.wjdeng.client.model.api.IDocument;
import com.wjdeng.client.util.StringUtils;
import com.wjdeng.client.util.SysUtils;
import com.wjdeng.imp.URLContentManage;

public class Document extends Segment implements IDocument {
	/**脚本解析引擎*/
	private ScriptEngine sengine;
	
	private String jsengineStr;
	
	private URLContentManage urlConnection;
	
	/**该文档url地址*/
	private final String url;
	/**该文档域名*/
	private final String domain;
	/**该文档url地址*/
	private final String referrer;
	
	private String chartSet = HTTP.UTF_8;
	
	private String src ;

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
		System.out.println(src);
	}

	public String getChartSet() {
		return chartSet;
	}

	public void setChartSet(String chartSet) {
		this.chartSet = chartSet;
	}

	public String getDomain() {
		return domain;
	}

	public String getReferrer() {
		return referrer;
	}

	public Document(Source source, String url,String chartSet) {
		super(source, source.getBegin(), source.getEnd());
		this.url = url;
		this.referrer = url;
		this.chartSet = chartSet;
		if(StringUtils.trim2null(url)!=null){
			this.domain=StringUtils.getUrlroot(url);
		}else{
			this.domain= "";
		}
	}
	
	public Document(Source source, String url) {
		super(source, source.getBegin(), source.getEnd());
		this.url = url;
		this.referrer = url;
		this.chartSet = chartSet;
		if(StringUtils.trim2null(url)!=null){
			this.domain=StringUtils.getUrlroot(url);
		}else{
			this.domain= "";
		}
	}
	

	public String getUrl() {
		return url;
	}
	
	
	public Element getElementById(String id){
		Element  ele= this.getSource().getElementById(id);
		return ele;
	}
	
	/**
	 * 
	 * javascript引擎调用 ,获取id节点的json字符串<br>
	 * 要获取Element调用 getSource().getElementById(id);
	 * @param id
	 * @return
	 */
	public String getElementById4Javascript(String id){
		Element  ele= this.getSource().getElementById(id);
		String js = createJsonByElement(ele);
		return js;
	}
	
	/**
	 * 
	 * 将获取的Element元素转化回json对象的形式 <br>
	 * {   <br>
	 * 		local: //位置 <br>
	 * 		attribute:{ <br>
	 * 			elementName:  //标签名称 <br>
	 * 			
	 * 		} <br>
	 * } <br>
	 * @param ele
	 * @return
	 */
	private String createJsonByElement(Element  ele){
		StringBuilder sb  = new StringBuilder();
		sb.append(" var tem  = new Object();\n");
		sb.append(" tem.attribute = new Object(); \n");
		sb.append(" tem.attribute.tagName='").append(ele.getName()).append("'; \n");//节点基本属性
		sb.append(" tem.attribute.local ='").append(ele.getBegin()).append("'; \n");;
		Attributes  atts = ele.getAttributes();
		for(Attribute att : atts){
			String name  = att.getName();
			if("class".equals(name)){
				name = "className";
			}
			sb.append("tem.attribute.").append(name).append(" ='").append(StringUtils.string2Json(att.getValue())).append("';  \n");
		}
		if(HTMLElementName.FORM.equals(ele.getName())){//form节点
			FormFields  formfields = ele.getFormFields();
			for(FormField field: formfields){
				sb.append(" tem.").append(field.getName()).append("= new Object();\n");
				sb.append(" tem.").append(field.getName()).append(".attribute = new Object(); \n");
				Element fele =field.getFormControl().getElement();
				sb.append(" tem.").append(field.getName()).append(".attribute.local ='").append(fele.getBegin()).append("'; \n");;
				sb.append(" tem.").append(field.getName()).append(".attribute.tagName ='").append(fele.getName()).append("'; \n");;
				Attributes  fatts = fele.getAttributes();
				for(Attribute att : fatts){
					String name  = att.getName();
					if("class".equals(name)){
						name = "className";
					}
					sb.append(" tem.").append(field.getName()).append(".attribute.").append(name).append(" ='").append(StringUtils.string2Json(att.getValue())).append("';  \n");
				}
				List<String> vals = field.getValues();
				if(vals.size()==1){
					sb.append(" tem.").append(field.getName()).append(".attribute.value='").append(StringUtils.string2Json(vals.get(0))).append("'; \n");
				}else if(vals.size()>2){
					sb.append(" tem.").append(field.getName()).append(".attribute.value = new Array();\n");
					for(int i=0;i<vals.size()-1;i++){
						sb.append(" tem.").append(field.getName()).append(".attribute.value.push('").append(StringUtils.string2Json(vals.get(i))).append("');\n");
					}
				} 
			}
		}else{
			
		}
		sb.append(" return tem; ");
		return sb.toString();
	}

	@Override
	public Object eval(String script) {
		try {
			return getScriptEngine().eval(script);
		} catch (ScriptException e) {
			e.printStackTrace();
			System.out.println(script);
			//LogUtil.getLogger(getClass().getSimpleName()).error("js脚本错误");
		} catch (IOException e) {
			System.out.println(script);
			e.printStackTrace();
			//LogUtil.getLogger(getClass().getSimpleName()).error("加载脚本引擎失败!");
		}
		return null;
	}
	
	

	@Override
	public String getElementsByTagName(String tagName) {
		List<Element> list  =this.getAllElements(tagName);
		StringBuilder sb  = new StringBuilder();
		sb.append(" var temArray = new Array();\n");
		for(int i=0 ;i<list.size();i++){
			sb.append(" function temFun(){\n");
			this.createJsonByElement(list.get(i));
			sb.append(" } \n");
			sb.append("temArray[temArray.length]=temFun;");
		}
		sb.append(" return temArray;");
		return sb.toString();
	}

	
	private ScriptEngine getScriptEngine() throws IOException, ScriptException{
		if(sengine ==null){
			ScriptEngineManager smanager = new ScriptEngineManager();
			sengine = smanager.getEngineByName("javascript");
			sengine.put("Jdocument", this);
			if(this.jsengineStr==null){
				jsengineStr = this.loadJsEngineStr();
				Compilable compilable = (Compilable) sengine;
				CompiledScript comptScript = compilable.compile(jsengineStr);
				comptScript.eval(sengine.getContext());
				//System.out.println(inv.invokeFunction("hex_md5", "password"));
			}
		}
		
		return  sengine;
	}
	
	private String loadJsEngineStr() throws IOException{
		BufferedReader br = new BufferedReader(new FileReader(SysUtils.getRutimePath("data/jsengine.js")));
		StringBuilder sb = new StringBuilder();
		while(br.ready()){
			sb.append(br.readLine()).append("\n");
		}
		br.close();
		return sb.toString();
	}

	@Override
	public void includeJavascript(String scriptStr) {
		try {
			if(this.sengine==null){
				this.getScriptEngine();
			}
			Compilable compilable = (Compilable) sengine;
			CompiledScript comptScript = compilable.compile(scriptStr);
			comptScript.eval(sengine.getContext());
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * 从地址源include js
	 * @param scriptUrl
	 */
	public void includeJavascriptByUrl(String scriptUrl) {
		try {
			Map<String,Object> map = this.urlConnection.getContentByURL(scriptUrl,true);
			String jsfile = map.get(URLContentManage.KEY_CONTENT).toString();
			String chartSet =SysUtils.trim2null(map.get(URLContentManage.KEY_CHARSET));
			chartSet = chartSet==null?this.chartSet:chartSet;
			String js = new String(jsfile.getBytes(HTTP.ISO_8859_1),chartSet);
			this.includeJavascript(js);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ScriptException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void includeJavascript(Reader reader) {
		try {
			if(this.sengine==null){
				this.getScriptEngine();
			}
			Compilable compilable = (Compilable) sengine;
			CompiledScript comptScript = compilable.compile(reader);
			comptScript.eval(sengine.getContext());
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ScriptException e) {
			e.printStackTrace();
		}
	}
	
	public void println(String str){
		System.out.println(str);
	}

	@Override
	public List<String> getAllJavaScriptUrls() {
		List<Element> list = this.getAllElements("script");
		List<String> rl = new ArrayList<String>();
		for(Element element : list){
			String url  =element.getAttributeValue("src");//
			if(SysUtils.trim2null(url)!=null){
				rl.add(this.domain+url);//暂时没有考虑复杂情况
			}
		}
		return rl;
	}
	
	/**
	 * 
	 * 加在当前页面引用的js并编译(这里的引入仅指:页面包含的script标签上的js文件或脚本片段)<BR>
	 * @throws Exception 
	 * 
	 */
	public void loadCompiledAllPageJS() throws Exception{
		if(this.urlConnection==null)throw new Exception("该文档没有设置地址连接对象（URLContentManage），不能请求url进行js加载");
		List<Element> list = this.getAllElements("script");
		for(Element element : list){
			String url  =element.getAttributeValue("src");//
			if(SysUtils.trim2null(url)==null){
				String js = element.getContent().toString();
				this.includeJavascript(js);
			}else{
				if(url.indexOf("comm.js")>-1){
					includeJavascript(SysUtils.getFileRader("qqcommon.js"));
				}else{
					this.includeJavascriptByUrl(url);
				}
			}
		}
		
	}

	public URLContentManage getUrlConnection() {
		return urlConnection;
	}

	public void setUrlConnection(URLContentManage urlConnection) {
		this.urlConnection = urlConnection;
	}
	
	
	public String encode(String url){
		try {
			return java.net.URLEncoder.encode(url, HTTP.UTF_8);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return url;
		}
	}
	


}
