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
 	alert(code);
 	alert(millisec);
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
		 for(var par in obj){//所有表单元素节点(from对象才会初始化表单元素节点)
		    if(par=='attribute')continue;
		 	this.elements[par]= obj[par];
		 	this[par] = obj[par];	
		 }
	}
	this.style = {
		display:""
	}
 }
 
 
 function Image(){
 	Element.call(this);
 	alert("_______________________________________");
 	Jdocument.src='test';
 }

 

 
 
 
 /**模拟浏览器的getElementById()方法**/
 Element.prototype.getElementById = function(id){
 	//alert(id);
 	var returnObj=null;
 	if(document.childElements["'"+id+"'"]){
 		returnObj= document.childElements["'"+id+"'"];
 	}
 	var objScr = Jdocument.getElementById4Javascript(id);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	objScr = " function genraObject(){ "+objScr + "};genraObject();";
 	if(objScr){
	 	//alert('-------------------------------------------------------');
 		var tem = Jdocument.eval(objScr);//这里的 objSrc == document.childElements[id]={} 
 		var obj = new Element(tem);//所以有了 document.childElements[id]的引用
 		document.childElements["'"+id+"'"]=obj;
 		//alert(obj);
 		//alert(document.all);
 		document.all.push(obj);
 		returnObj= obj;
 	}
 	if(id=='loginform'){
 		alert(returnObj.u.value.length);
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
	 		alert(element.src);
	 		return element.src;
	 	}
 	}
 }
 
  Element.prototype.createElement = function(tageName){
 	var tem = new Element();
 	if(tageName){
 		tem.tageName = tageName;
 	}
 	return tem;
 }
 
 Element.prototype.getElementsByTagName = function(name){
 	var result = new Array();
 	if(!name)return result;
 	var objScr = Jdocument.getElementsByTagName(name);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
	 	objScr = " function genraObject(){ "+objScr + "}; genraObject(); ";
	 	var elements = Jdocument.eval(objScr);
	 	for(var i=0;i<elements.length;i++){
	 		var obj =  new Element(elements[i]);
	 		if(obj.id){
	 			var temObj =document.childElements["'"+obj.id+"'"]; 
	 			if(!temObj ){//在document对象中不存在
	 				document.childElements["'"+obj.id+"'"] = obj;
			 		document.all.push(obj);
	 			}else{
	 				elements[i] =temObj ;//已经存在
	 			}
	 		}
	 		result[result.length] = obj;
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
 			}
 		}
 		str = this.attribute.action+"?"+ str;
 		window.location.href = str;
 		alert(str);
 		return str;
 	}else{
 		alert('当前表单没有action属性..........submit方法执行失败');
 	}
 	return "";//
 }
 
 
 Element.prototype.focus= function(){
 }
 
 Element.prototype.select= function(){
 }
 
 
  /**模拟浏览器的window对象**/
 var window = new Element({
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
 });
 
 /**模拟浏览器的document对象**/
 var document= new Element({
	body:new Element(),
	cookie:new Array(),//coookie
	domain	:Jdocument.domain,//当前文档域名
	lastModified:'',//暂不提供
	referrer:Jdocument.referrer,//当前文档url
	title:'',//暂不提供
	URL:Jdocument.url,//当前文档url
	all : new Array(),
	childElements:new Object(),
	navigator:window.navigator
 });
 document.forms=document.getElementsByTagName('form');
 
 var navigator = window.navigator;
 
 /*
 window.navigator.appVersion;
 window.navigator.language;
 window.navigator.userAgent
 window.navigator.appName;
 window.history.current;
 window.location.host;
 window.location.port;
 window.history.next;
 window.history.previous;
 window.history.back();
 window.history.forward();
 window.history.
 */
 
