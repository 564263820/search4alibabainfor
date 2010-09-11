<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="css/login.css" rel="stylesheet" type="text/css" />
		<title>系统登陆</title>
		<script language="javascript">
		/**
		 * @功能：登陆页面最大化
		 */
		function login_init()
		{
			window.moveTo(0,0);
			window.resizeTo(screen.availWidth,screen.availHeight);
			if (document.getElementById("username") != null){
				document.getElementById("username").focus();
			}
			
			if (document.getElementById("login_message") != null){
				document.getElementById("login_message").style.display = "none";
			}
		}
		
		/**
		 * @功能：登陆条件判断
		 * @      “用户名”的页面id是username，必须存在
		 * @      “密码”的页面id是password，必须存在
		 */
		function login(){
			var username = document.getElementById("username");
			var password = document.getElementById("password");
			
			if (username == null){
				alert("无“用户名”输入框username");
				return false;
			}
			if (password == null){
				alert("无“密码”输入框username");
				return false;
			}
			
			if (username.value==null || username.value==""){
				alert("请输入用户名...");
				username.focus();
				return false;
			} else {
			}
			
			if (password.value==null || password.value==""){
				alert("请输入密码...");
				password.focus();
				return false;
			} else {
			}
			document.getElementById("logonForm").submit();
		}
		
		login_init();
		</script>
		<style type="text/css">
		*{
			margin:0;
			padding:0;
			font-size:12px;	
		}
		
		body{
			font-family:Verdana, Arial, Helvetica, sans-serif;
			color:#ffffff;
		}
		
		a{
			cursor:pointer;
		}
				
		</style>
	</head>
	
	<body class="login_body" onload="login_init()" oncontextmenu="window.event.returnValue=true">
		<div id="login_main">
			<div id="login_bg_border">
				<div id="login_bg">
					<div id="login_logo"></div>
					<div id="login_middle">
						<div id="login_middle_border">
							<div id="login_middle_left"></div>
							<div id="login_middle_right"></div>
							<div id="login_middle_title"></div>
							<div id="login_form">
								<form action="<c:url value="/infor/Valide"/>" id="logonForm" name="logonForm" method="post">
									<div class="login_content" id="div_content">
										<span class="login_span"><font class="login_font">用户名：</font></span>
										<span class="login_input"><input class="login" id='username' name="username"
											type="text" maxlength="14"
											onmouseover="this.className='login_hover'" onmouseout="this.className='login'"/></span>
									</div>
									<div class="login_content" id="div_password">
										<span class="login_span"><font class="login_font">密&nbsp;&nbsp;&nbsp;码：</font></span>
										<span class="login_input"><input class="login" id='password' name="password"
											type="password"  maxlength="14"
											onmouseover="this.className='login_hover'" onmouseout="this.className='login'"/></span>
									</div>
									<div class="login_botton">
										<input type="button" class="login_btn" value="登 录" onclick="login();"
											onmouseover="this.className='login_btn_hover'" onmouseout="this.className='login_btn'"/>
										<input type="reset" class="login_btn" value="重 置"
											onmouseover="this.className='login_btn_hover'" onmouseout="this.className='login_btn'"/>
									</div>
									<div id="login_message"><p id="font_message">用户名或密码有误，请重新输入！</p></div>
								</form>
							</div>
							<div id="login_middle_bottom"></div>
						</div>
					</div>
          <div id="login_info">
              Version 1.0 Copyright &copy; 2010 wjdeng.com
          </div>
				</div>
			</div>
			<div id="login_touying">
				<div id="touying_left"></div>
				<div id="touying_right"></div>
			</div>
		</div>
	</body>
</html>