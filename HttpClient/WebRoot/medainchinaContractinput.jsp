<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="common.jsp"%>
    
<script type='text/javascript'>
	function getPageFlageWjdeng(){
		return '<c:out value="${param.frameid}"/>';
	}

	function domyfun(){
		var urlList = new Array();
		var next = '';
		var data = new Object();
		data.medainchinaContract=new Object();
		var mdata= data.medainchinaContract;
		//window.parent.malert(getPageSrcUrl());
		var table = document.getElementById("contact");
		
		//var tables = document.body.getElementsByTagName('TABLE');
		var item = table;
		if(item){
			var tr = item.getElementsByTagName('TR');
			for(var j=0;j<tr.length;j++){
				var vals = tr[j].getElementsByTagName('TD');//[0].innerHTML;//.childNodes;
				var cols = tr[j].getElementsByTagName('TH');//[0].innerHTML;//tds[1].innerHTML;
				if(!vals||vals.length<1)continue;
				if(!cols||cols.length<1)continue;
				
				var col = cols[0].innerHTML;
				var val = vals[0].innerHTML;
				//alert(tds[1].innerHTML+"  :--:  "+tds[3].innerHTML);
				if(col=='Contact Person: '|| col=='Showroom: '){
					var person = vals[0].getElementsByTagName('A');
					if(person.length>0){
							mdata[col] = person[0].innerHTML;
					}
				}else if(col=='Website:'|| col=='Zip/Postal Code:'){
				}else{
					mdata[col] = val;
				}
				window.parent.malert(mdata[col]);
			}
		}
		//try{
		var frameid = getPageFlageWjdeng();
		//window.parent.malert(frameid);
		window.parent.malert(getPageSrcUrl());
		var data = {
			'frameid' : frameid ,
			'data' : data
		};
		window.document.body.innerHTML=window.parent.getInputHtml();
		window.parent.mainframepase(data,next);
	}
	//domyfun(); 
	</script>
<body onload="domyfun()">
	<form action="<c:url value="/MainFrame"/>" id="urlform"> 
    	<input type="hidden" name="url" id="url">
    	<input type="hidden" name="model" id="model" value="medainchinaContract">
    </form> 
		