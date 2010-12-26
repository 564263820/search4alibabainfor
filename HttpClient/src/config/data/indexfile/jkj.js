lockedEl = null;
padEventProxy = function(e, c) {
    var d, a;
    c.initEvent(e, true, false);
    if (c.changedTouches && c.changedTouches.length) {
        a = c.changedTouches[0];
        d = a.pageX;
        a = a.pageY
    } else {
        d = c.clientX;
        a = c.clientY
    }
    if (e == "touchmove") d = lockedEl ? lockedEl: (lockedEl = document.elementFromPoint(d, a));
    else if (lockedEl && (e == "touchend" || e == "touchcancel")) {
        d = lockedEl;
        lockedEl = null
    } else d = document.elementFromPoint(d, a);
    a = qqweb.layout.getCurrentWindow();
    if (d.tagName == "IFRAME" && a) {
        a = document.getElementById("iframeApp_" + a.getId());
        var j = false;
        try {
            j = a && typeof a.contentWindow.padEventProxy == "function" ? true: false
        } catch(n) {}
        j ? a.contentWindow.padEventProxy(e, c) : d.dispatchEvent(c)
    } else d.dispatchEvent(c)
};
Jet().$package("qqweb",
function(e) {
    var c = e.dom,
    d;
    d = window.location.host;
    document.domain = "qq.com";
    window.onerror = function() {
        return true
    };
    this.init = function() {
        e.$namespace("qqweb.app");
        this.portal.init({});
        qqweb.portal.speedTest.sRTS(7, "start", window._SPEEDTIME_WINDOWSTART);
        qqweb.portal.speedTest.sRTS(7, "end", new Date, true);
        qqweb.portal.speedTest.sRTS(8, "start", new Date);
        if (e.platform.iPad) {
            c.id("touchpad").src = "./touchpad.html?20101021001";
            c.show(c.id("touchpad"))
        }
    };
    this.CONST = {
        CDN_URL: "http://hp.qq.com/webqqpic/",
        UPDATE_TIME_STAMP: "20101117002",
        MAIN_DOMAIN: "qq.com",
        MAIN_URL: "http://" + d + "/",
        API_SERVER_URL: "http://web2-b.qq.com/api/",
        CONN_SERVER_DOMAIN: "http://web2-b.qq.com/",
        CGI_BIN_SERVER_URL: "http://web2-b.qq.com/cgi-bin/",
        CGI_BIN_SERVER_URL2: "http://web2.qq.com/cgi-bin/",
        API_PROXY_URL: "http://web2-b.qq.com/proxy.html?v=20101025002",
        PUB_APP_STATIC_URL: "./pubapps/",
        PRI_APP_STATIC_URL: "./",
        AVATAR_SERVER_DOMAIN: "http://qun.qq.com/",
        AVATAR_SERVER_DOMAINS: ["http://face1.qun.qq.com/", "http://face2.qun.qq.com/", "http://face3.qun.qq.com/", "http://face4.qun.qq.com/", "http://face5.qun.qq.com/", "http://face6.qun.qq.com/", "http://face7.qun.qq.com/", "http://face8.qun.qq.com/", "http://face9.qun.qq.com/", "http://face10.qun.qq.com/"],
        QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
        QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
        QMAIL_SERVER_DOMAIN: "http://mail.qq.com/",
        MAX_LOGIN_AMOUNT: 1,
        MAX_FAIL_AMOUNT: 2,
        LOAD_AVATAR_AMOUNT: 50,
        LOGIN_LEVEL_NONE: 1,
        LOGIN_LEVEL_NOCHAT: 2,
        LOGIN_LEVEL_ALL: 3,
        KET: 0.1,
        WINDOW_FLAG_MIN: 1,
        WINDOW_FLAG_NORMAL: 2,
        WINDOW_FLAG_MAX: 4,
        WINDOW_FLAG_CURRENT: 8,
        WINDOW_FLAG_NOT_CURRENT: 16,
        WINDOW_FLAG_FULLSCREEN: 32
    }
});
function ptlogin2_onResize(e, c) {}
var silenceUser = true;
Jet().$package("qqweb.util",
function(e) {
    var c = e.dom,
    d = e.browser;
    this.observer = {
        openInWebBrowser: function(a) {
            a.preventDefault();
            a = this.getAttribute("href");
            var j = this.getAttribute("title");
            qqweb.portal.runApp("6", {
                url: a,
                isHideBar: false,
                title: j
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
        } [a] || "online"
    };
    this.getFaceServer = function(a) {
        return qqweb.CONST.AVATAR_SERVER_DOMAINS[a % 10]
    };
    this.getUserAvatar = function(a, j) {
        j = j || 0;
        if (isNaN(a)) return this.getDefaultUserAvatar();
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + j + "&type=1&fid=0&uin=" + a
    };
    this.getGroupAvatar = function(a, j) {
        j = j || 0;
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + j + "&type=4&fid=0&uin=" + a
    };
    this.getQzoneUrl = function(a) {
        return qqweb.CONST.QZONE_USER_SERVER_DOMAIN + a
    };
    this.getSendMailUrl = function(a) {
        return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + a + "@qq.com"
    };
    this.getDefaultUserAvatar = function() {
        return "./style/images/avatar.png"
    };
    this.setDefaultAppThumb = function(a) {
        a.src = "./style/images/thumb_default.png"
    };
    this.IEAddOption = function(a, j) {
        if (d.ie) {
            var n = c.node("option", {
                value: j.value,
                text: j.text
            });
            if (j.selected) n.selected = "selected";
            a.options.add(n)
        }
    };
    this.setPngForIE6 = function(a, j) {
        if (e.browser.ie == 6) {
            a.style.background = "none";
            a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + j + "', sizingMethod='crop')"
        }
    }
});
Jet().$package("qqweb.config",
function(e) {
    var c = this,
    d = e.event,
    a = e.dom;
    d = e.event;
    var j = e.string;
    appbarSetupList = [];
    isSetupAppListLoaded = false;
    quickAppList = [50, 51, 2, 17, 16, 6];
    defaultSetupAppList = [50, 51, 2, 17, 16, 7, 21, 28, 5, 1, 45, 14, 29, 34, 8, 30, 47, 46, 12, 15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37, 31, 39, 38, 22, 11, 6, 13, 4, 10, 33, 40, 3, 18, 20, 32];
    folderList = [{
        id: 0,
        name: "\u793e\u4ea4",
        list: [50, 51, 2, 17, 16, 7, 21, 28, 5, 1]
    },
    {
        id: 1,
        name: "\u751f\u6d3b",
        list: [45, 14, 29, 34, 8, 30, 47, 46]
    },
    {
        id: 2,
        name: "\u5a31\u4e50",
        list: [12, 15, 24, 48, 42, 49, 9, 26, 27, 36, 35, 37, 31, 39, 38, 22, 11]
    },
    {
        id: 3,
        name: "\u5de5\u5177",
        list: [6, 13, 4, 10, 33, 40, 3, 18, 20, 32]
    },
    {
        id: 4,
        name: "\u81ea\u5b9a\u4e49",
        list: []
    }];
    app2folder = {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 0,
        "8": 1,
        "9": 2,
        "10": 3,
        "11": 2,
        "12": 2,
        "13": 3,
        "14": 1,
        "15": 2,
        "16": 0,
        "17": 0,
        "18": 3,
        "19": 4,
        "20": 3,
        "21": 0,
        "22": 2,
        "23": 4,
        "24": 2,
        "25": 4,
        "26": 2,
        "27": 2,
        "28": 0,
        "29": 1,
        "30": 1,
        "31": 2,
        "32": 3,
        "33": 3,
        "34": 1,
        "35": 2,
        "36": 2,
        "37": 2,
        "38": 2,
        "39": 2,
        "40": 3,
        "41": 4,
        "42": 2,
        "43": 4,
        "44": 4,
        "45": 1,
        "46": 4,
        "47": 4,
        "48": 4,
        "49": 4,
        "50": 0,
        "51": 0,
        "58": 2,
        "59": 2,
        "61": 1,
        "62": 1
    };
    this.configList = {
        theme: {
            id: "purple"
        },
        appBarSetting: {},
        quickAppList: quickAppList,
        folderList: folderList,
        defaultSetupAppList: defaultSetupAppList,
        setupAppList: defaultSetupAppList
    };
    this.onSetConfig = function() {};
    this.onConfigGetSuc = function(g) {
        qqweb.portal.speedTest.sRTS(4, "end", new Date, true);
        g = g.result && g.result.app ? g.result.app: [];
        var f = 0;
        for (var i in g) if (i === "QQWeb") {
            var k = g[i];
            if (k.theme && k.theme != "") {
                qqweb.layout.applyTheme(k.theme);
                this.configList.theme.id = k.theme
            }
            if (k.runStatus) this.configList.runStatus = k.runStatus;
            if (k.chatboxMode) this.configList.chatboxMode = k.chatboxMode;
            if (k.isNotNeedCtrlKey) this.configList.isNotNeedCtrlKey = k.isNotNeedCtrlKey;
            if (k.fontFormat) this.configList.fontFormat = k.fontFormat;
            if (k.appBarSetting) this.configList.appBarSetting = k.appBarSetting;
            if (k.notifySetting) this.configList.notifySetting = k.notifySetting;
            if (k.msgBubblePos) this.configList.msgBubblePos = k.msgBubblePos;
            if (!k.setupAppList || !e.isNumber(k.setupAppList[0])) {
                var m = {
                    onSuccess: function() {},
                    context: this,
                    data: {
                        retype: 1,
                        app: "QQWeb",
                        itemlist: e.json.stringify({
                            setupAppList: this.getSetupAppList()
                        })
                    }
                };
                qqweb.rpcService.sendSetConfig(m)
            } else this.configList.setupAppList = k.setupAppList.length == 0 ? [] : k.setupAppList;
            isSetupAppListLoaded = true;
            if (k.folderList) this.configList.folderList = k.folderList;
            else {
                for (f in this.configList.folderList) this.configList.folderList[f].list = [];
                for (f in this.configList.setupAppList) {
                    m = this.configList.setupAppList[f];
                    var q = this.getFolderIndexByFolderId(4);
                    e.isUndefined(app2folder[m]) ? this.configList.folderList[q].list.push(parseInt(m)) : this.configList.folderList[app2folder[m]].list.push(parseInt(m))
                }
                m = {
                    onSuccess: function() {},
                    context: this,
                    data: {
                        retype: 1,
                        app: "QQWeb",
                        itemlist: e.json.stringify({
                            folderList: this.getFolderList()
                        })
                    }
                };
                qqweb.rpcService.sendSetConfig(m)
            }
            this.checkAndInstall();
            if (k.quickAppList) this.configList.quickAppList = k.quickAppList;
            else {
                this.configList.quickAppList = [];
                for (f in quickAppList) e.array.indexOf(this.getSetupAppList(), quickAppList[f]) !== -1 && this.configList.quickAppList.push(quickAppList[f]);
                m = {
                    onSuccess: function() {},
                    context: this,
                    data: {
                        retype: 1,
                        app: "QQWeb",
                        itemlist: e.json.stringify({
                            quickAppList: this.getQuickAppList()
                        })
                    }
                };
                qqweb.rpcService.sendSetConfig(m)
            }
        }
        i = qqweb.portal.getLoginLevel();
        e.out("logininfoSuccess");
        d.notifyObservers(qqweb.portal, "UserAppListReady", i);
        isSetupAppListLoaded && d.notifyObservers(this, "GetUserAppListSuccess", this.getSetupAppList())
    };
    this.checkAndInstall = function() {
        var g = [50, 51].reverse(),
        f = false;
        for (var i in g) {
            var k = g[i];
            if (e.array.indexOf(this.configList.setupAppList, k) == -1) {
                this.configList.setupAppList.splice(0, 0, k);
                f = true;
                var m = (this.getFolderById(app2folder[k]) || this.getFolderById(4)).list;
                e.array.indexOf(m, k) == -1 && m.splice(0, 0, k)
            }
        }
        if (f) {
            g = {
                onSuccess: function() {},
                context: c,
                data: {
                    retype: 1,
                    app: "QQWeb",
                    itemlist: e.json.stringify({
                        setupAppList: c.getSetupAppList(),
                        folderList: this.getFolderList(),
                        quickAppList: c.getQuickAppList()
                    })
                }
            };
            qqweb.rpcService.sendSetConfig(g)
        }
    };
    this.getAppBarSetting = function() {
        return this.configList.appBarSetting
    };
    this.setAppBarSetting = function(g) {
        this.configList.appBarSetting = g;
        g = {
            onSuccess: function() {},
            context: c,
            data: {
                retype: 1,
                app: "QQWeb",
                itemlist: e.json.stringify({
                    appBarSetting: c.getAppBarSetting()
                })
            }
        };
        qqweb.rpcService.sendSetConfig(g)
    };
    var n = function() {
        if (! (qqweb.portal.getLoginLevel() == 1 || !isSetupAppListLoaded)) {
            var g = {
                onSuccess: function() {},
                context: c,
                data: {
                    retype: 1,
                    app: "QQWeb",
                    itemlist: e.json.stringify({
                        setupAppList: c.getSetupAppList()
                    })
                }
            };
            qqweb.rpcService.sendSetConfig(g)
        }
    };
    this.setAppListQueue = function(g) {
        var f = [];
        for (var i in g) f.push(parseInt(g[i]));
        this.configList.setupAppList = f;
        n()
    };
    this.add2SetupAppList = function(g) {
        if (e.array.indexOf(this.getSetupAppList(), g.id) == -1 && !a.id("appAlert_category_select_" + g.id)) {
            var f = '<div class="appAlert_container">\t\t\t\t\t\t\t<div class="appAlert_alert">\u60a8\u5c06\u6dfb\u52a0\u3010' + j.encodeHtml(g.appName) + '\u3011\u5e94\u7528</div>\t\t\t\t\t\t\t<div class="appAlert_category">\t\t\t\t\t\t\t\t<span class="appAlert_category_text" id="appAlert_category_text">\u9009\u62e9\u5e94\u7528\u5206\u7ec4\uff1a</span>\t\t\t\t\t\t\t\t<select id="appAlert_category_select_' + g.id + '" class="appAlert_category_select"></select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>',
            i = new qqweb.businessClass.Window({
                title: "\u6e29\u99a8\u63d0\u793a",
                modeSwitch: true,
                dragable: true,
                resize: false,
                width: 370,
                height: 168,
                html: f,
                hasOkButton: true,
                hasCloseButton: true,
                hasCancelButton: true,
                hasCloseButton: true,
                isSetCentered: true
            });
            i.setTopZIndex();
            var k = a.id("appAlert_category_select_" + g.id);
            f = this.getFolderList();
            for (var m = 0; m < f.length; m++) {
                var q = document.createElement("option");
                q.value = f[m].id;
                q.innerHTML = j.encodeHtml(f[m].name);
                k && k.appendChild(q)
            }
            k.value = 4;
            d.addObserver(i, "clickOkButton",
            function() {
                var y = c.getFolderIndexByFolderId(k.value);
                c.addToFolderList(y, g.id);
                c.configList.setupAppList.push(g.id);
                qqweb.appconfig.addAppConfig(g);
                n();
                i.close()
            });
            if (g.id < 1E5)(f = g.exinfo.reportName) && e.string.trim(f) && pgvSendClick({
                hottag: "WEB2QQ.ADDAPP." + f + ".LOGIN"
            })
        }
    };
    this.removeSetupAppList = function(g) {
        if (g.cannotUninstall) alert("\u62b1\u6b49,\u6b64\u5e94\u7528\u4e0d\u80fd\u5220\u9664!");
        else {
            qqweb.appconfig.removeAppConfig(g);
            this.removeFromFolderListById(g.id);
            this.removeFromQuickAppList(g.id);
            e.array.remove(this.getSetupAppList(), parseInt(g.id));
            n()
        }
    };
    this.getSetupAppList = function() {
        return this.configList.setupAppList
    };
    this.getDefaultSetupAppList = function() {
        return this.configList.defaultSetupAppList
    };
    this.isSetupAppListLoaded = function() {
        return isSetupAppListLoaded
    };
    var u = function() {
        if (! (qqweb.portal.getLoginLevel() == 1 || !isSetupAppListLoaded)) {
            var g = {
                onSuccess: function() {},
                context: c,
                data: {
                    retype: 1,
                    app: "QQWeb",
                    itemlist: e.json.stringify({
                        quickAppList: c.getQuickAppList()
                    })
                }
            };
            qqweb.rpcService.sendSetConfig(g)
        }
    };
    this.getQuickAppList = function() {
        return this.configList.quickAppList
    };
    this.setQuickQppList = function(g) {
        for (var f in g) g[f] = parseInt(g[f]);
        this.configList.quickAppList = g;
        u()
    };
    this.addToQuickAppList = function(g) {
        var f = g.appId = parseInt(g.appId),
        i = g.index;
        if (e.array.indexOf(this.getQuickAppList(), f) == -1) {
            i ? this.configList.quickAppList.splice(i, 0, f) : this.configList.quickAppList.push(f);
            u();
            d.notifyObservers(c, "AddToQuickAppList", g);
            (g = g.reportName) && j.trim(g) && pgvSendClick({
                hottag: "\uf06c\tweb2qq.AppBar.Shortcut.creat." + g
            })
        }
    };
    this.removeFromQuickAppList = function(g) {
        if (e.array.indexOf(this.getQuickAppList(), parseInt(g)) > -1) {
            e.array.remove(this.getQuickAppList(), parseInt(g));
            u();
            d.notifyObservers(c, "RemoveFromQuickAppList", g)
        }
    };
    var b = function() {
        if (! (qqweb.portal.getLoginLevel() == 1 || !isSetupAppListLoaded)) {
            var g = {
                onSuccess: function() {},
                context: c,
                data: {
                    retype: 1,
                    app: "QQWeb",
                    itemlist: e.json.stringify({
                        folderList: c.getFolderList()
                    })
                }
            };
            qqweb.rpcService.sendSetConfig(g)
        }
    };
    this.getFolderList = function(g) {
        return e.isUndefined(g) ? this.configList.folderList: this.configList.folderList[g]
    };
    this.setFolderList = function(g, f) {
        if (e.isUndefined(f)) this.configList.folderList = g;
        else this.configList.folderList[f] = g
    };
    this.getFolderIdById = function(g) {
        var f, i = this.getFolderList();
        g = parseInt(g);
        for (var k in i) if (e.array.indexOf(i[k].list, g) > -1) {
            f = i[k].id;
            break
        }
        return parseInt(f)
    };
    this.getFolderIndexByFolderId = function(g) {
        var f, i = this.getFolderList();
        for (var k in i) if (i[k].id == g) {
            f = k;
            break
        }
        return parseInt(f)
    };
    this.getFolderById = function(g) {
        var f, i = this.getFolderList();
        for (var k in i) if (i[k].id == g) f = i[k];
        return f
    };
    this.removeFromFolderListById = function(g) {
        var f = this.getFolderList();
        for (var i in f) {
            var k = f[i].list;
            e.array.indexOf(k, g) > -1 && e.array.remove(k, parseInt(g))
        }
        b()
    };
    this.removeFolderByFolderId = function(g) {
        if (g == 4) alert("\u62b1\u6b49,\u6b64\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664!");
        else {
            var f = this.getFolderById(g),
            i = f.list;
            for (var k in i) {
                e.array.remove(this.getSetupAppList(), parseInt(i[k]));
                e.array.remove(this.getQuickAppList(), parseInt(i[k]));
                var m = qqweb.appconfig.getAppConfig(parseInt(i[k]));
                qqweb.appconfig.removeAppConfig(m)
            }
            e.array.remove(this.getFolderList(), f);
            n();
            u();
            b();
            d.notifyObservers(c, "RemoveFolderByFolderId", g)
        }
    };
    this.updateFloderName = function(g, f) {
        var i = this.getFolderList();
        for (var k in i) if (i[k].id == g) i[k].name = f;
        b()
    };
    this.updateFolderList = function(g) {
        for (var f in g) {
            for (var i in g[f]) g[f][i] = parseInt(g[f][i]);
            this.getFolderList(f).list = g[f]
        }
        b()
    };
    this.addToFolderList = function(g, f) {
        g = this.getFolderList(g).list;
        if (e.array.indexOf(g, f) == -1) {
            g.push(f);
            b()
        }
    };
    this.restoreConfig = function() {};
    this.initQQWeb = function() {
        var g = {
            onSuccess: qqweb.config.onConfigGetSuc,
            action: "get_custom",
            context: this,
            data: {
                retype: 1,
                itemlist: e.json.stringify({
                    QQWeb: ["theme", "appBarSetting", "setupAppList", "quickAppList", "folderList", "runStatus", "chatboxMode", "isNotNeedCtrlKey", "fontFormat", "msgBubblePos", "notifySetting"]
                })
            }
        };
        qqweb.rpcService.sendGetConfig(g)
    };
    c.__eqqid = "50"
});
Jet().$package("qqweb.businessClass",
function(e) {
    var c = e.dom,
    d = e.event;
    this.App = new e.Class({
        init: function(a) {
            a.id || e.out("App: [" + a.appName + "] \u7f3a\u5c11 id !!!");
            this.option = {
                id: a.id,
                title: a.appName || "\u672a\u547d\u540d\u5e94\u7528",
                appType: a.appType || 1,
                appUrl: a.appUrl || null,
                windowMode: a.windowMode || "single",
                x: a.x,
                y: a.y,
                width: a.width || 600,
                height: a.height || 500,
                hasCloseButton: e.isUndefined(a.hasCloseButton) ? true: a.hasCloseButton,
                hasMaxButton: e.isUndefined(a.hasMaxButton) ? true: a.hasMaxButton,
                hasMinButton: e.isUndefined(a.hasMinButton) ? true: a.hasMinButton,
                hasOkButton: a.hasOkButton || false,
                hasCancelButton: a.hasCancelButton || false,
                modeSwitch: e.isUndefined(a.modeSwitch) ? true: a.modeSwitch,
                dragable: e.isUndefined(a.dragable) ? true: a.dragable,
                dragProxy: e.isUndefined(a.dragProxy) ? qqweb.layout.getWindowDragProxy() : a.dragProxy,
                resize: e.isUndefined(a.resize) ? true: a.resize,
                defaultMode: e.isUndefined(a.defaultMode) ? "restore": a.defaultMode,
                flashMode: e.isUndefined(a.flashMode) ? false: a.flashMode,
                loginLevel: e.isUndefined(a.loginLevel) ? qqweb.CONST.LOGIN_LEVEL_NONE: a.loginLevel,
                customLoginValidate: a.customLoginValidate,
                alterMode: e.isUndefined(a.alterMode) ? false: a.alterMode,
                ieOnly: e.isUndefined(a.ieOnly) ? false: a.ieOnly
            };
            if (e.platform.iPad && this.option.id === 15) this.option.appUrl = "http://live.qq.com/ipad/";
            e.out("id:" + this.option.id + ", hasCloseButton:" + this.option.hasCloseButton);
            this._isRunning = false;
            d.notifyObservers(this, "init", this)
        },
        detectActiveX: function() {
            var a = null;
            try {
                a = new ActiveXObject("TXFTNActiveX.FTNUpload")
            } catch(j) {
                return false
            }
            if (a) {
                var n = "";
                try {
                    n = a && (a.version ? a.version: "1.0.0.8") || ""
                } catch(u) {}
                if (!n) return false;
                return parseInt(n.split(".").join("")) > 1007 ? true: false
            } else return false
        },
        run: function(a) {
            var j = this;
            a = a || {};
            e.extend(this.option, a);
            if (e.platform.iPad) switch (parseInt(this.option.id)) {
            case 5:
            case 9:
            case 11:
            case 12:
            case 13:
            case 20:
            case 24:
            case 26:
            case 27:
            case 30:
            case 35:
            case 36:
            case 37:
            case 39:
                qqweb.portal.showUnsupportIPadWindow(this.option.id);
                return
            }
            var n = qqweb.portal.getLoginLevel();
            if (!a.noValidateLogin && this.option.loginLevel > n) this.option.customLoginValidate ? d.notifyObservers(this, "needLogin", {
                has: this.option.loginLevel,
                need: n
            }) : qqweb.portal.showIntroduceWindow(this.option.id);
            else if (e.browser.ie && this.option.id == "13" && !this.detectActiveX()) qqweb.portal.showWarningWindow(this.option.id);
            else if (this.option.id == "25") qqweb.portal.showComingSoonWindow(this.option.id);
            else if (this.option.ieOnly && !e.browser.ie || e.browser.ie && this.option.id == "13" && !this.detectActiveX()) qqweb.portal.showIeOnlyWindow(this.option.id);
            else {
                if (this.isRunning()) d.notifyObservers(this, "runAgain", a);
                else {
                    this._isRunning = true;
                    if (this.option.windowMode !== "none") {
                        this.createWindow(a);
                        e.browser.ie && this.option.id == "13" && !this.detectActiveX() && this.window.createNoActiveXDom(this.window.getId())
                    }
                    if (this.option.appType !== 1) if (this.option.appType === 2) {
                        if ((!this.option.ieOnly || e.browser.ie) && (!e.browser.ie || this.option.id != "13" || this.detectActiveX())) {
                            this.window.setHtml('\t\t\t\t\t\t\t<div id="container_iframeApp_' + this.window.getId() + '" class="content_area">\t\t\t\t\t\t\t\t<iframe id="iframeApp_' + this.window.getId() + '" class="iframeApp" src="about:blank" frameborder="no" allowtransparency="true" scrolling="auto" hidefocus ></iframe>\t\t\t\t\t\t\t\t<div id="iframeApp_dragResizeMask_' + this.window.getId() + '" class="iframeDragResizeMask"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t');
                            this._contenty = this._contentx = 0;
                            this._iframe = c.id("iframeApp_" + this.window.getId());
                            this._iframeDragResizeMask = c.id("iframeApp_dragResizeMask_" + this.window.getId());
                            this._containerIframe = c.id("container_iframeApp_" + this.window.getId());
                            e.platform.iPad && c.addClass(this._containerIframe, "ipad");
                            d.on(this._iframe, "load",
                            function() {
                                d.notifyObservers(j, "load")
                            });
                            this._iframe.src = a && a.appUrl || this.option.appUrl;
                            n = function(g) {
                                g = j.window.getBodySize();
                                j._resizeIframe(g)
                            };
                            this._resizeIframe = function(g) {
                                if (!e.platform.iPad) {
                                    c.setStyle(this._iframe, "width", g.width - 2 + "px");
                                    c.setStyle(this._iframe, "height", g.height - 2 + "px")
                                }
                            };
                            n();
                            d.addObserver(this.window, "resize",
                            function(g) {
                                j.option.flashMode && j.window != qqweb.layout.getCurrentWindow() || j._resizeIframe(g)
                            });
                            d.addObserver(this.window, "show", n);
                            d.addObserver(this.window, "dragStart",
                            function() {
                                e.platform.iPad || c.show(j._iframeDragResizeMask)
                            });
                            d.addObserver(this.window, "dragEnd",
                            function() {
                                c.hide(j._iframeDragResizeMask)
                            })
                        }
                        n = qqweb.layout.getCurrentWindow();
                        n = document.getElementById("iframeApp_" + n.getId());
                        var u = false;
                        try {
                            u = n && typeof n.contentWindow.padEventProxy == "function" ? true: false
                        } catch(b) {}
                        e.platform.iPad && !u && new e.ui.IframeScroller(this._iframe)
                    }
                    n = function() {
                        j.window.setCurrent()
                    };
                    this.option.windowMode === "single" && d.addObserver(this, "runAgain", n);
                    d.notifyObservers(this, "runFirst", a);
                    d.addObserver(this, "appExit", j.exit)
                }
                d.notifyObservers(qqweb.portal, "appRun", this.option.id);
                d.notifyObservers(this, "run", a)
            }
        },
        createWindow: function(a) {
            var j = this;
            a = a || {};
            var n = new qqweb.businessClass.Window({
                appId: j.option.id,
                flashMode: j.option.flashMode,
                loginLevel: j.option.loginLevel,
                title: j.option.title,
                modeSwitch: j.option.modeSwitch,
                dragProxy: j.option.dragProxy,
                dragable: j.option.dragable,
                resize: j.option.resize,
                x: a.x || j.option.x,
                y: a.y || j.option.y,
                width: a.width || j.option.width,
                height: a.height || j.option.height,
                defaultMode: j.option.defaultMode,
                hasCloseButton: j.option.hasCloseButton,
                hasMaxButton: j.option.hasMaxButton,
                hasMinButton: j.option.hasMinButton,
                hasOkButton: j.option.hasOkButton,
                hasCancelButton: j.option.hasCancelButton,
                alterMode: j.option.alterMode,
                ieOnly: j.option.ieOnly,
                appType: j.option.appType
            });
            this.window = n;
            a = {
                onWindowClose: function() {
                    if (j._iframe) j._iframe.src = "about:blank";
                    j.destroy()
                },
                onExit: function() {
                    d.notifyObservers(n, "closeWindow", n)
                },
                onSetCurrent: function() {
                    n.setX(n._x);
                    c.setStyle(j._containerIframe, "height", "99%");
                    c.setStyle(j._containerIframe, "width", "100%");
                    n.hideAlterDom()
                },
                onSetNotCurrent: function() {
                    if (!e.platform.iPad) {
                        c.setStyle(j._iframe, "width", "1px");
                        c.setStyle(j._iframe, "height", "1px");
                        c.setStyle(j._containerIframe, "width", "1px");
                        c.setStyle(j._containerIframe, "height", "1px");
                        n.showAlterDom()
                    }
                },
                onWindowMin: function() {
                    if (j.option.flashMode) {
                        var u = n.getX();
                        n._x = u;
                        n.setX( - 10000);
                        n._x = u
                    }
                }
            };
            d.addObserver(this.window, "min", a.onWindowMin);
            this.option.alterMode && !e.browser.ie && d.addObserver(this.window, "setNotCurrent", a.onSetNotCurrent);
            if (this.option.flashMode && (e.browser.ie || !this.option.ieOnly)) {
                d.addObserver(this.window, "setCurrent", a.onSetCurrent);
                d.addObserver(this.window, "min", a.onWindowMin)
            }
            d.addObserver(n, "close", a.onWindowClose);
            d.addObserver(this, "exit", a.onExit);
            return n
        },
        setCurrent: function() {
            d.notifyObservers(this, "setCurrent");
            this.window && this.window.setCurrent()
        },
        getCurrent: function() {
            return null
        },
        isRunning: function() {
            return this._isRunning
        },
        exit: function() {
            d.notifyObservers(this, "exit");
            this.destroy()
        },
        destroy: function() {
            d.notifyObservers(this, "destroy");
            this._isRunning = false;
            d.notifyObservers(qqweb.portal, "appExit", this.option.id)
        },
        updateAppConfig: function(a) {
            var j = this;
            if (a.id == j.option.id) {
                e.extend(j.option, a);
                j._isRunning && a.type == 2 && j.window.setTitle(a.appName)
            }
        },
        removeAppConfig: function() {
            var a = this;
            if (a._iframe) a._iframe.src = "about:blank";
            a.exit()
        },
        touchMoveHandler: function(a) {
            var j = this._iframe,
            n = this._containerIframe,
            u = this._contentx + a.sx;
            a = this._contenty + a.sy;
            var b = c.getWidth(j),
            g = c.getHeight(j),
            f = c.getWidth(n);
            n = c.getHeight(n);
            if (u > 0) u = 0;
            else if (u < f - b) u = f - b;
            if (a > 0) a = 0;
            else if (a < n - g) a = n - g;
            c.setStyle(j, "left", u + "px");
            c.setStyle(j, "top", a + "px");
            this._contentx = u;
            this._contenty = a
        }
    })
});
function ptlogin2_onResize(e, c) {
    qqweb.portal.setLoginWindowHeight(c + 90)
}
Jet().$package("qqweb.portal",
function(e) {
    var c = this,
    d = e.dom,
    a = e.event,
    j = e.http,
    n, u = false,
    b = qqweb.CONST.LOGIN_LEVEL_NONE,
    g = false,
    f = false,
    i = false,
    k = false,
    m = "",
    q = false,
    y, A, J = null,
    I = document.title,
    G = null,
    N = false,
    O = false;
    this.speedTest = new(function() {
        var h = [];
        this.sRTS = this.setReportTimeStamp = function(l, o, t, z) {
            h[l] || (h[l] = {});
            h[l][o] = t.getTime();
            z == true && this.report([l])
        };
        this.gRTS = this.getReportTimeStamp = function(l, o) {
            if (h[l]) return h[l][o];
            return null
        };
        this.report = function(l) {
            for (var o = false, t = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4=" + qqweb.portal.getCookieUin(), z = 0; z < l.length; z++) {
                var p = l[z];
                if (h[p].end && h[p].start) {
                    o = true;
                    t += "&" + p + "=" + (h[p].end - h[p].start)
                }
            }
            if (o)(new Image).src = t
        }
    });
    var U = function(h) {
        c.runApp("myPanel", {
            callback: function() {
                c.runApp("appBar", {
                    callback: function() {
                        h();
                        c.runApp("tips");
                        c.runApp("messageCenter")
                    }
                })
            }
        })
    },
    B = function() {
        for (var h = c.getDefaultApps(), l = 0; l < h.length; ++l) if (e.platform.iPad) switch (h[l]) {
        case "20":
            break;
        default:
            c.runApp(h[l])
        } else c.runApp(h[l]);
        c.runApp("helper")
    };
    this.getDefaultApps = function() {
        return ["18", "19", "20", qqweb.config.__eqqid]
    };
    this.setLoginLevel = function(h) {
        var l = c.getApp("55");
        l && l.getIsLogin() ? a.notifyObservers(qqweb.portal, "loginLevelChanged", qqweb.CONST.LOGIN_LEVEL_ALL) : a.notifyObservers(qqweb.portal, "loginLevelChanged", h);
        b = h
    };
    var D = function(h) {
        if (! (h < b)) {
            var l = c.getApp(qqweb.config.__eqqid);
            l && l.getIsLogin() ? a.notifyObservers(qqweb.portal, "loginLevelChanged", qqweb.CONST.LOGIN_LEVEL_ALL) : a.notifyObservers(qqweb.portal, "loginLevelChanged", h);
            b = h
        }
    },
    V = function() {
        var h = document.body,
        l = d.node("div");
        l.innerHTML = '<iframe id="forBuddyFeeds" class="hiddenIframe" name="forBuddyFeeds" width="1" height="1" src="./cgi-bin/get_buddy_feed?businesstype=10"></iframe>';
        h.appendChild(l)
    },
    K = {
        isUserAppListReady: false,
        isAppbarReady: false
    },
    P = function() {
        var h = true;
        for (var l in K) K[l] || (h = false);
        if (h) {
            e.out("\u7cfb\u7edf\u6a21\u5757Ready");
            a.notifyObservers(c, "systemAppReady")
        }
    },
    C = {
        onUserAppListReady: function() {
            K.isUserAppListReady = true;
            e.out("onUserAppListReady");
            P()
        },
        onAppbarReady: function() {
            K.isAppbarReady = true;
            e.out("onAppbarReady");
            P()
        },
        onPortalReady: function(h) {
            var l = this.getQQWebStatus();
            if (l) for (var o = 0; o < l.appList.length; o++) {
                var t = l.appList[o];
                t = t.appId;
                if (t == qqweb.config.__eqqid) if (h == 3) continue;
                if (~~t) t = "app" + t;
                (t = qqweb.app[t]) && t.isRunning() && t.exit()
            }
            if (window.location.search.indexOf("nodefault") === -1) if (h = qqweb.config.configList.runStatus) {
                for (o = 0; o < h.appList.length; o++) {
                    t = h.appList[o];
                    if (t.appId == qqweb.config.__eqqid) t.width ? qqweb.portal.runApp(t.appId, {
                        defaultMode: t.defaultMode,
                        x: t.x,
                        y: t.y,
                        width: t.width,
                        height: t.height,
                        systemRun: true
                    }) : qqweb.portal.runApp(t.appId, {
                        x: t.x,
                        y: t.y,
                        systemRun: true
                    });
                    else t.width ? qqweb.portal.runApp(t.appId, {
                        defaultMode: t.defaultMode,
                        x: t.x,
                        y: t.y,
                        width: t.width,
                        height: t.height
                    }) : qqweb.portal.runApp(t.appId, {
                        x: t.x,
                        y: t.y
                    })
                }
                h.currentApp && qqweb.portal.runApp(h.currentApp)
            } else B();
            if (A) for (o = 0; o < A.length; ++o) qqweb.portal.runApp(A[o], {
                noValidateLogin: true
            });
            R(O);
            qqweb.portal.speedTest.sRTS(8, "end", new Date, true);
            if (typeof pgvMain == "function") {
                pvRepeatCount = 1;
                pgvMain("", {
                    virtualURL: "web2.qq.com"
                })
            }
            o = new Image;
            o.onload = function() {
                qqweb.portal.speedTest.sRTS(10, "end", new Date, true)
            };
            qqweb.portal.speedTest.sRTS(10, "start", new Date);
            o.src = "http://hp.qq.com/webqqpic/style/theme_wood1/images/wallpaper.jpg?t=" + (new Date).getTime()
        },
        onExitSuccess: function() {
            location.reload()
        },
        onGetVfWebQQError: function() {
            D(qqweb.CONST.LOGIN_LEVEL_NONE);
            var h = c.getLoginLevel();
            e.out("logininfoError");
            a.notifyObservers(qqweb.portal, "UserAppListReady", h)
        },
        onGetVfWebQQSuccess: function(h) {
            D(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
            c.getLoginLevel();
            J = h.result && h.result.length === 2 && h.result[0] == "vfwebqq" ? h.result[1] : null;
            a.notifyObservers(qqweb.portal, "GetLoginInfoSuccess")
        },
        onGetLoginInfoSuccess: function() {
            if (!Q()) {
                m = c.uin;
                qqweb.config.initQQWeb();
                a.notifyObservers(qqweb.portal, "uinChange")
            }
        },
        onGetAppConfigComplete: function() {
            var h = c.getLoginLevel();
            a.notifyObservers(qqweb.portal, "portalReady", h)
        },
        onUpdateAppConfig: function(h) {
            var l = c.getApp(h.id);
            l && l.updateAppConfig(h)
        },
        onRemoveAppConfig: function(h) {
            var l = c.getApp(h.id);
            l && l.removeAppConfig(h);
            delete qqweb.app["app" + h.id];
            c.setAppLoading(h.id, false)
        }
    },
    Q = function() {
        return m == c.uin ? true: false
    },
    L = function() {
        if (!u) {
            e.out(">>>>> onDesktopClick");
            qqweb.portal.recoverCookie()
        }
    };
    this.init = function(h) {
        h = {};
        n = {};
        y = 0;
        a.addObserver(qqweb.portal, "exitSuccess", C.onExitSuccess);
        a.addObserver(qqweb.rpcService, "GetVfWebQQError", C.onGetVfWebQQError);
        a.addObserver(qqweb.rpcService, "GetVfWebQQSuccess", C.onGetVfWebQQSuccess);
        a.addObserver(qqweb.portal, "GetLoginInfoSuccess", C.onGetLoginInfoSuccess);
        a.addObserver(qqweb.appconfig, "GetAppConfigComplete", C.onGetAppConfigComplete);
        a.addObserver(qqweb.appconfig, "GetDefaultAppConfigComplete", C.onGetAppConfigComplete);
        a.addObserver(qqweb.appconfig, "UpdateAppConfig", C.onUpdateAppConfig);
        a.addObserver(qqweb.appconfig, "RemoveAppConfig", C.onRemoveAppConfig);
        a.addObserver(qqweb.portal, "portalReady", C.onPortalReady);
        a.addObserver(qqweb.portal, "UserAppListReady", C.onUserAppListReady);
        a.addObserver(qqweb.portal, "appbarReady", C.onAppbarReady);
        qqweb.layout.init();
        qqweb.sound.init();
        qqweb.util.initSystem();
        a.addObserver(qqweb.layout, "clickDesktop", L);
        a.addObserver(qqweb.layout, "desktopFocus", L);
        U(function() {
            c.start();
            qqweb.rpcService.sendGetVfWebQQ(c.uin)
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
        var h = this.getApp("eqq");
        if (h && h.getIsLogin()) return qqweb.CONST.LOGIN_LEVEL_ALL;
        return b
    };
    this.recoverCookie = function() {};
    var R = function(h) {
        if (N && h) {
            var l = qqweb.config.__eqqid,
            o = qqweb.portal.getApp(l);
            if (o) o.isRunning() ? o.window.show() : o.run({
                eqqNeeded: true
            });
            else c.runApp(qqweb.config.__eqqid, {
                eqqNeeded: true
            });
            if (h) {
                o && a.notifyObservers(c, "StrongLoginSumited");
                if (k) EQQ.loginEQQ();
                else {
                    h = qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(l / 1E3) % 1E3 + "/" + l + "/eqq.all.js";
                    qqweb.portal.speedTest.sRTS(11, "start", new Date);
                    e.http.loadScript(h + "?t=" + qqweb.CONST.UPDATE_TIME_STAMP, {
                        query: "",
                        onSuccess: function() {
                            EQQ.loginEQQ();
                            k = true;
                            qqweb.portal.speedTest.sRTS(9, "end", new Date, true)
                        },
                        onError: function() {}
                    })
                }
            } else qqweb.rpcService.sendGetVfWebQQ(c.uin);
            V()
        }
        N = false
    };
    this.reRunApps = function(h) {
        qqweb.portal.start();
        (O = h) ? D(qqweb.CONST.LOGIN_LEVEL_ALL) : D(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
        N = true;
        c.runApp("myPanel");
        if (Q()) {
            if (A) for (var l = 0; l < A.length; ++l) qqweb.portal.runApp(A[l], {
                noValidateLogin: true
            });
            R(h)
        } else qqweb.rpcService.sendGetVfWebQQ(this.uin)
    };
    this.hideLoginWindow = function() {
        var h;
        if (h = d.id("ifram_login")) h.src = "about:blank";
        try {
            this.hideIntroduceWindow()
        } catch(l) {}
        try {
            f.close()
        } catch(o) {}
    };
    this.showLoginWindow = function(h, l) {
        var o = {
            width: 400,
            height: 300,
            title: "\u767b\u5f55WebQQ",
            hasCloseButton: true,
            isSetCurrent: true,
            isSetCentered: true,
            dragable: true,
            src: "http://ui.ptlogin2.qq.com/cgi-bin/login?style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http://web.qq.com/main.shtml?direct__2&f_url=loginerroralert"
        };
        A = [h];
        h = window.location.protocol + "//" + window.location.host + "/loginproxy.html";
        if (l) {
            h += "?strong=true";
            o.title = "\u767b\u5f55QQ"
        } else {
            h += "?strong=false";
            o.title = "\u767b\u5f55WebQQ"
        }
        h = encodeURIComponent(h);
        var t = "";
        if (l) {
            o.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=" + h + "&f_url=loginerroralert";
            t = e.cookie.get("closeLoginTip") == "" ? '\t\t\t\t<div id="login_window_content_area" class="content_area"><div style="display:block;position:absolute;padding-left:2px;width:100%;background:#ffffe1"><span style="float:left">\u6e29\u99a8\u63d0\u793a\uff1a\u767b\u5f55\u540e\uff0c\u60a8\u5728\u522b\u5904\u5df2\u767b\u5f55\u7684\u540c\u4e00\u5e10\u53f7\u4f1a\u4e0b\u7ebf.</span><span id="close_login_tip" onclick="this.parentNode.style.display=\'none\';" style="display:inline;cursor:pointer;float:right;margin-right:5px;">\uff58</span></div><div class="login_window_wrap">\t\t\t\t<iframe id="ifram_login"  src="' + o.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t\t</div></div>': '\t\t\t\t<div id="login_window_content_area" class="content_area"><div class="login_window_wrap">\t\t\t\t<iframe id="ifram_login"  src="' + o.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t\t</div></div>'
        } else {
            o.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=self&appid=15000101&hide_title_bar=1&no_verifyimg=1&s_url=" + h + "&f_url=loginerroralert&target=self";
            t = '<div id="login_window_content_area" class="content_area"><div class="login_window_wrap">\t\t\t<iframe id="ifram_login"  src="' + o.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>\t\t\t\t\t</div></div>'
        }
        if (!f || !f.isShow()) f = new qqweb.businessClass.Window(o);
        else f.setCurrent();
        f.setHtml(t);
        if (l) {
            o = d.id("loginIcon");
            h = d.id("loginIcon_disable");
            if (o && h) {
                d.hide(o);
                d.show(h)
            }
            a.addObserver(f, "close",
            function() {
                a.notifyObservers(c, "StrongLoginClose")
            })
        }
        var z = d.id("login_window_content_area");
        a.addObserver(f, "setNewHeight",
        function() {
            d.setStyle(z, "height", "99%")
        });
        d.id("close_login_tip") && a.on(d.id("close_login_tip"), "click",
        function() {
            this.parentNode.style.display = "none";
            e.cookie.set("closeLoginTip", "true", "qq.com", "", 3E6)
        });
        f.show();
        this.login_strong = l
    };
    this.setLoginWindowHeight = function(h) {
        f.setHeight(h)
    };
    this.hideIntroduceWindow = function() {
        g && g.close()
    };
    this.showIntroduceWindow = function(h) {
        var l = qqweb.appconfig.getAllConfig(h),
        o = 'Hi\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\u54e6\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
        if (h == "messageBox" || h == "buddyManager") o = 'Hi\uff0c\u6b64\u5e94\u7528\u9700\u8981\u767b\u5f55QQ\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
        o = '<div class="content_area" style="_height:406px"><div class="intro_window_wrap">\t\t<div id="intro_window_area" class="intro_window_area" title="' + e.string.encodeHtmlAttributeSimple(String(l.appDesc)) + '">\t\t\t<h3>' + e.string.encodeHtmlSimple(String(l.appName)) + "</h3><span>" + e.string.encodeHtmlSimple(String(l.appDesc)) + '</span></div>\t\t<div style="margin-top:50px; text-align: center; font-weight: bold; font-size:14px;">' + o + "</div>\t\t</div></div>";
        l.flashMode = false;
        l.windowMode = "single";
        l.dragable = true;
        l.hasCloseButton = true;
        l.defaultMode = "restore";
        l.isSetCurrent = true;
        l.width = 545;
        l.height = false;
        if (!g || !g.isShow()) g = new qqweb.businessClass.Window(l);
        g.setTitle(l.appName);
        g.setCurrent();
        g.setHtml(o);
        o = d.id("intro_window_area");
        d.setStyle(o, "backgroundImage", "url(./module/appmarket/images/thumb_" + l.id + ".png)");
        o = d.id("portal_login_btn");
        a.on(o, "click",
        function(t) {
            t.preventDefault();
            l.loginLevel > 2 ? c.showLoginWindow(h, true) : c.showLoginWindow(h, false);
            g.close()
        })
    };
    this.showWarningWindow = function(h) {
        if (d.id("activeXWindow") == undefined) {
            h = qqweb.appconfig.getAllConfig(h);
            h.flashMode = false;
            h.windowMode = "single";
            h.dragable = true;
            h.hasCloseButton = true;
            h.defaultMode = "restore";
            h.isSetCurrent = true;
            h.width = false;
            h.height = false;
            var l = new qqweb.businessClass.Window(h);
            l.setTitle(h.title);
            l.setCurrent();
            l.setHtml("<div id='activeXWindow' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u6b64\u5e94\u7528\u9700\u8981\u63d2\u4ef6\u652f\u6301</span><a class='plain_text' id='get_qqDisk_activeX' href='###'>\u70b9\u51fb\u83b7\u53d6\u5e76\"\u5b89\u88c5\"</a></div></div>");
            d.setStyle(l.body, "background", "#233040");
            d.id("get_qqDisk_activeX").onclick = function() {
                l.body.innerHTML += '<div><object classid="clsid:BDEACC50-F56D-4D60-860F-CF6ED1766D65" codebase="http://res.qqmail.com/zh_CN/activex/TencentMailActiveX.cab#version=1,0,1,32"></object></div>';
                l.close();
                d.id("activeXWindow").style.display = "block"
            }
        }
    };
    this.showIeOnlyWindow = function(h) {
        var l = "ieOnlyWindow" + h;
        if (d.id(l) == undefined) {
            h = qqweb.appconfig.getAllConfig(h);
            l = "<div id='" + l + "' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u4ec5\u652f\u6301ie\u6d4f\u89c8\u5668\u3002</span></div></div>";
            h.flashMode = false;
            h.windowMode = "single";
            h.dragable = true;
            h.hasCloseButton = true;
            h.defaultMode = "restore";
            h.isSetCurrent = true;
            h.width = 545;
            h.height = 450;
            var o = new qqweb.businessClass.Window(h);
            o.setTitle(h.title);
            o.setCurrent();
            o.setHtml(l);
            d.setStyle(o.body, "background", "#233040")
        }
    };
    this.showUnsupportIPadWindow = function(h) {
        var l = "ieOnlyWindow" + h;
        if (d.id(l) == undefined) {
            h = qqweb.appconfig.getAllConfig(h);
            l = "<div id='" + l + "' class='no_available_alt'><div class='appWarning'></div><div  class='appWarningTxt'><span class='strong_text'>\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u4e0d\u652f\u6301iPad\u3002</span></div></div>";
            h.flashMode = false;
            h.windowMode = "single";
            h.dragable = true;
            h.hasCloseButton = true;
            h.defaultMode = "restore";
            h.isSetCurrent = true;
            h.width = 545;
            h.height = 450;
            var o = new qqweb.businessClass.Window(h);
            o.setTitle(h.title);
            o.setCurrent();
            o.setHtml(l);
            d.setStyle(o.body, "background", "#233040")
        }
    };
    this.showComingSoonWindow = function(h) {
        if (d.id("comingSoonWindow") == undefined) {
            h = qqweb.appconfig.getAllConfig(h);
            h.flashMode = false;
            h.windowMode = "single";
            h.dragable = true;
            h.hasCloseButton = true;
            h.defaultMode = "restore";
            h.isSetCurrent = true;
            h.width = false;
            h.height = false;
            var l = new qqweb.businessClass.Window(h);
            l.setTitle(h.title);
            l.setCurrent();
            l.setHtml("<div id='comingSoonWindow' class='flash_alt'><div class='appIframeAlter'></div><div  class='appComingSoon'></div></div>");
            d.id("comingSoonWindow").style.display = "block";
            d.setStyle(l.body, "background", "#ffffff")
        }
    };
    this.getCookieUin = function() {
        var h = e.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN);
        if (h) h = parseInt(h.substr(1), 10);
        e.out("uin:" + h);
        return h
    };
    this.getOriginalCookieUin = function() {
        return e.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN)
    };
    this.getCookieSkey = function() {
        return e.cookie.get("skey", qqweb.CONST.MAIN_DOMAIN)
    };
    this.getCookiePtwebqq = function() {
        return e.cookie.get("ptwebqq", qqweb.CONST.MAIN_DOMAIN)
    };
    this.runApp = function(h, l) {
        var o = this.getAllConfig(h);
        if (o) {
            var t = this.getApp(h);
            if (t) {
                t.run && t.run(l);
                l && l.callback && l.callback()
            } else if (o) if (o.appType == 1) this.loadApp(o, l);
            else if (o.appType == 2) {
                if (~~h > 0) qqweb.app["app" + h] = new qqweb.businessClass.App(o);
                else qqweb.app[h] = new qqweb.businessClass.App(o);
                qqweb.portal.runApp(h, l)
            }
            if (o) silenceUser = false
        } else e.out("id:" + h)
    };
    this.loadApp = function(h, l) {
        h = h || {};
        if (!this.getAppLoading(h.id)) {
            this.setAppLoading(h.id, true);
            var o = h.id,
            t = qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(o / 1E3) % 1E3 + "/" + o + "/",
            z = h.css || t + "style.css";
            t = h.js || t + "main.js";
            if (h.css || e.isNumber(o)) j.loadCss(z + "?" + qqweb.CONST.UPDATE_TIME_STAMP);
            j.loadScript(t + "?" + qqweb.CONST.UPDATE_TIME_STAMP, {
                onSuccess: function() {
                    qqweb.portal.runApp(h.id, l)
                }
            })
        }
    };
    this.getAppConfigList = function() {
        return qqweb.appconfig.appConfigList
    };
    this.getAppConfig = function(h) {
        return qqweb.appconfig.getAppConfig(h)
    };
    this.getSystemConfig = function(h) {
        return qqweb.appconfig.getSystemConfig(h)
    };
    this.getAllConfig = function(h) {
        return qqweb.appconfig.getAllConfig(h)
    };
    this.getApp = function(h) {
        return~~h > 0 ? qqweb.app["app" + h] : qqweb.app[h]
    };
    this.setAppLoading = function(h, l) {
        return n[h] = l
    };
    this.getAppLoading = function(h) {
        return n[h]
    };
    this.setIsLoginSuccess = function(h) {
        i = h
    };
    this.getIsLoginSuccess = function() {
        return i
    };
    this.confirm = function(h) {
        return window.confirm(h)
    };
    this.alert = function(h) {
        return window.alert(h)
    };
    this.closeHook = function(h) {
        if (e.browser.safari || e.browser.chrome) return "\u6267\u884c\u6b64\u64cd\u4f5c\u540e\u5c06\u4e22\u5931\u672c\u6b21\u804a\u5929\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f";
        else if (e.browser.ie > 0) event.returnValue = "\u6267\u884c\u6b64\u64cd\u4f5c\u540e\u5c06\u4e22\u5931\u672c\u6b21\u804a\u5929\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f";
        else h.returnValue = "\u6267\u884c\u6b64\u64cd\u4f5c\u540e\u5c06\u4e22\u5931\u672c\u6b21\u804a\u5929\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f"
    };
    this.addCloseHook = function() {
        if (!q) {
            q = true;
            a.on(window, "beforeunload", this.closeHook);
            a.on(window, "unload",
            function() {
                if (EQQ && EQQ.getIsLogin()) {
                    EQQ.logout();
                    EQQ.RPCService._proxy && EQQ.RPCService._proxy.abort();
                    EQQ.View.ChatBox && EQQ.View.ChatBox.scaptureHotkey && EQQ.View.ChatBox.scaptureHotkey.unstall()
                }
            })
        }
    };
    this.removeCloseHook = function() {
        a.off(window, "beforeunload");
        q = false
    };
    this.getCloseHook = function() {
        return q
    };
    this.addExitConfirm = function(h) {
        y += h || 1;
        y > 0 && this.addCloseHook();
        return y
    };
    this.removeExitConfirm = function(h) {
        y -= h || 1;
        y < 1 && this.removeCloseHook();
        return y
    };
    this.getExitConfirm = function() {
        return y
    };
    this.exit = function() {
        if (this.getExitConfirm() > 0) if (this.confirm("\u60a8\u786e\u8ba4\u8981\u79bb\u5f00 WebQQ \u5417\uff1f")) this.removeCloseHook();
        else return;
        var h = qqweb.layout.getCurrentWindow(),
        l = "";
        if (h) l = h.getAppId();
        a.notifyObservers(qqweb.portal, "exit");
        u = true;
        e.cookie.remove("ptwebqq", qqweb.CONST.MAIN_DOMAIN);
        e.cookie.remove("skey", qqweb.CONST.MAIN_DOMAIN);
        e.cookie.remove("uin", qqweb.CONST.MAIN_DOMAIN);
        e.cookie.remove("vfwebqq", qqweb.CONST.MAIN_DOMAIN);
        e.out(">>>>> cookie.remove");
        setTimeout(function() {
            a.notifyObservers(qqweb.portal, "exitSuccess")
        },
        1E3);
        silenceUser && pgvSendClick({
            hottag: "WEB2QQ.NOAPP.USER.ALL"
        })
    };
    this.getVfWebQQ = function() {
        return typeof EQQ !== "undefined" && EQQ.getVfWebQQ && EQQ.getVfWebQQ() ? EQQ.getVfWebQQ() : J ? J: ""
    };
    this.getQQWebStatus = function() {
        var h = qqweb.layout.getCurrentWindow(),
        l = "",
        o;
        if (h) l = h.getAppId();
        h = {
            currentAppId: l,
            appList: []
        };
        l = qqweb.layout.getWindowList();
        for (var t = 0; t < l.length; t++) {
            var z = l[t],
            p = z.getAppId();
            if (p !== "eqq--") {
                o = z.getX();
                var s = z.getY();
                if (z.windowType === "window") {
                    var x = z.getBoxStatus();
                    if (x !== "min") {
                        var w = z.getWidth();
                        z = z.getHeight();
                        o = {
                            appId: p,
                            defaultMode: x,
                            x: o,
                            y: s,
                            width: w,
                            height: z
                        };
                        p && h.appList.push(o)
                    }
                } else if (z.windowType === "widget") {
                    o = {
                        appId: p,
                        x: o,
                        y: s
                    };
                    h.appList.push(o)
                }
            }
        }
        return h
    };
    this.showUnsafeTip = function() {
        var h = new qqweb.businessClass.Window({
            title: "\u5b89\u5168\u8b66\u544a",
            dragable: true,
            resize: false,
            width: 520,
            height: 300,
            hasCloseButton: true,
            isSetCentered: true
        });
        h.setZIndex(200);
        h.setHtml('<div id="dangerTip"><p>WebQQ\u662f\u817e\u8baf\u5b98\u65b9\u63a8\u51fa\uff0c\u65e0\u9700\u4e0b\u8f7d\u7684\u7f51\u9875\u7248QQ\u3002</p>\t\t\t<p class="tip">\u5982\u679c\u60a8\u6b63\u5728\u4f7f\u7528360WebApps\u6216360WebQQ\u8f6f\u4ef6\uff0c<br/>\t\t\t\u5c06\u9762\u4e34\u5e10\u53f7\u548c\u9690\u79c1\u88ab\u7a83\u53d6\u7684\u98ce\u9669\u3002</p>\t\t\t<p>\u8bf7\u6539\u7528\u6d4f\u89c8\u5668\u8bbf\u95ee\uff1ahttp://web2.qq.com\u3002</p></div>')
    };
    this.returnLogin = function() {
        window.location = "./"
    };
    this.openInWebBrowser = function(h) {
        h = h || {};
        var l = this.getApp(6);
        if (e.isUndefined(l) || !l.isRunning()) {
            h.isOpenNewTab = true;
            qqweb.portal.runApp("6", h)
        } else l.openUrl(h)
    };
    this.openUrl = function() {};
    this.setTitle = function(h, l) {
        l.roll = l.roll || false;
        l.speed = l.speed || 500;
        if (l.roll) {
            if (! (h.length < 1)) {
                I = document.title;
                G && clearInterval(G);
                G = setInterval(function() {
                    document.title = h;
                    h = h.substr(1) + h.charAt(0)
                },
                l.speed)
            }
        } else {
            I = document.title;
            document.title = h
        }
    };
    this.resetTitle = function() {
        if (G) {
            clearInterval(G);
            G = null
        }
        document.title = I
    };
    this.addNotificationSource = function(h, l, o) {
        qqweb.app.messageCenter && qqweb.app.messageCenter.addNotificationSource(h, l, o)
    };
    this.removeNotificationSource = function(h) {
        qqweb.app.messageCenter && qqweb.app.messageCenter.removeNotificationSource(h)
    }
});
Jet().$package("qqweb.sound",
function(e) {
    var c = false,
    d, a = [],
    j = null,
    n = false;
    qqweb.sound = {
        init: function() {
            e.sound.onload = function() {
                n = true
            };
            e.sound.embedSWF("./swf/swfsound.swf");
            c = false
        },
        playSound: function(u, b) {
            if (this.isMute()) return false;
            if (u == "") return false;
            b = b || false;
            if (typeof a[u] === "undefined") {
                if (!n) return false;
                a[u] = j = e.sound.loadSound(u, b, qqweb.sound.playSoundObj)
            } else {
                j = a[u];
                qqweb.sound.playSoundObj()
            }
        },
        playSoundObj: function() {
            e.sound.startSound(j)
        },
        setMute: function(u) {
            c = u
        },
        isMute: function() {
            return c
        },
        setVol: function(u) {
            d = u
        },
        getVol: function() {
            return d
        }
    }
});
Jet().$package("qqweb.businessClass",
function(e) {
    var c = e.dom,
    d = e.event;
    this.Panel = new e.Class({
        init: function(a) {
            a = a || {};
            this.id = a.id;
            this.name = a.name;
            this.container = a.container;
            this.body = a.body || a.container;
            a.html = a.html || "";
            a.html && this.setHtml(a.html);
            c.isShow(this.container) ? this.show() : this.hide()
        },
        showName: function() {},
        setHtml: function(a) {
            this.html = a;
            this.body.innerHTML = a
        },
        append: function(a) {
            this.body.appendChild(a)
        },
        getSize: function() {
            return {
                width: c.getClientWidth(this.container),
                height: c.getClientHeight(this.container)
            }
        },
        getBodySize: function() {
            return {
                width: parseInt(c.getStyle(this.body, "width"), 10),
                height: parseInt(c.getStyle(this.body, "height"), 10)
            }
        },
        show: function() {
            c.show(this.container);
            d.notifyObservers(this, "show", this.getBodySize());
            this._isShow = true
        },
        hide: function() {
            c.hide(this.container);
            d.notifyObservers(this, "hide");
            this._isShow = false
        },
        isShow: function() {
            return this._isShow
        },
        toggleShow: function() {
            this.isShow() ? this.hide() : this.show()
        },
        getZIndex: function() {
            return this._zIndex
        },
        setZIndex: function(a) {
            c.setStyle(this.container, "zIndex", a);
            this._zIndex = a
        },
        setTopZIndex: function() {
            this.setZIndex(qqweb.layout.getTopZIndex())
        },
        setXY: function(a, j) {
            this.setX(a);
            this.setY(j)
        },
        setX: function(a) {
            c.setStyle(this.container, "left", a + "px")
        },
        setY: function(a) {
            c.setStyle(this.container, "top", a + "px")
        },
        setWidth: function(a) {
            c.setStyle(this.container, "width", a + "px")
        },
        getWidth: function() {
            return parseInt(c.getStyle(this.container, "width"))
        },
        setHeight: function(a) {
            c.setStyle(this.container, "height", a + "px")
        },
        getHeight: function() {
            return parseInt(c.getStyle(this.container, "height"))
        }
    })
});
Jet().$package("qqweb.businessClass",
function(e) {
    var c = e.dom,
    d = e.event,
    a = null;
    this.PopupBox = new e.Class({
        init: function(j) {
            var n = this;
            j = j || {};
            this.id = j.id;
            this.container = j.container;
            this.body = j.body || j.container;
            this.catchMouseUp = true;
            j.html = j.html || "";
            j.html && this.setHtml(j.html);
            if (j.noCatchMouseUp) this.catchMouseUp = false;
            this.onDocumentKeydown = function(u) {
                if (u.keyCode === 27) {
                    u.preventDefault();
                    n.hide()
                }
            };
            this.onMouseUp = function() {
                n.isShow() && n.hide()
            };
            this.onDocumentClick = function() {
                n.hide()
            };
            this.onWindowResize = function() {
                n.hide()
            };
            c.isShow(this.container) ? this.show() : this.hide()
        },
        showName: function() {},
        setHtml: function(j) {
            if (e.browser.ie) j += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
            this.html = j;
            this.body.innerHTML = j
        },
        show: function() {
            a && a.hide();
            c.show(this.container);
            this.catchMouseUp ? d.on(document, "mouseup", this.onMouseUp) : d.off(document, "mouseup", this.onMouseUp);
            d.on(document, "click", this.onDocumentClick);
            d.on(document, "keydown", this.onDocumentKeydown);
            d.on(window, "resize", this.onWindowResize);
            a = this;
            this._isShow = true;
            d.notifyObservers(this, "show")
        },
        hide: function() {
            d.off(document, "click", this.onDocumentClick);
            d.off(document, "keydown", this.onDocumentKeydown);
            d.off(window, "resize", this.onWindowResize);
            d.off(document, "mouseup", this.onMouseUp);
            c.hide(this.container);
            if (a) {
                a !== this && a.hide();
                a = null
            }
            this._isShow = false;
            d.notifyObservers(this, "hide")
        },
        isShow: function() {
            return this._isShow
        },
        toggleShow: function() {
            this.isShow() ? this.hide() : this.show()
        },
        getZIndex: function() {
            return this._zIndex
        },
        setZIndex: function(j) {
            c.setStyle(this.container, "zIndex", j);
            this._zIndex = j
        },
        setTopZIndex: function() {
            this.setZIndex(qqweb.layout.getTopZIndex())
        },
        setXY: function(j, n) {
            this.setX(j);
            this.setY(n)
        },
        setX: function(j) {
            c.setStyle(this.container, "left", j + "px")
        },
        setY: function(j) {
            c.setStyle(this.container, "top", j + "px")
        },
        setWidth: function(j) {
            c.setStyle(this.container, "width", j + "px")
        },
        getWidth: function() {
            return parseInt(c.getStyle(this.container, "width"))
        },
        setHeight: function(j) {
            c.setStyle(this.container, "height", j + "px")
        },
        getHeight: function() {
            return parseInt(c.getStyle(this.container, "height"))
        }
    })
});
Jet().$package("qqweb.businessClass",
function(e) {
    var c = e.dom,
    d = e.event,
    a;
    if (!c.id("qqweb_focus_input")) {
        var j = c.node("input", {
            id: "qqweb_focus_input"
        });
        j.setAttribute("type", "text");
        c.getDoc().body.appendChild(j)
    }
    var n = function() {
        var b = c.node("div", {
            "class": "dragMask"
        }),
        g = c.node("div", {
            "class": "dragProxy"
        });
        b.appendChild(g);
        c.getDoc().body.appendChild(b);
        return {
            maskEl: b,
            proxyEl: g
        }
    },
    u = function() {
        a || (a = n());
        return a
    };
    this.baseWindow = new e.Class({
        windowType: "window",
        _zIndex: 1,
        _inBorder: 5,
        _outBorder: 5,
        _leftMargin: 0,
        _topMargin: 65,
        _rightMargin: 0,
        _bottomMargin: 0,
        _windowFlag: 0,
        _leftArea: 250,
        _topArea: 65,
        _rightArea: 0,
        _bottomArea: 40,
        init: function(b) {
            b = this.parseOption(b);
            this.type = b.type;
            this._width = b.width;
            this._height = b.height;
            this._restoreWidth = b.width;
            this._restoreHeight = b.height;
            this._minWidth = b.minWidth;
            this._minHeight = b.minHeight;
            this._appId = b.appId;
            this.createDom();
            var g = this.getDefaultPosition();
            this._x = b.x ? b.x: g.x;
            this._y = b.y ? b.y: g.y;
            this._restoreX = this._x;
            this._restoreY = this._y;
            this.setZIndex(this.option.zIndex);
            this.createEvent();
            switch (b.defaultMode) {
            case "max":
                this.max();
                break;
            case "restore":
                this.restore();
                break;
            case "min":
                this.min();
                break
            }
            b.isSetCurrent ? this.setCurrent() : this.setNotCurrent();
            b.isSetCentered && this.setWindowCentered()
        },
        parseOption: function(b) {
            b = b || {};
            b.type = b.type || "default";
            b.flashMode = e.isUndefined(b.flashMode) ? false: b.flashMode;
            b.ieOnly = e.isUndefined(b.ieOnly) ? false: b.ieOnly;
            b.loginLevel = e.isUndefined(b.loginLevel) ? qqweb.CONST.LOGIN_LEVEL_NONE: b.loginLevel;
            b.isTask = e.isUndefined(b.isTask) ? true: b.isTask;
            b.width = b.width || 600;
            b.height = b.height || 450;
            b.minWidth = b.minWidth || 180;
            b.minHeight = b.minHeight || 100;
            b.zIndex = !e.isUndefined(b.zIndex) ? b.zIndex: qqweb.layout.getTopZIndex();
            b.title = b.title || "\u672a\u547d\u540d";
            b.html = b.html || "";
            b.modeSwitch = b.modeSwitch === true ? true: false;
            b.isSetCurrent = b.isSetCurrent ? b.isSetCurrent: "true";
            b.defaultMode = b.defaultMode ? b.defaultMode: "restore";
            b.dragable = b.dragable === true ? true: false;
            b.resize = b.resize === true ? true: false;
            b.dragProxy = b.dragProxy === true ? true: e.isUndefined(b.dragProxy) ? qqweb.layout.getWindowDragProxy() : b.dragProxy;
            b.dragProxy = false;
            b.isFixedZIndex = b.isFixedZIndex === true ? true: false;
            b.isSetCentered = b.isSetCentered === true ? true: false;
            b.hasCloseButton = b.hasCloseButton === true ? true: false;
            b.hasMaxButton = b.hasMaxButton === true ? true: false;
            b.hasRestoreButton = b.hasRestoreButton === true ? true: false;
            b.hasMinButton = b.hasMinButton === true ? true: false;
            b.hasRefreshButton = b.hasRefreshButton === true ? true: false;
            b.hasPinUpButton = b.hasPinUpButton === true ? true: false;
            b.hasPinDownButton = b.hasPinDownButton === true ? true: false;
            b.hasOkButton = b.hasOkButton === true ? true: false;
            b.hasCancelButton = b.hasCancelButton === true ? true: false;
            b.hasPreviousButton = b.hasPreviousButton === true ? true: false;
            b.hasNextButton = b.hasNextButton === true ? true: false;
            b.doubleClickModeSwitch = b.doubleClickModeSwitch === false ? false: true;
            return this.option = b
        },
        getAppId: function() {
            return this._appId
        },
        getWindowFlags: function() {
            return this._windowFlag
        },
        setWindowFlags: function(b) {
            this._windowFlag = b
        },
        createDom: function() {
            var b, g, f = qqweb.layout.getWindowId();
            this.getId = function() {
                return f
            };
            this.container = c.node("div", {
                id: "appWindow_" + f,
                "class": "window window_current"
            });
            b = '\t\t\t\t<div id="window_outer_' + f + '" class="window_outer">\t\t\t\t\t<div id="window_inner_' + f + '" class="window_inner"  style="z-index:' + this.option.zIndex + '">\t\t\t\t\t\t<div class="window_bg_container">\t\t\t\t\t\t\t<div class="window_bg window_center"></div>\t\t\t\t\t\t\t<div class="window_bg window_t"></div>\t\t\t\t\t\t\t<div class="window_bg window_rt"></div>\t\t\t\t\t\t\t<div class="window_bg window_r"></div>\t\t\t\t\t\t\t<div class="window_bg window_rb"></div>\t\t\t\t\t\t\t<div class="window_bg window_b"></div>\t\t\t\t\t\t\t<div class="window_bg window_lb"></div>\t\t\t\t\t\t\t<div class="window_bg window_l"></div>\t\t\t\t\t\t\t<div class="window_bg window_lt"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_' + f + '" class="window_titleBar">\t\t\t\t\t\t\t\t<a id="window_closeButton_' + f + '" class="window_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_maxButton_' + f + '" class="window_max" title="\u6700\u5927\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restoreButton_' + f + '" class="window_restore" title="\u8fd8\u539f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_minButton_' + f + '" class="window_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restorefullButton_' + f + '" class="window_restore_full" title="\u9000\u51fa\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_fullButton_' + f + '" class="window_fullscreen" title="\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_refreshButton_' + f + '" class="window_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinUpButton_' + f + '" class="window_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinDownButton_' + f + '" class="window_pinDown" title="\u9489\u4f4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="window_title_' + f + '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="window_body_' + f + '" class="window_bodyArea"></div>\t\t\t\t\t\t\t<div id="window_controlArea_' + f + '" class="window_controlArea">\t\t\t\t\t\t\t\t<a id="window_cancelButton_' + f + '" class="window_button window_cancel" title="\u53d6\u6d88" href="###" hidefocus>\u53d6\u3000\u6d88</a>\t\t\t\t\t\t\t\t<a id="window_okButton_' + f + '" class="window_button window_ok" title="\u786e\u5b9a" href="###" hidefocus>\u786e\u3000\u5b9a</a>\t\t\t\t\t\t\t\t<a id="window_nextButton_' + f + '" class="window_button window_next" title="\u4e0b\u4e00\u6b65" href="###" hidefocus>\u4e0b\u4e00\u6b65</a>\t\t\t\t\t\t\t\t<a id="window_previousButton_' + f + '" class="window_button window_previous" title="\u4e0a\u4e00\u6b65" href="###" hidefocus>\u4e0a\u4e00\u6b65</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
            g = '\t\t\t\t<div id="window_outer_' + f + '" class="window_outer">\t\t\t\t\t<div id="window_inner_' + f + '" class="window_inner"  style="z-index:' + this.option.zIndex + '">\t\t\t\t\t\t<div class="window_bg_container_ipad"></div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_' + f + '" class="window_titleBar">\t\t\t\t\t\t\t\t<a id="window_closeButton_' + f + '" class="window_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_maxButton_' + f + '" class="window_max" title="\u6700\u5927\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restoreButton_' + f + '" class="window_restore" title="\u8fd8\u539f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_minButton_' + f + '" class="window_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_restorefullButton_' + f + '" class="window_restore_full" title="\u9000\u51fa\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_fullButton_' + f + '" class="window_fullscreen" title="\u5168\u5c4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_refreshButton_' + f + '" class="window_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinUpButton_' + f + '" class="window_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="window_pinDownButton_' + f + '" class="window_pinDown" title="\u9489\u4f4f" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="window_title_' + f + '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="window_body_' + f + '" class="window_bodyArea"></div>\t\t\t\t\t\t\t<div id="window_controlArea_' + f + '" class="window_controlArea">\t\t\t\t\t\t\t\t<a id="window_cancelButton_' + f + '" class="window_button window_cancel" title="\u53d6\u6d88" href="###" hidefocus>\u53d6\u3000\u6d88</a>\t\t\t\t\t\t\t\t<a id="window_okButton_' + f + '" class="window_button window_ok" title="\u786e\u5b9a" href="###" hidefocus>\u786e\u3000\u5b9a</a>\t\t\t\t\t\t\t\t<a id="window_nextButton_' + f + '" class="window_button window_next" title="\u4e0b\u4e00\u6b65" href="###" hidefocus>\u4e0b\u4e00\u6b65</a>\t\t\t\t\t\t\t\t<a id="window_previousButton_' + f + '" class="window_button window_previous" title="\u4e0a\u4e00\u6b65" href="###" hidefocus>\u4e0a\u4e00\u6b65</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
            if (e.platform.iPad) b = g;
            if (e.browser.ie) b += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>';
            this.container.innerHTML = b;
            qqweb.layout.getDesktop().body.appendChild(this.container);
            this._titleBar = c.id("window_titleBar_" + f);
            this._title = c.id("window_title_" + f);
            this.body = c.id("window_body_" + f);
            this.vscroller = c.id("window_vertical_scroller_" + f);
            this.hscroller = c.id("window_horizontal_scroller_" + f);
            this._window_outer = c.id("window_outer_" + f);
            this._window_inner = c.id("window_inner_" + f);
            this._closeButton = c.id("window_closeButton_" + f);
            this._fullButton = c.id("window_fullButton_" + f);
            this._restorefullButton = c.id("window_restorefullButton_" + f);
            this._maxButton = c.id("window_maxButton_" + f);
            this._restoreButton = c.id("window_restoreButton_" + f);
            this._minButton = c.id("window_minButton_" + f);
            this._refreshButton = c.id("window_refreshButton_" + f);
            this._pinUpButton = c.id("window_pinUpButton_" + f);
            this._pinDownButton = c.id("window_pinDownButton_" + f);
            this._controlArea = c.id("window_controlArea_" + f);
            this._cancelButton = c.id("window_cancelButton_" + f);
            this._okButton = c.id("window_okButton_" + f);
            this._nextButton = c.id("window_nextButton_" + f);
            this._previousButton = c.id("window_previousButton_" + f);
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
            this.option.alterMode && this.createAlterDom(f)
        },
        createAlterDom: function(b) {
            b = typeof b === "undefined" ? this.getId() : b;
            this.alterDom = c.node("div", {
                id: "appWindow_" + b + "_alt",
                "class": "flash_alt"
            });
            this.alterDom.innerHTML = "<div class='appIframeAlter'></div><div  class='appIframeAlterTxt'>\u8fd0\u884c\u4e2d\uff0c\u70b9\u51fb\u6062\u590d\u663e\u793a :)</div>";
            this.body.appendChild(this.alterDom)
        },
        showAlterDom: function() {
            c.setStyle(this.body, "background", "#FFF");
            c.show(this.alterDom)
        },
        hideAlterDom: function() {
            c.setStyle(this.body, "background", "transparent none");
            c.hide(this.alterDom)
        },
        createEvent: function() {
            var b = this;
            this.observer = {
                onCloseButtonClick: function(g) {
                    b.close();
                    g.preventDefault();
                    g.stopPropagation()
                },
                stopPropagation: function(g) {
                    g.stopPropagation()
                },
                onMaxButtonClick: function(g) {
                    g.preventDefault();
                    b.option.modeSwitch && b.max()
                },
                onRestorefullButtonClick: function(g) {
                    g.preventDefault();
                    b.option.modeSwitch && b.restorefull()
                },
                onFullButtonClick: function(g) {
                    g.preventDefault();
                    b.option.modeSwitch && b.fullscreen()
                },
                onRestoreButtonClick: function(g) {
                    g.preventDefault();
                    b.option.modeSwitch && b.restore()
                },
                onMinButtonClick: function(g) {
                    g.preventDefault();
                    b.option.modeSwitch && b.min()
                },
                onRefreshButtonClick: function(g) {
                    g.preventDefault();
                    g.stopPropagation();
                    d.notifyObservers(b, "clickRefreshButton")
                },
                onPinUpButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickPinUpButton");
                    b.showPinDownButton()
                },
                onPinDownButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickPinDownButton");
                    b.showPinUpButton()
                },
                onOkButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickOkButton") && setTimeout(function() {
                        b.close()
                    },
                    0)
                },
                onCancelButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickCancelButton") && setTimeout(function() {
                        b.close()
                    },
                    0)
                },
                onPreviousButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickPreviousButton")
                },
                onNextButtonClick: function(g) {
                    g.preventDefault();
                    d.notifyObservers(b, "clickNextButton")
                },
                onMouseoverWindow: function(g) {
                    g.stopPropagation();
                    d.notifyObservers(b, "mouseoverWindow")
                },
                onMouseoutWindow: function(g) {
                    g.stopPropagation();
                    d.notifyObservers(b, "mouseoutWindow")
                },
                onMousedownWindow: function() {
                    b && b.setCurrent()
                },
                onKeyDownWindow: function() {},
                onWindowResize: function() {
                    if (b.getBoxStatus() === "max") b.adjustMaxSize();
                    else if (b.getBoxStatus() === "fullscreen") {
                        var g = qqweb.layout.getClientWidth(),
                        f = qqweb.layout.getClientHeight();
                        b.setXY(0, 0);
                        b.setWidth(g);
                        b.setHeight(f)
                    }
                    g = b.getBodySize();
                    g.from = "windowResize";
                    d.notifyObservers(b, "resize", g)
                },
                onTitleBarDblClick: function(g) {
                    if (b.option.doubleClickModeSwitch) {
                        g.preventDefault();
                        d.notifyObservers(b, "dblClickTitleBar");
                        if (b.option.modeSwitch) if (b.getBoxStatus() === "max") b.restore();
                        else b.getBoxStatus() === "restore" && b.max()
                    }
                },
                onResize: function(g) {
                    g.width && b.setWidth(g.width);
                    g.height && b.setHeight(g.height);
                    d.notifyObservers(b, "resize", b.getBodySize())
                },
                onMove: function(g) {
                    b._x = g.x;
                    b._y = g.y
                },
                onDragStart: function() {
                    b.hideTouchPad();
                    d.notifyObservers(b, "dragStart")
                },
                onDragEnd: function(g) {
                    if (e.platform.iPad) {
                        if (g) {
                            b.setXY(g.x, g.y);
                            try {
                                b.container.style.webkitTransform = "none"
                            } catch(f) {}
                        }
                        b.updateTouchPad()
                    }
                    d.notifyObservers(b, "dragEnd", b.getBodySize())
                },
                onMousedown: function(g) {
                    if (! (g.touches && g.touches.length > 1)) {
                        e.out("onMousedown ");
                        c.setStyle(b._dragProxy.proxyEl, "left", b.getX() + b._outBorder + "px");
                        c.setStyle(b._dragProxy.proxyEl, "top", b.getY() + b._outBorder + "px");
                        c.setStyle(b._dragProxy.proxyEl, "width", b._width - b._outBorder * 2 + "px");
                        c.setStyle(b._dragProxy.proxyEl, "height", b._height - b._outBorder * 2 + "px");
                        c.setStyle(b._dragProxy.maskEl, "zIndex", 60002);
                        c.show(b._dragProxy.maskEl)
                    }
                },
                onTouchStart: function(g) {
                    g.touches.length > 1 || d.on(b.container, "touchmove", b.observer.onTouchMove)
                },
                onTouchMove: function(g) {
                    d.off(b.container, "touchmove", b.observer.onTouchMove);
                    if (! (g.touches && g.touches.length > 1)) {
                        g = b.getX() + b._outBorder;
                        var f = b.getY() + b._outBorder;
                        b._dragProxy.proxyEl.style.webkitTransform = "translate3d(" + g + "px," + f + "px, 0px)";
                        c.setStyle(b._dragProxy.proxyEl, "width", b._width - b._outBorder * 2 + "px");
                        c.setStyle(b._dragProxy.proxyEl, "height", b._height - b._outBorder * 2 + "px");
                        c.setStyle(b._dragProxy.maskEl, "zIndex", 60002);
                        c.show(b._dragProxy.maskEl);
                        b.hideTouchPad()
                    }
                },
                onDragProxyEnd: function(g) {
                    g && b.setXY(g.x - b._outBorder, g.y - b._outBorder);
                    c.hide(b._dragProxy.maskEl)
                },
                onDragProxyResizeEnd: function(g) {
                    c.hide(b._dragProxy.maskEl);
                    e.out(g.x);
                    b.setXY(g.x - b._outBorder, g.y - b._outBorder);
                    var f = 0,
                    i = function() {
                        f++;
                        var k = b.getBodySize(),
                        m = g.width - k.width,
                        q = g.height - k.height;
                        b.setWidth(k.width + m * 1.1 + b._outBorder * 2);
                        b.setHeight(k.height + q * 1.1 + b._outBorder * 2);
                        d.notifyObservers(b, "resize", b.getBodySize());
                        if (f < 5 && (m >= 5 || m <= -5)) {
                            e.out("setting timeout " + m + " " + q + " " + f + " mostStick:5");
                            setTimeout(i, 200)
                        } else {
                            b.setWidth(g.width + b._outBorder * 2);
                            b.setHeight(g.height + b._outBorder * 2);
                            d.notifyObservers(b, "resize", b.getBodySize())
                        }
                    };
                    b.setWidth(g.width + b._outBorder * 2);
                    b.setHeight(g.height + b._outBorder * 2);
                    d.notifyObservers(b, "resize", b.getBodySize())
                },
                stopPropagationAndSetCurrent: function(g) {
                    g.stopPropagation();
                    b.setCurrent()
                },
                stopPropagationAndSetCurrentWithoutFocus: function(g) {
                    g.stopPropagation();
                    b.setCurrentWithoutFocus()
                }
            };
            this.option.dragProxy && this.enableDragProxy();
            this.option.dragable && this.enableDrag();
            this.option.resize && this.enableResize();
            e.platform.iPad ? d.on(this.container, "touchstart", this.observer.onMousedownWindow) : d.on(this.container, "mousedown", this.observer.onMousedownWindow);
            d.on(this.container, "keydown", this.observer.onKeyDownWindow);
            d.on(this.body, "mousedown", this.observer.stopPropagationAndSetCurrent);
            d.on(this._titleBar, "dblclick", this.observer.onTitleBarDblClick);
            d.on(this._closeButton, "click", this.observer.onCloseButtonClick);
            d.on(this._closeButton, "mousedown", this.observer.stopPropagation);
            d.on(this._fullButton, "click", this.observer.onFullButtonClick);
            d.on(this._fullButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            d.on(this._restorefullButton, "click", this.observer.onRestorefullButtonClick);
            d.on(this._restorefullButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            d.on(this._maxButton, "click", this.observer.onMaxButtonClick);
            d.on(this._maxButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            d.on(this._restoreButton, "click", this.observer.onRestoreButtonClick);
            d.on(this._restoreButton, "mousedown", this.observer.stopPropagationAndSetCurrent);
            d.on(this._minButton, "click", this.observer.onMinButtonClick);
            d.on(this._minButton, "mousedown", this.observer.stopPropagation);
            d.on(this._refreshButton, "click", this.observer.onRefreshButtonClick);
            d.on(this._refreshButton, "mousedown", this.observer.stopPropagation);
            d.on(this._pinUpButton, "click", this.observer.onPinUpButtonClick);
            d.on(this._pinUpButton, "mousedown", this.observer.stopPropagation);
            d.on(this._pinDownButton, "click", this.observer.onPinDownButtonClick);
            d.on(this._pinDownButton, "mousedown", this.observer.stopPropagation);
            d.on(this._okButton, "click", this.observer.onOkButtonClick);
            d.on(this._okButton, "mousedown", this.observer.stopPropagation);
            d.on(this._cancelButton, "click", this.observer.onCancelButtonClick);
            d.on(this._cancelButton, "mousedown", this.observer.stopPropagation);
            d.on(this._previousButton, "click", this.observer.onPreviousButtonClick);
            d.on(this._previousButton, "mousedown", this.observer.stopPropagation);
            d.on(this._nextButton, "click", this.observer.onNextButtonClick);
            d.on(this._nextButton, "mousedown", this.observer.stopPropagation);
            d.addObserver(this, "closeWindow", this.close)
        },
        setTitle: function(b) {
            this._title.innerHTML = e.string.encodeHtml(b)
        },
        setTitleHtml: function(b) {
            this._title.innerHTML = b
        },
        showCloseButton: function() {
            c.show(this._closeButton)
        },
        showFullButton: function() {
            c.show(this._fullButton)
        },
        showMaxButton: function() {
            c.hide(this._restoreButton);
            c.show(this._maxButton)
        },
        showRestoreButton: function() {
            c.hide(this._maxButton);
            c.show(this._restoreButton)
        },
        showMinButton: function() {
            c.show(this._minButton)
        },
        showRefreshButton: function() {
            c.show(this._refreshButton)
        },
        showPinUpButton: function() {
            c.hide(this._pinDownButton);
            c.show(this._pinUpButton)
        },
        showPinDownButton: function() {
            c.hide(this._pinUpButton);
            c.show(this._pinDownButton)
        },
        showOkButton: function() {
            c.show(this._controlArea);
            c.setStyle(this.body, "bottom", "26px");
            c.show(this._okButton)
        },
        showCancelButton: function() {
            c.show(this._controlArea);
            c.setStyle(this.body, "bottom", "26px");
            c.show(this._cancelButton)
        },
        showPreviousButton: function() {
            c.show(this._controlArea);
            c.setStyle(this.body, "bottom", "26px");
            c.show(this._previousButton)
        },
        showNextButton: function() {
            c.show(this._controlArea);
            c.setStyle(this.body, "bottom", "26px");
            c.show(this._nextButton)
        },
        show: function() {
            c.show(this.container);
            d.on(window, "resize", this.observer.onWindowResize);
            e.out(">>>> Window: show");
            d.notifyObservers(this, "show", this.getBodySize());
            this._isShow = true
        },
        hide: function() {
            d.off(window, "resize", this.observer.onWindowResize);
            c.hide(this.container);
            d.notifyObservers(this, "hide");
            this._isShow = false
        },
        isShow: function() {
            return this._isShow
        },
        toggleShow: function() {
            this.isShow() ? this.hide() : this.show()
        },
        setCurrent: function() {
            var b = this;
            this.setWindowFlags(this.getWindowFlags() | qqweb.CONST.WINDOW_FLAG_CURRENT);
            this.setCurrentWithoutFocus();
            b.focus();
            this.updateTouchPad()
        },
        setNotCurrent: function(b) {
            this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_CURRENT | qqweb.CONST.WINDOW_FLAG_NOT_CURRENT);
            if (b) {
                b = this;
                b.setStyleNotCurrent();
                d.notifyObservers(b, "setNotCurrent")
            } else {
                this.setStyleNotCurrent();
                d.notifyObservers(this, "setNotCurrent")
            }
            this.hideTouchPad()
        },
        setCurrentWithoutFocus: function() {
            var b = this,
            g = qqweb.layout.getCurrentWindow();
            if (g != this) {
                qqweb.layout.setCurrentWindow(this);
                b.option.isFixedZIndex || this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_FULLSCREEN || b.setZIndex(qqweb.layout.getTopZIndex());
                b.setStyleCurrent();
                b.show();
                d.notifyObservers(b, "setCurrent");
                if (g) e.browser.ie ? g.setNotCurrent(true) : g.setNotCurrent()
            }
        },
        setStyleCurrent: function() {
            c.addClass(this.container, "window_current")
        },
        setStyleNotCurrent: function() {
            this.container && c.removeClass(this.container, "window_current")
        },
        focus: function() {
            d.notifyObservers(this, "focus")
        },
        setBoxStatus: function(b) {
            this._status = b
        },
        getBoxStatus: function() {
            return this._status
        },
        adjustMaxSize: function() {
            if (this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_FULLSCREEN) this.setZIndex(this.option.zIndex);
            else {
                this._restoreX = this._x;
                this._restoreY = this._y
            }
            this.setXY(5, 66);
            var b = qqweb.layout.getClientWidth(),
            g = qqweb.layout.getClientHeight();
            this.setWidth(b - 0 - 10);
            this.setHeight(g - 101);
            d.notifyObservers(this, "resize", this.getBodySize());
            this.updateTouchPad()
        },
        max: function() {
            var b = this.getBoxStatus();
            this.setDisableDrag();
            this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_NORMAL | qqweb.CONST.WINDOW_FLAG_MAX);
            this.setBoxStatus("max");
            this.adjustMaxSize();
            d.notifyObservers(this, "max", b);
            this.showRestoreButton();
            c.show(this._fullButton);
            c.hide(this._restorefullButton);
            d.on(window, "resize", this.observer.onWindowResize)
        },
        fullscreen: function() {
            if (this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_NORMAL) {
                this._restoreX = this._x;
                this._restoreY = this._y
            }
            this.setWindowFlags(this.getWindowFlags() | qqweb.CONST.WINDOW_FLAG_FULLSCREEN);
            this.setBoxStatus("fullscreen");
            c.hide(this._maxButton);
            c.hide(this._restoreButton);
            c.hide(this._fullButton);
            c.show(this._restorefullButton);
            var b = qqweb.layout.getClientWidth(),
            g = qqweb.layout.getClientHeight();
            this.setXY(0, 0);
            this.setWidth(b);
            this.setHeight(g);
            this.setZIndex(2E6);
            d.notifyObservers(this, "resize", this.getBodySize());
            var f = null;
            if (!e.platform.iPad) {
                if (c.id("fullscreen_tip_container")) {
                    f = c.id("fullscreen_tip_container");
                    f.style.display = "block"
                } else {
                    f = c.node("div", {
                        id: "fullscreen_tip_container",
                        "class": "fullscreen_tip_container"
                    });
                    document.body.appendChild(f);
                    f.innerHTML = '<div class="fullscreen_tip"></div>';
                    f.style.position = "absolute";
                    f.style.zIndex = "20000001";
                    f.style.height = g + "px"
                }
                setTimeout(function() {
                    f.style.display = "none"
                },
                3E3);
                d.on(window, "resize", this.observer.onWindowResize)
            }
            e.platform.iPad && this.hideTouchPad()
        },
        restorefull: function() {
            this.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_NORMAL ? this.restore() : this.max();
            this.setZIndex(qqweb.layout.getTopZIndex());
            this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_FULLSCREEN);
            if (c.id("fullscreen_tip_container")) {
                fullscreenTipContainer = c.id("fullscreen_tip_container");
                fullscreenTipContainer.style.display = "none"
            }
        },
        min: function() {
            var b = this.getBoxStatus();
            this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_CURRENT | qqweb.CONST.WINDOW_FLAG_NOT_CURRENT | qqweb.CONST.WINDOW_FLAG_MIN);
            qqweb.layout.getCurrentWindow() === this && qqweb.layout.setCurrentWindow(null);
            this.option.flashMode || this.hide();
            this.setBoxStatus(b || "min");
            d.notifyObservers(this, "min");
            this._isShow = false;
            e.platform.iPad && this.hideTouchPad()
        },
        restore: function() {
            this.setWindowFlags(this.getWindowFlags() & ~qqweb.CONST.WINDOW_FLAG_MAX | qqweb.CONST.WINDOW_FLAG_NORMAL);
            d.off(window, "resize", this.observer.onWindowResize);
            this.setXY(this._restoreX, this._restoreY);
            if (this._restoreWidth < 0) this._restoreWidth = 0;
            if (this._restoreHeight < 0) this._restoreHeight = 0;
            this.setWidth(this._restoreWidth);
            this.setHeight(this._restoreHeight);
            e.out("resize: " + this.getBodySize());
            e.out("resize w: " + this.getBodySize().width);
            e.out("resize h: " + this.getBodySize().height);
            d.notifyObservers(this, "resize", this.getBodySize());
            this.setEnableDrag();
            if (this.option.hasMaxButton) {
                this.showMaxButton();
                c.show(this._fullButton);
                c.hide(this._restorefullButton)
            }
            d.notifyObservers(this, "restore");
            this.setBoxStatus("restore");
            e.platform.iPad && this.updateTouchPad()
        },
        setWidth: function(b) {
            c.setStyle(this.container, "width", b + "px");
            c.setStyle(this.body, "width", b - 20 + "px");
            this._width = b;
            if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreWidth = b
        },
        getWidth: function() {
            return this._width
        },
        getHeight: function() {
            return this._height
        },
        setHeight: function(b) {
            c.setStyle(this.container, "height", b + "px");
            c.setStyle(this._window_outer, "height", b - 20 + "px");
            var g = 28;
            if (e.browser.ie && e.browser.ie < 7) g = 29;
            this.option && this.option.hasOkButton ? c.setStyle(this.body, "height", b - 47 - g + "px") : c.setStyle(this.body, "height", b - 20 - g + "px");
            this._height = b;
            if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreHeight = b;
            d.notifyObservers(this, "setNewHeight", b)
        },
        getZIndex: function() {
            return this._zIndex
        },
        setZIndex: function(b) {
            c.setStyle(this.container, "zIndex", b);
            c.setStyle(this._window_inner, "zIndex", b);
            this._zIndex = b
        },
        setTopZIndex: function() {
            this.setZIndex(qqweb.layout.getTopZIndex())
        },
        setXY: function(b, g) {
            if (b || b === 0) this.setX(b);
            if (g || g === 0) this.setY(g)
        },
        setX: function(b) {
            this._x = b;
            c.setStyle(this.container, "left", b + "px")
        },
        setY: function(b) {
            this._y = b;
            c.setStyle(this.container, "top", b + "px")
        },
        getX: function() {
            return parseInt(c.getStyle(this.container, "left"))
        },
        getRestoreX: function() {
            return this._restoreX
        },
        getRestoreY: function() {
            return this._restoreY
        },
        getLeft: function() {
            return this._x
        },
        getY: function() {
            return parseInt(c.getStyle(this.container, "top"))
        },
        setLeft: function(b) {
            c.setStyle(this.container, "left", b + "px");
            c.setStyle(this.container, "right", "")
        },
        setTop: function(b) {
            c.setStyle(this.container, "top", b + "px");
            c.setStyle(this.container, "bottom", "")
        },
        setRight: function(b) {
            c.setStyle(this.container, "right", b + "px");
            c.setStyle(this.container, "left", "")
        },
        setBottom: function(b) {
            c.setStyle(this.container, "bottom", b + "px");
            c.setStyle(this.container, "top", "")
        },
        setWindowCentered: function() {
            var b = qqweb.layout.getClientWidth(),
            g = qqweb.layout.getClientHeight();
            this.setXY(b > this._width ? (b - this._width) / 2 : 0, g > this._height ? (g - this._height) / 2 : 0)
        },
        setWindowCenteredRelative: function(b) {
            this.setX(b.getX() + (b.getWidth() - this._width) / 2)
        },
        getDefaultPosition: function() {
            var b = qqweb.layout.getClientWidth(),
            g = qqweb.layout.getClientHeight(),
            f = b - this._width - this._leftMargin - this._rightMargin - this._rightArea - this._leftArea,
            i = g - this._height - this._topMargin - this._bottomMargin - this._bottomArea;
            f = f > 0 ? f: 1;
            i = i > 0 ? i: 1;
            e.out("ID: " + this.getId());
            var k = this.getId() - 5 - 1;
            k = k < 0 ? 0 : k;
            f = this._leftMargin + this._leftArea + k * 25 % f;
            i = this._topMargin + this._topArea + k * 25 % i;
            f = f + this._width >= b ? 0 : f;
            i = i + this._height + this._topArea >= g ? this._topArea: i;
            return {
                x: f,
                y: i
            }
        },
        enableDrag: function() {
            this.option.dragable = true;
            this.getBoxStatus() !== "max" && this.setEnableDrag()
        },
        disableDrag: function() {
            this.option.dragable = false;
            this.setDisableDrag()
        },
        enableDragProxy: function() {
            this.option.dragProxy = true
        },
        disableDragProxy: function() {
            this.option.dragProxy = false
        },
        setEnableDrag: function() {
            if (this.option.dragable) {
                if (this._dragController) {
                    if (this.option.dragProxy) e.platform.iPad ? d.on(this.container, "touchstart", this.observer.onTouchStart) : d.on(this.container, "mousedown", this.observer.onMousedown);
                    this._dragController.unlock()
                } else {
                    if (this.option.dragProxy) {
                        this._dragProxy = u();
                        e.platform.iPad ? d.on(this.container, "touchstart", this.observer.onTouchStart) : d.on(this.container, "mousedown", this.observer.onMousedown);
                        this._dragController = new e.ui.Drag(this.container, this._dragProxy.proxyEl, {
                            isLimited: true,
                            leftMargin: this._leftMargin + this._outBorder,
                            topMargin: this._topMargin + this._outBorder,
                            rightMargin: this._rightMargin + this._outBorder,
                            bottomMargin: this._bottomMargin + this._outBorder
                        });
                        d.addObserver(this._dragController, "end", this.observer.onDragProxyEnd)
                    } else {
                        this._dragController = new e.ui.Drag(this.container, this.container, {
                            isLimited: true,
                            leftMargin: this._leftMargin,
                            topMargin: this._topMargin,
                            rightMargin: this._rightMargin,
                            bottomMargin: this._bottomMargin
                        });
                        d.addObserver(this._dragController, "move", this.observer.onMove)
                    }
                    d.addObserver(this._dragController, "start", this.observer.onDragStart);
                    d.addObserver(this._dragController, "end", this.observer.onDragEnd)
                }
                this.setEnableResize()
            }
        },
        setDisableDrag: function() {
            if (this._dragController) {
                this._dragController.lock();
                if (this.option.dragProxy) e.platform.iPad ? d.off(this.container, "touchstart", this.observer.onTouchStart) : d.off(this.container, "mousedown", this.observer.onMousedown)
            }
            this.setDisableResize()
        },
        enableResize: function() {
            this.option.resize = true;
            this.getBoxStatus() !== "max" && this.setEnableResize()
        },
        disableResize: function() {
            this.option.dragable = false;
            this.setDisableResize()
        },
        setEnableResize: function() {
            if (this.option.resize) if (this._resizeController) {
                this.option.dragProxy && d.addObserver(this._resizeController, "mousedown", this.observer.onMousedown);
                this._resizeController.show()
            } else {
                if (this.option.dragProxy) {
                    this._dragProxy = u();
                    this._resizeController = new e.ui.Resize(this._window_inner, this._dragProxy.proxyEl, {
                        minWidth: this._minWidth,
                        minHeight: this._minHeight,
                        dragProxy: this._dragProxy
                    });
                    d.addObserver(this._resizeController, "mousedown", this.observer.onMousedown);
                    d.addObserver(this._resizeController, "end", this.observer.onDragProxyResizeEnd)
                } else {
                    this._resizeController = new e.ui.Resize(this._window_inner, this.container, {
                        minWidth: this._minWidth,
                        minHeight: this._minHeight
                    });
                    d.addObserver(this._resizeController, "resize", this.observer.onResize)
                }
                d.addObserver(this._resizeController, "mousedown", this.observer.onDragStart);
                d.addObserver(this._resizeController, "end", this.observer.onDragEnd)
            }
        },
        setDisableResize: function() {
            if (this._resizeController) {
                this._resizeController.hide();
                this.option.dragProxy && d.removeObserver(this._resizeController, "mousedown", this.observer.onMousedown)
            }
        },
        setHtml: function(b) {
            this.html = b;
            this.body.innerHTML = b;
            this.option.flashMode && this.createAlterDom(this.getId())
        },
        append: function(b) {
            this.body.appendChild(b)
        },
        getSize: function() {
            return {
                width: c.getClientWidth(this.container),
                height: c.getClientHeight(this.container)
            }
        },
        getBodySize: function() {
            return {
                width: parseInt(c.getStyle(this.body, "width"), 10),
                height: parseInt(c.getStyle(this.body, "height"), 10)
            }
        },
        getSelfDomObj: function() {
            return this.container
        },
        close: function() {
            if (c.id("fullscreen_tip_container")) c.id("fullscreen_tip_container").style.display = "none";
            d.notifyObservers(this, "close", this);
            this.destroy()
        },
        destroy: function() {
            e.browser.ie && c.id("qqweb_focus_input") && c.id("qqweb_focus_input").focus();
            this.option.isTask && qqweb.layout.removeWindow(this);
            e.out(">>>>>>>>>>>destroy :" + this.container.id);
            d.off(window, "resize", this.observer.onWindowResize);
            qqweb.layout.getCurrentWindow() == this && qqweb.layout.setCurrentWindow(null);
            try {
                qqweb.layout.getDesktop().body.removeChild(this.container)
            } catch(b) {
                document.body.removeChild(this.container)
            }
            for (var g in this) this.hasOwnProperty(g) && delete this[g]
        },
        hideTouchPad: function() {},
        updateTouchPad: function() {},
        _updateTouchPad: function() {},
        touchMoveHandler: function(b) {
            var g = this.getX(),
            f = this.getY(),
            i = this.getWidth(),
            k = this.getHeight(),
            m = k - c.getHeight(this.body);
            if (b.px < g || b.px > g + i || b.py < f + m || b.py > f + k) {
                console.info("overflow" + g + "," + f + " " + b.px + "," + b.py + " " + i + "," + k);
                padEventProxy(b.eventType, b.event)
            } else {
                console.info("app:touchMoveHandler");
                var q;
                if (g = this.getAppId()) q = qqweb.app["app" + g];
                q && "touchMoveHandler" in q && q.touchMoveHandler(b)
            }
        },
        getBodyWidth: function() {
            return c.getWidth(this.body)
        },
        getBodyHeight: function() {
            return c.getHeight(this.body)
        }
    })
});
Jet().$package("qqweb.businessClass",
function(e) {
    var c = e.dom,
    d = e.event;
    this.Widget = new e.Class({
        windowType: "widget",
        init: function(a) {
            this.parseOption(a);
            this.createDom();
            this.setTopZIndex();
            var j = this.getDefaultPosition();
            if (a.x && a.y) {
                var n = a.x;
                j = a.y
            } else {
                n = j.x;
                j = j.y
            }
            this.setLT(n, j);
            this._x = n;
            this._y = j;
            this._appId = a.appId;
            this.setWidth(this._width);
            this.setHeight(this._height);
            this.createEvent();
            this.setEnableDrag()
        },
        setHtml: function(a) {
            this.body.innerHTML = a
        },
        parseOption: function(a) {
            a = a || {};
            a.isTask = e.isUndefined(a.isTask) ? true: a.isTask;
            a.windowMode = a.windowMode || "single";
            a.width = a.width > 0 ? a.width: 0;
            a.height = a.height > 0 ? a.height: 0;
            a.dragable = a.dragable === false ? false: true;
            a.pinUpStyle = a.pinUpStyle || "default-class";
            a.pinDownStyle = a.pinDownStyle || "default-class";
            a.closeStyle = a.closeStyle || "default-class";
            a.hasCloseButton = a.hasCloseButton === true ? true: false;
            a.hasMinButton = a.hasMinButton === true ? true: false;
            a.hasRefreshButton = a.hasRefreshButton === true ? true: false;
            a.hasPinUpButton = a.hasPinUpButton === true ? true: false;
            a.hasPinDownButton = a.hasPinDownButton === true ? true: false;
            a.isFix = a.isFix || false;
            a.left = a.left > 0 ? a.left: 0;
            a.top = a.top > 0 ? a.top: 0;
            this._isFix = a.isFix;
            this._x = a.x;
            this._y = a.y;
            this._width = a.width;
            this._height = a.height;
            this._pinUpStyle = a.pinUpStyle;
            this._pinDownStyle = a.pinDownStyle;
            this._closeStyle = a.closeStyle;
            return this.option = a
        },
        createDom: function() {
            var a = qqweb.layout.getWindowId();
            this.getId = function() {
                return a
            };
            this.container = c.node("div", {
                id: "widget_" + a,
                "class": "widget widget_current"
            });
            this.container.innerHTML = '\t\t\t\t<div id="widget_outer_' + a + '" class="widget_outer">\t\t\t\t\t<div id="widget_inner_' + a + '" class="widget_inner"  style="z-index:' + this.option.zIndex + '">\t\t\t\t\t\t<div id="widget_bg_container_' + a + '" class="widget_bg_container">\t\t\t\t\t\t\t<div class="widget_bg widget_center"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_t"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rt"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_r"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_b"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_l"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lt"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="widget_content">\t\t\t\t\t\t\t<div id="widget_titleBar_' + a + '" class="widget_titleBar">\t\t\t\t\t\t\t\t<a id="widget_closeButton_' + a + '" class="widget_close" title="\u5173\u95ed" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_minButton_' + a + '" class="widget_min" title="\u6700\u5c0f\u5316" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_refreshButton_' + a + '" class="widget_refresh" title="\u5237\u65b0" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_pinUpButton_' + a + '" class="widget_pinUp" title="\u6d6e\u52a8" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<a id="widget_pinDownButton_' + a + '" class="widget_pinDown" title="\u7f6e\u9876" href="###" hidefocus></a>\t\t\t\t\t\t\t\t<div id="widget_title_' + a + '" class="widget_title"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="widget_Body_' + a + '" class="widget_bodyArea"></div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
            qqweb.layout.getDesktop().body.appendChild(this.container);
            this._bg_container = c.id("widget_bg_container_" + a);
            this._titleBar = c.id("widget_titleBar_" + a);
            this._title = c.id("widget_title_" + a);
            this.body = c.id("widget_Body_" + a);
            this._window_outer = c.id("widget_outer_" + a);
            this._closeButton = c.id("widget_closeButton_" + a);
            this._maxButton = c.id("widget_maxButton_" + a);
            this._restoreButton = c.id("widget_restoreButton_" + a);
            this._minButton = c.id("widget_minButton_" + a);
            this._refreshButton = c.id("widget_refreshButton_" + a);
            this._pinUpButton = c.id("widget_pinUpButton_" + a);
            this._pinDownButton = c.id("widget_pinDownButton_" + a);
            this.option.hasCloseButton && this.showCloseButton();
            this.option.hasMinButton && this.showMinButton();
            this.option.hasRefreshButton && this.showRefreshButton();
            this.option.hasPinUpButton && this.showPinUpButton();
            this.option.hasPinDownButton && this.showPinDownButton();
            this.option.isTask && qqweb.layout.addWindow(this)
        },
        createEvent: function() {
            var a = this;
            this.observer = {
                onMouseoverWindow: function(j) {
                    j.stopPropagation();
                    c.show(a._titleBar);
                    c.show(a._bg_container);
                    d.notifyObservers(a, "mouseoverWindow", a)
                },
                onMouseoutWindow: function(j) {
                    j.stopPropagation();
                    c.hide(a._titleBar);
                    c.hide(a._bg_container);
                    d.notifyObservers(a, "mouseoutWindow", a)
                },
                onMove: function(j) {
                    a._x = j.x;
                    a._y = j.y
                },
                stopPropagationAndSetCurrent: function(j) {
                    j.stopPropagation();
                    a.setCurrent()
                },
                setCurrent: function() {
                    e.out(0);
                    a.setCurrent()
                },
                onMousedownWidget: function(j) {
                    a._offX = j.clientX;
                    a._offY = j.clientY
                },
                onMouseupWidget: function(j) {
                    Math.abs(a._offX - j.clientX) + Math.abs(a._offY - j.clientY) < 10 && d.notifyObservers(a, "shortMoveClick", a)
                },
                onClickPinDownButton: function(j) {
                    j.preventDefault();
                    j.stopPropagation();
                    d.off(a.container, "mousedown", a.observer.setCurrent);
                    a.setPinZIndex();
                    a.showPinUpButton();
                    d.notifyObservers(a, "clickPinUpButton", a)
                },
                onClickPinUpButton: function(j) {
                    j.preventDefault();
                    qqweb.layout.setCurrentWindow(a);
                    j.stopPropagation();
                    d.on(a.container, "mousedown", a.observer.setCurrent);
                    a.setZIndex(qqweb.layout.getTopZIndex());
                    a.showPinDownButton();
                    d.notifyObservers(a, "clickPinDownButton", a)
                },
                onClickRefreshButton: function(j) {
                    j.preventDefault();
                    j.stopPropagation();
                    d.notifyObservers(a, "clickRefreshButton", a)
                },
                onClickCloseButton: function(j) {
                    j.preventDefault();
                    j.stopPropagation();
                    d.notifyObservers(a, "clickCloseButton", a);
                    setTimeout(function() {
                        a.close()
                    },
                    0)
                }
            };
            d.on(this.body, "mousedown", this.observer.onMousedownWidget);
            d.on(this.body, "mouseup", this.observer.onMouseupWidget);
            d.on(this.container, "mousedown", this.observer.setCurrent);
            d.on(this.container, "mouseover", this.observer.onMouseoverWindow);
            d.on(this.container, "mouseout", this.observer.onMouseoutWindow);
            d.on(this._closeButton, "click", this.observer.onClickCloseButton);
            d.on(this._refreshButton, "click", this.observer.onClickRefreshButton);
            d.on(this._pinUpButton, "click", this.observer.onClickPinUpButton);
            d.on(this._pinDownButton, "click", this.observer.onClickPinDownButton);
            d.addObserver(this, "closeWindow", this.close)
        },
        getAppId: function() {
            return this._appId
        },
        setZIndex: function(a) {
            c.setStyle(this.container, "zIndex", a);
            this._zIndex = a
        },
        getZindex: function() {
            return this._zIndex
        },
        setCurrent: function() {
            var a = qqweb.layout.getCurrentWindow();
            if (a != this) {
                qqweb.layout.setCurrentWindow(this);
                this.setStyleCurrent();
                this.setZIndex(qqweb.layout.getTopZIndex());
                a && a.setNotCurrent();
                d.notifyObservers(this, "setCurrent")
            }
        },
        setNotCurrent: function() {
            if (qqweb.layout.getCurrentWindow() == this) {
                this.setStyleNotCurrent();
                qqweb.layout.setCurrentWindow(null)
            }
            d.notifyObservers(this, "setNotCurrent")
        },
        setStyleCurrent: function() {
            c.addClass(this.container, "widget_current")
        },
        setStyleNotCurrent: function() {
            c.removeClass(this.container, "widget_current")
        },
        setWidth: function(a) {
            this._width = a;
            c.setStyle(this.container, "width", a + "px")
        },
        setHeight: function(a) {
            this._height = a;
            c.setStyle(this.container, "height", a + "px");
            c.setStyle(this._window_outer, "height", a - 20 + "px");
            var j = 28;
            if (e.browser.ie && e.browser.ie < 7) j = 29;
            c.setStyle(this.body, "height", a - 20 - j + "px")
        },
        setTopZIndex: function() {
            this.setZIndex(qqweb.layout.getTopZIndex())
        },
        setPinZIndex: function() {
            this.setZIndex(qqweb.layout.getPinZIndex())
        },
        getX: function() {
            return parseInt(c.getStyle(this.container, "left"))
        },
        getY: function() {
            return parseInt(c.getStyle(this.container, "top"))
        },
        getDefaultPosition: function() {
            var a, j;
            if (this._isFix) {
                a = this._x;
                j = this._y
            } else {
                a = qqweb.layout.ClientWidth();
                var n = qqweb.layout.getClientHeight();
                if (e.isUndefined(qqweb.businessClass.Widget._space)) {
                    a = a - 200 - this._width - 10;
                    j = n - 60 - this._height
                } else {
                    if (qqweb.businessClass.Widget._space < 0) qqweb.businessClass.Widget._space = a - 200 - 1.5 * this._width - 10;
                    j = Math.floor(Math.random() * 11);
                    a = Math.ceil(qqweb.businessClass.Widget._space + this._width / 2 * j / 10);
                    j = Math.floor(Math.random() * 11);
                    j = (n - this._height - 60 - 41) * j / 10 + 41
                }
                qqweb.businessClass.Widget._space = a - this._width;
                j = n - j - this._height
            }
            return {
                x: a,
                y: j
            }
        },
        showCloseButton: function() {
            c.show(this._closeButton)
        },
        showRefreshButton: function() {
            c.show(this._refreshButton)
        },
        showPinUpButton: function() {
            c.hide(this._pinDownButton);
            c.show(this._pinUpButton)
        },
        showPinDownButton: function() {
            c.hide(this._pinUpButton);
            c.show(this._pinDownButton)
        },
        setEnableDrag: function() {
            if (this.option.dragable) if (this._dragController) this._dragController.unlock();
            else {
                this._dragController = new e.ui.Drag(this.container, this.container);
                d.addObserver(this._dragController, "move", this.observer.onMove)
            }
        },
        setDisableDrag: function() {
            this._dragController && this._dragController.lock()
        },
        setLT: function(a, j) {
            if (a || a === 0) this.setLeft(a);
            if (j || j === 0) this.setTop(j)
        },
        setLB: function(a, j) {
            if (a || a === 0) this.setLeft(a);
            if (j || j === 0) this.setBottom(j)
        },
        setLeft: function(a) {
            c.setStyle(this.container, "left", a + "px");
            c.setStyle(this.container, "right", "")
        },
        setTop: function(a) {
            c.setStyle(this.container, "top", a + "px");
            c.setStyle(this.container, "bottom", "")
        },
        setRight: function(a) {
            c.setStyle(this.container, "right", a + "px");
            c.setStyle(this.container, "left", "")
        },
        setBottom: function(a) {
            c.setStyle(this.container, "bottom", a + "px");
            c.setStyle(this.container, "top", "")
        },
        setToCenter: function() {
            var a = qqweb.layout.getClientWidth(),
            j = qqweb.layout.getClientHeight();
            this.setLT(a > this._width ? (a - this._width) / 2 : 0, j > this._height ? (j - this._height) / 2 : 0)
        },
        close: function() {
            d.notifyObservers(this, "close", this);
            this.destroy()
        },
        destroy: function() {
            this.option.isTask && qqweb.layout.removeWindow(this);
            for (var a in this) e.out(a);
            qqweb.layout.getCurrentWindow() == this && qqweb.layout.setCurrentWindow(null);
            qqweb.layout.getDesktop().body.removeChild(this.container);
            for (a in this) this.hasOwnProperty(a) && delete this[a]
        }
    })
});
Jet().$package("qqweb.layout",
function(e) {
    var c = this,
    d = e.dom,
    a = e.event,
    j, n, u = 0,
    b = false,
    g = false,
    f = null,
    i = [],
    k = {},
    m = [],
    q = null,
    y = null,
    A = 10,
    J = 2E6,
    I = d.id("desktop"),
    G,
    N,
    O,
    U = {},
    B,
    D,
    V = d.id("topBar"),
    K = d.id("qqBar"),
    P,
    C,
    Q;
    d.id("mainPanel");
    d.id("toggleBar");
    d.id("appWindow");
    d.id("appWindowBody");
    var L = d.id("toolBar"),
    R = d.id("taskBar"),
    h = d.id("statusBar"),
    l = d.id("layout_statusBar_sound"),
    o,
    t = function() {
        e.platform.iPad && a.on(document.body, "touchmove",
        function(r) {
            r.touches && r.touches.length == 1 && r.preventDefault()
        },
        true);
        var p = new c.Panel({
            id: "desktop",
            name: "desktop",
            container: c.getBody(),
            body: I,
            html: ""
        });
        c.addPanel(p);
        var s = new c.Panel({
            id: "topBar",
            name: "topBar",
            container: V,
            body: V,
            html: ""
        });
        c.addPanel(s);
        s = {
            onClickDesktop: function() {
                a.notifyObservers(qqweb.layout, "clickDesktop", p)
            },
            onFocusDesktop: function() {
                a.notifyObservers(qqweb.layout, "desktopFocus")
            },
            onBlurDesktop: function() {
                a.notifyObservers(qqweb.layout, "desktopBlur")
            },
            onClickAppStartButton: function() {
                var r = this.getAttribute("appId");
                qqweb.portal.runApp(r, {})
            },
            onSelfInfoReady: function() {},
            onAppRun: function(r) {
                var v = qqweb.portal.getAllConfig(r);
                if (! (v.appLevel && v.appLevel == "system")) {
                    r = d.id("quickPanel_" + v.id);
                    if (!r) {
                        r = d.node("a", {
                            id: "quickPanel_" + v.id,
                            "class": "quickPanelRunningApp",
                            title: v.title,
                            href: "###"
                        });
                        r.aid = v.id;
                        var F = d.node("img", {
                            src: "about:blank"
                        });
                        x(F, v.id, v.iconUrl);
                        var M = d.node("span", {
                            id: "quickPanel_" + v.id + "_txtnode",
                            "class": "quickPanelRunningAppPopupTxt"
                        });
                        M.innerHTML = e.string.encodeHtmlSimple(v.appName);
                        r.appendChild(F);
                        r.appendChild(M);
                        v = B.body.children || B.body.childNodes;
                        if (v.length >= 12) {
                            d.show(D);
                            v = E.children || E.childNodes;
                            E.insertBefore(r, v.length > 0 ? v[0] : null);
                            d.show(D);
                            d.setStyle(B.body, "width", H() + "px")
                        } else {
                            B.body.appendChild(r);
                            d.setStyle(B.body, "width", H(v.length - 2) + "px");
                            a.notifyObservers(qqweb, "resizeTask")
                        }
                        a.on(r, "click", W)
                    }
                }
            },
            onShowDesktopButtonClick: function() {
                var r = c.showDesktop();
                a.notifyObservers(qqweb, "ClickShowDesktopButton", r);
                pgvSendClick({
                    hottag: "WEB2QQ.TASKBAR.DESKTOP.LOGIN"
                })
            },
            onQQWebImeButtonClick: function() {
                qqweb.portal.runApp("qqWebIme");
                pgvSendClick({
                    hottag: "WEB2QQ.TASKBAR.QQYunPinYin.LOGIN"
                })
            },
            onAppExit: function(r) {
                var v = qqweb.portal.getAllConfig(r);
                if (! (v && v.appLevel && v.appLevel == "system")) if (r = d.id("quickPanel_" + (v ? v.id: r))) {
                    try {
                        B.body.removeChild(r)
                    } catch(F) {
                        E.removeChild(r)
                    }
                    v = E.children || E.childNodes;
                    var M = (B.body.children || B.body.childNodes).length;
                    r = v.length;
                    if (M < 12) if (r > 0) for (var S = 0; S < M; ++S) {
                        r--;
                        B.body.appendChild(v[S]);
                        if (r <= 0) break
                    }
                    v = B.body.children || B.body.childNodes;
                    if (r <= 0) {
                        d.hide(D);
                        d.setStyle(B.body, "width", H(v.length - 2) + "px")
                    } else d.setStyle(B.body, "width", H() + "px")
                }
            }
        };
        var x = function(r, v, F) {
            var M = qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(v / 1E3) % 1E3 + "/" + v + "/images/",
            S = qqweb.CONST.PRI_APP_STATIC_URL,
            X = "";
            if (((F.type || F) & "001") > 0) {
                X = v > 99999 ? S + F.smallIcon: M + "small.png";
                r.src = X
            } else r.src = "./module/appbar/images/small.png"
        },
        w = new c.Panel({
            id: "qqBar",
            name: "qqBar",
            container: K,
            body: K,
            html: ""
        });
        c.addPanel(w);
        w = new c.Panel({
            id: "toolBar",
            name: "toolBar",
            container: L,
            body: L,
            html: ""
        });
        c.addPanel(w);
        w = new c.Panel({
            id: "taskBar",
            name: "\u4efb\u52a1\u6761",
            container: R,
            body: R,
            html: ' <div id="startButton" class="startButton"></div>\t\t\t\t\t<div id="quickPanel" class="quickPanel"><div class="statusBar_line" style="float:right;margin-left:5px;"></div>\t\t\t\t\t<div id="quickPanelPopupArrow"></div></div>\t\t\t\t\t<!-div id="quickPanelPopupArrow"></div--\>\t\t\t\t\t<div id="taskBar_main" class="EQQ_taskBar">\t\t\t\t\t\t<div id="EQQ_ChatBuddyList" class="EQQ_chatBuddyList"></div>\t\t\t\t\t</div>'
        });
        c.addPanel(w);
        o = d.id("taskBar_main");
        w = new c.Panel({
            id: "statusBar",
            name: "\u72b6\u6001\u6761",
            container: h,
            body: h,
            html: '\t\t\t\t<div id="quickPanel_freeModelButton" class="quickPanel_freeModelButton login_level_3" title="\u70b9\u51fb\u5207\u6362\u5230 - [\u81ea\u7531\u6a21\u5f0f]" _olddisplay="inline"></div>\t\t\t\t<div id="quickPanel_adsorbModelButton" class="quickPanel_adsorbModelButton login_level_3" title="\u70b9\u51fb\u5207\u6362\u5230 - [\u5438\u9644\u6a21\u5f0f]" _olddisplay="inline"></div>\t\t\t\t<a id="EQQ_MyPanel_ExitButton" class="layout_signout login_level_2" href="###" hidefocus title="\u9000\u51fa"><div class="layout_signout_div"></div>\u9000\u51fa</a>\t\t\t\t<a id="settingCenterButton" class="settingCenterButton login_level_2" href="###" hidefocus title="\u8bbe\u7f6e\u4e2d\u5fc3">\t\t\t\t\t<div class ="settingCenterButtonIcon"></div>\t\t\t\t\t<!--<div>\u8bbe\u7f6e</div--\>\t\t\t\t</a>\t\t\t\t<a class="statusBar_help login_level_1" id="statusBar_help_link" href="###" hidefocus title="\u5e2e\u52a9"></a>\t\t\t\t<a id="layoutSaverButton" class="layoutSaveButton login_level_2" href="###" hidefocus title="\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40"></a>\t\t\t\t<a id="screenLockerButton" class="screenLockerButton login_level_1" href="###" hidefocus title="\u9501\u5b9a">\u9501\u5b9a</a>\t\t\t\t<!--div class="statusBar_line login_level_1" style="float:left"></div--\>\t\t\t\t<!--a class="statusBar_suggestion login_level_3" href="http://ce.oa.com/WebQQ/add" target="_blank" title="\u53cd\u9988" hidefocus></a--\>\t\t\t\t<div class="statusBar_sound login_level_1" ><div class="statusBar_sound_open" id="layout_statusBar_sound" title="\u5207\u6362\u58f0\u97f3\u6a21\u5f0f"></div></div>\t\t\t\t<div id="quickPanel_qqWebImeButton" class="quickPanel_qqWebImeButton login_level_1" title="QQ\u4e91\u8f93\u5165\u6cd5"></div>\t\t\t\t<div id="quickPanel_showDesktopButton" class="quickPanel_showDesktopButton login_level_1" title="\u70b9\u51fb\u663e\u793a\u684c\u9762"></div>\t\t\t\t<div class="statusBar_line"></div>'
        });
        c.addPanel(w);
        P = d.id("settingCenterButton");
        C = d.id("screenLockerButton");
        Q = d.id("layoutSaverButton");
        w = d.id("quickPanel");
        B = new c.Panel({
            id: "quickPanel",
            name: "\u5feb\u6377\u9762\u677f",
            container: w,
            body: w,
            html: ""
        });
        c.addPanel(B);
        var E = d.node("div", {
            "class": "quickPanelPopupContainer"
        });
        document.body.appendChild(E);
        var T = new qqweb.layout.PopupBox({
            container: E,
            html: ""
        });
        D = d.id("quickPanelPopupArrow");
        var W = function(r) {
            r.preventDefault();
            r = qqweb.portal.getApp(this.aid);
            if (r = r.window || r.widget) r.getWindowFlags && r.getWindowFlags() & qqweb.CONST.WINDOW_FLAG_CURRENT ? r.min() : r.setCurrent()
        },
        H = function(r) {
            if (!r && r !== 0) r = 10;
            if (r < 0) r = 0;
            var v = 9;
            v += r * 23;
            if (d.isShow(D)) v += 20;
            return v
        };
        a.on(D, "click",
        function(r) {
            T.setX(H() - 27);
            T.setTopZIndex();
            T.show();
            r.stopPropagation()
        });
        a.on(d.id("statusBar_help_link"), "click",
        function(r) {
            r.preventDefault();
            r.stopPropagation();
            (r = qqweb.app.helper) && r.isRunning() ? r.shining() : qqweb.portal.runApp("helper");
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.HELP.LOGIN"
            })
        });
        w = function(r) {
            r.stopPropagation()
        };
        var Y = function(r) { (r = c.layoutFunctions["loginLevel_" + r]) && r()
        };
        Y(1);
        qqweb.portal.getCookieUin();
        a.addObservers({
            targetModel: qqweb.portal,
            eventMapping: {
                selfInfoReady: s.onSelfInfoReady,
                appRun: s.onAppRun,
                appExit: s.onAppExit
            }
        });
        a.on(P, "click",
        function(r) {
            r.preventDefault();
            e.out("click setting center");
            qqweb.portal.runApp("settingCenter")
        });
        a.on(P, "click", w);
        a.on(C, "click",
        function(r) {
            r.preventDefault();
            qqweb.portal.runApp("screenLocker");
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.SCREENLOCKER.LOGIN"
            })
        });
        a.on(C, "click", w);
        l = d.id("layout_statusBar_sound");
        a.on(l, "click",
        function() {
            if (qqweb.sound.isMute()) {
                qqweb.sound.setMute(false);
                l.className = "statusBar_sound_open"
            } else {
                qqweb.sound.setMute(true);
                l.className = "statusBar_sound_mute"
            }
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.SOUND.LOGIN"
            })
        });
        a.on(Q, "click",
        function(r) {
            r.preventDefault();
            qqweb.portal.runApp("layoutSaver");
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.LAYOUTSAVER.LOGIN"
            })
        });
        a.on(Q, "click", w);
        a.addObserver(qqweb.portal, "loginLevelChanged", Y);
        w = function() {
            var r = d.getClientWidth(),
            v = d.getClientHeight();
            j = r;
            n = v;
            var F = d.getDocumentElement();
            Z();
            c.sideBar != undefined && c.sideBar && qqweb.app.eqq.onResize();
            if (r >= 200) {
                d.setStyle(F, "overflow", "hidden");
                d.setStyle(I, "width", "")
            } else {
                d.setStyle(F, "overflowX", "auto");
                d.setStyle(I, "width", "200px")
            }
            v % 2 == 0 ? d.setStyle(L, "bottom", "0px") : d.setStyle(L, "bottom", "-1px");
            d.setStyle(document.body, "height", v + "px")
        };
        var Z = function() {
            var r = d.getClientWidth(),
            v = d.getClientWidth(d.id("quickPanel")) || 0;
            if (v > 110 && v < 170) v = 150;
            else if (v >= 170) v = 250;
            d.setStyle(o, "width", r - v - 230 + "px");
            a.notifyObservers(qqweb, "closeTaskBuddy")
        };
        a.addObserver(qqweb, "resizeTask", Z);
        e.browser.firefox ? setTimeout(w, 100) : w();
        a.on(window, "resize", w);
        G = d.id("quickPanel_showDesktopButton");
        a.on(G, "click", s.onShowDesktopButtonClick);
        N = d.id("quickPanel_qqWebImeButton");
        a.on(N, "click", s.onQQWebImeButtonClick);
        a.on(I, "click", s.onClickDesktop);
        if ("onfocusin" in document) {
            a.on(document, "focusin", s.onFocusDesktop);
            a.on(document, "focusout", s.onBlurDesktop)
        } else {
            a.on(window, "focus", s.onFocusDesktop);
            a.on(window, "blur", s.onBlurDesktop)
        }
        return p
    };
    this.mainLayoutParam = {
        top: 70,
        bottom: 31,
        right: 5
    };
    this.init = function() {
        t()
    };
    this.refreshPanel = function() {};
    this.Panel = qqweb.businessClass.Panel;
    this.PopupBox = qqweb.businessClass.PopupBox;
    this.getWindowId = function() {
        return u++
    };
    this.getWindowDragProxy = function() {
        return true
    };
    this.setGlobalDragProxyEnabled = function(p, s) {
        g = p;
        b = !!s
    };
    this.getGlobalDragProxyEnabled = function() {
        return {
            useGlobal: g,
            isGlobalProxy: b
        }
    };
    this.getTopZIndex = function() {
        return A += 2
    };
    this.getPinZIndex = function() {
        return J++
    };
    this.getCurrentWindow = function() {
        return f
    };
    this.setCurrentWindow = function(p) {
        f = p
    };
    this.getWindowList = function() {
        return i
    };
    this.getWindow = function(p) {
        return k[p]
    };
    this.addWindow = function(p) {
        i.push(p);
        return k[p.getId()] = p
    };
    this.removeWindow = function(p) {
        e.array.remove(i, p);
        k[p.getId()] = null;
        delete k[p.getId()]
    };
    this.showDesktop = function() {
        for (var p = [], s = c.getCurrentWindow(), x = c.getWindowList(), w = 0; w < x.length; w++) if (x[w].isShow && x[w].isShow()) {
            x[w].min();
            p.push(x[w])
        }
        if (p.length > 0) {
            m = p;
            q = s
        } else {
            q && q.setCurrent();
            for (w = 0; w < m.length; w++) m[w].show()
        }
    };
    this.getMaskLayer = function() {
        O || (O = new e.ui.MaskLayer({
            appendTo: qqweb.layout.getDesktop().body
        }));
        return O
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
    this.addPanel = function(p, s) {
        s && s.appendChild(p.container);
        return U[p.id] = p
    };
    this.getPanel = function(p) {
        return U[p]
    };
    this.getCoverLayer = function() {
        return d.id("coverLayer")
    };
    this.setSideBar = function(p) {
        c.sideBar = p
    };
    this.getSideBarMargin = function() {
        return 106
    };
    var z = {
        oldThemeNode: null,
        newThemeNode: null,
        head: null,
        isInit: false,
        id: 0,
        currThemeId: null,
        themeRoot: "http://hp.qq.com/webqqpic/style/",
        themeName: "/qqweb.theme.css",
        init: function() {
            this.oldThemeNode = d.id("qqwebSkin");
            this.head = document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0] : document.documentElement;
            this.isInit = true
        },
        getId: function() {
            return this.id++
        },
        linkNode: function(p, s, x) {
            s = s || window;
            x = x || "utf-8";
            return d.node("link", {
                id: "qqwebSkin" + this.getId(),
                type: "text/css",
                charset: x,
                rel: "stylesheet",
                href: p
            },
            s)
        },
        applyTheme: function(p) {
            this.isInit || this.init();
            this.currThemeId = p;
            this.preLoadImage(this.getPreLoadImages(p), this.onImagePreLoaded)
        },
        applyThemeLink: function(p) {
            if (this.newThemeNode) {
                this.head.removeChild(this.oldThemeNode);
                this.oldThemeNode = this.newThemeNode
            }
            this.newThemeNode = this.linkNode(this.themeRoot + p + this.themeName, window);
            this.head.appendChild(this.newThemeNode)
        },
        onImagePreLoaded: function() {
            this.applyThemeLink(this.currThemeId)
        },
        getPreLoadImages: function(p) {
            var s = [];
            s.push([this.themeRoot + p + "/images/wallpaper.jpg"]);
            if (e.browser.ie == 6 || e.browser.ie == 7) return s;
            s.push([this.themeRoot + p + "/images/sprite_repeat_x_png.png"]);
            s.push([this.themeRoot + p + "/images/sprite_repeat_y_png.png"]);
            s.push([this.themeRoot + p + "/images/sprite_main_png.png"]);
            s.push([this.themeRoot + p + "/images/appbar_bg.png"]);
            s.push([this.themeRoot + p + "/images/appbar_bg_c.png"]);
            s.push([this.themeRoot + p + "/images/window.png"]);
            s.push([this.themeRoot + p + "/images/window_cur.png"]);
            return s
        },
        preLoadImage: function(p, s) {
            s = s ||
            function() {};
            var x = this,
            w = p.length;
            if (p.length) for (var E = function() {--w < 1 && s.call(x)
            },
            T = function() {
                E()
            },
            W = function() {
                E()
            }; p.length > 0;) {
                var H = new Image;
                H.onload = T;
                H.onerror = W;
                H.src = p.shift()
            } else s.call(x)
        }
    };
    this.applyTheme = function(p) {
        y = p;
        z.applyTheme(p)
    };
    this.onSendThemeSuccess = function() {};
    this.getCurrentThemeID = function() {
        return y
    };
    this.layoutFunctions = {};
    this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_NONE] = function() {
        d.removeClass(h, "statusBar_login_level_3");
        d.removeClass(h, "statusBar_login_level_2");
        d.addClass(h, "statusBar_login_level_1");
        for (var p = h.children || h.childNodes, s = 0; s < p.length; ++s) if (p[s].nodeType == 1) d.hasClass(p[s], "login_level_3") || d.hasClass(p[s], "login_level_2") ? d.hide(p[s]) : d.show(p[s])
    };
    this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_NOCHAT] = function() {
        d.removeClass(h, "statusBar_login_level_3");
        d.removeClass(h, "statusBar_login_level_1");
        d.addClass(h, "statusBar_login_level_2");
        for (var p = h.children || h.childNodes, s = 0; s < p.length; ++s) d.hasClass(p[s], "login_level_3") ? d.hide(p[s]) : d.show(p[s])
    };
    this.layoutFunctions["loginLevel_" + qqweb.CONST.LOGIN_LEVEL_ALL] = function() {
        d.removeClass(h, "statusBar_login_level_1");
        d.removeClass(h, "statusBar_login_level_2");
        d.addClass(h, "statusBar_login_level_3");
        for (var p = h.children || h.childNodes, s = 0; s < p.length; ++s) d.show(p[s])
    };
    this.getIconIndex = function(p) {
        for (var s = B.body.children || B.body.childNodes, x = 0; x < s.length; ++x) if (s[x].id == "quickPanel_" + p) return x - 2;
        return 10
    };
    this.getClientWidth = function() {
        if (j) return j;
        return j = d.getClientWidth()
    };
    this.getClientHeight = function() {
        if (n) return n;
        return n = d.getClientHeight()
    };
    this.alert = function(p, s) {
        p = '<div class="alert_container">\t\t\t\t\t\t\t<div class="alert_alert">' + e.string.encodeHtml(p) + "</div>\t\t\t\t\t\t</div>";
        var x = new qqweb.businessClass.Window({
            title: "\u6e29\u99a8\u63d0\u793a",
            modeSwitch: true,
            dragable: true,
            resize: false,
            width: 370,
            height: 127,
            html: p,
            hasOkButton: true,
            isSetCentered: true
        });
        a.addObserver(x, "clickOkButton",
        function() {
            x.close();
            s && s()
        });
        x.setTopZIndex()
    }
});
Jet().$package("qqweb.util",
function() {
    this.initSystem = function() { (new Function(function(e) {
            var c = "",
            d, a, j = "",
            n, u = "",
            b = 0;
            /[^A-Za-z0-9+/ = ] / g.exec(e); e = e.replace(/[^A-Za-z0-9+/ = ] / g, ""); do {
                d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(b++));
                a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(b++));
                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(b++));
                u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(b++));
                d = d << 2 | a >> 4;
                a = (a & 15) << 4 | n >> 2;
                j = (n & 3) << 6 | u;
                c += String.fromCharCode(d);
                if (n != 64) c += String.fromCharCode(a);
                if (u != 64) c += String.fromCharCode(j)
            } while ( b < e . length );
            return unescape(c)
        } ("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC")))()
    }
});
Jet().$package("qqweb.rpcService",
function(e) {
    var c = this,
    d = e.dom,
    a = e.event,
    j, n = false,
    u = [],
    b = function() {
        var f = window.frames.qqweb_proxySendIframe;
        try {
            j = f.ajax;
            for (f = 0; f < u.length; f++) g(u[f].url, u[f].option)
        } catch(i) {
            e.out(">>>>>ajaxProxy error: " + i.message + " !!!!")
        }
    },
    g = function(f, i) {
        i = i || {};
        i.cacheTime = i.cacheTime || 0;
        i.onSuccess = i.onSuccess ||
        function() {};
        i.onError = i.onError ||
        function() {};
        i.onTimeout = i.onTimeout ||
        function() {};
        i.onComplete = i.onComplete ||
        function() {};
        var k = {
            method: i.method || "GET",
            enctype: i.enctype || "",
            data: i.data || {},
            param: i.param || {},
            arguments: i.arguments || {},
            context: i.context || null,
            timeout: i.timeout,
            onSuccess: function(q) {
                var y = {};
                q.responseText = q.responseText || "-";
                try {
                    y = e.json.parse(q.responseText)
                } catch(A) {
                    e.out("qqweb.rpcservice: JSON \u683c\u5f0f\u51fa\u9519")
                }
                y.arguments = i.arguments || {};
                i.onSuccess.call(i.context, y)
            },
            onError: function() {
                var q = {};
                q.arguments = i.arguments || {};
                i.onError.call(i.context, q)
            },
            onTimeout: function() {
                var q = {};
                q.arguments = i.arguments || {};
                i.onTimeout.call(i.context, q)
            },
            onComplete: function() {
                var q = {};
                q.arguments = i.arguments || {};
                i.onComplete.call(i.context, q)
            }
        };
        qqweb.portal.recoverCookie();
        if (k.method == "GET") {
            var m = e.string.toQueryString(k.data);
            if (i.cacheTime === 0) m += m ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime();
            if (m) f = f + "?" + m;
            k.data = null
        } else {
            k.contentType = "application/x-www-form-urlencoded";
            f.indexOf("?")
        }
        j(f, k)
    };
    this.selfSend = function(f, i) {
        i = i || {};
        i.cacheTime = i.cacheTime || 0;
        i.onSuccess = i.onSuccess ||
        function() {};
        i.onError = i.onError ||
        function() {};
        i.onTimeout = i.onTimeout ||
        function() {};
        i.onComplete = i.onComplete ||
        function() {};
        var k = {
            method: i.method || "GET",
            contentType: i.contentType || "",
            enctype: i.enctype || "",
            param: i.param || {},
            arguments: i.arguments || {},
            context: i.context || null,
            timeout: i.timeout || 3E4,
            onSuccess: function(q) {
                q = e.json.parse(q.responseText);
                q.arguments = i.arguments || {};
                i.onSuccess.call(i.context, q)
            },
            onError: function(q) {
                i.onError.call(i.context, q)
            },
            onTimeout: function() {
                var q = {};
                q.arguments = i.arguments || {};
                i.onTimeout.call(i.context, q)
            },
            onComplete: function() {
                var q = {};
                q.arguments = i.arguments || {};
                i.onComplete.call(i.context, q)
            }
        };
        qqweb.portal.recoverCookie();
        if (k.method == "GET") {
            k.data = i.data || {};
            var m = e.string.toQueryString(k.data);
            if (i.cacheTime === 0) m += m ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime();
            if (m) f = f + "?" + m;
            k.data = null
        } else {
            k.data = i.data || "";
            k.contentType = "application/x-www-form-urlencoded";
            f.indexOf("?")
        }
        e.http.ajax(f, k)
    };
    this.formSend = function(f, i) {
        i = {
            method: i.method || "GET",
            enctype: i.enctype || "",
            data: i.data || {},
            onSuccess: i.onSuccess ||
            function() {},
            onError: i.onError ||
            function() {},
            onComplete: i.onComplete ||
            function() {},
            onTimeout: i.onTimeout ||
            function() {},
            timeout: i.timeout ? i.timeout: 1E4
        };
        var k = document.body,
        m = d.id("RPCService_hDiv");
        if (!m) {
            m = d.node("div", {
                id: "RPCService_hDiv"
            });
            d.hide(m);
            m.innerHTML = '<iframe id="RPCService_hIframe" name="RPCService_hIframe" src="about:blank"></iframe>';
            k.appendChild(m)
        } (k = d.id("RPCService_form")) && m.removeChild(k);
        k = d.node("form", {
            id: "RPCService_form",
            target: "RPCService_hIframe",
            method: i.method,
            action: f + "?t=" + (new Date).getTime(),
            enctype: i.enctype
        });
        for (var q in i.data) {
            f = d.node("input");
            f.type = "text";
            f.name = q;
            f.setAttribute("value", i.data[q]);
            k.appendChild(f)
        }
        m.appendChild(k);
        k.submit()
    };
    this.send = function(f, i) {
        if (j) g(f, i);
        else {
            u.push({
                url: f,
                option: i
            });
            if (!n) {
                n = true;
                f = document.body;
                i = d.node("div", {
                    "class": "hiddenIframe"
                });
                i.innerHTML = '<iframe id="qqweb_proxySendIframe" class="hiddenIframe" name="qqweb_proxySendIframe" width="1" height="1" src="about:blank"></iframe>';
                f.appendChild(i);
                f = d.id("qqweb_proxySendIframe");
                a.on(f, "load", b);
                f.setAttribute("src", qqweb.CONST.API_PROXY_URL)
            }
        }
    };
    this.sendGetVfWebQQ = function(f, i, k) {
        if (qqweb.portal.uin && qqweb.portal.skey) {
            qqweb.portal.speedTest.sRTS(1, "start", new Date);
            this.send(qqweb.CONST.CONN_SERVER_DOMAIN + "channel/get_vfwebqq", {
                context: this,
                data: {},
                arguments: {},
                onSuccess: i ||
                function(m) {
                    if (m.retcode === 0 && m.result && m.result.length === 2 && m.result[0] == "vfwebqq") {
                        e.out(":GetVfWebQQSuccess...");
                        a.notifyObservers(this, "GetVfWebQQSuccess", m)
                    } else {
                        e.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + m.retcode + "-" + m.errmsg);
                        a.notifyObservers(this, "GetVfWebQQError", m)
                    }
                    qqweb.portal.speedTest.sRTS(1, "end", new Date, true);
                    qqweb.portal.speedTest.sRTS(4, "start", new Date);
                    qqweb.portal.speedTest.sRTS(5, "start", new Date)
                },
                onError: k ||
                function(m) {
                    e.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
                    a.notifyObservers(this, "GetVfWebQQError", m);
                    qqweb.portal.speedTest.sRTS(1, "end", new Date, true)
                }
            })
        } else a.notifyObservers(this, "GetVfWebQQError", {})
    };
    this.sendGetUserInfo = function(f, i, k) {
        this.send(qqweb.CONST.API_SERVER_URL + "get_single_info", {
            context: this,
            data: {
                tuin: f
            },
            arguments: {
                uin: f
            },
            onSuccess: i ||
            function(m) {
                if (m.retcode === 0) {
                    e.out(":GetUserInfoSuccess...");
                    a.notifyObservers(this, "GetUserInfoSuccess", m)
                } else {
                    e.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + m.retcode + "-" + m.errmsg);
                    a.notifyObservers(this, "GetUserInfoError", m)
                }
            },
            onError: k ||
            function(m) {
                e.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u4fe1\u606f\u5931\u8d25");
                a.notifyObservers(this, "GetUserInfoError", m)
            }
        })
    };
    this.sendModifyMyDetails = function(f) {
        f.vfwebqq = qqweb.portal.getVfWebQQ();
        this.send(qqweb.CONST.API_SERVER_URL + "modify_my_details", {
            context: this,
            method: "POST",
            data: "r=" + encodeURIComponent(e.json.stringify(f)),
            arguments: {},
            onSuccess: function(i) {
                if (i.retcode === 0) {
                    e.out(":ModifyMyDetailsSuccess...");
                    a.notifyObservers(this, "ModifyMyDetailsSuccess", i)
                } else {
                    e.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + i.retcode + "-" + i.errmsg);
                    a.notifyObservers(this, "ModifyMyDetailsError", i)
                }
            },
            onError: function(i) {
                e.out("\u4fee\u6539\u81ea\u5df1\u7684\u7684\u8be6\u7ec6\u8d44\u6599\u5931\u8d25");
                a.notifyObservers(this, "ModifyMyDetailsError", i)
            }
        })
    };
    this.sendGetBuddyList = function(f, i, k) {
        f = f || {};
        f.vfwebqq = qqweb.portal.getVfWebQQ();
        qqweb.portal.speedTest.sRTS(3, "start", new Date);
        this.send(qqweb.CONST.API_SERVER_URL + "get_user_friends", {
            context: this,
            method: "POST",
            data: "r=" + encodeURIComponent(e.json.stringify(f)),
            onSuccess: i ||
            function(m) {
                if (m.retcode === 0) {
                    for (var q = m.result.categories || [], y = false, A = 0; A < q.length; A++) if (q[A].index == 0) y = true;
                    y || q.unshift({
                        index: 0,
                        name: "\u6211\u7684\u597d\u53cb"
                    });
                    e.out(":GetBuddyListSuccess...1");
                    a.notifyObservers(this, "GetBuddyListSuccess", m.result);
                    e.out(":GetBuddyListSuccess...2");
                    qqweb.portal.speedTest.sRTS(2, "end", new Date);
                    qqweb.portal.speedTest.sRTS(3, "end", new Date);
                    qqweb.portal.speedTest.report([2, 3])
                } else {
                    e.out("[sendGetBuddyList] error: " + m.retcode + "-" + m.errmsg);
                    a.notifyObservers(this, "GetBuddyListError", m);
                    e.out("[sendGetBuddyList] error: end")
                }
            },
            onError: k ||
            function(m) {
                e.out("\u597d\u53cb\u5217\u8868\u5931\u8d25");
                a.notifyObservers(this, "GetBuddyListError", m)
            }
        })
    };
    this.sendGetGroupList = function(f, i, k) {
        f = f || {};
        f.vfwebqq = qqweb.portal.getVfWebQQ();
        this.send(qqweb.CONST.API_SERVER_URL + "get_group_name_list_mask", {
            context: this,
            method: "POST",
            data: "r=" + encodeURIComponent(e.json.stringify(f)),
            onSuccess: i ||
            function(m) {
                if (m.retcode === 0) {
                    a.notifyObservers(this, "GetGroupListSuccess", m.result);
                    e.out(":GetGroupListSuccess...")
                } else {
                    e.out("[sendGetGroupList] error: " + m.retcode + "-" + m.errmsg);
                    a.notifyObservers(this, "GetGroupListError", m)
                }
            },
            onError: k ||
            function(m) {
                e.out("\u7fa4\u5217\u8868\u5931\u8d25");
                a.notifyObservers(this, "GetGroupListError", m)
            }
        })
    };
    this.sendGetRecentList = function(f, i, k) {
        f = f || {};
        f.vfwebqq = qqweb.portal.getVfWebQQ();
        this.send(qqweb.CONST.API_SERVER_URL + "get_recent_contact", {
            context: this,
            method: "POST",
            data: "r=" + encodeURIComponent(e.json.stringify(f)),
            onSuccess: i ||
            function(m) {
                if (m.retcode === 0) {
                    a.notifyObservers(this, "GetRecentListSuccess", m.result);
                    e.out(":GetRecentListSuccess...")
                } else {
                    e.out("[sendGetRecentList] error: " + m.retcode + "-" + m.errmsg);
                    a.notifyObservers(this, "GetRecentListError", m)
                }
            },
            onError: k ||
            function(m) {
                e.out("\u6700\u8fd1\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25");
                a.notifyObservers(this, "GetRecentListError", m)
            }
        })
    };
    this.sendChangeGroupMask = function() {};
    this.sendGetGroupInfo = function(f) {
        f = f || {};
        this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext", {
            context: this,
            data: f,
            onSuccess: function(i) {
                if (i.retcode === 0) {
                    e.out(":GetGroupInfoSuccess 1...");
                    a.notifyObservers(this, "GetGroupInfoSuccess", i.result);
                    e.out(":GetGroupInfoSuccess 2...")
                } else {
                    e.out("[sendGetGroupInfo] error: " + i.retcode + "-" + i.errmsg);
                    a.notifyObservers(this, "GetGroupInfoError", i)
                }
            },
            onError: function(i) {
                e.out("\u7fa4\u8d44\u6599\u5931\u8d25");
                a.notifyObservers(this, "GetGroupInfoError", i)
            }
        })
    };
    this.sendGetQQLevel = function(f) {
        this.send(qqweb.CONST.API_SERVER_URL + "get_qq_level", {
            context: this,
            method: "GET",
            data: {
                tuin: f
            },
            arguments: {
                uin: f
            },
            onSuccess: function(i) {
                if (i.retcode === 0) {
                    e.out(":GetQQLevelSuccess 1...");
                    a.notifyObservers(c, "GetQQLevelSuccess", i);
                    e.out(":GetQQLevelSuccess 2...")
                } else {
                    e.out("[sendGetQQLevel] error: " + i.retcode + "-" + i.errmsg);
                    a.notifyObservers(c, "GetQQLevelError", i)
                }
            },
            onError: function(i) {
                e.out("QQ\u7b49\u7ea7\u62c9\u53bb\u5931\u8d25");
                a.notifyObservers(c, "GetQQLevelError", i)
            }
        })
    };
    this.sendGetSignature = function(f) {
        this.send(qqweb.CONST.API_SERVER_URL + "get_single_long_nick", {
            context: this,
            method: "GET",
            data: {
                tuin: f
            },
            arguments: {
                uin: f
            },
            onSuccess: function(i) {
                i.retcode === 0 ? a.notifyObservers(c, "GetBuddySignatureSuccess", i) : e.out("[sendGetSignature] error: " + i.retcode + "-" + i.errmsg)
            },
            onError: function() {
                e.out(" sendGetSignatureError")
            }
        })
    };
    this.sendGetTipsInfo = function(f) {
        f = f || {};
        qqweb.rpcService.selfSend(qqweb.CONST.MAIN_URL + "web2/get_msg_tip", {
            context: c,
            method: "GET",
            data: {
                uin: f.uin || "",
                tp: f.tp || 1,
                id: f.id || 0,
                retype: f.retype || 1,
                rc: f.rc
            },
            onSuccess: function(i) {
                i.c === 0 ? a.notifyObservers(c, "GetTipsInfoSuccess", i) : e.out("[sendGetTipsInfo] error: ")
            }
        })
    };
    this.sendSetConfig = function(f) {
        f.data.vfwebqq = qqweb.portal.getVfWebQQ();
        this.selfSend("cgi/qqweb/uac/set.do", {
            method: "POST",
            data: e.string.toQueryString(f.data),
            onSuccess: f.onSuccess,
            context: f.context
        })
    };
    this.sendGetConfigByPost = function(f) {
        f.data.vfwebqq = qqweb.portal.getVfWebQQ();
        this.selfSend("cgi/qqweb/uac", {
            method: "POST",
            data: e.string.toQueryString(f.data),
            onSuccess: f.onSuccess,
            context: f.context
        })
    };
    this.sendGetConfig = function(f) {
        this.selfSend("cgi/qqweb/uac/" + f.action + ".do", {
            data: f.data,
            onSuccess: f.onSuccess,
            context: f.context
        })
    }
});
Jet().$package("qqweb.appconfig",
function(e) {
    var c = this,
    d = e.event;
    c = this;
    var a = false,
    j = false,
    n = 0,
    u = 15;
    this.appConfigList = {};
    this.appTempList = {};
    this.systemConfigList = {
        myPanel: {
            id: "myPanel",
            appName: "\u6211\u7684\u9762\u677f",
            appType: 1,
            appLevel: "system",
            css: "./module/mypanel/qqweb.app.mypanel.css",
            js: "./module/mypanel/qqweb.app.mypanel.js",
            windowMode: "none",
            customLoginValidate: true,
            settingCenter: 0
        },
        tips: {
            id: "tips",
            appName: "tips",
            appType: 1,
            appLevel: "system",
            css: "./module/tips/main.css",
            js: "./module/tips/main.js",
            windowMode: "none",
            customLoginValidate: false,
            settingCenter: 0
        },
        helper: {
            id: "helper",
            appName: "WebQQ\u5c0f\u52a9\u624b",
            appType: 1,
            appLevel: "system",
            css: "./module/helper/style.css",
            js: "./module/helper/main.js",
            width: 502,
            height: 400,
            x: 5,
            y: 360,
            settingCenter: 0
        },
        qqWebIme: {
            id: "qqWebIme",
            appName: "QQ\u4e91\u8f93\u5165\u6cd5",
            appType: 1,
            appLevel: "system",
            css: "./module/qqwebime/style.css",
            js: "./module/qqwebime/main.js",
            windowMode: "none",
            customLoginValidate: false,
            settingCenter: 0
        },
        appBar: {
            id: "appBar",
            appName: "appBar",
            appType: 1,
            appLevel: "system",
            css: "./module/appbar/qqweb.app.appbar.css",
            js: "./module/appbar/qqweb.app.appbar.js",
            windowMode: "none",
            settingCenter: 0
        },
        appMarket: {
            id: "appMarket",
            appName: "\u5e94\u7528\u4e2d\u5fc3",
            appType: 1,
            appDesc: "\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4e2d\u5fc3",
            appLevel: "system",
            css: "./module/appmarket/qqweb.app.appmarket.css",
            js: "./module/appmarket/qqweb.app.appmarket.js",
            hasCloseButton: true,
            hasMinButton: false,
            hasMaxButton: true,
            modeSwitch: true,
            resize: true,
            width: 800,
            height: 500,
            loginLevel: qqweb.CONST.LOGIN_LEVEL_NOCHAT,
            settingCenter: 0
        },
        themeSetting: {
            id: "themeSetting",
            appName: "\u4e3b\u9898\u8bbe\u7f6e",
            appType: 1,
            appLevel: "system",
            css: "./module/themesetting/qqweb.app.themesetting.css",
            js: "./module/themesetting/qqweb.app.themesetting.js",
            hasMinButton: false,
            hasMaxButton: false,
            settingCenter: 0
        },
        notifySetting: {
            id: "notifySetting",
            appName: "\u6d88\u606f\u63d0\u9192",
            appType: 1,
            appLevel: "system",
            css: "./module/notifysetting/qqweb.app.notifysetting.css",
            js: "./module/notifysetting/qqweb.app.notifysetting.js",
            hasMinButton: false,
            hasMaxButton: false,
            hasOkButton: true,
            hasCancelButton: true,
            settingCenter: 0
        },
        msgBubble: {
            id: "msgBubble",
            appType: 1,
            appLevel: "system",
            appName: "\u6d88\u606f\u8d70\u9a6c\u706f",
            css: "./module/messagebubble/qqweb.app.msgbubble.css",
            js: "./module/messagebubble/qqweb.app.msgbubble.js",
            windowMode: "none",
            settingCenter: 0
        },
        messageCenter: {
            id: "messageCenter",
            appType: 1,
            appLevel: "system",
            appName: "\u6d88\u606f\u63d0\u9192\u4e2d\u5fc3",
            js: "./module/messagecenter/qqweb.app.messagecenter.js",
            windowMode: "none",
            settingCenter: 0
        },
        chatLogViewer: {
            id: "chatLogViewer",
            appName: "\u804a\u5929\u8bb0\u5f55\u7ba1\u7406\u5668",
            appType: 1,
            appLevel: "system",
            css: "./module/chatlogviewer/qqweb.app.chatlogviewer.css",
            js: "./module/chatlogviewer/qqweb.app.chatlogviewer.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_ALL,
            needApp: ["eqq"],
            settingCenter: 0
        },
        userDetails: {
            id: "userDetails",
            appName: "\u8be6\u7ec6\u8d44\u6599",
            appType: 1,
            appLevel: "system",
            css: "./module/userdetails/qqweb.app.userdetails.css",
            js: "./module/userdetails/qqweb.app.userdetails.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_NOCHAT,
            windowMode: "multi",
            needApp: ["eqq"],
            settingCenter: 0
        },
        appIntroduce: {
            id: "appIntroduce",
            appType: 1,
            appName: "\u5e94\u7528\u4ecb\u7ecd",
            appLevel: "system",
            appDesc: "\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4ecb\u7ecd",
            provider: "Tencent \u817e\u8baf",
            ver: "1.0",
            css: "./module/appintroduce/qqweb.app.appintroduce.css",
            js: "./module/appintroduce/qqweb.app.appintroduce.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_NOCHAT,
            width: 620,
            height: 500,
            windowMode: "multi",
            resize: false,
            hasMinButton: false,
            hasMaxButton: false,
            settingCenter: 0
        },
        buddyAdder: {
            id: "buddyAdder",
            appName: "\u6dfb\u52a0\u597d\u53cb",
            appType: 1,
            appLevel: "system",
            css: "./module/buddyadder/qqweb.app.buddyadder.css",
            js: "./module/buddyadder/qqweb.app.buddyadder.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_ALL,
            windowMode: "multi",
            needApp: ["eqq"],
            settingCenter: 0
        },
        buddyFinder: {
            id: "buddyFinder",
            appName: "\u67e5\u627e\u597d\u53cb",
            appType: 1,
            appLevel: "system",
            css: "./module/buddyfinder/qqweb.app.buddyfinder.css",
            js: "./module/buddyfinder/qqweb.app.buddyfinder.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_ALL,
            width: 520,
            height: 360,
            modeSwitch: false,
            resize: false,
            hasMinButton: false,
            hasMaxButton: false,
            needApp: ["eqq"],
            settingCenter: 0
        },
        screenLocker: {
            id: "screenLocker",
            appName: "\u9501\u5c4f",
            appType: 1,
            appLevel: "system",
            css: "./module/screenlocker/qqweb.app.screenlocker.css",
            js: "./module/screenlocker/qqweb.app.screenlocker.js",
            windowMode: "none",
            settingCenter: 0
        },
        screenCapture: {
            id: "screenCapture",
            appName: "\u622a\u5c4f",
            appType: 1,
            appLevel: "system",
            css: "./module/screencapture/qqweb.app.screencapture.css",
            js: "./module/screencapture/qqweb.app.screencapture.js",
            windowMode: "none",
            settingCenter: 0
        },
        settingCenter: {
            id: "settingCenter",
            appName: "\u8bbe\u7f6e\u4e2d\u5fc3",
            appType: 1,
            appLevel: "system",
            css: "./module/settingcenter/qqweb.app.settingcenter.css",
            js: "./module/settingcenter/qqweb.app.settingcenter.js",
            hasCloseButton: true,
            hasMinButton: false,
            hasMaxButton: false,
            settingCenter: 0
        },
        layoutSaver: {
            id: "layoutSaver",
            appName: "\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40",
            appType: 1,
            appLevel: "system",
            css: "./module/layoutsaver/qqweb.app.layoutsaver.css",
            js: "./module/layoutsaver/qqweb.app.layoutsaver.js",
            windowMode: "none",
            settingCenter: 0
        },
        urlSave: {
            id: "urlSave",
            appType: 1,
            appName: "\u4e00\u952e\u53e6\u5b58\u4e3a\u5e94\u7528",
            appLevel: "system",
            appDesc: "\u5728\u8fd9\u91cc\uff0c\u4e00\u952e\u53e6\u5b58\u4e3a",
            ver: "1.0",
            css: "./module/urlsave/qqweb.app.urlsave.css",
            js: "./module/urlsave/qqweb.app.urlsave.js",
            loginLevel: qqweb.CONST.LOGIN_LEVEL_NOCHAT,
            width: 708,
            height: 475,
            hasMinButton: false,
            hasMaxButton: false,
            resize: false,
            hasOkButton: true,
            hasCancelButton: true,
            settingCenter: 0
        }
    };
    this.getAppConfigList = function() {
        return this.appConfigList
    };
    this.getAllConfig = function(k) {
        return b(k, this.appConfigList) || b(k, this.systemConfigList)
    };
    this.getAppConfig = function(k) {
        return b(k, this.appConfigList)
    };
    this.getSystemConfig = function(k) {
        return b(k, this.systemConfigList)
    };
    this.isAppConfigLoad = function() {
        return j
    };
    var b = function(k, m) {
        if (k && k.call) {
            var q = [];
            for (var y in m) {
                var A = m[y];
                k(A) && q.push(A)
            }
            return q
        } else return m[k]
    };
    this.clearConfig = function() {
        this.appConfigList = {}
    };
    this.addAppConfigList = function(k) {
        var m = k.result.resultData;
        e.out("AddAppConfigList\u5f00\u59cb");
        for (var q in m) if (m[q]) {
            m[q].title = m[q].appName;
            m[q].type = m[q].appType;
            e.extend(m[q], m[q].exinfo)
        } else delete m[q];
        e.extend(this.appConfigList, m);
        e.out("AddAppConfigList\u7ed3\u675f");
        d.notifyObservers(c, "AddAppConfigList", k)
    };
    this.addAppConfig = function(k) {
        this.appConfigList[k.id] = e.extend(k, k.exinfo);
        g({
            appid: k.id,
            value: 1,
            type: 0
        });
        d.notifyObservers(c, "AddAppConfig", k)
    };
    this.updateAppConfig = function(k) {
        this.appConfigList[k.id] = k;
        d.notifyObservers(c, "UpdateAppConfig", k)
    };
    this.removeAppConfig = function(k) {
        delete this.appConfigList[k.id];
        d.notifyObservers(c, "RemoveAppConfig", k)
    };
    var g = function(k) {
        k.vfwebqq = qqweb.portal.getVfWebQQ();
        qqweb.rpcService.selfSend("/cgi/qqweb/market/updateapphot.do", {
            context: c,
            method: "POST",
            data: "appattrib=" + encodeURIComponent(e.json.stringify(k)),
            arguments: k,
            onSuccess: function(m) {
                m.retcode !== 0 && e.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25" + m.errmsg)
            },
            onError: function(m) {
                e.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25");
                d.notifyObservers(c, "SetAppCountError", m)
            }
        })
    },
    f = function(k, m) {
        k.vfwebqq = qqweb.portal.getVfWebQQ();
        qqweb.rpcService.selfSend("/" + m, {
            context: c,
            method: "POST",
            arguments: k.appid,
            data: "appattrib=" + encodeURIComponent(e.json.stringify(k)),
            onSuccess: function(q) {
                if (q.retcode === 0) if (a) {
                    this.addAppConfigList(q);
                    d.notifyObservers(c, "GetDefaultAppConfigComplete", this.getAppConfigList());
                    e.out("\u9ed8\u8ba4config\u5b8c\u6210")
                } else {
                    d.notifyObservers(c, "GetAppConfigAsPartSuccess", q.result);
                    n++;
                    var y = qqweb.config.getSetupAppList(),
                    A = n * u,
                    J = (n + 1) * u;
                    this.addAppConfigList(q);
                    if (A < y.length) {
                        q = y.slice(A, J);
                        f({
                            appid: q,
                            loadMethod: 2
                        },
                        "cgi/qqweb/market/getappinfo.do")
                    } else {
                        j = true;
                        d.notifyObservers(c, "GetAppConfigComplete", this.getAppConfigList());
                        qqweb.portal.speedTest.sRTS(5, "end", new Date, true);
                        e.out("\u81ea\u5b9a\u4e49config\u5b8c\u6210")
                    }
                }
            },
            onError: function(q) {
                qqweb.layout.alert("\u5e94\u7528\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6,\u662f\u5426\u91cd\u8bd5?",
                function() {
                    f(k, m)
                });
                d.notifyObservers(c, "GetAppConfigError", q.resutlt)
            },
            onTimeout: function() {
                qqweb.layout.alert("\u5e94\u7528\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6,\u662f\u5426\u91cd\u8bd5?",
                function() {
                    f(k, m)
                })
            }
        })
    },
    i = {
        onSystemAppReady: function() {
            e.out("systemAppReadyInAppconfig");
            if (qqweb.config.isSetupAppListLoaded()) if (j) d.notifyObservers(c, "GetAppConfigComplete");
            else {
                d.notifyObservers(c, "ClearDefaultApp");
                var k;
                k = qqweb.config.getSetupAppList();
                c.clearConfig();
                a = false;
                n = 0;
                u = k.length;
                k = k.slice(0, u);
                e.out("\u62c9\u53d6\u81ea\u5b9a\u4e49appconfig");
                f({
                    appid: k,
                    loadMethod: 2
                },
                "cgi/qqweb/market/getappinfo.do")
            } else {
                a = true;
                e.out("\u62c9\u53d6\u9ed8\u8ba4appconfig");
                f({
                    appid: qqweb.config.getDefaultSetupAppList(),
                    loadMethod: 2
                },
                "cgi/qqweb/market/getdefaultappinfo.do")
            }
        },
        onUinChange: function() {
            j = false
        }
    };
    d.addObserver(qqweb.portal, "uinChange", i.onUinChange);
    d.addObserver(qqweb.portal, "systemAppReady", i.onSystemAppReady)
});
Jet().$package(function(e) {
    var c = e.http,
    d = 1;
    d = e.platform.iPad ? 1 : 0;
    if (document.location.search != "?normal") {
        e = "./extend/" + d + "/extend.js?t=" + qqweb.CONST.UPDATE_TIME_STAMP;
        (d = "./extend/" + d + "/extend.css?t=" + qqweb.CONST.UPDATE_TIME_STAMP) && c.loadCss(d);
        e && c.loadScript(e, {
            onSuccess: function() {
                qqweb && qqweb.init && qqweb.init()
            }
        })
    } else if (qqweb && qqweb.init) {
        console.log("normal");
        qqweb.businessClass.Window = qqweb.businessClass.baseWindow;
        qqweb.init()
    }
});