(function() {
	var h = "1.0", c = "JetMark", a = this, k = a.Jet, b = {}, i = {}, j = {
		NO_DEBUG : 0,
		SHOW_ERROR : 1,
		SHOW_WARNING : 2,
		SHOW_INFO : 3,
		SHOW_ALL : 4
	}, f = {
		debug : j.SHOW_ALL
	}, d = function(l, e) {
		l = String(l);
		e = e || 3;
		if (e < f.debug) {
			if (this.console) {
				if (this.console.out) {
					this.console.out(l, e);
				} else {
					alert(l + " - 消息类型[" + e + "]");
				}
			}
		}
		return l;
	};
	try {
		if (typeof k === "undefined" || (k.mark && k.mark === c)) {
			if (k) {
				b = k.VERSIONS;
				i = k.PACKAGES;
			}
			k = function(l, n) {
				var m = this;
				if (n) {
					this._init();
				} else {
					if (l) {
						l = String(l);
						try {
							if (k.VERSIONS[l]) {
								m = k.VERSIONS[l];
							} else {
								m = k.VERSIONS[k.DEFAULT_VERSION];
								throw new Error("没有找到 JET version " + l
										+ ", 所以返回默认版本 JET version "
										+ k.DEFAULT_VERSION + "!");
							}
						} catch (o) {
							m.out(	"A.错误：[" + o.name + "] " + o.message + ", "
											+ o.fileName + ", 行号:"
											+ o.lineNumber + "; stack:"
											+ typeof o.stack, 2);
						}
					} else {
						m = k.VERSIONS[k.DEFAULT_VERSION];
					}
				}
				return m;
			};
			k.prototype = {
				version : h,
				DEBUG : j,
				option : f,
				_init : function() {
					this.constructor = k;
				},
				$namespace : function(e) {
					var m, l, o = e.split("."), n = a;
					for (m = 0; m < o.length; m = m + 1) {
						l = o[m];
						n[l] = n[l] || {};
						n = n[o[m]];
					}
					return n;
				},
				$package : function() {
					var e = arguments[0], n = arguments[arguments.length - 1], m = a, l;
					if (typeof n === "function") {
						if (typeof e === "string") {
							m = this.$namespace(e);
							if (k.PACKAGES[e]) {
							} else {
								k.PACKAGES[e] = {
									isLoaded : true,
									returnValue : l
								};
							}
							m.packageName = e;
						} else {
							if (typeof e === "object") {
								m = e;
							}
						}
						l = n.call(m, this);
					} else {
						throw new Error("Function required");
					}
				},
				checkPackage : function(e) {
					return k.PACKAGES[e];
				},
				out : d,
				startTime : +new Date(),
				about : function() {
					return this
							.out(
									"JET (Javascript Extend Tools)\nversion: "
											+ this.version
											+ "\n\nCopyright (c) 2009, All rights reserved.",
									3);
				},
				toString : function() {
					return "JET version " + this.version + " !";
				}
			};
			k.VERSIONS = b;
			k.PACKAGES = i;
			k.VERSIONS[h] = new k(h, true);
			k.DEFAULT_VERSION = h;
			k.mark = c;
			a.Jet = k;
		} else {
			throw new Error('"Jet" name is defined in other javascript code !!!');
		}
	} catch (g) {
		d(		"JET 微内核初始化失败! B.错误：[" + g.name + "] " + g.message + ", "
						+ g.fileName + ", 行号:" + g.lineNumber + "; stack:"
						+ typeof g.stack, 1);
	}
})();
Jet().$package(function(l) {
	var g, r, q, p, m, n, o, k, c, i, x, s, h, a, v, w, f, j, e, d, b, y, u, t;
	g = function(z) {
		return typeof(z) === "undefined";
	};
	r = function(z) {
		return z === null;
	};
	q = function(z) {
		return (z === 0 || z) && z.constructor === Number;
	};
	m = function(z) {
		return (z === false || z) && (z.constructor === Boolean);
	};
	p = function(z) {
		return (z === "" || z) && (z.constructor === String);
	};
	n = function(z) {
		return (z && (z.constructor === Object))
				|| (String(z) === "[object Object]");
	};
	o = function(z) {
		return z && (z.constructor === Array);
	};
	k = function(z) {
		return z && z.callee && q(z.length) ? true : false;
	};
	c = function(z) {
		return z && (z.constructor === Function);
	};
	i = function(z) {
		if (g(z)) {
			return "undefined";
		} else {
			if (r(z)) {
				return "null";
			} else {
				if (q(z)) {
					return "number";
				} else {
					if (m(z)) {
						return "boolean";
					} else {
						if (p(z)) {
							return "string";
						} else {
							if (n(z)) {
								return "object";
							} else {
								if (o(z)) {
									return "array";
								} else {
									if (k(z)) {
										return "arguments";
									} else {
										if (c(z)) {
											return "function";
										} else {
											return "other";
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	a = function(A, z) {
		return Math.floor(Math.random() * (z - A + 1) + A);
	};
	w = function(A) {
		var z = function() {
		};
		z.prototype = A;
		return (new z());
	};
	x = function(z) {
		return l.isFunction(z) ? z : function() {
			return z;
		};
	};
	s = function() {
		var B, A = arguments.length, z;
		for (B = 0; B < A; B++) {
			try {
				z = arguments[B]();
				break;
			} catch (C) {
				l.out(	"C.错误：[" + C.name + "] " + C.message + ", "
								+ C.fileName + ", 行号:" + C.lineNumber
								+ "; stack:" + typeof C.stack, 2);
			}
		}
		return z;
	};
	v = function(H, C, B) {
		var F = arguments, E, A, H, G;
		if (F.length === 1) {
			H = this;
			E = 0;
		} else {
			H = F[0] || {};
			E = 1;
		}
		for (; E < arguments.length; E++) {
			G = arguments[E];
			for (A in G) {
				var z = H[A], D = G[A];
				if (z === D) {
					continue;
				}
				if (D && n(D) && !D.nodeType && !c(D)) {
					z = H[A] = {};
					z = v(H[A], D || (D.length != null ? [] : {}));
				} else {
					if (D !== undefined) {
						H[A] = D;
					}
				}
			}
		}
		return H;
	};
	f = function() {
		return +new Date;
	};
	j = function(A, E, D, C, F) {
		var z = A.concat(), B = 25;
		if (C) {
			z = A;
		}
		window.setTimeout(function() {
					var G = +new Date();
					do {
						E.call(D, z.shift());
					} while (z.length > 0 && (+new Date() - G < 50));
					if (z.length > 0) {
						window.setTimeout(arguments.callee, B);
					} else {
						if (F) {
							F(A);
						}
					}
				}, B);
	};
	e = function(B) {
		var A, z = 0;
		for (A in B) {
			if (B.hasOwnProperty(A)) {
				z++;
			}
		}
		return z;
	};
	h = function() {
	};
	d = function(A, z) {
		z = z || {};
		A.$$rebuildedFunc = A.$$rebuildedFunc || function() {
			var E = this, C, B, D;
			C = z.contextObj || E;
			B = Array.prototype.slice.call(arguments, 0);
			if (B !== undefined) {
				B = B.concat(z.arguments);
			}
			if (z.event === false) {
				B = B.slice(1);
			}
			return A.apply(C, B);
		};
		return A.$$rebuildedFunc;
	};
	b = function(A, C) {
		var B = Array.prototype.slice;
		var z = B.call(arguments, 1);
		return function() {
			var D = this;
			return A.apply(D, z.concat(B.call(arguments)));
		};
	};
	y = function(B, A, D) {
		var C = Array.prototype.slice;
		var z = C.call(arguments, 2);
		return function() {
			return B.apply(A, z.concat(C.call(arguments)));
		};
	};
	t = function() {
		var C = arguments.length;
		var B = arguments[C - 1];
		B.init = B.init || function() {
		};
		if (C === 2) {
			var A = arguments[0].extend;
			var z = function() {
			};
			z.prototype = A.prototype;
			var D = function() {
				this.init.apply(this, arguments);
			};
			D.superClass = A.prototype;
			D.callSuper = function(G, H) {
				var I = Array.prototype.slice;
				var F = I.call(arguments, 2);
				var H = D.superClass[H];
				if (H) {
					H.apply(G, F.concat(I.call(arguments)));
				}
			};
			D.prototype = new z();
			D.prototype.constructor = D;
			l.extend(D.prototype, B);
			D.prototype.init = function() {
				B.init.apply(this, arguments);
			};
			return D;
		} else {
			if (C === 1) {
				var E = function() {
					this.init.apply(this, arguments);
				};
				E.prototype = B;
				return E;
			}
		}
	};
	l.isUndefined = g;
	l.isNull = r;
	l.isNumber = q;
	l.isString = p;
	l.isBoolean = m;
	l.isObject = n;
	l.isArray = o;
	l.isArguments = k;
	l.isFunction = c;
	l.$typeof = i;
	l.$return = x;
	l.$try = s;
	l.emptyFunc = h;
	l.clone = w;
	l.getLength = e;
	l.random = a;
	l.extend = v;
	l.now = f;
	l.timedChunk = j;
	l.rebuild = d;
	l.pass = b;
	l.bind = y;
	l.bindNoEvent = u;
	l.Class = t;
});
Jet().$package(function(k) {
	k.browserOptions = {
		adjustBehaviors : true,
		htmlClass : true
	};
	k.host = window.location.host;
	var h = navigator.platform.toLowerCase(), b = navigator.userAgent
			.toLowerCase(), c = navigator.plugins, d, g, i, f, l;
	f = function(m, n) {
		("" + m).replace(/_/g, ".");
		n = n || 1;
		m = String(m).split(".");
		m = m[0] + "." + (m[1] || "0");
		m = Number(m).toFixed(n);
		return m;
	};
	d = {
		getPlatform : function() {
			return h;
		},
		name : (window.orientation != undefined) ? "iPod" : (h
				.match(/mac|win|linux/i) || ["unknown"])[0],
		version : 0,
		iPod : 0,
		iPad : 0,
		iPhone : 0,
		android : 0,
		win : 0,
		linux : 0,
		mac : 0,
		set : function(n, m) {
			this.name = n;
			this.version = m;
			this[n] = m;
		}
	};
	d[d.name] = true;
	(l = b.match(/windows ([\d.]+)/)) ? d.set("win", f(l[1])) : (l = b
			.match(/windows nt ([\d.]+)/)) ? d.set("win", f(l[1])) : (l = b
			.match(/linux ([\d.]+)/)) ? d.set("linux", f(l[1])) : (l = b
			.match(/mac ([\d.]+)/)) ? d.set("mac", f(l[1])) : (l = b
			.match(/ipod ([\d.]+)/)) ? d.set("iPod", f(l[1])) : (l = b
			.match(/ipad[\D]*os ([\d_]+)/)) ? d.set("iPad", f(l[1])) : (l = b
			.match(/iphone ([\d.]+)/)) ? d.set("iPhone", f(l[1])) : (l = b
			.match(/android ([\d.]+)/)) ? d.set("android", f(l[1])) : 0;
	g = {
		features : {
			xpath : !!(document.evaluate),
			air : !!(window.runtime),
			query : !!(document.querySelector)
		},
		getPlugins : function() {
			return c;
		},
		plugins : {
			flash : (function() {
				var m = "none";
				if (c && c.length) {
					flash = c["Shockwave Flash"];
					if (flash && flash.description) {
						m = f(flash.description.match(/\b(\d+)\.\d+\b/)[1], 1)
								|| m;
					}
				} else {
					var n = 13;
					while (n--) {
						try {
							new ActiveXObject("ShockwaveFlash.ShockwaveFlash."
									+ n);
							m = f(n);
							break;
						} catch (o) {
						}
					}
				}
				return m;
			})()
		},
		getUserAgent : function() {
			return b;
		},
		name : "unknown",
		version : 0,
		ie : 0,
		firefox : 0,
		chrome : 0,
		opera : 0,
		safari : 0,
		mobileSafari : 0,
		set : function(n, m) {
			this.name = n;
			this.version = m;
			this[n] = m;
		}
	};
	(l = b.match(/msie ([\d.]+)/)) ? g.set("ie", f(l[1])) : (l = b
			.match(/firefox\/([\d.]+)/)) ? g.set("firefox", f(l[1])) : (l = b
			.match(/chrome\/([\d.]+)/)) ? g.set("chrome", f(l[1])) : (l = b
			.match(/opera.([\d.]+)/)) ? g.set("opera", f(l[1])) : (l = b
			.match(/version\/([\d.]+).*safari/)) ? g.set("safari", f(l[1])) : 0;
	(l = b.match(/version\/([\d.]+).*mobile.*safari/)) ? g.set("mobileSafari",
			f(l[1])) : 0;
	i = {
		name : "unknown",
		version : 0,
		trident : 0,
		gecko : 0,
		webkit : 0,
		presto : 0,
		set : function(n, m) {
			this.name = n;
			this.version = m;
			this[n] = m;
		}
	};
	(l = b.match(/trident\/([\d.]+)/)) ? i.set("trident", f(l[1])) : (l = b
			.match(/gecko\/([\d.]+)/)) ? i.set("gecko", f(l[1])) : (l = b
			.match(/applewebkit\/([\d.]+)/))
			? i.set("webkit", f(l[1]))
			: (l = b.match(/presto\/([\d.]+)/)) ? i.set("presto", f(l[1])) : 0;
	if (g.ie) {
		if (g.ie == 6) {
			i.set("trident", f("4"));
		} else {
			if (g.ie == 7 || g.ie == 8) {
				i.set("trident", f("5"));
			}
		}
	}
	var e = function() {
		if (g.ie && g.ie < 7) {
			try {
				document.execCommand("BackgroundImageCache", false, true);
			} catch (m) {
			}
		}
	};
	if (k.browserOptions.adjustBehaviors) {
		e();
	}
	var a = function(m) {
		return String(m).replace(/\./gi, "_");
	};
	var j = function() {
		var m = document.documentElement;
		var n = [m.className];
		n.push("javascriptEnabled");
		n.push(d.name);
		n.push(d.name + a(d.version));
		n.push(g.name);
		n.push(g.name + a(g.version));
		n.push(i.name);
		n.push(i.name + a(i.version));
		if (g.plugins.flash) {
			n.push("flash");
			n.push("flash" + a(g.plugins.flash));
		}
		m.className = n.join(" ");
	};
	if (k.browserOptions.htmlClass) {
		j();
	}
	k.platform = d;
	k.browser = g;
	k.browser.engine = i;
});
Jet().$package(function(p) {
	var G, H, N, x, z, c, t, I, j, o, V, D, y, f, W, P, U, B, ac, b, O, v, e, X, l, u, E, M, ad, C, d, a, F, T, n, aa, s, k, h, ab, K, A, m, R, ae, q = null, L, S, Z, Q;
	p.dom = p.dom || {};
	G = p.dom;
	H = p.browser;
	S = (G.win) ? (G.win.contentWindow) : G.win || window;
	G.win = S;
	G.doc = S.document;
	Z = function() {
		if (Q) {
			return Q;
		}
		if (document.compatMode === "CSS1Compat") {
			Q = document.documentElement;
		} else {
			Q = document.body;
		}
		return Q;
	};
	ae = function(i) {
		if (i) {
			i = i || window.document;
			q = (i.nodeType === 9) ? i : i.ownerDocument || G.doc;
			return q;
		} else {
			if (q) {
				return q;
			} else {
				i = i || window.document;
				q = (i.nodeType === 9) ? i : i.ownerDocument || G.doc;
				return q;
			}
		}
	};
	L = function(i) {
		var w = ae(i);
		return (i.document) ? i : w.defaultView || w.parentWindow || G.win;
	};
	N = function(w, i) {
		return ae(i).getElementById(w);
	};
	x = function(i, J) {
		var w = J;
		return ae(J).getElementsByName(i);
	};
	z = function(i, w) {
		var w = w || ae();
		return w.getElementsByTagName(i);
	};
	c = function(i) {
		var w = i ? i[TEXT_CONTENT] : "";
		if (w === UNDEFINED && INNER_TEXT in i) {
			w = i[INNER_TEXT];
		}
		return w || "";
	};
	t = function(ag, J, w) {
		var ah = false;
		var af = J;
		var i;
		do {
			i = af.getAttribute(ag);
			if (p.isUndefined(i) || p.isNull(i)) {
				if (af === w) {
					ah = true;
				} else {
					af = af.parentNode;
				}
			} else {
				ah = true;
			}
		} while (!ah);
		return i;
	};
	I = function(ag, af, ai) {
		var ah, J = ai || G.win, aj = J.document, ak = aj.createElement(ag);
		for (ah in af) {
			var i = {
				"class" : function() {
					ak.className = af[ah];
				}
			};
			if (i[ah]) {
				i[ah]();
			} else {
				ak.setAttribute(ah, af[ah]);
			}
		}
		return ak;
	};
	l = function(w) {
		var i;
		if (w) {
			i = w.scrollHeight;
		} else {
			i = Math.max(document.documentElement.scrollHeight,
					document.body.scrollHeight);
		}
		return i || 0;
	};
	u = function(w) {
		var i;
		if (w) {
			i = w.scrollWidth;
		} else {
			i = Math.max(document.documentElement.scrollWidth,
					document.body.scrollWidth);
		}
		return i || 0;
	};
	E = function(i) {
		i = i || Z();
		return i.clientHeight;
	};
	M = function(i) {
		i = i || Z();
		return i.clientWidth;
	};
	ad = function(w) {
		var i = p.browser.engine.name;
		w = w || Z();
		return w.offsetHeight;
	};
	C = function(w) {
		var i = p.browser.engine.name;
		w = w || Z();
		return w.offsetWidth;
	};
	d = function(i) {
		var w;
		if (i) {
			w = i.scrollLeft;
		} else {
			w = Math.max(document.documentElement.scrollLeft,
					document.body.scrollLeft);
		}
		return w || 0;
	};
	a = function(i) {
		var w;
		if (i) {
			w = i.scrollTop;
		} else {
			w = Math.max(document.documentElement.scrollTop,
					document.body.scrollTop);
		}
		return w || 0;
	};
	j = function(w, i) {
		w.className = i;
	};
	o = function(i) {
		return i.className;
	};
	V = function(J, w) {
		var i = new RegExp("(^|\\s)" + w + "(\\s|$)");
		return i.test(J.className);
	};
	D = function(w, i) {
		if (!V(w, i)) {
			w.className = w.className + " " + i;
		}
	};
	y = function(w, i) {
		w.className = w.className.replace(new RegExp("(^|\\s)" + i
						+ "(?:\\s|$)"), "$1");
	};
	f = function(w, i) {
		return V(w, i) ? y(w, i) : D(w, i);
	};
	W = function(J, w, i) {
		y(J, w);
		D(J, i);
	};
	P = function(J, w, af) {
		if (!J) {
			return;
		}
		var i = p.browser.name;
		if (w === "float" || w === "cssFloat") {
			if (i === "ie") {
				w = "styleFloat";
			} else {
				w = "cssFloat";
			}
		}
		if (w === "opacity" && i === "ie") {
			J.style.filter = "alpha(opacity=" + (af * 100) + ")";
			if (!J.style.zoom) {
				J.style.zoom = 1;
			}
			return;
		}
		J.style[w] = af;
	};
	U = function(ah, af) {
		if (!ah) {
			return;
		}
		var ai = L(ah);
		var J = p.browser.name;
		if (af === "float" || af === "cssFloat") {
			if (J === "ie") {
				af = "styleFloat";
			} else {
				af = "cssFloat";
			}
		}
		if (af === "opacity" && J === "ie") {
			var w = 1, i = ah.style.filter.match(/opacity=(\d+)/);
			if (i && i[1]) {
				w = i[1] / 100;
			}
			return w;
		}
		if (ah.style[af]) {
			return ah.style[af];
		} else {
			if (ah.currentStyle) {
				return ah.currentStyle[af];
			} else {
				if (ai.getComputedStyle) {
					return ai.getComputedStyle(ah, null)[af];
				} else {
					if (document.defaultView
							&& document.defaultView.getComputedStyle) {
						af = af.replace(/([/A-Z])/g, "-$1");
						af = af.toLowerCase();
						var ag = document.defaultView.getComputedStyle(ah, "");
						return ag && ag.getPropertyValue(af);
					}
				}
			}
		}
	};
	b = function(w, i) {
		w.style.cssText += ";" + i;
	};
	B = function(w, i) {
		w.style.cssText = i;
	};
	ac = function(i) {
		return i.style.cssText;
	};
	O = function(J, i) {
		var af;
		var w = J.getAttribute("_oldDisplay");
		if (w) {
			af = w;
		} else {
			af = U(J, "display");
		}
		if (i) {
			P(J, "display", i);
		} else {
			if (af === "none") {
				P(J, "display", "block");
			} else {
				P(J, "display", af);
			}
		}
	};
	v = function(i) {
		var w = U(i, "display");
		if (w === "none") {
			return false;
		} else {
			return true;
		}
	};
	e = function(w) {
		var J;
		var i = w.getAttribute("_oldDisplay");
		if (i) {
			J = i;
		} else {
			J = U(w, "display");
		}
		if (J === "none") {
			P(w, "display", "");
		} else {
			P(w, "display", J);
		}
	};
	X = function(w) {
		var J = U(w, "display");
		var i = w.getAttribute("_oldDisplay");
		if (!i) {
			if (J === "none") {
				w.setAttribute("_oldDisplay", "");
			} else {
				w.setAttribute("_oldDisplay", J);
			}
		}
		P(w, "display", "none");
	};
	F = function(ag) {
		var ai = 0, af = 0;
		if (ag) {
			if (document.documentElement.getBoundingClientRect
					&& ag.getBoundingClientRect) {
				var ah = {
					left : 0,
					top : 0,
					right : 0,
					bottom : 0
				};
				try {
					ah = ag.getBoundingClientRect();
				} catch (J) {
					return [0, 0];
				}
				var w = ag.ownerDocument;
				var i = p.browser.ie ? 2 : 0;
				ai = ah.top - i + a(w);
				af = ah.left - i + d(w);
			} else {
				while (ag.offsetParent) {
					ai += ag.offsetTop;
					af += ag.offsetLeft;
					ag = ag.offsetParent;
				}
			}
		}
		return [af, ai];
	};
	T = function(w, i, J) {
		i = parseInt(i) + d();
		J = parseInt(J) + a();
		aa(w, i, J);
	};
	n = function(i) {
		var w = F(i);
		w[0] = w[0] + d();
		w[1] = w[1] + a();
		return w;
	};
	aa = function(J, i, ag) {
		var w = parseInt(U(J, "marginLeft")) || 0;
		var af = parseInt(U(J, "marginTop")) || 0;
		P(J, "left", parseInt(i) - w + "px");
		P(J, "top", parseInt(ag) - af + "px");
	};
	s = function(J, i) {
		var ag = n(J);
		var w = n(i);
		var af = [];
		af[0] = ag[0] - w[0];
		af[1] = ag[1] - w[1];
		return af;
	};
	var g = function(i) {
		if (!i || i == "auto") {
			return 0;
		} else {
			return parseInt(i.substr(0, i.length - 2));
		}
	};
	k = function(i) {
		return g(G.getStyle(i, "left"));
	};
	h = function(i) {
		return g(G.getStyle(i, "top"));
	};
	ab = function(i) {
		return g(G.getStyle(i, "width"));
	};
	K = function(i) {
		return g(G.getStyle(i, "height"));
	};
	m = function(w) {
		w = w || window;
		var i = w.document;
		if (w.getSelection) {
			return w.getSelection().toString();
		} else {
			if (i.getSelection) {
				return i.getSelection();
			} else {
				if (i.selection) {
					return i.selection.createRange().text;
				}
			}
		}
	};
	R = function(w) {
		if (w.selectionStart != undefined && w.selectionEnd != undefined) {
			var J = w.selectionStart;
			var i = w.selectionEnd;
			return w.value.substring(J, i);
		} else {
			return "";
		}
	};
	var r = z("script");
	for (var Y = 0; Y < r.length; Y++) {
		if (r[Y].getAttribute("hasJet") == "true") {
			p.src = r[Y].src;
		}
	}
	if (!p.src) {
		p.src = r[r.length - 1].src;
	}
	p.filename = p.src.replace(/(.*\/){0,}([^\\]+).*/ig, "$2");
	p.path = p.src.split(p.filename)[0];
	G.getDoc = ae;
	G.id = N;
	G.name = x;
	G.tagName = z;
	G.getText = c;
	G.getAttributeByParent = t;
	G.node = I;
	G.setClass = j;
	G.getClass = o;
	G.hasClass = V;
	G.addClass = D;
	G.removeClass = y;
	G.toggleClass = f;
	G.replaceClass = W;
	G.setStyle = P;
	G.getStyle = U;
	G.setCssText = B;
	G.getCssText = ac;
	G.addCssText = b;
	G.show = O;
	G.isShow = v;
	G.recover = e;
	G.hide = X;
	G.getScrollLeft = d;
	G.getScrollTop = a;
	G.getScrollHeight = l;
	G.getScrollWidth = u;
	G.getClientHeight = E;
	G.getClientWidth = M;
	G.getOffsetHeight = ad;
	G.getOffsetWidth = C;
	G.getClientXY = F;
	G.setClientXY = T;
	G.getXY = n;
	G.setXY = aa;
	G.getRelativeXY = s;
	G.getPosX = k;
	G.getPosY = h;
	G.getWidth = ab;
	G.getHeight = K;
	G.getSelection = A;
	G.getSelectionText = m;
	G.getTextFieldSelection = R;
	G.getDocumentElement = Z;
});
Jet().$package(function(k) {
	var i, f, d, j, h = [], a, n, m, c, b, e, l, g = this;
	k.event = k.event || {};
	i = k.event;
	if (document.addEventListener) {
		f = function(r, q, s) {
			if (j["on" + q]) {
				j["on" + q](r, q, s);
				return;
			}
			var t = false;
			if (!r) {
				k.out("targetModel undefined:" + q + s);
			}
			if (!r._eventTypes) {
				r._eventTypes = {};
			}
			if (!r._eventTypes[q]) {
				r._eventTypes[q] = [];
			}
			r.addEventListener(q, s, false);
			var o = r._eventTypes[q];
			for (var p = 0; p < o.length; p++) {
				if (o[p] == s) {
					t = true;
				}
			}
			if (!t) {
				o.push(s);
			}
		};
		d = function(s, r, t) {
			if (j["off" + r]) {
				j["off" + r](s, r, t);
				return;
			}
			if (r) {
				if (t) {
					s.removeEventListener(r, t, false);
					if (s._eventTypes && s._eventTypes[r]) {
						var o = s._eventTypes[r];
						for (var q = 0; q < o.length; q++) {
							if (o[q] === t) {
								o[q] = null;
								o.splice(q, 1);
								break;
							}
						}
					}
				} else {
					if (s._eventTypes && s._eventTypes[r]) {
						var o = s._eventTypes[r];
						for (var q = 0; q < o.length; q++) {
							s.removeEventListener(r, o[q], false);
						}
						s._eventTypes[r] = [];
					}
				}
			} else {
				if (s._eventTypes) {
					var u = s._eventTypes;
					for (var v in u) {
						var o = s._eventTypes[v];
						for (var q = 0; q < o.length; q++) {
							s.removeEventListener(v, o[q], false);
						}
					}
					u = {};
				}
			}
		};
	} else {
		if (document.attachEvent) {
			f = function(q, p, s) {
				if (j["on" + p]) {
					j["on" + p](q, p, s);
					return;
				}
				if (i._find(arguments) != -1) {
					return;
				}
				var t = function(x) {
					if (!x) {
						x = window.event;
					}
					var w = {
						_event : x,
						type : x.type,
						target : x.srcElement,
						currentTarget : q,
						relatedTarget : x.fromElement
								? x.fromElement
								: x.toElement,
						eventPhase : (x.srcElement == q) ? 2 : 3,
						clientX : x.clientX,
						clientY : x.clientY,
						screenX : x.screenX,
						screenY : x.screenY,
						layerX : x.offsetX,
						layerY : x.offsetY,
						pageX : x.clientX + document.body.scrollLeft,
						pageY : x.clientY + document.body.scrollTop,
						altKey : x.altKey,
						ctrlKey : x.ctrlKey,
						shiftKey : x.shiftKey,
						charCode : x.keyCode,
						keyCode : x.keyCode,
						stopPropagation : function() {
							this._event.cancelBubble = true;
						},
						preventDefault : function() {
							this._event.returnValue = false;
						}
					};
					if (Function.prototype.call) {
						s.call(q, w);
					} else {
						q._currentHandler = s;
						q._currentHandler(w);
						q._currentHandler = null;
					}
				};
				q.attachEvent("on" + p, t);
				var r = {
					element : q,
					eventType : p,
					handler : s,
					wrappedEvent : t
				};
				var u = q.document || q;
				var o = u.parentWindow;
				var v = i._uid();
				if (!o._allHandlers) {
					o._allHandlers = {};
				}
				o._allHandlers[v] = r;
				if (!q._handlers) {
					q._handlers = [];
				}
				q._handlers.push(v);
				if (!o._onunloadEventRegistered) {
					o._onunloadEventRegistered = true;
					o.attachEvent("onunload", i._removeAllEvents);
				}
			};
			d = function(s, o, y) {
				if (j["off" + o]) {
					j["off" + o](s, o, y);
					return;
				}
				var q = i._find(arguments);
				if (q == -1) {
					return;
				}
				var v = s.document || s;
				var x = v.parentWindow;
				for (var r = 0; r < q.length; r++) {
					var t = q[r];
					var p = s._handlers[t];
					var u = x._allHandlers[p];
					s.detachEvent("on" + u.eventType, u.wrappedEvent);
					s._handlers[t] = null;
					s._handlers.splice(t, 1);
					delete x._allHandlers[p];
				}
				if (s._handlers && s._handlers.length == 0) {
					s._handlers = null;
				}
			};
			i._find = function(x) {
				var t = x[0], o = x[1], z = x[2], p = t._handlers;
				if (!p) {
					return -1;
				}
				var v = t.document || t;
				var y = v.parentWindow;
				var r = [];
				if (x.length === 3) {
					for (var s = p.length - 1; s >= 0; s--) {
						var q = p[s];
						var u = y._allHandlers[q];
						if (u.eventType == o && u.handler == z) {
							r.push(s);
							return r;
						}
					}
				} else {
					if (x.length === 2) {
						for (var s = p.length - 1; s >= 0; s--) {
							var q = p[s];
							var u = y._allHandlers[q];
							if (u.eventType == o) {
								r.push(s);
							}
						}
						if (r.length > 0) {
							return r;
						}
					} else {
						if (x.length === 1) {
							for (var s = p.length - 1; s >= 0; s--) {
								r.push(s);
							}
							if (r.length > 0) {
								return r;
							}
						}
					}
				}
				return -1;
			};
			i._removeAllEvents = function() {
				var q, o = this;
				for (q in o._allHandlers) {
					var p = o._allHandlers[q];
					p.element.detachEvent("on" + p.eventType, p.wrappedEvent);
					p.element._handlers = null;
					delete o._allHandlers[q];
				}
			};
			i._counter = 0;
			i._uid = function() {
				return "h" + i._counter++;
			};
		}
	}
	j = {
		oncustomdrag : function(r, o, x) {
			var v, u, w = false, q;
			var p = function(y) {
				var z;
				q = y;
				if (k.platform.iPad) {
					y.stopPropagation();
					z = y.touches[0];
					v = z.pageX;
					u = z.pageY;
				} else {
					y.stopPropagation();
					y.preventDefault();
					v = y.clientX;
					u = y.clientY;
				}
				w = false;
				if (k.platform.iPad) {
					i.addEventListener(document, "touchmove", t);
					i.addEventListener(r, "touchend", s);
				} else {
					i.addEventListener(document, "mousemove", t);
				}
			};
			var t = function(A) {
				var z, C, B;
				A.stopPropagation();
				if (k.platform.iPad) {
					B = A.changedTouches[0];
					z = B.pageX;
					C = B.pageY;
				} else {
					z = A.clientX;
					C = A.clientY;
				}
				if (Math.abs(v - z) + Math.abs(u - C) > 2) {
					if (k.platform.iPad) {
						i.removeEventListener(document, "touchmove", t);
						i.removeEventListener(r, "touchend", s);
					} else {
						i.removeEventListener(document, "mousemove", t);
					}
					if (o == "customdrag" && !w) {
						x.call(r, q);
						w = true;
					}
				} else {
				}
			};
			var s = function(y) {
				if (k.platform.iPad) {
					i.removeEventListener(document, "touchmove", t);
					if (!w) {
					} else {
						y.stopPropagation();
						y.preventDefault();
					}
				} else {
					i.removeEventListener(document, "mousemove", t);
					if (!w) {
					}
				}
			};
			if (k.platform.iPad) {
				i.addEventListener(r, "touchstart", p);
			} else {
				i.addEventListener(r, "mousedown", p);
				i.addEventListener(r, "mouseup", s);
			}
			h.push({
						element : r,
						eventType : o,
						handler : x,
						actions : [p, s]
					});
		},
		offcustomdrag : function(q, p, r) {
			for (var o in h) {
				if (h[o].handler == r && h[o].element == q
						&& h[o].eventType == p) {
					if (k.platform.iPad) {
						i.removeEventListener(q, "touchstart", h[o].actions[0]);
						i.removeEventListener(q, "touchend", h[o].actions[1]);
					} else {
						i.removeEventListener(q, "mousedown", h[o].actions[0]);
						i.removeEventListener(q, "mouseup", h[o].actions[1]);
					}
				}
			}
		},
		oncustomclick : function(r, o, w) {
			var u, t, v = false, q;
			var p = function(x) {
				var y;
				if (k.platform.iPad) {
					y = x.changedTouches[0];
					u = y.pageX;
					t = y.pageY;
				} else {
					u = x.clientX;
					t = x.clientY;
				}
				x.preventDefault();
				x.stopPropagation();
				q = x;
			};
			var s = function(A) {
				var C;
				if (k.platform.iPad) {
					C = A.changedTouches[0];
					var z = C.pageX;
					var B = C.pageY;
				} else {
					var z = A.clientX;
					var B = A.clientY;
				}
				if (Math.abs(u - z) + Math.abs(t - B) < 10) {
					v = false;
					k.out("customclick");
					if (o == "customclick") {
						w.call(r, q);
					}
				} else {
				}
			};
			if (k.platform.iPad) {
				i.addEventListener(r, "touchstart", p);
				i.addEventListener(r, "touchend", s);
			} else {
				i.addEventListener(r, "mousedown", p);
				i.addEventListener(r, "mouseup", s);
			}
			h.push({
						element : r,
						eventType : o,
						handler : w,
						actions : [p, s]
					});
		},
		offcustomclick : function(q, p, r) {
			for (var o in h) {
				if (h[o].handler == r && h[o].element == q
						&& h[o].eventType == p) {
					if (k.platform.iPad) {
						i.removeEventListener(q, "touchstart", h[o].actions[0]);
						i.removeEventListener(q, "touchend", h[o].actions[1]);
					} else {
						i.removeEventListener(q, "mousedown", h[o].actions[0]);
						i.removeEventListener(q, "mouseup", h[o].actions[1]);
					}
				}
			}
		}
	};
	a = function(o) {
		if (a.done) {
			return o();
		}
		if (a.timer) {
			a.ready.push(o);
		} else {
			a.ready = [o];
			i.on(window, "load", n);
			a.timer = window.setInterval(n, 300);
		}
	};
	n = function() {
		if (a.done) {
			return true;
		}
		if (document && document.getElementsByTagName
				&& document.getElementById && document.body) {
			a.done = true;
			window.clearInterval(a.timer);
			a.timer = null;
			for (var o = 0; o < a.ready.length; o++) {
				a.ready[o]();
			}
			a.ready = null;
			return true;
		}
	};
	m = function() {
		this.subscribers = [];
	};
	m.prototype.subscribe = function(o) {
		var p = k.array.some(this.subscribers, function(q) {
					return q === o;
				});
		if (!p) {
			this.subscribers.push(o);
		}
		return o;
	};
	m.prototype.deliver = function(o) {
		k.array.forEach(this.subscribers, function(p) {
					p(o);
				});
	};
	m.prototype.unsubscribe = function(o) {
		this.subscribers = k.array.filter(this.subscribers, function(p) {
					return p !== o;
				});
		return o;
	};
	c = function(p, s, t) {
		var o, u, q, r;
		if (t) {
			s = "on" + s;
			if (!!!p._$events) {
				p._$events = {};
			}
			if (!p._$events[s]) {
				p._$events[s] = [];
			}
			o = p._$events[s];
			u = o.length;
			q = -1;
			for (r = 0; r < u; r++) {
				if (o[r] === t) {
					q = r;
					break;
				}
			}
			if (q === -1) {
				o.push(t);
			}
		} else {
			k.out(">>>  添加的观察者方法不存在：" + p + s + t);
		}
	};
	b = function(r) {
		var q = r.targetModel;
		var o = r.eventMapping;
		for (var p in o) {
			c(q, p, o[p]);
		}
	};
	e = function(q, s, t) {
		var p, r;
		s = "on" + s;
		var o = true;
		if (q._$events && q._$events[s]) {
			p = q._$events[s];
			if (p.length > 0) {
				for (r = 0; r < p.length; r++) {
					if (p[r].apply(q, [t])) {
					} else {
						o = false;
					}
				}
			}
		} else {
		}
		return o;
	};
	l = function(p, t, u) {
		var s, q, o, v, r = p._$events;
		if (u) {
			if (r) {
				t = "on" + t;
				o = r[t];
				if (o) {
					v = o.length;
					for (s = 0; s < v; s++) {
						if (o[s] == u) {
							o[s] = null;
							o.splice(s, 1);
							break;
						}
					}
				}
			}
		} else {
			if (t) {
				if (r) {
					t = "on" + t;
					o = r[t];
					if (o) {
						v = o.length;
						for (s = 0; s < v; s++) {
							o[s] = null;
						}
						delete r[t];
					}
				}
			} else {
				if (p) {
					if (r) {
						for (s in r) {
							delete r[s];
						}
						delete p._$events;
					}
				}
			}
		}
	};
	i.addEventListener = f;
	i.removeEventListener = d;
	i.on = i.addEventListener;
	i.off = i.removeEventListener;
	i.onDomReady = a;
	i.Publish = m;
	i.addObserver = c;
	i.addObservers = b;
	i.notifyObservers = e;
	i.removeObserver = l;
});
Jet().$package(function(a) {
	var b;
	a.date = a.date || {};
	b = function(e, c) {
		var f = {
			"M+" : e.getMonth() + 1,
			"D+" : e.getDate(),
			"h+" : e.getHours(),
			"m+" : e.getMinutes(),
			"s+" : e.getSeconds(),
			"q+" : Math.floor((e.getMonth() + 3) / 3),
			S : e.getMilliseconds()
		};
		if (/(Y+)/.test(c)) {
			c = c.replace(RegExp.$1, (e.getFullYear() + "").substr(4
							- RegExp.$1.length));
		}
		for (var d in f) {
			if (new RegExp("(" + d + ")").test(c)) {
				c = c.replace(RegExp.$1, RegExp.$1.length == 1
								? f[d]
								: ("00" + f[d]).substr(("" + f[d]).length));
			}
		}
		return c;
	};
	a.date.format = b;
});
Jet().$package(function(n) {
			n.array = n.array || {};
			var j = n.array, m, p, h, b, o, a, g, l, d, e, f, c, k, i;
			m = Array.prototype.indexOf ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.indexOf.apply(arguments[0], q);
			} : function(q, t, s) {
				if (s == null) {
					s = 0;
				} else {
					if (s < 0) {
						s = Math.max(0, q.length + s);
					}
				}
				for (var r = s; r < q.length; r++) {
					if (q[r] === t) {
						return r;
					}
				}
				return -1;
			};
			p = Array.prototype.lastIndexOf ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.lastIndexOf.apply(arguments[0], q);
			} : function(q, t, s) {
				if (s == null) {
					s = q.length - 1;
				} else {
					if (s < 0) {
						s = Math.max(0, q.length + s);
					}
				}
				for (var r = s; r >= 0; r--) {
					if (q[r] === t) {
						return r;
					}
				}
				return -1;
			};
			h = Array.prototype.forEach ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.forEach.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length;
				if (typeof s != "function") {
					throw new TypeError();
				}
				var u = arguments[2];
				for (var t = 0; t < q; t++) {
					if (t in r) {
						s.call(u, r[t], t, r);
					}
				}
			};
			b = Array.prototype.filter ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.filter.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length;
				if (typeof s != "function") {
					throw new TypeError();
				}
				var v = [];
				var u = arguments[2];
				for (var t = 0; t < q; t++) {
					if (t in r) {
						var w = r[t];
						if (s.call(u, w, t, r)) {
							v.push(w);
						}
					}
				}
				return v;
			};
			o = Array.prototype.some ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.some.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length;
				if (typeof s != "function") {
					throw new TypeError();
				}
				var u = arguments[2];
				for (var t = 0; t < q; t++) {
					if (t in r && s.call(u, r[t], t, r)) {
						return true;
					}
				}
				return false;
			};
			a = Array.prototype.map ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.map.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length;
				if (typeof s != "function") {
					throw new TypeError();
				}
				var v = new Array(q);
				var u = arguments[2];
				for (var t = 0; t < q; t++) {
					if (t in r) {
						v[t] = s.call(u, r[t], t, r);
					}
				}
				return v;
			};
			g = Array.prototype.every ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.every.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length;
				if (typeof s != "function") {
					throw new TypeError();
				}
				var u = arguments[2];
				for (var t = 0; t < q; t++) {
					if (t in r && !s.call(u, r[t], t, r)) {
						return false;
					}
				}
				return true;
			};
			l = Array.prototype.reduce ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.reduce.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length >>> 0;
				if (typeof s != "function") {
					throw new TypeError();
				}
				if (q == 0 && arguments.length == 2) {
					throw new TypeError();
				}
				var t = 0;
				if (arguments.length >= 3) {
					var u = arguments[2];
				} else {
					do {
						if (t in r) {
							u = r[t++];
							break;
						}
						if (++t >= q) {
							throw new TypeError();
						}
					} while (true);
				}
				for (; t < q; t++) {
					if (t in r) {
						u = s.call(null, u, r[t], t, r);
					}
				}
				return u;
			};
			d = Array.prototype.reduceRight ? function() {
				var q = Array.prototype.slice.call(arguments, 1);
				return Array.prototype.reduceRight.apply(arguments[0], q);
			} : function(r, s) {
				var q = r.length >>> 0;
				if (typeof s != "function") {
					throw new TypeError();
				}
				if (q == 0 && arguments.length == 2) {
					throw new TypeError();
				}
				var t = q - 1;
				if (arguments.length >= 3) {
					var u = arguments[2];
				} else {
					do {
						if (t in r) {
							u = r[t--];
							break;
						}
						if (--t < 0) {
							throw new TypeError();
						}
					} while (true);
				}
				for (; t >= 0; t--) {
					if (t in r) {
						u = s.call(null, u, r[t], t, r);
					}
				}
				return u;
			};
			e = function(r) {
				var q = n.$typeof(r);
				return (q)
						? ((q != "array" && q != "arguments") ? [r] : r)
						: [];
			};
			f = function(q, s) {
				var s = e(s), u, t, r = false;
				for (u = 0; u < s.length; u++) {
					for (t = 0; t < q.length; t++) {
						if (q[t] === s[u]) {
							q.splice(t, 1);
							r = true;
						}
					}
				}
				return r;
			};
			c = function(q, r, t) {
				var s;
				for (s = 0; s < q.length; ij++) {
					if (q[s] === r) {
						q[s] = t;
						return true;
					}
				}
				return false;
			};
			k = function(q, u) {
				u = u || function(y, x) {
					return y - x;
				};
				var w = q.length;
				var s;
				var r;
				for (var v = 0; v < w - 1; v++) {
					r = false;
					for (var t = w - 1; t > v; t--) {
						if (u(q[t], q[t - 1]) < 0) {
							r = true;
							s = q[t - 1];
							q[t - 1] = q[t];
							q[t] = s;
						}
					}
					if (!r) {
						break;
					}
				}
				return q;
			};
			i = function(q, s, t) {
				var v = 0;
				var r = q.length;
				var u = Math.floor(q.length / 2);
				while (r != u) {
					if (t(s, q[u]) > 0) {
						v = u + 1;
					} else {
						r = u;
					}
					u = Math.floor((v + r) / 2);
				}
				return u;
			};
			j.indexOf = m;
			j.lastIndexOf = p;
			j.forEach = h;
			j.filter = b;
			j.some = o;
			j.map = a;
			j.every = g;
			j.reduce = l;
			j.reduceRight = d;
			j.toArray = e;
			j.remove = f;
			j.replace = c;
			j.bubbleSort = k;
			j.binarySearch = i;
		});
Jet().$package(function(p) {
	p.string = p.string || {};
	var y = p.string, j, k, d, v, n, C, b, F, u, i, B, l, r, c, U, N, Q, z, I, G, H, P, R, t, g, A, h, S, K, f, E, M, w, O, q, T, D, a, e, x, m, o;
	j = function(J) {
		return (J + "");
	};
	var s = {};
	k = function(W, V) {
		var J = !/\W/.test(W) ? s[W] = s[W]
				|| k(document.getElementById(W).innerHTML) : new Function(
				"obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"
						+ W.replace(/[\r\t\n]/g, " ").split("<%").join("\t")
								.replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(
										/\t=(.*?)%>/g, "',$1,'").split("\t")
								.join("');").split("%>").join("p.push('")
								.split("\r").join("\\'")
						+ "');}return p.join('');");
		return V ? J(V) : J;
	};
	d = function(J) {
		return d.RE.test(J);
	};
	d.RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
	v = function(Y) {
		var W, V, Z, Y = Y || window.location.href, J = Y.indexOf("?"), X = Y
				.substring(J + 1).split("&"), ab = {};
		for (W = 0; W < X.length; W++) {
			try {
				J = X[W].indexOf("=");
				V = X[W].substring(0, J);
				Z = X[W].substring(J + 1);
				if (!(ab[V] = unescape(Z))) {
					throw new Error("uri has wrong query string.");
				}
			} catch (aa) {
			}
		}
		return ab;
	};
	n = function(J, V, W) {
		return ((typeof V == "string") ? new RegExp(V, W) : V).test(J);
	};
	C = function(J, W, V) {
		return (V) ? (V + J + V).indexOf(V + W + V) > -1 : J.indexOf(W) > -1;
	};
	b = function(J) {
		return String(J).replace(/^\s+|\s+$/g, "");
	};
	F = function(J) {
		return b(J.replace(/\s+/g, " "));
	};
	u = function(J) {
		return J.replace(/-\D/g, function(V) {
					return V.charAt(1).toUpperCase();
				});
	};
	i = function(J) {
		return J.replace(/[A-Z]/g, function(V) {
					return ("-" + V.charAt(0).toLowerCase());
				});
	};
	B = function(J) {
		return J.replace(/\b[a-z]/g, function(V) {
					return V.toUpperCase();
				});
	};
	l = function(J) {
		return J.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
	};
	r = function(J, V) {
		return parseInt(J, V || 10);
	};
	c = function(J) {
		return parseFloat(J);
	};
	U = function(J) {
		return String(J).replace(/\r/gi, "").replace(/\n/gi, "");
	};
	N = function(J) {
		return String(J).replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;")
				.replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(
						/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi,
						"&nbsp;").replace(/\r\n/g, "<br />").replace(/\n\r/g,
						"<br />").replace(/\n/g, "<br />").replace(/\r/g,
						"<br />");
	};
	Q = function(J) {
		return String(J).replace(/\\/gi, "\\").replace(/\'/gi, "'").replace(
				/\"/gi, "'");
	};
	G = function(J, W) {
		var V = J.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (V) ? V.slice(1).hexToRgb(W) : null;
	};
	H = function(V, W) {
		var J = V.match(/\d{1,3}/g);
		return (J) ? J.rgbToHex(W) : null;
	};
	P = function(V, W) {
		var J = "";
		var X = V.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function() {
					J += arguments[1] + "\n";
					return "";
				});
		if (W === true) {
			$exec(J);
		} else {
			if ($type(W) == "function") {
				W(J, X);
			}
		}
		return X;
	};
	z = function(J, V) {
		return encodeURIComponent(String(J)) + "="
				+ encodeURIComponent(String(V));
	};
	I = function(W) {
		var J = [];
		for (var V in W) {
			J.push(z(V, W[V]));
		}
		return J.join("&");
	};
	R = function(V, J, W) {
		return V.replace(W || (/\\?\{([^{}]+)\}/g), function(Y, X) {
					if (Y.charAt(0) == "\\") {
						return Y.slice(1);
					}
					return (J[X] != undefined) ? J[X] : "";
				});
	};
	t = function(X, J, W, V) {
		if (!RegExp.prototype.isPrototypeOf(J)) {
			return X.replace(new RegExp(J, (V ? "gi" : "g")), W);
		} else {
			return X.replace(J, W);
		}
	};
	g = function(J) {
		return J.replace(/[^\x00-\xff]/g, "aa").length;
	};
	A = function(J, V) {
		return J.substring(0, (J.length - V));
	};
	h = function(J, W) {
		var V = J;
		while (g(V) > W) {
			V = A(V, 1);
		}
		return V;
	};
	S = function(J) {
		if (J.search(/^\d+$/) !== -1) {
			return true;
		} else {
			return false;
		}
	};
	K = function(J) {
		if (J
				.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1) {
			return true;
		} else {
			return false;
		}
	};
	var f = function(J) {
		J = J.replace(/&/g, "&amp;");
		J = J.replace(/>/g, "&gt;");
		J = J.replace(/</g, "&lt;");
		J = J.replace(/"/g, "&quot;");
		J = J.replace(/'/g, "&#39;");
		return J;
	};
	var E = function(J) {
		J = J.replace(/&amp;/g, "&");
		J = J.replace(/&gt;/g, ">");
		J = J.replace(/&lt;/g, "<");
		J = J.replace(/&quot;/g, '"');
		J = J.replace(/&#39;/g, "'");
		return J;
	};
	var M = function(J) {
		J = J.replace(/&amp;/g, "&");
		J = J.replace(/&gt;/g, ">");
		J = J.replace(/&lt;/g, "<");
		J = J.replace(/\\\\"/g, '"');
		J = J.replace(/\\\\'/g, "'");
		return J;
	};
	var w = function(J) {
		J = J.replace(/&/g, "&amp;");
		J = J.replace(/>/g, "&gt;");
		J = J.replace(/</g, "&lt;");
		J = J.replace(/"/g, "&quot;");
		J = J.replace(/'/g, "&#39;");
		J = J.replace(/=/g, "&#61;");
		J = J.replace(/`/g, "&#96;");
		return J;
	};
	var q = function(J) {
		return J.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,
				function(V) {
					return "&#" + V.charCodeAt(0) + ";";
				}).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(
				/\n/g, "<br />").replace(/\r/g, "<br />");
	};
	var O = function(J) {
		return J.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(V) {
					return "&#" + V.charCodeAt(0) + ";";
				});
	};
	var T = function(J) {
		J += "";
		return J.replace(/[\\"']/g, function(V) {
					return "\\" + V;
				}).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g,
				"\\r").replace(/\x01/g, "\\x01");
	};
	var D = function(J) {
		return q(e(escScript(J)));
	};
	var a = function(J) {
		return J.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(W, V) {
					return "\\" + W;
				});
	};
	var e = function(J) {
		return escape(J).replace(/\+/g, "%2B");
	};
	var x = function(J) {
		J = encodeURIComponent(J);
		J = J.replace(/~/g, "%7E");
		J = J.replace(/!/g, "%21");
		J = J.replace(/\*/g, "%2A");
		J = J.replace(/\(/g, "%28");
		J = J.replace(/\)/g, "%29");
		J = J.replace(/'/g, "%27");
		J = J.replace(/\?/g, "%3F");
		J = J.replace(/;/g, "%3B");
		return J;
	};
	var m = function(J) {
		return (/^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i)
				.test(J)
				|| (/^[\w][\w\/\.\-_%]+$/i).test(J)
				|| (/^[\/\\][^\/\\]/i).test(J) ? true : false;
	};
	var o = function(W, X) {
		var V = document.createElement("div");
		V.style.visibility = "hidden";
		V.style.width = "auto";
		if (X) {
			V.style.fontSize = X + "px";
		}
		V.style.position = "absolute";
		V.innerHTML = p.string.encodeHtmlSimple(W);
		document.body.appendChild(V);
		var J = V.offsetWidth;
		document.body.removeChild(V);
		return J;
	};
	var L = function(W, X, V) {
		for (var J = W.length; J >= 0; --J) {
			W = W.substring(0, J);
			if (o(W, X) < V) {
				return W;
			}
		}
		return "";
	};
	y.cutByWidth = L;
	y.toString = j;
	y.template = k;
	y.isURL = d;
	y.mapQuery = v;
	y.test = n;
	y.contains = C;
	y.trim = b;
	y.clean = F;
	y.camelCase = u;
	y.hyphenate = i;
	y.capitalize = B;
	y.escapeRegExp = l;
	y.toInt = r;
	y.toFloat = c;
	y.toSingleLine = U;
	y.toHtml = N;
	y.toTitle = Q;
	y.toQueryPair = z;
	y.toQueryString = I;
	y.hexToRgb = G;
	y.rgbToHex = H;
	y.stripScripts = P;
	y.substitute = R;
	y.replaceAll = t;
	y.byteLength = g;
	y.cutRight = A;
	y.isNumber = S;
	y.isEmail = K;
	y.cutByBytes = h;
	y.encodeHtmlSimple = f;
	y.decodeHtmlSimple = E;
	y.decodeHtmlSimple2 = M;
	y.encodeHtmlAttributeSimple = w;
	y.encodeHtmlAttribute = O;
	y.encodeHtml = q;
	y.encodeScript = T;
	y.encodeHrefScript = D;
	y.encodeRegExp = a;
	y.encodeUrl = e;
	y.encodeUriComponent = x;
	y.vaildTencentUrl = m;
	y.getCharWidth = o;
});
Jet().$package(function(J) {
	var $ = J.dom.id, $D = J.dom, $E = J.event, ajax, comet, load, loadCss, loadScript;
	if (typeof window.XMLHttpRequest === "undefined") {
		window.XMLHttpRequest = function() {
			return new window.ActiveXObject(navigator.userAgent
					.indexOf("MSIE 5") >= 0
					? "Microsoft.XMLHTTP"
					: "Msxml2.XMLHTTP");
		};
	}
	J.http = J.http || {};
	ajax = function(uri, options) {
		var httpRequest, httpSuccess, timeout, isTimeout = false, isComplete = false;
		options = {
			method : options.method || "GET",
			data : options.data || null,
			arguments : options.arguments || null,
			onSuccess : options.onSuccess || function() {
			},
			onError : options.onError || function() {
			},
			onComplete : options.onComplete || function() {
			},
			onTimeout : options.onTimeout || function() {
			},
			isAsync : options.isAsync || true,
			timeout : options.timeout ? options.timeout : 10000,
			contentType : options.contentType ? options.contentType : "utf-8",
			type : options.type || "xml"
		};
		uri = uri || "";
		timeout = options.timeout;
		httpRequest = new window.XMLHttpRequest();
		httpRequest.open(options.method, uri, options.isAsync);
		httpRequest.setRequestHeader("Content-Type", options.contentType);
		httpSuccess = function(r) {
			try {
				return (!r.status && location.protocol == "file:")
						|| (r.status >= 200 && r.status < 300)
						|| (r.status == 304)
						|| (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status == "undefined");
			} catch (e) {
			}
			return false;
		};
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (!isTimeout) {
					var o = {};
					o.responseText = httpRequest.responseText;
					o.responseXML = httpRequest.responseXML;
					o.data = options.data;
					o.status = httpRequest.status;
					o.uri = uri;
					o.arguments = options.arguments;
					if (httpSuccess(httpRequest)) {
						if (options.type === "script") {
							eval.call(window, data);
						}
						options.onSuccess(o);
					} else {
						options.onError(o);
					}
					options.onComplete(o);
				}
				isComplete = true;
				httpRequest = null;
			}
		};
		httpRequest.send(options.data);
		window.setTimeout(function() {
					var o;
					if (!isComplete) {
						isTimeout = true;
						o = {};
						o.uri = uri;
						o.arguments = options.arguments;
						options.onTimeout(o);
						options.onComplete(o);
					}
				}, timeout);
		return httpRequest;
	};
	comet = function(uri, options) {
		uri = uri || "";
		options = {
			method : options.method || "GET",
			data : options.data || null,
			arguments : options.arguments || null,
			callback : options.callback || function() {
			},
			onLoad : options.onLoad || function() {
			},
			contentType : options.contentType ? options.contentType : "utf-8"
		};
		var connection;
		if (J.browser.ie) {
			var htmlfile = new ActiveXObject("htmlfile");
			htmlfile.open();
			htmlfile.close();
			var iframediv = htmlfile.createElement("div");
			htmlfile.appendChild(iframediv);
			htmlfile.parentWindow._parent = self;
			iframediv.innerHTML = '<iframe id="_cometIframe" src="' + uri
					+ "?callback=window.parent._parent." + options.callback
					+ '"></iframe>';
			connection = htmlfile.getElementById("_cometIframe");
		} else {
			connection = $D.node("iframe");
			connection.setAttribute("id", "_cometIframe");
			connection.setAttribute("src", uri
							+ "?callback=window.parent._parent."
							+ options.callback);
			connection.style.position = "absolute";
			connection.style.visibility = "hidden";
			connection.style.left = connection.style.top = "-999px";
			connection.style.width = connection.style.height = "1px";
			document.body.appendChild(connection);
			self._parent = self;
		}
		$E.on(connection, "load", options.onLoad);
		return connection;
	};
	load = function(type, uri, options) {
		var node, linkNode, scriptNode, id, head = document
				.getElementsByTagName("head") ? document
				.getElementsByTagName("head")[0] : document.documentElement, timer, isTimeout = false, isComplete = false, options = options
				|| {}, isDefer = options.isDefer || false, query = options.query
				|| null, arguments = options.arguments || null, onSuccess = options.onSuccess
				|| function() {
				}, onError = options.onError || function() {
		}, onComplete = options.onComplete || function() {
		}, purge, onTimeout = options.onTimeout || function() {
		}, timeout = options.timeout ? options.timeout : 10000, charset = options.charset
				? options.charset
				: "utf-8", win = options.win || window, o, getId;
		uri = uri || "";
		if (query !== null) {
			uri = uri + "?" + query;
		}
		getId = function() {
			return load.Id++;
		};
		id = getId();
		purge = function(id) {
			head.removeChild($("jet_load_" + id));
		};
		linkNode = function(uri, win, charset) {
			var c = charset || "utf-8";
			return $D.node("link", {
						id : "jet_load_" + id,
						type : "text/css",
						charset : c,
						rel : "stylesheet",
						href : uri
					}, win);
		};
		scriptNode = function(uri, win, charset, isDefer) {
			var c = charset || "utf-8";
			var node = $D.node("script", {
						id : "jet_load_" + id,
						type : "text/javascript",
						charset : c,
						src : uri
					}, win);
			if (isDefer) {
				node.setAttribute("defer", "defer");
			}
			return node;
		};
		if (type === "script") {
			node = options.node || scriptNode(uri, win, charset, isDefer);
		} else {
			if (type === "css") {
				node = options.node || linkNode(uri, win, charset);
			}
		}
		if (J.browser.engine.trident) {
			node.onreadystatechange = function() {
				var rs = this.readyState;
				if (rs === "loaded" || rs === "complete") {
					node.onreadystatechange = null;
					if (!isTimeout) {
						isComplete = true;
						window.clearTimeout(timer);
						timer = null;
						o = {};
						o.id = id;
						o.uri = uri;
						o.arguments = arguments;
						onSuccess(o);
						onComplete(o);
						if (type === "script") {
						}
					}
				}
			};
		} else {
			if (J.browser.engine.webkit) {
				$E.on(node, "load", function() {
							var o;
							if (!isTimeout) {
								isComplete = true;
								window.clearTimeout(timer);
								timer = null;
								o = {};
								o.id = id;
								o.uri = uri;
								o.arguments = arguments;
								onSuccess(o);
								onComplete(o);
								if (type === "script") {
									purge(id);
								}
							}
						});
			} else {
				node.onload = function() {
					var o;
					if (!isTimeout) {
						isComplete = true;
						window.clearTimeout(timer);
						timer = null;
						o = {};
						o.id = id;
						o.uri = uri;
						o.arguments = options.arguments;
						onSuccess(o);
						onComplete(o);
						if (type === "script") {
							purge(id);
						}
					}
				};
				node.onerror = function(e) {
					var o;
					if (!isTimeout) {
						isComplete = true;
						window.clearTimeout(timer);
						timer = null;
						o = {};
						o.id = id;
						o.uri = uri;
						o.arguments = arguments;
						o.error = e;
						onError(o);
						onComplete(o);
						purge(id);
					}
				};
			}
		}
		if (options.node) {
			if (type === "script") {
				node.src = uri;
			} else {
				if (type === "css") {
					node.href = uri;
				}
			}
		} else {
			head.appendChild(node);
		}
		if (type === "script") {
			timer = window.setTimeout(function() {
						var o;
						if (!isComplete) {
							isTimeout = true;
							o = {};
							o.uri = uri;
							o.arguments = arguments;
							onTimeout(o);
							onComplete(o);
							purge(id);
						}
					}, timeout);
		}
		var func = function(node) {
			this._node = node;
			this._head = head;
		};
		func.prototype = {
			abort : function() {
				this._node.src = "";
				this._head.removeChild(this._node);
				delete this._node;
			}
		};
		return new func(node);
	};
	load.Id = 0;
	loadCss = function(uri, options) {
		return load("css", uri, options);
	};
	loadScript = function(uri, options) {
		return load("script", uri, options);
	};
	J.http.ajax = ajax;
	J.http.comet = comet;
	J.http.load = load;
	J.http.loadCss = loadCss;
	J.http.loadScript = loadScript;
});
Jet().$package(function(a) {
	var b = window.location.host;
	a.cookie = {
		set : function(f, h, g, i, c) {
			if (c) {
				var e = new Date();
				var d = new Date();
				d.setTime(e.getTime() + 3600000 * c);
			}
			window.document.cookie = f + "=" + h + "; "
					+ (c ? ("expires=" + d.toGMTString() + "; ") : "")
					+ (i ? ("path=" + i + "; ") : "path=/; ")
					+ (g ? ("domain=" + g + ";") : ("domain=" + b + ";"));
			return true;
		},
		get : function(d) {
			var e = new RegExp("(?:^|;+|\\s+)" + d + "=([^;]*)");
			var c = window.document.cookie.match(e);
			return (!c ? "" : c[1]);
		},
		remove : function(c, d, e) {
			window.document.cookie = c
					+ "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; "
					+ (e ? ("path=" + e + "; ") : "path=/; ")
					+ (d ? ("domain=" + d + ";") : ("domain=" + b + ";"));
		}
	};
});
Jet().$package(function(a) {
	var b = (function() {
		var d = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig, i = /^(?:[\w\-_]+)?\.([\w\-_]+)/, h = /^(?:[\w\-_]+)?#([\w\-_]+)/, l = /^([\w\*\-_]+)/, j = [
				null, null];
		function f(q, o) {
			o = o || document;
			var m = /^[\w\-_#]+$/.test(q);
			if (!m && o.querySelectorAll) {
				return e(o.querySelectorAll(q));
			}
			if (q.indexOf(",") > -1) {
				var x = q.split(/,/g), v = [], u = 0, t = x.length;
				for (; u < t; ++u) {
					v = v.concat(f(x[u], o));
				}
				return g(v);
			}
			var r = q.match(d), p = r.pop(), n = (p.match(h) || j)[1], w = !n
					&& (p.match(i) || j)[1], y = !n && (p.match(l) || j)[1], s;
			if (w && !y && o.getElementsByClassName) {
				s = e(o.getElementsByClassName(w));
			} else {
				s = !n && e(o.getElementsByTagName(y || "*"));
				if (w) {
					s = k(s, "className", RegExp("(^|\\s)" + w + "(\\s|$)"));
				}
				if (n) {
					var z = o.getElementById(n);
					return z ? [z] : [];
				}
			}
			return r[0] && s[0] ? c(r, s) : s;
		}
		function e(q) {
			try {
				return Array.prototype.slice.call(q);
			} catch (p) {
				var n = [], o = 0, m = q.length;
				for (; o < m; ++o) {
					n[o] = q[o];
				}
				return n;
			}
		}
		function c(y, s, p) {
			var t = y.pop();
			if (t === ">") {
				return c(y, s, true);
			}
			var u = [], m = -1, n = (t.match(h) || j)[1], v = !n
					&& (t.match(i) || j)[1], x = !n && (t.match(l) || j)[1], w = -1, o, z, q;
			x = x && x.toLowerCase();
			while ((o = s[++w])) {
				z = o.parentNode;
				do {
					q = !x || x === "*" || x === z.nodeName.toLowerCase();
					q = q && (!n || z.id === n);
					q = q
							&& (!v || RegExp("(^|\\s)" + v + "(\\s|$)")
									.test(z.className));
					if (p || q) {
						break;
					}
				} while ((z = z.parentNode));
				if (q) {
					u[++m] = o;
				}
			}
			return y[0] && u[0] ? c(y, u) : u;
		}
		var g = (function() {
			var m = +new Date();
			var n = (function() {
				var o = 1;
				return function(r) {
					var q = r[m], p = o++;
					if (!q) {
						r[m] = p;
						return true;
					}
					return false;
				};
			})();
			return function(o) {
				var u = o.length, p = [], t = -1, q = 0, s;
				for (; q < u; ++q) {
					s = o[q];
					if (n(s)) {
						p[++t] = s;
					}
				}
				m += 1;
				return p;
			};
		})();
		function k(t, m, s) {
			var o = -1, q, p = -1, n = [];
			while ((q = t[++o])) {
				if (s.test(q[m])) {
					n[++p] = q;
				}
			}
			return n;
		}
		return f;
	})();
	a.dom.mini = b;
});
Jet().$package(function(J) {
	var JSON = {};
	"use strict";
	(function() {
		function f(n) {
			return n < 10 ? "0" + n : n;
		}
		if (typeof Date.prototype.toJSON !== "function" && false) {
			Date.prototype.toJSON = function(key) {
				return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-"
						+ f(this.getUTCMonth() + 1) + "-"
						+ f(this.getUTCDate()) + "T" + f(this.getUTCHours())
						+ ":" + f(this.getUTCMinutes()) + ":"
						+ f(this.getUTCSeconds()) + "Z" : null;
			};
			String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
					key) {
				return this.valueOf();
			};
		}
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
			"\b" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\f" : "\\f",
			"\r" : "\\r",
			'"' : '\\"',
			"\\" : "\\\\"
		}, rep;
		function quote(string) {
			escapable.lastIndex = 0;
			return escapable.test(string) ? '"'
					+ string.replace(escapable, function(a) {
								var c = meta[a];
								return typeof c === "string" ? c : "\\u"
										+ ("0000" + a.charCodeAt(0)
												.toString(16)).slice(-4);
							}) + '"' : '"' + string + '"';
		}
		function str(key, holder) {
			var i, k, v, length, mind = gap, partial, value = holder[key];
			if (value && typeof value === "object"
					&& typeof value.toJSON === "function") {
				value = value.toJSON(key);
			}
			if (typeof rep === "function") {
				value = rep.call(holder, key, value);
			}
			switch (typeof value) {
				case "string" :
					return quote(value);
				case "number" :
					return isFinite(value) ? String(value) : "null";
				case "boolean" :
				case "null" :
					return String(value);
				case "object" :
					if (!value) {
						return "null";
					}
					gap += indent;
					partial = [];
					if (Object.prototype.toString.apply(value) === "[object Array]") {
						length = value.length;
						for (i = 0; i < length; i += 1) {
							partial[i] = str(i, value) || "null";
						}
						v = partial.length === 0 ? "[]" : gap
								? "[\n" + gap + partial.join(",\n" + gap)
										+ "\n" + mind + "]"
								: "[" + partial.join(",") + "]";
						gap = mind;
						return v;
					}
					if (rep && typeof rep === "object") {
						length = rep.length;
						for (i = 0; i < length; i += 1) {
							k = rep[i];
							if (typeof k === "string") {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ": " : ":")
											+ v);
								}
							}
						}
					} else {
						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ": " : ":")
											+ v);
								}
							}
						}
					}
					v = partial.length === 0 ? "{}" : gap
							? "{\n" + gap + partial.join(",\n" + gap) + "\n"
									+ mind + "}"
							: "{" + partial.join(",") + "}";
					gap = mind;
					return v;
			}
		}
		if (typeof JSON.stringify !== "function") {
			JSON.stringify = function(value, replacer, space) {
				var i;
				gap = "";
				indent = "";
				if (typeof space === "number") {
					for (i = 0; i < space; i += 1) {
						indent += " ";
					}
				} else {
					if (typeof space === "string") {
						indent = space;
					}
				}
				rep = replacer;
				if (replacer
						&& typeof replacer !== "function"
						&& (typeof replacer !== "object" || typeof replacer.length !== "number")) {
					throw new Error("JSON.stringify");
				}
				return str("", {
							"" : value
						});
			};
		}
		if (typeof JSON.parse !== "function") {
			JSON.parse = function(text, reviver) {
				var j;
				function walk(holder, key) {
					var k, v, value = holder[key];
					if (value && typeof value === "object") {
						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v;
								} else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				}
				cx.lastIndex = 0;
				if (cx.test(text)) {
					text = text.replace(cx, function(a) {
								return "\\u"
										+ ("0000" + a.charCodeAt(0)
												.toString(16)).slice(-4);
							});
				}
				if (/^[\],:{}\s]*$/
						.test(text
								.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
										"@")
								.replace(
										/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
										"]")
								.replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
					j = eval("(" + text + ")");
					return typeof reviver === "function" ? walk({
								"" : j
							}, "") : j;
				}
				throw new SyntaxError("JSON.parse");
			};
		}
	}());
	J.json = JSON;
});
Jet().$package(function(a) {
			a.fx = a.fx || {};
		});
Jet().$package(function(b) {
	var c = b.dom, a = b.event, f = b.fx.tween;
	var d = {
		linear : function(h, g, j, i) {
			return j * h / i + g;
		},
		quadratic : {
			easeIn : function(h, g, j, i) {
				return j * (h /= i) * h + g;
			},
			easeOut : function(h, g, j, i) {
				return -j * (h /= i) * (h - 2) + g;
			},
			easeInOut : function(h, g, j, i) {
				if ((h /= i / 2) < 1) {
					return j / 2 * h * h + g;
				}
				return -j / 2 * ((--h) * (h - 2) - 1) + g;
			}
		},
		cubic : {
			easeIn : function(h, g, j, i) {
				return j * (h /= i) * h * h + g;
			},
			easeOut : function(h, g, j, i) {
				return j * ((h = h / i - 1) * h * h + 1) + g;
			},
			easeInOut : function(h, g, j, i) {
				if ((h /= i / 2) < 1) {
					return j / 2 * h * h * h + g;
				}
				return j / 2 * ((h -= 2) * h * h + 2) + g;
			}
		},
		quartic : {
			easeIn : function(h, g, j, i) {
				return j * (h /= i) * h * h * h + g;
			},
			easeOut : function(h, g, j, i) {
				return -j * ((h = h / i - 1) * h * h * h - 1) + g;
			},
			easeInOut : function(h, g, j, i) {
				if ((h /= i / 2) < 1) {
					return j / 2 * h * h * h * h + g;
				}
				return -j / 2 * ((h -= 2) * h * h * h - 2) + g;
			}
		},
		quintic : {
			easeIn : function(h, g, j, i) {
				return j * (h /= i) * h * h * h * h + g;
			},
			easeOut : function(h, g, j, i) {
				return j * ((h = h / i - 1) * h * h * h * h + 1) + g;
			},
			easeInOut : function(h, g, j, i) {
				if ((h /= i / 2) < 1) {
					return j / 2 * h * h * h * h * h + g;
				}
				return j / 2 * ((h -= 2) * h * h * h * h + 2) + g;
			}
		},
		sinusoidal : {
			easeIn : function(h, g, j, i) {
				return -j * Math.cos(h / i * (Math.PI / 2)) + j + g;
			},
			easeOut : function(h, g, j, i) {
				return j * Math.sin(h / i * (Math.PI / 2)) + g;
			},
			easeInOut : function(h, g, j, i) {
				return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + g;
			}
		},
		exponential : {
			easeIn : function(h, g, j, i) {
				return (h == 0) ? g : j * Math.pow(2, 10 * (h / i - 1)) + g;
			},
			easeOut : function(h, g, j, i) {
				return (h == i) ? g + j : j * (-Math.pow(2, -10 * h / i) + 1)
						+ g;
			},
			easeInOut : function(h, g, j, i) {
				if (h == 0) {
					return g;
				}
				if (h == i) {
					return g + j;
				}
				if ((h /= i / 2) < 1) {
					return j / 2 * Math.pow(2, 10 * (h - 1)) + g;
				}
				return j / 2 * (-Math.pow(2, -10 * --h) + 2) + g;
			}
		},
		circular : {
			easeIn : function(h, g, j, i) {
				return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + g;
			},
			easeOut : function(h, g, j, i) {
				return j * Math.sqrt(1 - (h = h / i - 1) * h) + g;
			},
			easeInOut : function(h, g, j, i) {
				if ((h /= i / 2) < 1) {
					return -j / 2 * (Math.sqrt(1 - h * h) - 1) + g;
				}
				return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + g;
			}
		},
		elastic : {
			easeIn : function(i, g, m, l, h, k) {
				if (i == 0) {
					return g;
				}
				if ((i /= l) == 1) {
					return g + m;
				}
				if (!k) {
					k = l * 0.3;
				}
				if (!h || h < Math.abs(m)) {
					h = m;
					var j = k / 4;
				} else {
					var j = k / (2 * Math.PI) * Math.asin(m / h);
				}
				return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j)
						* (2 * Math.PI) / k))
						+ g;
			},
			easeOut : function(i, g, m, l, h, k) {
				if (i == 0) {
					return g;
				}
				if ((i /= l) == 1) {
					return g + m;
				}
				if (!k) {
					k = l * 0.3;
				}
				if (!h || h < Math.abs(m)) {
					h = m;
					var j = k / 4;
				} else {
					var j = k / (2 * Math.PI) * Math.asin(m / h);
				}
				return (h * Math.pow(2, -10 * i)
						* Math.sin((i * l - j) * (2 * Math.PI) / k) + m + g);
			},
			easeInOut : function(i, g, m, l, h, k) {
				if (i == 0) {
					return g;
				}
				if ((i /= l / 2) == 2) {
					return g + m;
				}
				if (!k) {
					k = l * (0.3 * 1.5);
				}
				if (!h || h < Math.abs(m)) {
					h = m;
					var j = k / 4;
				} else {
					var j = k / (2 * Math.PI) * Math.asin(m / h);
				}
				if (i < 1) {
					return -0.5
							* (h * Math.pow(2, 10 * (i -= 1)) * Math
									.sin((i * l - j) * (2 * Math.PI) / k)) + g;
				}
				return h * Math.pow(2, -10 * (i -= 1))
						* Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m
						+ g;
			}
		},
		back : {
			easeIn : function(h, g, k, j, i) {
				if (i == undefined) {
					i = 1.70158;
				}
				return k * (h /= j) * h * ((i + 1) * h - i) + g;
			},
			easeOut : function(h, g, k, j, i) {
				if (i == undefined) {
					i = 1.70158;
				}
				return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + g;
			},
			easeInOut : function(h, g, k, j, i) {
				if (i == undefined) {
					i = 1.70158;
				}
				if ((h /= j / 2) < 1) {
					return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + g;
				}
				return k / 2
						* ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2)
						+ g;
			}
		},
		bounce : {
			easeIn : function(h, g, j, i) {
				return j - d.bounce.easeOut(i - h, 0, j, i) + g;
			},
			easeOut : function(h, g, j, i) {
				if ((h /= i) < (1 / 2.75)) {
					return j * (7.5625 * h * h) + g;
				} else {
					if (h < (2 / 2.75)) {
						return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75)
								+ g;
					} else {
						if (h < (2.5 / 2.75)) {
							return j
									* (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375)
									+ g;
						} else {
							return j
									* (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375)
									+ g;
						}
					}
				}
			},
			easeInOut : function(h, g, j, i) {
				if (h < i / 2) {
					return d.bounce.easeIn(h * 2, 0, j, i) * 0.5 + g;
				} else {
					return d.bounce.easeOut(h * 2 - i, 0, j, i) * 0.5 + j * 0.5
							+ g;
				}
			}
		}
	};
	var e = new b.Class({
				init : function(i, g, j, l, k, n) {
					var k = k, n = n || 20, h = this, o;
					this._begin = j;
					this._end = l;
					var m = this._run = function() {
						if (h.current < n) {
							h.current++;
							if (h._begin > h._end) {
								o = h._begin
										- Math.ceil(k(h.current, 0,
												(h._begin - h._end), n));
							} else {
								o = h._begin
										+ Math.ceil(k(h.current, 0,
												(h._end - h._begin), n));
							}
							c.setStyle(i, g, o + "px");
							h._timer = setTimeout(m, 30);
						} else {
							a.notifyObservers(h, "finish");
						}
					};
				},
				setBegin : function(g) {
					this._begin = g;
				},
				setEnd : function(g) {
					this._end = g;
				},
				start : function() {
					clearTimeout(this._timer);
					this.current = 0;
					this._run();
				}
			});
	b.fx.Animation = e;
	b.fx.tween = d;
});
Jet().$package(function(a) {
			a.ui = a.ui || {};
		});
Jet().$package(function(l) {
	var j = l.dom, i = l.event;
	var a = function(o) {
		o.preventDefault();
	};
	var n = false, k = false, g = false, h = false, e, m, d, c;
	var f, b;
	l.ui.Drag = new l.Class({
		init : function(v, q, r) {
			var p = this;
			var o, w, t, s;
			this.apperceiveEl = v;
			r = r || {};
			this.isLimited = r.isLimited || false;
			var u = false;
			if (this.isLimited) {
				this._leftMargin = r.leftMargin || 0;
				this._topMargin = r.topMargin || 0;
				this._rightMargin = r.rightMargin || 0;
				this._bottomMargin = r.bottomMargin || 0;
			}
			if (r.xOnly) {
				this._xOnly = r.xOnly || false;
			}
			if (r.yOnly) {
				this._yOnly = r.yOnly || false;
			}
			if (q === false) {
				this.effectEl = false;
			} else {
				this.effectEl = q || v;
			}
			this.dragStart = function(y) {
				if (y.changedTouches) {
					if (y.changedTouches.length > 1) {
						return;
					}
					y = y.changedTouches[0];
					document.body.style.WebkitTouchCallout = "none";
				} else {
					y.preventDefault();
					y.stopPropagation();
				}
				i.notifyObservers(p, "beforeStart");
				n = r.clientEl ? j.getClientWidth(r.clientEl) : qqweb.layout
						.getClientWidth();
				k = r.clientEl ? j.getClientHeight(r.clientEl) : qqweb.layout
						.getClientHeight();
				g = parseInt(j.getClientWidth(q)) || 0;
				h = parseInt(j.getClientHeight(q)) || 0;
				if (p.isLimited) {
					e = n - g - p._rightMargin;
					m = p._leftMargin;
					d = k - h - p._bottomMargin;
					c = p._topMargin;
				}
				p._oldX = o = parseInt(j.getStyle(p.effectEl, "left")) || 0;
				p._oldY = w = parseInt(j.getStyle(p.effectEl, "top")) || 0;
				t = y.pageX;
				s = y.pageY;
				if (l.platform.iPad) {
					i.on(document, "touchmove", p.dragMove);
					i.on(document, "touchend", p.dragStop);
					var x = new WebKitCSSMatrix(window
							.getComputedStyle(p.apperceiveEl).webkitTransform);
					f = y.pageX - x.m41;
					b = y.pageY - x.m42;
				} else {
					i.on(document, "mousemove", p.dragMove);
					i.on(document, "mouseup", p.dragStop);
				}
				if (l.browser.ie) {
					i.on(document.body, "selectstart", a);
				}
				if (l.platform.iPad) {
					i.notifyObservers(p, "start", {
								x : y.pageX,
								y : y.pageY
							});
				} else {
					i.notifyObservers(p, "start", {
								x : o,
								y : w
							});
				}
			};
			this.dragMove = function(C) {
				if (C.browserEvent) {
					C.browserEvent.preventDefault();
					C.browserEvent.stopPropagation();
				} else {
					C.preventDefault();
					C.stopPropagation();
				}
				if (C.changedTouches) {
					C = C.changedTouches[0];
				}
				var z, D;
				if (!l.platform.iPad) {
					z = o + (C.pageX - t);
					D = w + (C.pageY - s);
				}
				if (p.isLimited) {
					if (z > e && !r.isOverRight) {
						z = e;
					}
					if (z < m && !r.isOverLeft) {
						z = m;
					}
				}
				if (p._oldX !== z && !p._yOnly) {
					p._oldX = z;
					if (p.effectEl && !l.platform.iPad) {
						p.effectEl.style.left = z + "px";
					}
					u = true;
				}
				if (p.isLimited) {
					if (D > d && !r.isOverBottom) {
						D = d;
					}
					if (D < c && !r.isOverTop) {
						D = c;
					}
				}
				if (p._oldY !== D && !p._xOnly) {
					p._oldY = D;
					if (p.effectEl && !l.platform.iPad) {
						p.effectEl.style.top = D + "px";
					}
					u = true;
				}
				var B = z, A = D;
				if (p.effectEl && l.platform.iPad) {
					p._oldX = o + (C.pageX - t);
					p._oldY = w + (C.pageY - s);
					if (!p._yOnly) {
						z = C.pageX - f;
					} else {
						z = o;
					}
					if (!p._xOnly) {
						D = C.pageY - b;
					} else {
						D = w;
					}
					p.effectEl.style.webkitTransform = "translate3d(" + z
							+ "px, " + D + "px, 0px)";
					B = C.pageX;
					A = C.pageY;
				}
				if (u) {
					i.notifyObservers(p, "move", {
								x : B,
								y : A
							});
				}
			};
			this.dragStop = function(D) {
				document.body.style.WebkitTouchCallout = "auto";
				if (u || l.platform.iPad) {
					var z = p._oldX;
					var F = p._oldY;
					if (p.isLimited) {
						if (z > e) {
							z = e;
						}
						if (z < m) {
							z = m;
						}
					}
					if (p.isLimited) {
						if (F > d) {
							F = d;
						}
						if (F < c) {
							F = c;
						}
					}
					i.notifyObservers(p, "end", {
								x : z,
								y : F
							});
				} else {
					i.notifyObservers(p, "end", null);
				}
				if (p.isLimited
						&& (p.isOverRight || p.isOverLeft || p.isOverTop || p.isOverBottom)) {
					var z = o + (D.pageX - t);
					var F = w + (D.pageY - s);
					var E = n - g - p._rightMargin;
					var B = p._leftMargin;
					var A = k - p._bottomMargin;
					var C = p._topMargin;
					if (z > E || z < B || F > A || F < C) {
						i.notifyObservers(p, "overFlowBorder", {
									x : z,
									y : F
								});
						l.out("overFlow");
					}
				}
				n = false;
				k = false;
				g = false;
				h = false;
				if (l.platform.iPad) {
					i.off(document, "touchmove", p.dragMove);
					i.off(document, "touchend", p.dragStop);
				} else {
					i.off(document, "mousemove", p.dragMove);
					i.off(document, "mouseup", p.dragStop);
				}
				if (l.browser.ie) {
					i.off(document.body, "selectstart", a);
				}
				u = false;
				l.out("end");
			};
			i.on(this.apperceiveEl, "customdrag", this.dragStart);
		},
		lock : function() {
			i.off(this.apperceiveEl, "customdrag", this.dragStart);
		},
		unlock : function() {
			i.on(this.apperceiveEl, "customdrag", this.dragStart);
		},
		show : function() {
			j.show(this.apperceiveEl);
		},
		hide : function() {
			j.hide(this.apperceiveEl);
		},
		setLimite : function(o) {
			o = o || {};
			this.isLimited = o.isLimited || false;
			if (this.isLimited) {
				this._leftMargin = o.leftMargin || 0;
				this._topMargin = o.topMargin || 0;
				this._rightMargin = o.rightMargin || 0;
				this._bottomMargin = o.bottomMargin || 0;
			}
		}
	});
});
Jet().$package(function(c) {
	c.ui = c.ui || {};
	var d = c.dom, b = c.event;
	var g = 0;
	var e = {
		t : "t",
		r : "r",
		b : "b",
		l : "l",
		rt : "rt",
		rb : "rb",
		lb : "lb",
		lt : "lt"
	};
	var a = d.getClientHeight() || 0;
	var f = d.getClientWidth() || 0;
	c.ui.Resize = new c.Class({
		init : function(m, h, j) {
			var i = this;
			j = j || {};
			this.apperceiveEl = m;
			if (h === false) {
				this.effectEl = false;
			} else {
				this.effectEl = h || m;
			}
			this.size = j.size || 5;
			this.minWidth = j.minWidth || 0;
			this.minHeight = j.minHeight || 0;
			this._dragProxy = j.dragProxy;
			this.isLimited = j.isLimited || false;
			if (this.isLimited) {
				this._leftMargin = j.leftMargin || 0;
				this._topMargin = j.topMargin || 0;
				this._rightMargin = j.rightMargin || 0;
				this._bottomMargin = j.bottomMargin || 0;
			}
			this._left = this.getLeft();
			this._top = this.getTop();
			this._width = this.getWidth();
			this._height = this.getHeight();
			this.id = this.getId();
			var k = {
				t : "cursor:n-resize; z-index:1; left:0; top:-5px; width:100%; height:5px;",
				r : "cursor:e-resize; z-index:1; right:-5px; top:0; width:5px; height:100%;",
				b : "cursor:s-resize; z-index:1; left:0; bottom:-5px; width:100%; height:5px;",
				l : "cursor:w-resize; z-index:1; left:-5px; top:0; width:5px; height:100%;",
				rt : "cursor:ne-resize; z-index:2; right:-5px; top:-5px; width:5px; height:5px;",
				rb : "cursor:se-resize; z-index:2; right:-5px; bottom:-5px; width:5px; height:5px;",
				lt : "cursor:nw-resize; z-index:2; left:-5px; top:-5px; width:5px; height:5px;",
				lb : "cursor:sw-resize; z-index:2; left:-5px; bottom:-5px; width:5px; height:5px;"
			};
			this._onMousedown = function() {
				b.notifyObservers(i, "mousedown", {
							width : i._width,
							height : i._height
						});
			};
			this._onDragEnd = function() {
				b.notifyObservers(i, "end", {
							x : i.getLeft(),
							y : i.getTop(),
							width : i.getWidth(),
							height : i.getHeight()
						});
			};
			for (var l in e) {
				var n = d.node("div", {
							id : "window_" + this.id + "_resize_" + e[l]
						});
				this.apperceiveEl.appendChild(n);
				d.setCssText(n,
						"position:absolute; overflow:hidden; background:url("
								+ c.path + "assets/images/transparent.gif);"
								+ k[l]);
				if (this._dragProxy) {
				} else {
				}
				this["_dragController_" + e[l]] = new c.ui.Drag(n, false);
			}
			this._onDragLeftStart = function(o) {
				b.notifyObservers(i, "mousedown", {
							width : i._width,
							height : i._height
						});
				i._startLeft = i._left = i.getLeft();
				i._startWidth = i._width = i.getWidth();
			};
			this._onDragLeft = function(q) {
				var p = i._startWidth - q.x;
				var o = i._startLeft + q.x;
				if (p < i.minWidth) {
					p = i.minWidth;
					o = i._startLeft + (i._startWidth - p);
				}
				if (i.isLimited && (o - i._leftMargin) < 0) {
					o = i._leftMargin;
					p = i._startLeft + i._startWidth - i._leftMargin;
				}
				i.setLeft(o);
				i.setWidth(p);
				b.notifyObservers(i, "resize", {
							width : i._width,
							height : i._height
						});
			};
			this._onDragTopStart = function(o) {
				b.notifyObservers(i, "mousedown", {
							width : i._width,
							height : i._height
						});
				i._startTop = i._top = i.getTop();
				i._startHeight = i._height = i.getHeight();
			};
			this._onDragTop = function(p) {
				var o = i._startHeight - p.y;
				var q = i._startTop + p.y;
				if (o < i.minHeight) {
					o = i.minHeight;
					q = i._startTop + (i._startHeight - o);
				}
				if (i.isLimited && (q - i._topMargin) < 0) {
					q = i._topMargin;
					o = i._startTop + i._startHeight - i._topMargin;
				}
				i.setTop(q);
				i.setHeight(o);
				b.notifyObservers(i, "resize", {
							width : i._width,
							height : i._height
						});
			};
			this._onDragRightStart = function(o) {
				b.notifyObservers(i, "mousedown", {
							width : i._width,
							height : i._height
						});
				i._startWidth = i._width = i.getWidth();
				i._startLeft = i._left = i.getLeft();
			};
			this._onDragRight = function(q) {
				var o = i._startWidth + q.x;
				if (o < i.minWidth) {
					o = i.minWidth;
				}
				var p = f - i._startLeft - i._rightMargin;
				if (i.isLimited && p < o) {
					o = p;
				}
				i.setWidth(o);
				b.notifyObservers(i, "resize", {
							width : i._width,
							height : i._height
						});
			};
			this._onDragBottomStart = function(o) {
				b.notifyObservers(i, "mousedown", {
							width : i._width,
							height : i._height
						});
				i._startHeight = i._height = i.getHeight();
				i._startTop = i._top = i.getTop();
			};
			this._onDragBottom = function(q) {
				var o = i._startHeight + q.y;
				if (o < i.minHeight) {
					o = i.minHeight;
				}
				var p = a - i._startTop - i._bottomMargin;
				if (i.isLimited && p < o) {
					o = p;
				}
				i.setHeight(o);
				b.notifyObservers(i, "resize", {
							width : i._width,
							height : i._height
						});
			};
			this._onDragLeftTopStart = function(o) {
				i._onDragLeftStart(o);
				i._onDragTopStart(o);
			};
			this._onDragLeftTop = function(o) {
				i._onDragLeft(o);
				i._onDragTop(o);
			};
			this._onDragLeftBottomStart = function(o) {
				i._onDragLeftStart(o);
				i._onDragBottomStart(o);
			};
			this._onDragLeftBottom = function(o) {
				i._onDragLeft(o);
				i._onDragBottom(o);
			};
			this._onDragRightBottomStart = function(o) {
				i._onDragRightStart(o);
				i._onDragBottomStart(o);
			};
			this._onDragRightBottom = function(o) {
				i._onDragRight(o);
				i._onDragBottom(o);
			};
			this._onDragRightTopStart = function(o) {
				i._onDragRightStart(o);
				i._onDragTopStart(o);
			};
			this._onDragRightTop = function(o) {
				i._onDragRight(o);
				i._onDragTop(o);
			};
			b.addObserver(this["_dragController_" + e.t], "start",
					this._onDragTopStart);
			b.addObserver(this["_dragController_" + e.t], "move",
					this._onDragTop);
			b.addObserver(this["_dragController_" + e.t], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.r], "start",
					this._onDragRightStart);
			b.addObserver(this["_dragController_" + e.r], "move",
					this._onDragRight);
			b.addObserver(this["_dragController_" + e.r], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.b], "start",
					this._onDragBottomStart);
			b.addObserver(this["_dragController_" + e.b], "move",
					this._onDragBottom);
			b.addObserver(this["_dragController_" + e.b], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.l], "start",
					this._onDragLeftStart);
			b.addObserver(this["_dragController_" + e.l], "move",
					this._onDragLeft);
			b.addObserver(this["_dragController_" + e.l], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.rb], "start",
					this._onDragRightBottomStart);
			b.addObserver(this["_dragController_" + e.rb], "move",
					this._onDragRightBottom);
			b.addObserver(this["_dragController_" + e.rb], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.rt], "start",
					this._onDragRightTopStart);
			b.addObserver(this["_dragController_" + e.rt], "move",
					this._onDragRightTop);
			b.addObserver(this["_dragController_" + e.rt], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.lt], "start",
					this._onDragLeftTopStart);
			b.addObserver(this["_dragController_" + e.lt], "move",
					this._onDragLeftTop);
			b.addObserver(this["_dragController_" + e.lt], "end",
					this._onDragEnd);
			b.addObserver(this["_dragController_" + e.lb], "start",
					this._onDragLeftBottomStart);
			b.addObserver(this["_dragController_" + e.lb], "move",
					this._onDragLeftBottom);
			b.addObserver(this["_dragController_" + e.lb], "end",
					this._onDragEnd);
		},
		setWidth : function(h) {
			d.setStyle(this.effectEl, "width", h + "px");
			this._width = h;
		},
		setHeight : function(i) {
			d.setStyle(this.effectEl, "height", i + "px");
			this._height = i;
		},
		setLeft : function(h) {
			d.setStyle(this.effectEl, "left", h + "px");
			this._left = h;
		},
		setTop : function(h) {
			d.setStyle(this.effectEl, "top", h + "px");
			this._top = h;
		},
		getWidth : function() {
			return parseInt(d.getStyle(this.effectEl, "width"));
		},
		getHeight : function() {
			return parseInt(d.getStyle(this.effectEl, "height"));
		},
		getLeft : function() {
			return parseInt(d.getStyle(this.effectEl, "left"));
		},
		getTop : function() {
			return parseInt(d.getStyle(this.effectEl, "top"));
		},
		getId : function() {
			return g++;
		},
		lock : function() {
			for (var h in e) {
				this["_dragController_" + e[h]].lock();
			}
		},
		unlock : function() {
			for (var h in e) {
				this["_dragController_" + e[h]].unlock();
			}
		},
		show : function() {
			for (var h in e) {
				this["_dragController_" + e[h]].show();
			}
		},
		hide : function() {
			for (var h in e) {
				this["_dragController_" + e[h]].hide();
			}
		}
	});
});
Jet().$package(function(b) {
	var d = b.dom.id, c = b.dom, a = b.event;
	b.ui.Tab = function(f, g, e) {
		this.tabs = [];
		this.currentTab = null;
		this.config = {
			defaultIndex : 0,
			triggerEvent : "click",
			slideEnabled : false,
			slideInterval : 5 * 1000,
			slideDelay : 300,
			autoInit : true,
			onShow : function() {
			}
		};
		this.setConfig(e);
		if (f && g) {
			this.addRange(f, g);
			if (this.config.autoInit) {
				this.init();
			}
		}
	};
	b.ui.Tab.prototype = {
		setConfig : function(e) {
			if (!e) {
				return;
			}
			for (var f in e) {
				this.config[f] = e[f];
			}
		},
		add : function(e) {
			if (!e) {
				return;
			}
			if (e.trigger) {
				this.tabs.push(e);
				e.trigger.style.display = "block";
			}
		},
		addRange : function(g, h) {
			if (!g || !h) {
				return;
			}
			if (g.length && h.length && g.length == h.length) {
				for (var f = 0, e = g.length; f < e; f++) {
					this.add({
								trigger : g[f],
								sheet : h[f]
							});
				}
			}
		},
		select : function(e) {
			if (!e
					|| (!!this.currentTab && e.trigger == this.currentTab.trigger)) {
				return;
			}
			if (this.currentTab) {
				c.removeClass(this.currentTab.trigger, "current");
				if (this.currentTab.sheet) {
					this.currentTab.sheet.style.display = "none";
				}
			}
			this.currentTab = e;
			this.show();
		},
		remove : function(f) {
			if (!f) {
				return;
			}
			if (f.trigger) {
				c.removeClass(f.trigger, "current");
				f.trigger.style.display = "none";
			}
			if (f.sheet) {
				f.sheet.style.display = "none";
			}
			var e = this.indexOf(f);
			this.tabs.splice(e, e);
			if (f.trigger == this.currentTab.trigger) {
				if (e == 0) {
					this.select(this.tabs[(e + 1)]);
				} else {
					this.select(this.tabs[(e - 1)]);
				}
			}
		},
		show : function() {
			if (this.currentTab.trigger) {
				this.currentTab.trigger.style.display = "block";
			}
			c.addClass(this.currentTab.trigger, "current");
			if (this.currentTab.sheet) {
				this.currentTab.sheet.style.display = "block";
			}
			this.config.onShow.call(this);
			a.notifyObservers(this, "show", this.currentTab);
		},
		slide : function() {
			var h = this.config, k = this, i, f;
			b.array.forEach(this.tabs, function(n, l, m) {
						a.on(n.trigger, "mouseover", e);
						a.on(n.sheet, "mouseover", e);
						a.on(n.trigger, "mouseout", g);
						a.on(n.sheet, "mouseout", g);
					});
			j();
			function j() {
				var l = k.indexOf(k.currentTab);
				if (l == -1) {
					return;
				}
				i = window.setInterval(function() {
							var m = k.tabs[++l % k.tabs.length];
							if (m) {
								k.select(m);
							}
						}, h.slideInterval);
			}
			function e() {
				window.clearTimeout(f);
				window.clearInterval(i);
			}
			function g() {
				f = window.setTimeout(j, h.slideDelay);
			}
		},
		indexOf : function(g) {
			for (var f = 0, e = this.tabs.length; f < e; f++) {
				if (g.trigger == this.tabs[f].trigger) {
					return f;
				}
			}
			return -1;
		},
		init : function() {
			var e = this.config, f = this;
			b.array.forEach(this.tabs, function(i, g, h) {
						a.on(i.trigger, e.triggerEvent, function() {
									f.select.call(f, i);
								});
						if (i.sheet) {
							i.sheet.style.display = "none";
						}
					});
			this.select(this.tabs[e.defaultIndex]);
			if (e.slideEnabled) {
				this.slide();
			}
		}
	};
});
Jet().$package(function(b) {
	var d = b.dom.id, c = b.dom, a = b.event;
	b.ui.MaskLayer = new b.Class({
		init : function(g) {
			var f = this;
			g.zIndex = !b.isUndefined(g.zIndex) ? g.zIndex : 9000000;
			g.appendTo = g.appendTo || c.getDocument();
			this.container = c.node("div", {
						"class" : "maskLayer"
					});
			this.container.innerHTML = ' <div class="maskBackground"></div> <div id="maskLayerBody"></div> ';
			this.setZIndex(g.zIndex);
			g.appendTo.appendChild(this.container);
			var e = {
				onMaskLayerClick : function() {
					a.notifyObservers(f, "click", f);
				}
			};
			a.on(this.container, "click", e.onMaskLayerClick);
			this.body = c.id("maskLayerBody");
		},
		append : function(e) {
			this.body.appendChild(e);
		},
		show : function() {
			c.show(this.container);
			a.notifyObservers(this, "show");
			this._isShow = true;
		},
		hide : function() {
			c.hide(this.container);
			a.notifyObservers(this, "hide");
			this._isShow = false;
		},
		isShow : function() {
			return this._isShow;
		},
		toggleShow : function() {
			if (this.isShow()) {
				this.hide();
			} else {
				this.show();
			}
		},
		getZIndex : function() {
			return this._zIndex;
		},
		setZIndex : function(e) {
			c.setStyle(this.container, "zIndex", e);
			this._zIndex = e;
		},
		setTopZIndex : function() {
			this.setZIndex(qqweb.layout.getTopZIndex());
		},
		fadeIn : function() {
			this.show();
		},
		fadeOut : function() {
			this.hide();
		},
		about : function() {
		}
	});
});
Jet().$package(function(b) {
	var c = b.dom, a = b.event;
	var d = function(f) {
		this.container = f.parentNode;
		this.iframe = f;
		this.holding = false;
		this.posx = 0;
		this.posy = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		var e = this;
		this.observers = {
			onTouchStart : function(g) {
				var h = g.changedTouches[0];
				e.posx = h.pageX;
				e.posy = h.pageY;
				e.minX = c.getWidth(e.container) - c.getWidth(e.iframe);
				e.minY = c.getHeight(e.container) - c.getHeight(e.iframe);
				a.on(e.iframe, "touchmove", e.observers.onTouchMove);
				a.on(e.iframe, "touchend", e.observers.onTouchEnd);
			},
			onTouchMove : function(l) {
				if (l.changedTouches.length > 1) {
					return;
				}
				l.preventDefault();
				l.stopPropagation();
				var n = l.changedTouches[0];
				var g = n.pageX;
				var m = n.pageY;
				var i = e.posx - g;
				var h = e.posy - m;
				var k = e.offsetX - i;
				var j = e.offsetY - h;
				if (k > 0) {
					k = 0;
				} else {
					if (k < e.minX) {
						k = e.minX;
					}
				}
				if (j > 0) {
					j = 0;
				} else {
					if (j < e.minY) {
						j = e.minY;
					}
				}
				f.style.left = k + "px";
				f.style.top = j + "px";
				e.offsetX = k;
				e.offsetY = j;
				e.posx = g;
				e.posy = m;
			},
			onTouchEnd : function() {
				a.off(e.iframe, "touchmove", e.observers.onTouchMove);
				a.off(e.iframe, "touchend", e.observers.onTouchEnd);
			}
		};
		this.destroy = function() {
			a.off(this.iframe, "touchstart", this.observers.onTouchStart);
			a.off(this.iframe, "touchmove", this.observers.onTouchMove);
			a.off(this.iframe, "touchend", this.observers.onTouchEnd);
			this.iframe = null;
			this.container = null;
		};
		a.on(this.iframe, "touchstart", this.observers.onTouchStart);
	};
	b.ui.IframeScroller = d;
	b.ui.TouchScroller = new b.Class({
		container : null,
		_dx : 0,
		_dy : 0,
		_posy : 0,
		_posx : 0,
		_maxOffsetX : 0,
		_maxOffsetY : 0,
		init : function(h, g, f) {
			this.container = b.isString(h) ? c.id(h) : h;
			this.touchContainer = g || this.container;
			var e = this;
			this.observer = {
				onTouchStart : function(i) {
					if (i.changedTouches.length > 1) {
						return;
					}
					var j = i.changedTouches[0];
					e._dx = e.container.scrollLeft;
					e._dy = e.container.scrollTop;
					e._posx = j.pageX;
					e._posy = j.pageY;
					e.maxOffsetX = e.container.scrollWidth
							- e.container.clientWidth;
					e.maxOffsetY = e.container.scrollHeight
							- e.container.clientHeight;
					a.on(e.touchContainer, "touchmove", e.observer.onTouchMove);
					a.on(e.touchContainer, "touchend", e.observer.onTouchEnd);
				},
				onTouchMove : function(l) {
					l.stopPropagation();
					l.preventDefault();
					var m = l.changedTouches[0];
					var j = m.pageX;
					var i = m.pageY;
					var k = false;
					e._dx += e._posx - j;
					e._dy += e._posy - i;
					e._posx = j;
					e._posy = i;
					if (e._dx < 0) {
						e._dx = 0;
					}
					if (e._dy < 0) {
						e._dy = 0;
					}
					if (e._dx > e.maxOffsetX) {
						e._dx = e.maxOffsetX;
					}
					if (e._dy > e.maxOffsetY) {
						e._dy = e.maxOffsetY;
					}
					e.container.scrollLeft = e._dx;
					e.container.scrollTop = e._dy;
				},
				onTouchEnd : function(i) {
					a
							.off(e.touchContainer, "touchmove",
									e.observer.onTouchMove);
					a.off(e.touchContainer, "touchend", e.observer.onTouchEnd);
				}
			};
			a.on(this.touchContainer, "touchstart", this.observer.onTouchStart);
		},
		destroy : function() {
			a
					.off(this.touchContainer, "touchstart",
							this.observer.onTouchStart);
			this.container = null;
		}
	});
});
Jet().$package(function(b) {
	var c = b.dom, a = b.event;
	b.ui.Notifier = new b.Class({
		hasSupport : function() {
			if (window.webkitNotifications) {
				return true;
			} else {
				return false;
			}
		},
		requestPermission : function(d) {
			window.webkitNotifications.requestPermission(function() {
						if (d) {
							d(window.webkitNotifications.checkPermission() == 0);
						}
					});
		},
		notify : function(f, g, d) {
			if (window.webkitNotifications.checkPermission() == 0) {
				var e = window.webkitNotifications.createNotification(f, g, d);
				e.show();
				return e;
			}
			return false;
		}
	});
});
Jet().$package(function(b) {
	var c = b.dom, a = b.event;
	b.ui.Marquee = new b.Class({
				init : function(d) {
					var e = this;
					this.speed = d.speed || 40;
					this.stopTime = d.stopTime || 3000;
					this.lineHeight = d.lineHeight || 20;
					this.target = d.target;
					this.timer = null;
					this.lineTimer = null;
					this.intervaler = null;
					this.scrollHeight = this.lineHeight;
					this.isStop = false;
					this._onTimeRun = function() {
						e.scrollOneLine();
					};
				},
				scrollOneLine : function() {
					if (this.scrollHeight > 0) {
						this.scrollHeight--;
						var d = this.target.style.top.match(/-?\d+/);
						d = (!d) ? 0 : parseInt(d[0]);
						this.target.style.top = (--d) + "px";
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
					var e = this.target.style.top.match(/\d+/);
					var d = c.getScrollHeight(this.target);
					if (!!e && !!d) {
						e = parseInt(e[0]);
						if (e >= d) {
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
Jet().$package(function(i) {
	var f = i.dom, d = i.event;
	var k = false, h = false, b = false, c = false;
	var a, j, g, e;
	i.ui.Sortables = new i.Class({
		init : function(n, m, l) {
			this.dropTargets = n || [];
			this.sortStr = m;
			this.option = l || {};
			this.limiteOption = this.option.limiteOption || {};
			this.dragController = {};
		},
		addDropTarget : function(l) {
			this.dropTargets.push(l);
		},
		addEffect : function(l) {
			this.effectEl = l;
		},
		removeDropTarget : function(l) {
			i.array.remove(this.dropTargets, l);
		},
		addDragClass : function(o) {
			var s = o.parentNode, C = o, t = this.effectEl || this.clone(C), r = this, B = f
					.getXY(s), z = f.getXY(C), y = o.getAttribute(this.sortStr)
					|| "", x = this.dropTargets, A = [], m, l;
			var q = function() {
				b = f.getClientWidth(C);
				c = f.getClientHeight(C);
				var E = {};
				E.top = parseInt(f.getStyle(C, "marginTop") || 0);
				E.buttom = parseInt(f.getStyle(C, "marginbottom") || 0);
				E.left = parseInt(f.getStyle(C, "marginLeft") || 0);
				E.right = parseInt(f.getStyle(C, "marginRight") || 0);
				b += (E.left + E.right);
				c += (E.top + E.buttom);
				x = this.dropTargets;
				v();
				D();
				s = C.parentNode;
				m = C.nextSibling;
				document.body.appendChild(t);
				d.notifyObservers(r, "beforeStart");
			};
			var u = function(E) {
				if (r.option.isDash) {
					C = r.cloneDashedEl(C);
				} else {
					if (!i.browser.ie) {
						f.setStyle(C, "opacity", 0.5);
					}
				}
				i.out("drag开始");
				d.notifyObservers(r, "start");
			};
			var w = function(G) {
				if (Math.abs(G.x - l[0]) + Math.abs(G.y - l[1]) < 1) {
					return;
				} else {
					if (G.x - l[0] > 0) {
						var J = "right";
					} else {
						var J = "left";
					}
					l = [G.x, G.y];
				}
				for (var F in A) {
					if ((G.x > A[F].x) && (G.x < A[F].x + A[F].w)
							&& (G.y > A[F].y) && (G.y < A[F].y + A[F].h)) {
						var E = x[F];
						var O = f.getClientWidth(E);
						var M = Math.floor(O / b);
						var L = f.getXY(E);
						var K = G.x - L[0];
						var I = G.y - L[1];
						var N = Math.floor(I / c);
						if (J == "right") {
							var P = Math.ceil(K / b);
						} else {
							if (J == "left") {
								var P = Math.floor(K / b);
							}
						}
						var H = P + N * M;
						if (E.childNodes[H]) {
							E.insertBefore(C, E.childNodes[H]);
						} else {
							E.appendChild(C);
						}
						break;
					}
				}
				d.notifyObservers(r, "move", G);
			};
			var n = function(E) {
				E.el = t;
				d.notifyObservers(r, "overFlowBorder", E);
			};
			var p = function(H) {
				document.body.removeChild(t);
				if (r.option.isDash) {
					r.removeDashedEl();
					C = r.tempEl;
				} else {
					if (!i.browser.ie) {
						f.setStyle(C, "opacity", 1);
					}
				}
				var E = [];
				for (var G in x) {
					E[G] = [];
					var K = x[G].childNodes;
					for (var F = 0; F < K.length; F++) {
						var I = K[F].getAttribute(r.sortStr);
						if (I) {
							E[G].push(I);
						}
					}
				}
				i.out("drag结束");
				try {
					d.notifyObservers(r, "end", {
								queue : E,
								pos : H,
								apperceiveEl : C,
								nextEl : m,
								parentEl : s
							});
				} catch (J) {
					i.out("drop error");
				}
			};
			var v = function() {
				z = f.getXY(C);
				var E = z[0];
				var F = z[1];
				l = [E, F];
				f.setStyle(t, "left", E + "px");
				f.setStyle(t, "top", F + "px");
			};
			var D = function() {
				var J, H, I, G, E;
				A = [];
				for (var F in x) {
					J = x[F];
					H = {};
					I = f.getXY(x[F]);
					G = f.getClientWidth(x[F]);
					E = f.getClientHeight(x[F]);
					H.x = I[0];
					H.y = I[1];
					H.w = G;
					H.h = E;
					A[F] = H;
				}
			};
			this.dragController[y] = new i.ui.Drag(o, t, this.limiteOption);
			d.addObserver(this.dragController[y], "beforeStart", i
							.bind(q, this));
			d.addObserver(this.dragController[y], "start", i.bind(u, this));
			d.addObserver(this.dragController[y], "move", i.bind(w, this));
			d.addObserver(this.dragController[y], "overFlowBorder", i.bind(n,
							this));
			d.addObserver(this.dragController[y], "end", i.bind(p, this));
		},
		setLimite : function(m) {
			for (var l in this.dragController) {
				this.dragController[l].setLimite(m);
			}
		},
		cloneDashedEl : function(o) {
			var p = f.node("div");
			var n = this.option.className;
			if (n) {
				f.setClass(p, n);
			} else {
				f.setStyle(p, "border", "dashed 2px #fff");
				f.setClass(p, o.className);
				f.setStyle(p, "position", "relative");
				f.setStyle(p, "float", "left");
				var m = o.offsetWidth - 10 * parseInt(p.style.borderWidth)
						+ "px";
				var l = o.offsetHeight - 10 * parseInt(p.style.borderWidth)
						+ "px";
				f.setStyle(p, "width", m);
				f.setStyle(p, "height", l);
			}
			this.dashedEl = p;
			if (o.nextSibling) {
				o.parentNode.insertBefore(p, o.nextSibling);
			} else {
				o.parentNode.appendChild(p);
			}
			this.tempEl = o;
			o.parentNode.removeChild(o);
			return p;
		},
		removeDashedEl : function() {
			if (this.dashedEl.nextSibling) {
				this.dashedEl.parentNode.insertBefore(this.tempEl,
						this.dashedEl.nextSibling);
			} else {
				this.dashedEl.parentNode.appendChild(this.tempEl);
			}
			this.dashedEl.parentNode.removeChild(this.dashedEl);
		},
		clone : function(n) {
			var l;
			var o = false;
			var m = n.cloneNode(true);
			m.setAttribute("id", "");
			f.setStyle(m, "position", "absolute");
			f.setStyle(m, "zIndex", "9999999");
			f.setStyle(m, "background", "none");
			return m;
		},
		forEachNode : function(m, n) {
			var l = m.length;
			if (typeof n != "function") {
				throw new TypeError();
			}
			var p = arguments[2];
			for (var o = 0; o < l; o++) {
				if (o in m) {
					n.call(p, m[o], o, m);
				}
			}
		}
	});
});
Jet().$package(function(b) {
	var c = b.dom, a = b.event;
	b.ui.ScrollBar = new b.Class({
		init : function(f) {
			var e = this;
			this.obj = f;
			this.content = this.obj.getElementsByTagName("div")[0];
			this.bar = c.node("div", {
						"class" : "scrollBar"
					});
			if (b.browser.ie) {
				this.bar.innerHTML = '<div class="scrollBar_bg scrollBar_bg_t"></div><div class="scrollBar_bg scrollBar_bg_b"></div>';
			}
			c.setStyle(this.bar, "marginTop", 0);
			this.obj.appendChild(this.bar);
			this.setBarHeight();
			this.bar.y;
			this.srcElement;
			this.marginTop;
			this.D;
			this.wheelThread = 20;
			var d = {
				onMouseDown : function(g) {
					e.bar.y = g.clientY;
					e.bar.t = parseInt(e.bar.style.marginTop);
					a.on(document, "mousemove", d.onMouseMove);
					a.on(document, "mouseup", d.onMouseUp);
					g.preventDefault();
					g.stopPropagation();
				},
				onMouseMove : function(g) {
					e.scroll(g.clientY - e.bar.y);
					g.preventDefault();
					g.stopPropagation();
				},
				onMouseUp : function(g) {
					a.off(document, "mousemove", d.onMouseMove);
					a.off(document, "mouseup", d.onMouseUp);
				},
				onMouseWheel : function(h) {
					if (!c.isShow(e.bar)) {
						return;
					}
					e.D = event.wheelDelta;
					event.returnValue = false;
					var g = (e.D < 0) ? e.wheelThread : (0 - e.wheelThread);
					e.bar.y = h.clientY;
					e.bar.t = parseInt(e.bar.style.marginTop);
					e.scroll(g);
				},
				onDomMouseScroll : function(h) {
					if (!c.isShow(e.bar)) {
						return;
					}
					e.D = (h.detail > 0) ? -1 : 1;
					h.stopPropagation();
					h.preventDefault();
					e.bar.y = h.clientY;
					e.bar.t = parseInt(e.bar.style.marginTop);
					var g = (e.D < 0) ? e.wheelThread : (0 - e.wheelThread);
					e.scroll(g);
				}
			};
			a.on(this.bar, "mousedown", d.onMouseDown);
			if (b.browser.ie || b.browser.engine.webkit || b.browser.opera) {
				a.on(this.content, "mousewheel", d.onMouseWheel);
				a.on(this.bar, "mousewheel", d.onMouseWheel);
			} else {
				a.on(this.content, "DOMMouseScroll", d.onDomMouseScroll);
				a.on(this.bar, "DOMMouseScroll", d.onDomMouseScroll);
			}
		},
		setBarHeight : function() {
			var d = this;
			if ((d.obj.offsetHeight - d.content.scrollHeight) >= 0) {
				c.hide(d.bar);
				d.bar.t = 0;
			} else {
				d.bar.style.height = parseInt(d.obj.offsetHeight
						/ d.content.scrollHeight * d.obj.offsetHeight)
						+ "px";
				c.show(d.bar);
				d.bar.t = parseInt(d.bar.style.marginTop);
			}
			d.scroll(0);
		},
		scroll : function(e) {
			var d = this;
			d.marginTop = (d.bar.t || 0) + e;
			if (d.marginTop < 0) {
				d.marginTop = 0;
			}
			if (d.marginTop > d.obj.clientHeight - d.bar.offsetHeight) {
				d.marginTop = d.obj.clientHeight - d.bar.offsetHeight;
			}
			d.bar.style.marginTop = d.marginTop + "px";
			d.content.scrollTop = (d.content.scrollHeight - d.obj.offsetHeight)
					* parseInt(d.marginTop)
					/ (d.obj.clientHeight - d.bar.clientHeight);
		}
	});
});
Jet().$package(function(J) {
	var $ = J.dom.id, $D = J.dom, $E = J.event, $H = J.http;
	var _open = window.open;
	var open = function(sURL, sName, sFeatures, bReplace) {
		if (sName == undefined) {
			sName = "_blank";
		}
		if (sFeatures == undefined) {
			sFeatures = "";
		}
		if (bReplace == undefined) {
			bReplace = false;
		}
		var win = _open(sURL, sName, sFeatures, bReplace);
		if (!win) {
			J.out("你的机器上有软件拦截了弹出窗口");
			return false;
		}
		return true;
	};
	window.open = open;
	J.config = {
		debugLevel : 1
	};
	J.console = {
		print : function(msg, type) {
			if (J.console.log) {
				J.console.log((type === 4 ? (new Date() + ":") : "") + msg);
			}
		}
	};
	J.Report = {
		receive : J.emptyFunc,
		addRule : J.emptyFunc
	};
	J.extend(J.console, {
		_isCreated : false,
		_html : '<div id="ConsoleBoxHead" class="consoleBoxHead"> <button id="ConsoleCloseButton" class="consoleCloseButton">x</button> <button id="ConsoleClearButton" class="consoleCloseButton">cls</button> <h5 class="title">Console</h5> </div> <ul id="ConsoleOutput" class="consoleOutput"></ul> <div class="consoleInputBox"> &gt;<input id="ConsoleInput" class="consoleInput" /> </div>',
		_opened : false,
		_log_record : [],
		_cmd_history : [],
		_cmd_last_index : 0,
		TYPE : {
			DEBUG : 0,
			ERROR : 1,
			WARNING : 2,
			INFO : 3,
			PROFILE : 4
		},
		_typeInfo : [["log_debug_type", "√"], ["log_error_type", "x"],
				["log_warning_type", "!"], ["log_info_type", "i"],
				["log_profile_type", "└"]],
		show : function() {
			if (!this._isCreated) {
				this._create();
			}
			this._opened = true;
			this._main.style.display = "block";
			window.setTimeout(J.bind(this.focusCommandLine, this), 0);
		},
		hide : function() {
			J.console._main.style.display = "none";
			J.console._opened = false;
		},
		enable : function() {
			J.option.console = true;
			this.show();
		},
		disable : function() {
			J.option.console = false;
			this.hide();
		},
		_init : function() {
			this.print = this.out;
			$E
					.on(document, "keydown", J.bind(this.handleDocumentKeydown,
									this));
			if (J.option.console) {
				this.show();
			}
		},
		_create : function() {
			$H.loadCss(J.path + "assets/jet.css");
			this._main = document.createElement("div");
			this._main.id = "JetConsole";
			this._main.style.display = "none";
			this._main.className = "consoleBox";
			this._main.innerHTML = this._html;
			window.document.body.appendChild(this._main);
			this._headEl = $("ConsoleBoxHead");
			this._inputEl = $("ConsoleInput");
			this._closeButtonEl = $("ConsoleCloseButton");
			this._clsButtonEl = $("ConsoleClearButton");
			this._outputEl = $("ConsoleOutput");
			if (J.ui.Drag) {
			}
			$E.on(this._inputEl, "keyup", J.bind(this._execScript, this));
			$E.on(this._clsButtonEl, "click", this.clear);
			$E.on(this._closeButtonEl, "click", this.hide);
			if (J.option.debug > J.DEBUG.NO_DEBUG) {
				this.setToDebug();
			} else {
				this.setToNoDebug();
			}
			this._isCreated = true;
			this.out("Welcome to JET(Javascript Extension Tools)...",
					this.TYPE.INFO);
		},
		handleDocumentKeydown : function(e) {
			switch (e.keyCode) {
				case 192 :
					if (e.ctrlKey) {
						this.toggleShow();
						e.preventDefault();
					}
					break;
				default :
					break;
			}
		},
		focusCommandLine : function() {
			this._inputEl.focus();
		},
		toggleShow : function() {
			if (this._opened) {
				this.hide();
			} else {
				this.show();
			}
		},
		outConsoleShow : function(msg, type) {
			this.outConsole(msg, type);
			if ((!this._opened) && J.option.console) {
				this.show();
			}
		},
		outConsole : function(msg, type) {
			type = type || 3;
			this.log(msg, type);
			if (type < J.option.debug) {
				var _item = document.createElement("li");
				this._outputEl.appendChild(_item);
				var _ti = J.console._typeInfo[type] || J.console._typeInfo[0];
				_item.className = _ti[0];
				_item.innerHTML = '<span class="log_icon">' + _ti[1]
						+ "</span>" + msg;
				this._outputEl.scrollTop = this._outputEl.scrollHeight;
			}
		},
		out : function() {
		},
		setToDebug : function() {
			this.out = this.outConsoleShow;
		},
		setToNoDebug : function() {
			this.out = this.outConsole;
		},
		log : function(msg, type) {
			this._log_record.push([msg, type]);
		},
		clear : function() {
			J.console._outputEl.innerHTML = "";
		},
		_execScript : function(e) {
			switch (e.keyCode) {
				case 13 :
					this._cmd_history.push(J.console._inputEl.value);
					this._cmd_last_index = this._cmd_history.length;
					break;
				case 38 :
					if (this._cmd_history.length == 0) {
						return;
					}
					var s = "";
					if (this._cmd_last_index > 0) {
						this._cmd_last_index--;
						s = this._cmd_history[this._cmd_last_index];
					} else {
						this._cmd_last_index = -1;
					}
					J.console._inputEl.value = s;
					return;
				case 40 :
					if (this._cmd_history.length == 0) {
						return;
					}
					var s = "";
					if (this._cmd_last_index < this._cmd_history.length - 1) {
						this._cmd_last_index++;
						s = this._cmd_history[this._cmd_last_index];
					} else {
						this._cmd_last_index = this._cmd_history.length;
					}
					J.console._inputEl.value = s;
					return;
				default :
					return;
			}
			switch (J.console._inputEl.value) {
				case "help" :
					var _rv = "&lt;&lt; Console Help &gt;&gt;<br/> help : 控制台帮助<br/> clear : 清空控制台输出<br/> hide : 隐藏控制台，或者使用 Ctrl + `(~) 快捷键";
					J.console.out(_rv, 3);
					break;
				case "clear" :
					J.console.clear();
					break;
				case "hide" :
					J.console.hide();
					break;
				default :
					var _rv = '<span style="color:#ccff00">'
							+ J.console._inputEl.value + "</span><br/>";
					try {
						_rv += (eval(J.console._inputEl.value) || "")
								.toString().replace(/</g, "&lt;").replace(/>/g,
										"&gt;");
						J.console.out(_rv, 0);
					} catch (e) {
						_rv += e.description;
						J.console.out(_rv, 1);
					}
			}
			J.console._inputEl.value = "";
		}
	});
	var topNamespace = this, query = J.string.mapQuery(window.location.search);
	if (query.console) {
		if (query.console == "firebug") {
			if (topNamespace.console) {
				topNamespace.console.out = function(msg) {
					topNamespace.console.log(msg);
				};
				J.console = topNamespace.console;
			} else {
				$H.loadScript(J.path + "firebug/firebug- lite.js", {
					onSuccess : function() {
						firebug.env.height = 220;
						firebug.env.css = "../../source/firebug/firebug-lite.css";
						topNamespace.console.out = function(msg) {
							topNamespace.console.log(msg);
						};
						J.console = topNamespace.console;
						J.out("...控制台开启");
						J.out("...测试成功");
					}
				});
			}
		} else {
			if (query.console == "true") {
				$E.onDomReady(function() {
							J.console._init();
							J.console.show();
						});
				J.console = J.extend(J.console, {
							log : J.emptyFunc,
							info : J.emptyFunc,
							warn : J.emptyFunc,
							dir : J.emptyFunc
						});
			}
		}
	} else {
		J.console = {
			log : J.emptyFunc,
			info : J.emptyFunc,
			warn : J.emptyFunc,
			dir : J.emptyFunc,
			out : J.emptyFunc
		};
	}
	J.runtime = (function() {
		function isDebugMode() {
			return (J.config.debugLevel > 0);
		}
		function log(msg, type) {
			var info;
			if (isDebugMode()) {
				info = msg + "\n=STACK=\n" + stack();
			} else {
				if (type == "error") {
					info = msg;
				} else {
					if (type == "warn") {
					}
				}
			}
			J.Debug.errorLogs.push(info);
		}
		function warn(sf, args) {
			log(write.apply(null, arguments), "warn");
		}
		function error(sf, args) {
			log(write.apply(null, arguments), "error");
		}
		function stack(e, a) {
			function genTrace(ee, aa) {
				if (ee.stack) {
					return ee.stack;
				} else {
					if (ee.message.indexOf("\nBacktrace:\n") >= 0) {
						var cnt = 0;
						return ee.message.split("\nBacktrace:\n")[1].replace(
								/\s*\n\s*/g, function() {
									cnt++;
									return (cnt % 2 == 0) ? "\n" : " @ ";
								});
					} else {
						var entry = (aa.callee == stack)
								? aa.callee.caller
								: aa.callee;
						var eas = entry.arguments;
						var r = [];
						for (var i = 0, len = eas.length; i < len; i++) {
							r.push((typeof eas[i] == "undefined")
									? ("<u>")
									: ((eas[i] === null) ? ("<n>") : (eas[i])));
						}
						var fnp = /function\s+([^\s\(]+)\(/;
						var fname = fnp.test(entry.toString()) ? (fnp
								.exec(entry.toString())[1]) : ("<ANON>");
						return (fname + "(" + r.join() + ");").replace(/\n/g,
								"");
					}
				}
			}
			var res;
			if ((e instanceof Error) && (typeof arguments == "object")
					&& (!!arguments.callee)) {
				res = genTrace(e, a);
			} else {
				try {
					({}).sds();
				} catch (err) {
					res = genTrace(err, arguments);
				}
			}
			return res.replace(/\n/g, " <= ");
		}
		return {
			stack : stack,
			warn : warn,
			error : error,
			isDebugMode : isDebugMode
		};
	})();
});
Jet().$package(function(a) {
	var b = function() {
		var F = "undefined", t = "object", U = "Shockwave Flash", Y = "ShockwaveFlash.ShockwaveFlash", s = "application/x-shockwave-flash", T = "SWFObjectExprInst", z = "onreadystatechange", Q = window, l = document, v = navigator, V = false, W = [j], q = [], P = [], K = [], n, S, G, D, L = false, c = false, p, I, o = true, O = function() {
			var ac = typeof l.getElementById != F
					&& typeof l.getElementsByTagName != F
					&& typeof l.createElement != F, aj = v.userAgent
					.toLowerCase(), aa = v.platform.toLowerCase(), ag = aa
					? /win/.test(aa)
					: /win/.test(aj), ae = aa ? /mac/.test(aa) : /mac/.test(aj), ah = /webkit/
					.test(aj) ? parseFloat(aj.replace(
					/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, Z = !+"\v1", ai = [
					0, 0, 0], ad = null;
			if (typeof v.plugins != F && typeof v.plugins[U] == t) {
				ad = v.plugins[U].description;
				if (ad
						&& !(typeof v.mimeTypes != F && v.mimeTypes[s] && !v.mimeTypes[s].enabledPlugin)) {
					V = true;
					Z = false;
					ad = ad.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					ai[0] = parseInt(ad.replace(/^(.*)\..*$/, "$1"), 10);
					ai[1] = parseInt(ad.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
					ai[2] = /[a-zA-Z]/.test(ad) ? parseInt(ad.replace(
									/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
				}
			} else {
				if (typeof Q.ActiveXObject != F) {
					try {
						var af = new ActiveXObject(Y);
						if (af) {
							ad = af.GetVariable("$version");
							if (ad) {
								Z = true;
								ad = ad.split(" ")[1].split(",");
								ai = [parseInt(ad[0], 10), parseInt(ad[1], 10),
										parseInt(ad[2], 10)];
							}
						}
					} catch (ab) {
					}
				}
			}
			return {
				w3 : ac,
				pv : ai,
				wk : ah,
				ie : Z,
				win : ag,
				mac : ae
			};
		}(), m = function() {
			if (!O.w3) {
				return;
			}
			if ((typeof l.readyState != F && l.readyState == "complete")
					|| (typeof l.readyState == F && (l
							.getElementsByTagName("body")[0] || l.body))) {
				h();
			}
			if (!L) {
				if (typeof l.addEventListener != F) {
					l.addEventListener("DOMContentLoaded", h, false);
				}
				if (O.ie && O.win) {
					l.attachEvent(z, function() {
								if (l.readyState == "complete") {
									l.detachEvent(z, arguments.callee);
									h();
								}
							});
					if (Q == top) {
						(function() {
							if (L) {
								return;
							}
							try {
								l.documentElement.doScroll("left");
							} catch (Z) {
								setTimeout(arguments.callee, 0);
								return;
							}
							h();
						})();
					}
				}
				if (O.wk) {
					(function() {
						if (L) {
							return;
						}
						if (!/loaded|complete/.test(l.readyState)) {
							setTimeout(arguments.callee, 0);
							return;
						}
						h();
					})();
				}
				u(h);
			}
		}();
		function h() {
			if (L) {
				return;
			}
			try {
				var ab = l.getElementsByTagName("body")[0]
						.appendChild(E("span"));
				ab.parentNode.removeChild(ab);
			} catch (ac) {
				return;
			}
			L = true;
			var Z = W.length;
			for (var aa = 0; aa < Z; aa++) {
				W[aa]();
			}
		}
		function M(Z) {
			if (L) {
				Z();
			} else {
				W[W.length] = Z;
			}
		}
		function u(aa) {
			if (typeof Q.addEventListener != F) {
				Q.addEventListener("load", aa, false);
			} else {
				if (typeof l.addEventListener != F) {
					l.addEventListener("load", aa, false);
				} else {
					if (typeof Q.attachEvent != F) {
						k(Q, "onload", aa);
					} else {
						if (typeof Q.onload == "function") {
							var Z = Q.onload;
							Q.onload = function() {
								Z();
								aa();
							};
						} else {
							Q.onload = aa;
						}
					}
				}
			}
		}
		function j() {
			if (V) {
				X();
			} else {
				J();
			}
		}
		function X() {
			var Z = l.getElementsByTagName("body")[0];
			var ac = E(t);
			ac.setAttribute("type", s);
			var ab = Z.appendChild(ac);
			if (ab) {
				var aa = 0;
				(function() {
					if (typeof ab.GetVariable != F) {
						var ad = ab.GetVariable("$version");
						if (ad) {
							ad = ad.split(" ")[1].split(",");
							O.pv = [parseInt(ad[0], 10), parseInt(ad[1], 10),
									parseInt(ad[2], 10)];
						}
					} else {
						if (aa < 10) {
							aa++;
							setTimeout(arguments.callee, 10);
							return;
						}
					}
					Z.removeChild(ac);
					ab = null;
					J();
				})();
			} else {
				J();
			}
		}
		function J() {
			var ai = q.length;
			if (ai > 0) {
				for (var ah = 0; ah < ai; ah++) {
					var aa = q[ah].id;
					var ad = q[ah].callbackFn;
					var ac = {
						success : false,
						id : aa
					};
					if (O.pv[0] > 0) {
						var ag = e(aa);
						if (ag) {
							if (H(q[ah].swfVersion) && !(O.wk && O.wk < 312)) {
								y(aa, true);
								if (ad) {
									ac.success = true;
									ac.ref = B(aa);
									ad(ac);
								}
							} else {
								if (q[ah].expressInstall && C()) {
									var ak = {};
									ak.data = q[ah].expressInstall;
									ak.width = ag.getAttribute("width") || "0";
									ak.height = ag.getAttribute("height")
											|| "0";
									if (ag.getAttribute("class")) {
										ak.styleclass = ag
												.getAttribute("class");
									}
									if (ag.getAttribute("align")) {
										ak.align = ag.getAttribute("align");
									}
									var aj = {};
									var Z = ag.getElementsByTagName("param");
									var ae = Z.length;
									for (var af = 0; af < ae; af++) {
										if (Z[af].getAttribute("name")
												.toLowerCase() != "movie") {
											aj[Z[af].getAttribute("name")] = Z[af]
													.getAttribute("value");
										}
									}
									R(ak, aj, aa, ad);
								} else {
									r(ag);
									if (ad) {
										ad(ac);
									}
								}
							}
						}
					} else {
						y(aa, true);
						if (ad) {
							var ab = B(aa);
							if (ab && typeof ab.SetVariable != F) {
								ac.success = true;
								ac.ref = ab;
							}
							ad(ac);
						}
					}
				}
			}
		}
		function B(ac) {
			var Z = null;
			var aa = e(ac);
			if (aa && aa.nodeName == "OBJECT") {
				if (typeof aa.SetVariable != F) {
					Z = aa;
				} else {
					var ab = aa.getElementsByTagName(t)[0];
					if (ab) {
						Z = ab;
					}
				}
			}
			return Z;
		}
		function C() {
			return !c && H("6.0.65") && (O.win || O.mac)
					&& !(O.wk && O.wk < 312);
		}
		function R(ac, ad, Z, ab) {
			c = true;
			G = ab || null;
			D = {
				success : false,
				id : Z
			};
			var ag = e(Z);
			if (ag) {
				if (ag.nodeName == "OBJECT") {
					n = i(ag);
					S = null;
				} else {
					n = ag;
					S = Z;
				}
				ac.id = T;
				if (typeof ac.width == F
						|| (!/%$/.test(ac.width) && parseInt(ac.width, 10) < 310)) {
					ac.width = "310";
				}
				if (typeof ac.height == F
						|| (!/%$/.test(ac.height) && parseInt(ac.height, 10) < 137)) {
					ac.height = "137";
				}
				l.title = l.title.slice(0, 47) + " - Flash Player Installation";
				var af = O.ie && O.win ? "ActiveX" : "PlugIn", ae = "MMredirectURL="
						+ Q.location.toString().replace(/&/g, "%26")
						+ "&MMplayerType=" + af + "&MMdoctitle=" + l.title;
				if (typeof ad.flashvars != F) {
					ad.flashvars += "&" + ae;
				} else {
					ad.flashvars = ae;
				}
				if (O.ie && O.win && ag.readyState != 4) {
					var aa = E("div");
					Z += "SWFObjectNew";
					aa.setAttribute("id", Z);
					ag.parentNode.insertBefore(aa, ag);
					ag.style.display = "none";
					(function() {
						if (ag.readyState == 4) {
							ag.parentNode.removeChild(ag);
						} else {
							setTimeout(arguments.callee, 10);
						}
					})();
				}
				w(ac, ad, Z);
			}
		}
		function r(aa) {
			if (O.ie && O.win && aa.readyState != 4) {
				var Z = E("div");
				aa.parentNode.insertBefore(Z, aa);
				Z.parentNode.replaceChild(i(aa), Z);
				aa.style.display = "none";
				(function() {
					if (aa.readyState == 4) {
						aa.parentNode.removeChild(aa);
					} else {
						setTimeout(arguments.callee, 10);
					}
				})();
			} else {
				aa.parentNode.replaceChild(i(aa), aa);
			}
		}
		function i(ae) {
			var ad = E("div");
			if (O.win && O.ie) {
				ad.innerHTML = ae.innerHTML;
			} else {
				var aa = ae.getElementsByTagName(t)[0];
				if (aa) {
					var af = aa.childNodes;
					if (af) {
						var Z = af.length;
						for (var ab = 0; ab < Z; ab++) {
							if (!(af[ab].nodeType == 1 && af[ab].nodeName == "PARAM")
									&& !(af[ab].nodeType == 8)) {
								ad.appendChild(af[ab].cloneNode(true));
							}
						}
					}
				}
			}
			return ad;
		}
		function w(ak, ai, aa) {
			var Z, ac = e(aa);
			if (O.wk && O.wk < 312) {
				return Z;
			}
			if (ac) {
				if (typeof ak.id == F) {
					ak.id = aa;
				}
				if (O.ie && O.win) {
					var aj = "";
					for (var ag in ak) {
						if (ak[ag] != Object.prototype[ag]) {
							if (ag.toLowerCase() == "data") {
								ai.movie = ak[ag];
							} else {
								if (ag.toLowerCase() == "styleclass") {
									aj += ' class="' + ak[ag] + '"';
								} else {
									if (ag.toLowerCase() != "classid") {
										aj += " " + ag + '="' + ak[ag] + '"';
									}
								}
							}
						}
					}
					var ah = "";
					for (var af in ai) {
						if (ai[af] != Object.prototype[af]) {
							ah += '<param name="' + af + '" value="' + ai[af]
									+ '" />';
						}
					}
					ac.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
							+ aj + ">" + ah + "</object>";
					P[P.length] = ak.id;
					Z = e(ak.id);
				} else {
					var ab = E(t);
					ab.setAttribute("type", s);
					for (var ae in ak) {
						if (ak[ae] != Object.prototype[ae]) {
							if (ae.toLowerCase() == "styleclass") {
								ab.setAttribute("class", ak[ae]);
							} else {
								if (ae.toLowerCase() != "classid") {
									ab.setAttribute(ae, ak[ae]);
								}
							}
						}
					}
					for (var ad in ai) {
						if (ai[ad] != Object.prototype[ad]
								&& ad.toLowerCase() != "movie") {
							g(ab, ad, ai[ad]);
						}
					}
					ac.parentNode.replaceChild(ab, ac);
					Z = ab;
				}
			}
			return Z;
		}
		function g(ab, Z, aa) {
			var ac = E("param");
			ac.setAttribute("name", Z);
			ac.setAttribute("value", aa);
			ab.appendChild(ac);
		}
		function A(aa) {
			var Z = e(aa);
			if (Z && Z.nodeName == "OBJECT") {
				if (O.ie && O.win) {
					Z.style.display = "none";
					(function() {
						if (Z.readyState == 4) {
							d(aa);
						} else {
							setTimeout(arguments.callee, 10);
						}
					})();
				} else {
					Z.parentNode.removeChild(Z);
				}
			}
		}
		function d(ab) {
			var aa = e(ab);
			if (aa) {
				for (var Z in aa) {
					if (typeof aa[Z] == "function") {
						aa[Z] = null;
					}
				}
				aa.parentNode.removeChild(aa);
			}
		}
		function e(ab) {
			var Z = null;
			try {
				Z = l.getElementById(ab);
			} catch (aa) {
			}
			return Z;
		}
		function E(Z) {
			return l.createElement(Z);
		}
		function k(ab, Z, aa) {
			ab.attachEvent(Z, aa);
			K[K.length] = [ab, Z, aa];
		}
		function H(ab) {
			var aa = O.pv, Z = ab.split(".");
			Z[0] = parseInt(Z[0], 10);
			Z[1] = parseInt(Z[1], 10) || 0;
			Z[2] = parseInt(Z[2], 10) || 0;
			return (aa[0] > Z[0] || (aa[0] == Z[0] && aa[1] > Z[1]) || (aa[0] == Z[0]
					&& aa[1] == Z[1] && aa[2] >= Z[2])) ? true : false;
		}
		function x(ae, aa, af, ad) {
			if (O.ie && O.mac) {
				return;
			}
			var ac = l.getElementsByTagName("head")[0];
			if (!ac) {
				return;
			}
			var Z = (af && typeof af == "string") ? af : "screen";
			if (ad) {
				p = null;
				I = null;
			}
			if (!p || I != Z) {
				var ab = E("style");
				ab.setAttribute("type", "text/css");
				ab.setAttribute("media", Z);
				p = ac.appendChild(ab);
				if (O.ie && O.win && typeof l.styleSheets != F
						&& l.styleSheets.length > 0) {
					p = l.styleSheets[l.styleSheets.length - 1];
				}
				I = Z;
			}
			if (O.ie && O.win) {
				if (p && typeof p.addRule == t) {
					p.addRule(ae, aa);
				}
			} else {
				if (p && typeof l.createTextNode != F) {
					p.appendChild(l.createTextNode(ae + " {" + aa + "}"));
				}
			}
		}
		function y(ab, Z) {
			if (!o) {
				return;
			}
			var aa = Z ? "visible" : "hidden";
			if (L && e(ab)) {
				e(ab).style.visibility = aa;
			} else {
				x("#" + ab, "visibility:" + aa);
			}
		}
		function N(aa) {
			var ab = /[\\\"<>\.;]/;
			var Z = ab.exec(aa) != null;
			return Z && typeof encodeURIComponent != F
					? encodeURIComponent(aa)
					: aa;
		}
		var f = function() {
			if (O.ie && O.win) {
				window.attachEvent("onunload", function() {
							var ae = K.length;
							for (var ad = 0; ad < ae; ad++) {
								K[ad][0].detachEvent(K[ad][1], K[ad][2]);
							}
							var ab = P.length;
							for (var ac = 0; ac < ab; ac++) {
								A(P[ac]);
							}
							for (var aa in O) {
								O[aa] = null;
							}
							O = null;
							for (var Z in b) {
								b[Z] = null;
							}
							b = null;
						});
			}
		}();
		return {
			registerObject : function(ad, Z, ac, ab) {
				if (O.w3 && ad && Z) {
					var aa = {};
					aa.id = ad;
					aa.swfVersion = Z;
					aa.expressInstall = ac;
					aa.callbackFn = ab;
					q[q.length] = aa;
					y(ad, false);
				} else {
					if (ab) {
						ab({
									success : false,
									id : ad
								});
					}
				}
			},
			getObjectById : function(Z) {
				if (O.w3) {
					return B(Z);
				}
			},
			embedSWF : function(ad, aj, ag, ai, aa, ac, ab, af, ah, ae) {
				var Z = {
					success : false,
					id : aj
				};
				if (O.w3 && !(O.wk && O.wk < 312) && ad && aj && ag && ai && aa) {
					y(aj, false);
					M(function() {
								ag += "";
								ai += "";
								var al = {};
								if (ah && typeof ah === t) {
									for (var an in ah) {
										al[an] = ah[an];
									}
								}
								al.data = ad;
								al.width = ag;
								al.height = ai;
								var ao = {};
								if (af && typeof af === t) {
									for (var am in af) {
										ao[am] = af[am];
									}
								}
								if (ab && typeof ab === t) {
									for (var ak in ab) {
										if (typeof ao.flashvars != F) {
											ao.flashvars += "&" + ak + "="
													+ ab[ak];
										} else {
											ao.flashvars = ak + "=" + ab[ak];
										}
									}
								}
								if (H(aa)) {
									var ap = w(al, ao, aj);
									if (al.id == aj) {
										y(aj, true);
									}
									Z.success = true;
									Z.ref = ap;
								} else {
									if (ac && C()) {
										al.data = ac;
										R(al, ao, aj, ae);
										return;
									} else {
										y(aj, true);
									}
								}
								if (ae) {
									ae(Z);
								}
							});
				} else {
					if (ae) {
						ae(Z);
					}
				}
			},
			switchOffAutoHideShow : function() {
				o = false;
			},
			ua : O,
			getFlashPlayerVersion : function() {
				return {
					major : O.pv[0],
					minor : O.pv[1],
					release : O.pv[2]
				};
			},
			hasFlashPlayerVersion : H,
			createSWF : function(ab, aa, Z) {
				if (O.w3) {
					return w(ab, aa, Z);
				} else {
					return undefined;
				}
			},
			showExpressInstall : function(ab, ac, Z, aa) {
				if (O.w3 && C()) {
					R(ab, ac, Z, aa);
				}
			},
			removeSWF : function(Z) {
				if (O.w3) {
					A(Z);
				}
			},
			createCSS : function(ac, ab, aa, Z) {
				if (O.w3) {
					x(ac, ab, aa, Z);
				}
			},
			addDomLoadEvent : M,
			addLoadEvent : u,
			getQueryParamValue : function(ac) {
				var ab = l.location.search || l.location.hash;
				if (ab) {
					if (/\?/.test(ab)) {
						ab = ab.split("?")[1];
					}
					if (ac == null) {
						return N(ab);
					}
					var aa = ab.split("&");
					for (var Z = 0; Z < aa.length; Z++) {
						if (aa[Z].substring(0, aa[Z].indexOf("=")) == ac) {
							return N(aa[Z].substring((aa[Z].indexOf("=") + 1)));
						}
					}
				}
				return "";
			},
			expressInstallCallback : function() {
				if (c) {
					var Z = e(T);
					if (Z && n) {
						Z.parentNode.replaceChild(n, Z);
						if (S) {
							y(S, true);
							if (O.ie && O.win) {
								n.style.display = "block";
							}
						}
						if (G) {
							G(D);
						}
					}
					c = false;
				}
			}
		};
	}();
	a.swfobject = b;
(function() {
		var i = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
		var j = (navigator.appVersion.toLowerCase().indexOf("win") != -1)
				? true
				: false;
		var g = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
		function h() {
			var m;
			var n;
			var o;
			try {
				n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				m = n.GetVariable("$version");
			} catch (o) {
			}
			if (!m) {
				try {
					n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					m = "WIN 6,0,21,0";
					n.AllowScriptAccess = "always";
					m = n.GetVariable("$version");
				} catch (o) {
				}
			}
			if (!m) {
				try {
					n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
					m = n.GetVariable("$version");
				} catch (o) {
				}
			}
			if (!m) {
				try {
					n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
					m = "WIN 3,0,18,0";
				} catch (o) {
				}
			}
			if (!m) {
				try {
					n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					m = "WIN 2,0,0,11";
				} catch (o) {
					m = -1;
				}
			}
			return m;
		}
		function l() {
			var s = -1;
			if (navigator.plugins != null && navigator.plugins.length > 0) {
				if (navigator.plugins["Shockwave Flash 2.0"]
						|| navigator.plugins["Shockwave Flash"]) {
					var r = navigator.plugins["Shockwave Flash 2.0"]
							? " 2.0"
							: "";
					var m = navigator.plugins["Shockwave Flash" + r].description;
					var q = m.split(" ");
					var o = q[2].split(".");
					var t = o[0];
					var n = o[1];
					var p = q[3];
					if (p == "") {
						p = q[4];
					}
					if (p[0] == "d") {
						p = p.substring(1);
					} else {
						if (p[0] == "r") {
							p = p.substring(1);
							if (p.indexOf("d") > 0) {
								p = p.substring(0, p.indexOf("d"));
							}
						}
					}
					var s = t + "." + n + "." + p;
				}
			} else {
				if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
					s = 4;
				} else {
					if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
						s = 3;
					} else {
						if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
							s = 2;
						} else {
							if (i && j && !g) {
								s = h();
							}
						}
					}
				}
			}
			return s;
		}
		function d(r, p, o) {
			versionStr = l();
			if (versionStr == -1) {
				return false;
			} else {
				if (versionStr != 0) {
					if (i && j && !g) {
						tempArray = versionStr.split(" ");
						tempString = tempArray[1];
						versionArray = tempString.split(",");
					} else {
						versionArray = versionStr.split(".");
					}
					var q = versionArray[0];
					var m = versionArray[1];
					var n = versionArray[2];
					if (q > parseFloat(r)) {
						return true;
					} else {
						if (q == parseFloat(r)) {
							if (m > parseFloat(p)) {
								return true;
							} else {
								if (m == parseFloat(p)) {
									if (n >= parseFloat(o)) {
										return true;
									}
								}
							}
						}
					}
					return false;
				}
			}
		}
		function e(n, m) {
			if (n.indexOf("?") != -1) {
				return n.replace(/\?/, m + "?");
			} else {
				return n + m;
			}
		}
		function k(q, p, m) {
			var o = "";
			if (i && j && !g) {
				o += "<object ";
				for (var n in q) {
					o += n + '="' + q[n] + '" ';
				}
				for (var n in p) {
					o += '><param name="' + n + '" value="' + p[n] + '" /> ';
				}
				o += "></object>";
			} else {
				o += "<embed ";
				for (var n in m) {
					o += n + '="' + m[n] + '" ';
				}
				o += "> </embed>";
			}
			document.write(o);
		}
		function f() {
			var m = c(arguments, ".swf", "movie",
					"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
					"application/x-shockwave-flash");
			k(m.objAttrs, m.params, m.embedAttrs);
		}
		function c(n, q, s, p, t) {
			var m = new Object();
			m.embedAttrs = new Object();
			m.params = new Object();
			m.objAttrs = new Object();
			for (var o = 0; o < n.length; o = o + 2) {
				var r = n[o].toLowerCase();
				switch (r) {
					case "classid" :
						break;
					case "pluginspage" :
						m.embedAttrs[n[o]] = n[o + 1];
						break;
					case "src" :
					case "movie" :
						n[o + 1] = e(n[o + 1], q);
						m.embedAttrs.src = n[o + 1];
						m.params[s] = n[o + 1];
						break;
					case "onafterupdate" :
					case "onbeforeupdate" :
					case "onblur" :
					case "oncellchange" :
					case "onclick" :
					case "ondblClick" :
					case "ondrag" :
					case "ondragend" :
					case "ondragenter" :
					case "ondragleave" :
					case "ondragover" :
					case "ondrop" :
					case "onfinish" :
					case "onfocus" :
					case "onhelp" :
					case "onmousedown" :
					case "onmouseup" :
					case "onmouseover" :
					case "onmousemove" :
					case "onmouseout" :
					case "onkeypress" :
					case "onkeydown" :
					case "onkeyup" :
					case "onload" :
					case "onlosecapture" :
					case "onpropertychange" :
					case "onreadystatechange" :
					case "onrowsdelete" :
					case "onrowenter" :
					case "onrowexit" :
					case "onrowsinserted" :
					case "onstart" :
					case "onscroll" :
					case "onbeforeeditfocus" :
					case "onactivate" :
					case "onbeforedeactivate" :
					case "ondeactivate" :
					case "type" :
					case "codebase" :
						m.objAttrs[n[o]] = n[o + 1];
						break;
					case "id" :
					case "width" :
					case "height" :
					case "align" :
					case "vspace" :
					case "hspace" :
					case "class" :
					case "title" :
					case "accesskey" :
					case "name" :
					case "tabindex" :
						m.embedAttrs[n[o]] = m.objAttrs[n[o]] = n[o + 1];
						break;
					default :
						m.embedAttrs[n[o]] = m.params[n[o]] = n[o + 1];
				}
			}
			m.objAttrs.classid = p;
			if (t) {
				m.embedAttrs.type = t;
			}
			return m;
		}
		a.GetSwfVer = l;
	})();
});
var swfsound;
Jet().$package(function(b) {
	var c = b.dom, a = b.event;
	swfsound = function() {
		return {
			pauseStatus : [],
			embedSWF : function(p) {
				if (p == undefined) {
					p = "./swf/swfsound.swf";
				}
				var h = false;
				var k = {
					id : "swfSound_Flash"
				};
				var j = {
					menu : "false",
					wmode : "transparent",
					swLiveConnect : "true",
					allowScriptAccess : "always"
				};
				var m = document, f;
				f = m.createElement("div");
				f.id = "swfSound_Flash_div";
				f.style.position = "absolute";
				f.style.left = 0;
				f.style.top = 0;
				m.getElementsByTagName("body")[0].appendChild(f);
				var g = "#swfSound_Flash { left:0; position:absolute; top: 0; }";
				var o = document.createElement("style");
				o.setAttribute("type", "text/css");
				if (o.styleSheet) {
					o.styleSheet.cssText = g;
				} else {
					var n = document.createTextNode(g);
					o.appendChild(n);
				}
				var i = document.getElementsByTagName("head")[0];
				i.appendChild(o);
				try {
					b.swfobject.embedSWF(p, "swfSound_Flash_div", "1", "1",
							"8.0.0", "./expressInstall.swf", h, j, k);
				} catch (l) {
				}
			},
			loadSound : function(e, h, g, d) {
				if (h == undefined) {
					h = false;
				}
				if (g == undefined) {
					g = null;
				}
				if (d == undefined) {
					d = null;
				}
				var f = document.getElementById("swfSound_Flash");
				return f.loadSound(e, h, g, d);
			},
			startSound : function(g, f, e, d) {
				if (f == undefined) {
					f = 0;
				}
				if (d == undefined) {
					d = null;
				}
				if (e == undefined) {
					e = 1;
				}
				var h = document.getElementById("swfSound_Flash");
				h.startSound(g, f, e, d);
				return true;
			},
			stopSound : function(d) {
				var e = document.getElementById("swfSound_Flash");
				e.stopSound(d);
				return true;
			},
			pauseSound : function(d) {
				var e = document.getElementById("swfSound_Flash");
				var f = swfsound.pauseStatus[d];
				if (f == true) {
					swfsound.startSound(d, swfsound.getPosition(d) / 1000);
					swfsound.pauseStatus[d] = false;
				} else {
					swfsound.stopSound(d);
					swfsound.pauseStatus[d] = true;
				}
				return swfsound.pauseStatus[d];
			},
			setVolume : function(d, e) {
				var f = document.getElementById("swfSound_Flash");
				f.setVolume(d, e);
				return true;
			},
			getVolume : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getVolume(d);
			},
			getDuration : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getDuration(d);
			},
			getPosition : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getPosition(d);
			},
			getID3 : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getID3(d);
			},
			setPan : function(e, d) {
				var f = document.getElementById("swfSound_Flash");
				f.setPan(e, d);
				return true;
			},
			getPan : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getPan(d);
			},
			getBytesLoaded : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getBytesLoaded(d);
			},
			getBytesTotal : function(d) {
				var e = document.getElementById("swfSound_Flash");
				return e.getBytesTotal(d);
			}
		};
	}();
	b.sound = swfsound;
});