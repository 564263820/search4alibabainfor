Jet().$package(qqweb.app.helper = new qqweb.businessClass.App(qqweb.portal.getSystemConfig("helper")),
function(J) {
    var $D = J.dom,
    $E = J.event,
    timeoutcall = null,
    packageContext = this;
    var observer = {
        onRunFirst: function(uin) {}
    };
    $E.addObserver(this, "runFirst", observer.onRunFirst);
    var mf_getRemoteJs = function(url, handleSuccess, thisObj) {
        var remote_js = document.createElement("script");
        remote_js.type = "text/javascript";
        if (J.browser.ie) {
            remote_js.onreadystatechange = function() {
                if (remote_js.readyState == "complete" || remote_js.readyState == "loaded") {
                    setTimeout(function() {
                        if (handleSuccess) {
                            handleSuccess.apply(thisObj);
                        }
                    },
                    0);
                }
            };
        } else {
            $E.on(remote_js, "load", handleSuccess, thisObj, true);
        }
        remote_js.src = url;
        document.body.appendChild(remote_js);
    };
    this.createWindow = function(option) {
        var appContext = this;
        var window = new qqweb.businessClass.Widget({
            appId: appContext.option.id,
            width: 220,
            height: 198,
            hasCloseButton: true,
            hasPinDownButton: true,
            isFix: true,
            x: option.x || appContext.option.x || 5,
            y: option.y || appContext.option.y || 420
        });
        packageContext.window = window;
        var html = '<div id="helper_area" class="helper_area"></div>';
        window.setHtml(html);
        var observer = {
            onWindowClose: function() {
                appContext.destroy();
            },
            onExit: function() {
                $E.notifyObservers(window, "closeWindow", window);
            }
        };
        var helper_area = $D.id("helper_area");
        if (J.browser.ie && J.browser.ie < 7) {
            $E.on(helper_area, "mouseover", onHelpAreaMouseOver);
            $E.on(helper_area, "mouseout", onHelpAreaMouseOut);
        }
        $E.on(helper_area, "click", showHelpWindow);
        $E.addObserver(window, "close", observer.onWindowClose);
        $E.addObserver(this, "exit", observer.onExit);
        return this.window;
    };
    var onHelpAreaMouseDown = function(e) {
        e.stopPropagation();
    };
    var cancel1 = false,
    cancel2 = false,
    cancel3 = false;
    var setBox = function(left_width, right_width, top_height, bottom_height, context_height) {
        var box = $D.id("perfect_nine_box");
        var top = $D.id("perfect_nine_top");
        var t_l = $D.id("perfect_nine_t_l");
        var t_r = $D.id("perfect_nine_t_r");
        var t_m = $D.id("perfect_nine_t_m");
        var m_l = $D.id("perfect_nine_m_l");
        var m_r = $D.id("perfect_nine_m_r");
        var b_m = $D.id("perfect_nine_b_m");
        var b_m_m = $D.id("perfect_nine_b_m_m");
        var b_l = $D.id("perfect_nine_b_l");
        var b_r = $D.id("perfect_nine_b_r");
        var context = $D.id("perfect_nine_context");
        context.style.height = context_height + "px";
        box.style.height = (context_height + top_height + bottom_height) + "px";
        b_m.style.paddingLeft = m_l.style.width = b_l.style.width = context.style.marginLeft = t_l.style.width = top.style.paddingLeft = left_width + "px";
        top.style.paddingRight = b_m.style.paddingRight = m_r.style.width = t_r.style.width = b_r.style.width = context.style.marginRight = right_width + "px";
        t_m.style.height = t_r.style.height = t_l.style.height = top_height + "px";
        b_l.style.height = b_r.style.height = b_m.style.height = b_m_m.style.height = bottom_height + "px";
        t_l.style.marginTop = t_r.style.marginTop = "-" + top_height + "px";
        b_l.style.marginTop = b_r.style.marginTop = "-" + bottom_height + "px";
    };
    var oneMinuteShow = function(e) {
        e.preventDefault();
        e.stopPropagation();
        cancel1 = cancel2 = cancel3 = false;
        var mask = $D.id("perfect_nine_box_container");
        var appbarTip = $D.id("app_helper_appbar_tip");
        if (!mask) {
            return;
        }
        mask.style.display = "block";
        appbarTip.style.display = "block";
        setBox(105, 215, 0, document.documentElement.clientHeight - 66, 65);
        $D.id("app_helper_continue_btn0").focus();
        if (timeoutcall) {
            clearTimeout(timeoutcall);
        }
        timeoutcall = setTimeout(function() {
            if (!cancel1) {
                showStep1();
            }
        },
        10000);
        pgvSendClick({
            hottag: "WEB2QQ.APP.HELPER.ONEMINUTE"
        });
    };
    var exitShow = function(e) {
        e.preventDefault();
        if (timeoutcall) {
            clearTimeout(timeoutcall);
        }
        this.parentNode.parentNode.style.display = "none";
        var mask = $D.id("perfect_nine_box_container");
        mask.style.display = "none";
    };
    function showStep1() {
        var mask = $D.id("perfect_nine_box_container");
        if (mask.style.display == "none") {
            return;
        }
        var appbarTip = $D.id("app_helper_appbar_tip");
        var chatTip = $D.id("app_helper_chat_tip");
        var taskbarTip = $D.id("app_helper_taskbar_tip");
        if (taskbarTip.style.display != "none") {
            return;
        }
        appbarTip.style.display = "none";
        chatTip.style.display = "block";
        $D.id("app_helper_continue_btn1").focus();
        setBox(document.documentElement.clientWidth - 205, 0, 70, 35, document.documentElement.clientHeight - 106);
        cancel1 = true;
        if (timeoutcall) {
            clearTimeout(timeoutcall);
        }
        timeoutcall = setTimeout(function() {
            if (!cancel2) {
                showStep2();
            }
        },
        10000);
    }
    function showStep2() {
        var appbarTip = $D.id("app_helper_appbar_tip");
        if (appbarTip.style.display != "none") {
            return;
        }
        var mask = $D.id("perfect_nine_box_container");
        if (mask.style.display == "none") {
            return;
        }
        var chatTip = $D.id("app_helper_chat_tip");
        var taskbarTip = $D.id("app_helper_taskbar_tip");
        chatTip.style.display = "none";
        taskbarTip.style.display = "block";
        $D.id("app_helper_continue_btn2").focus();
        setBox(0, 0, document.documentElement.clientHeight - 31, 0, 30);
        cancel1 = cancel2 = true;
        if (timeoutcall) {
            clearTimeout(timeoutcall);
        }
        timeoutcall = setTimeout(function() {
            if (!cancel3) {
                showStep3();
            }
        },
        10000);
    }
    function showStep3() {
        var taskbarTip = $D.id("app_helper_taskbar_tip");
        taskbarTip.style.display = "none";
        var mask = $D.id("perfect_nine_box_container");
        mask.style.display = "none";
        if (timeoutcall) {
            clearTimeout(timeoutcall);
            timeoutcall = null;
        }
    }
    function setHomePage(e) {
        e.preventDefault();
        if (!J.browser.ie && !J.browser.firefox) {
            alert("不好意思，浏览器不支持此操作。");
        }
        var aUrls = document.URL.split("/");
        var vDomainName = "http://" + aUrls[2] + "/";
        try {
            this.style.behavior = "url(#default#homepage)";
            this.setHomePage(vDomainName);
        } catch(e) {
            if (J.browser.firefox) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch(e) {
                    alert("此操作被浏览器拒绝！/n请在浏览器地址栏输入“about:config”并回车/n然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
                var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref("browser.startup.homepage", vDomainName);
            }
        }
    }
    function addFavorite(e) {
        e.preventDefault();
        var aUrls = document.URL.split("/");
        var vDomainName = "http://" + aUrls[2] + "/";
        var description = "WebQQ 2.0";
        try {
            window.external.AddFavorite(vDomainName, description);
        } catch(e) {
            if (J.browser.firefox) {
                window.sidebar.addPanel(description, vDomainName, "");
            } else {
                alert("不好意思，浏览器不支持此操作。");
            }
        }
    }
    var onWindowResize = function(e) {
        var tipList = ["app_helper_login_tip_container", "app_helper_tip_container", "app_helper_tip_down_container", "app_helper_appbar_tip", "app_helper_chat_tip", "app_helper_taskbar_tip", "perfect_nine_box_container"];
        for (var i = 0; i < tipList.length; ++i) {
            if ($D.id(tipList[i])) {
                $D.id(tipList[i]).style.display = "none";
            }
        }
        if (timeoutcall) {
            clearTimeout(timeoutcall);
        }
    };
    var showHelpWindow = function(e) {
        $E.on(window, "resize", onWindowResize);
        e.stopPropagation();
        if ($D.id("helperWindow")) {
            return;
        }
        var appConfig = qqweb.appconfig.getSystemConfig("helper");
        var tmpHtml = '			<div class="app_helper_container" id="helperWindow">			<div class="app_helper_leftContainer">			<div id="app_helper_quick_bar" class="app_helper_quick_bar">			<label class="app_helper_quick_tip" id="app_helper_quick_tip"></label>			</div>			<div class="app_helper_new_list">			<span>特色功能推荐</span>			<ul id="app_helper_new_list">			<li><a href="###">更换桌面主题</a></li>			<li><a href="###">添加、管理应用</a></li>			<li><a href="###">一键保存为应用</a></li>			<li><a href="###">开启关闭消息提示音</a></li>			<li><a href="###">使用网页输入法</a></li>			<li><a href="###">修改个人资料</a></li>			</ul>			</div>			<div class="app_helper_separate_line"></div>			<div class="app_helper_function_all">			<span>功能大全</span>			<div class="app_helper_link_list"><a href="http://service.qq.com/category/2108_1.html" target="_blank">应用导航栏</a><a href="http://service.qq.com/category/2109_1.html" target="_blank">QQ聊天</a><a style="margin-right:0" href="http://service.qq.com/category/2110_1.html" target="_blank">任务栏</a></div>			</div>			</div>			<div class="app_helper_middle_line"></div>			<div class="app_helper_right_container">			<div class="app_helper_collect_list_container">			<div class="app_helper_collect_list">			<span>喜欢WebQQ：</span>			<a class="app_helper_home" id="app_helper_set_home" href="###">设它为主页</a>			<a class="app_helper_store" id="app_helper_store" href="###">添加到收藏</a>			<a class="app_helper_desktop" href="./WebQQ2.0.url" target="_blank">设为桌面图标</a>			<a class="app_helper_subscribe" id="app_helper_subscribe" hidefocus="true" href="###">订阅动态资讯</a>			</div>			<div class="app_helper_subscribe_tip_container" id="app_helper_subscribe_tip_container">			<div class="app_helper_subscribe_tip">			<div id="app_helper_checkbox_container" class="app_helper_subscribe_checked" hidefocus="true"><input style="display:none;margin-top:-1px;padding:0;*margin-top:-5px;*margin-left:-4px;" id="app_helper_checkbox" type="checkbox" ></input></div>			<a href="###" class="app_helper_subscribe_close" onclick="document.getElementById(\'app_helper_subscribe_tip_container\').style.display=\'none\';return false;"></a>			</div>			</div>			</div>			<div class="app_helper_contact">			<span>联系我们：</span>			  <a href="http://webqq.qzone.qq.com" target="_blank">博客</a><a href="http://t.qq.com/Web_QQ" target="_blank">微博</a><a style="margin-right:0" href="http://support.qq.com/portal/discuss_pdt/513_1.html" target="_blank">反馈论坛</a><br /><a href="http://service.qq.com/category/WebQQ2.0.html" target="_blank">腾讯客服</a>			</div>			</div>			</div>';
        appConfig.flashMode = false;
        appConfig.windowMode = "single";
        appConfig.dragable = true;
        appConfig.hasCloseButton = true;
        appConfig.defaultMode = "restore";
        appConfig.isSetCurrent = true;
        if (J.browser.ie && J.browser.ie < 7) {
            appConfig.height += 1;
        }
        var warningWindow = new qqweb.businessClass.Window(appConfig);
        warningWindow.setTitle(appConfig.appName);
        warningWindow.setCurrent();
        warningWindow.setHtml(tmpHtml);
        $D.id("helperWindow").style.display = "block";
        $D.setStyle(warningWindow.body, "background", "#ffffff");
        $E.addObserver(warningWindow, "close",
        function() {
            if ($D.id("app_helper_login_tip_container")) {
                $D.id("app_helper_login_tip_container").style.display = "none";
            }
            if ($D.id("app_helper_tip_container")) {
                $D.id("app_helper_tip_container").style.display = "none";
            }
            if ($D.id("app_helper_tip_down_container")) {
                $D.id("app_helper_tip_down_container").style.display = "none";
            }
        });
        $E.on($D.id("app_helper_subscribe"), "click", showSubscribe);
        if ($D.id("app_helper_login_tip_container")) {
            this.loginTipDom = $D.id("app_helper_login_tip_container");
        } else {
            this.loginTipDom = $D.node("div", {
                id: "app_helper_login_tip_container",
                "class": "app_helper_login_tip_container"
            });
            this.loginTipDom.innerHTML = '				<div class="app_helper_login_tip"><a id="app_helper_login_tip_close" class="app_helper_login_close" href="#"></a>				<div class="app_helper_login_tip_text"><span>Hi，你还没登录哦，赶快</span><a id="show_login_link" href="#">登录</a><span>尝试一下吧！</span></div></div>';
            document.body.appendChild(this.loginTipDom);
        }
        this.loginTipDom.style.zIndex = 1000001;
        this.loginTipDom.style.left = "50px";
        this.loginTipDom.style.top = "50px";
        this.loginTipDom.style.display = "none";
        var close_btn_login_tip = $D.id("app_helper_login_tip_close");
        $E.on(close_btn_login_tip, "click",
        function(e) {
            e.preventDefault();
            $D.id("app_helper_login_tip_container").style.display = "none";
            unhighlightItems();
        });
        $E.on($D.id("show_login_link"), "click", showLoginWindow);
        if ($D.id("app_helper_tip_container")) {
            this.tipDom = $D.id("app_helper_tip_container");
        } else {
            this.tipDom = $D.node("div", {
                id: "app_helper_tip_container",
                "class": "app_helper_tip_up_container"
            });
            this.tipDom.innerHTML = '<div class="app_helper_tip_head"></div>				<div class="app_helper_tip_body">				<div class="app_helper_tip_title_bar"><span class="app_helper_tip_title" id="app_helper_tip_title">添加管理、应用</span>				<a class="app_helper_tip_close" id="app_helper_tip_close" href="#"></a></div>				<span class="app_helper_tip_text" id="app_helper_tip_text">你可以点击添加按钮，随意添加我们为你精心准备的小应用。</span>				</div>				<div class="app_helper_tip_footer"><a href="#" hidefocus="true" id="app_helper_next_btn" class="app_helper_next_btn"></a><a id="app_helper_know_btn" class="app_helper_know_btn" href="#"></a></div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.tipDom);
        }
        this.tipDom.style.display = "none";
        this.tipDom.style.zIndex = 1000000;
        var close_btn = $D.id("app_helper_tip_close");
        var know_btn = $D.id("app_helper_know_btn");
        var tip_container = this.tipDom;
        if ($D.id("app_helper_tip_down_container")) {
            this.tipDownDom = $D.id("app_helper_tip_down_container");
        } else {
            this.tipDownDom = $D.node("div", {
                id: "app_helper_tip_down_container",
                "class": "app_helper_tip_down_container"
            });
            this.tipDownDom.innerHTML = '				<div class="app_helper_tip_down_head"></div>				<div class="app_helper_tip_down_body">				<div class="app_helper_tip_title_bar"><span class="app_helper_tip_title" id="app_helper_tip_down_title">更换桌面主题</span>				<a class="app_helper_tip_close" id="app_helper_tip_down_close" href="#"></a></div>				<span class="app_helper_tip_text" id="app_helper_tip_down_text">厌倦了一成不变的桌面背景，偶尔换一个改变一下心情吧。</span>				</div>				<div class="app_helper_tip_down_footer">				<a href="#" class="app_helper_next_btn" hidefocus="true" id="app_helper_next_btn0"></a><a class="app_helper_know_btn" id="app_helper_know_down_btn" href="#"></a>				</div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.tipDownDom);
        }
        var tip_down_container = this.tipDownDom;
        this.tipDownDom.style.zIndex = 1000002;
        this.tipDownDom.style.display = "none";
        if ($D.id("app_helper_appbar_tip")) {
            this.appbarTip = $D.id("app_helper_appbar_tip");
        } else {
            this.appbarTip = $D.node("div", {
                id: "app_helper_appbar_tip",
                "class": "app_helper_appbar_tip"
            });
            this.appbarTip.innerHTML = '				<div class="app_helper_appbar_tip_top">				<div id="app_helper_dot_container0"><label class="app_helper_gray_dot"></label><label class="app_helper_gray_dot"></label><label class="app_helper_black_dot"></label></div>				</div>				<div class="app_helper_appbar_tip_middle">				<span>应用导航栏是WebQQ应用的入口，您可以在这里迅速运行某个应用，点击右侧的“九宫格”，可以添加和管理您的全部应用。</span>				</div>				<div class="app_helper_appbar_tip_bottom">				<a class="app_helper_continue_btn" id="app_helper_continue_btn0" hidefocus="true" href="#"></a>				<a class="app_helper_exit_btn" id="app_helper_know_exit_btn0" href="#"></a>				</div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.appbarTip);
        }
        if ($D.id("app_helper_chat_tip")) {
            this.chatTip = $D.id("app_helper_chat_tip");
        } else {
            this.chatTip = $D.node("div", {
                id: "app_helper_chat_tip",
                "class": "app_helper_chat_tip"
            });
            this.chatTip.innerHTML = '				<div class="app_helper_chat_tip_top">				<div id="app_helper_dot_container1"><label class="app_helper_gray_dot"></label><label class="app_helper_black_dot"></label><label class="app_helper_gray_dot"></label></div>				</div>				<div class="app_helper_chat_tip_middle">				<span>登录QQ后即可与好友进行聊天会话。</span>				</div>				<div class="app_helper_chat_tip_bottom">				<a class="app_helper_continue_btn" id="app_helper_continue_btn1" hidefocus="true" style="margin-right:25px" href="#"></a>				<a class="app_helper_exit_btn" id="app_helper_know_exit_btn1" href="#"></a>				</div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.chatTip);
        }
        if ($D.id("app_helper_taskbar_tip")) {
            this.taskbarTip = $D.id("app_helper_taskbar_tip");
        } else {
            this.taskbarTip = $D.node("div", {
                id: "app_helper_taskbar_tip",
                "class": "app_helper_taskbar_tip"
            });
            this.taskbarTip.innerHTML = '				<div class="app_helper_taskbar_tip_top">				<div id="app_helper_dot_container2"><label class="app_helper_black_dot"></label><label class="app_helper_gray_dot"></label><label class="app_helper_gray_dot"></label></div>				</div>				<div class="app_helper_taskbar_tip_middle">				<span>展示WebQQ当前开启的应用和聊天窗口，并进行设置桌面主题，快速显示桌面、锁屏等操作。</span>				</div>				<div class="app_helper_taskbar_tip_bottom">				<a class="app_helper_finish_btn" id="app_helper_continue_btn2" href="#" hidefocus="true"></a>				</div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.taskbarTip);
        }
        this.appbarTip.style.position = "absolute";
        var left = parseInt((document.documentElement.clientWidth / 2) / 66) * 66 - 165;
        this.appbarTip.style.left = left + "px";
        this.appbarTip.style.top = "65px";
        this.appbarTip.style.zIndex = "1000003";
        this.appbarTip.style.display = "none";
        $E.on($D.id("app_helper_know_exit_btn0"), "click", exitShow);
        $E.on($D.id("app_helper_know_exit_btn1"), "click", exitShow);
        $E.on($D.id("app_helper_continue_btn0"), "click",
        function(e) {
            e.preventDefault();
            showStep1();
            cancel1 = true;
        });
        $E.on($D.id("app_helper_continue_btn1"), "click",
        function(e) {
            e.preventDefault();
            showStep2();
            cancel2 = true;
        });
        $E.on($D.id("app_helper_continue_btn2"), "click",
        function(e) {
            e.preventDefault();
            showStep3();
            cancel3 = true;
        });
        this.chatTip.style.position = "absolute";
        this.chatTip.style.left = (document.documentElement.clientWidth - 435) + "px";
        this.chatTip.style.top = "200px";
        this.chatTip.style.zIndex = "1000004";
        this.chatTip.style.display = "none";
        this.taskbarTip.style.position = "absolute";
        this.taskbarTip.style.left = parseInt(document.documentElement.clientWidth / 2 - 180) + "px";
        this.taskbarTip.style.top = (document.documentElement.clientHeight - 175) + "px";
        this.taskbarTip.style.zIndex = "1000005";
        this.taskbarTip.style.display = "none";
        if ($D.id("perfect_nine_box_container")) {
            this.mask = $D.id("perfect_nine_box_container");
        } else {
            this.mask = $D.node("div", {
                id: "perfect_nine_box_container"
            });
            this.mask.innerHTML = '<div class="perfect_nine_box" id="perfect_nine_box">				<div id="perfect_nine_top" class="perfect_nine_top"><div id="perfect_nine_t_m" class="perfect_nine_t_m"></div></div>				<span id="perfect_nine_t_l" class="perfect_nine_t_l"></span>				<span id="perfect_nine_t_r" class="perfect_nine_t_r"></span>				<div id="perfect_nine_middle" class="perfect_nine_middle">					<span id="perfect_nine_m_l" class="perfect_nine_m_l"></span>					<span id="perfect_nine_m_r" class="perfect_nine_m_r"></span>					<div id="perfect_nine_context" class="perfect_nine_context">					</div>				</div>				<div id="perfect_nine_b_m" class="perfect_nine_b_m">					<div id="perfect_nine_b_m_m" class="perfect_nine_b_m_m">					</div>				</div>				<span id="perfect_nine_b_l" class="perfect_nine_b_l"></span>				<span id="perfect_nine_b_r" class="perfect_nine_b_r"></span></div><iframe width="100%" height="100%" class="app_helper_bg_iframe"></iframe>';
            document.body.appendChild(this.mask);
        }
        this.mask.style.position = "absolute";
        this.mask.style.zIndex = "1000000";
        this.mask.style.width = document.documentElement.clientWidth + "px";
        this.mask.style.height = document.documentElement.clientHeight + "px";
        this.mask.style.left = "0";
        this.mask.style.top = "0";
        this.mask.style.display = "none";
        var app_helper_new_list = $D.id("app_helper_new_list");
        var new_list_lis = app_helper_new_list.getElementsByTagName("li");
        for (var i = 0; i < new_list_lis.length; ++i) { (function() {
                var li = new_list_lis[i];
                var j = i;
                li.childNodes[0].onclick = function() {
                    eval("showFunc" + j + "();");
                    return false;
                };
            })();
        }
        if (J.browser.ie && J.browser.ie < 7) {
            document.execCommand("BackgroundImageCache", false, true);
        }
        $E.on($D.id("app_helper_quick_bar"), "click", oneMinuteShow);
        $E.on($D.id("app_helper_set_home"), "click", setHomePage);
        $E.on($D.id("app_helper_store"), "click", addFavorite);
        $E.on($D.id("app_helper_checkbox"), "click", onSubscribeClick);
        $E.on($D.id("app_helper_checkbox_container"), "click", onSubscribeUnselect);
        $E.on($D.id("app_helper_checkbox"), "click", onSubscribeClick);
        $E.on($D.id("app_helper_tip_close"), "click", onTipClose);
        $E.on($D.id("app_helper_tip_down_close"), "click", onTipClose);
        $E.on($D.id("app_helper_know_btn"), "click", onTipKnow);
        $E.on($D.id("app_helper_know_down_btn"), "click", onTipKnow);
        pgvSendClick({
            hottag: "WEB2QQ.APP.HELPER.WIDGET"
        });
        if (qqweb.portal.getLoginLevel() > 1) {
            mf_getRemoteJs("http://web.qq.com/cgi-bin/bookmail/getbookflag.php?uin=" + qqweb.portal.getCookieUin(),
            function() {
                if (mailSubscribeState == 1) {
                    $D.id("app_helper_checkbox").style.display = "none";
                } else {
                    $D.id("app_helper_checkbox").style.display = "block";
                }
            });
        }
    };
    var onTipClose = function(e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.style.display = "none";
        unhighlightItems();
    };
    var onTipKnow = function(e) {
        e.preventDefault();
        this.parentNode.parentNode.style.display = "none";
        unhighlightItems();
    };
    var closeQuickBar = function(e) {
        e.stopPropagation();
        $D.id("app_helper_quick_bar").style.display = "none";
    };
    var onHelpAreaMouseOver = function(e) {
        this.className = "helper_area_highlight";
    };
    var onSubscribeClick = function(e) {
        e.preventDefault();
        setTimeout(function() {
            $D.id("app_helper_checkbox").style.display = "none";
        },
        0);
        mf_getRemoteJs("http://web.qq.com/cgi-bin/bookmail/setbookflag.php?uin=" + qqweb.portal.getCookieUin() + "&action=add&time=" + (new Date()).getTime());
    };
    var onSubscribeUnselect = function(e) {
        if ($D.id("app_helper_checkbox").style.display == "block") {
            onSubscribeClick(e);
        }
        $D.id("app_helper_checkbox").style.display = "block";
        $D.id("app_helper_checkbox").checked = false;
        mf_getRemoteJs("http://web.qq.com/cgi-bin/bookmail/setbookflag.php?uin=" + qqweb.portal.getCookieUin() + "&action=del&time=" + (new Date()).getTime());
    };
    var showSubscribe = function(e) {
        e.preventDefault();
        var loginTipDom = $D.id("app_helper_login_tip_container");
        if (qqweb.portal.getLoginLevel() < 2) {
            var pos = $D.getClientXY($D.id("app_helper_subscribe"));
            loginTipDom.style.left = (pos[0] + 100) + "px";
            loginTipDom.style.top = (pos[1] - 30) + "px";
            loginTipDom.style.display = "block";
            $D.id("app_helper_tip_down_container").style.display = "none";
            $D.id("app_helper_tip_container").style.display = "none";
        } else {
            $D.id("app_helper_subscribe_tip_container").style.display = "block";
            $D.id("app_helper_checkbox").className = $D.id("app_helper_checkbox").className;
        }
    };
    var showFunc2 = function() {
        var loginTipDom = $D.id("app_helper_login_tip_container");
        highlightItem(2);
        if (qqweb.portal.getLoginLevel() < 2) {
            var pos = $D.getClientXY($D.id("app_helper_new_list"));
            loginTipDom.style.left = (pos[0] + 125) + "px";
            loginTipDom.style.top = (pos[1] + 24) + "px";
            loginTipDom.style.display = "block";
            $D.id("app_helper_tip_down_container").style.display = "none";
            $D.id("app_helper_tip_container").style.display = "none";
            return false;
        }
        qqweb.portal.openInWebBrowser();
        var tip_container = $D.id("app_helper_tip_container");
        var title = $D.id("app_helper_tip_title");
        var text = $D.id("app_helper_tip_text");
        title.innerHTML = "一键保存为应用";
        text.innerHTML = "浏览网页中看到心仪的网站，可直接保存在自己的应用栏中。";
        tip_container.style.left = "-5px";
        tip_container.style.top = "130px";
        tip_container.style.display = "block";
        $D.id("app_helper_next_btn").focus();
        $D.id("app_helper_tip_down_container").style.display = "none";
        $D.id("app_helper_next_btn").onclick = function() {
            closeBrowser();
            showFunc3();
            return false;
        };
        loginTipDom.style.display = "none";
        return false;
    };
    this.shining = function() {
        $D.id("helper_area").className = "helper_area_highlight";
        setTimeout(function() {
            $D.id("helper_area").className = "helper_area";
        },
        200);
    };
    var closeBrowser = function() {
        var app = qqweb.portal.getApp(6);
        if (app && app.isRunning()) {
            app.exit();
        }
    };
    var showFunc3 = function() {
        highlightItem(3);
        var loginTipDom = $D.id("app_helper_login_tip_container");
        var tip_down_container = $D.id("app_helper_tip_down_container");
        var title = $D.id("app_helper_tip_down_title");
        var text = $D.id("app_helper_tip_down_text");
        title.innerHTML = "消息提示音";
        text.innerHTML = "开启或者关闭，由你决定。";
        var left = document.documentElement.offsetWidth - 255;
        if (qqweb.portal.getLoginLevel() > 1) {
            left -= 97;
        }
        tip_down_container.style.left = left + "px";
        tip_down_container.style.top = (document.documentElement.offsetHeight - 130) + "px";
        tip_down_container.style.display = "block";
        $D.id("app_helper_next_btn0").focus();
        $D.id("app_helper_tip_container").style.display = "none";
        $D.id("app_helper_next_btn0").onclick = showFunc4;
        loginTipDom.style.display = "none";
        return false;
    };
    var showFunc4 = function() {
        highlightItem(4);
        var loginTipDom = $D.id("app_helper_login_tip_container");
        var tip_down_container = $D.id("app_helper_tip_down_container");
        var title = $D.id("app_helper_tip_down_title");
        var text = $D.id("app_helper_tip_down_text");
        title.innerHTML = "使用网页输入法";
        text.innerHTML = "跨系统、免安装、聊天倍轻松。";
        var left = document.documentElement.offsetWidth - 275;
        if (qqweb.portal.getLoginLevel() > 1) {
            left -= 101;
        }
        tip_down_container.style.left = left + "px";
        tip_down_container.style.top = (document.documentElement.offsetHeight - 130) + "px";
        tip_down_container.style.display = "block";
        $D.id("app_helper_next_btn0").focus();
        $D.id("app_helper_tip_container").style.display = "none";
        $D.id("app_helper_next_btn0").onclick = showFunc5;
        loginTipDom.style.display = "none";
        return false;
    };
    var showFunc1 = function() {
        highlightItem(1);
        var loginTipDom = $D.id("app_helper_login_tip_container");
        var tip_container = $D.id("app_helper_tip_container");
        var title = $D.id("app_helper_tip_title");
        var text = $D.id("app_helper_tip_text");
        title.innerHTML = "添加管理、应用";
        text.innerHTML = "你可以点击添加按钮，随意添加我们为你精心准备的小应用。";
        tip_container.style.left = ($D.getXY($D.id("appBar_controlBar_all"))[0]) - 163 + "px";
        tip_container.style.top = "42px";
        tip_container.style.display = "block";
        $D.id("app_helper_next_btn").focus();
        $D.id("app_helper_tip_down_container").style.display = "none";
        $D.id("app_helper_next_btn").onclick = showFunc2;
        loginTipDom.style.display = "none";
        return false;
    };
    var showFunc5 = function() {
        var loginTipDom = $D.id("app_helper_login_tip_container");
        highlightItem(5);
        if (qqweb.portal.getLoginLevel() < 2) {
            var pos = $D.getClientXY($D.id("app_helper_new_list"));
            loginTipDom.style.left = (pos[0] + 105) + "px";
            loginTipDom.style.top = (pos[1] + 100) + "px";
            loginTipDom.style.display = "block";
            $D.id("app_helper_tip_down_container").style.display = "none";
            $D.id("app_helper_tip_container").style.display = "none";
            return false;
        }
        var tip_container = $D.id("app_helper_tip_container");
        var title = $D.id("app_helper_tip_title");
        var text = $D.id("app_helper_tip_text");
        title.innerHTML = "修改个人资料";
        text.innerHTML = "点击头像即可修改个人资料。";
        tip_container.style.left = ($D.getOffsetWidth($D.id("appBarContainer")) - 55) + "px";
        tip_container.style.top = "57px";
        tip_container.style.display = "block";
        $D.id("app_helper_next_btn").focus();
        $D.id("app_helper_tip_down_container").style.display = "none";
        $D.id("app_helper_next_btn").onclick = showFunc0;
        loginTipDom.style.display = "none";
        return false;
    };
    var showFunc0 = function() {
        var loginTipDom = $D.id("app_helper_login_tip_container");
        highlightItem(0);
        if (qqweb.portal.getLoginLevel() < 2) {
            var pos = $D.getClientXY($D.id("app_helper_new_list"));
            loginTipDom.style.left = (pos[0] + 100) + "px";
            loginTipDom.style.top = (pos[1] - 33) + "px";
            loginTipDom.style.display = "block";
            $D.id("app_helper_tip_down_container").style.display = "none";
            $D.id("app_helper_tip_container").style.display = "none";
            return false;
        }
        var tip_down_container = $D.id("app_helper_tip_down_container");
        var title = $D.id("app_helper_tip_down_title");
        var text = $D.id("app_helper_tip_down_text");
        title.innerHTML = "更换桌面主题";
        text.innerHTML = "打开设置中心，点击主题图标，就可以随心情更换桌面主题";
        tip_down_container.style.left = (document.documentElement.offsetWidth - 250) + "px";
        tip_down_container.style.top = (document.documentElement.offsetHeight - 147) + "px";
        tip_down_container.style.display = "block";
        $D.id("app_helper_next_btn0").focus();
        $D.id("app_helper_tip_container").style.display = "none";
        $D.id("app_helper_next_btn0").onclick = showFunc1;
        loginTipDom.style.display = "none";
        return false;
    };
    var unhighlightItems = function() {
        var app_helper_new_list = $D.id("app_helper_new_list");
        var new_list_lis = app_helper_new_list.getElementsByTagName("li");
        for (var i = 0; i < new_list_lis.length; ++i) {
            new_list_lis[i].firstChild.className = "";
        }
    };
    var highlightItem = function(n) {
        var app_helper_new_list = $D.id("app_helper_new_list");
        var new_list_lis = app_helper_new_list.getElementsByTagName("li");
        unhighlightItems();
        new_list_lis[n].firstChild.className = "app_helper_new_list_a_hightlight";
    };
    var onHelpAreaMouseOut = function(e) {
        this.className = "helper_area";
    };
    var showLoginWindow = function(e) {
        e.preventDefault();
        qqweb.portal.showLoginWindow("helper", true);
        var loginTipDom = $D.id("app_helper_login_tip_container");
        loginTipDom.style.display = "none";
    };
    function objectToString(o) {
        if (typeof o != "object") {
            return '"' + o + '"';
        }
        var newJSONtext = [];
        if (o && typeof o.sort == "function" && typeof o.length == "number") {
            if (o.length == 1) {
                newJSONtext.push("[" + objectToString(o[0]) + "]");
            } else {
                newJSONtext.push("[");
                for (var i = 0; i < o.length; ++i) {
                    newJSONtext.push(objectToString(o[i]));
                    newJSONtext.push(",");
                }
                if (newJSONtext.length > 2) {
                    newJSONtext.pop();
                }
                newJSONtext.push("]");
            }
        } else {
            newJSONtext.push("{");
            for (var e in o) {
                newJSONtext.push('"' + e + '":');
                newJSONtext.push(objectToString(o[e]));
                newJSONtext.push(",");
            }
            if (newJSONtext.length > 2) {
                newJSONtext.pop();
            }
            newJSONtext.push("}");
        }
        return newJSONtext.join("");
    }
});

//http://web2.qq.com/module/helper/main.js?20101118001