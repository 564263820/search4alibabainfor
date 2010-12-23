
var str_uintip = "<\u8bf7\u8f93\u5165\u5e10\u53f7>";
var str_no_uin = "\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u5e10\u53f7\uff01";
var str_no_pwd = "\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u5bc6\u7801\uff01";
var str_no_vcode = "\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u9a8c\u8bc1\u7801\uff01";
var str_inv_uin = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684QQ\u5e10\u53f7\uff01";
var str_inv_vcode = "\u8bf7\u8f93\u5165\u5b8c\u6574\u7684\u9a8c\u8bc1\u7801\uff01";
var str_switch_qlogin = "\u5207\u6362\u5230\u5feb\u901f\u767b\u5f55\u6a21\u5f0f";
var str_switch_normal = "\u4f7f\u7528\u5176\u4ed6\u53f7\u7801\u767b\u5f55";
var str_qlogin_no_uin = "\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u673a\u5668\u4e0aQQ\u672a\u542f\u52a8\u6216\u5df2\u88ab\u9501\u5b9a\u3002\u8bf7\u60a8\u5148\u767b\u5f55QQ\u6216\u89e3\u9501\u540e\u518d\u4f7f\u7528\u672c\u529f\u80fd\u3002";
var str_qlogin_other_err = "\u5feb\u901f\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u60a8\u8fd4\u56de\u91cd\u8bd5\u6216\u5207\u6362\u5230\u666e\u901a\u767b\u5f55\u6a21\u5f0f\u3002";
var str_qlogin_select_offline = "\u60a8\u6240\u9009\u62e9\u53f7\u7801\u5bf9\u5e94\u7684QQ\u5df2\u7ecf\u5931\u6548\uff0c\u8bf7\u68c0\u67e5\u8be5\u53f7\u7801\u5bf9\u5e94\u7684QQ\u662f\u5426\u5df2\u7ecf\u88ab\u5173\u95ed\u3002";
var str_qlogining = "\u6b63\u5728\u767b\u5f55\u4e2d\uff0c\u8bf7\u7a0d\u5019\u2026\u2026";
function $(id) {
	return document.getElementById(id);
}
var g_version = 1012141048;
var g_qtarget = "-1";
var g_href = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http://web2.qq.com/loginproxy.html%3Fstrong%3Dtrue&f_url=loginerroralert";
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
	return document.getElementById(A);
}
var isAbleSubmit = false;
function ptui_notifySize(C) {
	try {
		obj = $(C);
		if (obj) {
			width = 1;
			height = 1;
			if (obj.offsetWidth > 0) {
				width = obj.offsetWidth;
			}
			if (obj.offsetHeight > 0) {
				height = obj.offsetHeight;
			}
			var A = window.location + "";
			A = A.replace(/^((https|http)?:\/\/ui.ptlogin2.)?/, "").replace(/(\/\S*)$/g, "");
			document.cookie = "ptui_width=" + width + ";domain=" + A + ";path=/";
			document.cookie = "ptui_height=" + height + ";domain=" + A + ";path=/";
			if (parent.ptlogin2_onResize) {
				parent.ptlogin2_onResize(width, height);
				window.scroll(0, 10);
			} else {
				frameElement.width = width;
				frameElement.style.width = width + "px";
				frameElement.height = height;
				frameElement.style.height = height + "px";
				frameElement.style.visibility = "hidden";
				frameElement.style.visibility = "visible";
			}
		}
	}
	catch (B) {
	}
}
var g_speedArray = new Array();
var g_time = {};
g_time.time1 = g_begTime;
function ptui_setSpeed(B) {
	if (B <= 0) {
		return;
	}
	var A = g_speedArray.length;
	g_speedArray[A] = new Array(B, new Date());
}
function ptui_check_qlogin() {
	if (!window.ActiveXObject) {
		return 0;
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
			return C;
		}
	}
	catch (G) {
		return 0;
	}
	return 0;
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
			switchpage();
		}
		if (document.cookie.indexOf("ptui_qstatus=2") > -1) {
			clearInterval(q_clock);
		}
		if (document.cookie.indexOf("ptui_qstatus=3") > -1) {
			clearInterval(q_clock);
			switchpage();
		}
		A--;
	}
}
function loadxui(G) {
	if (xuiFrame) {
		$("qlogin").style.display = "block";
		return;
	} else {
		var B = 1;
		if (g_jumpname != "") {
			if (g_qtarget != -1) {
				B = parseInt(g_qtarget);
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
				B = 1;
			}
		}
		var F = "";
		if (g_jumpname == "" || g_jumpname == "jump") {
			F = encodeURIComponent("u1=" + document.forms[0].u1.value);
		}
		var E = "q" + g_href.substring(g_href.indexOf("/cgi-bin/") + 9, g_href.indexOf("?"));
		var A = "http://xui.ptlogin2." + g_domain + "/cgi-bin/" + E + "?domain=" + g_domain + "&lang=" + g_lang + "&qtarget=" + B + "&jumpname=" + g_jumpname + "&ptcss=" + g_ptcss + "&param=" + encodeURIComponent((g_param ? encodeURIComponent(g_param) : F)) + "&css=" + g_css + "#" + (g_begTime - 0);
		var D = $("qlogin");
		var C = 136;
		if (G > 5) {
			G = 5;
		}
		C += 28 * (G - 1);
		D.innerHTML = "<iframe id=\"xui\" name=\"xui\" allowtransparency=\"true\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"" + C + "\" src=\"" + A + "\">";
		D.style.display = "block";
		$("web_login").style.display = "none";
		curXui = true;
		xuiFrame = true;
		qlogin_check();
	}
}
function switchpage() {
	if (curXui) {
		$("web_login").style.display = "block";
		$("qlogin").style.display = "none";
		$("switch").innerHTML = "<a style=\"cursor:pointer;\" onclick=\"switchpage();\">" + str_switch_qlogin + "</a>";
		ptui_notifySize("login");
		if (typeof (ptui_initFocus) != "undefined") {
			ptui_initFocus(document.forms[0]);
		}
		curXui = false;
		clearInterval(q_clock);
	} else {
		$("qlogin").style.display = "block";
		$("web_login").style.display = "none";
		$("switch").innerHTML = "<a style=\"cursor:pointer;\" onclick=\"switchpage();\">" + str_switch_normal + "</a>";
		curXui = true;
		qlogin_check();
		ptui_notifySize("login");
	}
}
function ptui_onUserFocus(C, A) {
	var B = $(C);
	if (str_uintip == B.value) {
		B.value = "";
	}
	B.style.color = A;
}
function ptui_onUserBlue(C, A) {
	var B = $(C);
	if ("" == B.value) {
		B.value = str_uintip;
		B.style.color = A;
	}
}
str_uintip = "<\u8bf7\u8f93\u5165\u5e10\u53f7>";
function loadweblogin() {
	if (typeof (ptui_setUinColor) == "undefined") {
		reloadweb = true;
		return;
	}
	ptui_setUinColor("u", "#000000", "#cccccc");
	$("loginform").verifycode.value = "";
}
function onSelectLoad() {
	loadweblogin();
	$("label_unable_tips").innerHTML = "";
	if ($("switch") != null) {
		$("switch").style.display = "none";
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
			reportTime4 = location.hash.substr(1, location.hash.length);
		}
	}
	catch (e) {
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
/*
aid	1003903
dumy	
fp	loginerroralert
from_ui	1
h	1
p	82261229C681F5463F2A0DA9DAA67575
ptlang	2052
ptredirect	0
pttype	1
remember_uin	1
u	1732960362
u1	http://web2.qq.com/loginproxy.html?strong=true
verifycode	!5JW
webqq_type	1
// 
http://ptlogin2.qq.com/login?
h=1
&u1=http://web2.qq.com/loginproxy.html?strong=true
&verifycode=!EFB
&p=5BEC7815599AA7C902988C8DE080A7D8
&attribute=undefined
&u=1732960362
&pttype=1
&fp=loginerroralert
&ptlang=2052
&from_ui=1
&remember_uin=1
&aid=1003903
&ptredirect=0
&webqq_type=1
&dumy= 

var DocCompVar = {
	local:"12196", 
	attribute:{
		elementName:"input", 
		type:"submit", 
		class:"signin-btn", 
		src:"http://imgcache.qq.com/ptlogin/v3/style/4/images/btn-signin.gif", 
		value:"", 
		tabindex:"5", 
		id:"login_button"
	}
};


js= "{ 
	local:'9759'  ,
 	attribute:{ 
 		elementName:'form', 
		id:'loginform'  , 
		autocomplete:'off'  , 
		name:'loginform'  , 
		action:'http://ptlogin2.qq.com/login'  , 
		method:'post'  , 
		onsubmit:'onFormSubmit(this);return false;'  , 
		onreset:'return onFormReset(loginform)'  , 
		target:'_self'  , 
		style:'margin:0px;'  }, 
 		u:{ 
 			value:'QQ号码或Email帐号' 
 			} , 
 		p:{ value:'' } , 
 		verifycode:{ value:'' } , 
 		webqq_type:{ value:'1' } , 
 		remember_uin:{ value:'1' } , 
 		aid:{ value:'1003903' } , 
 		u1:{ value:'http://web2.qq.com/loginproxy.html?strong=true' } , 
 		fp:{ value:'loginerroralert' } , 
 		h:{ value:'1' } , 
 		ptredirect:{ value:'0' } , 
 		ptlang:{ value:'2052' } , 
 		from_ui:{ value:'1' } , 
 		pttype:{ value:'1' } , 
 		dumy:{ value:'' } 
 }"

http://ptlogin2.qq.com/login?u=1732960362&p=2D90410AC622A25678064A6F0370AFB7&verifycode=!04A&webqq_type=1&remember_uin=1&aid=1003903&u1=
http%3A%2F%2Fweb2.qq.com%2Floginproxy.html%3Fstrong%3Dtrue&h=1&ptredirect=0&ptlang=2052&from_ui=1&pttype=1&dumy=&fp=loginerroralert
http%3A%2F%2Fweb2.qq.com%2Floginproxy.html%3Fstrong%3Dtrue
http://ptlogin2.qq.com/login?1=1&h=1&u1=http://web2.qq.com/loginproxy.html?strong=true&verifycode=&p=5BEC7815599AA7C902988C8DE080A7D8&attribute=undefined&u=1732960362&pttype=1&fp=loginerroralert&ptlang=2052&from_ui=1&remember_uin=1&aid=1003903&ptredirect=0&webqq_type=1&dumy= 

*/