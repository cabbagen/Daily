!function() {
    var a = function() {
        var b = [].slice.call(arguments);
        return b.push(a.options),
        b[0].match(/^\s*#([\w:\-\.]+)\s*$/gim) && b[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim, function(a, c) {
            var d = document
              , e = d && d.getElementById(c);
            b[0] = e ? e.value || e.innerHTML : a
        }),
        1 == arguments.length ? a.compile.apply(a, b) : arguments.length >= 2 ? a.to_html.apply(a, b) : void 0
    }
      , b = {
        escapehash: {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;"
        },
        escapereplace: function(a) {
            return b.escapehash[a]
        },
        escaping: function(a) {
            return "string" != typeof a ? a : a.replace(/[&<>"]/gim, this.escapereplace)
        },
        detection: function(a) {
            return "undefined" == typeof a ? "" : a
        }
    }
      , c = function(a) {
        if ("undefined" != typeof console) {
            if (console.warn)
                return void console.warn(a);
            if (console.log)
                return void console.log(a)
        }
        throw a
    }
      , d = function(a, b) {
        if (a = a !== Object(a) ? {} : a,
        a.__proto__)
            return a.__proto__ = b,
            a;
        var c = function() {}
          , d = Object.create ? Object.create(b) : new (c.prototype = b,
        c);
        for (var e in a)
            a.hasOwnProperty(e) && (d[e] = a[e]);
        return d
    };
    a.__cache = {},
    a.version = "0.6.5-stable",
    a.settings = {},
    a.tags = {
        operationOpen: "{@",
        operationClose: "}",
        interpolateOpen: "\\${",
        interpolateClose: "}",
        noneencodeOpen: "\\$\\${",
        noneencodeClose: "}",
        commentOpen: "\\{#",
        commentClose: "\\}"
    },
    a.options = {
        cache: !0,
        strip: !0,
        errorhandling: !0,
        detection: !0,
        _method: d({
            __escapehtml: b,
            __throw: c,
            __juicer: a
        }, {})
    },
    a.tagInit = function() {
        var b = a.tags.operationOpen + "each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + a.tags.operationClose
          , c = a.tags.operationOpen + "\\/each" + a.tags.operationClose
          , d = a.tags.operationOpen + "if\\s*([^}]*?)" + a.tags.operationClose
          , e = a.tags.operationOpen + "\\/if" + a.tags.operationClose
          , f = a.tags.operationOpen + "else" + a.tags.operationClose
          , g = a.tags.operationOpen + "else if\\s*([^}]*?)" + a.tags.operationClose
          , h = a.tags.interpolateOpen + "([\\s\\S]+?)" + a.tags.interpolateClose
          , i = a.tags.noneencodeOpen + "([\\s\\S]+?)" + a.tags.noneencodeClose
          , j = a.tags.commentOpen + "[^}]*?" + a.tags.commentClose
          , k = a.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)" + a.tags.operationClose
          , l = a.tags.operationOpen + "include\\s*([^}]*?)\\s*,\\s*([^}]*?)" + a.tags.operationClose;
        a.settings.forstart = new RegExp(b,"igm"),
        a.settings.forend = new RegExp(c,"igm"),
        a.settings.ifstart = new RegExp(d,"igm"),
        a.settings.ifend = new RegExp(e,"igm"),
        a.settings.elsestart = new RegExp(f,"igm"),
        a.settings.elseifstart = new RegExp(g,"igm"),
        a.settings.interpolate = new RegExp(h,"igm"),
        a.settings.noneencode = new RegExp(i,"igm"),
        a.settings.inlinecomment = new RegExp(j,"igm"),
        a.settings.rangestart = new RegExp(k,"igm"),
        a.settings.include = new RegExp(l,"igm")
    }
    ,
    a.tagInit(),
    a.set = function(a, b) {
        var c = this
          , d = function(a) {
            return a.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim, function(a) {
                return "\\" + a
            })
        }
          , e = function(a, b) {
            var e = a.match(/^tag::(.*)$/i);
            return e ? (c.tags[e[1]] = d(b),
            void c.tagInit()) : void (c.options[a] = b)
        };
        if (2 === arguments.length)
            return void e(a, b);
        if (a === Object(a))
            for (var f in a)
                a.hasOwnProperty(f) && e(f, a[f])
    }
    ,
    a.register = function(a, b) {
        var c = this.options._method;
        return c.hasOwnProperty(a) ? !1 : c[a] = b
    }
    ,
    a.unregister = function(a) {
        var b = this.options._method;
        return b.hasOwnProperty(a) ? delete b[a] : void 0
    }
    ,
    a.template = function(b) {
        var c = this;
        this.options = b,
        this.__interpolate = function(a, b, c) {
            var d, e = a.split("|"), f = e[0] || "";
            return e.length > 1 && (a = e.shift(),
            d = e.shift().split(","),
            f = "_method." + d.shift() + ".call({}, " + [a].concat(d) + ")"),
            "<%= " + (b ? "_method.__escapehtml.escaping" : "") + "(" + (c && c.detection === !1 ? "" : "_method.__escapehtml.detection") + "(" + f + ")) %>"
        }
        ,
        this.__removeShell = function(b, d) {
            var e = 0;
            return b = b.replace(a.settings.forstart, function(a, b, c, d) {
                var c = c || "value"
                  , d = d && d.substr(1)
                  , f = "i" + e++;
                return "<% ~function() {for(var " + f + " in " + b + ") {if(" + b + ".hasOwnProperty(" + f + ")) {var " + c + "=" + b + "[" + f + "];" + (d ? "var " + d + "=" + f + ";" : "") + " %>"
            }).replace(a.settings.forend, "<% }}}(); %>").replace(a.settings.ifstart, function(a, b) {
                return "<% if(" + b + ") { %>"
            }).replace(a.settings.ifend, "<% } %>").replace(a.settings.elsestart, function(a) {
                return "<% } else { %>"
            }).replace(a.settings.elseifstart, function(a, b) {
                return "<% } else if(" + b + ") { %>"
            }).replace(a.settings.noneencode, function(a, b) {
                return c.__interpolate(b, !1, d)
            }).replace(a.settings.interpolate, function(a, b) {
                return c.__interpolate(b, !0, d)
            }).replace(a.settings.inlinecomment, "").replace(a.settings.rangestart, function(a, b, c, d) {
                var f = "j" + e++;
                return "<% ~function() {for(var " + f + "=" + c + ";" + f + "<" + d + ";" + f + "++) {{var " + b + "=" + f + "; %>"
            }).replace(a.settings.include, function(a, b, c) {
                return b.match(/^file\:\/\//gim) ? a : "<%= _method.__juicer(" + b + ", " + c + "); %>"
            }),
            d && d.errorhandling === !1 || (b = "<% try { %>" + b,
            b += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'),
            b
        }
        ,
        this.__toNative = function(a, b) {
            return this.__convert(a, !b || b.strip)
        }
        ,
        this.__lexicalAnalyze = function(b) {
            var c = []
              , d = []
              , e = ""
              , f = ["if", "each", "_", "_method", "console", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"]
              , g = function(a, b) {
                if (Array.prototype.indexOf && a.indexOf === Array.prototype.indexOf)
                    return a.indexOf(b);
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b)
                        return c;
                return -1
            }
              , h = function(b, e) {
                if (e = e.match(/\w+/gim)[0],
                -1 === g(c, e) && -1 === g(f, e) && -1 === g(d, e)) {
                    if ("undefined" != typeof window && "function" == typeof window[e] && window[e].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))
                        return b;
                    if ("undefined" != typeof global && "function" == typeof global[e] && global[e].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))
                        return b;
                    if ("function" == typeof a.options._method[e] || a.options._method.hasOwnProperty(e))
                        return d.push(e),
                        b;
                    c.push(e)
                }
                return b
            };
            b.replace(a.settings.forstart, h).replace(a.settings.interpolate, h).replace(a.settings.ifstart, h).replace(a.settings.elseifstart, h).replace(a.settings.include, h).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/gim, h);
            for (var i = 0; i < c.length; i++)
                e += "var " + c[i] + "=_." + c[i] + ";";
            for (var i = 0; i < d.length; i++)
                e += "var " + d[i] + "=_method." + d[i] + ";";
            return "<% " + e + " %>"
        }
        ,
        this.__convert = function(a, b) {
            var c = [].join("");
            return c += "'use strict';",
            c += "var _=_||{};",
            c += "var _out='';_out+='",
            c += b !== !1 ? a.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out;" : a.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');"
        }
        ,
        this.parse = function(a, b) {
            var e = this;
            return b && b.loose === !1 || (a = this.__lexicalAnalyze(a) + a),
            a = this.__removeShell(a, b),
            a = this.__toNative(a, b),
            this._render = new Function("_, _method",a),
            this.render = function(a, b) {
                return b && b === c.options._method || (b = d(b, c.options._method)),
                e._render.call(this, a, b)
            }
            ,
            this
        }
    }
    ,
    a.compile = function(a, b) {
        b && b === this.options || (b = d(b, this.options));
        try {
            var e = this.__cache[a] ? this.__cache[a] : new this.template(this.options).parse(a, b);
            return b && b.cache === !1 || (this.__cache[a] = e),
            e
        } catch (f) {
            return c("Juicer Compile Exception: " + f.message),
            {
                render: function() {}
            }
        }
    }
    ,
    a.to_html = function(a, b, c) {
        return c && c === this.options || (c = d(c, this.options)),
        this.compile(a, c).render(b, c._method)
    }
    ,
    "undefined" != typeof module && module.exports ? module.exports = a : this.juicer = a
}();
var Tpl = {};
Tpl.chat = '<div id="J_wkitMsgContent" class="wkit-msg-content"></div>\n<div id="J_wkitMsgInputWrap" class="wkit-msg-input-wrap">\n    <div id="J_wkitSoftInput" class="wkit-soft-input">\n        <div class="wkit-emot-trigger-wrap">\n            <img class="wkit-emot-trigger" src="https://gw.alicdn.com/tps/TB1n_7TKFXXXXbBXVXXXXXXXXXX-50-50.png" alt="">\n            <div id="J_emotContainer" class="wkit-emot-container wkit-hidden"></div>\n        </div>\n        {@if uploader}\n        <div class="wkit-img-trigger-wrap">\n            <img class="wkit-img-trigger" src="https://gw.alicdn.com/tps/TB1Dgo5KFXXXXa1XFXXXXXXXXXX-50-50.png" />\n            <input id="J_wkitImgUploader" type="file" />\n        </div>\n        {@/if}\n    </div>\n    <div id="J_wkitMsgInput" class="wkit-msg-input">\n        <textarea id="J_wkitTextarea" class="wkit-textarea" placeholder="${placeholder}"></textarea>\n        {@if sendBtn}<button class="wkit-msg-send-btn" id="J_wkitMsgSendBtn">${sendBtnText}</button>{@/if}\n    </div>\n</div>',
Tpl.emot = '<div class="wkit-emot-con" id="J_wkitEmotCon">\n    {@each _ as item, idx}\n        <div class="wkit-emot-wrap wkit-emot-wrap${idx}">\n            {@each item as i, index}\n                <span title="${i}" data-index="${parseInt(index) + (idx*_[0].length)}"></span>\n            {@/each}\n        </div>\n    {@/each}\n</div>\n<div class="wkit-emot-tab" id="J_wkitEmotTab">\n    {@each _ as items, index}\n    <i class="wkit-emot-tab-item{@if index == 0} wkit-active{@/if}" data-index="${index}"></i>\n    {@/each}\n</div>\n',
Tpl.msg = '<div class="wkit-msg-wrap ${cls}">\n    <div class="wkit-avatar-wrap">\n        <img class="wkit-avatar" src="${avatar}" />\n    </div>\n    <div class="wkit-msg">\n        <div class="wkit-msg-time"><span>${nick}</span>${time}</div>\n        <div class="wkit-msg-inner">\n            <i class="wkit-arr"></i>\n            <div class="wkit-msg-item">$${msg}</div>\n        </div>\n    </div>\n</div>',
Tpl.plugin = '<div class="wkit-user-info" id="J_wkitUserInfo">\n    <div class="wkit-logo" id="J_wkitLogo">\n        {@if logo}\n            <img src="${logo}" style="${logoStyle}" />\n        {@/if}\n        <span class="wki-title-wrap" style="${titleStyle}" title="${title}" id="J_wkitTitle">${title}</span>\n    </div>\n    <div class="wkit-user-avatar"><img src="${avatar}" width="100%"/></div>\n</div>\n<div class="wkit-plugin" id="J_wkitPluginFrameWrap">\n    <iframe src="${pluginUrl}" id="J_wkitPluginFrame" frameborder=0></iframe>\n</div>',
Tpl.poweredBy = '<a href="http://im.taobao.com/" target="_blank"><img src="https://gw.alicdn.com/tps/TB1F30vKpXXXXaMXpXXXXXXXXXX-29-17.png" alt="云旺"/> Powered by 云旺</a>\n',
Tpl.style = "#wkit-content.wkit-theme-custom {\n    *zoom: 1;\n}\n#wkit-content.wkit-theme-custom:before,\n#wkit-content.wkit-theme-custom:after {\n    content: '';\n    line-height: 0;\n    display: table;\n}\n#wkit-content.wkit-theme-custom:after {\n    clear: both;\n}\n#wkit-content.wkit-theme-custom .wkit-logo {\n    background: ${tbgColor};\n    color: ${tColor};\n}\n#wkit-content.wkit-theme-custom .wkit-s .wkit-msg-inner {\n    background: ${mbgColor};\n    color: ${mColor}\n}\n#wkit-content.wkit-theme-custom .wkit-s .wkit-msg-inner a {\n    color: ${mColor};\n}\n#wkit-content.wkit-theme-custom .wkit-s .wkit-msg-inner .wkit-arr {\n    border-color: ${mbgColor} transparent transparent;\n}\n#wkit-content.wkit-theme-custom .wkit-emot-tab i.wkit-active {\n    background: ${tbgColor};\n    border-color: ${tbgColor};\n}\n#wkit-content.wkit-theme-custom .wkit-msg-send-btn:hover{\n    color: ${mbgColor};\n    background: ${mbgColor};\n    border-color: ${mbgColor};\n}",
Tpl.window = '<div id="J_wkitPluginWrap" class="wkit-plugin-wrap" style="width:${pluginWrapWidth}px;height:${pluginWrapHeight}px;margin-right:${pluginWrapMarginRight}px;">\n</div>\n<div id="J_wkitChatWrap" class="wkit-chat-wrap" style="width:${chatWrapWidth}px;height:${chatWrapHeight}px;">\n</div>\n<div id="J_wkitCustomWrap" class="wkit-custom-wrap" style="width:${customWrapWidth}px;height:${customWrapHeight}px;">\n</div>',
function(a) {
    !window.console && (window.console = {
        log: function() {}
    }),
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }
    ),
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
        var c;
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var d = Object(this)
          , e = d.length >>> 0;
        if (0 === e)
            return -1;
        var f = +b || 0;
        if (Math.abs(f) === 1 / 0 && (f = 0),
        f >= e)
            return -1;
        for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); e > c; ) {
            if (c in d && d[c] === a)
                return c;
            c++
        }
        return -1
    }
    );
    var b = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?","gi")
      , c = 36e5
      , d = 24 * c
      , e = (new Date).getTimezoneOffset() / 60
      , f = null
      , g = "https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/";
    a.util || (a.util = {}),
    a.util.getById = function(a) {
        return document.getElementById(a)
    }
    ,
    a.util.isUrl = function(a) {
        return b.test(a)
    }
    ,
    a.util.urlReplacer = function(a) {
        return a.replace(b, function(a) {
            return 0 == a.indexOf(g) ? a : '<a href="' + a + '" target="_blank">' + a + "</a>"
        })
    }
    ,
    a.util.param = function(a, b, c) {
        var d = "";
        b = b || "=",
        c = c || "&";
        for (var e in a)
            d += c + e + b + a[e];
        return d = d.substring(1)
    }
    ,
    a.util.encodeHtml = function(a) {
        return a = a.replace(/&/g, "&amp;"),
        a = a.replace(/>/g, "&gt;"),
        a = a.replace(/</g, "&lt;"),
        a = a.replace(/"/g, "&quot;"),
        a = a.replace(/'/g, "&#39;")
    }
    ,
    a.util.loadStyle = function(a, b, c) {
        var d = null
          , e = document.createElement("link")
          , f = !1
          , g = a.split("/");
        if (g = "wkit-" + g[g.length - 1].split(".").join("-"),
        this.getById(g))
            return void (b && b.call(c));
        var h = function() {
            f || (f = !0,
            d && clearTimeout(d),
            e.onload = null,
            e.onreadystatechange = null,
            b && b.call(c))
        };
        e.onload = h,
        e.onreadystatechange = h,
        e.rel = "stylesheet",
        e.href = a,
        e.id = g,
        document.getElementsByTagName("head")[0].appendChild(e),
        d = setTimeout(function() {
            b && b.call(c),
            e.onload = null
        }, 3e3)
    }
    ,
    a.util.addStyle = function(a, b) {
        var c = document.createElement("style");
        return c.type = "text/css",
        c.styleSheet ? c.styleSheet.cssText = b : c.appendChild(document.createTextNode(b)),
        a.appendChild(c),
        this
    }
    ,
    a.util.css = function(a, b) {
        if (!a || !b)
            return this;
        var c = this.param(b, ":", ";");
        return c && (a.style.cssText += ";" + c),
        this
    }
    ,
    a.util.addClass = function(a, b) {
        return a && b ? (b = b.trim(),
        a.classList ? b.split(/\s+/).forEach(function(b) {
            a.classList.add(b)
        }) : this.hasClass(a, b) || (a.className += " " + b),
        this) : this
    }
    ,
    a.util.removeClass = function(a, b) {
        if (!a || !b)
            return this;
        if (b = b.trim(),
        a.classList)
            b.split(/\s+/).forEach(function(b) {
                a.classList.remove(b)
            });
        else {
            var c = a.className;
            c = (" " + c + " ").replace(" " + b + " ", "").trim(),
            a.className = c
        }
        return this
    }
    ,
    a.util.hasClass = function(a, b) {
        return a && b ? (b = b.trim(),
        a.classList ? a.classList.contains(b) : (" " + a.className + " ").indexOf(" " + b + " ") > -1) : !1
    }
    ,
    a.util.dateFormatter = function(a) {
        var b, f, g, h, i, j, k = new Date(a), l = new Date, m = +k, n = +l - (+l - e * c) % d;
        return b = k.getFullYear(),
        f = this.numFormatter(k.getMonth() + 1),
        g = this.numFormatter(k.getDate()),
        h = this.numFormatter(k.getHours()),
        i = this.numFormatter(k.getMinutes()),
        j = this.numFormatter(k.getSeconds()),
        l.getFullYear() == b ? m >= n && n + d > m ? "今天 " + h + ":" + i + ":" + j : f + "-" + g + " " + h + ":" + i + ":" + j : b + "-" + f + "-" + g + " " + h + ":" + i + ":" + j
    }
    ,
    a.util.numFormatter = function(a) {
        return a = parseInt(a),
        a > 9 ? a : "0" + a
    }
    ,
    a.util.toast = function(a, b, c, d) {
        var e = document.getElementById("J_WkitToast");
        b || (b = document.body),
        e ? (f && clearTimeout(f),
        e.getElementsByTagName("span")[0].innerHTML = a) : (e = document.createElement("div"),
        e.id = "J_WkitToast",
        e.className = "wkit-toast",
        e.innerHTML = "<span>" + a + "</span>",
        c && (e.style.bottom = c + "px"),
        b.appendChild(e)),
        f = setTimeout(function() {
            e && e.parentNode && e.parentNode.removeChild(e),
            f = null
        }, d || 3e3)
    }
    ,
    a.util.getSmallImageUrl = function(a, b) {
        var c = this.unparam(a.split("?")[1])
          , d = a;
        if (c.width && c.height) {
            var e = c.width / c.height;
            c.width >= b && (c.thumb_width = b,
            c.thumb_height = parseInt(c.thumb_width / e)),
            d = a.split("?")[0] + "?" + this.param(c)
        }
        return d
    }
    ,
    a.util.getOriginImageUrl = function(a) {
        var b = this.getImgOriginSize(a);
        return b && (a = this.getSmallImageUrl(a, b.width)),
        a
    }
    ,
    a.util.getImgOriginSize = function(a) {
        var b = this.unparam(a.split("?")[1]);
        return b.width && b.height ? b : null
    }
    ,
    a.util.throttle = function(a, b, c, d) {
        var e, f = null, g = +new Date;
        return function() {
            var h = +new Date;
            e = arguments,
            h - g >= b ? (f && (clearTimeout(f),
            f = null),
            g = h,
            a.apply(d, e),
            f || (e = null)) : f || (f = setTimeout(function() {
                g = h,
                f = null,
                a.apply(d, e),
                f || (e = null)
            }, c || 500))
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    a.Conn = {
        loginPending: !1,
        historyPending: !1,
        isNeedReLogin: !1,
        isNeedReSendCustomData: !0,
        nocache: !1,
        reLoginCount: 0,
        lastReloginTime: 0,
        init: function(a) {
            // if (!(a && a.uid && a.appkey && a.credential && a.touid))
                // throw new Error('传入的参数必须包含以下字段{uid: "", appkey: "", credential: "", touid: ""}');
            if (!(a && a.uid && a.appkey && a.credential && a.tid))
                throw new Error('传入的参数必须包含以下字段{uid: "", appkey: "", credential: "", tid: ""}');
            return this.opts = a,
            this.sdk || (a.debug ? this.sdk = new WSDK({
                debug: !0,
                env: a.debug.env,
                domain: a.debug.domain
            }) : this.sdk = new WSDK),
            this.login(),
            this.events(),
            this
        },
        events: function() {
            window.addEventListener ? window.addEventListener("focus", this.focusHandler, !1) : window.attachEvent && window.attachEvent("onfocus", this.focusHandler),
            this.sdk.Event.on("KICK_OFF", function() {
                window.store && window.store.clear && window.store.clear(),
                Util.toast("您的账号已在其他地方登录")
            })
        },
        focusHandler: function() {
            a.Conn.isNeedReLogin && a.Conn.reLogin()
        },
        reLogin: function() {
            if (!(this.reLoginCount > 4)) {
                var a = +new Date;
                a - this.lastReloginTime < 3e3 ? this.reLoginCount++ : this.reLoginCount = 0,
                this.lastReloginTime = a,
                this.opts.onReLogin && this.opts.onReLogin.call(this.opts.context),
                this.historyPending = !1,
                this.login(),
                this.isNeedReLogin = !1
            }
        },
        login: function() {
            if (!this.loginPending) {
                this.loginPending = !0;
                var a = this
                  , b = this.opts
                  , c = b.onLoginSuccess
                  , d = b.onLoginError;
                this.opts.subTouid = b.uid,
                b.success = function() {
                    a.loginPending = !1,
                    c && c.call(b.context, a.sdk.LoginInfo),
                    b.onChatMsgReceived && a.listen(),
                    a.history()
                }
                ,
                b.error = function(c) {
                    a.loginPending = !1,
                    d && d.call(b.context, c)
                }
                ,
                this.sdk.Base.login(b)
            }
        },
        getRealCid: function(a, b) {
            var c = this
              , d = this.opts;
            this.sdk.Chat.getRealChatId({
                touid: d.touid,
                groupid: d.groupId,
                success: function(b) {
                    c.opts.subTouid = b.data,
                    a && a()
                },
                error: function() {
                    b && b()
                }
            })
        },
        listen: function() {
            if (!this.isListened) {
                this.isListened = !0;
                var a = this
                  , b = this.opts
                  , c = b.context
                  , d = b.onChatMsgReceived
                  , e = this.sdk.LoginInfo.prefix + this.opts.uid;
                this.sdk.Event.on("START_RECEIVE_ALL_MSG", function(b) {
                    // console.log(b);
                    // var f = a.opts.touid;
                    var f = a.opts.tid;
                    // 1e3 == b.code ? b && b.data && b.data.uid == e && b.data.touid && "string" == typeof b.data.touid && b.data.touid.split(":")[0].substr(8) == f.split(":")[0] && (a.opts.sendMsgToCustomService && b.data.touid != a.opts.subTouid && (a.opts.subTouid = b.data.touid,
                    1e3 == b.code ? b && b.data && b.data.uid == e && b.data.touid && "string" == typeof (b.data.touid + '')&& (b.data.touid + '').split(":")[0] == f.split(":")[0] && (a.opts.sendMsgToCustomService && b.data.touid != a.opts.subTouid && (a.opts.subTouid = b.data.touid,
                    a.nocache = !0,
                    a.opts.groupid = "",
                    a.opts.touid = b.data.touid.substr(8)),
                    d.call(c, b)) : 1001 == b.code || 1006 == b.code
                    
                })
            }
            this.sdk.Base.startListenAllMsg()
        },
        history: function(a) {
            if (!this.historyPending) {
                this.historyPending = !0;
                var b = this
                  , c = this.opts
                  // , d = c.touid;
                  , d = c.tid;
                c.sendMsgToCustomService ? d = ("cntaobao" + d).split(":")[0] : c.hasPrefix && (d = this.sdk.LoginInfo.toPrefix + d),
                // Chat => Tribe
                this.sdk.Tribe.getHistory({
                    // touid: d,
                    tid : d,
                    nextkey: a || "",
                    hasPrefix: c.sendMsgToCustomService ? !0 : !!c.hasPrefix,
                    count: 20,
                    success: function(a) {
                        a && 1e3 == a.code && c.onHistoryMsgReceived.call(c.context, a),
                        b.historyPending = !1
                    },
                    error: function(a) {
                        b.historyPending = !1
                    }
                })
            }
        },
        send: function(a) {
            return "undefined" == typeof a.msgType && (a.msgType = 0),
            a.doNotSend ? void this.sendMsgSuccessHandler(a) : void (this.opts.sendMsgToCustomService ? (this.opts.customData && this.isNeedReSendCustomData && this.sendCustomData(),
            this.sendServiceMsg(a)) : this.sendMsg(a))
        },
        // sendMsg: function(a) {
            // var b = this
              // , c = this.opts
              // , d = c.hasPrefix ? this.sdk.LoginInfo.toPrefix + c.touid : c.touid
              // , e = {
                // touid: d,
                // msg: a.msg,
                // msgType: a.msgType,
                // msgId: a.msgId,
                // hasPrefix: !!c.hasPrefix,
                // extinfo: a.extinfo,
                // success: function(c) {
                    // c && 1e3 == c.code && b.sendMsgSuccessHandler(a)
                // },
                // error: function(c) {
                    // b.sendMsgErrorHandler(c, a)
                // }
            // };
            // c.beforeMsgSend ? c.beforeMsgSend(e, function() {
                // b.sdk.Chat.sendMsg(e)
            // }) : this.sdk.Chat.sendMsg(e)
        // },
        sendMsg: function(a) {
            var b = this
              , c = this.opts
              , d = c.hasPrefix ? this.sdk.LoginInfo.toPrefix + c.tid : c.tid
              , e = {
                tid: d,
                msg: a.msg,
                msgType: a.msgType,
                msgId: a.msgId,
                hasPrefix: !!c.hasPrefix,
                extinfo: a.extinfo,
                success: function(c) {
                    c && 1e3 == c.code && b.sendMsgSuccessHandler(a)
                },
                error: function(c) {
                    b.sendMsgErrorHandler(c, a)
                }
            };
            c.beforeMsgSend ? c.beforeMsgSend(e, function() {
                b.sdk.Tribe.sendMsg(e)
            }) : this.sdk.Tribe.sendMsg(e)
        },
        sendServiceMsg: function(a) {
            var b = this
              , c = this.opts;
            this.sdk.Chat.sendMsgToCustomService({
                touid: c.touid,
                msg: a.msg,
                msgType: a.msgType,
                groupid: c.groupid,
                nocache: this.nocache,
                success: function(c) {
                    c && 1e3 == c.code && b.sendMsgSuccessHandler(a)
                },
                error: function(c) {
                    b.sendMsgErrorHandler(c, a)
                }
            }),
            b.nocache = !1
        },
        sendCustomData: function() {
            var a = this.opts;
            this.isNeedReSendCustomData = !1,
            this.sdk.Chat.sendCustomData({
                touid: a.touid,
                customData: a.customData,
                groupid: a.groupid,
                sendMsgToCustomService: !0
            })
        },
        sendMsgSuccessHandler: function(a) {
            this.opts.onMsgSent && this.opts.onMsgSent.call(this.opts.context, !1, this.formatMsgData(a))
        },
        sendMsgErrorHandler: function(a, b) {
            this.opts.onMsgSent && this.opts.onMsgSent.call(this.opts.context, a, this.formatMsgData(b))
        },
        formatMsgData: function(a) {
            if (!a)
                return {};
            var b = this.opts
              , c = this.sdk.LoginInfo
              // , d = (c.toPrefix || "") + b.touid
              , d = (c.toPrefix || "") + b.tid
              , e = (c.prefix || "") + b.uid;
            return {
                msg: 1 != a.msgType ? a.msg : a.base64Img || a.msg,
                type: a.msgType,
                id: a.id,
                to: a.doNotSend ? e : d,
                from: a.doNotSend ? d : e,
                time: +new Date,
                val: a.val
            }
        },
        switchTouid: function(a) {
            a.hasPrefix ? (this.sdk.LoginInfo.toPrefix = a.touid.substring(0, 8),
            this.opts.touid = a.touid.substr(8)) : this.opts.touid = a.touid,
            this.opts.hasPrefix = !!a.hasPrefix,
            this.opts.groupid = a.groupid,
            this.opts.sendMsgToCustomService = a.sendMsgToCustomService,
            this.historyPending = !1,
            this.history()
        },
        destroy: function() {
            this.historyPending = !1,
            this.sdk.Event.off("START_RECEIVE_ALL_MSG"),
            window.addEventListener ? window.removeEventListener("focus", this.focusHandler) : window.attachEvent && window.detachEvent("onfocus", this.focusHandler),
            this.sdk.Base.destroy && this.sdk.Base.destroy(),
            this.sdk.Base.unlogin && this.sdk.Base.unlogin()
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    a.Plugin = {
        init: function(a) {
            a.pluginUrl && this.render(a)
        },
        render: function(b) {
            a.UI.Plugin.render(b)
        },
        destroy: function() {
            a.UI.Plugin && a.UI.Plugin.destroy()
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    var b = a.util
      , c = "data:image/gif;base64,R0lGODlhPAAwAPcAAPr////36P+WAPn////25/b+9vr78f/+//b+9f/9//j88/357Pz///v////46v/25v7///v67vn6+/r7+/v//v746/3467fi+P/8//f99P/8+rbi+LHg+Pn+/7Xh+Ljj+Lnj+JLU9ZHT9ZDT9Y/S9bLg+Lji+LPh+JTU9Y/T9ajc95LT9aLa9p7Y9vf397Xi+Lrj+Kfc943S9f///5TV9fT8/67f94vR9J3Y9pXV9ZvX9o3R9bbh+JfV9qDZ9vr5+YnQ9Z/Z9rDf+Pf986Pa94vR9YjQ9LPg+KTb9/v6+rfj+KXb95jW9q/f+K/f963e+Krd9/r+//r5+pbW9a3f9/H7/5HU9ZrX9pvY9qDa9rHg96vd+IfP9L/l+a3f+J3X9qze+K3e96Tb9r7k+avd96bb96/g+JHT9JnW9q7f+Pv6+5bV9YzS9aLZ97rj+brk+LDg+Kbc95TV9rvk+JzY9pfW9qnc9//8/qnd95HS9aze967e+Lnj+aHZ9qjd95zX9rHf+IzR9ZnX9qHa9pbV9qLa95DT9KPb97Df9/f9//b99vf99qXamfX8///9+o7S9bTh+JPU9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAAAACwAAAAAPAAwAAAI/wBd/HBEsKDBgwgTKlzI0NEPF0lmNKrRqKLFixgzatzIUSPFGUkcNYr0KJLJkyhTqlzJsuXKko0INnoE5JHNmzhz6tzJs+fOmjFFknRJtKhRlTBlDj3KtCnSSEFHlnRKtWlSoVOraiV6VerWry27Ll0RAqzZoVGHokBBIsXZr2IfhUBhYwuTRyPeVo0biUSMLhtiyJGxQq9VqEpLjshxxASMIz5IyBBh2CjfSClUfIB0AUQYHCRJjChb+SVirCZTsNgMCRKID3BitOgh4hEJyqVPXn60urXvziZO6EHyh0aK27n5hkgBxYTv55A2fABxgYOKFijwVua7Q8cGD9DDc/8GYYKDmB7a38Z9xOTEBfHwx0Na0lf96UYhjNDx8D5+/A0wlKCDXGZdVYMMaHzQn3/+mXCBDwTCdVoVOLjH4IXRvTFIhFolpUEiHpyAIYYbgIBDVnshpkEUHnAwYnwv9HfBBmuQsJWHHUDi4oUebCDeC5CU4CMkMIAxWocq5rijfz3GCJ0HSrRwhg1KQOIBHy2geFhMGih54QWHREIGa61dkEYeN2BxAXggPGFIYVThqCODFzghwg2RaLEgCEuwMVoT73nAgyB5xZnknP59EEdJMhQCgm8fqICCFSRo1hoIRGh5lJxLwvdBDCOMUAQhPfrmQQklBNGHc65BkQJpWzr/0iWi8YVogx1ITPHEgpDMcQINQbBaZwi4xTprp/DxN0YJIfjBanReRHIDC6xuUAIKxTLF6YUngABIJIFYauUGdeyQQhmsWZtDtpseiqx4PCCSA154kPkBEUaIIER/1tLArmXuXggCC0WssIIZC/rYggoLXiAEtoZy6SWDG3CAAhdfrOnbCR4o+NwFVIQAq7YBf7lHFkKGB95zIKhgY8SyTvylGxuIyCAIbWgKsMS0vsjgCxtcUahT2/p84QdNiAAn0SUb7R8MLOi8c8yMVG311VhnrfXWXHfNiMRehy322FnHdMciZKet9taK3IHBEGvHHfcQGKgxQwZDZKD33nz3Ie3334AH/nfeM6jhghQYJIDB4ow37vjjkEcuOeSKS+FCQAAh+QQFFAAIACwAACoABwAGAAAFGSCCCKQgjiVCVaU5PC0yIQFBGAUiAcBwICEAIfkEBRQAAwAsBAAqAAgABgAABBJQyDnGpPaKqvcIYKggQGkmQwQAIfkEBRQABQAsCgAqAAYABgAABA1QyEmrnSETV4AfTREBACH5BAUUAAUALA0AKgAIAAYAAAQSUMgpCp32Vl2D98SCACQ5MEUEACH5BAUUAAQALBIAKgAIAAYAAAUUoCCOAkGO5lmqZeC6T1QAND1ARAgAIfkEBRQACAAsFwAqAAgABgAABBJQyCkQnfZWXYP3hFEAJDkcSAQAIfkEBRQAAwAsHAAqAAgABgAABBJQyDnGpPaKqvcIYKggQGkmQwQAIfkEBRQABQAsIgAqAAUABgAABApQyElrDZg4wEeLACH5BAUUAAUALCUAKgAIAAYAAAQSUMgpCp32Vl2D98SCACQ5MEUEACH5BAUUAAQALCoAKgAIAAYAAAUUoCCOAkGO5lmqZeC6T1QAND1ARAgAIfkEBRQACAAsLwAqAAgABgAABBJQyCkQnfZWXYP3hFEAJDkcSAQAIfkEBRQABQAsNAAqAAgABgAABRegII5FMZLmKViUKjxDIAdEUExArktFCAA7";
    a.Chat = {
        historyCount: 0,
        historyPending: !1,
        isBottom: !0,
        reLoginCount: 0,
        isReLogin: !1,
        welcomeMsgSent: !1,
        init: function(b) {
            this.opts = b;
            var d = "";
            b.customData && ("object" == typeof b.customData.order && (d += "&$bizOrder.itemID:" + b.customData.order.id),
            "object" == typeof b.customData.item && (d += "&itemsId=" + b.customData.item.id),
            b.customData = d.substr(1)),
            this.sdkOpts = {
                // ==========  添加 tid
                tid: b.tid,
                uid: b.uid,
                touid: b.touid,
                appkey: b.appkey,
                credential: b.credential,
                sendMsgToCustomService: b.sendMsgToCustomService,
                groupid: b.groupId,
                onLoginSuccess: this.onLoginSuccess,
                onLoginError: this.onLoginError,
                onHistoryMsgReceived: this.onHistoryMsgReceived,
                onChatMsgReceived: this.onChatMsgReceived,
                onMsgSent: this.onMsgSent,
                onReLogin: this.onReLogin,
                context: this,
                customData: b.customData,
                debug: b.debug,
                tokenFlag: b.tokenFlag || 64,
                beforeMsgSend: b.beforeMsgSend,
                cache: b.cacheLogin,
                type: b.loginType || 1
            },
            this.imageWidth = b.imageZoom ? 80 : b.width,
            b.imageZoomWidth = this.imageWidth,
            this.render(),
            this.toast("正在登录...", 1e4),
            this.C = a.Conn.init(this.sdkOpts);
            var e = new Image;
            e.src = c
        },
        render: function() {
            var c = this.opts;
            this.UIOpts = b.merge(c, {
                wrap: c.wrap,
                context: this
            }),
            this.UI = a.UI.Chat.render(this.UIOpts)
        },
        onLoginSuccess: function(a) {
            var b = this;
            if (!this.isReLogin) {
                if (this.loginInfo = a,
                this.opts.hideLoginSuccess) {
                    var c = document.getElementById("J_WkitToast");
                    c && c.parentNode.removeChild(c)
                } else
                    this.toast("登录成功, 可以发送消息啦~");
                this.msgTpl = juicer(Tpl.msg),
                setTimeout(function() {
                    b.opts.onLoginSuccess && b.opts.onLoginSuccess(a)
                }, 100)
            }
            setTimeout(function() {
                this.historyPending = !1
            }, 100),
            this.opts.welcomeMsg && !this.welcomeMsgSent && (this.opts.welcomeMsg && this.sendMsg({
                doNotSend: !0,
                msg: this.opts.welcomeMsg
            }),
            this.welcomeMsgSent = !0)
        },
        onLoginError: function(a) {
            this.toast(1002 != a.code ? a.resultText : "登录失败啦, 请重试"),
            this.opts.onLoginError && this.opts.onLoginError(a)
        },
        sendMsg: function(a) {
            this.C.send(a)
        },
        onMsgSent: function(a, b) {
            a ? 1001 == a.code && this.reLoginCount <= 3 ? this.C.login(this.sdkOpts) : this.toast("消息发送失败, 请重试") : (this.renderChatMsg([b]),
            this.UI.textarea.value = "",
            this.opts.onMsgSent && this.opts.onMsgSent({
                msgs: [b]
            }))
        },
        onChatMsgReceived: function(a) {
            this.renderChatMsg(a.data.msgs),
            this.opts.onMsgReceived && this.opts.onMsgReceived(a.data)
        },
        history: function() {
            this.isDisabledScroll && this.UI.setScrollStatus(!0),
            this.historyPending || this.nextKey !== !1 && (this.historyPending = !0,
            this.C.history(this.nextKey))
        },
        switchTouid: function(a) {
            this.isDisabledScroll = !0,
            this.UI.setScrollStatus(!1),
            this.UI.msgContent.innerHTML = "",
            this.nextKey = "",
            this.historyPending = !1,
            this.isBottom = !0;
            var b = a.touid;
            a.hasPrefix && (b = a.touid.substr(8)),
            this.opts.toAvatar = a.toAvatar,
            !this.opts.title && document.getElementById("J_wkitTitle") && (document.getElementById("J_wkitTitle").innerText = b),
            this.C.switchTouid(a)
        },
        onHistoryMsgReceived: function(a) {
            this.isDisabledScroll && this.UI.setScrollStatus(!0);
            var b = a.data.msgs;
            b.reverse(),
            this.nextKey = a.data.nextKey || !1,
            this.historyCount++,
            this.renderHistoryMsg(b),
            this.opts.autoMsg && (this.sendMsg({
                msg: this.opts.autoMsg,
                msgType: this.opts.autoMsgType || 0
            }),
            this.opts.autoMsg = ""),
            this.historyPending = !1,
            this.opts.onHistoryMsgReceived && this.opts.onHistoryMsgReceived(b)
        },
        uploadImg: function(a) {
            var d, e = this, f = this.opts, g = +new Date;
            return a ? (d = a.type ? {
                base64Img: a.base64Img,
                ext: a.ext
            } : {
                target: a.target
            },
            a.maxSize && (d.maxSize = a.maxSize),
            this.renderChatMsg([{
                msg: c,
                id: g,
                type: 1,
                time: g,
                to: this.loginInfo.toPrefix + f.touid,
                from: this.loginInfo.prefix + f.uid
            }]),
            d.success = function(b) {
                e.sendMsg({
                    msg: b.data.url,
                    msgType: 1,
                    id: g,
                    base64Img: b.data.base64Img
                }),
                1 !== a.type && e.updateUploader(a.target, e),
                e.opts.onUploaderSuccess && e.opts.onUploaderSuccess(b.data.url)
            }
            ,
            d.error = function(c) {
                c && c.code && -4 == c.code ? e.toast("图片太大了,最多2M") : e.toast("发送图片失败...");
                var d = b.getById("MSG_" + g);
                d && d.parentNode.removeChild(d),
                1 !== a.type && e.updateUploader(a.target, e),
                e.opts.onUploaderError && e.opts.onUploaderError(c)
            }
            ,
            void this.C.sdk.Plugin.Image.upload(d)) : (f.onUploaderError && f.onUploaderError(),
            !1)
        },
        updateUploader: function(a, b) {
            if (a) {
                var c = a.parentNode
                  , d = document.createElement("input");
                a.onchange = null,
                c.removeChild(a),
                d.type = "file",
                d.id = "J_wKitImgUploader",
                c.appendChild(d),
                b.UI.changeHandler ? b.UI.changeHandler(d, b.UIOpts) : d.onchange = function() {
                    b.uploadImg({
                        type: 0,
                        target: this
                    })
                }
            }
        },
        onReLogin: function() {
            this.isReLogin = !0,
            this.historyPending = !0,
            this.UI.msgContent.innerHTML = "",
            this.historyCount = 0,
            this.nextKey = "",
            this.isBottom = !0
        },
        renderHistoryMsg: function(a) {
            var b = this.getMsgTpl(a, !0);
            if (b) {
                var c = this.UI.msgContent;
                c.insertBefore(b, c.firstChild || null),
                this.historyPending && (c.scrollTop = c.scrollHeight / this.historyCount),
                this.scrollToBottom(),
                this.imgLoadToBottom(b)
            }
        },
        renderChatMsg: function(a) {
            var b = this.getMsgTpl(a);
            b && (this.UI.msgContent.appendChild(b),
            this.scrollToBottom(),
            this.imgLoadToBottom(b))
        },
        getMsgTpl: function(a, c) {
            var d, e, f, g, h, i = this, j = this.opts, k = this.C.sdk.Plugin.Emot, l = this.loginInfo.prefix + this.loginInfo.uid, m = document.createElement("div"), n = j.avatar, o = j.toAvatar, p = !1, q = "", r = !1, s = "", t = !1;
            return a.forEach(function(a) {
                if (r = a.from === l,
                t = !1,
                e = r ? "wkit-s" : "wkit-r",
                f = r ? n : o,
                0 == a.type)
                    try {
                        s = a.msg,
                        s = k.decode(s),
                        s = b.urlReplacer(s)
                    } catch (m) {
                        s = ""
                    }
                else if (1 == a.type || 4 == a.type) {
                    var u = "";
                    if (a.id && (g = b.getById(a.id))) {
                        if (p = !0,
                        g.src = a.msg,
                        j.isMobile && j.imageZoom && 0 != a.msg.indexOf("http")) {
                            var v = new Image;
                            v.src = a.msg,
                            v.onload = function() {
                                this.width > i.imageWidth ? g.style.width = i.imageWidth + "px" : g.style.width = this.width + "px"
                            }
                        }
                        j.isMobile && j.imageZoom && (g.style.maxWidth = i.imageWidth + "px")
                    } else {
                        if (a.id && (d = a.id),
                        h = b.getSmallImageUrl(a.msg, i.imageWidth),
                        j.isMobile && j.imageZoom && 0 != h.indexOf("http")) {
                            var v = new Image;
                            v.src = h,
                            u = v.width > i.imageWidth ? 'style="width:' + i.imageWidth + 'px"' : 'style="width:' + v.width + 'px"'
                        }
                        t = !0,
                        s = "<img " + (a.id ? 'id="' + a.id + '"' : "") + 'src="' + h + '" class="wkit-img" ' + u + " />"
                    }
                } else if (66 == a.type)
                    s = a.msg.customize;
                else if (2 == a.type)
                    if (j.onAudioReceived)
                        try {
                            s = j.onAudioReceived(a.msg, r, c)
                        } catch (m) {
                            s = ""
                        }
                    else
                        s = "";
                else
                    s = "";
                s.trim() && (q += i.msgTpl.render({
                    isImage: t,
                    msg: s,
                    avatar: f,
                    time: b.dateFormatter(a.time),
                    cls: e,
                    nick: !r && a.from.split(":")[1] ? a.from.split(":")[1] : ""
                }))
            }),
            p ? null : (d && (m.id = "MSG_" + d),
            b.addClass(m, "wkit-clear"),
            m.innerHTML = q,
            m)
        },
        scrollStatusChange: function(a) {
            this.isBottom = a
        },
        scrollToBottom: function(a) {
            (a || this.isBottom) && (this.UI.msgContent.scrollTop = this.UI.msgContent.scrollHeight)
        },
        imgLoadToBottom: function(a) {
            if (!this.historyPending && a) {
                var d = this
                  , e = a.getElementsByTagName("img")
                  , f = e.length;
                if (f)
                    for (var g = 0; f > g; g++)
                        b.hasClass(e[g], "wkit-avatar") || (e[g].onload = function() {
                            this.src !== c && (this.onload = null),
                            d.scrollToBottom(!0)
                        }
                        )
            }
        },
        toast: function(a, c) {
            b.toast(a, this.opts.container, (this.UI.wh && this.UI.wh.inputHeight || this.UI.inputHeight || 300) + 50, c)
        },
        destroy: function() {
            this.C.destroy(),
            this.UI.destroy()
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    var b = "https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/"
      , c = ["加油", "色情狂", "委屈", "悲泣", "飞机", "生病", "不会吧", "痛哭", "怀疑", "花痴", "偷笑", "握手", "玫瑰", "享受", "对不起", "感冒", "凄凉", "困了", "尴尬", "生气", "残花", "电话", "害羞", "流口水", "皱眉", "鼓掌", "迷惑", "忧伤", "时钟", "大笑", "邪恶", "单挑", "大哭", "隐形人", "CS", "I服了U", "欠扁", "炸弹", "惊声尖叫", "微笑", "钱", "购物", "好累", "嘘", "成交", "红唇", "招财猫", "抱抱", "好主意", "很晚了", "收邮件", "举杯庆祝", "疑问", "惊讶", "露齿笑", "天使", "呼叫", "闭嘴", "小样", "跳舞", "无奈", "查找", "大怒", "算帐", "爱慕", "再见", "恭喜发财", "强", "胜利", "财迷", "思考", "晕", "流汗", "爱心", "摇头", "背", "没钱了", "惊愕", "小二", "支付宝", "鄙视你", "吐舌头", "鬼脸", "财神", "等待", "傻笑", "学习雷锋", "心碎", "吐", "漂亮MM", "亲亲", "飞吻", "帅哥", "礼物", "无聊", "呆若木鸡", "再见", "老大", "安慰"]
      , d = [{
        title: "加油",
        img: "10",
        code: "/:012"
    }, {
        title: "色情狂",
        img: "26",
        code: "/:015"
    }, {
        title: "委屈",
        img: "47",
        code: "/:>_<"
    }, {
        title: "悲泣",
        img: "48",
        code: "/:018"
    }, {
        title: "飞机",
        img: "97",
        code: "/:plane"
    }, {
        title: "生病",
        img: "56",
        code: "/:>M<"
    }, {
        title: "不会吧",
        img: "40",
        code: "/:816"
    }, {
        title: "痛哭",
        img: "50",
        code: "/:020"
    }, {
        title: "怀疑",
        img: "33",
        code: "/:817"
    }, {
        title: "花痴",
        img: "14",
        code: "/:814"
    }, {
        title: "偷笑",
        img: "3",
        code: "/:815"
    }, {
        title: "握手",
        img: "82",
        code: "/:)-("
    }, {
        title: "玫瑰",
        img: "84",
        code: "/:-F"
    }, {
        title: "享受",
        img: "25",
        code: "/:818"
    }, {
        title: "对不起",
        img: "52",
        code: "/:819"
    }, {
        title: "感冒",
        img: "37",
        code: "/:028"
    }, {
        title: "凄凉",
        img: "43",
        code: "/:027"
    }, {
        title: "困了",
        img: "44",
        code: "/:(Zz...)"
    }, {
        title: "尴尬",
        img: "38",
        code: "/:026"
    }, {
        title: "生气",
        img: "65",
        code: "/:>W<"
    }, {
        title: "残花",
        img: "85",
        code: "/:-W"
    }, {
        title: "电话",
        img: "92",
        code: "/:~B"
    }, {
        title: "害羞",
        img: "1",
        code: "/:^$^"
    }, {
        title: "流口水",
        img: "24",
        code: "/:813"
    }, {
        title: "皱眉",
        img: "54",
        code: "/:812"
    }, {
        title: "鼓掌",
        img: "81",
        code: "/:8*8"
    }, {
        title: "迷惑",
        img: "29",
        code: "/:811"
    }, {
        title: "忧伤",
        img: "46",
        code: "/:810"
    }, {
        title: "时钟",
        img: "94",
        code: "/:clock"
    }, {
        title: "大笑",
        img: "5",
        code: "/:^O^"
    }, {
        title: "邪恶",
        img: "71",
        code: "/:036"
    }, {
        title: "单挑",
        img: "72",
        code: "/:039"
    }, {
        title: "大哭",
        img: "49",
        code: "/:>O<"
    }, {
        title: "隐形人",
        img: "74",
        code: "/:046"
    }, {
        title: "CS",
        img: "73",
        code: "/:045"
    }, {
        title: "I服了U",
        img: "51",
        code: "/:044"
    }, {
        title: "欠扁",
        img: "62",
        code: "/:043"
    }, {
        title: "炸弹",
        img: "75",
        code: "/:048"
    }, {
        title: "惊声尖叫",
        img: "76",
        code: "/:047"
    }, {
        title: "微笑",
        img: "0",
        code: "/:^_^"
    }, {
        title: "钱",
        img: "88",
        code: "/:$"
    }, {
        title: "购物",
        img: "89",
        code: "/:%"
    }, {
        title: "好累",
        img: "55",
        code: '/:"'
    }, {
        title: "嘘",
        img: "34",
        code: "/:!"
    }, {
        title: "成交",
        img: "80",
        code: "/:(OK)"
    }, {
        title: "红唇",
        img: "83",
        code: "/:lip"
    }, {
        title: "招财猫",
        img: "79",
        code: "/:052"
    }, {
        title: "抱抱",
        img: "9",
        code: "/:H"
    }, {
        title: "好主意",
        img: "20",
        code: "/:071"
    }, {
        title: "很晚了",
        img: "96",
        code: "/:C"
    }, {
        title: "收邮件",
        img: "91",
        code: "/:@"
    }, {
        title: "举杯庆祝",
        img: "93",
        code: "/:U*U"
    }, {
        title: "疑问",
        img: "30",
        code: "/:?"
    }, {
        title: "惊讶",
        img: "59",
        code: "/:069"
    }, {
        title: "露齿笑",
        img: "15",
        code: "/:^W^"
    }, {
        title: "天使",
        img: "22",
        code: "/:065"
    }, {
        title: "呼叫",
        img: "17",
        code: "/:066"
    }, {
        title: "闭嘴",
        img: "61",
        code: "/:067"
    }, {
        title: "小样",
        img: "35",
        code: "/:068"
    }, {
        title: "跳舞",
        img: "6",
        code: "/:081"
    }, {
        title: "无奈",
        img: "41",
        code: '/:\'""'
    }, {
        title: "查找",
        img: "16",
        code: "/:080"
    }, {
        title: "大怒",
        img: "64",
        code: "/:808"
    }, {
        title: "算帐",
        img: "18",
        code: "/:807"
    }, {
        title: "爱慕",
        img: "4",
        code: "/:809"
    }, {
        title: "再见",
        img: "23",
        code: "/:804"
    }, {
        title: "恭喜发财",
        img: "68",
        code: "/:803"
    }, {
        title: "强",
        img: "12",
        code: "/:b"
    }, {
        title: "胜利",
        img: "11",
        code: "/:806"
    }, {
        title: "财迷",
        img: "19",
        code: "/:805"
    }, {
        title: "思考",
        img: "28",
        code: "/:801"
    }, {
        title: "晕",
        img: "45",
        code: "/:*&*"
    }, {
        title: "流汗",
        img: "42",
        code: "/:802"
    }, {
        title: "爱心",
        img: "86",
        code: "/:Y"
    }, {
        title: "摇头",
        img: "36",
        code: "/:079"
    }, {
        title: "背",
        img: "58",
        code: "/:076"
    }, {
        title: "没钱了",
        img: "31",
        code: "/:077"
    }, {
        title: "老大",
        img: "70",
        code: "/:O=O"
    }, {
        title: "小二",
        img: "69",
        code: "/:074"
    }, {
        title: "支付宝",
        img: "98",
        code: "/:075"
    }, {
        title: "鄙视你",
        img: "63",
        code: "/:P"
    }, {
        title: "吐舌头",
        img: "2",
        code: "/:Q"
    }, {
        title: "鬼脸",
        img: "21",
        code: "/:072"
    }, {
        title: "财神",
        img: "66",
        code: "/:073"
    }, {
        title: "等待",
        img: "95",
        code: "/:R"
    }, {
        title: "傻笑",
        img: "39",
        code: "/:007"
    }, {
        title: "学习雷锋",
        img: "67",
        code: "/:008"
    }, {
        title: "心碎",
        img: "87",
        code: "/:qp"
    }, {
        title: "吐",
        img: "57",
        code: "/:>@<"
    }, {
        title: "漂亮MM",
        img: "77",
        code: "/:girl"
    }, {
        title: "亲亲",
        img: "13",
        code: "/:^x^"
    }, {
        title: "飞吻",
        img: "7",
        code: "/:087"
    }, {
        title: "帅哥",
        img: "78",
        code: "/:man"
    }, {
        title: "礼物",
        img: "90",
        code: "/:(&)"
    }, {
        title: "无聊",
        img: "32",
        code: "/:083"
    }, {
        title: "呆若木鸡",
        img: "27",
        code: "/:084"
    }, {
        title: "再见",
        img: "53",
        code: "/:085"
    }, {
        title: "惊愕",
        img: "60",
        code: "/:O"
    }, {
        title: "安慰",
        img: "8",
        code: "/:086"
    }];
    Util = a.util,
    a.Emot = {
        isShow: !1,
        isShowing: !1,
        refreshed: !1,
        init: function(a) {
            return a && a.container ? (this.isMobile = Util.isMobile(),
            this.opts = a,
            this.render(),
            this) : void 0
        },
        render: function() {
            var b = this.opts.container
              , c = this.sliceEmot();
            b.innerHTML = juicer(Tpl.emot, c),
            this.con = Util.getById("J_wkitEmotCon"),
            this.cons = this.con.getElementsByTagName("div"),
            this.tab = Util.getById("J_wkitEmotTab"),
            this.tabs = this.tab.getElementsByTagName("i"),
            this.UI = a.UI.Emot.init(this),
            this.events()
        },
        sliceEmot: function() {
            var a = 21
              , b = []
              , d = 0
              , e = 0;
            return c.forEach(function(c, f) {
                d == a && (d = 0),
                0 == d && (b[e++] = []),
                a > d && (d++,
                b[e - 1].push(c))
            }),
            b
        },
        events: function() {
            var a = this
              , b = this.opts
              , d = 0;
            b.container.onclick = function(e) {
                e = e || window.event;
                var f = e.target || e.srcElement;
                if (!(a.isMobile && a.isShowing || "SPAN" != f.tagName.toUpperCase())) {
                    var g = +new Date;
                    if (500 > g - d)
                        return;
                    d = g;
                    var h = f.getAttribute("data-index")
                      , i = c[h];
                    i && b.context && b.context.onEmotClick("[" + i + "]")
                }
            }
        },
        show: function() {
            if (!this.isShow) {
                var a = this;
                this.isShow = !0,
                this.isShowing = !0,
                Util.removeClass(this.opts.container, "wkit-hidden"),
                this.UI.scroller && this.UI.scroller.refresh(),
                setTimeout(function() {
                    a.isShowing = !1
                }, 500)
            }
        },
        hide: function() {
            this.isShow && (Util.addClass(this.opts.container, "wkit-hidden"),
            this.isShow = !1)
        },
        splitEmot: function(a) {
            return a = a.replace(/\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi, "@#[$1]@#"),
            a.split("@#")
        },
        isEmotLike: function(a) {
            return /\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi.test(a)
        },
        isEmot: function(a) {
            for (var b = a.replace("[", "").replace("]", ""), c = !1, e = 0, f = d.length; f > e; e++)
                if (d[e].title == b) {
                    c = d[e].code;
                    break
                }
            return c
        },
        htmlEncode: function(a) {
            var b, c = this, d = "";
            return a = this.splitEmot(a),
            a.forEach(function(a) {
                d += c.isEmotLike(a) && (b = c.isEmot(a)) ? b : Util.encodeHtml(a)
            }),
            d
        },
        encode: function(a) {
            var b, c = this, d = "";
            return a = this.splitEmot(a),
            a.forEach(function(a) {
                d += c.isEmotLike(a) && (b = c.isEmot(a)) ? b : a
            }),
            d
        },
        decode: function() {
            var a = ""
              , c = d.length;
            return d.forEach(function(b) {
                a += "|" + b.code.substring(2)
            }),
            a = a.substring(1),
            a = a.replace(/([\^?()\.\*\$])/g, "\\$1"),
            a = new RegExp("/:(" + a + ")","g"),
            function(e) {
                return e && (e = e.replace(a, function(a) {
                    for (var e = !1, f = "", g = 0; c > g; g++)
                        if (d[g].code == a) {
                            e = d[g].img,
                            f = d[g].title;
                            break
                        }
                    if (e) {
                        var h = parseInt(e) + 1;
                        h = 10 > h ? "0" + h : h,
                        h = "s0" + h + ".png",
                        a = '<img class="wkit-emot" src="' + b + h + '" alt="' + f + '" />'
                    }
                    return a
                })),
                e
            }
        }(),
        destroy: function() {
            this.UI.destroy(),
            this.opts.container.onclick = null
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    a.UI || (a.UI = {});
    var b = a.util;
    a.UI.Window = {
        render: function(a) {
            this.opts = a;
            var c = this.getWrapWH()
              , d = a.container
              , e = document.createElement("div")
              , f = this.getWrapSize(c)
              , g = juicer(Tpl.window, f)
              , h = "wkit-theme-default";
            return a.themeBgColor && (this.setCustomStyle(),
            a.theme = "",
            h = "wkit-theme-custom"),
            a.theme && (h = "wkit-theme-" + a.theme),
            e.id = "wkit-content",
            b.addClass(e, h).css(d, {
                overflow: "hidden"
            }),
            e.innerHTML = g,
            d.appendChild(e),
            this.innerCon = e,
            this.pluginWrap = b.getById("J_wkitPluginWrap"),
            this.chatWrap = b.getById("J_wkitChatWrap"),
            this.customWrap = b.getById("J_wkitCustomWrap"),
            a.customUrl && b.css(this.chatWrap, {
                "border-radius": "4px 0 0 4px"
            }),
            a.isFullScreen && (window.addEventListener ? window.addEventListener("resize", this.resizeHandler, !1) : window.attachEvent && window.attachEvent("onresize", this.resizeHandler),
            b.css(e, {
                margin: "4px"
            })),
            this
        },
        setCustomStyle: function() {
            var a = this.opts
              , c = juicer(Tpl.style, {
                tbgColor: a.themeBgColor,
                tColor: a.themeColor || "#fff",
                mbgColor: a.msgBgColor || a.themeBgColor,
                mColor: a.msgColor || a.themeColor || "#4a4a4a"
            });
            b.addStyle(a.container, c)
        },
        reset: function(a) {
            var c = this.getWrapWH(a || {})
              , d = this.getWrapSize(c);
            b.css(this.pluginWrap, {
                width: d.pluginWrapWidth + "px",
                height: d.pluginWrapHeight + "px",
                "margin-right": d.pluginWrapMarginRight + "px"
            }),
            b.css(this.chatWrap, {
                width: d.chatWrapWidth + "px",
                height: d.chatWrapHeight + "px"
            }),
            b.css(this.customWrap, {
                width: d.customWrapWidth + "px",
                height: d.customWrapHeight + "px"
            })
        },
        getWrapSize: function(a) {
            return this.wh = a,
            {
                pluginWrapWidth: a.left[0],
                pluginWrapHeight: a.left[1],
                chatWrapWidth: a.middle[0],
                chatWrapHeight: a.middle[1],
                customWrapWidth: a.right[0],
                customWrapHeight: a.right[1],
                pluginWrapMarginRight: 5
            }
        },
        getWrapWH: function(a) {
            var b = a && a.width ? a : this.opts
              , c = this.opts.container
              , d = 1
              , e = 5
              , f = 150
              , g = 150;
            return !a || a.width && a.height || (this.opts.isFullScreen ? (b.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            b.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) : (b.width = c.clientWidth,
            b.height = c.clientHeight)),
            b.width && b.height || (b.width = c.clientWidth,
            b.height = c.clientHeight),
            this.opts.isFullScreen && (b.width -= 8,
            b.height -= 8),
            b.width -= e,
            b.pluginUrl || b.customUrl ? b.pluginUrl && !b.customUrl ? {
                left: [f, b.height],
                middle: [b.width - f - 2 * d, b.height - 2 * d],
                right: [0, 0]
            } : b.customUrl && !b.pluginUrl ? (b.width += e,
            {
                left: [0, 0],
                middle: [b.width - g - 2 * d, b.height - 2 * d],
                right: [g, b.height]
            }) : {
                left: [f, b.height],
                middle: [b.width - f - g - 2 * d, b.height - 2 * d],
                right: [g, b.height]
            } : (b.width += e,
            {
                left: [0, 0],
                middle: [b.width - 2 * d, b.height - 2 * d],
                right: [0, 0]
            })
        },
        resize: function(a) {
            return this.reset(a),
            this
        },
        resizeHandler: function() {
            b.throttle(function() {
                a.resize()
            }, 1e3)()
        },
        destroy: function() {
            this.opts.isFullScreen && (window.addEventListener ? window.removeEventListener("resize", this.resizeHandler, !1) : window.attachEvent && window.detachEvent("onresize", this.resizeHandler)),
            this.innerCon.parentNode.removeChild(this.innerCon)
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    a.UI || (a.UI = {});
    var b = 34
      , c = 22
      , d = a.util;
    a.UI.Plugin = {
        render: function(a) {
            this.opts = a;
            var b = this.getSetting()
              , c = juicer(Tpl.plugin, b);
            a.container.innerHTML = c,
            this.userInfoWrap = d.getById("J_wkitUserInfo"),
            this.logoWrap = d.getById("J_wkitLogo"),
            this.pluginFrameWrap = d.getById("J_wkitPluginFrameWrap"),
            this.pluginFrame = d.getById("J_wkitPluginFrame"),
            this.reset()
        },
        reset: function(a) {
            var c = a ? this.getWH(a) : this.wh;
            this.wh = c,
            d.css(this.userInfoWrap, {
                width: c.userInfoWidth + "px",
                height: c.userInfoHeight + "px",
                overflow: "hidden"
            }),
            d.css(this.logoWrap, {
                height: b + "px",
                "line-height": b + "px"
            }),
            d.css(this.pluginFrameWrap, {
                width: c.pluginWidth + "px",
                height: c.pluginHeight + "px",
                "margin-top": c.pluginMarginTop + "px"
            }),
            d.css(this.pluginFrame, {
                width: c.pluginWidth + "px",
                height: c.pluginHeight + "px"
            })
        },
        getSetting: function() {
            var a = this.opts
              , d = ""
              , e = "";
            return this.wh = this.getWH(),
            a.logo ? (d = "height:" + c + "px;width:" + c + "px;margin:" + (b - c) / 2 + "px 0 0 5px;float:left;",
            e = "width:" + (this.wh.userInfoWidth - c - 10) + "px;margin:5px 0 0 5px;float:left;") : e = "width:" + (this.wh.userInfoWidth - 10) + "px;text-align:center;margin:0 5px;",
            {
                logo: a.logo,
                logoStyle: d,
                title: a.title || a.touid,
                titleStyle: e,
                avatar: a.toAvatar,
                pluginUrl: a.pluginUrl
            }
        },
        getWH: function(a) {
            var b = a || this.opts
              , c = b.iWidth
              , d = b.iHeight
              , e = 1
              , f = 170
              , g = 5;
            return {
                userInfoWidth: c - 2 * e,
                userInfoHeight: f - 2 * e,
                pluginWidth: c - 2 * e,
                pluginHeight: d - f - 2 * e - g,
                pluginMarginTop: g
            }
        },
        resize: function(a) {
            this.opts && this.opts.pluginUrl && this.reset(a)
        },
        destroy: function() {}
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    a.UI || (a.UI = {});
    var b = a.util;
    a.UI.Chat = {
        isBottom: !0,
        isScrollOn: !0,
        isSupportImgUploader: function() {
            return !!document.createElement("canvas").getContext
        },
        render: function(a) {
            this.opts = a,
            this.hasUploader = this.isSupportImgUploader() && a.imgUploader;
            var c = a.container
              , d = {
                uploader: this.hasUploader,
                placeholder: a.placeholder,
                sendBtn: a.sendBtn,
                sendBtnText: a.sendBtnText
            };
            return c.innerHTML = juicer(Tpl.chat, d),
            this.msgContent = b.getById("J_wkitMsgContent"),
            this.msgInputWrap = b.getById("J_wkitMsgInputWrap"),
            this.softInputContent = b.getById("J_wkitSoftInput"),
            this.inputContent = b.getById("J_wkitMsgInput"),
            this.textarea = b.getById("J_wkitTextarea"),
            this.hasUploader && (this.imgUploader = b.getById("J_wkitImgUploader")),
            this.emotContent = b.getById("J_emotContainer"),
            this.imageZoomWidth = a.imageZoomWidth,
            this.poweredBy(this.inputContent),
            this.reset(),
            this.initEmot(),
            this.events(),
            this
        },
        events: function() {
            var a = this
              , c = this.opts.context;
            this.opts.sendBtn && (b.getById("J_wkitMsgSendBtn").onclick = function() {
                var b = a.textarea.value;
                if (b.trim()) {
                    var d = a.Emot.encode(b);
                    c.sendMsg({
                        msg: d,
                        msgType: 0,
                        val: b
                    })
                }
            }
            ),
            this.textarea.onkeydown = function(b) {
                if (b = b || window.event,
                13 == b.keyCode) {
                    var d = this.value;
                    if (!d.trim())
                        return;
                    var e = a.Emot.encode(d);
                    c.sendMsg({
                        msg: e,
                        msgType: 0,
                        val: d
                    }),
                    b.preventDefault ? b.preventDefault() : b.returnValue = !1
                }
            }
            ,
            this.msgContent.onscroll = function() {
                if (a.isScrollOn) {
                    var b = this.scrollTop
                      , d = Math.abs(this.scrollHeight - b - a.wh.contentHeight) <= 1;
                    a.isBottom !== d && (a.isBottom = d,
                    c.scrollStatusChange(d)),
                    100 >= b && c.history()
                }
            }
            ,
            this.opts.container.onclick = function(c) {
                c = c || window.event;
                var d = c.target || c.srcElement;
                if (b.hasClass(d, "wkit-emot-trigger")) {
                    if (a.toggleEmot(),
                    !c.stopPropagation)
                        return c.cancelBubble = !0,
                        !1;
                    c.stopPropagation()
                }
            }
            ,
            this.hasUploader && (this.imgUploader.onchange = function() {
                c.uploadImg({
                    type: 0,
                    target: this
                })
            }
            ),
            this.Emot && (window.addEventListener ? this.opts.wrap.addEventListener("click", this.emotToggleHandler, !1) : this.opts.wrap.attachEvent("onclick", this.emotToggleHandler))
        },
        emotToggleHandler: function() {
            a.UI.Chat.Emot.isShow && a.UI.Chat.Emot.hide()
        },
        initEmot: function() {
            this.Emot = a.Emot.init({
                container: this.emotContent,
                context: this
            })
        },
        toggleEmot: function() {
            this.Emot.isShow ? this.Emot.hide() : this.Emot.show()
        },
        onEmotClick: function(a) {
            this.textarea.value += a,
            this.textarea.focus()
        },
        reset: function(a) {
            var c = this.wh = this.getWH(a);
            b.css(this.msgContent, {
                width: c.contentWidth + "px",
                height: c.contentHeight + "px"
            }),
            b.css(this.msgInputWrap, {
                width: c.inputWrapWidth + "px",
                height: c.inputWrapHeight + "px"
            }),
            b.css(this.softInputContent, {
                width: c.softInputWidth + "px",
                height: c.softInputHeight + "px"
            }),
            b.css(this.inputContent, {
                width: c.inputWidth + "px",
                height: c.inputHeight + "px"
            }),
            b.css(this.textarea, {
                width: c.textareaWidth + "px",
                height: c.textareaHeight + "px",
                padding: c.textareaPadding + "px"
            })
        },
        getWH: function(a) {
            var b = a || this.opts
              , c = b.iWidth
              , d = b.iHeight
              , e = 1
              , f = 25
              , g = 4;
            return {
                contentWidth: c,
                contentHeight: .76 * d - e,
                inputWrapWidth: c,
                inputWrapHeight: .24 * d - e,
                softInputWidth: c,
                softInputHeight: f,
                inputWidth: c - 2 * e,
                inputHeight: .24 * d - f - e,
                textareaWidth: c - 2 * g,
                textareaHeight: .24 * d - f - 2 * g - e,
                textareaPadding: g
            }
        },
        poweredBy: function(a) {
            var b = document.createElement("div");
            b.innerHTML = Tpl.poweredBy,
            b.className = "wkit-powered-by",
            a.appendChild(b)
        },
        resize: function(a) {
            return this.reset(a),
            this.opts.context.scrollToBottom && this.opts.context.scrollToBottom(),
            this
        },
        setScrollStatus: function(a) {
            this.isScrollOn = a
        },
        destroy: function() {
            this.Emot.destroy(),
            this.textarea.onkeydown = null,
            this.msgContent.onscroll = null,
            this.opts.container.onclick = null,
            this.hasUploader && (this.imgUploader.onchange = null),
            this.Emot && (window.addEventListener ? this.opts.wrap.removeEventListener("click", this.emotToggleHandler) : this.opts.wrap.detachEvent("onclick", this.emotToggleHandler))
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    var b = a.util;
    a.UI.Custom = {
        init: function(a) {
            a && a.customUrl && (this.opts = a,
            this.render())
        },
        render: function() {
            var a = this.opts
              , c = '<iframe id="J_wkitCustomFrame" src="' + a.customUrl + '" frameborder="0"></iframe>';
            a.container.innerHTML = c,
            this.customFrame = b.getById("J_wkitCustomFrame"),
            this.reset()
        },
        reset: function(a) {
            var c = a || this.opts
              , d = 1
              , e = c.iWidth - d
              , f = c.iHeight - 2 * d;
            b.css(this.opts.container, {
                width: e + "px",
                height: f + "px"
            }),
            b.css(this.customFrame, {
                width: e + "px",
                height: f + "px"
            })
        },
        resize: function(a) {
            this.opts && this.opts.customUrl && this.reset(a)
        },
        destroy: function() {}
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    var b = a.util;
    a.UI || (a.UI = {}),
    a.UI.Emot = {
        index: 0,
        init: function(a) {
            return this.Emot = a,
            this.events(),
            this
        },
        events: function() {
            var a = this
              , c = this.Emot;
            b.css(c.cons[this.index], {
                display: "block"
            }),
            c.tab.onmouseover = function(b) {
                b = b || window.event;
                var c = b.target || b.srcElement;
                if ("I" == c.tagName.toUpperCase()) {
                    var d = c.getAttribute("data-index");
                    if (a.index == d)
                        return;
                    a.setTabActive(c, d),
                    a.index = d
                }
            }
        },
        setTabActive: function(a, c) {
            b.addClass(a, "wkit-active"),
            b.removeClass(this.Emot.tabs[this.index], "wkit-active"),
            b.css(this.Emot.cons[c], {
                display: "block"
            }),
            b.css(this.Emot.cons[this.index], {
                display: "none"
            })
        },
        destroy: function() {
            this.Emot.tab.onmouseover = null
        }
    }
}(window.WKIT || (window.WKIT = {})),
function(a) {
    var b = document
      , c = b.body
      , d = b.documentElement
      , e = a.util
      , f = "https://" + (window.__DEBUG ? "g-assets.daily.taobao.net" : "g.alicdn.com") + "/aliww/h5.openim.kit/" + a.version + "/styles/pckit" + (window.__DEBUG ? ".debug" : "") + ".css";
    a.start = function(b) {
        b.container || (b.container = c,
        b.width = window.innerWidth || d.clientWidth || c.clientWidth,
        b.height = window.innerHeight || d.clientHeight || c.clientHeight),
        "BODY" === b.container.tagName && (b.isFullScreen = !0,
        e.css(b.container, {
            margin: "0px",
            padding: "0px",
            background: "#efefef"
        })),
        e.loadStyle(f, function() {
            var c = a.UI.Window.render(b)
              , d = e.merge({}, b)
              , f = e.merge({}, b)
              , g = e.merge({}, b);
            b.onKitStart && b.onKitStart(),
            a.Plugin.init(e.merge(d, {
                container: c.pluginWrap,
                iWidth: c.wh.left[0],
                iHeight: c.wh.left[1]
            })),
            a.Chat.init(e.merge(f, {
                wrap: b.container,
                container: c.chatWrap,
                iWidth: c.wh.middle[0],
                iHeight: c.wh.middle[1]
            })),
            a.UI.Custom.init(e.merge(g, {
                container: c.customWrap,
                iWidth: c.wh.right[0],
                iHeight: c.wh.right[1]
            }))
        }, this)
    }
}(window.WKIT || (window.WKIT = {}));
