/***
 * 系统消息发送及弹出js文件
 * 注意: 只能body中引入,如果在其它地方引入可能会出现错误.
 * 示例: 需要在消息送达时执行自定的脚本只需要执行如下动作即可, 
 	propmtMsgContext.addMsgListener(typeKey, function (msgs){
 		//msgs 即为推送过来的消息数组
 	});
 * 
 */
var d_msg={};
var d_msg_head = document.getElementsByTagName("HEAD");
//加载jquery文件
if( typeof(jQuery)=='undefined'){
	d_msg.jqueryf = document.createElement('SCRIPT');
	d_msg.jqueryf.setAttribute("type","text/javascript");
	d_msg.jqueryf.src = '/js/jquery/jquery_last.js';
}


//将js文件加载到文档中
for(var par in d_msg){
	if(d_msg_head){
		d_msg_head[0].appendChild(d_msg[par]); 
	}else{
		document.body.appendChild(d_msg[par]);
	}
}
//--------------------------------------------------分割线 iframe方式 ----------------------------------------------------	
//服务器推送消息服务JS结构
function PropmtMsg(){
	if(this.FunInit){//防止多次构造
		return ;
	}
	this.FunInit = {};
	this.clientKey = "";//服务器给页面浏览器端定义的key,用来确定一个session打开多个页面的每一个页面
	this.msgListener={};//消息监听处理函数集合 map
	var that  = this;//将this赋予that变量,方便闭包访问
	var init =  "0";//初始化标记
	var iframeObj = {
		Win : null,
		frame : null,
		form : null,
		iframeHtml : "<form action='/common/systemMsg.do' method='post' id='msg_form' ><input  name='method' value='getMSG' ><input name = 'clientKey' id='clientKey' ><input id='keepConnect' name='keepConnect' ></form>"
	};
	 
	
	var bulidIframe = function (){
		if(!iframeObj.Win){//如果iframeObj.Win在初始化化后不可访问，则存在跨域的问题需要移除此iframe
			if(iframeObj.frame){
				jQuery(document.body).remove(iframeObj.frame);
			}
			jQuery(document.body).append("<iframe id='_PropmtMsg_Iframe_' name='_PropmtMsg_Iframe_' frameborder='0' src='' heigth='0' width='0'></iframe>");
		}
		iframeObj.frame = window.frames['_PropmtMsg_Iframe_'];
		iframeObj.Win  = iframeObj.frame.window;
		iframeObj.$ = iframeObj.frame.window.document;
		//alert(iframeObj.$);
		iframeObj.$.body.innerHTML =  iframeObj.iframeHtml;
		iframeObj.form = iframeObj.frame.window.document.getElementById('msg_form');
	}
	
	/**
	*通过ajax方式 访问服务器
	*@param keepConnect 此参数是用来通知浏览器端执行探测当前session所打开的所有其它页面是否有效的操作
	*/
	var bulidAjaxConnection = function(keepConnect){
		var kc  = keepConnect?keepConnect :'';
		jQuery.ajax({
	      data :{ clientKey: that.clientKey,keepConnect:kc},
	      dataType : 'JSON',
	      type : 'post',
	      timeout:1210000,//20分钟(自行检查是否掉线) 这个超时配置配置需要配合后台的轮询(周期10分钟)清理超长等待的线程
	      url : '/common/systemMsg.do?content=&method=getMSGByAjax',
	      success : function(jsonStr){
	      	try{
	      	  if(window.JSON){
		      	  var data = JSON.parse(jsonStr);
	      	  }else{
	      	  	  var data = eval("("+jsonStr+")");
	      	  }
		      that.getCallBack()(data);
		    }catch(e){}
	      },
	      complete : function(XMLHttpRequest, textStatus){
	      		if(textStatus==='timeout'){
	      			if(window['propmtMsgContext']){
			      		//防止内存泄露,先删除再重新构造请求对象
	      				window.propmtMsgContext=null;
			      		//delete window['propmtMsgContext'];
	      			}
		      		propmtMsgContext = new PropmtMsg();
					if(!propmtMsgContext.getInitStatu()){
						//外部调用示例,这里的功能是当消息送达后弹出一个消息框(如果需要做别的事情,调用此方法添加一个监听函数)
						propmtMsgContext.addMsgListener("INFO",showMSGBox);
						propmtMsgContext.setInitStatu();
						propmtMsgContext.waitMsgFromServer();//等待服务器发送消息
					}
	      		}
	      		
	      }
	    })
	
	}
	
	/**
	*通过iframe方式访问服务器
	*@param keepConnect 此参数是用来通知浏览器端执行探测当前session所打开的所有其它页面是否有效的操作
	*/
	var bulidIframeConnection = function(keepConnect){
		bulidIframe();//构造消息获取iframe对象
		iframeObj.form.clientKey.value= that.clientKey;
		iframeObj.form.keepConnect.value=keepConnect;
		iframeObj.form.submit();
																																							
	}
	
	/**
	*
	*@param keepConnect 此参数是用来通知浏览器端执行探测当前session所打开的所有其它页面是否有效的操作
	*/
	var getMsg = function(keepConnect){
		bulidAjaxConnection(keepConnect);//目前还是采用ajax方式进行访问
		//bulidIframeConnection(keepConnect);//在这里切换 访问方式
	}
	
	//成功获取消息后的回调函数(私有方法)
	var msgCB  = function msgCallBack(msgs){
		if(!msgs)return;//发生错误 终止
		if(msgs.length==0)return;//服务器返回错误,退出
		//存储从服务器端获取的 客户端编号clientKey
		if(!that.clientKey){
			for(var i =0 ;that.ConnectCall && i<that.ConnectCall.length;i++){
				try{
					that.ConnectCall[i](msgs[0].clientKey);
				}catch(e){
				
				}
			}
			that.clientKey = msgs[0].clientKey;
		}
		
		if(!msgs){//消息为空重新获取消息
			getMsg("keepConnect");
			return;
		}
		
		//var infors  = [];//最终有效的消息列表
		//当该sessionId的浏览器打开多个页面时,服务器会通知该session所打开的所有页面(此机制为了解决服务端及时发现已经关闭或离开的页面,防止内存泄露),
		//通知客户端此条连接等待作废(以disable为标记)重新发起消息请求,并为客户端设置clientKey
		for(var i =0 ;i<msgs.length;i++){
			var msg  = msgs[i]
			if(msg.disable){
				getMsg("keepConnect");  //通知服务器当前客户端页面仍然有效
				if(msg.clientKey){
					that.clientKey = msg.clientKey;//重新设置客户端id
				}
				return;						
			}else{
				delete msg['clientKey'];//不对外公开clientKey
				//infors.push(msg);
				var listeners = that.msgListener[msg.typeKey];
				//遍历执行消息送达监听事件
				for(var j =0 ;listeners && j<listeners.length;j++){
					try{
						listeners[j](msg,that.clientKey);
					}catch(e){
					}
				}
			}
		}
		
		getMsg("keepConnect");
	}
	
	
	
	
	
	
	/**
	*启动等待服务器消息的送达(对外公开)
	*/
	this.waitMsgFromServer = function(){
		getMsg();
	}
	
	//对外公开的回调函数get方法
	this.getCallBack = function (){
		//返回成功获取消息后的回调函数(私有方法)
		return msgCB;
	}
	
	this.getInitStatu = function (){
		return  init==="1";
	}
	
	this.setInitStatu = function (){
		init = "1";
	}
}






/***
*添加消息到达自定义监听事件
*当浏览获取到服务器端推送的消息时,将消息列表对象(消息记录数组)作为参数遍历调用这里添加的函数(回调作用)
*@param fun 函数对象
*/
PropmtMsg.prototype.addMsgListener = function(key,fun){
	if( typeof(fun) ==='function'){
		if(!this.msgListener[key]){
			this.msgListener[key] = [];
		}
		this.msgListener[key].push(fun);
	}
}

/***
*连接服务端完成事件,获取到页面clientKey
*/
PropmtMsg.prototype.addConnectionServerListener = function(fun){
	if( typeof(fun) ==='function'){
		if(!this.ConnectCall){
			this.ConnectCall = [];
		}
		this.ConnectCall.push(fun);
	}
}

/**
*为指定用户发送一条消息
*@param msg 消息内容
*@param userId 用户id
*/
PropmtMsg.prototype.SendMsg = function(msg,userId){
	if(!msg)return;
	if(!userId)return;
	if(msg==''|| userId=='')return;
	jQuery.ajax({
      data :{ receiverId: userId, msgstr : msg, typeKey:'INFO'},
      dataType : 'html',
      type : 'post',
      url : '/common/systemMsg.do?content=&method=sendMSG'
    });
}



/**
*弹出消息框
*@param msgs  msg的数组
*/
function showMSGBox(msg){
	if(showMSGBox.showPanel){
			showMSGBox.showPanel.close();
	}
	 
	var title  = msg.title;
	if(!title){
		title="您有新的消息";
	}
	var contenMemo  = msg.memo;
	if(window.art){
		if(msg.url) contenMemo+="  <a href ='"+msg.url+"'>更多...</a>";
		try{
		//弹出消息框 ,这里只弹出了第一条消息,可以将返回的多条消息,另外展示^_^
	    	showMSGBox.showPanel = window.art.dialog({
			    title:title,
			    left: 'right' ,
			    top: 'bottom',
			    width:250,
			    effect:true,
			    time:15,
			    content: contenMemo,
			    closeFn:function(){
			    	delete showMSGBox['showPanel'];
			    }
			});
		}catch(e){
		
		}
	}
}


//初始化对象;
var propmtMsgContext = new PropmtMsg();
(function(){
	if(!propmtMsgContext.getInitStatu()){
		//外部调用示例,这里的功能是当消息送达后弹出一个消息框(如果需要做别的事情,调用此方法添加一个监听函数)
		propmtMsgContext.addMsgListener("INFO",showMSGBox);
		propmtMsgContext.setInitStatu();
		propmtMsgContext.waitMsgFromServer();//等待服务器发送消息
	}
})();
