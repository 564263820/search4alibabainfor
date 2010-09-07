<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<%@include file="common.jsp"%>
		<title></title>
		<meta http-equiv="pragma" content="no-cache">
		<style type="text/css">
			*{font-size: 12px; color: #2a2a2a;}
			body {overflow-x:hidden; font-size: 12px; color: #2a2a2a; font-family: Verdana, Geneva, sans-serif;  }
			div{
				OVERFLOW: auto; 
				scrollbar-face-color: #FFFFFF; 
				scrollbar-shadow-color: #D2E5F4; 
				scrollbar-highlight-color: #D2E5F4; 
				scrollbar-3dlight-color: #FFFFFF; 
				scrollbar-darkshadow-color: #FFFFFF; 
				scrollbar-track-color: #FFFFFF; 
				scrollbar-arrow-color: #D2E5F4
			}
			.block1 { width: 100%; }
			.input_style1 { height: 18px; width: 200px; border: 1px solid #7F9DB9; }
			.textarea_style { margin-top: 5px; margin-left: 5px; border: 1px solid #7F9DB9; margin-bottom: 5px; overflow-y: auto; font-size: 12px; }
			.select_style { width:200px; margin-top: 1px; margin-left: 5px; border: 1px solid #7F9DB9; margin-bottom: 1px;  vertical-align: middle; line-height: 18px; font-size: 12px; *font-size: 12px;
					float: left; 
			}
			
			.border_n{ border:1px solid #B9C2CC}
			.border_bai{ border:1px solid #fff}
			.margin_top{ margin-top:6px}
			.biaoge_thead{ background:url(../images/w_r13_c10.jpg); height:29px}
			.tbody_tr1{ background:#fff url(../images/s_r19_c17.jpg) bottom repeat-x; height:26px;}
			.tbody_td{ padding-left:5px}
			.tbody_tr2{ background:#F0F5F9 url(../images/s_r19_c17.jpg) bottom repeat-x; height:26px;}
			.tbody_tr_on{ background:#FF9 url(../images/s_r5_c422.jpg) bottom repeat-x; height:26px;}
			.infor{display:inline-block;float:left;width:30%;}
		</style>
	</head>
	<body>
		<center>
		<div class="ruanjian">
				<div class="wrapper block1" align="center"
					style="margin-top: 50px;">
					<form action="<c:url value="/infor/getInfor"/>" id="urlFrom" method="post">
					<textarea id="url" name="url" style="width: 700px; height: 60px;"
						class="textarea_style">http://www.alibaba.com/trade/search/3i1p5tyfchms/shanghai.html?tracelog=24581_searchbar_keywords</textarea>
					<br>
					<div style="margin-top: 10px;">
					<input type="button" id="retry"   onclick="request(this);" value="搜索" />
					<input type="button" id="submit"  onclick="request(this);" value="暂停" />
					<input type="submit" id="excel"  value="下载搜索结果(excel)" />
					<input type="button" id="submit"  onclick="" value="" />
					<input type="hidden" name="operation" value="downloadExcel" />
					</form>
					</div>
				</div>
				<div class="infor">
					<div id="reTitle" >获取到[<span style="color:red;" id="reRows">&nbsp;</span>]条信息</div>&nbsp;&nbsp;&nbsp;<span id="runningInfor"></span><div id="MSG"></div>
				</div>
				<div id="datadiv" class="border_n"
					style="display: block; width: 96%; height: 500px; overflow: auto;margin-top: 10px;">
					<table width="100%" cellspacing="0" cellpadding="0" border="0" id="tablelistci">
						<tr id="datahead" class="biaoge_thead"></tr>
						<tbody id="databody"></tbody>
					</table>
				</div>
				
		</div>
		</center>
	</body>
</html>
