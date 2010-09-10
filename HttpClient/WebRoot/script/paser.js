var dorequest =function(){
	this.serverUrl = MainPath+"infor/getInfor"
	this.operation = "retry";
}

var server  = new dorequest();
function request(obj){
	server.operation = "retry";
	server.submitRequest();
	obj.value= "重新搜索";
	obj.className='button'
	obj.disabled= true;
	$("#runningInfor").html("处理中...请稍后！");
}

function pauserun(){
	obj= document.getElementById("pause");
	server.operation = "pause";
	server.submitRequest();
	obj.value= "继续";
	obj.onclick = continuerun;
}

function continuerun(){
	obj= document.getElementById("pause");
	server.operation = "continuerun";
	server.submitRequest();
	obj.value= "暂停";
	obj.onclick = pauserun;
}

function downloadExcel(obj){
	document.getElementById("urlFrom").submit();
}

dorequest.prototype.submitRequest = function(){
	this.paramUrl = $("#url").val();
	this.subServer();
}

dorequest.prototype.backFunc = function(){
	this.url = document.getElementById("url");
	this.subServer();
}

/**jqury  请求方法*/
dorequest.prototype.subServer = function ()
{
   var paramUrl = this.paramUrl;
   var operation = this.operation;
   var param ={
	   	url :paramUrl,
	   	operation : operation
   } ;
   var url = this.serverUrl;
   this.operation ="running";
   var backFunc = this.backFunc;
   jQuery.ajax(
	   {
	      data :param,
	      dataType : 'html',
	      type : 'post',
	      url : url,
	      success : function(html)
	      {
	      	eval("function creatObject(){return "+html+";}document.getElementById('url').callbackObj = creatObject();");
	      	var obj  = document.getElementById('url').callbackObj;
	      	if(!obj)return;
	      	var data = obj.data;
	      	var dataDivEle = document.getElementById('datadiv');
	      	var th = dataDivEle.th;
	      	if(!th){
		      	th = new Object();
		      	th.array = new Array();
	      		dataDivEle.th  = th;
	      	}
	      	for(var i =0 ;i<data.length;i++){
	      		var row  = data[i];
	      		for(var par in row){
	      			if(!th[par]){
	      				th[par] = par;
	      				th.array.push(par);
	      				$("#datahead").append("<td style='word-wrap: break-word; word-break: normal;'>"+par+"</td>");
	      			}
	      		}
	      		var rowc = document.getElementById("databody").getElementsByTagName("TR").length;
	      		$("#reTitle").html("获取到[<span style='color:red;' id='reRows'>"+(rowc+1)+"</span>]条信息");
	      		var htmstr = "<tr ";
	      		if(rowc%2 == 1){
	      			htmstr += "class=\"tbody_tr1\" onmouseover=\"this.className='tbody_tr_on'\" onmouseout=\"this.className='tbody_tr1'\" >";
	      		}else if(rowc%2 ==0 ){
	      			htmstr += "class=\"tbody_tr2\" onmouseover=\"this.className='tbody_tr_on'\" onmouseout=\"this.className='tbody_tr2'\" >";
	      		}
	      		for(var j=0 ; j<th.array.length;j++){
	      			var datastr = row[th.array[j]];
	      			htmstr +="<td>"+(datastr?datastr:"")+"</td>";
	      		}
	      		htmstr += "</tr>";
	      		$("#databody").append(htmstr);
	      		document.getElementById("excel").disabled= false;
	      		document.getElementById("pause").disabled= false;
	      		document.getElementById("retry").disabled= false;
	      		document.getElementById("pause").className="button";
	      		document.getElementById("excel").className="button";
	      	}
      		server.operation = obj.state;
	      	if(obj.url!=''){
  				$("#runningInfor").html("正在解析："+obj.url+"中的数据");
	      	}else{
	      		$("#runningInfor").html("");
	      	}
	      	if(obj.state == 'error'){
	      		if(obj.msg!="") {$("#MSG").html(obj.msg)};
	      		$("#runningInfor").html("");
	      		//return;
	      	}
	      	if(obj.state == 'end'){
	      		//alert(html);
	      		document.getElementById("retry").disabled= false;
	      		document.getElementById("retry").className="button";
	      		$("#MSG").html(obj.msg);
	      		$("#runningInfor").html("");
	      	}
	      	if(obj.state =='running'){
      			$("#MSG").html(obj.msg);
      			server.subServer();
	      	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown){
	      	//alert('11');
	      	//alert(errorThrown);
	      	//alert(textStatus);
	      	//alert(XMLHttpRequest);
	      }
	   }
   );
}



/**
*离开编辑页面解除当前用户锁定ci
*/
window.onbeforeunload = function(){
	if(server.operation=="running"){
			return "后台有搜索任务在运行，如果离开此页面。后台搜索任务将停止。";
	}
}

/**
*离开编辑页面解除当前用户锁定ci
*/
window.onunload = function(){
		pauserun();
}


