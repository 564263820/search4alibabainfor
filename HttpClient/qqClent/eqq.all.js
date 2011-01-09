
(function () {
	var b = function (d) {
		var g = this, e = d.dom, c = d.event, f = d.cookie, h = d.http;
		this.initGlobal = function () {
			EQQ.vfwebqq = qqweb.portal.getVfWebQQ();
		};
	};
	var a = "EQQ.Global";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (d) {
		var g = this, e = d.dom, c = d.event, f = d.cookie, i = d.http;
		this.proxysend = function h(j, k) {
			qqweb.rpcService.send(j, {context:null, method:k.method || "GET", data:"r=" + encodeURIComponent(d.json.stringify(k.param)), onSuccess:k.onSuccess, onError:k.onError});
		};
		EQQ.BASE_CONST = qqweb.CONST;
	};
	var a = "EQQ.Adapter";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (e) {
		var i = this, g = e.dom, d = e.event, h = e.cookie, j = e.http;
		var f = function (l, o) {
			var k = l.length;
			var n = function () {
				k--;
				if (k == 0) {
					o();
				}
			};
			for (var m = 0; m < k; m++) {
				l[m](n);
			}
		};
		var c = function c(k, l) {
			return function (m) {
				l.onError = l.errback || function () {
				};
				m = m || function () {
				};
				l.onSuccess = function (n) {
					l.callback(n, m);
				};
				EQQ.Adapter.proxysend(k, l);
			};
		};
		i.cgi_module = c;
		i.require = f;
	};
	var a = "EQQ.Extend";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (m) {
		var C = this, A = m.dom, z = m.event, B = m.cookie, y = m.http;
		var w = false;
		var f = false;
		var q = {};
		var V = 3;
		var M = 0;
		var W;
		var E;
		var R;
		var c = false;
		var j = false;
		var H = false;
		var L;
		L = window.location.host;
		m.out(">>dName: " + L);
		this.showLogin = function (J) {
			J = J || {};
			var Z = qqweb.portal.getLoginLevel();
			if (!B.get("ptwebqq") || Z < 3) {
				qqweb.layout.showLoginWindow("eqq", true);
				return;
			}
			EQQ.init2({panel:{myPanel:qqweb.layout.getPanel("qqBar").body, mainPanel:qqweb.app.eqq.getSideBar().body, mainBar:qqweb.layout.getPanel("statusBar").body, taskBar:qqweb.layout.getPanel("taskBar").body}});
		};
		var I = {onExit:function () {
			qqweb.layout.confirm("\u60a8\u786e\u8ba4\u8981\u5173\u95ed WebQQ \u5417\uff1f", function () {
				C.executeExit();
			});
		}, onNeedLogin:function (J) {
			qqweb.layout.showLoginWindow("eqq");
		}};
		this.CONST = {MAIN_DOMAIN:"qq.com", EQQ_SERVER_URL:"http://" + L + "/", CONN_SERVER_DOMAIN:"http://d.web2.qq.com/", CONN_SERVER_DOMAINS:["http://d.web2.qq.com/"], CONN_PROXY_URLS:["http://d.web2.qq.com/proxy.html?v=20101025002"], CONN_SERVER_DOMAIN2:"http://web.qq.com/", CONN_PROXY_URL:"http://d.web2.qq.com/proxy.html?v=20101025002", CHAT_PIC_SERVER:"http://" + L + "/", AVATAR_SERVER_DOMAIN:"http://qun.qq.com/", AVATAR_SERVER_DOMAINS:["http://face1.qun.qq.com/", "http://face2.qun.qq.com/", "http://face3.qun.qq.com/", "http://face4.qun.qq.com/", "http://face5.qun.qq.com/", "http://face6.qun.qq.com/", "http://face7.qun.qq.com/", "http://face8.qun.qq.com/", "http://face9.qun.qq.com/", "http://face10.qun.qq.com/", "http://face11.qun.qq.com/"], SYSTEM_FACE_URL:"http://" + L + "/style/face/", LOGIN_PROTECT_FINISH_URL:"./login_protect.html", UPLOAD_CUSTOM_FACE_SERVER:"http://web.qq.com/cgi-bin/cface_upload", DOWNLOAD_CHAT_LOG_SERVER:"http://sns.qq.com/buddy_state/feed/save_chat.php", FILE_SERVER:"http://file1.web.qq.com/", OFFLINE_FILE_SERVER:"http://weboffline.ftn.qq.com:80/ftn_access/", QZONE_SERVER_DOMAIN:"http://qzone.qq.com/", QZONE_USER_SERVER_DOMAIN:"http://user.qzone.qq.com/", QQ_GROUP_URL:"http://qun.qq.com/air/", MAX_LOGIN_AMOUNT:1, MAX_FAIL_AMOUNT:2, Z_INDEX_BASE:3000, LOAD_AVATAR_AMOUNT:50, TRANSFER_TABLE:[14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35, 66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44, 48, 49], T_TRANSFER_TABLE:{14:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 0:14, 50:15, 51:16, 96:17, 53:18, 54:19, 73:20, 74:21, 75:22, 76:23, 77:24, 78:25, 55:26, 56:27, 57:28, 58:29, 79:30, 80:31, 81:32, 82:33, 83:34, 84:35, 85:36, 86:37, 87:38, 88:39, 97:40, 98:41, 99:42, 100:43, 101:44, 102:45, 103:46, 104:47, 105:48, 106:49, 107:50, 108:51, 109:52, 110:53, 111:54, 112:55, 32:56, 113:57, 114:58, 115:59, 63:60, 64:61, 59:62, 33:63, 34:64, 116:65, 36:66, 37:67, 38:68, 91:69, 92:70, 93:71, 29:72, 117:73, 72:74, 45:75, 42:76, 39:77, 62:78, 46:79, 47:80, 71:81, 95:82, 118:83, 119:84, 120:85, 121:86, 122:87, 123:88, 124:89, 27:90, 21:91, 23:92, 25:93, 26:94, 125:95, 126:96, 127:97, 128:98, 129:99, 130:100, 131:101, 132:102, 133:103, 134:104, 52:105, 24:106, 22:107, 20:108, 60:109, 61:110, 89:111, 90:112, 31:113, 94:114, 65:115, 35:116, 66:117, 67:118, 68:119, 69:120, 70:121, 15:122, 16:123, 17:124, 18:125, 19:126, 28:127, 30:128, 40:129, 41:130, 43:131, 44:132, 48:133, 49:134}};
		this.hash = {onlineStatus:{callme:"callme", online:"online", away:"away", busy:"busy", silent:"silent", hidden:"hidden", offline:"offline"}, onlineStatusText:{callme:"Q\u6211\u5427", online:"\u5728\u7ebf", away:"\u79bb\u5f00", busy:"\u5fd9\u788c", silent:"\u9759\u97f3", hidden:"\u9690\u8eab", offline:"\u79bb\u7ebf"}, clientType:{1:"PC", 2:"PC", 3:"PC", 4:"PC", 5:"PC", 6:"PC", 10:"PC", 21:"Phone", 22:"Phone", 23:"Phone", 24:"Phone", 41:"WebQQ", 10000:"PC"}, clientTypeText:{1:"PC", 2:"PC", 3:"PC", 4:"PC", 5:"PC", 6:"PC", 10:"PC", 21:"\u624b\u673aQQ", 22:"\u624b\u673aQQ", 23:"\u624b\u673aQQ", 24:"\u624b\u673aQQ", 41:"WebQQ", 10000:"PC"}, userClassType:{online:"online", stranger:"stranger", blacklist:"blacklist"}}, document.domain = this.CONST.MAIN_DOMAIN;
		var g = function (J) {
			if (J.keyCode === 27) {
				J.preventDefault();
			}
		};
		z.on(document, "keydown", g);
		this.init2 = function (Z) {
			w = false;
			f = false;
			q = {};
			W = null;
			E = null;
			j = false;
			H = false;
			this.panel = Z.panel || {};
			u;
			k = 0;
			X = false;
			r = 0;
			z.addObserver(qqweb.portal, "exit", p);
			z.addObserver(EQQ, "LoginSuccess", P);
			z.addObserver(C, "LoginFailure", o);
			z.addObserver(C, "VerifyLoginProtectSuccess", s);
			z.addObserver(C, "exit", I.onExit);
			z.addObserver(C, "needLogin", I.onNeedLogin);
			z.addObserver(EQQ.RPCService, "NotLogin", G);
			z.addObserver(EQQ, "ReLinkStop", N);
			z.addObserver(EQQ.RPCService, "FailCountOverMax", x);
			z.addObserver(EQQ, "ReLinkSuccess", T);
			z.addObserver(EQQ, "ReLinkFailure", x);
			z.addObserver(EQQ, "UinNotInWhitelist", v);
			z.addObserver(EQQ, "UinInBlacklist", D);
			z.addObserver(EQQ, "Overload", e);
			z.addObserver(EQQ, "PtwebqqFail", t);
			z.addObserver(EQQ.RPCService, "LogoutSuccess", O);
			z.addObserver(EQQ.RPCService, "PollComplete", Q);
			z.addObserver(EQQ.RPCService, "CheckProtectSuccess", S);
			C.createContainer();
			EQQ.RPCService.init();
			EQQ.Presenter.MainPanel.init();
			try {
				EQQ.Presenter.ChatBox.init();
				EQQ.Presenter.TaskBar.init();
			}
			catch (aa) {
			}
			EQQ.Model.BuddyList.init();
			EQQ.Model.ChatMsg.init();
			var J = EQQ.Presenter.MainPanel.getCookieTips();
			if (J && J == "hide") {
			} else {
			}
			EQQ.Presenter.MainPanel.show();
			C.login();
		};
		this.loginEQQ = function (J) {
			this.showLogin();
		};
		this.getDefaultState = function () {
			var J = EQQ.hash.onlineStatus[m.string.mapQuery(window.location.search).login_state || "online"];
			return J;
		};
		this.getUserDefaultAvatar = function (J) {
			J = J || 40;
			return "./style/images/avatar_default_" + J + "_" + J + ".gif";
		};
		this.getFaceServer = function (J) {
			return EQQ.CONST.AVATAR_SERVER_DOMAINS[(J % 10)];
		};
		this.getUserAvatar = function (Z, J) {
			return EQQ.getFaceServer(Z) + "cgi/svr/face/getface?cache=0&type=1&fid=0&uin=" + Z + "&vfwebqq=" + qqweb.portal.getVfWebQQ();
		};
		this.getGroupAvatar = function (Z, J) {
			return EQQ.getFaceServer(Z) + "cgi/svr/face/getface?cache=0&type=4&fid=0&uin=" + Z + "&vfwebqq=" + qqweb.portal.getVfWebQQ();
		};
		this.getQzoneUrl = function (J) {
			return EQQ.CONST.QZONE_USER_SERVER_DOMAIN + J;
		};
		this.getSendMailUrl = function (J) {
			return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + J + "@qq.com";
		};
		this.createContainer = function () {
			this.document = A.getDoc();
			this.container = A.node("div", {id:"EQQ_Container", "class":"EQQ_Container"});
			this.container.innerHTML = "\t\t\t<div id=\"EQQ_MsgBox\" class=\"EQQ_msgBox\">\t\t\t\t<div class=\"EQQ_titleInMsgBox\">\t\t\t\t\t<div class=\"EQQ_titleTextInMsgBox\">\u6d88\u606f\u76d2\u5b50</div>\t\t\t\t\t<div id=\"EQQ_ViewMainPanelButtonInMsgBox\" class=\"EQQ_viewMainPanelButtonInMsgBox\" title=\"\u70b9\u51fb\u67e5\u770b\u597d\u53cb\u5217\u8868\">\u597d\u53cb\u5217\u8868</div>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_MessageList\" class=\"EQQ_messageList\">\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_IgnoreAllMsgButtonInMsgBox\" class=\"EQQ_ignoreAllMsgButtonInMsgBox\" title=\"\u70b9\u51fb\u5ffd\u7565\u5168\u90e8\u6d88\u606f\">\u5ffd\u7565\u5168\u90e8</div>\t\t\t</div>\t\t\t<div id=\"EQQ_LoginBox\" class=\"EQQ_LoginBox\">\t\t\t\t<div class=\"EQQ_LoginBox_Title\">\t\t\t\t\t<div id=\"EQQ_LoginBox_CloseButton\" class=\"EQQ_LoginBox_CloseButton\" title=\"\u5173\u95ed\">X</div>\t\t\t\t\t<div class=\"EQQ_LoginBox_TitleText\">WebQQ\u767b\u5f55\u4fdd\u62a4</div>\t\t\t\t</div>\t\t\t\t<iframe id=\"EQQ_LoginBox_Iframe\" class=\"EQQ_LoginBox_Iframe\" src=\"about:blank\" frameborder=\"no\" scrolling=\"no\"></iframe>\t\t\t</div>\t\t";
			this.document.body.appendChild(this.container);
		};
		this.getCookieSkey = function () {
			return m.cookie.get("skey", EQQ.CONST.MAIN_DOMAIN);
		};
		this.getCookiePtWebQQ = function () {
			return m.cookie.get("ptwebqq", EQQ.CONST.MAIN_DOMAIN);
		};
		this.getVfWebQQ = function () {
			return W;
		};
		this.setVfWebQQ = function (J) {
			W = J;
		};
		this.getPsessionid = function () {
			return E;
		};
		this.getClientKey = function () {
			return R;
		};
		this.dna_result_key = "";
		this.login = function (J) {
			EQQ.Presenter.MainPanel.showLogin();
			this.loginStart = (new Date()).getTime();
			var Z = {status:J || "", ptwebqq:qqweb.portal.getPtwebqq(), passwd_sig:this.dna_result_key};
			EQQ.RPCService.sendLogin(Z);
		};
		var i = function () {
			var J = qqweb.config.configList.chatboxMode;
			var Z = qqweb.config.configList.isNotNeedCtrlKey;
			EQQ.initChatboxMode(J);
			EQQ.initSendMsgKey(Z);
			var aa = qqweb.portal.getLoginLevel();
			if (aa > 2) {
				z.notifyObservers(EQQ, "eqqUacChange", {chatboxMode:J, isNotNeedCtrlKey:Z});
			}
		};
		var S = function (J) {
			if (J.type == "nop") {
				EQQ.Presenter.MainPanel.toggleShow();
			} else {
				if (J.type == "url") {
				}
			}
		};
		var s = function (J) {
			if (J) {
				C.dna_result_key = J;
				EQQ.Presenter.MainPanel.toggleShow();
			}
		};
		var p = function () {
			if (EQQ) {
				C.executeExit();
			}
		};
		this.executeExit = function () {
			try {
				EQQ.View.ChatBox.onExitHotkey();
			}
			catch (J) {
			}
			z.notifyObservers(EQQ, "CloseWebQQ");
			EQQ.stopPoll();
			EQQ.logout();
			qqweb.portal.removeExitConfirm();
		};
		this.logout = function () {
			m.out("EQQLOGOUT", null, 2);
			EQQ.setIsLogin(false);
			EQQ.RPCService.sendLogout();
		};
		this.reLogin = function () {
			var J = (EQQ.Model.BuddyList.getSelf() && EQQ.Model.BuddyList.getSelf().state) || "offline";
			if (J == "offline") {
				J = (EQQ.Model.BuddyList.getSelf() && EQQ.Model.BuddyList.getSelf().oldState) || "";
			}
			this.login(J);
		};
		var v = function (J) {
			window.location = qqweb.CONST.MAIN_URL + "overload.html";
		};
		var D = function (J) {
		};
		var e = function (J) {
			window.location = qqweb.CONST.MAIN_URL + "overload.html";
		};
		var t = function (J) {
			m.out("onPtwebqqFail");
			o({text:"\u767b\u5f55\u5931\u8d25"});
			qqweb.layout.alert("\u9a8c\u8bc1\u4fe1\u606f\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01");
			window.location.reload();
		};
		var h = function () {
			try {
				m.cookie.set("uin", qqweb.portal.getOriginalUin(), qqweb.CONST.MAIN_DOMAIN);
				m.cookie.set("skey", qqweb.portal.getSkey(), qqweb.CONST.MAIN_DOMAIN);
				m.cookie.set("ptwebqq", qqweb.portal.getPtwebqq(), qqweb.CONST.MAIN_DOMAIN);
			}
			catch (J) {
			}
		};
		var l = function () {
			var J = EQQ.Model.BuddyList.getSelf().state;
			var Z = {status:J, ptwebqq:qqweb.portal.getPtwebqq(), passwd_sig:C.dna_result_key};
			h();
			EQQ.RPCService.sendReLink(Z);
		};
		var U = function () {
			if (qqweb.app.tips && qqweb.app.tips.showEQQTipsDom) {
				qqweb.app.tips.showEQQTipsDom("\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u6b63\u5728\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55...");
			}
		};
		var n = function () {
			if (qqweb.app.tips && qqweb.app.tips.hideEQQTipsDom) {
				qqweb.app.tips.hideEQQTipsDom();
			}
		};
		var T = function (Z) {
			V = 3;
			M = 0;
			W = Z.vfwebqq;
			E = Z.psessionid;
			n();
			this.startPoll();
			i();
			var J = EQQ.Model.BuddyList.getSelf().state;
			z.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", J);
		};
		var N = function (J) {
			C.stopPoll();
			n();
			z.notifyObservers(C, "SelfOffline", "\u8eab\u4efd\u9a8c\u8bc1\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55");
		};
		var x = function (J) {
			C.stopPoll();
			m.out("reLinkRetryCount: " + M);
			if (M >= 2) {
				U();
				z.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", "offline");
			}
			if (J && J.hasOwnProperty("t")) {
				setTimeout(function () {
					l();
				}, (parseInt(J.t) || 0) * 1000);
			} else {
				if (!J) {
					setTimeout(function () {
						l();
					}, 10000);
				}
			}
			M++;
		};
		var G = function () {
			var J = "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002";
			z.notifyObservers(C, "SelfOffline", J);
		};
		var O = function () {
			var J = "\u60a8\u5df2\u767b\u51fa";
			z.notifyObservers(EQQ, "exitSuccess");
		};
		var Q = function () {
			var J = EQQ.getIsLogin();
			if (J) {
				if (typeof EQQ !== "undefined") {
					EQQ.keepPoll();
				}
			}
		};
		var P = function (J) {
			m.out("\u767b\u5f55\u7b2c\u4e00\u6b65\u6210\u529f");
			V = 3;
			M = 0;
			W = J.vfwebqq;
			E = J.psessionid;
			R = J.clientkey;
			EQQ.setIsLogin(true);
			z.notifyObservers(qqweb.portal, "GetLoginInfoSuccess");
			C.start(J);
			i();
			n();
			m.debug(">>>EQQ.js - onLoginSuccess");
		};
		this.start = function (J) {
			qqweb.portal.addExitConfirm();
			this.mode = "master";
			m.out("start: " + EQQ);
			EQQ.Global.initGlobal();
			EQQ.Model.BuddyList.reset();
			EQQ.Presenter.MainPanel.View.showPullData();
			qqweb.util.report2h("eqqGetData", "start");
			qqweb.portal.speedTest.sRTS(14, "start", (new Date()));
			qqweb.portal.speedTest.sRTS(15, "start", (new Date()));
			EQQ.Extend.require([EQQ.Model.BuddyList.sendGetBuddyList({h:"hello"}), EQQ.Model.BuddyList.sendGetGroupList()], function () {
				WebqCore.api.ifDataReady.set(true);
				F.inject();
				EQQ.startPoll();
				EQQ.Model.BuddyList.sendGetRecentList({})();
				setTimeout(function () {
					WebqCore.api.makeCall();
				}, 13);
				qqweb.util.report2h("eqqGetData", "end_eqqGetData", "ok");
				qqweb.portal.speedTest.sRTS(11, "end", (new Date()), true);
			});
			if (w) {
			} else {
				w = true;
				this.timer = window.setInterval(K, 60000);
			}
		};
		var F = {inject:function () {
			qqweb.portal.addNotificationSource(EQQ, "NotifyMessage", "NotifyHasHandled");
			z.addObserver(EQQ, "MessageReceive", F.onMessageReceive);
			z.addObserver(EQQ, "NotifyHasHandled", F.onNotifyHasHandled);
		}, onMessageReceive:function (J) {
			var aa = [], ad, Z = J.uin || J.gid;
			for (var ab in J.msgList) {
				var ag = J.msgList[ab];
				if (!Z) {
					Z = ag.from_uin;
				}
				ad = {targetModel:EQQ, uin:Z, type:ag.type, msgId:ag.msg_id, title:Z, content:"", time:ag.time || m.date.format(new Date(), "YYYY-MM-DD hh:mm:ss"), isAllow:true, resetCount:false, extraInfo:{}};
				switch (ag.type) {
				  case "single":
					var af = WebqCore.api.__api.getChatBox(Z);
					ad.title = (ag.sender ? (ag.sender.htmlShowName || Z) : Z);
					ad.content = EQQ.util.trimChatMsg(ag);
					ad.resetCount = af;
					ad.extraInfo = {isChatBoxOpen:af};
					break;
				  case "group":
					var af = WebqCore.api.__api.getChatBox(Z);
					var ae = EQQ.Model.BuddyList.isGroupPrompt(Z);
					var ac = EQQ.Model.BuddyList.getGroupByGid(Z);
					ad.title = (ac ? (ac.htmlShowName || Z) : Z);
					ad.content = EQQ.util.trimChatMsg(ag);
					ad.isAllow = ae;
					ad.resetCount = af;
					ad.extraInfo = {isChatBoxOpen:af};
					break;
				  case "system":
					ad.content = ag.content;
					ad.extraInfo = {uin:ag.opt.uin, nick:ag.opt.nick, allow:ag.opt.allow, type:ag.opt.type, msg:ag.opt.msg, gid:ag.opt.gid};
					break;
				  default:
					break;
				}
				aa.push(ad);
			}
			z.notifyObservers(EQQ, "NotifyMessage", aa);
		}, onNotifyHasHandled:function (Z) {
			switch (Z.type) {
			  case "single":
				WebqCore.api.call(["chat", ["single", Z.uin]]);
				break;
			  case "group":
				var J = EQQ.Model.BuddyList.getGroupByGid(Z.uin);
				m.profile("EQQ.onNotifyHasHandled - group.code: " + J.code);
				WebqCore.api.call(["chat", ["group", J.code]]);
				break;
			  case "system":
				qqweb.portal.runApp("buddyAdder", Z.extraInfo);
				break;
			  default:
				break;
			}
		}};
		var o = function (J) {
			EQQ.setIsLogin(false);
			m.out("\u5bf9\u4e0d\u8d77\uff0c\u767b\u5f55\u5931\u8d25\uff01");
			qqweb.portal.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
			var Z = (J && J.text) || "\u767b\u5f55\u5931\u8d25";
			EQQ.Presenter.MainPanel.showReLoginPanel(J.text);
		};
		var Y = 0;
		var K = function () {
			if (Y > 240) {
				Y = 0;
			}
			z.notifyObservers(EQQ, "NotifyBeat_1");
			if ((Y % 2) == 0) {
				z.notifyObservers(EQQ, "NotifyBeat_2");
			}
			if ((Y % 5) == 0) {
				z.notifyObservers(EQQ, "NotifyBeat_5");
				if ((Y % 10) == 0) {
					z.notifyObservers(EQQ, "NotifyBeat_10");
					if ((Y % 30) == 0) {
						z.notifyObservers(EQQ, "NotifyBeat_30");
						if ((Y % 60) == 0) {
							z.notifyObservers(EQQ, "NotifyBeat_60");
							if ((Y % 120) == 0) {
								z.notifyObservers(EQQ, "NotifyBeat_120");
								if ((Y % 240) == 0) {
									z.notifyObservers(EQQ, "NotifyBeat_240");
								}
							}
						}
					}
				}
			}
			Y++;
		};
		var u;
		var k = 0;
		var X = false;
		var r = 0;
		this.startBeat2 = function () {
			X = true;
			k = 0;
			u = window.setInterval(d, 250);
			m.out(">>>>>>>>>: startBeat2");
		};
		this.stopBeat = function () {
			this.stopBeat2();
			window.clearInterval(this.timer);
			this.timer = null;
		};
		this.stopBeat2 = function () {
			X = false;
			window.clearInterval(u);
			k = 0;
			u = null;
			m.out(">>>>>>>>>: stopBeat2");
		};
		this.isStartBeat2 = function () {
			return X;
		};
		this.addNeedBeat2 = function (J) {
			if (!q[J]) {
				q[J] = true;
				r++;
			}
			if (!EQQ.isStartBeat2()) {
				EQQ.startBeat2();
			}
		};
		this.removeNeedBeat2 = function (J) {
			if (q[J]) {
				if (r > 0) {
					r--;
				}
				delete q[J];
			}
			if (r === 0) {
				EQQ.stopBeat2();
			}
		};
		var d = function () {
			if (k > 5000) {
				k = 0;
			}
			z.notifyObservers(EQQ, "NotifyBeat_250");
			if ((k % 2) == 0) {
				z.notifyObservers(EQQ, "NotifyBeat_500");
				if ((k % 6) == 0) {
					z.notifyObservers(EQQ, "NotifyBeat_1000");
				}
				if ((k % 10) == 0) {
					z.notifyObservers(EQQ, "NotifyBeat_3000");
					if ((k % 20) == 0) {
						z.notifyObservers(EQQ, "NotifyBeat_5000");
					}
				}
			}
			k++;
		};
		this.startPoll = function () {
			this.setNeedPollFlag(true);
			this.keepPoll();
			EQQ.RPCService.pollWatcher.startWatch();
		};
		this.keepPoll = function () {
			if (this.getNeedPollFlag()) {
				EQQ.RPCService.sendPoll();
			}
		};
		this.setNeedPollFlag = function (J) {
			return j = J;
		};
		this.getNeedPollFlag = function () {
			return j;
		};
		this.stopPoll = function () {
			this.setNeedPollFlag(false);
			EQQ.RPCService.pollWatcher.stopWatch();
		};
		this.setIsLogin = function (J) {
			c = J;
		};
		this.getIsLogin = function () {
			return c;
		};
		this.getChatboxMode = function () {
			return C.chatboxMode ? C.chatboxMode : "free";
		};
		this.getSendMsgKey = function () {
			return C.isNotNeedCtrlKey;
		};
		this.setSendMsgKey = function (J) {
			C.isNotNeedCtrlKey = J;
			var Z = {context:this, data:{retype:1, app:"QQWeb", itemlist:m.json.stringify({isNotNeedCtrlKey:J})}};
			qqweb.rpcService.sendSetConfig(Z);
		};
		this.initSendMsgKey = function (J) {
			C.isNotNeedCtrlKey = J;
		};
		this.initChatboxMode = function (J) {
			C.chatboxMode = J;
		};
		this.setChatboxMode = function (Z) {
			C.chatboxMode = Z;
			var J = {context:this, data:{retype:1, app:"QQWeb", itemlist:m.json.stringify({chatboxMode:Z})}};
			qqweb.rpcService.sendSetConfig(J);
		};
		this.getLoadLoginScript = function () {
			return this.isLoadEqqScript;
		};
		this.setLoadLoginScript = function (J) {
			this.isLoadEqqScript = J;
		};
	};
	var a = "EQQ";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (i) {
		var q = i.dom, p = i.event, k = i.string, n = i.http;
		var l = 1;
		var h = function (x, D) {
			var H = "";
			if (D) {
				for (var B = 0; B < x.content.length; B++) {
					var A = x.content[B];
					if (A[0] === "face") {
						H += v(A[1]);
					} else {
						if (A[0] === "cface") {
							if (x.type == "group") {
								H += g(A[2]);
							} else {
								H += g(A[1]);
							}
						} else {
							if (A[0] === "cface_idx") {
								if (x.type == "group") {
									H += g(A[2]);
								} else {
									H += g(A[1]);
								}
							} else {
								if (A[0] === "pic_id") {
								} else {
									if (A[0] === "image") {
									} else {
										if (A[0] === "offpic") {
											var y = EQQ.Model.ChatMsg.getSendPicUrlByFilePath(A[1]);
											if (y != "") {
												H += s(y);
											}
										} else {
											if (A[0] === "rffile") {
												H += "<div class=\"msgFileBox\">\u60a8\u62d2\u7edd\u63a5\u6536\"" + k.encodeHtmlSimple(A[1]) + "\",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
											} else {
												if (A[0] === "agfile") {
													H += "<div class=\"msgFileBox\">\u60a8\u540c\u610f\u4e86\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\".</div>";
												} else {
													if (A[0] === "sendfile") {
														H += "<div class=\"msgFileBox\">\u60a8\u53d1\u9001\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\"\u7ed9\u5bf9\u65b9.</div>";
													} else {
														if (A[0] === "transtimeout") {
															H += "<div class=\"msgFileBox\">\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
														} else {
															if (A[0] === "refusedbyclient") {
																H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
															} else {
																if (A[0] === "transok") {
																	H += "<div class=\"msgFileBox\">\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\"\u4f20\u8f93\u6210\u529f.</div>";
																} else {
																	if (A[0] === "transerror") {
																		H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\"\u6216\u4f20\u8f93\u9519\u8bef,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
																	} else {
																		if (!i.isArray(A)) {
																			H += j(k.encodeHtmlSimple(j(A, 1)), 2);
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			} else {
				var w = x.sender_uin || x.from_uin;
				var C = x.from_uin || 0;
				var F = [];
				var G;
				var z;
				if (x.content[0][0] !== "font") {
					z = 0;
				} else {
					z = 1;
				}
				for (; z < x.content.length; z++) {
					var A = x.content[z];
					if (A[0] === "face") {
						H += v(A[1]);
					} else {
						if (A[0] === "cface") {
							F.push(A);
							if (x.type == "group") {
								H += f(A[1], x.group_code, x.sender_uin, x.raw_time);
							} else {
								H += r(x.msg_id, A[1], w);
							}
						} else {
							if (A[0] === "cface_idx") {
								if (x.type == "group") {
									H += m(x.msg_id, F[A[1]][1], x.group_code, x.time);
								} else {
									H += r(x.msg_id, F[A[1]][1], w);
								}
							} else {
								if (A[0] === "pic_id") {
									G = A[1];
								} else {
									if (A[0] === "image") {
										H += e(G, w, A[2], A[1]);
									} else {
										if (A[0] === "offpic") {
											if (A[1].success == 1) {
												H += o(A[1].file_path, C);
											} else {
												H += u();
											}
										} else {
											if (A[0] === "rfile") {
												var E = x.from_uin + "_" + A[2];
												var I = EQQ.Model.ChatMsg.getFilesList();
												H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u6587\u4ef6:<br />";
												H += "<span class=\"icon_" + d(A[1]) + "\">&nbsp;</span>" + k.encodeHtmlSimple(A[1]);
												H += "<span class=\"fileAct\">";
												if (I[E].isread) {
													H += "&nbsp;[\u540c\u610f][\u62d2\u7edd]";
												} else {
													H += "&nbsp;<a id=\"agree_" + E + "\" href=\"#\">[\u540c\u610f]</a>";
													H += "&nbsp;<a id=\"refuse_" + E + "\" href=\"#\">[\u62d2\u7edd]</a>";
												}
												H += "</span>";
												H += "</div>";
											} else {
												if (A[0] === "rffile") {
													H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
												} else {
													if (A[0] === "rtfile") {
														H += "<div class=\"msgFileBox\">\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
													} else {
														if (A[0] === "wrfile") {
															H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u5df2\u540c\u610f\u63a5\u6536\"" + k.encodeHtmlSimple(A[1]) + "\",\u5f00\u59cb\u4f20\u8f93\u6587\u4ef6.</div>";
														} else {
															if (A[0] === "wrffile") {
																H += "<div class=\"msgFileBox\">\u5bf9\u65b9\u62d2\u7edd\u4e86\u63a5\u6536\u6587\u4ef6\"" + k.encodeHtmlSimple(A[1]) + "\",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>";
															} else {
																if (A[0] === "video") {
																	H += k.encodeHtmlSimple(A[1]);
																} else {
																	H += j(k.encodeHtmlSimple(j(A, 1)), 2);
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			H = H.replace(/\r\n|\r|\n/ig, "<br />");
			return H;
		};
		var v = function (w) {
			return "<img class=\"EQQ_faceImg\" src=\"" + EQQ.CONST.SYSTEM_FACE_URL + EQQ.CONST.T_TRANSFER_TABLE[w] + ".gif\" />";
		};
		var r = function (y, w, z, x) {
			x = x || 5;
			return "<img src=\"" + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_cface2?lcid=" + y + "&guid=" + w + "&to=" + z + "&count=" + x + "&time=1&clientid=" + EQQ.RPCService.getClientId() + "&psessionid=" + EQQ.getPsessionid() + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var m = function (z, w, x, y) {
			var A = Math.round(new Date().getTime() / 1000);
			return "<img src=\"" + EQQ.CONST.AVATAR_SERVER_DOMAIN + "cgi/svr/chatimg/get?pic=" + w.name + "&gid=" + x + "&time=" + A + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var f = function (z, y, x, A) {
			var w = z.server.toString().split(":");
			return "<img src=\"" + EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?gid=" + y + "&uin=" + x + "&rip=" + w[0] + "&rport=" + w[1] + "&fid=" + z.file_id + "&pic=" + z.name + "&vfwebqq=" + qqweb.portal.getVfWebQQ() + "&t=" + A + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var s = function (w) {
			return "<img src=\"" + w + "\" id=\"cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var e = function (z, y, A, w, x) {
			return "<img src=\"" + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_image2?lcid=" + z + "&guid={" + y + "}" + w + "." + x + "&to=" + A + "&count=1&time=1&psessionid=" + EQQ.getPsessionid() + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var g = function (w) {
			return "<img src=\"" + EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + w + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var o = function (w, x) {
			return "<img src=\"" + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_offpic2?file_path=" + w + "&f_uin=" + x + "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc() + "&psessionid=" + EQQ.getPsessionid() + "\" id=\"_cface_" + (l++) + "\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\" />";
		};
		var u = function () {
			return "<img src=\"style/images/img_error.gif\" title=\"\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\u63a5\u6536\u9519\u8bef\u6216\u4e0d\u5b58\u5728\" />";
		};
		var t = function (x) {
			var w = h(x);
			w = w.replace(/^(<br \/>|&nbsp;)+/ig, "");
			w = w.replace(/(<a([^>]+)>|<\/a>)/ig, "");
			w = w.replace(/<div class="msgFileBox">([\s\S]+?)<\/div>/ig, function (z) {
				z = z.replace(/(<span([\s\S]+?)<\/span>)+?/ig, "");
				z = z.replace(/(:<br \/>)+?/ig, ":");
				return z.replace(/(<div([^>]+?)>|<\/div>)+/ig, "");
			});
			var y = w.indexOf("<br />");
			if (y != -1) {
				w = w.substr(0, y);
			}
			w = w.replace(/(&nbsp;)+$/ig, "");
			w = w.replace(/<img.*?\/?>/ig, function (z) {
				if (/class="EQQ_faceImg"/.test(z)) {
					return z;
				} else {
					return "<img src=\"./style/images/image_icon.png\" />";
				}
			});
			return w;
		};
		var j = function (x, w) {
			if (w === 2) {
				var y = /\[url\][\s\S]+?\[\/url\]/g;
				x = x.replace(y, function (A) {
					A = A.replace(/(\[url\]|\[\/url\])/g, "");
					var z = A.replace(/^www\./, function (B) {
						return "http://" + B;
					});
					return "<a href=\"" + z + "\" class=\"chatLink\" target=\"_blank\"><span class=\"msgLink\">" + A + "</span></a>";
				});
			} else {
				var y = /((([a-zA-Z0-9]{3,10})?:\/\/)|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"\-]+([0-9a-zA-Z\/#])+?/g;
				x = x.replace(y, function (z) {
					return "[url]" + z + "[/url]";
				});
			}
			return x;
		};
		var c = function (A) {
			if (A[0] === "font") {
				var x = A[1].style;
				var z = i.string.encodeHtmlAttributeSimple(A[1].name + "");
				z = z.match(/宋体|黑体|隶书|微软雅黑|楷体_GB2312|幼圆|Arial Black|Arial|Verdana|Times New Roman/);
				if (z) {
					z = z[0];
				} else {
					z = "\u5b8b\u4f53";
				}
				var w = A[1].color.match(/([0-9a-f]{6})/);
				if (w) {
					w = w[0];
				} else {
					w = "000";
				}
				var y = "color:#" + w + ";font-family:" + z + ";font-size:" + Number(A[1].size) + "pt;font-weight:" + (!!x[0] ? "bold" : "normal") + ";font-style:" + (!!x[1] ? "italic" : "normal") + ";text-decoration:" + (!!x[2] ? "underline" : "none") + ";";
				return y;
			} else {
				return "";
			}
		};
		var d = function (y) {
			if (typeof (y) == "undefined" || y == "") {
				return;
			}
			var w = y.split("."), x = w[w.length - 1].toLowerCase();
			switch (x) {
			  case "excel":
			  case "xls":
			  case "xlsx":
				x = "excel";
				break;
			  case "doc":
			  case "docx":
				x = "word";
				break;
			  case "ppt":
			  case "pptx":
				x = "ppt";
				break;
			  case "bmp":
			  case "png":
			  case "gif":
			  case "jpeg":
			  case "jpg":
			  case "ico":
				x = "pic";
				break;
			  case "tga":
			  case "tif":
			  case "psd":
			  case "tiff":
				x = "pic";
				break;
			  case "mov":
			  case "avi":
			  case "mpeg":
			  case "mpg":
			  case "ra":
			  case "rm":
			  case "rmvb":
			  case "qt":
			  case "asf":
			  case "wmv":
			  case "swf":
			  case "flv":
			  case "mp4":
				x = "media";
				break;
			  case "mp3":
			  case "wav":
			  case "mid":
				x = "music";
				break;
			  case "arj":
			  case "rar":
			  case "zip":
			  case "jar":
			  case "7z":
			  case "tar":
			  case "uc2":
			  case "gz":
			  case "lha":
			  case "ace":
			  case "tgz":
				x = "rar-zip";
				break;
			  case "txt":
			  case "text":
				x = "share-txt";
				break;
			  case "pdf":
				x = "pdf16";
				break;
			  case "com":
				x = "exe16";
				break;
			  default:
				x = "others";
				break;
			}
			return x;
		};
		this.translateFontStyle = c;
		this.translateChatMsg = h;
		this.trimChatMsg = t;
		this.Marquee = new i.Class({init:function (w) {
			var x = this;
			this.speed = w.speed || 40;
			this.stopTime = w.stopTime || 3000;
			this.lineHeight = w.lineHeight || 20;
			this.target = w.target;
			this.timer = null;
			this.lineTimer = null;
			this.intervaler = null;
			this.scrollHeight = this.lineHeight;
			this.isStop = false;
			this._onTimeRun = function () {
				x.scrollOneLine();
			};
		}, scrollOneLine:function () {
			if (this.scrollHeight > 0) {
				this.scrollHeight--;
				var w = this.target.style.top.match(/-?\d+/);
				w = (!w) ? 0 : parseInt(w[0]);
				this.target.style.top = (--w) + "px";
				this.lineTimer = setTimeout(this._onTimeRun, this.speed);
			} else {
				if (!this.isStop) {
					this.update();
				}
			}
		}, stop:function () {
			if (this.timer) {
				clearTimeout(this.timer);
			}
		}, stopAll:function () {
			this.stop();
			if (this.lineTimer) {
				clearTimeout(this.lineTimer);
			}
		}, reset:function () {
			this.target.style.top = "0px";
		}, update:function () {
			if (this.isStop) {
				return;
			}
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.scrollHeight = this.lineHeight;
			var x = this.target.style.top.match(/\d+/);
			var w = q.getScrollHeight(this.target);
			if (!!x && !!w) {
				x = parseInt(x[0]);
				if (x >= w) {
					this.target.style.top = this.lineHeight + "px";
					this.scrollOneLine();
					return;
				}
			}
			this.timer = setTimeout(this._onTimeRun, this.stopTime);
		}, walkOnLastLine:function () {
			this._onTimeRun();
		}});
	};
	var a = "EQQ.util";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (m) {
		var z = this, r = false, g = this, w = m.dom, u = m.event, j = (new Date()).getTime(), f = 0, B = 0, v = String(m.random(0, 99)) + String((new Date()).getTime() % 1000000), q = 0, i = 0, A = false, h = 0;
		var k = EQQ.CONST.CONN_SERVER_DOMAINS[0];
		var t;
		var o = function () {
			var C = function (E) {
				return E.replace(/,"/g, ":").replace(/[{"}]/g, "");
			};
			var D = function (E) {
				return E.replace(/[\r\t\n\s]/g, "");
			};
			return function (I, E) {
				try {
					if (arguments.length == 2) {
						return !E || arguments.callee(I);
					} else {
						var F = qqweb.portal.getUin();
						if (I.status) {
							var G = [F, I.status, D(I.responseText) + ":", decodeURIComponent(I.data), I.uri].join("$");
						} else {
							I = I.o;
							var G = [F, I.status, D(I.responseText) + ":", decodeURIComponent(I.data), I.uri].join("$");
						}
						if (true || Math.random() < 0.1) {
							qqweb.rpcService.formSend("http://tj.qstatic.com/log", {method:"POST", data:{r:C(G)}});
						}
					}
				}
				catch (H) {
				}
			};
		};
		o = o();
		var d = function () {
			f++;
			m.out("onFail: " + f);
			if (f > 4) {
				f = 0;
				u.notifyObservers(z, "FailCountOverMax");
			}
		};
		var y = function () {
			if (!A) {
				B++;
				if (B > 3) {
					i++;
					e();
					B = 0;
				}
			}
		};
		var l = function () {
			f = 0;
			B = 0;
		};
		var s = false;
		var x = [];
		var p = function (F, H) {
			if (t) {
				return c(F, H);
			} else {
				x.push({url:F, option:H});
				if (s) {
					return;
				}
				s = true;
				var E = document.body, I = w.node("div");
				var G = "<iframe id=\"EQQ_ProxySendIframe\" class=\"hiddenIframe\" name=\"EQQ_ProxySendIframe\" width=\"1\" height=\"1\" src=\"about:blank\"></iframe>";
				I.innerHTML = G;
				E.appendChild(I);
				var D = w.id("EQQ_ProxySendIframe");
				var C = function () {
					m.out(D.readyState, null, 1);
					var N = window.frames.EQQ_ProxySendIframe;
					t = N.ajax;
					if (t) {
						A = false;
						for (var L = 0; L < x.length; ++L) {
							var Q = i % EQQ.CONST.CONN_PROXY_URLS.length;
							var K = x[L].url;
							if (K.indexOf(EQQ.CONST.CONN_SERVER_DOMAINS[Q]) == -1) {
								K = K.replace(/http:\/\/.*.com\//, "");
								x[L].url = EQQ.CONST.CONN_SERVER_DOMAINS[Q] + K;
							}
							var J = x[L].url;
							var M = x[L].option;
							try {
								return c(J, M);
							}
							catch (P) {
								m.out("eqq ajax\u4ee3\u7406\u51fa\u9519\uff1a" + J + " " + EQQ.CONST.CONN_PROXY_URL);
								if (!M.onError) {
									return;
								}
								var O = {};
								O.arguments = M.arguments || {};
								M.onError.call(M.context, O);
							}
						}
					} else {
						D.setAttribute("src", EQQ.CONST.CONN_PROXY_URLS[0]);
					}
				};
				u.on(D, "load", C);
				D.setAttribute("src", EQQ.CONST.CONN_PROXY_URLS[0]);
			}
		};
		var e = function () {
			var C = w.id("EQQ_ProxySendIframe");
			var D = i % EQQ.CONST.CONN_PROXY_URLS.length;
			A = true;
			C.setAttribute("src", EQQ.CONST.CONN_PROXY_URLS[D]);
			k = EQQ.CONST.CONN_SERVER_DOMAINS[D];
		};
		var c = function (D, F) {
			F = F || {};
			F.cacheTime = F.cacheTime || 0;
			F.onSuccess = F.onSuccess || function () {
			};
			F.onError = F.onError || function () {
			};
			F.onTimeout = F.onTimeout || function () {
			};
			F.onComplete = F.onComplete || function () {
			};
			var E = {method:F.method || "GET", enctype:F.enctype || "", data:F.data || {}, arguments:F.arguments || {}, context:F.context || null, timeout:F.timeout, onSuccess:function (K) {
				var I = {};
				var H = false;
				K.responseText = K.responseText || "-";
				try {
					I = m.json.parse(K.responseText);
				}
				catch (J) {
					K.responseText = K.responseText + ":BJF:";
					H = true;
					m.out("JSON\u683c\u5f0f\u51fa\u9519:" + J);
				}
				finally {
					I.arguments = F.arguments || {};
					I.o = K;
					F.onSuccess.call(F.context, I, H);
				}
			}, onError:function (H) {
				F.onError.call(F.context, H);
			}, onTimeout:function (I) {
				var H = {};
				H.arguments = F.arguments || {};
				F.onTimeout.call(F.context, H);
			}, onComplete:function (I) {
				var H = {};
				H.arguments = F.arguments || {};
				F.onComplete.call(F.context, H);
			}};
			E.data.clientid = v;
			E.data.psessionid = EQQ.getPsessionid();
			if (A) {
				E.onError();
				return;
			}
			qqweb.portal.recoverCookie();
			if (E.method == "GET") {
				var G = m.string.toQueryString(E.data);
				if (F.cacheTime === 0) {
					if (G) {
						G += "&t=" + (new Date()).getTime();
					} else {
						G += "t=" + (new Date()).getTime();
					}
				}
				if (G) {
					var C = qqweb.portal.getVfWebQQ();
					if (C && !/channel/ig.test(D)) {
						G += "&vfwebqq=" + C;
					}
					D = D + "?" + G;
				}
				E.data = null;
				return t(D, E);
			} else {
				E.contentType = "application/x-www-form-urlencoded";
				if (D.indexOf("?") === -1) {
					return t(D, E);
				} else {
					return t(D, E);
				}
			}
		};
		this._proxy = t;
		function n() {
			var C = this;
			this.pollRequst = undefined;
			this.POLLTICK = 0;
			this._check = function () {
				C.check();
			};
		}
		n.prototype = {pollStop:function () {
			m.out("a poll Over...");
			this.pollRequst = null;
			this.POLLTICK = 0;
			this.timer = null;
		}, check:function () {
			m.out("check...");
			if (this.pollRequst == null) {
				m.out("Oooops, somethingWrong...");
				this.POLLTICK++;
				if (this.POLLTICK == 1) {
					setTimeout(this._check, 5000);
				}
			}
			if (this.POLLTICK == 2) {
				m.out("Oooops, send...");
				qqweb.rpcService.formSend("http://tj.qstatic.com/log", {method:"POST", data:{j:"unwanted-poll-stop"}});
				this.POLLTICK = 0;
			}
		}, startWatch:function () {
			m.out("start...");
			try {
				u.addObserver(EQQ, "NotifyBeat_2", this._check);
			}
			catch (C) {
			}
			this.POLLTICK = 0;
		}, stopWatch:function () {
			m.out("stop...");
			try {
				u.removeObserver(EQQ, "NotifyBeat_2", this._check);
			}
			catch (C) {
			}
			this.POLLTICK = 0;
		}};
		this.pollWatcher = new n();
		this.init = function () {
		};
		this.getClientId = function () {
			return v;
		};
		this.send = p;
		this.sendLogin = function (D) {
			D.clientid = v;
			D.psessionid = EQQ.getPsessionid();
			var C = this.send(k + "channel/login2", {context:this, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), onSuccess:this.sendLoginSuccess, onError:this.sendLoginError, onTimeout:this.sendLoginTimeout});
			qqweb.util.report2h("eqqLoginCgi", "start");
			qqweb.portal.speedTest.sRTS(16, "start", (new Date()));
		};
		this.sendLoginSuccess = function (E, D) {
			switch (E.retcode) {
			  case 0:
				h = 1;
				u.notifyObservers(EQQ, "LoginSuccess", E.result);
				qqweb.portal.speedTest.sRTS(4, "start", (new Date()));
				qqweb.portal.speedTest.sRTS(5, "start", (new Date()));
				break;
			  case 106:
				u.notifyObservers(EQQ, "UinNotInWhitelist", E.result);
				break;
			  case 111:
				u.notifyObservers(EQQ, "UinInBlacklist", E.result);
				break;
			  case 112:
				u.notifyObservers(EQQ, "Overload", E.result);
				break;
			  case 100000:
			  case 100001:
			  case 100002:
				u.notifyObservers(EQQ, "PtwebqqFail", E.result);
				break;
			  default:
				m.out("\u672a\u77e5\u767b\u5f55\u5931\u8d25");
				u.notifyObservers(EQQ, "LoginFailure", {text:"\u8fde\u63a5\u5931\u8d25"});
				m.out("[sendLogin] error: " + E.retcode);
				o(E, !D);
				break;
			}
			var C = (["ok"])[E.retcode] || E.retcode;
			qqweb.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", C);
			o(E, D);
			qqweb.portal.speedTest.sRTS(16, "end", (new Date()), true);
		};
		this.sendLoginError = function (C) {
			m.out("sendLoginError");
			u.notifyObservers(EQQ, "LoginFailure", {text:"\u8fde\u63a5\u5931\u8d25"});
			qqweb.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "error");
			o(C);
		};
		this.sendLoginTimeout = function (C) {
			m.out("sendLoginError");
			u.notifyObservers(EQQ, "LoginFailure", {text:"\u8fde\u63a5\u5931\u8d25"});
			qqweb.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "timeout");
			o(C);
		};
		this.sendLogout = function (D) {
			var C = this.send(k + "channel/logout2", {context:this, data:D, onSuccess:function (E) {
				if (E.retcode === 0 || E.retcode === 100) {
					h = 0;
					u.notifyObservers(this, "LogoutSuccess", E.result);
					m.out(":LogoutSuccess...");
				} else {
					m.out("[SendLogout] error: " + E.retcode);
				}
			}});
		};
		this.sendReLink = function (D) {
			D.clientid = v;
			D.psessionid = EQQ.getPsessionid();
			if (z._state) {
				D.status = z._state;
			}
			var C = this.send(k + "channel/login2", {context:this, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), onSuccess:this.sendReLinkSuccess, onError:this.sendReLinkError, onTimeout:this.sendReLinkTimeout});
		};
		this.sendReLinkSuccess = function (D, C) {
			switch (D.retcode) {
			  case 0:
				h = 1;
				u.notifyObservers(EQQ, "ReLinkSuccess", D.result);
				break;
			  case 113:
			  case 115:
			  case 112:
				u.notifyObservers(EQQ, "ReLinkFailure", D);
				break;
			  default:
				u.notifyObservers(EQQ, "ReLinkStop");
				o(D, !C);
				break;
			}
			o(D, C);
		};
		this.sendReLinkError = function (C) {
			m.out("sendReLinkError");
			u.notifyObservers(EQQ, "ReLinkFailure");
			o(C);
		};
		this.sendReLinkTimeout = function (C) {
			m.out("sendReLinkTimeout");
			u.notifyObservers(EQQ, "ReLinkFailure");
			o(C);
		};
		this.sendGetOnlineBuddies = function (D) {
			var C = this.send(k + "channel/get_online_buddies2", {context:this, data:{}, onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "GetOnlineBuddiesSuccess", F.result);
				} else {
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendMsg = function (D) {
			D.clientid = v;
			D.psessionid = EQQ.getPsessionid();
			var C = this.send(k + "channel/send_msg2", {context:this, cacheTime:0, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "SendMsgSuccess", F.result);
				} else {
					m.out("[sendMsg] error: " + F.retcode + "-" + F.errmsg);
					u.notifyObservers(this, "SendMsgError", {uin:D.to, retcode:F.retcode, errmsg:F.errmsg});
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendGroupMsg = function (D) {
			D.clientid = v;
			D.psessionid = EQQ.getPsessionid();
			var C = this.send(k + "channel/send_group_msg2", {context:this, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "SendGroupMsgSuccess", F.result);
				} else {
					m.out("[sendGroupMsg] error: " + F.retcode + "-" + F.errmsg);
					u.notifyObservers(this, "SendMsgError", {uin:D.to, retcode:F.retcode, errmsg:F.errmsg});
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendPoll = function (C) {
			C = C || {};
			var D = C.data || {};
			if (q < h) {
				q++;
				z.pollWatcher.pollRequst = this.send(k + "channel/poll2", {context:this, cacheTime:0, data:D, timeout:90000, onSuccess:this.sendPollSuccess, onError:this.sendPollError, onTimeout:this.sendPollTimeout});
			}
		};
		this.sendPollSuccess = function (E, C) {
			z.pollWatcher.pollStop();
			var D = (new Date()).getTime();
			var G = D - j;
			j = D;
			q--;
			if (E.retcode === 0 || E.retcode === 102) {
				l();
				try {
					u.notifyObservers(this, "PollSuccess", E.result);
				}
				catch (F) {
					m.out("PollSuccess, but [PollSuccess notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1);
				}
				try {
					u.notifyObservers(this, "PollComplete");
				}
				catch (F) {
					m.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1);
				}
			} else {
				if (E.retcode === 100) {
					u.notifyObservers(this, "NotLogin");
				} else {
					if (E.retcode === 120) {
						u.notifyObservers(EQQ, "ReLinkFailure", E);
					} else {
						if (E.retcode === 121) {
							u.notifyObservers(EQQ, "ReLinkFailure", E);
						} else {
							if (E.retcode === 116) {
								qqweb.portal.setPtwebqq(E.p);
								u.notifyObservers(this, "PollComplete");
							} else {
								try {
									u.notifyObservers(g, "PollComplete");
								}
								catch (F) {
									m.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1);
								}
								if (E.retcode != 109 && E.retcode != 110) {
									d();
								}
							}
						}
					}
				}
			}
			o(E, C);
		};
		this.sendPollTimeout = function (D) {
			z.pollWatcher.pollStop();
			var C = this;
			q--;
			try {
				u.notifyObservers(C, "PollComplete");
			}
			catch (E) {
				m.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1);
			}
			d();
		};
		this.sendPollError = function (C) {
			this.sendPollTimeout(C);
			o(C);
		};
		this.sendChangeStatus = function (E, C) {
			E = E || {newstatus:"hidden"};
			var D = this.send(k + "channel/change_status2", {context:this, data:E, arguments:E, onSuccess:function (G, F) {
				if (G.retcode === 0) {
					u.notifyObservers(this, "ChangeStatusSuccess", G.result);
					z._state = G.arguments.newstatus;
				} else {
					o(G, !F);
				}
				o(G, F);
			}, onError:function (F) {
				o(F);
			}});
		};
		this.sendGetSessionSignature = function (D) {
			var C = this.send(k + "channel/get_session_sig2", {context:this, data:{group_uin:D.group_uin, to_uin:D.to_uin}, arguments:{group_uin:D.group_uin, to_uin:D.to_uin}, onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "GetSessionSignatureSuccess", F);
				} else {
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendGroupBuddyMsg = function (D) {
			var C = this.send(k + "channel/send_session_msg2", {context:this, data:D, onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "SendMsgSuccess", F.result);
				} else {
					u.notifyObservers(this, "SendMsgError", {uin:D.to, retcode:F.retcode, errmsg:F.errmsg});
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendGetCustomFaceList = function () {
			qqweb.portal.recoverCookie();
			var C = m.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {query:"cmd=1?t=" + ((new Date()).getTime()) + "&vfwebqq=" + qqweb.portal.getVfWebQQ(), onSuccess:function (D) {
				if (typeof (custom_face) !== "undefined") {
					u.notifyObservers(z, "SendGetCustomFaceListSuccess", custom_face);
				} else {
					z.sendGetCustomFaceList();
				}
			}});
		};
		this.sendDeleteCustomFace = function (D) {
			qqweb.portal.recoverCookie();
			var C = m.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {query:"cmd=12&bd=" + D.img + "&vfwebqq=" + qqweb.portal.getVfWebQQ(), onSuccess:function (E) {
				if (typeof (cface_delete_result) !== "undefined") {
					u.notifyObservers(z, "SendDeleteCustomFaceSuccess", D.callback || function () {
					});
				} else {
				}
			}});
		};
		this.sendGetGroupCustomFaceKey = function (D) {
			var C = this.send(k + "channel/get_gface_sig2", {context:this, arguments:D.arguments, onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "SendGetGroupCustomFaceKeySuccess", F);
				} else {
					u.notifyObservers(this, "SendGetGroupCustomFaceKeyError", {uin:D.to, retcode:F.retcode, errmsg:F.errmsg});
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendGetGroupCustomFaceInfo = function (D) {
			D.clientid = v;
			D.psessionid = EQQ.getPsessionid();
			var C = this.send(k + "channel/send_group_msg2", {context:this, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "SendGetGroupCustomFaceInfoSuccess", F);
				} else {
					u.notifyObservers(this, "SendMsgError", {uin:D.to, retcode:F.retcode, errmsg:F.errmsg});
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendGetOfflinePicUrl = function (D) {
			var C = this.send(k + "channel/apply_offline_pic_dl2", {context:this, data:D, onSuccess:function (F, E) {
				if (F.retcode === 0) {
					u.notifyObservers(this, "sendGetOfflinePicUrlSuccess", F);
				} else {
					u.notifyObservers(this, "getSendPicUrlError", F);
					m.out("[sendGetOfflinePicUrlError] error: ");
					o(F, !E);
				}
				o(F, E);
			}, onError:function (E) {
				o(E);
			}});
		};
		this.sendRefuseFile = function (D) {
			var C = this.send(k + "channel/refuse_file2", {context:this, data:D, onSuccess:function (E) {
			}});
		};
		this.sendGetMyAvatarFlag = function (D) {
			D = D || {};
			D.type = 1;
			D.psessionid = EQQ.getPsessionid();
			D.clientid = EQQ.RPCService.getClientId();
			var C = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/query_user_flag", {context:this, method:"GET", data:D, arguments:{}, onSuccess:function (E) {
				if (E.retcode === 0) {
					u.notifyObservers(this, "GetMyAvatarFlagSuccess", E);
				} else {
					u.notifyObservers(this, "GetMyAvatarFlagError", E);
				}
			}, onError:function (E) {
				u.notifyObservers(this, "GetMyAvatarFlagError", E);
			}});
		};
		this.sendDeleteMyAvatarFlag = function (D) {
			D = D || {};
			D.vfwebqq = qqweb.portal.getVfWebQQ();
			D.type = 1;
			D.img_id = 0;
			D.psessionid = EQQ.getPsessionid();
			D.clientid = EQQ.RPCService.getClientId();
			var C = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/del_chead", {context:this, method:"POST", data:"r=" + encodeURIComponent(m.json.stringify(D)), arguments:{}, onSuccess:function (E) {
				if (E.retcode === 0) {
					u.notifyObservers(this, "DeleteMyAvatarFlagSuccess", E);
				} else {
					u.notifyObservers(this, "DeleteMyAvatarFlagError", E);
				}
			}, onError:function (E) {
				u.notifyObservers(this, "DeleteMyAvatarFlagError", E);
			}});
		};
	};
	var a = "EQQ.RPCService";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (l) {
		var w = this, v = l.event, s, z, x, i, m, o, r, f, y, n, q, j, k, u, h, c, g;
		var e = new l.Class({init:function (A) {
			this.uin = A.uin;
			this.allow = A.allow;
			this.face = A.face;
			this.age = A.age;
			this.gender = A.gender;
			this.vip = A.vip || false;
			this.clientType = A.clientType || "10000";
			this.setAvatar(EQQ.getUserAvatar(this.uin));
			this.setNick(A.nick || A.uin);
			this.setState(A.state || EQQ.hash.onlineStatus.offline);
			this.setClassId(A.classId || 0);
		}, setClientType:function (A) {
			this.clientType = A || "10000";
		}, setAvatar:function (A) {
			this.avatarUrl = A;
			v.notifyObservers(EQQ.Model.BuddyList, "AvatarChange", this);
		}, getAvatar:function () {
			return EQQ.getUserAvatar(this.uin);
		}, setNick:function (A) {
			this.nick = l.string.toSingleLine(A);
			this.htmlNick = l.string.encodeHtmlSimple(this.nick);
			this.titleNick = (this.nick);
			this.updateNames();
		}, setMarkName:function (A) {
			this.markName = l.string.toSingleLine(A.toString());
			this.htmlMarkName = l.string.encodeHtmlSimple(this.markName.toString());
			this.titleMarkName = l.string.encodeHtmlAttributeSimple(this.markName.toString());
			this.updateNames();
		}, updateNames:function () {
			this.updateShowName();
			this.updateAllName();
			v.notifyObservers(EQQ.Model.BuddyList, "UserNameChange", this);
		}, updateShowName:function () {
			this.showName = this.markName || this.nick || this.uin.toString();
			this.htmlShowName = l.string.encodeHtmlSimple(this.showName.toString());
			this.titleShowName = l.string.encodeHtmlAttributeSimple(this.showName.toString());
		}, updateAllName:function () {
			this.allName = "";
			var A = "";
			if (this.markName) {
				A = this.markName + "(" + this.nick + ")";
				this.allName = this.markName + "(" + this.nick + ")";
			} else {
				A = this.nick;
				this.allName = this.nick;
			}
			this.htmlAllName = l.string.encodeHtmlSimple(this.allName);
			this.titleAllName = l.string.encodeHtmlAttributeSimple(A);
		}, setClassId:function (A) {
			this.classId = A;
		}, setSignature:function (A) {
			if (A != undefined) {
				this.signature = A;
				this.htmlSignature = l.string.encodeHtmlSimple(A);
				this.titleSignature = l.string.encodeHtmlAttributeSimple(A);
			}
			v.notifyObservers(EQQ.Model.BuddyList, "UserSignatureChange", this);
		}, getSignature:function () {
			if (this.signature != undefined) {
				this.setSignature();
			} else {
				qqweb.rpcService.sendGetSignature(this.uin);
			}
		}, setQQLevel:function (A) {
			if (A != undefined) {
				this.level = A;
			}
			v.notifyObservers(EQQ.Model.BuddyList, "UserQQLevelChange", this);
		}, getQQLevel:function () {
			if (this.level != undefined) {
				this.setQQLevel();
			} else {
				qqweb.rpcService.sendGetQQLevel(this.uin);
			}
		}, setState:function (A) {
			this.state = A;
		}, getState:function () {
			return this.state;
		}, setFace:function (A) {
			this.face = A;
		}, setGender:function (A) {
			this.gender = A;
		}, setAllow:function (A) {
			this.allow = A;
		}, setUsercard:function (A, B) {
			this.usercard = this.usercard || {};
			this.usercard[A] = {title:B, htmlAttribute:l.string.encodeHtmlAttributeSimple(B), html:l.string.encodeHtmlSimple(B)};
			v.notifyObservers(EQQ.Model.BuddyList, "UserCardChange", this.usercard);
		}, getUsercard:function (A) {
			this.usercard = this.usercard || {};
			return this.usercard[A];
		}});
		var p = new l.Class({init:function (A) {
			this.gid = A.gid;
			this.code = A.code;
			this.mask = String(A.mask);
			this.preMask = String(this.mask);
			this.setName(A.name);
			this.setMarkName(A.markName);
			this.setType(A.type);
			this.isLoadInfo = false;
			this.hasManageAuthority = false;
			this.uin2members = {};
			this.level = 0;
		}, setMask:function (A) {
			this.preMask = String(this.mask);
			this.mask = String(A);
			v.notifyObservers(EQQ.Model.BuddyList, "SingleGroupMaskChange", this);
		}, setName:function (A) {
			this.name = l.string.toSingleLine(A);
			this.htmlName = l.string.encodeHtmlSimple(A);
			this.titleName = l.string.encodeHtmlAttributeSimple(A);
			this.updateNames();
		}, setMarkName:function (A) {
			if (typeof (A) == "undefined" || A == "") {
				return false;
			}
			this.markName = l.string.toSingleLine(A);
			this.htmlMarkName = l.string.encodeHtmlSimple(A);
			this.titleMarkName = l.string.encodeHtmlAttributeSimple(A);
			this.updateNames();
		}, updateNames:function () {
			this.updateShowName();
			this.updateAllName();
			v.notifyObservers(EQQ.Model.BuddyList, "GroupNameChange", this);
		}, updateShowName:function () {
			this.showName = this.markName || this.name || String(this.code);
			this.htmlShowName = l.string.encodeHtmlSimple(this.showName);
			this.titleShowName = l.string.encodeHtmlAttributeSimple(this.showName);
		}, updateAllName:function () {
			var A = "";
			this.allName = "";
			if (this.markName) {
				A = this.markName + "(" + this.name + ")";
				this.allName = this.markName + "(" + this.name + ")";
			} else {
				A = this.name;
				this.allName = this.name + "<" + this.code + ">";
			}
			this.htmlAllName = l.string.encodeHtmlSimple(this.allName);
			this.titleAllName = l.string.encodeHtmlAttributeSimple(A);
		}, type2text:{commonGroup:"\u666e\u901a\u7fa4", seniorGroup:"\u9ad8\u7ea7\u7fa4", superGroup:"\u8d85\u7ea7\u7fa4", expireSuperGroup:"\u8fc7\u671f\u7684\u8d85\u7ea7\u7fa4", enterpriseGroup:"\u4f01\u4e1a\u7fa4", forbiddenGroup:"\u7981\u7528"}, setType:function (A) {
			this.type = A;
			this.typeText = this.type2text[A] || "\u5176\u4ed6\u7c7b\u578b\u7fa4";
			this.htmlTypeText = l.string.encodeHtmlSimple(this.typeText);
			this.titleTypeText = l.string.encodeHtmlAttributeSimple(this.typeText);
		}, setLevel:function (A) {
			this.level = A || 0;
		}, setAnnouncement:function (A) {
			if (typeof (A) != "undefined") {
				this.announcement = A;
				this.htmlAnnouncement = l.string.encodeHtmlSimple(A);
				this.titleAnnouncement = l.string.encodeHtmlAttributeSimple(A);
				v.notifyObservers(w, "GroupAnnouncementChange", this);
			}
		}, upAnnouncement:function (A) {
			if (typeof (A) != "undefined") {
				this.announcement = A;
				this.htmlAnnouncement = l.string.encodeHtmlSimple(A);
				this.titleAnnouncement = l.string.encodeHtmlAttributeSimple(A);
				v.notifyObservers(w, "GroupAnnouncementChange", this);
			}
		}, updateMembers:function (A, B) {
			if (A) {
				this.members = A;
				this.onlineMemberCount = B;
				this.uin2members[A.uin] = A;
			}
			v.notifyObservers(w, "GroupMembersChange", this);
		}, updateMemberState:function (I) {
			var F = I.stats;
			var C = this.members;
			var E = 0;
			var H = {};
			var G = [];
			for (E = 0; E < F.length; E++) {
				H[F[E].uin] = F[E].stat;
			}
			var B = C.length;
			for (E = 0; E < B; E++) {
				var D = C[E].info;
				var A = D.uin;
				H[A] = H[A] || 20;
				if (D.gstate != H[A]) {
					if (A != s) {
						G.push({uin:A, stat:H[A], oldStat:D.gstate});
						D.gstate = H[A];
					}
				}
			}
			v.notifyObservers(w, "GroupMemberStateChange", {t:this, arg:G});
		}, updateMemberCard:function (D) {
			var B = this.members;
			var C = false;
			for (var E in B) {
				var A = B[E];
				if (A.uin == D.uin) {
					if (D.card == "") {
						this.members[E].usercard = l.string.encodeHtmlSimple(A.nick);
						this.members[E].info.setUsercard(this.code, A.nick);
					} else {
						this.members[E].usercard = l.string.encodeHtmlSimple(D.card);
						this.members[E].info.setUsercard(this.code, D.card);
					}
					C = true;
					break;
				}
			}
			if (C) {
				v.notifyObservers(w, "GroupMemberCardChange", {gid:this.gid, gcode:this.code, uin:D.uin});
			}
		}});
		var t = {onSelfInfoReady:function (B) {
			var A = B;
			if (w.getSelf()) {
				var C = w.getSelf();
				C.setNick(A.nick);
				C.setFace(A.face);
				C.setGender(A.gender);
				C.setAllow(A.allow);
				C.vip = A.vip;
				C.age = A.age;
			} else {
				w.setSelf(A);
			}
		}, onGetUserInfoSuccess:function (E) {
			var A = E.result;
			if (A) {
				var D = E.arguments.uin;
				var B = w.getUserByUin(D);
				if (B) {
					B.setNick(A.nick);
					B.setFace(A.face);
					B.setGender(A.gender);
					B.setAllow(A.allow);
				} else {
					var C = {uin:E.arguments.uin, allow:A.allow, nick:A.nick, face:A.face, gender:A.gender};
					B = w.createUser(C);
					w.addStranger(B);
				}
				v.notifyObservers(w, "GetUserInfoSuccess", B);
			}
		}, onGetUserInfoError:function (A) {
		}, onGetBuddySignatureSuccess:function (D) {
			var A = D.result;
			var B;
			if (A.length == 0) {
				B = "";
			} else {
				B = A[0].lnick;
			}
			var C = w.getUserByUin(D.arguments.uin);
			if (C) {
				C.setSignature(B);
			}
			v.notifyObservers(w, "GetBuddySignatureSuccess", C);
		}, onChangeGroupMaskSuccess:function (A) {
			if (A.uin == w.getSelfUin()) {
				g = A.mask;
				v.notifyObservers(w, "GroupMaskChange", g);
			} else {
				var B = w.getGroupByGid(A.uin);
				B.setMask(A.mask);
			}
		}, onGetQQLevelSuccess:function (B) {
			var A = w.getUserByUin(B.arguments.uin);
			if (A) {
				A.setQQLevel(B.result);
			}
		}, onGetGroupMaskConfigSuccess:function (B) {
			for (var A in B) {
				var C = parseInt(B[A]);
				if (A === "global") {
					g = C;
					v.notifyObservers(w, "GroupMaskChange", g);
				} else {
				}
			}
		}, onGetOnlineBuddiesSuccess:function (A) {
			w.setAllBuddyState(A);
		}, onGetSessionSignatureSuccess:function (A) {
			w.setGroupBuddySessionSignature(A);
		}, onBuddyStatusChange:function (A) {
			w.setState(A.uin, A.status, A.client_type);
		}, onGetSelfSignatureSuccess:function (A) {
			w.setSelfSignature(A);
		}, onGetBuddyListSuccess:function (A) {
			var C = A.categories || [];
			var B = false;
			for (var D = 0; D < C.length; D++) {
				if (C[D].index == 0) {
					B = true;
				}
			}
			if (!B) {
				C.unshift({index:0, name:"\u6211\u7684\u597d\u53cb"});
			}
			w.isBuddyList = true;
			w.setBuddyClass(A);
			w.setBuddyList(A);
			EQQ.RPCService.sendGetOnlineBuddies();
		}, GetBuddyListError:function (A) {
			v.notifyObservers(EQQ, "LoginFailure", {text:"\u62c9\u53d6\u5931\u8d25"});
		}, onGetGroupListSuccess:function (A) {
			w.isGroupList = true;
			var G = A.gmasklist || [];
			var C = 0;
			for (var D = 0; D < G.length; D++) {
				var E = G[D];
				if (E.gid === 1000) {
					C = E.mask;
				} else {
					for (var B = 0; B < A.gnamelist.length; B++) {
						var F = A.gnamelist[B];
						if (F.gid === E.gid) {
							A.gnamelist[B].mask = E.mask;
							break;
						}
					}
				}
			}
			w.setGroupList(A);
			w.setGroupMask(C);
		}, GetGroupListError:function (A) {
			v.notifyObservers(EQQ, "LoginFailure", {text:"\u62c9\u53d6\u5931\u8d25"});
		}, onGetGroupInfoSuccess:function (A) {
			w.setGroupInfo(A);
		}, onGetRecentListSuccess:function (A) {
			w.setRecentList(A);
		}, onPollSuccess:function (A) {
			if (A) {
				for (var B = 0; B < A.length; B++) {
					var C = A[B];
					switch (C.poll_type) {
					  case "buddies_status_change":
						t.onBuddyStatusChange(C.value);
						break;
					}
				}
			}
		}, onLoginSuccess:function (A) {
			var B = w.getSelfUin();
			w.setState(B, A.status, "QQWeb");
			EQQ.index = A.index;
			EQQ.port = A.port;
		}, onAddANewBuddy:function (C) {
			var E = C.tuin;
			var B = C.gid;
			var A = C.newstate;
			var D = C.markname;
			qqweb.rpcService.sendGetUserInfo(E, null, null, function (K) {
				if (K.retcode === 0) {
					var F = K.result;
					var J = K.arguments.uin;
					var G = w.getUserByUin(J);
					if (G) {
						G.setNick(F.nick);
						G.setFace(F.face);
						G.setGender(F.gender);
						G.setClassId(B);
						w.addBuddy(G);
					} else {
						var I = {uin:J, allow:F.allow, nick:F.nick, face:F.face, gender:F.gender, classId:B};
						G = w.createUser(I);
						w.addBuddy(G);
					}
					var H = EQQ.Model.BuddyList.getClassById(B);
					H.count = H.count + 1;
					v.notifyObservers(EQQ.Model.BuddyList, "AddBuddy", {user:G, newstate:A, markname:D});
				} else {
				}
			});
		}};
		this.init = function () {
			z = [];
			x = {};
			i = [];
			m = {};
			o = [];
			r = {};
			f = [];
			y = {};
			n = [];
			q = {};
			r = {};
			j = [];
			k = [];
			h = {}, c = {};
			v.addObserver(qqweb.rpcService, "GetUserInfoSuccess", t.onGetUserInfoSuccess);
			v.addObserver(qqweb.rpcService, "GetUserInfoError", t.onGetUserInfoError);
			v.addObserver(qqweb.rpcService, "GetGroupInfoSuccess", t.onGetGroupInfoSuccess);
			v.addObserver(qqweb.rpcService, "GetQQLevelSuccess", t.onGetQQLevelSuccess);
			v.addObserver(qqweb.rpcService, "GetBuddySignatureSuccess", t.onGetBuddySignatureSuccess);
			v.addObserver(EQQ, "LoginSuccess", t.onLoginSuccess);
			v.addObserver(EQQ.RPCService, "GetOnlineBuddiesSuccess", t.onGetOnlineBuddiesSuccess);
			v.addObserver(EQQ.RPCService, "GetSelfSignatureSuccess", t.onGetSelfSignatureSuccess);
			v.addObserver(EQQ.RPCService, "GetSessionSignatureSuccess", t.onGetSessionSignatureSuccess);
			v.addObserver(EQQ.RPCService, "PollSuccess", t.onPollSuccess);
			v.addObserver(w, "AddANewBuddy", t.onAddANewBuddy);
			v.addObserver(w, "BuddyStatusChange", t.onBuddyStatusChange);
			v.addObserver(qqweb.portal, "selfInfoReady", t.onSelfInfoReady);
		};
		this.reset = function () {
			s = 0;
			z = [];
			x = {};
			i = [];
			m = {};
			o = [];
			r = {};
			f = [];
			y = {};
			n = [];
			q = {};
			r = {};
			j = [];
			k = [];
			h = {}, c = {};
			this.setSelf(qqweb.portal.self || {uin:qqweb.portal.getUin()});
		};
		this.sendGetBuddyList = function (A) {
			A = A || {};
			A.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_user_friends2", {context:this, method:"POST", param:A, callback:function (C, D) {
				if (C.retcode === 0) {
					t.onGetBuddyListSuccess(C.result);
					D(C);
				} else {
					t.GetBuddyListError(C);
				}
				var B = (["ok"])[C.retcode] || C.retcode;
				qqweb.util.report2h("eqqGetData", "end_BuddyList", B);
				qqweb.portal.speedTest.sRTS(14, "end", (new Date()), true);
			}, errback:function (B) {
				t.GetBuddyListError(B);
				qqweb.util.report2h("eqqGetData", "end_BuddyList", "error");
			}});
		};
		this.sendGetGroupList = function (A) {
			A = A || {};
			A.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_group_name_list_mask2", {context:this, method:"POST", param:A, callback:function (C, D) {
				if (C.retcode === 0) {
					t.onGetGroupListSuccess(C.result);
					D(C);
				} else {
					t.GetGroupListError(C);
				}
				var B = (["ok"])[C.retcode] || C.retcode;
				qqweb.util.report2h("eqqGetData", "end_GroupList", B);
				qqweb.portal.speedTest.sRTS(15, "end", (new Date()), true);
			}, errback:function (B) {
				t.GetGroupListError(B);
				qqweb.util.report2h("eqqGetData", "end_GroupList", "error");
			}});
		};
		this.sendGetRecentList = function (A) {
			A = A || {};
			A.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_recent_contact2", {context:this, method:"POST", param:A, callback:function (B) {
				if (B.retcode === 0) {
					t.onGetRecentListSuccess(B.result);
				} else {
				}
			}, errback:function (B) {
			}});
		};
		this.getUserSignature = function (B) {
			var A = this.getUserByUin(B);
			if (A) {
				A.getSignature();
			}
		};
		this.sendGetQQLevel = function (B) {
			var A = this.getUserByUin(B);
			if (A) {
				A.getQQLevel();
			}
		};
		this.setSelf = function (A) {
			var C = {uin:A.uin || null, allow:A.allow || null, nick:A.nick || null, face:A.face || null, age:A.age || null, gender:A.gender || null, vip:A.vip || null};
			var B = this.createUser(C);
			this.setSelfUin(A.uin);
			var D = EQQ.getDefaultState();
			this.setState(A.uin, D, "QQWeb");
			v.notifyObservers(this, "SelfInfoChange", this.getSelf());
		};
		this.getSelf = function () {
			return this.getUserByUin(this.getSelfUin());
		};
		this.getSelfState = function () {
			var A = this.getSelf();
			if (A) {
				return A.state;
			}
		};
		this.setSelfUin = function (A) {
			s = A || 0;
		};
		this.getSelfUin = function () {
			return s;
		};
		this.setSelfSignature = function (A) {
			this.getUserByUin(this.getSelfUin()).setSignature(A);
			v.notifyObservers(this, "SelfSignatureChange", this.getSelf());
		};
		this.sendChangeStatus = function (A) {
			EQQ.RPCService.sendChangeStatus({newstatus:A});
		};
		this.sendChangeGroupMask = function (D) {
			var C = D.type === "global" ? D.mask : g;
			var E = {cAll:C, idx:EQQ.index, port:EQQ.port};
			for (var A = 0; A < k.length; A++) {
				var B = k[A];
				if (D.type === "single" && D.uin === B.gid) {
					E[B.gid] = D.mask;
				} else {
					E[B.gid] = B.mask;
				}
			}
			qqweb.rpcService.sendSetConfig({onSuccess:function () {
				t.onChangeGroupMaskSuccess({uin:D.uin, mask:D.mask});
			}, context:this, data:{retype:1, app:"EQQ", itemlist:"{\"groupmask\":" + l.json.stringify(E) + "}"}, action:"messagefilter"});
		};
		this.setBuddyClass = function (A) {
			z = A.categories;
			for (var B = 0; B < z.length; B++) {
				var C = z[B];
				C.caculateName = C.name;
				C.htmlName = l.string.encodeHtmlSimple(C.name);
				C.titleName = l.string.encodeHtmlAttributeSimple(C.name);
				C.count = 0;
				C.onlineCount = 0;
				C.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
				x[C.index] = C;
			}
			v.notifyObservers(this, "BuddyClassChange", this.getClassList());
		};
		this.getClassList = function () {
			return z;
		};
		this.setAllBuddyState = function (A) {
			j = [];
			for (var C = 0; C < A.length; C++) {
				var B = A[C];
				this.setState(B.uin, B.status, B.client_type);
			}
			v.notifyObservers(this, "AllOnlineBuddyReady", this.getOnlineBuddy());
			v.notifyObservers(this, "AllClassOnlineBuddyReady", this.getClassList());
		};
		this.setState = function (D, B, A) {
			var H = this.getUserByUin(D);
			if (H) {
				var E = H.state;
				H.setState(B);
				H.clientType = A;
				if (D == this.getSelfUin()) {
					v.notifyObservers(this, "SelfStateChange", this.getSelfState());
				} else {
					if (H.classId === EQQ.hash.userClassType.stranger) {
					} else {
						if (H.classId === EQQ.hash.userClassType.balck) {
						} else {
							var F = this.getClassByUin(H.uin);
							F.list[H.state].unshift(H);
							var J = F.list[E];
							for (var G = 0; G < J.length; G++) {
								if (J[G].uin == D) {
									J.splice(G, 1);
								}
							}
							var C = EQQ.hash.onlineStatus.offline;
							if (E == C || B == C) {
								F.onlineCount = F.count - F.list[C].length;
								if (B == C) {
									for (var I = 0; I < j.length; I++) {
										if (j[I].uin == D) {
											j.splice(I, 1);
										}
									}
								} else {
									j.push({uin:D, state:B, clientType:A});
								}
								v.notifyObservers(this, "OnlineBuddyChange", D);
							}
							v.notifyObservers(this, "BuddyStateChange", D);
						}
					}
				}
			}
		};
		this.getState = function (B) {
			var A = this.getUserByUin(B);
			if (A) {
				return A.getState();
			} else {
				return null;
			}
		};
		this.getOnlineBuddy = function () {
			return j;
		};
		this.addUser = function (A) {
			if (m[A.uin]) {
			} else {
				m[A.uin] = A;
				i.push(A);
			}
			return A;
		};
		this.addBuddy = function (A) {
			if (r[A.uin]) {
			} else {
				A.type = "buddy";
				r[A.uin] = A;
				o.push(A);
			}
			return A;
		};
		this.createUser = function (B) {
			var A = new e(B);
			this.addUser(A);
			return A;
		};
		this.addStranger = function (A) {
			if (y[A.uin]) {
			} else {
				A.type = "stranger";
				y[A.uin] = A;
				f.push(A);
			}
			return A;
		};
		this.addBlack = function (A) {
			if (q[A.uin]) {
			} else {
				A.type = "black";
				q[A.uin] = A;
				n.push(A);
			}
			return A;
		};
		this.getStrangerList = function () {
			return f;
		};
		this.setBuddyList = function (I) {
			o = [];
			var H = I.friends;
			var E = this.getSelfUin();
			for (var F = 0; F < H.length; F++) {
				if (H[F].uin != E) {
					var B = I.info[F];
					var G = {uin:B.uin, allow:B.allow, nick:B.nick, face:B.face, age:B.age, gender:B.gender, vip:B.vip, classId:(this.getClassById(H[F].categories)) ? H[F].categories : 0};
					var D = this.createUser(G);
					this.addBuddy(D);
				}
			}
			var A = I.marknames;
			if (A) {
				for (var F = 0; F < A.length; F++) {
					var D = this.getUserByUin(A[F].uin);
					if (D) {
						D.setMarkName(A[F].markname);
					}
				}
			}
			for (var F = 0; F < o.length; F++) {
				if (o[F].uin != this.getSelfUin()) {
					var C = this.getClassById(o[F].classId);
					if (!C.list[o[F].state]) {
						C.list[o[F].state] = [];
					}
					C.list[o[F].state].push(o[F]);
					C.count++;
				}
			}
			v.notifyObservers(this, "BuddyListChange", this.getBuddyList());
		};
		this.getBuddyList = function () {
			return o;
		};
		this.addNewBuddy = function () {
		};
		this.searchBuddy = function (C, E) {
			C = String(C).toLowerCase();
			var A = [];
			var B = [];
			if (C.length > 0) {
				for (var F = 0; F < o.length; F++) {
					var D = o[F];
					if ((String(D.nick).toLowerCase().indexOf(C) > -1 && String(D.nick) != "undefined") || (String(D.markName).toLowerCase().indexOf(C) > -1 && String(D.markName) != "undefined")) {
						if (String(D.nick).toLowerCase() == C || String(D.markName).toLowerCase() == C) {
							B.push(D);
						} else {
							A.push(D);
						}
					}
					if (A.length + B.length >= E) {
						break;
					}
				}
			}
			Array.prototype.push.apply(B, A);
			return B;
		};
		this.isUser = function (A) {
			return (l.array.indexOf(i, A) !== -1);
		};
		this.isBuddy = function (A) {
			return r[A];
		};
		this.getBuddyByUin = function (A) {
			return r[A];
		};
		this.isStranger = function (A) {
			return y[A];
		};
		this.isBlack = function (A) {
			return q[A];
		};
		this.getUserByUin = function (A) {
			if (m) {
				return m[A];
			} else {
			}
		};
		this.getClassIdByUin = function (A) {
			return m[A].classId;
		};
		this.getClassByUin = function (A) {
			var B = this.getClassIdByUin(A);
			return this.getClassById(B);
		};
		this.getClassById = function (A) {
			return x[A];
		};
		this.addGroup = function (A) {
			if (c[A.code]) {
			} else {
				c[A.code] = h[A.gid] = A;
				k.push(A);
			}
			return A;
		};
		this.setGroupList = function (B) {
			var I = B.gnamelist;
			var H = B.gmarklist || [];
			k = [];
			for (var C = 0; C < I.length; C++) {
				var A = I[C];
				var F = "commonGroup";
				if (A.flag & 16) {
					F = "seniorGroup";
				} else {
					if (A.flag & 33554432) {
						F = "superGroup";
					} else {
						if (A.flag & 2) {
							F = "forbiddenGroup";
						} else {
							if (A.flag & 256) {
								F = "enterpriseGroup";
							} else {
								if (A.flag & 67108864) {
									F = "expireSuperGroup";
								}
							}
						}
					}
				}
				var E = d(H, A.gid);
				var D = {gid:A.gid, code:A.code, type:F, name:A.name, markName:E, mask:A.mask || "0"};
				var G = new p(D);
				this.addGroup(G);
			}
			v.notifyObservers(this, "GroupListChange", this.getGroupList());
		};
		var d = function (C, A) {
			for (var B in C) {
				if (C[B].uin == A) {
					return C[B].markname;
				}
			}
			return "";
		};
		this.setGroupMask = function (A) {
			g = A;
			v.notifyObservers(this, "GroupMaskChange", g);
		};
		this.getGroupMask = function () {
			return g;
		};
		this.getGroupList = function () {
			return k;
		};
		this.setRecentList = function (A) {
			u = A.contents;
			v.notifyObservers(this, "RecentListChange", this.getRecentList());
		};
		this.getRecentList = function () {
			return u;
		};
		this.setGroupInfo = function (K) {
			var J = K.ginfo;
			var B = K.minfo;
			var A = K.stats;
			var Z = {};
			for (var U = A.length; U--; ) {
				var M = A[U];
				Z[M.uin] = A[U];
			}
			var E = K.cards || [];
			var I = this.getGroupByCode(J.code);
			I.setLevel(J.level);
			var P = this.getSelfUin();
			I.setAnnouncement(J.memo || " ");
			var T = J.members;
			var Y = [];
			var H = false;
			var W = 0;
			for (var S = 0; S < T.length; S++) {
				var R = "common";
				if (T[S].mflag & 1) {
					R = "manager";
					if (T[S].muin === P) {
						H = true;
					}
				} else {
					if (T[S].mflag & 2) {
						R = "manager2";
						if (T[S].muin === P) {
							H = true;
						}
					}
				}
				if (T[S].muin == J.owner) {
					R = "master";
					if (T[S].muin === P) {
						H = true;
					}
				}
				var C = T[S].muin;
				var X = B[S].nick;
				var G = B[S].nick;
				if (G == "") {
					G = String(C);
				}
				var F = (Z[C] && Z[C]["stat"]) || 20;
				var O = (Z[C] && Z[C]["client_type"]) || 10000;
				if (F != 20 || C === P) {
					W++;
				}
				var L = X;
				var V = X;
				for (var Q = 0; Q < E.length; Q++) {
					if (E[Q].muin == C) {
						G = E[Q].card;
						break;
					}
				}
				var ab = this.getUserByUin(T[S].muin);
				if (ab) {
					var D = qqweb.util.code2state(F);
					if (ab.uin != P) {
						ab.setState(D);
						ab.gstate = F;
					}
					if (ab.type === "groupBuddy" || ab.uin === P) {
						var aa = (G ? G : ab.showName);
						ab.setUsercard(J.code, aa);
					} else {
						G = G === X ? ab.showName : G;
					}
					ab.setClientType(O);
				} else {
					var N = {uin:C, nick:X, clientType:O, state:qqweb.util.code2state(F)};
					ab = this.createUser(N);
					ab.type = "groupBuddy";
					ab.group = I;
					ab.gstate = F;
				}
				var aa = (G ? G : ab.showName);
				ab.setUsercard(J.code, aa);
				Y[S] = {uin:C, flag:R, gcode:J.code, nick:X, htmlNick:l.string.encodeHtmlSimple(X), titleNick:(X), showName:L, htmlShowName:l.string.encodeHtmlSimple(L), titleShowName:l.string.encodeHtmlAttributeSimple(L), allName:V, htmlAllName:l.string.encodeHtmlSimple(V), titleAllName:V, usercard:l.string.encodeHtmlSimple(G)};
				Y[S].info = ab;
				I.uin2members[C] = Y[S];
			}
			I.isLoadInfo = true;
			I.hasManageAuthority = H;
			I.updateMembers(Y, W);
			v.notifyObservers(this, "GroupInfoChange", I);
		};
		this.setMemberState = function (A) {
			var B = this.getGroupByCode(A.gcode);
			B.updateMemberState(A);
		};
		this.sendGetGroupInfo = function (B) {
			B.vfwebqq = qqweb.portal.getVfWebQQ();
			var A = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext2", {context:w, data:B, arguments:B, onSuccess:function (C) {
				if (C.retcode === 0) {
					w.setGroupInfo(C.result);
				} else {
					l.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25");
				}
			}, onError:function (C) {
				l.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25");
			}});
		};
		this.sendGetGroupNewestState = function (B) {
			B.vfwebqq = qqweb.portal.getVfWebQQ();
			var A = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "get_group_member_stat2", {context:w, data:B, arguments:B, onSuccess:function (C) {
				if (C.retcode === 0) {
					w.onGetGroupNewestStateSuc(C.result);
				} else {
					l.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25");
				}
			}, onError:function (C) {
				l.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25");
			}});
		};
		this.onGetGroupNewestStateSuc = function (A) {
			this.setMemberState(A);
		};
		this.getGroupByCode = function (A) {
			return c[A];
		};
		this.getGroupByGid = function (A) {
			return h[A];
		};
		this.getGroupInfo = function (A) {
			var B = this.getGroupByCode(A);
			if (B.isLoadInfo) {
				B.updateMembers();
				B.upAnnouncement(B.announcement);
				v.notifyObservers(this, "GroupInfoChange", B);
				return B;
			} else {
				this.sendGetGroupInfo({gcode:A});
			}
		};
		this.sendGetSessionSignature = function (C) {
			var A = this.getUserByUin(C);
			var B = A.group.gid;
			EQQ.RPCService.sendGetSessionSignature({group_uin:B, to_uin:C});
		};
		this.setGroupBuddySessionSignature = function (C) {
			var B = C.arguments.to_uin;
			var A = this.getUserByUin(B);
			if (C.result.verify_sig.type === 0 && C.result.group_sig.type === 0) {
				A.chatSession = C.result;
				v.notifyObservers(this, "GroupBuddySessionSignatureChange", A.uin);
			}
		};
		this.sendGetUserInfo = function (A) {
			qqweb.rpcService.sendGetUserInfo(A);
		};
		this.isGroupPrompt = function (A) {
			var B = this.getGroupByGid(A);
			g = parseInt(g);
			switch (g) {
			  case 0:
				switch (parseInt(B.mask)) {
				  case 0:
					return true;
					break;
				  case 1:
					return false;
					break;
				  case 2:
					return false;
					break;
				}
				break;
			  case 1:
				return true;
				break;
			  case 2:
				return false;
				break;
			  case 3:
				return false;
				break;
			}
		};
	};
	var a = "EQQ.Model.BuddyList";
	WebqCore.register(a, b);
})();
(function () {
	var b = function (l) {
		var u = this, s = l.event, h = {}, v = [], f = {}, e = [], n = {}, w = null, r = {}, k = {}, i = [], d = {}, m = 0, q, c = 0, j;
		q = (new Date()).getTime();
		q = (q - q % 1000) / 1000;
		q = q % 10000 * 10000;
		var p = function () {
			m++;
			return q + m;
		};
		var o = function (x) {
			if (l.isNumber(x)) {
				x = x * 1000;
			}
			var t = new Date(x);
			return l.date.format(t, "YYYY-MM-DD hh:mm:ss");
		};
		this.init = function () {
			h = {}, v = [], f = {}, e = [], n = {}, w = null, r = {}, k = {}, i = [], d = {}, m = 0, c = 0, j = null;
			s.addObserver(EQQ.RPCService, "SendMsg", l.bind(this.onSendMsgSuccess, this));
			s.addObserver(EQQ.RPCService, "PollSuccess", l.bind(this.onPollSuccess, this));
			s.addObserver(EQQ.RPCService, "SendMsgError", l.bind(this.onSendMsgError, this));
			s.addObserver(EQQ.RPCService, "SendGetGroupCustomFaceKeySuccess", l.bind(this.onSendGetGroupCustomFaceKeySuccess, this));
			s.addObserver(EQQ.RPCService, "sendGetOfflinePicUrlSuccess", l.bind(this.onGetOfflinePicUrlSuccess, this));
			s.addObserver(EQQ.RPCService, "getSendPicUrlError", l.bind(this.onSetSendPicUrlError, this));
		};
		this.setGroupCustomFaceKey = function (t) {
			c = l.now();
			j = {key:t.gface_key, signature:t.gface_sig};
		};
		this.getGroupCustomFaceKey = function () {
			return j;
		};
		this.isGroupCustomFaceKeyTimeout = function () {
			return (l.now() - c) > 1000 * 60 * 60 * 60 * 2;
		};
		this.sendGetGroupCustomFaceKey = function (t) {
			EQQ.RPCService.sendGetGroupCustomFaceKey({arguments:{msg:t}});
		};
		this.onSendGetGroupCustomFaceKeySuccess = function (t) {
			var x = t.arguments.msg;
			this.setGroupCustomFaceKey(t.result);
			this.sendGetGroupCustomFaceInfo(x);
		};
		this.sendGetGroupCustomFaceInfo = function (C) {
			var z = this.getGroupCustomFaceKey();
			for (var y = 0; y < C.content.length; y++) {
				var B = C.content[y];
				if (B[0] === "face") {
					B[1] = EQQ.CONST.TRANSFER_TABLE[B[1]];
				}
			}
			EQQ.RPCService.sendGetGroupCustomFaceInfo({group_uin:C.to, group_code:EQQ.Model.BuddyList.getGroupByGid(C.to).code, key:z.key, sig:z.signature, content:l.json.stringify(C.content)});
			var A = p();
			var t = EQQ.Model.BuddyList.getSelf();
			var x = {type:C.type, from_uin:0, sender_uin:t.uin, sender:t, time:o(new Date()), content:C.content, msg_id:A, group_code:EQQ.Model.BuddyList.getGroupByGid(C.to).code};
			s.notifyObservers(this, "GroupMessageListChange", {gid:C.to, msgList:[x]});
		};
		this.callbackSendPic = function (x) {
			if (x.filesize > (1 * 1024 * 1024)) {
				x.retcode = "100";
				x.maxFileSize = "1MB";
				s.notifyObservers(this, "uploadSendPicError", x);
			} else {
				if (x.retcode != 0) {
					s.notifyObservers(this, "uploadSendPicError", x);
				} else {
					r[x.filepath] = x;
					var t = EQQ.Model.BuddyList.getSelf();
					EQQ.RPCService.sendGetOfflinePicUrl({f_uin:t.uin, file_path:x.filepath, clientid:u.getClientidFromRpc()});
				}
			}
		};
		this.onGetOfflinePicUrlSuccess = function (t) {
			r[t.result.file_path].fileurl = t.result.url;
			if (r[t.result.file_path]) {
				t.fileid = r[t.result.file_path].fileid;
			}
			s.notifyObservers(this, "GetSendPicUrlSuccess", t);
		};
		this.onSetSendPicUrlError = function (t) {
			if (r[t.result.file_path]) {
				t.fileid = r[t.result.file_path].fileid;
			}
			s.notifyObservers(this, "getSendPicUrlError", t);
		};
		this.getSendPicUrlByFilePath = function (t) {
			if (typeof (r[t]) == "undefined") {
				return "";
			} else {
				return r[t].fileurl;
			}
		};
		this.callbackSendPicGroup = function (x) {
			if (x.ret === 0) {
				s.notifyObservers(this, "getSendPicGroupSuccess", x.msg);
			} else {
				if (x.ret === 4) {
					var y = /[A-Fa-f0-9]{32}\.[A-Za-z]{3}/;
					var t = x.msg;
					if (t.length > 36) {
						t = t.substring(0, 36);
						if (y.test(t)) {
							s.notifyObservers(this, "getSendPicGroupSuccess", t);
						} else {
							s.notifyObservers(this, "sendPicGroupError", x);
						}
					} else {
						s.notifyObservers(this, "sendPicGroupError", x);
					}
				} else {
					s.notifyObservers(this, "sendPicGroupError", x);
				}
			}
		};
		this.sendMsg = function (E) {
			var x = p();
			var A = "";
			var G = "";
			var y;
			var z = {};
			E = E || {};
			E.type = E.type || "single";
			var F = typeof (E.attach) != "undefined" && E.attach ? E.attach : "";
			var H = EQQ.Model.BuddyList.getSelf();
			for (var D = 0; D < E.content.length; D++) {
				var C = E.content[D];
				if (C[0] === "face") {
					C[1] = EQQ.CONST.TRANSFER_TABLE[C[1]];
				}
			}
			G = l.json.stringify(E.content);
			if (E.type === "group") {
				z = {group_uin:E.to, content:G, msg_id:x};
				EQQ.RPCService.sendGroupMsg(z);
				y = {type:E.type, from_uin:0, sender_uin:H.uin, sender:H, time:o(new Date()), content:E.content, msg_id:x, group_code:EQQ.Model.BuddyList.getGroupByGid(E.to).code};
				s.notifyObservers(this, "GroupMessageListChange", {gid:E.to, msgList:[y]});
			} else {
				var t = E.to;
				var B = EQQ.Model.BuddyList.getUserByUin(t);
				if (B.type === "groupBuddy") {
					z = {to:E.to, verify_sig:(B.chatSession.verify_sig.value), group_sig:(B.chatSession.group_sig.value), face:E.face, content:G, msg_id:x};
					EQQ.RPCService.sendGroupBuddyMsg(z);
				} else {
					z = {to:E.to, face:E.face, content:G, msg_id:x};
					EQQ.RPCService.sendMsg(z);
				}
				y = {type:E.type, from_uin:0, sender_uin:H.uin, sender:H, time:o(new Date()), content:E.content, msg_id:x, attach:F};
				s.notifyObservers(this, "MessageListChange", {uin:E.to, msgList:[y]});
			}
			if (h[E.to]) {
				h[E.to].msgList.push(y);
			} else {
				h[E.to] = {last:0, msgList:[y]};
			}
		};
		this.addMsgToList = function (x) {
			var t = EQQ.Model.BuddyList.getSelf();
			var y = p();
			var z = {type:x.type, from_uin:x.from_uin, sender_uin:t.uin, sender:t, time:o(new Date()), content:x.content, msg_id:y, attach:typeof (x.attach) != "undefined" && x.attach ? x.attach : ""};
			s.notifyObservers(this, "MessageListChange", {uin:x.to, msgList:[z]});
			if (h[x.to]) {
				h[x.to].msgList.push(z);
			} else {
				h[x.to] = {last:0, msgList:[z]};
			}
		};
		this.onSendMsgSuccess = function (t) {
			if (t == "ok") {
			} else {
			}
		};
		this.onSendMsgError = function (t) {
			s.notifyObservers(this, "SendMsgError", t);
		};
		this.getMsgHistory = function (t) {
			if (h[t]) {
				s.notifyObservers(this, "MessageListChange", {uin:t, msgList:h[t].msgList});
			}
		};
		this.getGroupMsgHistory = function (t) {
			if (h[t]) {
				s.notifyObservers(this, "GroupMessageListChange", {gid:t, msgList:h[t].msgList});
			}
		};
		this.clearChatLog = function (t) {
			if (h[t]) {
				h[t] = {last:0, msgList:[]};
			}
		};
		this.receiveMsg = function (F) {
			var x = F.from_uin, E = false, C = 0;
			var D = typeof (F.attach) != "undefined" && F.attach ? F.attach : "";
			var z = {type:"single", from_uin:x, sender_uin:x, sender:EQQ.Model.BuddyList.getUserByUin(x), msg_id:F.msg_id, content:(F.content), time:o(F.time), raw_time:F.time, attach:D};
			if (h[x]) {
				var B = h[x].msgList;
				var y = B.length;
				for (var A = 0; A < y; A++) {
					if (B[A].msg_id == z.msg_id) {
						E = true;
						l.out("\u53d1\u73b0\u91cd\u590d\u4e2a\u4eba\u6d88\u606f\uff0cmsg_id\uff1a" + z.msg_id);
						break;
					}
				}
				if (!E) {
					B.push(z);
					C++;
				}
				d[x] = z.msg_id;
			} else {
				h[x] = {last:0, msgList:[]};
				h[x].msgList.push(z);
				C++;
				d[x] = z.msg_id;
			}
			var t = {last:0, msgList:[]};
			if (C > 0) {
				for (var A = 0; A < C; A++) {
					t.msgList.push(h[x].msgList[h[x].msgList.length - (C - A)]);
				}
				h[x].last = 0;
				s.notifyObservers(this, "MessageListChange", {uin:x, msgList:t.msgList});
				s.notifyObservers(EQQ, "MessageReceive", {uin:x, msgList:t.msgList});
			}
		};
		this.receiveSystemMsg = function (y) {
			var x;
			switch (y.type) {
			  case "added_buddy_sig":
			  case "added_buddy_nosig":
				x = "\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				break;
			  case "verify_pass_add":
				x = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u5e76\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				var t = {uin:y.from_uin, status:qqweb.util.code2state(y.stat), client_type:y.client_type};
				s.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {tuin:y.from_uin, gid:y.group_id, newstate:t});
				break;
			  case "verify_pass":
				x = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42";
				var t = {uin:y.from_uin, status:qqweb.util.code2state(y.stat), client_type:y.client_type};
				s.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {tuin:y.from_uin, gid:0, newstate:t});
				break;
			  case "verify_required":
				x = "\u8bf7\u6c42\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb\uff0c\u9644\u52a0\u4fe1\u606f(" + (y.msg || "\u65e0") + ")";
				break;
			  case "verify_rejected":
				x = "\u62d2\u7edd\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u9644\u52a0\u4fe1\u606f(" + (y.msg || "\u65e0") + ")";
				break;
			  default:
				x = y.type;
			}
			var z = {type:"system", sender:{htmlShowName:String(y.from_uin)}, from_uin:y.from_uin, content:x, msg_id:y.seq, opt:{uin:y.from_uin, nick:y.from_uin, allow:y.allow, type:y.type, msg:y.msg, gid:y.group_id}};
			s.notifyObservers(EQQ, "MessageReceive", {msgList:[z]});
		};
		this.receiveGroupMsg = function (F) {
			var C = F.from_uin, E = false, D = 0, z;
			var x = {type:"group", from_uin:C, sender_uin:F.send_uin, sender:EQQ.Model.BuddyList.getUserByUin(F.send_uin), msg_id:F.msg_id, content:F.content, group_code:EQQ.Model.BuddyList.getGroupByGid(C).code, time:o(F.time), raw_time:F.time};
			if (h[C]) {
				var t = h[C].msgList.length;
				for (var A = 0; A < t; A++) {
					var B = h[C].msgList[A];
					if (x.sender_uin == B.sender_uin && B.msg_id == x.msg_id) {
						E = true;
						l.out("\u53d1\u73b0\u91cd\u590d\u7fa4\u6d88\u606f\uff0cmsg_id\uff1a" + x.msg_id);
						break;
					}
				}
				if (!E) {
					h[C].msgList.push(x);
					D++;
				}
				d[C] = x.msg_id;
			} else {
				h[C] = {last:0, msgList:[]};
				h[C].msgList.push(x);
				D++;
				d[C] = x.msg_id;
			}
			z = h[C].msgList;
			var t = z.length;
			var y = [];
			if (D > 0) {
				for (var A = D; A > 0; A--) {
					y.push(z[t - A]);
				}
				h[C].last = 0;
				s.notifyObservers(this, "GroupMessageListChange", {gid:C, msgList:y});
				s.notifyObservers(EQQ, "MessageReceive", {gid:C, msgList:y});
			}
		};
		this.addMessageBoxUserList = function (x) {
			var t = f[x.from_uin];
			if (t) {
				l.array.remove(v, t);
			} else {
				s.notifyObservers(this, "flexStartJump", x.from_uin);
			}
			f[x.from_uin] = x;
			v.push(x);
			s.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList());
		};
		this.getMessageBoxUserList = function () {
			return v;
		};
		this.removeMessageBoxUserList = function (x) {
			var t = f[x];
			if (t) {
				l.array.remove(v, t);
			}
			delete f[x];
			s.notifyObservers(this, "flexStopJump", x);
			s.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList());
		};
		this.addMessageBoxGroupList = function (x) {
			var t = n[x.from_uin];
			if (t) {
				l.array.remove(e, t);
			}
			n[x.from_uin] = x;
			e.push(x);
			s.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList());
		};
		this.getMessageBoxGroupList = function () {
			return e;
		};
		this.removeMessageBoxGroupList = function (x) {
			var t = n[x];
			if (t) {
				l.array.remove(e, t);
			}
			delete n[x];
			s.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList());
		};
		this.preloadGroupMessageImages = function (I) {
			var B = I.content, x = I.send_uin, C = "", H = "", z = null, F = I.group_code, y = I.time, t = "";
			var G = function () {
				z = null;
				l.out("preload-image-success!");
			};
			var E = function (J) {
				z = null;
				l.out("preload-image-error!");
			};
			for (var D = 0, A = B.length; D < A; D++) {
				if (B[D][0] === "cface") {
					t = B[D][1];
					C = t.server.toString().split(":");
					H = EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?gid=" + F + "&uin=" + x + "&rip=" + C[0] + "&rport=" + C[1] + "&fid=" + t.file_id + "&pic=" + t.name + "&vfwebqq=" + qqweb.portal.getVfWebQQ() + "&t=" + y;
					z = new Image();
					z.src = H;
					z.onload = G;
					z.onerror = E;
				}
			}
		};
		this.onPollSuccess = function (t) {
			if (t) {
				t.sort(function (E, D) {
					var G, F;
					G = E.value && E.value.time || 0;
					F = D.value && D.value.time || 0;
					return (G < F) ? 1 : -1;
				});
				for (var y = t.length - 1; y >= 0; y--) {
					var C = t[y];
					switch (C.poll_type) {
					  case "message":
						var B = C.value;
						var A = B.from_uin;
						var z = EQQ.Model.BuddyList.isBuddy(A);
						if (B.msg_type === 9) {
							if (z) {
								this.addMessageBoxUserList(B);
								this.receiveMsg(B);
							} else {
								this.receiveStrangerMsg(B);
							}
						} else {
							if (B.msg_type === 10) {
								if (z) {
									this.receiveStrangerMsg(B);
								} else {
								}
							} else {
								if (B.msg_type === 31 || B.msg_type === 140) {
									this.receiveStrangerMsg(B);
								}
							}
						}
						break;
					  case "group_message":
						var B = C.value;
						this.addMessageBoxGroupList(B);
						this.preloadGroupMessageImages(B);
						this.receiveGroupMsg(B);
						break;
					  case "kick_message":
						l.out("\u8e22\u7ebf\u901a\u77e5\uff1a" + C.value);
						var B = C.value;
						var x = "\u60a8\u7684\u5e10\u53f7\u5728\u53e6\u4e00\u5730\u70b9\u767b\u5f55\uff0c\u60a8\u5df2\u88ab\u8feb\u4e0b\u7ebf\u3002\u5982\u6709\u7591\u95ee\uff0c\u8bf7\u767b\u5f55:safe.qq.com\u4e86\u89e3\u66f4\u591a\u3002";
						if (B.show_reason !== 0) {
							x = B.reason;
						}
						s.notifyObservers(EQQ, "SelfOffline", x);
						break;
					  case "file_message":
						l.out("\u63a5\u6536\u6587\u4ef6\u901a\u77e5" + C.value);
						this.receiveFile(C.value);
						break;
					  case "system_message":
						l.out("\u6536\u5230\u7cfb\u7edf\u6d88\u606f" + C.value);
						this.receiveSystemMsg(C.value);
						s.notifyObservers(EQQ, "SystemMessageRecive", C.value);
						break;
					  case "filesrv_transfer":
						l.out("\u6536\u5230\u6587\u4ef6\u4f20\u8f93\u6d88\u606f" + C.value);
						this.receiveTransferMsg(C.value);
						break;
					  case "tips":
						l.out("\u6536\u5230tips\u6d88\u606f" + C.value);
						this.receiveTipsMsg(C.value);
						break;
					}
				}
			}
		};
		this.receiveStrangerMsg = function (z) {
			var y = z.from_uin;
			var A = EQQ.Model.BuddyList.isStranger(y);
			if (A) {
			}
			if (EQQ.Model.BuddyList.isBuddy(y)) {
			} else {
				var A = EQQ.Model.BuddyList.isStranger(y);
				if (A) {
				} else {
					var x = {uin:y};
					var t = EQQ.Model.BuddyList.createUser(x);
					EQQ.Model.BuddyList.addUser(t);
					EQQ.Model.BuddyList.addStranger(t);
					t.setClassId(EQQ.hash.userClassType.stranger);
					EQQ.Model.BuddyList.setState(t.uin, "online", "10000");
					s.notifyObservers(this, "NewStranger", t);
				}
			}
			this.addMessageBoxUserList(z);
			this.receiveMsg(z);
			l.out("receiveStrangerMsg");
		};
		this.receiveGroupBuddyMsg = function (z) {
			var y = z.from_uin;
			var A = EQQ.Model.BuddyList.isStranger(y);
			if (A) {
			} else {
				var x = {uin:y};
				var t = EQQ.Model.BuddyList.createUser(x);
				EQQ.Model.BuddyList.addUser(t);
				EQQ.Model.BuddyList.addStranger(t);
				t.type = "groupBuddy";
				t.group = EQQ.Model.BuddyList.getGroupByGid(z.gid);
				t.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
				s.notifyObservers(this, "NewStranger", t);
				EQQ.Model.BuddyList.sendGetUserInfo(y);
			}
			this.addMessageBoxUserList(z);
			this.receiveMsg(z);
			l.out("receiveGroupBuddyMsg, finish");
		};
		this.getMessagePointer = function (t) {
			return d[t] || 0;
		};
		this.getCustomFaceList = function () {
			return w;
		};
		this.getSendPicList = function () {
			return r;
		};
		this.loadCustomFaceList = function () {
			s.addObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", g);
			EQQ.RPCService.sendGetCustomFaceList();
		};
		var g = function (t) {
			w = l.array.bubbleSort(t.data, function (y, x) {
				if (y && x) {
					return y[1] - x[1];
				}
			});
			s.notifyObservers(u, "GetCustomFaceListSuccess", w);
			s.removeObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", g);
		};
		this.deleteCustomFace = function (t) {
			EQQ.RPCService.sendDeleteCustomFace(t);
		};
		this.getClientidFromRpc = function () {
			return EQQ.RPCService.getClientId();
		};
		this.sendFile = function (z) {
			var y = [["sendfile", z.filename]];
			var t = {type:"sendfile", name:z.filename, from_uin:z.to_uin, time:(new Date().getTime()), isread:true, session_id:z.lcid};
			var x = z.to_uin + "_" + z.lcid;
			k[x] = t;
			var A = {type:"single", from_uin:0, to:z.to_uin, content:y, attach:t};
			u.addMsgToList(A);
		};
		this.receiveFile = function (A) {
			if (A.mode === "recv") {
				var z = [["rfile", A.name, A.session_id]];
				A.content = z;
				A.attach = {type:"rfile", name:A.name, from_uin:A.from_uin, time:A.time, isread:false, session_id:A.session_id, msg_type:A.msg_type};
				var x = A.from_uin + "_" + A.session_id;
				if (!k[x]) {
					k[x] = A.attach;
					this.fileMsgToJumpUserList(A);
					this.receiveMsg(A);
				} else {
					k[x] = A.attach;
				}
			} else {
				if (A.mode === "refuse") {
					if (A.type === 161) {
						return;
					}
					if (A.cancel_type == 2) {
						i[A.session_id] = true;
						var y = parseInt(A.session_id, 10).toString(2);
						if (y.length >= 12) {
							y = y.substr(y.length - 12, 12);
							A.session_id = parseInt(y, 2).toString(10);
						}
					}
					var x = A.from_uin + "_" + A.session_id;
					var t = k[x];
					if (typeof (t) == "undefined") {
						return false;
					}
					if (t.isFinished) {
						return false;
					} else {
						k[x].isFinished = true;
					}
					var z = [["rffile", t.name]];
					t.type = "rffile";
					if (A.cancel_type == 2) {
						z = [["wrffile", t.name]];
						t.type = "wrffile";
					} else {
						if (A.cancel_type == 3) {
							z = [["rtfile", t.name]];
							t.type = "rtfile";
						}
					}
					A.content = z;
					A.attach = t;
					this.fileMsgToJumpUserList(A);
					this.receiveMsg(A);
					if (A.cancel_type != 2) {
						s.notifyObservers(this, "fromCancenFile", x);
					}
				} else {
					if (A.mode === "send_ack") {
						var y = parseInt(A.session_id, 10).toString(2);
						if (y.length < 12) {
							return false;
						}
						y = y.substr(y.length - 12, 12);
						A.session_id = parseInt(y, 2).toString(10);
						var x = A.from_uin + "_" + A.session_id;
						var t = k[x];
						var z = [["wrfile", t.name, t.session_id]];
						A.content = z;
						A.attach = {type:"wrfile", name:t.name, from_uin:t.from_uin, time:A.time, session_id:A.session_id};
						this.fileMsgToJumpUserList(A);
						this.receiveMsg(A);
					} else {
						if (A.type === 161) {
							var z = [["video", "\u597d\u53cb\u53d1\u8d77\u4e86\u89c6\u9891\u6216\u97f3\u9891\u4f1a\u8bdd\u9080\u8bf7\uff0c\u7531\u4e8eWebQQ\u76ee\u524d\u6682\u4e0d\u652f\u6301\u8be5\u529f\u80fd\uff0c\u5df2\u81ea\u52a8\u62d2\u7edd\u597d\u53cb\u7684\u9080\u8bf7\u3002"]];
							A.content = z;
							A.attach = {type:"video"};
							this.fileMsgToJumpUserList(A);
							this.receiveMsg(A);
						} else {
						}
					}
				}
			}
		};
		this.agreeReceiveFile = function (t) {
			var x = [["agfile", t.name, t.session_id]];
			t.type = "agfile";
			var y = {type:"single", from_uin:0, to:t.from_uin, content:x, attach:t};
			u.addMsgToList(y);
		};
		this.refuseReceiveFile = function (t) {
			var y = [["rffile", t.name, t.session_id]];
			t.type = "rffile";
			var A = {type:"single", from_uin:0, to:t.from_uin, content:y, attach:t};
			u.addMsgToList(A);
			var x = t.from_uin + "_" + t.session_id;
			k[x].isFinished = true;
			var z = u.getClientidFromRpc();
			EQQ.RPCService.sendRefuseFile({to:t.from_uin, lcid:t.session_id, clientid:z});
		};
		this.getFilesList = function () {
			return k;
		};
		this.fileMsgToJumpUserList = function (A) {
			if (A.cancel_type && A.cancel_type == 2) {
				this.addMessageBoxUserList(A);
				return true;
			}
			if (typeof (A.msg_type) === "undefined" && !A.msg_type) {
				var x = A.from_uin + "_" + A.session_id;
				var t = k[x];
				if (typeof (t.msg_type) === "undefined" && !t.msg_type) {
					return false;
				}
				A.msg_type = t.msg_type;
			}
			var z = A.from_uin;
			var y = EQQ.Model.BuddyList.isBuddy(z);
			if (A.msg_type === 9) {
				if (y) {
					this.addMessageBoxUserList(A);
				} else {
					this.receiveStrangerFileMsg(A);
				}
			} else {
				if (A.msg_type === 10) {
					if (y) {
						this.receiveStrangerFileMsg(A);
					} else {
					}
				} else {
					if (A.msg_type === 31) {
						this.receiveGroupBuddyFileMsg(A);
					}
				}
			}
		};
		this.receiveStrangerFileMsg = function (z) {
			var y = z.from_uin;
			var A = EQQ.Model.BuddyList.isStranger(y);
			if (A) {
			} else {
				var x = {uin:y};
				var t = EQQ.Model.BuddyList.createUser(x);
				EQQ.Model.BuddyList.addUser(t);
				EQQ.Model.BuddyList.addStranger(t);
				t.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
				s.notifyObservers(this, "NewStranger", t);
			}
			this.addMessageBoxUserList(z);
			l.out("receiveStrangerFileMsg");
		};
		this.receiveGroupBuddyFileMsg = function (z) {
			var y = z.from_uin;
			var A = EQQ.Model.BuddyList.isStranger(y);
			if (A) {
			} else {
				var x = {uin:y};
				var t = EQQ.Model.BuddyList.createUser(x);
				EQQ.Model.BuddyList.addUser(t);
				EQQ.Model.BuddyList.addStranger(t);
				t.type = "groupBuddy";
				t.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
				s.notifyObservers(this, "NewStranger", t);
				EQQ.Model.BuddyList.sendGetUserInfo(y);
			}
			this.addMessageBoxUserList(z);
			l.out("receiveGroupBuddyFileMsg, finish");
		};
		this.receiveTransferMsg = function (B) {
			var z = B.file_infos[0];
			if (z.file_name == "") {
				return;
			}
			var A = "";
			var t = "";
			if (z.file_status == 51) {
				A = [["transtimeout", z.file_name, B.lc_id]];
				t = {type:"transtimeout", name:z.file_name, isread:true};
			} else {
				if (z.file_status == 50) {
					A = [["transerror", z.file_name, B.lc_id]];
					t = {type:"transerror", name:z.file_name, isread:true};
				} else {
					if (z.file_status == 53) {
						A = [["refusedbyclient", z.file_name, B.lc_id]];
						t = {type:"refusedbyclient", name:z.file_name, isread:true};
					} else {
						if (z.file_status == 0) {
							A = [["transok", z.file_name, B.lc_id]];
							t = {type:"transok", name:z.file_name, isread:true};
						} else {
							if (z.file_status == 10) {
								return false;
							} else {
								return false;
							}
						}
					}
				}
			}
			var x = B.from_uin + "_" + B.lc_id;
			var y = k[x] || {};
			if (y.isFinished || (typeof (i[B.session_id]) != "undefined" && i[B.session_id] === true)) {
				return false;
			} else {
				y.isFinished = true;
			}
			var C = {type:"single", from_uin:0, to:B.to_uin, content:A, attach:t};
			u.addMsgToList(C);
		};
		this.receiveTipsMsg = function (y) {
			var t = y.url || "";
			if (t.indexOf("run=mySignature") === -1) {
				return false;
			}
			var x = y.txt3.replace("\r\n", ":");
			y.content = x;
			y.type = "mysigntips";
			var z = {type:"mysigntips", sender:{htmlShowName:String(y.from_uin)}, from_uin:y.from_uin, allow:1, content:x, msg_id:y.msg_id, opt:{uin:y.from_uin, nick:y.from_uin, msg_id:y.msg_id, type:"mysigntips"}};
			y.aMag = z;
			s.notifyObservers(EQQ, "MessageReceive", {msgList:[z]});
		};
	};
	var a = "EQQ.Model.ChatMsg";
	WebqCore.register(a, b);
})();
(function () {
	var c = function (s) {
		var R = this, N = s.dom, L = s.event, D = s.string, i = false, p = false, V = false, v = false, al = false, k = false, ak = {}, ah = [], e = [], am = {}, O = 0, aj = 38, M = 40, U = 13, h, f = 160, C = 50, F = 20, Q = "0", u = qqweb.layout.getPanel("desktop").body, H = null, r, Y, w, X, ac = [], z = false, B, o;
		EQQ.avatarMouseoverTimer = null;
		var A = function () {
			if (H) {
				clearTimeout(H);
			}
			R.show();
		};
		var an = function () {
			if (H) {
				clearTimeout(H);
			}
			H = setTimeout(function () {
				R.hide();
				H = null;
			}, 30);
		};
		var E = function () {
			var J = this.getAttribute("state");
			R.setSelfState(J);
			pgvSendClick({hottag:"web2qq.corner.topright." + J});
		};
		var av = function () {
			N.setStyle(this, "backgroundColor", "#cbe7fc");
		};
		var y = function () {
			N.setStyle(this, "backgroundColor", "transparent");
		};
		var ap = function () {
			N.removeClass(R.EQQ_MyState, "hover");
		};
		var af = function () {
			N.addClass(R.EQQ_MyState, "hover");
		};
		var t = function () {
		};
		var ab = function (J) {
			R.toggleStatePanel(J);
		};
		var g = ab;
		var G = function (ax) {
			ax.stopPropagation();
			var J = N.getClientXY(R.EQQ_MyState);
			J[1] = J[1] + 16;
			g(J);
			pgvSendClick({hottag:"web2qq.corner.topright.statechange"});
		};
		var au = function (ax) {
			var J = this.getAttribute("classIndex");
			R.toggleClass(J);
		};
		var K = function () {
			N.setStyle(this, "backgroundColor", "#cbe7fc");
		};
		var S = function () {
			N.setStyle(this, "backgroundColor", "transparent");
		};
		var ag = function () {
			var J = this.getAttribute("uin");
			if (EQQ.avatarMouseoverTimer) {
				clearTimeout(EQQ.avatarMouseoverTimer);
				EQQ.avatarMouseoverTimer = null;
			}
			var ax = N.getClientXY(this);
			ax[0] = ax[0] - 218;
			ax[1] = ax[1] - 5;
			R.showMiniCardPanel(J, ax);
			L.notifyObservers(R, "AvatarMouseover", J);
		};
		var n = function () {
			EQQ.avatarMouseoverTimer = window.setTimeout(W, 500);
		};
		var W = function () {
			R.hideMiniCardPanel();
		};
		var aa = function () {
			if (EQQ.avatarMouseoverTimer) {
				clearTimeout(EQQ.avatarMouseoverTimer);
				EQQ.avatarMouseoverTimer = null;
			}
		};
		var P = function () {
			EQQ.avatarMouseoverTimer = window.setTimeout(W, 500);
		};
		var x = function () {
			qqweb.portal.runApp("userDetails", R.miniCardPanel.uin);
			pgvSendClick({hottag:"web2qq.minicard.contacts.more"});
		};
		var ai = function (aB) {
			aB.preventDefault();
			var aA = 2;
			var J = this.getAttribute("href");
			var az = /\d+/;
			var ay = parseInt(J.match(az)[0]);
			var ax = this;
			qqweb.rpcService.sendGetFriendUin2(ay, aA, function (aC) {
				o = aC.result.account;
				qqweb.portal.runApp("6", {url:J.replace(az, o)});
			});
			pgvSendClick({hottag:"web2qq.minicard.contacts.qzone"});
		};
		var ae = function (aB) {
			aB.preventDefault();
			var aA = 3;
			var J = this.getAttribute("href");
			var az = /\d+/;
			var ay = parseInt(J.match(az)[0]);
			var ax = this;
			qqweb.rpcService.sendGetFriendUin2(ay, aA, function (aC) {
				o = aC.result.account;
				qqweb.portal.runApp("6", {url:J.replace(az, o)});
			});
			pgvSendClick({hottag:"web2qq.minicard.contacts.qqmail"});
		};
		var j = function () {
			var ax = R.miniCardPanel.uin;
			var ay = N.id("miniCard_buddyOption_tabBody");
			if (N.getStyle(ay, "display") == "none") {
				var J = "\t\t\t\t<div class=\"miniCard_buddyOption_angle\">^</div>\t\t\t\t<div class=\"miniCard_buddyOption_Content\">\t\t\t\t\u786e\u5b9a\u5220\u9664\u6b64\u597d\u53cb\uff1f \u786e\u5b9a \u53d6\u6d88\t\t\t\t</div>\t\t\t";
				ay.innerHTML = J;
				N.setStyle(ay, "display", "block");
			} else {
				N.setStyle(ay, "display", "none");
			}
		};
		var ad = function () {
			var J = R.miniCardPanel.uin;
		};
		var l = function () {
			var J = R.miniCardPanel.uin;
		};
		var aw = function (J) {
			J.stopPropagation();
		};
		var ao = function (ax) {
			ax.preventDefault();
			ax.stopPropagation();
			var J = this.getAttribute("uin");
			L.notifyObservers(R, "StartChat", J);
		};
		var ar = function () {
			var J = this.getAttribute("code");
			L.notifyObservers(R, "StartGroupChat", J);
		};
		this.init = function () {
			ac = [];
			i = false, p = false, V = false, v = false, al = false, k = false, ak = {}, ah = [], e = [], am = {}, O = 0, H = null, r = null, Y = null, w = null, X = null, B = false, z = false;
			L.notifyObservers(R, "AddPObservers");
			L.addObserver(qqweb.app.eqq.window, "resize", s.bind(this.onEqqResize, this));
			L.addObserver(qqweb.app.eqq.window, "dragEnd", at);
			L.on(window, "resize", s.bind(this.onWindowResize, this));
			L.addObserver(qqweb.layout, "SideBarPinUp", s.bind(this.onWindowResize, this));
			L.addObserver(qqweb.layout, "SideBarPinDown", s.bind(this.onWindowResize, this));
			this.EQQ_Container = N.id("EQQ_Container");
			this.EQQ_MainPanel = N.id("EQQ_MainPanel");
			this.EQQ_MyPanel = N.id("EQQ_MyPanel");
			this.EQQ_MyAvatar = N.id("EQQ_MyAvatar");
			this.EQQ_MyNick = N.id("EQQ_MyNick");
			this.EQQ_MyState = N.id("EQQ_MyState");
			this.EQQ_MyStateShow = N.id("EQQ_MyStateShow");
			this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
			L.off(this.EQQ_MyState, "click");
			L.on(this.EQQ_MyState, "click", G);
			this.EQQ_MySignature = N.id("EQQ_MySignature");
			this.EQQ_YellowTips = N.id("EQQ_YellowTips");
			L.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);
			this.EQQ_LoginSuccess = N.id("EQQ_LoginSuccess");
			this.EQQ_SearchBar = N.id("EQQ_SearchBar");
			this.EQQ_SearchBox = N.id("EQQ_SearchBox");
			this.EQQ_SearchButton = N.id("EQQ_SearchButton");
			this.EQQ_SearchResultPanel = N.id("EQQ_SearchResultPanel");
			L.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
			L.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
			L.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
			L.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
			L.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
			L.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
			L.on(this.EQQ_SearchBox, "click", s.bind(this.startSearch, this));
			L.on(this.EQQ_SearchButton, "click", s.bind(function () {
				if (r) {
					R.hideSearchResult();
					L.notifyObservers(R, "StartChat", r.uin);
					pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
				}
			}, this));
			this.EQQ_Logining = N.id("EQQ_Logining");
			this.EQQ_Logining_feedback = N.id("EQQ_Logining_feedback");
			this.EQQ_ReLoginPanel = N.id("EQQ_ReLoginPanel");
			this.EQQ_ReLoginButton = N.id("EQQ_ReLoginButton");
			this.EQQ_ReLoginButton_text = N.id("EQQ_ReLoginButton_text");
			L.on(this.EQQ_ReLoginButton, "click", this.onReLoginButtonClick);
			this.EQQ_TabBuddyList = N.id("EQQ_TabBuddyList");
			this.EQQ_TabGroupList = N.id("EQQ_TabGroupList");
			this.EQQ_TabRecentList = N.id("EQQ_TabRecentList");
			this.EQQ_ListContainer = N.id("EQQ_ListContainer");
			this.EQQ_buddyListPanel = N.id("EQQ_buddyListPanel");
			this.EQQ_groupListOuter = N.id("EQQ_groupListOuter");
			if (s.platform.iPad) {
				new s.ui.TouchScroller(this.EQQ_buddyListPanel);
			}
			this.EQQ_buddyList = N.id("EQQ_buddyList");
			L.on(this.EQQ_buddyList, "mousedown", aw);
			L.on(this.EQQ_buddyListPanel, "scroll", aq);
			this.EQQ_createGroupButton = N.id("EQQ_createGroupButton");
			this.EQQ_searchGroupButton = N.id("EQQ_searchGroupButton");
			L.on(this.EQQ_createGroupButton, "click", qqweb.util.observer.openInWebBrowser);
			L.on(this.EQQ_createGroupButton, "click", function () {
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.CREATE"});
			});
			L.on(this.EQQ_searchGroupButton, "click", qqweb.util.observer.openInWebBrowser);
			L.on(this.EQQ_searchGroupButton, "click", function () {
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.QUNSEEK"});
			});
			this.EQQ_ListBottom_maskButton = N.id("EQQ_ListBottom_maskButton");
			L.on(this.EQQ_ListBottom_maskButton, "click", Z);
			this.EQQ_groupListPanel = N.id("EQQ_groupListPanel");
			this.EQQ_groupListInner = N.id("EQQ_groupListInner");
			if (s.platform.iPad) {
				new s.ui.TouchScroller(this.EQQ_groupListInner.parentNode);
			}
			L.on(this.EQQ_groupListInner, "mousedown", aw);
			this.EQQ_recentListPanel = N.id("EQQ_recentListPanel");
			if (s.platform.iPad) {
				new s.ui.TouchScroller(this.EQQ_recentListPanel);
			}
			this.EQQ_recentList = N.id("EQQ_recentList");
			L.on(this.EQQ_recentList, "mousedown", aw);
			this.EQQ_findBuddy = N.id("EQQ_findBuddy");
			this.EQQ_buddyManage = N.id("EQQ_buddyManage");
			L.on(this.EQQ_findBuddy, "click", function (J) {
				J.preventDefault();
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.SEEK"});
				qqweb.portal.runApp("buddyFinder", {});
			});
			L.on(this.EQQ_buddyManage, "click", function (J) {
				J.preventDefault();
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.MANAGE"});
				qqweb.portal.runApp("5", {});
			});
			this.mainTab = new s.ui.Tab();
			this.mainTab.add({trigger:this.EQQ_TabBuddyList, sheet:this.EQQ_buddyListPanel});
			this.mainTab.add({trigger:this.EQQ_TabGroupList, sheet:this.EQQ_groupListPanel});
			this.mainTab.add({trigger:this.EQQ_TabRecentList, sheet:this.EQQ_recentListPanel});
			this.mainTab.config.triggerEvent = "click";
			this.mainTab.config.slideEnabled = false;
			this.mainTab.init();
			L.addObserver(this.mainTab, "show", function (ax) {
				var J = this.indexOf(ax);
				switch (J) {
				  case 0:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"});
					break;
				  case 1:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.QUNLIST"});
					break;
				  case 2:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.RECENT.RECENTLIST"});
					break;
				}
			});
			this.onWindowResize();
			N.show(this.EQQ_MyState);
		};
		this.createStatePanelDom = function () {
			var ax = N.node("ul", {id:"EQQ_StatePanel", "class":"EQQ_statePanel"});
			u.appendChild(ax);
			this.statePanel = new qqweb.layout.PopupBox({noCatchMouseUp:true, container:ax, html:"\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetOnline\" state=\"online\"><div class=\"EQQ_stateSelect_icon EQQ_online\"></div><div class=\"EQQ_stateSelect_text\">\u6211\u5728\u7ebf\u4e0a</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetAway\" state=\"away\"><div class=\"EQQ_stateSelect_icon EQQ_away\"></div><div class=\"EQQ_stateSelect_text\">\u79bb\u5f00</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetHidden\" state=\"hidden\"><div class=\"EQQ_stateSelect_icon EQQ_hidden\"></div><div class=\"EQQ_stateSelect_text\">\u9690\u8eab</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetOffline\" state=\"offline\"><div class=\"EQQ_stateSelect_icon EQQ_offline\"></div><div class=\"EQQ_stateSelect_text\">\u79bb\u7ebf</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetCallme\" state=\"callme\"><div class=\"EQQ_stateSelect_icon EQQ_callme\"></div><div class=\"EQQ_stateSelect_text\">Q\u6211\u5427</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetBusy\" state=\"busy\"><div class=\"EQQ_stateSelect_icon EQQ_busy\"></div><div class=\"EQQ_stateSelect_text\">\u5fd9\u788c</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetSilent\" state=\"silent\"><div class=\"EQQ_stateSelect_icon EQQ_silent\"></div><div class=\"EQQ_stateSelect_text\">\u8bf7\u52ff\u6253\u6270</div></li>"});
			L.addObserver(this.statePanel, "hide", ap);
			L.addObserver(this.statePanel, "show", af);
			this.EQQ_SetOnline = N.id("EQQ_SetOnline");
			this.EQQ_SetCallme = N.id("EQQ_SetCallme");
			this.EQQ_SetAway = N.id("EQQ_SetAway");
			this.EQQ_SetBusy = N.id("EQQ_SetBusy");
			this.EQQ_SetSilent = N.id("EQQ_SetSilent");
			this.EQQ_SetHidden = N.id("EQQ_SetHidden");
			this.EQQ_SetOffline = N.id("EQQ_SetOffline");
			var J = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway, this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden, this.EQQ_SetOffline];
			s.array.forEach(J, function (aA, az, ay) {
				L.on(aA, "mouseover", av);
			});
			s.array.forEach(J, function (aA, az, ay) {
				L.on(aA, "mouseout", y);
			});
			s.array.forEach(J, function (aA, az, ay) {
				L.on(aA, "click", E);
			});
		};
		this.createGroupMaskPanelDom = function () {
			var J = N.node("div", {"class":"groupMaskPanel"});
			u.appendChild(J);
			R.groupMaskPanel = new qqweb.layout.PopupBox({container:J, html:" <a id=\"GroupMask_Costom\" state=\"0\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u4f7f\u7528\u7fa4\u81ea\u8eab\u7684\u6d88\u606f\u8bbe\u7f6e</a>\t\t\t\t\t<a id=\"GroupMask_Prompt\" state=\"1\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u63a5\u6536\u5e76\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t<a id=\"GroupMask_NoPrompt\" state=\"2\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u63a5\u6536\u4e0d\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t<a id=\"GroupMask_Mask\" state=\"3\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f</a>"});
			this.costomDom = N.id("GroupMask_Costom");
			this.promptDom = N.id("GroupMask_Prompt");
			this.noPromptDom = N.id("GroupMask_NoPrompt");
			this.maskDom = N.id("GroupMask_Mask");
			var ax = [this.costomDom, this.promptDom, this.noPromptDom, this.maskDom];
			s.array.forEach(ax, function (aA, az, ay) {
				L.on(aA, "click", m);
			});
			this.setGroupMaskState(Q);
		};
		var m = function (ax) {
			ax.preventDefault();
			var J = parseInt(this.getAttribute("state"));
			Q = J;
			R.setGroupMaskState(Q);
			L.notifyObservers(R, "SetGroupMaskState", J);
			switch (J) {
			  case "0":
			  case 0:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.QUNSELF"});
				break;
			  case "1":
			  case 1:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHALERTS"});
				break;
			  case "2":
			  case 2:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHOUTALERTS"});
				break;
			  case "3":
			  case 3:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.BLOCK"});
				break;
			}
		};
		this.setGroupMaskState = function (J) {
			N.removeClass(this.costomDom, "simpleMenuItemSelected");
			N.removeClass(this.promptDom, "simpleMenuItemSelected");
			N.removeClass(this.noPromptDom, "simpleMenuItemSelected");
			N.removeClass(this.maskDom, "simpleMenuItemSelected");
			J = parseInt(J);
			switch (J) {
			  case 0:
				N.addClass(this.costomDom, "simpleMenuItemSelected");
				break;
			  case 1:
				N.addClass(this.promptDom, "simpleMenuItemSelected");
				break;
			  case 2:
				N.addClass(this.noPromptDom, "simpleMenuItemSelected");
				break;
			  case 3:
				N.addClass(this.maskDom, "simpleMenuItemSelected");
				break;
			}
		};
		this.setGroupListMaskState = function (ax, az) {
			var J = N.id("EQQ_GroupList_State_" + ax);
			var ay = N.id("EQQ_RecentList_State_" + ax);
			if (!az) {
				if (J) {
					N.addClass(J, "EQQ_GroupMask_State");
				}
				if (ay) {
					N.addClass(ay, "EQQ_GroupMask_State");
				}
			} else {
				if (J) {
					N.removeClass(J, "EQQ_GroupMask_State");
				}
				if (ay) {
					N.removeClass(ay, "EQQ_GroupMask_State");
				}
			}
		};
		var Z = function (ax) {
			ax.stopPropagation();
			var J = N.getClientXY(R.EQQ_ListBottom_maskButton);
			R.toggleGroupMaskStatePanel(J);
		};
		this.toggleGroupMaskStatePanel = function (J) {
			if (this.groupMaskPanel && this.groupMaskPanel.isShow()) {
				this.hideGroupMaskStatePanel();
			} else {
				this.showGroupMaskStatePanel(J);
			}
		};
		this.showGroupMaskStatePanel = function (aA) {
			if (this.groupMaskPanel) {
			} else {
				this.createGroupMaskPanelDom();
			}
			if (aA) {
				var az = this.groupMaskPanel.getWidth();
				var ax = this.groupMaskPanel.getHeight();
				var aB = qqweb.layout.getClientWidth();
				var ay = qqweb.layout.getClientHeight();
				var J = aA[0], aC = aA[1] - 100;
				if (J < 2) {
					J = 2;
				}
				if (aC < 2) {
					aC = 2;
				}
				if (J > aB - az - 2) {
					J = aB - az - 2;
				}
				if (aC > ay - ax - 2) {
					aC = ay - ax - 2;
				}
				this.groupMaskPanel.setXY(J, aC);
			}
			this.groupMaskPanel.setZIndex(qqweb.layout.getTopZIndex(3));
			this.groupMaskPanel.show();
		};
		this.hideGroupMaskStatePanel = function () {
			if (this.groupMaskPanel) {
				this.groupMaskPanel.hide();
			}
		};
		this.createMiniCardPanelDom = function () {
			var aG = N.node("div", {id:"miniCard", "class":"panel_1"});
			aG.innerHTML = "\t\t\t<div class=\"panel_1_outer\">\t\t\t\t<div class=\"panel_1_inner\">\t\t\t\t\t<div class=\"panel_1_container\">\t\t\t\t\t\t<div id=\"panel_1_center\" class=\"panel_1 panel_1_center\"></div>\t\t\t\t\t\t<div id=\"panel_1_t\" class=\"panel_1 panel_1_t\"></div>\t\t\t\t\t\t<div id=\"panel_1_rt\" class=\"panel_1 panel_1_rt\"></div>\t\t\t\t\t\t<div id=\"panel_1_r\" class=\"panel_1 panel_1_r\"></div>\t\t\t\t\t\t<div id=\"panel_1_rb\" class=\"panel_1 panel_1_rb\"></div>\t\t\t\t\t\t<div id=\"panel_1_b\" class=\"panel_1 panel_1_b\"></div>\t\t\t\t\t\t<div id=\"panel_1_lb\" class=\"panel_1 panel_1_lb\"></div>\t\t\t\t\t\t<div id=\"panel_1_l\" class=\"panel_1 panel_1_l\"></div>\t\t\t\t\t\t<div id=\"panel_1_lt\" class=\"panel_1 panel_1_lt\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"miniCardBody\" class=\"panel_1_content\">\t\t\t\t\t\t<img id=\"miniCard_avatar\" class=\"miniCard_avatar\" />\t\t\t\t\t\t<div class=\"miniCard_name\">\t\t\t\t\t\t\t<div id=\"miniCard_name_inner\" class=\"miniCard_name_inner\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_signature\" class=\"miniCard_signature\">\t\t\t\t\t\t\t<div id=\"miniCard_signature_inner\" class=\"miniCard_signature_inner\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_clientType_innerWrapper\" class =\"miniCard_clientType_innerWrapper\"><div class =\"miniCard_clientTypeIcon\"></div><div id=\"miniCard_clientType_inner\" class=\"miniCard_clientType_inner\"></div></div>\t\t\t\t\t\t<div id=\"miniCard_level\" class=\"miniCard_level\"></div>\t\t\t\t\t\t<div id=\"miniCard_level_upinfo\" class=\"miniCard_level_upinfo\"></div>\t\t\t\t\t\t<div id=\"miniCard_quickLink\" class=\"miniCard_quickLink\">\t\t\t\t\t\t\t<a id=\"miniCard_qzone\" class=\"miniCard_qzone\" type=\"qzone\" title=\"\u8bbf\u95eeQQ\u7a7a\u95f4\" hidefocus target=\"_blank\" href=\"###\"></a>\t\t\t\t\t\t\t<a id=\"miniCard_qmail\" class=\"miniCard_qmail\" type=\"qmail\" title=\"\u53d1\u9001\u90ae\u4ef6\" hidefocus target=\"_blank\" href=\"###\"></a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_buddyOption_tabHead\" class=\"buddyOption_tabHead\">\t\t\t\t\t\t\t<div id=\"miniCard_userDetails\" class=\"buddyOption_tabHead_div\">\u8be6\u7ec6\u8d44\u6599</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_buddyOption_tabBody\" class=\"buddyOption_tabBody\">\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>";
			u.appendChild(aG);
			var aB = N.id("miniCard_avatar");
			var aH = N.id("miniCard_name_inner");
			var aE = N.id("miniCard_signature");
			var J = N.id("miniCard_signature_inner");
			var aD = N.id("miniCard_clientType_inner");
			var aF = N.id("miniCard_clientType_innerWrapper");
			var aA = N.id("miniCard_level");
			var aC = N.id("miniCard_level_upinfo");
			var ax = N.id("miniCard_qzone");
			var ay = N.id("miniCard_qmail");
			var az = N.id("miniCard_userDetails");
			L.on(aG, "mouseover", aa);
			L.on(aG, "mouseout", P);
			L.on(az, "click", x);
			L.on(ax, "click", ai);
			L.on(ay, "click", ae);
			this.miniCardPanel = new qqweb.layout.Panel({container:aG, body:N.id("miniCardBody"), html:""});
			this.miniCardPanel.setInfo = function (aI) {
				this.uin = aI.uin;
				var aJ = aI.uin == qqweb.portal.self.uin;
				aB.src = EQQ.getUserDefaultAvatar();
				aB.src = aI.avatarUrl;
				if (aJ) {
					az.innerHTML = "\u4fee\u6539\u8d44\u6599";
					aB.src = qqweb.util.getUserAvatar(aI.uin, 1) + "&t=" + (new Date()).getTime();
				} else {
					az.innerHTML = "\u8be6\u7ec6\u8d44\u6599";
				}
				aH.innerHTML = aI.htmlAllName;
				aH.title = (aI.allName);
				J.innerHTML = "";
				aA.innerHTML = "";
				aC.innerHTML = "";
				ax.href = EQQ.getQzoneUrl(aI.uin);
				ay.href = EQQ.getSendMailUrl(aI.uin);
				if (aJ || aI.clientType == "1" || aI.clientType == "10000" || aI.type == "stranger" || !aI.clientType) {
					aF.className = "miniCard_clientType_innerWrapper";
					aE.style.display = "block";
				} else {
					aF.className = "miniCard_clientType_" + EQQ.hash.clientType[aI.clientType || "10000"];
					aD.innerHTML = EQQ.hash.clientTypeText[aI.clientType || "10000"] + "\u767b\u5f55\u4e2d";
					aE.style.display = "none";
				}
				L.notifyObservers(R, "MiniCardShow", aI);
			};
			this.miniCardPanel.setSignature = function (aI) {
				J.innerHTML = aI.htmlSignature;
				J.title = (aI.signature);
			};
			this.miniCardPanel.setClientType = function (aI) {
				if (this.uin == aI.uin) {
					if (aI.clientType == "1") {
						aF.className = "miniCard_clientType_" + EQQ.hash.clientType[aI.clientType || "10000"];
						aD.innerHTML = EQQ.hash.clientTypeText[aI.clientType || "10000"] + "\u767b\u5f55\u4e2d";
						aE.style.display = "none";
					} else {
						aF.className = "miniCard_clientType_innerWrapper";
						aE.style.display = "block";
					}
				}
			};
			this.miniCardPanel.setQQLevel = function (aK) {
				var aQ = aK.level;
				var aI = aQ.level;
				var aP = parseInt(aI / 64), aO = parseInt((aI % 64) / 16), aJ = parseInt(((aI % 64) % 16) / 4), aN = ((aI % 64) % 16) % 4, aM = "";
				for (var aL = 0; aL < aP; aL++) {
					aM += "<div class=\"miniCard_level_div qqLevel_queen\"></div>";
				}
				for (var aL = 0; aL < aO; aL++) {
					aM += "<div class=\"miniCard_level_div qqLevel_sun\"></div>";
				}
				for (var aL = 0; aL < aJ; aL++) {
					aM += "<div class=\"miniCard_level_div qqLevel_moon\"></div>";
				}
				for (var aL = 0; aL < aN; aL++) {
					aM += "<div class=\"miniCard_level_div qqLevel_star\"></div>";
				}
				aA.innerHTML = aM;
				aA.title = "\u7b49\u7ea7: " + aI;
				if (aK.uin == qqweb.portal.self.uin) {
					aC.innerHTML = "<div class=\"miniCard_level_upinfo_div\" title=\"\u6d3b\u8dc3\u5929\u6570\uff1a" + aQ.days + "\"><span class=\"icon days\"></span>" + aQ.days + "\u5929</div><div class=\"miniCard_level_upinfo_div\" title=\"\u8ddd\u5347\u7ea7\u5230" + (aI + 1) + "\u7ea7\u8fd8\u6709" + aQ.remainDays + "\u5929\"><span class=\"icon remainDays\"></span>" + aQ.remainDays + "\u5929</div>";
				}
			};
		};
		this.showMiniCardPanel = function (J, aE) {
			if (this.miniCardPanel) {
			} else {
				this.createMiniCardPanelDom();
			}
			if (aE) {
				var ax = this.miniCardPanel.getWidth() + 10;
				var aD = this.miniCardPanel.getHeight() + 10;
				var aC = qqweb.layout.getClientWidth();
				var az = qqweb.layout.getClientHeight();
				var aB = aE[0], aA = aE[1];
				if (aB < 2) {
					aB = 2;
				}
				if (aA < 2) {
					aA = 2;
				}
				if (aB > aC - ax - 2) {
					aB = aC - ax - 2;
				}
				if (aA > az - aD - 2) {
					aA = az - aD - 2;
				}
				this.miniCardPanel.setXY(aB, aA);
			}
			var ay = EQQ.Model.BuddyList.getUserByUin(J);
			this.miniCardPanel.setInfo(ay, J);
			this.miniCardPanel.setZIndex(qqweb.layout.getTopZIndex(3));
			this.miniCardPanel.show();
		};
		this.hideMiniCardPanel = function () {
			if (this.miniCardPanel) {
				var J = N.id("miniCard_buddyOption_tabBody");
				N.setStyle(J, "display", "none");
				this.miniCardPanel.hide();
			}
		};
		this.setNoneFlashStyle = function () {
			N.addClass(this.EQQ_buddyList, "EQQ_buddyList_noneFlash");
		};
		this.createDom = function (ax) {
			var J = N.node("div", {id:"EQQ_MainPanel"});
			J.innerHTML = "\t\t\t\t<div class=\"EQQ_title\">\t\t\t\t\t<div id=\"EQQ_PinDownButton\" class=\"EQQ_PinDownButton\" title=\"\u9489\u4f4f/\u6536\u8d77\">\u9489\u4f4f/\u6536\u8d77</div>\t\t\t\t\t<div id=\"EQQ_CloseButton\" class=\"EQQ_CloseButton\" title=\"\u9690\u85cf\u597d\u53cb\u5217\u8868\">\u6700\u5c0f\u5316</div>\t\t\t\t\t<div id=\"EQQ_MinButton\" class=\"EQQ_MinButton\" title=\"\u8bbe\u7f6e\">\u8bbe\u7f6e</div>\t\t\t\t\t<a class=\"EQQ_FeedbackButton2\" href=\"http://support.qq.com/portal/discuss_pdt/420_1.html\" target=\"_blank\">\u53cd\u9988</a>\t\t\t\t\t<div id=\"EQQ_SettingButton\" class=\"EQQ_settingButton\" title=\"\u8bbe\u7f6eWebQQ\">\t\t\t\t\t\t<div class=\"EQQ_settingButtonIcon\">\u4e0b</div>\t\t\t\t\t\t<div>\u8bbe\u7f6e</div>\t\t\t\t\t</div>\t\t\t\t\t<div class=\"EQQ_titleText\" href=\"#\" target=\"_blank\" title=\"\u8054\u7cfb\u4eba\">\u8054\u7cfb\u4eba</div>\t\t\t\t\t<div class=\"EQQ_betaText\" title=\"1.0.10.12\"></div>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_YellowTips\" class=\"EQQ_YellowTips\">\t\t\t\t\t<div id=\"EQQ_YellowTips_CloseButton\" class=\"EQQ_YellowTips_CloseButton\" title=\"\u5173\u95ed\u63d0\u793a\">X</div>\t\t\t\t\t<a class=\"EQQ_YellowTips_Link\" href=\"http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG\" target=\"_blank\">\u9080\u8bf7\u53c2\u4e0eWebQQ\u7528\u6237\u8c03\u67e5</a>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_LoginSuccess\">\t\t\t\t\t<div id=\"EQQ_SearchBar\" class=\"EQQ_SearchBar\">\t\t\t\t\t\t<input id=\"EQQ_SearchBox\" class=\"EQQ_SearchBox\" name=\"\" type=\"text\" value=\"\u641c\u7d22\u597d\u53cb...\" title=\"\u641c\u7d22\u597d\u53cb...\" />\t\t\t\t\t\t<div id=\"EQQ_SearchButton\" class=\"EQQ_SearchButton\" title=\"\u641c\u7d22...\">\u641c\u7d22\u6309\u94ae</div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"EQQ_SearchResultPanel\" class=\"EQQ_SearchResultPanel-1\">\t\t\t\t\t\t<div class=\"EQQ_SearchResultItem\" title=\"\">Kevity1(666666)</div>\t\t\t\t\t\t<div class=\"EQQ_SearchResultItemHover\" title=\"\">Kevity2(666666)</div>\t\t\t\t\t\t<div class=\"EQQ_SearchResultItem\" title=\"\">Kevity3(66666)</div>\t\t\t\t\t</div>\t\t\t\t\t<ul class=\"EQQ_tab\">\t\t\t\t\t\t<li id=\"EQQ_TabBuddyList\" class=\"EQQ_tabBuddyList\" title=\"\u8054\u7cfb\u4eba\"><div class=\"EQQ_tabBuddyList_icon\"></div></li>\t\t\t\t\t\t<li id=\"EQQ_TabGroupList\" class=\"EQQ_tabGroupList\" title=\"\u7fa4\u5217\u8868\"><div class=\"EQQ_tabGroupList_icon\"></div></li>\t\t\t\t\t\t<li id=\"EQQ_TabRecentList\" class=\"EQQ_tabRecentList\" title=\"\u6700\u8fd1\u8054\u7cfb\u4eba\"><div class=\"EQQ_tabRecentList_icon\"></div></li>\t\t\t\t\t</ul>\t\t\t\t\t<div id=\"EQQ_ListContainer\">\t\t\t\t\t\t<div id=\"EQQ_buddyListPanel\" class=\"EQQ_buddyListPanel\">\t\t\t\t\t\t\t<div id=\"EQQ_buddyList\" class=\"EQQ_buddyList\">\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class=\"EQQ_ListBottom\">\t\t\t\t\t\t\t\t<a href=\"\" id=\"EQQ_findBuddy\" class=\"searchBuddy\" target=\"_blank\"><div class=\"searchBuddy_div\"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<a href=\"\" id=\"EQQ_buddyManage\" class=\"buddy_manage_icon\" target=\"_blank\"><div class=\"buddy_manage_icon_div\"></div>\u7ba1\u7406</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_groupListPanel\" class=\"EQQ_groupListPanel\"><div id=\"EQQ_groupListOuter\" class=\"EQQ_groupListOuter\"><div id=\"EQQ_groupListInner\" class=\"EQQ_groupListInner\"></div></div>\t\t\t\t\t\t\t<div class=\"EQQ_ListBottom\">\t\t\t\t\t\t\t\t<a id=\"EQQ_createGroupButton\" class=\"createGroup\" href=\"http://qun.qq.com/air/create\" target=\"_blank\" title=\"\u521b\u5efa\u7fa4\"><div class=\"createGroup_div\"></div>\u521b\u5efa</a>\t\t\t\t\t\t\t\t<a id=\"EQQ_searchGroupButton\" class=\"searchGroup\" href=\"http://qun.qq.com/air/search\" target=\"_blank\" title=\"\u67e5\u627e\u7fa4\"><div class=\"searchGroup_div\"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<div id=\"EQQ_ListBottom_maskButton\"><div></div>\u7fa4\u5c4f\u853d</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_recentListPanel\" class=\"EQQ_recentListPanel\"><div id=\"EQQ_recentList\" class=\"EQQ_recentList\"></div></div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div style=\"height:1000px;width:1000px;\">\t\t\t\t\t<div id=\"EQQ_Logining\">\u53d1\u8d77\u8fde\u63a5...</div>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_Logining_feedback\"><a href=\"http://support.qq.com/write.shtml?guest=1&fid=513\" target=\"_blank\">\t\t\t\t\t<span class=\"warnning_yellow\">&nbsp;</span>\u53cd\u9988\u767b\u5f55\u5efa\u8bae</a></div>\t\t\t\t<div id=\"EQQ_ReLoginPanel\">\t\t\t\t\t<div style=\"display:inline;\" id=\"EQQ_ReLoginButton_text\">\u767b\u5f55\u5931\u8d25</div>\uff0c<span id=\"EQQ_ReLoginButton\">\u91cd\u8bd5</span>\t\t\t\t</div>";
			ax.innerHTML = "";
			ax.appendChild(J);
			N.setClass(J, "EQQ_mainPanel");
		};
		this.onYellowTipsClick = function () {
			R.hideYellowTips();
			L.notifyObservers(R, "CloseYellowTipsFinish");
		};
		this.showYellowTips = function () {
			f = f + F;
			this.onWindowResize();
			N.show(this.EQQ_YellowTips);
		};
		this.hideYellowTips = function () {
			N.hide(this.EQQ_YellowTips);
			f = f - F;
			this.onWindowResize();
		};
		this.onEqqResize = function (az) {
			var J = 5;
			var ax = az.height;
			var ay = ax - C;
			if (ay < J) {
				ay = J;
			}
			N.setStyle(this.EQQ_ListContainer, "height", (ay - J) + "px");
			N.setStyle(this.EQQ_buddyListPanel, "height", (ay - J - 25) + "px");
			N.setStyle(this.EQQ_groupListOuter, "height", (ay - J - 25) + "px");
			I();
		};
		this.onWindowResize = function (J) {
		};
		this.onSearchBoxMouseover = function () {
			N.setClass(this, "EQQ_SearchBoxHover");
		};
		this.onSearchBoxMouseout = function () {
			N.setClass(this, "EQQ_SearchBox");
		};
		this.onSearchBoxFocus = function () {
			L.off(R.EQQ_SearchBox, "mouseover", R.onSearchBoxMouseover);
			L.off(R.EQQ_SearchBox, "mouseout", R.onSearchBoxMouseout);
			N.setClass(this, "EQQ_SearchBoxFocus");
			R.clearSearchBox(this);
			this.select();
			R.startSearch();
		};
		this.onSearchBoxBlur = function () {
			L.on(R.EQQ_SearchBox, "mouseover", R.onSearchBoxMouseover);
			L.on(R.EQQ_SearchBox, "mouseout", R.onSearchBoxMouseout);
			N.setClass(this, "EQQ_SearchBox");
			R.resetSearchBox(this);
		};
		this.resetSearchBox = function (J) {
			if (J.value == "") {
				J.value = "\u641c\u7d22\u597d\u53cb...";
			}
		};
		this.clearSearchBox = function (J) {
			if (s.string.trim(J.value) == "\u641c\u7d22\u597d\u53cb...") {
				J.value = "";
			}
		};
		this.onSearchButtonClick = function () {
			R.startSearch();
		};
		this.onSearchBoxKeyup = function (J) {
			if (!R.EQQ_SearchBox.value) {
				R.hideSearchResult();
				return;
			}
			if (J.keyCode != aj && J.keyCode != M) {
				R.startSearch();
			}
		};
		this.onSearchBoxKeydown = function (ax) {
			switch (ax.keyCode) {
			  case U:
				if (r) {
					ax.preventDefault();
					R.hideSearchResult();
					L.notifyObservers(R, "StartChat", r.uin);
					pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
				}
				break;
			  case aj:
				if (O > 0) {
					var J = N.id("EQQ_SearchResultItem_" + r.uin);
					N.setStyle(J, "backgroundColor", "transparent");
					O--;
					r = Y[O];
					J = N.id("EQQ_SearchResultItem_" + r.uin);
					if (J) {
						N.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			  case M:
				if (O < Y.length - 1) {
					var J = N.id("EQQ_SearchResultItem_" + r.uin);
					N.setStyle(J, "backgroundColor", "transparent");
					O++;
					r = Y[O];
					J = N.id("EQQ_SearchResultItem_" + r.uin);
					if (J) {
						N.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			  default:
				break;
			}
		};
		this.startSearch = function () {
			this.clearSearchBox(this.EQQ_SearchBox);
			var J = this.EQQ_SearchBox.value;
			L.notifyObservers(this, "Search", J);
		};
		this.showSearchResult = function (J) {
			if (this.EQQ_SearchBox.value) {
				Y = J;
				var aA = N.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
				N.setStyle(this.EQQ_SearchResultPanel, "left", aA[0] + "px");
				N.setStyle(this.EQQ_SearchResultPanel, "top", (aA[1] + 26) + "px");
				N.show(this.EQQ_SearchResultPanel);
				this.EQQ_SearchResultPanel.innerHTML = "";
				if (J.length == 0) {
					O = null;
					r = null;
					this.EQQ_SearchResultPanel.innerHTML = "<div class=\"EQQ_SearchResultNo\">\u6ca1\u6709\u627e\u5230\u76f8\u5173\u597d\u53cb</div>";
				} else {
					O = 0;
					r = J[0];
					for (var ay = 0; ay < J.length; ay++) {
						var ax = J[ay];
						var az = N.node("div");
						N.setClass(az, "EQQ_SearchResultItem");
						az.id = "EQQ_SearchResultItem_" + ax.uin;
						az.setAttribute("uin", ax.uin);
						az.innerHTML = ax.htmlAllName;
						az.title = (ax.allName);
						this.EQQ_SearchResultPanel.appendChild(az);
						if (ay == 0) {
							N.setStyle(az, "backgroundColor", "#cbe7fc");
						}
						L.on(az, "mouseover", this.onSearchResultMouseover);
						L.on(az, "mouseout", this.onSearchResultMouseout);
						L.on(az, "mousedown", this.onSearchResultClick);
					}
				}
				L.on(document, "mousedown", s.bind(this.hideSearchResult, this));
			}
		};
		this.hideSearchResult = function () {
			N.hide(this.EQQ_SearchResultPanel);
			L.off(document, "mousedown");
		};
		this.onSearchResultMouseover = function () {
			N.setStyle(this, "backgroundColor", "#cbe7fc");
		};
		this.onSearchResultMouseout = function () {
			N.setStyle(this, "backgroundColor", "transparent");
		};
		this.onSearchResultClick = function () {
			var J = this.getAttribute("uin");
			R.hideSearchResult();
			L.notifyObservers(R, "StartChat", J);
			pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
		};
		this.show = function () {
			N.show(this.EQQ_MainPanel);
		};
		this.hide = function () {
			N.hide(this.EQQ_MainPanel);
		};
		this.updateSelfInfoChange = function (J) {
			this.EQQ_MyAvatar.src = EQQ.getUserAvatar(J.uin);
			this.EQQ_MyAvatar.title = "\u4fee\u6539\u8d44\u6599";
			this.EQQ_MyNick.innerHTML = J.htmlShowName;
			this.EQQ_MyNick.title = (J.showName + "<" + J.uin + ">");
			this.EQQ_MyPanel.style.display = "none";
		};
		this.updateSelfStateChange = function (J) {
			N.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + J);
			if (J === "offline") {
				N.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
			} else {
				N.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
			}
		};
		this.updateSelfSignatureChange = function (J) {
			if (J.signature) {
				this.EQQ_MySignature.innerHTML = J.htmlSignature;
				this.EQQ_MySignature.title = (J.signature);
			} else {
				this.EQQ_MySignature.innerHTML = "\u6709\u4e2a\u6027\uff0c\u6ca1\u7b7e\u540d";
				this.EQQ_MySignature.title = "\u6709\u4e2a\u6027\uff0c\u6ca1\u7b7e\u540d";
			}
		};
		this.createBuddyClass = function (ax) {
			h = ax;
			this.addOnlineBuddyClass();
			for (var J = 0; J < ax.length; J++) {
				this.addBuddyClass(ax[J]);
			}
			this.addStrangerBuddyClass();
			this.addBlackListBuddyClass();
		};
		this.addOnlineBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.online;
			J.name = "\u5728\u7ebf\u597d\u53cb";
			J.htmlName = s.string.toHtml(J.name);
			J.titleName = s.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		this.addStrangerBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.stranger;
			J.name = "\u964c\u751f\u4eba";
			J.htmlName = s.string.toHtml(J.name);
			J.titleName = s.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		this.addBlackListBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.blacklist;
			J.name = "\u9ed1\u540d\u5355";
			J.htmlName = s.string.toHtml(J.name);
			J.titleName = s.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		var at = function (aC) {
			var ax = aC.width;
			var J = ac.length;
			for (; (--J) >= 0; ) {
				var aA = ac[J].el = ac[J].el || N.id("EQQ_Class_" + ac[J].index + "_className");
				var aB = ac[J].len;
				var az = ac[J].html;
				var ay = ac[J].html_short;
				if (ax <= 200) {
					aA.innerHTML = ay;
				} else {
					if (ax > aB + 20) {
						aA.innerHTML = az;
					}
				}
			}
		};
		this.addBuddyClass = function (ax, aB) {
			var aD, aE, ay;
			aD = N.node("div", {id:"EQQ_listClassHead_" + ax.index, classIndex:ax.index});
			if (ax.index == EQQ.hash.userClassType.online) {
				aE = "\t\t\t\t\t<div class=\"EQQ_listClassHeadIcon\">icon</div>\t\t\t\t\t<div class=\"EQQ_ClassList_RightContainer\" title=\"<%=titleName%>\">\t\t\t\t\t\t<div class=\"EQQ_Class_className\" id=\"EQQ_Class_<%=index%>_className\"><%=cut_htmlName%></div>[<span id=\"EQQ_Class_<%=index%>_OnlineCounter\"><%=onlineCount%></span>]\t\t\t\t\t</div>\t\t\t\t";
			} else {
				aE = "\t\t\t\t\t<div class=\"EQQ_listClassHeadIcon\">icon</div>\t\t\t\t\t<div class=\"EQQ_ClassList_RightContainer\" title=\"<%=titleName%>\">\t\t\t\t\t\t<div class=\"EQQ_Class_className\" id=\"EQQ_Class_<%=index%>_className\"><%=cut_htmlName%>&nbsp;</div>[<span id=\"EQQ_Class_<%=index%>_OnlineCounter\"><%=onlineCount%></span>/<span id=\"EQQ_Class_<%=index%>_Counter\"><%=count%></span>]\t\t\t\t\t</div>\t\t\t\t";
			}
			ax.cut_htmlName = ax.htmlName;
			if (ax.caculateName) {
				var aF = "[" + ax.onlineCount + "/" + (ax.count || 1) + "]";
				var aC = ax.caculateName + aF;
				var J = D.getCharWidth(aC, 12);
				if (J > 120) {
					var aA = {index:ax.index, len:J, html:ax.cut_htmlName};
					ax.cut_htmlName = "<div class=\"mainpanel_limit_class_width_outer\"><div class=\"mainpanel_limit_class_width_inner\">" + ax.htmlName + "</div></div>...";
					aA.html_short = ax.cut_htmlName;
					ac.push(aA);
				}
			}
			ay = s.string.template(aE, ax);
			aD.innerHTML = ay;
			if (aB) {
				this.EQQ_buddyList.insertBefore(aD, aB);
			} else {
				this.EQQ_buddyList.appendChild(aD);
			}
			L.on(aD, "click", au);
			var az = N.node("div", {id:"EQQ_listClassBody_" + ax.index, "class":"EQQ_listClassBody"});
			aE = "\t\t\t\t<div id=\"EQQ_Class_<%=index%>_callme\" class=\"EQQ_callmeBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_online\" class=\"EQQ_onlineBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_busy\" class=\"EQQ_busyBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_away\" class=\"EQQ_awayBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_silent\" class=\"EQQ_silentBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_offline\" class=\"EQQ_offlineBuddy\"></div>\t\t\t";
			ay = s.string.template(aE, ax);
			az.innerHTML = ay;
			this.EQQ_buddyList.insertBefore(az, aD.nextSibling);
			this.collapsedClass(ax.index);
		};
		this.hideLogin = function () {
			N.hide(this.EQQ_Logining);
			N.hide(this.EQQ_Logining_feedback);
			N.hide(this.EQQ_ReLoginPanel);
			N.show(this.EQQ_LoginSuccess);
			N.setStyle(this.EQQ_LoginSuccess, "height", "100%");
			var J = {height:qqweb.app.eqq.window.getBodySize().height, width:qqweb.app.eqq.window.getBodySize().width};
			this.onEqqResize(J);
			at(J);
		};
		this.showLogin = function () {
			this.EQQ_Logining.innerHTML = "\u53d1\u8d77\u8fde\u63a5...";
			N.show(this.EQQ_Logining);
			N.show(this.EQQ_Logining_feedback);
			N.hide(this.EQQ_ReLoginPanel);
			N.hide(this.EQQ_LoginSuccess);
			N.setStyle(this.EQQ_LoginSuccess, "height", "0px");
		};
		this.showPullData = function () {
			this.EQQ_Logining.innerHTML = "\u62c9\u53d6\u6570\u636e...";
		};
		this.clearBuddyList = function () {
			this.EQQ_buddyList.innerHTML = "";
		};
		this.createBuddyList = function (J) {
			s.timedChunk(J, this.addBuddy, this, false, function () {
				L.notifyObservers(R, "BuddyListReady");
			});
		};
		this.getClassExpandFlag = function (J) {
			return ak[J];
		};
		this.setClassExpandFlag = function (ax, J) {
			return ak[ax] = J;
		};
		this.getClassAvatarLoadFlag = function (J) {
			return am[J];
		};
		this.setClassAvatarLoadFlag = function (ax, J) {
			return am[ax] = J;
		};
		this.toggleClass = function (J) {
			if (ak[J]) {
				this.collapsedClass(J);
			} else {
				this.expandClass(J);
			}
		};
		this.collapsedClass = function (ax) {
			var J = N.id("EQQ_listClassHead_" + ax), ay = N.id("EQQ_listClassBody_" + ax);
			if (ax == EQQ.hash.userClassType.online) {
				N.setClass(J, "EQQ_onlineClassHeadCollapsed");
				N.removeClass(J, "expand_online");
			} else {
				N.setClass(J, "EQQ_listClassHeadCollapsed");
				N.removeClass(J, "expand");
			}
			N.setStyle(ay, "height", "0");
			this.setClassExpandFlag(ax, false);
		};
		this.expandClass = function (ax) {
			var J = N.id("EQQ_listClassHead_" + ax), ay = N.id("EQQ_listClassBody_" + ax);
			if (ax == EQQ.hash.userClassType.online) {
				N.setClass(J, "EQQ_onlineClassHeadExpand");
				N.addClass(J, "expand_online");
			} else {
				N.setClass(J, "EQQ_listClassHeadExpand");
				N.addClass(J, "expand");
			}
			N.setStyle(ay, "height", "auto");
			this.setClassExpandFlag(ax, true);
			s.out("index: " + ax);
			T();
		};
		var T = function () {
			q(R.EQQ_buddyListPanel);
		};
		var aq = function (J) {
			I();
		};
		var I = function (J) {
			if (aq.timer) {
				window.clearTimeout(aq.timer);
				aq.timer = null;
			}
			aq.timer = window.setTimeout(T, 500);
		};
		var q = function (az) {
			var aG = parseInt(N.getStyle(az, "height"), 10);
			var ay = az.scrollTop;
			var aE = N.getXY(az)[1];
			for (var aB = 0; aB < e.length; ) {
				var aA = e[aB];
				var J = aA.imgEl;
				var ax = aA.uin;
				var aC = aA.classId;
				var aD = N.getXY(J)[1];
				var aF = aD - aE;
				s.out("imgTop1:" + aF + "y2:" + aD);
				if (R.getClassExpandFlag(aC) && J && aF > 0 && aF < aG) {
					s.out("checkAndLoadAvatar & loadAvatar containerHeight: " + aG + ", imgTop2:" + aF);
					J.src = EQQ.getUserAvatar(aA.uin);
					e.splice(aB, 1);
				} else {
					aB++;
				}
			}
		};
		this.addBuddy = function (ay) {
			if (ay) {
				var aA = "\t\t\t\t\t<div class=\"EQQ_BuddyList_ClientType\" uin=\"<%=uin%>\" id=\"EQQ_BuddyList_ClientType_Title_<%=uin%>\" title=\"" + EQQ.hash.clientTypeText[ay.clientType || "PC"] + "\">\t\t\t\t\t\t<div id=\"EQQ_BuddyList_ClientType_<%=uin%>\" class=\"EQQ_BuddyList_ClientType_" + EQQ.hash.clientType[ay.clientType || "10000"] + "\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"EQQ_BuddyList_AvatarContainer_<%=uin%>\" class=\"EQQ_BuddyList_AvatarContainer\" uin=\"<%=uin%>\" title=\"" + EQQ.hash.onlineStatusText[ay.state] + "\">\t\t\t\t\t\t<img id=\"EQQ_BuddyList_Avatar_<%=uin%>\" class=\"EQQ_BuddyList_Avatar\" src=\"" + EQQ.CONST.EQQ_SERVER_URL + "style/images/avatar_default_20_20.gif\" />\t\t\t\t\t\t<div class=\"EQQ_BuddyList_State\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"EQQ_BuddyList_RightContainer_<%=uin%>\" class=\"EQQ_BuddyList_RightContainer\" title=\"<%=titleAllName%> - " + EQQ.hash.onlineStatusText[ay.state] + "\">\t\t\t\t\t\t<div id=\"EQQ_BuddyList_Nick_<%=uin%>\" class=\"EQQ_BuddyList_Nick\"><%=htmlShowName%></div>\t\t\t\t\t</div>\t\t\t\t";
				var az = s.string.template(aA, ay);
				var J = N.id("EQQ_Class_" + ay.classId + "_" + ay.state);
				N.show(J);
				var aC = N.node("div", {id:"EQQ_Buddy_" + ay.uin, "class":"EQQ_BuddyList_Buddy", uin:ay.uin});
				aC.innerHTML = az;
				J.appendChild(aC);
				L.on(aC, "mouseover", K);
				L.on(aC, "mouseout", S);
				L.on(aC, "click", function (aD) {
					ao.apply(this, [aD]);
					pgvSendClick({hottag:"web2qq.qqpanel.contacts.sendmsg"});
				});
				var ax = N.id("EQQ_BuddyList_AvatarContainer_" + ay.uin);
				L.on(ax, "mouseover", ag);
				L.on(ax, "mouseout", n);
				var aB = N.id("EQQ_BuddyList_Avatar_" + ay.uin);
				if (this.getClassExpandFlag(ay.classId)) {
					s.out("addBuddy & loadAvatar");
					aB.src = EQQ.getUserAvatar(ay.uin);
				} else {
					e.push({uin:ay.uin, imgEl:aB, classId:ay.classId});
				}
			}
		};
		this.addOnlineBuddy = function (ay) {
			if (ay) {
				var aD = EQQ.hash.clientTypeText[ay.clientType || "pc"] === "PC" ? "" : EQQ.hash.clientTypeText[ay.clientType || "pc"];
				var aA = "\t\t\t\t\t<div class=\"EQQ_BuddyList_ClientType\" uin=\"<%=uin%>\" id=\"EQQ_OnlineBuddyList_ClientType_Title_<%=uin%>\" title=\"" + EQQ.hash.clientTypeText[ay.clientType] + "\">\t\t\t\t\t\t<div id=\"EQQ_OnlineBuddyList_ClientType_<%=uin%>\" class=\"EQQ_BuddyList_ClientType_" + EQQ.hash.clientType[ay.clientType || "10000"] + "\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"EQQ_OnlineBuddyList_AvatarContainer_<%=uin%>\" class=\"EQQ_BuddyList_AvatarContainer\" uin=\"<%=uin%>\" title=\"" + EQQ.hash.onlineStatusText[ay.state] + "\">\t\t\t\t\t\t<img id=\"EQQ_OnlineBuddyList_Avatar_<%=uin%>\" class=\"EQQ_BuddyList_Avatar\" src=\"" + EQQ.CONST.EQQ_SERVER_URL + "style/images/avatar_default_20_20.gif\" />\t\t\t\t\t\t<div class=\"EQQ_BuddyList_State\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class=\"EQQ_BuddyList_RightContainer\" title=\"<%=titleAllName%> - " + aD + EQQ.hash.onlineStatusText[ay.state] + "\">\t\t\t\t\t\t<div class=\"EQQ_BuddyList_Nick\"><%=htmlShowName%></div>\t\t\t\t\t</div>\t\t\t\t";
				var az = s.string.template(aA, ay);
				var J = N.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + ay.state);
				N.setStyle(J, "display", "block");
				var aC = N.node("div", {id:"EQQ_OnlineBuddy_" + ay.uin, uin:ay.uin});
				aC.innerHTML = az;
				J.appendChild(aC);
				L.on(aC, "mouseover", K);
				L.on(aC, "mouseout", S);
				L.on(aC, "click", function (aE) {
					ao.apply(this, [aE]);
					pgvSendClick({hottag:"web2qq.qqpanel.contacts.sendmsg"});
				});
				N.addClass(aC, "EQQ_BuddyList_Buddy");
				var ax = N.id("EQQ_OnlineBuddyList_AvatarContainer_" + ay.uin);
				L.on(ax, "mouseover", ag);
				L.on(ax, "mouseout", n);
				var aB = N.id("EQQ_OnlineBuddyList_Avatar_" + ay.uin);
				if (this.getClassExpandFlag(EQQ.hash.userClassType.online)) {
					s.out("addOnlineBuddy & loadAvatar");
					aB.src = EQQ.getUserAvatar(ay.uin);
				} else {
					e.push({uin:ay.uin, imgEl:aB, classId:EQQ.hash.userClassType.online});
				}
			}
		};
		this.removeOnlineBuddy = function (J) {
			var ay = N.id("EQQ_OnlineBuddy_" + J.uin);
			if (ay) {
				L.off(ay);
				if (ay.parentNode) {
					var ax = ay.parentNode;
					ax.removeChild(ay);
				}
			}
		};
		this.updateOnlineBuddyClass = function (ax) {
			var J = ax.length;
			N.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_OnlineCounter").innerHTML = J;
		};
		this.jumpUp = function (ax) {
			V = true;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Buddy_" + ax[J]);
				if (ay) {
					N.addClass(ay, "EQQ_jumpUpInBuddyList");
				}
			}
		};
		this.jumpDown = function (ax) {
			V = false;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Buddy_" + ax[J]);
				if (ay) {
					N.removeClass(ay, "EQQ_jumpUpInBuddyList");
				}
			}
		};
		this.jumpAvatar = function (J) {
			if (V) {
				this.jumpDown(J);
			} else {
				this.jumpUp(J);
			}
		};
		this.flickerClassHide = function (ay) {
			k = true;
			for (var ax = 0; ax < ay.length; ax++) {
				var J = N.id("EQQ_listClassHead_" + ay[ax]);
				N.addClass(J, "EQQ_flickerHideInBuddyList");
			}
		};
		this.flickerClassShow = function (ay) {
			k = false;
			for (var ax = 0; ax < ay.length; ax++) {
				var J = N.id("EQQ_listClassHead_" + ay[ax]);
				N.removeClass(J, "EQQ_flickerHideInBuddyList");
			}
		};
		this.flickerClass = function (J) {
			if (k) {
				this.flickerClassShow(J);
			} else {
				this.flickerClassHide(J);
			}
		};
		this.groupJumpUp = function (ax) {
			v = true;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Group_" + ax[J]);
				if (ay) {
					N.addClass(ay, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.groupJumpDown = function (ax) {
			v = false;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Group_" + ax[J]);
				if (ay) {
					N.removeClass(ay, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.groupJumpAvatar = function (J) {
			if (v) {
				this.groupJumpDown(J);
			} else {
				this.groupJumpUp(J);
			}
		};
		this.recentJumpUp = function (ax) {
			al = true;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Recent_" + ax[J]);
				if (ay) {
					N.addClass(ay, "EQQ_jumpUpInBuddyList");
					N.addClass(ay, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.recentJumpDown = function (ax) {
			al = false;
			for (var J = 0; J < ax.length; J++) {
				var ay = N.id("EQQ_Recent_" + ax[J]);
				if (ay) {
					N.removeClass(ay, "EQQ_jumpUpInBuddyList");
					N.removeClass(ay, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.recentJumpAvatar = function (J) {
			if (al) {
				this.recentJumpDown(J);
			} else {
				this.recentJumpUp(J);
			}
		};
		this.moveBuddy = function (az) {
			var aD = N.id("EQQ_Buddy_" + az.uin);
			var aC = N.id("EQQ_Class_" + az.classId + "_" + az.state);
			if (aC && aD) {
				N.setStyle(aC, "display", "block");
				var aB = aD.parentNode;
				aC.insertBefore(aD, aC.firstChild);
				var ax = N.id("EQQ_BuddyList_AvatarContainer_" + az.uin);
				var aA = N.id("EQQ_BuddyList_RightContainer_" + az.uin);
				var ay = N.id("EQQ_RecentList_AvatarContainer_" + az.uin);
				var J = N.id("EQQ_RecentList_RightContainer_" + az.uin);
				if (ax) {
					ax.title = EQQ.hash.onlineStatusText[az.state];
				}
				if (aA) {
					aA.title = (az.allName + " - " + EQQ.hash.onlineStatusText[az.state]);
				}
				if (ay) {
					ay.title = EQQ.hash.onlineStatusText[az.state];
				}
				if (J) {
					J.title = (az.allName + " - " + EQQ.hash.onlineStatusText[az.state]);
				}
				if (aB.childNodes.length == 0) {
					N.setStyle(aB, "display", "none");
				}
			}
		};
		this.moveOnlineBuddy = function (J) {
			var az = N.id("EQQ_OnlineBuddy_" + J.uin);
			var ay = N.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + J.state);
			if (ay && az) {
				N.setStyle(ay, "display", "block");
				var ax = az.parentNode;
				ay.insertBefore(az, ay.firstChild);
				if (ax.childNodes.length == 0) {
					N.setStyle(ax, "display", "none");
				}
			}
		};
		this.updateClientType = function (ax) {
			var az = EQQ.hash.clientType[ax.clientType];
			var ay = EQQ.hash.clientTypeText[ax.clientType || "PC"];
			var J = N.id("EQQ_BuddyList_ClientType_" + ax.uin) || {};
			var aA = N.id("EQQ_BuddyList_ClientType_Title_" + ax.uin) || {};
			J.className = "EQQ_BuddyList_ClientType_" + az;
			aA.title = ay;
			J = N.id("EQQ_OnlineBuddyList_ClientType_" + ax.uin) || {};
			aA = N.id("EQQ_OnlineBuddyList_ClientType_Title_" + ax.uin) || {};
			J.className = "EQQ_BuddyList_ClientType_" + az;
			aA.title = ay;
		};
		this.updateBuddyClassOnlineBuddy = function (J) {
			N.id("EQQ_Class_" + J.index + "_OnlineCounter").innerHTML = J.onlineCount;
		};
		this.updateRecentState = function (ax) {
			var aA = N.id("EQQ_Recent_" + ax.uin);
			if (aA) {
				aA.className = "";
				N.addClass(aA, "EQQ_BuddyList_Buddy");
				N.addClass(aA, "EQQ_" + EQQ.hash.onlineStatus[ax.state] + "Buddy");
				var az = EQQ.hash.clientType[ax.clientType];
				var ay = EQQ.hash.clientTypeText[ax.clientType || "PC"];
				var J = N.id("EQQ_RecentList_ClientType_" + ax.uin) || {};
				var aB = N.id("EQQ_RecentList_ClientType_Title_" + ax.uin) || {};
				J.className = "EQQ_BuddyList_ClientType_" + az;
				aB.title = ay;
			}
		};
		this.updateBuddyClassCount = function (J) {
			N.id("EQQ_Class_" + J.index + "_Counter").innerHTML = J.count;
		};
		this.updateStrangerClassOnlineCount = function (ax) {
			var J = N.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_OnlineCounter");
			J.innerHTML = ax;
		};
		this.updateStrangerClassCount = function (ax) {
			var J = ax.length;
			N.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_Counter").innerHTML = J;
		};
		this.setUserName = function (J) {
			var ax = J.uin;
			var az = N.id("EQQ_BuddyList_Nick_" + ax);
			var ay = N.id("EQQ_BuddyList_RightContainer_" + ax);
			if (az && ay) {
				az.innerHTML = J.htmlShowName;
				ay.title = (J.allName);
			}
		};
		this.setGroupMask = function (J) {
			Q = J;
			switch (J) {
			  case "0":
			  case 0:
				N.id("EQQ_ListBottom_maskButton").className = "accept";
				N.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			  case "1":
			  case 1:
				N.id("EQQ_ListBottom_maskButton").className = "accept";
				N.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			  case "2":
			  case 2:
				N.id("EQQ_ListBottom_maskButton").className = "mask";
				N.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			  case "3":
			  case 3:
				N.id("EQQ_ListBottom_maskButton").className = "mask";
				N.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			}
		};
		this.showReLoginPanel = function (J) {
			this.EQQ_ReLoginButton_text.innerHTML = J;
			N.hide(this.EQQ_Logining);
			N.hide(this.EQQ_Logining_feedback);
			N.show(this.EQQ_ReLoginPanel);
			N.hide(this.EQQ_LoginSuccess);
		};
		this.onReLoginButtonClick = function () {
			N.show(R.EQQ_Logining);
			N.show(R.EQQ_Logining_feedback);
			N.hide(R.EQQ_ReLoginPanel);
			N.hide(R.EQQ_LoginSuccess);
			L.notifyObservers(R, "ReLogin");
		};
		this.createGroupList = function (J) {
			this.EQQ_groupListInner.innerHTML = "";
			for (var ax = 0; ax < J.length; ax++) {
				this.addGroup(J[ax]);
			}
		};
		this.addGroup = function (ay) {
			var J = "\t\t\t\t<div class=\"EQQ_GroupList_AvatarContainer\" title=\"\">\t\t\t\t\t<img id=\"EQQ_GroupList_Avatar_" + ay.gid + "\" class=\"EQQ_GroupList_Avatar\" src=\"" + EQQ.getGroupAvatar(ay.code) + "\" />\t\t\t\t\t<div class=\"EQQ_GroupList_State\" id=\"EQQ_GroupList_State_" + ay.gid + "\" title=\"\u7fa4\u5c4f\u853d\"></div>\t\t\t\t</div>\t\t\t\t<div class=\"EQQ_GroupList_RightContainer\" title=\"<%=titleAllName%> - <%=titleTypeText%>\">\t\t\t\t\t<div id=\"EQQ_GroupList_Name_" + ay.gid + "\" class=\"EQQ_GroupList_Name\"><%=htmlShowName%></div>\t\t\t\t</div>\t\t\t";
			var ax = s.string.template(J, ay);
			var az = N.node("div", {id:"EQQ_Group_" + ay.gid, code:ay.code});
			az.innerHTML = ax;
			this.EQQ_groupListInner.appendChild(az);
			L.on(az, "mouseover", K);
			L.on(az, "mouseout", S);
			L.on(az, "click", function (aA) {
				ar.apply(this, [aA]);
				pgvSendClick({hottag:"web2qq.qqpanel.qun.sendmsg"});
			});
			N.addClass(az, "EQQ_GroupList_Group");
		};
		this.updateGroupMarkName = function (ax) {
			var J = N.id("EQQ_GroupList_Name_" + ax.gid);
			if (J) {
				J.innerHTML = ax.htmlShowName;
			}
			J = N.id("EQQ_GroupRecentList_Name_" + ax.gid);
			if (J) {
				J.innerHTML = ax.htmlShowName;
			}
		};
		this.createRecentList = function (ax) {
			this.EQQ_recentList.innerHTML = "";
			for (var J = 0; J < ax.length; J++) {
				this.addRecent(ax[J]);
			}
		};
		this.addRecent = function (aF) {
			if (aF.content) {
				if (aF.type == 0) {
					var az = aF.content;
					var aA = "\t\t\t\t\t\t<div class=\"EQQ_RecentList_ClientType\" uin=\"<%=uin%>\" id=\"EQQ_BuddyList_ClientType_Title_<%=uin%>\" title=\"" + EQQ.hash.clientTypeText[az.clientType || "PC"] + "\">\t\t\t\t\t\t\t<div id=\"EQQ_RecentList_ClientType_<%=uin%>\" class=\"EQQ_BuddyList_ClientType_" + EQQ.hash.clientType[az.clientType || "10000"] + "\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_RecentList_AvatarContainer_<%=uin%>\" class=\"EQQ_BuddyList_AvatarContainer\" uin=\"<%=uin%>\" title=\"" + EQQ.hash.onlineStatusText[az.state] + "\">\t\t\t\t\t\t\t<img id=\"EQQ_RecentList_Avatar_<%=uin%>\" class=\"EQQ_BuddyList_Avatar\" src=\"" + EQQ.CONST.EQQ_SERVER_URL + "style/images/avatar_default_20_20.gif\" />\t\t\t\t\t\t\t<div class=\"EQQ_BuddyList_State\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_RecentList_RightContainer_<%=uin%>\" class=\"EQQ_BuddyList_RightContainer\" title=\"<%=titleAllName%> - " + EQQ.hash.onlineStatusText[az.state] + "\">\t\t\t\t\t\t\t<div id=\"EQQ_BuddyList_Nick_<%=uin%>\" class=\"EQQ_BuddyList_Nick\"><%=htmlShowName%></div>\t\t\t\t\t\t</div>\t\t\t\t\t";
					var ay = s.string.template(aA, az);
					var aE = N.node("div", {id:"EQQ_Recent_" + az.uin, uin:az.uin});
					aE.innerHTML = ay;
					this.EQQ_recentList.insertBefore(aE, this.EQQ_recentList.firstChild);
					L.on(aE, "mouseover", K);
					L.on(aE, "mouseout", S);
					L.on(aE, "click", function (aG) {
						ao.apply(this, [aG]);
						pgvSendClick({hottag:"web2qq.qqpanel.recent.sendC2Cmsg"});
					});
					var aC = N.id("EQQ_RecentList_AvatarContainer_" + az.uin);
					L.on(aC, "mouseover", ag);
					L.on(aC, "mouseout", n);
					N.addClass(aE, "EQQ_BuddyList_Buddy");
					N.addClass(aE, "EQQ_" + EQQ.hash.onlineStatus[az.state] + "Buddy");
					var J = N.id("EQQ_RecentList_Avatar_" + az.uin);
					if (az.uin && J) {
						J.src = EQQ.getUserAvatar(az.uin);
					}
				} else {
					var aB = aF.content;
					var aD = "\t\t\t\t\t<div class=\"EQQ_GroupList_AvatarContainer\" title=\"\">\t\t\t\t\t\t<img id=\"EQQ_GroupList_Avatar_" + aB.gid + "\" class=\"EQQ_GroupList_Avatar\" src=\"" + EQQ.getGroupAvatar(aB.code) + "\" />\t\t\t\t\t\t<div class=\"EQQ_GroupList_State\" id=\"EQQ_RecentList_State_" + aB.gid + "\" title=\"\u7fa4\u5c4f\u853d\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class=\"EQQ_GroupList_RightContainer\" title=\"<%=titleAllName%> - <%=titleTypeText%>\">\t\t\t\t\t\t<div id=\"EQQ_GroupRecentList_Name_" + aB.gid + "\" class=\"EQQ_GroupList_Name\"><%=htmlShowName%></div>\t\t\t\t\t</div>\t\t\t\t";
					var ay = s.string.template(aD, aB);
					var ax = N.node("div", {id:"EQQ_Recent_" + aB.gid, code:aB.code});
					ax.innerHTML = ay;
					this.EQQ_recentList.insertBefore(ax, this.EQQ_recentList.firstChild);
					L.on(ax, "mouseover", K);
					L.on(ax, "mouseout", S);
					L.on(ax, "click", function (aG) {
						ar.apply(this, [aG]);
						pgvSendClick({hottag:"web2qq.qqpanel.recent.sendqunmsg"});
					});
					N.addClass(ax, "EQQ_GroupList_Group");
				}
			}
		};
		this.updateRecentByBuddy = function (J) {
			var ax = N.id("EQQ_Recent_" + J.uin);
			if (ax) {
				this.EQQ_recentList.insertBefore(ax, this.EQQ_recentList.firstChild);
			} else {
				this.addRecent({type:0, content:J});
			}
		};
		this.updateRecentByGroup = function (J) {
			var ax = N.id("EQQ_Recent_" + J.gid);
			if (ax) {
				this.EQQ_recentList.insertBefore(ax, this.EQQ_recentList.firstChild);
			} else {
				this.addRecent({type:1, content:J});
			}
		};
		this.setMode = function (J) {
			switch (J) {
			  case "master":
				g = ab;
				N.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
				break;
			  case "slave":
				g = t;
				N.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "WebQQ\u73b0\u5728\u5904\u4e8e\u8f85\u6a21\u5f0f\uff0c\u8bf7\u4ece\u5ba2\u6237\u7aefQQ\u4fee\u6539\u60a8\u7684\u5728\u7ebf\u72b6\u6001\u3002";
				break;
			}
		};
		this.toggleStatePanel = function (J) {
			if (this.statePanel && this.statePanel.isShow()) {
				this.hideStatePanel();
			} else {
				this.showStatePanel(J);
			}
		};
		this.showStatePanel = function (aA) {
			if (N.id("EQQ_StatePanel")) {
			} else {
				this.createStatePanelDom();
			}
			if (aA) {
				var az = this.statePanel.getWidth();
				var ax = this.statePanel.getHeight();
				var aB = qqweb.layout.getClientWidth();
				var ay = qqweb.layout.getClientHeight();
				var J = aA[0], aC = aA[1];
				if (J < 2) {
					J = 2;
				}
				if (aC < 2) {
					aC = 2;
				}
				if (J > aB - az - 2) {
					J = aB - az - 2;
				}
				if (aC > ay - ax - 2) {
					aC = ay - ax - 2;
				}
				this.statePanel.setXY(J, aC);
			}
			this.statePanel.setZIndex(qqweb.layout.getTopZIndex());
			this.statePanel.show();
		};
		this.hideStatePanel = function () {
			if (this.statePanel) {
				this.statePanel.hide();
			}
		};
		this.setSelfState = function (J) {
			L.notifyObservers(this, "SelfStateChange", J);
			this.updateSelfStateChange(J);
		};
		this.removeGroup = function (aA) {
			var az = EQQ.Model.BuddyList.getGroupByCode(aA);
			var ay = az.gid;
			s.out(az);
			var aB = N.id("EQQ_Group_" + ay);
			if (aB) {
				L.off(aB);
				if (aB.parentNode) {
					var ax = aB.parentNode;
					ax.removeChild(aB);
				}
			}
			s.out(aB);
			var J = N.id("EQQ_Recent_" + ay);
			if (J) {
				L.off(J);
				if (J.parentNode) {
					var ax = J.parentNode;
					ax.removeChild(J);
				}
			}
			s.out(J);
		};
	};
	var b = "EQQ.View.MainPanel";
	WebqCore.register(b, c);
	var a = function (q) {
		var P = this, L = q.dom, I = q.event, B = q.string, i = false, n = false, T = false, t = false, ah = false, j = false, ag = {}, ad = [], e = [], ai = {}, M = 0, af = 38, K = 40, S = 13, h, f = 160, A = 50, D = 20, O = "0", s = qqweb.layout.getPanel("desktop").body, F = null, p = null, W = null, u = null, V = null, z = false, x = false, m;
		EQQ.avatarMouseoverTimer = null;
		var y = function () {
			if (F) {
				clearTimeout(F);
			}
			P.show();
		};
		var aj = function () {
			if (F) {
				clearTimeout(F);
			}
			F = setTimeout(function () {
				P.hide();
				F = null;
			}, 500);
		};
		var C = function () {
			var J = this.getAttribute("state");
			P.setSelfState(J);
			pgvSendClick({hottag:"web2qq.corner.topright." + J});
		};
		var ap = function () {
			L.setStyle(this, "backgroundColor", "#cbe7fc");
		};
		var w = function () {
			L.setStyle(this, "backgroundColor", "transparent");
		};
		var al = function () {
			L.removeClass(P.EQQ_MyState, "hover");
		};
		var ab = function () {
			L.addClass(P.EQQ_MyState, "hover");
		};
		var r = function () {
		};
		var Z = function (J) {
			P.toggleStatePanel(J);
		};
		var g = Z;
		var E = function (ar) {
			ar.stopPropagation();
			var J = L.getClientXY(P.EQQ_MyState);
			J[1] = J[1] + 16;
			g(J);
			pgvSendClick({hottag:"web2qq.corner.topright.statechange"});
		};
		var ao = function (ar) {
			var J = this.getAttribute("classIndex");
			P.toggleClass(J);
		};
		var H = function () {
			var J = this;
			if (u) {
				clearTimeout(u);
			}
			u = setTimeout(function () {
				if (V) {
					L.setStyle(V, "backgroundColor", "transparent");
				}
				L.setStyle(J, "backgroundColor", "#cbe7fc");
				V = J;
			}, 100);
		};
		var Q = function () {
		};
		var ac = function () {
			var J = this.getAttribute("uin");
			if (EQQ.avatarMouseoverTimer) {
				clearTimeout(EQQ.avatarMouseoverTimer);
				EQQ.avatarMouseoverTimer = null;
			}
			var ar = L.getClientXY(this);
			ar[0] = ar[0] - 218;
			ar[1] = ar[1] - 5;
			P.showMiniCardPanel(J, ar);
			I.notifyObservers(P, "AvatarMouseover", J);
		};
		var l = function () {
			EQQ.avatarMouseoverTimer = window.setTimeout(U, 500);
		};
		this.onAvatarMouseover = function (J, ar) {
			if (J && ar) {
				if (EQQ.avatarMouseoverTimer) {
					clearTimeout(EQQ.avatarMouseoverTimer);
					EQQ.avatarMouseoverTimer = null;
				}
				var at = L.getClientXY(P.EQQ_buddyList);
				at[0] = at[0] - 218;
				at[1] = at[1] + ar.y;
				P.showMiniCardPanel(J, at);
				I.notifyObservers(P, "AvatarMouseover", J);
			}
		};
		this.onFlexException = function () {
			q.out("Flex-Exception");
			var J = window.frames.iframe_fflist;
			P.flex = J.document.getElementById("fflist");
			z = true;
			I.notifyObservers(EQQ, "LoginFailure", {text:"\u62c9\u53d6\u5931\u8d25"});
		};
		this.buddyListReady = function () {
			var J = window.frames.iframe_fflist;
			P.flex = J.document.getElementById("fflist");
			z = true;
			I.notifyObservers(P, "BuddyListReady");
		};
		this.onAvatarMouseout = function () {
			EQQ.avatarMouseoverTimer = window.setTimeout(U, 500);
		};
		var U = function () {
			P.hideMiniCardPanel();
		};
		var Y = function () {
			if (EQQ.avatarMouseoverTimer) {
				clearTimeout(EQQ.avatarMouseoverTimer);
				EQQ.avatarMouseoverTimer = null;
			}
		};
		var N = function () {
			EQQ.avatarMouseoverTimer = window.setTimeout(U, 500);
		};
		var v = function () {
			qqweb.portal.runApp("userDetails", P.miniCardPanel.uin);
			pgvSendClick({hottag:"web2qq.minicard.contacts.more"});
		};
		var ae = function (aw) {
			aw.preventDefault();
			var av = 2;
			var J = this.getAttribute("href");
			var au = /\d+/;
			var at = parseInt(J.match(au)[0]);
			var ar = this;
			qqweb.rpcService.sendGetFriendUin2(at, av, function (ax) {
				m = ax.result.account;
				qqweb.portal.runApp("6", {url:J.replace(au, m)});
			});
			pgvSendClick({hottag:"web2qq.minicard.contacts.qzone"});
		};
		var aa = function (aw) {
			aw.preventDefault();
			var av = 3;
			var J = this.getAttribute("href");
			var au = /\d+/;
			var at = parseInt(J.match(au)[0]);
			var ar = this;
			qqweb.rpcService.sendGetFriendUin2(at, av, function (ax) {
				m = ax.result.account;
				qqweb.portal.runApp("6", {url:J.replace(au, m)});
			});
			pgvSendClick({hottag:"web2qq.minicard.contacts.qqmail"});
		};
		var aq = function (J) {
			J.stopPropagation();
		};
		this.onBuddyListClick = function (J) {
			I.notifyObservers(P, "StartChat", J);
		};
		var ak = function (ar) {
			ar.preventDefault();
			ar.stopPropagation();
			var J = this.getAttribute("uin");
			I.notifyObservers(P, "StartChat", J);
		};
		var an = function () {
			var J = this.getAttribute("code");
			I.notifyObservers(P, "StartGroupChat", J);
		};
		this.init = function () {
			i = false, n = false, T = false, t = false, ah = false, j = false, ag = {}, ad = [], e = [], ai = {}, M = 0, F = null, p = null, W = null, u = null, V = null, z = false, x = false;
			I.on(window, "resize", q.bind(this.onWindowResize, this));
			I.addObserver(qqweb.app.eqq.window, "resize", q.bind(this.onEqqResize, this));
			I.addObserver(qqweb.layout, "SideBarPinUp", q.bind(this.onWindowResize, this));
			I.addObserver(qqweb.layout, "SideBarPinDown", q.bind(this.onWindowResize, this));
			this.EQQ_Container = L.id("EQQ_Container");
			this.EQQ_MainPanel = L.id("EQQ_MainPanel");
			this.EQQ_MyPanel = L.id("EQQ_MyPanel");
			this.EQQ_MyAvatar = L.id("EQQ_MyAvatar");
			this.EQQ_MyNick = L.id("EQQ_MyNick");
			this.EQQ_MyState = L.id("EQQ_MyState");
			this.EQQ_MyStateShow = L.id("EQQ_MyStateShow");
			this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
			I.off(this.EQQ_MyState, "click");
			I.on(this.EQQ_MyState, "click", E);
			L.show(this.EQQ_MyState);
			this.EQQ_MySignature = L.id("EQQ_MySignature");
			this.EQQ_YellowTips = L.id("EQQ_YellowTips");
			I.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);
			this.EQQ_LoginSuccess = L.id("EQQ_LoginSuccess");
			this.EQQ_SearchBar = L.id("EQQ_SearchBar");
			this.EQQ_SearchBox = L.id("EQQ_SearchBox");
			this.EQQ_SearchButton = L.id("EQQ_SearchButton");
			this.EQQ_SearchResultPanel = L.id("EQQ_SearchResultPanel");
			this.EQQ_SearchResultPanel_iframeWrap = L.id("EQQ_SearchResultPanel_iframeWrap");
			I.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
			I.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
			I.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
			I.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
			I.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
			I.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
			I.on(this.EQQ_SearchBox, "click", q.bind(this.startSearch, this));
			I.on(this.EQQ_SearchButton, "click", q.bind(function () {
				if (p) {
					P.hideSearchResult();
					I.notifyObservers(P, "StartChat", p.uin);
					pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
				}
			}, this));
			this.EQQ_Logining = L.id("EQQ_Logining");
			this.EQQ_Logining_feedback = L.id("EQQ_Logining_feedback");
			this.EQQ_ReLoginPanel = L.id("EQQ_ReLoginPanel");
			this.EQQ_ReLoginButton = L.id("EQQ_ReLoginButton");
			this.EQQ_ReLoginButton_text = L.id("EQQ_ReLoginButton_text");
			I.on(this.EQQ_ReLoginButton, "click", this.onReLoginButtonClick);
			this.EQQ_TabBuddyList = L.id("EQQ_TabBuddyList");
			this.EQQ_TabGroupList = L.id("EQQ_TabGroupList");
			this.EQQ_TabRecentList = L.id("EQQ_TabRecentList");
			this.EQQ_ListContainer = L.id("EQQ_ListContainer");
			this.EQQ_buddyListPanel = L.id("EQQ_buddyListPanel");
			this.EQQ_groupListOuter = L.id("EQQ_groupListOuter");
			this.EQQ_buddyList = L.id("EQQ_buddyList");
			I.on(this.EQQ_buddyList, "mousedown", aq);
			this.EQQ_createGroupButton = L.id("EQQ_createGroupButton");
			this.EQQ_searchGroupButton = L.id("EQQ_searchGroupButton");
			I.on(this.EQQ_createGroupButton, "click", qqweb.util.observer.openInWebBrowser);
			I.on(this.EQQ_createGroupButton, "click", function () {
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.CREATE"});
			});
			I.on(this.EQQ_searchGroupButton, "click", qqweb.util.observer.openInWebBrowser);
			I.on(this.EQQ_searchGroupButton, "click", function () {
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.QUNSEEK"});
			});
			this.EQQ_ListBottom_maskButton = L.id("EQQ_ListBottom_maskButton");
			I.on(this.EQQ_ListBottom_maskButton, "click", X);
			this.EQQ_groupListPanel = L.id("EQQ_groupListPanel");
			this.EQQ_groupListInner = L.id("EQQ_groupListInner");
			I.on(this.EQQ_groupListInner, "mousedown", aq);
			this.EQQ_recentListPanel = L.id("EQQ_recentListPanel");
			this.EQQ_recentList = L.id("EQQ_recentList");
			I.on(this.EQQ_recentList, "mousedown", aq);
			this.EQQ_findBuddy = L.id("EQQ_findBuddy");
			this.EQQ_buddyManage = L.id("EQQ_buddyManage");
			I.on(this.EQQ_findBuddy, "click", function (J) {
				J.preventDefault();
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.SEEK"});
				qqweb.portal.runApp("buddyFinder", {});
			});
			I.on(this.EQQ_buddyManage, "click", function (J) {
				J.preventDefault();
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.MANAGE"});
				qqweb.portal.runApp("5", {});
			});
			this.mainTab = new q.ui.Tab();
			this.mainTab.add({trigger:this.EQQ_TabBuddyList, sheet:this.EQQ_buddyListPanel});
			this.mainTab.add({trigger:this.EQQ_TabGroupList, sheet:this.EQQ_groupListPanel});
			this.mainTab.add({trigger:this.EQQ_TabRecentList, sheet:this.EQQ_recentListPanel});
			this.mainTab.config.triggerEvent = "click";
			this.mainTab.config.slideEnabled = false;
			this.mainTab.init();
			I.addObserver(this.mainTab, "show", function (ar) {
				var J = this.indexOf(ar);
				switch (J) {
				  case 0:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"});
					break;
				  case 1:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.QUN.QUNLIST"});
					break;
				  case 2:
					pgvSendClick({hottag:"WEB2QQ.QQPANEL.RECENT.RECENTLIST"});
					break;
				}
			});
			this.onWindowResize();
		};
		this.createStatePanelDom = function () {
			var ar = L.node("ul", {id:"EQQ_StatePanel", "class":"EQQ_statePanel"});
			s.appendChild(ar);
			this.statePanel = new qqweb.layout.PopupBox({noCatchMouseUp:true, container:ar, html:"\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetOnline\" state=\"online\"><div class=\"EQQ_stateSelect_icon EQQ_online\"></div><div class=\"EQQ_stateSelect_text\">\u6211\u5728\u7ebf\u4e0a</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetAway\" state=\"away\"><div class=\"EQQ_stateSelect_icon EQQ_away\"></div><div class=\"EQQ_stateSelect_text\">\u79bb\u5f00</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetHidden\" state=\"hidden\"><div class=\"EQQ_stateSelect_icon EQQ_hidden\"></div><div class=\"EQQ_stateSelect_text\">\u9690\u8eab</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetOffline\" state=\"offline\"><div class=\"EQQ_stateSelect_icon EQQ_offline\"></div><div class=\"EQQ_stateSelect_text\">\u79bb\u7ebf</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetCallme\" state=\"callme\"><div class=\"EQQ_stateSelect_icon EQQ_callme\"></div><div class=\"EQQ_stateSelect_text\">Q\u6211\u5427</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetBusy\" state=\"busy\"><div class=\"EQQ_stateSelect_icon EQQ_busy\"></div><div class=\"EQQ_stateSelect_text\">\u5fd9\u788c</div></li>\t\t\t\t\t<li class=\"EQQ_statePanel_li\" id=\"EQQ_SetSilent\" state=\"silent\"><div class=\"EQQ_stateSelect_icon EQQ_silent\"></div><div class=\"EQQ_stateSelect_text\">\u8bf7\u52ff\u6253\u6270</div></li>"});
			I.addObserver(this.statePanel, "hide", al);
			I.addObserver(this.statePanel, "show", ab);
			this.EQQ_SetOnline = L.id("EQQ_SetOnline");
			this.EQQ_SetCallme = L.id("EQQ_SetCallme");
			this.EQQ_SetAway = L.id("EQQ_SetAway");
			this.EQQ_SetBusy = L.id("EQQ_SetBusy");
			this.EQQ_SetSilent = L.id("EQQ_SetSilent");
			this.EQQ_SetHidden = L.id("EQQ_SetHidden");
			this.EQQ_SetOffline = L.id("EQQ_SetOffline");
			var J = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway, this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden, this.EQQ_SetOffline];
			q.array.forEach(J, function (av, au, at) {
				I.on(av, "mouseover", ap);
			});
			q.array.forEach(J, function (av, au, at) {
				I.on(av, "mouseout", w);
			});
			q.array.forEach(J, function (av, au, at) {
				I.on(av, "click", C);
			});
		};
		this.createGroupMaskPanelDom = function () {
			var J = L.node("div", {"class":"groupMaskPanel"});
			s.appendChild(J);
			P.groupMaskPanel = new qqweb.layout.PopupBox({container:J, html:" <a id=\"GroupMask_Costom\" state=\"0\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u4f7f\u7528\u7fa4\u81ea\u8eab\u7684\u6d88\u606f\u8bbe\u7f6e</a>\t\t\t\t\t<a id=\"GroupMask_Prompt\" state=\"1\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u63a5\u6536\u5e76\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t<a id=\"GroupMask_NoPrompt\" state=\"2\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u63a5\u6536\u4e0d\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t<a id=\"GroupMask_Mask\" state=\"3\" class=\"simpleMenuItem\" href=\"###\"><div class=\"selectedIcon\"></div>\u6240\u6709\u7fa4\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f</a>"});
			this.costomDom = L.id("GroupMask_Costom");
			this.promptDom = L.id("GroupMask_Prompt");
			this.noPromptDom = L.id("GroupMask_NoPrompt");
			this.maskDom = L.id("GroupMask_Mask");
			var ar = [this.costomDom, this.promptDom, this.noPromptDom, this.maskDom];
			q.array.forEach(ar, function (av, au, at) {
				I.on(av, "click", k);
			});
			this.setGroupMaskState(O);
		};
		var k = function (ar) {
			ar.preventDefault();
			var J = parseInt(this.getAttribute("state"));
			O = J;
			P.setGroupMaskState(O);
			I.notifyObservers(P, "SetGroupMaskState", J);
			switch (J) {
			  case "0":
			  case 0:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.QUNSELF"});
				break;
			  case "1":
			  case 1:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHALERTS"});
				break;
			  case "2":
			  case 2:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHOUTALERTS"});
				break;
			  case "3":
			  case 3:
				pgvSendClick({hottag:"WEB2QQ.QQPANEL.MESSAGESETTING.BLOCK"});
				break;
			}
		};
		this.setGroupMaskState = function (J) {
			L.removeClass(this.costomDom, "simpleMenuItemSelected");
			L.removeClass(this.promptDom, "simpleMenuItemSelected");
			L.removeClass(this.noPromptDom, "simpleMenuItemSelected");
			L.removeClass(this.maskDom, "simpleMenuItemSelected");
			J = parseInt(J);
			switch (J) {
			  case 0:
				L.addClass(this.costomDom, "simpleMenuItemSelected");
				break;
			  case 1:
				L.addClass(this.promptDom, "simpleMenuItemSelected");
				break;
			  case 2:
				L.addClass(this.noPromptDom, "simpleMenuItemSelected");
				break;
			  case 3:
				L.addClass(this.maskDom, "simpleMenuItemSelected");
				break;
			}
		};
		this.setGroupListMaskState = function (ar, au) {
			var J = L.id("EQQ_GroupList_State_" + ar);
			var at = L.id("EQQ_RecentList_State_" + ar);
			if (!au) {
				if (J) {
					L.addClass(J, "EQQ_GroupMask_State");
				}
				if (at) {
					L.addClass(at, "EQQ_GroupMask_State");
				}
			} else {
				if (J) {
					L.removeClass(J, "EQQ_GroupMask_State");
				}
				if (at) {
					L.removeClass(at, "EQQ_GroupMask_State");
				}
			}
		};
		var X = function (ar) {
			ar.stopPropagation();
			var J = L.getClientXY(P.EQQ_ListBottom_maskButton);
			P.toggleGroupMaskStatePanel(J);
		};
		this.toggleGroupMaskStatePanel = function (J) {
			if (this.groupMaskPanel && this.groupMaskPanel.isShow()) {
				this.hideGroupMaskStatePanel();
			} else {
				this.showGroupMaskStatePanel(J);
			}
		};
		this.showGroupMaskStatePanel = function (av) {
			if (this.groupMaskPanel) {
			} else {
				this.createGroupMaskPanelDom();
			}
			if (av) {
				var au = this.groupMaskPanel.getWidth();
				var ar = this.groupMaskPanel.getHeight();
				var aw = qqweb.layout.getClientWidth();
				var at = qqweb.layout.getClientHeight();
				var J = av[0], ax = av[1] - 100;
				if (J < 2) {
					J = 2;
				}
				if (ax < 2) {
					ax = 2;
				}
				if (J > aw - au - 2) {
					J = aw - au - 2;
				}
				if (ax > at - ar - 2) {
					ax = at - ar - 2;
				}
				this.groupMaskPanel.setXY(J, ax);
			}
			this.groupMaskPanel.setZIndex(qqweb.layout.getTopZIndex(3));
			this.groupMaskPanel.show();
		};
		this.hideGroupMaskStatePanel = function () {
			if (this.groupMaskPanel) {
				this.groupMaskPanel.hide();
			}
		};
		this.createMiniCardPanelDom = function () {
			var aB = L.node("div", {id:"miniCard", "class":"panel_1"});
			aB.innerHTML = "\t\t\t<div class=\"panel_1_outer\">\t\t\t\t<div class=\"panel_1_inner\">\t\t\t\t\t<div class=\"panel_1_container\">\t\t\t\t\t\t<div id=\"panel_1_center\" class=\"panel_1 panel_1_center\"></div>\t\t\t\t\t\t<div id=\"panel_1_t\" class=\"panel_1 panel_1_t\"></div>\t\t\t\t\t\t<div id=\"panel_1_rt\" class=\"panel_1 panel_1_rt\"></div>\t\t\t\t\t\t<div id=\"panel_1_r\" class=\"panel_1 panel_1_r\"></div>\t\t\t\t\t\t<div id=\"panel_1_rb\" class=\"panel_1 panel_1_rb\"></div>\t\t\t\t\t\t<div id=\"panel_1_b\" class=\"panel_1 panel_1_b\"></div>\t\t\t\t\t\t<div id=\"panel_1_lb\" class=\"panel_1 panel_1_lb\"></div>\t\t\t\t\t\t<div id=\"panel_1_l\" class=\"panel_1 panel_1_l\"></div>\t\t\t\t\t\t<div id=\"panel_1_lt\" class=\"panel_1 panel_1_lt\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id=\"miniCardBody\" class=\"panel_1_content\">\t\t\t\t\t\t<img id=\"miniCard_avatar\" class=\"miniCard_avatar\" />\t\t\t\t\t\t<div class=\"miniCard_name\">\t\t\t\t\t\t\t<div id=\"miniCard_name_inner\" class=\"miniCard_name_inner\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_signature\" class=\"miniCard_signature\">\t\t\t\t\t\t\t<div id=\"miniCard_signature_inner\" class=\"miniCard_signature_inner\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_clientType_innerWrapper\" class =\"miniCard_clientType_innerWrapper\"><div class =\"miniCard_clientTypeIcon\"></div><div id=\"miniCard_clientType_inner\" class=\"miniCard_clientType_inner\"></div></div>\t\t\t\t\t\t<div id=\"miniCard_level\" class=\"miniCard_level\"></div>\t\t\t\t\t\t<div id=\"miniCard_level_upinfo\" class=\"miniCard_level_upinfo\"></div>\t\t\t\t\t\t<div id=\"miniCard_quickLink\" class=\"miniCard_quickLink\">\t\t\t\t\t\t\t<a id=\"miniCard_qzone\" class=\"miniCard_qzone\" type=\"qzone\" title=\"\u8bbf\u95eeQQ\u7a7a\u95f4\" hidefocus target=\"_blank\" href=\"###\"></a>\t\t\t\t\t\t\t<a id=\"miniCard_qmail\" class=\"miniCard_qmail\" type=\"qmail\" title=\"\u53d1\u9001\u90ae\u4ef6\" hidefocus target=\"_blank\" href=\"###\"></a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_buddyOption_tabHead\" class=\"buddyOption_tabHead\">\t\t\t\t\t\t\t<div id=\"miniCard_userDetails\" class=\"buddyOption_tabHead_div\">\u8be6\u7ec6\u8d44\u6599</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"miniCard_buddyOption_tabBody\" class=\"buddyOption_tabBody\">\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>";
			s.appendChild(aB);
			var aw = L.id("miniCard_avatar");
			var aC = L.id("miniCard_name_inner");
			var az = L.id("miniCard_signature");
			var J = L.id("miniCard_signature_inner");
			var ay = L.id("miniCard_clientType_inner");
			var aA = L.id("miniCard_clientType_innerWrapper");
			var av = L.id("miniCard_level");
			var ax = L.id("miniCard_level_upinfo");
			var ar = L.id("miniCard_qzone");
			var at = L.id("miniCard_qmail");
			var au = L.id("miniCard_userDetails");
			I.on(aB, "mouseover", Y);
			I.on(aB, "mouseout", N);
			I.on(au, "click", v);
			I.on(ar, "click", ae);
			I.on(at, "click", aa);
			this.miniCardPanel = new qqweb.layout.Panel({container:aB, body:L.id("miniCardBody"), html:""});
			this.miniCardPanel.setInfo = function (aD) {
				this.uin = aD.uin;
				var aE = aD.uin == qqweb.portal.self.uin;
				aw.src = EQQ.getUserDefaultAvatar();
				aw.src = aD.avatarUrl;
				if (aE) {
					au.innerHTML = "\u4fee\u6539\u8d44\u6599";
					aw.src = qqweb.util.getUserAvatar(aD.uin, 1) + "&t=" + (new Date()).getTime();
				} else {
					au.innerHTML = "\u8be6\u7ec6\u8d44\u6599";
				}
				aC.innerHTML = aD.htmlAllName;
				aC.title = (aD.allName);
				J.innerHTML = "";
				av.innerHTML = "";
				ax.innerHTML = "";
				ar.href = EQQ.getQzoneUrl(aD.uin);
				at.href = EQQ.getSendMailUrl(aD.uin);
				if (aE || aD.clientType == "1" || aD.clientType == "10000" || aD.type == "stranger" || !aD.clientType) {
					aA.className = "miniCard_clientType_innerWrapper";
					az.style.display = "block";
				} else {
					aA.className = "miniCard_clientType_" + EQQ.hash.clientType[aD.clientType || "10000"];
					ay.innerHTML = EQQ.hash.clientTypeText[aD.clientType || "10000"] + "\u767b\u5f55\u4e2d";
					az.style.display = "none";
				}
				I.notifyObservers(P, "MiniCardShow", aD);
			};
			this.miniCardPanel.setSignature = function (aD) {
				J.innerHTML = aD.htmlSignature;
				J.title = (aD.signature);
			};
			this.miniCardPanel.setClientType = function (aD) {
				if (this.uin == aD.uin) {
					if (aD.type == "stranger") {
					} else {
						if (aD.clientType == "1") {
							aA.className = "miniCard_clientType_" + EQQ.hash.clientType[aD.clientType || "10000"];
							ay.innerHTML = EQQ.hash.clientTypeText[aD.clientType || "10000"] + "\u767b\u5f55\u4e2d";
							az.style.display = "none";
						} else {
							aA.className = "miniCard_clientType_innerWrapper";
							az.style.display = "block";
						}
					}
				}
			};
			this.miniCardPanel.setQQLevel = function (aF) {
				var aL = aF.level;
				var aD = aL.level;
				var aK = parseInt(aD / 64), aJ = parseInt((aD % 64) / 16), aE = parseInt(((aD % 64) % 16) / 4), aI = ((aD % 64) % 16) % 4, aH = "";
				for (var aG = 0; aG < aK; aG++) {
					aH += "<div class=\"miniCard_level_div qqLevel_queen\"></div>";
				}
				for (var aG = 0; aG < aJ; aG++) {
					aH += "<div class=\"miniCard_level_div qqLevel_sun\"></div>";
				}
				for (var aG = 0; aG < aE; aG++) {
					aH += "<div class=\"miniCard_level_div qqLevel_moon\"></div>";
				}
				for (var aG = 0; aG < aI; aG++) {
					aH += "<div class=\"miniCard_level_div qqLevel_star\"></div>";
				}
				av.innerHTML = aH;
				av.title = "\u7b49\u7ea7: " + aD;
				if (aF.uin == qqweb.portal.self.uin) {
					ax.innerHTML = "<div class=\"miniCard_level_upinfo_div\" title=\"\u6d3b\u8dc3\u5929\u6570\uff1a" + aL.days + "\"><span class=\"icon days\"></span>" + aL.days + "\u5929</div><div class=\"miniCard_level_upinfo_div\" title=\"\u8ddd\u5347\u7ea7\u5230" + (aD + 1) + "\u7ea7\u8fd8\u6709" + aL.remainDays + "\u5929\"><span class=\"icon remainDays\"></span>" + aL.remainDays + "\u5929</div>";
				}
			};
		};
		this.showMiniCardPanel = function (J, az) {
			if (this.miniCardPanel) {
			} else {
				this.createMiniCardPanelDom();
			}
			if (az) {
				var ar = this.miniCardPanel.getWidth() + 10;
				var ay = this.miniCardPanel.getHeight() + 10;
				var ax = qqweb.layout.getClientWidth();
				var au = qqweb.layout.getClientHeight();
				var aw = az[0], av = az[1];
				if (aw < 2) {
					aw = 2;
				}
				if (av < 2) {
					av = 2;
				}
				if (aw > ax - ar - 2) {
					aw = ax - ar - 2;
				}
				if (av > au - ay - 2) {
					av = au - ay - 2;
				}
				this.miniCardPanel.setXY(aw, av);
			}
			var at = EQQ.Model.BuddyList.getUserByUin(J);
			this.miniCardPanel.setInfo(at);
			this.miniCardPanel.setZIndex(qqweb.layout.getTopZIndex(3));
			this.miniCardPanel.show();
		};
		this.hideMiniCardPanel = function () {
			if (this.miniCardPanel) {
				this.miniCardPanel.hide();
			}
		};
		this.createDom = function (ar) {
			var J = L.node("div", {id:"EQQ_MainPanel"});
			J.innerHTML = "\t\t\t\t<div class=\"EQQ_title\">\t\t\t\t\t<div id=\"EQQ_PinDownButton\" class=\"EQQ_PinDownButton\" title=\"\u9489\u4f4f/\u6536\u8d77\">\u9489\u4f4f/\u6536\u8d77</div>\t\t\t\t\t<div id=\"EQQ_CloseButton\" class=\"EQQ_CloseButton\" title=\"\u9690\u85cf\u597d\u53cb\u5217\u8868\">\u6700\u5c0f\u5316</div>\t\t\t\t\t<div id=\"EQQ_MinButton\" class=\"EQQ_MinButton\" title=\"\u8bbe\u7f6e\">\u8bbe\u7f6e</div>\t\t\t\t\t<a class=\"EQQ_FeedbackButton2\" href=\"http://support.qq.com/portal/discuss_pdt/420_1.html\" target=\"_blank\">\u53cd\u9988</a>\t\t\t\t\t<div id=\"EQQ_SettingButton\" class=\"EQQ_settingButton\" title=\"\u8bbe\u7f6eWebQQ\">\t\t\t\t\t\t<div class=\"EQQ_settingButtonIcon\">\u4e0b</div>\t\t\t\t\t\t<div>\u8bbe\u7f6e</div>\t\t\t\t\t</div>\t\t\t\t\t<div class=\"EQQ_titleText\" href=\"#\" target=\"_blank\" title=\"\u8054\u7cfb\u4eba\">\u8054\u7cfb\u4eba</div>\t\t\t\t\t<div class=\"EQQ_betaText\" title=\"1.0.10.12\"></div>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_YellowTips\" class=\"EQQ_YellowTips\">\t\t\t\t\t<div id=\"EQQ_YellowTips_CloseButton\" class=\"EQQ_YellowTips_CloseButton\" title=\"\u5173\u95ed\u63d0\u793a\">X</div>\t\t\t\t\t<a class=\"EQQ_YellowTips_Link\" href=\"http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG\" target=\"_blank\">\u9080\u8bf7\u53c2\u4e0eWebQQ\u7528\u6237\u8c03\u67e5</a>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_LoginSuccess\">\t\t\t\t\t<div id=\"EQQ_SearchBar\" class=\"EQQ_SearchBar\">\t\t\t\t\t\t<input id=\"EQQ_SearchBox\" class=\"EQQ_SearchBox\" name=\"\" type=\"text\" value=\"\u641c\u7d22\u597d\u53cb...\" title=\"\u641c\u7d22\u597d\u53cb...\" />\t\t\t\t\t\t<div id=\"EQQ_SearchButton\" class=\"EQQ_SearchButton\" title=\"\u641c\u7d22...\">\u641c\u7d22\u6309\u94ae</div>\t\t\t\t\t</div>          <div id=\"EQQ_SearchResultPanel_iframeWrap\" class=\"EQQ_SearchResultPanel_iframeWrap\">  \t\t\t\t\t<div id=\"EQQ_SearchResultPanel\" class=\"EQQ_SearchResultPanel\">  \t\t\t\t\t\t<div class=\"EQQ_SearchResultItem\" title=\"\">Kevity1(666666)</div>  \t\t\t\t\t\t<div class=\"EQQ_SearchResultItemHover\" title=\"\">Kevity2(666666)</div>  \t\t\t\t\t\t<div class=\"EQQ_SearchResultItem\" title=\"\">Kevity3(66666)</div>  \t\t\t\t\t</div>            <iframe class=\"EQQ_SearchResultPanel_iframe\"></iframe>  \t\t\t\t</div>\t\t\t\t\t<ul class=\"EQQ_tab\">\t\t\t\t\t\t<li id=\"EQQ_TabBuddyList\" class=\"EQQ_tabBuddyList\" title=\"\u8054\u7cfb\u4eba\"><div class=\"EQQ_tabBuddyList_icon\"></div></li>\t\t\t\t\t\t<li id=\"EQQ_TabGroupList\" class=\"EQQ_tabGroupList\" title=\"\u7fa4\u5217\u8868\"><div class=\"EQQ_tabGroupList_icon\"></div></li>\t\t\t\t\t\t<li id=\"EQQ_TabRecentList\" class=\"EQQ_tabRecentList\" title=\"\u6700\u8fd1\u8054\u7cfb\u4eba\"><div class=\"EQQ_tabRecentList_icon\"></div></li>\t\t\t\t\t</ul>\t\t\t\t\t<div id=\"EQQ_ListContainer\">\t\t\t\t\t\t<div id=\"EQQ_buddyListPanel\" class=\"EQQ_buddyListPanel\">\t\t\t\t\t\t\t<div id=\"EQQ_buddyList\" class=\"EQQ_buddyList\"><iframe id=\"iframe_fflist\" width=\"100%\" height=\"100%\"  border=\"0\" frameborder=\"0\" style=\"border:0;overflow:hidden;\" allowtransparency=\"true\" src=\"/module/eqq/swf/fflist.html?t=20101022001\"></iframe>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class=\"EQQ_ListBottom\">\t\t\t\t\t\t\t\t<a href=\"\" id=\"EQQ_findBuddy\" class=\"searchBuddy\" target=\"_blank\"><div class=\"searchBuddy_div\"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<a href=\"\" id=\"EQQ_buddyManage\" class=\"buddy_manage_icon\" target=\"_blank\"><div class=\"buddy_manage_icon_div\"></div>\u7ba1\u7406</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_groupListPanel\" class=\"EQQ_groupListPanel\"><div class=\"EQQ_groupListOuter\"><div id=\"EQQ_groupListInner\" class=\"EQQ_groupListInner\"></div></div>\t\t\t\t\t\t\t<div class=\"EQQ_ListBottom\">\t\t\t\t\t\t\t\t<a id=\"EQQ_createGroupButton\" class=\"createGroup\" href=\"http://qun.qq.com/air/create\" target=\"_blank\" title=\"\u521b\u5efa\u7fa4\"><div class=\"createGroup_div\"></div>\u521b\u5efa</a>\t\t\t\t\t\t\t\t<a id=\"EQQ_searchGroupButton\" class=\"searchGroup\" href=\"http://qun.qq.com/air/search\" target=\"_blank\" title=\"\u67e5\u627e\u7fa4\"><div class=\"searchGroup_div\"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<div id=\"EQQ_ListBottom_maskButton\"><div></div>\u7fa4\u5c4f\u853d</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_recentListPanel\" class=\"EQQ_recentListPanel\"><div id=\"EQQ_recentList\" class=\"EQQ_recentList\"></div></div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div style=\"height:1000px;width:1000px;\">\t\t\t\t\t<div id=\"EQQ_Logining\">\u53d1\u8d77\u8fde\u63a5...</div>\t\t\t\t</div>\t\t\t\t<div id=\"EQQ_Logining_feedback\"><a href=\"http://support.qq.com/write.shtml?guest=1&fid=513\" target=\"_blank\">\t\t\t\t\t<span class=\"warnning_yellow\">&nbsp;</span>\u53cd\u9988\u767b\u5f55\u5efa\u8bae</a></div>\t\t\t\t<div id=\"EQQ_ReLoginPanel\">\t\t\t\t\t<div style=\"display:inline;\" id=\"EQQ_ReLoginButton_text\">\u767b\u5f55\u5931\u8d25</div>\uff0c<span id=\"EQQ_ReLoginButton\">\u91cd\u8bd5</span>\t\t\t\t</div>";
			ar.innerHTML = "";
			ar.appendChild(J);
			L.setClass(J, "EQQ_mainPanel");
		};
		this.onYellowTipsClick = function () {
			P.hideYellowTips();
			I.notifyObservers(P, "CloseYellowTipsFinish");
		};
		this.showYellowTips = function () {
			f = f + D;
			this.onWindowResize();
			L.show(this.EQQ_YellowTips);
		};
		this.hideYellowTips = function () {
			L.hide(this.EQQ_YellowTips);
			f = f - D;
			this.onWindowResize();
		};
		this.onEqqResize = function (au) {
			var J = 5;
			var ar = au.height;
			var at = ar - A;
			if (at < J) {
				at = J;
			}
			L.setStyle(this.EQQ_ListContainer, "height", (at - J) + "px");
			L.setStyle(this.EQQ_buddyListPanel, "height", (at - J - 25) + "px");
			L.setStyle(this.EQQ_groupListOuter, "height", (at - J - 25) + "px");
			G();
		};
		this.onWindowResize = function (J) {
		};
		this.onSearchBoxMouseover = function () {
			L.setClass(this, "EQQ_SearchBoxHover");
		};
		this.onSearchBoxMouseout = function () {
			L.setClass(this, "EQQ_SearchBox");
		};
		this.onSearchBoxFocus = function () {
			I.off(P.EQQ_SearchBox, "mouseover", P.onSearchBoxMouseover);
			I.off(P.EQQ_SearchBox, "mouseout", P.onSearchBoxMouseout);
			L.setClass(this, "EQQ_SearchBoxFocus");
			P.clearSearchBox(this);
			this.select();
			P.startSearch();
		};
		this.onSearchBoxBlur = function () {
			I.on(P.EQQ_SearchBox, "mouseover", P.onSearchBoxMouseover);
			I.on(P.EQQ_SearchBox, "mouseout", P.onSearchBoxMouseout);
			L.setClass(this, "EQQ_SearchBox");
			P.resetSearchBox(this);
			P.hideSearchResult();
		};
		this.resetSearchBox = function (J) {
			if (J.value == "") {
				J.value = "\u641c\u7d22\u597d\u53cb...";
			}
		};
		this.clearSearchBox = function (J) {
			if (q.string.trim(J.value) == "\u641c\u7d22\u597d\u53cb...") {
				J.value = "";
			}
		};
		this.onSearchButtonClick = function () {
			P.startSearch();
		};
		this.onSearchBoxKeyup = function (J) {
			if (!P.EQQ_SearchBox.value) {
				P.hideSearchResult();
				return;
			}
			if (J.keyCode != af && J.keyCode != K) {
				P.startSearch();
			}
		};
		this.onSearchBoxKeydown = function (ar) {
			switch (ar.keyCode) {
			  case S:
				if (p) {
					ar.preventDefault();
					P.hideSearchResult();
					I.notifyObservers(P, "StartChat", p.uin);
					pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
				}
				break;
			  case af:
				if (M > 0) {
					var J = L.id("EQQ_SearchResultItem_" + p.uin);
					L.setStyle(J, "backgroundColor", "transparent");
					M--;
					p = W[M];
					J = L.id("EQQ_SearchResultItem_" + p.uin);
					if (J) {
						L.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			  case K:
				if (M < W.length - 1) {
					var J = L.id("EQQ_SearchResultItem_" + p.uin);
					L.setStyle(J, "backgroundColor", "transparent");
					M++;
					p = W[M];
					J = L.id("EQQ_SearchResultItem_" + p.uin);
					if (J) {
						L.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			  default:
				break;
			}
		};
		this.startSearch = function () {
			this.clearSearchBox(this.EQQ_SearchBox);
			var J = this.EQQ_SearchBox.value;
			I.notifyObservers(this, "Search", J);
		};
		this.showSearchResult = function (J) {
			if (this.EQQ_SearchBox.value) {
				W = J;
				var av = L.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
				L.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "left", av[0] + "px");
				L.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "top", (av[1] + 26) + "px");
				L.show(this.EQQ_SearchResultPanel);
				L.show(this.EQQ_SearchResultPanel_iframeWrap);
				this.EQQ_SearchResultPanel.innerHTML = "";
				if (J.length == 0) {
					M = null;
					p = null;
					this.EQQ_SearchResultPanel.innerHTML = "<div class=\"EQQ_SearchResultNo\">\u6ca1\u6709\u627e\u5230\u76f8\u5173\u597d\u53cb</div>";
				} else {
					M = 0;
					p = J[0];
					for (var at = 0; at < J.length; at++) {
						var ar = J[at];
						var au = L.node("div");
						L.setClass(au, "EQQ_SearchResultItem");
						au.id = "EQQ_SearchResultItem_" + ar.uin;
						au.setAttribute("uin", ar.uin);
						au.innerHTML = ar.htmlAllName;
						au.title = (ar.allName);
						this.EQQ_SearchResultPanel.appendChild(au);
						if (at == 0) {
							L.setStyle(au, "backgroundColor", "#cbe7fc");
						}
						I.on(au, "mouseover", this.onSearchResultMouseover);
						I.on(au, "mouseout", this.onSearchResultMouseout);
						I.on(au, "mousedown", this.onSearchResultClick);
					}
				}
				I.on(document, "mousedown", q.bind(this.hideSearchResult, this));
			}
		};
		this.hideSearchResult = function () {
			L.hide(this.EQQ_SearchResultPanel_iframeWrap);
			I.off(document, "mousedown");
		};
		this.onSearchResultMouseover = function () {
			L.setStyle(this, "backgroundColor", "#cbe7fc");
		};
		this.onSearchResultMouseout = function () {
			L.setStyle(this, "backgroundColor", "transparent");
		};
		this.onSearchResultClick = function () {
			var J = this.getAttribute("uin");
			P.hideSearchResult();
			I.notifyObservers(P, "StartChat", J);
			pgvSendClick({hottag:"web2qq.qqpanel.searchcontacts"});
		};
		this.show = function () {
			L.show(this.EQQ_MainPanel);
		};
		this.hide = function () {
			L.hide(this.EQQ_MainPanel);
		};
		this.updateSelfInfoChange = function (J) {
			this.EQQ_MyAvatar.src = EQQ.getUserAvatar(J.uin);
			this.EQQ_MyAvatar.title = "\u4fee\u6539\u8d44\u6599";
			this.EQQ_MyNick.innerHTML = J.htmlShowName;
			this.EQQ_MyNick.title = (J.showName + "<" + J.uin + ">");
		};
		this.updateSelfStateChange = function (J) {
			L.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + J);
			if (J === "offline") {
				L.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
			} else {
				L.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
			}
		};
		this.updateSelfSignatureChange = function (J) {
			if (J.signature) {
				this.EQQ_MySignature.innerHTML = J.htmlSignature;
				this.EQQ_MySignature.title = (J.signature);
			} else {
				this.EQQ_MySignature.innerHTML = "\u6709\u4e2a\u6027\uff0c\u6ca1\u7b7e\u540d";
				this.EQQ_MySignature.title = "\u6709\u4e2a\u6027\uff0c\u6ca1\u7b7e\u540d";
			}
		};
		this.createBuddyClass = function (J) {
		};
		this.addOnlineBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.online;
			J.name = "\u5728\u7ebf\u597d\u53cb";
			J.htmlName = q.string.toHtml(J.name);
			J.titleName = q.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		this.addStrangerBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.stranger;
			J.name = "\u964c\u751f\u4eba";
			J.htmlName = q.string.toHtml(J.name);
			J.titleName = q.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		this.addBlackListBuddyClass = function () {
			var J = {};
			J.index = EQQ.hash.userClassType.blacklist;
			J.name = "\u9ed1\u540d\u5355";
			J.htmlName = q.string.toHtml(J.name);
			J.titleName = q.string.encodeHtmlSimple(J.name);
			J.count = 0;
			J.onlineCount = 0;
			J.list = {callme:[], online:[], away:[], busy:[], silent:[], offline:[]};
			this.addBuddyClass(J);
		};
		this.addBuddyClass = function (av, at) {
			var J, au, ar;
			J = L.node("div", {id:"EQQ_listClassHead_" + av.index, classIndex:av.index});
			if (av.index == EQQ.hash.userClassType.online) {
				au = "\t\t\t\t\t<div class=\"EQQ_listClassHeadIcon\">icon</div>\t\t\t\t\t<div class=\"EQQ_ClassList_RightContainer\" title=\"<%=titleName%>\">\t\t\t\t\t\t<%=htmlName%>[<span id=\"EQQ_Class_<%=index%>_OnlineCounter\"><%=onlineCount%></span>]\t\t\t\t\t</div>\t\t\t\t";
			} else {
				au = "\t\t\t\t\t<div class=\"EQQ_listClassHeadIcon\">icon</div>\t\t\t\t\t<div class=\"EQQ_ClassList_RightContainer\" title=\"<%=titleName%>\">\t\t\t\t\t\t<%=htmlName%>&nbsp;[<span id=\"EQQ_Class_<%=index%>_OnlineCounter\"><%=onlineCount%></span>/<span id=\"EQQ_Class_<%=index%>_Counter\"><%=count%></span>]\t\t\t\t\t</div>\t\t\t\t";
			}
			ar = q.string.template(au, av);
			J.innerHTML = ar;
			if (at) {
				this.EQQ_buddyList.insertBefore(J, at);
			} else {
				this.EQQ_buddyList.appendChild(J);
			}
			I.on(J, "click", ao);
			var aw = L.node("div", {id:"EQQ_listClassBody_" + av.index, "class":"EQQ_listClassBody"});
			au = "\t\t\t\t<div id=\"EQQ_Class_<%=index%>_callme\" class=\"EQQ_callmeBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_online\" class=\"EQQ_onlineBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_busy\" class=\"EQQ_busyBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_away\" class=\"EQQ_awayBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_silent\" class=\"EQQ_silentBuddy\"></div>\t\t\t\t<div id=\"EQQ_Class_<%=index%>_offline\" class=\"EQQ_offlineBuddy\"></div>\t\t\t";
			ar = q.string.template(au, av);
			aw.innerHTML = ar;
			this.EQQ_buddyList.insertBefore(aw, J.nextSibling);
			this.collapsedClass(av.index);
		};
		this.hideLogin = function () {
			L.hide(this.EQQ_Logining);
			L.hide(this.EQQ_Logining_feedback);
			L.hide(this.EQQ_ReLoginPanel);
			L.show(this.EQQ_LoginSuccess);
			L.setStyle(this.EQQ_LoginSuccess, "height", "100%");
			var J = {height:qqweb.app.eqq.window.getBodySize().height, width:qqweb.app.eqq.window.getBodySize().width};
			this.onEqqResize(J);
		};
		this.showLogin = function () {
			this.EQQ_Logining.innerHTML = "\u53d1\u8d77\u8fde\u63a5...";
			L.show(this.EQQ_Logining);
			L.show(this.EQQ_Logining_feedback);
			L.hide(this.EQQ_ReLoginPanel);
			L.hide(this.EQQ_LoginSuccess);
			L.setStyle(this.EQQ_LoginSuccess, "height", "0px");
		};
		this.showPullData = function () {
		};
		this.clearBuddyList = function () {
			if (z) {
				this.flex.clearBuddyList();
			}
		};
		this.createBuddyList = function (J) {
		};
		this.getClassExpandFlag = function (J) {
			return ag[J];
		};
		this.setClassExpandFlag = function (ar, J) {
			return ag[ar] = J;
		};
		this.getClassAvatarLoadFlag = function (J) {
			return ai[J];
		};
		this.setClassAvatarLoadFlag = function (ar, J) {
			return ai[ar] = J;
		};
		this.toggleClass = function (J) {
			if (ag[J]) {
				this.collapsedClass(J);
			} else {
				this.expandClass(J);
			}
		};
		this.collapsedClass = function (ar) {
			var J = L.id("EQQ_listClassHead_" + ar), at = L.id("EQQ_listClassBody_" + ar);
			if (ar == EQQ.hash.userClassType.online) {
				L.setClass(J, "EQQ_onlineClassHeadCollapsed");
			} else {
				L.setClass(J, "EQQ_listClassHeadCollapsed");
			}
			L.setStyle(at, "height", "0");
			this.setClassExpandFlag(ar, false);
		};
		this.expandClass = function (ar) {
			var J = L.id("EQQ_listClassHead_" + ar), at = L.id("EQQ_listClassBody_" + ar);
			if (ar == EQQ.hash.userClassType.online) {
				L.setClass(J, "EQQ_onlineClassHeadExpand");
			} else {
				L.setClass(J, "EQQ_listClassHeadExpand");
			}
			L.setStyle(at, "height", "auto");
			this.setClassExpandFlag(ar, true);
			q.out("index: " + ar);
			R();
		};
		var R = function () {
			o(P.EQQ_buddyListPanel);
		};
		var am = function (J) {
			G();
		};
		var G = function (J) {
			if (am.timer) {
				window.clearTimeout(am.timer);
				am.timer = null;
			}
			am.timer = window.setTimeout(R, 500);
		};
		var o = function (au) {
			var aB = parseInt(L.getStyle(au, "height"), 10);
			var at = au.scrollTop;
			var az = L.getXY(au)[1];
			for (var aw = 0; aw < e.length; ) {
				var av = e[aw];
				var J = av.imgEl;
				var ar = av.uin;
				var ax = av.classId;
				var ay = L.getXY(J)[1];
				var aA = ay - az;
				q.out("imgTop1:" + aA + "y2:" + ay);
				if (P.getClassExpandFlag(ax) && J && aA > 0 && aA < aB) {
					q.out("checkAndLoadAvatar & loadAvatar containerHeight: " + aB + ", imgTop2:" + aA);
					J.src = EQQ.getUserAvatar(av.uin);
					e.splice(aw, 1);
				} else {
					aw++;
				}
			}
		};
		this.onBuddyStateChange = function (J) {
			if (z) {
				this.flex.onBuddyStateChange(J);
			}
		};
		this.onOnlineBuddyChange = function (J) {
			if (z) {
				this.flex.onOnlineBuddyChange(J);
			}
		};
		this.addBuddy = function (ar) {
			var J = {classId:ar.classId, uin:ar.uin, clientType:ar.clientType, state:ar.state, nick:ar.nick};
			if (z) {
				this.flex.addBuddy(J);
			}
		};
		this.addOnlineBuddy = function (ar) {
			var J = {uin:ar.uin, clientType:ar.clientType, state:ar.state, nick:ar.nick};
			if (z) {
				this.flex.addOnlineBuddy(J);
			}
		};
		this.removeOnlineBuddy = function (J) {
			if (z) {
				this.flex.removeOnlineBuddy(J.uin);
			}
		};
		this.updateOnlineBuddyClass = function (J) {
			if (z) {
				this.flex.updateOnlineBuddyClass(J.length);
			}
		};
		this.flexStartJump = function (J) {
			if (z) {
				this.flex.startjump(J);
			}
		};
		this.flexStopJump = function (J) {
			if (z) {
				this.flex.stopjump(J);
			}
		};
		this.jumpUp = function (J) {
		};
		this.jumpDown = function (J) {
		};
		this.jumpAvatar = function (J) {
		};
		this.flickerClassHide = function (J) {
		};
		this.flickerClassShow = function (J) {
		};
		this.flickerClass = function (J) {
		};
		this.groupJumpUp = function (ar) {
			t = true;
			for (var J = 0; J < ar.length; J++) {
				var at = L.id("EQQ_Group_" + ar[J]);
				if (at) {
					L.addClass(at, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.groupJumpDown = function (ar) {
			t = false;
			for (var J = 0; J < ar.length; J++) {
				var at = L.id("EQQ_Group_" + ar[J]);
				if (at) {
					L.removeClass(at, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.groupJumpAvatar = function (J) {
			if (t) {
				this.groupJumpDown(J);
			} else {
				this.groupJumpUp(J);
			}
		};
		this.recentJumpUp = function (ar) {
			ah = true;
			for (var J = 0; J < ar.length; J++) {
				var at = L.id("EQQ_Recent_" + ar[J]);
				if (at) {
					L.addClass(at, "EQQ_jumpUpInBuddyList");
					L.addClass(at, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.recentJumpDown = function (ar) {
			ah = false;
			for (var J = 0; J < ar.length; J++) {
				var at = L.id("EQQ_Recent_" + ar[J]);
				if (at) {
					L.removeClass(at, "EQQ_jumpUpInBuddyList");
					L.removeClass(at, "EQQ_jumpUpInGroupList");
				}
			}
		};
		this.recentJumpAvatar = function (J) {
			if (ah) {
				this.recentJumpDown(J);
			} else {
				this.recentJumpUp(J);
			}
		};
		this.moveBuddy = function (ar) {
			var J = {uin:ar.uin, state:ar.state};
			if (z) {
				this.flex.moveBuddy(J);
			}
		};
		this.moveOnlineBuddy = function (ar) {
			var J = {uin:ar.uin, state:ar.state};
			if (z) {
				this.flex.moveOnlineBuddy(J);
			}
		};
		this.updateClientType = function (ar) {
			var J = {uin:ar.uin, clientType:ar.clientType};
			if (z) {
				this.flex.updateClientType(J);
			}
		};
		this.updateBuddyClassOnlineBuddy = function (J) {
			var ar = {index:J.index, onlineCount:J.onlineCount};
			if (z) {
				this.flex.updateBuddyClassOnlineBuddy(ar);
			}
		};
		this.updateRecentState = function (ar) {
			var av = L.id("EQQ_Recent_" + ar.uin);
			if (av) {
				av.className = "";
				L.addClass(av, "EQQ_BuddyList_Buddy");
				L.addClass(av, "EQQ_" + EQQ.hash.onlineStatus[ar.state] + "Buddy");
				var au = EQQ.hash.clientType[ar.clientType];
				var at = EQQ.hash.clientTypeText[ar.clientType || "PC"];
				var J = L.id("EQQ_RecentList_ClientType_" + ar.uin) || {};
				var aw = L.id("EQQ_RecentList_ClientType_Title_" + ar.uin) || {};
				J.className = "EQQ_BuddyList_ClientType_" + au;
				aw.title = at;
			}
		};
		this.updateBuddyClassCount = function (J) {
			var ar = {index:J.index, count:J.count};
			if (z) {
				this.flex.updateBuddyClassCount(ar);
			}
		};
		this.updateStrangerClassOnlineCount = function (J) {
			if (z) {
				this.flex.updateStrangerClassOnlineCount(J);
			}
		};
		this.updateStrangerClassCount = function (J) {
			if (z) {
				this.flex.updateStrangerClassCount(J.length);
			}
		};
		this.setUserName = function (J) {
			if (J.markName) {
				var ar = {uin:J.uin, nick:J.markName};
				if (z) {
					this.flex.setUserName(ar);
				}
			}
		};
		this.setGroupMask = function (J) {
			O = J;
			switch (J) {
			  case "0":
			  case 0:
				L.id("EQQ_ListBottom_maskButton").className = "accept";
				L.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			  case "1":
			  case 1:
				L.id("EQQ_ListBottom_maskButton").className = "accept";
				L.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			  case "2":
			  case 2:
				L.id("EQQ_ListBottom_maskButton").className = "mask";
				L.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			  case "3":
			  case 3:
				L.id("EQQ_ListBottom_maskButton").className = "mask";
				L.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			}
		};
		this.showReLoginPanel = function (J) {
			this.EQQ_ReLoginButton_text.innerHTML = J;
			L.hide(this.EQQ_Logining);
			L.hide(this.EQQ_Logining_feedback);
			L.show(this.EQQ_ReLoginPanel);
			L.hide(this.EQQ_LoginSuccess);
		};
		this.onReLoginButtonClick = function () {
			L.show(P.EQQ_Logining);
			L.show(P.EQQ_Logining_feedback);
			L.hide(P.EQQ_ReLoginPanel);
			L.hide(P.EQQ_LoginSuccess);
			I.notifyObservers(P, "ReLogin");
		};
		this.createGroupList = function (J) {
			this.EQQ_groupListInner.innerHTML = "";
			for (var ar = 0; ar < J.length; ar++) {
				this.addGroup(J[ar]);
			}
		};
		this.addGroup = function (at) {
			var J = "\t\t\t\t<div class=\"EQQ_GroupList_AvatarContainer\" title=\"\">\t\t\t\t\t<img id=\"EQQ_GroupList_Avatar_" + at.gid + "\" class=\"EQQ_GroupList_Avatar\" src=\"" + EQQ.getGroupAvatar(at.code) + "\" />\t\t\t\t\t<div class=\"EQQ_GroupList_State\" id=\"EQQ_GroupList_State_" + at.gid + "\" title=\"\u7fa4\u5c4f\u853d\"></div>\t\t\t\t</div>\t\t\t\t<div class=\"EQQ_GroupList_RightContainer\" title=\"<%=titleAllName%> - <%=titleTypeText%>\">\t\t\t\t\t<div id=\"EQQ_GroupList_Name_" + at.gid + "\" class=\"EQQ_GroupList_Name\"><%=htmlShowName%></div>\t\t\t\t</div>\t\t\t";
			var ar = q.string.template(J, at);
			var au = L.node("div", {id:"EQQ_Group_" + at.gid, code:at.code});
			au.innerHTML = ar;
			this.EQQ_groupListInner.appendChild(au);
			I.on(au, "mouseover", H);
			I.on(au, "click", function (av) {
				an.apply(this, [av]);
				pgvSendClick({hottag:"web2qq.qqpanel.qun.sendmsg"});
			});
			L.addClass(au, "EQQ_GroupList_Group");
		};
		this.updateGroupMarkName = function (ar) {
			var J = L.id("EQQ_GroupList_Name_" + ar.gid);
			if (J) {
				J.innerHTML = ar.htmlShowName;
			}
			J = L.id("EQQ_GroupRecentList_Name_" + ar.gid);
			if (J) {
				J.innerHTML = ar.htmlShowName;
			}
		};
		this.createRecentList = function (ar) {
			this.EQQ_recentList.innerHTML = "";
			for (var J = 0; J < ar.length; J++) {
				this.addRecent(ar[J]);
			}
		};
		this.addRecent = function (aA) {
			if (aA.content) {
				if (aA.type == 0) {
					var au = aA.content;
					var av = "\t\t\t\t\t\t<div class=\"EQQ_RecentList_ClientType\" uin=\"<%=uin%>\" id=\"EQQ_BuddyList_ClientType_Title_<%=uin%>\" title=\"" + EQQ.hash.clientTypeText[au.clientType || "PC"] + "\">\t\t\t\t\t\t\t<div id=\"EQQ_RecentList_ClientType_<%=uin%>\" class=\"EQQ_BuddyList_ClientType_" + EQQ.hash.clientType[au.clientType || "10000"] + "\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_RecentList_AvatarContainer_<%=uin%>\" class=\"EQQ_BuddyList_AvatarContainer\" uin=\"<%=uin%>\" title=\"" + EQQ.hash.onlineStatusText[au.state] + "\">\t\t\t\t\t\t\t<img id=\"EQQ_RecentList_Avatar_<%=uin%>\" class=\"EQQ_BuddyList_Avatar\" src=\"" + EQQ.CONST.EQQ_SERVER_URL + "style/images/avatar_default_20_20.gif\" />\t\t\t\t\t\t\t<div class=\"EQQ_BuddyList_State\"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id=\"EQQ_RecentList_RightContainer_<%=uin%>\" class=\"EQQ_BuddyList_RightContainer\" title=\"<%=titleAllName%> - " + EQQ.hash.onlineStatusText[au.state] + "\">\t\t\t\t\t\t\t<div id=\"EQQ_BuddyList_Nick_<%=uin%>\" class=\"EQQ_BuddyList_Nick\"><%=htmlShowName%></div>\t\t\t\t\t\t</div>\t\t\t\t\t";
					var at = q.string.template(av, au);
					var az = L.node("div", {id:"EQQ_Recent_" + au.uin, uin:au.uin});
					az.innerHTML = at;
					this.EQQ_recentList.insertBefore(az, this.EQQ_recentList.firstChild);
					I.on(az, "mouseover", H);
					I.on(az, "mouseout", Q);
					I.on(az, "click", function (aB) {
						ak.apply(this, [aB]);
						pgvSendClick({hottag:"web2qq.qqpanel.recent.sendC2Cmsg"});
					});
					var ax = L.id("EQQ_RecentList_AvatarContainer_" + au.uin);
					I.on(ax, "mouseover", ac);
					I.on(ax, "mouseout", l);
					L.addClass(az, "EQQ_BuddyList_Buddy");
					L.addClass(az, "EQQ_" + EQQ.hash.onlineStatus[au.state] + "Buddy");
					var J = L.id("EQQ_RecentList_Avatar_" + au.uin);
					if (au.uin && J) {
						J.src = EQQ.getUserAvatar(au.uin);
					}
				} else {
					var aw = aA.content;
					var ay = "\t\t\t\t\t<div class=\"EQQ_GroupList_AvatarContainer\" title=\"\">\t\t\t\t\t\t<img id=\"EQQ_GroupList_Avatar_" + aw.gid + "\" class=\"EQQ_GroupList_Avatar\" src=\"" + EQQ.getGroupAvatar(aw.code) + "\" />\t\t\t\t\t\t<div class=\"EQQ_GroupList_State\" id=\"EQQ_RecentList_State_" + aw.gid + "\" title=\"\u7fa4\u5c4f\u853d\"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class=\"EQQ_GroupList_RightContainer\" title=\"<%=titleAllName%> - <%=titleTypeText%>\">\t\t\t\t\t\t<div id=\"EQQ_GroupRecentList_Name_" + aw.gid + "\" class=\"EQQ_GroupList_Name\"><%=htmlShowName%></div>\t\t\t\t\t</div>\t\t\t\t";
					var at = q.string.template(ay, aw);
					var ar = L.node("div", {id:"EQQ_Recent_" + aw.gid, code:aw.code});
					ar.innerHTML = at;
					this.EQQ_recentList.insertBefore(ar, this.EQQ_recentList.firstChild);
					I.on(ar, "mouseover", H);
					I.on(ar, "click", function (aB) {
						an.apply(this, [aB]);
						pgvSendClick({hottag:"web2qq.qqpanel.recent.sendqunmsg"});
					});
					L.addClass(ar, "EQQ_GroupList_Group");
				}
			}
		};
		this.updateRecentByBuddy = function (J) {
			var ar = L.id("EQQ_Recent_" + J.uin);
			if (ar) {
				this.EQQ_recentList.insertBefore(ar, this.EQQ_recentList.firstChild);
			} else {
				this.addRecent({type:0, content:J});
			}
		};
		this.updateRecentByGroup = function (J) {
			var ar = L.id("EQQ_Recent_" + J.gid);
			if (ar) {
				this.EQQ_recentList.insertBefore(ar, this.EQQ_recentList.firstChild);
			} else {
				this.addRecent({type:1, content:J});
			}
		};
		this.setMode = function (J) {
			switch (J) {
			  case "master":
				g = Z;
				L.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
				break;
			  case "slave":
				g = r;
				L.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "WebQQ\u73b0\u5728\u5904\u4e8e\u8f85\u6a21\u5f0f\uff0c\u8bf7\u4ece\u5ba2\u6237\u7aefQQ\u4fee\u6539\u60a8\u7684\u5728\u7ebf\u72b6\u6001\u3002";
				break;
			}
		};
		this.toggleStatePanel = function (J) {
			if (this.statePanel && this.statePanel.isShow()) {
				this.hideStatePanel();
			} else {
				this.showStatePanel(J);
			}
		};
		this.showStatePanel = function (av) {
			if (L.id("EQQ_StatePanel")) {
			} else {
				this.createStatePanelDom();
			}
			if (av) {
				var au = this.statePanel.getWidth();
				var ar = this.statePanel.getHeight();
				var aw = qqweb.layout.getClientWidth();
				var at = qqweb.layout.getClientHeight();
				var J = av[0], ax = av[1];
				if (J < 2) {
					J = 2;
				}
				if (ax < 2) {
					ax = 2;
				}
				if (J > aw - au - 2) {
					J = aw - au - 2;
				}
				if (ax > at - ar - 2) {
					ax = at - ar - 2;
				}
				this.statePanel.setXY(J, ax);
			}
			this.statePanel.setZIndex(qqweb.layout.getTopZIndex());
			this.statePanel.show();
		};
		this.hideStatePanel = function () {
			if (this.statePanel) {
				this.statePanel.hide();
			}
		};
		this.setSelfState = function (J) {
			I.notifyObservers(this, "SelfStateChange", J);
			this.updateSelfStateChange(J);
		};
		this.removeGroup = function (av) {
			var au = EQQ.Model.BuddyList.getGroupByCode(av);
			var at = au.gid;
			q.out(au);
			var aw = L.id("EQQ_Group_" + at);
			if (aw) {
				I.off(aw);
				if (aw.parentNode) {
					var ar = aw.parentNode;
					ar.removeChild(aw);
				}
			}
			q.out(aw);
			var J = L.id("EQQ_Recent_" + at);
			if (J) {
				I.off(J);
				if (J.parentNode) {
					var ar = J.parentNode;
					ar.removeChild(J);
				}
			}
			q.out(J);
		};
	};
	var d = "EQQ.View.MainPanelFlex";
	WebqCore.register(d, a);
})();
(function () {
	var b = function (o) {
		var y = this, w = o.dom, v = o.event;
		var g = false;
		var u = [], x = [], p = [], i = [], t = true, m = false, q = "";
		var j = false;
		var s = false;
		var B = false;
		this.init = function () {
			g = false;
			u = [];
			x = [];
			p = [];
			i = [];
			t = true;
			m = false, q = "";
			j = false;
			s = false;
			B = false;
			this.View = EQQ.View.MainPanel;
			if (o.browser.ie) {
				if (o.browser.ie == 7) {
					var C = o.GetSwfVer();
					if (C != -1) {
						var F = C.split(" ");
						var E = F[1];
						var D = E.split(",");
						if (parseInt(D[0]) >= 10) {
							s = true;
							this.View = EQQ.View.MainPanelFlex;
							v.addObserver(EQQ.Model.ChatMsg, "flexStartJump", o.bind(this.onFlexStartJump, this));
							v.addObserver(EQQ.Model.ChatMsg, "flexStopJump", o.bind(this.onFlexStopJump, this));
						} else {
							d();
						}
					} else {
						d();
					}
				}
			}
			this.View.createDom(this.getContainer());
			v.addObserver(EQQ, "CloseWebQQ", o.bind(this.onCloseWebQQ, this));
			v.addObserver(EQQ, "SelfOffline", o.bind(this.onSelfOffline, this));
			v.addObserver(EQQ.Model.BuddyList, "SelfInfoChange", o.bind(this.onSelfInfoChange, this));
			v.addObserver(EQQ.Model.BuddyList, "SelfStateChange", o.bind(this.updateSelfStateChange, this));
			v.addObserver(EQQ.Model.BuddyList, "SelfSignatureChange", o.bind(this.handleSelfSignatureChange, this));
			v.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", e);
			v.addObserver(EQQ.Model.BuddyList, "UserQQLevelChange", A);
			v.addObserver(EQQ.Model.BuddyList, "LoginFail", o.bind(this.onLoginFail, this));
			v.addObserver(EQQ.Model.BuddyList, "GetUserInfoSuccess", o.bind(this.onGetUserInfoSuccess, this));
			v.addObserver(EQQ.Model.BuddyList, "BuddyClassChange", o.bind(this.onBuddyClassChange, this));
			v.addObserver(EQQ.Model.BuddyList, "AllClassOnlineBuddyReady", o.bind(this.onAllClassOnlineBuddyReady, this));
			v.addObserver(EQQ.Model.BuddyList, "GroupNameChange", this.onOnGroupNameChange);
			v.addObserver(EQQ.Model.BuddyList, "AddBuddy", o.bind(this.onAddANewBuddy, this));
			v.addObserver(EQQ.Model.BuddyList, "GroupListChange", o.bind(this.onGroupListChange, this));
			v.addObserver(EQQ.Model.BuddyList, "GroupMaskChange", o.bind(this.onGroupMaskChange, this));
			v.addObserver(EQQ.Model.BuddyList, "SingleGroupMaskChange", o.bind(this.onSingleGroupMaskChange, this));
			v.addObserver(EQQ.Model.BuddyList, "RecentListChange", o.bind(this.onRecentListChange, this));
			v.addObserver(EQQ.Model.ChatMsg, "NewStranger", o.bind(this.onNewStranger, this));
			v.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", o.bind(this.onMessageBoxUserListChange, this));
			v.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", o.bind(this.onMessageBoxGroupListChange, this));
			v.addObserver(EQQ.Model.ChatMsg, "MessageListChange", o.bind(this.onMessageListChange, this));
			v.addObserver(EQQ.Model.ChatMsg, "GroupMessageListChange", o.bind(this.onGroupMessageListChange, this));
			v.addObserver(this.View, "StartChat", c);
			v.addObserver(this.View, "StartGroupChat", r);
			v.addObserver(this.View, "SelfStateChange", o.bind(this.onViewSelfStateChange, this));
			v.addObserver(this.View, "SetGroupMaskState", n);
			v.addObserver(this.View, "AddPObservers", o.bind(this.onAddPObservers, this));
			v.addObserver(this.View, "ExitPortal", o.bind(this.onExitPortal, this));
			v.addObserver(this.View, "CloseWebQQ", o.bind(k, this));
			v.addObserver(this.View, "MinMainPanel", o.bind(h, this));
			v.addObserver(this.View, "ReLogin", o.bind(f, this));
			v.addObserver(this.View, "Search", o.bind(this.onSearch, this));
			v.addObserver(this.View, "BuddyListReady", o.bind(this.onBuddyListDomReady, this));
			v.addObserver(this.View, "CloseYellowTipsFinish", o.bind(this.onCloseYellowTipsFinish, this));
			v.addObserver(this.View, "MiniCardShow", l);
			this.View.init();
			if (this.View.setNoneFlashStyle) {
				this.View.setNoneFlashStyle();
			}
		};
		var d = function () {
			var C = qqweb.layout.getWindowManager().createWindow("Window", {title:"\u6e29\u99a8\u63d0\u793a", modeSwitch:true, dragable:true, resize:true, width:420, height:120, hasCloseButton:true, hasOkButton:true, isSetCentered:true});
			var D = "<div style=\"width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;\">\t\t\t\t\t\t\u68c0\u6d4b\u5230\u60a8\u4e3aIE7\u5185\u6838\u7528\u6237\uff0c\u8bf7\u5b89\u88c5\u6700\u65b0<a target=\"_blank\" href=\"http://get.adobe.com/flashplayer\">Flash\u7248\u672c</a>\uff0c\u83b7\u5f97\u66f4\u597d\u4f53\u9a8c\uff01\t\t\t\t\t   </div>";
			C.setHtml(D);
		};
		this.onAddPObservers = function () {
			t = false;
			v.addObserver(EQQ.Model.BuddyList, "BuddyListChange", o.bind(this.onBuddyListChange, this));
			v.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", o.bind(this.onBuddyStateChange, this));
			v.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", o.bind(this.onOnlineBuddyChange, this));
		};
		this.onBuddyListDomReady = function () {
			if (!m) {
				if (t) {
					v.addObserver(EQQ.Model.BuddyList, "BuddyListChange", o.bind(this.onBuddyListChange, this));
					v.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", o.bind(this.onBuddyStateChange, this));
					v.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", o.bind(this.onOnlineBuddyChange, this));
				}
				v.addObserver(EQQ.Model.BuddyList, "UserNameChange", o.bind(this.onUserNameChange, this));
				m = true;
			}
			j = true;
		};
		this.getContainer = function () {
			return EQQ.panel.mainPanel;
		};
		this.getMyPanelContainer = function () {
			return EQQ.panel.myPanel;
		};
		var e = function (C) {
			if (y.View.miniCardPanel) {
				o.out("onUserSignatureChange 33:" + C.uin);
				y.View.miniCardPanel.setSignature(C);
			}
		};
		var A = function (C) {
			if (y.View.miniCardPanel) {
				o.out("onUserQQLevelChange 33:" + C.uin);
				y.View.miniCardPanel.setQQLevel(C);
			}
		};
		var l = function (C) {
			if (C) {
				EQQ.Model.BuddyList.getUserSignature(C.uin);
				EQQ.Model.BuddyList.sendGetQQLevel(C.uin);
			}
		};
		this.showYellowTips = function () {
			this.View.showYellowTips();
		};
		this.hideYellowTips = function () {
			this.View.hideYellowTips();
		};
		this.onCloseYellowTipsFinish = function () {
			this.setCookieTips("hide");
		};
		this.getCookieTips = function () {
			return o.cookie.get("is_close_tips", EQQ.CONST.MAIN_DOMAIN);
		};
		this.setCookieTips = function (C) {
			o.cookie.set("is_close_tips", C, EQQ.CONST.MAIN_DOMAIN, null, 120);
		};
		this.onSearch = function (D) {
			var E = 5;
			var C = EQQ.Model.BuddyList.searchBuddy(D, E);
			this.View.showSearchResult(C);
		};
		this.showMiniCardPanel = function (C, D) {
			this.View.showMiniCardPanel(C, D);
		};
		this.hideMiniCardPanel = function () {
			this.View.hideMiniCardPanel();
		};
		this.onLoginFail = function () {
			qqweb.layout.alert("\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
		};
		this.onSelfInfoChange = function (C) {
			this.View.updateSelfInfoChange(C);
		};
		this.onOnGroupNameChange = function (C) {
			if (typeof (y.View) != "undefined") {
				y.View.updateGroupMarkName(C);
			}
		};
		this.updateSelfStateChange = function (C) {
			this.View.updateSelfStateChange(C);
		};
		this.handleSelfSignatureChange = function (C) {
			this.View.updateSelfSignatureChange(C);
		};
		this.onSelfOffline = function (D) {
			var C = EQQ.Model.BuddyList.getSelf();
			B = false;
			j = false;
			EQQ.stopPoll();
			if (C) {
				C.oldState = C.state;
				C.state = "offline";
			}
			this.updateSelfStateChange("offline");
			qqweb.layout.alert(D);
		};
		this.onBuddyClassChange = function (C) {
			this.clearBuddyList();
			this.View.createBuddyClass(C);
			this.View.hideLogin();
		};
		this.onAllClassOnlineBuddyReady = function () {
			if (!B) {
				B = true;
				this.onBuddyClassListReady();
			}
		};
		this.onBuddyClassListReady = function () {
			EQQ.loginEnd = (new Date()).getTime();
			var C = EQQ.loginEnd - EQQ.loginStart;
			C = C / 1000;
			o.out("time: " + C);
			if (C <= 1) {
			} else {
				if (C <= 5) {
				} else {
					if (C <= 10) {
					} else {
						if (C <= 60) {
						} else {
						}
					}
				}
			}
		};
		this.onBuddyListChange = function (C) {
			if (j) {
			} else {
				if (!s) {
					this.updateAllBuddyClassCount(EQQ.Model.BuddyList.getClassList());
					this.createBuddyList(C);
				}
			}
		};
		this.onGroupListChange = function (C) {
			this.View.createGroupList(C);
		};
		this.onAddANewBuddy = function (H) {
			var I = this;
			var D = H.user;
			var C = H.newstate;
			this.View.addBuddy(D);
			var G = D.classId;
			var F = EQQ.Model.BuddyList.getClassById(G);
			this.View.updateBuddyClassCount(F);
			if (H.markname) {
				var E = EQQ.Model.BuddyList.getBuddyByUin(D.uin);
				E.setMarkName(H.markname);
			}
			v.notifyObservers(EQQ.Model.BuddyList, "BuddyStatusChange", C);
		};
		this.onRecentListChange = function (D) {
			for (var C = 0; C < D.length; C++) {
				if (D[C].type == 0) {
					D[C].content = EQQ.Model.BuddyList.getBuddyByUin(D[C].uin);
				} else {
					D[C].content = EQQ.Model.BuddyList.getGroupByGid(D[C].uin);
				}
			}
			this.View.createRecentList(D);
		};
		this.onUserNameChange = function (C) {
			this.View.setUserName(C);
		};
		this.onGroupMaskChange = function (E) {
			var C = EQQ.Model.BuddyList.getGroupList();
			for (var D = 0; D < C.length; D++) {
				var F = C[D];
				var G = EQQ.Model.BuddyList.isGroupPrompt(F.gid);
				this.View.setGroupListMaskState(F.gid, G);
			}
			this.View.setGroupMask(E);
		};
		this.onSingleGroupMaskChange = function (C) {
			var D = EQQ.Model.BuddyList.isGroupPrompt(C.gid);
			this.View.setGroupListMaskState(C.gid, D);
		};
		this.onGetUserInfoSuccess = function (C) {
		};
		this.onNewStranger = function (C) {
			var E = EQQ.Model.BuddyList.getStrangerList();
			var D = E.length;
			this.View.updateStrangerClassOnlineCount(D);
			this.View.updateStrangerClassCount(E);
			this.View.addBuddy(C);
		};
		this.updateAllBuddyClassCount = function (D) {
			for (var C = 0; C < D.length; C++) {
				this.updateBuddyClassCount(D[C]);
			}
		};
		this.updateBuddyClassCount = function (C) {
			this.View.updateBuddyClassCount(C);
		};
		this.createBuddyList = function (C) {
			this.View.createBuddyList(C);
		};
		this.updateRecentByBuddy = function (C) {
			this.View.updateRecentByBuddy(C);
		};
		this.updateRecentByGroup = function (C) {
			this.View.updateRecentByGroup(C);
		};
		this.onBuddyStateChange = function (E) {
			if (s) {
				if (j) {
					var D = EQQ.Model.BuddyList.getUserByUin(E);
					var C = {uin:D.uin, client_type:D.clientType, state:D.state, nick:D.nick};
					this.View.onBuddyStateChange(C);
				}
			} else {
				var D = EQQ.Model.BuddyList.getUserByUin(E);
				this.View.moveBuddy(D);
				this.View.moveOnlineBuddy(D);
				this.View.updateClientType(D);
				this.View.updateRecentState(D);
				if (this.View.miniCardPanel) {
					this.View.miniCardPanel.setClientType(D);
				}
			}
		};
		this.onOnlineBuddyChange = function (E) {
			if (s) {
				if (j) {
					var D = EQQ.Model.BuddyList.getUserByUin(E);
					var C = {uin:D.uin, client_type:D.clientType, state:D.state, nick:D.showName};
					this.View.onOnlineBuddyChange(C);
				}
			} else {
				var D = EQQ.Model.BuddyList.getUserByUin(E);
				var H = EQQ.Model.BuddyList.getClassByUin(E);
				var G = EQQ.hash.onlineStatus.offline;
				var F = EQQ.Model.BuddyList.getOnlineBuddy();
				this.View.updateBuddyClassOnlineBuddy(H);
				this.View.updateOnlineBuddyClass(F);
				if (D.state == G) {
					this.View.removeOnlineBuddy(D);
				} else {
					this.View.addOnlineBuddy(D);
				}
			}
		};
		this.onFlexStartJump = function (C) {
			this.View.flexStartJump(C);
		};
		this.onFlexStopJump = function (C) {
			this.View.flexStopJump(C);
		};
		this.onMessageBoxUserListChange = function (D) {
			var C = EQQ.Model.BuddyList.getSelf();
			var F = (typeof EQQ.Presenter.TaskBar != "undefined") ? EQQ.Presenter.TaskBar.getCurrentTaskUin() : false;
			this.View.jumpDown(x);
			this.View.flickerClassShow(p);
			u = [];
			x = [];
			p = [];
			for (var E = 0; E < D.length; E++) {
				if (F != D[E].from_uin) {
					u.push(D[E].from_uin);
					if (EQQ.Model.BuddyList.getSelfState() == "callme") {
						c(D[E].from_uin);
					}
				}
			}
			if (u.length !== 0) {
				EQQ.addNeedBeat2("mainPanel");
				v.addObserver(EQQ, "NotifyBeat_250", z);
			}
		};
		this.onMessageBoxGroupListChange = function (E) {
			var C = EQQ.Model.BuddyList.getSelf();
			var G;
			try {
				G = EQQ.Presenter.TaskBar.getCurrentTaskUin();
			}
			catch (F) {
			}
			this.View.jumpDown(i);
			i = [];
			for (var D = 0; D < E.length; D++) {
				if (G != E[D].from_uin && EQQ.Model.BuddyList.isGroupPrompt(E[D].from_uin)) {
					i.push(E[D].from_uin);
				}
				if (EQQ.Model.BuddyList.getSelfState() == "callme" && EQQ.Model.BuddyList.isGroupPrompt(E[D].from_uin)) {
					r(E[D].group_code);
				}
			}
			if (i.length !== 0) {
				EQQ.addNeedBeat2("mainPanel");
				v.addObserver(EQQ, "NotifyBeat_250", z);
			}
		};
		this.onMessageListChange = function (C) {
			var D = EQQ.Model.BuddyList.getBuddyByUin(C.uin);
			if (D) {
				this.View.updateRecentByBuddy(D);
			}
		};
		this.onGroupMessageListChange = function (C) {
			var D = EQQ.Model.BuddyList.getGroupByGid(C.gid);
			if (D) {
				this.View.updateRecentByGroup(D);
			}
		};
		var n = function (C) {
			EQQ.Model.BuddyList.sendChangeGroupMask({type:"global", uin:EQQ.Model.BuddyList.getSelfUin(), mask:C});
		};
		var c = function (C) {
			WebqCore.api.call(["chat", ["single", C]]);
		};
		var r = function (C) {
			WebqCore.api.call(["chat", ["group", C]]);
		};
		this.collapsedAllClass = function () {
			var D = EQQ.Model.BuddyList.getClassList();
			for (var C = 0; C < D.length; C++) {
				this.View.collapsedClass(D[C].index);
			}
		};
		var k = function () {
			EQQ.exit();
		};
		var h = function () {
			this.hide();
		};
		var f = function () {
			EQQ.reLogin();
		};
		this.onExitPortal = function () {
			qqweb.portal.exit();
		};
		this.onCloseWebQQ = function () {
			B = false;
			j = false;
			this.hide();
			this.View.showLogin();
		};
		this.clearBuddyList = function () {
			this.View.clearBuddyList();
		};
		this.showLogin = function () {
			this.View.showLogin();
		};
		this.show = function () {
			g = true;
			this.View.show();
		};
		this.hide = function () {
			g = false;
			this.View.hide();
		};
		this.toggleShow = function () {
			if (g) {
				this.hide();
			} else {
				this.show();
			}
		};
		this.showReLoginPanel = function (C) {
			this.View.showReLoginPanel(C);
		};
		var z = function () {
			x = [];
			p = [];
			var F = u.concat(i);
			if (F.length === 0) {
				v.removeObserver(EQQ, "NotifyBeat_250", z);
				EQQ.removeNeedBeat2("mainPanel");
			}
			for (var C = 0; C < u.length; C++) {
				var D = u[C];
				var E = EQQ.Model.BuddyList.getClassIdByUin(D);
				if (y.View.getClassExpandFlag(E)) {
					x.push(D);
				} else {
					if (o.array.indexOf(p, E) == -1) {
						p.push(E);
					}
				}
			}
			if (x.length > 0) {
				y.View.jumpAvatar(x);
			}
			if (p.length > 0) {
				y.View.flickerClass(p);
			}
			if (i.length > 0) {
				y.View.groupJumpAvatar(i);
			}
			if (F.length > 0) {
				y.View.recentJumpAvatar(F);
			}
		};
		this.onViewSelfStateChange = function (E) {
			var D = "offline";
			var C = EQQ.Model.BuddyList.getSelf();
			if (C) {
				D = C.state;
				C.state = E;
			}
			o.out("==onViewSelfStateChange, self: " + E + ", old: " + D);
			if (D == "offline" && E != "offline") {
				C.state = E;
				EQQ.login(E);
			} else {
				EQQ.Model.BuddyList.sendChangeStatus(E);
			}
			if (E == "offline") {
				B = false;
				j = false;
				EQQ.stopPoll();
			}
			if (E == "callme") {
			}
		};
		this.removeGroup = function (C) {
			y.View.removeGroup(C);
		};
	};
	var a = "EQQ.Presenter.MainPanel";
	WebqCore.register(a, b);
})();

