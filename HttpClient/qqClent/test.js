Jet().$package("EQQ.Global", function(b) {
			var e = this, c = b.dom, a = b.event, d = b.cookie, f = b.http;
			this.initGlobal = function() {
				EQQ.vfwebqq = qqweb.portal.getVfWebQQ();
			};
		});
Jet().$package("EQQ.Adapter", function(b) {
	var e = this, c = b.dom, a = b.event, d = b.cookie, g = b.http;
	this.proxysend = function f(h, i) {
		qqweb.rpcService.send(h, {
					context : null,
					method : i.method || "GET",
					data : "r=" + encodeURIComponent(b.json.stringify(i.param)),
					onSuccess : i.onSuccess,
					onError : i.onError
				});
	};
	EQQ.BASE_CONST = qqweb.CONST;
});
Jet().$package("EQQ.Extend", function(c) {
			var g = this, e = c.dom, b = c.event, f = c.cookie, h = c.http;
			var d = function(k, n) {
				var j = k.length;
				var m = function() {
					j--;
					if (j == 0) {
						n();
					}
				};
				for (var l = 0; l < j; l++) {
					k[l](m);
				}
			};
			var a = function a(i, j) {
				return function(k) {
					j.onError = j.errback || function() {
					};
					k = k || function() {
					};
					j.onSuccess = function(l) {
						j.callback(l, k);
					};
					EQQ.Adapter.proxysend(i, j);
				};
			};
			g.cgi_module = a;
			g.require = d;
		});
Jet().$package("EQQ", function(j) {
	var z = this, x = j.dom, w = j.event, y = j.cookie, v = j.http;
	var t = false;
	var c = false;
	var n = {};
	var R = 3;
	var I = 0;
	var S;
	var B;
	var N;
	var g = false;
	var E = false;
	var H;
	H = window.location.host;
	j.out(">>dName: " + H);
	this.showLogin = function(J) {
		J = J || {};
		var W = qqweb.portal.getLoginLevel();
		if (!y.get("ptwebqq") || W < 3) {
			qqweb.portal.showLoginWindow("eqq", true);
			return;
		}
		EQQ.init2({
					panel : {
						myPanel : qqweb.layout.getPanel("qqBar").body,
						mainPanel : z.getSideBar().body,
						mainBar : qqweb.layout.getPanel("statusBar").body,
						taskBar : qqweb.layout.getPanel("taskBar").body
					}
				});
	};
	var F = {
		onExit : function() {
			if (!qqweb.portal.confirm("鎮ㄧ‘璁よ鍏抽棴 WebQQ 鍚楋紵")) {
				return;
			}
			z.executeExit();
		},
		onNeedLogin : function(J) {
			qqweb.portal.showLoginWindow("eqq");
		}
	};
	this.CONST = {
		MAIN_DOMAIN : "qq.com",
		EQQ_SERVER_URL : "http://" + H + "/",
		CONN_SERVER_DOMAIN : "http://d.web2.qq.com/",
		CONN_SERVER_DOMAINS : ["http://d.web2.qq.com/"],
		CONN_PROXY_URLS : ["http://d.web2.qq.com/proxy.html?v=20101025002"],
		CONN_SERVER_DOMAIN2 : "http://web.qq.com/",
		CONN_PROXY_URL : "http://d.web2.qq.com/proxy.html?v=20101025002",
		CHAT_PIC_SERVER : "http://" + H + "/",
		AVATAR_SERVER_DOMAIN : "http://qun.qq.com/",
		AVATAR_SERVER_DOMAINS : ["http://face1.qun.qq.com/",
				"http://face2.qun.qq.com/", "http://face3.qun.qq.com/",
				"http://face4.qun.qq.com/", "http://face5.qun.qq.com/",
				"http://face6.qun.qq.com/", "http://face7.qun.qq.com/",
				"http://face8.qun.qq.com/", "http://face9.qun.qq.com/",
				"http://face10.qun.qq.com/", "http://face11.qun.qq.com/"],
		SYSTEM_FACE_URL : "http://" + H + "/style/face/",
		LOGIN_PROTECT_FINISH_URL : "./login_protect.html",
		UPLOAD_CUSTOM_FACE_SERVER : "http://web.qq.com/cgi-bin/cface_upload",
		DOWNLOAD_CHAT_LOG_SERVER : "http://sns.qq.com/buddy_state/feed/save_chat.php",
		FILE_SERVER : "http://file1.web.qq.com/",
		OFFLINE_FILE_SERVER : "http://weboffline.ftn.qq.com:80/ftn_access/",
		QZONE_SERVER_DOMAIN : "http://qzone.qq.com/",
		QZONE_USER_SERVER_DOMAIN : "http://user.qzone.qq.com/",
		QQ_GROUP_URL : "http://qun.qq.com/air/",
		MAX_LOGIN_AMOUNT : 1,
		MAX_FAIL_AMOUNT : 2,
		Z_INDEX_BASE : 3000,
		LOAD_AVATAR_AMOUNT : 50,
		TRANSFER_TABLE : [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50,
				51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80,
				81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103,
				104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115,
				63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72,
				45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123,
				124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131,
				132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35,
				66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44,
				48, 49],
		T_TRANSFER_TABLE : {
			14 : 0,
			1 : 1,
			2 : 2,
			3 : 3,
			4 : 4,
			5 : 5,
			6 : 6,
			7 : 7,
			8 : 8,
			9 : 9,
			10 : 10,
			11 : 11,
			12 : 12,
			13 : 13,
			0 : 14,
			50 : 15,
			51 : 16,
			96 : 17,
			53 : 18,
			54 : 19,
			73 : 20,
			74 : 21,
			75 : 22,
			76 : 23,
			77 : 24,
			78 : 25,
			55 : 26,
			56 : 27,
			57 : 28,
			58 : 29,
			79 : 30,
			80 : 31,
			81 : 32,
			82 : 33,
			83 : 34,
			84 : 35,
			85 : 36,
			86 : 37,
			87 : 38,
			88 : 39,
			97 : 40,
			98 : 41,
			99 : 42,
			100 : 43,
			101 : 44,
			102 : 45,
			103 : 46,
			104 : 47,
			105 : 48,
			106 : 49,
			107 : 50,
			108 : 51,
			109 : 52,
			110 : 53,
			111 : 54,
			112 : 55,
			32 : 56,
			113 : 57,
			114 : 58,
			115 : 59,
			63 : 60,
			64 : 61,
			59 : 62,
			33 : 63,
			34 : 64,
			116 : 65,
			36 : 66,
			37 : 67,
			38 : 68,
			91 : 69,
			92 : 70,
			93 : 71,
			29 : 72,
			117 : 73,
			72 : 74,
			45 : 75,
			42 : 76,
			39 : 77,
			62 : 78,
			46 : 79,
			47 : 80,
			71 : 81,
			95 : 82,
			118 : 83,
			119 : 84,
			120 : 85,
			121 : 86,
			122 : 87,
			123 : 88,
			124 : 89,
			27 : 90,
			21 : 91,
			23 : 92,
			25 : 93,
			26 : 94,
			125 : 95,
			126 : 96,
			127 : 97,
			128 : 98,
			129 : 99,
			130 : 100,
			131 : 101,
			132 : 102,
			133 : 103,
			134 : 104,
			52 : 105,
			24 : 106,
			22 : 107,
			20 : 108,
			60 : 109,
			61 : 110,
			89 : 111,
			90 : 112,
			31 : 113,
			94 : 114,
			65 : 115,
			35 : 116,
			66 : 117,
			67 : 118,
			68 : 119,
			69 : 120,
			70 : 121,
			15 : 122,
			16 : 123,
			17 : 124,
			18 : 125,
			19 : 126,
			28 : 127,
			30 : 128,
			40 : 129,
			41 : 130,
			43 : 131,
			44 : 132,
			48 : 133,
			49 : 134
		}
	};
	this.hash = {
		onlineStatus : {
			callme : "callme",
			online : "online",
			away : "away",
			busy : "busy",
			silent : "silent",
			hidden : "hidden",
			offline : "offline"
		},
		onlineStatusText : {
			callme : "Q鎴戝惂",
			online : "鍦ㄧ嚎",
			away : "绂诲紑",
			busy : "蹇欑",
			silent : "闈欓煶",
			hidden : "闅愯韩",
			offline : "绂荤嚎"
		},
		clientType : {
			1 : "PC",
			2 : "PC",
			3 : "PC",
			4 : "PC",
			5 : "PC",
			6 : "PC",
			10 : "PC",
			21 : "Phone",
			22 : "Phone",
			23 : "Phone",
			24 : "Phone",
			41 : "WebQQ",
			10000 : "PC"
		},
		clientTypeText : {
			1 : "PC",
			2 : "PC",
			3 : "PC",
			4 : "PC",
			5 : "PC",
			6 : "PC",
			10 : "PC",
			21 : "鎵嬫満QQ",
			22 : "鎵嬫満QQ",
			23 : "鎵嬫満QQ",
			24 : "鎵嬫満QQ",
			41 : "WebQQ",
			10000 : "PC"
		},
		userClassType : {
			online : "online",
			stranger : "stranger",
			blacklist : "blacklist"
		}
	}, document.domain = this.CONST.MAIN_DOMAIN;
	var d = function(J) {
		if (J.keyCode === 27) {
			J.preventDefault();
		}
	};
	w.on(document, "keydown", d);
	var U = function(aa) {
		var W = aa.msgList[0].type;
		switch (W) {
			case "single" :
				qqweb.sound.playSound("./sound/msg.mp3", true);
				break;
			case "group" :
				var Z = EQQ.Model.BuddyList.getGroupMask();
				var Y = EQQ.Model.BuddyList.getGroupByGid(aa.gid);
				var J = false;
				try {
					J = EQQ.Presenter.ChatBox.getChatBoxByGid(aa.gid);
				} catch (X) {
				}
				if (!J
						&& (Z === 1 || (parseInt(Z) === 0 && parseInt(Y.mask) === 0))) {
					qqweb.sound.playSound("./sound/msg.mp3", true);
				}
				break;
			case "system" :
			case "mysigntips" :
			case "mail" :
				qqweb.sound.playSound("./sound/system.mp3", true);
				break;
		}
	};
	this.init2 = function(W) {
		t = false;
		c = false;
		n = {};
		S = null;
		B = null;
		g = false;
		E = false;
		this.panel = W.panel || {};
		r;
		h = 0;
		T = false;
		o = 0;
		w.addObserver(qqweb.portal, "exit", m);
		w.addObserver(EQQ, "LoginSuccess", L);
		w.addObserver(z, "LoginFailure", l);
		w.addObserver(z, "VerifyLoginProtectSuccess", p);
		w.addObserver(z, "MessageReceive", U);
		w.addObserver(z, "exit", F.onExit);
		w.addObserver(z, "needLogin", F.onNeedLogin);
		w.addObserver(EQQ.RPCService, "NotLogin", D);
		w.addObserver(EQQ.RPCService, "FailCountOverMax", u);
		w.addObserver(EQQ, "ReLinkSuccess", P);
		w.addObserver(EQQ, "ReLinkFailure", u);
		w.addObserver(EQQ, "UinNotInWhitelist", s);
		w.addObserver(EQQ, "UinInBlacklist", A);
		w.addObserver(EQQ, "Overload", b);
		w.addObserver(EQQ, "PtwebqqFail", q);
		w.addObserver(EQQ.RPCService, "LogoutSuccess", K);
		w.addObserver(EQQ.RPCService, "PollComplete", M);
		w.addObserver(EQQ.RPCService, "CheckProtectSuccess", O);
		z.createContainer();
		EQQ.RPCService.init();
		EQQ.Presenter.MainPanel.init();
		try {
			EQQ.Presenter.ChatBox.init();
			EQQ.Presenter.TaskBar.init();
		} catch (X) {
		}
		EQQ.Model.BuddyList.init();
		EQQ.Model.ChatMsg.init();
		var J = EQQ.Presenter.MainPanel.getCookieTips();
		if (J && J == "hide") {
		} else {
		}
		EQQ.Presenter.MainPanel.show();
		EQQ.api.moduleInit();
		z.login();
	};
	this.loginEQQ = function(J) {
		this.showLogin();
	};
	this.getDefaultState = function() {
		var J = EQQ.hash.onlineStatus[j.string.mapQuery(window.location.search).login_state
				|| "online"];
		return J;
	};
	this.getUserDefaultAvatar = function(J) {
		J = J || 40;
		return "./style/images/avatar_default_" + J + "_" + J + ".gif";
	};
	this.getFaceServer = function(J) {
		return EQQ.CONST.AVATAR_SERVER_DOMAINS[(J % 10)];
	};
	this.getUserAvatar = function(W, J) {
		return EQQ.getFaceServer(W)
				+ "cgi/svr/face/getface?cache=0&type=1&fid=0&uin=" + W
				+ "&vfwebqq=" + qqweb.portal.getVfWebQQ();
	};
	this.getGroupAvatar = function(W, J) {
		return EQQ.getFaceServer(W)
				+ "cgi/svr/face/getface?cache=0&type=4&fid=0&uin=" + W
				+ "&vfwebqq=" + qqweb.portal.getVfWebQQ();
	};
	this.getQzoneUrl = function(J) {
		return EQQ.CONST.QZONE_USER_SERVER_DOMAIN + J;
	};
	this.getSendMailUrl = function(J) {
		return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email="
				+ J + "@qq.com";
	};
	this.createContainer = function() {
		this.document = x.getDoc();
		this.container = x.node("div", {
					id : "EQQ_Container",
					"class" : "EQQ_Container"
				});
		this.container.innerHTML = '			<div id="EQQ_MsgBox" class="EQQ_msgBox">				<div class="EQQ_titleInMsgBox">					<div class="EQQ_titleTextInMsgBox">娑堟伅鐩掑瓙</div>					<div id="EQQ_ViewMainPanelButtonInMsgBox" class="EQQ_viewMainPanelButtonInMsgBox" title="鐐瑰嚮鏌ョ湅濂藉弸鍒楄〃">濂藉弸鍒楄〃</div>				</div>				<div id="EQQ_MessageList" class="EQQ_messageList">				</div>				<div id="EQQ_IgnoreAllMsgButtonInMsgBox" class="EQQ_ignoreAllMsgButtonInMsgBox" title="鐐瑰嚮蹇界暐鍏ㄩ儴娑堟伅">蹇界暐鍏ㄩ儴</div>			</div>			<div id="EQQ_LoginBox" class="EQQ_LoginBox">				<div class="EQQ_LoginBox_Title">					<div id="EQQ_LoginBox_CloseButton" class="EQQ_LoginBox_CloseButton" title="鍏抽棴">X</div>					<div class="EQQ_LoginBox_TitleText">WebQQ鐧诲綍淇濇姢</div>				</div>				<iframe id="EQQ_LoginBox_Iframe" class="EQQ_LoginBox_Iframe" src="about:blank" frameborder="no" scrolling="no"></iframe>			</div>		';
		this.document.body.appendChild(this.container);
	};
	this.getCookieUin = function() {
		return parseInt(j.cookie.get("uin", EQQ.CONST.MAIN_DOMAIN).substr(1),
				10);
	};
	this.getCookieSkey = function() {
		return j.cookie.get("skey", EQQ.CONST.MAIN_DOMAIN);
	};
	this.getCookiePtWebQQ = function() {
		return j.cookie.get("ptwebqq", EQQ.CONST.MAIN_DOMAIN);
	};
	this.getVfWebQQ = function() {
		return S;
	};
	this.setVfWebQQ = function(J) {
		S = J;
	};
	this.getPsessionid = function() {
		return B;
	};
	this.getClientKey = function() {
		return N;
	};
	this.dna_result_key = "";
	this.login = function(J) {
		EQQ.Presenter.MainPanel.showLogin();
		this.loginStart = (new Date()).getTime();
		var W = {
			status : J || "",
			ptwebqq : qqweb.portal.getPtwebqq(),
			passwd_sig : this.dna_result_key
		};
		EQQ.RPCService.sendLogin(W);
	};
	var f = function() {
		var J = qqweb.config.configList.chatboxMode;
		var W = qqweb.config.configList.isNotNeedCtrlKey;
		EQQ.initChatboxMode(J);
		EQQ.initSendMsgKey(W);
		var X = qqweb.portal.getLoginLevel();
		if (X > 2) {
			w.notifyObservers(EQQ, "eqqUacChange", {
						chatboxMode : J,
						isNotNeedCtrlKey : W
					});
		}
	};
	var O = function(J) {
		if (J.type == "nop") {
			EQQ.Presenter.MainPanel.toggleShow();
		} else {
			if (J.type == "url") {
			}
		}
	};
	var p = function(J) {
		if (J) {
			z.dna_result_key = J;
			EQQ.Presenter.MainPanel.toggleShow();
		}
	};
	var m = function() {
		z.executeExit();
	};
	this.executeExit = function() {
		try {
			EQQ.View.ChatBox.onExitHotkey();
		} catch (J) {
		}
		w.notifyObservers(EQQ, "CloseWebQQ");
		EQQ.stopPoll();
		EQQ.logout();
		qqweb.portal.removeExitConfirm();
		setTimeout(function() {
					w.notifyObservers(EQQ, "exitSuccess");
				}, 1000);
	};
	this.logout = function() {
		EQQ.setIsLogin(false);
		EQQ.RPCService.sendLogout();
	};
	this.reLogin = function() {
		var J = (EQQ.Model.BuddyList.getSelf() && EQQ.Model.BuddyList.getSelf().state)
				|| "offline";
		if (J == "offline") {
			J = (EQQ.Model.BuddyList.getSelf() && EQQ.Model.BuddyList.getSelf().oldState)
					|| "";
		}
		this.login(J);
	};
	var s = function(J) {
		window.location = qqweb.CONST.MAIN_URL + "overload.html";
	};
	var A = function(J) {
	};
	var b = function(J) {
		window.location = qqweb.CONST.MAIN_URL + "overload.html";
	};
	var q = function(J) {
		j.out("onPtwebqqFail");
		l({
					text : "鐧诲綍澶辫触"
				});
		alert("楠岃瘉淇℃伅杩囨湡锛岃閲嶆柊鐧诲綍锛�");
		window.location.reload();
	};
	var e = function() {
		try {
			j.cookie.set("uin", qqweb.portal.originalUin,
					qqweb.CONST.MAIN_DOMAIN);
			j.cookie.set("skey", qqweb.portal.skey, qqweb.CONST.MAIN_DOMAIN);
			j.cookie.set("ptwebqq", qqweb.portal.ptwebqq,
					qqweb.CONST.MAIN_DOMAIN);
		} catch (J) {
		}
	};
	var i = function() {
		var J = EQQ.Model.BuddyList.getSelf().state;
		var W = {
			status : J,
			ptwebqq : qqweb.portal.getPtwebqq(),
			passwd_sig : z.dna_result_key
		};
		e();
		EQQ.RPCService.sendReLink(W);
	};
	var Q = function() {
		if (qqweb.app.tips && qqweb.app.tips.showEQQTipsDom) {
			qqweb.app.tips
					.showEQQTipsDom("鍥犵綉缁滄垨鍏朵粬鍘熷洜涓庢湇鍔″櫒澶卞幓鑱旂郴锛屾鍦ㄥ皾璇曢噸鏂扮櫥褰�...");
		}
	};
	var k = function() {
		if (qqweb.app.tips && qqweb.app.tips.hideEQQTipsDom) {
			qqweb.app.tips.hideEQQTipsDom();
		}
	};
	var P = function(W) {
		R = 3;
		I = 0;
		S = W.vfwebqq;
		B = W.psessionid;
		k();
		this.startPoll();
		f();
		var J = EQQ.Model.BuddyList.getSelf().state;
		w.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", J);
	};
	var u = function(J) {
		z.stopPoll();
		j.out("reLinkRetryCount: " + I);
		if (I >= 2) {
			Q();
			w
					.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange",
							"offline");
		}
		if (J && J.hasOwnProperty("t")) {
			setTimeout(function() {
						i();
					}, (parseInt(J.t) || 0) * 1000);
		} else {
			if (!J) {
				setTimeout(function() {
							i();
						}, 10000);
			}
		}
		I++;
	};
	var D = function() {
		var J = "鍥犵綉缁滄垨鍏朵粬鍘熷洜涓庢湇鍔″櫒澶卞幓鑱旂郴锛岃閲嶆柊鐧诲綍銆�";
		w.notifyObservers(z, "SelfOffline", J);
	};
	var K = function() {
		var J = "鎮ㄥ凡鐧诲嚭";
		w.notifyObservers(EQQ, "exitSuccess");
	};
	var M = function() {
		var J = EQQ.getIsLogin();
		if (J) {
			if (typeof EQQ !== "undefined") {
				EQQ.keepPoll();
			}
		}
	};
	var L = function(J) {
		j.out("鐧诲綍绗竴姝ユ垚鍔�");
		R = 3;
		I = 0;
		S = J.vfwebqq;
		B = J.psessionid;
		N = J.clientkey;
		w.notifyObservers(qqweb.portal, "EQQGetLoginInfoSuccess");
		z.start(J);
		f();
		k();
	};
	this.start = function(J) {
		EQQ.setIsLogin(true);
		qqweb.portal.addExitConfirm();
		this.mode = "master";
		j.out("start: " + EQQ);
		EQQ.Global.initGlobal();
		EQQ.Model.BuddyList.reset();
		EQQ.Presenter.MainPanel.View.showPullData();
		EQQ.Extend.require([EQQ.Model.BuddyList.sendGetBuddyList({
									h : "hello"
								}), EQQ.Model.BuddyList.sendGetGroupList()],
				function() {
					C.inject();
					EQQ.startPoll();
					EQQ.Model.BuddyList.sendGetRecentList({})();
					setTimeout(function() {
								EQQ.api.makeCall();
							}, 13);
					qqweb.portal.speedTest.sRTS(11, "end", (new Date()), true);
				});
		if (t) {
		} else {
			t = true;
			this.timer = window.setInterval(G, 60000);
		}
	};
	var C = {
		inject : function() {
			qqweb.portal.addNotificationSource(EQQ, "NotifyMessage",
					"NotifyHasHandled");
			w.addObserver(EQQ, "MessageReceive", C.onMessageReceive);
			w.addObserver(EQQ, "NotifyHasHandled", C.onNotifyHasHandled);
		},
		onMessageReceive : function(J) {
			var X = [], aa, W = J.uin || J.gid;
			for (var Y in J.msgList) {
				var ad = J.msgList[Y];
				if (!W) {
					W = ad.from_uin;
				}
				aa = {
					targetModel : EQQ,
					uin : W,
					type : ad.type,
					msgId : ad.msg_id,
					title : W,
					content : "",
					time : ad.time
							|| j.date.format(new Date(), "YYYY-MM-DD hh:mm:ss"),
					isAllow : true,
					extraInfo : {}
				};
				switch (ad.type) {
					case "single" :
						var ac = EQQ.api.__api.getChatBox(W);
						aa.title = (ad.sender
								? (ad.sender.htmlShowName || W)
								: W);
						aa.content = EQQ.util.trimChatMsg(ad);
						aa.extraInfo = {
							isChatBoxOpen : ac
						};
						break;
					case "group" :
						var ac = EQQ.api.__api.getChatBox(W);
						var ab = EQQ.Model.BuddyList.isGroupPrompt(W);
						var Z = EQQ.Model.BuddyList.getGroupByGid(W);
						aa.title = (Z ? (Z.htmlShowName || W) : W);
						aa.content = EQQ.util.trimChatMsg(ad);
						aa.isAllow = ab;
						aa.extraInfo = {
							isChatBoxOpen : ac
						};
						break;
					case "system" :
						aa.content = ad.content;
						aa.extraInfo = {
							uin : ad.opt.uin,
							nick : ad.opt.nick,
							allow : ad.opt.allow,
							type : ad.opt.type,
							msg : ad.opt.msg,
							gid : ad.opt.gid
						};
						break;
					default :
						break;
				}
				X.push(aa);
			}
			w.notifyObservers(EQQ, "NotifyMessage", X);
		},
		onNotifyHasHandled : function(W) {
			switch (W.type) {
				case "single" :
					EQQ.api.call(["chat", ["single", W.uin]]);
					break;
				case "group" :
					var J = EQQ.Model.BuddyList.getGroupByGid(W.uin);
					EQQ.api.call(["chat", ["group", J.code]]);
					break;
				case "system" :
					qqweb.portal.runApp("buddyAdder", W.extraInfo);
					break;
				default :
					break;
			}
		}
	};
	var l = function(J) {
		EQQ.setIsLogin(false);
		j.out("瀵逛笉璧凤紝鐧诲綍澶辫触锛�");
		qqweb.portal.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
		var W = (J && J.text) || "鐧诲綍澶辫触";
		EQQ.Presenter.MainPanel.showReLoginPanel(J.text);
	};
	var V = 0;
	var G = function() {
		if (V > 240) {
			V = 0;
		}
		w.notifyObservers(EQQ, "NotifyBeat_1");
		if ((V % 2) == 0) {
			w.notifyObservers(EQQ, "NotifyBeat_2");
		}
		if ((V % 5) == 0) {
			w.notifyObservers(EQQ, "NotifyBeat_5");
			if ((V % 10) == 0) {
				w.notifyObservers(EQQ, "NotifyBeat_10");
				if ((V % 30) == 0) {
					w.notifyObservers(EQQ, "NotifyBeat_30");
					if ((V % 60) == 0) {
						w.notifyObservers(EQQ, "NotifyBeat_60");
						if ((V % 120) == 0) {
							w.notifyObservers(EQQ, "NotifyBeat_120");
							if ((V % 240) == 0) {
								w.notifyObservers(EQQ, "NotifyBeat_240");
							}
						}
					}
				}
			}
		}
		V++;
	};
	var r;
	var h = 0;
	var T = false;
	var o = 0;
	this.startBeat2 = function() {
		T = true;
		h = 0;
		r = window.setInterval(a, 250);
		j.out(">>>>>>>>>: startBeat2");
	};
	this.stopBeat2 = function() {
		T = false;
		window.clearInterval(r);
		h = 0;
		r = null;
		j.out(">>>>>>>>>: stopBeat2");
	};
	this.isStartBeat2 = function() {
		return T;
	};
	this.addNeedBeat2 = function(J) {
		if (!n[J]) {
			n[J] = true;
			o++;
		}
		if (!EQQ.isStartBeat2()) {
			EQQ.startBeat2();
		}
	};
	this.removeNeedBeat2 = function(J) {
		if (n[J]) {
			if (o > 0) {
				o--;
			}
			delete n[J];
		}
		if (o === 0) {
			EQQ.stopBeat2();
		}
	};
	var a = function() {
		if (h > 5000) {
			h = 0;
		}
		w.notifyObservers(EQQ, "NotifyBeat_250");
		if ((h % 2) == 0) {
			w.notifyObservers(EQQ, "NotifyBeat_500");
			if ((h % 6) == 0) {
				w.notifyObservers(EQQ, "NotifyBeat_1000");
			}
			if ((h % 10) == 0) {
				w.notifyObservers(EQQ, "NotifyBeat_3000");
				if ((h % 20) == 0) {
					w.notifyObservers(EQQ, "NotifyBeat_5000");
				}
			}
		}
		h++;
	};
	this.startPoll = function() {
		this.setNeedPollFlag(true);
		this.keepPoll();
		EQQ.RPCService.pollWatcher.startWatch();
	};
	this.keepPoll = function() {
		if (this.getNeedPollFlag()) {
			EQQ.RPCService.sendPoll();
		}
	};
	this.setNeedPollFlag = function(J) {
		return g = J;
	};
	this.getNeedPollFlag = function() {
		return g;
	};
	this.stopPoll = function() {
		this.setNeedPollFlag(false);
		EQQ.RPCService.pollWatcher.stopWatch();
	};
});
Jet().$package("EQQ.util", function(g) {
	var o = g.dom, n = g.event, i = g.string, l = g.http;
	var j = 1;
	var f = function(v, B) {
		var F = "";
		if (B) {
			for (var z = 0; z < v.content.length; z++) {
				var y = v.content[z];
				if (y[0] === "face") {
					F += t(y[1]);
				} else {
					if (y[0] === "cface") {
						if (v.type == "group") {
							F += e(y[2]);
						} else {
							F += e(y[1]);
						}
					} else {
						if (y[0] === "cface_idx") {
							if (v.type == "group") {
								F += e(y[2]);
							} else {
								F += e(y[1]);
							}
						} else {
							if (y[0] === "pic_id") {
							} else {
								if (y[0] === "image") {
								} else {
									if (y[0] === "offpic") {
										var w = EQQ.Model.ChatMsg
												.getSendPicUrlByFilePath(y[1]);
										if (w != "") {
											F += q(w);
										}
									} else {
										if (y[0] === "rffile") {
											F += '<div class="msgFileBox">鎮ㄦ嫆缁濇帴鏀�"'
													+ i.encodeHtmlSimple(y[1])
													+ '",鏂囦欢浼犺緭澶辫触.</div>';
										} else {
											if (y[0] === "agfile") {
												F += '<div class="msgFileBox">鎮ㄥ悓鎰忎簡鎺ユ敹鏂囦欢"'
														+ i
																.encodeHtmlSimple(y[1])
														+ '".</div>';
											} else {
												if (y[0] === "sendfile") {
													F += '<div class="msgFileBox">鎮ㄥ彂閫佹枃浠�"'
															+ i
																	.encodeHtmlSimple(y[1])
															+ '"缁欏鏂�.</div>';
												} else {
													if (y[0] === "transtimeout") {
														F += '<div class="msgFileBox">鎺ユ敹鏂囦欢"'
																+ i
																		.encodeHtmlSimple(y[1])
																+ '"瓒呮椂,鏂囦欢浼犺緭澶辫触.</div>';
													} else {
														if (y[0] === "refusedbyclient") {
															F += '<div class="msgFileBox">瀵规柟鍙栨秷浜嗘帴鏀舵枃浠�"'
																	+ i
																			.encodeHtmlSimple(y[1])
																	+ '",鏂囦欢浼犺緭澶辫触.</div>';
														} else {
															if (y[0] === "transok") {
																F += '<div class="msgFileBox">鏂囦欢"'
																		+ i
																				.encodeHtmlSimple(y[1])
																		+ '"浼犺緭鎴愬姛.</div>';
															} else {
																if (y[0] === "transerror") {
																	F += '<div class="msgFileBox">瀵规柟鍙栨秷浜嗘帴鏀舵枃浠�"'
																			+ i
																					.encodeHtmlSimple(y[1])
																			+ '"鎴栦紶杈撻敊璇�,鏂囦欢浼犺緭澶辫触.</div>';
																} else {
																	if (!g
																			.isArray(y)) {
																		F += h(
																				i
																						.encodeHtmlSimple(h(
																								y,
																								1)),
																				2);
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
			var u = v.sender_uin || v.from_uin;
			var A = v.from_uin || 0;
			var D = [];
			var E;
			var x;
			if (v.content[0][0] !== "font") {
				x = 0;
			} else {
				x = 1;
			}
			for (; x < v.content.length; x++) {
				var y = v.content[x];
				if (y[0] === "face") {
					F += t(y[1]);
				} else {
					if (y[0] === "cface") {
						D.push(y);
						if (v.type == "group") {
							F += d(y[1], v.group_code, v.sender_uin, v.raw_time);
						} else {
							F += p(v.msg_id, y[1], u);
						}
					} else {
						if (y[0] === "cface_idx") {
							if (v.type == "group") {
								F += k(v.msg_id, D[y[1]][1], v.group_code,
										v.time);
							} else {
								F += p(v.msg_id, D[y[1]][1], u);
							}
						} else {
							if (y[0] === "pic_id") {
								E = y[1];
							} else {
								if (y[0] === "image") {
									F += c(E, u, y[2], y[1]);
								} else {
									if (y[0] === "offpic") {
										if (y[1].success == 1) {
											F += m(y[1].file_path, A);
										} else {
											F += s();
										}
									} else {
										if (y[0] === "rfile") {
											var C = v.from_uin + "_" + y[2];
											var G = EQQ.Model.ChatMsg
													.getFilesList();
											F += '<div class="msgFileBox">瀵规柟缁欐偍鍙戦€佹枃浠�:<br />';
											F += '<span class="icon_' + b(y[1])
													+ '">&nbsp;</span>'
													+ i.encodeHtmlSimple(y[1]);
											F += '<span class="fileAct">';
											if (G[C].isread) {
												F += "&nbsp;[鍚屾剰][鎷掔粷]";
											} else {
												F += '&nbsp;<a id="agree_'
														+ C
														+ '" href="#">[鍚屾剰]</a>';
												F += '&nbsp;<a id="refuse_'
														+ C
														+ '" href="#">[鎷掔粷]</a>';
											}
											F += "</span>";
											F += "</div>";
										} else {
											if (y[0] === "rffile") {
												F += '<div class="msgFileBox">瀵规柟鍙栨秷浜嗘帴鏀舵枃浠�"'
														+ i
																.encodeHtmlSimple(y[1])
														+ '",鏂囦欢浼犺緭澶辫触.</div>';
											} else {
												if (y[0] === "rtfile") {
													F += '<div class="msgFileBox">鎺ユ敹鏂囦欢"'
															+ i
																	.encodeHtmlSimple(y[1])
															+ '"瓒呮椂,鏂囦欢浼犺緭澶辫触.</div>';
												} else {
													if (y[0] === "wrfile") {
														F += '<div class="msgFileBox">瀵规柟宸插悓鎰忔帴鏀�"'
																+ i
																		.encodeHtmlSimple(y[1])
																+ '",寮€濮嬩紶杈撴枃浠�.</div>';
													} else {
														if (y[0] === "wrffile") {
															F += '<div class="msgFileBox">瀵规柟鎷掔粷浜嗘帴鏀舵枃浠�"'
																	+ i
																			.encodeHtmlSimple(y[1])
																	+ '",鏂囦欢浼犺緭澶辫触.</div>';
														} else {
															if (y[0] === "video") {
																F += i
																		.encodeHtmlSimple(y[1]);
															} else {
																F += h(
																		i
																				.encodeHtmlSimple(h(
																						y,
																						1)),
																		2);
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
		F = F.replace(/\r\n|\r|\n/ig, "<br />");
		return F;
	};
	var t = function(u) {
		return '<img class="EQQ_faceImg" src="' + EQQ.CONST.SYSTEM_FACE_URL
				+ EQQ.CONST.T_TRANSFER_TABLE[u] + '.gif" />';
	};
	var p = function(w, u, x, v) {
		v = v || 5;
		return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN
				+ "channel/get_cface2?lcid=" + w + "&guid=" + u + "&to=" + x
				+ "&count=" + v + "&time=1&clientid="
				+ EQQ.RPCService.getClientId() + "&psessionid="
				+ EQQ.getPsessionid() + '" id="_cface_' + (j++)
				+ '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var k = function(x, u, v, w) {
		var y = Math.round(new Date().getTime() / 1000);
		return '<img src="' + EQQ.CONST.AVATAR_SERVER_DOMAIN
				+ "cgi/svr/chatimg/get?pic=" + u.name + "&gid=" + v + "&time="
				+ y + '" id="_cface_' + (j++) + '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var d = function(x, w, v, y) {
		var u = x.server.toString().split(":");
		return '<img src="' + EQQ.CONST.CHAT_PIC_SERVER
				+ "cgi-bin/get_group_pic?gid=" + w + "&uin=" + v + "&rip="
				+ u[0] + "&rport=" + u[1] + "&fid=" + x.file_id + "&pic="
				+ x.name + "&vfwebqq=" + qqweb.portal.getVfWebQQ() + "&t=" + y
				+ '" id="_cface_' + (j++) + '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var q = function(u) {
		return '<img src="' + u + '" id="cface_' + (j++)
				+ '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var c = function(x, w, y, u, v) {
		return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN
				+ "channel/get_image2?lcid=" + x + "&guid={" + w + "}" + u
				+ "." + v + "&to=" + y + "&count=1&time=1&psessionid="
				+ EQQ.getPsessionid() + '" id="_cface_' + (j++)
				+ '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var e = function(u) {
		return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN2
				+ "cgi-bin/webqq_app/?cmd=2&bd=" + u + '" id="_cface_' + (j++)
				+ '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var m = function(u, v) {
		return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN
				+ "channel/get_offpic2?file_path=" + u + "&f_uin=" + v
				+ "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc()
				+ "&psessionid=" + EQQ.getPsessionid() + '" id="_cface_'
				+ (j++) + '" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏" />';
	};
	var s = function() {
		return '<img src="style/images/img_error.gif" title="鍥剧墖鎴栬嚜瀹氫箟琛ㄦ儏鎺ユ敹閿欒鎴栦笉瀛樺湪" />';
	};
	var r = function(v) {
		var u = f(v);
		u = u.replace(/^(<br \/>|&nbsp;)+/ig, "");
		u = u.replace(/(<a([^>]+)>|<\/a>)/ig, "");
		u = u.replace(/<div class="msgFileBox">([\s\S]+?)<\/div>/ig,
				function(x) {
					x = x.replace(/(<span([\s\S]+?)<\/span>)+?/ig, "");
					x = x.replace(/(:<br \/>)+?/ig, ":");
					return x.replace(/(<div([^>]+?)>|<\/div>)+/ig, "");
				});
		var w = u.indexOf("<br />");
		if (w != -1) {
			u = u.substr(0, w);
		}
		u = u.replace(/(&nbsp;)+$/ig, "");
		u = u.replace(/<img.*?\/?>/ig, function(x) {
					if (/class="EQQ_faceImg"/.test(x)) {
						return x;
					} else {
						return '<img src="./style/images/image_icon.png" />';
					}
				});
		return u;
	};
	var h = function(v, u) {
		if (u === 2) {
			var w = /\[url\][\s\S]+?\[\/url\]/g;
			v = v.replace(w, function(y) {
				y = y.replace(/(\[url\]|\[\/url\])/g, "");
				var x = y.replace(/^www\./, function(z) {
							return "http://" + z;
						});
				return '<a href="'
						+ x
						+ '" class="chatLink" target="_blank"><span class="msgLink">'
						+ y + "</span></a>";
			});
		} else {
			var w = /((([a-zA-Z0-9]{3,10})?:\/\/)|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"\-]+([0-9a-zA-Z\/#])+?/g;
			v = v.replace(w, function(x) {
						return "[url]" + x + "[/url]";
					});
		}
		return v;
	};
	var a = function(y) {
		if (y[0] === "font") {
			var v = y[1].style;
			var x = g.string.encodeHtmlAttributeSimple(y[1].name + "");
			x = x
					.match(/瀹嬩綋|榛戜綋|闅朵功|寰蒋闆呴粦|妤蜂綋_GB2312|骞煎渾|Arial Black|Arial|Verdana|Times New Roman/);
			if (x) {
				x = x[0];
			} else {
				x = "瀹嬩綋";
			}
			var u = y[1].color.match(/([0-9a-f]{6})/);
			if (u) {
				u = u[0];
			} else {
				u = "000";
			}
			var w = "color:#" + u + ";font-family:" + x + ";font-size:"
					+ Number(y[1].size) + "pt;font-weight:"
					+ (!!v[0] ? "bold" : "normal") + ";font-style:"
					+ (!!v[1] ? "italic" : "normal") + ";text-decoration:"
					+ (!!v[2] ? "underline" : "none") + ";";
			return w;
		} else {
			return "";
		}
	};
	var b = function(w) {
		if (typeof(w) == "undefined" || w == "") {
			return;
		}
		var u = w.split("."), v = u[u.length - 1].toLowerCase();
		switch (v) {
			case "excel" :
			case "xls" :
			case "xlsx" :
				v = "excel";
				break;
			case "doc" :
			case "docx" :
				v = "word";
				break;
			case "ppt" :
			case "pptx" :
				v = "ppt";
				break;
			case "bmp" :
			case "png" :
			case "gif" :
			case "jpeg" :
			case "jpg" :
			case "ico" :
				v = "pic";
				break;
			case "tga" :
			case "tif" :
			case "psd" :
			case "tiff" :
				v = "pic";
				break;
			case "mov" :
			case "avi" :
			case "mpeg" :
			case "mpg" :
			case "ra" :
			case "rm" :
			case "rmvb" :
			case "qt" :
			case "asf" :
			case "wmv" :
			case "swf" :
			case "flv" :
			case "mp4" :
				v = "media";
				break;
			case "mp3" :
			case "wav" :
			case "mid" :
				v = "music";
				break;
			case "arj" :
			case "rar" :
			case "zip" :
			case "jar" :
			case "7z" :
			case "tar" :
			case "uc2" :
			case "gz" :
			case "lha" :
			case "ace" :
			case "tgz" :
				v = "rar-zip";
				break;
			case "txt" :
			case "text" :
				v = "share-txt";
				break;
			case "pdf" :
				v = "pdf16";
				break;
			case "com" :
				v = "exe16";
				break;
			default :
				v = "others";
				break;
		}
		return v;
	};
	this.translateFontStyle = a;
	this.translateChatMsg = f;
	this.trimChatMsg = r;
	this.Marquee = new g.Class({
				init : function(u) {
					var v = this;
					this.speed = u.speed || 40;
					this.stopTime = u.stopTime || 3000;
					this.lineHeight = u.lineHeight || 20;
					this.target = u.target;
					this.timer = null;
					this.lineTimer = null;
					this.intervaler = null;
					this.scrollHeight = this.lineHeight;
					this.isStop = false;
					this._onTimeRun = function() {
						v.scrollOneLine();
					};
				},
				scrollOneLine : function() {
					if (this.scrollHeight > 0) {
						this.scrollHeight--;
						var u = this.target.style.top.match(/-?\d+/);
						u = (!u) ? 0 : parseInt(u[0]);
						this.target.style.top = (--u) + "px";
						this.lineTimer = setTimeout(this._onTimeRun, this.speed);
					} else {
						if (!this.isStop) {
							this.update();
						}
					}
				},
				stop : function() {
					if (this.timer) {
						clearTimeout(this.timer);
					}
				},
				stopAll : function() {
					this.stop();
					if (this.lineTimer) {
						clearTimeout(this.lineTimer);
					}
				},
				reset : function() {
					this.target.style.top = "0px";
				},
				update : function() {
					if (this.isStop) {
						return;
					}
					if (this.timer) {
						clearTimeout(this.timer);
					}
					this.scrollHeight = this.lineHeight;
					var v = this.target.style.top.match(/\d+/);
					var u = o.getScrollHeight(this.target);
					if (!!v && !!u) {
						v = parseInt(v[0]);
						if (v >= u) {
							this.target.style.top = this.lineHeight + "px";
							this.scrollOneLine();
							return;
						}
					}
					this.timer = setTimeout(this._onTimeRun, this.stopTime);
				},
				walkOnLastLine : function() {
					this._onTimeRun();
				}
			});
});
Jet().$package("EQQ.RPCService", function(k) {
	var w = this, e = this, t = k.dom, r = k.event, h = (new Date()).getTime(), d = 0, y = 0, s = String(k
			.random(0, 99))
			+ String((new Date()).getTime() % 1000000), o = 0, g = 0, x = false, f = 0;
	var i = EQQ.CONST.CONN_SERVER_DOMAINS[0];
	var q;
	var m = function() {
		var z = function(B) {
			return B.replace(/r=|http:\/\/web2-b.qq.com\//g, "").replace(/,"/g,
					":").replace(/[{"}/]/g, "");
		};
		var A = function(B) {
			return B.replace(/[\r\t\n\s]/g, "");
		};
		return function(F, B) {
			try {
				if (arguments.length == 2) {
					return !B || arguments.callee(F);
				} else {
					var C = qqweb.portal.getUin();
					if (F.status) {
						var D = [C, F.status, A(F.responseText) + ":",
								decodeURIComponent(F.data), F.uri].join("$");
					} else {
						F = F.o;
						var D = [C, F.status, A(F.responseText) + ":",
								decodeURIComponent(F.data), F.uri].join("$");
					}
					if (true || Math.random() < 0.1) {
						qqweb.rpcService.formSend("http://tj.qstatic.com/log",
								{
									method : "POST",
									data : {
										r : z(D)
									}
								});
					}
				}
			} catch (E) {
			}
		};
	};
	m = m();
	var b = function() {
		d++;
		k.out("onFail: " + d);
		if (d > 4) {
			d = 0;
			r.notifyObservers(w, "FailCountOverMax");
		}
	};
	var v = function() {
		if (!x) {
			y++;
			if (y > 3) {
				g++;
				c();
				y = 0;
			}
		}
	};
	var j = function() {
		d = 0;
		y = 0;
	};
	var p = false;
	var u = [];
	var n = function(C, E) {
		if (q) {
			return a(C, E);
		} else {
			u.push({
						url : C,
						option : E
					});
			if (p) {
				return;
			}
			p = true;
			var B = document.body, F = t.node("div");
			var D = '<iframe id="EQQ_ProxySendIframe" class="hiddenIframe" name="EQQ_ProxySendIframe" width="1" height="1" src="about:blank"></iframe>';
			F.innerHTML = D;
			B.appendChild(F);
			var A = t.id("EQQ_ProxySendIframe");
			var z = function() {
				var K = window.frames.EQQ_ProxySendIframe;
				q = K.ajax;
				x = false;
				for (var I = 0; I < u.length; ++I) {
					var N = g % EQQ.CONST.CONN_PROXY_URLS.length;
					var H = u[I].url;
					if (H.indexOf(EQQ.CONST.CONN_SERVER_DOMAINS[N]) == -1) {
						H = H.replace(/http:\/\/.*.com\//, "");
						u[I].url = EQQ.CONST.CONN_SERVER_DOMAINS[N] + H;
					}
					var G = u[I].url;
					var J = u[I].option;
					try {
						return a(G, J);
					} catch (M) {
						k.out("eqq ajax浠ｇ悊鍑洪敊锛�" + G + " "
								+ EQQ.CONST.CONN_PROXY_URL);
						if (!J.onError) {
							return;
						}
						var L = {};
						L.arguments = J.arguments || {};
						J.onError.call(J.context, L);
					}
				}
			};
			r.on(A, "load", z);
			A.setAttribute("src", EQQ.CONST.CONN_PROXY_URLS[0]);
		}
	};
	var c = function() {
		var z = t.id("EQQ_ProxySendIframe");
		var A = g % EQQ.CONST.CONN_PROXY_URLS.length;
		x = true;
		z.setAttribute("src", EQQ.CONST.CONN_PROXY_URLS[A]);
		i = EQQ.CONST.CONN_SERVER_DOMAINS[A];
	};
	var a = function(A, C) {
		C = C || {};
		C.cacheTime = C.cacheTime || 0;
		C.onSuccess = C.onSuccess || function() {
		};
		C.onError = C.onError || function() {
		};
		C.onTimeout = C.onTimeout || function() {
		};
		C.onComplete = C.onComplete || function() {
		};
		var B = {
			method : C.method || "GET",
			enctype : C.enctype || "",
			data : C.data || {},
			arguments : C.arguments || {},
			context : C.context || null,
			timeout : C.timeout,
			onSuccess : function(H) {
				var F = {};
				var E = false;
				H.responseText = H.responseText || "-";
				try {
					F = k.json.parse(H.responseText);
				} catch (G) {
					H.responseText = H.responseText + ":BJF:";
					E = true;
					k.out("JSON鏍煎紡鍑洪敊:" + G);
				} finally {
					F.arguments = C.arguments || {};
					F.o = H;
					C.onSuccess.call(C.context, F, E);
				}
			},
			onError : function(E) {
				C.onError.call(C.context, E);
			},
			onTimeout : function(F) {
				var E = {};
				E.arguments = C.arguments || {};
				C.onTimeout.call(C.context, E);
			},
			onComplete : function(F) {
				var E = {};
				E.arguments = C.arguments || {};
				C.onComplete.call(C.context, E);
			}
		};
		B.data.clientid = s;
		B.data.psessionid = EQQ.getPsessionid();
		if (x) {
			B.onError();
			return;
		}
		qqweb.portal.recoverCookie();
		if (B.method == "GET") {
			var D = k.string.toQueryString(B.data);
			if (C.cacheTime === 0) {
				if (D) {
					D += "&t=" + (new Date()).getTime();
				} else {
					D += "t=" + (new Date()).getTime();
				}
			}
			if (D) {
				var z = qqweb.portal.getVfWebQQ();
				if (z) {
					D += "&vfwebqq=" + z;
				}
				A = A + "?" + D;
			}
			B.data = null;
			return q(A, B);
		} else {
			B.contentType = "application/x-www-form-urlencoded";
			if (A.indexOf("?") === -1) {
				return q(A, B);
			} else {
				return q(A, B);
			}
		}
	};
	this._proxy = q;
	function l() {
		var z = this;
		this.pollRequst = undefined;
		this.POLLTICK = 0;
		this._check = function() {
			z.check();
		};
	}
	l.prototype = {
		pollStop : function() {
			k.out("a poll Over...");
			this.pollRequst = null;
			this.POLLTICK = 0;
			this.timer = null;
		},
		check : function() {
			k.out("check...");
			if (this.pollRequst == null) {
				k.out("Oooops, somethingWrong...");
				this.POLLTICK++;
				if (this.POLLTICK == 1) {
					setTimeout(this._check, 5000);
				}
			}
			if (this.POLLTICK == 2) {
				k.out("Oooops, send...");
				qqweb.rpcService.formSend("http://tj.qstatic.com/log", {
							method : "POST",
							data : {
								j : "unwanted-poll-stop"
							}
						});
				this.POLLTICK = 0;
			}
		},
		startWatch : function() {
			k.out("start...");
			try {
				r.addObserver(EQQ, "NotifyBeat_2", this._check);
			} catch (z) {
			}
			this.POLLTICK = 0;
		},
		stopWatch : function() {
			k.out("stop...");
			try {
				r.removeObserver(EQQ, "NotifyBeat_2", this._check);
			} catch (z) {
			}
			this.POLLTICK = 0;
		}
	};
	this.pollWatcher = new l();
	this.init = function() {
	};
	this.getClientId = function() {
		return s;
	};
	this.send = n;
	this.sendLogin = function(A) {
		A.clientid = s;
		A.psessionid = EQQ.getPsessionid();
		var z = this.send(i + "channel/login2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					onSuccess : this.sendLoginSuccess,
					onError : this.sendLoginError,
					onTimeout : this.sendLoginError
				});
		qqweb.portal.speedTest.sRTS(2, "start", (new Date()));
	};
	this.sendLoginSuccess = function(A, z) {
		switch (A.retcode) {
			case 0 :
				f = 1;
				r.notifyObservers(EQQ, "LoginSuccess", A.result);
				qqweb.portal.speedTest.sRTS(4, "start", (new Date()));
				qqweb.portal.speedTest.sRTS(5, "start", (new Date()));
				break;
			case 106 :
				r.notifyObservers(EQQ, "UinNotInWhitelist", A.result);
				break;
			case 111 :
				r.notifyObservers(EQQ, "UinInBlacklist", A.result);
				break;
			case 112 :
				r.notifyObservers(EQQ, "Overload", A.result);
				break;
			case 100000 :
			case 100001 :
			case 100002 :
				r.notifyObservers(EQQ, "PtwebqqFail", A.result);
				break;
			default :
				k.out("鏈煡鐧诲綍澶辫触");
				r.notifyObservers(EQQ, "LoginFailure", {
							text : "杩炴帴澶辫触"
						});
				k.out("[sendLogin] error: " + A.retcode);
				m(A, !z);
				break;
		}
		m(A, z);
	};
	this.sendLoginError = function(z) {
		k.out("sendLoginError");
		r.notifyObservers(EQQ, "LoginFailure", {
					text : "杩炴帴澶辫触"
				});
		m(z);
	};
	this.sendLogout = function(A) {
		var z = this.send(i + "channel/logout2", {
					context : this,
					data : A,
					onSuccess : function(B) {
						if (B.retcode === 0 || B.retcode === 100) {
							f = 0;
							r.notifyObservers(this, "LogoutSuccess", B.result);
							k.out(":LogoutSuccess...");
						} else {
							k.out("[SendLogout] error: " + B.retcode);
						}
					}
				});
	};
	this.sendReLink = function(A) {
		A.clientid = s;
		A.psessionid = EQQ.getPsessionid();
		if (w._state) {
			A.status = w._state;
		}
		var z = this.send(i + "channel/login2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					onSuccess : this.sendReLinkSuccess,
					onError : this.sendReLinkError,
					onTimeout : this.sendReLinkTimeout
				});
	};
	this.sendReLinkSuccess = function(A, z) {
		switch (A.retcode) {
			case 0 :
				f = 1;
				r.notifyObservers(EQQ, "ReLinkSuccess", A.result);
				break;
			case 113 :
				r.notifyObservers(EQQ, "ReLinkFailure", A);
				break;
			default :
				r.notifyObservers(EQQ, "ReLinkFailure");
				m(A, !z);
				break;
		}
		m(A, z);
	};
	this.sendReLinkError = function(z) {
		k.out("sendReLinkError");
		r.notifyObservers(EQQ, "ReLinkFailure");
		m(z);
	};
	this.sendReLinkTimeout = function(z) {
		k.out("sendReLinkTimeout");
		r.notifyObservers(EQQ, "ReLinkFailure");
		m(z);
	};
	this.sendGetOnlineBuddies = function(A) {
		var z = this.send(i + "channel/get_online_buddies2", {
					context : this,
					data : {},
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this, "GetOnlineBuddiesSuccess",
									C.result);
						} else {
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendMsg = function(A) {
		A.clientid = s;
		A.psessionid = EQQ.getPsessionid();
		var z = this.send(i + "channel/send_msg2", {
					context : this,
					cacheTime : 0,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this, "SendMsgSuccess", C.result);
						} else {
							k.out("[sendMsg] error: " + C.retcode + "-"
									+ C.errmsg);
							r.notifyObservers(this, "SendMsgError", {
										uin : A.to,
										retcode : C.retcode,
										errmsg : C.errmsg
									});
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendGroupMsg = function(A) {
		A.clientid = s;
		A.psessionid = EQQ.getPsessionid();
		var z = this.send(i + "channel/send_group_msg2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this, "SendGroupMsgSuccess",
									C.result);
						} else {
							k.out("[sendGroupMsg] error: " + C.retcode + "-"
									+ C.errmsg);
							r.notifyObservers(this, "SendMsgError", {
										uin : A.to,
										retcode : C.retcode,
										errmsg : C.errmsg
									});
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendPoll = function(z) {
		z = z || {};
		var A = z.data || {};
		if (o < f) {
			o++;
			w.pollWatcher.pollRequst = this.send(i + "channel/poll2", {
						context : this,
						cacheTime : 0,
						data : A,
						timeout : 90000,
						onSuccess : this.sendPollSuccess,
						onError : this.sendPollError,
						onTimeout : this.sendPollTimeout
					});
		}
	};
	this.sendPollSuccess = function(B, z) {
		w.pollWatcher.pollStop();
		var A = (new Date()).getTime();
		var D = A - h;
		h = A;
		o--;
		if (B.retcode === 0 || B.retcode === 102) {
			j();
			try {
				r.notifyObservers(this, "PollSuccess", B.result);
			} catch (C) {
				k.out("PollSuccess, and js error!!!!!!!!!!!!!!!!!!!!!!!!");
			}
			r.notifyObservers(this, "PollComplete");
		} else {
			if (B.retcode === 100) {
				r.notifyObservers(this, "NotLogin");
			} else {
				if (B.retcode === 120) {
					r.notifyObservers(EQQ, "ReLinkFailure", B);
				} else {
					if (B.retcode === 121) {
						r.notifyObservers(EQQ, "ReLinkFailure", B);
					} else {
						if (B.retcode === 116) {
							qqweb.portal.setPtwebqq(B.p);
							r.notifyObservers(this, "PollComplete");
						} else {
							r.notifyObservers(e, "PollComplete");
							if (B.retcode != 109 && B.retcode != 110) {
								b();
							}
						}
					}
				}
			}
		}
		m(B, z);
	};
	this.sendPollTimeout = function(A) {
		w.pollWatcher.pollStop();
		var z = this;
		o--;
		r.notifyObservers(z, "PollComplete");
		b();
	};
	this.sendPollError = function(z) {
		this.sendPollTimeout(z);
		m(z);
	};
	this.sendChangeStatus = function(B, z) {
		B = B || {
			newstatus : "hidden"
		};
		var A = this.send(i + "channel/change_status2", {
					context : this,
					data : B,
					arguments : B,
					onSuccess : function(D, C) {
						if (D.retcode === 0) {
							r.notifyObservers(this, "ChangeStatusSuccess",
									D.result);
							w._state = D.arguments.newstatus;
						} else {
							m(D, !C);
						}
						m(D, C);
					},
					onError : function(C) {
						m(C);
					}
				});
	};
	this.sendGetSessionSignature = function(A) {
		var z = this.send(i + "channel/get_session_sig2", {
					context : this,
					data : {
						group_uin : A.group_uin,
						to_uin : A.to_uin
					},
					arguments : {
						group_uin : A.group_uin,
						to_uin : A.to_uin
					},
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this,
									"GetSessionSignatureSuccess", C);
						} else {
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendGroupBuddyMsg = function(A) {
		var z = this.send(i + "channel/send_session_msg2", {
					context : this,
					data : A,
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this, "SendMsgSuccess", C.result);
						} else {
							r.notifyObservers(this, "SendMsgError", {
										uin : A.to,
										retcode : C.retcode,
										errmsg : C.errmsg
									});
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendGetCustomFaceList = function() {
		qqweb.portal.recoverCookie();
		var z = k.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2
						+ "cgi-bin/webqq_app/", {
					query : "cmd=1?t=" + ((new Date()).getTime()) + "&vfwebqq="
							+ qqweb.portal.getVfWebQQ(),
					onSuccess : function(A) {
						if (typeof(custom_face) !== "undefined") {
							r
									.notifyObservers(w,
											"SendGetCustomFaceListSuccess",
											custom_face);
						} else {
							w.sendGetCustomFaceList();
						}
					}
				});
	};
	this.sendDeleteCustomFace = function(A) {
		qqweb.portal.recoverCookie();
		var z = k.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2
						+ "cgi-bin/webqq_app/", {
					query : "cmd=12&bd=" + A.img + "&vfwebqq="
							+ qqweb.portal.getVfWebQQ(),
					onSuccess : function(B) {
						if (typeof(cface_delete_result) !== "undefined") {
							r.notifyObservers(w, "SendDeleteCustomFaceSuccess",
									A.callback || function() {
									});
						} else {
						}
					}
				});
	};
	this.sendGetGroupCustomFaceKey = function(A) {
		var z = this.send(i + "channel/get_gface_sig2", {
					context : this,
					arguments : A.arguments,
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this,
									"SendGetGroupCustomFaceKeySuccess", C);
						} else {
							r.notifyObservers(this,
									"SendGetGroupCustomFaceKeyError", {
										uin : A.to,
										retcode : C.retcode,
										errmsg : C.errmsg
									});
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendGetGroupCustomFaceInfo = function(A) {
		A.clientid = s;
		A.psessionid = EQQ.getPsessionid();
		var z = this.send(i + "channel/send_group_msg2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this,
									"SendGetGroupCustomFaceInfoSuccess", C);
						} else {
							r.notifyObservers(this, "SendMsgError", {
										uin : A.to,
										retcode : C.retcode,
										errmsg : C.errmsg
									});
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendGetOfflinePicUrl = function(A) {
		var z = this.send(i + "channel/apply_offline_pic_dl2", {
					context : this,
					data : A,
					onSuccess : function(C, B) {
						if (C.retcode === 0) {
							r.notifyObservers(this,
									"sendGetOfflinePicUrlSuccess", C);
						} else {
							r.notifyObservers(this, "getSendPicUrlError", C);
							k.out("[sendGetOfflinePicUrlError] error: ");
							m(C, !B);
						}
						m(C, B);
					},
					onError : function(B) {
						m(B);
					}
				});
	};
	this.sendRefuseFile = function(A) {
		var z = this.send(i + "channel/refuse_file2", {
					context : this,
					data : A,
					onSuccess : function(B) {
					}
				});
	};
	this.sendGetMyAvatarFlag = function(A) {
		A = A || {};
		A.type = 1;
		A.psessionid = EQQ.getPsessionid();
		A.clientid = EQQ.RPCService.getClientId();
		var z = this.send(EQQ.CONST.CONN_SERVER_DOMAIN
						+ "channel/query_user_flag", {
					context : this,
					method : "GET",
					data : A,
					arguments : {},
					onSuccess : function(B) {
						if (B.retcode === 0) {
							r
									.notifyObservers(this,
											"GetMyAvatarFlagSuccess", B);
						} else {
							r.notifyObservers(this, "GetMyAvatarFlagError", B);
						}
					},
					onError : function(B) {
						r.notifyObservers(this, "GetMyAvatarFlagError", B);
					}
				});
	};
	this.sendDeleteMyAvatarFlag = function(A) {
		A = A || {};
		A.vfwebqq = qqweb.portal.getVfWebQQ();
		A.type = 1;
		A.img_id = 0;
		A.psessionid = EQQ.getPsessionid();
		A.clientid = EQQ.RPCService.getClientId();
		var z = this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/del_chead", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(k.json.stringify(A)),
					arguments : {},
					onSuccess : function(B) {
						if (B.retcode === 0) {
							r.notifyObservers(this,
									"DeleteMyAvatarFlagSuccess", B);
						} else {
							r.notifyObservers(this, "DeleteMyAvatarFlagError",
									B);
						}
					},
					onError : function(B) {
						r.notifyObservers(this, "DeleteMyAvatarFlagError", B);
					}
				});
	};
});
Jet().$package("EQQ.Model.BuddyList", function(j) {
	var u = this, t = j.event, q, x, v, g, k, m, p, d, w, l, o, h, i, s, f, a, e;
	var c = new j.Class({
		init : function(y) {
			this.uin = y.uin;
			this.allow = y.allow;
			this.face = y.face;
			this.age = y.age;
			this.gender = y.gender;
			this.vip = y.vip || false;
			this.clientType = y.clientType || "10000";
			this.setAvatar(EQQ.getUserAvatar(this.uin));
			this.setNick(y.nick || y.uin);
			this.setState(y.state || EQQ.hash.onlineStatus.offline);
			this.setClassId(y.classId || 0);
		},
		setAvatar : function(y) {
			this.avatarUrl = y;
			t.notifyObservers(EQQ.Model.BuddyList, "AvatarChange", this);
		},
		getAvatar : function() {
			return EQQ.getUserAvatar(this.uin);
		},
		setNick : function(y) {
			this.nick = j.string.toSingleLine(y);
			this.htmlNick = j.string.encodeHtmlSimple(this.nick);
			this.titleNick = (this.nick);
			this.updateNames();
		},
		setMarkName : function(y) {
			this.markName = j.string.toSingleLine(y.toString());
			this.htmlMarkName = j.string.encodeHtmlSimple(this.markName
					.toString());
			this.titleMarkName = j.string
					.encodeHtmlAttributeSimple(this.markName.toString());
			this.updateNames();
		},
		updateNames : function() {
			this.updateShowName();
			this.updateAllName();
			t.notifyObservers(EQQ.Model.BuddyList, "UserNameChange", this);
		},
		updateShowName : function() {
			this.showName = this.markName || this.nick || this.uin.toString();
			this.htmlShowName = j.string.encodeHtmlSimple(this.showName
					.toString());
			this.titleShowName = j.string
					.encodeHtmlAttributeSimple(this.showName.toString());
		},
		updateAllName : function() {
			this.allName = "";
			var y = "";
			if (this.markName) {
				y = this.markName + "(" + this.nick + ")";
				this.allName = this.markName + "(" + this.nick + ")";
			} else {
				y = this.nick;
				this.allName = this.nick;
			}
			this.htmlAllName = j.string.encodeHtmlSimple(this.allName);
			this.titleAllName = j.string.encodeHtmlAttributeSimple(y);
		},
		setClassId : function(y) {
			this.classId = y;
		},
		setSignature : function(y) {
			if (y != undefined) {
				this.signature = y;
				this.htmlSignature = j.string.encodeHtmlSimple(y);
				this.titleSignature = j.string.encodeHtmlAttributeSimple(y);
			}
			t.notifyObservers(EQQ.Model.BuddyList, "UserSignatureChange", this);
		},
		getSignature : function() {
			if (this.signature != undefined) {
				this.setSignature();
			} else {
				qqweb.rpcService.sendGetSignature(this.uin);
			}
		},
		setQQLevel : function(y) {
			if (y != undefined) {
				this.level = y;
			}
			t.notifyObservers(EQQ.Model.BuddyList, "UserQQLevelChange", this);
		},
		getQQLevel : function() {
			if (this.level != undefined) {
				this.setQQLevel();
			} else {
				qqweb.rpcService.sendGetQQLevel(this.uin);
			}
		},
		setState : function(y) {
			this.state = y;
		},
		getState : function() {
			return this.state;
		},
		setFace : function(y) {
			this.face = y;
		},
		setGender : function(y) {
			this.gender = y;
		},
		setAllow : function(y) {
			this.allow = y;
		},
		setUsercard : function(y, z) {
			this.usercard = this.usercard || {};
			this.usercard[y] = {
				title : z,
				htmlAttribute : j.string.encodeHtmlAttributeSimple(z),
				html : j.string.encodeHtmlSimple(z)
			};
			t.notifyObservers(EQQ.Model.BuddyList, "UserCardChange",
					this.usercard);
		},
		getUsercard : function(y) {
			this.usercard = this.usercard || {};
			return this.usercard[y];
		}
	});
	var n = new j.Class({
				init : function(y) {
					this.gid = y.gid;
					this.code = y.code;
					this.mask = String(y.mask);
					this.preMask = String(this.mask);
					this.setName(y.name);
					this.setMarkName(y.markName);
					this.setType(y.type);
					this.isLoadInfo = false;
					this.hasManageAuthority = false;
					this.uin2members = {};
					this.level = 0;
				},
				setMask : function(y) {
					this.preMask = String(this.mask);
					this.mask = String(y);
					t.notifyObservers(EQQ.Model.BuddyList,
							"SingleGroupMaskChange", this);
				},
				setName : function(y) {
					this.name = j.string.toSingleLine(y);
					this.htmlName = j.string.encodeHtmlSimple(y);
					this.titleName = j.string.encodeHtmlAttributeSimple(y);
					this.updateNames();
				},
				setMarkName : function(y) {
					if (typeof(y) == "undefined" || y == "") {
						return false;
					}
					this.markName = j.string.toSingleLine(y);
					this.htmlMarkName = j.string.encodeHtmlSimple(y);
					this.titleMarkName = j.string.encodeHtmlAttributeSimple(y);
					this.updateNames();
				},
				updateNames : function() {
					this.updateShowName();
					this.updateAllName();
					t.notifyObservers(EQQ.Model.BuddyList, "GroupNameChange",
							this);
				},
				updateShowName : function() {
					this.showName = this.markName || this.name
							|| String(this.code);
					this.htmlShowName = j.string
							.encodeHtmlSimple(this.showName);
					this.titleShowName = j.string
							.encodeHtmlAttributeSimple(this.showName);
				},
				updateAllName : function() {
					var y = "";
					this.allName = "";
					if (this.markName) {
						y = this.markName + "(" + this.name + ")";
						this.allName = this.markName + "(" + this.name + ")";
					} else {
						y = this.name;
						this.allName = this.name + "<" + this.code + ">";
					}
					this.htmlAllName = j.string.encodeHtmlSimple(this.allName);
					this.titleAllName = j.string.encodeHtmlAttributeSimple(y);
				},
				type2text : {
					commonGroup : "鏅€氱兢",
					seniorGroup : "楂樼骇缇�",
					superGroup : "瓒呯骇缇�",
					expireSuperGroup : "杩囨湡鐨勮秴绾х兢",
					enterpriseGroup : "浼佷笟缇�",
					forbiddenGroup : "绂佺敤"
				},
				setType : function(y) {
					this.type = y;
					this.typeText = this.type2text[y] || "鍏朵粬绫诲瀷缇�";
					this.htmlTypeText = j.string
							.encodeHtmlSimple(this.typeText);
					this.titleTypeText = j.string
							.encodeHtmlAttributeSimple(this.typeText);
				},
				setLevel : function(y) {
					this.level = y || 0;
				},
				setAnnouncement : function(y) {
					if (typeof(y) != "undefined") {
						this.announcement = y;
						this.htmlAnnouncement = j.string.encodeHtmlSimple(y);
						this.titleAnnouncement = j.string
								.encodeHtmlAttributeSimple(y);
						t.notifyObservers(u, "GroupAnnouncementChange", this);
					}
				},
				upAnnouncement : function(y) {
					if (typeof(y) != "undefined") {
						this.announcement = y;
						this.htmlAnnouncement = j.string.encodeHtmlSimple(y);
						this.titleAnnouncement = j.string
								.encodeHtmlAttributeSimple(y);
						t.notifyObservers(u, "GroupAnnouncementChange", this);
					}
				},
				updateMembers : function(y, z) {
					if (y) {
						this.members = y;
						this.onlineMemberCount = z;
						this.uin2members[y.uin] = y;
					}
					t.notifyObservers(u, "GroupMembersChange", this);
				},
				updateMemberState : function(G) {
					var D = G.stats;
					var A = this.members;
					var C = 0;
					var F = {};
					var E = [];
					for (C = 0; C < D.length; C++) {
						F[D[C].uin] = D[C].stat;
					}
					var z = A.length;
					for (C = 0; C < z; C++) {
						var B = A[C].info;
						var y = B.uin;
						F[y] = F[y] || 20;
						if (B.gstate != F[y]) {
							if (y != q) {
								E.push({
											uin : y,
											stat : F[y],
											oldStat : B.gstate
										});
								B.gstate = F[y];
							}
						}
					}
					t.notifyObservers(u, "GroupMemberStateChange", {
								t : this,
								arg : E
							});
				},
				updateMemberCard : function(B) {
					var z = this.members;
					var A = false;
					for (var C in z) {
						var y = z[C];
						if (y.uin == B.uin) {
							if (B.card == "") {
								this.members[C].usercard = j.string
										.encodeHtmlSimple(y.nick);
								this.members[C].info.setUsercard(this.code,
										y.nick);
							} else {
								this.members[C].usercard = j.string
										.encodeHtmlSimple(B.card);
								this.members[C].info.setUsercard(this.code,
										B.card);
							}
							A = true;
							break;
						}
					}
					if (A) {
						t.notifyObservers(u, "GroupMemberCardChange", {
									gid : this.gid,
									gcode : this.code,
									uin : B.uin
								});
					}
				}
			});
	var r = {
		onGetUserInfoSuccess : function(C) {
			var y = C.result;
			if (y) {
				var B = C.arguments.uin;
				var z = u.getUserByUin(B);
				if (z) {
					z.setNick(y.nick);
					z.setFace(y.face);
					z.setGender(y.gender);
					z.setAllow(y.allow);
				} else {
					var A = {
						uin : C.arguments.uin,
						allow : y.allow,
						nick : y.nick,
						face : y.face,
						gender : y.gender
					};
					z = u.createUser(A);
					u.addStranger(z);
				}
				t.notifyObservers(u, "GetUserInfoSuccess", z);
			}
		},
		onGetUserInfoError : function(y) {
		},
		onGetBuddySignatureSuccess : function(B) {
			var y = B.result;
			var z;
			if (y.length == 0) {
				z = "";
			} else {
				z = y[0].lnick;
			}
			var A = u.getUserByUin(B.arguments.uin);
			if (A) {
				A.setSignature(z);
			}
			t.notifyObservers(u, "GetBuddySignatureSuccess", A);
		},
		onChangeGroupMaskSuccess : function(y) {
			if (y.uin == u.getSelfUin()) {
				e = y.mask;
				t.notifyObservers(u, "GroupMaskChange", e);
			} else {
				var z = u.getGroupByGid(y.uin);
				z.setMask(y.mask);
			}
		},
		onGetQQLevelSuccess : function(z) {
			var y = u.getUserByUin(z.arguments.uin);
			if (y) {
				y.setQQLevel(z.result);
			}
		},
		onGetGroupMaskConfigSuccess : function(z) {
			for (var y in z) {
				var A = parseInt(z[y]);
				if (y === "global") {
					e = A;
					t.notifyObservers(u, "GroupMaskChange", e);
				} else {
				}
			}
		},
		onGetOnlineBuddiesSuccess : function(y) {
			u.setAllBuddyState(y);
		},
		onGetSessionSignatureSuccess : function(y) {
			u.setGroupBuddySessionSignature(y);
		},
		onBuddyStatusChange : function(y) {
			u.setState(y.uin, y.status, y.client_type);
		},
		onGetSelfSignatureSuccess : function(y) {
			u.setSelfSignature(y);
		},
		onGetBuddyListSuccess : function(y) {
			var A = y.categories || [];
			var z = false;
			for (var B = 0; B < A.length; B++) {
				if (A[B].index == 0) {
					z = true;
				}
			}
			if (!z) {
				A.unshift({
							index : 0,
							name : "鎴戠殑濂藉弸"
						});
			}
			u.isBuddyList = true;
			u.setBuddyClass(y);
			u.setBuddyList(y);
			EQQ.RPCService.sendGetOnlineBuddies();
		},
		GetBuddyListError : function(y) {
			t.notifyObservers(EQQ, "LoginFailure", {
						text : "鎷夊彇澶辫触"
					});
		},
		onGetGroupListSuccess : function(y) {
			u.isGroupList = true;
			var E = y.gmasklist || [];
			var A = 0;
			for (var B = 0; B < E.length; B++) {
				var C = E[B];
				if (C.gid === 1000) {
					A = C.mask;
				} else {
					for (var z = 0; z < y.gnamelist.length; z++) {
						var D = y.gnamelist[z];
						if (D.gid === C.gid) {
							y.gnamelist[z].mask = C.mask;
							break;
						}
					}
				}
			}
			u.setGroupList(y);
			u.setGroupMask(A);
		},
		GetGroupListError : function(y) {
			t.notifyObservers(EQQ, "LoginFailure", {
						text : "鎷夊彇澶辫触"
					});
		},
		onGetGroupInfoSuccess : function(y) {
			u.setGroupInfo(y);
		},
		onGetRecentListSuccess : function(y) {
			u.setRecentList(y);
		},
		onPollSuccess : function(y) {
			if (y) {
				for (var z = 0; z < y.length; z++) {
					var A = y[z];
					switch (A.poll_type) {
						case "buddies_status_change" :
							r.onBuddyStatusChange(A.value);
							break;
					}
				}
			}
		},
		onLoginSuccess : function(y) {
			var z = u.getSelfUin();
			u.setState(z, y.status, "QQWeb");
			EQQ.index = y.index;
			EQQ.port = y.port;
		},
		onAddANewBuddy : function(A) {
			var C = A.tuin;
			var z = A.gid;
			var y = A.newstate;
			var B = A.markname;
			qqweb.rpcService.sendGetUserInfo(C, null, null, function(I) {
						if (I.retcode === 0) {
							var D = I.result;
							var H = I.arguments.uin;
							var E = u.getUserByUin(H);
							if (E) {
								E.setNick(D.nick);
								E.setFace(D.face);
								E.setGender(D.gender);
								E.setClassId(z);
								u.addBuddy(E);
							} else {
								var G = {
									uin : H,
									allow : D.allow,
									nick : D.nick,
									face : D.face,
									gender : D.gender,
									classId : z
								};
								E = u.createUser(G);
								u.addBuddy(E);
							}
							var F = EQQ.Model.BuddyList.getClassById(z);
							F.count = F.count + 1;
							t.notifyObservers(EQQ.Model.BuddyList, "AddBuddy",
									{
										user : E,
										newstate : y,
										markname : B
									});
						} else {
						}
					});
		}
	};
	this.init = function() {
		x = [];
		v = {};
		g = [];
		k = {};
		m = [];
		p = {};
		d = [];
		w = {};
		l = [];
		o = {};
		p = {};
		h = [];
		i = [];
		f = {}, a = {};
		this.setSelf(qqweb.portal.self);
		t.addObserver(qqweb.rpcService, "GetUserInfoSuccess",
				r.onGetUserInfoSuccess);
		t.addObserver(qqweb.rpcService, "GetUserInfoError",
				r.onGetUserInfoError);
		t.addObserver(qqweb.rpcService, "GetGroupInfoSuccess",
				r.onGetGroupInfoSuccess);
		t.addObserver(qqweb.rpcService, "GetQQLevelSuccess",
				r.onGetQQLevelSuccess);
		t.addObserver(qqweb.rpcService, "GetBuddySignatureSuccess",
				r.onGetBuddySignatureSuccess);
		t.addObserver(EQQ, "LoginSuccess", r.onLoginSuccess);
		t.addObserver(EQQ.RPCService, "GetOnlineBuddiesSuccess",
				r.onGetOnlineBuddiesSuccess);
		t.addObserver(EQQ.RPCService, "GetSelfSignatureSuccess",
				r.onGetSelfSignatureSuccess);
		t.addObserver(EQQ.RPCService, "GetSessionSignatureSuccess",
				r.onGetSessionSignatureSuccess);
		t.addObserver(EQQ.RPCService, "PollSuccess", r.onPollSuccess);
		t.addObserver(u, "AddANewBuddy", r.onAddANewBuddy);
		t.addObserver(u, "BuddyStatusChange", r.onBuddyStatusChange);
	};
	this.reset = function() {
		q = 0;
		x = [];
		v = {};
		g = [];
		k = {};
		m = [];
		p = {};
		d = [];
		w = {};
		l = [];
		o = {};
		p = {};
		h = [];
		i = [];
		f = {}, a = {};
		this.setSelf(qqweb.portal.self);
	};
	this.sendGetBuddyList = function(y) {
		y = y || {};
		y.vfwebqq = EQQ.vfwebqq;
		return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL
						+ "get_user_friends2", {
					context : this,
					method : "POST",
					param : y,
					callback : function(z, A) {
						if (z.retcode === 0) {
							r.onGetBuddyListSuccess(z.result);
							A(z);
						} else {
							r.GetBuddyListError(z);
						}
					},
					errback : function(z) {
						r.GetBuddyListError(z);
					}
				});
	};
	this.sendGetGroupList = function(y) {
		y = y || {};
		y.vfwebqq = EQQ.vfwebqq;
		return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL
						+ "get_group_name_list_mask2", {
					context : this,
					method : "POST",
					param : y,
					callback : function(z, A) {
						if (z.retcode === 0) {
							r.onGetGroupListSuccess(z.result);
							A(z);
						} else {
							r.GetGroupListError(z);
						}
					},
					errback : function(z) {
						r.GetGroupListError(z);
					}
				});
	};
	this.sendGetRecentList = function(y) {
		y = y || {};
		y.vfwebqq = EQQ.vfwebqq;
		return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL
						+ "get_recent_contact2", {
					context : this,
					method : "POST",
					param : y,
					callback : function(z) {
						if (z.retcode === 0) {
							r.onGetRecentListSuccess(z.result);
						} else {
						}
					},
					errback : function(z) {
					}
				});
	};
	this.getUserSignature = function(z) {
		var y = this.getUserByUin(z);
		if (y) {
			y.getSignature();
		}
	};
	this.sendGetQQLevel = function(z) {
		var y = this.getUserByUin(z);
		if (y) {
			y.getQQLevel();
		}
	};
	this.setSelf = function(y) {
		var A = {
			uin : y.uin,
			allow : y.allow,
			nick : y.nick,
			face : y.face,
			age : y.age,
			gender : y.gender,
			vip : y.vip
		};
		var z = this.createUser(A);
		this.setSelfUin(y.uin);
		var B = EQQ.getDefaultState();
		this.setState(y.uin, B, "QQWeb");
		t.notifyObservers(this, "SelfInfoChange", this.getSelf());
	};
	this.getSelf = function() {
		return this.getUserByUin(this.getSelfUin());
	};
	this.getSelfState = function() {
		var y = this.getSelf();
		if (y) {
			return y.state;
		}
	};
	this.setSelfUin = function(y) {
		q = y || 0;
	};
	this.getSelfUin = function() {
		return q;
	};
	this.setSelfSignature = function(y) {
		this.getUserByUin(this.getSelfUin()).setSignature(y);
		t.notifyObservers(this, "SelfSignatureChange", this.getSelf());
	};
	this.sendChangeStatus = function(y) {
		EQQ.RPCService.sendChangeStatus({
					newstatus : y
				});
	};
	this.sendChangeGroupMask = function(B) {
		var A = B.type === "global" ? B.mask : e;
		var C = {
			cAll : A,
			idx : EQQ.index,
			port : EQQ.port
		};
		for (var y = 0; y < i.length; y++) {
			var z = i[y];
			if (B.type === "single" && B.uin === z.gid) {
				C[z.gid] = B.mask;
			} else {
				C[z.gid] = z.mask;
			}
		}
		qqweb.rpcService.sendSetConfig({
					onSuccess : function() {
						r.onChangeGroupMaskSuccess({
									uin : B.uin,
									mask : B.mask
								});
					},
					context : this,
					data : {
						retype : 1,
						app : "EQQ",
						itemlist : '{"groupmask":' + j.json.stringify(C) + "}"
					},
					action : "messagefilter"
				});
	};
	this.setBuddyClass = function(y) {
		x = y.categories;
		for (var z = 0; z < x.length; z++) {
			var A = x[z];
			A.caculateName = A.name;
			A.htmlName = j.string.encodeHtmlSimple(A.name);
			A.titleName = j.string.encodeHtmlAttributeSimple(A.name);
			A.count = 0;
			A.onlineCount = 0;
			A.list = {
				callme : [],
				online : [],
				away : [],
				busy : [],
				silent : [],
				offline : []
			};
			v[A.index] = A;
		}
		t.notifyObservers(this, "BuddyClassChange", this.getClassList());
	};
	this.getClassList = function() {
		return x;
	};
	this.setAllBuddyState = function(y) {
		h = [];
		for (var A = 0; A < y.length; A++) {
			var z = y[A];
			this.setState(z.uin, z.status, z.client_type);
		}
		t.notifyObservers(this, "AllOnlineBuddyReady", this.getOnlineBuddy());
		t
				.notifyObservers(this, "AllClassOnlineBuddyReady", this
								.getClassList());
	};
	this.setState = function(B, z, y) {
		var F = this.getUserByUin(B);
		if (F) {
			var C = F.state;
			F.setState(z);
			F.clientType = y;
			if (B == this.getSelfUin()) {
				t.notifyObservers(this, "SelfStateChange", this.getSelfState());
			} else {
				if (F.classId === EQQ.hash.userClassType.stranger) {
				} else {
					if (F.classId === EQQ.hash.userClassType.balck) {
					} else {
						var D = this.getClassByUin(F.uin);
						D.list[F.state].unshift(F);
						var H = D.list[C];
						for (var E = 0; E < H.length; E++) {
							if (H[E].uin == B) {
								H.splice(E, 1);
							}
						}
						var A = EQQ.hash.onlineStatus.offline;
						if (C == A || z == A) {
							D.onlineCount = D.count - D.list[A].length;
							if (z == A) {
								for (var G = 0; G < h.length; G++) {
									if (h[G].uin == B) {
										h.splice(G, 1);
									}
								}
							} else {
								h.push({
											uin : B,
											state : z,
											clientType : y
										});
							}
							t.notifyObservers(this, "OnlineBuddyChange", B);
						}
						t.notifyObservers(this, "BuddyStateChange", B);
					}
				}
			}
		}
	};
	this.getState = function(z) {
		var y = this.getUserByUin(z);
		if (y) {
			return y.getState();
		} else {
			return null;
		}
	};
	this.getOnlineBuddy = function() {
		return h;
	};
	this.addUser = function(y) {
		if (k[y.uin]) {
		} else {
			k[y.uin] = y;
			g.push(y);
		}
		return y;
	};
	this.addBuddy = function(y) {
		if (p[y.uin]) {
		} else {
			y.type = "buddy";
			p[y.uin] = y;
			m.push(y);
		}
		return y;
	};
	this.createUser = function(z) {
		var y = new c(z);
		this.addUser(y);
		return y;
	};
	this.addStranger = function(y) {
		if (w[y.uin]) {
		} else {
			y.type = "stranger";
			w[y.uin] = y;
			d.push(y);
		}
		return y;
	};
	this.addBlack = function(y) {
		if (o[y.uin]) {
		} else {
			y.type = "black";
			o[y.uin] = y;
			l.push(y);
		}
		return y;
	};
	this.getStrangerList = function() {
		return d;
	};
	this.setBuddyList = function(G) {
		m = [];
		var F = G.friends;
		var C = this.getSelfUin();
		for (var D = 0; D < F.length; D++) {
			if (F[D].uin != C) {
				var z = G.info[D];
				var E = {
					uin : z.uin,
					allow : z.allow,
					nick : z.nick,
					face : z.face,
					age : z.age,
					gender : z.gender,
					vip : z.vip,
					classId : (this.getClassById(F[D].categories))
							? F[D].categories
							: 0
				};
				var B = this.createUser(E);
				this.addBuddy(B);
			}
		}
		var y = G.marknames;
		if (y) {
			for (var D = 0; D < y.length; D++) {
				var B = this.getUserByUin(y[D].uin);
				if (B) {
					B.setMarkName(y[D].markname);
				}
			}
		}
		for (var D = 0; D < m.length; D++) {
			if (m[D].uin != this.getSelfUin()) {
				var A = this.getClassById(m[D].classId);
				if (!A.list[m[D].state]) {
					A.list[m[D].state] = [];
				}
				A.list[m[D].state].push(m[D]);
				A.count++;
			}
		}
		t.notifyObservers(this, "BuddyListChange", this.getBuddyList());
	};
	this.getBuddyList = function() {
		return m;
	};
	this.addNewBuddy = function() {
	};
	this.searchBuddy = function(A, C) {
		A = String(A).toLowerCase();
		var y = [];
		var z = [];
		if (A.length > 0) {
			for (var D = 0; D < m.length; D++) {
				var B = m[D];
				if ((String(B.nick).toLowerCase().indexOf(A) > -1 && String(B.nick) != "undefined")
						|| (String(B.markName).toLowerCase().indexOf(A) > -1 && String(B.markName) != "undefined")) {
					if (String(B.nick).toLowerCase() == A
							|| String(B.markName).toLowerCase() == A) {
						z.push(B);
					} else {
						y.push(B);
					}
				}
				if (y.length + z.length >= C) {
					break;
				}
			}
		}
		Array.prototype.push.apply(z, y);
		return z;
	};
	this.isUser = function(y) {
		return (j.array.indexOf(g, y) !== -1);
	};
	this.isBuddy = function(y) {
		return p[y];
	};
	this.getBuddyByUin = function(y) {
		return p[y];
	};
	this.isStranger = function(y) {
		return w[y];
	};
	this.isBlack = function(y) {
		return o[y];
	};
	this.getUserByUin = function(y) {
		if (k) {
			return k[y];
		} else {
		}
	};
	this.getClassIdByUin = function(y) {
		return k[y].classId;
	};
	this.getClassByUin = function(y) {
		var z = this.getClassIdByUin(y);
		return this.getClassById(z);
	};
	this.getClassById = function(y) {
		return v[y];
	};
	this.addGroup = function(y) {
		if (a[y.code]) {
		} else {
			a[y.code] = f[y.gid] = y;
			i.push(y);
		}
		return y;
	};
	this.setGroupList = function(z) {
		var G = z.gnamelist;
		var F = z.gmarklist || [];
		i = [];
		for (var A = 0; A < G.length; A++) {
			var y = G[A];
			var D = "commonGroup";
			if (y.flag & 16) {
				D = "seniorGroup";
			} else {
				if (y.flag & 33554432) {
					D = "superGroup";
				} else {
					if (y.flag & 2) {
						D = "forbiddenGroup";
					} else {
						if (y.flag & 256) {
							D = "enterpriseGroup";
						} else {
							if (y.flag & 67108864) {
								D = "expireSuperGroup";
							}
						}
					}
				}
			}
			var C = b(F, y.gid);
			var B = {
				gid : y.gid,
				code : y.code,
				type : D,
				name : y.name,
				markName : C,
				mask : y.mask || "0"
			};
			var E = new n(B);
			this.addGroup(E);
		}
		t.notifyObservers(this, "GroupListChange", this.getGroupList());
	};
	var b = function(A, y) {
		for (var z in A) {
			if (A[z].uin == y) {
				return A[z].markname;
			}
		}
		return "";
	};
	this.setGroupMask = function(y) {
		e = y;
		t.notifyObservers(this, "GroupMaskChange", e);
	};
	this.getGroupMask = function() {
		return e;
	};
	this.getGroupList = function() {
		return i;
	};
	this.setRecentList = function(y) {
		s = y.contents;
		t.notifyObservers(this, "RecentListChange", this.getRecentList());
	};
	this.getRecentList = function() {
		return s;
	};
	this.setGroupInfo = function(H) {
		var G = H.ginfo;
		var y = H.minfo;
		var T = H.stats;
		var B = H.cards || [];
		var F = this.getGroupByCode(G.code);
		F.setLevel(G.level);
		var K = this.getSelfUin();
		F.setAnnouncement(G.memo || " ");
		var O = G.members;
		var R = [];
		var D = false;
		var Q = 0;
		for (var N = 0; N < O.length; N++) {
			var M = "common";
			if (O[N].mflag & 1) {
				M = "manager";
				if (O[N].muin === K) {
					D = true;
				}
			} else {
				if (O[N].mflag & 2) {
					M = "manager2";
					if (O[N].muin === K) {
						D = true;
					}
				}
			}
			if (O[N].muin == G.owner) {
				M = "master";
				if (O[N].muin === K) {
					D = true;
				}
			}
			var z = O[N].muin;
			var S = y[N].nick;
			var E = y[N].nick;
			if (E == "") {
				E = String(z);
			}
			var C = T[N].stat;
			if (C != 20 || z === K) {
				Q++;
			}
			var I = S;
			var P = S;
			for (var L = 0; L < B.length; L++) {
				if (B[L].muin == z) {
					E = B[L].card;
					break;
				}
			}
			var V = this.getUserByUin(O[N].muin);
			if (V) {
				var A = qqweb.util.code2state(C);
				if (V.uin != K) {
					V.setState(A);
					V.gstate = C;
				}
				if (V.type === "groupBuddy" || V.uin === K) {
					var U = (E ? E : V.showName);
					V.setUsercard(G.code, U);
				} else {
					E = E === S ? V.showName : E;
				}
			} else {
				var J = {
					uin : z,
					nick : S,
					state : qqweb.util.code2state(C)
				};
				V = this.createUser(J);
				V.type = "groupBuddy";
				V.group = F;
				V.gstate = C;
			}
			var U = (E ? E : V.showName);
			V.setUsercard(G.code, U);
			R[N] = {
				uin : z,
				flag : M,
				gcode : G.code,
				nick : S,
				htmlNick : j.string.encodeHtmlSimple(S),
				titleNick : (S),
				showName : I,
				htmlShowName : j.string.encodeHtmlSimple(I),
				titleShowName : j.string.encodeHtmlAttributeSimple(I),
				allName : P,
				htmlAllName : j.string.encodeHtmlSimple(P),
				titleAllName : P,
				usercard : j.string.encodeHtmlSimple(E)
			};
			R[N].info = V;
			F.uin2members[z] = R[N];
		}
		F.isLoadInfo = true;
		F.hasManageAuthority = D;
		F.updateMembers(R, Q);
		t.notifyObservers(this, "GroupInfoChange", F);
	};
	this.setMemberState = function(y) {
		var z = this.getGroupByCode(y.gcode);
		z.updateMemberState(y);
	};
	this.sendGetGroupInfo = function(z) {
		z.vfwebqq = qqweb.portal.getVfWebQQ();
		var y = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL
						+ "get_group_info_ext2", {
					context : u,
					data : z,
					arguments : z,
					onSuccess : function(A) {
						if (A.retcode === 0) {
							u.setGroupInfo(A.result);
						} else {
							j.out("鑾峰彇缇ゆ渶鏂颁俊鎭け璐�");
						}
					},
					onError : function(A) {
						j.out("鑾峰彇缇ゆ渶鏂颁俊鎭け璐�");
					}
				});
	};
	this.sendGetGroupNewestState = function(z) {
		z.vfwebqq = qqweb.portal.getVfWebQQ();
		var y = qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL
						+ "get_group_member_stat2", {
					context : u,
					data : z,
					arguments : z,
					onSuccess : function(A) {
						if (A.retcode === 0) {
							u.onGetGroupNewestStateSuc(A.result);
						} else {
							j.out("鑾峰彇缇ゆ渶鏂颁俊鎭け璐�");
						}
					},
					onError : function(A) {
						j.out("鑾峰彇缇ゆ渶鏂颁俊鎭け璐�");
					}
				});
	};
	this.onGetGroupNewestStateSuc = function(y) {
		this.setMemberState(y);
	};
	this.getGroupByCode = function(y) {
		return a[y];
	};
	this.getGroupByGid = function(y) {
		return f[y];
	};
	this.getGroupInfo = function(y) {
		var z = this.getGroupByCode(y);
		if (z.isLoadInfo) {
			z.updateMembers();
			z.upAnnouncement(z.announcement);
			t.notifyObservers(this, "GroupInfoChange", z);
			return z;
		} else {
			this.sendGetGroupInfo({
						gcode : y
					});
		}
	};
	this.sendGetSessionSignature = function(A) {
		var y = this.getUserByUin(A);
		var z = y.group.gid;
		EQQ.RPCService.sendGetSessionSignature({
					group_uin : z,
					to_uin : A
				});
	};
	this.setGroupBuddySessionSignature = function(A) {
		var z = A.arguments.to_uin;
		var y = this.getUserByUin(z);
		if (A.result.verify_sig.type === 0 && A.result.group_sig.type === 0) {
			y.chatSession = A.result;
			t.notifyObservers(this, "GroupBuddySessionSignatureChange", y.uin);
		}
	};
	this.sendGetUserInfo = function(y) {
		qqweb.rpcService.sendGetUserInfo(y);
	};
	this.isGroupPrompt = function(y) {
		var z = this.getGroupByGid(y);
		e = parseInt(e);
		switch (e) {
			case 0 :
				switch (parseInt(z.mask)) {
					case 0 :
						return true;
						break;
					case 1 :
						return false;
						break;
					case 2 :
						return false;
						break;
				}
				break;
			case 1 :
				return true;
				break;
			case 2 :
				return false;
				break;
			case 3 :
				return false;
				break;
		}
	};
});
Jet().$package("EQQ.Model.ChatMsg", function(j) {
	var r = this, q = j.event, f = {}, s = [], d = {}, c = [], l = {}, u = null, p = {}, i = {}, g = [], b = {}, k = 0, o, a = 0, h;
	o = (new Date()).getTime();
	o = (o - o % 1000) / 1000;
	o = o % 10000 * 10000;
	var n = function() {
		k++;
		return o + k;
	};
	var m = function(v) {
		if (j.isNumber(v)) {
			v = v * 1000;
		}
		var t = new Date(v);
		return j.date.format(t, "YYYY-MM-DD hh:mm:ss");
	};
	this.init = function() {
		f = {}, s = [], d = {}, c = [], l = {}, u = null, p = {}, i = {}, g = [], b = {}, k = 0, a = 0, h = null;
		q.addObserver(EQQ.RPCService, "SendMsg", j.bind(this.onSendMsgSuccess,
						this));
		q.addObserver(EQQ.RPCService, "PollSuccess", j.bind(this.onPollSuccess,
						this));
		q.addObserver(EQQ.RPCService, "SendMsgError", j.bind(
						this.onSendMsgError, this));
		q.addObserver(EQQ.RPCService, "SendGetGroupCustomFaceKeySuccess", j
						.bind(this.onSendGetGroupCustomFaceKeySuccess, this));
		q.addObserver(EQQ.RPCService, "sendGetOfflinePicUrlSuccess", j.bind(
						this.onGetOfflinePicUrlSuccess, this));
		q.addObserver(EQQ.RPCService, "getSendPicUrlError", j.bind(
						this.onSetSendPicUrlError, this));
	};
	this.setGroupCustomFaceKey = function(t) {
		a = j.now();
		h = {
			key : t.gface_key,
			signature : t.gface_sig
		};
	};
	this.getGroupCustomFaceKey = function() {
		return h;
	};
	this.isGroupCustomFaceKeyTimeout = function() {
		return (j.now() - a) > 1000 * 60 * 60 * 60 * 2;
	};
	this.sendGetGroupCustomFaceKey = function(t) {
		EQQ.RPCService.sendGetGroupCustomFaceKey({
					arguments : {
						msg : t
					}
				});
	};
	this.onSendGetGroupCustomFaceKeySuccess = function(t) {
		var v = t.arguments.msg;
		this.setGroupCustomFaceKey(t.result);
		this.sendGetGroupCustomFaceInfo(v);
	};
	this.sendGetGroupCustomFaceInfo = function(A) {
		var x = this.getGroupCustomFaceKey();
		for (var w = 0; w < A.content.length; w++) {
			var z = A.content[w];
			if (z[0] === "face") {
				z[1] = EQQ.CONST.TRANSFER_TABLE[z[1]];
			}
		}
		EQQ.RPCService.sendGetGroupCustomFaceInfo({
					group_uin : A.to,
					group_code : EQQ.Model.BuddyList.getGroupByGid(A.to).code,
					key : x.key,
					sig : x.signature,
					content : j.json.stringify(A.content)
				});
		var y = n();
		var t = EQQ.Model.BuddyList.getSelf();
		var v = {
			type : A.type,
			from_uin : 0,
			sender_uin : t.uin,
			sender : t,
			time : m(new Date()),
			content : A.content,
			msg_id : y,
			group_code : EQQ.Model.BuddyList.getGroupByGid(A.to).code
		};
		q.notifyObservers(this, "GroupMessageListChange", {
					gid : A.to,
					msgList : [v]
				});
	};
	this.callbackSendPic = function(v) {
		if (v.filesize > (1 * 1024 * 1024)) {
			v.retcode = "100";
			v.maxFileSize = "1MB";
			q.notifyObservers(this, "uploadSendPicError", v);
		} else {
			if (v.retcode != 0) {
				q.notifyObservers(this, "uploadSendPicError", v);
			} else {
				p[v.filepath] = v;
				var t = EQQ.Model.BuddyList.getSelf();
				EQQ.RPCService.sendGetOfflinePicUrl({
							f_uin : t.uin,
							file_path : v.filepath,
							clientid : r.getClientidFromRpc()
						});
			}
		}
	};
	this.onGetOfflinePicUrlSuccess = function(t) {
		p[t.result.file_path].fileurl = t.result.url;
		if (p[t.result.file_path]) {
			t.fileid = p[t.result.file_path].fileid;
		}
		q.notifyObservers(this, "GetSendPicUrlSuccess", t);
	};
	this.onSetSendPicUrlError = function(t) {
		if (p[t.result.file_path]) {
			t.fileid = p[t.result.file_path].fileid;
		}
		q.notifyObservers(this, "getSendPicUrlError", t);
	};
	this.getSendPicUrlByFilePath = function(t) {
		if (typeof(p[t]) == "undefined") {
			return "";
		} else {
			return p[t].fileurl;
		}
	};
	this.callbackSendPicGroup = function(v) {
		if (v.ret === 0) {
			q.notifyObservers(this, "getSendPicGroupSuccess", v.msg);
		} else {
			if (v.ret === 4) {
				var w = /[A-Fa-f0-9]{32}\.[A-Za-z]{3}/;
				var t = v.msg;
				if (t.length > 36) {
					t = t.substring(0, 36);
					if (w.test(t)) {
						q.notifyObservers(this, "getSendPicGroupSuccess", t);
					} else {
						q.notifyObservers(this, "sendPicGroupError", v);
					}
				} else {
					q.notifyObservers(this, "sendPicGroupError", v);
				}
			} else {
				q.notifyObservers(this, "sendPicGroupError", v);
			}
		}
	};
	this.sendMsg = function(C) {
		var v = n();
		var y = "";
		var E = "";
		var w;
		var x = {};
		C = C || {};
		C.type = C.type || "single";
		var D = typeof(C.attach) != "undefined" && C.attach ? C.attach : "";
		var F = EQQ.Model.BuddyList.getSelf();
		for (var B = 0; B < C.content.length; B++) {
			var A = C.content[B];
			if (A[0] === "face") {
				A[1] = EQQ.CONST.TRANSFER_TABLE[A[1]];
			}
		}
		E = j.json.stringify(C.content);
		if (C.type === "group") {
			x = {
				group_uin : C.to,
				content : E,
				msg_id : v
			};
			EQQ.RPCService.sendGroupMsg(x);
			w = {
				type : C.type,
				from_uin : 0,
				sender_uin : F.uin,
				sender : F,
				time : m(new Date()),
				content : C.content,
				msg_id : v,
				group_code : EQQ.Model.BuddyList.getGroupByGid(C.to).code
			};
			q.notifyObservers(this, "GroupMessageListChange", {
						gid : C.to,
						msgList : [w]
					});
		} else {
			var t = C.to;
			var z = EQQ.Model.BuddyList.getUserByUin(t);
			if (z.type === "groupBuddy") {
				x = {
					to : C.to,
					verify_sig : (z.chatSession.verify_sig.value),
					group_sig : (z.chatSession.group_sig.value),
					face : C.face,
					content : E,
					msg_id : v
				};
				EQQ.RPCService.sendGroupBuddyMsg(x);
			} else {
				x = {
					to : C.to,
					face : C.face,
					content : E,
					msg_id : v
				};
				EQQ.RPCService.sendMsg(x);
			}
			w = {
				type : C.type,
				from_uin : 0,
				sender_uin : F.uin,
				sender : F,
				time : m(new Date()),
				content : C.content,
				msg_id : v,
				attach : D
			};
			q.notifyObservers(this, "MessageListChange", {
						uin : C.to,
						msgList : [w]
					});
		}
		if (f[C.to]) {
			f[C.to].msgList.push(w);
		} else {
			f[C.to] = {
				last : 0,
				msgList : [w]
			};
		}
	};
	this.addMsgToList = function(v) {
		var t = EQQ.Model.BuddyList.getSelf();
		var w = n();
		var x = {
			type : v.type,
			from_uin : v.from_uin,
			sender_uin : t.uin,
			sender : t,
			time : m(new Date()),
			content : v.content,
			msg_id : w,
			attach : typeof(v.attach) != "undefined" && v.attach
					? v.attach
					: ""
		};
		q.notifyObservers(this, "MessageListChange", {
					uin : v.to,
					msgList : [x]
				});
		if (f[v.to]) {
			f[v.to].msgList.push(x);
		} else {
			f[v.to] = {
				last : 0,
				msgList : [x]
			};
		}
	};
	this.onSendMsgSuccess = function(t) {
		if (t == "ok") {
		} else {
		}
	};
	this.onSendMsgError = function(t) {
		q.notifyObservers(this, "SendMsgError", t);
	};
	this.getMsgHistory = function(t) {
		if (f[t]) {
			q.notifyObservers(this, "MessageListChange", {
						uin : t,
						msgList : f[t].msgList
					});
		}
	};
	this.getGroupMsgHistory = function(t) {
		if (f[t]) {
			q.notifyObservers(this, "GroupMessageListChange", {
						gid : t,
						msgList : f[t].msgList
					});
		}
	};
	this.clearChatLog = function(t) {
		if (f[t]) {
			f[t] = {
				last : 0,
				msgList : []
			};
		}
	};
	this.receiveMsg = function(D) {
		var v = D.from_uin, C = false, A = 0;
		var B = typeof(D.attach) != "undefined" && D.attach ? D.attach : "";
		var x = {
			type : "single",
			from_uin : v,
			sender_uin : v,
			sender : EQQ.Model.BuddyList.getUserByUin(v),
			msg_id : D.msg_id,
			content : (D.content),
			time : m(D.time),
			raw_time : D.time,
			attach : B
		};
		if (f[v]) {
			var z = f[v].msgList;
			var w = z.length;
			for (var y = 0; y < w; y++) {
				if (z[y].msg_id == x.msg_id) {
					C = true;
					break;
				}
			}
			if (!C) {
				z.push(x);
				A++;
			}
			b[v] = x.msg_id;
		} else {
			f[v] = {
				last : 0,
				msgList : []
			};
			f[v].msgList.push(x);
			A++;
			b[v] = x.msg_id;
		}
		var t = {
			last : 0,
			msgList : []
		};
		if (A > 0) {
			for (var y = 0; y < A; y++) {
				t.msgList.push(f[v].msgList[f[v].msgList.length - (A - y)]);
			}
		}
		f[v].last = 0;
		q.notifyObservers(this, "MessageListChange", {
					uin : v,
					msgList : t.msgList
				});
		q.notifyObservers(EQQ, "MessageReceive", {
					uin : v,
					msgList : t.msgList
				});
	};
	this.receiveSystemMsg = function(w) {
		var v;
		switch (w.type) {
			case "added_buddy_sig" :
			case "added_buddy_nosig" :
				v = "娣诲姞鎮ㄤ负濂藉弸";
				break;
			case "verify_pass_add" :
				v = "鎺ュ彈浜嗘偍鐨勮姹傦紝骞舵坊鍔犳偍涓哄ソ鍙�";
				var t = {
					uin : w.from_uin,
					status : qqweb.util.code2state(w.stat),
					client_type : w.client_type
				};
				q.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
							tuin : w.from_uin,
							gid : w.group_id,
							newstate : t
						});
				break;
			case "verify_pass" :
				v = "鎺ュ彈浜嗘偍鐨勮姹�";
				var t = {
					uin : w.from_uin,
					status : qqweb.util.code2state(w.stat),
					client_type : w.client_type
				};
				q.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
							tuin : w.from_uin,
							gid : 0,
							newstate : t
						});
				break;
			case "verify_required" :
				v = "璇锋眰娣诲姞鎮ㄤ负濂藉弸锛岄檮鍔犱俊鎭�(" + (w.msg || "鏃 ") + ")";
				break;
			case "verify_rejected" :
				v = "鎷掔粷浜嗘偍鐨勮姹傦紝闄勫姞淇℃伅(" + (w.msg || "鏃 ") + ")";
				break;
			default :
				v = w.type;
		}
		var x = {
			type : "system",
			sender : {
				htmlShowName : String(w.from_uin)
			},
			from_uin : w.from_uin,
			content : v,
			msg_id : w.seq,
			opt : {
				uin : w.from_uin,
				nick : w.from_uin,
				allow : w.allow,
				type : w.type,
				msg : w.msg,
				gid : w.group_id
			}
		};
		q.notifyObservers(EQQ, "MessageReceive", {
					msgList : [x]
				});
	};
	this.receiveGroupMsg = function(D) {
		var A = D.from_uin, C = false, B = 0, x;
		var v = {
			type : "group",
			from_uin : A,
			sender_uin : D.send_uin,
			sender : EQQ.Model.BuddyList.getUserByUin(D.send_uin),
			msg_id : D.msg_id,
			content : D.content,
			group_code : EQQ.Model.BuddyList.getGroupByGid(A).code,
			time : m(D.time),
			raw_time : D.time
		};
		if (f[A]) {
			var t = f[A].msgList.length;
			for (var y = 0; y < t; y++) {
				var z = f[A].msgList[y];
				if (v.sender_uin == z.sender_uin && z.msg_id == v.msg_id) {
					C = true;
					j.out("鍙戠幇閲嶅缇ゆ秷鎭紝msg_id锛�" + y);
					break;
				}
			}
			if (!C) {
				f[A].msgList.push(v);
				B++;
			}
			b[A] = v.msg_id;
		} else {
			f[A] = {
				last : 0,
				msgList : []
			};
			f[A].msgList.push(v);
			B++;
			b[A] = v.msg_id;
		}
		x = f[A].msgList;
		var t = x.length;
		var w = [];
		if (B > 0) {
			for (var y = B; y > 0; y--) {
				w.push(x[t - y]);
			}
		}
		f[A].last = 0;
		q.notifyObservers(this, "GroupMessageListChange", {
					gid : A,
					msgList : w
				});
		q.notifyObservers(EQQ, "MessageReceive", {
					gid : A,
					msgList : w
				});
	};
	this.addMessageBoxUserList = function(v) {
		var t = d[v.from_uin];
		if (t) {
			j.array.remove(s, t);
		} else {
			q.notifyObservers(this, "flexStartJump", v.from_uin);
		}
		d[v.from_uin] = v;
		s.push(v);
		q.notifyObservers(this, "MessageBoxUserListChange", this
						.getMessageBoxUserList());
	};
	this.getMessageBoxUserList = function() {
		return s;
	};
	this.removeMessageBoxUserList = function(v) {
		var t = d[v];
		if (t) {
			j.array.remove(s, t);
		}
		delete d[v];
		q.notifyObservers(this, "flexStopJump", v);
		q.notifyObservers(this, "MessageBoxUserListChange", this
						.getMessageBoxUserList());
	};
	this.addMessageBoxGroupList = function(v) {
		var t = l[v.from_uin];
		if (t) {
			j.array.remove(c, t);
		}
		l[v.from_uin] = v;
		c.push(v);
		q.notifyObservers(this, "MessageBoxGroupListChange", this
						.getMessageBoxGroupList());
	};
	this.getMessageBoxGroupList = function() {
		return c;
	};
	this.removeMessageBoxGroupList = function(v) {
		var t = l[v];
		if (t) {
			j.array.remove(c, t);
		}
		delete l[v];
		q.notifyObservers(this, "MessageBoxGroupListChange", this
						.getMessageBoxGroupList());
	};
	this.preloadGroupMessageImages = function(G) {
		var z = G.content, v = G.send_uin, A = "", F = "", x = null, D = G.group_code, w = G.time, t = "";
		var E = function() {
			x = null;
			j.out("preload-image-success!");
		};
		var C = function(H) {
			x = null;
			j.out("preload-image-error!");
		};
		for (var B = 0, y = z.length; B < y; B++) {
			if (z[B][0] === "cface") {
				t = z[B][1];
				A = t.server.toString().split(":");
				F = EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?gid="
						+ D + "&uin=" + v + "&rip=" + A[0] + "&rport=" + A[1]
						+ "&fid=" + t.file_id + "&pic=" + t.name + "&vfwebqq="
						+ qqweb.portal.getVfWebQQ() + "&t=" + w;
				x = new Image();
				x.src = F;
				x.onload = E;
				x.onerror = C;
			}
		}
	};
	this.onPollSuccess = function(t) {
		if (t) {
			for (var w = t.length - 1; w >= 0; w--) {
				var A = t[w];
				switch (A.poll_type) {
					case "message" :
						var z = A.value;
						var y = z.from_uin;
						var x = EQQ.Model.BuddyList.isBuddy(y);
						if (z.msg_type === 9) {
							if (x) {
								this.addMessageBoxUserList(z);
								this.receiveMsg(z);
							} else {
								this.receiveStrangerMsg(z);
							}
						} else {
							if (z.msg_type === 10) {
								if (x) {
									this.receiveStrangerMsg(z);
								} else {
								}
							} else {
								if (z.msg_type === 31 || z.msg_type === 140) {
									this.receiveStrangerMsg(z);
								}
							}
						}
						break;
					case "group_message" :
						var z = A.value;
						this.addMessageBoxGroupList(z);
						this.preloadGroupMessageImages(z);
						this.receiveGroupMsg(z);
						break;
					case "kick_message" :
						j.out("韪㈢嚎閫氱煡锛�" + A.value);
						var z = A.value;
						var v = "鎮ㄧ殑甯愬彿鍦ㄥ彟涓€鍦扮偣鐧诲綍锛屾偍宸茶杩笅绾裤€傚鏈夌枒闂紝璇风櫥褰�:safe.qq.com浜嗚В鏇村銆�";
						if (z.show_reason !== 0) {
							v = z.reason;
						}
						q.notifyObservers(EQQ, "SelfOffline", v);
						break;
					case "file_message" :
						j.out("鎺ユ敹鏂囦欢閫氱煡" + A.value);
						this.receiveFile(A.value);
						break;
					case "system_message" :
						j.out("鏀跺埌绯荤粺娑堟伅" + A.value);
						this.receiveSystemMsg(A.value);
						q.notifyObservers(EQQ, "SystemMessageRecive", A.value);
						break;
					case "filesrv_transfer" :
						j.out("鏀跺埌鏂囦欢浼犺緭娑堟伅" + A.value);
						this.receiveTransferMsg(A.value);
						break;
					case "tips" :
						j.out("鏀跺埌tips娑堟伅" + A.value);
						this.receiveTipsMsg(A.value);
						break;
				}
			}
		}
	};
	this.receiveStrangerMsg = function(x) {
		var w = x.from_uin;
		var y = EQQ.Model.BuddyList.isStranger(w);
		if (y) {
		}
		if (EQQ.Model.BuddyList.isBuddy(w)) {
		} else {
			var y = EQQ.Model.BuddyList.isStranger(w);
			if (y) {
			} else {
				var v = {
					uin : w
				};
				var t = EQQ.Model.BuddyList.createUser(v);
				EQQ.Model.BuddyList.addUser(t);
				EQQ.Model.BuddyList.addStranger(t);
				t.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(t.uin, "online", "10000");
				q.notifyObservers(this, "NewStranger", t);
			}
		}
		this.addMessageBoxUserList(x);
		this.receiveMsg(x);
		j.out("receiveStrangerMsg");
	};
	this.receiveGroupBuddyMsg = function(x) {
		var w = x.from_uin;
		var y = EQQ.Model.BuddyList.isStranger(w);
		if (y) {
		} else {
			var v = {
				uin : w
			};
			var t = EQQ.Model.BuddyList.createUser(v);
			EQQ.Model.BuddyList.addUser(t);
			EQQ.Model.BuddyList.addStranger(t);
			t.type = "groupBuddy";
			t.group = EQQ.Model.BuddyList.getGroupByGid(x.gid);
			t.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
			q.notifyObservers(this, "NewStranger", t);
			EQQ.Model.BuddyList.sendGetUserInfo(w);
		}
		this.addMessageBoxUserList(x);
		this.receiveMsg(x);
		j.out("receiveGroupBuddyMsg, finish");
	};
	this.getMessagePointer = function(t) {
		return b[t] || 0;
	};
	this.getCustomFaceList = function() {
		return u;
	};
	this.getSendPicList = function() {
		return p;
	};
	this.loadCustomFaceList = function() {
		q.addObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", e);
		EQQ.RPCService.sendGetCustomFaceList();
	};
	var e = function(t) {
		u = j.array.bubbleSort(t.data, function(w, v) {
					if (w && v) {
						return w[1] - v[1];
					}
				});
		q.notifyObservers(r, "GetCustomFaceListSuccess", u);
		q.removeObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", e);
	};
	this.deleteCustomFace = function(t) {
		EQQ.RPCService.sendDeleteCustomFace(t);
	};
	this.getClientidFromRpc = function() {
		return EQQ.RPCService.getClientId();
	};
	this.sendFile = function(x) {
		var w = [["sendfile", x.filename]];
		var t = {
			type : "sendfile",
			name : x.filename,
			from_uin : x.to_uin,
			time : (new Date().getTime()),
			isread : true,
			session_id : x.lcid
		};
		var v = x.to_uin + "_" + x.lcid;
		i[v] = t;
		var y = {
			type : "single",
			from_uin : 0,
			to : x.to_uin,
			content : w,
			attach : t
		};
		r.addMsgToList(y);
	};
	this.receiveFile = function(y) {
		if (y.mode === "recv") {
			var x = [["rfile", y.name, y.session_id]];
			y.content = x;
			y.attach = {
				type : "rfile",
				name : y.name,
				from_uin : y.from_uin,
				time : y.time,
				isread : false,
				session_id : y.session_id,
				msg_type : y.msg_type
			};
			var v = y.from_uin + "_" + y.session_id;
			if (!i[v]) {
				i[v] = y.attach;
				this.fileMsgToJumpUserList(y);
				this.receiveMsg(y);
			} else {
				i[v] = y.attach;
			}
		} else {
			if (y.mode === "refuse") {
				if (y.type === 161) {
					return;
				}
				if (y.cancel_type == 2) {
					g[y.session_id] = true;
					var w = parseInt(y.session_id, 10).toString(2);
					if (w.length >= 12) {
						w = w.substr(w.length - 12, 12);
						y.session_id = parseInt(w, 2).toString(10);
					}
				}
				var v = y.from_uin + "_" + y.session_id;
				var t = i[v];
				if (typeof(t) == "undefined") {
					return false;
				}
				if (t.isFinished) {
					return false;
				} else {
					i[v].isFinished = true;
				}
				var x = [["rffile", t.name]];
				t.type = "rffile";
				if (y.cancel_type == 2) {
					x = [["wrffile", t.name]];
					t.type = "wrffile";
				} else {
					if (y.cancel_type == 3) {
						x = [["rtfile", t.name]];
						t.type = "rtfile";
					}
				}
				y.content = x;
				y.attach = t;
				this.fileMsgToJumpUserList(y);
				this.receiveMsg(y);
				if (y.cancel_type != 2) {
					q.notifyObservers(this, "fromCancenFile", v);
				}
			} else {
				if (y.mode === "send_ack") {
					var w = parseInt(y.session_id, 10).toString(2);
					if (w.length < 12) {
						return false;
					}
					w = w.substr(w.length - 12, 12);
					y.session_id = parseInt(w, 2).toString(10);
					var v = y.from_uin + "_" + y.session_id;
					var t = i[v];
					var x = [["wrfile", t.name, t.session_id]];
					y.content = x;
					y.attach = {
						type : "wrfile",
						name : t.name,
						from_uin : t.from_uin,
						time : y.time,
						session_id : y.session_id
					};
					this.fileMsgToJumpUserList(y);
					this.receiveMsg(y);
				} else {
					if (y.type === 161) {
						var x = [["video",
								"濂藉弸鍙戣捣浜嗚棰戞垨闊抽浼氳瘽閭€璇凤紝鐢变簬WebQQ鐩墠鏆備笉鏀寔璇ュ姛鑳斤紝宸茶嚜鍔ㄦ嫆缁濆ソ鍙嬬殑閭€璇枫€�"]];
						y.content = x;
						y.attach = {
							type : "video"
						};
						this.fileMsgToJumpUserList(y);
						this.receiveMsg(y);
					} else {
					}
				}
			}
		}
	};
	this.agreeReceiveFile = function(t) {
		var v = [["agfile", t.name, t.session_id]];
		t.type = "agfile";
		var w = {
			type : "single",
			from_uin : 0,
			to : t.from_uin,
			content : v,
			attach : t
		};
		r.addMsgToList(w);
	};
	this.refuseReceiveFile = function(t) {
		var w = [["rffile", t.name, t.session_id]];
		t.type = "rffile";
		var y = {
			type : "single",
			from_uin : 0,
			to : t.from_uin,
			content : w,
			attach : t
		};
		r.addMsgToList(y);
		var v = t.from_uin + "_" + t.session_id;
		i[v].isFinished = true;
		var x = r.getClientidFromRpc();
		EQQ.RPCService.sendRefuseFile({
					to : t.from_uin,
					lcid : t.session_id,
					clientid : x
				});
	};
	this.getFilesList = function() {
		return i;
	};
	this.fileMsgToJumpUserList = function(y) {
		if (y.cancel_type && y.cancel_type == 2) {
			this.addMessageBoxUserList(y);
			return true;
		}
		if (typeof(y.msg_type) === "undefined" && !y.msg_type) {
			var v = y.from_uin + "_" + y.session_id;
			var t = i[v];
			if (typeof(t.msg_type) === "undefined" && !t.msg_type) {
				return false;
			}
			y.msg_type = t.msg_type;
		}
		var x = y.from_uin;
		var w = EQQ.Model.BuddyList.isBuddy(x);
		if (y.msg_type === 9) {
			if (w) {
				this.addMessageBoxUserList(y);
			} else {
				this.receiveStrangerFileMsg(y);
			}
		} else {
			if (y.msg_type === 10) {
				if (w) {
					this.receiveStrangerFileMsg(y);
				} else {
				}
			} else {
				if (y.msg_type === 31) {
					this.receiveGroupBuddyFileMsg(y);
				}
			}
		}
	};
	this.receiveStrangerFileMsg = function(x) {
		var w = x.from_uin;
		var y = EQQ.Model.BuddyList.isStranger(w);
		if (y) {
		} else {
			var v = {
				uin : w
			};
			var t = EQQ.Model.BuddyList.createUser(v);
			EQQ.Model.BuddyList.addUser(t);
			EQQ.Model.BuddyList.addStranger(t);
			t.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
			q.notifyObservers(this, "NewStranger", t);
		}
		this.addMessageBoxUserList(x);
		j.out("receiveStrangerFileMsg");
	};
	this.receiveGroupBuddyFileMsg = function(x) {
		var w = x.from_uin;
		var y = EQQ.Model.BuddyList.isStranger(w);
		if (y) {
		} else {
			var v = {
				uin : w
			};
			var t = EQQ.Model.BuddyList.createUser(v);
			EQQ.Model.BuddyList.addUser(t);
			EQQ.Model.BuddyList.addStranger(t);
			t.type = "groupBuddy";
			t.setClassId(EQQ.hash.userClassType.stranger);
			EQQ.Model.BuddyList.setState(t.uin, "online", "unknown");
			q.notifyObservers(this, "NewStranger", t);
			EQQ.Model.BuddyList.sendGetUserInfo(w);
		}
		this.addMessageBoxUserList(x);
		j.out("receiveGroupBuddyFileMsg, finish");
	};
	this.receiveTransferMsg = function(z) {
		var x = z.file_infos[0];
		if (x.file_name == "") {
			return;
		}
		var y = "";
		var t = "";
		if (x.file_status == 51) {
			y = [["transtimeout", x.file_name, z.lc_id]];
			t = {
				type : "transtimeout",
				name : x.file_name,
				isread : true
			};
		} else {
			if (x.file_status == 50) {
				y = [["transerror", x.file_name, z.lc_id]];
				t = {
					type : "transerror",
					name : x.file_name,
					isread : true
				};
			} else {
				if (x.file_status == 53) {
					y = [["refusedbyclient", x.file_name, z.lc_id]];
					t = {
						type : "refusedbyclient",
						name : x.file_name,
						isread : true
					};
				} else {
					if (x.file_status == 0) {
						y = [["transok", x.file_name, z.lc_id]];
						t = {
							type : "transok",
							name : x.file_name,
							isread : true
						};
					} else {
						if (x.file_status == 10) {
							return false;
						} else {
							return false;
						}
					}
				}
			}
		}
		var v = z.from_uin + "_" + z.lc_id;
		var w = i[v] || {};
		if (w.isFinished
				|| (typeof(g[z.session_id]) != "undefined" && g[z.session_id] === true)) {
			return false;
		} else {
			w.isFinished = true;
		}
		var A = {
			type : "single",
			from_uin : 0,
			to : z.to_uin,
			content : y,
			attach : t
		};
		r.addMsgToList(A);
	};
	this.receiveTipsMsg = function(w) {
		var t = w.url || "";
		if (t.indexOf("run=mySignature") === -1) {
			return false;
		}
		var v = w.txt3.replace("\r\n", ":");
		w.content = v;
		w.type = "mysigntips";
		var x = {
			type : "mysigntips",
			sender : {
				htmlShowName : String(w.from_uin)
			},
			from_uin : w.from_uin,
			allow : 1,
			content : v,
			msg_id : w.msg_id,
			opt : {
				uin : w.from_uin,
				nick : w.from_uin,
				msg_id : w.msg_id,
				type : "mysigntips"
			}
		};
		w.aMag = x;
		q.notifyObservers(EQQ, "MessageReceive", {
					msgList : [x]
				});
	};
});
Jet().$package("EQQ.View.MainPanel", function(n) {
	var L = this, G = n.dom, E = n.event, x = n.string, e = false, k = false, P = false, q = false, af = false, g = false, ae = {}, ab = [], a = [], ag = {}, H = 0, ad = 38, F = 40, O = 13, d, b = 160, w = 50, z = 20, K = "0", p = qqweb.layout
			.getPanel("desktop").body, B = null, m, S, r, R, W = [], u = false;
	EQQ.avatarMouseoverTimer = null;
	var v = function() {
		if (B) {
			clearTimeout(B);
		}
		L.show();
	};
	var ah = function() {
		if (B) {
			clearTimeout(B);
		}
		B = setTimeout(function() {
					L.hide();
					B = null;
				}, 30);
	};
	var y = function() {
		var J = this.getAttribute("state");
		L.setSelfState(J);
		pgvSendClick({
					hottag : "web2qq.corner.topright." + J
				});
	};
	var ao = function() {
		G.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	var t = function() {
		G.setStyle(this, "backgroundColor", "transparent");
	};
	var aj = function() {
		G.removeClass(L.EQQ_MyState, "hover");
	};
	var Z = function() {
		G.addClass(L.EQQ_MyState, "hover");
	};
	var o = function() {
	};
	var V = function(J) {
		L.toggleStatePanel(J);
	};
	var c = V;
	var A = function(aq) {
		aq.stopPropagation();
		var J = G.getClientXY(L.EQQ_MyState);
		J[1] = J[1] + 16;
		c(J);
		pgvSendClick({
					hottag : "web2qq.corner.topright.statechange"
				});
	};
	var an = function(aq) {
		var J = this.getAttribute("classIndex");
		L.toggleClass(J);
	};
	var D = function() {
		G.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	var M = function() {
		G.setStyle(this, "backgroundColor", "transparent");
	};
	var aa = function() {
		var J = this.getAttribute("uin");
		if (EQQ.avatarMouseoverTimer) {
			clearTimeout(EQQ.avatarMouseoverTimer);
			EQQ.avatarMouseoverTimer = null;
		}
		var aq = G.getClientXY(this);
		aq[0] = aq[0] - 218;
		aq[1] = aq[1] - 5;
		L.showMiniCardPanel(J, aq);
		E.notifyObservers(L, "AvatarMouseover", J);
	};
	var j = function() {
		EQQ.avatarMouseoverTimer = window.setTimeout(Q, 500);
	};
	var Q = function() {
		L.hideMiniCardPanel();
	};
	var U = function() {
		if (EQQ.avatarMouseoverTimer) {
			clearTimeout(EQQ.avatarMouseoverTimer);
			EQQ.avatarMouseoverTimer = null;
		}
	};
	var I = function() {
		EQQ.avatarMouseoverTimer = window.setTimeout(Q, 500);
	};
	var s = function() {
		qqweb.portal.runApp("userDetails", L.miniCardPanel.uin);
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.more"
				});
	};
	var ac = function(av) {
		av.preventDefault();
		var au = 2;
		var J = this.getAttribute("href");
		var at = /\d+/;
		var ar = parseInt(J.match(at)[0]);
		var aq = this;
		qqweb.rpcService.sendGetFriendUin2(ar, au, function(aw) {
					account = aw.result.account;
					qqweb.portal.runApp("6", {
								url : J.replace(at, account)
							});
				});
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.qzone"
				});
	};
	var Y = function(av) {
		av.preventDefault();
		var au = 3;
		var J = this.getAttribute("href");
		var at = /\d+/;
		var ar = parseInt(J.match(at)[0]);
		var aq = this;
		qqweb.rpcService.sendGetFriendUin2(ar, au, function(aw) {
					account = aw.result.account;
					qqweb.portal.runApp("6", {
								url : J.replace(at, account)
							});
				});
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.qqmail"
				});
	};
	var f = function() {
		var aq = L.miniCardPanel.uin;
		var ar = G.id("miniCard_buddyOption_tabBody");
		if (G.getStyle(ar, "display") == "none") {
			var J = '				<div class="miniCard_buddyOption_angle">^</div>				<div class="miniCard_buddyOption_Content">				纭畾鍒犻櫎姝ゅソ鍙嬶紵 纭畾 鍙栨秷				</div>			';
			ar.innerHTML = J;
			G.setStyle(ar, "display", "block");
		} else {
			G.setStyle(ar, "display", "none");
		}
	};
	var X = function() {
		var J = L.miniCardPanel.uin;
	};
	var h = function() {
		var J = L.miniCardPanel.uin;
	};
	var ap = function(J) {
		J.stopPropagation();
	};
	var ai = function(aq) {
		aq.preventDefault();
		aq.stopPropagation();
		var J = this.getAttribute("uin");
		E.notifyObservers(L, "StartChat", J);
	};
	var al = function() {
		var J = this.getAttribute("code");
		E.notifyObservers(L, "StartGroupChat", J);
	};
	this.init = function() {
		W = [];
		e = false, k = false, P = false, q = false, af = false, g = false, ae = {}, ab = [], a = [], ag = {}, H = 0, B = null, m = null, S = null, r = null, R = null, ifFlexReady = false, u = false;
		E.notifyObservers(L, "AddPObservers");
		E.addObserver(EQQ.window, "resize", n.bind(this.onEqqResize, this));
		E.addObserver(EQQ.window, "dragEnd", am);
		E.on(window, "resize", n.bind(this.onWindowResize, this));
		E.addObserver(qqweb.layout, "SideBarPinUp", n.bind(this.onWindowResize,
						this));
		E.addObserver(qqweb.layout, "SideBarPinDown", n.bind(
						this.onWindowResize, this));
		this.EQQ_Container = G.id("EQQ_Container");
		this.EQQ_MainPanel = G.id("EQQ_MainPanel");
		this.EQQ_MyPanel = G.id("EQQ_MyPanel");
		this.EQQ_MyAvatar = G.id("EQQ_MyAvatar");
		this.EQQ_MyNick = G.id("EQQ_MyNick");
		this.EQQ_MyState = G.id("EQQ_MyState");
		this.EQQ_MyStateShow = G.id("EQQ_MyStateShow");
		this.EQQ_MyState.title = "鏇存敼鍦ㄧ嚎鐘舵€�";
		E.on(this.EQQ_MyState, "click", A);
		this.EQQ_MySignature = G.id("EQQ_MySignature");
		this.EQQ_YellowTips = G.id("EQQ_YellowTips");
		E.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);
		this.EQQ_LoginSuccess = G.id("EQQ_LoginSuccess");
		this.EQQ_SearchBar = G.id("EQQ_SearchBar");
		this.EQQ_SearchBox = G.id("EQQ_SearchBox");
		this.EQQ_SearchButton = G.id("EQQ_SearchButton");
		this.EQQ_SearchResultPanel = G.id("EQQ_SearchResultPanel");
		E.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
		E.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
		E.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
		E.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
		E.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
		E.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
		E.on(this.EQQ_SearchBox, "click", n.bind(this.startSearch, this));
		E.on(this.EQQ_SearchButton, "click", n.bind(function() {
							if (m) {
								L.hideSearchResult();
								E.notifyObservers(L, "StartChat", m.uin);
								pgvSendClick({
											hottag : "web2qq.qqpanel.searchcontacts"
										});
							}
						}, this));
		this.EQQ_Logining = G.id("EQQ_Logining");
		this.EQQ_Logining_feedback = G.id("EQQ_Logining_feedback");
		this.EQQ_ReLoginPanel = G.id("EQQ_ReLoginPanel");
		this.EQQ_ReLoginButton = G.id("EQQ_ReLoginButton");
		this.EQQ_ReLoginButton_text = G.id("EQQ_ReLoginButton_text");
		E.on(this.EQQ_ReLoginButton, "click", this.onReLoginButtonClick);
		this.EQQ_TabBuddyList = G.id("EQQ_TabBuddyList");
		this.EQQ_TabGroupList = G.id("EQQ_TabGroupList");
		this.EQQ_TabRecentList = G.id("EQQ_TabRecentList");
		this.EQQ_ListContainer = G.id("EQQ_ListContainer");
		this.EQQ_buddyListPanel = G.id("EQQ_buddyListPanel");
		this.EQQ_groupListOuter = G.id("EQQ_groupListOuter");
		if (n.platform.iPad) {
			new n.ui.TouchScroller(this.EQQ_buddyListPanel);
		}
		this.EQQ_buddyList = G.id("EQQ_buddyList");
		E.on(this.EQQ_buddyList, "mousedown", ap);
		E.on(this.EQQ_buddyListPanel, "scroll", ak);
		this.EQQ_createGroupButton = G.id("EQQ_createGroupButton");
		this.EQQ_searchGroupButton = G.id("EQQ_searchGroupButton");
		E.on(this.EQQ_createGroupButton, "click",
				qqweb.util.observer.openInWebBrowser);
		E.on(this.EQQ_createGroupButton, "click", function() {
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.QUN.CREATE"
							});
				});
		E.on(this.EQQ_searchGroupButton, "click",
				qqweb.util.observer.openInWebBrowser);
		E.on(this.EQQ_searchGroupButton, "click", function() {
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.QUN.QUNSEEK"
							});
				});
		this.EQQ_ListBottom_maskButton = G.id("EQQ_ListBottom_maskButton");
		E.on(this.EQQ_ListBottom_maskButton, "click", T);
		this.EQQ_groupListPanel = G.id("EQQ_groupListPanel");
		this.EQQ_groupListInner = G.id("EQQ_groupListInner");
		if (n.platform.iPad) {
			new n.ui.TouchScroller(this.EQQ_groupListInner.parentNode);
		}
		E.on(this.EQQ_groupListInner, "mousedown", ap);
		this.EQQ_recentListPanel = G.id("EQQ_recentListPanel");
		if (n.platform.iPad) {
			new n.ui.TouchScroller(this.EQQ_recentListPanel);
		}
		this.EQQ_recentList = G.id("EQQ_recentList");
		E.on(this.EQQ_recentList, "mousedown", ap);
		this.EQQ_findBuddy = G.id("EQQ_findBuddy");
		this.EQQ_buddyManage = G.id("EQQ_buddyManage");
		E.on(this.EQQ_findBuddy, "click", function(J) {
					J.preventDefault();
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.CONTACTS.SEEK"
							});
					qqweb.portal.runApp("buddyFinder", {});
				});
		E.on(this.EQQ_buddyManage, "click", function(J) {
					J.preventDefault();
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.CONTACTS.MANAGE"
							});
					qqweb.portal.runApp("5", {});
				});
		this.mainTab = new n.ui.Tab();
		this.mainTab.add({
					trigger : this.EQQ_TabBuddyList,
					sheet : this.EQQ_buddyListPanel
				});
		this.mainTab.add({
					trigger : this.EQQ_TabGroupList,
					sheet : this.EQQ_groupListPanel
				});
		this.mainTab.add({
					trigger : this.EQQ_TabRecentList,
					sheet : this.EQQ_recentListPanel
				});
		this.mainTab.config.triggerEvent = "click";
		this.mainTab.config.slideEnabled = false;
		this.mainTab.init();
		E.addObserver(this.mainTab, "show", function(aq) {
					var J = this.indexOf(aq);
					switch (J) {
						case 0 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"
									});
							break;
						case 1 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.QUN.QUNLIST"
									});
							break;
						case 2 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.RECENT.RECENTLIST"
									});
							break;
					}
				});
		this.onWindowResize();
		G.show(this.EQQ_MyState);
	};
	this.createStatePanelDom = function() {
		var aq = G.node("ul", {
					id : "EQQ_StatePanel",
					"class" : "EQQ_statePanel"
				});
		p.appendChild(aq);
		this.statePanel = new qqweb.layout.PopupBox({
			noCatchMouseUp : true,
			container : aq,
			html : '					<li class="EQQ_statePanel_li" id="EQQ_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">鎴戝湪绾夸笂</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">绂诲紑</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">闅愯韩</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetOffline" state="offline"><div class="EQQ_stateSelect_icon EQQ_offline"></div><div class="EQQ_stateSelect_text">绂荤嚎</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetCallme" state="callme"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q鎴戝惂</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetBusy" state="busy"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">蹇欑</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetSilent" state="silent"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">璇峰嬁鎵撴壈</div></li>'
		});
		E.addObserver(this.statePanel, "hide", aj);
		E.addObserver(this.statePanel, "show", Z);
		this.EQQ_SetOnline = G.id("EQQ_SetOnline");
		this.EQQ_SetCallme = G.id("EQQ_SetCallme");
		this.EQQ_SetAway = G.id("EQQ_SetAway");
		this.EQQ_SetBusy = G.id("EQQ_SetBusy");
		this.EQQ_SetSilent = G.id("EQQ_SetSilent");
		this.EQQ_SetHidden = G.id("EQQ_SetHidden");
		this.EQQ_SetOffline = G.id("EQQ_SetOffline");
		var J = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway,
				this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden,
				this.EQQ_SetOffline];
		n.array.forEach(J, function(au, at, ar) {
					E.on(au, "mouseover", ao);
				});
		n.array.forEach(J, function(au, at, ar) {
					E.on(au, "mouseout", t);
				});
		n.array.forEach(J, function(au, at, ar) {
					E.on(au, "click", y);
				});
	};
	this.createGroupMaskPanelDom = function() {
		var J = G.node("div", {
					"class" : "groupMaskPanel"
				});
		p.appendChild(J);
		L.groupMaskPanel = new qqweb.layout.PopupBox({
			container : J,
			html : ' <a id="GroupMask_Costom" state="0" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>浣跨敤缇よ嚜韬殑娑堟伅璁剧疆</a>					<a id="GroupMask_Prompt" state="1" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢鎺ユ敹骞舵彁绀烘秷鎭�</a>					<a id="GroupMask_NoPrompt" state="2" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢鎺ユ敹涓嶆彁绀烘秷鎭�</a>					<a id="GroupMask_Mask" state="3" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢瀹屽叏闃绘缇ゆ秷鎭�</a>'
		});
		this.costomDom = G.id("GroupMask_Costom");
		this.promptDom = G.id("GroupMask_Prompt");
		this.noPromptDom = G.id("GroupMask_NoPrompt");
		this.maskDom = G.id("GroupMask_Mask");
		var aq = [this.costomDom, this.promptDom, this.noPromptDom,
				this.maskDom];
		n.array.forEach(aq, function(au, at, ar) {
					E.on(au, "click", i);
				});
		this.setGroupMaskState(K);
	};
	var i = function(aq) {
		aq.preventDefault();
		var J = parseInt(this.getAttribute("state"));
		K = J;
		L.setGroupMaskState(K);
		E.notifyObservers(L, "SetGroupMaskState", J);
		switch (J) {
			case "0" :
			case 0 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.QUNSELF"
						});
				break;
			case "1" :
			case 1 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHALERTS"
						});
				break;
			case "2" :
			case 2 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHOUTALERTS"
						});
				break;
			case "3" :
			case 3 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.BLOCK"
						});
				break;
		}
	};
	this.setGroupMaskState = function(J) {
		G.removeClass(this.costomDom, "simpleMenuItemSelected");
		G.removeClass(this.promptDom, "simpleMenuItemSelected");
		G.removeClass(this.noPromptDom, "simpleMenuItemSelected");
		G.removeClass(this.maskDom, "simpleMenuItemSelected");
		J = parseInt(J);
		switch (J) {
			case 0 :
				G.addClass(this.costomDom, "simpleMenuItemSelected");
				break;
			case 1 :
				G.addClass(this.promptDom, "simpleMenuItemSelected");
				break;
			case 2 :
				G.addClass(this.noPromptDom, "simpleMenuItemSelected");
				break;
			case 3 :
				G.addClass(this.maskDom, "simpleMenuItemSelected");
				break;
		}
	};
	this.setGroupListMaskState = function(aq, at) {
		var J = G.id("EQQ_GroupList_State_" + aq);
		var ar = G.id("EQQ_RecentList_State_" + aq);
		if (!at) {
			if (J) {
				G.addClass(J, "EQQ_GroupMask_State");
			}
			if (ar) {
				G.addClass(ar, "EQQ_GroupMask_State");
			}
		} else {
			if (J) {
				G.removeClass(J, "EQQ_GroupMask_State");
			}
			if (ar) {
				G.removeClass(ar, "EQQ_GroupMask_State");
			}
		}
	};
	var T = function(aq) {
		aq.stopPropagation();
		var J = G.getClientXY(L.EQQ_ListBottom_maskButton);
		L.toggleGroupMaskStatePanel(J);
	};
	this.toggleGroupMaskStatePanel = function(J) {
		if (this.groupMaskPanel && this.groupMaskPanel.isShow()) {
			this.hideGroupMaskStatePanel();
		} else {
			this.showGroupMaskStatePanel(J);
		}
	};
	this.showGroupMaskStatePanel = function(au) {
		if (this.groupMaskPanel) {
		} else {
			this.createGroupMaskPanelDom();
		}
		if (au) {
			var at = this.groupMaskPanel.getWidth();
			var aq = this.groupMaskPanel.getHeight();
			var av = qqweb.layout.getClientWidth();
			var ar = qqweb.layout.getClientHeight();
			var J = au[0], aw = au[1] - 100;
			if (J < 2) {
				J = 2;
			}
			if (aw < 2) {
				aw = 2;
			}
			if (J > av - at - 2) {
				J = av - at - 2;
			}
			if (aw > ar - aq - 2) {
				aw = ar - aq - 2;
			}
			this.groupMaskPanel.setXY(J, aw);
		}
		this.groupMaskPanel.show();
	};
	this.hideGroupMaskStatePanel = function() {
		if (this.groupMaskPanel) {
			this.groupMaskPanel.hide();
		}
	};
	this.createMiniCardPanelDom = function() {
		var aA = G.node("div", {
					id : "miniCard",
					"class" : "panel_1"
				});
		aA.innerHTML = '			<div class="panel_1_outer">				<div class="panel_1_inner">					<div class="panel_1_container">						<div id="panel_1_center" class="panel_1 panel_1_center"></div>						<div id="panel_1_t" class="panel_1 panel_1_t"></div>						<div id="panel_1_rt" class="panel_1 panel_1_rt"></div>						<div id="panel_1_r" class="panel_1 panel_1_r"></div>						<div id="panel_1_rb" class="panel_1 panel_1_rb"></div>						<div id="panel_1_b" class="panel_1 panel_1_b"></div>						<div id="panel_1_lb" class="panel_1 panel_1_lb"></div>						<div id="panel_1_l" class="panel_1 panel_1_l"></div>						<div id="panel_1_lt" class="panel_1 panel_1_lt"></div>					</div>					<div id="miniCardBody" class="panel_1_content">						<img id="miniCard_avatar" class="miniCard_avatar" />						<div class="miniCard_name">							<div id="miniCard_name_inner" class="miniCard_name_inner"></div>						</div>						<div id="miniCard_signature" class="miniCard_signature">							<div id="miniCard_signature_inner" class="miniCard_signature_inner"></div>						</div>						<div id="miniCard_clientType_innerWrapper" class ="miniCard_clientType_innerWrapper"><div class ="miniCard_clientTypeIcon"></div><div id="miniCard_clientType_inner" class="miniCard_clientType_inner"></div></div>						<div id="miniCard_level" class="miniCard_level"></div>						<div id="miniCard_level_upinfo" class="miniCard_level_upinfo"></div>						<div id="miniCard_quickLink" class="miniCard_quickLink">							<a id="miniCard_qzone" class="miniCard_qzone" type="qzone" title="璁块棶QQ绌洪棿" hidefocus target="_blank" href="###"></a>							<a id="miniCard_qmail" class="miniCard_qmail" type="qmail" title="鍙戦€侀偖浠�" hidefocus target="_blank" href="###"></a>						</div>						<div id="miniCard_buddyOption_tabHead" class="buddyOption_tabHead">							<div id="miniCard_userDetails" class="buddyOption_tabHead_div">璇︾粏璧勬枡</div>						</div>						<div id="miniCard_buddyOption_tabBody" class="buddyOption_tabBody">						</div>					</div>				</div>			</div>';
		p.appendChild(aA);
		var av = G.id("miniCard_avatar");
		var aB = G.id("miniCard_name_inner");
		var ay = G.id("miniCard_signature");
		var J = G.id("miniCard_signature_inner");
		var ax = G.id("miniCard_clientType_inner");
		var az = G.id("miniCard_clientType_innerWrapper");
		var au = G.id("miniCard_level");
		var aw = G.id("miniCard_level_upinfo");
		var aq = G.id("miniCard_qzone");
		var ar = G.id("miniCard_qmail");
		var at = G.id("miniCard_userDetails");
		E.on(aA, "mouseover", U);
		E.on(aA, "mouseout", I);
		E.on(at, "click", s);
		E.on(aq, "click", ac);
		E.on(ar, "click", Y);
		this.miniCardPanel = new qqweb.layout.Panel({
					container : aA,
					body : G.id("miniCardBody"),
					html : ""
				});
		this.miniCardPanel.setInfo = function(aC) {
			this.uin = aC.uin;
			var aD = aC.uin == qqweb.portal.self.uin;
			av.src = EQQ.getUserDefaultAvatar();
			av.src = aC.avatarUrl;
			if (aD) {
				at.innerHTML = "淇敼璧勬枡";
				av.src = qqweb.util.getUserAvatar(aC.uin, 1) + "&t="
						+ (new Date()).getTime();
			} else {
				at.innerHTML = "璇︾粏璧勬枡";
			}
			aB.innerHTML = aC.htmlAllName;
			aB.title = (aC.allName);
			J.innerHTML = "";
			au.innerHTML = "";
			aw.innerHTML = "";
			aq.href = EQQ.getQzoneUrl(aC.uin);
			ar.href = EQQ.getSendMailUrl(aC.uin);
			if (aD || aC.clientType == "1" || aC.clientType == "10000"
					|| aC.type == "stranger" || !aC.clientType) {
				az.className = "miniCard_clientType_innerWrapper";
				ay.style.display = "block";
			} else {
				az.className = "miniCard_clientType_"
						+ EQQ.hash.clientType[aC.clientType || "10000"];
				ax.innerHTML = EQQ.hash.clientTypeText[aC.clientType || "10000"]
						+ "鐧诲綍涓�";
				ay.style.display = "none";
			}
			E.notifyObservers(L, "MiniCardShow", aC);
		};
		this.miniCardPanel.setSignature = function(aC) {
			J.innerHTML = aC.htmlSignature;
			J.title = (aC.signature);
		};
		this.miniCardPanel.setClientType = function(aC) {
			if (this.uin == aC.uin) {
				if (aC.clientType == "1") {
					az.className = "miniCard_clientType_"
							+ EQQ.hash.clientType[aC.clientType || "10000"];
					ax.innerHTML = EQQ.hash.clientTypeText[aC.clientType
							|| "10000"]
							+ "鐧诲綍涓�";
					ay.style.display = "none";
				} else {
					az.className = "miniCard_clientType_innerWrapper";
					ay.style.display = "block";
				}
			}
		};
		this.miniCardPanel.setQQLevel = function(aE) {
			var aK = aE.level;
			var aC = aK.level;
			var aJ = parseInt(aC / 64), aI = parseInt((aC % 64) / 16), aD = parseInt(((aC % 64) % 16)
					/ 4), aH = ((aC % 64) % 16) % 4, aG = "";
			for (var aF = 0; aF < aJ; aF++) {
				aG += '<div class="miniCard_level_div qqLevel_queen"></div>';
			}
			for (var aF = 0; aF < aI; aF++) {
				aG += '<div class="miniCard_level_div qqLevel_sun"></div>';
			}
			for (var aF = 0; aF < aD; aF++) {
				aG += '<div class="miniCard_level_div qqLevel_moon"></div>';
			}
			for (var aF = 0; aF < aH; aF++) {
				aG += '<div class="miniCard_level_div qqLevel_star"></div>';
			}
			au.innerHTML = aG;
			au.title = "绛夌骇: " + aC;
			if (aE.uin == qqweb.portal.self.uin) {
				aw.innerHTML = '<div class="miniCard_level_upinfo_div" title="娲昏穬澶╂暟锛�'
						+ aK.days
						+ '"><span class="icon days"></span>'
						+ aK.days
						+ '澶�</div><div class="miniCard_level_upinfo_div" title="璺濆崌绾у埌'
						+ (aC + 1)
						+ "绾ц繕鏈�"
						+ aK.remainDays
						+ '澶�"><span class="icon remainDays"></span>'
						+ aK.remainDays + "澶�</div>";
			}
		};
	};
	this.showMiniCardPanel = function(J, ay) {
		if (this.miniCardPanel) {
		} else {
			this.createMiniCardPanelDom();
		}
		if (ay) {
			var aq = this.miniCardPanel.getWidth() + 10;
			var ax = this.miniCardPanel.getHeight() + 10;
			var aw = qqweb.layout.getClientWidth();
			var at = qqweb.layout.getClientHeight();
			var av = ay[0], au = ay[1];
			if (av < 2) {
				av = 2;
			}
			if (au < 2) {
				au = 2;
			}
			if (av > aw - aq - 2) {
				av = aw - aq - 2;
			}
			if (au > at - ax - 2) {
				au = at - ax - 2;
			}
			this.miniCardPanel.setXY(av, au);
		}
		var ar = EQQ.Model.BuddyList.getUserByUin(J);
		this.miniCardPanel.setInfo(ar, J);
		this.miniCardPanel.show();
	};
	this.hideMiniCardPanel = function() {
		if (this.miniCardPanel) {
			var J = G.id("miniCard_buddyOption_tabBody");
			G.setStyle(J, "display", "none");
			this.miniCardPanel.hide();
		}
	};
	this.setNoneFlashStyle = function() {
		G.addClass(this.EQQ_buddyList, "EQQ_buddyList_noneFlash");
	};
	this.createDom = function(aq) {
		var J = G.node("div", {
					id : "EQQ_MainPanel"
				});
		J.innerHTML = '				<div class="EQQ_title">					<div id="EQQ_PinDownButton" class="EQQ_PinDownButton" title="閽変綇/鏀惰捣">閽変綇/鏀惰捣</div>					<div id="EQQ_CloseButton" class="EQQ_CloseButton" title="闅愯棌濂藉弸鍒楄〃">鏈€灏忓寲</div>					<div id="EQQ_MinButton" class="EQQ_MinButton" title="璁剧疆">璁剧疆</div>					<a class="EQQ_FeedbackButton2" href="http://support.qq.com/portal/discuss_pdt/420_1.html" target="_blank">鍙嶉</a>					<div id="EQQ_SettingButton" class="EQQ_settingButton" title="璁剧疆WebQQ">						<div class="EQQ_settingButtonIcon">涓�</div>						<div>璁剧疆</div>					</div>					<div class="EQQ_titleText" href="#" target="_blank" title="鑱旂郴浜�">鑱旂郴浜�</div>					<div class="EQQ_betaText" title="1.0.10.12"></div>				</div>				<div id="EQQ_YellowTips" class="EQQ_YellowTips">					<div id="EQQ_YellowTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="鍏抽棴鎻愮ず">X</div>					<a class="EQQ_YellowTips_Link" href="http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG" target="_blank">閭€璇峰弬涓嶹ebQQ鐢ㄦ埛璋冩煡</a>				</div>				<div id="EQQ_LoginSuccess">					<div id="EQQ_SearchBar" class="EQQ_SearchBar">						<input id="EQQ_SearchBox" class="EQQ_SearchBox" name="" type="text" value="鎼滅储濂藉弸..." title="鎼滅储濂藉弸..." />						<div id="EQQ_SearchButton" class="EQQ_SearchButton" title="鎼滅储...">鎼滅储鎸夐挳</div>					</div>					<div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel-1">						<div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>						<div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>						<div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>					</div>					<ul class="EQQ_tab">						<li id="EQQ_TabBuddyList" class="EQQ_tabBuddyList" title="鑱旂郴浜�"><div class="EQQ_tabBuddyList_icon"></div></li>						<li id="EQQ_TabGroupList" class="EQQ_tabGroupList" title="缇ゅ垪琛�"><div class="EQQ_tabGroupList_icon"></div></li>						<li id="EQQ_TabRecentList" class="EQQ_tabRecentList" title="鏈€杩戣仈绯讳汉"><div class="EQQ_tabRecentList_icon"></div></li>					</ul>					<div id="EQQ_ListContainer">						<div id="EQQ_buddyListPanel" class="EQQ_buddyListPanel">							<div id="EQQ_buddyList" class="EQQ_buddyList">							</div>							<div class="EQQ_ListBottom">								<a href="" id="EQQ_findBuddy" class="searchBuddy" target="_blank"><div class="searchBuddy_div"></div>鏌ユ壘</a>								<a href="" id="EQQ_buddyManage" class="buddy_manage_icon" target="_blank"><div class="buddy_manage_icon_div"></div>绠＄悊</a>							</div>						</div>						<div id="EQQ_groupListPanel" class="EQQ_groupListPanel"><div id="EQQ_groupListOuter" class="EQQ_groupListOuter"><div id="EQQ_groupListInner" class="EQQ_groupListInner"></div></div>							<div class="EQQ_ListBottom">								<a id="EQQ_createGroupButton" class="createGroup" href="http://qun.qq.com/air/create" target="_blank" title="鍒涘缓缇�"><div class="createGroup_div"></div>鍒涘缓</a>								<a id="EQQ_searchGroupButton" class="searchGroup" href="http://qun.qq.com/air/search" target="_blank" title="鏌ユ壘缇�"><div class="searchGroup_div"></div>鏌ユ壘</a>								<div id="EQQ_ListBottom_maskButton"><div></div>缇ゅ睆钄�</div>							</div>						</div>						<div id="EQQ_recentListPanel" class="EQQ_recentListPanel"><div id="EQQ_recentList" class="EQQ_recentList"></div></div>					</div>				</div>				<div style="height:1000px;width:1000px;">					<div id="EQQ_Logining">鍙戣捣杩炴帴...</div>				</div>				<div id="EQQ_Logining_feedback"><a href="http://support.qq.com/write.shtml?guest=1&fid=513" target="_blank">					<span class="warnning_yellow">&nbsp;</span>鍙嶉鐧诲綍寤鸿</a></div>				<div id="EQQ_ReLoginPanel">					<div style="display:inline;" id="EQQ_ReLoginButton_text">鐧诲綍澶辫触</div>锛�<span id="EQQ_ReLoginButton">閲嶈瘯</span>				</div>';
		aq.innerHTML = "";
		aq.appendChild(J);
		G.setClass(J, "EQQ_mainPanel");
	};
	this.onYellowTipsClick = function() {
		L.hideYellowTips();
		E.notifyObservers(L, "CloseYellowTipsFinish");
	};
	this.showYellowTips = function() {
		b = b + z;
		this.onWindowResize();
		G.show(this.EQQ_YellowTips);
	};
	this.hideYellowTips = function() {
		G.hide(this.EQQ_YellowTips);
		b = b - z;
		this.onWindowResize();
	};
	this.onEqqResize = function(at) {
		var J = 5;
		var aq = at.height;
		var ar = aq - w;
		if (ar < J) {
			ar = J;
		}
		G.setStyle(this.EQQ_ListContainer, "height", (ar - J) + "px");
		G.setStyle(this.EQQ_buddyListPanel, "height", (ar - J - 25) + "px");
		G.setStyle(this.EQQ_groupListOuter, "height", (ar - J - 25) + "px");
		C();
	};
	this.onWindowResize = function(J) {
	};
	this.onSearchBoxMouseover = function() {
		G.setClass(this, "EQQ_SearchBoxHover");
	};
	this.onSearchBoxMouseout = function() {
		G.setClass(this, "EQQ_SearchBox");
	};
	this.onSearchBoxFocus = function() {
		E.off(L.EQQ_SearchBox, "mouseover", L.onSearchBoxMouseover);
		E.off(L.EQQ_SearchBox, "mouseout", L.onSearchBoxMouseout);
		G.setClass(this, "EQQ_SearchBoxFocus");
		L.clearSearchBox(this);
		this.select();
		L.startSearch();
	};
	this.onSearchBoxBlur = function() {
		E.on(L.EQQ_SearchBox, "mouseover", L.onSearchBoxMouseover);
		E.on(L.EQQ_SearchBox, "mouseout", L.onSearchBoxMouseout);
		G.setClass(this, "EQQ_SearchBox");
		L.resetSearchBox(this);
	};
	this.resetSearchBox = function(J) {
		if (J.value == "") {
			J.value = "鎼滅储濂藉弸...";
		}
	};
	this.clearSearchBox = function(J) {
		if (n.string.trim(J.value) == "鎼滅储濂藉弸...") {
			J.value = "";
		}
	};
	this.onSearchButtonClick = function() {
		L.startSearch();
	};
	this.onSearchBoxKeyup = function(J) {
		if (!L.EQQ_SearchBox.value) {
			L.hideSearchResult();
			return;
		}
		if (J.keyCode != ad && J.keyCode != F) {
			L.startSearch();
		}
	};
	this.onSearchBoxKeydown = function(aq) {
		switch (aq.keyCode) {
			case O :
				if (m) {
					aq.preventDefault();
					L.hideSearchResult();
					E.notifyObservers(L, "StartChat", m.uin);
					pgvSendClick({
								hottag : "web2qq.qqpanel.searchcontacts"
							});
				}
				break;
			case ad :
				if (H > 0) {
					var J = G.id("EQQ_SearchResultItem_" + m.uin);
					G.setStyle(J, "backgroundColor", "transparent");
					H--;
					m = S[H];
					J = G.id("EQQ_SearchResultItem_" + m.uin);
					if (J) {
						G.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			case F :
				if (H < S.length - 1) {
					var J = G.id("EQQ_SearchResultItem_" + m.uin);
					G.setStyle(J, "backgroundColor", "transparent");
					H++;
					m = S[H];
					J = G.id("EQQ_SearchResultItem_" + m.uin);
					if (J) {
						G.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			default :
				break;
		}
	};
	this.startSearch = function() {
		this.clearSearchBox(this.EQQ_SearchBox);
		var J = this.EQQ_SearchBox.value;
		E.notifyObservers(this, "Search", J);
	};
	this.showSearchResult = function(J) {
		if (this.EQQ_SearchBox.value) {
			S = J;
			var au = G.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
			G.setStyle(this.EQQ_SearchResultPanel, "left", au[0] + "px");
			G.setStyle(this.EQQ_SearchResultPanel, "top", (au[1] + 26) + "px");
			G.show(this.EQQ_SearchResultPanel);
			this.EQQ_SearchResultPanel.innerHTML = "";
			if (J.length == 0) {
				H = null;
				m = null;
				this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">娌℃湁鎵惧埌鐩稿叧濂藉弸</div>';
			} else {
				H = 0;
				m = J[0];
				for (var ar = 0; ar < J.length; ar++) {
					var aq = J[ar];
					var at = G.node("div");
					G.setClass(at, "EQQ_SearchResultItem");
					at.id = "EQQ_SearchResultItem_" + aq.uin;
					at.setAttribute("uin", aq.uin);
					at.innerHTML = aq.htmlAllName;
					at.title = (aq.allName);
					this.EQQ_SearchResultPanel.appendChild(at);
					if (ar == 0) {
						G.setStyle(at, "backgroundColor", "#cbe7fc");
					}
					E.on(at, "mouseover", this.onSearchResultMouseover);
					E.on(at, "mouseout", this.onSearchResultMouseout);
					E.on(at, "mousedown", this.onSearchResultClick);
				}
			}
			E.on(document, "mousedown", n.bind(this.hideSearchResult, this));
		}
	};
	this.hideSearchResult = function() {
		G.hide(this.EQQ_SearchResultPanel);
		E.off(document, "mousedown");
	};
	this.onSearchResultMouseover = function() {
		G.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	this.onSearchResultMouseout = function() {
		G.setStyle(this, "backgroundColor", "transparent");
	};
	this.onSearchResultClick = function() {
		var J = this.getAttribute("uin");
		L.hideSearchResult();
		E.notifyObservers(L, "StartChat", J);
		pgvSendClick({
					hottag : "web2qq.qqpanel.searchcontacts"
				});
	};
	this.show = function() {
		G.show(this.EQQ_MainPanel);
	};
	this.hide = function() {
		G.hide(this.EQQ_MainPanel);
	};
	this.updateSelfInfoChange = function(J) {
		this.EQQ_MyAvatar.src = EQQ.getUserAvatar(J.uin);
		this.EQQ_MyAvatar.title = "淇敼璧勬枡";
		this.EQQ_MyNick.innerHTML = J.htmlShowName;
		this.EQQ_MyNick.title = (J.showName + "<" + J.uin + ">");
	};
	this.updateSelfStateChange = function(J) {
		G.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + J);
		if (J === "offline") {
			G.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
		} else {
			G.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
		}
	};
	this.updateSelfSignatureChange = function(J) {
		if (J.signature) {
			this.EQQ_MySignature.innerHTML = J.htmlSignature;
			this.EQQ_MySignature.title = (J.signature);
		} else {
			this.EQQ_MySignature.innerHTML = "鏈変釜鎬э紝娌＄鍚�";
			this.EQQ_MySignature.title = "鏈変釜鎬э紝娌＄鍚�";
		}
	};
	this.createBuddyClass = function(aq) {
		d = aq;
		this.addOnlineBuddyClass();
		for (var J = 0; J < aq.length; J++) {
			this.addBuddyClass(aq[J]);
		}
		this.addStrangerBuddyClass();
		this.addBlackListBuddyClass();
	};
	this.addOnlineBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.online;
		J.name = "鍦ㄧ嚎濂藉弸";
		J.htmlName = n.string.toHtml(J.name);
		J.titleName = n.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	this.addStrangerBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.stranger;
		J.name = "闄岀敓浜�";
		J.htmlName = n.string.toHtml(J.name);
		J.titleName = n.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	this.addBlackListBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.blacklist;
		J.name = "榛戝悕鍗�";
		J.htmlName = n.string.toHtml(J.name);
		J.titleName = n.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	var am = function(aw) {
		var aq = aw.width;
		var J = W.length;
		for (; (--J) >= 0;) {
			var au = W[J].el = W[J].el
					|| G.id("EQQ_Class_" + W[J].index + "_className");
			var av = W[J].len;
			var at = W[J].html;
			var ar = W[J].html_short;
			if (aq <= 200) {
				au.innerHTML = ar;
			} else {
				if (aq > av + 20) {
					au.innerHTML = at;
				}
			}
		}
	};
	this.addBuddyClass = function(aq, av) {
		var ax, ay, ar;
		ax = G.node("div", {
					id : "EQQ_listClassHead_" + aq.index,
					classIndex : aq.index
				});
		if (aq.index == EQQ.hash.userClassType.online) {
			ay = '					<div class="EQQ_listClassHeadIcon">icon</div>					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">						<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%></div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]					</div>				';
		} else {
			ay = '					<div class="EQQ_listClassHeadIcon">icon</div>					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">						<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%>&nbsp;</div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]					</div>				';
		}
		aq.cut_htmlName = aq.htmlName;
		if (aq.caculateName) {
			var az = "[" + aq.onlineCount + "/" + (aq.count || 1) + "]";
			var aw = aq.caculateName + az;
			var J = x.getCharWidth(aw, 12);
			if (J > 120) {
				var au = {
					index : aq.index,
					len : J,
					html : aq.cut_htmlName
				};
				aq.cut_htmlName = '<div class="mainpanel_limit_class_width_outer"><div class="mainpanel_limit_class_width_inner">'
						+ aq.htmlName + "</div></div>...";
				au.html_short = aq.cut_htmlName;
				W.push(au);
			}
		}
		ar = n.string.template(ay, aq);
		ax.innerHTML = ar;
		if (av) {
			this.EQQ_buddyList.insertBefore(ax, av);
		} else {
			this.EQQ_buddyList.appendChild(ax);
		}
		E.on(ax, "click", an);
		var at = G.node("div", {
					id : "EQQ_listClassBody_" + aq.index,
					"class" : "EQQ_listClassBody"
				});
		ay = '				<div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>				<div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>				<div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>				<div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>				<div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>				<div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>			';
		ar = n.string.template(ay, aq);
		at.innerHTML = ar;
		this.EQQ_buddyList.insertBefore(at, ax.nextSibling);
		this.collapsedClass(aq.index);
	};
	this.hideLogin = function() {
		G.hide(this.EQQ_Logining);
		G.hide(this.EQQ_Logining_feedback);
		G.hide(this.EQQ_ReLoginPanel);
		G.show(this.EQQ_LoginSuccess);
		G.setStyle(this.EQQ_LoginSuccess, "height", "100%");
		var J = {
			height : EQQ.window.getBodySize().height,
			width : EQQ.window.getBodySize().width
		};
		this.onEqqResize(J);
		am(J);
	};
	this.showLogin = function() {
		this.EQQ_Logining.innerHTML = "鍙戣捣杩炴帴...";
		G.show(this.EQQ_Logining);
		G.show(this.EQQ_Logining_feedback);
		G.hide(this.EQQ_ReLoginPanel);
		G.hide(this.EQQ_LoginSuccess);
		G.setStyle(this.EQQ_LoginSuccess, "height", "0px");
	};
	this.showPullData = function() {
		this.EQQ_Logining.innerHTML = "鎷夊彇鏁版嵁...";
	};
	this.clearBuddyList = function() {
		this.EQQ_buddyList.innerHTML = "";
	};
	this.createBuddyList = function(J) {
		n.timedChunk(J, this.addBuddy, this, false, function() {
					E.notifyObservers(L, "BuddyListReady");
				});
	};
	this.getClassExpandFlag = function(J) {
		return ae[J];
	};
	this.setClassExpandFlag = function(aq, J) {
		return ae[aq] = J;
	};
	this.getClassAvatarLoadFlag = function(J) {
		return ag[J];
	};
	this.setClassAvatarLoadFlag = function(aq, J) {
		return ag[aq] = J;
	};
	this.toggleClass = function(J) {
		if (ae[J]) {
			this.collapsedClass(J);
		} else {
			this.expandClass(J);
		}
	};
	this.collapsedClass = function(aq) {
		var J = G.id("EQQ_listClassHead_" + aq), ar = G.id("EQQ_listClassBody_"
				+ aq);
		if (aq == EQQ.hash.userClassType.online) {
			G.setClass(J, "EQQ_onlineClassHeadCollapsed");
			G.removeClass(J, "expand_online");
		} else {
			G.setClass(J, "EQQ_listClassHeadCollapsed");
			G.removeClass(J, "expand");
		}
		G.setStyle(ar, "height", "0");
		this.setClassExpandFlag(aq, false);
	};
	this.expandClass = function(aq) {
		var J = G.id("EQQ_listClassHead_" + aq), ar = G.id("EQQ_listClassBody_"
				+ aq);
		if (aq == EQQ.hash.userClassType.online) {
			G.setClass(J, "EQQ_onlineClassHeadExpand");
			G.addClass(J, "expand_online");
		} else {
			G.setClass(J, "EQQ_listClassHeadExpand");
			G.addClass(J, "expand");
		}
		G.setStyle(ar, "height", "auto");
		this.setClassExpandFlag(aq, true);
		n.out("index: " + aq);
		N();
	};
	var N = function() {
		l(L.EQQ_buddyListPanel);
	};
	var ak = function(J) {
		C();
	};
	var C = function(J) {
		if (ak.timer) {
			window.clearTimeout(ak.timer);
			ak.timer = null;
		}
		ak.timer = window.setTimeout(N, 500);
	};
	var l = function(at) {
		var aA = parseInt(G.getStyle(at, "height"), 10);
		var ar = at.scrollTop;
		var ay = G.getXY(at)[1];
		for (var av = 0; av < a.length;) {
			var au = a[av];
			var J = au.imgEl;
			var aq = au.uin;
			var aw = au.classId;
			var ax = G.getXY(J)[1];
			var az = ax - ay;
			n.out("imgTop1:" + az + "y2:" + ax);
			if (L.getClassExpandFlag(aw) && J && az > 0 && az < aA) {
				n.out("checkAndLoadAvatar & loadAvatar containerHeight: " + aA
						+ ", imgTop2:" + az);
				J.src = EQQ.getUserAvatar(au.uin);
				a.splice(av, 1);
			} else {
				av++;
			}
		}
	};
	this.addBuddy = function(ar) {
		if (ar) {
			var au = '					<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="'
					+ EQQ.hash.clientTypeText[ar.clientType || "PC"]
					+ '">						<div id="EQQ_BuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_'
					+ EQQ.hash.clientType[ar.clientType || "10000"]
					+ '"></div>					</div>					<div id="EQQ_BuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="'
					+ EQQ.hash.onlineStatusText[ar.state]
					+ '">						<img id="EQQ_BuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="'
					+ EQQ.CONST.EQQ_SERVER_URL
					+ 'style/images/avatar_default_20_20.gif" />						<div class="EQQ_BuddyList_State"></div>					</div>					<div id="EQQ_BuddyList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - '
					+ EQQ.hash.onlineStatusText[ar.state]
					+ '">						<div id="EQQ_BuddyList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>					</div>				';
			var at = n.string.template(au, ar);
			var J = G.id("EQQ_Class_" + ar.classId + "_" + ar.state);
			G.show(J);
			var aw = G.node("div", {
						id : "EQQ_Buddy_" + ar.uin,
						"class" : "EQQ_BuddyList_Buddy",
						uin : ar.uin
					});
			aw.innerHTML = at;
			J.appendChild(aw);
			E.on(aw, "mouseover", D);
			E.on(aw, "mouseout", M);
			E.on(aw, "click", function(ax) {
						ai.apply(this, [ax]);
						pgvSendClick({
									hottag : "web2qq.qqpanel.contacts.sendmsg"
								});
					});
			var aq = G.id("EQQ_BuddyList_AvatarContainer_" + ar.uin);
			E.on(aq, "mouseover", aa);
			E.on(aq, "mouseout", j);
			var av = G.id("EQQ_BuddyList_Avatar_" + ar.uin);
			if (this.getClassExpandFlag(ar.classId)) {
				n.out("addBuddy & loadAvatar");
				av.src = EQQ.getUserAvatar(ar.uin);
			} else {
				a.push({
							uin : ar.uin,
							imgEl : av,
							classId : ar.classId
						});
			}
		}
	};
	this.addOnlineBuddy = function(ar) {
		if (ar) {
			var ax = EQQ.hash.clientTypeText[ar.clientType || "pc"] === "PC"
					? ""
					: EQQ.hash.clientTypeText[ar.clientType || "pc"];
			var au = '					<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_OnlineBuddyList_ClientType_Title_<%=uin%>" title="'
					+ EQQ.hash.clientTypeText[ar.clientType]
					+ '">						<div id="EQQ_OnlineBuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_'
					+ EQQ.hash.clientType[ar.clientType || "10000"]
					+ '"></div>					</div>					<div id="EQQ_OnlineBuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="'
					+ EQQ.hash.onlineStatusText[ar.state]
					+ '">						<img id="EQQ_OnlineBuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="'
					+ EQQ.CONST.EQQ_SERVER_URL
					+ 'style/images/avatar_default_20_20.gif" />						<div class="EQQ_BuddyList_State"></div>					</div>					<div class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - '
					+ ax
					+ EQQ.hash.onlineStatusText[ar.state]
					+ '">						<div class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>					</div>				';
			var at = n.string.template(au, ar);
			var J = G.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_"
					+ ar.state);
			G.setStyle(J, "display", "block");
			var aw = G.node("div", {
						id : "EQQ_OnlineBuddy_" + ar.uin,
						uin : ar.uin
					});
			aw.innerHTML = at;
			J.appendChild(aw);
			E.on(aw, "mouseover", D);
			E.on(aw, "mouseout", M);
			E.on(aw, "click", function(ay) {
						ai.apply(this, [ay]);
						pgvSendClick({
									hottag : "web2qq.qqpanel.contacts.sendmsg"
								});
					});
			G.addClass(aw, "EQQ_BuddyList_Buddy");
			var aq = G.id("EQQ_OnlineBuddyList_AvatarContainer_" + ar.uin);
			E.on(aq, "mouseover", aa);
			E.on(aq, "mouseout", j);
			var av = G.id("EQQ_OnlineBuddyList_Avatar_" + ar.uin);
			if (this.getClassExpandFlag(EQQ.hash.userClassType.online)) {
				n.out("addOnlineBuddy & loadAvatar");
				av.src = EQQ.getUserAvatar(ar.uin);
			} else {
				a.push({
							uin : ar.uin,
							imgEl : av,
							classId : EQQ.hash.userClassType.online
						});
			}
		}
	};
	this.removeOnlineBuddy = function(J) {
		var ar = G.id("EQQ_OnlineBuddy_" + J.uin);
		if (ar) {
			E.off(ar);
			if (ar.parentNode) {
				var aq = ar.parentNode;
				aq.removeChild(ar);
			}
		}
	};
	this.updateOnlineBuddyClass = function(aq) {
		var J = aq.length;
		G.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_OnlineCounter").innerHTML = J;
	};
	this.jumpUp = function(aq) {
		P = true;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Buddy_" + aq[J]);
			if (ar) {
				G.addClass(ar, "EQQ_jumpUpInBuddyList");
			}
		}
	};
	this.jumpDown = function(aq) {
		P = false;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Buddy_" + aq[J]);
			if (ar) {
				G.removeClass(ar, "EQQ_jumpUpInBuddyList");
			}
		}
	};
	this.jumpAvatar = function(J) {
		if (P) {
			this.jumpDown(J);
		} else {
			this.jumpUp(J);
		}
	};
	this.flickerClassHide = function(ar) {
		g = true;
		for (var aq = 0; aq < ar.length; aq++) {
			var J = G.id("EQQ_listClassHead_" + ar[aq]);
			G.addClass(J, "EQQ_flickerHideInBuddyList");
		}
	};
	this.flickerClassShow = function(ar) {
		g = false;
		for (var aq = 0; aq < ar.length; aq++) {
			var J = G.id("EQQ_listClassHead_" + ar[aq]);
			G.removeClass(J, "EQQ_flickerHideInBuddyList");
		}
	};
	this.flickerClass = function(J) {
		if (g) {
			this.flickerClassShow(J);
		} else {
			this.flickerClassHide(J);
		}
	};
	this.groupJumpUp = function(aq) {
		q = true;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Group_" + aq[J]);
			if (ar) {
				G.addClass(ar, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.groupJumpDown = function(aq) {
		q = false;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Group_" + aq[J]);
			if (ar) {
				G.removeClass(ar, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.groupJumpAvatar = function(J) {
		if (q) {
			this.groupJumpDown(J);
		} else {
			this.groupJumpUp(J);
		}
	};
	this.recentJumpUp = function(aq) {
		af = true;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Recent_" + aq[J]);
			if (ar) {
				G.addClass(ar, "EQQ_jumpUpInBuddyList");
				G.addClass(ar, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.recentJumpDown = function(aq) {
		af = false;
		for (var J = 0; J < aq.length; J++) {
			var ar = G.id("EQQ_Recent_" + aq[J]);
			if (ar) {
				G.removeClass(ar, "EQQ_jumpUpInBuddyList");
				G.removeClass(ar, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.recentJumpAvatar = function(J) {
		if (af) {
			this.recentJumpDown(J);
		} else {
			this.recentJumpUp(J);
		}
	};
	this.moveBuddy = function(at) {
		var ax = G.id("EQQ_Buddy_" + at.uin);
		var aw = G.id("EQQ_Class_" + at.classId + "_" + at.state);
		if (aw && ax) {
			G.setStyle(aw, "display", "block");
			var av = ax.parentNode;
			aw.insertBefore(ax, aw.firstChild);
			var aq = G.id("EQQ_BuddyList_AvatarContainer_" + at.uin);
			var au = G.id("EQQ_BuddyList_RightContainer_" + at.uin);
			var ar = G.id("EQQ_RecentList_AvatarContainer_" + at.uin);
			var J = G.id("EQQ_RecentList_RightContainer_" + at.uin);
			if (aq) {
				aq.title = EQQ.hash.onlineStatusText[at.state];
			}
			if (au) {
				au.title = (at.allName + " - " + EQQ.hash.onlineStatusText[at.state]);
			}
			if (ar) {
				ar.title = EQQ.hash.onlineStatusText[at.state];
			}
			if (J) {
				J.title = (at.allName + " - " + EQQ.hash.onlineStatusText[at.state]);
			}
			if (av.childNodes.length == 0) {
				G.setStyle(av, "display", "none");
			}
		}
	};
	this.moveOnlineBuddy = function(J) {
		var at = G.id("EQQ_OnlineBuddy_" + J.uin);
		var ar = G.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_"
				+ J.state);
		if (ar && at) {
			G.setStyle(ar, "display", "block");
			var aq = at.parentNode;
			ar.insertBefore(at, ar.firstChild);
			if (aq.childNodes.length == 0) {
				G.setStyle(aq, "display", "none");
			}
		}
	};
	this.updateClientType = function(aq) {
		var at = EQQ.hash.clientType[aq.clientType];
		var ar = EQQ.hash.clientTypeText[aq.clientType || "PC"];
		var J = G.id("EQQ_BuddyList_ClientType_" + aq.uin) || {};
		var au = G.id("EQQ_BuddyList_ClientType_Title_" + aq.uin) || {};
		J.className = "EQQ_BuddyList_ClientType_" + at;
		au.title = ar;
		J = G.id("EQQ_OnlineBuddyList_ClientType_" + aq.uin) || {};
		au = G.id("EQQ_OnlineBuddyList_ClientType_Title_" + aq.uin) || {};
		J.className = "EQQ_BuddyList_ClientType_" + at;
		au.title = ar;
	};
	this.updateBuddyClassOnlineBuddy = function(J) {
		G.id("EQQ_Class_" + J.index + "_OnlineCounter").innerHTML = J.onlineCount;
	};
	this.updateRecentState = function(aq) {
		var au = G.id("EQQ_Recent_" + aq.uin);
		if (au) {
			au.className = "";
			G.addClass(au, "EQQ_BuddyList_Buddy");
			G.addClass(au, "EQQ_" + EQQ.hash.onlineStatus[aq.state] + "Buddy");
			var at = EQQ.hash.clientType[aq.clientType];
			var ar = EQQ.hash.clientTypeText[aq.clientType || "PC"];
			var J = G.id("EQQ_RecentList_ClientType_" + aq.uin) || {};
			var av = G.id("EQQ_RecentList_ClientType_Title_" + aq.uin) || {};
			J.className = "EQQ_BuddyList_ClientType_" + at;
			av.title = ar;
		}
	};
	this.updateBuddyClassCount = function(J) {
		G.id("EQQ_Class_" + J.index + "_Counter").innerHTML = J.count;
	};
	this.updateStrangerClassOnlineCount = function(aq) {
		var J = G.id("EQQ_Class_" + EQQ.hash.userClassType.stranger
				+ "_OnlineCounter");
		J.innerHTML = aq;
	};
	this.updateStrangerClassCount = function(aq) {
		var J = aq.length;
		G.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_Counter").innerHTML = J;
	};
	this.setUserName = function(J) {
		var aq = J.uin;
		var at = G.id("EQQ_BuddyList_Nick_" + aq);
		var ar = G.id("EQQ_BuddyList_RightContainer_" + aq);
		if (at && ar) {
			at.innerHTML = J.htmlShowName;
			ar.title = (J.allName);
		}
	};
	this.setGroupMask = function(J) {
		K = J;
		switch (J) {
			case "0" :
			case 0 :
				G.id("EQQ_ListBottom_maskButton").className = "accept";
				G.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			case "1" :
			case 1 :
				G.id("EQQ_ListBottom_maskButton").className = "accept";
				G.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			case "2" :
			case 2 :
				G.id("EQQ_ListBottom_maskButton").className = "mask";
				G.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			case "3" :
			case 3 :
				G.id("EQQ_ListBottom_maskButton").className = "mask";
				G.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
		}
	};
	this.showReLoginPanel = function(J) {
		this.EQQ_ReLoginButton_text.innerHTML = J;
		G.hide(this.EQQ_Logining);
		G.hide(this.EQQ_Logining_feedback);
		G.show(this.EQQ_ReLoginPanel);
		G.hide(this.EQQ_LoginSuccess);
	};
	this.onReLoginButtonClick = function() {
		G.show(L.EQQ_Logining);
		G.show(L.EQQ_Logining_feedback);
		G.hide(L.EQQ_ReLoginPanel);
		G.hide(L.EQQ_LoginSuccess);
		E.notifyObservers(L, "ReLogin");
	};
	this.createGroupList = function(J) {
		this.EQQ_groupListInner.innerHTML = "";
		for (var aq = 0; aq < J.length; aq++) {
			this.addGroup(J[aq]);
		}
	};
	this.addGroup = function(ar) {
		var J = '				<div class="EQQ_GroupList_AvatarContainer" title="">					<img id="EQQ_GroupList_Avatar_'
				+ ar.gid
				+ '" class="EQQ_GroupList_Avatar" src="'
				+ EQQ.getGroupAvatar(ar.code)
				+ '" />					<div class="EQQ_GroupList_State" id="EQQ_GroupList_State_'
				+ ar.gid
				+ '" title="缇ゅ睆钄�"></div>				</div>				<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">					<div id="EQQ_GroupList_Name_'
				+ ar.gid
				+ '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>				</div>			';
		var aq = n.string.template(J, ar);
		var at = G.node("div", {
					id : "EQQ_Group_" + ar.gid,
					code : ar.code
				});
		at.innerHTML = aq;
		this.EQQ_groupListInner.appendChild(at);
		E.on(at, "mouseover", D);
		E.on(at, "mouseout", M);
		E.on(at, "click", function(au) {
					al.apply(this, [au]);
					pgvSendClick({
								hottag : "web2qq.qqpanel.qun.sendmsg"
							});
				});
		G.addClass(at, "EQQ_GroupList_Group");
	};
	this.updateGroupMarkName = function(aq) {
		var J = G.id("EQQ_GroupList_Name_" + aq.gid);
		if (J) {
			J.innerHTML = aq.htmlShowName;
		}
		J = G.id("EQQ_GroupRecentList_Name_" + aq.gid);
		if (J) {
			J.innerHTML = aq.htmlShowName;
		}
	};
	this.createRecentList = function(aq) {
		this.EQQ_recentList.innerHTML = "";
		for (var J = 0; J < aq.length; J++) {
			this.addRecent(aq[J]);
		}
	};
	this.addRecent = function(az) {
		if (az.content) {
			if (az.type == 0) {
				var at = az.content;
				var au = '						<div class="EQQ_RecentList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="'
						+ EQQ.hash.clientTypeText[at.clientType || "PC"]
						+ '">							<div id="EQQ_RecentList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_'
						+ EQQ.hash.clientType[at.clientType || "10000"]
						+ '"></div>						</div>						<div id="EQQ_RecentList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="'
						+ EQQ.hash.onlineStatusText[at.state]
						+ '">							<img id="EQQ_RecentList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="'
						+ EQQ.CONST.EQQ_SERVER_URL
						+ 'style/images/avatar_default_20_20.gif" />							<div class="EQQ_BuddyList_State"></div>						</div>						<div id="EQQ_RecentList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - '
						+ EQQ.hash.onlineStatusText[at.state]
						+ '">							<div id="EQQ_BuddyList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>						</div>					';
				var ar = n.string.template(au, at);
				var ay = G.node("div", {
							id : "EQQ_Recent_" + at.uin,
							uin : at.uin
						});
				ay.innerHTML = ar;
				this.EQQ_recentList.insertBefore(ay,
						this.EQQ_recentList.firstChild);
				E.on(ay, "mouseover", D);
				E.on(ay, "mouseout", M);
				E.on(ay, "click", function(aA) {
							ai.apply(this, [aA]);
							pgvSendClick({
										hottag : "web2qq.qqpanel.recent.sendC2Cmsg"
									});
						});
				var aw = G.id("EQQ_RecentList_AvatarContainer_" + at.uin);
				E.on(aw, "mouseover", aa);
				E.on(aw, "mouseout", j);
				G.addClass(ay, "EQQ_BuddyList_Buddy");
				G.addClass(ay, "EQQ_" + EQQ.hash.onlineStatus[at.state]
								+ "Buddy");
				var J = G.id("EQQ_RecentList_Avatar_" + at.uin);
				if (at.uin && J) {
					J.src = EQQ.getUserAvatar(at.uin);
				}
			} else {
				var av = az.content;
				var ax = '					<div class="EQQ_GroupList_AvatarContainer" title="">						<img id="EQQ_GroupList_Avatar_'
						+ av.gid
						+ '" class="EQQ_GroupList_Avatar" src="'
						+ EQQ.getGroupAvatar(av.code)
						+ '" />						<div class="EQQ_GroupList_State" id="EQQ_RecentList_State_'
						+ av.gid
						+ '" title="缇ゅ睆钄�"></div>					</div>					<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">						<div id="EQQ_GroupRecentList_Name_'
						+ av.gid
						+ '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>					</div>				';
				var ar = n.string.template(ax, av);
				var aq = G.node("div", {
							id : "EQQ_Recent_" + av.gid,
							code : av.code
						});
				aq.innerHTML = ar;
				this.EQQ_recentList.insertBefore(aq,
						this.EQQ_recentList.firstChild);
				E.on(aq, "mouseover", D);
				E.on(aq, "mouseout", M);
				E.on(aq, "click", function(aA) {
							al.apply(this, [aA]);
							pgvSendClick({
										hottag : "web2qq.qqpanel.recent.sendqunmsg"
									});
						});
				G.addClass(aq, "EQQ_GroupList_Group");
			}
		}
	};
	this.updateRecentByBuddy = function(J) {
		var aq = G.id("EQQ_Recent_" + J.uin);
		if (aq) {
			this.EQQ_recentList
					.insertBefore(aq, this.EQQ_recentList.firstChild);
		} else {
			this.addRecent({
						type : 0,
						content : J
					});
		}
	};
	this.updateRecentByGroup = function(J) {
		var aq = G.id("EQQ_Recent_" + J.gid);
		if (aq) {
			this.EQQ_recentList
					.insertBefore(aq, this.EQQ_recentList.firstChild);
		} else {
			this.addRecent({
						type : 1,
						content : J
					});
		}
	};
	this.setMode = function(J) {
		switch (J) {
			case "master" :
				c = V;
				G.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "鏇存敼鍦ㄧ嚎鐘舵€�";
				break;
			case "slave" :
				c = o;
				G.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "WebQQ鐜板湪澶勪簬杈呮ā寮忥紝璇蜂粠瀹㈡埛绔疩Q淇敼鎮ㄧ殑鍦ㄧ嚎鐘舵€併€�";
				break;
		}
	};
	this.toggleStatePanel = function(J) {
		if (this.statePanel && this.statePanel.isShow()) {
			this.hideStatePanel();
		} else {
			this.showStatePanel(J);
		}
	};
	this.showStatePanel = function(au) {
		if (G.id("EQQ_StatePanel")) {
		} else {
			this.createStatePanelDom();
		}
		if (au) {
			var at = this.statePanel.getWidth();
			var aq = this.statePanel.getHeight();
			var av = qqweb.layout.getClientWidth();
			var ar = qqweb.layout.getClientHeight();
			var J = au[0], aw = au[1];
			if (J < 2) {
				J = 2;
			}
			if (aw < 2) {
				aw = 2;
			}
			if (J > av - at - 2) {
				J = av - at - 2;
			}
			if (aw > ar - aq - 2) {
				aw = ar - aq - 2;
			}
			this.statePanel.setXY(J, aw);
		}
		this.statePanel.setTopZIndex();
		this.statePanel.show();
	};
	this.hideStatePanel = function() {
		if (this.statePanel) {
			this.statePanel.hide();
		}
	};
	this.setSelfState = function(J) {
		E.notifyObservers(this, "SelfStateChange", J);
		this.updateSelfStateChange(J);
	};
	this.removeGroup = function(au) {
		var at = EQQ.Model.BuddyList.getGroupByCode(au);
		var ar = at.gid;
		n.out(at);
		var av = G.id("EQQ_Group_" + ar);
		if (av) {
			E.off(av);
			if (av.parentNode) {
				var aq = av.parentNode;
				aq.removeChild(av);
			}
		}
		n.out(av);
		var J = G.id("EQQ_Recent_" + ar);
		if (J) {
			E.off(J);
			if (J.parentNode) {
				var aq = J.parentNode;
				aq.removeChild(J);
			}
		}
		n.out(J);
	};
});
Jet().$package("EQQ.View.MainPanelFlex", function(l) {
	var K = this, F = l.dom, D = l.event, w = l.string, e = false, i = false, O = false, o = false, ac = false, f = false, ab = {}, Y = [], a = [], ad = {}, G = 0, aa = 38, E = 40, N = 13, d, b = 160, v = 50, y = 20, I = "0", n = qqweb.layout
			.getPanel("desktop").body, A = null, k = null, R = null, p = null, Q = null, u = false, s = false;
	EQQ.avatarMouseoverTimer = null;
	var t = function() {
		if (A) {
			clearTimeout(A);
		}
		K.show();
	};
	var ae = function() {
		if (A) {
			clearTimeout(A);
		}
		A = setTimeout(function() {
					K.hide();
					A = null;
				}, 500);
	};
	var x = function() {
		var J = this.getAttribute("state");
		K.setSelfState(J);
		pgvSendClick({
					hottag : "web2qq.corner.topright." + J
				});
	};
	var ak = function() {
		F.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	var r = function() {
		F.setStyle(this, "backgroundColor", "transparent");
	};
	var ag = function() {
		F.removeClass(K.EQQ_MyState, "hover");
	};
	var W = function() {
		F.addClass(K.EQQ_MyState, "hover");
	};
	var m = function() {
	};
	var U = function(J) {
		K.toggleStatePanel(J);
	};
	var c = U;
	var z = function(am) {
		am.stopPropagation();
		var J = F.getClientXY(K.EQQ_MyState);
		J[1] = J[1] + 16;
		c(J);
		pgvSendClick({
					hottag : "web2qq.corner.topright.statechange"
				});
	};
	var aj = function(am) {
		var J = this.getAttribute("classIndex");
		K.toggleClass(J);
	};
	var C = function() {
		var J = this;
		if (p) {
			clearTimeout(p);
		}
		p = setTimeout(function() {
					if (Q) {
						F.setStyle(Q, "backgroundColor", "transparent");
					}
					F.setStyle(J, "backgroundColor", "#cbe7fc");
					Q = J;
				}, 100);
	};
	var L = function() {
	};
	var X = function() {
		var J = this.getAttribute("uin");
		if (EQQ.avatarMouseoverTimer) {
			clearTimeout(EQQ.avatarMouseoverTimer);
			EQQ.avatarMouseoverTimer = null;
		}
		var am = F.getClientXY(this);
		am[0] = am[0] - 218;
		am[1] = am[1] - 5;
		K.showMiniCardPanel(J, am);
		D.notifyObservers(K, "AvatarMouseover", J);
	};
	var h = function() {
		EQQ.avatarMouseoverTimer = window.setTimeout(P, 500);
	};
	this.onAvatarMouseover = function(J, am) {
		if (J && am) {
			if (EQQ.avatarMouseoverTimer) {
				clearTimeout(EQQ.avatarMouseoverTimer);
				EQQ.avatarMouseoverTimer = null;
			}
			var an = F.getClientXY(K.EQQ_buddyList);
			an[0] = an[0] - 218;
			an[1] = an[1] + am.y;
			K.showMiniCardPanel(J, an);
			D.notifyObservers(K, "AvatarMouseover", J);
		}
	};
	this.onFlexException = function() {
		l.out("Flex-Exception");
		var J = window.frames.iframe_fflist;
		K.flex = J.document.getElementById("fflist");
		u = true;
		D.notifyObservers(EQQ, "LoginFailure", {
					text : "鎷夊彇澶辫触"
				});
	};
	this.buddyListReady = function() {
		var J = window.frames.iframe_fflist;
		K.flex = J.document.getElementById("fflist");
		u = true;
		D.notifyObservers(K, "BuddyListReady");
	};
	this.onAvatarMouseout = function() {
		EQQ.avatarMouseoverTimer = window.setTimeout(P, 500);
	};
	var P = function() {
		K.hideMiniCardPanel();
	};
	var T = function() {
		if (EQQ.avatarMouseoverTimer) {
			clearTimeout(EQQ.avatarMouseoverTimer);
			EQQ.avatarMouseoverTimer = null;
		}
	};
	var H = function() {
		EQQ.avatarMouseoverTimer = window.setTimeout(P, 500);
	};
	var q = function() {
		qqweb.portal.runApp("userDetails", K.miniCardPanel.uin);
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.more"
				});
	};
	var Z = function(aq) {
		aq.preventDefault();
		var ap = 2;
		var J = this.getAttribute("href");
		var ao = /\d+/;
		var an = parseInt(J.match(ao)[0]);
		var am = this;
		qqweb.rpcService.sendGetFriendUin2(an, ap, function(ar) {
					account = ar.result.account;
					qqweb.portal.runApp("6", {
								url : J.replace(ao, account)
							});
				});
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.qzone"
				});
	};
	var V = function(aq) {
		aq.preventDefault();
		var ap = 3;
		var J = this.getAttribute("href");
		var ao = /\d+/;
		var an = parseInt(J.match(ao)[0]);
		var am = this;
		qqweb.rpcService.sendGetFriendUin2(an, ap, function(ar) {
					account = ar.result.account;
					qqweb.portal.runApp("6", {
								url : J.replace(ao, account)
							});
				});
		pgvSendClick({
					hottag : "web2qq.minicard.contacts.qqmail"
				});
	};
	var al = function(J) {
		J.stopPropagation();
	};
	this.onBuddyListClick = function(J) {
		D.notifyObservers(K, "StartChat", J);
	};
	var af = function(am) {
		am.preventDefault();
		am.stopPropagation();
		var J = this.getAttribute("uin");
		D.notifyObservers(K, "StartChat", J);
	};
	var ai = function() {
		var J = this.getAttribute("code");
		D.notifyObservers(K, "StartGroupChat", J);
	};
	this.init = function() {
		e = false, i = false, O = false, o = false, ac = false, f = false, ab = {}, Y = [], a = [], ad = {}, G = 0, A = null, k = null, R = null, p = null, Q = null, u = false, s = false;
		D.on(window, "resize", l.bind(this.onWindowResize, this));
		D.addObserver(EQQ.window, "resize", l.bind(this.onEqqResize, this));
		D.addObserver(qqweb.layout, "SideBarPinUp", l.bind(this.onWindowResize,
						this));
		D.addObserver(qqweb.layout, "SideBarPinDown", l.bind(
						this.onWindowResize, this));
		this.EQQ_Container = F.id("EQQ_Container");
		this.EQQ_MainPanel = F.id("EQQ_MainPanel");
		this.EQQ_MyPanel = F.id("EQQ_MyPanel");
		this.EQQ_MyAvatar = F.id("EQQ_MyAvatar");
		this.EQQ_MyNick = F.id("EQQ_MyNick");
		this.EQQ_MyState = F.id("EQQ_MyState");
		this.EQQ_MyStateShow = F.id("EQQ_MyStateShow");
		this.EQQ_MyState.title = "鏇存敼鍦ㄧ嚎鐘舵€�";
		D.on(this.EQQ_MyState, "click", z);
		F.show(this.EQQ_MyState);
		this.EQQ_MySignature = F.id("EQQ_MySignature");
		this.EQQ_YellowTips = F.id("EQQ_YellowTips");
		D.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);
		this.EQQ_LoginSuccess = F.id("EQQ_LoginSuccess");
		this.EQQ_SearchBar = F.id("EQQ_SearchBar");
		this.EQQ_SearchBox = F.id("EQQ_SearchBox");
		this.EQQ_SearchButton = F.id("EQQ_SearchButton");
		this.EQQ_SearchResultPanel = F.id("EQQ_SearchResultPanel");
		this.EQQ_SearchResultPanel_iframeWrap = F
				.id("EQQ_SearchResultPanel_iframeWrap");
		D.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
		D.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
		D.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
		D.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
		D.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
		D.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
		D.on(this.EQQ_SearchBox, "click", l.bind(this.startSearch, this));
		D.on(this.EQQ_SearchButton, "click", l.bind(function() {
							if (k) {
								K.hideSearchResult();
								D.notifyObservers(K, "StartChat", k.uin);
								pgvSendClick({
											hottag : "web2qq.qqpanel.searchcontacts"
										});
							}
						}, this));
		this.EQQ_Logining = F.id("EQQ_Logining");
		this.EQQ_Logining_feedback = F.id("EQQ_Logining_feedback");
		this.EQQ_ReLoginPanel = F.id("EQQ_ReLoginPanel");
		this.EQQ_ReLoginButton = F.id("EQQ_ReLoginButton");
		this.EQQ_ReLoginButton_text = F.id("EQQ_ReLoginButton_text");
		D.on(this.EQQ_ReLoginButton, "click", this.onReLoginButtonClick);
		this.EQQ_TabBuddyList = F.id("EQQ_TabBuddyList");
		this.EQQ_TabGroupList = F.id("EQQ_TabGroupList");
		this.EQQ_TabRecentList = F.id("EQQ_TabRecentList");
		this.EQQ_ListContainer = F.id("EQQ_ListContainer");
		this.EQQ_buddyListPanel = F.id("EQQ_buddyListPanel");
		this.EQQ_groupListOuter = F.id("EQQ_groupListOuter");
		this.EQQ_buddyList = F.id("EQQ_buddyList");
		D.on(this.EQQ_buddyList, "mousedown", al);
		this.EQQ_createGroupButton = F.id("EQQ_createGroupButton");
		this.EQQ_searchGroupButton = F.id("EQQ_searchGroupButton");
		D.on(this.EQQ_createGroupButton, "click",
				qqweb.util.observer.openInWebBrowser);
		D.on(this.EQQ_createGroupButton, "click", function() {
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.QUN.CREATE"
							});
				});
		D.on(this.EQQ_searchGroupButton, "click",
				qqweb.util.observer.openInWebBrowser);
		D.on(this.EQQ_searchGroupButton, "click", function() {
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.QUN.QUNSEEK"
							});
				});
		this.EQQ_ListBottom_maskButton = F.id("EQQ_ListBottom_maskButton");
		D.on(this.EQQ_ListBottom_maskButton, "click", S);
		this.EQQ_groupListPanel = F.id("EQQ_groupListPanel");
		this.EQQ_groupListInner = F.id("EQQ_groupListInner");
		D.on(this.EQQ_groupListInner, "mousedown", al);
		this.EQQ_recentListPanel = F.id("EQQ_recentListPanel");
		this.EQQ_recentList = F.id("EQQ_recentList");
		D.on(this.EQQ_recentList, "mousedown", al);
		this.EQQ_findBuddy = F.id("EQQ_findBuddy");
		this.EQQ_buddyManage = F.id("EQQ_buddyManage");
		D.on(this.EQQ_findBuddy, "click", function(J) {
					J.preventDefault();
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.CONTACTS.SEEK"
							});
					qqweb.portal.runApp("buddyFinder", {});
				});
		D.on(this.EQQ_buddyManage, "click", function(J) {
					J.preventDefault();
					pgvSendClick({
								hottag : "WEB2QQ.QQPANEL.CONTACTS.MANAGE"
							});
					qqweb.portal.runApp("5", {});
				});
		this.mainTab = new l.ui.Tab();
		this.mainTab.add({
					trigger : this.EQQ_TabBuddyList,
					sheet : this.EQQ_buddyListPanel
				});
		this.mainTab.add({
					trigger : this.EQQ_TabGroupList,
					sheet : this.EQQ_groupListPanel
				});
		this.mainTab.add({
					trigger : this.EQQ_TabRecentList,
					sheet : this.EQQ_recentListPanel
				});
		this.mainTab.config.triggerEvent = "click";
		this.mainTab.config.slideEnabled = false;
		this.mainTab.init();
		D.addObserver(this.mainTab, "show", function(am) {
					var J = this.indexOf(am);
					switch (J) {
						case 0 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"
									});
							break;
						case 1 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.QUN.QUNLIST"
									});
							break;
						case 2 :
							pgvSendClick({
										hottag : "WEB2QQ.QQPANEL.RECENT.RECENTLIST"
									});
							break;
					}
				});
		this.onWindowResize();
	};
	this.createStatePanelDom = function() {
		var am = F.node("ul", {
					id : "EQQ_StatePanel",
					"class" : "EQQ_statePanel"
				});
		n.appendChild(am);
		this.statePanel = new qqweb.layout.PopupBox({
			noCatchMouseUp : true,
			container : am,
			html : '					<li class="EQQ_statePanel_li" id="EQQ_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">鎴戝湪绾夸笂</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">绂诲紑</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">闅愯韩</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetOffline" state="offline"><div class="EQQ_stateSelect_icon EQQ_offline"></div><div class="EQQ_stateSelect_text">绂荤嚎</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetCallme" state="callme"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q鎴戝惂</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetBusy" state="busy"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">蹇欑</div></li>					<li class="EQQ_statePanel_li" id="EQQ_SetSilent" state="silent"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">璇峰嬁鎵撴壈</div></li>'
		});
		D.addObserver(this.statePanel, "hide", ag);
		D.addObserver(this.statePanel, "show", W);
		this.EQQ_SetOnline = F.id("EQQ_SetOnline");
		this.EQQ_SetCallme = F.id("EQQ_SetCallme");
		this.EQQ_SetAway = F.id("EQQ_SetAway");
		this.EQQ_SetBusy = F.id("EQQ_SetBusy");
		this.EQQ_SetSilent = F.id("EQQ_SetSilent");
		this.EQQ_SetHidden = F.id("EQQ_SetHidden");
		this.EQQ_SetOffline = F.id("EQQ_SetOffline");
		var J = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway,
				this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden,
				this.EQQ_SetOffline];
		l.array.forEach(J, function(ap, ao, an) {
					D.on(ap, "mouseover", ak);
				});
		l.array.forEach(J, function(ap, ao, an) {
					D.on(ap, "mouseout", r);
				});
		l.array.forEach(J, function(ap, ao, an) {
					D.on(ap, "click", x);
				});
	};
	this.createGroupMaskPanelDom = function() {
		var J = F.node("div", {
					"class" : "groupMaskPanel"
				});
		n.appendChild(J);
		K.groupMaskPanel = new qqweb.layout.PopupBox({
			container : J,
			html : ' <a id="GroupMask_Costom" state="0" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>浣跨敤缇よ嚜韬殑娑堟伅璁剧疆</a>					<a id="GroupMask_Prompt" state="1" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢鎺ユ敹骞舵彁绀烘秷鎭�</a>					<a id="GroupMask_NoPrompt" state="2" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢鎺ユ敹涓嶆彁绀烘秷鎭�</a>					<a id="GroupMask_Mask" state="3" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>鎵€鏈夌兢瀹屽叏闃绘缇ゆ秷鎭�</a>'
		});
		this.costomDom = F.id("GroupMask_Costom");
		this.promptDom = F.id("GroupMask_Prompt");
		this.noPromptDom = F.id("GroupMask_NoPrompt");
		this.maskDom = F.id("GroupMask_Mask");
		var am = [this.costomDom, this.promptDom, this.noPromptDom,
				this.maskDom];
		l.array.forEach(am, function(ap, ao, an) {
					D.on(ap, "click", g);
				});
		this.setGroupMaskState(I);
	};
	var g = function(am) {
		am.preventDefault();
		var J = parseInt(this.getAttribute("state"));
		I = J;
		K.setGroupMaskState(I);
		D.notifyObservers(K, "SetGroupMaskState", J);
		switch (J) {
			case "0" :
			case 0 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.QUNSELF"
						});
				break;
			case "1" :
			case 1 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHALERTS"
						});
				break;
			case "2" :
			case 2 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHOUTALERTS"
						});
				break;
			case "3" :
			case 3 :
				pgvSendClick({
							hottag : "WEB2QQ.QQPANEL.MESSAGESETTING.BLOCK"
						});
				break;
		}
	};
	this.setGroupMaskState = function(J) {
		F.removeClass(this.costomDom, "simpleMenuItemSelected");
		F.removeClass(this.promptDom, "simpleMenuItemSelected");
		F.removeClass(this.noPromptDom, "simpleMenuItemSelected");
		F.removeClass(this.maskDom, "simpleMenuItemSelected");
		J = parseInt(J);
		switch (J) {
			case 0 :
				F.addClass(this.costomDom, "simpleMenuItemSelected");
				break;
			case 1 :
				F.addClass(this.promptDom, "simpleMenuItemSelected");
				break;
			case 2 :
				F.addClass(this.noPromptDom, "simpleMenuItemSelected");
				break;
			case 3 :
				F.addClass(this.maskDom, "simpleMenuItemSelected");
				break;
		}
	};
	this.setGroupListMaskState = function(am, ao) {
		var J = F.id("EQQ_GroupList_State_" + am);
		var an = F.id("EQQ_RecentList_State_" + am);
		if (!ao) {
			if (J) {
				F.addClass(J, "EQQ_GroupMask_State");
			}
			if (an) {
				F.addClass(an, "EQQ_GroupMask_State");
			}
		} else {
			if (J) {
				F.removeClass(J, "EQQ_GroupMask_State");
			}
			if (an) {
				F.removeClass(an, "EQQ_GroupMask_State");
			}
		}
	};
	var S = function(am) {
		am.stopPropagation();
		var J = F.getClientXY(K.EQQ_ListBottom_maskButton);
		K.toggleGroupMaskStatePanel(J);
	};
	this.toggleGroupMaskStatePanel = function(J) {
		if (this.groupMaskPanel && this.groupMaskPanel.isShow()) {
			this.hideGroupMaskStatePanel();
		} else {
			this.showGroupMaskStatePanel(J);
		}
	};
	this.showGroupMaskStatePanel = function(ap) {
		if (this.groupMaskPanel) {
		} else {
			this.createGroupMaskPanelDom();
		}
		if (ap) {
			var ao = this.groupMaskPanel.getWidth();
			var am = this.groupMaskPanel.getHeight();
			var aq = qqweb.layout.getClientWidth();
			var an = qqweb.layout.getClientHeight();
			var J = ap[0], ar = ap[1] - 100;
			if (J < 2) {
				J = 2;
			}
			if (ar < 2) {
				ar = 2;
			}
			if (J > aq - ao - 2) {
				J = aq - ao - 2;
			}
			if (ar > an - am - 2) {
				ar = an - am - 2;
			}
			this.groupMaskPanel.setXY(J, ar);
		}
		this.groupMaskPanel.show();
	};
	this.hideGroupMaskStatePanel = function() {
		if (this.groupMaskPanel) {
			this.groupMaskPanel.hide();
		}
	};
	this.createMiniCardPanelDom = function() {
		var aw = F.node("div", {
					id : "miniCard",
					"class" : "panel_1"
				});
		aw.innerHTML = '			<div class="panel_1_outer">				<div class="panel_1_inner">					<div class="panel_1_container">						<div id="panel_1_center" class="panel_1 panel_1_center"></div>						<div id="panel_1_t" class="panel_1 panel_1_t"></div>						<div id="panel_1_rt" class="panel_1 panel_1_rt"></div>						<div id="panel_1_r" class="panel_1 panel_1_r"></div>						<div id="panel_1_rb" class="panel_1 panel_1_rb"></div>						<div id="panel_1_b" class="panel_1 panel_1_b"></div>						<div id="panel_1_lb" class="panel_1 panel_1_lb"></div>						<div id="panel_1_l" class="panel_1 panel_1_l"></div>						<div id="panel_1_lt" class="panel_1 panel_1_lt"></div>					</div>					<div id="miniCardBody" class="panel_1_content">						<img id="miniCard_avatar" class="miniCard_avatar" />						<div class="miniCard_name">							<div id="miniCard_name_inner" class="miniCard_name_inner"></div>						</div>						<div id="miniCard_signature" class="miniCard_signature">							<div id="miniCard_signature_inner" class="miniCard_signature_inner"></div>						</div>						<div id="miniCard_clientType_innerWrapper" class ="miniCard_clientType_innerWrapper"><div class ="miniCard_clientTypeIcon"></div><div id="miniCard_clientType_inner" class="miniCard_clientType_inner"></div></div>						<div id="miniCard_level" class="miniCard_level"></div>						<div id="miniCard_level_upinfo" class="miniCard_level_upinfo"></div>						<div id="miniCard_quickLink" class="miniCard_quickLink">							<a id="miniCard_qzone" class="miniCard_qzone" type="qzone" title="璁块棶QQ绌洪棿" hidefocus target="_blank" href="###"></a>							<a id="miniCard_qmail" class="miniCard_qmail" type="qmail" title="鍙戦€侀偖浠�" hidefocus target="_blank" href="###"></a>						</div>						<div id="miniCard_buddyOption_tabHead" class="buddyOption_tabHead">							<div id="miniCard_userDetails" class="buddyOption_tabHead_div">璇︾粏璧勬枡</div>						</div>						<div id="miniCard_buddyOption_tabBody" class="buddyOption_tabBody">						</div>					</div>				</div>			</div>';
		n.appendChild(aw);
		var aq = F.id("miniCard_avatar");
		var ax = F.id("miniCard_name_inner");
		var au = F.id("miniCard_signature");
		var J = F.id("miniCard_signature_inner");
		var at = F.id("miniCard_clientType_inner");
		var av = F.id("miniCard_clientType_innerWrapper");
		var ap = F.id("miniCard_level");
		var ar = F.id("miniCard_level_upinfo");
		var am = F.id("miniCard_qzone");
		var an = F.id("miniCard_qmail");
		var ao = F.id("miniCard_userDetails");
		D.on(aw, "mouseover", T);
		D.on(aw, "mouseout", H);
		D.on(ao, "click", q);
		D.on(am, "click", Z);
		D.on(an, "click", V);
		this.miniCardPanel = new qqweb.layout.Panel({
					container : aw,
					body : F.id("miniCardBody"),
					html : ""
				});
		this.miniCardPanel.setInfo = function(ay) {
			this.uin = ay.uin;
			var az = ay.uin == qqweb.portal.self.uin;
			aq.src = EQQ.getUserDefaultAvatar();
			aq.src = ay.avatarUrl;
			if (az) {
				ao.innerHTML = "淇敼璧勬枡";
				aq.src = qqweb.util.getUserAvatar(ay.uin, 1) + "&t="
						+ (new Date()).getTime();
			} else {
				ao.innerHTML = "璇︾粏璧勬枡";
			}
			ax.innerHTML = ay.htmlAllName;
			ax.title = (ay.allName);
			J.innerHTML = "";
			ap.innerHTML = "";
			ar.innerHTML = "";
			am.href = EQQ.getQzoneUrl(ay.uin);
			an.href = EQQ.getSendMailUrl(ay.uin);
			if (az || ay.clientType == "1" || ay.clientType == "10000"
					|| ay.type == "stranger" || !ay.clientType) {
				av.className = "miniCard_clientType_innerWrapper";
				au.style.display = "block";
			} else {
				av.className = "miniCard_clientType_"
						+ EQQ.hash.clientType[ay.clientType || "10000"];
				at.innerHTML = EQQ.hash.clientTypeText[ay.clientType || "10000"]
						+ "鐧诲綍涓�";
				au.style.display = "none";
			}
			D.notifyObservers(K, "MiniCardShow", ay);
		};
		this.miniCardPanel.setSignature = function(ay) {
			J.innerHTML = ay.htmlSignature;
			J.title = (ay.signature);
		};
		this.miniCardPanel.setClientType = function(ay) {
			if (this.uin == ay.uin) {
				if (ay.type == "stranger") {
				} else {
					if (ay.clientType == "1") {
						av.className = "miniCard_clientType_"
								+ EQQ.hash.clientType[ay.clientType || "10000"];
						at.innerHTML = EQQ.hash.clientTypeText[ay.clientType
								|| "10000"]
								+ "鐧诲綍涓�";
						au.style.display = "none";
					} else {
						av.className = "miniCard_clientType_innerWrapper";
						au.style.display = "block";
					}
				}
			}
		};
		this.miniCardPanel.setQQLevel = function(aA) {
			var aG = aA.level;
			var ay = aG.level;
			var aF = parseInt(ay / 64), aE = parseInt((ay % 64) / 16), az = parseInt(((ay % 64) % 16)
					/ 4), aD = ((ay % 64) % 16) % 4, aC = "";
			for (var aB = 0; aB < aF; aB++) {
				aC += '<div class="miniCard_level_div qqLevel_queen"></div>';
			}
			for (var aB = 0; aB < aE; aB++) {
				aC += '<div class="miniCard_level_div qqLevel_sun"></div>';
			}
			for (var aB = 0; aB < az; aB++) {
				aC += '<div class="miniCard_level_div qqLevel_moon"></div>';
			}
			for (var aB = 0; aB < aD; aB++) {
				aC += '<div class="miniCard_level_div qqLevel_star"></div>';
			}
			ap.innerHTML = aC;
			ap.title = "绛夌骇: " + ay;
			if (aA.uin == qqweb.portal.self.uin) {
				ar.innerHTML = '<div class="miniCard_level_upinfo_div" title="娲昏穬澶╂暟锛�'
						+ aG.days
						+ '"><span class="icon days"></span>'
						+ aG.days
						+ '澶�</div><div class="miniCard_level_upinfo_div" title="璺濆崌绾у埌'
						+ (ay + 1)
						+ "绾ц繕鏈�"
						+ aG.remainDays
						+ '澶�"><span class="icon remainDays"></span>'
						+ aG.remainDays + "澶�</div>";
			}
		};
	};
	this.showMiniCardPanel = function(J, au) {
		if (this.miniCardPanel) {
		} else {
			this.createMiniCardPanelDom();
		}
		if (au) {
			var am = this.miniCardPanel.getWidth() + 10;
			var at = this.miniCardPanel.getHeight() + 10;
			var ar = qqweb.layout.getClientWidth();
			var ao = qqweb.layout.getClientHeight();
			var aq = au[0], ap = au[1];
			if (aq < 2) {
				aq = 2;
			}
			if (ap < 2) {
				ap = 2;
			}
			if (aq > ar - am - 2) {
				aq = ar - am - 2;
			}
			if (ap > ao - at - 2) {
				ap = ao - at - 2;
			}
			this.miniCardPanel.setXY(aq, ap);
		}
		var an = EQQ.Model.BuddyList.getUserByUin(J);
		this.miniCardPanel.setInfo(an);
		this.miniCardPanel.show();
	};
	this.hideMiniCardPanel = function() {
		if (this.miniCardPanel) {
			this.miniCardPanel.hide();
		}
	};
	this.createDom = function(am) {
		var J = F.node("div", {
					id : "EQQ_MainPanel"
				});
		J.innerHTML = '				<div class="EQQ_title">					<div id="EQQ_PinDownButton" class="EQQ_PinDownButton" title="閽変綇/鏀惰捣">閽変綇/鏀惰捣</div>					<div id="EQQ_CloseButton" class="EQQ_CloseButton" title="闅愯棌濂藉弸鍒楄〃">鏈€灏忓寲</div>					<div id="EQQ_MinButton" class="EQQ_MinButton" title="璁剧疆">璁剧疆</div>					<a class="EQQ_FeedbackButton2" href="http://support.qq.com/portal/discuss_pdt/420_1.html" target="_blank">鍙嶉</a>					<div id="EQQ_SettingButton" class="EQQ_settingButton" title="璁剧疆WebQQ">						<div class="EQQ_settingButtonIcon">涓�</div>						<div>璁剧疆</div>					</div>					<div class="EQQ_titleText" href="#" target="_blank" title="鑱旂郴浜�">鑱旂郴浜�</div>					<div class="EQQ_betaText" title="1.0.10.12"></div>				</div>				<div id="EQQ_YellowTips" class="EQQ_YellowTips">					<div id="EQQ_YellowTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="鍏抽棴鎻愮ず">X</div>					<a class="EQQ_YellowTips_Link" href="http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG" target="_blank">閭€璇峰弬涓嶹ebQQ鐢ㄦ埛璋冩煡</a>				</div>				<div id="EQQ_LoginSuccess">					<div id="EQQ_SearchBar" class="EQQ_SearchBar">						<input id="EQQ_SearchBox" class="EQQ_SearchBox" name="" type="text" value="鎼滅储濂藉弸..." title="鎼滅储濂藉弸..." />						<div id="EQQ_SearchButton" class="EQQ_SearchButton" title="鎼滅储...">鎼滅储鎸夐挳</div>					</div>          <div id="EQQ_SearchResultPanel_iframeWrap" class="EQQ_SearchResultPanel_iframeWrap">  					<div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel">  						<div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>  						<div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>  						<div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>  					</div>            <iframe class="EQQ_SearchResultPanel_iframe"></iframe>  				</div>					<ul class="EQQ_tab">						<li id="EQQ_TabBuddyList" class="EQQ_tabBuddyList" title="鑱旂郴浜�"><div class="EQQ_tabBuddyList_icon"></div></li>						<li id="EQQ_TabGroupList" class="EQQ_tabGroupList" title="缇ゅ垪琛�"><div class="EQQ_tabGroupList_icon"></div></li>						<li id="EQQ_TabRecentList" class="EQQ_tabRecentList" title="鏈€杩戣仈绯讳汉"><div class="EQQ_tabRecentList_icon"></div></li>					</ul>					<div id="EQQ_ListContainer">						<div id="EQQ_buddyListPanel" class="EQQ_buddyListPanel">							<div id="EQQ_buddyList" class="EQQ_buddyList"><iframe id="iframe_fflist" width="100%" height="100%"  border="0" frameborder="0" style="border:0;overflow:hidden;" allowtransparency="true" src="/module/eqq/swf/fflist.html?t=20101022001"></iframe>							</div>							<div class="EQQ_ListBottom">								<a href="" id="EQQ_findBuddy" class="searchBuddy" target="_blank"><div class="searchBuddy_div"></div>鏌ユ壘</a>								<a href="" id="EQQ_buddyManage" class="buddy_manage_icon" target="_blank"><div class="buddy_manage_icon_div"></div>绠＄悊</a>							</div>						</div>						<div id="EQQ_groupListPanel" class="EQQ_groupListPanel"><div class="EQQ_groupListOuter"><div id="EQQ_groupListInner" class="EQQ_groupListInner"></div></div>							<div class="EQQ_ListBottom">								<a id="EQQ_createGroupButton" class="createGroup" href="http://qun.qq.com/air/create" target="_blank" title="鍒涘缓缇�"><div class="createGroup_div"></div>鍒涘缓</a>								<a id="EQQ_searchGroupButton" class="searchGroup" href="http://qun.qq.com/air/search" target="_blank" title="鏌ユ壘缇�"><div class="searchGroup_div"></div>鏌ユ壘</a>								<div id="EQQ_ListBottom_maskButton"><div></div>缇ゅ睆钄�</div>							</div>						</div>						<div id="EQQ_recentListPanel" class="EQQ_recentListPanel"><div id="EQQ_recentList" class="EQQ_recentList"></div></div>					</div>				</div>				<div style="height:1000px;width:1000px;">					<div id="EQQ_Logining">鍙戣捣杩炴帴...</div>				</div>				<div id="EQQ_Logining_feedback"><a href="http://support.qq.com/write.shtml?guest=1&fid=513" target="_blank">					<span class="warnning_yellow">&nbsp;</span>鍙嶉鐧诲綍寤鸿</a></div>				<div id="EQQ_ReLoginPanel">					<div style="display:inline;" id="EQQ_ReLoginButton_text">鐧诲綍澶辫触</div>锛�<span id="EQQ_ReLoginButton">閲嶈瘯</span>				</div>';
		am.innerHTML = "";
		am.appendChild(J);
		F.setClass(J, "EQQ_mainPanel");
	};
	this.onYellowTipsClick = function() {
		K.hideYellowTips();
		D.notifyObservers(K, "CloseYellowTipsFinish");
	};
	this.showYellowTips = function() {
		b = b + y;
		this.onWindowResize();
		F.show(this.EQQ_YellowTips);
	};
	this.hideYellowTips = function() {
		F.hide(this.EQQ_YellowTips);
		b = b - y;
		this.onWindowResize();
	};
	this.onEqqResize = function(ao) {
		var J = 5;
		var am = ao.height;
		var an = am - v;
		if (an < J) {
			an = J;
		}
		F.setStyle(this.EQQ_ListContainer, "height", (an - J) + "px");
		F.setStyle(this.EQQ_buddyListPanel, "height", (an - J - 25) + "px");
		F.setStyle(this.EQQ_groupListOuter, "height", (an - J - 25) + "px");
		B();
	};
	this.onWindowResize = function(J) {
	};
	this.onSearchBoxMouseover = function() {
		F.setClass(this, "EQQ_SearchBoxHover");
	};
	this.onSearchBoxMouseout = function() {
		F.setClass(this, "EQQ_SearchBox");
	};
	this.onSearchBoxFocus = function() {
		D.off(K.EQQ_SearchBox, "mouseover", K.onSearchBoxMouseover);
		D.off(K.EQQ_SearchBox, "mouseout", K.onSearchBoxMouseout);
		F.setClass(this, "EQQ_SearchBoxFocus");
		K.clearSearchBox(this);
		this.select();
		K.startSearch();
	};
	this.onSearchBoxBlur = function() {
		D.on(K.EQQ_SearchBox, "mouseover", K.onSearchBoxMouseover);
		D.on(K.EQQ_SearchBox, "mouseout", K.onSearchBoxMouseout);
		F.setClass(this, "EQQ_SearchBox");
		K.resetSearchBox(this);
		K.hideSearchResult();
	};
	this.resetSearchBox = function(J) {
		if (J.value == "") {
			J.value = "鎼滅储濂藉弸...";
		}
	};
	this.clearSearchBox = function(J) {
		if (l.string.trim(J.value) == "鎼滅储濂藉弸...") {
			J.value = "";
		}
	};
	this.onSearchButtonClick = function() {
		K.startSearch();
	};
	this.onSearchBoxKeyup = function(J) {
		if (!K.EQQ_SearchBox.value) {
			K.hideSearchResult();
			return;
		}
		if (J.keyCode != aa && J.keyCode != E) {
			K.startSearch();
		}
	};
	this.onSearchBoxKeydown = function(am) {
		switch (am.keyCode) {
			case N :
				if (k) {
					am.preventDefault();
					K.hideSearchResult();
					D.notifyObservers(K, "StartChat", k.uin);
					pgvSendClick({
								hottag : "web2qq.qqpanel.searchcontacts"
							});
				}
				break;
			case aa :
				if (G > 0) {
					var J = F.id("EQQ_SearchResultItem_" + k.uin);
					F.setStyle(J, "backgroundColor", "transparent");
					G--;
					k = R[G];
					J = F.id("EQQ_SearchResultItem_" + k.uin);
					if (J) {
						F.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			case E :
				if (G < R.length - 1) {
					var J = F.id("EQQ_SearchResultItem_" + k.uin);
					F.setStyle(J, "backgroundColor", "transparent");
					G++;
					k = R[G];
					J = F.id("EQQ_SearchResultItem_" + k.uin);
					if (J) {
						F.setStyle(J, "backgroundColor", "#cbe7fc");
					}
				}
				break;
			default :
				break;
		}
	};
	this.startSearch = function() {
		this.clearSearchBox(this.EQQ_SearchBox);
		var J = this.EQQ_SearchBox.value;
		D.notifyObservers(this, "Search", J);
	};
	this.showSearchResult = function(J) {
		if (this.EQQ_SearchBox.value) {
			R = J;
			var ap = F.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
			F.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "left", ap[0]
							+ "px");
			F.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "top",
					(ap[1] + 26) + "px");
			F.show(this.EQQ_SearchResultPanel);
			F.show(this.EQQ_SearchResultPanel_iframeWrap);
			this.EQQ_SearchResultPanel.innerHTML = "";
			if (J.length == 0) {
				G = null;
				k = null;
				this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">娌℃湁鎵惧埌鐩稿叧濂藉弸</div>';
			} else {
				G = 0;
				k = J[0];
				for (var an = 0; an < J.length; an++) {
					var am = J[an];
					var ao = F.node("div");
					F.setClass(ao, "EQQ_SearchResultItem");
					ao.id = "EQQ_SearchResultItem_" + am.uin;
					ao.setAttribute("uin", am.uin);
					ao.innerHTML = am.htmlAllName;
					ao.title = (am.allName);
					this.EQQ_SearchResultPanel.appendChild(ao);
					if (an == 0) {
						F.setStyle(ao, "backgroundColor", "#cbe7fc");
					}
					D.on(ao, "mouseover", this.onSearchResultMouseover);
					D.on(ao, "mouseout", this.onSearchResultMouseout);
					D.on(ao, "mousedown", this.onSearchResultClick);
				}
			}
			D.on(document, "mousedown", l.bind(this.hideSearchResult, this));
		}
	};
	this.hideSearchResult = function() {
		F.hide(this.EQQ_SearchResultPanel_iframeWrap);
		D.off(document, "mousedown");
	};
	this.onSearchResultMouseover = function() {
		F.setStyle(this, "backgroundColor", "#cbe7fc");
	};
	this.onSearchResultMouseout = function() {
		F.setStyle(this, "backgroundColor", "transparent");
	};
	this.onSearchResultClick = function() {
		var J = this.getAttribute("uin");
		K.hideSearchResult();
		D.notifyObservers(K, "StartChat", J);
		pgvSendClick({
					hottag : "web2qq.qqpanel.searchcontacts"
				});
	};
	this.show = function() {
		F.show(this.EQQ_MainPanel);
	};
	this.hide = function() {
		F.hide(this.EQQ_MainPanel);
	};
	this.updateSelfInfoChange = function(J) {
		this.EQQ_MyAvatar.src = EQQ.getUserAvatar(J.uin);
		this.EQQ_MyAvatar.title = "淇敼璧勬枡";
		this.EQQ_MyNick.innerHTML = J.htmlShowName;
		this.EQQ_MyNick.title = (J.showName + "<" + J.uin + ">");
	};
	this.updateSelfStateChange = function(J) {
		F.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + J);
		if (J === "offline") {
			F.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
		} else {
			F.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline");
		}
	};
	this.updateSelfSignatureChange = function(J) {
		if (J.signature) {
			this.EQQ_MySignature.innerHTML = J.htmlSignature;
			this.EQQ_MySignature.title = (J.signature);
		} else {
			this.EQQ_MySignature.innerHTML = "鏈変釜鎬э紝娌＄鍚�";
			this.EQQ_MySignature.title = "鏈変釜鎬э紝娌＄鍚�";
		}
	};
	this.createBuddyClass = function(J) {
	};
	this.addOnlineBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.online;
		J.name = "鍦ㄧ嚎濂藉弸";
		J.htmlName = l.string.toHtml(J.name);
		J.titleName = l.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	this.addStrangerBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.stranger;
		J.name = "闄岀敓浜�";
		J.htmlName = l.string.toHtml(J.name);
		J.titleName = l.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	this.addBlackListBuddyClass = function() {
		var J = {};
		J.index = EQQ.hash.userClassType.blacklist;
		J.name = "榛戝悕鍗�";
		J.htmlName = l.string.toHtml(J.name);
		J.titleName = l.string.encodeHtmlSimple(J.name);
		J.count = 0;
		J.onlineCount = 0;
		J.list = {
			callme : [],
			online : [],
			away : [],
			busy : [],
			silent : [],
			offline : []
		};
		this.addBuddyClass(J);
	};
	this.addBuddyClass = function(ap, an) {
		var J, ao, am;
		J = F.node("div", {
					id : "EQQ_listClassHead_" + ap.index,
					classIndex : ap.index
				});
		if (ap.index == EQQ.hash.userClassType.online) {
			ao = '					<div class="EQQ_listClassHeadIcon">icon</div>					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">						<%=htmlName%>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]					</div>				';
		} else {
			ao = '					<div class="EQQ_listClassHeadIcon">icon</div>					<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">						<%=htmlName%>&nbsp;[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]					</div>				';
		}
		am = l.string.template(ao, ap);
		J.innerHTML = am;
		if (an) {
			this.EQQ_buddyList.insertBefore(J, an);
		} else {
			this.EQQ_buddyList.appendChild(J);
		}
		D.on(J, "click", aj);
		var aq = F.node("div", {
					id : "EQQ_listClassBody_" + ap.index,
					"class" : "EQQ_listClassBody"
				});
		ao = '				<div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>				<div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>				<div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>				<div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>				<div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>				<div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>			';
		am = l.string.template(ao, ap);
		aq.innerHTML = am;
		this.EQQ_buddyList.insertBefore(aq, J.nextSibling);
		this.collapsedClass(ap.index);
	};
	this.hideLogin = function() {
		F.hide(this.EQQ_Logining);
		F.hide(this.EQQ_Logining_feedback);
		F.hide(this.EQQ_ReLoginPanel);
		F.show(this.EQQ_LoginSuccess);
		F.setStyle(this.EQQ_LoginSuccess, "height", "100%");
		var J = {
			height : EQQ.window.getBodySize().height,
			width : EQQ.window.getBodySize().width
		};
		this.onEqqResize(J);
	};
	this.showLogin = function() {
		this.EQQ_Logining.innerHTML = "鍙戣捣杩炴帴...";
		F.show(this.EQQ_Logining);
		F.show(this.EQQ_Logining_feedback);
		F.hide(this.EQQ_ReLoginPanel);
		F.hide(this.EQQ_LoginSuccess);
		F.setStyle(this.EQQ_LoginSuccess, "height", "0px");
	};
	this.showPullData = function() {
	};
	this.clearBuddyList = function() {
		if (u) {
			this.flex.clearBuddyList();
		}
	};
	this.createBuddyList = function(J) {
	};
	this.getClassExpandFlag = function(J) {
		return ab[J];
	};
	this.setClassExpandFlag = function(am, J) {
		return ab[am] = J;
	};
	this.getClassAvatarLoadFlag = function(J) {
		return ad[J];
	};
	this.setClassAvatarLoadFlag = function(am, J) {
		return ad[am] = J;
	};
	this.toggleClass = function(J) {
		if (ab[J]) {
			this.collapsedClass(J);
		} else {
			this.expandClass(J);
		}
	};
	this.collapsedClass = function(am) {
		var J = F.id("EQQ_listClassHead_" + am), an = F.id("EQQ_listClassBody_"
				+ am);
		if (am == EQQ.hash.userClassType.online) {
			F.setClass(J, "EQQ_onlineClassHeadCollapsed");
		} else {
			F.setClass(J, "EQQ_listClassHeadCollapsed");
		}
		F.setStyle(an, "height", "0");
		this.setClassExpandFlag(am, false);
	};
	this.expandClass = function(am) {
		var J = F.id("EQQ_listClassHead_" + am), an = F.id("EQQ_listClassBody_"
				+ am);
		if (am == EQQ.hash.userClassType.online) {
			F.setClass(J, "EQQ_onlineClassHeadExpand");
		} else {
			F.setClass(J, "EQQ_listClassHeadExpand");
		}
		F.setStyle(an, "height", "auto");
		this.setClassExpandFlag(am, true);
		l.out("index: " + am);
		M();
	};
	var M = function() {
		j(K.EQQ_buddyListPanel);
	};
	var ah = function(J) {
		B();
	};
	var B = function(J) {
		if (ah.timer) {
			window.clearTimeout(ah.timer);
			ah.timer = null;
		}
		ah.timer = window.setTimeout(M, 500);
	};
	var j = function(ao) {
		var aw = parseInt(F.getStyle(ao, "height"), 10);
		var an = ao.scrollTop;
		var au = F.getXY(ao)[1];
		for (var aq = 0; aq < a.length;) {
			var ap = a[aq];
			var J = ap.imgEl;
			var am = ap.uin;
			var ar = ap.classId;
			var at = F.getXY(J)[1];
			var av = at - au;
			l.out("imgTop1:" + av + "y2:" + at);
			if (K.getClassExpandFlag(ar) && J && av > 0 && av < aw) {
				l.out("checkAndLoadAvatar & loadAvatar containerHeight: " + aw
						+ ", imgTop2:" + av);
				J.src = EQQ.getUserAvatar(ap.uin);
				a.splice(aq, 1);
			} else {
				aq++;
			}
		}
	};
	this.onBuddyStateChange = function(J) {
		if (u) {
			this.flex.onBuddyStateChange(J);
		}
	};
	this.onOnlineBuddyChange = function(J) {
		if (u) {
			this.flex.onOnlineBuddyChange(J);
		}
	};
	this.addBuddy = function(am) {
		var J = {
			classId : am.classId,
			uin : am.uin,
			clientType : am.clientType,
			state : am.state,
			nick : am.nick
		};
		if (u) {
			this.flex.addBuddy(J);
		}
	};
	this.addOnlineBuddy = function(am) {
		var J = {
			uin : am.uin,
			clientType : am.clientType,
			state : am.state,
			nick : am.nick
		};
		if (u) {
			this.flex.addOnlineBuddy(J);
		}
	};
	this.removeOnlineBuddy = function(J) {
		if (u) {
			this.flex.removeOnlineBuddy(J.uin);
		}
	};
	this.updateOnlineBuddyClass = function(J) {
		if (u) {
			this.flex.updateOnlineBuddyClass(J.length);
		}
	};
	this.flexStartJump = function(J) {
		if (u) {
			this.flex.startjump(J);
		}
	};
	this.flexStopJump = function(J) {
		if (u) {
			this.flex.stopjump(J);
		}
	};
	this.jumpUp = function(J) {
	};
	this.jumpDown = function(J) {
	};
	this.jumpAvatar = function(J) {
	};
	this.flickerClassHide = function(J) {
	};
	this.flickerClassShow = function(J) {
	};
	this.flickerClass = function(J) {
	};
	this.groupJumpUp = function(am) {
		o = true;
		for (var J = 0; J < am.length; J++) {
			var an = F.id("EQQ_Group_" + am[J]);
			if (an) {
				F.addClass(an, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.groupJumpDown = function(am) {
		o = false;
		for (var J = 0; J < am.length; J++) {
			var an = F.id("EQQ_Group_" + am[J]);
			if (an) {
				F.removeClass(an, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.groupJumpAvatar = function(J) {
		if (o) {
			this.groupJumpDown(J);
		} else {
			this.groupJumpUp(J);
		}
	};
	this.recentJumpUp = function(am) {
		ac = true;
		for (var J = 0; J < am.length; J++) {
			var an = F.id("EQQ_Recent_" + am[J]);
			if (an) {
				F.addClass(an, "EQQ_jumpUpInBuddyList");
				F.addClass(an, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.recentJumpDown = function(am) {
		ac = false;
		for (var J = 0; J < am.length; J++) {
			var an = F.id("EQQ_Recent_" + am[J]);
			if (an) {
				F.removeClass(an, "EQQ_jumpUpInBuddyList");
				F.removeClass(an, "EQQ_jumpUpInGroupList");
			}
		}
	};
	this.recentJumpAvatar = function(J) {
		if (ac) {
			this.recentJumpDown(J);
		} else {
			this.recentJumpUp(J);
		}
	};
	this.moveBuddy = function(am) {
		var J = {
			uin : am.uin,
			state : am.state
		};
		if (u) {
			this.flex.moveBuddy(J);
		}
	};
	this.moveOnlineBuddy = function(am) {
		var J = {
			uin : am.uin,
			state : am.state
		};
		if (u) {
			this.flex.moveOnlineBuddy(J);
		}
	};
	this.updateClientType = function(am) {
		var J = {
			uin : am.uin,
			clientType : am.clientType
		};
		if (u) {
			this.flex.updateClientType(J);
		}
	};
	this.updateBuddyClassOnlineBuddy = function(J) {
		var am = {
			index : J.index,
			onlineCount : J.onlineCount
		};
		if (u) {
			this.flex.updateBuddyClassOnlineBuddy(am);
		}
	};
	this.updateRecentState = function(am) {
		var ap = F.id("EQQ_Recent_" + am.uin);
		if (ap) {
			ap.className = "";
			F.addClass(ap, "EQQ_BuddyList_Buddy");
			F.addClass(ap, "EQQ_" + EQQ.hash.onlineStatus[am.state] + "Buddy");
			var ao = EQQ.hash.clientType[am.clientType];
			var an = EQQ.hash.clientTypeText[am.clientType || "PC"];
			var J = F.id("EQQ_RecentList_ClientType_" + am.uin) || {};
			var aq = F.id("EQQ_RecentList_ClientType_Title_" + am.uin) || {};
			J.className = "EQQ_BuddyList_ClientType_" + ao;
			aq.title = an;
		}
	};
	this.updateBuddyClassCount = function(J) {
		var am = {
			index : J.index,
			count : J.count
		};
		if (u) {
			this.flex.updateBuddyClassCount(am);
		}
	};
	this.updateStrangerClassOnlineCount = function(J) {
		if (u) {
			this.flex.updateStrangerClassOnlineCount(J);
		}
	};
	this.updateStrangerClassCount = function(J) {
		if (u) {
			this.flex.updateStrangerClassCount(J.length);
		}
	};
	this.setUserName = function(J) {
		if (J.markName) {
			var am = {
				uin : J.uin,
				nick : J.markName
			};
			if (u) {
				this.flex.setUserName(am);
			}
		}
	};
	this.setGroupMask = function(J) {
		I = J;
		switch (J) {
			case "0" :
			case 0 :
				F.id("EQQ_ListBottom_maskButton").className = "accept";
				F.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			case "1" :
			case 1 :
				F.id("EQQ_ListBottom_maskButton").className = "accept";
				F.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
				break;
			case "2" :
			case 2 :
				F.id("EQQ_ListBottom_maskButton").className = "mask";
				F.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
			case "3" :
			case 3 :
				F.id("EQQ_ListBottom_maskButton").className = "mask";
				F.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
				break;
		}
	};
	this.showReLoginPanel = function(J) {
		this.EQQ_ReLoginButton_text.innerHTML = J;
		F.hide(this.EQQ_Logining);
		F.hide(this.EQQ_Logining_feedback);
		F.show(this.EQQ_ReLoginPanel);
		F.hide(this.EQQ_LoginSuccess);
	};
	this.onReLoginButtonClick = function() {
		F.show(K.EQQ_Logining);
		F.show(K.EQQ_Logining_feedback);
		F.hide(K.EQQ_ReLoginPanel);
		F.hide(K.EQQ_LoginSuccess);
		D.notifyObservers(K, "ReLogin");
	};
	this.createGroupList = function(J) {
		this.EQQ_groupListInner.innerHTML = "";
		for (var am = 0; am < J.length; am++) {
			this.addGroup(J[am]);
		}
	};
	this.addGroup = function(an) {
		var J = '				<div class="EQQ_GroupList_AvatarContainer" title="">					<img id="EQQ_GroupList_Avatar_'
				+ an.gid
				+ '" class="EQQ_GroupList_Avatar" src="'
				+ EQQ.getGroupAvatar(an.code)
				+ '" />					<div class="EQQ_GroupList_State" id="EQQ_GroupList_State_'
				+ an.gid
				+ '" title="缇ゅ睆钄�"></div>				</div>				<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">					<div id="EQQ_GroupList_Name_'
				+ an.gid
				+ '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>				</div>			';
		var am = l.string.template(J, an);
		var ao = F.node("div", {
					id : "EQQ_Group_" + an.gid,
					code : an.code
				});
		ao.innerHTML = am;
		this.EQQ_groupListInner.appendChild(ao);
		D.on(ao, "mouseover", C);
		D.on(ao, "click", function(ap) {
					ai.apply(this, [ap]);
					pgvSendClick({
								hottag : "web2qq.qqpanel.qun.sendmsg"
							});
				});
		F.addClass(ao, "EQQ_GroupList_Group");
	};
	this.updateGroupMarkName = function(am) {
		var J = F.id("EQQ_GroupList_Name_" + am.gid);
		if (J) {
			J.innerHTML = am.htmlShowName;
		}
		J = F.id("EQQ_GroupRecentList_Name_" + am.gid);
		if (J) {
			J.innerHTML = am.htmlShowName;
		}
	};
	this.createRecentList = function(am) {
		this.EQQ_recentList.innerHTML = "";
		for (var J = 0; J < am.length; J++) {
			this.addRecent(am[J]);
		}
	};
	this.addRecent = function(av) {
		if (av.content) {
			if (av.type == 0) {
				var ao = av.content;
				var ap = '						<div class="EQQ_RecentList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="'
						+ EQQ.hash.clientTypeText[ao.clientType || "PC"]
						+ '">							<div id="EQQ_RecentList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_'
						+ EQQ.hash.clientType[ao.clientType || "10000"]
						+ '"></div>						</div>						<div id="EQQ_RecentList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="'
						+ EQQ.hash.onlineStatusText[ao.state]
						+ '">							<img id="EQQ_RecentList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="'
						+ EQQ.CONST.EQQ_SERVER_URL
						+ 'style/images/avatar_default_20_20.gif" />							<div class="EQQ_BuddyList_State"></div>						</div>						<div id="EQQ_RecentList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - '
						+ EQQ.hash.onlineStatusText[ao.state]
						+ '">							<div id="EQQ_BuddyList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick"><%=htmlShowName%></div>						</div>					';
				var an = l.string.template(ap, ao);
				var au = F.node("div", {
							id : "EQQ_Recent_" + ao.uin,
							uin : ao.uin
						});
				au.innerHTML = an;
				this.EQQ_recentList.insertBefore(au,
						this.EQQ_recentList.firstChild);
				D.on(au, "mouseover", C);
				D.on(au, "mouseout", L);
				D.on(au, "click", function(aw) {
							af.apply(this, [aw]);
							pgvSendClick({
										hottag : "web2qq.qqpanel.recent.sendC2Cmsg"
									});
						});
				var ar = F.id("EQQ_RecentList_AvatarContainer_" + ao.uin);
				D.on(ar, "mouseover", X);
				D.on(ar, "mouseout", h);
				F.addClass(au, "EQQ_BuddyList_Buddy");
				F.addClass(au, "EQQ_" + EQQ.hash.onlineStatus[ao.state]
								+ "Buddy");
				var J = F.id("EQQ_RecentList_Avatar_" + ao.uin);
				if (ao.uin && J) {
					J.src = EQQ.getUserAvatar(ao.uin);
				}
			} else {
				var aq = av.content;
				var at = '					<div class="EQQ_GroupList_AvatarContainer" title="">						<img id="EQQ_GroupList_Avatar_'
						+ aq.gid
						+ '" class="EQQ_GroupList_Avatar" src="'
						+ EQQ.getGroupAvatar(aq.code)
						+ '" />						<div class="EQQ_GroupList_State" id="EQQ_RecentList_State_'
						+ aq.gid
						+ '" title="缇ゅ睆钄�"></div>					</div>					<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">						<div id="EQQ_GroupRecentList_Name_'
						+ aq.gid
						+ '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>					</div>				';
				var an = l.string.template(at, aq);
				var am = F.node("div", {
							id : "EQQ_Recent_" + aq.gid,
							code : aq.code
						});
				am.innerHTML = an;
				this.EQQ_recentList.insertBefore(am,
						this.EQQ_recentList.firstChild);
				D.on(am, "mouseover", C);
				D.on(am, "click", function(aw) {
							ai.apply(this, [aw]);
							pgvSendClick({
										hottag : "web2qq.qqpanel.recent.sendqunmsg"
									});
						});
				F.addClass(am, "EQQ_GroupList_Group");
			}
		}
	};
	this.updateRecentByBuddy = function(J) {
		var am = F.id("EQQ_Recent_" + J.uin);
		if (am) {
			this.EQQ_recentList
					.insertBefore(am, this.EQQ_recentList.firstChild);
		} else {
			this.addRecent({
						type : 0,
						content : J
					});
		}
	};
	this.updateRecentByGroup = function(J) {
		var am = F.id("EQQ_Recent_" + J.gid);
		if (am) {
			this.EQQ_recentList
					.insertBefore(am, this.EQQ_recentList.firstChild);
		} else {
			this.addRecent({
						type : 1,
						content : J
					});
		}
	};
	this.setMode = function(J) {
		switch (J) {
			case "master" :
				c = U;
				F.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "鏇存敼鍦ㄧ嚎鐘舵€�";
				break;
			case "slave" :
				c = m;
				F.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
				this.EQQ_MyState.title = "WebQQ鐜板湪澶勪簬杈呮ā寮忥紝璇蜂粠瀹㈡埛绔疩Q淇敼鎮ㄧ殑鍦ㄧ嚎鐘舵€併€�";
				break;
		}
	};
	this.toggleStatePanel = function(J) {
		if (this.statePanel && this.statePanel.isShow()) {
			this.hideStatePanel();
		} else {
			this.showStatePanel(J);
		}
	};
	this.showStatePanel = function(ap) {
		if (F.id("EQQ_StatePanel")) {
		} else {
			this.createStatePanelDom();
		}
		if (ap) {
			var ao = this.statePanel.getWidth();
			var am = this.statePanel.getHeight();
			var aq = qqweb.layout.getClientWidth();
			var an = qqweb.layout.getClientHeight();
			var J = ap[0], ar = ap[1];
			if (J < 2) {
				J = 2;
			}
			if (ar < 2) {
				ar = 2;
			}
			if (J > aq - ao - 2) {
				J = aq - ao - 2;
			}
			if (ar > an - am - 2) {
				ar = an - am - 2;
			}
			this.statePanel.setXY(J, ar);
		}
		this.statePanel.setTopZIndex();
		this.statePanel.show();
	};
	this.hideStatePanel = function() {
		if (this.statePanel) {
			this.statePanel.hide();
		}
	};
	this.setSelfState = function(J) {
		D.notifyObservers(this, "SelfStateChange", J);
		this.updateSelfStateChange(J);
	};
	this.removeGroup = function(ap) {
		var ao = EQQ.Model.BuddyList.getGroupByCode(ap);
		var an = ao.gid;
		l.out(ao);
		var aq = F.id("EQQ_Group_" + an);
		if (aq) {
			D.off(aq);
			if (aq.parentNode) {
				var am = aq.parentNode;
				am.removeChild(aq);
			}
		}
		l.out(aq);
		var J = F.id("EQQ_Recent_" + an);
		if (J) {
			D.off(J);
			if (J.parentNode) {
				var am = J.parentNode;
				am.removeChild(J);
			}
		}
		l.out(J);
	};
});
Jet().$package("EQQ.Presenter.MainPanel", function(m) {
	var w = this, u = m.dom, t = m.event;
	var e = false;
	var s = [], v = [], n = [], g = [], r = true, k = false, o = "";
	var h = false;
	var q = false;
	var z = false;
	this.init = function() {
		e = false;
		s = [];
		v = [];
		n = [];
		g = [];
		r = true;
		k = false, o = "";
		h = false;
		q = false;
		z = false;
		this.View = EQQ.View.MainPanel;
		if (m.browser.ie) {
			if (m.browser.ie == 7) {
				var A = m.GetSwfVer();
				if (A != -1) {
					var D = A.split(" ");
					var C = D[1];
					var B = C.split(",");
					if (parseInt(B[0]) >= 10) {
						q = true;
						this.View = EQQ.View.MainPanelFlex;
						t.addObserver(EQQ.Model.ChatMsg, "flexStartJump", m
										.bind(this.onFlexStartJump, this));
						t.addObserver(EQQ.Model.ChatMsg, "flexStopJump", m
										.bind(this.onFlexStopJump, this));
					} else {
						b();
					}
				} else {
					b();
				}
			}
		}
		this.View.createDom(this.getContainer());
		t.addObserver(EQQ, "CloseWebQQ", m.bind(this.onCloseWebQQ, this));
		t.addObserver(EQQ, "SelfOffline", m.bind(this.onSelfOffline, this));
		t.addObserver(EQQ.Model.BuddyList, "SelfInfoChange", m.bind(
						this.onSelfInfoChange, this));
		t.addObserver(EQQ.Model.BuddyList, "SelfStateChange", m.bind(
						this.updateSelfStateChange, this));
		t.addObserver(EQQ.Model.BuddyList, "SelfSignatureChange", m.bind(
						this.handleSelfSignatureChange, this));
		t.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", c);
		t.addObserver(EQQ.Model.BuddyList, "UserQQLevelChange", y);
		t.addObserver(EQQ.Model.BuddyList, "LoginFail", m.bind(
						this.onLoginFail, this));
		t.addObserver(EQQ.Model.BuddyList, "GetUserInfoSuccess", m.bind(
						this.onGetUserInfoSuccess, this));
		t.addObserver(EQQ.Model.BuddyList, "BuddyClassChange", m.bind(
						this.onBuddyClassChange, this));
		t.addObserver(EQQ.Model.BuddyList, "AllClassOnlineBuddyReady", m.bind(
						this.onAllClassOnlineBuddyReady, this));
		t.addObserver(EQQ.Model.BuddyList, "GroupNameChange",
				this.onOnGroupNameChange);
		t.addObserver(EQQ.Model.BuddyList, "AddBuddy", m.bind(
						this.onAddANewBuddy, this));
		t.addObserver(EQQ.Model.BuddyList, "GroupListChange", m.bind(
						this.onGroupListChange, this));
		t.addObserver(EQQ.Model.BuddyList, "GroupMaskChange", m.bind(
						this.onGroupMaskChange, this));
		t.addObserver(EQQ.Model.BuddyList, "SingleGroupMaskChange", m.bind(
						this.onSingleGroupMaskChange, this));
		t.addObserver(EQQ.Model.BuddyList, "RecentListChange", m.bind(
						this.onRecentListChange, this));
		t.addObserver(EQQ.Model.ChatMsg, "NewStranger", m.bind(
						this.onNewStranger, this));
		t.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", m.bind(
						this.onMessageBoxUserListChange, this));
		t.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", m.bind(
						this.onMessageBoxGroupListChange, this));
		t.addObserver(EQQ.Model.ChatMsg, "MessageListChange", m.bind(
						this.onMessageListChange, this));
		t.addObserver(EQQ.Model.ChatMsg, "GroupMessageListChange", m.bind(
						this.onGroupMessageListChange, this));
		t.addObserver(this.View, "StartChat", a);
		t.addObserver(this.View, "StartGroupChat", p);
		t.addObserver(this.View, "SelfStateChange", m.bind(
						this.onViewSelfStateChange, this));
		t.addObserver(this.View, "SetGroupMaskState", l);
		t.addObserver(this.View, "AddPObservers", m.bind(this.onAddPObservers,
						this));
		t.addObserver(this.View, "ExitPortal", m.bind(this.onExitPortal, this));
		t.addObserver(this.View, "CloseWebQQ", m.bind(i, this));
		t.addObserver(this.View, "MinMainPanel", m.bind(f, this));
		t.addObserver(this.View, "ReLogin", m.bind(d, this));
		t.addObserver(this.View, "Search", m.bind(this.onSearch, this));
		t.addObserver(this.View, "BuddyListReady", m.bind(
						this.onBuddyListDomReady, this));
		t.addObserver(this.View, "CloseYellowTipsFinish", m.bind(
						this.onCloseYellowTipsFinish, this));
		t.addObserver(this.View, "MiniCardShow", j);
		this.View.init();
		if (this.View.setNoneFlashStyle) {
			this.View.setNoneFlashStyle();
		}
	};
	var b = function() {
		var A = new qqweb.businessClass.Window({
					title : "娓╅Θ鎻愮ず",
					modeSwitch : true,
					dragable : true,
					resize : true,
					width : 420,
					height : 120,
					hasCloseButton : true,
					hasOkButton : true,
					isSetCentered : true
				});
		var B = '<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;">						妫€娴嬪埌鎮ㄤ负IE7鍐呮牳鐢ㄦ埛锛岃瀹夎鏈€鏂�<a target="_blank" href="http://get.adobe.com/flashplayer">Flash鐗堟湰</a>锛岃幏寰楁洿濂戒綋楠岋紒					   </div>';
		A.setHtml(B);
	};
	this.onAddPObservers = function() {
		r = false;
		t.addObserver(EQQ.Model.BuddyList, "BuddyListChange", m.bind(
						this.onBuddyListChange, this));
		t.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", m.bind(
						this.onBuddyStateChange, this));
		t.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", m.bind(
						this.onOnlineBuddyChange, this));
	};
	this.onBuddyListDomReady = function() {
		if (!k) {
			if (r) {
				t.addObserver(EQQ.Model.BuddyList, "BuddyListChange", m.bind(
								this.onBuddyListChange, this));
				t.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", m.bind(
								this.onBuddyStateChange, this));
				t.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", m.bind(
								this.onOnlineBuddyChange, this));
			}
			t.addObserver(EQQ.Model.BuddyList, "UserNameChange", m.bind(
							this.onUserNameChange, this));
			k = true;
		}
		h = true;
	};
	this.getContainer = function() {
		return EQQ.panel.mainPanel;
	};
	this.getMyPanelContainer = function() {
		return EQQ.panel.myPanel;
	};
	var c = function(A) {
		if (w.View.miniCardPanel) {
			m.out("onUserSignatureChange 33:" + A.uin);
			w.View.miniCardPanel.setSignature(A);
		}
	};
	var y = function(A) {
		if (w.View.miniCardPanel) {
			m.out("onUserQQLevelChange 33:" + A.uin);
			w.View.miniCardPanel.setQQLevel(A);
		}
	};
	var j = function(A) {
		if (A) {
			EQQ.Model.BuddyList.getUserSignature(A.uin);
			EQQ.Model.BuddyList.sendGetQQLevel(A.uin);
		}
	};
	this.showYellowTips = function() {
		this.View.showYellowTips();
	};
	this.hideYellowTips = function() {
		this.View.hideYellowTips();
	};
	this.onCloseYellowTipsFinish = function() {
		this.setCookieTips("hide");
	};
	this.getCookieTips = function() {
		return m.cookie.get("is_close_tips", EQQ.CONST.MAIN_DOMAIN);
	};
	this.setCookieTips = function(A) {
		m.cookie.set("is_close_tips", A, EQQ.CONST.MAIN_DOMAIN, null, 120);
	};
	this.onSearch = function(B) {
		var C = 5;
		var A = EQQ.Model.BuddyList.searchBuddy(B, C);
		this.View.showSearchResult(A);
	};
	this.showMiniCardPanel = function(A, B) {
		this.View.showMiniCardPanel(A, B);
	};
	this.hideMiniCardPanel = function() {
		this.View.hideMiniCardPanel();
	};
	this.onLoginFail = function() {
		alert("鐧诲綍澶辫触锛岃绋嶅悗閲嶈瘯");
	};
	this.onSelfInfoChange = function(A) {
		this.View.updateSelfInfoChange(A);
	};
	this.onOnGroupNameChange = function(A) {
		if (typeof(w.View) != "undefined") {
			w.View.updateGroupMarkName(A);
		}
	};
	this.updateSelfStateChange = function(A) {
		this.View.updateSelfStateChange(A);
	};
	this.handleSelfSignatureChange = function(A) {
		this.View.updateSelfSignatureChange(A);
	};
	this.onSelfOffline = function(B) {
		var A = EQQ.Model.BuddyList.getSelf();
		z = false;
		h = false;
		EQQ.stopPoll();
		if (A) {
			A.oldState = A.state;
			A.state = "offline";
		}
		this.updateSelfStateChange("offline");
		qqweb.portal.alert(B);
	};
	this.onBuddyClassChange = function(A) {
		this.clearBuddyList();
		this.View.createBuddyClass(A);
		this.View.hideLogin();
	};
	this.onAllClassOnlineBuddyReady = function() {
		if (!z) {
			z = true;
			this.onBuddyClassListReady();
		}
	};
	this.onBuddyClassListReady = function() {
		EQQ.loginEnd = (new Date()).getTime();
		var A = EQQ.loginEnd - EQQ.loginStart;
		A = A / 1000;
		m.out("time: " + A);
		if (A <= 1) {
		} else {
			if (A <= 5) {
			} else {
				if (A <= 10) {
				} else {
					if (A <= 60) {
					} else {
					}
				}
			}
		}
	};
	this.onBuddyListChange = function(A) {
		if (h) {
		} else {
			if (!q) {
				this.updateAllBuddyClassCount(EQQ.Model.BuddyList
						.getClassList());
				this.createBuddyList(A);
			}
		}
	};
	this.onGroupListChange = function(A) {
		this.View.createGroupList(A);
	};
	this.onAddANewBuddy = function(F) {
		var G = this;
		var B = F.user;
		var A = F.newstate;
		this.View.addBuddy(B);
		var E = B.classId;
		var D = EQQ.Model.BuddyList.getClassById(E);
		this.View.updateBuddyClassCount(D);
		if (F.markname) {
			var C = EQQ.Model.BuddyList.getBuddyByUin(B.uin);
			C.setMarkName(F.markname);
		}
		t.notifyObservers(EQQ.Model.BuddyList, "BuddyStatusChange", A);
	};
	this.onRecentListChange = function(B) {
		for (var A = 0; A < B.length; A++) {
			if (B[A].type == 0) {
				B[A].content = EQQ.Model.BuddyList.getBuddyByUin(B[A].uin);
			} else {
				B[A].content = EQQ.Model.BuddyList.getGroupByGid(B[A].uin);
			}
		}
		this.View.createRecentList(B);
	};
	this.onUserNameChange = function(A) {
		this.View.setUserName(A);
	};
	this.onGroupMaskChange = function(C) {
		var A = EQQ.Model.BuddyList.getGroupList();
		for (var B = 0; B < A.length; B++) {
			var D = A[B];
			var E = EQQ.Model.BuddyList.isGroupPrompt(D.gid);
			this.View.setGroupListMaskState(D.gid, E);
		}
		this.View.setGroupMask(C);
	};
	this.onSingleGroupMaskChange = function(A) {
		var B = EQQ.Model.BuddyList.isGroupPrompt(A.gid);
		this.View.setGroupListMaskState(A.gid, B);
	};
	this.onGetUserInfoSuccess = function(A) {
	};
	this.onNewStranger = function(A) {
		var C = EQQ.Model.BuddyList.getStrangerList();
		var B = C.length;
		this.View.updateStrangerClassOnlineCount(B);
		this.View.updateStrangerClassCount(C);
		this.View.addBuddy(A);
	};
	this.updateAllBuddyClassCount = function(B) {
		for (var A = 0; A < B.length; A++) {
			this.updateBuddyClassCount(B[A]);
		}
	};
	this.updateBuddyClassCount = function(A) {
		this.View.updateBuddyClassCount(A);
	};
	this.createBuddyList = function(A) {
		this.View.createBuddyList(A);
	};
	this.updateRecentByBuddy = function(A) {
		this.View.updateRecentByBuddy(A);
	};
	this.updateRecentByGroup = function(A) {
		this.View.updateRecentByGroup(A);
	};
	this.onBuddyStateChange = function(C) {
		if (q) {
			if (h) {
				var B = EQQ.Model.BuddyList.getUserByUin(C);
				var A = {
					uin : B.uin,
					client_type : B.clientType,
					state : B.state,
					nick : B.nick
				};
				this.View.onBuddyStateChange(A);
			}
		} else {
			var B = EQQ.Model.BuddyList.getUserByUin(C);
			this.View.moveBuddy(B);
			this.View.moveOnlineBuddy(B);
			this.View.updateClientType(B);
			this.View.updateRecentState(B);
			if (this.View.miniCardPanel) {
				this.View.miniCardPanel.setClientType(B);
			}
		}
	};
	this.onOnlineBuddyChange = function(C) {
		if (q) {
			if (h) {
				var B = EQQ.Model.BuddyList.getUserByUin(C);
				var A = {
					uin : B.uin,
					client_type : B.clientType,
					state : B.state,
					nick : B.showName
				};
				this.View.onOnlineBuddyChange(A);
			}
		} else {
			var B = EQQ.Model.BuddyList.getUserByUin(C);
			var F = EQQ.Model.BuddyList.getClassByUin(C);
			var E = EQQ.hash.onlineStatus.offline;
			var D = EQQ.Model.BuddyList.getOnlineBuddy();
			this.View.updateBuddyClassOnlineBuddy(F);
			this.View.updateOnlineBuddyClass(D);
			if (B.state == E) {
				this.View.removeOnlineBuddy(B);
			} else {
				this.View.addOnlineBuddy(B);
			}
		}
	};
	this.onFlexStartJump = function(A) {
		this.View.flexStartJump(A);
	};
	this.onFlexStopJump = function(A) {
		this.View.flexStopJump(A);
	};
	this.onMessageBoxUserListChange = function(B) {
		var A = EQQ.Model.BuddyList.getSelf();
		var D = (typeof EQQ.Presenter.TaskBar != "undefined")
				? EQQ.Presenter.TaskBar.getCurrentTaskUin()
				: false;
		this.View.jumpDown(v);
		this.View.flickerClassShow(n);
		s = [];
		v = [];
		n = [];
		for (var C = 0; C < B.length; C++) {
			if (D != B[C].from_uin) {
				s.push(B[C].from_uin);
				if (EQQ.Model.BuddyList.getSelfState() == "callme") {
					a(B[C].from_uin);
				}
			}
		}
		if (s.length !== 0) {
			EQQ.addNeedBeat2("mainPanel");
			t.addObserver(EQQ, "NotifyBeat_250", x);
		}
	};
	this.onMessageBoxGroupListChange = function(C) {
		var A = EQQ.Model.BuddyList.getSelf();
		var E;
		try {
			E = EQQ.Presenter.TaskBar.getCurrentTaskUin();
		} catch (D) {
		}
		this.View.jumpDown(g);
		g = [];
		for (var B = 0; B < C.length; B++) {
			if (E != C[B].from_uin
					&& EQQ.Model.BuddyList.isGroupPrompt(C[B].from_uin)) {
				g.push(C[B].from_uin);
			}
			if (EQQ.Model.BuddyList.getSelfState() == "callme"
					&& EQQ.Model.BuddyList.isGroupPrompt(C[B].from_uin)) {
				p(C[B].group_code);
			}
		}
		if (g.length !== 0) {
			EQQ.addNeedBeat2("mainPanel");
			t.addObserver(EQQ, "NotifyBeat_250", x);
		}
	};
	this.onMessageListChange = function(A) {
		var B = EQQ.Model.BuddyList.getBuddyByUin(A.uin);
		if (B) {
			this.View.updateRecentByBuddy(B);
		}
	};
	this.onGroupMessageListChange = function(A) {
		var B = EQQ.Model.BuddyList.getGroupByGid(A.gid);
		if (B) {
			this.View.updateRecentByGroup(B);
		}
	};
	var l = function(A) {
		EQQ.Model.BuddyList.sendChangeGroupMask({
					type : "global",
					uin : EQQ.Model.BuddyList.getSelfUin(),
					mask : A
				});
	};
	var a = function(A) {
		EQQ.api.call(["chat", ["single", A]]);
	};
	var p = function(A) {
		EQQ.api.call(["chat", ["group", A]]);
	};
	this.collapsedAllClass = function() {
		var B = EQQ.Model.BuddyList.getClassList();
		for (var A = 0; A < B.length; A++) {
			this.View.collapsedClass(B[A].index);
		}
	};
	var i = function() {
		EQQ.exit();
	};
	var f = function() {
		this.hide();
	};
	var d = function() {
		EQQ.reLogin();
	};
	this.onExitPortal = function() {
		qqweb.portal.exit();
	};
	this.onCloseWebQQ = function() {
		z = false;
		h = false;
		this.hide();
		this.View.showLogin();
	};
	this.clearBuddyList = function() {
		this.View.clearBuddyList();
	};
	this.showLogin = function() {
		this.View.showLogin();
	};
	this.show = function() {
		e = true;
		this.View.show();
	};
	this.hide = function() {
		e = false;
		this.View.hide();
	};
	this.toggleShow = function() {
		if (e) {
			this.hide();
		} else {
			this.show();
		}
	};
	this.showReLoginPanel = function(A) {
		this.View.showReLoginPanel(A);
	};
	var x = function() {
		v = [];
		n = [];
		var D = s.concat(g);
		if (D.length === 0) {
			t.removeObserver(EQQ, "NotifyBeat_250", x);
			EQQ.removeNeedBeat2("mainPanel");
		}
		for (var A = 0; A < s.length; A++) {
			var B = s[A];
			var C = EQQ.Model.BuddyList.getClassIdByUin(B);
			if (w.View.getClassExpandFlag(C)) {
				v.push(B);
			} else {
				if (m.array.indexOf(n, C) == -1) {
					n.push(C);
				}
			}
		}
		if (v.length > 0) {
			w.View.jumpAvatar(v);
		}
		if (n.length > 0) {
			w.View.flickerClass(n);
		}
		if (g.length > 0) {
			w.View.groupJumpAvatar(g);
		}
		if (D.length > 0) {
			w.View.recentJumpAvatar(D);
		}
	};
	this.onViewSelfStateChange = function(C) {
		var B = "offline";
		var A = EQQ.Model.BuddyList.getSelf();
		if (A) {
			B = A.state;
			A.state = C;
		}
		m.out("==onViewSelfStateChange, self: " + C + ", old: " + B);
		if (B == "offline" && C != "offline") {
			A.state = C;
			EQQ.login(C);
		} else {
			EQQ.Model.BuddyList.sendChangeStatus(C);
		}
		if (C == "offline") {
			z = false;
			h = false;
			EQQ.stopPoll();
		}
		if (C == "callme") {
		}
	};
	this.removeGroup = function(A) {
		w.View.removeGroup(A);
	};
});