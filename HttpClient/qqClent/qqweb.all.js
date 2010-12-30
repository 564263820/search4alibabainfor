Jet().$package("qqweb", function(f) {
	var d;
	document.domain = "qq.com";
	d = window.location.host;
	window.onerror = function() {
		return true
	};
	this.init = function() {
		f.$namespace("qqweb.app");
		this.portal.init({});
		qqweb.portal.speedTest.sRTS(7, "start", window._SPEEDTIME_WINDOWSTART);
		qqweb.portal.speedTest.sRTS(7, "end", new Date, true);
		qqweb.portal.speedTest.sRTS(8, "start", new Date)
	};
	this.CONST = {
		CDN_URL : "http://hp.qq.com/webqqpic/",
		UPDATE_TIME_STAMP : "20101229001",
		MAIN_DOMAIN : "qq.com",
		DOMAIN : d,
		MAIN_URL : "http://" + d + "/",
		API_SERVER_URL : "http://s.web2.qq.com/api/",
		CONN_SERVER_DOMAIN : "http://s.web2.qq.com/",
		CONN_SERVER_DOMAIN2 : "http://d.web2.qq.com/",
		CGI_BIN_SERVER_URL : "http://web2-b.qq.com/cgi-bin/",
		CGI_BIN_SERVER_URL2 : "http://" + d + "/cgi-bin/",
		CGI_BIN_SERVER_URL3 : "http://web.qq.com/cgi-bin/",
		API_PROXY_URL : "http://s.web2.qq.com/proxy.html?v=20101025002",
		PUB_APP_STATIC_URL : "./pubapps/",
		PRI_APP_STATIC_URL : "http://wqbg.qpic.cn/appmarket/",
		PRI_APP_STATIC_URL2 : "./",
		DEFAULT_AVATAR_URL : "./style/",
		AVATAR_SERVER_DOMAIN : "http://qun.qq.com/",
		AVATAR_SERVER_DOMAINS : ["http://face1.qun.qq.com/",
				"http://face2.qun.qq.com/", "http://face3.qun.qq.com/",
				"http://face4.qun.qq.com/", "http://face5.qun.qq.com/",
				"http://face6.qun.qq.com/", "http://face7.qun.qq.com/",
				"http://face8.qun.qq.com/", "http://face9.qun.qq.com/",
				"http://face10.qun.qq.com/", "http://face11.qun.qq.com/"],
		QZONE_SERVER_DOMAIN : "http://qzone.qq.com/",
		QZONE_USER_SERVER_DOMAIN : "http://user.qzone.qq.com/",
		QMAIL_SERVER_DOMAIN : "http://mail.qq.com/",
		MAX_LOGIN_AMOUNT : 1,
		MAX_FAIL_AMOUNT : 2,
		LOAD_AVATAR_AMOUNT : 50,
		LOGIN_LEVEL_NONE : 1,
		LOGIN_LEVEL_NOCHAT : 2,
		LOGIN_LEVEL_ALL : 3,
		KET : 0.1,
		WINDOW_FLAG_MIN : 1,
		WINDOW_FLAG_NORMAL : 2,
		WINDOW_FLAG_MAX : 4,
		WINDOW_FLAG_CURRENT : 8,
		WINDOW_FLAG_NOT_CURRENT : 16,
		WINDOW_FLAG_FULLSCREEN : 32
	}
});
function ptlogin2_onResize(f, d) {
}
lockedEl = null;
padEventProxy = function(f, d) {
	var b, a;
	d.initEvent(f, true, false);
	if (d.changedTouches && d.changedTouches.length) {
		a = d.changedTouches[0];
		b = a.pageX;
		a = a.pageY
	} else {
		b = d.clientX;
		a = d.clientY
	}
	if (f == "touchmove")
		b = lockedEl ? lockedEl : (lockedEl = document.elementFromPoint(b, a));
	else if (lockedEl && (f == "touchend" || f == "touchcancel")) {
		b = lockedEl;
		lockedEl = null
	} else
		b = document.elementFromPoint(b, a);
	a = qqweb.layout.getCurrentWindow();
	if (b.tagName == "IFRAME" && a) {
		a = document.getElementById("iframeApp_" + a.getId());
		var h = false;
		try {
			h = a && typeof a.contentWindow.padEventProxy == "function"
					? true
					: false
		} catch (s) {
		}
		h ? a.contentWindow.padEventProxy(f, d) : b.dispatchEvent(d)
	} else
		b.dispatchEvent(d)
};
Jet().$package("qqweb.util", function(f) {
	var d = f.dom, b = f.browser;
	this.observer = {
		openInWebBrowser : function(a) {
			try {
				a.preventDefault()
			} catch (h) {
			}
			a = this.getAttribute("href");
			var s = this.getAttribute("title");
			qqweb.portal.runApp("6", {
						url : a,
						isHideBar : false,
						title : s
					})
		}
	};
	this.getUserDefaultAvatar = function(a) {
		a = a || 40;
		return "./style/images/avatar_default_" + a + "_" + a + ".gif"
	};
	this.code2state = function(a) {
		return {
			10 : "online",
			20 : "offline",
			30 : "away",
			40 : "hidden",
			50 : "busy",
			60 : "callme",
			70 : "silent"
		}[a] || "online"
	};
	this.getFaceServer = function(a) {
		return qqweb.CONST.AVATAR_SERVER_DOMAINS[a % 10]
	};
	this.getUserAvatar = function(a, h) {
		h = h || 0;
		if (isNaN(a))
			return this.getDefaultUserAvatar();
		return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + h
				+ "&type=1&fid=0&uin=" + a + "&vfwebqq="
				+ qqweb.portal.getVfWebQQ()
	};
	this.getGroupAvatar = function(a, h) {
		h = h || 0;
		return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + h
				+ "&type=4&fid=0&uin=" + a + "&vfwebqq="
				+ qqweb.portal.getVfWebQQ()
	};
	this.getQzoneUrl = function(a) {
		return qqweb.CONST.QZONE_USER_SERVER_DOMAIN + a
	};
	this.getSendMailUrl = function(a) {
		return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email="
				+ a + "@qq.com"
	};
	this.getDefaultUserAvatar = function() {
		return "./style/images/avatar.png"
	};
	this.setDefaultAppThumb = function(a) {
		a.src = "./style/images/thumb_default.png"
	};
	this.IEAddOption = function(a, h) {
		if (b.ie) {
			var s = d.node("option", {
						value : h.value,
						text : h.text
					});
			if (h.selected)
				s.selected = "selected";
			a.options.add(s)
		}
	};
	this.setPngForIE6 = function(a, h) {
		if (f.browser.ie == 6) {
			a.style.background = "none";
			a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
					+ h + "', sizingMethod='crop')"
		}
	};
	this.getFileSize = function(a) {
		var h = new Image, s = a.value, w = 0;
		try {
			h.dynsrc = s
		} catch (c) {
			return 0
		}
		try {
			w = h.fileSize || 0
		} catch (i) {
		}
		if (w == 0)
			try {
				w = a.files[0].fileSize
			} catch (n) {
			}
		return w
	}
});
Jet().$package("qqweb.config", function(f) {
	var d = this, b = f.event, a = f.dom;
	b = f.event;
	var h = f.string, s = false, w, c, i, n;
	w = [50, 51, 2, 17, 16, 6];
	c = [50, 51, 2, 17, 16, 7, 21, 28, 5, 1, 45, 14, 29, 34, 8, 30, 47, 46, 12,
			15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37, 31, 39, 38, 22, 11, 6,
			13, 4, 10, 33, 40, 3, 18, 20, 32];
	i = [{
				id : 0,
				name : "\u793e\u4ea4",
				list : [50, 51, 2, 17, 16, 7, 21, 28, 5, 1]
			}, {
				id : 1,
				name : "\u751f\u6d3b",
				list : [45, 14, 29, 34, 8, 30, 47, 46]
			}, {
				id : 2,
				name : "\u5a31\u4e50",
				list : [12, 15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37, 31, 39,
						38, 22, 11]
			}, {
				id : 3,
				name : "\u5de5\u5177",
				list : [6, 13, 4, 10, 33, 40, 3, 18, 20, 32]
			}, {
				id : 4,
				name : "\u81ea\u5b9a\u4e49",
				list : []
			}];
	n = {
		"1" : 0,
		"2" : 0,
		"3" : 3,
		"4" : 3,
		"5" : 0,
		"6" : 3,
		"7" : 0,
		"8" : 1,
		"9" : 2,
		"10" : 3,
		"11" : 2,
		"12" : 2,
		"13" : 3,
		"14" : 1,
		"15" : 2,
		"16" : 0,
		"17" : 0,
		"18" : 3,
		"19" : 4,
		"20" : 3,
		"21" : 0,
		"22" : 2,
		"23" : 4,
		"24" : 2,
		"25" : 4,
		"26" : 2,
		"27" : 2,
		"28" : 0,
		"29" : 1,
		"30" : 1,
		"31" : 2,
		"32" : 3,
		"33" : 3,
		"34" : 1,
		"35" : 2,
		"36" : 2,
		"37" : 2,
		"38" : 2,
		"39" : 2,
		"40" : 3,
		"41" : 4,
		"42" : 2,
		"43" : 4,
		"44" : 4,
		"45" : 1,
		"46" : 4,
		"47" : 4,
		"48" : 4,
		"49" : 4,
		"50" : 0,
		"51" : 0,
		"56" : 2,
		"58" : 2,
		"59" : 2,
		"61" : 1,
		"62" : 1
	};
	if (f.browser.mobileSafari) {
		c = [50, 51, 2, 17, 16, 7, 21, 28, 5, 1, 45, 14, 29, 34, 8, 30, 47, 46,
				56, 12, 15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37, 31, 39, 38,
				22, 11, 6, 13, 4, 10, 33, 40, 3, 18, 20, 32];
		i = [{
					id : 0,
					name : "\u793e\u4ea4",
					list : [50, 51, 2, 17, 16, 7, 21, 28, 5, 1]
				}, {
					id : 1,
					name : "\u751f\u6d3b",
					list : [45, 14, 29, 34, 8, 30, 47, 46]
				}, {
					id : 2,
					name : "\u5a31\u4e50",
					list : [56, 12, 15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37,
							31, 39, 38, 22, 11]
				}, {
					id : 3,
					name : "\u5de5\u5177",
					list : [6, 13, 4, 10, 33, 40, 3, 18, 20, 32]
				}, {
					id : 4,
					name : "\u81ea\u5b9a\u4e49",
					list : []
				}]
	}
	this.configList = {
		theme : {
			id : "theme_christmas"
		},
		wallpaper : {
			id : "",
			mode : "repeat",
			url : ""
		},
		wallpaperList : [],
		appearance : {
			id : "black"
		},
		appBarSetting : {},
		quickAppList : w,
		folderList : i,
		defaultSetupAppList : c,
		setupAppList : c
	};
	this.onSetConfig = function() {
	};
	this.onConfigGetSuc = function(e) {
		qqweb.portal.speedTest.sRTS(4, "end", new Date, true);
		e = e.result && e.result.app ? e.result.app : [];
		var l = 0;
		for (var m in e)
			if (m === "QQWeb") {
				var o = e[m];
				if (o.theme && o.theme != "")
					this.configList.theme.id = o.theme;
				if (o.wallpaper && o.wallpaper != "" && o.wallpaper.id != "")
					this.configList.wallpaper = o.wallpaper;
				if (o.wallpaperList && o.wallpaperList != "")
					this.configList.wallpaperList = o.wallpaperList;
				if (o.appearance && o.appearance != "")
					this.configList.appearance.id = o.appearance;
				if (o.runStatus)
					this.configList.runStatus = o.runStatus;
				if (o.chatboxMode)
					this.configList.chatboxMode = o.chatboxMode;
				if (o.isNotNeedCtrlKey)
					this.configList.isNotNeedCtrlKey = o.isNotNeedCtrlKey;
				if (o.isShowTip)
					this.configList.isShowTip = o.isShowTip;
				if (o.fontFormat)
					this.configList.fontFormat = o.fontFormat;
				if (o.appBarSetting)
					this.configList.appBarSetting = o.appBarSetting;
				if (o.notifySetting)
					this.configList.notifySetting = o.notifySetting;
				if (o.msgBubblePos)
					this.configList.msgBubblePos = o.msgBubblePos;
				if (!o.setupAppList || !f.isNumber(o.setupAppList[0])) {
					var v = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : f.json.stringify({
										setupAppList : this.getSetupAppList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(v)
				} else
					this.configList.setupAppList = o.setupAppList.length == 0
							? []
							: o.setupAppList;
				s = true;
				if (o.folderList)
					this.configList.folderList = o.folderList;
				else {
					for (l in this.configList.folderList)
						this.configList.folderList[l].list = [];
					for (l in this.configList.setupAppList) {
						v = this.configList.setupAppList[l];
						var z = this.getFolderIndexByFolderId(4);
						f.isUndefined(n[v])
								? this.configList.folderList[z].list
										.push(parseInt(v))
								: this.configList.folderList[n[v]].list
										.push(parseInt(v))
					}
					v = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : f.json.stringify({
										folderList : this.getFolderList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(v)
				}
				qqweb.layout.initSystemTheme();
				this.checkAndInstall();
				if (o.quickAppList)
					this.configList.quickAppList = o.quickAppList;
				else {
					this.configList.quickAppList = [];
					for (l in w)
						f.array.indexOf(this.getSetupAppList(), w[l]) !== -1
								&& this.configList.quickAppList.push(w[l]);
					v = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : f.json.stringify({
										quickAppList : this.getQuickAppList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(v)
				}
			}
		m = qqweb.portal.getLoginLevel();
		f.out("logininfoSuccess");
		b.notifyObservers(qqweb.portal, "UserAppListReady", m);
		s
				&& b.notifyObservers(this, "GetUserAppListSuccess", this
								.getSetupAppList())
	};
	this.checkAndInstall = function() {
		var e = [];
		e = f.browser.mobileSafari ? [50, 56] : [50];
		e = e.reverse();
		var l = false;
		for (var m in e) {
			var o = e[m];
			if (f.array.indexOf(this.configList.setupAppList, o) == -1) {
				this.configList.setupAppList.splice(0, 0, o);
				l = true;
				var v = (this.getFolderById(n[o]) || this.getFolderById(4)).list;
				f.array.indexOf(v, o) == -1 && v.splice(0, 0, o)
			}
		}
		if (l) {
			m = {
				onSuccess : function() {
				},
				context : d,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : f.json.stringify({
								setupAppList : d.getSetupAppList(),
								folderList : this.getFolderList(),
								quickAppList : d.getQuickAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(m)
		}
	};
	this.getAppBarSetting = function() {
		return this.configList.appBarSetting
	};
	this.setAppBarSetting = function(e) {
		this.configList.appBarSetting = e;
		e = {
			onSuccess : function() {
			},
			context : d,
			data : {
				retype : 1,
				app : "QQWeb",
				itemlist : f.json.stringify({
							appBarSetting : d.getAppBarSetting()
						})
			}
		};
		qqweb.rpcService.sendSetConfig(e)
	};
	var t = function() {
		if (!(qqweb.portal.getLoginLevel() == 1 || !s)) {
			var e = {
				onSuccess : function() {
				},
				context : d,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : f.json.stringify({
								setupAppList : d.getSetupAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(e)
		}
	};
	this.setAppListQueue = function(e) {
		var l = [];
		for (var m in e)
			l.push(parseInt(e[m]));
		this.configList.setupAppList = l;
		t()
	};
	this.add2SetupAppList = function(e) {
		if (this.getSetupAppList().length >= 200) {
			var l = '<div class="appAlert_container">\t\t\t\t\t\t\t<div style="height:24px;line-height:24px;font-size:12px;text-align:center;margin-top:5px;">\u5e94\u7528\u6dfb\u52a0\u91cf\u6700\u591a\u4e3a200\u4e2a,\u8bf7\u5220\u51cf\u90e8\u5206\u5e94\u7528\u540e\u518d\u6dfb\u52a0\u3002</div>\t\t\t\t\t\t</div>', m = new qqweb.businessClass.Window(
					{
						title : "\u6e29\u99a8\u63d0\u793a",
						modeSwitch : true,
						dragable : true,
						resize : false,
						width : 370,
						height : 127,
						html : l,
						hasOkButton : true,
						hasCloseButton : true,
						isSetCentered : true
					});
			m.setTopZIndex()
		} else if (f.array.indexOf(this.getSetupAppList(), e.id) == -1
				&& !a.id("appAlert_category_select_" + e.id)) {
			l = '<div class="appAlert_container">\t\t\t\t\t\t\t<div class="appAlert_alert">\u60a8\u5c06\u6dfb\u52a0\u3010'
					+ h.encodeHtml(e.appName)
					+ '\u3011\u5e94\u7528</div>\t\t\t\t\t\t\t<div class="appAlert_category">\t\t\t\t\t\t\t\t<span class="appAlert_category_text" id="appAlert_category_text">\u9009\u62e9\u5e94\u7528\u5206\u7ec4\uff1a</span>\t\t\t\t\t\t\t\t<select id="appAlert_category_select_'
					+ e.id
					+ '" class="appAlert_category_select"></select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>';
			m = new qqweb.businessClass.Window({
						title : "\u6e29\u99a8\u63d0\u793a",
						modeSwitch : true,
						dragable : true,
						resize : false,
						width : 370,
						height : 168,
						html : l,
						hasOkButton : true,
						hasCloseButton : true,
						hasCancelButton : true,
						isSetCentered : true
					});
			m.setTopZIndex();
			var o = a.id("appAlert_category_select_" + e.id);
			l = this.getFolderList();
			for (var v = 0; v < l.length; v++) {
				var z = document.createElement("option");
				z.value = l[v].id;
				z.innerHTML = h.encodeHtml(l[v].name);
				o && o.appendChild(z)
			}
			o.value = 4;
			b.addObserver(m, "clickOkButton", function() {
						var H = d.getFolderIndexByFolderId(o.value);
						d.addToFolderList(H, e.id);
						d.configList.setupAppList.push(e.id);
						qqweb.appconfig.addAppConfig(e);
						t();
						m.close()
					});
			if (e.id < 1E5)
				(l = e.exinfo.reportName) && f.string.trim(l) && pgvSendClick({
							hottag : "WEB2QQ.ADDAPP." + l + ".LOGIN"
						})
		}
	};
	this.removeSetupAppList = function(e) {
		if (e.cannotUninstall)
			alert("\u62b1\u6b49,\u6b64\u5e94\u7528\u4e0d\u80fd\u5220\u9664!");
		else {
			qqweb.appconfig.removeAppConfig(e);
			this.removeFromFolderListById(e.id);
			this.removeFromQuickAppList(e.id);
			f.array.remove(this.getSetupAppList(), parseInt(e.id));
			t()
		}
	};
	this.getSetupAppList = function() {
		return this.configList.setupAppList
	};
	this.getDefaultSetupAppList = function() {
		return this.configList.defaultSetupAppList
	};
	this.isSetupAppListLoaded = function() {
		return s
	};
	var x = function() {
		if (!(qqweb.portal.getLoginLevel() == 1 || !s)) {
			var e = {
				onSuccess : function() {
				},
				context : d,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : f.json.stringify({
								quickAppList : d.getQuickAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(e)
		}
	};
	this.getQuickAppList = function() {
		return this.configList.quickAppList
	};
	this.setQuickQppList = function(e) {
		for (var l in e)
			e[l] = parseInt(e[l]);
		this.configList.quickAppList = e;
		x()
	};
	this.addToQuickAppList = function(e) {
		var l = e.appId = parseInt(e.appId), m = e.index;
		if (f.array.indexOf(this.getQuickAppList(), l) == -1) {
			m
					? this.configList.quickAppList.splice(m, 0, l)
					: this.configList.quickAppList.push(l);
			x();
			b.notifyObservers(d, "AddToQuickAppList", e);
			pgvSendClick({
						hottag : "web2qq.AppBar.wShortcut.creat"
					})
		}
	};
	this.removeFromQuickAppList = function(e) {
		if (f.array.indexOf(this.getQuickAppList(), parseInt(e)) > -1) {
			f.array.remove(this.getQuickAppList(), parseInt(e));
			x();
			b.notifyObservers(d, "RemoveFromQuickAppList", e);
			pgvSendClick({
						hottag : "web2qq.AppBar.wShortcut.remove"
					})
		}
	};
	var j = function() {
		if (!(qqweb.portal.getLoginLevel() == 1 || !s)) {
			var e = {
				onSuccess : function() {
				},
				context : d,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : f.json.stringify({
								folderList : d.getFolderList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(e)
		}
	};
	this.getFolderList = function(e) {
		return f.isUndefined(e)
				? this.configList.folderList
				: this.configList.folderList[e]
	};
	this.setFolderList = function(e, l) {
		if (f.isUndefined(l))
			this.configList.folderList = e;
		else
			this.configList.folderList[l] = e
	};
	this.getFolderIdById = function(e) {
		var l, m = this.getFolderList();
		e = parseInt(e);
		for (var o in m)
			if (f.array.indexOf(m[o].list, e) > -1) {
				l = m[o].id;
				break
			}
		return parseInt(l)
	};
	this.getFolderIndexByFolderId = function(e) {
		var l, m = this.getFolderList();
		for (var o in m)
			if (m[o].id == e) {
				l = o;
				break
			}
		return parseInt(l)
	};
	this.getFolderById = function(e) {
		var l, m = this.getFolderList();
		for (var o in m)
			if (m[o].id == e)
				l = m[o];
		return l
	};
	this.removeFromFolderListById = function(e) {
		var l = this.getFolderList();
		for (var m in l) {
			var o = l[m].list;
			f.array.indexOf(o, e) > -1 && f.array.remove(o, parseInt(e))
		}
		j()
	};
	this.removeFolderByFolderId = function(e) {
		if (e == 4)
			alert("\u62b1\u6b49,\u6b64\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664!");
		else {
			var l = this.getFolderById(e), m = l.list;
			for (var o in m) {
				f.array.remove(this.getSetupAppList(), parseInt(m[o]));
				f.array.remove(this.getQuickAppList(), parseInt(m[o]));
				var v = qqweb.appconfig.getAppConfig(parseInt(m[o]));
				qqweb.appconfig.removeAppConfig(v)
			}
			f.array.remove(this.getFolderList(), l);
			t();
			x();
			j();
			b.notifyObservers(d, "RemoveFolderByFolderId", e)
		}
	};
	this.updateFloderName = function(e, l) {
		var m = this.getFolderList();
		for (var o in m)
			if (m[o].id == e)
				m[o].name = l;
		j()
	};
	this.updateFolderList = function(e) {
		for (var l in e) {
			for (var m in e[l])
				e[l][m] = parseInt(e[l][m]);
			this.getFolderList(l).list = e[l]
		}
		j()
	};
	this.addToFolderList = function(e, l) {
		e = this.getFolderList(e).list;
		if (f.array.indexOf(e, l) == -1) {
			e.push(l);
			j()
		}
	};
	this.restoreConfig = function() {
	};
	this.getTheme = function() {
		return this.configList.theme
	};
	this.setTheme = function(e) {
		if (e) {
			var l = {};
			l.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : f.json.stringify({
							theme : e
						})
			};
			qqweb.rpcService.sendSetConfig(l);
			this.configList.theme.id = e
		}
	};
	this.getWallpaper = function() {
		return this.configList.wallpaper
	};
	this.setWallpaper = function(e) {
		if (e) {
			var l = {};
			l.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : f.json.stringify({
							wallpaper : e
						})
			};
			qqweb.rpcService.sendSetConfig(l);
			this.configList.wallpaper = e
		}
	};
	this.getWallpaperList = function() {
		return this.configList.wallpaperList
	};
	this.addWallpaper = function(e) {
		f.array.indexOf(this.configList.setupAppList, e.id) == -1
				&& this.configList.wallpaperList.push(e.fileId)
	};
	this.removeWallpaper = function(e) {
		f.array.remove(this.getWallpaperList(), e.fileId)
	};
	this.getAppearance = function() {
		return this.configList.appearance
	};
	this.setAppearance = function(e) {
		if (e) {
			var l = {};
			l.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : f.json.stringify({
							appearance : e
						})
			};
			qqweb.rpcService.sendSetConfig(l);
			this.configList.appearance.id = e
		}
	};
	this.setCustomTheme = function(e, l) {
		if (e) {
			l = l || "";
			var m = {};
			m.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : f.json.stringify({
							appearance : l,
							wallpaper : e
						})
			};
			qqweb.rpcService.sendSetConfig(m);
			this.configList.appearance.id = l;
			this.configList.wallpaper = e
		}
	};
	this.initQQWeb = function() {
		var e = {
			onSuccess : qqweb.config.onConfigGetSuc,
			action : "get_custom",
			context : this,
			data : {
				retype : 1,
				itemlist : f.json.stringify({
							QQWeb : ["theme", "wallpaper", "wallpaperList",
									"appearance", "appBarSetting",
									"setupAppList", "isShowTip",
									"quickAppList", "folderList", "runStatus",
									"chatboxMode", "isNotNeedCtrlKey",
									"fontFormat", "msgBubblePos",
									"notifySetting"]
						})
			}
		};
		qqweb.rpcService.sendGetConfig(e)
	};
	d.__eqqid = "50"
});
Jet().$package("qqweb.businessClass", function(f) {
	var d = f.dom, b = f.event;
	this.App = new f.Class({
		init : function(a) {
			a.id || f.out("App: [" + a.appName + "] \u7f3a\u5c11 id !!!");
			this.option = {
				id : a.id,
				title : a.appName || "\u672a\u547d\u540d\u5e94\u7528",
				appType : a.appType || 1,
				appUrl : a.appUrl || null,
				windowMode : a.windowMode || "single",
				x : a.x,
				y : a.y,
				width : a.width || 600,
				height : a.height || 500,
				hasCloseButton : f.isUndefined(a.hasCloseButton)
						? true
						: a.hasCloseButton,
				hasMaxButton : f.isUndefined(a.hasMaxButton)
						? true
						: a.hasMaxButton,
				hasMinButton : f.isUndefined(a.hasMinButton)
						? true
						: a.hasMinButton,
				hasOkButton : a.hasOkButton || false,
				hasCancelButton : a.hasCancelButton || false,
				modeSwitch : f.isUndefined(a.modeSwitch) ? true : a.modeSwitch,
				dragable : f.isUndefined(a.dragable) ? true : a.dragable,
				dragProxy : f.isUndefined(a.dragProxy) ? qqweb.layout
						.getWindowDragProxy() : a.dragProxy,
				resize : f.isUndefined(a.resize) ? true : a.resize,
				defaultMode : f.isUndefined(a.defaultMode)
						? "restore"
						: a.defaultMode,
				flashMode : f.isUndefined(a.flashMode) ? false : a.flashMode,
				loginLevel : f.isUndefined(a.loginLevel)
						? qqweb.CONST.LOGIN_LEVEL_NONE
						: a.loginLevel,
				customLoginValidate : a.customLoginValidate,
				alterMode : f.isUndefined(a.alterMode) ? false : a.alterMode,
				ieOnly : f.isUndefined(a.ieOnly) ? false : a.ieOnly
			};
			if (f.platform.iPad && this.option.id === 15)
				this.option.appUrl = "http://live.qq.com/ipad/";
			f.out("id:" + this.option.id + ", hasCloseButton:"
					+ this.option.hasCloseButton);
			this._isRunning = false;
			b.notifyObservers(this, "init", this)
		},
		detectActiveX : function() {
			var a = null;
			try {
				a = new ActiveXObject("TXFTNActiveX.FTNUpload")
			} catch (h) {
				return false
			}
			if (a) {
				var s = "";
				try {
					s = a && (a.version ? a.version : "1.0.0.8") || ""
				} catch (w) {
				}
				if (!s)
					return false;
				return parseInt(s.split(".").join("")) > 1007 ? true : false
			} else
				return false
		},
		run : function(a) {
			var h = this;
			a = a || {};
			f.extend(this.option, a);
			if (f.platform.iPad)
				switch (parseInt(this.option.id)) {
					case 5 :
					case 9 :
					case 11 :
					case 12 :
					case 13 :
					case 20 :
					case 24 :
					case 26 :
					case 27 :
					case 30 :
					case 35 :
					case 36 :
					case 37 :
					case 39 :
						qqweb.portal.showUnsupportIPadWindow(this.option.id);
						return
				}
			var s = qqweb.portal.getLoginLevel();
			if (!a.noValidateLogin && this.option.loginLevel > s)
				this.option.customLoginValidate ? b.notifyObservers(this,
						"needLogin", {
							has : this.option.loginLevel,
							need : s
						}) : qqweb.portal.showIntroduceWindow(this.option.id);
			else if (this.option.id == "56" && !f.browser.mobileSafari)
				qqweb.portal.showNotSupportWindow(this.option.id);
			else if (f.browser.ie && this.option.id == "13"
					&& !this.detectActiveX())
				qqweb.portal.showWarningWindow(this.option.id);
			else if (this.option.id == "25")
				qqweb.portal.showComingSoonWindow(this.option.id);
			else if (this.option.ieOnly && !f.browser.ie || f.browser.ie
					&& this.option.id == "13" && !this.detectActiveX())
				qqweb.portal.showIeOnlyWindow(this.option.id);
			else {
				if (this.isRunning())
					b.notifyObservers(this, "runAgain", a);
				else {
					this._isRunning = true;
					if (this.option.windowMode !== "none") {
						this.createWindow(a);
						f.browser.ie
								&& this.option.id == "13"
								&& !this.detectActiveX()
								&& this.window.createNoActiveXDom(this.window
										.getId())
					}
					if (this.option.appType !== 1)
						if (this.option.appType === 2) {
							if ((!this.option.ieOnly || f.browser.ie)
									&& (!f.browser.ie || this.option.id != "13" || this
											.detectActiveX())) {
								this.window
										.setHtml('\t\t\t\t\t\t\t<div id="container_iframeApp_'
												+ this.window.getId()
												+ '" class="content_area">\t\t\t\t\t\t\t\t<iframe id="iframeApp_'
												+ this.window.getId()
												+ '" class="iframeApp" src="about:blank" frameborder="no" allowtransparency="true" scrolling="auto" hidefocus ></iframe>\t\t\t\t\t\t\t\t<div id="iframeApp_dragResizeMask_'
												+ this.window.getId()
												+ '" class="iframeDragResizeMask"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t');
								this._contenty = this._contentx = 0;
								this._iframe = d.id("iframeApp_"
										+ this.window.getId());
								this._iframeDragResizeMask = d
										.id("iframeApp_dragResizeMask_"
												+ this.window.getId());
								this._containerIframe = d
										.id("container_iframeApp_"
												+ this.window.getId());
								f.platform.iPad
										&& d.addClass(this._containerIframe,
												"ipad");
								b.on(this._iframe, "load", function() {
											b.notifyObservers(h, "load")
										});
								this._iframe.src = a && a.appUrl
										|| this.option.appUrl;
								s = function(i) {
									i = h.window.getBodySize();
									h._resizeIframe(i)
								};
								this._resizeIframe = function(i) {
									if (!f.platform.iPad) {
										d.setStyle(this._iframe, "width",
												i.width - 2 + "px");
										d.setStyle(this._iframe, "height",
												i.height - 2 + "px")
									}
								};
								s();
								b.addObserver(this.window, "resize",
										function(i) {
											h.option.flashMode
													&& h.window != qqweb.layout
															.getCurrentWindow()
													|| h._resizeIframe(i)
										});
								b.addObserver(this.window, "show", s);
								b.addObserver(this.window, "dragStart",
										function() {
											f.platform.iPad
													|| d
															.show(h._iframeDragResizeMask)
										});
								b.addObserver(this.window, "dragEnd",
										function() {
											d.hide(h._iframeDragResizeMask)
										})
							}
							s = qqweb.layout.getCurrentWindow();
							s = document.getElementById("iframeApp_"
									+ s.getId());
							var w = false;
							try {
								w = s
										&& typeof s.contentWindow.padEventProxy == "function"
										? true
										: false
							} catch (c) {
							}
							f.platform.iPad && !w
									&& new f.ui.IframeScroller(this._iframe)
						}
					s = function() {
						h.window.setCurrent()
					};
					this.option.windowMode === "single"
							&& b.addObserver(this, "runAgain", s);
					b.notifyObservers(this, "runFirst", a);
					b.addObserver(this, "appExit", h.exit)
				}
				b.notifyObservers(qqweb.portal, "appRun", this.option.id);
				b.notifyObservers(this, "run", a)
			}
		},
		createWindow : function(a) {
			var h = this;
			a = a || {};
			var s = new qqweb.businessClass.Window({
						appId : h.option.id,
						flashMode : h.option.flashMode,
						loginLevel : h.option.loginLevel,
						title : h.option.title,
						modeSwitch : h.option.modeSwitch,
						dragProxy : h.option.dragProxy,
						dragable : h.option.dragable,
						resize : h.option.resize,
						x : a.x || h.option.x,
						y : a.y || h.option.y,
						width : a.width || h.option.width,
						height : a.height || h.option.height,
						defaultMode : h.option.defaultMode,
						hasCloseButton : h.option.hasCloseButton,
						hasMaxButton : h.option.hasMaxButton,
						hasMinButton : h.option.hasMinButton,
						hasOkButton : h.option.hasOkButton,
						hasCancelButton : h.option.hasCancelButton,
						alterMode : h.option.alterMode,
						ieOnly : h.option.ieOnly,
						appType : h.option.appType
					});
			this.window = s;
			a = {
				onWindowClose : function() {
					if (h._iframe)
						h._iframe.src = "about:blank";
					h.destroy()
				},
				onExit : function() {
					b.notifyObservers(s, "closeWindow", s)
				},
				onSetCurrent : function() {
					s.setX(s._x);
					d.setStyle(h._containerIframe, "height", "99%");
					d.setStyle(h._containerIframe, "width", "100%");
					s.hideAlterDom()
				},
				onSetNotCurrent : function() {
					if (!f.platform.iPad) {
						d.setStyle(h._iframe, "width", "1px");
						d.setStyle(h._iframe, "height", "1px");
						d.setStyle(h._containerIframe, "width", "1px");
						d.setStyle(h._containerIframe, "height", "1px");
						s.showAlterDom()
					}
				},
				onWindowMin : function() {
					if (h.option.flashMode) {
						var w = s.getX();
						s._x = w;
						s.setX(-10000);
						s._x = w
					}
				}
			};
			b.addObserver(this.window, "min", a.onWindowMin);
			this.option.alterMode
					&& !f.browser.ie
					&& b.addObserver(this.window, "setNotCurrent",
							a.onSetNotCurrent);
			if (this.option.flashMode && (f.browser.ie || !this.option.ieOnly)) {
				b.addObserver(this.window, "setCurrent", a.onSetCurrent);
				b.addObserver(this.window, "min", a.onWindowMin)
			}
			b.addObserver(s, "close", a.onWindowClose);
			b.addObserver(this, "exit", a.onExit);
			return s
		},
		setCurrent : function() {
			b.notifyObservers(this, "setCurrent");
			this.window && this.window.setCurrent()
		},
		getCurrent : function() {
			return null
		},
		isRunning : function() {
			return this._isRunning
		},
		exit : function() {
			b.notifyObservers(this, "exit");
			this.destroy()
		},
		destroy : function() {
			b.notifyObservers(this, "destroy");
			this._isRunning = false;
			b.notifyObservers(qqweb.portal, "appExit", this.option.id)
		},
		updateAppConfig : function(a) {
			var h = this;
			if (a.id == h.option.id) {
				f.extend(h.option, a);
				h._isRunning && a.type == 2 && h.window.setTitle(a.appName)
			}
		},
		removeAppConfig : function() {
			var a = this;
			if (a._iframe)
				a._iframe.src = "about:blank";
			a.exit()
		},
		touchMoveHandler : function(a) {
			var h = this._iframe, s = this._containerIframe, w = this._contentx
					+ a.sx;
			a = this._contenty + a.sy;
			var c = d.getWidth(h), i = d.getHeight(h), n = d.getWidth(s);
			s = d.getHeight(s);
			if (w > 0)
				w = 0;
			else if (w < n - c)
				w = n - c;
			if (a > 0)
				a = 0;
			else if (a < s - i)
				a = s - i;
			d.setStyle(h, "left", w + "px");
			d.setStyle(h, "top", a + "px");
			this._contentx = w;
			this._contenty = a
		}
	})
});
function ptlogin2_onResize(f, d) {
	qqweb.portal.setLoginWindowHeight(d + 90)
}
Jet().$package("qqweb.portal", function(f) {
	var d = this, b = f.dom, a = f.event, h = f.http, s, w = false, c = qqweb.CONST.LOGIN_LEVEL_NONE, i = false, n = false, t = false, x = false, j = "", e = false, l, m, o = null, v = document.title, z = null, H = false, P = false, Y = true;
	this.speedTest = new (function() {
		var g = [];
		this.sRTS = this.setReportTimeStamp = function(k, r, D, F) {
			g[k] || (g[k] = {});
			g[k][r] = D.getTime();
			F == true && this.report([k])
		};
		this.gRTS = this.getReportTimeStamp = function(k, r) {
			if (g[k])
				return g[k][r];
			return null
		};
		this.report = function(k) {
			for (var r = false, D = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4="
					+ qqweb.portal.getCookieUin(), F = 0; F < k.length; F++) {
				var C = k[F];
				if (g[C].end && g[C].start) {
					r = true;
					D += "&" + C + "=" + (g[C].end - g[C].start)
				}
			}
			if (r)
				(new Image).src = D
		}
	});
	this.setPortalSelf = function(g) {
		qqweb.portal.self.allow = g.allow;
		qqweb.portal.self.age = g.age;
		qqweb.portal.self.nick = g.nick;
		qqweb.portal.self.htmlNick = f.string.encodeHtml(String(g.nick));
		qqweb.portal.self.titleNick = String(g.nick);
		qqweb.portal.self.country = g.country;
		qqweb.portal.self.province = g.province;
		qqweb.portal.self.city = g.city;
		qqweb.portal.self.gender = g.gender;
		qqweb.portal.self.face = g.face;
		qqweb.portal.self.phone = g.phone;
		qqweb.portal.self.mobile = g.mobile;
		qqweb.portal.self.email = g.email
	};
	this.setPortalSelfItem = function(g, k) {
		qqweb.portal.self[g] = k
	};
	this.getPortalSelf = function(g) {
		return typeof qqweb.portal.self == "undefined"
				? {}
				: typeof g == "undefined"
						? qqweb.portal.self
						: qqweb.portal.self[g]
	};
	var ia = function(g) {
		d.runApp("appBar", {
					callback : function() {
						d.runApp("appBar", {
									callback : function() {
										g();
										f.out("tipsAction");
										d.runApp("tips");
										f.out("tipsEnd");
										d.runApp("messageCenter");
										d.runApp("bubbleTip")
									}
								})
					}
				})
	}, ja = function() {
		for (var g = d.getDefaultApps(), k = 0; k < g.length; ++k)
			if (!(d.getLoginLevel() > 1 && g[k] == qqweb.config.__eqqid))
				if (f.browser.safari)
					switch (g[k]) {
						case "20" :
							break;
						default :
							d.runApp(g[k])
					}
				else
					d.runApp(g[k])
	};
	this.getDefaultApps = function() {
		return ["18", "19", "20", qqweb.config.__eqqid]
	};
	var N = function() {
		return ["56"]
	}, da = function() {
		for (var g = N(), k = 0; k < g.length; ++k)
			switch (g[k]) {
				case "56" :
					f.browser.mobileSafari && d.runApp(g[k]);
					break;
				default :
					break
			}
	}, ea = function() {
		var g = f.string.mapQuery(window.location.search).run || "";
		if (g)
			return f.json.parse(g)
	}, Z = function() {
		var g = ea();
		for (var k in g) {
			g[k].runFrom = "url";
			qqweb.portal.runApp(k, g[k])
		}
	}, T = this.setLoginLevel = function(g) {
		c = g;
		a.notifyObservers(qqweb.portal, "loginLevelChanged", g)
	}, G = {
		isUserAppListReady : false,
		isAppbarReady : false
	}, Q = function() {
		var g = true;
		for (var k in G)
			G[k] || (g = false);
		if (g) {
			f.out("\u7cfb\u7edf\u6a21\u5757Ready");
			a.notifyObservers(d, "systemAppReady")
		}
	};
	this.getIsUserAppListReady = function() {
		return G.isUserAppListReady
	};
	var K = {
		onUserAppListReady : function() {
			G.isUserAppListReady = true;
			f.out("onUserAppListReady");
			Q()
		},
		onAppbarReady : function() {
			G.isAppbarReady = true;
			f.out("onAppbarReady");
			Q()
		},
		onPortalReady : function() {
			var g = this.getQQWebStatus();
			if (g)
				for (var k = 0; k < g.appList.length; k++) {
					var r = g.appList[k];
					r = r.appId;
					if (~~r)
						r = "app" + r;
					(r = qqweb.app[r]) && r.isRunning() && r.exit()
				}
			if (window.location.search.indexOf("nodefault") === -1) {
				if (g = qqweb.config.configList.runStatus) {
					for (k = 0; k < g.appList.length; k++) {
						r = g.appList[k];
						if (r.appId == qqweb.config.__eqqid)
							r.width ? qqweb.portal.runApp(r.appId, {
										defaultMode : r.defaultMode,
										x : r.x,
										y : r.y,
										width : r.width,
										height : r.height,
										systemRun : true
									}) : qqweb.portal.runApp(r.appId, {
										x : r.x,
										y : r.y,
										systemRun : true
									});
						else
							r.width ? qqweb.portal.runApp(r.appId, {
										defaultMode : r.defaultMode,
										x : r.x,
										y : r.y,
										width : r.width,
										height : r.height
									}) : qqweb.portal.runApp(r.appId, {
										x : r.x,
										y : r.y
									})
					}
					g.currentApp && qqweb.portal.runApp(g.currentApp)
				} else
					ja();
				da()
			}
			if (m)
				for (k = 0; k < m.length; ++k)
					qqweb.portal.runApp(m[k], {
								noValidateLogin : true
							});
			V(P);
			Z();
			qqweb.portal.speedTest.sRTS(8, "end", new Date, true);
			if (typeof pgvMain == "function") {
				pvRepeatCount = 1;
				pgvMain("", {
							virtualURL : qqweb.CONST.DOMAIN
						})
			}
		},
		onExitSuccess : function() {
			location.reload()
		},
		onGetVfWebQQError : function() {
			var g = d.getLoginLevel();
			g < qqweb.CONST.LOGIN_LEVEL_NONE && T(qqweb.CONST.LOGIN_LEVEL_NONE);
			g = d.getLoginLevel();
			f.out("logininfoError");
			a.notifyObservers(qqweb.portal, "UserAppListReady", g)
		},
		onGetVfWebQQSuccess : function(g) {
			d.addExitConfirm();
			d.getLoginLevel() < qqweb.CONST.LOGIN_LEVEL_NOCHAT
					&& T(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
			d.getLoginLevel();
			o = g.result && g.result.length === 2 && g.result[0] == "vfwebqq"
					? g.result[1]
					: null;
			a.notifyObservers(qqweb.portal, "GetLoginInfoSuccess")
		},
		onGetLoginInfoSuccess : function() {
			if (!$()) {
				j = d.uin;
				qqweb.config.initQQWeb();
				d.runApp("myPanel");
				a.notifyObservers(qqweb.portal, "uinChange")
			}
		},
		onGetAppConfigComplete : function() {
			var g = d.getLoginLevel();
			a.notifyObservers(qqweb.portal, "portalReady", g)
		},
		onUpdateAppConfig : function(g) {
			var k = d.getApp(g.id);
			k && k.updateAppConfig(g)
		},
		onRemoveAppConfig : function(g) {
			var k = d.getApp(g.id);
			k && k.removeAppConfig(g);
			delete qqweb.app["app" + g.id];
			d.setAppLoading(g.id, false)
		}
	}, $ = function() {
		return j == d.uin ? true : false
	}, W = function() {
		if (!w) {
			f.out(">>>>> onDesktopClick");
			qqweb.portal.recoverCookie()
		}
	};
	this.init = function(g) {
		g = {};
		s = {};
		l = 0;
		a.addObserver(qqweb.portal, "exitSuccess", K.onExitSuccess);
		a.addObserver(qqweb.rpcService, "GetVfWebQQError", K.onGetVfWebQQError);
		a.addObserver(qqweb.rpcService, "GetVfWebQQSuccess",
				K.onGetVfWebQQSuccess);
		a.addObserver(qqweb.portal, "GetLoginInfoSuccess",
				K.onGetLoginInfoSuccess);
		a.addObserver(qqweb.appconfig, "GetAppConfigComplete",
				K.onGetAppConfigComplete);
		a.addObserver(qqweb.appconfig, "GetDefaultAppConfigComplete",
				K.onGetAppConfigComplete);
		a.addObserver(qqweb.appconfig, "UpdateAppConfig", K.onUpdateAppConfig);
		a.addObserver(qqweb.appconfig, "RemoveAppConfig", K.onRemoveAppConfig);
		a.addObserver(qqweb.portal, "portalReady", K.onPortalReady);
		a.addObserver(qqweb.portal, "UserAppListReady", K.onUserAppListReady);
		a.addObserver(qqweb.portal, "appbarReady", K.onAppbarReady);
		qqweb.layout.init();
		qqweb.sound.init();
		qqweb.util.initSystem();
		a.addObserver(qqweb.layout, "clickDesktop", W);
		a.addObserver(qqweb.layout, "desktopFocus", W);
		ia(function() {
					d.start();
					d.runApp("myPanel");
					d.runApp("sceneChristmas");
					qqweb.rpcService.sendGetVfWebQQ(d.uin)
				})
	};
	this.start = function() {
		this.recordAccount()
	};
	this.recordAccount = function() {
		this.ptwebqq = this.getCookiePtwebqq();
		this.uin = this.getCookieUin();
		this.originalUin = this.getOriginalCookieUin();
		this.skey = this.getCookieSkey()
	};
	this.getPtwebqq = function() {
		return this.ptwebqq
	};
	this.setPtwebqq = function(g) {
		return this.ptwebqq = g
	};
	this.getUin = function() {
		return this.uin
	};
	this.getOriginalUin = function() {
		return this.originalUin
	};
	this.getSkey = function() {
		return this.skey
	};
	this.getLoginLevel = function() {
		var g = this.getApp("eqq");
		if (g && g.getIsLogin())
			return qqweb.CONST.LOGIN_LEVEL_ALL;
		return c
	};
	this.recoverCookie = function() {
	};
	var V = function(g) {
		if (H && g) {
			var k = qqweb.config.__eqqid, r = qqweb.portal.getApp(k);
			if (r)
				r.isRunning() ? r.window.show() : r.run({
							eqqNeeded : true
						});
			else
				d.runApp(qqweb.config.__eqqid, {
							eqqNeeded : true
						});
			if (g) {
				r && a.notifyObservers(d, "StrongLoginSumited");
				if (x)
					EQQ.loginEQQ();
				else {
					g = qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(k / 1E3)
							% 1E3 + "/" + k + "/eqq.all.js";
					qqweb.portal.speedTest.sRTS(11, "start", new Date);
					qqweb.portal.speedTest.sRTS(9, "start", new Date);
					f.http.loadScript(
							g + "?t=" + qqweb.CONST.UPDATE_TIME_STAMP, {
								query : "",
								onSuccess : function() {
									EQQ.loginEQQ();
									x = true;
									qqweb.portal.speedTest.sRTS(9, "end",
											new Date, true)
								},
								onError : function() {
								}
							})
				}
			} else
				qqweb.rpcService.sendGetVfWebQQ(d.uin)
		}
		H = false
	};
	this.reRunApps = function(g) {
		qqweb.portal.start();
		(P = g)
				? T(qqweb.CONST.LOGIN_LEVEL_ALL)
				: T(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
		H = true;
		if ($()) {
			if (m)
				for (var k = 0; k < m.length; ++k)
					qqweb.portal.runApp(m[k], {
								noValidateLogin : true
							});
			V(g)
		} else
			qqweb.rpcService.sendGetVfWebQQ(this.uin)
	};
	this.hideLoginWindow = function() {
		var g;
		if (g = b.id("ifram_login"))
			g.src = "about:blank";
		try {
			this.hideIntroduceWindow()
		} catch (k) {
		}
		try {
			n.close()
		} catch (r) {
		}
	};
	this.showLoginWindow = function(g, k) {
		var r = {
			width : 400,
			height : 300,
			title : "\u767b\u5f55WebQQ",
			hasCloseButton : true,
			isSetCurrent : true,
			isSetCentered : true,
			dragable : true,
			src : ""
		};
		m = [g];
		g = window.location.protocol + "//" + window.location.host
				+ "/loginproxy.html";
		if (k) {
			g += "?strong=true";
			r.title = "\u767b\u5f55QQ"
		} else {
			g += "?strong=false";
			r.title = "\u767b\u5f55WebQQ"
		}
		g = encodeURIComponent(g);
		var D = "";
		if (k) {
			r.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url="
					+ g + "&f_url=loginerroralert";
			D = f.cookie.get("closeLoginTip") == ""
					? '\t\t\t\t<div id="login_window_content_area" class="content_area"><div style="display:block;position:absolute;padding-left:2px;width:100%;background:#ffffe1"><span style="float:left">\u6e29\u99a8\u63d0\u793a\uff1a\u767b\u5f55\u540e\uff0c\u60a8\u5728\u522b\u5904\u5df2\u767b\u5f55\u7684\u540c\u4e00\u5e10\u53f7\u4f1a\u4e0b\u7ebf.</span><span id="close_login_tip" onclick="this.parentNode.style.display=\'none\';" style="display:inline;cursor:pointer;float:right;margin-right:5px;">\uff58</span></div><div class="login_window_wrap">\t\t\t\t<iframe id="ifram_login"  src="'
							+ r.src
							+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t\t</div></div>'
					: '\t\t\t\t<div id="login_window_content_area" class="content_area"><div class="login_window_wrap">\t\t\t\t<iframe id="ifram_login"  src="'
							+ r.src
							+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t\t</div></div>'
		} else {
			r.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=self&appid=15000101&hide_title_bar=1&no_verifyimg=1&s_url="
					+ g + "&f_url=loginerroralert&target=self";
			D = '<div id="login_window_content_area" class="content_area"><div class="login_window_wrap">\t\t\t<iframe id="ifram_login"  src="'
					+ r.src
					+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t</div></div>'
		}
		if (!n || !n.isShow())
			n = new qqweb.businessClass.Window(r);
		else
			n.setCurrent();
		n.setHtml(D);
		if (k) {
			r = b.id("loginIcon");
			g = b.id("loginIcon_disable");
			if (r && g) {
				b.hide(r);
				b.show(g)
			}
			a.addObserver(n, "close", function() {
						a.notifyObservers(d, "StrongLoginClose")
					})
		}
		var F = b.id("login_window_content_area");
		a.addObserver(n, "setNewHeight", function() {
					b.setStyle(F, "height", "99%")
				});
		b.id("close_login_tip")
				&& a.on(b.id("close_login_tip"), "click", function() {
							this.parentNode.style.display = "none";
							f.cookie.set("closeLoginTip", "true", "qq.com", "",
									3E6)
						});
		n.show();
		this.login_strong = k
	};
	this.setLoginWindowHeight = function(g) {
		n.setHeight(g)
	};
	this.hideIntroduceWindow = function() {
		i && i.close()
	};
	this.showIntroduceWindow = function(g) {
		var k = qqweb.appconfig.getAllConfig(g), r = 'Hi\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\u54e6\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
		if (g == "messageBox" || g == "buddyManager")
			r = 'Hi\uff0c\u6b64\u5e94\u7528\u9700\u8981\u767b\u5f55QQ\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
		r = '<div class="content_area" style="_height:406px"><div class="intro_window_wrap">\t\t<div id="intro_window_area" class="intro_window_area" title="'
				+ f.string.encodeHtmlAttributeSimple(String(k.appDesc))
				+ '">\t\t\t<h3>'
				+ f.string.encodeHtmlSimple(String(k.appName))
				+ "</h3><span>"
				+ f.string.encodeHtmlSimple(String(k.appDesc))
				+ '</span></div>\t\t<div style="margin-top:50px; text-align: center; font-weight: bold; font-size:14px;">'
				+ r + "</div>\t\t</div></div>";
		k.flashMode = false;
		k.windowMode = "single";
		k.dragable = true;
		k.hasCloseButton = true;
		k.defaultMode = "restore";
		k.isSetCurrent = true;
		k.width = 545;
		k.height = false;
		if (!i || !i.isShow())
			i = new qqweb.businessClass.Window(k);
		i.setTitle(k.appName);
		i.setCurrent();
		i.setHtml(r);
		r = b.id("intro_window_area");
		b.setStyle(r, "backgroundImage", "url(./module/appmarket/images/thumb_"
						+ k.id + ".png)");
		r = b.id("portal_login_btn");
		a.on(r, "click", function(D) {
					D.preventDefault();
					k.loginLevel > 2 ? d.showLoginWindow(g, true) : d
							.showLoginWindow(g, false);
					i.close()
				})
	};
	this.showWarningWindow = function(g) {
		if (b.id("activeXWindow") == undefined) {
			g = qqweb.appconfig.getAllConfig(g);
			g.flashMode = false;
			g.windowMode = "single";
			g.dragable = true;
			g.hasCloseButton = true;
			g.defaultMode = "restore";
			g.isSetCurrent = true;
			g.width = false;
			g.height = false;
			var k = new qqweb.businessClass.Window(g);
			k.setTitle(g.title);
			k.setCurrent();
			k
					.setHtml("<div id='activeXWindow' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u6b64\u5e94\u7528\u9700\u8981\u63d2\u4ef6\u652f\u6301</span><a class='plain_text' id='get_qqDisk_activeX' href='###'>\u70b9\u51fb\u83b7\u53d6\u5e76\"\u5b89\u88c5\"</a></div></div>");
			b.setStyle(k.body, "background", "#233040");
			b.id("get_qqDisk_activeX").onclick = function() {
				k.body.innerHTML += '<div><object classid="clsid:BDEACC50-F56D-4D60-860F-CF6ED1766D65" codebase="http://res.qqmail.com/zh_CN/activex/TencentMailActiveX.cab#version=1,0,1,32"></object></div>';
				k.close();
				b.id("activeXWindow").style.display = "block"
			}
		}
	};
	this.showIeOnlyWindow = function(g) {
		var k = "ieOnlyWindow" + g;
		if (b.id(k) == undefined) {
			g = qqweb.appconfig.getAllConfig(g);
			k = "<div id='"
					+ k
					+ "' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u4ec5\u652f\u6301ie\u6d4f\u89c8\u5668\u3002</span></div></div>";
			g.flashMode = false;
			g.windowMode = "single";
			g.dragable = true;
			g.hasCloseButton = true;
			g.defaultMode = "restore";
			g.isSetCurrent = true;
			g.width = 545;
			g.height = 450;
			var r = new qqweb.businessClass.Window(g);
			r.setTitle(g.title);
			r.setCurrent();
			r.setHtml(k);
			b.setStyle(r.body, "background", "#233040")
		}
	};
	this.showUnsupportIPadWindow = function(g) {
		var k = "ieOnlyWindow" + g;
		if (b.id(k) == undefined) {
			g = qqweb.appconfig.getAllConfig(g);
			k = "<div id='"
					+ k
					+ "' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u4e0d\u652f\u6301iPad\u3002</span></div></div>";
			g.flashMode = false;
			g.windowMode = "single";
			g.dragable = true;
			g.hasCloseButton = true;
			g.defaultMode = "restore";
			g.isSetCurrent = true;
			g.width = 545;
			g.height = 450;
			var r = new qqweb.businessClass.Window(g);
			r.setTitle(g.title);
			r.setCurrent();
			r.setHtml(k);
			b.setStyle(r.body, "background", "#233040")
		}
	};
	this.showNotSupportWindow = function(g) {
		var k = "ieOnlyWindow" + g;
		if (b.id(k) == undefined) {
			g = qqweb.appconfig.getAllConfig(g);
			k = "<div id='"
					+ k
					+ "' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u65f6\u4e0d\u652f\u6301\u8be5\u6d4f\u89c8\u5668\u3002</span></div></div>";
			g.flashMode = false;
			g.windowMode = "single";
			g.dragable = true;
			g.hasCloseButton = true;
			g.defaultMode = "restore";
			g.isSetCurrent = true;
			g.width = 545;
			g.height = 450;
			var r = new qqweb.businessClass.Window(g);
			r.setTitle(g.title);
			r.setCurrent();
			r.setHtml(k);
			b.setStyle(r.body, "background", "#233040")
		}
	};
	this.showComingSoonWindow = function(g) {
		if (b.id("comingSoonWindow") == undefined) {
			g = qqweb.appconfig.getAllConfig(g);
			g.flashMode = false;
			g.windowMode = "single";
			g.dragable = true;
			g.hasCloseButton = true;
			g.defaultMode = "restore";
			g.isSetCurrent = true;
			g.width = false;
			g.height = false;
			var k = new qqweb.businessClass.Window(g);
			k.setTitle(g.title);
			k.setCurrent();
			k
					.setHtml("<div id='comingSoonWindow' class='flash_alt'><div class='appIframeAlter'></div><div  class='appComingSoon'></div></div>");
			b.id("comingSoonWindow").style.display = "block";
			b.setStyle(k.body, "background", "#ffffff")
		}
	};
	this.getCookieUin = function() {
		var g = f.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN);
		if (g)
			g = parseInt(g.substr(1), 10);
		f.out("uin:" + g);
		return g
	};
	this.getOriginalCookieUin = function() {
		return f.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN)
	};
	this.getCookieSkey = function() {
		return f.cookie.get("skey", qqweb.CONST.MAIN_DOMAIN)
	};
	this.getCookiePtwebqq = function() {
		return f.cookie.get("ptwebqq", qqweb.CONST.MAIN_DOMAIN)
	};
	this.runApp = function(g, k) {
		var r = this.getAllConfig(g);
		if (r) {
			var D = this.getApp(g);
			if (D) {
				D.run && D.run(k);
				k && k.callback && k.callback()
			} else if (r)
				if (r.appType == 1)
					this.loadApp(r, k);
				else if (r.appType == 2) {
					if (~~g > 0)
						qqweb.app["app" + g] = new qqweb.businessClass.App(r);
					else
						qqweb.app[g] = new qqweb.businessClass.App(r);
					qqweb.portal.runApp(g, k)
				}
			if (r)
				Y = false
		} else
			f.out("id:" + g)
	};
	this.loadApp = function(g, k) {
		g = g || {};
		if (!this.getAppLoading(g.id)) {
			this.setAppLoading(g.id, true);
			var r = g.id, D = qqweb.CONST.PUB_APP_STATIC_URL
					+ Math.floor(r / 1E3) % 1E3 + "/" + r + "/", F = g.css || D
					+ "style.css";
			D = g.js || D + "main.js";
			if (g.css || f.isNumber(r))
				h.loadCss(F + "?" + qqweb.CONST.UPDATE_TIME_STAMP);
			h.loadScript(D + "?" + qqweb.CONST.UPDATE_TIME_STAMP, {
						onSuccess : function() {
							qqweb.portal.runApp(g.id, k)
						}
					})
		}
	};
	this.getAppConfigList = function() {
		return qqweb.appconfig.appConfigList
	};
	this.getAppConfig = function(g) {
		return qqweb.appconfig.getAppConfig(g)
	};
	this.getSystemConfig = function(g) {
		return qqweb.appconfig.getSystemConfig(g)
	};
	this.getAllConfig = function(g) {
		return qqweb.appconfig.getAllConfig(g)
	};
	this.getApp = function(g) {
		return ~~g > 0 ? qqweb.app["app" + g] : qqweb.app[g]
	};
	this.setAppLoading = function(g, k) {
		return s[g] = k
	};
	this.getAppLoading = function(g) {
		return s[g]
	};
	this.setIsLoginSuccess = function(g) {
		t = g
	};
	this.getIsLoginSuccess = function() {
		return t
	};
	this.confirm = function(g) {
		return window.confirm(g)
	};
	this.alert = function(g) {
		return window.alert(g)
	};
	this.closeHook = function(g) {
		EQQ.api.log("browser-close");
		var k = "\u6267\u884c\u6b64\u64cd\u4f5c\u540e\u5c06\u4e22\u5931\u672c\u6b21\u804a\u5929\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f";
		if (d.getLoginLevel() < qqweb.CONST.LOGIN_LEVEL_ALL)
			k = "\u6267\u884c\u6b64\u64cd\u4f5c\u53ef\u80fd\u4f1a\u4e22\u5931\u9875\u9762\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f";
		pgvSendClick({
					hottag : "web2qq.qqpanel.status.exitQQ"
				});
		if (f.browser.safari || f.browser.chrome)
			return k;
		else if (f.browser.ie > 0)
			event.returnValue = k;
		else
			g.returnValue = k
	};
	this.addCloseHook = function() {
		if (!e) {
			e = true;
			a.on(window, "beforeunload", this.closeHook);
			a.on(window, "unload", function() {
						if (EQQ && EQQ.getIsLogin()) {
							EQQ.logout();
							EQQ.api.log("browser-close-ok");
							EQQ.RPCService._proxy
									&& EQQ.RPCService._proxy.abort();
							EQQ.View.ChatBox
									&& EQQ.View.ChatBox.scaptureHotkey
									&& EQQ.View.ChatBox.scaptureHotkey
											.unstall()
						}
					})
		}
	};
	this.removeCloseHook = function() {
		a.off(window, "beforeunload");
		e = false
	};
	this.getCloseHook = function() {
		return e
	};
	this.addExitConfirm = function(g) {
		l += g || 1;
		l > 0 && this.addCloseHook();
		return l
	};
	this.removeExitConfirm = function(g) {
		l -= g || 1;
		l < 1 && this.removeCloseHook();
		return l
	};
	this.getExitConfirm = function() {
		return l
	};
	this.exit = function() {
		if (this.getExitConfirm() > 0)
			if (this
					.confirm("\u60a8\u786e\u8ba4\u8981\u79bb\u5f00 WebQQ \u5417\uff1f")) {
				this.removeCloseHook();
				pgvSendClick({
							hottag : "web2qq.qqpanel.status.exitQQ"
						})
			} else
				return;
		var g = qqweb.layout.getCurrentWindow(), k = "";
		if (g)
			k = g.getAppId();
		a.notifyObservers(qqweb.portal, "exit");
		w = true;
		f.cookie.remove("ptwebqq", qqweb.CONST.MAIN_DOMAIN);
		f.cookie.remove("skey", qqweb.CONST.MAIN_DOMAIN);
		f.cookie.remove("uin", qqweb.CONST.MAIN_DOMAIN);
		f.cookie.remove("vfwebqq", qqweb.CONST.MAIN_DOMAIN);
		f.out(">>>>> cookie.remove");
		setTimeout(function() {
					a.notifyObservers(qqweb.portal, "exitSuccess")
				}, 1E3);
		Y && pgvSendClick({
					hottag : "WEB2QQ.NOAPP.USER.ALL"
				})
	};
	this.getVfWebQQ = function() {
		return typeof EQQ !== "undefined" && EQQ.getVfWebQQ && EQQ.getVfWebQQ()
				&& EQQ.getIsLogin() ? EQQ.getVfWebQQ() : o ? o : ""
	};
	this.getQQWebStatus = function() {
		var g = qqweb.layout.getCurrentWindow(), k = "", r;
		if (g)
			k = g.getAppId();
		g = {
			currentAppId : k,
			appList : []
		};
		k = qqweb.layout.getWindowList();
		for (var D = 0; D < k.length; D++) {
			var F = k[D], C = F.getAppId();
			if (!(C === "eqq--" || C === "sceneChristmas")) {
				r = F.getX();
				var U = F.getY();
				if (F.windowType === "window") {
					var aa = F.getBoxStatus();
					if (aa !== "min") {
						var fa = F.getWidth();
						F = F.getHeight();
						r = {
							appId : C,
							defaultMode : aa,
							x : r,
							y : U,
							width : fa,
							height : F
						};
						C && g.appList.push(r)
					}
				} else if (F.windowType === "widget") {
					r = {
						appId : C,
						x : r,
						y : U
					};
					g.appList.push(r)
				}
			}
		}
		return g
	};
	this.showUnsafeTip = function() {
		var g = new qqweb.businessClass.Window({
					title : "\u5b89\u5168\u8b66\u544a",
					dragable : true,
					resize : false,
					width : 520,
					height : 300,
					hasCloseButton : true,
					isSetCentered : true
				});
		g.setZIndex(200);
		g
				.setHtml('<div id="dangerTip"><p>WebQQ\u662f\u817e\u8baf\u5b98\u65b9\u63a8\u51fa\uff0c\u65e0\u9700\u4e0b\u8f7d\u7684\u7f51\u9875\u7248QQ\u3002</p>\t\t\t<p class="tip">\u5982\u679c\u60a8\u6b63\u5728\u4f7f\u7528360WebApps\u6216360WebQQ\u8f6f\u4ef6\uff0c<br/>\t\t\t\u5c06\u9762\u4e34\u5e10\u53f7\u548c\u9690\u79c1\u88ab\u7a83\u53d6\u7684\u98ce\u9669\u3002</p>\t\t\t<p>\u8bf7\u6539\u7528\u6d4f\u89c8\u5668\u8bbf\u95ee\uff1ahttp://'
						+ qqweb.CONST.DOMAIN + "\u3002</p></div>")
	};
	this.returnLogin = function() {
		window.location = "./"
	};
	this.openInWebBrowser = function(g) {
		g = g || {};
		var k = this.getApp(6);
		if (f.isUndefined(k) || !k.isRunning()) {
			g.isOpenNewTab = true;
			qqweb.portal.runApp("6", g)
		} else {
			k.openUrl(g);
			g.callback && g.callback()
		}
	};
	this.openUrl = function() {
	};
	this.setTitle = function(g, k) {
		k.roll = k.roll || false;
		k.speed = k.speed || 500;
		if (k.roll) {
			if (!(g.length < 1)) {
				v = document.title;
				z && clearInterval(z);
				z = setInterval(function() {
							document.title = g;
							g = g.substr(1) + g.charAt(0)
						}, k.speed)
			}
		} else {
			v = document.title;
			document.title = g
		}
	};
	this.resetTitle = function() {
		if (z) {
			clearInterval(z);
			z = null
		}
		document.title = v
	};
	this.addNotificationSource = function(g, k, r) {
		qqweb.app.messageCenter
				&& qqweb.app.messageCenter.addNotificationSource(g, k, r)
	};
	this.removeNotificationSource = function(g) {
		qqweb.app.messageCenter
				&& qqweb.app.messageCenter.removeNotificationSource(g)
	}
});
Jet().$package("qqweb.sound", function(f) {
			var d = false, b, a = [], h = null, s = false;
			qqweb.sound = {
				init : function() {
					f.sound.onload = function() {
						s = true
					};
					f.sound.embedSWF("./swf/swfsound.swf");
					d = false
				},
				playSound : function(w, c) {
					if (this.isMute())
						return false;
					if (w == "")
						return false;
					c = c || false;
					if (typeof a[w] === "undefined") {
						if (!s)
							return false;
						a[w] = h = f.sound.loadSound(w, c,
								qqweb.sound.playSoundObj)
					} else {
						h = a[w];
						qqweb.sound.playSoundObj()
					}
				},
				playSoundObj : function() {
					f.sound.startSound(h)
				},
				setMute : function(w) {
					d = w
				},
				isMute : function() {
					return d
				},
				setVol : function(w) {
					b = w
				},
				getVol : function() {
					return b
				}
			}
		});
Jet().$package("qqweb.businessClass", function(f) {
			var d = f.dom, b = f.event;
			this.Panel = new f.Class({
						init : function(a) {
							a = a || {};
							this.id = a.id;
							this.name = a.name;
							this.container = a.container;
							this.body = a.body || a.container;
							a.html = a.html || "";
							a.html && this.setHtml(a.html);
							d.isShow(this.container) ? this.show() : this
									.hide()
						},
						showName : function() {
						},
						setHtml : function(a) {
							this.html = a;
							this.body.innerHTML = a
						},
						append : function(a) {
							this.body.appendChild(a)
						},
						getSize : function() {
							return {
								width : d.getClientWidth(this.container),
								height : d.getClientHeight(this.container)
							}
						},
						getBodySize : function() {
							return {
								width : parseInt(
										d.getStyle(this.body, "width"), 10),
								height : parseInt(d.getStyle(this.body,
												"height"), 10)
							}
						},
						show : function() {
							d.show(this.container);
							b.notifyObservers(this, "show", this.getBodySize());
							this._isShow = true
						},
						hide : function() {
							d.hide(this.container);
							b.notifyObservers(this, "hide");
							this._isShow = false
						},
						isShow : function() {
							return this._isShow
						},
						toggleShow : function() {
							this.isShow() ? this.hide() : this.show()
						},
						getZIndex : function() {
							return this._zIndex
						},
						setZIndex : function(a) {
							d.setStyle(this.container, "zIndex", a);
							this._zIndex = a
						},
						setTopZIndex : function() {
							this.setZIndex(qqweb.layout.getTopZIndex())
						},
						setXY : function(a, h) {
							this.setX(a);
							this.setY(h)
						},
						setX : function(a) {
							d.setStyle(this.container, "left", a + "px")
						},
						setY : function(a) {
							d.setStyle(this.container, "top", a + "px")
						},
						setWidth : function(a) {
							d.setStyle(this.container, "width", a + "px")
						},
						getWidth : function() {
							return parseInt(d.getStyle(this.container, "width"))
						},
						setHeight : function(a) {
							d.setStyle(this.container, "height", a + "px")
						},
						getHeight : function() {
							return parseInt(d
									.getStyle(this.container, "height"))
						}
					})
		});
Jet().$package("qqweb.businessClass", function(f) {
	var d = f.dom, b = f.event, a = null;
	this.PopupBox = new f.Class({
		init : function(h) {
			var s = this;
			h = h || {};
			this.id = h.id;
			this.container = h.container;
			this.body = h.body || h.container;
			this.catchMouseUp = true;
			h.html = h.html || "";
			h.html && this.setHtml(h.html);
			if (h.noCatchMouseUp)
				this.catchMouseUp = false;
			this.onDocumentKeydown = function(w) {
				if (w.keyCode === 27) {
					w.preventDefault();
					s.hide()
				}
			};
			this.onMouseUp = function() {
				s.isShow() && s.hide()
			};
			this.onDocumentClick = function() {
				s.hide()
			};
			this.onWindowResize = function() {
				s.hide()
			};
			d.isShow(this.container) ? this.show() : this.hide()
		},
		showName : function() {
		},
		setHtml : function(h) {
			if (f.browser.ie)
				h += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
			this.html = h;
			this.body.innerHTML = h
		},
		show : function() {
			a && a.hide();
			d.show(this.container);
			this.catchMouseUp ? b.on(document, "mouseup", this.onMouseUp) : b
					.off(document, "mouseup", this.onMouseUp);
			b.on(document, "click", this.onDocumentClick);
			b.on(document, "keydown", this.onDocumentKeydown);
			b.on(window, "resize", this.onWindowResize);
			a = this;
			this._isShow = true;
			b.notifyObservers(this, "show")
		},
		hide : function() {
			b.off(document, "click", this.onDocumentClick);
			b.off(document, "keydown", this.onDocumentKeydown);
			b.off(window, "resize", this.onWindowResize);
			b.off(document, "mouseup", this.onMouseUp);
			d.hide(this.container);
			if (a) {
				a !== this && a.hide();
				a = null
			}
			this._isShow = false;
			b.notifyObservers(this, "hide")
		},
		isShow : function() {
			return this._isShow
		},
		toggleShow : function() {
			this.isShow() ? this.hide() : this.show()
		},
		getZIndex : function() {
			return this._zIndex
		},
		setZIndex : function(h) {
			d.setStyle(this.container, "zIndex", h);
			this._zIndex = h
		},
		setTopZIndex : function() {
			this.setZIndex(qqweb.layout.getTopZIndex())
		},
		setXY : function(h, s) {
			this.setX(h);
			this.setY(s)
		},
		setX : function(h) {
			d.setStyle(this.container, "left", h + "px")
		},
		setY : function(h) {
			d.setStyle(this.container, "top", h + "px")
		},
		setWidth : function(h) {
			d.setStyle(this.container, "width", h + "px")
		},
		getWidth : function() {
			return parseInt(d.getStyle(this.container, "width"))
		},
		setHeight : function(h) {
			d.setStyle(this.container, "height", h + "px")
		},
		getHeight : function() {
			return parseInt(d.getStyle(this.container, "height"))
		}
	})
});
Jet().$package("qqweb.businessClass", function(f) {
	var d = f.dom, b = f.event, a;
	if (!d.id("qqweb_focus_input")) {
		var h = d.node("input", {
					id : "qqweb_focus_input"
				});
		h.setAttribute("type", "text");
		d.getDoc().body.appendChild(h)
	}
	var s = function() {
		var c = d.node("div", {
					"class" : "dragMask"
				}), i = d.node("div", {
					"class" : "dragProxy"
				});
		c.appendChild(i);
		d.getDoc().body.appendChild(c);
		return {
			maskEl : c,
			proxyEl : i
		}
	}, w = function() {
		a || (a = s());
		return a
	};
	this.baseWindow = new f.Class({
		windowType : "window",
		_windowFlag : 0,
		_zIndex : 1,
		_inBorder : 5,
		_outBorder : 5,
		_leftMargin : 0,
		_topMargin : 62,
		_rightMargin : 0,
		_bottomMargin : 0,
		_leftArea : 250,
		_topArea : 62,
		_rightArea : 0,
		_bottomArea : 35,
		init : function(c) {
			c = this.parseOption(c);
			this.type = c.type;
			this._width = c.width;
			this._height = c.height;
			this._restoreWidth = c.width;
			this._restoreHeight = c.height;
			this._minWidth = c.minWidth;
			this._minHeight = c.minHeight;
			this._appId = c.appId;
			this.createDom();
			var i = this.getDefaultPosition();
			this._x = c.x ? c.x : i.x;
			this._y = c.y ? c.y : i.y;
			this._restoreX = this._x;
			this._restoreY = this._y;
			this.setZIndex(this.option.zIndex);
			this.createEvent();
			switch (c.defaultMode) {
				case "max" :
					this.max();
					break;
				case "restore" :
					this.restore();
					break;
				case "min" :
					this.min();
					break
			}
			c.isSetCurrent ? this.setCurrent() : this.setNotCurrent();
			c.isSetCentered && this.setWindowCentered()
		},
		parseOption : function(c) {
			c = c || {};
			c.type = c.type || "default";
			c.flashMode = f.isUndefined(c.flashMode) ? false : c.flashMode;
			c.ieOnly = f.isUndefined(c.ieOnly) ? false : c.ieOnly;
			c.loginLevel = f.isUndefined(c.loginLevel)
					? qqweb.CONST.LOGIN_LEVEL_NONE
					: c.loginLevel;
			c.isTask = f.isUndefined(c.isTask) ? true : c.isTask;
			c.width = c.width || 600;
			c.height = c.height || 450;
			c.minWidth = c.minWidth || 180;
			c.minHeight = c.minHeight || 100;
			if (typeof c.x == "number")
				if (c.x + c.width > qqweb.layout.getDesktopWidth()) {
					var i = qqweb.layout.getDesktopWidth() - c.width;
					c.x = i < 0 ? 0 : i
				}
			if (typeof c.y == "number")
				if (c.y + c.height + this._bottomArea > qqweb.layout
						.getDesktopHeight()) {
					i = qqweb.layout.getDesktopHeight() - c.height
							- this._bottomArea;
					c.y = i < this._topArea ? 0 : i
				}
			c.zIndex = !f.isUndefined(c.zIndex) ? c.zIndex : qqweb.layout
					.getTopZIndex();
			c.title = c.title || "\u672a\u547d\u540d";
			c.html = c.html || "";
			c.modeSwitch = c.modeSwitch === true ? true : false;
			c.isSetCurrent = c.isSetCurrent ? c.isSetCurrent : "true";
			c.defaultMode = c.defaultMode ? c.defaultMode : "restore";
			c.dragable = c.dragable === true ? true : false;
			c.resize = c.resize === true ? true : false;
			c.dragProxy = c.dragProxy === true ? true : f
					.isUndefined(c.dragProxy) ? qqweb.layout
					.getWindowDragProxy() : c.dragProxy;
			c.dragProxy = false;
			c.isFixedZIndex = c.isFixedZIndex === true ? true : false;
			c.isSetCentered = c.isSetCentered === true ? true : false;
			c.hasCloseButton = c.hasCloseButton === true ? true : false;
			c.hasMaxButton = c.hasMaxButton === true ? true : false;
			c.hasRestoreButton = c.hasRestoreButton === true ? true : false;
			c.hasMinButton = c.hasMinButton === true ? true : false;
			c.hasRefreshButton = c.hasRefreshButton === true ? true : false;
			c.hasPinUpButton = c.hasPinUpButton === true ? true : false;
			c.hasPinDownButton = c.hasPinDownButton === true ? true : false;
			c.hasOkButton = c.hasOkButton === true ? true : false;
			c.hasCancelButton = c.hasCancelButton === true ? true : false;
			c.hasPreviousButton = c.hasPreviousButton === true ? true : false;
			c.hasNextButton = c.hasNextButton === true ? true : false;
			c.doubleClickModeSwitch = c.doubleClickModeSwitch === false
					? false
					: true;
			return this.option = c
		},
		getAppId : function() {
			return this._appId
		},
		getWindowFlags : function() {
			return this._windowFlag
		},
		setWindowFlags : function(c) {
			this._windowFlag = c
		},
		createDom : function() {
			var c, i, n = qqweb.layout.getWindowId();
			this.getId = function() {
				return n
			};
			this.container = d.node("div", {
						id : "appWindow_" + n,
						"class" : "window window_current"
					});
			c = '\t\t\t\t<div id="window_outer_'
					+ n
					+ '" class="window_outer">\t\t\t\t\t<div id="window_inner_'
					+ n
					+ '" class="window_inner"  style="z-index:'
					+ this.option.zIndex
					+ '">\t\t\t\t\t\t<div class="window_bg_container">\t\t\t\t\t\t\t<div class="window_bg window_center"></div>\t\t\t\t\t\t\t<div class="window_bg window_t"></div>\t\t\t\t\t\t\t<div class="window_bg window_rt"></div>\t\t\t\t\t\t\t<div class="window_bg window_r"></div>\t\t\t\t\t\t\t<div class="window_bg window_rb"></div>\t\t\t\t\t\t\t<div class="window_bg window_b"></div>\t\t\t\t\t\t\t<div class="window_bg window_lb"></div>\t\t\t\t\t\t\t<div class="window_bg window_l"></div>\t\t\t\t\t\t\t<div class="window_bg window_lt"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_'
					+ n
					+ '" class="window_titleBar">\t\t\t\t\t\t\t\t<a id="window_closeButton_'
					+ n
					+ '" class="window_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_maxButton_'
					+ n
					+ '" class="window_max" title="\u6700\u5927\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restoreButton_'
					+ n
					+ '" class="window_restore" title="\u8fd8\u539f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_minButton_'
					+ n
					+ '" class="window_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restorefullButton_'
					+ n
					+ '" class="window_restore_full" title="\u9000\u51fa\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_fullButton_'
					+ n
					+ '" class="window_fullscreen" title="\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_refreshButton_'
					+ n
					+ '" class="window_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinUpButton_'
					+ n
					+ '" class="window_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinDownButton_'
					+ n
					+ '" class="window_pinDown" title="\u9489\u4f4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="window_title_'
					+ n
					+ '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="window_body_'
					+ n
					+ '" class="window_bodyArea"></div>\t\t\t\t\t\t\t<div id="window_controlArea_'
					+ n
					+ '" class="window_controlArea">\t\t\t\t\t\t\t\t<a id="window_cancelButton_'
					+ n
					+ '" class="window_button window_cancel" title="\u53d6\u6d88" href="###" hidefocus>\u53d6\u3000\u6d88</a>\t\t\t\t\t\t\t\t<a id="window_okButton_'
					+ n
					+ '" class="window_button window_ok" title="\u786e\u5b9a" href="###" hidefocus>\u786e\u3000\u5b9a</a>\t\t\t\t\t\t\t\t<a id="window_nextButton_'
					+ n
					+ '" class="window_button window_next" title="\u4e0b\u4e00\u6b65" href="###" hidefocus>\u4e0b\u4e00\u6b65</a>\t\t\t\t\t\t\t\t<a id="window_previousButton_'
					+ n
					+ '" class="window_button window_previous" title="\u4e0a\u4e00\u6b65" href="###" hidefocus>\u4e0a\u4e00\u6b65</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
			i = '\t\t\t\t<div id="window_outer_'
					+ n
					+ '" class="window_outer">\t\t\t\t\t<div id="window_inner_'
					+ n
					+ '" class="window_inner"  style="z-index:'
					+ this.option.zIndex
					+ '">\t\t\t\t\t\t<div class="window_bg_container_ipad"></div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_'
					+ n
					+ '" class="window_titleBar">\t\t\t\t\t\t\t\t<a id="window_closeButton_'
					+ n
					+ '" class="window_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_maxButton_'
					+ n
					+ '" class="window_max" title="\u6700\u5927\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restoreButton_'
					+ n
					+ '" class="window_restore" title="\u8fd8\u539f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_minButton_'
					+ n
					+ '" class="window_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restorefullButton_'
					+ n
					+ '" class="window_restore_full" title="\u9000\u51fa\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_fullButton_'
					+ n
					+ '" class="window_fullscreen" title="\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_refreshButton_'
					+ n
					+ '" class="window_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinUpButton_'
					+ n
					+ '" class="window_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinDownButton_'
					+ n
					+ '" class="window_pinDown" title="\u9489\u4f4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="window_title_'
					+ n
					+ '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="window_body_'
					+ n
					+ '" class="window_bodyArea"></div>\t\t\t\t\t\t\t<div id="window_controlArea_'
					+ n
					+ '" class="window_controlArea">\t\t\t\t\t\t\t\t<a id="window_cancelButton_'
					+ n
					+ '" class="window_button window_cancel" title="\u53d6\u6d88" href="###" hidefocus>\u53d6\u3000\u6d88</a>\t\t\t\t\t\t\t\t<a id="window_okButton_'
					+ n
					+ '" class="window_button window_ok" title="\u786e\u5b9a" href="###" hidefocus>\u786e\u3000\u5b9a</a>\t\t\t\t\t\t\t\t<a id="window_nextButton_'
					+ n
					+ '" class="window_button window_next" title="\u4e0b\u4e00\u6b65" href="###" hidefocus>\u4e0b\u4e00\u6b65</a>\t\t\t\t\t\t\t\t<a id="window_previousButton_'
					+ n
					+ '" class="window_button window_previous" title="\u4e0a\u4e00\u6b65" href="###" hidefocus>\u4e0a\u4e00\u6b65</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
			if (f.platform.iPad)
				c = i;
			if (f.browser.ie)
				c += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
			this.container.innerHTML = c;
			qqweb.layout.getDesktop().body.appendChild(this.container);
			this._titleBar = d.id("window_titleBar_" + n);
			this._title = d.id("window_title_" + n);
			this.body = d.id("window_body_" + n);
			this.vscroller = d.id("window_vertical_scroller_" + n);
			this.hscroller = d.id("window_horizontal_scroller_" + n);
			this._window_outer = d.id("window_outer_" + n);
			this._window_inner = d.id("window_inner_" + n);
			this._closeButton = d.id("window_closeButton_" + n);
			this._fullButton = d.id("window_fullButton_" + n);
			this._restorefullButton = d.id("window_restorefullButton_" + n);
			this._maxButton = d.id("window_maxButton_" + n);
			this._restoreButton = d.id("window_restoreButton_" + n);
			this._minButton = d.id("window_minButton_" + n);
			this._refreshButton = d.id("window_refreshButton_" + n);
			this._pinUpButton = d.id("window_pinUpButton_" + n);
			this._pinDownButton = d.id("window_pinDownButton_" + n);
			this._controlArea = d.id("window_controlArea_" + n);
			this._cancelButton = d.id("window_cancelButton_" + n);
			this._okButton = d.id("window_okButton_" + n);
			this._nextButton = d.id("window_nextButton_" + n);
			this._previousButton = d.id("window_previousButton_" + n);
			this.option.hasCloseButton && this.showCloseButton();
			if (this.option.hasMaxButton) {
				this.showMaxButton();
				this.showFullButton()
			}
			this.option.hasRestoreButton && this.showRestoreButton();
			this.option.hasMinButton && this.showMinButton();
			this.option.hasRefreshButton && this.showRefreshButton();
			this.option.hasPinUpButton && this.showPinUpButton();
			this.option.hasPinDownButton && this.showPinDownButton();
			this.option.hasOkButton && this.showOkButton();
			this.option.hasCancelButton && this.showCancelButton();
			this.option.hasPreviousButton && this.showPreviousButton();
			this.option.hasNextButton && this.showNextButton();
			this.setTitle(this.option.title);
			this.option.html && this.setHtml(this.option.html);
			this.option.isTask && qqweb.layout.addWindow(this);
			this.option.alterMode && this.createAlterDom(n)
		},
		createAlterDom : function(c) {
			c = typeof c === "undefined" ? this.getId() : c;
			this.alterDom = d.node("div", {
						id : "appWindow_" + c + "_alt",
						"class" : "flash_alt"
					});
			this.alterDom.innerHTML = "<div class='appIframeAlter'></div><div  class='appIframeAlterTxt'>\u8fd0\u884c\u4e2d\uff0c\u70b9\u51fb\u6062\u590d\u663e\u793a :)</div>";
			this.body.appendChild(this.alterDom)
		},
		showAlterDom : function() {
			d.setStyle(this.body, "background", "#FFF");
			d.show(this.alterDom)
		},
		hideAlterDom : function() {
			d.setStyle(this.body, "background", "transparent none");
			d.hide(this.alterDom)
		},
		createEvent : function() {
			var c = this;
			this.observer = {
				onCloseButtonClick : function(i) {
					c.close();
					i.preventDefault();
					i.stopPropagation()
				},
				stopPropagation : function(i) {
					i.stopPropagation()
				},
				onMaxButtonClick : function(i) {
					i.preventDefault();
					c.option.modeSwitch && c.max()
				},
				onRestorefullButtonClick : function(i) {
					i.preventDefault();
					c.option.modeSwitch && c.restorefull()
				},
				onFullButtonClick : function(i) {
					i.preventDefault();
					c.option.modeSwitch && c.fullscreen()
				},
				onRestoreButtonClick : function(i) {
					i.preventDefault();
					c.option.modeSwitch && c.restore()
				},
				onMinButtonClick : function(i) {
					i.preventDefault();
					c.option.modeSwitch && c.min()
				},
				onRefreshButtonClick : function(i) {
					i.preventDefault();
					i.stopPropagation();
					b.notifyObservers(c, "clickRefreshButton")
				},
				onPinUpButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickPinUpButton");
					c.showPinDownButton()
				},
				onPinDownButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickPinDownButton");
					c.showPinUpButton()
				},
				onOkButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickOkButton")
							&& setTimeout(function() {
										c.close()
									}, 0)
				},
				onCancelButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickCancelButton")
							&& setTimeout(function() {
										c.close()
									}, 0)
				},
				onPreviousButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickPreviousButton")
				},
				onNextButtonClick : function(i) {
					i.preventDefault();
					b.notifyObservers(c, "clickNextButton")
				},
				onMouseoverWindow : function(i) {
					i.stopPropagation();
					b.notifyObservers(c, "mouseoverWindow")
				},
				onMouseoutWindow : function(i) {
					i.stopPropagation();
					b.notifyObservers(c, "mouseoutWindow")
				},
				onMousedownWindow : function() {
					c && c.setCurrent()
				},
				onKeyDownWindow : function() {
				},
				onWindowResize : function() {
					if (c.getBoxStatus() === "max")
						c.adjustMaxSize();
					else if (c.getBoxStatus() === "fullscreen") {
						var i = qqweb.layout.getClientWidth(), n = qqweb.layout
								.getClientHeight();
						c.setXY(0, 0);
						c.setWidth(i);
						c.setHeight(n)
					}
					i = c.getBodySize();
					i.from = "windowResize";
					b.notifyObservers(c, "resize", i)
				},
				onTitleBarDblClick : function(i) {
					if (c.option.doubleClickModeSwitch) {
						i.preventDefault();
						b.notifyObservers(c, "dblClickTitleBar");
						if (c.option.modeSwitch)
							if (c.getBoxStatus() === "max")
								c.restore();
							else
								c.getBoxStatus() === "restore" && c.max()
					}
				},
				onResize : function(i) {
					i.width && c.setWidth(i.width);
					i.height && c.setHeight(i.height);
					b.notifyObservers(c, "resize", c.getBodySize())
				},
				onMove : function(i) {
					c._x = i.x;
					c._y = i.y
				},
				onDragStart : function() {
					c.hideTouchPad();
					b.notifyObservers(c, "dragStart")
				},
				onDragEnd : function(i) {
					if (f.platform.iPad) {
						if (i) {
							c.setXY(i.x, i.y);
							try {
								c.container.style.webkitTransform = "none"
							} catch (n) {
							}
						}
						c.updateTouchPad()
					}
					b.notifyObservers(c, "dragEnd", c.getBodySize())
				},
				onMousedown : function(i) {
					if (!(i.touches && i.touches.length > 1)) {
						f.out("onMousedown ");
						d.setStyle(c._dragProxy.proxyEl, "left", c.getX()
										+ c._outBorder + "px");
						d.setStyle(c._dragProxy.proxyEl, "top", c.getY()
										+ c._outBorder + "px");
						d.setStyle(c._dragProxy.proxyEl, "width", c._width
										- c._outBorder * 2 + "px");
						d.setStyle(c._dragProxy.proxyEl, "height", c._height
										- c._outBorder * 2 + "px");
						d.setStyle(c._dragProxy.maskEl, "zIndex", 60002);
						d.show(c._dragProxy.maskEl)
					}
				},
				onTouchStart : function(i) {
					i.touches.length > 1
							|| b.on(c.container, "touchmove",
									c.observer.onTouchMove)
				},
				onTouchMove : function(i) {
					b.off(c.container, "touchmove", c.observer.onTouchMove);
					if (!(i.touches && i.touches.length > 1)) {
						i = c.getX() + c._outBorder;
						var n = c.getY() + c._outBorder;
						c._dragProxy.proxyEl.style.webkitTransform = "translate3d("
								+ i + "px," + n + "px, 0px)";
						d.setStyle(c._dragProxy.proxyEl, "width", c._width
										- c._outBorder * 2 + "px");
						d.setStyle(c._dragProxy.proxyEl, "height", c._height
										- c._outBorder * 2 + "px");
						d.setStyle(c._dragProxy.maskEl, "zIndex", 60002);
						d.show(c._dragProxy.maskEl);
						c.hideTouchPad()
					}
				},
				onDragProxyEnd : function(i) {
					i && c.setXY(i.x - c._outBorder, i.y - c._outBorder);
					d.hide(c._dragProxy.maskEl)
				},
				onDragProxyResizeEnd : function(i) {
					d.hide(c._dragProxy.maskEl);
					f.out(i.x);
					c.setXY(i.x - c._outBorder, i.y - c._outBorder);
					var n = 0, t = function() {
						n++;
						var x = c.getBodySize(), j = i.width - x.width, e = i.height
								- x.height;
						c.setWidth(x.width + j * 1.1 + c._outBorder * 2);
						c.setHeight(x.height + e * 1.1 + c._outBorder * 2);
						b.notifyObservers(c, "resize", c.getBodySize());
						if (n < 5 && (j >= 5 || j <= -5)) {
							f.out("setting timeout " + j + " " + e + " " + n
									+ " mostStick:5");
							setTimeout(t, 200)
						} else {
							c.setWidth(i.width + c._outBorder * 2);
							c.setHeight(i.height + c._outBorder * 2);
							b.notifyObservers(c, "resize", c.getBodySize())
						}
					};
					c.setWidth(i.width + c._outBorder * 2);
					c.setHeight(i.height + c._outBorder * 2);
					b.notifyObservers(c, "resize", c.getBodySize())
				},
				stopPropagationAndSetCurrent : function(i) {
					i.stopPropagation();
					c.setCurrent()
				},
				stopPropagationAndSetCurrentWithoutFocus : function(i) {
					i.stopPropagation();
					c.setCurrentWithoutFocus()
				}
			};
			this.option.dragProxy && this.enableDragProxy();
			this.option.dragable && this.enableDrag();
			this.option.resize && this.enableResize();
			f.platform.iPad ? b.on(this.container, "touchstart",
					this.observer.onMousedownWindow) : b.on(this.container,
					"mousedown", this.observer.onMousedownWindow);
			b.on(this.container, "keydown", this.observer.onKeyDownWindow);
			b.on(this.body, "mousedown",
					this.observer.stopPropagationAndSetCurrent);
			b.on(this._titleBar, "dblclick", this.observer.onTitleBarDblClick);
			b.on(this._closeButton, "click", this.observer.onCloseButtonClick);
			b.on(this._closeButton, "mousedown", this.observer.stopPropagation);
			b.on(this._fullButton, "click", this.observer.onFullButtonClick);
			b.on(this._fullButton, "mousedown",
					this.observer.stopPropagationAndSetCurrent);
			b.on(this._restorefullButton, "click",
					this.observer.onRestorefullButtonClick);
			b.on(this._restorefullButton, "mousedown",
					this.observer.stopPropagationAndSetCurrent);
			b.on(this._maxButton, "click", this.observer.onMaxButtonClick);
			b.on(this._maxButton, "mousedown",
					this.observer.stopPropagationAndSetCurrent);
			b.on(this._restoreButton, "click",
					this.observer.onRestoreButtonClick);
			b.on(this._restoreButton, "mousedown",
					this.observer.stopPropagationAndSetCurrent);
			b.on(this._minButton, "click", this.observer.onMinButtonClick);
			b.on(this._minButton, "mousedown", this.observer.stopPropagation);
			b.on(this._refreshButton, "click",
					this.observer.onRefreshButtonClick);
			b.on(this._refreshButton, "mousedown",
					this.observer.stopPropagation);
			b.on(this._pinUpButton, "click", this.observer.onPinUpButtonClick);
			b.on(this._pinUpButton, "mousedown", this.observer.stopPropagation);
			b.on(this._pinDownButton, "click",
					this.observer.onPinDownButtonClick);
			b.on(this._pinDownButton, "mousedown",
					this.observer.stopPropagation);
			b.on(this._okButton, "click", this.observer.onOkButtonClick);
			b.on(this._okButton, "mousedown", this.observer.stopPropagation);
			b
					.on(this._cancelButton, "click",
							this.observer.onCancelButtonClick);
			b
					.on(this._cancelButton, "mousedown",
							this.observer.stopPropagation);
			b.on(this._previousButton, "click",
					this.observer.onPreviousButtonClick);
			b.on(this._previousButton, "mousedown",
					this.observer.stopPropagation);
			b.on(this._nextButton, "click", this.observer.onNextButtonClick);
			b.on(this._nextButton, "mousedown", this.observer.stopPropagation);
			b.addObserver(this, "closeWindow", this.close)
		},
		setTitle : function(c) {
			this._title.innerHTML = f.string.encodeHtml(c)
		},
		setTitleHtml : function(c) {
			this._title.innerHTML = c
		},
		showCloseButton : function() {
			d.show(this._closeButton)
		},
		showFullButton : function() {
			d.show(this._fullButton)
		},
		showMaxButton : function() {
			d.hide(this._restoreButton);
			d.show(this._maxButton)
		},
		showRestoreButton : function() {
			d.hide(this._maxButton);
			d.show(this._restoreButton)
		},
		showMinButton : function() {
			d.show(this._minButton)
		},
		showRefreshButton : function() {
			d.show(this._refreshButton)
		},
		showPinUpButton : function() {
			d.hide(this._pinDownButton);
			d.show(this._pinUpButton)
		},
		showPinDownButton : function() {
			d.hide(this._pinUpButton);
			d.show(this._pinDownButton)
		},
		showOkButton : function() {
			d.show(this._controlArea);
			d.setStyle(this.body, "bottom", "26px");
			d.show(this._okButton)
		},
		showCancelButton : function() {
			d.show(this._controlArea);
			d.setStyle(this.body, "bottom", "26px");
			d.show(this._cancelButton)
		},
		showPreviousButton : function() {
			d.show(this._controlArea);
			d.setStyle(this.body, "bottom", "26px");
			d.show(this._previousButton)
		},
		showNextButton : function() {
			d.show(this._controlArea);
			d.setStyle(this.body, "bottom", "26px");
			d.show(this._nextButton)
		},
		show : function() {
			d.show(this.container);
			b.on(window, "resize", this.observer.onWindowResize);
			f.out(">>>> Window: show");
			b.notifyObservers(this, "show", this.getBodySize());
			this._isShow = true
		},
		hide : function() {
			b.off(window, "resize", this.observer.onWindowResize);
			d.hide(this.container);
			b.notifyObservers(this, "hide");
			this._isShow = false
		},
		isShow : function() {
			return this._isShow
		},
		toggleShow : function() {
			this.isShow() ? this.hide() : this.show()
		},
		setCurrent : function() {
			var c = this;
			this.setWindowFlags(this.getWindowFlags()
					| qqweb.CONST.WINDOW_FLAG_CURRENT);
			this.setCurrentWithoutFocus();
			c.focus();
			this.updateTouchPad()
		},
		setNotCurrent : function(c) {
			this.setWindowFlags(this.getWindowFlags()
					& ~qqweb.CONST.WINDOW_FLAG_CURRENT
					| qqweb.CONST.WINDOW_FLAG_NOT_CURRENT);
			if (c) {
				c = this;
				c.setStyleNotCurrent();
				b.notifyObservers(c, "setNotCurrent")
			} else {
				this.setStyleNotCurrent();
				b.notifyObservers(this, "setNotCurrent")
			}
			this.hideTouchPad()
		},
		setCurrentWithoutFocus : function() {
			var c = this, i = qqweb.layout.getCurrentWindow();
			if (i != this) {
				qqweb.layout.setCurrentWindow(this);
				c.option.isFixedZIndex || this.getWindowFlags()
						& qqweb.CONST.WINDOW_FLAG_FULLSCREEN
						|| c.setZIndex(qqweb.layout.getTopZIndex());
				c.setStyleCurrent();
				c.show();
				b.notifyObservers(c, "setCurrent");
				if (i)
					f.browser.ie ? i.setNotCurrent(true) : i.setNotCurrent()
			}
		},
		setStyleCurrent : function() {
			d.addClass(this.container, "window_current")
		},
		setStyleNotCurrent : function() {
			this.container && d.removeClass(this.container, "window_current")
		},
		focus : function() {
			b.notifyObservers(this, "focus")
		},
		setBoxStatus : function(c) {
			this._status = c
		},
		getBoxStatus : function() {
			return this._status
		},
		adjustMaxSize : function() {
			if (this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_FULLSCREEN)
				this.setZIndex(this.option.zIndex);
			else {
				this._restoreX = this._x;
				this._restoreY = this._y
			}
			this.setXY(0, this._topMargin);
			var c = qqweb.layout.getDesktopWidth(), i = qqweb.layout
					.getDesktopHeight();
			this.setWidth(c - 0);
			this.setHeight(i - this._topMargin - this._bottomArea);
			b.notifyObservers(this, "resize", this.getBodySize());
			this.updateTouchPad()
		},
		max : function() {
			var c = this.getBoxStatus();
			this.setDisableDrag();
			this.setWindowFlags(this.getWindowFlags()
					& ~qqweb.CONST.WINDOW_FLAG_NORMAL
					| qqweb.CONST.WINDOW_FLAG_MAX);
			this.setBoxStatus("max");
			this.adjustMaxSize();
			b.notifyObservers(this, "max", c);
			this.showRestoreButton();
			d.show(this._fullButton);
			d.hide(this._restorefullButton);
			b.on(window, "resize", this.observer.onWindowResize)
		},
		fullscreen : function() {
			if (this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_NORMAL) {
				this._restoreX = this._x;
				this._restoreY = this._y
			}
			this.setWindowFlags(this.getWindowFlags()
					| qqweb.CONST.WINDOW_FLAG_FULLSCREEN);
			this.setBoxStatus("fullscreen");
			d.hide(this._maxButton);
			d.hide(this._restoreButton);
			d.hide(this._fullButton);
			d.show(this._restorefullButton);
			var c = qqweb.layout.getClientWidth(), i = qqweb.layout
					.getClientHeight();
			this.setXY(0, 0);
			this.setWidth(c);
			this.setHeight(i);
			this.setZIndex(qqweb.layout.getPinZIndex());
			b.notifyObservers(this, "resize", this.getBodySize());
			var n = null;
			if (!f.platform.iPad) {
				if (d.id("fullscreen_tip_container")) {
					n = d.id("fullscreen_tip_container");
					n.style.display = "block"
				} else {
					n = d.node("div", {
								id : "fullscreen_tip_container",
								"class" : "fullscreen_tip_container"
							});
					document.body.appendChild(n);
					n.innerHTML = '<div class="fullscreen_tip"></div>';
					n.style.position = "absolute";
					n.style.zIndex = "20000001";
					n.style.height = i + "px"
				}
				setTimeout(function() {
							n.style.display = "none"
						}, 3E3);
				b.on(window, "resize", this.observer.onWindowResize)
			}
			f.platform.iPad && this.hideTouchPad()
		},
		restorefull : function() {
			this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_NORMAL ? this
					.restore() : this.max();
			this.setZIndex(qqweb.layout.getTopZIndex());
			this.setWindowFlags(this.getWindowFlags()
					& ~qqweb.CONST.WINDOW_FLAG_FULLSCREEN);
			if (d.id("fullscreen_tip_container")) {
				fullscreenTipContainer = d.id("fullscreen_tip_container");
				fullscreenTipContainer.style.display = "none"
			}
		},
		min : function() {
			var c = this.getBoxStatus();
			this.setWindowFlags(this.getWindowFlags()
					& ~qqweb.CONST.WINDOW_FLAG_CURRENT
					| qqweb.CONST.WINDOW_FLAG_NOT_CURRENT
					| qqweb.CONST.WINDOW_FLAG_MIN);
			qqweb.layout.getCurrentWindow() === this
					&& qqweb.layout.setCurrentWindow(null);
			this.option.flashMode || this.hide();
			this.setBoxStatus(c || "min");
			b.notifyObservers(this, "min");
			this._isShow = false;
			f.platform.iPad && this.hideTouchPad()
		},
		restore : function() {
			this.setWindowFlags(this.getWindowFlags()
					& ~qqweb.CONST.WINDOW_FLAG_MAX
					| qqweb.CONST.WINDOW_FLAG_NORMAL);
			b.off(window, "resize", this.observer.onWindowResize);
			this.setXY(this._restoreX, this._restoreY);
			if (this._restoreWidth < 0)
				this._restoreWidth = 0;
			if (this._restoreHeight < 0)
				this._restoreHeight = 0;
			this.setWidth(this._restoreWidth);
			this.setHeight(this._restoreHeight);
			f.out("resize: " + this.getBodySize());
			f.out("resize w: " + this.getBodySize().width);
			f.out("resize h: " + this.getBodySize().height);
			b.notifyObservers(this, "resize", this.getBodySize());
			this.setEnableDrag();
			if (this.option.hasMaxButton) {
				this.showMaxButton();
				d.show(this._fullButton);
				d.hide(this._restorefullButton)
			}
			b.notifyObservers(this, "restore");
			this.setBoxStatus("restore");
			f.platform.iPad && this.updateTouchPad()
		},
		setWidth : function(c) {
			d.setStyle(this.container, "width", c + "px");
			d.setStyle(this.body, "width", c - 20 + "px");
			this._width = c;
			if (this.getBoxStatus() !== "max"
					&& this.getBoxStatus() !== "fullscreen")
				this._restoreWidth = c
		},
		getWidth : function() {
			return this._width
		},
		getHeight : function() {
			return this._height
		},
		setHeight : function(c) {
			d.setStyle(this.container, "height", c + "px");
			d.setStyle(this._window_outer, "height", c - 20 + "px");
			var i = 28;
			if (f.browser.ie && f.browser.ie < 7)
				i = 29;
			this.option && this.option.hasOkButton ? d.setStyle(this.body,
					"height", c - 47 - i + "px") : d.setStyle(this.body,
					"height", c - 20 - i + "px");
			this._height = c;
			if (this.getBoxStatus() !== "max"
					&& this.getBoxStatus() !== "fullscreen")
				this._restoreHeight = c;
			b.notifyObservers(this, "setNewHeight", c)
		},
		getZIndex : function() {
			return this._zIndex
		},
		setZIndex : function(c) {
			d.setStyle(this.container, "zIndex", c);
			d.setStyle(this._window_inner, "zIndex", c);
			this._zIndex = c
		},
		setTopZIndex : function() {
			this.setZIndex(qqweb.layout.getTopZIndex())
		},
		setXY : function(c, i) {
			if (c || c === 0)
				this.setX(c);
			if (i || i === 0)
				this.setY(i)
		},
		setX : function(c) {
			this._x = c;
			d.setStyle(this.container, "left", c + "px")
		},
		setY : function(c) {
			this._y = c;
			d.setStyle(this.container, "top", c + "px")
		},
		getX : function() {
			return parseInt(d.getStyle(this.container, "left"))
		},
		getRestoreX : function() {
			return this._restoreX
		},
		getRestoreY : function() {
			return this._restoreY
		},
		getLeft : function() {
			return this._x
		},
		getY : function() {
			return parseInt(d.getStyle(this.container, "top"))
		},
		setLeft : function(c) {
			d.setStyle(this.container, "left", c + "px");
			d.setStyle(this.container, "right", "")
		},
		setTop : function(c) {
			d.setStyle(this.container, "top", c + "px");
			d.setStyle(this.container, "bottom", "")
		},
		setRight : function(c) {
			d.setStyle(this.container, "right", c + "px");
			d.setStyle(this.container, "left", "")
		},
		setBottom : function(c) {
			d.setStyle(this.container, "bottom", c + "px");
			d.setStyle(this.container, "top", "")
		},
		setWindowCentered : function() {
			var c = qqweb.layout.getClientWidth(), i = qqweb.layout
					.getClientHeight();
			this.setXY(c > this._width ? (c - this._width) / 2 : 0,
					i > this._height ? (i - this._height) / 2 : 0)
		},
		setWindowCenteredRelative : function(c) {
			this.setX(c.getX() + (c.getWidth() - this._width) / 2)
		},
		getDefaultPosition : function() {
			var c = qqweb.layout.getClientWidth(), i = qqweb.layout
					.getClientHeight(), n = c - this._width - this._leftMargin
					- this._rightMargin - this._rightArea - this._leftArea, t = i
					- this._height
					- this._topMargin
					- this._bottomMargin
					- this._bottomArea;
			n = n > 0 ? n : 1;
			t = t > 0 ? t : 1;
			f.out("ID: " + this.getId());
			var x = this.getId() - 5 - 1;
			x = x < 0 ? 0 : x;
			n = this._leftMargin + this._leftArea + x * 25 % n;
			t = this._topMargin + this._topArea + x * 25 % t;
			n = n + this._width >= c ? 0 : n;
			t = t + this._height + this._topArea >= i ? this._topArea : t;
			return {
				x : n,
				y : t
			}
		},
		enableDrag : function() {
			this.option.dragable = true;
			this.getBoxStatus() !== "max" && this.setEnableDrag()
		},
		disableDrag : function() {
			this.option.dragable = false;
			this.setDisableDrag()
		},
		enableDragProxy : function() {
			this.option.dragProxy = true
		},
		disableDragProxy : function() {
			this.option.dragProxy = false
		},
		setEnableDrag : function() {
			if (this.option.dragable) {
				if (this._dragController) {
					if (this.option.dragProxy)
						f.platform.iPad ? b.on(this.container, "touchstart",
								this.observer.onTouchStart) : b.on(
								this.container, "mousedown",
								this.observer.onMousedown);
					this._dragController.unlock()
				} else {
					if (this.option.dragProxy) {
						this._dragProxy = w();
						f.platform.iPad ? b.on(this.container, "touchstart",
								this.observer.onTouchStart) : b.on(
								this.container, "mousedown",
								this.observer.onMousedown);
						this._dragController = new f.ui.Drag(this.container,
								this._dragProxy.proxyEl, {
									isLimited : true,
									leftMargin : this._leftMargin
											+ this._outBorder,
									topMargin : this._topMargin
											+ this._outBorder,
									rightMargin : this._rightMargin
											+ this._outBorder,
									bottomMargin : this._bottomMargin
											+ this._outBorder
								});
						b.addObserver(this._dragController, "end",
								this.observer.onDragProxyEnd)
					} else {
						this._dragController = new f.ui.Drag(this.container,
								this.container, {
									isLimited : true,
									leftMargin : this._leftMargin,
									topMargin : this._topMargin,
									rightMargin : this._rightMargin,
									bottomMargin : this._bottomMargin
								});
						b.addObserver(this._dragController, "move",
								this.observer.onMove)
					}
					b.addObserver(this._dragController, "start",
							this.observer.onDragStart);
					b.addObserver(this._dragController, "end",
							this.observer.onDragEnd)
				}
				this.setEnableResize()
			}
		},
		setDisableDrag : function() {
			if (this._dragController) {
				this._dragController.lock();
				if (this.option.dragProxy)
					f.platform.iPad ? b.off(this.container, "touchstart",
							this.observer.onTouchStart) : b.off(this.container,
							"mousedown", this.observer.onMousedown)
			}
			this.setDisableResize()
		},
		enableResize : function() {
			this.option.resize = true;
			this.getBoxStatus() !== "max" && this.setEnableResize()
		},
		disableResize : function() {
			this.option.dragable = false;
			this.setDisableResize()
		},
		setEnableResize : function() {
			if (this.option.resize)
				if (this._resizeController) {
					this.option.dragProxy
							&& b.addObserver(this._resizeController,
									"mousedown", this.observer.onMousedown);
					this._resizeController.show()
				} else {
					if (this.option.dragProxy) {
						this._dragProxy = w();
						this._resizeController = new f.ui.Resize(
								this._window_inner, this._dragProxy.proxyEl, {
									isLimited : true,
									topMargin : 62,
									minWidth : this._minWidth,
									minHeight : this._minHeight,
									dragProxy : this._dragProxy
								});
						b.addObserver(this._resizeController, "mousedown",
								this.observer.onMousedown);
						b.addObserver(this._resizeController, "end",
								this.observer.onDragProxyResizeEnd)
					} else {
						this._resizeController = new f.ui.Resize(
								this._window_inner, this.container, {
									isLimited : true,
									topMargin : 62,
									minWidth : this._minWidth,
									minHeight : this._minHeight
								});
						b.addObserver(this._resizeController, "resize",
								this.observer.onResize)
					}
					b.addObserver(this._resizeController, "mousedown",
							this.observer.onDragStart);
					b.addObserver(this._resizeController, "end",
							this.observer.onDragEnd)
				}
		},
		setDisableResize : function() {
			if (this._resizeController) {
				this._resizeController.hide();
				this.option.dragProxy
						&& b.removeObserver(this._resizeController,
								"mousedown", this.observer.onMousedown)
			}
		},
		setHtml : function(c) {
			this.html = c;
			this.body.innerHTML = c;
			this.option.flashMode && this.createAlterDom(this.getId())
		},
		append : function(c) {
			this.body.appendChild(c)
		},
		getSize : function() {
			return {
				width : d.getClientWidth(this.container),
				height : d.getClientHeight(this.container)
			}
		},
		getBodySize : function() {
			return {
				width : parseInt(d.getStyle(this.body, "width"), 10),
				height : parseInt(d.getStyle(this.body, "height"), 10)
			}
		},
		getSelfDomObj : function() {
			return this.container
		},
		close : function() {
			if (d.id("fullscreen_tip_container"))
				d.id("fullscreen_tip_container").style.display = "none";
			b.notifyObservers(this, "close", this);
			this.destroy()
		},
		destroy : function() {
			f.browser.ie && d.id("qqweb_focus_input")
					&& d.id("qqweb_focus_input").focus();
			this.option.isTask && qqweb.layout.removeWindow(this);
			f.out(">>>>>>>>>>>destroy :" + this.container.id);
			b.off(window, "resize", this.observer.onWindowResize);
			qqweb.layout.getCurrentWindow() == this
					&& qqweb.layout.setCurrentWindow(null);
			try {
				qqweb.layout.getDesktop().body.removeChild(this.container)
			} catch (c) {
				document.body.removeChild(this.container)
			}
			for (var i in this)
				this.hasOwnProperty(i) && delete this[i]
		},
		hideTouchPad : function() {
		},
		updateTouchPad : function() {
		},
		_updateTouchPad : function() {
		},
		touchMoveHandler : function(c) {
			var i = this.getX(), n = this.getY(), t = this.getWidth(), x = this
					.getHeight(), j = x - d.getHeight(this.body);
			if (c.px < i || c.px > i + t || c.py < n + j || c.py > n + x) {
				console.info("overflow" + i + "," + n + " " + c.px + "," + c.py
						+ " " + t + "," + x);
				padEventProxy(c.eventType, c.event)
			} else {
				console.info("app:touchMoveHandler");
				var e;
				if (i = this.getAppId())
					e = qqweb.app["app" + i];
				e && "touchMoveHandler" in e && e.touchMoveHandler(c)
			}
		},
		getBodyWidth : function() {
			return d.getWidth(this.body)
		},
		getBodyHeight : function() {
			return d.getHeight(this.body)
		}
	})
});
Jet().$package("qqweb.businessClass", function(f) {
	var d = f.dom, b = f.event;
	this.Widget = new f.Class({
		windowType : "widget",
		_outBorder : 0,
		_leftMargin : 0,
		_topMargin : 62,
		_rightMargin : 0,
		_bottomMargin : 0,
		_leftArea : 250,
		_topArea : 62,
		_rightArea : 0,
		_bottomArea : 30,
		init : function(a) {
			this.parseOption(a);
			this.createDom();
			this.setTopZIndex();
			this.option.hasPinUpButton && this.setPinZIndex();
			var h = this.getDefaultPosition();
			if (a.x && a.y) {
				var s = a.x;
				h = a.y
			} else {
				s = h.x;
				h = h.y
			}
			this.setLT(s, h);
			this._x = s;
			this._y = h;
			this._appId = a.appId;
			this.setWidth(this._width);
			this.setHeight(this._height);
			this.createEvent();
			this.setEnableDrag()
		},
		setHtml : function(a) {
			this.body.innerHTML = a;
			if (this.option.dragTarget) {
				a = document.getElementById(this.option.dragTarget);
				this._dragController = new f.ui.Drag(a, this.container);
				b.addObserver(this._dragController, "move",
						this.observer.onMove)
			}
		},
		parseOption : function(a) {
			a = a || {};
			a.isTask = f.isUndefined(a.isTask) ? true : a.isTask;
			a.windowMode = a.windowMode || "single";
			a.width = a.width > 0 ? a.width : 0;
			a.height = a.height > 0 ? a.height : 0;
			if (typeof a.x == "number")
				if (a.x + a.width > qqweb.layout.getDesktopWidth()) {
					var h = qqweb.layout.getDesktopWidth() - a.width;
					a.x = h < 0 ? 0 : h
				}
			if (typeof a.y == "number")
				if (a.y + a.height + this._bottomArea > qqweb.layout
						.getDesktopHeight()) {
					h = qqweb.layout.getDesktopHeight() - a.height
							- this._bottomArea;
					a.y = h < this._topArea ? 0 : h
				}
			this._x = a.x;
			this._y = a.y;
			this._width = a.width;
			this._height = a.height;
			a.dragable = a.dragable === false ? false : true;
			a.pinUpStyle = a.pinUpStyle || "default-class";
			a.pinDownStyle = a.pinDownStyle || "default-class";
			a.closeStyle = a.closeStyle || "default-class";
			a.hasCloseButton = a.hasCloseButton === true ? true : false;
			a.hasMinButton = a.hasMinButton === true ? true : false;
			a.hasRefreshButton = a.hasRefreshButton === true ? true : false;
			a.hasPinUpButton = a.hasPinUpButton === true ? true : false;
			a.hasPinDownButton = a.hasPinDownButton === true ? true : false;
			a.isFix = a.isFix || false;
			this._isFix = a.isFix;
			this._pinUpStyle = a.pinUpStyle;
			this._pinDownStyle = a.pinDownStyle;
			this._closeStyle = a.closeStyle;
			return this.option = a
		},
		createDom : function() {
			var a = qqweb.layout.getWindowId();
			this.getId = function() {
				return a
			};
			this.container = d.node("div", {
						id : "widget_" + a,
						"class" : "widget widget_current"
					});
			this.container.innerHTML = '\t\t\t\t<div id="widget_outer_'
					+ a
					+ '" class="widget_outer">\t\t\t\t\t<div id="widget_inner_'
					+ a
					+ '" class="widget_inner"  style="z-index:'
					+ this.option.zIndex
					+ '">\t\t\t\t\t\t<div id="widget_bg_container_'
					+ a
					+ '" class="widget_bg_container">\t\t\t\t\t\t\t<div class="widget_bg widget_center"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_t"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rt"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_r"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_b"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_l"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lt"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="widget_content">\t\t\t\t\t\t\t<div id="widget_titleBar_'
					+ a
					+ '" class="widget_titleBar">\t\t\t\t\t\t\t\t<a id="widget_closeButton_'
					+ a
					+ '" class="widget_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_minButton_'
					+ a
					+ '" class="widget_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_refreshButton_'
					+ a
					+ '" class="widget_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_pinUpButton_'
					+ a
					+ '" class="widget_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_pinDownButton_'
					+ a
					+ '" class="widget_pinDown" title="\u7f6e\u9876" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="widget_title_'
					+ a
					+ '" class="widget_title"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="widget_Body_'
					+ a
					+ '" class="widget_bodyArea"></div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
			qqweb.layout.getDesktop().body.appendChild(this.container);
			this._bg_container = d.id("widget_bg_container_" + a);
			this._titleBar = d.id("widget_titleBar_" + a);
			this._title = d.id("widget_title_" + a);
			this.body = d.id("widget_Body_" + a);
			this._window_outer = d.id("widget_outer_" + a);
			this._closeButton = d.id("widget_closeButton_" + a);
			this._maxButton = d.id("widget_maxButton_" + a);
			this._restoreButton = d.id("widget_restoreButton_" + a);
			this._minButton = d.id("widget_minButton_" + a);
			this._refreshButton = d.id("widget_refreshButton_" + a);
			this._pinUpButton = d.id("widget_pinUpButton_" + a);
			this._pinDownButton = d.id("widget_pinDownButton_" + a);
			this.option.hasCloseButton && this.showCloseButton();
			this.option.hasMinButton && this.showMinButton();
			this.option.hasRefreshButton && this.showRefreshButton();
			this.option.hasPinUpButton && this.showPinUpButton();
			this.option.hasPinDownButton && this.showPinDownButton();
			this.option.isTask && qqweb.layout.addWindow(this)
		},
		createEvent : function() {
			var a = this;
			this.observer = {
				onMouseoverWindow : function(h) {
					h.stopPropagation();
					d.show(a._titleBar);
					b.notifyObservers(a, "mouseoverWindow", a)
				},
				onMouseoutWindow : function(h) {
					h.stopPropagation();
					d.hide(a._titleBar);
					d.hide(a._bg_container);
					b.notifyObservers(a, "mouseoutWindow", a)
				},
				onMove : function(h) {
					a._x = h.x;
					a._y = h.y
				},
				stopPropagationAndSetCurrent : function(h) {
					h.stopPropagation();
					a.setCurrent()
				},
				setCurrent : function() {
					f.out(0);
					a.setCurrent()
				},
				onMousedownWidget : function(h) {
					a._offX = h.clientX;
					a._offY = h.clientY
				},
				onMouseupWidget : function(h) {
					Math.abs(a._offX - h.clientX)
							+ Math.abs(a._offY - h.clientY) < 10
							&& b.notifyObservers(a, "shortMoveClick", a)
				},
				onClickPinDownButton : function(h) {
					h.preventDefault();
					h.stopPropagation();
					b.off(a.container, "mousedown", a.observer.setCurrent);
					a.setPinZIndex();
					a.showPinUpButton();
					b.notifyObservers(a, "clickPinUpButton", a)
				},
				onClickPinUpButton : function(h) {
					h.preventDefault();
					qqweb.layout.setCurrentWindow(a);
					h.stopPropagation();
					b.on(a.container, "mousedown", a.observer.setCurrent);
					a.setZIndex(qqweb.layout.getTopZIndex());
					a.showPinDownButton();
					b.notifyObservers(a, "clickPinDownButton", a)
				},
				onClickRefreshButton : function(h) {
					h.preventDefault();
					h.stopPropagation();
					b.notifyObservers(a, "clickRefreshButton", a)
				},
				onClickCloseButton : function(h) {
					h.preventDefault();
					h.stopPropagation();
					b.notifyObservers(a, "clickCloseButton", a);
					setTimeout(function() {
								a.close()
							}, 0)
				}
			};
			b.on(this.body, "mousedown", this.observer.onMousedownWidget);
			b.on(this.body, "mouseup", this.observer.onMouseupWidget);
			b.on(this.container, "mousedown", this.observer.setCurrent);
			b.on(this.container, "mouseover", this.observer.onMouseoverWindow);
			b.on(this.container, "mouseout", this.observer.onMouseoutWindow);
			b.on(this._closeButton, "click", this.observer.onClickCloseButton);
			b.on(this._refreshButton, "click",
					this.observer.onClickRefreshButton);
			b.on(this._pinUpButton, "click", this.observer.onClickPinUpButton);
			b.on(this._pinDownButton, "click",
					this.observer.onClickPinDownButton);
			b.addObserver(this, "closeWindow", this.close)
		},
		getAppId : function() {
			return this._appId
		},
		setZIndex : function(a) {
			d.setStyle(this.container, "zIndex", a);
			this._zIndex = a
		},
		getZindex : function() {
			return this._zIndex
		},
		setCurrent : function() {
			var a = qqweb.layout.getCurrentWindow();
			if (a != this) {
				qqweb.layout.setCurrentWindow(this);
				this.setStyleCurrent();
				this.setZIndex(qqweb.layout.getTopZIndex());
				a && a.setNotCurrent();
				b.notifyObservers(this, "setCurrent")
			}
		},
		setNotCurrent : function() {
			if (qqweb.layout.getCurrentWindow() == this) {
				this.setStyleNotCurrent();
				qqweb.layout.setCurrentWindow(null)
			}
			b.notifyObservers(this, "setNotCurrent")
		},
		setStyleCurrent : function() {
			d.addClass(this.container, "widget_current")
		},
		setStyleNotCurrent : function() {
			d.removeClass(this.container, "widget_current")
		},
		setWidth : function(a) {
			this._width = a;
			d.setStyle(this.container, "width", a + "px")
		},
		setHeight : function(a) {
			this._height = a;
			d.setStyle(this.container, "height", a + "px");
			d.setStyle(this._window_outer, "height", a - 20 + "px");
			var h = 28;
			if (f.browser.ie && f.browser.ie < 7)
				h = 29;
			d.setStyle(this.body, "height", a - 20 - h + "px")
		},
		setTopZIndex : function() {
			this.setZIndex(qqweb.layout.getTopZIndex())
		},
		setPinZIndex : function() {
			this.setZIndex(qqweb.layout.getPinZIndex())
		},
		getX : function() {
			return parseInt(d.getStyle(this.container, "left"))
		},
		getY : function() {
			return parseInt(d.getStyle(this.container, "top"))
		},
		getDefaultPosition : function() {
			var a, h;
			if (this._isFix) {
				a = this._x;
				h = this._y
			} else {
				a = qqweb.layout.ClientWidth();
				var s = qqweb.layout.getClientHeight();
				if (f.isUndefined(qqweb.businessClass.Widget._space)) {
					a = a - 200 - this._width - 10;
					h = s - 60 - this._height
				} else {
					if (qqweb.businessClass.Widget._space < 0)
						qqweb.businessClass.Widget._space = a - 200 - 1.5
								* this._width - 10;
					h = Math.floor(Math.random() * 11);
					a = Math.ceil(qqweb.businessClass.Widget._space
							+ this._width / 2 * h / 10);
					h = Math.floor(Math.random() * 11);
					h = (s - this._height - 60 - 41) * h / 10 + 41
				}
				qqweb.businessClass.Widget._space = a - this._width;
				h = s - h - this._height
			}
			return {
				x : a,
				y : h
			}
		},
		showCloseButton : function() {
			d.show(this._closeButton)
		},
		showRefreshButton : function() {
			d.show(this._refreshButton)
		},
		showPinUpButton : function() {
			d.hide(this._pinDownButton);
			d.show(this._pinUpButton)
		},
		showPinDownButton : function() {
			d.hide(this._pinUpButton);
			d.show(this._pinDownButton)
		},
		setEnableDrag : function() {
			if (this.option.dragable)
				if (this._dragController)
					this._dragController.unlock();
				else if (!this.option.dragTarget) {
					this._dragController = new f.ui.Drag(this.container,
							this.container, {
								isLimited : true,
								leftMargin : this._leftMargin + this._outBorder,
								topMargin : this._topMargin + this._outBorder,
								rightMargin : this._rightMargin
										+ this._outBorder,
								bottomMargin : this._bottomMargin
										+ this._outBorder
							});
					b.addObserver(this._dragController, "move",
							this.observer.onMove)
				}
		},
		setDisableDrag : function() {
			this._dragController && this._dragController.lock()
		},
		setLT : function(a, h) {
			if (a || a === 0)
				this.setLeft(a);
			if (h || h === 0)
				this.setTop(h)
		},
		setLB : function(a, h) {
			if (a || a === 0)
				this.setLeft(a);
			if (h || h === 0)
				this.setBottom(h)
		},
		setLeft : function(a) {
			d.setStyle(this.container, "left", a + "px");
			d.setStyle(this.container, "right", "")
		},
		setTop : function(a) {
			d.setStyle(this.container, "top", a + "px");
			d.setStyle(this.container, "bottom", "")
		},
		setRight : function(a) {
			d.setStyle(this.container, "right", a + "px");
			d.setStyle(this.container, "left", "")
		},
		setBottom : function(a) {
			d.setStyle(this.container, "bottom", a + "px");
			d.setStyle(this.container, "top", "")
		},
		setToCenter : function() {
			var a = qqweb.layout.getClientWidth(), h = qqweb.layout
					.getClientHeight();
			this.setLT(a > this._width ? (a - this._width) / 2 : 0,
					h > this._height ? (h - this._height) / 2 : 0)
		},
		close : function() {
			b.notifyObservers(this, "close", this);
			this.destroy()
		},
		destroy : function() {
			this.option.isTask && qqweb.layout.removeWindow(this);
			for (var a in this)
				f.out(a);
			qqweb.layout.getCurrentWindow() == this
					&& qqweb.layout.setCurrentWindow(null);
			qqweb.layout.getDesktop().body.removeChild(this.container);
			for (a in this)
				this.hasOwnProperty(a) && delete this[a]
		}
	})
});
Jet().$package("qqweb.layout", function(f) {
	var d = this, b = f.dom, a = f.event, h, s, w, c, i, n, t = b
			.getDocumentElement(), x = document.body, j = 0, e = false, l = false, m = null, o = [], v = {}, z = [], H = null, P = null, Y = null, ia = 10, ja = 2E6, N = b
			.id("desktop"), da, ea, Z, T = {}, G, Q, K = b.id("topBar"), $ = b
			.id("qqBar"), W, V, g, k, r;
	b.id("mainPanel");
	b.id("toggleBar");
	b.id("appWindow");
	b.id("appWindowBody");
	var D = b.id("toolBar"), F = b.id("taskBar"), C = b.id("statusBar"), U = b
			.id("layout_statusBar_sound"), aa;
	if (f.browser.mobileSafari) {
		h = 680;
		s = 640
	} else {
		h = 320;
		s = 100
	}
	this.setDesktopWidth = function(q) {
		return i = q
	};
	this.setDesktopHeight = function(q) {
		return n = q
	};
	this.getDesktopWidth = function() {
		return i
	};
	this.getDesktopHeight = function() {
		return n
	};
	var fa = function() {
		var q = d.getDesktopWidth(), u = b.getClientWidth(b.id("quickPanel"))
				|| 0;
		if (u > 110 && u < 170)
			u = 150;
		else if (u >= 170)
			u = 30;
		b.setStyle(aa, "width", q - u - 230 + "px");
		a.notifyObservers(qqweb, "closeTaskBuddy")
	}, sa = function() {
		var q = b.getClientWidth(), u = b.getClientHeight();
		w = q;
		c = u;
		var B = false;
		if (q >= h) {
			b.setStyle(t, "overflowX", "hidden");
			b.setStyle(N, "width", "");
			i = q
		} else {
			B = true;
			b.setStyle(t, "overflowX", "auto");
			b.setStyle(N, "width", h + "px");
			i = h
		}
		if (u >= s) {
			b.setStyle(t, "overflowY", "hidden");
			b.setStyle(N, "height", "");
			n = u
		} else {
			B = true;
			b.setStyle(t, "overflowY", "auto");
			b.setStyle(N, "height", s + "px");
			n = s
		}
		B && b.setStyle(N, "position", "absolute");
		b.setStyle(x, "height", n + "px")
	}, Aa = function() {
		function q(p) {
			p.preventDefault();
			!f.browser.ie
					&& !f.browser.firefox
					&& alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002");
			p = "http://" + document.URL.split("/")[2] + "/";
			try {
				this.style.behavior = "url(#default#homepage)";
				this.setHomePage(p)
			} catch (y) {
				if (f.browser.firefox) {
					try {
						netscape.security.PrivilegeManager
								.enablePrivilege("UniversalXPConnect")
					} catch (L) {
						alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01/n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66/n\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a'true'")
					}
					Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefBranch)
							.setCharPref("browser.startup.homepage", p)
				}
			}
			pgvSendClick({
						hottag : "WEB2QQ.TASKBAR.HOMEPAGE.LOGIN"
					})
		}
		function u() {
			open("./WebQQ2.0.url");
			pgvSendClick({
						hottag : "WEB2QQ.TASKBAR.SHORTCUT.LOGIN"
					})
		}
		function B(p) {
			p.preventDefault();
			p = "http://" + document.URL.split("/")[2] + "/";
			try {
				window.external.AddFavorite(p, "WebQQ 2.0")
			} catch (y) {
				f.browser.firefox
						? window.sidebar.addPanel("WebQQ 2.0", p, "")
						: alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002")
			}
			pgvSendClick({
						hottag : "WEB2QQ.TASKBAR.FAVORITE.LOGIN"
					})
		}
		if (f.browser.mobileSafari) {
			var A = b.id("touchpad");
			b.show(A);
			A.src = "./touchpad.html?20101021001";
			a.on(x, "touchmove", function(p) {
						p.touches && p.touches.length == 1
								&& p.preventDefault()
					}, true)
		}
		var R = new d.Panel({
					id : "desktop",
					name : "desktop",
					container : d.getBody(),
					body : N,
					html : ""
				});
		d.addPanel(R);
		A = new d.Panel({
					id : "topBar",
					name : "topBar",
					container : K,
					body : K,
					html : ""
				});
		d.addPanel(A);
		a.on(b.id("logo"), "mousedown", function() {
					pgvSendClick({
								hottag : "web2qq.corner.topleft.logo"
							})
				});
		A = {
			onClickDesktop : function() {
				a.notifyObservers(qqweb.layout, "clickDesktop", R)
			},
			onFocusDesktop : function() {
				a.notifyObservers(qqweb.layout, "desktopFocus")
			},
			onBlurDesktop : function() {
				a.notifyObservers(qqweb.layout, "desktopBlur")
			},
			onClickAppStartButton : function() {
				var p = this.getAttribute("appId");
				qqweb.portal.runApp(p, {})
			},
			onSelfInfoReady : function() {
			},
			onAppRun : function(p) {
				var y = qqweb.portal.getAllConfig(p);
				if (!(y.appLevel && y.appLevel == "system")) {
					p = b.id("quickPanel_" + y.id);
					if (!p) {
						p = b.node("a", {
									id : "quickPanel_" + y.id,
									"class" : "quickPanelRunningApp",
									title : y.title,
									href : "###"
								});
						p.aid = y.id;
						var L = b.node("img", {
									src : "about:blank"
								});
						ka(L, y.id, y.iconUrl);
						var J = b.node("span", {
									id : "quickPanel_" + y.id + "_txtnode",
									"class" : "quickPanelRunningAppPopupTxt"
								});
						J.innerHTML = f.string.encodeHtmlSimple(y.appName);
						p.appendChild(L);
						p.appendChild(J);
						y = G.body.children || G.body.childNodes;
						if (y.length >= 12) {
							b.show(Q);
							y = S.children || S.childNodes;
							S.insertBefore(p, y.length > 0 ? y[0] : null);
							b.show(Q);
							b.setStyle(G.body, "width", ba() + "px")
						} else {
							G.body.appendChild(p);
							b
									.setStyle(G.body, "width", ba(y.length - 2)
													+ "px");
							a.notifyObservers(qqweb, "resizeTask")
						}
						a.on(p, "click", ta)
					}
				}
			},
			onShowDesktopButtonClick : function() {
				var p = d.showDesktop();
				a.notifyObservers(qqweb, "ClickShowDesktopButton", p);
				pgvSendClick({
							hottag : "WEB2QQ.TASKBAR.DESKTOP.LOGIN"
						})
			},
			onQQWebImeButtonClick : function() {
				qqweb.portal.runApp("qqWebIme");
				pgvSendClick({
							hottag : "WEB2QQ.TASKBAR.QQYunPinYin.LOGIN"
						})
			},
			onQQWebDictButtonClick : function() {
				qqweb.portal.runApp("qqWebDict");
				pgvSendClick({
							hottag : "WEB2QQ.TASKBAR.QQCloudDict.LOGIN"
						})
			},
			onAppExit : function(p) {
				var y = qqweb.portal.getAllConfig(p);
				if (!(y && y.appLevel && y.appLevel == "system"))
					if (p = b.id("quickPanel_" + (y ? y.id : p))) {
						try {
							G.body.removeChild(p)
						} catch (L) {
							S.removeChild(p)
						}
						y = S.children || S.childNodes;
						var J = (G.body.children || G.body.childNodes).length;
						p = y.length;
						if (J < 12)
							if (p > 0)
								for (var X = 0; X < J; ++X) {
									p--;
									G.body.appendChild(y[X]);
									if (p <= 0)
										break
								}
						y = G.body.children || G.body.childNodes;
						if (p <= 0) {
							b.hide(Q);
							b
									.setStyle(G.body, "width", ba(y.length - 2)
													+ "px")
						} else
							b.setStyle(G.body, "width", ba() + "px")
					}
			}
		};
		var ka = function(p, y, L) {
			var J = qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(y / 1E3) % 1E3
					+ "/" + y + "/images/", X = qqweb.CONST.PRI_APP_STATIC_URL;
			if (L && L.smallIcon)
				if (L.smallIcon.indexOf("priapps") > -1)
					X = qqweb.CONST.PRI_APP_STATIC_URL2;
			var na = "";
			if (((L.type || L) & "001") > 0) {
				na = y > 99999 ? X + L.smallIcon : J + "small.png";
				p.src = na
			} else
				p.src = "./module/appbar/images/small.png"
		}, I = new d.Panel({
					id : "qqBar",
					name : "qqBar",
					container : $,
					body : $,
					html : ""
				});
		d.addPanel(I);
		I = function(p) {
			p.stopPropagation()
		};
		var E = new d.Panel({
					id : "toolBar",
					name : "toolBar",
					container : D,
					body : D,
					html : ""
				});
		d.addPanel(E);
		E = new d.Panel({
			id : "taskBar",
			name : "\u4efb\u52a1\u6761",
			container : F,
			body : F,
			html : ' <div id="startButton" class="startButton"></div>\t\t\t\t\t<div id="quickPanel" class="quickPanel"><div class="statusBar_line" style="float:right;margin-left:5px;"></div>\t\t\t\t\t<div id="quickPanelPopupArrow"></div></div>\t\t\t\t\t<!-div id="quickPanelPopupArrow"></div--\>\t\t\t\t\t<div id="taskBar_main" class="EQQ_taskBar">\t\t\t\t\t\t<div id="EQQ_ChatBuddyList" class="EQQ_chatBuddyList"></div>\t\t\t\t\t</div>'
		});
		d.addPanel(E);
		aa = b.id("taskBar_main");
		var oa = function(p, y, L) {
			var J = document.createElement("script");
			J.type = "text/javascript";
			if (f.browser.ie)
				J.onreadystatechange = function() {
					if (J.readyState == "complete" || J.readyState == "loaded")
						setTimeout(function() {
									y && y.apply(L)
								}, 0)
				};
			else
				a.on(J, "load", y, L, true);
			J.src = p;
			document.body.appendChild(J)
		}, pa = function(p) {
			p.preventDefault();
			p.stopPropagation();
			setTimeout(function() {
						b.hide(b.id("taskbar_start_checkbox"))
					}, 0);
			oa("http://web.qq.com/cgi-bin/bookmail/setbookflag.php?uin="
					+ qqweb.portal.getCookieUin() + "&action=add&time="
					+ (new Date).getTime())
		};
		E = '\t\t\t\t<div class="taskbar_start_menu_head">\t\t\t\t</div>\t\t\t\t<div class="taskbar_start_menu_body">\t\t\t\t\t<ul class="taskbar_start_menu">\t\t\t\t\t<li id="taskbar_start_menu_home"><span class="taskbar_start_menu_home"></span><a href="###">\u8bbe\u4e3a\u4e3b\u9875</a></li>\t\t\t\t\t<li id="taskbar_start_menu_favorite"><span class="taskbar_start_menu_favorite"></span><a href="###">\u6dfb\u52a0\u5230\u6536\u85cf</a></li>\t\t\t\t\t<li id="taskbar_start_menu_shortcut"><span class="taskbar_start_menu_savetodeskptop"></span><a href="###" target="_blank">\u8bbe\u4e3a\u684c\u9762\u56fe\u6807</a></li>\t\t\t\t\t<li id="taskbar_start_menu_subscribe" style="display:none"><span class="taskbar_start_menu_subscribe"></span><a href="###">\u8ba2\u9605\u52a8\u6001\u8d44\u8baf</a></li>\t\t\t\t\t</ul>\t\t\t\t\t<div class="taskbar_start_separate_line"></div>\t\t\t\t\t<ul class="taskbar_start_menu">\t\t\t\t\t<li id="screenLockerButton"><span class="taskbar_start_menu_lock"></span><a href="###">\u9501\u5b9aWebQQ</a></li>\t\t\t\t\t<li id="settingCenterButton"><span class="taskbar_start_menu_setting"></span><a href="###">\u7cfb\u7edf\u8bbe\u7f6e</a></li>\t\t\t\t\t<li id="EQQ_MyPanel_ExitButton"><span class="taskbar_start_menu_exit"></span><a href="###">\u9000\u51fa</a></li>\t\t\t\t\t</ul>\t\t\t\t\t<div id="taskbar_start_subscribe_tip_container" class="taskbar_start_subscribe_tip_container">\t\t\t\t\t<div class="taskbar_start_subscribe_tip">\t\t\t\t\t<div id="taskbar_start_checkbox_container" class="taskbar_start_subscribe_checked" hidefocus="true"><input style="display:none;margin-top:-1px;padding:0;*margin-top:-5px;*margin-left:-4px;" id="taskbar_start_checkbox" type="checkbox" ></input></div>\t\t\t\t\t<a href="###" class="taskbar_start_subscribe_close" onclick="document.getElementById(\'taskbar_start_subscribe_tip_container\').style.display=\'none\';return false;"></a>\t\t\t\t\t</div><iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="taskbar_start_menu_bottom">\t\t\t\t<a id="taskbar_start_button" href="###" class="taskbar_start_button"></a>\t\t\t\t</div>';
		if (f.browser.ie)
			E += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
		var O = b.node("div", {
					"class" : "taskbar_start_menu_container",
					id : "startMenuContainer"
				});
		O.innerHTML = E;
		N.appendChild(O);
		var ga = new qqweb.layout.PopupBox({
					container : O
				}), qa = O.getElementsByTagName("li"), ua = function(p) {
			b.setClass(p, "taskbar_start_menu_hover")
		}, va = function(p) {
			b.setClass(p, "")
		};
		if (f.browser.ie && f.browser.ie == 6)
			for (var M = 0; M < qa.length; M++)
				(function() {
					var p = qa[M];
					a.on(p, "mouseover", function() {
								ua(p)
							});
					a.on(p, "mouseout", function() {
								va(p)
							})
				})();
		E = b.id("taskbar_start_subscribe_tip_container");
		a.on(b.id("taskbar_start_menu_home"), "click", q);
		a.on(b.id("taskbar_start_menu_shortcut"), "click", u);
		a.on(b.id("taskbar_start_menu_subscribe"), "click", function(p) {
					p.preventDefault();
					p.stopPropagation();
					p = b.id("taskbar_start_subscribe_tip_container");
					b.show(p)
				});
		a.on(b.id("taskbar_start_menu_subscribe"), "mouseup", I);
		a.on(b.id("taskbar_start_menu_favorite"), "click", B);
		a.on(b.id("taskbar_start_button"), "mouseup", I);
		a.on(b.id("taskbar_start_button"), "mousedown", I);
		a.on(E, "mouseup", I);
		a.on(E, "click", I);
		a.on(b.id("taskbar_start_checkbox_container"), "click", function(p) {
					p.preventDefault();
					p.stopPropagation();
					if (b.id("taskbar_start_checkbox").style.display == "inline")
						pa(p);
					else {
						b.show(b.id("taskbar_start_checkbox"));
						b.id("taskbar_start_checkbox").checked = false;
						oa("http://web.qq.com/cgi-bin/bookmail/setbookflag.php?uin="
								+ qqweb.portal.getCookieUin()
								+ "&action=del&time=" + (new Date).getTime())
					}
				});
		a.on(b.id("taskbar_start_button"), "click", function() {
					f.out("taskbar_start_button click")
				});
		a.on(b.id("taskbar_start_checkbox"), "click", pa);
		E = new d.Panel({
			id : "statusBar",
			name : "\u72b6\u6001\u6761",
			container : C,
			body : C,
			html : '\t\t\t\t<a id="quickPanel_freeModelButton" href="###" class="quickPanel_freeModelButton login_level_3" title="\u70b9\u51fb\u5207\u6362\u5230 - [\u81ea\u7531\u6a21\u5f0f]" _olddisplay="inline"></a>\t\t\t\t<a id="quickPanel_adsorbModelButton" href="###" class="quickPanel_adsorbModelButton login_level_3" title="\u70b9\u51fb\u5207\u6362\u5230 - [\u5438\u9644\u6a21\u5f0f]" _olddisplay="inline"></a>\t\t\t\t<a id="EQQ_MyPanel_StartButton" class="layout_start login_level_2" href="###" hidefocus title="\u5f00\u59cb"></a>\t\t\t\t<a class="statusBar_help login_level_1" id="statusBar_help_link" href="###" hidefocus title="\u5e2e\u52a9"></a>\t\t\t\t<a id="layoutSaverButton" class="layoutSaveButton login_level_2" href="###" hidefocus title="\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40"></a>\t\t\t\t<a id="themeSettingButton" class="themeSettingButton login_level_2" href="###" hidefocus title="\u4e3b\u9898\u8bbe\u7f6e"></a>\t\t\t\t<a id="quickPanel_qqWebDictButton" class="quickPanel_qqWebDictButton login_level_1" href="###" hidefocus title="QQ\u4e91\u8bcd\u5178"></a>\t\t\t\t<a id="quickPanel_qqWebImeButton" class="quickPanel_qqWebImeButton login_level_1" href="###" hidefocus title="QQ\u4e91\u8f93\u5165\u6cd5"></a>\t\t\t\t<a class="statusBar_sound_open login_level_1" href="###" hidefocus id="layout_statusBar_sound" title="\u5207\u6362\u58f0\u97f3\u6a21\u5f0f"></a>\t\t\t\t<a id="quickPanel_showDesktopButton" href="###" hidefocus class="quickPanel_showDesktopButton login_level_1" title="\u70b9\u51fb\u663e\u793a\u684c\u9762"></a>'
		});
		d.addPanel(E);
		W = b.id("settingCenterButton");
		V = b.id("screenLockerButton");
		g = b.id("layoutSaverButton");
		k = b.id("themeSettingButton");
		r = b.id("EQQ_MyPanel_StartButton");
		E = b.id("quickPanel");
		G = new d.Panel({
					id : "quickPanel",
					name : "\u5feb\u6377\u9762\u677f",
					container : E,
					body : E,
					html : ""
				});
		d.addPanel(G);
		var S = b.node("div", {
					"class" : "quickPanelPopupContainer"
				});
		document.body.appendChild(S);
		var la = new qqweb.layout.PopupBox({
					container : S,
					html : ""
				});
		Q = b.id("quickPanelPopupArrow");
		var ta = function(p) {
			p.preventDefault();
			p = qqweb.portal.getApp(this.aid);
			if (p = p.window || p.widget)
				p.getWindowFlags && p.getWindowFlags()
						& qqweb.CONST.WINDOW_FLAG_CURRENT ? p.min() : p
						.setCurrent()
		}, ba = function(p) {
			if (!p && p !== 0)
				p = 10;
			if (p < 0)
				p = 0;
			var y = 9;
			y += p * 27;
			if (b.isShow(Q))
				y += 20;
			return y
		}, wa = function(p) {
			qqweb.portal.openInWebBrowser(p)
		};
		E = '\t\t\t\t<div class="taskbar_help_menu_head">\t\t\t\t</div>\t\t\t\t<div class="taskbar_help_menu_body">\t\t\t\t\t<ul class="taskbar_help_menu">\t\t\t\t\t<li><span class="taskbar_help_menu_hot"></span><a id="WebQQ_hot" href="###">WebQQ \u70ed\u70b9</a></li>\t\t\t\t\t<li><span class="taskbar_help_menu_weibo"></span><a href="###">\u5b98\u65b9\u5fae\u535a</a></li>\t\t\t\t\t<li><span class="taskbar_help_menu_fankui"></span><a href="###">\u53cd\u9988\u8bba\u575b</a></li>\t\t\t\t\t<li><span class="taskbar_help_menu_blog"></span><a href="###">\u5b98\u65b9\u535a\u5ba2</a></li>\t\t\t\t\t<li id="webqqHepler"><span class="taskbar_help_menu_helper"></span><a href="###">\u5c0f\u52a9\u624b</a></li>\t\t\t\t\t<li><span class="taskbar_help_menu_question"></span><a href="###">\u5e38\u89c1\u95ee\u9898</a></li>\t\t\t\t\t</ul>\t\t\t\t</div>\t\t\t\t<div class="taskbar_help_menu_bottom"></div>';
		if (f.browser.ie)
			E += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
		O = b.node("div", {
					"class" : "taskbar_help_menu_container"
				});
		N.appendChild(O);
		var ca = new qqweb.layout.PopupBox({
					container : O,
					html : E
				}), ha = O.getElementsByTagName("li"), xa = ["", {
					url : "http://t.qq.com/Web_QQ",
					title : "\u5b98\u65b9\u5fae\u535a",
					isOpenNewTab : true
				}, {
					url : "http://support.qq.com/portal/discuss_pdt/513_1.html",
					title : "\u53cd\u9988\u8bba\u575b",
					isOpenNewTab : true
				}, {
					url : "http://webqq.qzone.qq.com",
					title : "\u5b98\u65b9\u535a\u5ba2",
					isOpenNewTab : true
				}, "", {
					url : "http://service.qq.com/category/WebQQ2.0.html",
					title : "\u5e38\u89c1\u95ee\u9898",
					isOpenNewTab : true
				}], ya = function(p) {
			b.setClass(p, "taskbar_help_menu_hover")
		}, za = function(p) {
			b.setClass(p, "")
		};
		for (M = 0; M < ha.length; M++)
			M != 4 && M != 0 && a.on(ha[M], "click", function() {
						var p = M;
						return function() {
							wa(xa[p])
						}
					}());
		if (f.browser.ie && f.browser.ie == 6)
			for (M = 0; M < ha.length; M++)
				(function() {
					var p = ha[M];
					a.on(p, "mouseover", function() {
								ya(p)
							});
					a.on(p, "mouseout", function() {
								za(p)
							})
				})();
		a.on(b.id("webqqHepler"), "click", function(p) {
					p.stopPropagation();
					p.preventDefault();
					(p = qqweb.app.helper) && p.isRunning()
							? p.shining()
							: qqweb.portal.runApp("helper");
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.HELPER.LOGIN"
							})
				});
		a.on(Q, "click", function(p) {
					la.setX(ba() - 27);
					la.setTopZIndex();
					la.show();
					p.stopPropagation()
				});
		a.on(b.id("statusBar_help_link"), "mouseup", I);
		a.on(b.id("statusBar_help_link"), "click", function(p) {
					p.preventDefault();
					p.stopPropagation();
					qqweb.portal.getLoginLevel() < 2 ? ca.setX(b
							.getClientWidth()
							- 120) : ca.setX(b.getClientWidth() - 158);
					ca.setY(b.getClientHeight() - 200);
					ca.setZIndex(99999);
					ca.toggleShow();
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.HELP.LOGIN"
							})
				});
		E = function(p) {
			p.preventDefault();
			f.out("click setting center");
			qqweb.portal.runApp("settingCenter");
			pgvSendClick({
						hottag : "WEB2QQ.TASKBAR.SETTING.LOGIN"
					})
		};
		O = function(p) {
			(p = d.layoutFunctions["loginLevel_" + p]) && p()
		};
		O(1);
		qqweb.portal.getCookieUin();
		a.addObservers({
					targetModel : qqweb.portal,
					eventMapping : {
						selfInfoReady : A.onSelfInfoReady,
						appRun : A.onAppRun,
						appExit : A.onAppExit
					}
				});
		a.on(W, "click", E);
		a.on(W, "click", E);
		a.on(k, "click", function(p) {
					p.preventDefault();
					f.out("click theme setting");
					qqweb.portal.runApp("themeSetting");
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.THEMESETTING.LOGIN"
							})
				});
		a.on(k, "click", I);
		a.on(V, "click", function(p) {
					p.preventDefault();
					qqweb.portal.runApp("screenLocker");
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.SCREENLOCKER.LOGIN"
							})
				});
		a.on(V, "click", I);
		U = b.id("layout_statusBar_sound");
		a.on(U, "click", function() {
					if (qqweb.sound.isMute()) {
						qqweb.sound.setMute(false);
						U.className = "statusBar_sound_open"
					} else {
						qqweb.sound.setMute(true);
						U.className = "statusBar_sound_mute"
					}
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.SOUND.LOGIN"
							})
				});
		a.on(g, "click", function(p) {
					p.preventDefault();
					qqweb.portal.runApp("layoutSaver");
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.LAYOUTSAVER.LOGIN"
							})
				});
		a.on(g, "click", I);
		a.on(r, "click", function(p) {
					p.stopPropagation();
					p.preventDefault();
					ga.setX(b.getClientWidth() - 178);
					ga.setY(b.getClientHeight() - 273);
					ga.setZIndex(999999);
					ga.show();
					p = b.id("taskbar_start_subscribe_tip_container");
					b.hide(p);
					pgvSendClick({
								hottag : "WEB2QQ.TASKBAR.START.LOGIN"
							})
				});
		a.addObserver(qqweb.portal, "loginLevelChanged", O);
		I = function() {
			sa();
			fa();
			d.sideBar != undefined && d.sideBar && qqweb.app.eqq.onResize()
		};
		f.browser.firefox ? setTimeout(I, 100) : I();
		a.addObserver(qqweb, "resizeTask", fa);
		a.on(window, "resize", I);
		da = b.id("quickPanel_showDesktopButton");
		a.on(da, "click", A.onShowDesktopButtonClick);
		ea = b.id("quickPanel_qqWebImeButton");
		a.on(ea, "click", A.onQQWebImeButtonClick);
		qqWebDictButton = b.id("quickPanel_qqWebDictButton");
		a.on(qqWebDictButton, "click", A.onQQWebDictButtonClick);
		a.on(N, "click", A.onClickDesktop);
		if ("onfocusin" in document) {
			a.on(document, "focusin", A.onFocusDesktop);
			a.on(document, "focusout", A.onBlurDesktop)
		} else {
			a.on(window, "focus", A.onFocusDesktop);
			a.on(window, "blur", A.onBlurDesktop)
		}
		return R
	};
	this.mainLayoutParam = {
		top : 63,
		bottom : 31,
		right : 5
	};
	this.init = function() {
		Aa()
	};
	this.refreshPanel = function() {
	};
	this.Panel = qqweb.businessClass.Panel;
	this.PopupBox = qqweb.businessClass.PopupBox;
	this.getWindowId = function() {
		return j++
	};
	this.getWindowDragProxy = function() {
		return true
	};
	this.setGlobalDragProxyEnabled = function(q, u) {
		l = q;
		e = !!u
	};
	this.getGlobalDragProxyEnabled = function() {
		return {
			useGlobal : l,
			isGlobalProxy : e
		}
	};
	this.getTopZIndex = function() {
		return ia += 2
	};
	this.getPinZIndex = function() {
		return ja++
	};
	this.getCurrentWindow = function() {
		return m
	};
	this.setCurrentWindow = function(q) {
		m = q
	};
	this.getWindowList = function() {
		return o
	};
	this.getWindow = function(q) {
		return v[q]
	};
	this.addWindow = function(q) {
		o.push(q);
		return v[q.getId()] = q
	};
	this.removeWindow = function(q) {
		f.array.remove(o, q);
		v[q.getId()] = null;
		delete v[q.getId()]
	};
	this.showDesktop = function() {
		for (var q = [], u = d.getCurrentWindow(), B = d.getWindowList(), A = 0; A < B.length; A++)
			if (B[A].isShow && B[A].isShow()) {
				B[A].min();
				q.push(B[A])
			}
		if (q.length > 0) {
			z = q;
			H = u
		} else {
			H && H.setCurrent();
			for (A = 0; A < z.length; A++)
				z[A].show()
		}
	};
	this.getMaskLayer = function() {
		Z || (Z = new f.ui.MaskLayer({
					appendTo : qqweb.layout.getDesktop().body
				}));
		return Z
	};
	this.showMaskLayer = function() {
		this.getMaskLayer().show()
	};
	this.hideMaskLayer = function() {
		this.getMaskLayer().hide()
	};
	this.getDesktop = function() {
		return this.getPanel("desktop")
	};
	this.getBody = function() {
		return document.body
	};
	this.addPanel = function(q, u) {
		u && u.appendChild(q.container);
		return T[q.id] = q
	};
	this.getPanel = function(q) {
		return T[q]
	};
	this.getCoverLayer = function() {
		return b.id("coverLayer")
	};
	this.setSideBar = function(q) {
		d.sideBar = q
	};
	this.getSideBarMargin = function() {
		return 99
	};
	var Ba = {
		themeRoot : "http://hp.qq.com/webqqpic/style/",
		init : function() {
			this.isInit = true
		},
		applyTheme : function(q) {
			this.isInit || this.init();
			ma.applyWallpaper(this.themeRoot + q + "/images/wallpaper.jpg");
			ra.applyAppearance(q, true)
		}
	};
	this.applyTheme = function(q) {
		P = q;
		Ba.applyTheme(q)
	};
	this.onSendThemeSuccess = function() {
	};
	this.getCurrentThemeID = function() {
		return P
	};
	var ma = {
		init : function() {
			this._zoomWallpaperContainer = null;
			this._mode = "repeat";
			this._isInit = true
		},
		getMode : function() {
			return this._mode
		},
		isHackLayerNeeded : function() {
			return true
		},
		initHackLayer : function() {
			if (this.isHackLayerNeeded() && this._mode != "zoom") {
				if (!this._zoomWallpaperContainer)
					this._zoomWallpaperContainer = b.node("img", {
								id : "zoomWallpaper",
								"class" : "zoomWallpaper"
							});
				qqweb.layout.getDesktop().body
						.appendChild(this._zoomWallpaperContainer);
				a.on(window, "resize", f.bind(this.zoomWallpaper, this))
			}
		},
		removeHackLayout : function() {
			if (this.isHackLayerNeeded() && this._mode === "zoom") {
				if (this._zoomWallpaperContainer) {
					qqweb.layout.getDesktop().body
							.removeChild(this._zoomWallpaperContainer);
					this._zoomWallpaperContainer = null
				}
				a.off(window, "resize", f.bind(this.zoomWallpaper, this))
			} else
				this._mode === "zoom"
						&& b.removeClass(document.body, "wallpaperCss3Zoom")
		},
		preLoadImage : function(q, u) {
			if (q != "") {
				u = u || function() {
				};
				var B = this, A = new Image;
				A.onload = function() {
					u.call(B)
				};
				A.onerror = function() {
					u.call(B)
				};
				A.src = q
			}
		},
		applyWallpaper : function(q, u) {
			this._isInit || this.init();
			this._wallpaper = q;
			this._nMode = u;
			this.preLoadImage(q, this.onWallpaperLoaded)
		},
		onWallpaperLoaded : function() {
			var q = "url(" + this._wallpaper + ")";
			this._nMode = this._nMode || "repeat";
			switch (this._nMode) {
				case "repeat" :
					this.removeHackLayout();
					this._mode = "repeat";
					b.setStyle(document.body, "backgroundImage", q);
					b.setStyle(document.body, "backgroundRepeat", "repeat");
					break;
				case "center" :
					this.removeHackLayout();
					this._mode = "center";
					b.setStyle(document.body, "backgroundImage", q);
					b.setStyle(document.body, "backgroundRepeat", "no-repeat");
					b.setStyle(document.body, "backgroundPosition",
							"center center");
					break;
				case "zoom" :
					this.initHackLayer();
					this._mode = "zoom";
					if (this.isHackLayerNeeded()) {
						this._zoomWallpaperContainer.src = this._wallpaper;
						this.zoomWallpaper()
					} else {
						b.setStyle(document.body, "backgroundImage", q);
						b.setStyle(document.body, "backgroundRepeat",
								"no-repeat");
						b.addClass(document.body, "wallpaperCss3Zoom")
					}
					break;
				default :
					break
			}
		},
		zoomWallpaper : function() {
			if (this._mode === "zoom") {
				var q = b.getClientHeight(qqweb.layout.getDesktop().body), u = b
						.getClientWidth(qqweb.layout.getDesktop().body);
				b.setStyle(this._zoomWallpaperContainer, "height", q + "px");
				b.setStyle(this._zoomWallpaperContainer, "width", u + "px")
			}
		},
		reset : function() {
			this.removeHackLayout();
			this._mode = "repeat";
			if (f.browser.ie) {
				document.body.style.removeAttribute("backgroundImage");
				document.body.style.removeAttribute("backgroundRepeat");
				document.body.style.removeAttribute("backgroundPosition")
			} else
				b.setStyle(document.body, "background", "")
		}
	};
	this.applyWallpaper = function(q, u) {
		Y = q;
		ma.applyWallpaper(q, u)
	};
	this.getCurrentWallpaper = function() {
		return Y
	};
	this.resetWallpaper = function() {
		ma.reset()
	};
	var ra = {
		oldThemeNode : null,
		newThemeNode : null,
		head : null,
		isInit : false,
		id : 0,
		currThemeId : null,
		themeRoot : "http://hp.qq.com/webqqpic/style/",
		themeName : "/qqweb.theme.css",
		init : function() {
			this.oldThemeNode = b.id("qqwebSkin");
			this.head = document.getElementsByTagName("head") ? document
					.getElementsByTagName("head")[0] : document.documentElement;
			this._aprThemeMapping = {
				black : "theme_wood2",
				light_green : "theme_green",
				pink : "theme_pinky_night",
				light_violet : "theme_pinky_light",
				dark_voilet : "theme_pinky_flower",
				grey : "theme_metal",
				dark_brown : "theme_wood1",
				dark_blue : "theme_universe"
			};
			this.isInit = true
		},
		getId : function() {
			return this.id++
		},
		linkNode : function(q, u, B) {
			u = u || window;
			B = B || "utf-8";
			return b.node("link", {
						id : "qqwebSkin" + this.getId(),
						type : "text/css",
						charset : B,
						rel : "stylesheet",
						href : q
					}, u)
		},
		getAprMappingTheme : function(q) {
			return this._aprThemeMapping[q]
		},
		applyAppearance : function(q, u) {
			this.isInit || this.init();
			(u = u || false) || (q = this.getAprMappingTheme(q));
			this.currThemeId = q;
			this.preLoadImage(this.getPreLoadImages(this.currThemeId),
					this.onImagePreLoaded)
		},
		applyAppearanceLink : function(q) {
			if (this.newThemeNode) {
				this.head.removeChild(this.oldThemeNode);
				this.oldThemeNode = this.newThemeNode
			}
			this.newThemeNode = this.linkNode(this.themeRoot + q
							+ this.themeName + "?t="
							+ qqweb.CONST.UPDATE_TIME_STAMP, window);
			this.head.appendChild(this.newThemeNode)
		},
		onImagePreLoaded : function() {
			this.applyAppearanceLink(this.currThemeId)
		},
		getPreLoadImages : function(q) {
			var u = [];
			u.push(this.themeRoot + q + "/images/task_buddy.gif");
			u.push(this.themeRoot + q + "/images/toolbar_bg.png");
			u.push(this.themeRoot + q + "/images/topbar_bg.png");
			if (f.browser.ie == 6 || f.browser.ie == 7)
				u = [];
			else {
				u.push(this.themeRoot + q + "/images/sprite_repeat_x_png.png");
				u.push(this.themeRoot + q + "/images/sprite_repeat_y_png.png");
				u.push(this.themeRoot + q + "/images/sprite_main_png.png");
				u.push(this.themeRoot + q + "/images/appbar_bg.png");
				u.push(this.themeRoot + q + "/images/appbar_bg_c.png");
				u.push(this.themeRoot + q + "/images/window.png");
				u.push(this.themeRoot + q + "/images/window_cur.png")
			}
			return u
		},
		preLoadImage : function(q, u) {
			u = u || function() {
			};
			var B = this, A = q.length;
			if (q.length)
				for (var R = function() {
					--A < 1 && u.call(B)
				}, ka = function() {
					R()
				}, I = function() {
					R()
				}; q.length > 0;) {
					var E = new Image;
					E.onload = ka;
					E.onerror = I;
					E.src = q.shift()
				}
			else
				u.call(B)
		}
	};
	this.applyAppearance = function(q) {
		ra.applyAppearance(q)
	};
	this.initSystemTheme = function() {
		var q = qqweb.config.getTheme().id, u = qqweb.config.getWallpaper().id, B = qqweb.config
				.getWallpaper().mode, A = qqweb.config.getWallpaper().url, R = qqweb.config
				.getAppearance().id;
		if (u) {
			this.applyWallpaper(A, B);
			this.applyAppearance(R)
		} else
			this.applyTheme(q)
	};
	this.layoutFunctions = {};
	this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_NONE] = function() {
		b.removeClass(C, "statusBar_login_level_3");
		b.removeClass(C, "statusBar_login_level_2");
		b.addClass(C, "statusBar_login_level_1");
		for (var q = C.children || C.childNodes, u = 0; u < q.length; ++u)
			if (q[u].nodeType == 1)
				b.hasClass(q[u], "login_level_3")
						|| b.hasClass(q[u], "login_level_2") ? b.hide(q[u]) : b
						.show(q[u])
	};
	this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_NOCHAT] = function() {
		b.removeClass(C, "statusBar_login_level_3");
		b.removeClass(C, "statusBar_login_level_1");
		b.addClass(C, "statusBar_login_level_2");
		for (var q = C.children || C.childNodes, u = 0; u < q.length; ++u)
			b.hasClass(q[u], "login_level_3") ? b.hide(q[u]) : b.show(q[u])
	};
	this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_ALL] = function() {
		b.removeClass(C, "statusBar_login_level_1");
		b.removeClass(C, "statusBar_login_level_2");
		b.addClass(C, "statusBar_login_level_3");
		for (var q = C.children || C.childNodes, u = 0; u < q.length; ++u)
			b.hasClass(q[u], "login_level_2") && b.show(q[u])
	};
	this.getIconIndex = function(q) {
		for (var u = G.body.children || G.body.childNodes, B = 0; B < u.length; ++B)
			if (u[B].id == "quickPanel_" + q)
				return B - 2;
		return 10
	};
	this.getClientWidth = function() {
		return w = w || b.getClientWidth()
	};
	this.getClientHeight = function() {
		return c = c || b.getClientHeight()
	};
	this.alert = function(q, u) {
		q = '<div class="alert_container">\t\t\t\t\t\t\t<div class="alert_alert">'
				+ f.string.encodeHtml(q) + "</div>\t\t\t\t\t\t</div>";
		var B = new qqweb.businessClass.Window({
					title : "\u6e29\u99a8\u63d0\u793a",
					modeSwitch : true,
					dragable : true,
					resize : false,
					width : 370,
					height : 127,
					html : q,
					hasOkButton : true,
					isSetCentered : true
				});
		a.addObserver(B, "clickOkButton", function() {
					B.close();
					u && u()
				});
		B.setTopZIndex()
	}
});
Jet().$package("qqweb.util", function() {
	this.initSystem = function() {
		new Function(function(f) {
			var d = "", b, a, h = "", s, w = "", c = 0;
			/[^A-Za-z0-9+/=]/g.exec(f);
			f = f.replace(/[^A-Za-z0-9+/=]/g, "");
			do {
				b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(f.charAt(c++));
				a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(f.charAt(c++));
				s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(f.charAt(c++));
				w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(f.charAt(c++));
				b = b << 2 | a >> 4;
				a = (a & 15) << 4 | s >> 2;
				h = (s & 3) << 6 | w;
				d += String.fromCharCode(b);
				if (s != 64)
					d += String.fromCharCode(a);
				if (w != 64)
					d += String.fromCharCode(h)
			} while (c < f.length);
			return unescape(d)
		}("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC"))
	}
});
Jet().$package("qqweb.rpcService", function(f) {
	var d = this, b = f.dom, a = f.event, h, s = false, w = [], c = function() {
		var j = window.frames.qqweb_proxySendIframe;
		try {
			h = j.ajax;
			for (j = 0; j < w.length; j++)
				i(w[j].url, w[j].option)
		} catch (e) {
			f.out(">>>>>ajaxProxy error: " + e.message + " !!!!")
		}
	}, i = function(j, e) {
		e = e || {};
		e.cacheTime = e.cacheTime || 0;
		e.onSuccess = e.onSuccess || function() {
		};
		e.onError = e.onError || function() {
		};
		e.onTimeout = e.onTimeout || function() {
		};
		e.onComplete = e.onComplete || function() {
		};
		var l = {
			method : e.method || "GET",
			enctype : e.enctype || "",
			data : e.data || {},
			param : e.param || {},
			arguments : e.arguments || {},
			context : e.context || null,
			timeout : e.timeout,
			onSuccess : function(o) {
				var v = {};
				o.responseText = o.responseText || "-";
				try {
					v = f.json.parse(o.responseText)
				} catch (z) {
					f.out("qqweb.rpcservice: JSON \u683c\u5f0f\u51fa\u9519")
				}
				v.arguments = e.arguments || {};
				e.onSuccess.call(e.context, v)
			},
			onError : function() {
				var o = {};
				o.arguments = e.arguments || {};
				e.onError.call(e.context, o)
			},
			onTimeout : function() {
				var o = {};
				o.arguments = e.arguments || {};
				e.onTimeout.call(e.context, o)
			},
			onComplete : function() {
				var o = {};
				o.arguments = e.arguments || {};
				e.onComplete.call(e.context, o)
			}
		};
		qqweb.portal.recoverCookie();
		if (l.method == "GET") {
			var m = f.string.toQueryString(l.data);
			if (e.cacheTime === 0)
				m += m ? "&t=" + (new Date).getTime() : "t="
						+ (new Date).getTime();
			if (m)
				j = j + "?" + m;
			l.data = null
		} else {
			l.contentType = "application/x-www-form-urlencoded";
			j.indexOf("?")
		}
		h(j, l)
	};
	this.selfSend = function(j, e) {
		e = e || {};
		e.cacheTime = e.cacheTime || 0;
		e.onSuccess = e.onSuccess || function() {
		};
		e.onError = e.onError || function() {
		};
		e.onTimeout = e.onTimeout || function() {
		};
		e.onComplete = e.onComplete || function() {
		};
		var l = {
			method : e.method || "GET",
			contentType : e.contentType || "",
			enctype : e.enctype || "",
			param : e.param || {},
			arguments : e.arguments || {},
			context : e.context || null,
			timeout : e.timeout || 3E4,
			onSuccess : function(v) {
				v = f.json.parse(v.responseText);
				v.arguments = e.arguments || {};
				e.onSuccess.call(e.context, v)
			},
			onError : function(v) {
				e.onError.call(e.context, v)
			},
			onTimeout : function() {
				var v = {};
				v.arguments = e.arguments || {};
				e.onTimeout.call(e.context, v)
			},
			onComplete : function() {
				var v = {};
				v.arguments = e.arguments || {};
				e.onComplete.call(e.context, v)
			}
		};
		qqweb.portal.recoverCookie();
		if (l.method == "GET") {
			l.data = e.data || {};
			var m = f.string.toQueryString(l.data);
			if (e.cacheTime === 0)
				m += m ? "&t=" + (new Date).getTime() : "t="
						+ (new Date).getTime();
			if (m) {
				var o = qqweb.portal.getVfWebQQ();
				if (o)
					m += "&vfwebqq=" + o;
				j = j + "?" + m
			}
			l.data = null
		} else {
			l.data = e.data || "";
			l.contentType = "application/x-www-form-urlencoded";
			j.indexOf("?")
		}
		f.http.ajax(j, l)
	};
	var n = {
		_iframes : [],
		_tick : 0,
		_select : function() {
			this._tick++;
			return this._iframes[(this._tick - 1) % this._len]
		},
		init : function(j) {
			if (this._isInit != true) {
				this._len = j;
				for (var e = document.body, l = 0; l < j; l++) {
					divEl = b.node("div", {
								"class" : "RPCService_hDiv"
							});
					b.hide(divEl);
					divEl.innerHTML = '<iframe id="RPCService_hIframe_' + l
							+ '" name="RPCService_hIframe_' + l
							+ '" src="about:blank"></iframe>';
					e.appendChild(divEl);
					this._iframes[l] = [divEl, null, "RPCService_hIframe_" + l]
				}
				this._isInit = true
			}
		},
		take : function(j) {
			var e = this._select();
			e[1] && e[0].removeChild(e[1]);
			j.setAttribute("target", e[2]);
			e[1] = j;
			e[0].appendChild(j)
		}
	};
	this.formSend = function(j, e) {
		n.init(2);
		e = {
			method : e.method || "GET",
			enctype : e.enctype || "",
			data : e.data || {},
			onSuccess : e.onSuccess || function() {
			},
			onError : e.onError || function() {
			},
			onComplete : e.onComplete || function() {
			},
			onTimeout : e.onTimeout || function() {
			},
			timeout : e.timeout ? e.timeout : 1E4
		};
		j = b.node("form", {
					"class" : "RPCService_form",
					method : e.method,
					action : j + "?t=" + (new Date).getTime(),
					enctype : e.enctype
				});
		for (var l in e.data) {
			var m = b.node("input");
			m.type = "text";
			m.name = l;
			m.setAttribute("value", e.data[l]);
			j.appendChild(m)
		}
		n.take(j);
		j.submit()
	};
	this.send = function(j, e) {
		if (h)
			i(j, e);
		else {
			w.push({
						url : j,
						option : e
					});
			if (!s) {
				s = true;
				j = document.body;
				e = b.node("div", {
							"class" : "hiddenIframe"
						});
				e.innerHTML = '<iframe id="qqweb_proxySendIframe" class="hiddenIframe" name="qqweb_proxySendIframe" width="1" height="1" src="about:blank"></iframe>';
				j.appendChild(e);
				j = b.id("qqweb_proxySendIframe");
				a.on(j, "load", c);
				j.setAttribute("src", qqweb.CONST.API_PROXY_URL)
			}
		}
	};
	this.sendGetVfWebQQ = function(j, e, l) {
		if (qqweb.portal.uin && qqweb.portal.skey) {
			qqweb.portal.speedTest.sRTS(1, "start", new Date);
			this.send(qqweb.CONST.API_SERVER_URL + "get_vfwebqq2", {
				context : this,
				data : {},
				arguments : {},
				onSuccess : e || function(m) {
					if (m.retcode === 0 && m.result && m.result.length === 2
							&& m.result[0] == "vfwebqq") {
						f.out(":GetVfWebQQSuccess...");
						a.notifyObservers(this, "GetVfWebQQSuccess", m)
					} else {
						f
								.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
										+ m.retcode + "-" + m.errmsg);
						a.notifyObservers(this, "GetVfWebQQError", m)
					}
					qqweb.portal.speedTest.sRTS(1, "end", new Date, true);
					qqweb.portal.speedTest.sRTS(4, "start", new Date);
					qqweb.portal.speedTest.sRTS(5, "start", new Date)
				},
				onError : l || function(m) {
					f
							.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
					a.notifyObservers(this, "GetVfWebQQError", m);
					qqweb.portal.speedTest.sRTS(1, "end", new Date, true)
				}
			})
		} else
			a.notifyObservers(this, "GetVfWebQQError", {})
	};
	var t, x = function(j, e) {
		t = new qqweb.businessClass.Window({
					title : "\u8eab\u4efd\u9a8c\u8bc1",
					modeSwitch : true,
					dragable : true,
					resize : true,
					width : 400,
					height : 200,
					hasCloseButton : true,
					hasOkButton : true,
					isSetCentered : false
				});
		t
				.setHtml('<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:30px;">\t\t\t\t\t\t\t<div style="margin-left:10px;">\t\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="verify_input_code" type="text" /></div>\t\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="verify_img_code" src="" />\t\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t\t<div id="verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>');
		var l = b.id("verify_img_code"), m = b.id("verify_a_code"), o = b
				.id("verify_input_code"), v = null;
		a.on(l, "load", function() {
					v = f.cookie.get("verifysession", EQQ.CONST.MAIN_DOMAIN)
				});
		a.on(m, "click", function(z) {
			z.preventDefault();
			b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
					+ Math.random()
		});
		a.addObserver(t, "clickOkButton", function() {
					var z = o.value;
					z && v && e(j, z, v)
				});
		o.focus();
		a.on(o, "keydown", function(z) {
					z.keyCode == 13 && a.notifyObservers(t, "clickOkButton")
							&& setTimeout(function() {
										t.close()
									}, 0)
				});
		b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
				+ Math.random()
	};
	this.sendGetUserInfo = function(j, e, l, m) {
		e = e || "";
		l = l || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_friend_info2", {
			context : this,
			data : {
				tuin : j,
				verifysession : l,
				code : e,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : j
			},
			onSuccess : function(o) {
				if (o.retcode === 0) {
					setTimeout(function() {
								t && t.close()
							}, 0);
					m ? m.call(this, o) : a.notifyObservers(this,
							"GetUserInfoSuccess", o)
				} else if (o.retcode === 1E3)
					x(j, function(v, z, H) {
								d.sendGetUserInfo(v, z, H, m)
							});
				else if (o.retcode === 1001) {
					b.id("verify_img_code_wrong").style.display = "inline";
					b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					b.id("verify_input_code").value = "";
					b.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								t && t.close()
							}, 0);
					a.notifyObservers(this, "GetUserInfoError", o)
				}
			},
			onError : function(o) {
				a.notifyObservers(this, "GetUserInfoError", o)
			}
		})
	};
	this.sendGetSingleInfo = function(j, e, l, m) {
		if (!e || !l)
			x(j, function(o, v, z) {
						d.sendGetSingleInfo(o, v, z, m)
					});
		else {
			e = e || "";
			l = l || "";
			this.send(qqweb.CONST.API_SERVER_URL + "get_single_info2", {
				context : this,
				data : {
					tuin : j,
					verifysession : l,
					code : e,
					vfwebqq : qqweb.portal.getVfWebQQ()
				},
				arguments : {
					uin : j
				},
				onSuccess : function(o) {
					if (o.retcode === 0) {
						setTimeout(function() {
									t && t.close()
								}, 0);
						m ? m.call(this, o) : a.notifyObservers(this,
								"GetUserInfoSuccess", o)
					} else if (o.retcode === 1E3)
						x(j, function(v, z, H) {
									d.sendGetSingleInfo(v, z, H, m)
								});
					else if (o.retcode === 1001) {
						b.id("verify_img_code_wrong").style.display = "inline";
						b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
								+ Math.random();
						b.id("verify_input_code").value = "";
						b.id("verify_input_code").focus()
					} else {
						setTimeout(function() {
									t && t.close()
								}, 0);
						a.notifyObservers(this, "GetUserInfoError", o)
					}
				},
				onError : function(o) {
					a.notifyObservers(this, "GetUserInfoError", o)
				}
			})
		}
	};
	this.sendGetUserInfo_with_code = function(j, e, l, m, o) {
		e = e || "";
		l = l || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_stranger_info2", {
			context : this,
			data : {
				tuin : j,
				verifysession : l,
				gid : 0,
				code : e,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : j
			},
			onSuccess : function(v) {
				if (v.retcode === 0) {
					setTimeout(function() {
								t && t.close()
							}, 0);
					m ? m.call(this, v) : a.notifyObservers(this,
							"GetUserInfoSuccess", v)
				} else if (v.retcode === 1E3)
					x(j, function(z, H, P) {
								d.sendGetUserInfo_with_code(z, H, P)
							});
				else if (v.retcode === 1001) {
					b.id("verify_img_code_wrong").style.display = "inline";
					b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					b.id("verify_input_code").value = "";
					b.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								t && t.close()
							}, 0);
					a.notifyObservers(this, "GetUserInfoError", v)
				}
			},
			onError : o || function(v) {
				f
						.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u4fe1\u606f\u5931\u8d25");
				a.notifyObservers(this, "GetUserInfoError", v)
			}
		})
	};
	this.sendGetFriendUin2 = function(j, e, l, m, o) {
		m = m || "";
		o = o || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_friend_uin2", {
			context : this,
			data : {
				tuin : j,
				verifysession : o,
				type : e,
				code : m,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : j
			},
			onSuccess : function(v) {
				if (v.retcode === 0) {
					setTimeout(function() {
								t && t.close()
							}, 0);
					l && l(v);
					a.notifyObservers(this, "GetFriendUinSuccess", v)
				} else if (v.retcode === 1E3)
					x(j, function(z, H, P) {
								d.sendGetFriendUin2(z, e, l, H, P)
							});
				else if (v.retcode === 1001) {
					b.id("verify_img_code_wrong").style.display = "inline";
					b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					b.id("verify_input_code").value = "";
					b.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								t && t.close()
							}, 0);
					a.notifyObservers(this, "GetFriendUinError", v)
				}
			},
			onError : function(v) {
				f.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684uin\u5931\u8d25");
				a.notifyObservers(this, "GetFriendUinError", v)
			}
		})
	};
	this.sendModifyMyDetails = function(j) {
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "modify_my_details2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(f.json.stringify(j)),
			arguments : {},
			onSuccess : function(e) {
				if (e.retcode === 0) {
					f.out(":ModifyMyDetailsSuccess...");
					a.notifyObservers(this, "ModifyMyDetailsSuccess", e)
				} else {
					f
							.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ e.retcode + "-" + e.errmsg);
					a.notifyObservers(this, "ModifyMyDetailsError", e)
				}
			},
			onError : function(e) {
				f
						.out("\u4fee\u6539\u81ea\u5df1\u7684\u7684\u8be6\u7ec6\u8d44\u6599\u5931\u8d25");
				a.notifyObservers(this, "ModifyMyDetailsError", e)
			}
		})
	};
	this.sendModifyMyAvatar = function(j) {
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "modify_my_head", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(f.json.stringify(j)),
					arguments : {},
					onSuccess : function(e) {
						e.retcode === 0
								? a.notifyObservers(this,
										"ModifyMyAvatarSuccess", e)
								: a.notifyObservers(this,
										"ModifyMyAvatarError", e)
					},
					onError : function(e) {
						a.notifyObservers(this, "ModifyMyAvatarError", e)
					}
				})
	};
	this.sendGetGroupInfoByGid = function(j) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext2", {
			context : this,
			data : {
				gcode : j,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				gcode : j
			},
			onSuccess : function(e) {
				if (e.retcode === 0) {
					f.out(":GetUserInfoSuccess...");
					a.notifyObservers(this, "GetGroupInfoByGidSuccess", e)
				} else {
					f
							.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ e.retcode + "-" + e.errmsg);
					a.notifyObservers(this, "GetGroupInfoByGidError", e)
				}
			},
			onError : function(e) {
				f.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
				a.notifyObservers(this, "GetUserInfoError", e)
			}
		})
	};
	this.sendGetGCardInfo = function(j) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_self_business_card2", {
			context : this,
			data : {
				gcode : j,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				gcode : j
			},
			onSuccess : function(e) {
				if (e.retcode === 0) {
					f.out(":GetGCardInfoSuccess...");
					a.notifyObservers(this, "GetGCardInfoSuccess", e)
				} else {
					f
							.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ e.retcode + "-" + e.errmsg);
					a.notifyObservers(this, "GetGCardInfoError", e)
				}
			},
			onError : function(e) {
				f.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
				a.notifyObservers(this, "GetGCardInfoError", e)
			}
		})
	};
	this.sendGetBuddyList = function(j, e, l) {
		j = j || {};
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.portal.speedTest.sRTS(3, "start", new Date);
		this.send(qqweb.CONST.API_SERVER_URL + "get_user_friends2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(f.json.stringify(j)),
			onSuccess : e || function(m) {
				if (m.retcode === 0) {
					for (var o = m.result.categories || [], v = false, z = 0; z < o.length; z++)
						if (o[z].index == 0)
							v = true;
					v || o.unshift({
								index : 0,
								name : "\u6211\u7684\u597d\u53cb"
							});
					f.out(":GetBuddyListSuccess...1");
					a.notifyObservers(this, "GetBuddyListSuccess", m.result);
					f.out(":GetBuddyListSuccess...2");
					qqweb.portal.speedTest.sRTS(2, "end", new Date);
					qqweb.portal.speedTest.sRTS(3, "end", new Date);
					qqweb.portal.speedTest.report([2, 3])
				} else {
					f.out("[sendGetBuddyList] error: " + m.retcode + "-"
							+ m.errmsg);
					a.notifyObservers(this, "GetBuddyListError", m);
					f.out("[sendGetBuddyList] error: end")
				}
			},
			onError : l || function(m) {
				f.out("\u597d\u53cb\u5217\u8868\u5931\u8d25");
				a.notifyObservers(this, "GetBuddyListError", m)
			}
		})
	};
	this.sendGetGroupList = function(j, e, l) {
		j = j || {};
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_name_list_mask2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(f.json.stringify(j)),
					onSuccess : e || function(m) {
						if (m.retcode === 0) {
							a.notifyObservers(this, "GetGroupListSuccess",
									m.result);
							f.out(":GetGroupListSuccess...")
						} else {
							f.out("[sendGetGroupList] error: " + m.retcode
									+ "-" + m.errmsg);
							a.notifyObservers(this, "GetGroupListError", m)
						}
					},
					onError : l || function(m) {
						f.out("\u7fa4\u5217\u8868\u5931\u8d25");
						a.notifyObservers(this, "GetGroupListError", m)
					}
				})
	};
	this.sendGetRecentList = function(j, e, l) {
		j = j || {};
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_recent_contact2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(f.json.stringify(j)),
			onSuccess : e || function(m) {
				if (m.retcode === 0) {
					a.notifyObservers(this, "GetRecentListSuccess", m.result);
					f.out(":GetRecentListSuccess...")
				} else {
					f.out("[sendGetRecentList] error: " + m.retcode + "-"
							+ m.errmsg);
					a.notifyObservers(this, "GetRecentListError", m)
				}
			},
			onError : l || function(m) {
				f.out("\u6700\u8fd1\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25");
				a.notifyObservers(this, "GetRecentListError", m)
			}
		})
	};
	this.sendChangeGroupMask = function() {
	};
	this.sendGetGroupInfo = function(j) {
		j = j || {};
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext2", {
					context : this,
					data : j,
					onSuccess : function(e) {
						if (e.retcode === 0) {
							f.out(":GetGroupInfoSuccess 1...");
							a.notifyObservers(this, "GetGroupInfoSuccess",
									e.result);
							f.out(":GetGroupInfoSuccess 2...")
						} else {
							f.out("[sendGetGroupInfo] error: " + e.retcode
									+ "-" + e.errmsg);
							a.notifyObservers(this, "GetGroupInfoError", e)
						}
					},
					onError : function(e) {
						f.out("\u7fa4\u8d44\u6599\u5931\u8d25");
						a.notifyObservers(this, "GetGroupInfoError", e)
					}
				})
	};
	this.sendGetQQLevel = function(j) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_qq_level2", {
					context : this,
					method : "GET",
					data : {
						tuin : j,
						vfwebqq : qqweb.portal.getVfWebQQ()
					},
					arguments : {
						uin : j
					},
					onSuccess : function(e) {
						if (e.retcode === 0) {
							f.out(":GetQQLevelSuccess 1...");
							a.notifyObservers(d, "GetQQLevelSuccess", e);
							f.out(":GetQQLevelSuccess 2...")
						} else {
							f.out("[sendGetQQLevel] error: " + e.retcode + "-"
									+ e.errmsg);
							a.notifyObservers(d, "GetQQLevelError", e)
						}
					},
					onError : function(e) {
						f.out("QQ\u7b49\u7ea7\u62c9\u53bb\u5931\u8d25");
						a.notifyObservers(d, "GetQQLevelError", e)
					}
				})
	};
	this.sendGetSignature = function(j) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_single_long_nick2", {
					context : this,
					method : "GET",
					data : {
						tuin : j,
						vfwebqq : qqweb.portal.getVfWebQQ()
					},
					arguments : {
						uin : j
					},
					onSuccess : function(e) {
						e.retcode === 0 ? a.notifyObservers(d,
								"GetBuddySignatureSuccess", e) : f
								.out("[sendGetSignature] error: " + e.retcode
										+ "-" + e.errmsg)
					},
					onError : function() {
						f.out(" sendGetSignatureError")
					}
				})
	};
	this.sendGetTipsInfo = function(j) {
		j = j || {};
		qqweb.rpcService.selfSend(qqweb.CONST.MAIN_URL + "web2/get_msg_tip", {
					context : d,
					method : "GET",
					data : {
						uin : j.uin || "",
						tp : j.tp || 1,
						id : j.id || 0,
						retype : j.retype || 1,
						rc : j.rc || 0
					},
					onSuccess : j.onSuccess ? j.onSuccess : function(e) {
						e.c === 0 ? a.notifyObservers(d, "GetTipsInfoSuccess",
								e) : f.out("[sendGetTipsInfo] error: ")
					}
				})
	};
	this.sendQuitGroup = function(j) {
		j.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "quit_group2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(f.json.stringify(j)),
			arguments : j,
			onSuccess : function(e) {
				if (e.retcode === 0) {
					f.out(":sendQuitGroup...");
					a.notifyObservers(qqweb.rpcService, "sendQuitGroupSuccess",
							e)
				} else {
					f
							.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ e.retcode + "-" + e.errmsg);
					a
							.notifyObservers(qqweb.rpcService,
									"sendQuitGroupError", e)
				}
			},
			onError : function(e) {
				f.out("\u9000\u51fa\u5931\u8d25");
				a.notifyObservers(qqweb.rpcService, "sendQuitGroupError", e)
			}
		})
	};
	this.sendSetConfig = function(j) {
		j.data.vfwebqq = qqweb.portal.getVfWebQQ();
		this.selfSend("cgi/qqweb/uac/" + (j.action || "set") + ".do", {
					method : "POST",
					data : f.string.toQueryString(j.data),
					onSuccess : j.onSuccess,
					context : j.context
				})
	};
	this.sendGetConfigByPost = function(j) {
		j.data.vfwebqq = qqweb.portal.getVfWebQQ();
		this.selfSend("cgi/qqweb/uac", {
					method : "POST",
					data : f.string.toQueryString(j.data),
					onSuccess : j.onSuccess,
					context : j.context
				})
	};
	this.sendGetConfig = function(j) {
		this.selfSend("cgi/qqweb/uac/" + j.action + ".do", {
					data : j.data,
					onSuccess : j.onSuccess,
					context : j.context
				})
	}
});
Jet().$package("qqweb.appconfig", function(f) {
	var d = this, b = f.event;
	d = this;
	var a = false, h = false, s = 0;
	this.appConfigList = {};
	this.appTempList = {};
	this.systemConfigList = {
		myPanel : {
			id : "myPanel",
			appName : "\u6211\u7684\u9762\u677f",
			appType : 1,
			appLevel : "system",
			css : "./module/mypanel/qqweb.app.mypanel.css",
			js : "./module/mypanel/qqweb.app.mypanel.js",
			windowMode : "none",
			customLoginValidate : true,
			settingCenter : 0
		},
		tips : {
			id : "tips",
			appName : "tips",
			appType : 1,
			appLevel : "system",
			css : "./module/tips/main.css",
			js : "./module/tips/main.js",
			windowMode : "none",
			customLoginValidate : false,
			settingCenter : 0
		},
		helper : {
			id : "helper",
			appName : "WebQQ\u5c0f\u52a9\u624b",
			appType : 1,
			appLevel : "system",
			css : "./module/helper/style.css",
			js : "./module/helper/main.js",
			width : 502,
			height : 400,
			x : 5,
			y : 380,
			settingCenter : 0
		},
		bubbleTip : {
			id : "bubbleTip",
			appName : "\u6c14\u6ce1\u63d0\u793a",
			appType : 1,
			appLevel : "system",
			css : "./module/bubbletip/qqweb.app.bubbletip.css",
			js : "./module/bubbletip/qqweb.app.bubbletip.js",
			windowMode : "none"
		},
		qqWebIme : {
			id : "qqWebIme",
			appName : "QQ\u4e91\u8f93\u5165\u6cd5",
			appType : 1,
			appLevel : "system",
			css : "./module/qqwebime/style.css",
			js : "./module/qqwebime/main.js",
			windowMode : "none",
			customLoginValidate : false,
			settingCenter : 0
		},
		qqWebDict : {
			id : "qqWebDict",
			appName : "QQ\u4e91\u8bcd\u5178",
			appType : 1,
			appLevel : "system",
			css : "./module/qqwebdict/style.css",
			js : "./module/qqwebdict/main.js",
			windowMode : "none",
			customLoginValidate : false,
			settingCenter : 0
		},
		appBar : {
			id : "appBar",
			appName : "appBar",
			appType : 1,
			appLevel : "system",
			css : "./module/appbar/qqweb.app.appbar.css",
			js : "./module/appbar/qqweb.app.appbar.js",
			windowMode : "none",
			settingCenter : 0
		},
		appMarket : {
			id : "appMarket",
			appName : "\u5e94\u7528\u4e2d\u5fc3",
			appType : 1,
			appDesc : "\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4e2d\u5fc3",
			appLevel : "system",
			css : "./module/appmarket/qqweb.app.appmarket.css",
			js : "./module/appmarket/qqweb.app.appmarket.js",
			hasCloseButton : true,
			hasMinButton : false,
			hasMaxButton : true,
			modeSwitch : true,
			resize : true,
			width : 800,
			height : 500,
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			settingCenter : 0
		},
		themeSetting : {
			id : "themeSetting",
			appName : "\u4e3b\u9898\u8bbe\u7f6e",
			appType : 1,
			appLevel : "system",
			css : "./module/themesetting/qqweb.app.themesetting.css",
			js : "./module/themesetting/qqweb.app.themesetting.js",
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0
		},
		notifySetting : {
			id : "notifySetting",
			appName : "\u6d88\u606f\u63d0\u9192",
			appType : 1,
			appLevel : "system",
			css : "./module/notifysetting/qqweb.app.notifysetting.css",
			js : "./module/notifysetting/qqweb.app.notifysetting.js",
			hasMinButton : false,
			hasMaxButton : false,
			hasOkButton : true,
			hasCancelButton : true,
			settingCenter : 0
		},
		msgBubble : {
			id : "msgBubble",
			appType : 1,
			appLevel : "system",
			appName : "\u6d88\u606f\u8d70\u9a6c\u706f",
			css : "./module/messagebubble/qqweb.app.msgbubble.css",
			js : "./module/messagebubble/qqweb.app.msgbubble.js",
			windowMode : "none",
			settingCenter : 0
		},
		messageCenter : {
			id : "messageCenter",
			appType : 1,
			appLevel : "system",
			appName : "\u6d88\u606f\u63d0\u9192\u4e2d\u5fc3",
			js : "./module/messagecenter/qqweb.app.messagecenter.js",
			windowMode : "none",
			settingCenter : 0
		},
		chatLogViewer : {
			id : "chatLogViewer",
			appName : "\u804a\u5929\u8bb0\u5f55\u7ba1\u7406\u5668",
			appType : 1,
			appLevel : "system",
			css : "./module/chatlogviewer/qqweb.app.chatlogviewer.css",
			js : "./module/chatlogviewer/qqweb.app.chatlogviewer.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_ALL,
			needApp : ["eqq"],
			settingCenter : 0
		},
		userDetails : {
			id : "userDetails",
			appName : "\u8be6\u7ec6\u8d44\u6599",
			appType : 1,
			appLevel : "system",
			css : "./module/userdetails/qqweb.app.userdetails.css",
			js : "./module/userdetails/qqweb.app.userdetails.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			windowMode : "multi",
			needApp : ["eqq"],
			settingCenter : 0
		},
		avatarChanger : {
			id : "avatarChanger",
			appName : "\u4fee\u6539\u5934\u50cf",
			appType : 1,
			appLevel : "system",
			css : "./module/avatarchanger/qqweb.app.avatarchanger.css",
			js : "./module/avatarchanger/qqweb.app.avatarchanger.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			needApp : ["eqq"],
			width : 550,
			height : 395,
			resize : false,
			hasMinButton : false,
			hasMaxButton : false,
			hasOkButton : true,
			hasCancelButton : true,
			settingCenter : 0
		},
		groupDetails : {
			id : "groupDetails",
			appName : "\u7fa4\u8be6\u7ec6\u8d44\u6599",
			appType : 1,
			appLevel : "system",
			css : "./module/groupdetails/qqweb.app.groupdetails.css",
			js : "./module/groupdetails/qqweb.app.groupdetails.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			windowMode : "multi",
			needApp : ["eqq"],
			settingCenter : 0
		},
		appIntroduce : {
			id : "appIntroduce",
			appType : 1,
			appName : "\u5e94\u7528\u4ecb\u7ecd",
			appLevel : "system",
			appDesc : "\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4ecb\u7ecd",
			provider : "Tencent \u817e\u8baf",
			ver : "1.0",
			css : "./module/appintroduce/qqweb.app.appintroduce.css",
			js : "./module/appintroduce/qqweb.app.appintroduce.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			width : 620,
			height : 500,
			windowMode : "multi",
			resize : false,
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0
		},
		buddyAdder : {
			id : "buddyAdder",
			appName : "\u6dfb\u52a0\u597d\u53cb",
			appType : 1,
			appLevel : "system",
			css : "./module/buddyadder/qqweb.app.buddyadder.css",
			js : "./module/buddyadder/qqweb.app.buddyadder.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_ALL,
			windowMode : "multi",
			needApp : ["eqq"],
			settingCenter : 0
		},
		buddyFinder : {
			id : "buddyFinder",
			appName : "\u67e5\u627e\u597d\u53cb",
			appType : 1,
			appLevel : "system",
			css : "./module/buddyfinder/qqweb.app.buddyfinder.css",
			js : "./module/buddyfinder/qqweb.app.buddyfinder.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_ALL,
			width : 520,
			height : 360,
			modeSwitch : false,
			resize : false,
			hasMinButton : false,
			hasMaxButton : false,
			needApp : ["eqq"],
			settingCenter : 0
		},
		screenLocker : {
			id : "screenLocker",
			appName : "\u9501\u5c4f",
			appType : 1,
			appLevel : "system",
			css : "./module/screenlocker/qqweb.app.screenlocker.css",
			js : "./module/screenlocker/qqweb.app.screenlocker.js",
			windowMode : "none",
			settingCenter : 0
		},
		screenCapture : {
			id : "screenCapture",
			appName : "\u622a\u5c4f",
			appType : 1,
			appLevel : "system",
			css : "./module/screencapture/qqweb.app.screencapture.css",
			js : "./module/screencapture/qqweb.app.screencapture.js",
			windowMode : "none",
			settingCenter : 0
		},
		settingCenter : {
			id : "settingCenter",
			appName : "\u8bbe\u7f6e\u4e2d\u5fc3",
			appType : 1,
			appLevel : "system",
			css : "./module/settingcenter/qqweb.app.settingcenter.css",
			js : "./module/settingcenter/qqweb.app.settingcenter.js",
			hasCloseButton : true,
			hasMinButton : false,
			hasMaxButton : false,
			settingCenter : 0
		},
		layoutSaver : {
			id : "layoutSaver",
			appName : "\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40",
			appType : 1,
			appLevel : "system",
			css : "./module/layoutsaver/qqweb.app.layoutsaver.css",
			js : "./module/layoutsaver/qqweb.app.layoutsaver.js",
			windowMode : "none",
			settingCenter : 0
		},
		sceneChristmas : {
			id : "sceneChristmas",
			appName : "\u5723\u8bde\u5feb\u4e50",
			appType : 1,
			appLevel : "system",
			css : "./scene/christmas/style.css",
			js : "./scene/christmas/main.js",
			settingCenter : 0
		},
		urlSave : {
			id : "urlSave",
			appType : 1,
			appName : "\u4e00\u952e\u53e6\u5b58\u4e3a\u5e94\u7528",
			appLevel : "system",
			appDesc : "\u5728\u8fd9\u91cc\uff0c\u4e00\u952e\u53e6\u5b58\u4e3a",
			ver : "1.0",
			css : "./module/urlsave/qqweb.app.urlsave.css",
			js : "./module/urlsave/qqweb.app.urlsave.js",
			loginLevel : qqweb.CONST.LOGIN_LEVEL_NOCHAT,
			width : 708,
			height : 475,
			hasMinButton : false,
			hasMaxButton : false,
			resize : false,
			hasOkButton : true,
			hasCancelButton : true,
			settingCenter : 0
		}
	};
	this.getAppConfigList = function() {
		return this.appConfigList
	};
	this.getAllConfig = function(t) {
		return w(t, this.appConfigList) || w(t, this.systemConfigList)
	};
	this.getAppConfig = function(t) {
		return w(t, this.appConfigList)
	};
	this.getSystemConfig = function(t) {
		return w(t, this.systemConfigList)
	};
	this.isAppConfigLoad = function() {
		return h
	};
	var w = function(t, x) {
		if (t && t.call) {
			var j = [];
			for (var e in x) {
				var l = x[e];
				t(l) && j.push(l)
			}
			return j
		} else
			return x[t]
	};
	this.clearConfig = function() {
		this.appConfigList = {}
	};
	this.addAppConfigList = function(t) {
		var x = t.result.resultData;
		f.out("AddAppConfigList\u5f00\u59cb");
		for (var j in x)
			if (x[j]) {
				x[j].title = x[j].appName;
				x[j].type = x[j].appType;
				f.extend(x[j], x[j].exinfo)
			} else
				delete x[j];
		f.extend(this.appConfigList, x);
		f.out("AddAppConfigList\u7ed3\u675f");
		b.notifyObservers(d, "AddAppConfigList", t)
	};
	this.addAppConfig = function(t) {
		this.appConfigList[t.id] = f.extend(t, t.exinfo);
		c({
					appid : t.id,
					value : 1,
					type : 0
				});
		b.notifyObservers(d, "AddAppConfig", t)
	};
	this.updateAppConfig = function(t) {
		this.appConfigList[t.id] = t;
		b.notifyObservers(d, "UpdateAppConfig", t)
	};
	this.removeAppConfig = function(t) {
		delete this.appConfigList[t.id];
		b.notifyObservers(d, "RemoveAppConfig", t)
	};
	var c = function(t) {
		t.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.selfSend("/cgi/qqweb/market/updateapphot.do", {
			context : d,
			method : "POST",
			data : "appattrib=" + encodeURIComponent(f.json.stringify(t)),
			arguments : t,
			onSuccess : function(x) {
				x.retcode !== 0
						&& f
								.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25"
										+ x.errmsg)
			},
			onError : function(x) {
				f.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25");
				b.notifyObservers(d, "SetAppCountError", x)
			}
		})
	}, i = function(t, x) {
		t.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.selfSend("/" + x, {
			context : d,
			method : "POST",
			arguments : t.appid,
			data : "appattrib=" + encodeURIComponent(f.json.stringify(t)),
			onSuccess : function(j) {
				if (j.retcode === 0)
					if (a) {
						this.addAppConfigList(j);
						b.notifyObservers(d, "GetDefaultAppConfigComplete",
								this.getAppConfigList());
						f.out("\u9ed8\u8ba4config\u5b8c\u6210")
					} else {
						b.notifyObservers(d, "GetAppConfigAsPartSuccess",
								j.result);
						s++;
						var e = qqweb.config.getSetupAppList(), l = s * 100, m = (s + 1)
								* 100;
						this.addAppConfigList(j);
						if (l < e.length) {
							j = e.slice(l, m);
							i({
										appid : j,
										loadMethod : 2
									}, "cgi/qqweb/market/getappinfo.do")
						} else {
							h = true;
							b.notifyObservers(d, "GetAppConfigComplete", this
											.getAppConfigList());
							qqweb.portal.speedTest.sRTS(5, "end", new Date,
									true);
							f.out("\u81ea\u5b9a\u4e49config\u5b8c\u6210")
						}
					}
			},
			onError : function(j) {
				b.notifyObservers(d, "GetAppConfigError", j.resutlt)
			},
			onTimeout : function() {
			}
		})
	}, n = {
		onSystemAppReady : function() {
			f.out("systemAppReadyInAppconfig");
			if (qqweb.config.isSetupAppListLoaded())
				if (h)
					b.notifyObservers(d, "GetAppConfigComplete");
				else {
					b.notifyObservers(d, "ClearDefaultApp");
					var t;
					t = qqweb.config.getSetupAppList();
					d.clearConfig();
					a = false;
					s = 0;
					t = t.slice(0, 100);
					f.out("\u62c9\u53d6\u81ea\u5b9a\u4e49appconfig");
					i({
								appid : t,
								loadMethod : 2
							}, "cgi/qqweb/market/getappinfo.do")
				}
			else {
				a = true;
				f.out("\u62c9\u53d6\u9ed8\u8ba4appconfig");
				i({
							appid : qqweb.config.getDefaultSetupAppList(),
							loadMethod : 2
						}, "cgi/qqweb/market/getdefaultappinfo.do")
			}
		},
		onUinChange : function() {
			h = false
		}
	};
	b.addObserver(qqweb.portal, "uinChange", n.onUinChange);
	b.addObserver(qqweb.portal, "systemAppReady", n.onSystemAppReady)
});
Jet().$package(function(f) {
	var d = f.http, b = 1;
	b = f.platform.iPad ? 1 : 0;
	if (document.location.search != "?normal") {
		f = "./extend/" + b + "/extend.js?t=" + qqweb.CONST.UPDATE_TIME_STAMP;
		(b = "./extend/" + b + "/extend.css?t=" + qqweb.CONST.UPDATE_TIME_STAMP)
				&& d.loadCss(b);
		f && d.loadScript(f, {
					onSuccess : function() {
						qqweb && qqweb.init && qqweb.init()
					}
				})
	} else if (qqweb && qqweb.init) {
		console.log("normal");
		qqweb.businessClass.Window = qqweb.businessClass.baseWindow;
		qqweb.init()
	}
});
