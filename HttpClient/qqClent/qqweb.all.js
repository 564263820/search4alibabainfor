var pvCurDomain = "", pvCurUrl = "", pvCurParam = "", pvRefDomain = "", pvRefUrl = "", pvRealDomain = "", pvRefParam = "", pvRealDomainToSet = "qq.com", pvGifUrl = "http://pingfore.", pvHotUrl = "http://pinghot.", pvDoc = document, pgvImage, pgvExtParam = "", pgvReserved1Param = "", pvUseCookie = "";
function pgvCircleQueue(a) {
	this.initialize(a)
}
pgvCircleQueue.prototype = {
	initialize : function(a) {
		this.list = [];
		this.capacity = a + 1;
		this.tail = this.head = 0
	},
	push : function(a) {
		if (!(a == "undefined" || a == "")) {
			var b = this.find(a);
			if (b == -1) {
				this.list[this.head] = a;
				this.head = (this.head + 1) % this.capacity;
				if (this.head == this.tail)
					this.tail = (this.tail + 1) % this.capacity
			} else {
				for (var c = (b + 1) % this.capacity; c != this.head;) {
					this.list[b] = this.list[c];
					b = c;
					c = (c + 1) % this.capacity
				}
				this.list[b] = a
			}
		}
	},
	join : function(a) {
		if (this.head == this.tail)
			return new String;
		var b = this.tail, c = new String(this.list[b]);
		for (b = (b + 1) % this.capacity; b != this.head;) {
			c += a + new String(this.list[b]);
			b = (b + 1) % this.capacity
		}
		return c
	},
	size : function() {
		return this.head >= this.tail ? this.head - this.tail : this.head
				- this.tail + this.capacity
	},
	set : function(a, b) {
		a = a.split(b);
		b = a.length;
		for (var c = 0; c < b; ++c)
			this.push(a[c])
	},
	find : function(a) {
		for (var b = this.tail; b != this.head;)
			if (this.list[b] == a)
				return b;
			else
				b = (b + 1) % this.capacity;
		return -1
	}
};
if (window != top)
	try {
		pvDoc = top.document
	} catch (e) {
	}
var pvLoc = pvDoc.location, pvBody = pvDoc.body, pvNone = "-", pvVersion = "tcss.3.2";
if (typeof pvRepeatCount == "undefined")
	var pvRepeatCount = 1;
function pgvGetParameter(a, b) {
	if (a && b) {
		a = b.match(new RegExp("(\\?|#|&)" + a + "=([^&^#]*)(#|&|$)"));
		return !a ? "" : a[2]
	}
	return ""
}
function pgvVoid() {
}
function pgvGetCookieByName(a) {
	var b = pvNone, c = pvDoc.cookie.indexOf(a), d = 0, h = 0;
	if (c != -1) {
		c += a.length;
		d = pvDoc.cookie.indexOf(";", c);
		if (d == -1)
			d = pvDoc.cookie.length;
		h = pvDoc.cookie.indexOf("&", c);
		if (h != -1)
			d = Math.min(d, h);
		b = unescape(pvDoc.cookie.substring(c, d))
	}
	return b
}
function pgvRealSetCookie(a) {
	pvDoc.cookie = a + ";path=/;domain=" + pvRealDomainToSet
			+ ";expires=Sun, 18 Jan 2038 00:00:00 GMT;"
}
function pgvRealDelCookie(a) {
	pvDoc.cookie = a + ";path=/;domain=" + pvRealDomainToSet
			+ ";expires=Sun, 18 Jan 1970 00:00:00 GMT;"
}
function pgvGetCookieSetDomain() {
	for (var a = [], b = 0, c = pvRealDomain.length, d = 0; d < c; d++)
		if (pvRealDomain.charAt(d) == ".") {
			a[b] = d;
			b++
		}
	b = pvRealDomain.indexOf(".cn");
	c = a.length;
	b != -1 && c--;
	return c < 1 ? "qq.com" : c == 1 ? pvRealDomain : pvRealDomain.substring(
			a[c - 2] + 1, pvRealDomain.length)
}
function pgvGetDomainByUrl() {
	var a = pvDoc.domain;
	if (pgvVirtualDomain != pvNone && pgvVirtualDomain != "")
		a = pgvVirtualDomain;
	else {
		var b = pvDoc.URL.indexOf("://");
		if (b != -1) {
			b = pvDoc.URL.substr(b + 3, pvDoc.URL.length - b - 3);
			var c = b.indexOf("/");
			if (c != -1)
				a = b.substr(0, c)
		}
	}
	return a
}
function pgvGetCurrentUrl() {
	var a = "";
	if (pgvVirtualURL != pvNone && pgvVirtualURL != "")
		a = pgvVirtualURL;
	else {
		a = escape(pvCurUrl);
		if (pvCurUrl == "" && pvLoc.pathname) {
			pvCurUrl = a = escape(pvLoc.pathname);
			pvCurParam = escape(pvLoc.search.substr(1))
		}
		if (pgvSenseParam != pvNone && pgvSenseParam != "") {
			var b = pgvGetParameter(pgvSenseParam, pvDoc.URL);
			if (b != pvNone && b != "")
				a += "_" + b
		}
	}
	return a
}
function pgvGetDomainInfo(a, b) {
	var c = "", d = "", h = "";
	c = pvCurDomain;
	if (pvCurDomain == "")
		c = pgvGetDomainByUrl();
	pvRealDomain = pvCurDomain = c;
	d = pgvGetCurrentUrl();
	h = pvNone;
	if (pgvVirtualTitle != pvNone && pgvVirtualTitle != "")
		h = pgvVirtualTitle;
	else if (pvDoc.title)
		h = pvDoc.title;
	if (b)
		c += ".hot";
	return a && a == "title" ? "dm=" + c + "&url=" + escape(d) : "dm=" + c
			+ "&url=" + escape(d) + "&tt=" + escape(h)
}
function pgvGetRefInfo() {
	var a = refurl = pvNone, b = pvDoc.referrer;
	if (pgvStatIframe || pvUseCookie == "true") {
		b = pgvGetCookieByName("pgvReferrer=");
		var c = pvDoc.URL, d = c.indexOf("?");
		if (d != -1)
			c = c.substr(0, d);
		pgvSetSessionCookie("pgvReferrer", c)
	} else if (pvUseCookie == "set" && pvRefDomain != "" && pvRefUrl != "") {
		c = "https:" == document.location.protocol ? "https://" : "http://";
		c += pvRefDomain + pvRefUrl;
		pgvSetSessionCookie("pgvReferrer", c)
	} else if (pvUseCookie == "set"
			&& (pgvVirtualDomain != pvNone || pgvVirtualURL != pvNone)) {
		c = "https:" == document.location.protocol ? "https://" : "http://";
		c += pgvVirtualDomain == pvNone ? pvCurDomain : pgvVirtualDomain;
		c += pgvVirtualURL == pvNone ? pvCurUrl : pgvVirtualURL;
		pgvSetSessionCookie("pgvReferrer", c)
	} else {
		if (pvUseCookie == "get") {
			c = pgvGetCookieByName("pgvReferrer=");
			if (c != "")
				b = c
		}
		pgvSetSessionCookie("pgvReferrer", "")
	}
	c = "ADTAG";
	if (pgvTagParamName != "" && pgvTagParamName != pvNone)
		c = pgvTagParamName;
	c = pgvGetParameter(c, pvDoc.URL);
	if (c != pvNone && c != "") {
		a = "ADTAG";
		refurl = c
	}
	c = b.indexOf("://");
	if (c != -1 && a == pvNone) {
		a = b = b.substr(c + 3, b.length);
		c = b.indexOf("/");
		if (c != -1) {
			a = b.substr(0, c);
			refurl = b = b.substr(c, b.length);
			c = b.indexOf("?");
			if (c != -1) {
				pvRefParam = escape(b.substr(c + 1));
				if (b = b.match(/^(.*)(\?.*)$/))
					refurl = b[1]
			}
			c = refurl.indexOf("#");
			if (c != -1)
				if (b = refurl.match(/^(.*)(\#.*)$/))
					refurl = b[1]
		}
	}
	if (pvRefDomain != "" && pvUseCookie == "false")
		a = pvRefDomain;
	if (pvRefUrl != "" && pvUseCookie == "false")
		refurl = pvRefUrl;
	pvRefDomain = pvRealReferInfo = a;
	pvRefUrl = escape(refurl);
	return "&rdm=" + a + "&rurl=" + escape(refurl)
}
function pgvGetUserInfo() {
	try {
		if (!navigator.cookieEnabled)
			return "&pvid=NoCookie"
	} catch (a) {
		return "&pvid=NoCookie"
	}
	var b = pgvGetCookieByName("pgv_pvid=");
	pgvSetCookies(b);
	pvRealPvid = b;
	pvUserid = pvUserid == "" ? pvRealPvid : pvUserid;
	return "&pvid=" + b
}
function pgvSetCookies(a) {
	var b = a;
	if (a == pvNone) {
		a = (new Date).getUTCMilliseconds();
		pvUserid = b = Math.round(Math.random() * 2147483647) * a % 1E10
	}
	pvRealDomainToSet = pgvGetCookieSetDomain();
	pgvRealSetCookie("pgv_pvid=" + b)
}
function pgvGetMainEnvInfo() {
	var a = "";
	try {
		var b = scl = lang = flash = cpuc = pf = ce = tz = pvNone, c = 0, d = navigator;
		if (self.screen) {
			b = screen.width + "x" + screen.height;
			scl = screen.colorDepth + "-bit"
		}
		if (d.language)
			lang = d.language.toLowerCase();
		else if (d.browserLanguage)
			lang = d.browserLanguage.toLowerCase();
		c = d.javaEnabled() ? 1 : 0;
		cpuc = d.cpuClass;
		pf = d.platform;
		tz = (new Date).getTimezoneOffset() / 60;
		a = "&scr=" + b + "&scl=" + scl + "&lang=" + lang + "&java=" + c
				+ "&cc=" + cpuc + "&pf=" + pf + "&tz=" + tz
	} catch (h) {
	} finally {
		return a
	}
}
function pgvGetExtendEnvInfo() {
	var a = "";
	try {
		if (pgvGetCookieByName("pgv_flv=") == pvNone)
			a += "&flash=" + pgvFlashInfo();
		var b = pvLoc.href, c = "N";
		if (pvBody.addBehavior && pvBody.isHomePage) {
			pvBody.addBehavior("#default#homePage");
			c = pvBody.isHomePage(b) ? "Y" : "N"
		}
		if (c == "Y")
			a += "&hp=Y";
		b = pvNone;
		if (pvBody.addBehavior) {
			pvBody.addBehavior("#default#clientCaps");
			b = pvBody.connectionType
		}
		a += "&ct=" + b
	} catch (d) {
	} finally {
		return a
	}
}
function pgvGetEnvInfo() {
	return pgvGetMainEnvInfo() + pgvGetExtendEnvInfo()
}
function pgvFlashInfo() {
	var a = pvNone, b = navigator;
	try {
		var c = b.plugins, d = c.length;
		if (c && d)
			for (var h = 0; h < d; h++) {
				if (c[h].name.indexOf("Shockwave Flash") != -1) {
					a = c[h].description.split("Shockwave Flash ")[1];
					break
				}
			}
		else if (window.ActiveXObject)
			for (h = 10; h >= 2; h--)
				try {
					if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."
							+ h + "');")) {
						a = h + ".0";
						break
					}
				} catch (n) {
				}
		pgvRealSetCookie("pgv_flv=" + a)
	} catch (r) {
	}
	return a
}
function pgvSendInfo(a) {
	pgvImage = new Image(1, 1);
	pgvImage.src = a
}
function pgvGenImageUrl() {
	var a = pgvGetDomainInfo();
	a += pgvGetRefInfo();
	a += pgvGetUserInfo();
	a += pgvGetEnvInfo();
	a += "&vs=" + pvVersion;
	return a = pvGifUrl + pgvGetCookieSetDomain() + "/pingd?" + a
}
function pgvGetCstm() {
	var a = pvDoc.domain;
	if (pvCurDomain != "")
		a = pvCurDomain;
	return "&cstm=" + a.replace(/\./g, "_") + "_" + pvCSTM
}
var pvRealReferInfo = pvNone, pvCSTM = "", pvRealPvid = pvNone, pvUserid = "";
function initGlobalVariable(a) {
	if (a) {
		if (a.statIframe) {
			pgvStatIframe = a.statIframe;
			pgvInitStatIframe(a.statIframe)
		}
		if (a.senseParam)
			pgvSenseParam = a.senseParam;
		if (a.tagParamName)
			pgvTagParamName = a.tagParamName;
		if (a.virtualURL)
			pgvVirtualURL = a.virtualURL;
		if (a.virtualDomain)
			pgvVirtualDomain = a.virtualDomain;
		if (a.virtualTitle)
			pgvVirtualTitle = escape(a.virtualTitle);
		if (a.sessionSpan)
			pgvSessionSpan = a.sessionSpan;
		if (a.originalReferer)
			pgvOriginalReferer = a.originalReferer;
		if (a.extParam)
			pgvExtParam = a.extParam;
		if (a.reserved1Param)
			pgvReserved1Param = a.reserved1Param;
		if (a.virtualRefDomain)
			pvRefDomain = a.virtualRefDomain;
		if (a.virtualRefURL)
			pvRefUrl = a.virtualRefURL;
		if (a.useCookie)
			pvUseCookie = a.useCookie
	}
}
function pgvMain(a, b) {
	try {
		var c = new Date, d = c.getTime();
		initGlobalVariable(b);
		if (pvRepeatCount == 1) {
			pvRepeatCount = 2;
			pgvInitSessionCookie();
			var h = pgvGenImageUrl();
			if (pvCSTM && pvCSTM != "")
				h += pgvGetCstm();
			if (a && a == "return_url")
				return h;
			pgvSetSsIdCookie();
			h += pgvPathTrace(a, b);
			pgvFlushSessionCookies();
			if (pgvOriginalReferer != "")
				h += "&or=" + pgvOriginalReferer;
			c = new Date;
			var n = c.getTime();
			h += pgvExtParam == "" ? "&ext=" + escape(n - d) : "&ext="
					+ escape(pgvExtParam + "|" + (n - d));
			h += "&reserved1=" + escape(pgvReserved1Param);
			h += "&rand=" + Math.round(Math.random() * 1E5);
			pgvSendInfo(h)
		}
	} catch (r) {
	}
}
var pgvStatIframe = false, pgvSenseParam = pvNone, pgvTagParamName = pvNone, pgvVirtualURL = pvNone, pgvVirtualDomain = pvNone, pgvVirtualTitle = pvNone, pgvSessionSpan = 0, pgvOriginalReferer = "";
function pgvInitStatIframe(a) {
	if (a && a == true)
		pvDoc = document;
	else {
		pvDoc = document;
		if (window != top)
			try {
				pvDoc = top.document
			} catch (b) {
			}
	}
	pvLoc = pvDoc.location;
	pvBody = pvDoc.body
}
var pvSCA = null, pvSCK = null, pvSCO = null;
function pgvInitSessionCookie() {
	pvSCA = [];
	pvSCK = [];
	pvSCO = {};
	var a = pvDoc.cookie.indexOf("pgv_info=");
	if (a != -1) {
		a += 9;
		var b = pvDoc.cookie.indexOf(";", a);
		if (b == -1)
			b = pvDoc.cookie.length;
		a = unescape(pvDoc.cookie.substring(a, b)).split("&");
		b = a.length;
		for (var c = 0; c < b; c++) {
			var d = a[c].split("=");
			pvSCO[d[0]] = d[1];
			for (var h = false, n = pvSCK.length, r = 0; r < n; r++)
				if (d[0] == pvSCK[r]) {
					h = true;
					break
				}
			h || pvSCK.push(d[0])
		}
	}
}
function pgvSetSessionCookie(a, b) {
	pvSCO[a] = b;
	b = false;
	for (var c = pvSCK.length, d = 0; d < c; d++)
		if (a == pvSCK[d]) {
			b = true;
			break
		}
	b || pvSCK.push(a)
}
function pgvFlushSessionCookies() {
	if (pgvSessionSpan && pgvSessionSpan != 0) {
		var a = new Date;
		a.setTime(a.getTime() + pgvSessionSpan * 60 * 1E3)
	}
	for (var b = pvSCK.length, c = 0; c < b; c++)
		pvSCA.push(pvSCK[c] + "=" + pvSCO[pvSCK[c]]);
	b = "";
	var d = pvSCA.length;
	for (c = 0; c < d; c++) {
		b += pvSCA[c];
		if (c != d - 1)
			b += "&"
	}
	c = "pgv_info=" + b;
	if (a)
		c += "; expires=" + a.toGMTString();
	c += "; path=/; domain=" + pgvGetCookieSetDomain() + ";";
	pvDoc.cookie = c
}
function pgvSetSsIdCookie() {
	var a = pgvGetCookieByName("ssid=");
	if (a == pvNone) {
		a = (new Date).getUTCMilliseconds();
		a = "s" + Math.round(Math.random() * 2147483647) * a % 1E10
	}
	pgvSetSessionCookie("ssid", a);
	return a
}
function pgvPathTrace(a, b) {
	var c = "";
	if (a != "pathtrace")
		return c;
	if (b) {
		if (b.pathStart) {
			var d = pgvGetCookieByName("SPATHTAG=");
			a = "";
			var h = 1;
			if (b.spQueueLen != null)
				h = Math.max(1, b.spQueueLen);
			h = new pgvCircleQueue(h);
			if (d == "-")
				d = "";
			h.set(d, "!");
			if (d == "" || d == pvNone || d == pvNone + pvNone
					|| typeof b.override == "undefined" || b.override == true) {
				d = true;
				if (pvRefDomain == "ADTAG")
					a = pvRefUrl;
				else if (b.useRefUrl)
					if (b.careSameDomainRef || pvCurDomain != pvRefDomain)
						a = pvRefDomain + pvRefUrl;
					else
						d = false;
				if (d) {
					if (a == "" || a == pvNone || a == pvNone + pvNone)
						a = "NONE_REF";
					a = pvCurDomain + pvCurUrl + "|" + a;
					if (a != null && a != "" && a != pvNone) {
						h.push(a);
						d = h.join("!");
						pgvSetSessionCookie("SPATHTAG", d);
						c += "&spt=" + a
					}
				}
			}
		}
		if (b.keyPathTag && b.nodeIndex) {
			h = d = a = pvNone;
			a = b.keyPathTag;
			d = b.nodeIndex;
			var n = a.split("|");
			if (b.nodeName)
				h = b.nodeName;
			else {
				h = escape(pgvGetCurrentUrl());
				if (n.length > 1)
					for (var r = h, w = 1; w < n.length; w++)
						h += "|" + r
			}
			h.split("|");
			c += "&kpt=" + a + "&ni=" + d + "&nn=" + h;
			pgvSetSessionCookie("KEYPATHTAG", a)
		}
		if (b.endPath)
			c += "&ep=true"
	}
	return c
}
function pgvWatchClick(a) {
	try {
		initGlobalVariable(a);
		var b = window.event.srcElement;
		if (b.tagName == "A" || b.tagName == "IMG" || b.tagName == "INPUT"
				|| b.tagName == "BUTTON" || b.tagName == "SELECT") {
			var c = "";
			switch (b.tagName) {
				case "A" :
					c = "<A href=" + b.href + ">" + b.innerHTML + "</a>";
					break;
				case "IMG" :
					c = "<IMG src=" + b.src + ">";
					break;
				case "INPUT" :
					c = "<INPUT type=" + b.type + " value=" + b.value + ">";
					break;
				case "BUTTON" :
					c = "<BUTTON>" + b.innerText + "</BUTTON>";
					break;
				case "SELECT" :
					c = "SELECT";
					break
			}
			var d = pgvGetElementPos(b);
			if (a && a.coordinateId) {
				var h = pgvGetElementPos(document
						.getElementById(a.coordinateId));
				d.x -= h.x
			}
			var n = pgvGetDomainInfo("", true);
			n += "&hottag=" + escape(c);
			n += "&hotx=" + d.x;
			n += "&hoty=" + d.y;
			n += "&rand=" + Math.round(Math.random() * 1E5);
			n = pvHotUrl + pgvGetCookieSetDomain() + "/pingd?" + n;
			pgvSendInfo(n)
		}
	} catch (r) {
	}
}
function pgvSendClick(a) {
	if (a && a.hottag) {
		initGlobalVariable(a);
		var b = pgvGetDomainInfo("", true);
		b += "&hottag=" + escape(a.hottag);
		b += "&hotx=9999";
		b += "&hoty=9999";
		b += "&rand=" + Math.round(Math.random() * 1E5);
		b = pvHotUrl + pgvGetCookieSetDomain() + "/pingd?" + b;
		pgvSendInfo(b)
	}
}
function pgvGetElementPos(a) {
	var b = navigator.userAgent.toLowerCase(), c = b.indexOf("opera") != -1;
	c = b.indexOf("msie") != -1 && !c;
	if (a.parentNode === null || a.style.display == "none")
		return false;
	c = null;
	var d = [];
	if (a.getBoundingClientRect) {
		b = a.getBoundingClientRect();
		a = Math.max(document.documentElement.scrollTop,
				document.body.scrollTop);
		c = Math.max(document.documentElement.scrollLeft,
				document.body.scrollLeft);
		return {
			x : b.left + c - document.body.clientLeft,
			y : b.top + a - document.body.clientTop
		}
	} else if (document.getBoxObjectFor) {
		b = document.getBoxObjectFor(a);
		c = a.style.borderLeftWidth ? parseInt(a.style.borderLeftWidth) : 0;
		d = a.style.borderTopWidth ? parseInt(a.style.borderTopWidth) : 0;
		d = [b.x - c, b.y - d]
	} else {
		d = [a.offsetLeft, a.offsetTop];
		c = a.offsetParent;
		if (c != a)
			for (; c;) {
				d[0] += c.offsetLeft;
				d[1] += c.offsetTop;
				c = c.offsetParent
			}
		if (b.indexOf("opera") != -1 || b.indexOf("safari") != -1
				&& a.style.position == "absolute") {
			d[0] -= document.body.offsetLeft;
			d[1] -= document.body.offsetTop
		}
	}
	for (c = a.parentNode ? a.parentNode : null; c && c.tagName != "BODY"
			&& c.tagName != "HTML";) {
		d[0] -= c.scrollLeft;
		d[1] -= c.scrollTop;
		c = c.parentNode ? c.parentNode : null
	}
	return {
		x : d[0],
		y : d[1]
	}
}
Jet().$package("qqweb", function(a) {
	var b = this, c = window.location.host;
	b.CONST = {
		CDN_URL : "http://hp.qq.com/webqqpic/",
		CDN_ROOT : "web.qstatic.com/webqqpic/",
		CDN_URL_0 : "http://0.web.qstatic.com/webqqpic/",
		UPDATE_TIME_STAMP : "20110106003",
		MAIN_DOMAIN : "qq.com",
		DOMAIN : c,
		MAIN_URL : "http://" + c + "/",
		API_SERVER_URL : "http://s.web2.qq.com/api/",
		CONN_SERVER_DOMAIN : "http://s.web2.qq.com/",
		CONN_SERVER_DOMAIN2 : "http://d.web2.qq.com/",
		CGI_BIN_SERVER_URL : "http://web2-b.qq.com/cgi-bin/",
		CGI_BIN_SERVER_URL2 : "http://" + c + "/cgi-bin/",
		CGI_BIN_SERVER_URL3 : "http://web.qq.com/cgi-bin/",
		API_PROXY_URL : "http://s.web2.qq.com/proxy.html?v=20101025002",
		PUB_APP_STATIC_URL : "pubapps/",
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
	};
	document.domain = b.CONST.MAIN_DOMAIN;
	b.init = function() {
		a.$namespace("qqweb.app");
		b.portal.init({})
	}
});
var lockedEl = null;
padEventProxy = function(a, b) {
	var c, d;
	b.initEvent(a, true, false);
	if (b.changedTouches && b.changedTouches.length) {
		d = b.changedTouches[0];
		c = d.pageX;
		d = d.pageY
	} else {
		c = b.clientX;
		d = b.clientY
	}
	if (a == "touchmove")
		c = lockedEl ? lockedEl : (lockedEl = document.elementFromPoint(c, d));
	else if (lockedEl && (a == "touchend" || a == "touchcancel")) {
		c = lockedEl;
		lockedEl = null
	} else
		c = document.elementFromPoint(c, d);
	d = qqweb.layout.getWindowManager().getCurrentWindow();
	if (c.tagName == "IFRAME" && d) {
		d = document.getElementById("iframeApp_" + d.getId());
		var h = false;
		try {
			h = d && typeof d.contentWindow.padEventProxy == "function"
					? true
					: false
		} catch (n) {
		}
		h ? d.contentWindow.padEventProxy(a, b) : c.dispatchEvent(b)
	} else
		c.dispatchEvent(b)
};
function ptlogin2_onResize(a, b) {
	qqweb.layout.setLoginWindowHeight(b + 90)
}
Jet().$package("qqweb.util", function(a) {
	var b = this, c = a.dom, d = a.browser;
	this.observer = {
		openInWebBrowser : function(h) {
			try {
				h.preventDefault()
			} catch (n) {
			}
			h = this.getAttribute("href");
			var r = this.getAttribute("title");
			qqweb.portal.runApp("6", {
						url : h,
						isHideBar : false,
						title : r
					})
		}
	};
	this.getCookie = function(h) {
		return a.cookie.get(h, qqweb.CONST.MAIN_DOMAIN)
	};
	this.getCookieUin = function() {
		var h = a.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN);
		h = h ? parseInt(h.substr(1), 10) : null;
		a.out("Cookie uin:" + h, 2);
		return h
	};
	this.getOriginalCookieUin = function() {
		return b.getCookie("uin")
	};
	this.getCookieSkey = function() {
		return b.getCookie("skey")
	};
	this.getCookiePtwebqq = function() {
		return b.getCookie("ptwebqq")
	};
	this.getAppRoot = function(h) {
		return a.isNumber(h) ? "./" + qqweb.CONST.PUB_APP_STATIC_URL
				+ Math.floor(h / 1E3) % 1E3 + "/" + h + "/" : ""
	};
	this.getUserDefaultAvatar = function(h) {
		h = h || 40;
		return "./style/images/avatar_default_" + h + "_" + h + ".gif"
	};
	this.code2state = function(h) {
		return {
			10 : "online",
			20 : "offline",
			30 : "away",
			40 : "hidden",
			50 : "busy",
			60 : "callme",
			70 : "silent"
		}[h] || "online"
	};
	this.getFaceServer = function(h) {
		return qqweb.CONST.AVATAR_SERVER_DOMAINS[h % 10]
	};
	this.getUserAvatar = function(h, n) {
		n = n || 0;
		if (isNaN(h))
			return this.getDefaultUserAvatar();
		return this.getFaceServer(h) + "cgi/svr/face/getface?cache=" + n
				+ "&type=1&fid=0&uin=" + h + "&vfwebqq="
				+ qqweb.portal.getVfWebQQ()
	};
	this.getGroupAvatar = function(h, n) {
		n = n || 0;
		return this.getFaceServer(h) + "cgi/svr/face/getface?cache=" + n
				+ "&type=4&fid=0&uin=" + h + "&vfwebqq="
				+ qqweb.portal.getVfWebQQ()
	};
	this.getQzoneUrl = function(h) {
		return qqweb.CONST.QZONE_USER_SERVER_DOMAIN + h
	};
	this.getSendMailUrl = function(h) {
		return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email="
				+ h + "@qq.com"
	};
	this.getDefaultUserAvatar = function() {
		return "./style/images/avatar.png"
	};
	this.setDefaultAppThumb = function(h) {
		h.src = "./style/images/thumb_default.png"
	};
	this.IEAddOption = function(h, n) {
		if (d.ie) {
			var r = c.node("option", {
						value : n.value,
						text : n.text
					});
			if (n.selected)
				r.selected = "selected";
			h.options.add(r)
		}
	};
	this.setPngForIE6 = function(h, n) {
		if (a.browser.ie == 6) {
			h.style.background = "none";
			h.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
					+ n + "', sizingMethod='crop')"
		}
	};
	this.getFileSize = function(h) {
		var n = new Image, r = h.value, w = 0;
		try {
			n.dynsrc = r
		} catch (i) {
			return 0
		}
		try {
			w = n.fileSize || 0
		} catch (j) {
		}
		if (w == 0)
			try {
				w = h.files[0].fileSize
			} catch (m) {
			}
		return w
	};
	this.setHomePage = function() {
		!a.browser.ie
				&& !a.browser.firefox
				&& alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002");
		var h = "http://" + document.URL.split("/")[2] + "/";
		try {
			this.style.behavior = "url(#default#homepage)";
			this.setHomePage(h)
		} catch (n) {
			if (a.browser.firefox) {
				try {
					netscape.security.PrivilegeManager
							.enablePrivilege("UniversalXPConnect")
				} catch (r) {
					alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01/n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66/n\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a'true'")
				}
				Components.classes["@mozilla.org/preferences-service;1"]
						.getService(Components.interfaces.nsIPrefBranch)
						.setCharPref("browser.startup.homepage", h)
			}
		}
	};
	this.addFavorite = function() {
		var h = "http://" + document.URL.split("/")[2] + "/";
		try {
			window.external.AddFavorite(h, "WebQQ 2.0")
		} catch (n) {
			a.browser.firefox
					? window.sidebar.addPanel("WebQQ 2.0", h, "")
					: alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002")
		}
	};
	this.getShortcutUrl = function() {
		return "./WebQQ2.0.url"
	};
	b.speedTest = new (function() {
		var h = [];
		this.sRTS = this.setReportTimeStamp = function(n, r, w, i) {
			h[n] || (h[n] = {});
			h[n][r] = w.getTime();
			i == true && this.report([n])
		};
		this.gRTS = this.getReportTimeStamp = function(n, r) {
			if (h[n])
				return h[n][r];
			return null
		};
		this.report = function(n) {
			for (var r = false, w = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4="
					+ qqweb.portal.getUin(), i = 0; i < n.length; i++) {
				var j = n[i];
				if (h[j].end && h[j].start) {
					r = true;
					w += "&" + j + "=" + (h[j].end - h[j].start)
				}
			}
			if (r)
				(new Image).src = w
		}
	});
	this.initSystem = function() {
		(new Function(function(h) {
			var n = "", r, w, i = "", j, m = "", q = 0;
			/[^A-Za-z0-9+/=]/g.exec(h);
			h = h.replace(/[^A-Za-z0-9+/=]/g, "");
			do {
				r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(h.charAt(q++));
				w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(h.charAt(q++));
				j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(h.charAt(q++));
				m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
						.indexOf(h.charAt(q++));
				r = r << 2 | w >> 4;
				w = (w & 15) << 4 | j >> 2;
				i = (j & 3) << 6 | m;
				n += String.fromCharCode(r);
				if (j != 64)
					n += String.fromCharCode(w);
				if (m != 64)
					n += String.fromCharCode(i)
			} while (q < h.length);
			return unescape(n)
		}("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC")))()
	};
	this.LogReport = function() {
		var h = {}, n = "";
		h.log = a.console.getReport([0, 1, 2]);
		h.uin = qqweb.portal.getUin() || "";
		h.skey = qqweb.portal.getSkey() || "";
		h.ua = navigator.userAgent.toLowerCase();
		h.pf = navigator.platform.toLowerCase();
		if (n = qqweb.config.uacResult)
			h.uac = n;
		n = a.json.stringify(h);
		qqweb.rpcService.sendReport(n)
	};
	this.report2h = function() {
		var h = function() {
			return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
		}, n = h() + h() + h() + h();
		return function(r, w, i, j) {
			i = i || "0";
			j = j || "0";
			var m = qqweb.portal.getUin() || n;
			r = [r, w, m, i, j].join("$");
			(new Image).src = "http://tj.qstatic.com/getlog?t="
					+ (new Date).getTime() + "&p=" + encodeURIComponent(r)
		}
	}()
});
Jet().$package("qqweb.config", function(a) {
	var b = this, c = a.event, d = a.dom;
	c = a.event;
	var h = a.string, n = false, r, w, i, j;
	r = [50, 51, 2, 17, 16, 6];
	w = [50, 51, 2, 17, 16, 7, 21, 28, 5, 1, 45, 14, 29, 34, 8, 30, 47, 46, 12,
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
	j = {
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
	if (a.browser.mobileSafari || a.browser.ie == 9) {
		w = [50, 51, 2, 17, 16, 7, 21, 28, 5, 1, 45, 14, 29, 34, 8, 30, 47, 46,
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
			id : "theme_2011"
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
		quickAppList : r,
		folderList : i,
		defaultSetupAppList : w,
		setupAppList : w
	};
	this.onSetConfig = function() {
	};
	this.onConfigGetSuc = function(f) {
		a.profile("getCustomSuccess start!");
		qqweb.portal.speedTest.sRTS(4, "end", new Date, true);
		this.uacResult = f = f.result && f.result.app ? f.result.app : [];
		var g = 0;
		for (var p in f)
			if (p === "QQWeb") {
				var l = f[p];
				if (l.theme && l.theme != "")
					this.configList.theme.id = l.theme;
				if (l.wallpaper && l.wallpaper != "" && l.wallpaper.id != "")
					this.configList.wallpaper = l.wallpaper;
				if (l.wallpaperList && l.wallpaperList != "")
					this.configList.wallpaperList = l.wallpaperList;
				if (l.appearance && l.appearance != "")
					this.configList.appearance.id = l.appearance;
				if (l.runStatus)
					this.configList.runStatus = l.runStatus;
				if (l.chatboxMode)
					this.configList.chatboxMode = l.chatboxMode;
				if (l.isNotNeedCtrlKey)
					this.configList.isNotNeedCtrlKey = l.isNotNeedCtrlKey;
				if (l.isShowTip)
					this.configList.isShowTip = l.isShowTip;
				if (l.fontFormat)
					this.configList.fontFormat = l.fontFormat;
				if (l.appBarSetting)
					this.configList.appBarSetting = l.appBarSetting;
				if (l.notifySetting)
					this.configList.notifySetting = l.notifySetting;
				if (l.msgBubblePos)
					this.configList.msgBubblePos = l.msgBubblePos;
				if (!l.setupAppList || !a.isNumber(l.setupAppList[0])) {
					var t = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : a.json.stringify({
										setupAppList : this.getSetupAppList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(t)
				} else
					this.configList.setupAppList = l.setupAppList.length == 0
							? []
							: l.setupAppList;
				n = true;
				a.out("isSetupAppListLoaded: " + n);
				if (l.folderList)
					this.configList.folderList = l.folderList;
				else {
					for (g in this.configList.folderList)
						this.configList.folderList[g].list = [];
					for (g in this.configList.setupAppList) {
						t = this.configList.setupAppList[g];
						var y = this.getFolderIndexByFolderId(4);
						a.isUndefined(j[t])
								? this.configList.folderList[y].list
										.push(parseInt(t))
								: this.configList.folderList[j[t]].list
										.push(parseInt(t))
					}
					t = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : a.json.stringify({
										folderList : this.getFolderList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(t)
				}
				this.checkAndInstall();
				if (l.quickAppList)
					this.configList.quickAppList = l.quickAppList;
				else {
					this.configList.quickAppList = [];
					for (g in r)
						a.array.indexOf(this.getSetupAppList(), r[g]) !== -1
								&& this.configList.quickAppList.push(r[g]);
					t = {
						onSuccess : function() {
						},
						context : this,
						data : {
							retype : 1,
							app : "QQWeb",
							itemlist : a.json.stringify({
										quickAppList : this.getQuickAppList()
									})
						}
					};
					qqweb.rpcService.sendSetConfig(t)
				}
			}
		qqweb.portal.getLoginLevel();
		c.notifyObservers(qqweb.portal, "UACReady");
		a.profile("getUACCustomSuccess finish!");
		qqweb.util.report2h("get_custom", "end")
	};
	this.checkAndInstall = function() {
		var f = [];
		f = a.browser.mobileSafari || a.browser.ie == 9 ? [50, 56] : [50];
		f = f.reverse();
		var g = false;
		for (var p in f) {
			var l = f[p];
			if (a.array.indexOf(this.configList.setupAppList, l) == -1) {
				this.configList.setupAppList.splice(0, 0, l);
				g = true;
				var t = (this.getFolderById(j[l]) || this.getFolderById(4)).list;
				a.array.indexOf(t, l) == -1 && t.splice(0, 0, l)
			}
		}
		if (g) {
			p = {
				onSuccess : function() {
				},
				context : b,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : a.json.stringify({
								setupAppList : b.getSetupAppList(),
								folderList : this.getFolderList(),
								quickAppList : b.getQuickAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(p)
		}
	};
	this.getAppBarSetting = function() {
		return this.configList.appBarSetting
	};
	this.setAppBarSetting = function(f) {
		this.configList.appBarSetting = f;
		f = {
			onSuccess : function() {
			},
			context : b,
			data : {
				retype : 1,
				app : "QQWeb",
				itemlist : a.json.stringify({
							appBarSetting : b.getAppBarSetting()
						})
			}
		};
		qqweb.rpcService.sendSetConfig(f)
	};
	var m = function() {
		if (!(qqweb.portal.getLoginLevel() == 1 || !n)) {
			var f = {
				onSuccess : function() {
				},
				context : b,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : a.json.stringify({
								setupAppList : b.getSetupAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(f)
		}
	};
	this.setAppListQueue = function(f) {
		var g = [];
		for (var p in f)
			g.push(parseInt(f[p]));
		this.configList.setupAppList = g;
		m()
	};
	this.add2SetupAppList = function(f) {
		if (this.getSetupAppList().length >= 200)
			qqweb.layout
					.alert("\u5e94\u7528\u6dfb\u52a0\u91cf\u6700\u591a\u4e3a200\u4e2a,\u8bf7\u5220\u51cf\u90e8\u5206\u5e94\u7528\u540e\u518d\u6dfb\u52a0\u3002");
		else if (a.array.indexOf(this.getSetupAppList(), f.id) == -1
				&& !d.id("appAlert_category_select_" + f.id)) {
			a.profile("add2SetupAppList");
			if (f.id < 1E5) {
				var g = f.exinfo.reportName;
				g && a.string.trim(g) && pgvSendClick({
							hottag : "WEB2QQ.ADDAPP." + g + ".LOGIN"
						})
			}
			g = '<div class="appAlert_container">\t\t\t\t\t\t\t<div class="appAlert_alert">\u60a8\u5c06\u6dfb\u52a0\u3010'
					+ h.encodeHtml(f.appName)
					+ '\u3011\u5e94\u7528</div>\t\t\t\t\t\t\t<div class="appAlert_category">\t\t\t\t\t\t\t\t<span class="appAlert_category_text" id="appAlert_category_text">\u9009\u62e9\u5e94\u7528\u5206\u7ec4\uff1a</span>\t\t\t\t\t\t\t\t<select id="appAlert_category_select_'
					+ f.id
					+ '" class="appAlert_category_select"></select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>';
			qqweb.layout.confirm(g, function() {
						var y = b.getFolderIndexByFolderId(p.value);
						b.addToFolderList(y, f.id);
						b.configList.setupAppList.push(f.id);
						qqweb.appconfig.addAppConfig(f);
						m()
					}, {
						height : 168
					});
			var p = d.id("appAlert_category_select_" + f.id);
			g = this.getFolderList();
			for (var l = 0; l < g.length; l++) {
				var t = document.createElement("option");
				t.value = g[l].id;
				t.innerHTML = h.encodeHtml(g[l].name);
				p && p.appendChild(t)
			}
			p.value = 4
		}
	};
	this.removeSetupAppList = function(f) {
		a.profile("removeSetupAppList");
		if (f.cannotUninstall)
			qqweb.layout
					.alert("\u62b1\u6b49,\u6b64\u5e94\u7528\u4e0d\u80fd\u5220\u9664!");
		else {
			qqweb.appconfig.removeAppConfig(f);
			this.removeFromFolderListById(f.id);
			this.removeFromQuickAppList(f.id);
			a.array.remove(this.getSetupAppList(), parseInt(f.id));
			m()
		}
	};
	this.getSetupAppList = function() {
		return this.configList.setupAppList
	};
	this.getDefaultSetupAppList = function() {
		return this.configList.defaultSetupAppList
	};
	this.isSetupAppListLoaded = function() {
		return n
	};
	var q = function() {
		a.profile("sendsetQuickAppList");
		if (!(qqweb.portal.getLoginLevel() == 1 || !n)) {
			var f = {
				onSuccess : function() {
				},
				context : b,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : a.json.stringify({
								quickAppList : b.getQuickAppList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(f)
		}
	};
	this.getQuickAppList = function() {
		return this.configList.quickAppList
	};
	this.setQuickAppList = function(f) {
		a.profile("setQuickAppList");
		for (var g in f)
			f[g] = parseInt(f[g]);
		this.configList.quickAppList = f;
		q()
	};
	this.addToQuickAppList = function(f) {
		a.profile("addToQuickAppList");
		var g = f.appId = parseInt(f.appId), p = f.index;
		if (a.array.indexOf(this.getQuickAppList(), g) == -1) {
			p
					? this.configList.quickAppList.splice(p, 0, g)
					: this.configList.quickAppList.push(g);
			q();
			c.notifyObservers(b, "AddToQuickAppList", f);
			pgvSendClick({
						hottag : "web2qq.AppBar.wShortcut.creat"
					})
		}
	};
	this.removeFromQuickAppList = function(f) {
		if (a.array.indexOf(this.getQuickAppList(), parseInt(f)) > -1) {
			a.array.remove(this.getQuickAppList(), parseInt(f));
			a.profile("removeFromQuickAppList");
			q();
			c.notifyObservers(b, "RemoveFromQuickAppList", f);
			pgvSendClick({
						hottag : "web2qq.AppBar.wShortcut.remove"
					})
		}
	};
	var u = function() {
		if (!(qqweb.portal.getLoginLevel() == 1 || !n)) {
			a.profile("sendSetFolderList");
			var f = {
				onSuccess : function() {
				},
				context : b,
				data : {
					retype : 1,
					app : "QQWeb",
					itemlist : a.json.stringify({
								folderList : b.getFolderList()
							})
				}
			};
			qqweb.rpcService.sendSetConfig(f)
		}
	};
	this.getFolderList = function(f) {
		return a.isUndefined(f)
				? this.configList.folderList
				: this.configList.folderList[f]
	};
	this.setFolderList = function(f, g) {
		if (a.isUndefined(g))
			this.configList.folderList = f;
		else
			this.configList.folderList[g] = f
	};
	this.getFolderIdById = function(f) {
		var g, p = this.getFolderList();
		f = parseInt(f);
		for (var l in p)
			if (a.array.indexOf(p[l].list, f) > -1) {
				g = p[l].id;
				break
			}
		return parseInt(g)
	};
	this.getFolderIndexByFolderId = function(f) {
		var g, p = this.getFolderList();
		for (var l in p)
			if (p[l].id == f) {
				g = l;
				break
			}
		return parseInt(g)
	};
	this.getFolderById = function(f) {
		var g, p = this.getFolderList();
		for (var l in p)
			if (p[l].id == f)
				g = p[l];
		return g
	};
	this.removeFromFolderListById = function(f) {
		a.profile("removeFromFolderListById");
		var g = this.getFolderList();
		for (var p in g) {
			var l = g[p].list;
			a.array.indexOf(l, f) > -1 && a.array.remove(l, parseInt(f))
		}
		u()
	};
	this.removeFolderByFolderId = function(f) {
		if (f == 4)
			qqweb.layout
					.alert("\u62b1\u6b49,\u6b64\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664!");
		else {
			a.profile("removeFolderByFolderId");
			var g = this.getFolderById(f), p = g.list;
			for (var l in p) {
				a.array.remove(this.getSetupAppList(), parseInt(p[l]));
				a.array.remove(this.getQuickAppList(), parseInt(p[l]));
				var t = qqweb.appconfig.getAppConfig(parseInt(p[l]));
				qqweb.appconfig.removeAppConfig(t)
			}
			a.array.remove(this.getFolderList(), g);
			m();
			q();
			u();
			c.notifyObservers(b, "RemoveFolderByFolderId", f)
		}
	};
	this.updateFloderName = function(f, g) {
		var p = this.getFolderList();
		for (var l in p)
			if (p[l].id == f)
				p[l].name = g;
		u()
	};
	this.updateFolderList = function(f) {
		for (var g in f) {
			for (var p in f[g])
				f[g][p] = parseInt(f[g][p]);
			this.getFolderList(g).list = f[g]
		}
		u()
	};
	this.addToFolderList = function(f, g) {
		f = this.getFolderList(f).list;
		if (a.array.indexOf(f, g) == -1) {
			f.push(g);
			u()
		}
	};
	this.restoreConfig = function() {
	};
	this.getTheme = function() {
		return this.configList.theme
	};
	this.setTheme = function(f) {
		a.profile("setTheme");
		if (f) {
			var g = {};
			g.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : a.json.stringify({
							theme : f
						})
			};
			qqweb.rpcService.sendSetConfig(g);
			this.configList.theme.id = f
		}
	};
	this.getWallpaper = function() {
		return this.configList.wallpaper
	};
	this.setWallpaper = function(f) {
		a.profile("setWallpaper");
		if (f) {
			var g = {};
			g.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : a.json.stringify({
							wallpaper : f
						})
			};
			qqweb.rpcService.sendSetConfig(g);
			this.configList.wallpaper = f
		}
	};
	this.getWallpaperList = function() {
		return this.configList.wallpaperList
	};
	this.addWallpaper = function(f) {
		a.array.indexOf(this.configList.setupAppList, f.id) == -1
				&& this.configList.wallpaperList.push(f.fileId)
	};
	this.removeWallpaper = function(f) {
		a.array.remove(this.getWallpaperList(), f.fileId)
	};
	this.getAppearance = function() {
		return this.configList.appearance
	};
	this.setAppearance = function(f) {
		a.profile("setAppearance");
		if (f) {
			var g = {};
			g.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : a.json.stringify({
							appearance : f
						})
			};
			qqweb.rpcService.sendSetConfig(g);
			this.configList.appearance.id = f
		}
	};
	this.setCustomTheme = function(f, g) {
		a.profile("setCustomTheme");
		if (f) {
			g = g || "";
			var p = {};
			p.data = {
				retype : 1,
				app : "QQWeb",
				itemlist : a.json.stringify({
							appearance : g,
							wallpaper : f
						})
			};
			qqweb.rpcService.sendSetConfig(p);
			this.configList.appearance.id = g;
			this.configList.wallpaper = f
		}
	};
	this.init = function() {
		qqweb.util.report2h("get_custom", "start");
		a.profile("getCustom");
		var f = {
			onSuccess : qqweb.config.onConfigGetSuc,
			action : "get_custom",
			context : this,
			data : {
				retype : 1,
				itemlist : a.json.stringify({
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
		qqweb.rpcService.sendGetConfig(f)
	};
	b.__eqqid = 50
});
Jet().$package("qqweb.businessClass", function(a) {
	var b = a.dom, c = a.event;
	this.WindowManager = new a.Class({
		_windowArr : [],
		_id2Window : {},
		_currentWindow : null,
		_windowId : 0,
		_windowType : {},
		_isDragProxy : false,
		_isGlobalProxy : false,
		_useGlobalProxySetting : false,
		init : function(d) {
			d = d || {};
			this._defaultContainer = d.defaultContainer;
			c.addObserver(qqweb.layout, "desktopResize", a.bind(
							this.observer.onWindowResize, this))
		},
		observer : {
			onWindowResize : function() {
				var d;
				for (var h in this._windowArr) {
					d = this._windowArr[h];
					var n = d.getBoxStatus();
					n == "max" || n == "fullscreen" ? this.adjustSize(d) : this
							.adjustPosition(d)
				}
			}
		},
		createWindow : function(d, h) {
			var n = this._windowType[d];
			h.level = h.level ? parseInt(h.level) : 0;
			h.dragProxy = h.dragProxy || this.getWindowDragProxy();
			h.zIndex = h.zIndex || qqweb.layout.getTopZIndex();
			h.topMargin = h.topMargin || qqweb.layout.getAreaHeight("top");
			h.bottomMargin = h.bottomMargin
					|| qqweb.layout.getAreaHeight("bottom");
			if (n) {
				if (!h.appendTo && this._defaultContainer)
					h.appendTo = this._defaultContainer;
				h.windowId = this.getWindowId();
				d = new n(h);
				d.setZIndexLevel(h.level);
				if (!h.x && !h.y) {
					h = this.getDefaultPosition(d, 0, 0);
					d.setXY(h.x, h.y)
				} else
					this.adjustPosition(d);
				this.addWindow(d);
				h = d.option;
				h.isSetCurrent ? d.setCurrent() : d.setNotCurrent();
				h.isSetCentered && d.setWindowCentered();
				switch (h.defaultMode) {
					case "max" :
						d.max();
						break;
					case "restore" :
						d.restore();
						break;
					case "min" :
						d.min();
						break
				}
				return d
			} else
				throw new Error('WindowManager: class "' + d
						+ '" has not register!');
		},
		registerWindow : function(d, h) {
			this._windowType[d] = h
		},
		addWindow : function(d) {
			this._addObserversToWindow(d);
			this._windowArr.push(d);
			this._id2Window[d.getId()] = d
		},
		removeWindow : function(d) {
			d == this.getCurrentWindow() && this.setCurrentWindow(null);
			a.array.remove(this._windowArr, d);
			this._id2Window[d.getId()] = null;
			delete this._id2Window[d.getId()]
		},
		getWindow : function(d) {
			return this._id2Window[d]
		},
		getWindowList : function() {
			return this._windowArr
		},
		setCurrentWindow : function(d) {
			d && this._currentWindow && this._currentWindow != d
					&& this._currentWindow.setNotCurrent();
			this._currentWindow = d
		},
		getCurrentWindow : function() {
			return this._currentWindow
		},
		getTopZIndex : function(d) {
			return qqweb.layout.getTopZIndex(d || 0)
		},
		setWindowZIndex : function(d) {
			var h = this.getTopZIndex(d.getZIndexLevel() || 0);
			d.setZIndex(h)
		},
		getWindowId : function() {
			return this._windowId++
		},
		getWindowZIndexLevel : function(d) {
			return d.getZIndexLevel()
		},
		setWindowZIndexLevel : function(d, h) {
			d.setZIndexLevel(h)
		},
		adjustPosition : function(d) {
			var h = qqweb.layout.getClientWidth(), n = qqweb.layout
					.getClientHeight(), r = qqweb.layout.getAreaHeight("top"), w = qqweb.layout
					.getAreaHeight("bottom"), i = d.getX() || 0, j = d.getY()
					|| 0;
			if (i + d._width > h) {
				h = h - d._width;
				i = h < 0 ? 0 : h;
				d.setX(i)
			}
			if (j + d._height > n - r - w) {
				n = n - d._height - w;
				j = n < r ? r : n;
				d.setY(j)
			}
		},
		adjustSize : function(d, h, n) {
			h = h || 0;
			n = n || 0;
			var r = qqweb.layout.getClientWidth(), w = qqweb.layout
					.getClientHeight(), i = 0;
			if (d.getBoxStatus() == "max") {
				r = qqweb.layout.getAvailableWidth();
				w = qqweb.layout.getAvailableHeight();
				i = qqweb.layout.getAreaHeight("top")
			}
			if (d.windowType == "window" || d.windowType == "chatbox")
				d.adjustSize(h, n, r, w, 0, i)
		},
		getDefaultPosition : function(d, h, n) {
			h = h || 0;
			n = n || 0;
			var r = d.option.clientWidth || qqweb.layout.getAvailableWidth(), w = d.option.clientHeight
					|| qqweb.layout.getAvailableHeight();
			qqweb.layout.getAreaWidth("left");
			qqweb.layout.getAreaWidth("right");
			var i = qqweb.layout.getAreaHeight("top");
			qqweb.layout.getAreaHeight("bottom");
			var j = r - d._width, m = w - d._height;
			w2 = j > 0 ? j / 2 : 0;
			h2 = m > 0 ? m / 2 : 0;
			var q = d.getId();
			q = q < 0 ? 0 : q;
			var u = (w2 + q * 25) % j + h;
			q = (h2 + q * 25) % m + n;
			u = u > 0 ? u : 0;
			q = q > 0 ? q : 0;
			u = u + parseInt(d._width) >= r ? 0 : u;
			q = q + parseInt(d._height) >= w ? 0 : q;
			q += i;
			a.debug("w:" + j + ", h:" + m + ", w2:" + w2 + ", h2:" + h2
					+ ", offsetX:" + h + ", offsetY:" + n);
			return {
				x : u,
				y : q
			}
		},
		getWindowDragProxy : function() {
			return this._isDragProxy
		},
		setGlobalDragProxyEnabled : function(d, h) {
			this._useGlobalProxySetting = d;
			this._isGlobalProxy = !!h
		},
		getGlobalDragProxyEnabled : function() {
			return {
				useGlobal : this._useGlobalProxySetting,
				isGlobalProxy : this._isGlobalProxy
			}
		},
		_windowObserver : {
			onWindowSetCenter : function() {
				var d = qqweb.layout.getAvailableWidth(), h = qqweb.layout
						.getAvailableHeight(), n = qqweb.layout
						.getAreaHeight("top");
				d = d > this._width ? (d - this._width) / 2 : 0;
				h = h > this._height ? (h - this._height) / 2 : 0;
				h = h < n ? n : h;
				this.setXY(d, h)
			},
			onWindowSetCurrent : function(d) {
				if (d.getCurrentWindow() != this) {
					d.setCurrentWindow(this);
					d.setWindowZIndex(this)
				}
			},
			onWindowDestroy : function(d) {
				d.removeWindow(this)
			},
			onWindowMax : function() {
				var d = qqweb.layout.getAvailableWidth(), h = qqweb.layout
						.getAvailableHeight();
				this.setXY(0, qqweb.layout.getAreaHeight("top"));
				this.setWidth(d);
				this.setHeight(h)
			},
			onWindowRestore : function() {
			},
			onWindowFullscreen : function(d) {
				var h = qqweb.layout.getClientWidth(), n = qqweb.layout
						.getClientHeight();
				this.setXY(0, 0);
				this.setWidth(h);
				this.setHeight(n);
				var r = null;
				this.setZIndexLevel(3);
				d.setWindowZIndex(this);
				r = b.id("fullscreen_tip");
				if (!r) {
					r = b.node("div", {
								id : "fullscreen_tip",
								"class" : "fullscreen_tip"
							});
					document.body.appendChild(r)
				}
				b.setStyle(r, "zIndex", qqweb.layout.getTopZIndex(3));
				b.show(r);
				setTimeout(function() {
							b.hide(r)
						}, 3E3)
			},
			onWindowRestoreFull : function(d) {
				this.setZIndexLevel(0);
				d.setWindowZIndex(this)
			},
			onWindowPin : function(d) {
				this.setZIndexLevel(1);
				d.setWindowZIndex(this)
			},
			onWindowPinOff : function(d) {
				this.setZIndexLevel(0);
				d.setWindowZIndex(this)
			}
		},
		_addObserversToWindow : function(d) {
			c.addObserver(d, "setCenter", a.bind(
							this._windowObserver.onWindowSetCenter, d, this));
			c.addObserver(d, "setCurrent", a.bind(
							this._windowObserver.onWindowSetCurrent, d, this));
			c.addObserver(d, "destroy", a.bind(
							this._windowObserver.onWindowDestroy, d, this));
			if (d.windowType == "window" || d.windowType == "chatbox") {
				c.addObserver(d, "max", a.bind(
								this._windowObserver.onWindowMax, d, this));
				c.addObserver(d, "fullscreen", a.bind(
								this._windowObserver.onWindowFullscreen, d,
								this));
				c.addObserver(d, "restorefull", a.bind(
								this._windowObserver.onWindowRestoreFull, d,
								this))
			}
			if (d.windowType == "widget") {
				c.addObserver(d, "clickPinUpButton", a.bind(
								this._windowObserver.onWindowPin, d, this));
				c.addObserver(d, "clickPinDownButton", a.bind(
								this._windowObserver.onWindowPinOff, d, this))
			}
		},
		_removeObserversFromWindow : function(d) {
			c.removeObserver(d, "setCenter");
			c.removeObserver(d, "setCurrent");
			c.removeObserver(d, "destroy");
			c.removeObserver(d, "max");
			c.removeObserver(d, "fullscreen")
		}
	})
});
Jet().$package("qqweb.businessClass", function(a) {
	var b = a.dom, c = a.event, d = [], h = {
		onWindowClose : function() {
			n._globalMask && n._globalMask.hide();
			d.length > 0 && d.shift().show()
		}
	}, n = new a.Class({
				_className : "ui_messageBox",
				init : function(i) {
					i = i || {};
					var j = {
						title : "\u6e29\u99a8\u63d0\u793a",
						modeSwitch : true,
						dragable : true,
						resize : false,
						width : 370,
						height : 127,
						innerHtml : "",
						hasCloseButton : true,
						isSetCentered : true,
						modal : false,
						bodyBorder : 1,
						lineHeight : "inherit",
						background : "none repeat scroll 0 0 #FFFFFF",
						level : 3
					};
					a.extend(j, i);
					this.Window = qqweb.layout.getWindowManager().createWindow(
							"Window", j);
					i = this.Window.getId();
					var m = "text-align: center;line-height: " + j.lineHeight
							+ ";background:" + j.background + ";";
					if (j.bodyBorder)
						m += "border:" + j.bodyBorder + "px solid #AAAAAA;";
					this.Window.setHtml('<div class="' + this._className
							+ '" id="ui_messageBox_' + i + '" style="' + m
							+ '"></div>');
					this._uiMessageBox = b.id("ui_messageBox_" + i);
					this._uiMessageBox.innerHTML = j.innerHtml;
					b.setStyle(this._uiMessageBox, "height", this.Window
									.getBodyHeight()
									- j.bodyBorder * 2 + "px");
					c.addObserver(this.Window, "close", h.onWindowClose);
					if (j.modal) {
						this.modal = true;
						if (d.length > 0) {
							this.Window.hide();
							d.push(this.Window)
						} else
							this.show()
					} else
						this.show()
				},
				show : function() {
					var i = this.Window.getZIndexLevel();
					if (this.modal) {
						if (!n._globalMask)
							n._globalMask = qqweb.layout.getMaskLayer();
						n._globalMask.setZIndex(qqweb.layout.getTopZIndex(i));
						n._globalMask.show()
					}
					this.Window.setZIndex(qqweb.layout.getTopZIndex(i));
					this.Window.show()
				}
			}), r = new a.Class({
				extend : n
			}, {
				init : function(i) {
					var j = {
						lineHeight : "50px",
						hasOkButton : true,
						autoClose : true
					};
					if (i.innerHtml.length > 34)
						i.lineHeight = "25px";
					a.extend(j, i);
					r.superClass.init(j);
					j.onAccept
							&& c.addObserver(this.Window, "clickOkButton",
									function() {
										j.onAccept.apply(this);
										j.autoClose && this.close()
									})
				}
			}), w = new a.Class({
				extend : n
			}, {
				init : function(i) {
					var j = {
						lineHeight : "50px",
						hasOkButton : true,
						hasCancelButton : true,
						autoClose : true
					};
					if (i.innerHtml.length > 34)
						i.lineHeight = "25px";
					a.extend(j, i);
					w.superClass.init(j);
					var m = false;
					j.onAccept
							&& c.addObserver(this.Window, "clickOkButton",
									function() {
										j.onAccept.apply(this);
										m = true;
										j.autoClose && this.close()
									});
					j.onCancel
							&& c.addObserver(this.Window, "close", function() {
										m || j.onCancel.apply(this)
									})
				}
			});
	this.MessageBox = n;
	this.MessageBox.Alert = r;
	this.MessageBox.Confirm = w
});
Jet().$package("qqweb.businessClass", function(a) {
	var b = a.dom, c = a.event, d, h, n = function() {
		d = null
	}, r = function(i) {
		i.preventDefault();
		qqweb.portal.setReRunAppList([h.id]);
		h.loginLevel > 2
				? qqweb.layout.showLoginWindow(h.id, true)
				: qqweb.layout.showLoginWindow(h.id, false);
		d.close()
	}, w = function(i) {
		var j = qqweb.appconfig.getAllConfig(i);
		h = j;
		var m = 'Hi\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\u54e6\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
		if (i == "messageBox" || i == "buddyManager")
			m = 'Hi\uff0c\u6b64\u5e94\u7528\u9700\u8981\u767b\u5f55QQ\uff0c\u8d76\u5feb<a id="portal_login_btn" style="font-size:14px;font-weight:bold;" href="###">\u767b\u5f55</a>\u5c1d\u8bd5\u4e00\u4e0b\u5427\uff01';
		i = '<div class="content_area" style="_height:406px"><div class="intro_window_wrap">        <div id="intro_window_area" class="intro_window_area" title="'
				+ a.string.encodeHtmlAttributeSimple(String(j.appDesc))
				+ '">            <h3>'
				+ a.string.encodeHtmlSimple(String(j.appName))
				+ '</h3><span style="text-align:left;">'
				+ a.string.encodeHtmlSimple(String(j.appDesc))
				+ '</span></div>        <div style="margin-top:50px; text-align: center; font-weight: bold; font-size:14px;">'
				+ m + "</div>        </div></div>";
		m = {
			title : j.appName,
			width : 545,
			height : 450,
			level : 0,
			setCenter : 1
		};
		d && d.close();
		d = qqweb.layout.messagebox(i, m);
		i = b.id("intro_window_area");
		b.setStyle(i, "backgroundImage", "url(./module/appmarket/images/thumb_"
						+ j.id + ".png)");
		j = b.id("portal_login_btn");
		c.on(j, "click", r);
		c.addObserver(d, "close", n)
	};
	this.App = new a.Class({
		init : function(i) {
			i.id || a.out("App: [" + i.appName + "] \u7f3a\u5c11 id !!!");
			this.option = {
				id : i.id,
				title : i.appName || "\u672a\u547d\u540d\u5e94\u7528",
				appType : i.appType || 1,
				appUrl : i.appUrl || null,
				windowMode : i.windowMode || "single",
				x : i.x,
				y : i.y,
				width : i.width || 600,
				height : i.height || 500,
				hasCloseButton : a.isUndefined(i.hasCloseButton)
						? true
						: i.hasCloseButton,
				hasMaxButton : a.isUndefined(i.hasMaxButton)
						? true
						: i.hasMaxButton,
				hasMinButton : a.isUndefined(i.hasMinButton)
						? true
						: i.hasMinButton,
				hasOkButton : i.hasOkButton || false,
				hasCancelButton : i.hasCancelButton || false,
				hasRefreshButton : i.hasRefreshButton ? true : false,
				modeSwitch : a.isUndefined(i.modeSwitch) ? true : i.modeSwitch,
				dragable : a.isUndefined(i.dragable) ? true : i.dragable,
				dragProxy : a.isUndefined(i.dragProxy) ? qqweb.layout
						.getWindowManager().getWindowDragProxy() : i.dragProxy,
				resize : a.isUndefined(i.resize) ? true : i.resize,
				defaultMode : a.isUndefined(i.defaultMode)
						? "restore"
						: i.defaultMode,
				flashMode : a.isUndefined(i.flashMode) ? false : i.flashMode,
				loginLevel : a.isUndefined(i.loginLevel)
						? qqweb.CONST.LOGIN_LEVEL_NONE
						: i.loginLevel,
				customLoginValidate : i.customLoginValidate,
				alterMode : a.isUndefined(i.alterMode) ? false : i.alterMode,
				ieOnly : a.isUndefined(i.ieOnly) ? false : i.ieOnly
			};
			if (a.browser.mobileSafari && this.option.id === 15)
				this.option.appUrl = "http://live.qq.com/ipad/";
			a.out("id:" + this.option.id + ", hasCloseButton:"
					+ this.option.hasCloseButton);
			this._isRunning = false;
			c.notifyObservers(this, "init", this)
		},
		detectActiveX : function() {
			var i = null;
			try {
				i = new ActiveXObject("TXFTNActiveX.FTNUpload")
			} catch (j) {
				return false
			}
			if (i) {
				var m = "";
				try {
					m = i && (i.version ? i.version : "1.0.0.8") || ""
				} catch (q) {
				}
				if (!m)
					return false;
				return parseInt(m.split(".").join("")) > 1007 ? true : false
			} else
				return false
		},
		run : function(i) {
			var j = this;
			i = i || {};
			a.extend(this.option, i);
			if (a.platform.iPad)
				switch (parseInt(this.option.id)) {
					case 5 :
					case 9 :
					case 11 :
					case 13 :
					case 24 :
					case 26 :
					case 27 :
					case 30 :
					case 35 :
					case 36 :
					case 37 :
					case 39 :
						qqweb.layout
								.alert("\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u4e0d\u652f\u6301iPad\u3002");
						return
				}
			var m = qqweb.portal.getLoginLevel();
			if (!i.noValidateLogin && this.option.loginLevel > m)
				this.option.customLoginValidate ? c.notifyObservers(this,
						"needLogin", {
							has : this.option.loginLevel,
							need : m
						}) : w(this.option.id);
			else if (this.option.id == "56" && !a.browser.mobileSafari
					&& a.browser.ie != 9)
				qqweb.layout
						.alert("\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u65f6\u4e0d\u652f\u6301\u8be5\u6d4f\u89c8\u5668\u3002");
			else if (a.browser.ie && this.option.id == "13"
					&& !this.detectActiveX())
				qqweb.layout
						.alert(
								"\u6b64\u5e94\u7528\u9700\u8981\u63d2\u4ef6\u652f\u6301\uff0c\u70b9\u51fb\u786e\u5b9a\u83b7\u53d6\u5b89\u88c5",
								function() {
									this.body.innerHTML += '<div><object classid="clsid:BDEACC50-F56D-4D60-860F-CF6ED1766D65" codebase="http://res.qqmail.com/zh_CN/activex/TencentMailActiveX.cab#version=1,0,1,32"></object></div>';
									this.close()
								}, {
									autoClose : false
								});
			else if (this.option.id == "25")
				qqweb.layout
						.messagebox(
								"<div class='flash_alt' style='display: block;'><div class='appIframeAlter'></div><div class='appComingSoon'></div></div>",
								{
									title : this.option.title,
									width : 600,
									height : 450
								});
			else if (this.option.ieOnly && !a.browser.ie || a.browser.ie
					&& this.option.id == "13" && !this.detectActiveX())
				qqweb.layout
						.alert("\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u4ec5\u652f\u6301ie\u6d4f\u89c8\u5668\u3002");
			else {
				if (this.isRunning())
					c.notifyObservers(this, "runAgain", i);
				else {
					this._isRunning = true;
					this.option.windowMode !== "none" && this.createWindow(i);
					if (this.option.appType !== 1)
						if (this.option.appType === 2) {
							var q = qqweb.layout.getWindowManager()
									.getCurrentWindow();
							if ((!this.option.ieOnly || a.browser.ie)
									&& (!a.browser.ie || this.option.id != "13" || this
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
								this._iframe = b.id("iframeApp_"
										+ this.window.getId());
								this._iframeDragResizeMask = b
										.id("iframeApp_dragResizeMask_"
												+ this.window.getId());
								this._containerIframe = b
										.id("container_iframeApp_"
												+ this.window.getId());
								a.platform.iPad
										&& b.addClass(this._containerIframe,
												"ipad");
								if (this.option.alterMode) {
									j.alterDom = b.node("div", {
												"class" : "flash_alt"
											});
									j.alterDom.innerHTML = "<div class='appIframeAlter'></div><div  class='appIframeAlterTxt'>\u8fd0\u884c\u4e2d\uff0c\u70b9\u51fb\u6062\u590d\u663e\u793a :)</div>";
									this.window.body.appendChild(j.alterDom)
								}
								c.on(this._iframe, "load", function() {
											c.notifyObservers(j, "load")
										});
								this._iframe.src = i && i.appUrl
										|| this.option.appUrl;
								var u = {
									onWindowResize : function(p) {
										j.option.flashMode && j.window != q
												|| j._resizeIframe(p)
									},
									onWindowShow : function(p) {
										if (!a.isUndefined(j.window._x)) {
											j.window.setX(j.window._x);
											delete j.window._x
										}
										p = j.window.getBodySize();
										j._resizeIframe(p)
									},
									onWindowDragStart : function() {
										a.platform.iPad
												|| b
														.show(j._iframeDragResizeMask)
									},
									onWindowDragEnd : function() {
										b.hide(j._iframeDragResizeMask)
									},
									onSetCurrent : function() {
										b.setStyle(j._containerIframe,
												"height", "99%");
										b.setStyle(j._containerIframe, "width",
												"100%");
										u.onWindowShow();
										b.hide(j.alterDom)
									},
									onSetNotCurrent : function() {
										if (!a.platform.iPad) {
											b.setStyle(j._iframe, "width",
													"1px");
											b.setStyle(j._iframe, "height",
													"1px");
											b.setStyle(j._containerIframe,
													"width", "1px");
											b.setStyle(j._containerIframe,
													"height", "1px");
											b.show(j.alterDom)
										}
									},
									onWindowMin : function() {
										if (j.option.flashMode) {
											var p = j.window.getX();
											j.window._x = p;
											j.window.setX(-10000);
											j.window._x = p
										}
									}
								};
								this._resizeIframe = function(p) {
									if (!a.platform.iPad) {
										b.setStyle(this._iframe, "width",
												p.width - 2 + "px");
										b.setStyle(this._iframe, "height",
												p.height - 2 + "px")
									}
								};
								if (this.option.alterMode) {
									c.addObserver(this.window, "setCurrent",
											u.onSetCurrent);
									c.addObserver(this.window, "setNotCurrent",
											u.onSetNotCurrent);
									c.addObserver(this.window, "dragStart",
											u.onSetNotCurrent);
									c.addObserver(this.window, "dragEnd",
											u.onSetCurrent)
								} else {
									c.addObserver(this.window, "setNotCurrent",
											u.onWindowDragStart);
									c.addObserver(this.window, "setCurrent",
											u.onWindowDragEnd)
								}
								this.option.flashMode
										&& c.addObserver(this.window, "min",
												u.onWindowMin);
								c.addObserver(this.window, "resize",
										u.onWindowResize);
								c.addObserver(this.window, "show",
										u.onWindowShow)
							}
							m = document.getElementById("iframeApp_"
									+ q.getId());
							var f = false;
							try {
								f = m
										&& typeof m.contentWindow.padEventProxy == "function"
										? true
										: false
							} catch (g) {
							}
							a.platform.iPad && !f
									&& new a.ui.IframeScroller(this._iframe)
						}
					m = function() {
						j.window.setCurrent()
					};
					this.option.windowMode === "single"
							&& c.addObserver(this, "runAgain", m);
					c.notifyObservers(this, "runFirst", i);
					c.addObserver(this, "appExit", j.exit)
				}
				c.notifyObservers(qqweb.portal, "appRun", this.option.id);
				c.notifyObservers(this, "run", i)
			}
		},
		createWindow : function(i) {
			var j = this;
			i = i || {};
			var m = qqweb.layout.getWindowManager().createWindow("Window", {
						appId : j.option.id,
						flashMode : j.option.flashMode,
						loginLevel : j.option.loginLevel,
						title : j.option.title,
						modeSwitch : j.option.modeSwitch,
						dragProxy : j.option.dragProxy,
						dragable : j.option.dragable,
						resize : j.option.resize,
						x : i.x || j.option.x,
						y : i.y || j.option.y,
						width : i.width || j.option.width,
						height : i.height || j.option.height,
						defaultMode : j.option.defaultMode,
						hasRefreshButton : j.option.hasRefreshButton,
						hasCloseButton : j.option.hasCloseButton,
						hasMaxButton : j.option.hasMaxButton,
						hasMinButton : j.option.hasMinButton,
						hasOkButton : j.option.hasOkButton,
						hasCancelButton : j.option.hasCancelButton,
						alterMode : j.option.alterMode,
						ieOnly : j.option.ieOnly,
						appType : j.option.appType
					});
			this.window = m;
			i = {
				onWindowClose : function() {
					if (j._iframe)
						j._iframe.src = "about:blank";
					j.destroy()
				},
				onExit : function() {
					c.notifyObservers(m, "closeWindow", m)
				}
			};
			c.addObserver(m, "close", i.onWindowClose);
			c.addObserver(this, "exit", i.onExit);
			return m
		},
		setCurrent : function() {
			c.notifyObservers(this, "setCurrent");
			this.window && this.window.setCurrent()
		},
		getCurrent : function() {
			return null
		},
		isRunning : function() {
			return this._isRunning
		},
		exit : function() {
			c.notifyObservers(this, "exit");
			this.destroy()
		},
		destroy : function() {
			c.notifyObservers(this, "destroy");
			this._isRunning = false;
			c.notifyObservers(qqweb.portal, "appExit", this.option.id)
		},
		updateAppConfig : function(i) {
			var j = this;
			if (i.id == j.option.id) {
				a.extend(j.option, i);
				j._isRunning && i.type == 2 && j.window.setTitle(i.appName)
			}
		},
		removeAppConfig : function() {
			var i = this;
			if (i._iframe)
				i._iframe.src = "about:blank";
			i.exit()
		},
		touchMoveHandler : function(i) {
			var j = this._iframe, m = this._containerIframe, q = this._contentx
					+ i.sx;
			i = this._contenty + i.sy;
			var u = b.getWidth(j), f = b.getHeight(j), g = b.getWidth(m);
			m = b.getHeight(m);
			if (q > 0)
				q = 0;
			else if (q < g - u)
				q = g - u;
			if (i > 0)
				i = 0;
			else if (i < m - f)
				i = m - f;
			b.setStyle(j, "left", q + "px");
			b.setStyle(j, "top", i + "px");
			this._contentx = q;
			this._contenty = i
		}
	})
});
Jet().$package("qqweb.portal", function(a) {
	var b = this, c = a.event, d = a.http, h, n = false, r, w = qqweb.CONST.LOGIN_LEVEL_NOCHAT, i = 1, j, m = false, q = "", u, f, g = "", p = "", l = null, t = 0, y = false, z, D, E, I = true;
	b.speedTest = qqweb.util.speedTest;
	this.setPortalSelf = function(k) {
		b.self.uin = k.uin || b.getUin();
		b.self.allow = k.allow;
		b.self.age = k.age;
		b.self.nick = k.nick;
		b.self.htmlNick = a.string.encodeHtml(String(k.nick));
		b.self.titleNick = String(k.nick);
		b.self.country = k.country;
		b.self.province = k.province;
		b.self.city = k.city;
		b.self.gender = k.gender;
		b.self.face = k.face;
		b.self.phone = k.phone;
		b.self.mobile = k.mobile;
		b.self.email = k.email
	};
	this.setPortalSelfItem = function(k, v) {
		b.self[k] = v
	};
	this.getPortalSelf = function(k) {
		return typeof b.self == "undefined" ? {} : typeof k == "undefined"
				? b.self
				: b.self[k]
	};
	var M = function() {
		a.profile("runCoreApps Start!", "portal!");
		b.runApp("myPanel", {
					callback : function() {
						qqweb.app.taskBar.run();
						qqweb.app.appBar.run();
						qqweb.app.tips.run();
						b.runApp("bubbleTip");
						O();
						T()
					}
				});
		a.profile("runCoreApps Finish!", "portal!")
	}, L = function() {
		var k = b.getLoginLevel(), v;
		if (k == 1)
			v = "panel";
		else if (k == 2)
			v = "go";
		else if (k == 3)
			v = "logined";
		return v
	}, J = function() {
		a.profile("runDefaultApps Start!", "portal!");
		for (var k = Q(), v = b.getLoginLevel(), A = 0; A < k.length; ++A)
			if (k[A] == qqweb.config.__eqqid) {
				if (v != 3) {
					var B = L();
					a
							.debug(	"run EQQ in [runDefaultApps],level:" + v
											+ ": " + B, "_plogin");
					b.runApp(qqweb.config.__eqqid, {
								loginMode : B
							})
				}
			} else
				b.runApp(k[A]);
		a.profile("runDefaultApps Finish!", "portal!")
	}, P = function() {
		a.profile("runAppsInRunStatus Start!", "portal!");
		for (var k = qqweb.config.configList.runStatus, v = b.getLoginLevel(), A = 0; A < k.appList.length; A++) {
			var B = k.appList[A];
			if (B.appId == qqweb.config.__eqqid)
				if (v == 2) {
					var F = L();
					a.debug("run EQQ in [runAppsInRunStatus],level:" + v + ": "
									+ F, "_plogin");
					qqweb.portal.runApp(qqweb.config.__eqqid, {
								defaultMode : B.defaultMode,
								x : B.x,
								y : B.y,
								width : B.width,
								height : B.height,
								loginMode : F
							})
				} else {
					if (v == 3) {
						F = "update";
						a.debug("run EQQ in [runAppsInRunStatus],level:" + v
										+ ": " + F, "_plogin");
						qqweb.portal.runApp(qqweb.config.__eqqid, {
									defaultMode : B.defaultMode,
									x : B.x,
									y : B.y,
									width : B.width,
									height : B.height,
									loginMode : F
								})
					}
				}
			else
				qqweb.portal.runApp(B.appId, {
							defaultMode : B.defaultMode,
							x : B.x,
							y : B.y,
							width : B.width,
							height : B.height
						})
		}
		k.currentApp && b.runApp(k.currentApp);
		a.profile("runAppsInRunStatus Finish!", "portal!")
	};
	this.setReRunAppList = function(k) {
		E = k
	};
	var N = function() {
		a.profile("reRunBeforeLoginApps Start!", "portal!");
		if (E) {
			for (var k = 0; k < E.length; ++k) {
				var v = E[k], A = b.getApp(v);
				if (A && !A.isRunning())
					if (v == qqweb.config.__eqqid) {
						v = L();
						a.debug("run EQQ in [reRunBeforeLoginApps],level:"
										+ b.getLoginLevel() + ": " + v,
								"_plogin");
						b.runApp(qqweb.config.__eqqid, {
									loginMode : v
								})
					} else
						b.runApp(v)
			}
			b.setReRunAppList([])
		}
		a.profile("reRunBeforeLoginApps Finish!", "portal!")
	}, Q = function() {
		return ["18", "19", "20", qqweb.config.__eqqid]
	}, R = function() {
		return ["56"]
	}, s = function() {
		a.profile("runPopApps Start!", "portal!");
		for (var k = R(), v = 0; v < k.length; ++v)
			switch (k[v]) {
				case "56" :
					if (a.browser.mobileSafari || a.browser.ie == 9)
						b.runApp(k[v], {
									x : 230,
									y : 60
								});
					break;
				default :
					break
			}
		a.profile("runPopApps Finish!", "portal!")
	}, o = function() {
		var k = a.string.mapQuery(window.location.search).run || "";
		if (k)
			return a.json.parse(k)
	}, x = function() {
		var k = o();
		if (a.isObject(k))
			for (var v in k) {
				k[v].runFrom = "url";
				qqweb.portal.runApp(v, k[v])
			}
	}, C = function() {
		a.cookie.remove("ptwebqq", qqweb.CONST.MAIN_DOMAIN);
		a.cookie.remove("skey", qqweb.CONST.MAIN_DOMAIN);
		a.cookie.remove("uin", qqweb.CONST.MAIN_DOMAIN);
		a.cookie.remove("vfwebqq", qqweb.CONST.MAIN_DOMAIN)
	}, H = function() {
		a.profile("reset start!", "portal!");
		aa();
		c.notifyObservers(qqweb.portal, "reset", b.getLoginLevel());
		a.profile("reset finish!", "portal!")
	}, G = function() {
		w = b.getUin() && b.getSkey() ? 2 : 1
	}, O = function() {
		a.profile("initAccount start!", "portal!");
		q = b.getOriginalCookieUin();
		p = b.getCookieSkey();
		g = b.getCookiePtwebqq();
		u = b.getCookieUin();
		G();
		a.profile("initAccount finish!", "portal!")
	}, ba = function() {
		q = b.getOriginalCookieUin();
		p = b.getCookieSkey();
		g = b.getCookiePtwebqq();
		b.setUin(b.getCookieUin())
	}, T = function() {
		D = j = true;
		a.profile("tryLogin start, tryLoginLevel:" + w, "portal!");
		if (w == qqweb.CONST.LOGIN_LEVEL_ALL) {
			b.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_ALL);
			if (U())
				H();
			else
				D = false;
			a.debug("run EQQ in [tryLogin],tryLoginLevel:" + w + ": logined",
					"_plogin");
			b.runApp(qqweb.config.__eqqid, {
						loginMode : "logined"
					})
		} else if (w == qqweb.CONST.LOGIN_LEVEL_NOCHAT) {
			qqweb.util.report2h("get_vfwebqq", "start");
			qqweb.rpcService.sendGetVfWebQQ(b.getUin())
		} else
			V();
		a.profile("tryLogin finish!", "portal!")
	}, V = function() {
		c.notifyObservers(b, "UACReady")
	}, aa = function() {
		var k = b.getRunningAppStatus();
		if (k)
			for (var v = 0; v < k.appList.length; v++) {
				var A = k.appList[v].appId;
				if (~~A)
					A = "app" + A;
				(A = qqweb.app[A]) && A.isRunning() && A.exit()
			}
	}, ca = function() {
		t == 1 && x();
		qqweb.config.configList.runStatus ? P() : J();
		N();
		s()
	}, U = function() {
		if (b.getUin() === b.getOldUin()) {
			a.debug("uin not change: " + b.getUin(), "_plogin");
			return false
		} else {
			a.debug("uin change: " + b.getOldUin() + " -> " + b.getUin(),
					"_plogin");
			return true
		}
	}, W = function() {
		if (i === r) {
			a.debug("loginLevel not change: " + i, "_plogin");
			return false
		} else {
			a.debug("loginLevel change: " + r + " -> " + i, "_plogin");
			return true
		}
	}, X = function() {
		n || qqweb.portal.recoverCookie()
	}, K = {
		onPortalReady : function(k) {
			m = true;
			t++;
			a.profile("onPortalReady, portalReadyCount:" + t + ", level:" + k,
					"portal!");
			if (U() || t == 1)
				ca();
			if (t == 1) {
				setTimeout(function() {
							qqweb.layout.hideStartingCover()
						}, 1E3);
				try {
					if (typeof pgvMain == "function") {
						pvRepeatCount = 1;
						pgvMain("", {
									virtualURL : qqweb.CONST.DOMAIN
								})
					}
					qqweb.util.report2h("portal", "end");
					qqweb.portal.speedTest.sRTS(8, "end", new Date, true)
				} catch (v) {
				}
			}
		},
		onExitSuccess : function() {
			location.reload()
		},
		onGetVfWebQQError : function() {
			a.profile("onGetVfWebQQError", "portal!");
			qqweb.util.report2h("get_vfwebqq_error", "start");
			b.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NONE);
			V()
		},
		onGetVfWebQQSuccess : function(k) {
			b.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NOCHAT);
			l = k.result && k.result.length === 2 && k.result[0] == "vfwebqq"
					? k.result[1]
					: null;
			a.profile("onGetVfWebQQSuccess, vfwebqq:" + l, "portal!");
			qqweb.util.report2h("get_vfwebqq", "end");
			H();
			c.notifyObservers(qqweb.portal, "GetLoginInfoSuccess")
		},
		onGetLoginInfoSuccess : function() {
			qqweb.util.report2h("pass_ptlogin", "end")
		},
		onSelfInfoReady : function() {
			a.profile("onSelfInfoReady", "portal!");
			if (j) {
				j = false;
				if (D) {
					D = false;
					qqweb.config.init()
				} else
					W() && N()
			}
		},
		onReset : function() {
		},
		onGetAppConfigComplete : function() {
			var k = b.getLoginLevel();
			a.profile("onGetAppConfigComplete", "portal!");
			try {
				c.notifyObservers(qqweb.portal, "portalReady", k)
			} catch (v) {
				a.error("portalReady, but [portalReady notify] error, level:"
						+ k)
			}
		},
		onUpdateAppConfig : function(k) {
			var v = b.getApp(k.id);
			v && v.updateAppConfig(k)
		},
		onRemoveAppConfig : function(k) {
			var v = b.getApp(k.id);
			v && v.removeAppConfig(k);
			delete qqweb.app["app" + k.id];
			b.setAppLoading(k.id, false)
		}
	};
	this.init = function() {
		h = {};
		z = 0;
		c.addObserver(qqweb.portal, "exitSuccess", K.onExitSuccess);
		c.addObserver(qqweb.rpcService, "GetVfWebQQError", K.onGetVfWebQQError);
		c.addObserver(qqweb.rpcService, "GetVfWebQQSuccess",
				K.onGetVfWebQQSuccess);
		c.addObserver(qqweb.portal, "GetLoginInfoSuccess",
				K.onGetLoginInfoSuccess);
		c.addObserver(qqweb.portal, "selfInfoReady", K.onSelfInfoReady);
		c.addObserver(qqweb.portal, "reset", K.onReset);
		c.addObserver(qqweb.appconfig, "GetAppConfigComplete",
				K.onGetAppConfigComplete);
		c.addObserver(qqweb.appconfig, "GetDefaultAppConfigComplete",
				K.onGetAppConfigComplete);
		c.addObserver(qqweb.appconfig, "UpdateAppConfig", K.onUpdateAppConfig);
		c.addObserver(qqweb.appconfig, "RemoveAppConfig", K.onRemoveAppConfig);
		c.addObserver(qqweb.portal, "portalReady", K.onPortalReady);
		qqweb.layout.init();
		qqweb.sound.init();
		qqweb.layout.themeManager.init();
		qqweb.portal.messageCenter.init();
		c.addObserver(qqweb.layout, "clickDesktop", X);
		c.addObserver(qqweb.layout, "desktopFocus", X);
		M();
		qqweb.util.report2h("portal", "end_runCoreApps")
	};
	this.getPtwebqq = function() {
		return g
	};
	this.setPtwebqq = function(k) {
		return g = k
	};
	this.getOldUin = function() {
		return f
	};
	this.getUin = function() {
		return u
	};
	this.getOriginalUin = function() {
		return q
	};
	this.getSkey = function() {
		return p
	};
	this.getLoginLevel = function() {
		return i
	};
	this.setLoginLevel = function(k) {
		r = i;
		i = k;
		W() && c.notifyObservers(qqweb.portal, "loginLevelChange", k)
	};
	this.isPortalReady = function() {
		return m
	};
	this.setUin = function(k) {
		f = u;
		return u = k
	};
	this.recoverCookie = function() {
	};
	this.validatePTLoginSuccess = function(k) {
		k = k || {};
		k = a.string.mapQuery(k.url);
		w = Number(k.login_level);
		a.profile("validatePTLoginSuccess, tryLoginLevel:" + w, "portal!");
		qqweb.util.report2h("pass_ptlogin", "start");
		ba();
		T();
		qqweb.layout.hideLoginWindow()
	};
	this.getCookieUin = function() {
		var k = a.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN);
		k = k ? parseInt(k.substr(1), 10) : null;
		a.out("Cookie uin:" + k);
		return k
	};
	this.getOriginalCookieUin = function() {
		return a.cookie.get("uin", qqweb.CONST.MAIN_DOMAIN)
	};
	this.getCookieSkey = function() {
		return a.cookie.get("skey", qqweb.CONST.MAIN_DOMAIN)
	};
	this.getCookiePtwebqq = function() {
		return a.cookie.get("ptwebqq", qqweb.CONST.MAIN_DOMAIN)
	};
	this.runApp = function(k, v) {
		var A = this.getAllConfig(k);
		if (A) {
			var B = this.getApp(k);
			if (B) {
				B.run && B.run(v);
				v && a.isFunction(v.callback) && v.callback()
			} else if (A)
				if (A.appType == 1)
					this.loadApp(A, v);
				else if (A.appType == 2) {
					if (~~k > 0)
						qqweb.app["app" + k] = new qqweb.businessClass.App(A);
					else
						qqweb.app[k] = new qqweb.businessClass.App(A);
					qqweb.portal.runApp(k, v)
				}
			if (A)
				I = false
		} else
			a.out("id:" + k)
	};
	this.loadApp = function(k, v) {
		k = k || {};
		if (!this.getAppLoading(k.id)) {
			this.setAppLoading(k.id, true);
			var A = k.id, B = qqweb.util.getAppRoot(A), F = B
					+ (k.css || "style.css");
			B = B + (k.js || "main.js");
			if (k.css || a.isNumber(A))
				d.loadCss(F + "?" + qqweb.CONST.UPDATE_TIME_STAMP);
			d.loadScript(B + "?" + qqweb.CONST.UPDATE_TIME_STAMP, {
						onSuccess : function() {
							qqweb.portal.runApp(k.id, v)
						}
					})
		}
	};
	this.getAppConfigList = function() {
		return qqweb.appconfig.appConfigList
	};
	this.getAppConfig = function(k) {
		return qqweb.appconfig.getAppConfig(k)
	};
	this.getSystemConfig = function(k) {
		return qqweb.appconfig.getSystemConfig(k)
	};
	this.getAllConfig = function(k) {
		return qqweb.appconfig.getAllConfig(k)
	};
	this.getApp = function(k) {
		return ~~k > 0 ? qqweb.app["app" + k] : qqweb.app[k]
	};
	this.setAppLoading = function(k, v) {
		return h[k] = v
	};
	this.getAppLoading = function(k) {
		return h[k]
	};
	this.closeHook = function(k) {
		WebqCore.api.log("browser-close");
		var v = "\u60a8\u786e\u8ba4\u8981\u79bb\u5f00 WebQQ \u5417\uff1f";
		if (b.getLoginLevel() < qqweb.CONST.LOGIN_LEVEL_ALL)
			v = "\u6267\u884c\u6b64\u64cd\u4f5c\u53ef\u80fd\u4f1a\u4e22\u5931\u9875\u9762\u4e2d\u7684\u4fe1\u606f\uff0c\u786e\u8ba4\u7ee7\u7eed\uff1f";
		pgvSendClick({
					hottag : "web2qq.qqpanel.status.exitQQ"
				});
		if (a.browser.safari || a.browser.chrome)
			return v;
		else if (a.browser.ie > 0)
			window.event.returnValue = v;
		else
			k.returnValue = v
	};
	var da = function() {
		if (EQQ && EQQ.getIsLogin()) {
			EQQ.logout();
			WebqCore.api.log("browser-close-ok");
			EQQ.RPCService._proxy && EQQ.RPCService._proxy.abort();
			EQQ.View.ChatBox && EQQ.View.ChatBox.scaptureHotkey
					&& EQQ.View.ChatBox.scaptureHotkey.unstall()
		}
	};
	this.addCloseHook = function() {
		if (!y) {
			y = true;
			c.on(window, "beforeunload", this.closeHook);
			c.on(window, "unload", da)
		}
	};
	this.removeCloseHook = function() {
		c.off(window, "beforeunload");
		y = false
	};
	this.getCloseHook = function() {
		return y
	};
	this.addExitConfirm = function(k) {
		z += k || 1;
		z > 0 && this.addCloseHook();
		return z
	};
	this.removeExitConfirm = function(k) {
		z -= k || 1;
		z < 1 && this.removeCloseHook();
		return z
	};
	this.getExitConfirm = function() {
		return z
	};
	var Y = function() {
		var k = qqweb.layout.getWindowManager().getCurrentWindow(), v = "";
		if (k)
			v = k.getAppId();
		c.notifyObservers(qqweb.portal, "exit");
		n = true;
		C();
		a.out(">>>>> cookie.remove");
		qqweb.layout.hideDesktop();
		setTimeout(function() {
					c.notifyObservers(qqweb.portal, "exitSuccess")
				}, 1E3);
		I && pgvSendClick({
					hottag : "WEB2QQ.NOAPP.USER.ALL"
				})
	};
	this.exit = function() {
		this.getExitConfirm() > 0 ? qqweb.layout.confirm(
				"\u60a8\u786e\u8ba4\u8981\u79bb\u5f00 WebQQ \u5417\uff1f",
				function() {
					b.removeCloseHook();
					pgvSendClick({
								hottag : "web2qq.qqpanel.status.exitQQ"
							});
					Y()
				}) : Y()
	};
	this.getVfWebQQ = function() {
		return typeof EQQ !== "undefined" && EQQ.getVfWebQQ && EQQ.getVfWebQQ()
				&& EQQ.getIsLogin() ? EQQ.getVfWebQQ() : l ? l : ""
	};
	this.getRunningAppStatus = function() {
		var k = qqweb.layout.getWindowManager(), v = k.getCurrentWindow(), A = "", B;
		if (v)
			A = v.getAppId();
		v = {
			currentAppId : A,
			appList : []
		};
		k = k.getWindowList();
		for (A = 0; A < k.length; A++) {
			var F = k[A], S = F.getAppId();
			if (!(S === "eqq--" || S === "sceneChristmas")) {
				B = F.getX();
				var Z = F.getY();
				if (F.windowType === "window") {
					var $ = F.getBoxStatus();
					if ($ !== "min") {
						var ea = F.getWidth();
						F = F.getHeight();
						B = {
							appId : S,
							defaultMode : $,
							x : B,
							y : Z,
							width : ea,
							height : F
						};
						S && v.appList.push(B)
					}
				} else if (F.windowType === "widget") {
					B = {
						appId : S,
						x : B,
						y : Z
					};
					v.appList.push(B)
				}
			}
		}
		return v
	};
	this.openInWebBrowser = function(k) {
		k = k || {};
		var v = this.getApp(6);
		if (a.isUndefined(v) || !v.isRunning()) {
			k.isOpenNewTab = true;
			qqweb.portal.runApp("6", k)
		} else {
			v.openUrl(k);
			k.callback && k.callback()
		}
	};
	this.addNotificationSource = function(k, v, A) {
		qqweb.portal.messageCenter
				&& qqweb.portal.messageCenter.addNotificationSource(k, v, A)
	};
	this.removeNotificationSource = function(k) {
		qqweb.portal.messageCenter
				&& qqweb.portal.messageCenter.removeNotificationSource(k)
	}
});
Jet().$package("qqweb.portal.messageCenter", function(a) {
	var b = a.event, c = this, d = {}, h = [], n = function(i) {
		return i.uin + i.type
	}, r = function(i) {
		for (var j in i) {
			a.out("MessageCenter MessageReceive!");
			var m = i[j], q = n(m);
			if (d[q]) {
				if (m.resetCount)
					d[q].count = 1;
				else if (d[q].msg.resetCount)
					d[q].count = 1;
				else
					d[q].count++;
				d[q].msg = m
			} else
				d[q] = {
					id : q,
					msg : m,
					count : 1
				};
			var u = "";
			switch (m.type) {
				case "single" :
					u = "Single";
					break;
				case "group" :
					u = "Group";
					break;
				case "system" :
					u = "System";
					break;
				case "mail" :
					u = "Mail";
					break;
				default :
					u = "Other";
					break
			}
			try {
				a.out("MessageCenter NotifyMessage! - " + q);
				b.notifyObservers(c, u + "MessageReceive", d[q])
			} catch (f) {
				a.out("MessageCenter NotifyMessageError! - " + q
						+ "\nErrorInfo: " + f)
			}
		}
	}, w = function(i) {
		var j = n(i.msg);
		if (!i.id)
			i.id = j;
		if (d[j]) {
			d[j] = null;
			delete d[j];
			for (var m in h)
				if (!(i.ignoreEvent && i.ignoreEvent == h[m].cbEvent)) {
					a.out("MessageCenter MessageHasHandled To targetModel - "
							+ h[m].cbEvent);
					b.notifyObservers(h[m].target, h[m].cbEvent, i.msg)
				}
			try {
				a.out("MessageCenter MessageHasHandled To View - " + j);
				b.notifyObservers(c, "MessageHandled", i)
			} catch (q) {
				a.out("MessageCenter MessageHasHandled Error! - " + j
						+ "\nErrorInfo: " + q)
			}
		}
	};
	this.init = function() {
	};
	this.addNotificationSource = function(i, j, m) {
		m = {
			target : i,
			event : j,
			cbEvent : m
		};
		b.addObserver(i, j, r);
		h.push(m);
		qqweb.portal.messageCenter.notifier.isInit()
				|| qqweb.portal.messageCenter.notifier.init()
	};
	this.removeNotificationSource = function(i) {
		if (i) {
			for (var j in h) {
				var m = h[j];
				if (i == m.target) {
					h.splice(j, 1);
					b.removeObserver(m.target, m.event, r);
					break
				}
			}
			for (var q in d) {
				j = d[q];
				if (i == j.msg.targetModel) {
					d[q] = null;
					delete d[q];
					b.notifyObservers(c, "MessageHandled", j)
				}
			}
		}
	};
	this.handleNotification = function(i) {
		w.apply(c, [i])
	}
});
Jet().$package("qqweb.portal.messageCenter.notifier", function(a) {
	var b = a.event, c = a.string, d = false;
	this.CONST = {
		ENABLE_TITLE_MARQUEE : 1,
		ENABLE_MSG_BUBBLE : 2,
		ENABLE_DESKTOP_NOTIFICATION : 4,
		ENABLE_SOUND : 8
	};
	this.init = function() {
		if (!d) {
			d = true;
			this.soundNotify = new h;
			this.titleMarquee = new n;
			qqweb.app.msgBubble.run();
			this.desktopNotification = new r;
			if (a.browser.ie == 9)
				this.desktopNotification2 = new w
		}
	};
	this.isInit = function() {
		return d
	};
	var h = new a.Class({
				init : function() {
					b
							.addObserver(
									qqweb.portal.messageCenter,
									"SingleMessageReceive",
									a
											.bind(
													this.observer.onSingleMessageReceive,
													this));
					b.addObserver(qqweb.portal.messageCenter,
							"GroupMessageReceive", a.bind(
									this.observer.onGroupMessageReceive, this));
					b
							.addObserver(
									qqweb.portal.messageCenter,
									"SystemMessageReceive",
									a
											.bind(
													this.observer.onSystemMessageReceive,
													this))
				},
				checkIsNeedSound : function(i) {
					if (!i.msg.isAllow)
						return false;
					return true
				},
				observer : {
					onSingleMessageReceive : function(i) {
						this.checkIsNeedSound(i)
								&& qqweb.sound.playSound("./sound/msg.mp3",
										true)
					},
					onGroupMessageReceive : function(i) {
						this.checkIsNeedSound(i)
								&& qqweb.sound.playSound("./sound/msg.mp3",
										true)
					},
					onSystemMessageReceive : function(i) {
						this.checkIsNeedSound(i)
								&& qqweb.sound.playSound("./sound/system.mp3",
										true)
					}
				}
			}), n = new a.Class({
		init : function() {
			this._isFocusOnDesktop = true;
			this._enableFlag = qqweb.portal.messageCenter.notifier.CONST.ENABLE_TITLE_MARQUEE;
			b.addObserver(qqweb.portal.messageCenter, "SingleMessageReceive", a
							.bind(this.observer.onSingleMessageReceive, this));
			b.addObserver(qqweb.portal.messageCenter, "GroupMessageReceive", a
							.bind(this.observer.onGroupMessageReceive, this));
			b.addObserver(qqweb.portal.messageCenter, "SystemMessageReceive", a
							.bind(this.observer.onSystemMessageReceive, this));
			b.addObserver(qqweb.layout, "clickDesktop",
					this.observer.onDesktopFocus);
			b.addObserver(qqweb.layout, "desktopFocus", a.bind(
							this.observer.onDesktopFocus, this));
			b.addObserver(qqweb.layout, "desktopBlur", a.bind(
							this.observer.onDesktopBlur, this))
		},
		checkIsNeedMarquee : function(i) {
			var j = qqweb.config.configList.notifySetting;
			if (!a.isUndefined(j) && !(j & this._enableFlag))
				return false;
			if (this._isFocusOnDesktop)
				return false;
			if (!i.msg.isAllow)
				return false;
			return true
		},
		observer : {
			onSingleMessageReceive : function(i) {
				if (this.checkIsNeedMarquee(i)) {
					i = i.msg.title || i.uin || "";
					i = c.decodeHtmlSimple(i);
					i = i + " - \u6765\u6d88\u606f\u4e86...";
					qqweb.layout.resetTitle();
					qqweb.layout.setTitle(i, {
								roll : true
							})
				}
			},
			onGroupMessageReceive : function(i) {
				if (this.checkIsNeedMarquee(i)) {
					i = i.msg.title || i.uin || "";
					i = c.decodeHtmlSimple(i);
					i = i + " - \u6765\u6d88\u606f\u4e86...";
					qqweb.layout.resetTitle();
					qqweb.layout.setTitle(i, {
								roll : true
							})
				}
			},
			onSystemMessageReceive : function(i) {
				if (this.checkIsNeedMarquee(i)) {
					qqweb.layout.resetTitle();
					qqweb.layout
							.setTitle(
									"\u60a8\u6709\u65b0\u7684\u7cfb\u7edf\u6d88\u606f...",
									{
										roll : true
									})
				}
			},
			onDesktopFocus : function() {
				this._isFocusOnDesktop = true;
				this._currentTitleMsg = null;
				a.browser.chrome ? setTimeout(function() {
							qqweb.layout.resetTitle()
						}, 100) : qqweb.layout.resetTitle()
			},
			onDesktopBlur : function() {
				this._isFocusOnDesktop = false
			}
		}
	}), r = new a.Class({
		init : function() {
			var i = new a.ui.Notifier;
			if (i.hasSupport()) {
				i.requestPermission();
				this._notifier = i;
				this._notifierManage = [];
				this._popupHideTime = 5E3;
				this._enableFlag = qqweb.portal.messageCenter.notifier.CONST.ENABLE_DESKTOP_NOTIFICATION;
				b.addObserver(qqweb.portal.messageCenter,
						"SingleMessageReceive", a.bind(
								this.observer.onChatMessageReceive, this));
				b.addObserver(qqweb.portal.messageCenter,
						"GroupMessageReceive", a.bind(
								this.observer.onChatMessageReceive, this))
			}
		},
		checkIsNeedNotify : function(i) {
			var j = qqweb.config.configList.notifySetting;
			if (!a.isUndefined(j) && !(j & this._enableFlag))
				return false;
			if (!i.msg.isAllow)
				return false;
			return true
		},
		observer : {
			onChatMessageReceive : function(i) {
				if (this.checkIsNeedNotify(i)) {
					var j, m, q;
					m = i.msg;
					i = this._notifierManage;
					for (var u = this._notifier; i.length >= 4;) {
						j = i.shift();
						clearTimeout(j.timer);
						j.popup.cancel()
					}
					q = m.type == "single"
							? qqweb.util.getUserAvatar(m.uin, 1)
							: qqweb.util.getGroupAvatar(m.uin, 1);
					j = c.decodeHtmlSimple(m.title);
					m = c.decodeHtmlSimple(m.content);
					m = m.replace(/<img.*?\/?>/ig, function() {
								return "\u3010\u56fe\u7247\u3011"
							});
					m = m.replace(/<br\/>/ig, "\u3000").replace(
							/<([^>]+).*?>/ig, "");
					var f = u.notify(q, j, m);
					if (!f) {
						try {
							u.requestPermission()
						} catch (g) {
						}
						f = u.notify(q, j, m)
					}
					if (f) {
						var p = setTimeout(function() {
									f.cancel()
								}, this._popupHideTime);
						f.addEventListener("close", function() {
									clearTimeout(p)
								});
						i.push({
									popup : f,
									timer : p
								})
					}
				}
			}
		}
	}), w = new a.Class({
				init : function() {
					this._totalMsgCount = 0;
					b.addObserver(qqweb.portal.messageCenter,
							"SingleMessageReceive", a.bind(
									this.observer.onMessageReceive, this));
					b.addObserver(qqweb.portal.messageCenter,
							"GroupMessageReceive", a.bind(
									this.observer.onMessageReceive, this));
					b.addObserver(qqweb.portal.messageCenter, "MessageHandled",
							a.bind(this.observer.onMessageHandled, this));
					b.on(window, "beforeunload", this.observer.onWindowUnload)
				},
				checkIsNeedNotify : function(i) {
					i = i.msg;
					if (i.extraInfo.isChatBoxOpen)
						return false;
					else if (!i.isAllow)
						return false;
					return true
				},
				observer : {
					onMessageReceive : function(i) {
						if (this.checkIsNeedNotify(i)) {
							this._totalMsgCount++;
							qqweb.layout.setIe9IconOverLay(this._totalMsgCount)
						}
					},
					onMessageHandled : function(i) {
						i.count = i.count || 0;
						this._totalMsgCount -= i.count;
						if (this._totalMsgCount < 0)
							this._totalMsgCount = 0;
						qqweb.layout.setIe9IconOverLay(this._totalMsgCount)
					},
					onWindowUnload : function() {
						qqweb.layout.setIe9IconOverLay(0)
					}
				}
			})
});
Jet().$package("qqweb.sound", function(a) {
			var b = false, c, d = [], h = null, n = false;
			qqweb.sound = {
				init : function() {
					a.sound.onload = function() {
						n = true
					};
					a.sound.embedSWF("./swf/swfsound.swf");
					b = false
				},
				playSound : function(r, w) {
					if (this.isMute())
						return false;
					if (r == "")
						return false;
					w = w || false;
					if (typeof d[r] === "undefined") {
						if (!n)
							return false;
						d[r] = h = a.sound.loadSound(r, w,
								qqweb.sound.playSoundObj)
					} else {
						h = d[r];
						qqweb.sound.playSoundObj()
					}
				},
				playSoundObj : function() {
					a.sound.startSound(h)
				},
				setMute : function(r) {
					b = r
				},
				isMute : function() {
					return b
				},
				setVol : function(r) {
					c = r
				},
				getVol : function() {
					return c
				}
			}
		});
Jet().$package("qqweb.layout", function(a) {
	var b = this, c = a.dom, d = a.event, h = a.fx.transitions, n = c
			.getDocumentElement(), r = document.body, w = c.id("startingCover"), i = document.title, j = null, m = c
			.id("desktop"), q, u = false, f = {}, g = [10, 1E5, 2E5, 3E5, 4E5], p, l, t, y, z, D, E, I, M = [], L = null;
	this.Panel = a.ui.Panel;
	this.PopupBox = a.ui.PopupBox;
	var J = {
		stopPropagation : function(o) {
			o.stopPropagation()
		},
		onClickDesktop : function() {
			d.notifyObservers(qqweb.layout, "clickDesktop", b.getDesktop())
		},
		onFocusDesktop : function() {
			d.notifyObservers(qqweb.layout, "desktopFocus")
		},
		onBlurDesktop : function() {
			d.notifyObservers(qqweb.layout, "desktopBlur")
		},
		onWindowResize : function() {
			a.out("desktopResize");
			R();
			d.notifyObservers(qqweb.layout, "desktopResize")
		}
	}, P = new a.fx.Animation({
				element : w,
				property : "opacity",
				from : 1,
				to : 0,
				unit : false,
				duration : 500,
				fps : 30,
				transition : h.quartic.easeIn
			});
	d.addObserver(P, "end", function() {
				c.hide(w)
			});
	var N = new a.fx.Animation({
				element : m,
				property : "opacity",
				from : 1,
				to : 0,
				unit : false,
				duration : 500,
				fps : 30,
				transition : h.quartic.easeIn
			});
	d.addObserver(N, "end", function() {
				c.hide(m)
			});
	var Q = function() {
		a.profile("DesktopCreate");
		var o = c.id("mainPanel"), x = c.id("topBar"), C = c.id("toolBar"), H = c
				.id("qqBar");
		f.topArea = x;
		f.bottomArea = C;
		f.mainArea = o;
		f.leftArea = null;
		f.rightArea = null;
		c.setStyle(x, "height", "62px");
		c.setStyle(x, "overflow", "visible");
		if (a.browser.mobileSafari) {
			o = c.id("touchpad");
			c.show(o);
			o.src = "./touchpad.html?20101021001";
			d.on(r, "touchmove", function(G) {
						G.touches && G.touches.length == 1
								&& G.preventDefault()
					}, true)
		}
		o = E.createPanel({
					id : "desktop",
					name : "desktop",
					container : b.getBody(),
					body : m,
					html : ""
				});
		E.createPanel({
					id : "topBar",
					name : "topBar",
					container : x,
					body : x,
					html : ""
				});
		E.createPanel({
					id : "qqBar",
					name : "qqBar",
					container : H,
					body : H,
					html : ""
				});
		x = c.id("logo");
		d.on(x, "mousedown", function() {
					pgvSendClick({
								hottag : "web2qq.corner.topleft.logo"
							})
				});
		d.on(window, "resize", J.onWindowResize);
		d.on(m, "click", J.onClickDesktop);
		if ("onfocusin" in document) {
			d.on(document, "focusin", J.onFocusDesktop);
			d.on(document, "focusout", J.onBlurDesktop)
		} else {
			d.on(window, "focus", J.onFocusDesktop);
			d.on(window, "blur", J.onBlurDesktop)
		}
		a.profile("DesktopCreateFinish");
		return o
	}, R = function() {
		var o = c.getClientWidth(), x = c.getClientHeight();
		if (a.browser.ie == 6) {
			o = o % 2 + o;
			x = x % 2 + x
		}
		p = o;
		l = x;
		var C = false;
		if (o >= z) {
			c.setStyle(n, "overflowX", "hidden");
			c.setStyle(m, "width", "");
			t = o
		} else {
			C = true;
			c.setStyle(n, "overflowX", "auto");
			c.setStyle(m, "width", z + "px");
			t = z
		}
		if (x >= D) {
			c.setStyle(n, "overflowY", "hidden");
			c.setStyle(m, "height", "");
			y = x
		} else {
			C = true;
			c.setStyle(n, "overflowY", "auto");
			c.setStyle(m, "height", D + "px");
			y = D
		}
		C ? c.setStyle(m, "position", "absolute") : c.setStyle(m, "position",
				"static");
		c.setStyle(r, "height", y + "px");
		if (w) {
			c.setStyle(w, "width", t + "px");
			c.setStyle(w, "height", y + "px")
		}
	}, s = a.Class({
				init : function() {
					this.panelList = []
				},
				createPanel : function(o) {
					o = o || {};
					var x = new a.ui.Panel(o);
					this.panelList[o.id] = x;
					a.out("createPanel:" + o.name, "layout");
					return x
				},
				getPanel : function(o) {
					return this.panelList[o]
				}
			});
	this.init = function() {
		if (a.browser.mobileSafari) {
			z = 680;
			D = 640
		} else {
			z = 320;
			D = 100
		}
		E = this.panelManager = new s;
		Q();
		a.browser.firefox ? setTimeout(J.onWindowResize, 100) : J
				.onWindowResize()
	};
	this.getArea = function(o) {
		return f[o + "Area"]
	};
	this.getAreaWidth = function(o) {
		if (o = f[o + "Area"])
			return c.getWidth(o);
		return 0
	};
	this.getAreaHeight = function(o) {
		if (o = f[o + "Area"])
			return c.getHeight(o);
		return 0
	};
	this.getAvailableWidth = function() {
		return this.getDesktopWidth() - this.getAreaWidth("left")
				- this.getAreaWidth("right")
	};
	this.getAvailableHeight = function() {
		return this.getDesktopHeight() - this.getAreaHeight("top")
				- this.getAreaHeight("bottom")
	};
	this.setDesktopWidth = function(o) {
		return t = o
	};
	this.setDesktopHeight = function(o) {
		return y = o
	};
	this.getDesktopWidth = function() {
		return t
	};
	this.getDesktopHeight = function() {
		return y
	};
	this.getClientWidth = function() {
		return p = p || c.getClientWidth()
	};
	this.getClientHeight = function() {
		return l = l || c.getClientHeight()
	};
	this.getDesktop = function() {
		return E.getPanel("desktop")
	};
	this.getBody = function() {
		return r
	};
	this.getMaskLayer = function() {
		q || (q = new a.ui.MaskLayer({
					appendTo : this.getDesktop().body,
					zIndex : 1,
					opacity : 0.5
				}));
		q.reset();
		return q
	};
	this.getPanel = function(o) {
		return E.getPanel(o)
	};
	this.getTopZIndex = function(o) {
		if (a.isUndefined(o) || !g[o])
			o = 0;
		return g[o]++
	};
	this.getWindowManager = function() {
		if (!I) {
			var o = {
				defaultContainer : this.getDesktop().body
			};
			I = new qqweb.businessClass.WindowManager(o);
			I.registerWindow("Window", qqweb.businessClass.Window);
			I.registerWindow("Widget", qqweb.businessClass.Widget)
		}
		return I
	};
	this.getThemeManager = function() {
	};
	this.showDesktop = function() {
		var o = [], x;
		x = b.getWindowManager();
		for (var C = x.getCurrentWindow(), H = x.getWindowList(), G = 0; G < H.length; G++) {
			x = H[G];
			if (x.isShow && x.isShow()) {
				x.min();
				o.push(x)
			}
		}
		if (o.length > 0) {
			M = o;
			L = C
		} else {
			L && L.setCurrent();
			for (G = 0; G < M.length; G++)
				M[G].show()
		}
	};
	this.setTitle = function(o, x) {
		x.roll = x.roll || false;
		x.speed = x.speed || 500;
		if (x.roll) {
			if (!(o.length < 1)) {
				i = document.title;
				j && clearInterval(j);
				j = setInterval(function() {
							document.title = o;
							o = o.substr(1) + o.charAt(0)
						}, x.speed)
			}
		} else {
			i = document.title;
			document.title = o
		}
	};
	this.resetTitle = function() {
		if (j) {
			clearInterval(j);
			j = null
		}
		document.title = i
	};
	this.setIe9IconOverLay = function(o) {
		var x = qqweb.CONST.DOMAIN, C = ["overlay1", "overlay2", "overlay3",
				"overlay4", "overlay5", "overlay6", "overlay7", "overlay8",
				"overlay9", "overlay10"];
		if (o == 0)
			try {
				window.external.msSiteModeClearIconOverlay()
			} catch (H) {
			}
		else if (o < 10)
			try {
				window.external.msSiteModeSetIconOverlay("http://" + x + "/"
								+ C[o - 1] + ".ico", "overlay " + o);
				window.external.msSiteModeActivate()
			} catch (G) {
			}
		else if (o >= 10)
			try {
				window.external.msSiteModeSetIconOverlay("http://" + x + "/"
								+ C[9] + ".ico", "overlay 10");
				window.external.msSiteModeActivate()
			} catch (O) {
			}
	};
	this.messagebox = function(o, x) {
		x = x || {};
		x.innerHtml = o;
		return (new qqweb.businessClass.MessageBox(x)).Window
	};
	this.alert = function(o, x, C) {
		C = C || {};
		C.onAccept = x;
		C.innerHtml = o;
		return (new qqweb.businessClass.MessageBox.Alert(C)).Window
	};
	this.confirm = function(o, x, C) {
		C = C || {};
		C.onAccept = x;
		C.innerHtml = o;
		return (new qqweb.businessClass.MessageBox.Confirm(C)).Window
	};
	this.hideLoginWindow = function() {
		var o;
		if (o = c.id("ifram_login"))
			o.src = "about:blank";
		try {
			u.close()
		} catch (x) {
		}
	};
	this.showLoginWindow = function(o, x) {
		o = {
			width : 400,
			height : 300,
			title : "\u767b\u5f55WebQQ",
			hasCloseButton : true,
			isSetCurrent : true,
			isSetCentered : true,
			dragable : true,
			src : ""
		};
		var C = window.location.protocol + "//" + window.location.host
				+ "/loginproxy.html";
		if (x) {
			C += "?login_level=3";
			o.title = "\u767b\u5f55QQ"
		} else {
			C += "?login_level=2";
			o.title = "\u767b\u5f55WebQQ"
		}
		C = encodeURIComponent(C);
		var H = "";
		if (x) {
			o.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=4&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url="
					+ C + "&f_url=loginerroralert";
			H = a.cookie.get("closeLoginTip") == ""
					? '                <div id="login_window_content_area" class="content_area"><div style="display:block;position:absolute;padding-left:2px;width:100%;background:#ffffe1"><span style="float:left">\u6e29\u99a8\u63d0\u793a\uff1a\u767b\u5f55\u540e\uff0c\u60a8\u5728\u522b\u5904\u5df2\u767b\u5f55\u7684\u540c\u4e00\u5e10\u53f7\u4f1a\u4e0b\u7ebf.</span><span id="close_login_tip" onclick="this.parentNode.style.display=\'none\';" style="display:inline;cursor:pointer;float:right;margin-right:5px;">\uff58</span></div><div class="login_window_wrap">                <iframe id="ifram_login"  src="'
							+ o.src
							+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                        </div></div>'
					: '                <div id="login_window_content_area" class="content_area"><div class="login_window_wrap">                <iframe id="ifram_login"  src="'
							+ o.src
							+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                        </div></div>'
		} else {
			o.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=self&appid=15000101&hide_title_bar=1&no_verifyimg=1&s_url="
					+ C + "&f_url=loginerroralert&target=self";
			H = '<div id="login_window_content_area" class="content_area"><div class="login_window_wrap">            <iframe id="ifram_login"  src="'
					+ o.src
					+ '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>'
		}
		if (!u || !u.isShow())
			u = qqweb.layout.messagebox("", o);
		else
			u.setCurrent();
		u.setHtml(H);
		if (x) {
			x = c.id("loginIcon");
			o = c.id("loginIcon_disable");
			if (x && o) {
				c.hide(x);
				c.show(o)
			}
			d.addObserver(u, "close", function() {
						d.notifyObservers(qqweb.portal, "StrongLoginClose")
					})
		}
		var G = c.id("login_window_content_area");
		d.addObserver(u, "setNewHeight", function() {
					c.setStyle(G, "height", "99%")
				});
		c.id("close_login_tip")
				&& d.on(c.id("close_login_tip"), "click", function() {
							this.parentNode.style.display = "none";
							a.cookie.set("closeLoginTip", "true", "qq.com", "",
									3E6)
						});
		u.show()
	};
	this.setLoginWindowHeight = function(o) {
		u.setHeight(o)
	};
	this.hideStartingCover = function() {
		P.start()
	};
	this.hideDesktop = function() {
		N.start()
	}
});
Jet().$package("qqweb.layout.themeManager", function(a) {
	var b = this, c = a.dom, d = a.event, h, n, r, w, i = 0, j, m = function() {
		j
				|| (j = document.getElementsByTagName("head")
						? document.getElementsByTagName("head")[0]
						: document.documentElement);
		return j
	}, q, u = {
		skinRoot : "",
		timeStamp : 20110106001,
		window : {
			titleColor : "#666666",
			titleHeight : "39px",
			textColor : "#666666",
			titleFontWeight : "bold",
			bodyAreaTop : "28px",
			actionButtonWidth : "25px",
			actionButtonHeight : "25px",
			ie6WindowCenterBackground : "#C2D2C8",
			ipadContainerBackColor : "rgba(168, 218, 127, .8)"
		},
		currentWindow : {
			titleColor : "black",
			textColor : "#333333",
			ipadContainerBackColor : "rgba(168, 218, 127, 1)",
			windowCenterBackground : "#A8DA7F",
			ie6WindowCenterBackground : "#A8DA7F"
		},
		appbar : {
			aColor : "white"
		},
		panel : {
			ie6Background : "#fff"
		}
	}, f = {
		blue : {
			id : 0,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(182,234,253,.8)",
				ie6WindowCenterBackground : "#C4DEED"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(182,234,253,1)",
				ie6WindowCenterBackground : "#B6EAFD"
			}
		},
		black : {
			id : 1,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(232,232,232,.8)",
				ie6WindowCenterBackground : "#C4C4C4"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(232,232,232,1)",
				ie6WindowCenterBackground : "#e8e8e8"
			}
		},
		light_green : {
			id : 2,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(168,218,127,.8)",
				ie6WindowCenterBackground : "#C2D2C8"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(168,218,127,1)",
				ie6WindowCenterBackground : "#A8DA7F"
			}
		},
		pink : {
			id : 3,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(255,225,229,.8)",
				ie6WindowCenterBackground : "#CCCCCC"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(255,225,229,1)",
				ie6WindowCenterBackground : "#FFE1E5"
			}
		},
		light_violet : {
			id : 4,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(255,225,229,.8)",
				ie6WindowCenterBackground : "#CCCCCC"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(255,225,229,1)",
				ie6WindowCenterBackground : "#FFE1E5"
			}
		},
		dark_voilet : {
			id : 5,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(255,225,229,.8)",
				ie6WindowCenterBackground : "#CCCCCC"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(255,225,229,1)",
				ie6WindowCenterBackground : "#FFE1E5"
			}
		},
		grey : {
			id : 6,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(232,232,232,.8)",
				ie6WindowCenterBackground : "#C4C4C4"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(232,232,232,1)",
				ie6WindowCenterBackground : "#e8e8e8"
			}
		},
		dark_brown : {
			id : 7,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(234,222,197,.8)",
				ie6WindowCenterBackground : "#C4C4C4"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(234,222,197,1)",
				ie6WindowCenterBackground : "#EADEC5"
			}
		},
		dark_blue : {
			id : 8,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(232,232,232,.8)",
				ie6WindowCenterBackground : "#C4C4C4"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(232,232,232,1)",
				ie6WindowCenterBackground : "#e8e8e8"
			}
		},
		light_blue : {
			id : 9,
			timeStamp : 20110106001,
			window : {
				ipadContainerBackColor : "rgba(232,232,232,.8)",
				ie6WindowCenterBackground : "#C4DEED"
			},
			currentWindow : {
				ipadContainerBackColor : "rgba(232,232,232,1)",
				ie6WindowCenterBackground : "#B6EAFD"
			}
		}
	}, g = {
		theme_blue : "blue",
		theme_wood2 : "black",
		theme_green : "light_green",
		theme_pinky_night : "pink",
		theme_pinky_light : "light_violet",
		theme_pinky_flower : "dark_voilet",
		theme_metal : "grey",
		theme_wood1 : "dark_brown",
		theme_universe : "dark_blue",
		theme_christmas : "light_blue",
		theme_2011 : "black"
	}, p = {
		theme_blue : "blue.jpg",
		theme_wood2 : "wood2.jpg",
		theme_green : "green.jpg",
		theme_pinky_night : "pinky_night.jpg",
		theme_pinky_light : "pinky_light.jpg",
		theme_pinky_flower : "pinky_flower.jpg",
		theme_metal : "metal.jpg",
		theme_wood1 : "wood1.jpg",
		theme_universe : "universe.jpg",
		theme_christmas : "christmas.jpg",
		theme_2011 : "2011.jpg"
	}, l = {}, t = function(s, o) {
		s = c.node("style", {
					id : s,
					type : "text/css"
				});
		if (s.styleSheet)
			s.styleSheet.cssText = o;
		else {
			o = document.createTextNode(o);
			s.appendChild(o)
		}
		m().appendChild(s);
		return s
	}, y = function(s, o) {
		o = o || q;
		s = a.extend(u, s);
		return a.string.template(o, s)
	}, z = function(s) {
		return "http://hp.qq.com/webqqpic/style/wallpaper/" + p[s]
	}, D = function(s) {
		var o = l[s];
		if (!o) {
			o = "http://hp.qq.com/webqqpic/style/skin/" + s;
			l[s] = o
		}
		return o
	}, E = function() {
		var s = c.id("skinTemplate");
		q = s.innerHTML;
		document.body.removeChild(s);
		return q
	}, I = function() {
		var s = g.theme_2011, o = "body{ background: url(" + z("theme_2011")
				+ "?t=<%=timeStamp%>) repeat; }\n" + q, x = f[s] || {};
		x.skinRoot = D(s);
		s = y(x, o);
		t("skinStyleNode", s)
	}, M = function(s, o) {
		o = o || function() {
		};
		var x = s.length;
		if (s.length)
			for (var C = function() {
				--x < 1 && o()
			}, H = function() {
				C()
			}, G = function() {
				C()
			}; s.length > 0;) {
				var O = new Image;
				O.onload = H;
				O.onerror = G;
				O.src = s.shift()
			}
		else
			o()
	}, L = new a.Class({
				init : function() {
					this._zoomWallpaperContainer = null;
					this._mode = "repeat";
					var s = this;
					this._onWindowResize = function() {
						s.zoomWallpaper.apply(s)
					}
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
							this._zoomWallpaperContainer = c.node("img", {
										id : "zoomWallpaper",
										"class" : "zoomWallpaper"
									});
						qqweb.layout.getDesktop().body
								.appendChild(this._zoomWallpaperContainer);
						d.on(window, "resize", this._onWindowResize)
					}
				},
				removeHackLayout : function() {
					if (this.isHackLayerNeeded() && this._mode === "zoom") {
						if (this._zoomWallpaperContainer) {
							qqweb.layout.getDesktop().body
									.removeChild(this._zoomWallpaperContainer);
							this._zoomWallpaperContainer = null
						}
						d.off(window, "resize", this._onWindowResize)
					} else
						this._mode === "zoom"
								&& c.removeClass(document.body,
										"wallpaperCss3Zoom")
				},
				getCurrentWallpaper : function() {
					return this._wallpaper
				},
				applyWallpaper : function(s, o) {
					this._wallpaper = s;
					this._nMode = o;
					M([s], a.bind(this.onWallpaperLoaded, this));
					w.closeScene()
				},
				applyBackColor : function(s) {
					c.setStyle(document.body, "backbroundColor", s)
				},
				onWallpaperLoaded : function() {
					var s = "url(" + this._wallpaper + ")";
					this._nMode = this._nMode || "repeat";
					switch (this._nMode) {
						case "repeat" :
							this.removeHackLayout();
							this._mode = "repeat";
							c.setStyle(document.body, "backgroundImage", s);
							c.setStyle(document.body, "backgroundRepeat",
									"repeat");
							break;
						case "center" :
							this.removeHackLayout();
							this._mode = "center";
							c.setStyle(document.body, "backgroundImage", s);
							c.setStyle(document.body, "backgroundRepeat",
									"no-repeat");
							c.setStyle(document.body, "backgroundPosition",
									"center center");
							break;
						case "zoom" :
							this.initHackLayer();
							this._mode = "zoom";
							if (this.isHackLayerNeeded()) {
								this._zoomWallpaperContainer.src = this._wallpaper;
								this.zoomWallpaper()
							} else {
								c.setStyle(document.body, "backgroundImage", s);
								c.setStyle(document.body, "backgroundRepeat",
										"no-repeat");
								c.addClass(document.body, "wallpaperCss3Zoom")
							}
							break;
						default :
							break
					}
				},
				zoomWallpaper : function() {
					if (this._mode === "zoom") {
						var s = qqweb.layout.getDesktopHeight(), o = qqweb.layout
								.getDesktopWidth();
						c.setStyle(this._zoomWallpaperContainer, "height", s
										+ "px");
						c.setStyle(this._zoomWallpaperContainer, "width", o
										+ "px")
					}
				},
				reset : function() {
					this.removeHackLayout();
					this._mode = "repeat";
					if (a.browser.ie) {
						document.body.style.removeAttribute("backgroundImage");
						document.body.style.removeAttribute("backgroundRepeat");
						document.body.style
								.removeAttribute("backgroundPosition")
					} else
						c.setStyle(document.body, "background", "")
				}
			}), J = function() {
		return i++
	}, P = new a.Class({
				init : function() {
					this._oldStyleNode = c.id("skinStyleNode")
				},
				getCurrentSkin : function() {
					return this._skinId
				},
				applySkin : function(s) {
					this._skinId = s;
					var o = f[s];
					this._config = o;
					o.skinRoot = D(s);
					M(this._getPreloadImages(o.skinRoot, o.timeStamp), a.bind(
									this._onImagePreloaded, this))
				},
				applySkinStyle : function(s) {
					if (this._newStyleNode) {
						this._oldStyleNode
								&& m().removeChild(this._oldStyleNode);
						this._oldStyleNode = this._newStyleNode
					}
					this._newStyleNode = t("skinStyleNode" + J(), s)
				},
				_onImagePreloaded : function() {
					var s = this._config.styleText;
					if (!s) {
						s = y(this._config);
						this._config.styleText = s
					}
					this.applySkinStyle(s)
				},
				_getPreloadImages : function(s, o) {
					return a.browser.ie == 6 || a.browser.ie == 7 ? [] : [
							s + "/images/task_buddy.gif?t=" + o,
							s + "/images/toolbar_bg.png?t=" + o,
							s + "/images/topbar_bg.png?t=" + o,
							s + "/images/sprite_repeat_x_png.png?t=" + o,
							s + "/images/sprite_repeat_y_png.png?t=" + o,
							s + "/images/sprite_main_png.png?t=" + o,
							s + "/images/appbar_bg.png?t=" + o,
							s + "/images/appbar_bg_c.png?t=" + o,
							s + "/images/window.png?t=" + o,
							s + "/images/window_cur.png?t=" + o,
							s + "/images/transparent.gif?t=" + o]
				}
			}), N = new a.Class({
				init : function() {
					this.isInit = true
				},
				applyScene : function(s) {
					s == "theme_christmas" ? qqweb.portal
							.runApp("sceneChristmas") : this
							.closeScene("sceneChristmas")
				},
				closeScene : function() {
					qqweb.app.sceneChristmas
							&& qqweb.app.sceneChristmas.isRunning()
							&& qqweb.app.sceneChristmas.exit()
				}
			}), Q = new a.Class({
				init : function() {
				},
				getCurrentTheme : function() {
					return this._themeId
				},
				applyTheme : function(s) {
					this._themeId = s;
					var o = g[s], x = z(s);
					r.applyWallpaper(x);
					n.applySkin(o);
					w.applyScene(s)
				}
			});
	this.applyTheme = function(s) {
		h.applyTheme(s)
	};
	this.getCurrentThemeID = function() {
		return h.getCurrentTheme()
	};
	this.applyWallpaper = function(s, o) {
		r.applyWallpaper(s, o)
	};
	this.getCurrentWallpaper = function() {
		return r.getCurrentWallpaper()
	};
	this.resetWallpaper = function() {
		r.reset()
	};
	this.applySkin = function(s) {
		n.applySkin(s)
	};
	this.init = function() {
		E();
		h = new Q;
		n = new P;
		r = new L;
		w = new N;
		d.addObserver(qqweb.portal, "UACReady", R)
	};
	var R = function() {
		if (qqweb.portal.getUin() && qqweb.portal.getSkey()) {
			var s = qqweb.config.getTheme().id, o = qqweb.config.getWallpaper().id, x = qqweb.config
					.getWallpaper().mode, C = qqweb.config.getWallpaper().url, H = qqweb.config
					.getAppearance().id;
			if (o) {
				b.applyWallpaper(C, x);
				b.applySkin(H)
			} else
				b.applyTheme(s)
		} else
			I()
	}
});
Jet().$package("qqweb.rpcService", function(a) {
	var b = this, c = a.dom, d = a.event, h, n, r = new a.Class({
		init : function(f) {
			this._ajaxRequestInstant = f
		},
		send : function(f, g) {
			g = g || {};
			g.cacheTime = g.cacheTime || 0;
			g.onSuccess = g.onSuccess || function() {
			};
			g.onError = g.onError || function() {
			};
			g.onTimeout = g.onTimeout || function() {
			};
			g.onComplete = g.onComplete || function() {
			};
			var p = {
				method : g.method || "GET",
				contentType : g.contentType || "",
				enctype : g.enctype || "",
				param : g.param || {},
				arguments : g.arguments || {},
				context : g.context || null,
				timeout : g.timeout || 3E4,
				onSuccess : function(t) {
					t = t.responseText || "-";
					var y = {};
					try {
						y = a.json.parse(t)
					} catch (z) {
						a
								.error(
										"qqweb.rpcservice: JSON \u683c\u5f0f\u51fa\u9519",
										"HttpRequest")
					}
					y.arguments = g.arguments || {};
					g.onSuccess.call(g.context, y)
				},
				onError : function(t) {
					g.onError.call(g.context, t)
				},
				onTimeout : function() {
					var t = {};
					t.arguments = g.arguments || {};
					g.onTimeout.call(g.context, t)
				},
				onComplete : function() {
					var t = {};
					t.arguments = g.arguments || {};
					g.onComplete.call(g.context, t)
				}
			};
			qqweb.portal.recoverCookie();
			if (p.method == "GET") {
				p.data = g.data || {};
				var l = a.string.toQueryString(p.data);
				if (g.cacheTime === 0)
					l += l ? "&t=" + (new Date).getTime() : "t="
							+ (new Date).getTime();
				if (l)
					f = f + "?" + l;
				p.data = null
			} else {
				p.data = g.data || "";
				p.contentType = "application/x-www-form-urlencoded";
				f.indexOf("?")
			}
			this._ajaxRequestInstant(f, p)
		}
	}), w = new a.Class({
		init : function(f, g) {
			var p = "qqweb_proxySendIframe" + f, l = this, t;
			this._ajaxCallbacks = [];
			this._proxyAjaxSend = this._proxySend = null;
			a.out("ProxyRequest >>>>> init: " + g, "ProxyRequest");
			f = document.body;
			var y = c.node("div", {
						"class" : "hiddenIframe"
					});
			y.innerHTML = '<iframe id="' + p + '" class="hiddenIframe" name="'
					+ p + '" src="about:blank" width="1" height="1"></iframe>';
			f.appendChild(y);
			t = c.id(p);
			d.on(t, "load", function() {
				var z = window.frames[p];
				a.out("ProxyRequest >>>>> iframe load.", "ProxyRequest");
				try {
					if (z.ajax) {
						l._proxyAjaxSend = z.ajax;
						var D = l._ajaxCallbacks;
						z = 0;
						for (var E = D.length; z < E; z++)
							l.proxySend(D[z].url, D[z].option);
						l._ajaxCallbacks = []
					} else {
						a
								.warn(
										"ProxyRequest >>>>> ajaxProxy error: ajax is undefined!!!!",
										"ProxyRequest");
						a.warn("ProxyRequest >>>>> set proxyIframe src again!",
								"ProxyRequest");
						t.setAttribute("src", g);
						qqweb.util.report2h("proxyrequest_error", "start")
					}
				} catch (I) {
					a.error("ProxyRequest >>>>> ajaxProxy error: " + I.message
									+ " !!!!", "ProxyRequest");
					qqweb.util.report2h("proxyrequest_error2", "start")
				}
			});
			t.setAttribute("src", g)
		},
		send : function(f, g) {
			if (this._proxyAjaxSend) {
				this.proxySend(f, g);
				this.send = this.proxySend
			} else
				this._ajaxCallbacks.push({
							url : f,
							option : g
						})
		},
		proxySend : function(f, g) {
			if (!this._proxySend)
				this._proxySend = new r(this._proxyAjaxSend);
			this._proxySend.send(f, g)
		}
	}), i = new a.Class({
				init : function() {
					this._proxyArr = {};
					this._proxyId = 0
				},
				getProxyId : function() {
					return this._proxyId++
				},
				getProxy : function(f) {
					var g = this._proxyArr[f];
					if (!g) {
						g = new w(this.getProxyId(), f);
						this._proxyArr[f] = g
					}
					return g
				}
			});
	this.selfSend = function(f, g) {
		h || (h = new r(a.http.ajax));
		h.send(f, g)
	};
	this.send = this.proxySend = function(f, g, p) {
		n || (n = new i);
		p = p || qqweb.CONST.API_PROXY_URL;
		n.getProxy(p).send(f, g)
	};
	var j, m = {
		_iframes : [],
		_tick : 0,
		_select : function() {
			this._tick++;
			return this._iframes[(this._tick - 1) % this._len]
		},
		init : function(f) {
			if (this._isInit != true) {
				this._len = f;
				for (var g = document.body, p = 0; p < f; p++) {
					j = c.node("div", {
								"class" : "RPCService_hDiv"
							});
					c.hide(j);
					j.innerHTML = '<iframe id="RPCService_hIframe_' + p
							+ '" name="RPCService_hIframe_' + p
							+ '" src="about:blank"></iframe>';
					g.appendChild(j);
					this._iframes[p] = [j, null, "RPCService_hIframe_" + p]
				}
				this._isInit = true
			}
		},
		take : function(f) {
			var g = this._select();
			g[1] && g[0].removeChild(g[1]);
			f.setAttribute("target", g[2]);
			g[1] = f;
			g[0].appendChild(f)
		}
	};
	this.formSend = function(f, g) {
		m.init(2);
		g = {
			method : g.method || "GET",
			enctype : g.enctype || "",
			data : g.data || {},
			onSuccess : g.onSuccess || function() {
			},
			onError : g.onError || function() {
			},
			onComplete : g.onComplete || function() {
			},
			onTimeout : g.onTimeout || function() {
			},
			timeout : g.timeout ? g.timeout : 1E4
		};
		f = c.node("form", {
					"class" : "RPCService_form",
					method : g.method,
					action : f + "?t=" + (new Date).getTime(),
					enctype : g.enctype
				});
		if (Object.prototype.toString.call(g.data).indexOf("String") > -1) {
			var p = c.node("input");
			p.type = "text";
			p.name = g.data;
			f.appendChild(p)
		} else
			for (var l in g.data) {
				p = c.node("input");
				p.type = "text";
				p.name = l;
				p.setAttribute("value", g.data[l]);
				f.appendChild(p)
			}
		m.take(f);
		f.submit()
	};
	this.sendGetVfWebQQ = function(f, g, p) {
		if (qqweb.portal.getUin() && qqweb.portal.getSkey()) {
			qqweb.portal.speedTest.sRTS(1, "start", new Date);
			this.send(qqweb.CONST.API_SERVER_URL + "get_vfwebqq2", {
				context : this,
				data : {},
				arguments : {},
				onSuccess : g || function(l) {
					if (l.retcode === 0 && l.result && l.result.length === 2
							&& l.result[0] == "vfwebqq") {
						a.out(":GetVfWebQQSuccess...");
						d.notifyObservers(this, "GetVfWebQQSuccess", l)
					} else {
						a
								.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
										+ l.retcode + "-" + l.errmsg);
						d.notifyObservers(this, "GetVfWebQQError", l)
					}
					qqweb.portal.speedTest.sRTS(1, "end", new Date, true);
					qqweb.portal.speedTest.sRTS(4, "start", new Date);
					qqweb.portal.speedTest.sRTS(5, "start", new Date)
				},
				onError : p || function(l) {
					a
							.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
					d.notifyObservers(this, "GetVfWebQQError", l);
					qqweb.portal.speedTest.sRTS(1, "end", new Date, true)
				}
			})
		} else
			d.notifyObservers(this, "GetVfWebQQError", {})
	};
	var q, u = function(f, g) {
		q = qqweb.layout
				.messagebox(
						'<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:30px;">\t\t\t\t\t\t<div style="margin-left:10px;">\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="verify_input_code" type="text" /></div>\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="verify_img_code" src="" />\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t<div id="verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>',
						{
							title : "\u8eab\u4efd\u9a8c\u8bc1",
							resize : true,
							width : 400,
							height : 200,
							hasOkButton : true,
							isSetCentered : false
						});
		var p = c.id("verify_img_code"), l = c.id("verify_a_code"), t = c
				.id("verify_input_code"), y = null;
		d.on(p, "load", function() {
					y = a.cookie.get("verifysession", EQQ.CONST.MAIN_DOMAIN)
				});
		d.on(l, "click", function(z) {
			z.preventDefault();
			c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
					+ Math.random()
		});
		d.addObserver(q, "clickOkButton", function() {
					var z = t.value;
					z && y && g(f, z, y)
				});
		t.focus();
		d.on(t, "keydown", function(z) {
					z.keyCode == 13 && d.notifyObservers(q, "clickOkButton")
							&& setTimeout(function() {
										q.close()
									}, 0)
				});
		c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
				+ Math.random()
	};
	this.sendGetUserInfo = function(f, g, p, l) {
		g = g || "";
		p = p || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_friend_info2", {
			context : this,
			data : {
				tuin : f,
				verifysession : p,
				code : g,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : f
			},
			onSuccess : function(t) {
				if (t.retcode === 0) {
					setTimeout(function() {
								q && q.close()
							}, 0);
					l ? l.call(this, t) : d.notifyObservers(this,
							"GetUserInfoSuccess", t)
				} else if (t.retcode === 1E3)
					u(f, function(y, z, D) {
								b.sendGetUserInfo(y, z, D, l)
							});
				else if (t.retcode === 1001) {
					c.id("verify_img_code_wrong").style.display = "inline";
					c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					c.id("verify_input_code").value = "";
					c.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								q && q.close()
							}, 0);
					d.notifyObservers(this, "GetUserInfoError", t)
				}
			},
			onError : function(t) {
				d.notifyObservers(this, "GetUserInfoError", t)
			}
		})
	};
	this.sendGetSingleInfo = function(f, g, p, l) {
		if (!g || !p)
			u(f, function(t, y, z) {
						b.sendGetSingleInfo(t, y, z, l)
					});
		else {
			g = g || "";
			p = p || "";
			this.send(qqweb.CONST.API_SERVER_URL + "get_single_info2", {
				context : this,
				data : {
					tuin : f,
					verifysession : p,
					code : g,
					vfwebqq : qqweb.portal.getVfWebQQ()
				},
				arguments : {
					uin : f
				},
				onSuccess : function(t) {
					if (t.retcode === 0) {
						setTimeout(function() {
									q && q.close()
								}, 0);
						l ? l.call(this, t) : d.notifyObservers(this,
								"GetUserInfoSuccess", t)
					} else if (t.retcode === 1E3)
						u(f, function(y, z, D) {
									b.sendGetSingleInfo(y, z, D, l)
								});
					else if (t.retcode === 1001) {
						c.id("verify_img_code_wrong").style.display = "inline";
						c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
								+ Math.random();
						c.id("verify_input_code").value = "";
						c.id("verify_input_code").focus()
					} else {
						setTimeout(function() {
									q && q.close()
								}, 0);
						d.notifyObservers(this, "GetUserInfoError", t)
					}
				},
				onError : function(t) {
					d.notifyObservers(this, "GetUserInfoError", t)
				}
			})
		}
	};
	this.sendGetUserInfo_with_code = function(f, g, p, l, t) {
		g = g || "";
		p = p || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_stranger_info2", {
			context : this,
			data : {
				tuin : f,
				verifysession : p,
				gid : 0,
				code : g,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : f
			},
			onSuccess : function(y) {
				if (y.retcode === 0) {
					setTimeout(function() {
								q && q.close()
							}, 0);
					l ? l.call(this, y) : d.notifyObservers(this,
							"GetUserInfoSuccess", y)
				} else if (y.retcode === 1E3)
					u(f, function(z, D, E) {
								b.sendGetUserInfo_with_code(z, D, E)
							});
				else if (y.retcode === 1001) {
					c.id("verify_img_code_wrong").style.display = "inline";
					c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					c.id("verify_input_code").value = "";
					c.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								q && q.close()
							}, 0);
					d.notifyObservers(this, "GetUserInfoError", y)
				}
			},
			onError : t || function(y) {
				a
						.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u4fe1\u606f\u5931\u8d25");
				d.notifyObservers(this, "GetUserInfoError", y)
			}
		})
	};
	this.sendGetFriendUin2 = function(f, g, p, l, t) {
		l = l || "";
		t = t || "";
		this.send(qqweb.CONST.API_SERVER_URL + "get_friend_uin2", {
			context : this,
			data : {
				tuin : f,
				verifysession : t,
				type : g,
				code : l,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				uin : f
			},
			onSuccess : function(y) {
				if (y.retcode === 0) {
					setTimeout(function() {
								q && q.close()
							}, 0);
					p && p(y);
					d.notifyObservers(this, "GetFriendUinSuccess", y)
				} else if (y.retcode === 1E3)
					u(f, function(z, D, E) {
								b.sendGetFriendUin2(z, g, p, D, E)
							});
				else if (y.retcode === 1001) {
					c.id("verify_img_code_wrong").style.display = "inline";
					c.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&"
							+ Math.random();
					c.id("verify_input_code").value = "";
					c.id("verify_input_code").focus()
				} else {
					setTimeout(function() {
								q && q.close()
							}, 0);
					d.notifyObservers(this, "GetFriendUinError", y)
				}
			},
			onError : function(y) {
				a.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684uin\u5931\u8d25");
				d.notifyObservers(this, "GetFriendUinError", y)
			}
		})
	};
	this.sendModifyMyDetails = function(f) {
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "modify_my_details2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(a.json.stringify(f)),
			arguments : {},
			onSuccess : function(g) {
				if (g.retcode === 0) {
					a.out(":ModifyMyDetailsSuccess...");
					d.notifyObservers(this, "ModifyMyDetailsSuccess", g)
				} else {
					a
							.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ g.retcode + "-" + g.errmsg);
					d.notifyObservers(this, "ModifyMyDetailsError", g)
				}
			},
			onError : function(g) {
				a
						.out("\u4fee\u6539\u81ea\u5df1\u7684\u7684\u8be6\u7ec6\u8d44\u6599\u5931\u8d25");
				d.notifyObservers(this, "ModifyMyDetailsError", g)
			}
		})
	};
	this.sendModifyMyAvatar = function(f) {
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "modify_my_head", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(a.json.stringify(f)),
					arguments : {},
					onSuccess : function(g) {
						g.retcode === 0
								? d.notifyObservers(this,
										"ModifyMyAvatarSuccess", g)
								: d.notifyObservers(this,
										"ModifyMyAvatarError", g)
					},
					onError : function(g) {
						d.notifyObservers(this, "ModifyMyAvatarError", g)
					}
				})
	};
	this.sendGetGroupInfoByGid = function(f) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext2", {
			context : this,
			data : {
				gcode : f,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				gcode : f
			},
			onSuccess : function(g) {
				if (g.retcode === 0) {
					a.out(":GetUserInfoSuccess...");
					d.notifyObservers(this, "GetGroupInfoByGidSuccess", g)
				} else {
					a
							.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ g.retcode + "-" + g.errmsg);
					d.notifyObservers(this, "GetGroupInfoByGidError", g)
				}
			},
			onError : function(g) {
				a.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
				d.notifyObservers(this, "GetUserInfoError", g)
			}
		})
	};
	this.sendGetGCardInfo = function(f) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_self_business_card2", {
			context : this,
			data : {
				gcode : f,
				vfwebqq : qqweb.portal.getVfWebQQ()
			},
			arguments : {
				gcode : f
			},
			onSuccess : function(g) {
				if (g.retcode === 0) {
					a.out(":GetGCardInfoSuccess...");
					d.notifyObservers(this, "GetGCardInfoSuccess", g)
				} else {
					a
							.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ g.retcode + "-" + g.errmsg);
					d.notifyObservers(this, "GetGCardInfoError", g)
				}
			},
			onError : function(g) {
				a.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
				d.notifyObservers(this, "GetGCardInfoError", g)
			}
		})
	};
	this.sendGetBuddyList = function(f, g, p) {
		f = f || {};
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.portal.speedTest.sRTS(3, "start", new Date);
		this.send(qqweb.CONST.API_SERVER_URL + "get_user_friends2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(a.json.stringify(f)),
			onSuccess : g || function(l) {
				if (l.retcode === 0) {
					for (var t = l.result.categories || [], y = false, z = 0; z < t.length; z++)
						if (t[z].index == 0)
							y = true;
					y || t.unshift({
								index : 0,
								name : "\u6211\u7684\u597d\u53cb"
							});
					a.out(":GetBuddyListSuccess...1");
					d.notifyObservers(this, "GetBuddyListSuccess", l.result);
					a.out(":GetBuddyListSuccess...2")
				} else {
					a.out("[sendGetBuddyList] error: " + l.retcode + "-"
							+ l.errmsg);
					d.notifyObservers(this, "GetBuddyListError", l);
					a.out("[sendGetBuddyList] error: end")
				}
			},
			onError : p || function(l) {
				a.out("\u597d\u53cb\u5217\u8868\u5931\u8d25");
				d.notifyObservers(this, "GetBuddyListError", l)
			}
		})
	};
	this.sendGetGroupList = function(f, g, p) {
		f = f || {};
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_name_list_mask2", {
					context : this,
					method : "POST",
					data : "r=" + encodeURIComponent(a.json.stringify(f)),
					onSuccess : g || function(l) {
						if (l.retcode === 0) {
							d.notifyObservers(this, "GetGroupListSuccess",
									l.result);
							a.out(":GetGroupListSuccess...")
						} else {
							a.out("[sendGetGroupList] error: " + l.retcode
									+ "-" + l.errmsg);
							d.notifyObservers(this, "GetGroupListError", l)
						}
					},
					onError : p || function(l) {
						a.out("\u7fa4\u5217\u8868\u5931\u8d25");
						d.notifyObservers(this, "GetGroupListError", l)
					}
				})
	};
	this.sendGetRecentList = function(f, g, p) {
		f = f || {};
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_recent_contact2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(a.json.stringify(f)),
			onSuccess : g || function(l) {
				if (l.retcode === 0) {
					d.notifyObservers(this, "GetRecentListSuccess", l.result);
					a.out(":GetRecentListSuccess...")
				} else {
					a.out("[sendGetRecentList] error: " + l.retcode + "-"
							+ l.errmsg);
					d.notifyObservers(this, "GetRecentListError", l)
				}
			},
			onError : p || function(l) {
				a.out("\u6700\u8fd1\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25");
				d.notifyObservers(this, "GetRecentListError", l)
			}
		})
	};
	this.sendChangeGroupMask = function() {
	};
	this.sendGetGroupInfo = function(f) {
		f = f || {};
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		this.send(qqweb.CONST.API_SERVER_URL + "get_group_info_ext2", {
					context : this,
					data : f,
					onSuccess : function(g) {
						if (g.retcode === 0) {
							a.out(":GetGroupInfoSuccess 1...");
							d.notifyObservers(this, "GetGroupInfoSuccess",
									g.result);
							a.out(":GetGroupInfoSuccess 2...")
						} else {
							a.out("[sendGetGroupInfo] error: " + g.retcode
									+ "-" + g.errmsg);
							d.notifyObservers(this, "GetGroupInfoError", g)
						}
					},
					onError : function(g) {
						a.out("\u7fa4\u8d44\u6599\u5931\u8d25");
						d.notifyObservers(this, "GetGroupInfoError", g)
					}
				})
	};
	this.sendGetQQLevel = function(f) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_qq_level2", {
					context : this,
					method : "GET",
					data : {
						tuin : f,
						vfwebqq : qqweb.portal.getVfWebQQ()
					},
					arguments : {
						uin : f
					},
					onSuccess : function(g) {
						if (g.retcode === 0) {
							a.out(":GetQQLevelSuccess 1...");
							d.notifyObservers(b, "GetQQLevelSuccess", g);
							a.out(":GetQQLevelSuccess 2...")
						} else {
							a.out("[sendGetQQLevel] error: " + g.retcode + "-"
									+ g.errmsg);
							d.notifyObservers(b, "GetQQLevelError", g)
						}
					},
					onError : function(g) {
						a.out("QQ\u7b49\u7ea7\u62c9\u53bb\u5931\u8d25");
						d.notifyObservers(b, "GetQQLevelError", g)
					}
				})
	};
	this.sendGetSignature = function(f) {
		this.send(qqweb.CONST.API_SERVER_URL + "get_single_long_nick2", {
					context : this,
					method : "GET",
					data : {
						tuin : f,
						vfwebqq : qqweb.portal.getVfWebQQ()
					},
					arguments : {
						uin : f
					},
					onSuccess : function(g) {
						g.retcode === 0 ? d.notifyObservers(b,
								"GetBuddySignatureSuccess", g) : a
								.out("[sendGetSignature] error: " + g.retcode
										+ "-" + g.errmsg)
					},
					onError : function() {
						a.out(" sendGetSignatureError")
					}
				})
	};
	this.sendGetTipsInfo = function(f) {
		f = f || {};
		qqweb.rpcService.selfSend(qqweb.CONST.MAIN_URL + "web2/get_msg_tip", {
					context : b,
					method : "GET",
					data : {
						uin : f.uin || "",
						tp : f.tp || 1,
						id : f.id || 0,
						retype : f.retype || 1,
						rc : f.rc || 0
					},
					onSuccess : f.onSuccess ? f.onSuccess : function(g) {
						if (g.c === 0)
							d.notifyObservers(b, "GetTipsInfoSuccess", g);
						else
							g.c !== 1 && a.error("[sendGetTipsInfo] error!")
					}
				})
	};
	this.sendQuitGroup = function(f) {
		f.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.send(qqweb.CONST.API_SERVER_URL + "quit_group2", {
			context : this,
			method : "POST",
			data : "r=" + encodeURIComponent(a.json.stringify(f)),
			arguments : f,
			onSuccess : function(g) {
				if (g.retcode === 0) {
					a.out(":sendQuitGroup...");
					d.notifyObservers(qqweb.rpcService, "sendQuitGroupSuccess",
							g)
				} else {
					a
							.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "
									+ g.retcode + "-" + g.errmsg);
					d
							.notifyObservers(qqweb.rpcService,
									"sendQuitGroupError", g)
				}
			},
			onError : function(g) {
				a.out("\u9000\u51fa\u5931\u8d25");
				d.notifyObservers(qqweb.rpcService, "sendQuitGroupError", g)
			}
		})
	};
	this.sendSetConfig = function(f) {
		f.data.vfwebqq = qqweb.portal.getVfWebQQ();
		this.selfSend(qqweb.CONST.MAIN_URL + "cgi/qqweb/uac/"
						+ (f.action || "set") + ".do", {
					method : "POST",
					data : a.string.toQueryString(f.data),
					onSuccess : f.onSuccess,
					context : f.context
				})
	};
	this.sendGetConfigByPost = function(f) {
		f.data.vfwebqq = qqweb.portal.getVfWebQQ();
		this.selfSend(qqweb.CONST.MAIN_URL + "cgi/qqweb/uac", {
					method : "POST",
					data : a.string.toQueryString(f.data),
					onSuccess : f.onSuccess,
					context : f.context
				})
	};
	this.sendGetConfig = function(f) {
		f.data = f.data || {};
		f.data.vfwebqq = qqweb.portal.getVfWebQQ();
		this.selfSend(qqweb.CONST.MAIN_URL + "cgi/qqweb/uac/" + f.action
						+ ".do", {
					data : f.data,
					onSuccess : f.onSuccess,
					context : f.context
				})
	};
	this.sendReport = function(f) {
		qqweb.rpcService.formSend("http://tj.qstatic.com/log", {
					method : "POST",
					data : {
						r : a.string.trim(f)
					}
				})
	}
});
Jet().$package("qqweb.appconfig", function(a) {
	var b = this, c = a.event;
	b = this;
	var d = false, h = false, n = 0;
	this.appConfigList = {};
	this.appTempList = {};
	this.systemConfigList = {
		myPanel : {
			id : "myPanel",
			appName : "\u6211\u7684\u9762\u677f",
			appType : 1,
			appLevel : "system",
			js : "./js/qqweb.system.module.js",
			windowMode : "none",
			customLoginValidate : true,
			settingCenter : 0
		},
		taskBar : {
			id : "taskBar",
			appName : "\u4efb\u52a1\u680f",
			appType : 1,
			appLevel : "system",
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
			windowMode : "none",
			settingCenter : 0
		},
		appMarket : {
			id : "appMarket",
			appName : "\u5e94\u7528\u4e2d\u5fc3",
			appType : 1,
			appDesc : "\u5e94\u7528\u4e2d\u5fc3\u662fWebQQ\u7ed9\u7f51\u53cb\u6dfb\u52a0\u5e94\u7528\u7684\u5e73\u53f0\uff0c\u63d0\u4f9b\u6700\u70ed\uff0c\u6700\u65b0\u7684\u5e94\u7528\uff0c\u7f51\u53cb\u5206\u4eab\u4e5f\u5c3d\u5728\u5176\u4e2d\u3002",
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
	this.getAllConfig = function(m) {
		return r(m, this.appConfigList) || r(m, this.systemConfigList)
	};
	this.getAppConfig = function(m) {
		return r(m, this.appConfigList)
	};
	this.getSystemConfig = function(m) {
		return r(m, this.systemConfigList)
	};
	this.isAppConfigLoad = function() {
		return h
	};
	var r = function(m, q) {
		if (m && m.call) {
			var u = [];
			for (var f in q) {
				var g = q[f];
				m(g) && u.push(g)
			}
			return u
		} else
			return q[m]
	};
	this.clearConfig = function() {
		this.appConfigList = {}
	};
	this.addAppConfigList = function(m) {
		var q = m.result.resultData;
		a.profile("AddAppConfigList");
		for (var u in q)
			if (q[u]) {
				q[u].title = q[u].appName;
				q[u].type = q[u].appType;
				a.extend(q[u], q[u].exinfo)
			} else
				delete q[u];
		a.extend(this.appConfigList, q);
		a.profile("AddAppConfigListEnd");
		c.notifyObservers(b, "AddAppConfigList", m)
	};
	this.addAppConfig = function(m) {
		a.profile("addAppConfig");
		this.appConfigList[m.id] = a.extend(m, m.exinfo);
		w({
					appid : m.id,
					value : 1,
					type : 0
				});
		c.notifyObservers(b, "AddAppConfig", m)
	};
	this.updateAppConfig = function(m) {
		a.profile("updateAppConfig");
		this.appConfigList[m.id] = m;
		c.notifyObservers(b, "UpdateAppConfig", m)
	};
	this.removeAppConfig = function(m) {
		a.profile("removeAppConfig");
		delete this.appConfigList[m.id];
		c.notifyObservers(b, "RemoveAppConfig", m)
	};
	var w = function(m) {
		m.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.selfSend(qqweb.CONST.MAIN_URL
						+ "cgi/qqweb/market/updateapphot.do", {
					context : b,
					method : "POST",
					data : "appattrib="
							+ encodeURIComponent(a.json.stringify(m)),
					arguments : m,
					onSuccess : function(q) {
						q.retcode !== 0
								&& a
										.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25"
												+ q.errmsg)
					},
					onError : function(q) {
						a
								.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25");
						c.notifyObservers(b, "SetAppCountError", q)
					}
				})
	}, i = function(m, q) {
		m.vfwebqq = qqweb.portal.getVfWebQQ();
		qqweb.rpcService.selfSend(qqweb.CONST.MAIN_URL + q, {
			context : b,
			method : "POST",
			arguments : m.appid,
			data : "appattrib=" + encodeURIComponent(a.json.stringify(m)),
			onSuccess : function(u) {
				if (u.retcode === 0)
					if (d) {
						this.addAppConfigList(u);
						c.notifyObservers(b, "GetDefaultAppConfigComplete",
								this.getAppConfigList());
						a.profile("\u9ed8\u8ba4app config\u5b8c\u6210");
						qqweb.util.report2h("def_appinfo", "end")
					} else {
						c.notifyObservers(b, "GetAppConfigAsPartSuccess",
								u.result);
						n++;
						var f = qqweb.config.getSetupAppList(), g = n * 100, p = (n + 1)
								* 100;
						this.addAppConfigList(u);
						if (g < f.length) {
							u = f.slice(g, p);
							i({
										appid : u,
										loadMethod : 2
									}, "cgi/qqweb/market/getappinfo.do")
						} else {
							h = true;
							c.notifyObservers(b, "GetAppConfigComplete", this
											.getAppConfigList());
							qqweb.portal.speedTest.sRTS(5, "end", new Date,
									true);
							a
									.profile("\u81ea\u5b9a\u4e49app config\u5b8c\u6210");
							qqweb.util.report2h("appinfo", "end")
						}
					}
			},
			onError : function(u) {
				a.profile("GetAppConfigError");
				qqweb.util.report2h("all_appinfo_error", "start");
				c.notifyObservers(b, "GetAppConfigError", u.resutlt)
			},
			onTimeout : function() {
				qqweb.util.report2h("all_appinfo_timeout", "start")
			}
		})
	}, j = {
		onUACReady : function() {
			a.profile("UACReady\uff1a" + qqweb.config.isSetupAppListLoaded());
			if (qqweb.config.isSetupAppListLoaded())
				if (h)
					c.notifyObservers(b, "GetAppConfigComplete");
				else {
					c.notifyObservers(b, "ClearDefaultApp");
					var m;
					m = qqweb.config.getSetupAppList();
					b.clearConfig();
					d = false;
					n = 0;
					m = m.slice(0, 100);
					a.profile("\u62c9\u53d6\u81ea\u5b9a\u4e49app config");
					qqweb.util.report2h("appinfo", "start");
					i({
								appid : m,
								loadMethod : 2
							}, "cgi/qqweb/market/getappinfo.do")
				}
			else {
				d = true;
				a.profile("\u62c9\u53d6\u9ed8\u8ba4app config",
						a.console.TYPE.WARNING);
				qqweb.util.report2h("def_appinfo", "start");
				i({
							appid : qqweb.config.getDefaultSetupAppList(),
							loadMethod : 2
						}, "cgi/qqweb/market/getdefaultappinfo.do")
			}
		},
		onReset : function() {
			h = false
		}
	};
	c.addObserver(qqweb.portal, "reset", j.onReset);
	c.addObserver(qqweb.portal, "UACReady", j.onUACReady)
});
Jet().$package(function(a) {
	var b = a.http, c = a.event, d = 1;
	if (top.location.host != location.host) {
		qqweb.util.report2h("be_iframed", "start");
		top.location = location
	}
	a
			.profile("Hello everyone, welcome to WebQQ, 100% loaded, we're starting... time: "
					+ a.now());
	qqweb.util.report2h("portal", "start");
	qqweb.portal.speedTest.sRTS(7, "start", window._SPEEDTIME_WINDOWSTART);
	qqweb.portal.speedTest.sRTS(7, "end", new Date, true);
	qqweb.portal.speedTest.sRTS(8, "start", new Date);
	d = a.browser.mobileSafari ? 1 : 0;
	var h = "./extend/" + d + "/extend.js?t=" + qqweb.CONST.UPDATE_TIME_STAMP, n = "./extend/"
			+ d + "/extend.css?t=" + qqweb.CONST.UPDATE_TIME_STAMP;
	if (n) {
		b.loadCss(n);
		a.profile("loadExtendCSS:" + d)
	}
	c.onDomReady(function() {
				a.profile("WebQQ: dom ready!!! time: " + a.now());
				b.loadScript(h, {
							onSuccess : function() {
								a.profile("loadExtendJS:" + d);
								qqweb && qqweb.init && qqweb.init()
							}
						})
			})
});
