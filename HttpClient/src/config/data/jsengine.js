/**java对象与js对象之间js解析文件
 * 如: 在java中用Source对象执行getElementById('id')方法后将此结果对象传递给js引擎
 * 此文件由java中的JavaScript引擎进行编译 
 * 
 * ***/
 
 function alert(str){
 	Jdocument.println(str);
 }
 
 function Element(obj){
	if(obj){
		 for(var par in obj){
		 	alert(par+'  '+obj);
		 	this[par] = obj[par];	
		 }
		 this.elements= obj;
	}
 }
 
 
 /**模拟浏览器的document对象**/
 var document= new Element({
	body:Jdocument,
	cookie:Jdocument.cookie,
	domain	:Jdocument.domain,//当前文档域名
	lastModified:'',//暂不提供
	referrer:Jdocument.referrer,//当前文档url
	title:'',//暂不提供
	URL:Jdocument.url,//当前文档url
	all : new Array()
 });
 
 /**模拟浏览器的getElementById()方法**/
 Element.prototype.getElementById = function(id){
 	var objScr = Jdocument.getElementById(id);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
 		var obj = new Element(eval(objScr));
 		document.all[this.all.length]=obj;
 		return obj;
 	}
 	return null;
 }
 
 Element.prototype.getElementsByTagName = function(name){
 	var objScr = Jdocument.getElementsByTagName(name);//Jdocument 详见:ava com.wjdeng.client.Doment.getScriptEngine()
 	if(objScr){
 		var obj =  new Element(eval(objScr));
 		document.all[this.all.length]=obj;
 		return obj;
 	}
 	return null;
 }
 
 /**submit方法在并不提交url请求 它在这里只组装好url参数并返回这个又参数构成的字符串**/
 Element.prototype.submit = function(){
 	return "test";//哈哈
 	/*for(var par in this){
 		
 	}*/
 }