var isLs = window.localStorage ? 1 : 0;
var shibie = 1;

function setLocVal(key, value) {
    try {
        window.localStorage[key] = value;
        shibie = 1;
    } catch (err) {
        shibie = 2;
        clearLocVal(key);
        document.cookie = key + "=" + escape(value) + ";";
    }
}

function getLocVal(key) {
    try {
        window.localStorage["1"] = 1;
        var value = window.localStorage[key];
        return value;
    } catch (e) {
        c_start = document.cookie.indexOf(key + "=");
        if (c_start != -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

function clearLocVal(key) {
    try {
        if (key)
            window.localStorage.removeItem(key);
        else
            window.localStorage.clear();
    } catch (e) {
        if (key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(key);
            if (cval != null) {
                document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
            }
        } else {
            var keys = document.cookie.match(/[^=;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i >= 0; i--) {
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toGMTString();
                }
            }
        }
    }
}

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";";
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    } else {
        return null;
    }
}
