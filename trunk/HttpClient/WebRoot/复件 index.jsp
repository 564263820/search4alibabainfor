<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<c:url value="/"></c:url>">
    
    <title>index.jsp</title>
	<meta http-equiv="pragma" content="no-cache">
	<script type='text/javascript' src="<c:url value="/dwr/interface/excelUtil.js"/>"></script>
	<style type="">
		*{pandding:0 0 0 0px;}
	</style>
	</head>
  <body  > 
  <div>地址:<input name="url" type="text" id ='url' style="width:700px;"/> 
  		模块: <select name="model" id="model">
   			 		<option value="alibabaindex">阿里巴巴</option>
    				<option value="medainchinaindex">中国制造bycompany</option>
    				<option value="medainchinaindexProduct">中国制造by products</option>
 			 </select>
    	<br>
    	<input type="button" onclick="subUrl(this)"  value="提  交"/>
    	
    	<input type="button" onclick="subUrl(this)"  value="stop"/>
    	
    	<input type="button" onclick="subData()"  value="生成excel"/>
    	
   </div>
  <div>
	<iframe id="htmlframe" name="htmlframe"  width="100" height="100" ></iframe>
  </div>
  <div id="datadiv">
  <table>
  	<thead id="datahead"></thead>
  	<tbody id="databody"></tbody>
  </table>
  </div>
  <div id="MSG"></div>
  </body>
</html>

<script type="text/javascript">
function MainFramePaseHTML(){
	this.rootformHTML='';//第一级页面html
	this.rootUrl=this.path+"/MainFrame?url=input";//第一级页面请求地址
	this.urlList = new Object();//待请求分析url列表
	this.data = new Object();
	this.path= '<c:url value="/"/>';//服务器path
	this.doneUrl= new Object();
	
}

MainFramePaseHTML.prototype.subRequest = function(url,modelName,frameId){//发送地址内容解析请求
	var frame = window.frames[frameId].window;
	if(!frame)return;
	var childDoc = frame.document;//model
	this.rootformHTML = childDoc.body.innerHTML;
	//alert(childDoc.body.innerHTML);
	childDoc.getElementById('url').value=url;
	childDoc.getElementById('model').value=modelName;
	childDoc.getElementById('frameid').value=frameId;
	childDoc.getElementById('urlform').submit();
}

/** 响应子iframe数据返回请求
*@param: obj  数据结构
{
	frameid:'所在frame的id',
	urlList:[{//需要继续处理的资源
		url:'地址',
		modelName:'资源解析模块'
	}],
	data://解析出的数据结果
		modelname:[//模块名称
					{
						par:'',//属性
						...
					}
				]
				
}
*/
MainFramePaseHTML.prototype.responseChildFrame = function(obj){
	if(!obj)return;
	if(!obj.frameid)return;
	if(obj.frameid){
		var temframe = document.getElementById(obj.frameid);
		if(!temframe)this.creatIframe(obj.frameid);
		this.addUrlList(obj.urlList,obj.frameid);
		this.addData(obj.data);
		var url ;
		if(this.urlList&& this.urlList[obj.frameid]){
		 	url = this.urlList[obj.frameid].shift();
		 	while(this.doneUrl[url.url]=="1"){
		 		malert(url.url+"   此站点重复!");
		 		url = this.urlList[obj.frameid].shift();
		 	}
			if(url){
				this.subRequest(url.url,url.modeName,obj.frameid);//解析子页面
				this.doneUrl[url.url]="1";
			}
		}
	}
}

//**为制定iframe增加待处理得资源
MainFramePaseHTML.prototype.addUrlList= function (urlList , frameid){
	if(!urlList || !frameid) return;
	var arr = new Array();
	if(!this.urlList[frameid]){
		this.urlList[frameid]= arr;
	}else{
		arr = this.urlList[frameid];
	}
	while(urlList.length>0){
		var url = urlList.shift();
		arr.push(url);//待处理的地址加入处理ifram资源列表中
	}
}

MainFramePaseHTML.prototype.addData = function(data){
	if(!data ) return;
	for(var modename in data){
		var rowdata =  data[modename];
		this.creatTable(modename);
		this.buldTableRow(rowdata,modename);
		if(!this.data[modename])this.data[modename]=new Array();
		this.data[modename].push(rowdata);
	}
}

/**创建iframe
*/
MainFramePaseHTML.prototype.creatIframe  = function(frameid){
	var frame = document.createElement('IFRAME');
	//frame.style.display='none';
	frame.setAttribute('id',frameid);
	frame.setAttribute('name',frameid);
	frame.setAttribute('height',"100");
	frame.setAttribute('width',"100");
	//frame.setAttribute('src',window.location.href);
	//var body = document.getElementsByTagName("BODY");
	//if(body&& body.length>0){
	//	body[0].appendChild(frame);
	//}
	window.document.body.appendChild(frame);
    window.frames[frameid].window.document.body.innerHTML = this.rootformHTML;	
}

//添加显示表格
MainFramePaseHTML.prototype.creatTable  = function(modelName){
	if(!modelName)return;
	if(document.getElementById(modelName+"e"))return;
	var table = document.createElement('TABLE');
	var thead = document.createElement('THEAD');
	var tbody = document.createElement('TBODY');
	table.setAttribute('id',modelName+"e");
	thead.setAttribute('id',modelName+"d");
	tbody.setAttribute('id',modelName+"y");
	//thead.headObj={'len':0};
	table.appendChild(thead);
	table.appendChild(tbody);
	var div =  document.getElementById("datadiv");
	div.appendChild(table);
}

/**
	添加行
**/
MainFramePaseHTML.prototype.buldTableRow = function(rowdata,modelName){
	if(!rowdata || !modelName) return;
	var thead = document.getElementById(modelName+'d');
	var tbody = document.getElementById(modelName+'y');
	if( !thead.len)thead.len=0;
	var tr = document.createElement('TR');
	var tlen = thead.len;
	for(var col in rowdata){
		if(!thead[col]){
			thead[col]=col;
			thead.len = ++tlen ;
			var tdh = document.createElement('TD');
			var td = document.createElement('TD');
			var colt = document.createTextNode(col)
			var text = document.createTextNode(rowdata[col])
			tdh.appendChild(colt);
			td.appendChild(text);
			thead.appendChild(tdh);
			tr.appendChild(td);
		}else{
			var td = document.createElement('TD');
			var text = document.createTextNode(rowdata[col])
			td.appendChild(text);
			tr.appendChild(td);
		}
	}
	tbody.appendChild(tr);
} 

MainFramePaseHTML.prototype.getinputHtml = function(){
	return this.rootformHTML;
}

MainFramePaseHTML.prototype.getDataByModelname = function(modelname){
	if(modelname)return this.data[modelname];
	for(var name in this.data){
		return this.data[name];
	}
}

var pas = new MainFramePaseHTML();
<!--
/**
*主搜索框架中内容解析
*/
function mainframepase(obj,next){
	pas.responseChildFrame(obj);
}

function getInputHtml(){
	return pas.getinputHtml();
}

//提交数据到服务器
function subData(){
	var model = document.getElementById('model').value;
	if(pas){
		var data  = pas.getDataByModelname();
		if(data){
			excelUtil.createExcelUtil(data);
		}
	}
}


var path = '<c:url value="/"/>';
window.frames['htmlframe'].window.location.href=path+"/MainFrame?url=input";
function subUrl(obj){
	if(obj){
		//obj.disabled=true;
		var mainframe = window.frames['htmlframe'].window;
		var url = document.getElementById('url').value;
		var model = document.getElementById('model').value;
		/*var childDoc = mainframe.document;//model
		childDoc.getElementById('url').value=url;
		//alert(model);
		childDoc.getElementById('model').value=model;
		childDoc.getElementById('urlform').submit();*/
		pas.subRequest(url,model,'htmlframe')
	}
}
function malert(msg){
//MSG
var str = document.getElementById('MSG').innerHTML;
document.getElementById('MSG').innerHTML = str+'<br>'+msg;
};
//-->
</script>


<script language="javascript">
</script> 
