<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<script language="javascript">var g_begTime=new Date();</script>

<style type="text/css">
u{text-decoration:none;white-space:nowrap;}
*{font-family:Tahoma,Verdana,Arial,Helvetica,sans-serif;font-size:12px;}body{margin:0;padding:0;}form{margin:0;padding:0;}img{border:0 none;}a{text-decoration:none;}em{font-style:normal;}.clearer{clear:both;display:block;font-size:1px;height:1px;margin:0;padding:0;}.signin{width:370px;margin:0 auto;float:none;padding:0;}.signin .subcolumn01 .middle{float:left;width:306px;height:40px;}.signin .subcolumn01 .middle span{line-height:40px;color:#000;font-weight:bold;font-size:14px;padding-left:4em;}.signin .subcolumn02{width:366px;overflow:hidden;zoom:1;width:366px;}.signin .subcolumn02 .signin-area{padding:1px 17px;margin:0 0 0 40px;}.signin .subcolumn02 .signin-area-bg{float:left;width:306px;}.signin .subcolumn02 .signin-area-bg .padder{margin:8px 0 0;}.signin .subcolumn02 .signin-area-bg .padder .sign-input{margin:10px 0 0 0;}.signin .subcolumn02 .signin-area-bg .padder span.title{width:70px;text-align:right;margin-right:5px;-moz-user-select:none;-khtml-user-select:none;font-size:14px;}.signin .subcolumn02 .signin-area-bg .padder span.input a{margin-left:7px;text-decoration:underline;color:#3472a3;}.signin .subcolumn02 .signin-area-bg .padder span.expand{padding-left:5.9em;-moz-user-select:none;-khtml-user-select:none;width:200px;}*:lang(en) .signin .subcolumn02 .signin-area-bg .padder span.expand{margin-left:-7px;}.signin .subcolumn02 .signin-area-bg .padder .input01{width:170px;border:1px #6A9ED2 solid;color:#868686;font-size:14px;padding:2px;}.signin .subcolumn02 .signin-area-bg .padder .validate{color:#808080;margin:0;}.valcode .pic{padding:5px 0 0 60px;}.valcode .pic img{width:130px;height:53px;}.signin .subcolumn03{clear:both;}.signin .subcolumn03 .left{float:left;}.signin .subcolumn03 .middle{float:left;}.signin .subcolumn03 .middle .middle-padder{float:left;padding:10px 0 0 115px;}.signin .subcolumn03 .middle .signin-btn{background:url(http://imgcache.qq.com/ptlogin/v3/style/4/images/btn-signin.gif);width:66px;height:28px;border:0;text-align:center;line-height:20px;color:#0C4E7C;cursor:pointer;}.signin .subcolumn03 .right{float:left;}.signin.yui-panel,.signin.yui-panel .hd,.signin.yui-panel .bd,.signin.yui-panel .ft{margin:0;padding:0;border:none;background:none;}.signin.yui-panel .hd{font-weight:normal;}.signin-area-bg .expand{display:block;width:16em;margin-left:55px;}.middle-padder{width:238px;}.middle-padder span{float:left;}.valcode{padding:2px 0 0 0;}.valcode a{color:#3472a3;text-decoration:underline;}.valcode .expand{padding:10px 0;float:left;}.middle-padder .logins{width:80px;}.middle-padder .safe{background:url(http://imgcache.qq.com/ptlogin/v3/style/4/images/topbg1.gif) no-repeat;background-position:left 13px;*background-position:left 11px;_background-position:left 13px;width:130px;height:38px;line-height:38px;padding-left:16px;color:#868686;}.bottom-padder{clear:both;border-top:1px solid #D2E5EF;text-align:center;padding:6px 0;width:366px;}.bottom-padder a{color:#3472A3;margin:10px;text-decoration:underline;}.verify_text{padding:3px 0 0 60px;}.err_m{display:none;color:#f00;}


.main{
background-color:#ffffff;
}


</style>
<script language="javascript">
var str_uintip = "<请输入帐号>";
var str_no_uin = "您还没有输入帐号！";
var str_no_pwd = "您还没有输入密码！";
var str_no_vcode = "您还没有输入验证码！";
var str_inv_uin = "请输入正确的QQ帐号！";
var str_inv_vcode = "请输入完整的验证码！";
var str_switch_qlogin = "切换到快速登录模式";
var str_switch_normal = "使用其他号码登录";
var str_qlogin_no_uin = "系统检测到您机器上QQ未启动或已被锁定。请您先登录QQ或解锁后再使用本功能。";
var str_qlogin_other_err = "快速登录失败，请您返回重试或切换到普通登录模式。";
var str_qlogin_select_offline = "您所选择号码对应的QQ已经失效，请检查该号码对应的QQ是否已经被关闭。";
var str_qlogining = "正在登录中，请稍候……";
function $(id) {
    return document.getElementById(id);
}
var g_version = 1012141048;
var g_qtarget = "-1";
var g_href = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http%3A%2F%2Fweb2.qq.com%2Floginproxy.html%3Fstrong%3Dtrue&f_url=loginerroralert";
var g_forget = "http://ptlogin2.qq.com/ptui_forgetpwd";
var g_css = "";
var g_ptcss = "";
var g_jumpname = "";
var g_param = "";
var isLoadVC = false;
var g_appid = 1003903;
var g_uin = 0;
var g_domain = "qq.com";
var g_target = "_self";
var g_https = false;
document.domain = "qq.com";
var g_t = "str_uintip}";
var g_lang = "2052";
function $(A) {
    return document.getElementById(A)
}
var isAbleSubmit = false;
function ptui_notifySize(C) {
    try {
        obj = $(C);
        if (obj) {
            width = 1;
            height = 1;
            if (obj.offsetWidth > 0) {
                width = obj.offsetWidth
            }
            if (obj.offsetHeight > 0) {
                height = obj.offsetHeight
            }
            var A = window.location + "";
            A = A.replace(/^((https|http)?:\/\/ui.ptlogin2.)?/, "").replace(/(\/\S*)$/g, "");
            document.cookie = "ptui_width=" + width + ";domain=" + A + ";path=/";
            document.cookie = "ptui_height=" + height + ";domain=" + A + ";path=/";
            if (parent.ptlogin2_onResize) {
                parent.ptlogin2_onResize(width, height);
                window.scroll(0, 10)
            } else {
                frameElement.width = width;
                frameElement.style.width = width + "px";
                frameElement.height = height;
                frameElement.style.height = height + "px";
                frameElement.style.visibility = "hidden";
                frameElement.style.visibility = "visible"
            }
        }
    } catch(B) {}
}
var g_speedArray = new Array();
var g_time = {};
g_time.time1 = g_begTime;
function ptui_setSpeed(B) {
    if (B <= 0) {
        return
    }
    var A = g_speedArray.length;
    g_speedArray[A] = new Array(B, new Date())
}
function ptui_check_qlogin() {
    if (!window.ActiveXObject) {
        return 0
    }
    try {
        var D = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");
        var F = D.CreateTXSSOData();
        D.InitSSOFPTCtrl(0, F);
        var E = D.CreateTXSSOData();
        var A = D.DoOperation(2, E);
        var B = A.GetArray("PTALIST");
        var C = B.GetSize();
        if (C > 0) {
            return C
        }
    } catch(G) {
        return 0
    }
    return 0
}
var xuiFrame = false;
var curXui = false;
var reloadweb = false;
var q_clock;
function qlogin_check() {
    q_clock = setInterval(B, 200);
    var A = 50;
    document.cookie = "ptui_qstatus=1;domain=ptlogin2." + g_domain;
    function B() {
        if (A == 0) {
            switchpage()
        }
        if (document.cookie.indexOf("ptui_qstatus=2") > -1) {
            clearInterval(q_clock)
        }
        if (document.cookie.indexOf("ptui_qstatus=3") > -1) {
            clearInterval(q_clock);
            switchpage()
        }
        A--
    }
}

function loadxui(G) {
    if (xuiFrame) {
        $("qlogin").style.display = "block";
        return
    } else {
        var B = 1;
        if (g_jumpname != "") {
            if (g_qtarget != -1) {
                B = parseInt(g_qtarget)
            }
        } else {
            switch (g_target) {
            case "_self":
                B = 0;
                break;
            case "_top":
                B = 1;
                break;
            case "_parent":
                B = 2;
                break;
            default:
                B = 1
            }
        }
        var F = "";
        if (g_jumpname == "" || g_jumpname == "jump") {
            F = encodeURIComponent("u1=" + document.forms[0].u1.value)
        }
        var E = "q" + g_href.substring(g_href.indexOf("/cgi-bin/") + 9, g_href.indexOf("?"));
        var A = "http://xui.ptlogin2." + g_domain + "/cgi-bin/" + E + "?domain=" + g_domain + "&lang=" + g_lang + "&qtarget=" + B + "&jumpname=" + g_jumpname + "&ptcss=" + g_ptcss + "&param=" + encodeURIComponent((g_param ? encodeURIComponent(g_param) : F)) + "&css=" + g_css + "#" + (g_begTime - 0);
        var D = $("qlogin");
        var C = 136;
        if (G > 5) {
            G = 5
        }
        C += 28 * (G - 1);
        D.innerHTML = '<iframe id="xui" name="xui" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="' + C + '" src="' + A + '">';
        D.style.display = "block";
        $("web_login").style.display = "none";
        curXui = true;
        xuiFrame = true;
        qlogin_check()
    }
}
function switchpage() {
    if (curXui) {
        $("web_login").style.display = "block";
        $("qlogin").style.display = "none";
        $("switch").innerHTML = '<a style="cursor:pointer;" onclick="switchpage();">' + str_switch_qlogin + "</a>";
        ptui_notifySize("login");
        if (typeof(ptui_initFocus) != "undefined") {
            ptui_initFocus(document.forms[0])
        }
        curXui = false;
        clearInterval(q_clock)
    } else {
        $("qlogin").style.display = "block";
        $("web_login").style.display = "none";
        $("switch").innerHTML = '<a style="cursor:pointer;" onclick="switchpage();">' + str_switch_normal + "</a>";
        curXui = true;
        qlogin_check();
        ptui_notifySize("login")
    }
}
function ptui_onUserFocus(C, A) {
    var B = $(C);
    if (str_uintip == B.value) {
        B.value = ""
    }
    B.style.color = A
}
function ptui_onUserBlue(C, A) {
    var B = $(C);
    if ("" == B.value) {
        B.value = str_uintip;
        B.style.color = A
    }
};
str_uintip = "<请输入帐号>";
function loadweblogin() {
    if (typeof(ptui_setUinColor) == 'undefined') {
        reloadweb = true;
        return;
    }
    ptui_setUinColor('u', '#000000', '#cccccc');

    $("loginform").verifycode.value = "";
}
function onSelectLoad() {

    loadweblogin();
    $('label_unable_tips').innerHTML = '';
    if ($('switch') != null) {
        $('switch').style.display = 'none';
    }

    ptui_setSpeed(1);
    ptui_notifySize("login");
}
function onPrePageLoad() {
    var login_form = $("loginform");
    $("changeimg_link").href = "javascript:ptui_changeImg('qq.com', 1003903, true);";
    $("login_button").disabled = false;
    ptui_setDefUin(login_form, "");
    ptui_setSpeed(2);
    var reportTime4 = 0;
    try {
        if (location.hash) {
            reportTime4 = location.hash.substr(1, location.hash.length)
        };
    } catch(e) {
        var f = arguments.callee;
        setTimeout(f, 50);
    }
    ptui_reportSpeed(g_begTime, reportTime4);
    g_time.time4 = new Date();
    webLoginReport();
    ptui_notifySize("login");
    if (!curXui) {
        ptui_initFocus(login_form);
    }
}
</script>

<title>weblogin</title>
</head>
<body onload="onPageLoad()">

<div class="signin" id="login">
<div id="qlogin" style="display:none">
  <div id="qlogin_select" style="display:none" class="list_name">
      <p id="qlogin_select_tip"></p>
      <div id="list_uin" style="margin:0;">
      </div>
      <div style="padding-left:32px; padding-top:20px;">  
       <input type="button" id="loginbtn" value="" class="btn_select" onclick="onQloginSelect()"/>
      </div>
       <div id="qlogin_loading" class="linemid"></div>

      <br />   
  </div>    
  
   <div  class="lineright"><a href="javascript:switchPage(true, true)" id="label_switch_normal">使用其他号码登录</a></div>
</div>
<form id="loginform" autocomplete="off" name="loginform" action="http://ptlogin2.qq.com/login" method="post" 
onsubmit="onFormSubmit(this);return false;" onreset="return onFormReset(loginform)" target="_self" style="margin:0px;">
	<div class="subcolumn01">
	</div>
	<div class="subcolumn02">
		<div class="banner">
		</div>

		<div class="signin-area">
			<div class="signin-area-bg">
				<div class="padder">
                	<div id="err_m" class="err_m"></div>
					<div class="sign-input"><span class="title">帐　号：</span><span class="input"><input autocomplete="on" name="u" id="u" type="text" style="ime-mode:disabled"  class="input01"  tabindex="1" value="QQ号码或Email帐号" onfocus="if (value =='QQ号码或Email帐号'){value =''}" onblur="if (value ==''){value='QQ号码或Email帐号';}" /></span></div>
					<div class="sign-input"><span class="title">密　码：</span><span class="input"><input name="p" id="p" maxlength="16"  type="password" class="input01" tabindex="2" onfocus="check();"/></span></div>
					<div class="clearer"></div>
					
					
				<div id="verifyinput" class="valcode" style="display:none;">

					
					<div class="sign-input"><span class="title">验证码：</span><span class="input"><input autocomplete="off" id="verifycode" name="verifycode" type="text" style="ime-mode:disabled" class="input01 validate" value="" tabindex="3" maxLength="5"/></span></div>
					
					<div class="verify_text" id="verifytip">输入下图中的字符，不区分大小写</div>
                    <div class="pic" id="verifyshow">
                        <img id=imgVerify width='130' height='53' onload='imgLoadReport()'>
						<a id="changeimg_link" href="javascript:ptui_changeImg('qq.com', 1002101, true);">换一张</a>
				</div>		
				</div>
                
				
				
				</div>

                <span class="input expand">
					<input type="checkbox" name="webqq_type" value="1" id="webqq_type" tabindex="4" checked="checked" onClick="onClickRemember(this, 0x02, true)" /><label for="checkbox">隐身登录</label>
					<input type="checkbox" name="remember_uin" value="1" id="remember_uin" tabindex="5" checked="checked"  onClick="onClickRemember(this, 0x01, false)" /><label for="checkbox">记住帐号</label>
				</span>
		  </div>
		</div>
		<div class="clearer"></div>

	
        <div class="subcolumn03">
            <div class="left">
            <div class="middle">
                <div class="middle-padder">
                	<div class="logins"><input type="submit" class="signin-btn" src="http://imgcache.qq.com/ptlogin/v3/style/4/images/btn-signin.gif" value="" tabindex="5" id="login_button"/></div>
					<div class="safe">已使用安全方式登录</div>
                </div>
            </div>

            <div class="right">
    </div>
    <div class="bottom-padder"><a href="http://ptlogin2.qq.com/ptui_forgetpwd" target="_blank" onclick="onClickForgetPwd()" id="label_forget_pwd">忘记密码？</a><a href="http://freeqqm.qq.com/" target="_blank">注册新用户</a></div>
   </div>
   <div class="lineright" id="label_unable_tips" style="display:none;" ><a href="javascript:onClickQLogin()" id="label_switch_qlogin" style="display:none;"></a><span id="label_qlogin_tips" style="line-height:18px;"></div>
    <input type="hidden" name="aid" value="1003903" />
<input type="hidden" name="u1" value="http://web2.qq.com/loginproxy.html?strong=true" />
<input type="hidden" name="fp" value="loginerroralert" />
<input type="hidden" name="h" value="1" />

<input type="hidden" name="ptredirect" value="0" />
<input type="hidden" name="ptlang" value="2052" />

    <input type="hidden" name="from_ui" value="1" />
    <input type="hidden" name="pttype" value="1" />
 	<input type="hidden" name="dumy" value="" />
   </form>
</div>
</body>

<script language="javascript">g_time.time3=new Date();
function onSelectLoad(){}
function onPrePageLoad()
{
	ptui_setDefUin(document.getElementById("loginform"), "");	
	var rememCookie = getRememCookie();
	var checkObj = document.getElementById("remember_uin");
	var checkHiddenObj = document.getElementById("webqq_type");
	if ((rememCookie&0x04) == 0){
		checkObj.checked=true;
		onClickRemember(checkObj, 0x01, false);
		checkHiddenObj.checked=false;
		onClickRemember(checkHiddenObj, 0x02, true);
	}
	rememCookie = getRememCookie();
	if ((rememCookie&0x01) != 0){
		checkObj.checked = true;
	}else {
		checkObj.checked = false;
	};
	if ((rememCookie&0x02) == 0) checkHiddenObj.checked = true;else checkHiddenObj.checked = false;
	ptui_notifySize('login');
}
function onFormSubmit(form)
{
	if (form.remember_uin.checked){
		return ptui_onLoginEx(form, "qq.com")
	}else{				
		var myDate=new Date();
		myDate.setFullYear(1971,1,1);
		setCookie("ptui_loginuin",  "", myDate, '/', 'ui.ptlogin2.qq.com');
		return ptui_onLogin(form);
	}
}
function onPageLoad(){
	//ptui_notifySize('login');
	try{
		ptui_initFocus(document.getElementById("loginform"))
	}catch(e){
	}
	if(document.getElementById("u").value!="QQ号码或Email帐号" && document.getElementById("u").value!=""){
		if(document.getElementById("p").value==""){
			document.getElementById("p").focus();
		}else{
			if(vcode){
				vcode.focus();
			}else{
				document.getElementById("submitbtn").focus();
			}
		}
	}else{
		document.getElementById("u").focus();
	}
	g_time.time4=new Date();webLoginReport();
}
function getRememCookie(){
	var iCookieVal = 0;
	var cookieVal = getCookie("ptui_check_rem_uin");
	if (cookieVal!="" && cookieVal!=null){
		iCookieVal = parseInt(cookieVal);
	}
	return iCookieVal;
}
function setRememCookie(val)
{
	var mytime = new Date();
	mytime.setHours(mytime.getHours() + 24*30);	//配置只保持一个月有效
	setCookie('ptui_check_rem_uin', val, mytime, '/', 'ui.ptlogin2.qq.com');
}
function onClickRemember(obj,flag, bReverse){
	var iCookieVal = getRememCookie();
	var bSet = obj.checked;
	if (bReverse) bSet = !bSet;
	if (bSet) iCookieVal |= flag;else iCookieVal &= ~(flag);	
	iCookieVal|=4;	
	setRememCookie(iCookieVal);
	return true;
}
function onClickForgetPwd()
{
        var uinobj = document.getElementById("u");
        var forgetpwdobj = document.getElementById("label_forget_pwd");
        forgetpwdobj.href = "http://ptlogin2.qq.com/ptui_forgetpwd";
        if (uinobj != null && uinobj.value != "<请输入帐号>")
        {
                if (forgetpwdobj.href.indexOf("?")==-1)
                {
                        forgetpwdobj.href += "?";
                }
                else
                {
                        forgetpwdobj.href += "&";
                }
                forgetpwdobj.href += "aquin=" + uinobj.value;
        }
        return true;
}
document.getElementById("login_button").value="";

</script>
<script>onSelectLoad();</script>

<script language="javascript" src="qqcommon.js"></script>
<script language="javascript">
function cleanCache(f){
	var t=document.createElement("iframe");
	if(f.split("#").length == 3) f = f.substring(0,f.lastIndexOf("#"));
	t.src = f;
	t.style.display = "none";
	document.body.appendChild(t);
}

if(typeof(core_md5)=="undefined"){
	cleanCache("http://imgcache.qq.com/ptlogin/ac/v8/js/../clearcache.html#http://imgcache.qq.com/ptlogin/ac/v8/js/comm.js?v=1.2.5")
	imgAttr2 = new Image();
	imgAttr2.src = "http://ui.ptlogin2.qq.com/cgi-bin/report?id=85289";
}

onPrePageLoad();
if(reloadweb){
	loadweblogin();
}
function onPageClose(){ptui_notifyClose();}
function ptuiV(v){
	if (v>g_version){
		cleanCache("/clearcache.html#"+location.href);	
	}
}
function checkVersion(){
	var t = document.createElement("script");
	//t.src = "http://imgcache.qq.com/ptlogin/ac/v8/js/ver.js?r="+Math.random();
	t.src = "/cgi-bin/ver";
	document.body.appendChild(t);
}
setTimeout(checkVersion,1500);
</script>

</html>

