/**java对象与js对象之间js解析文件
 * 如: 在java中用Source对象执行getElementById('id')方法后将此结果对象传递给js引擎
 * 此文件由java中的JavaScript引擎进行编译 
 * 
 * ***/
 
 /**java 与javascript通信的临时编译变量 用来存储java方法返回的js对象*/
 
 function alert(str){//模拟浏览器alert方法, 在控制台将消息输出
 	Jdocument.println(str);
 }
 
 function setTimeout(code,millisec){
 	alert("定时器任务------------------------");
 	alert("TimeCode:   "+code);
 	alert("TimeCode:millisec "+millisec);
 	alert("------------------------end");
 }
 
 
 
 function Element(obj){
	if(obj){
		 if(obj.attribute){//所有属性
		 	for(var attpar in obj.attribute){
		 		this[attpar] = obj.attribute[attpar];	
		 	}
	 		this.attribute = obj.attribute;
		 }
		 this.elements = new Object();
		 if(!document)return;
		 var count =0 ;//子元素个数
		 for(var par in obj){//所有表单元素节点(from对象才会初始化表单元素节点)
		    if(par=='attribute')continue;
		    var element  = 	new Element(obj[par]);
		 	var id = element.id;
		 	if(element.local){
		 		var cachet =document.docAllElements[element.local];
		 		if(cachet){//该位置存在节点
		 			element = cachet;
			 		if(id && !document.childElements["'"+id+"'"]){
				 		document.childElements["'"+id+"'"] = element;
				 	} 
		 		}else{
		 			document.docAllElements[element.local]=element ;
				 	document.all.push(element);
				 	if(this.tagName.toLowerCase()=='form'){
				 		while(this[count]){//该位置存在了元素
			    			count++;//继续累加下标
	    				}
		    			this[count]=element;
				 	}
		 		}
	 			this[par] = element;
		 	}
		 	if(this.tagName.toLowerCase()=='form'){this.length = count;}
		 	this.elements[par]= element; 
		 }
	     
	}
	this.style = {
		display:""
	}
	
 }
 
 
 function Image(){
 	Element.call(this);
 	Jdocument.src='test';
 }

 

 
 
 
 /**模拟浏览器的getElementById()方法**/
 Element.prototype.getElementById = function(id){
 	var returnObj=null;
 	if(document.childElements["'"+id+"'"]){
 		return document.childElements["'"+id+"'"];
 	}
 	var objScr = Jdocument.getElementById4Javascript(id);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	objScr = " function genraObject(){ "+objScr + "};genraObject();";
 	if(objScr){
 		var tem = Jdocument.eval(objScr);//这里的 objSrc == document.childElements[id]={} 
 		var element = new Element(tem);//所以有了 document.childElements[id]的引用
 		if(document.docAllElements[element.local]){
 			returnObj= document.docAllElements[element.local];
 		}else{
 			document.docAllElements[element.local]=element;
	 		document.all.push(element);
	 		returnObj= element;
 		}
 		document.childElements["'"+id+"'"]=returnObj;
 	}
 	return returnObj;
 }
 
 /**
  * 模拟浏览器的appendChild()方法
  * */
 Element.prototype.appendChild = function(element){
 	if(element){
	 	document.all.push(element)
	 	if(this.childElements && element.id){
	 		this.childElements[element.id] = element;
	 	}
	 	if(element.src){
	 		if(element.tagName.toLowerCase()=='script'){
	 			Jdocument.includeJavascriptByUrl(element.src);
	 		}
	 		return element.src;
	 	}
 	}
 }
 
  Element.prototype.createElement = function(tagName){
 	var tem = new Element();
 	if(tagName){
 		tem.tagName = tagName;
 	}
 	return tem;
 }
 
 /**
  * 模拟getElementsByTagName方法
  * @param {} name
  * @return {}
  */
 Element.prototype.getElementsByTagName = function(name){
 	var result = new Array();
 	if(!name)return result;
 	name = name.toLowerCase();
 	var objScr = Jdocument.getElementsByTagName(name);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
	 	objScr = " function genraObject(){ "+objScr + "}; genraObject(); ";
	 	var elements = Jdocument.eval(objScr);
	 	//alert(elements.length+"  +++++++++++++++++++++++++++++++++" +name);
	 	//alert(objScr);
	 	//alert(elements.length+"  +++++++++++++++++++++++++++++++++" +name);
	 	for(var i=0;i<elements.length;i++){
	 		var element =  new Element(elements[i]);
	 		if(document.docAllElements[element.local]){//
	 			element= document.docAllElements[element.local];//该位置已经存入缓存
	 		}else{
	 			if(element.id){
		 			if(document.childElements["'"+element.id+"'"]){
				 		element = document.childElements["'"+element.id+"'"];
				 	}else{
				 		document.childElements["'"+element.id+"'"]=element;
				 		document.all.push(element);
				 	}
	 			}
	 			document.docAllElements[element.local] = element;//将该位置记录到缓存中
	 		}
	 		result[result.length] = element;
	 	}
 	}
 	return result;
 }
 
 /**submit方法在并不提交url请求 它在这里只组装好url参数并返回这个又参数构成的字符串**/
 Element.prototype.submit = function(){//模拟submit方法 在这里实际只返回生成的地址
 	if(this.attribute.action){
 		var str ="";//;
 		for(var par in this){
 			if(par== 'elements') continue;
 			if(par== 'attribute')continue;
 			if(par== 'style')continue;
 			if(typeof(this[par]) == 'object'){
 				str += par + "=" + Jdocument.encode(this[par].value) +"&";
 				//str += par + "=" + this[par].value +"&";
 			}
 		}
 		str = this.attribute.action+"?"+ str;
 		window.location.href = str;
 		return str;
 	}else{
 		alert('当前表单没有action属性..........submit方法执行失败');
 	}
 	return "";//
 }
 
 
Element.prototype.setAttribute= function(name,value){
	if(name){
		this[name] = value;
	}
}
 Element.prototype.focus= function(){
 }
 
  Element.prototype.blur= function(){
  
  }
 
 Element.prototype.select= function(){
 }
 
 
  /**模拟浏览器的window对象**/
 var window = new Element({
	 attribute:{
		document:document,
		location:{
			href:{},
			port:{}
		},
		history:{
			current:{},
			next:{},
			previous:{},
			back :function(){},
			forward :function(){}
		},
		navigator:{
			appName:'',
			appVersion:'',
			language:'',
			userAgent:'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.9) Gecko/20100824 Firefox/3.6.9'
		}
	}
 });
 
 /**模拟浏览器的document对象**/
 var document= new Element({
 	attribute:{
 		local:'0',
		cookie:new Array(),//coookie
		domain	:Jdocument.domain,//当前文档域名
		lastModified:'',//暂不提供
		referrer:Jdocument.referrer,//当前文档url
		title:'',//暂不提供
		URL:Jdocument.url,//当前文档url
		childElements:new Object(),
		docAllElements:new Object(),
		navigator:window.navigator
	}
 });
 

 
 document.all=new Array();
 document.forms=document.getElementsByTagName('form');
 document.body = document.getElementsByTagName('body')[0];

 var navigator = window.navigator;
