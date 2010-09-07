<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="common.jsp"%>
  
<script type='text/javascript'>
	var urlList = new Array();
	var next = '';
	function domyfun(){
		var miandiv  = document.getElementById('main');
		var dives = miandiv.getElementsByTagName('P');
		if(!dives)return;
		for(var i=0 ;i<dives.length;i++){
			if(dives[i].className=='pdname'){
				var item = dives[i];
				var strong = item.getElementsByTagName('STRONG');
				if(!strong) continue;
				var aes= 	strong[0].getElementsByTagName('A')
				var a = aes[0];
				var astr = a.href;
				//if(a.href.indexof('')>-1)continue;
				var slocal = astr.indexOf("showroom");
				//window.location.href.substring();
				if(slocal>-1){
					astr = "http://www.made-in-china.com/"+astr.substring(slocal,astr.length)+"/contactinfo/contact.html";
				}
				var url ={'url':astr+'contact-info.html','modeName':'medainchinaContract'}
				//alert(url.url);
				urlList.push(url);
				continue;
			}
		} 
		var pagediv  = document.getElementById('pager');
		var ale = pagediv.getElementsByTagName('A');//[2].getAttribute('href');
		for(var j=0 ;j<ale.length;j++){
			if(ale[j].innerHTML=='Next'){
				next = ale[j].getAttribute('href');;
				break;
			}
		}
	
		var frameid = getPageFlageWjdeng();
		var data = {
			'frameid' : frameid ,
			'urlList' : urlList
		}
		var str ='';
		for(var i=0 ;i<urlList.length;i++){
			str +=urlList[i].url+"\n";
		}
		window.parent.mainframepase(data,next);
		alert(next);
		next=eval(next);
		if(next){
			if(next!=''){
				document.getElementById('url').value=next;
				document.getElementById('urlform').submit();
			}
		}
	}
	//domyfun(); 
	function submitSearchByPage(page)
	{
	   var form = document.getElementById("SearchExtension");
	   if( ! form)
	   {
	      return
	   }
	   var str ="";
	   for(var pram in form.elements){
	   	
	   	 if(form.elements[pram].value){
	   	 	if(form.elements[pram].name=='page'){
	   	 		str+=form.elements[pram].name+"="+page+"&";
	   	 	}else{
	   	 		str+=form.elements[pram].name+"="+form.elements[pram].value+"&";
	   	 	}
	   	 }
	   }
	   str = 'http://www.made-in-china.com'+form.getAttribute('action')+"?" +str;
	   alert(str);
	   //window.parent.malert(str);
	   return str;
	}
	</script>
<body onload="domyfun()">
	   <form action="<c:url value="/MainFrame"/>" id="urlform"> 
    	<input type="hidden" name="url" id="url">
    	<input type="hidden" name="model" id="model" value="medainchinaindex">

    </form>
	
		