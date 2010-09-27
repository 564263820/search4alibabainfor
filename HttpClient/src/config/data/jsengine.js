/**java对象与js对象之间js解析文件
 * 如: 在java中用Source对象执行getElementById('id')方法后将此结果对象传递给js引擎
 * 此文件由java中的JavaScript引擎进行编译 
 * 
 * ***/
 
 
 
 /**模拟浏览器的document对象**/
 var document = {};
 
 /**模拟浏览器的getElementById()方法**/
 document.prototype.getElementById = function(id){
 	var objScr = Jdocument.getElementById(id);//Jdocument 引用引擎中注册过的java com.wjdeng.client.Doment.java对象
 	if(objScr){
 		return eval(objScr);
 	}
 	return null;
 }
 
 document.prototype.getElementsByTagName = function(name){
 	var objScr = Jdocument.getElementsByTagName(name);//Jdocument 引用引擎中注册过的java com.wjdeng.client.Doment.java对象
 	if(objScr){
 		return eval(objScr);
 	}
 	return null;
 }
