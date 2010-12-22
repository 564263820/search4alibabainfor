/**java对象与js对象之间js解析文件
 * 如: 在java中用Source对象执行getElementById('id')方法后将此结果对象传递给js引擎
 * 此文件由java中的JavaScript引擎进行编译 
 * 
 * ***/
 
 /**java 与javascript通信的临时编译变量 用来存储java方法返回的js对象*/
 
 function alert(str){//模拟浏览器alert方法, 在控制台将消息输出
 	Jdocument.println(str);
 }
 
 function Element(obj){
	if(obj){
		 if(obj.attribute){//所有属性
		 	for(var attpar in obj.attribute){
		 		this[attpar] = obj.attribute[par];	
		 		this.attribute = obj.attribute;
		 	}
		 }
		 this.elements = new Object();
		 for(var par in obj){//所有表单元素节点(from对象才会初始化表单元素节点)
		 	this.elements[par]= obj[par];
		 	if(par == 'attribute' ) continue;
		 	this[par] = obj[par];	
		 }
	}
 }

 
 
 /**模拟浏览器的document对象**/
 var document= new Element({
	body:Jdocument,
	cookie:Jdocument.cookie,//coookie
	domain	:Jdocument.domain,//当前文档域名
	lastModified:'',//暂不提供
	referrer:Jdocument.referrer,//当前文档url
	title:'',//暂不提供
	URL:Jdocument.url,//当前文档url
	all : new Array()
 });
 
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
		userAgent:''
	}
 });
 //window.navigator.appName;
 //window.navigator.appVersion;
 //window.navigator.language;
 //window.navigator.userAgent
 
 /*String.
 window.history.current;
 window.location.host;
 window.location.port;
 window.history.next;
 window.history.previous;
 window.history.back();
 window.history.forward();
 window.history.
 */
 
 
 /**模拟浏览器的getElementById()方法**/
 Element.prototype.getElementById = function(id){
 	var objScr = Jdocument.getElementById4Javascript(id);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
 		//由于
 		var obj = new Element(DocCompVar);//DocCompVar javaScript引擎将getElementById的js对象存入到一个临时的全局变量DocCompVar中
 		document.all[this.all.length]=obj;
 		return obj;
 	}
 	return null;
 }
 
 Element.prototype.getElementsByTagName = function(name){
 	var objScr = Jdocument.getElementsByTagName(name);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
 		var obj =  new Element(DocCompVar);
 		document.all[this.all.length]=obj;
 		return obj;
 	}
 	return null;
 }
 
 /**submit方法在并不提交url请求 它在这里只组装好url参数并返回这个又参数构成的字符串**/
 Element.prototype.submit = function(){//模拟submit方法 在这里实际只返回生成的地址
 	if(this.attribute.action){
 		var str = this.attribute.action+"?1=1";
 		for(var par in this){
 			if(par== 'elements') continue;
 			if(typeof(this[par]) == 'object'){
 				str += "&"+par + "=" + this[par].value ;
 			}
 		}
 		window.location.href = str;
 		alert(str);
 		return str;
 	}else{
 		alert('当前表单没有action属性..........submit方法执行失败');
 	}
 	return "";//
 	/*for(var par in this){
 		
 	}*/
 }
