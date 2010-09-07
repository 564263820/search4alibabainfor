var dorequest =function(){
	this.serverUrl = MainPath+"infor/getInfor"
	this.operation = "retry";
}

var server  = new dorequest();
function request(obj){
	server.operation = "retry";
	server.submitRequest();
	obj.disabled= true;
}

function pause(obj){
	server.operation = "pause";
	server.submitRequest();
	obj.disable= true;
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
	      		$("#reRows").html(rowc+1);
	      		var htmstr = "<tr ";
	      		if(rowc%2 == 1){
	      			htmstr += "class=\"tbody_tr1\" onmouseover=\"this.className='tbody_tr_on'\" onmouseout=\"this.className='tbody_tr1'\" >";
	      		}else if(rowc%2 ==0 ){
	      			htmstr += "class=\"tbody_tr2\" onmouseover=\"this.className='tbody_tr_on'\" onmouseout=\"this.className='tbody_tr2'\" >";
	      		}
	      		//$("#databody").append("<tr "+clastr +">");
	      		for(var j=0 ; j<th.array.length;j++){
	      			htmstr +="<td>"+row[th.array[j]]+"</td>";
	      		}
	      		htmstr += "</tr>";
	      		//htmstr +="<td>"+row[th.array[j]]+"</td></tr>";
	      		$("#databody").append(htmstr);
	      		///alert($("#databody").html());
	      	}
  			$("#runningInfor").html("正在解析："+obj.url+"中的数据");
      		if(obj.state != 'end' && obj.state != 'error'){
      			server.subServer();
	      	}else if(obj.state != 'error'){
      			$("#MSG").append("<br>"+obj.msg);
	      	}else if(obj.state != 'end'){
	      		document.getElementById("retry").disabled= false;
	      		$("#MSG").append("<br>搜索完毕！");
	      		$("#runningInfor").html("");
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