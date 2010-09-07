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
		data.alibabaContract=new Object();
		var mdata= data.alibabaContract;
		mdata['Website'] = getPageSrcUrl();
		var tables = document.body.getElementsByTagName('TABLE');
		if(!tables)return;
		for(var i=0 ;i<tables.length;i++){
			if(tables[i].className=='tables data'){
				var item = tables[i];
				var tr = item.getElementsByTagName('TR');
				for(var j=0;j<tr.length;j++){
					var vals = tr[j].getElementsByTagName('TD');
					var cols = tr[j].getElementsByTagName('TH');
					if(!vals||vals.length<1)continue;
					if(!cols||cols.length<1)continue;
					var col = cols[0].innerHTML;
					var val = vals[0].innerHTML;
					//alert(tds[1].innerHTML+"  :--:  "+tds[3].innerHTML);
					if(col=='Contact Person:' ){
						var spans = vals[0].getElementsByTagName('SPAN')
						if(spans.length>0){
							for(var span=0 ;span<spans.length;span++){
								if(spans[span].className=='contactName'){
									var pesonA = spans[span].getElementsByTagName('A')
									mdata[col] = pesonA[0].innerHTML;
								}
							}
						}
					}else if(col=='Website:' ){
					}else if( col=='Country/Region: '|| col=='Zip:'){
					}else{
						mdata[col] = val;
					}
				}
			}
		} 
		//try{
			var frameid = getPageFlageWjdeng();
			var str;
			for( var par in mdata){
				str +=par + "  :  "+mdata[par];
			}
			var data = {
				'frameid' : frameid ,
				'data' : data
			};
			window.document.body.innerHTML=window.parent.getInputHtml();
			window.parent.mainframepase(data,next);
		//}catch(e){}
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
    	<input type="hidden" name="model" id="model" value="alibabaContract">
    </form> 
		