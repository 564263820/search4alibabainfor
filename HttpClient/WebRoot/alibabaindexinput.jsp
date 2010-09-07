<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="common.jsp"%>
  
<script type='text/javascript'>
	var urlList = new Array();
	var next = '';
	function domyfun(){
		var dives = document.body.getElementsByTagName('DIV');
		if(!dives)return;
		for(var i=0 ;i<dives.length;i++){
			if(dives[i].className=='box5 products'){
				var item = dives[i];
				var aes = item.getElementsByTagName('A');
				for(var j=0 ;j<aes.length;j++){
					if(aes[j].className=='company'){
						var a = aes[j];
						var url ={'url':a.href+'contactinfo.html','modeName':'alibabaContract'}
						urlList.push(url);
						break;
					}
				}
			}else if( dives[i].className=='listBatch listPage Top newBorder'){ 
				try{
					var item = dives[i]; 
					ale = item.getElementsByTagName('A');//[2].getAttribute('href');
					for(var j=0 ;j<ale.length;j++){
						if(ale[j].className=='nextPage'){
							next = ale[j].getAttribute('href');;
							break;
						}
					}
				}catch(e){} 
			}
		} 
	
		//try{
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
		//}catch(e){
		//	alert(e)
		//}
		if(next){
			if(next!=''){
				document.getElementById('url').value=next;
				document.getElementById('urlform').submit();
			}
		}
	}
	//domyfun(); 
	</script>
<body onload="domyfun()">
	   <form action="<c:url value="/MainFrame"/>" id="urlform"> 
    	<input type="hidden" name="url" id="url">
    	<input type="hidden" name="model" id="model" value="alibabaindex">

    </form>
	
		