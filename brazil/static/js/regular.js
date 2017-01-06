/*
 身份证 /^[1-9][0-9]{5}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))[0-9]{3}([0-9]|[xX])$/

 护照 /^(G\d{8})|(E\d{8})$/

 军官证或士兵证 /(^[\u0391-\uFFE5]{3,5}\d{6,12})$/

 港澳回归证 和 台胞证/(^H\d{10}$)|(^M\d{10}$)|(^\d{10}$)/

 出生证 /^[a-zA-Z0-9]{5,21}$/

 户口本 /^[a-zA-Z0-9]{3,21}$/

 */

var idCardNoUtil = {
    /*省,直辖市代码表*/
    provinceAndCitys: {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
        45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    },

    /*每位加权因子*/
    powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],

    /*第18位校检码*/
    parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],

    /*性别*/
    genders: {male: "男", female: "女"},

    /*校验地址码*/
    checkAddressCode: function (addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },

    /*校验日期码*/
    checkBirthDayCode: function (birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;//生日不能大于当前日期
        } else if (( xdata.getFullYear() == yyyy ) && ( xdata.getMonth() == mm - 1 ) && ( xdata.getDate() == dd )) {
            return true;
        } else {
            return false;
        }
    },

    /*计算校检码*/
    getParityBit: function (idCardNo) {
        var id17 = idCardNo.substring(0, 17);
        /*加权 */
        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }
        /*取模*/
        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    /*验证校检码*/
    checkParityBit: function (idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    /*校验15位或18位的身份证号码*/
    checkIdCardNo: function (idCardNo) {
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check) return false;
        //判断长度为15位或18位
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
            return false;
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function (idCardNo) {
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        //校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function (idCardNo) {
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        //校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) return false;
        //验证校检码
        return idCardNoUtil.checkParityBit(idCardNo);
    },

    formateDateCN: function (day) {
        var yyyy = day.substring(0, 4);
        var mm = day.substring(4, 6);
        var dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    },

    //获取信息
    getIdCardInfo: function (idCardNo) {
        var idCardInfo = {
            gender: "",   //性别
            birthday: "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }

        }
        return idCardInfo;
    },

    /*18位转15位*/
    getId15: function (idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },

    /*15位转18位*/
    getId18: function (idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};


// 港澳台胞验证
function isQid(obj) {
    var that = {};
    that.result = "n";

    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        var reg = /^(H|M)?\d{10}$/;
        if (controlObj.length > 11 || !reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }

    }
    return that;
}


// 护照验证
function isHid(obj) {
    var that = {};
    that.result = "n";

    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        var reg = /^(G|E)\d{8}$/;
        if (!reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }

    }
    return that;
}


// 军官证士兵证验证
function isJid(obj) {
    var that = {};
    that.result = "n";

    var controlObj = $.trim(obj).replace("号","");
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {

        //var reg = /^[南|北|沈|兰|成|济|广|参|政|后|装|海|空]字第(\d{6,8})/;

        var reg = /(^([\u4E00-\u9FA5\uF900-\uFA2D]{2,5})?\d{6,12})$/;
        if (!reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }

    }
    return that;
}


// 姓名验证
function isNotChineseOrNull(obj) {
    var that = {};
    that.result = "n";

    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else if (controlObj.length < 2 || controlObj.length > 50) {
        that.result = "l";
    } else {
        var engreg = /^[a-zA-Z]+$/;
        if (engreg.test(controlObj)&&controlObj.length < 4) {
            that.result = "l";
        }else{
            var reg = /^([A-z\u4E00-\u9FA5\uF900-\uFA2D]+[.|·]?)+([A-z\u4E00-\u9FA5\uF900-\uFA2D]+)$/;
            if (!reg.test(controlObj)) {
                that.result = "x";
            } else {
                that.result = "t";
            }
        }
    }
    return that;
}
// Email验证 
function isEmail(obj) {
    var that = {};
    that.result = "n";
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }

    }
    return that;
}
// mobile验证
function isMobile(obj) {
    var that = {};
    that.result = "n";
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        var reg = /^(13|15|14|17|18)\d{9}$/;
        if (!reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }

    }
    return that;
}

// age验证
function isAgeOK(obj) {
    var that = {};
    that.result = "n";
    var controlObj = $.trim(obj);
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var y = controlObj.split('-')[0];
    var m = controlObj.split('-')[1];
    var d = controlObj.split('-')[2];
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        if ((year - y) > 18 && (year - y) < 80) {
            that.result = "t";
        } else if ((year - y) == 18) {
            if (month - m > 0) {
                that.result = "t";
            } else if (month - m == 0) {
                if (day - d > 0) {
                    that.result = "t";
                } else {
                    that.result = "l";
                }
            } else {
                that.result = "l";
            }
        } else if ((year - y) == 80) {
            if (month - m < 0) {
                that.result = "t";
            } else if (month - m == 0) {
                if (day - d < 0) {
                    that.result = "t";
                } else {
                    that.result = "l";
                }
            } else {
                that.result = "l";
            }
        } else {
            that.result = "l";
        }
    }
    return that;
}


//检查字符串只有字母、数字。下划线组成
function isNumberOr_Letter(obj) {
    var that = {};
    that.result = "n";
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        that.result = "n";
    } else {
        var reg = "^[0-9a-zA-Z\_]+$";
        if (!reg.test(controlObj)) {
            that.result = "x";
        } else {
            that.result = "t";
        }
    }
    return that;
}

/*提示框*/
function al(t, t2, cb) {
    var a = document.createElement("div");
    a.id = "al_box";
    a.style.width = "100%";
    a.style.height = $(document).height() + "px";
    // a.style.height = "101%";
    a.style.backgroundColor = "rgba(0,0,0,.5)";
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.zIndex = 999;
    var b = document.createElement("div");
    b.className = "al_boxa";
    b.style.position = "absolute";
    b.style.width = "70%";
    //b.style.height = "10em";
    b.style.backgroundColor = "#ffffff";
    b.style.borderRadius = "6px";
    b.style.boxShadow = "0 1px 3px";
    b.style.top = ($(window).scrollTop() + $(window).height() / 2) + "px";
    // b.style.top = "50%";
    b.style.left = "50%";
    b.style.marginTop = "-100px";
    b.style.marginLeft = -($(window).width() * 0.7 / 2) + "px";
    var c = document.createElement("div");
    c.style.width = "100%";
    c.style.height = "70%";
    c.style.padding = "1em";
    c.style.boxSizing = "border-box";
    //c.style.borderBottom = "1px solid #d2d2d2";   
    c.style.color = "#333333";
    c.style.textAlign = "center";
    c.innerHTML = t;
    var d = document.createElement("button");
    d.style.display = "block";
    d.style.width = "70%";
    d.style.height = "2em";
    d.style.color = "#44A226";
    d.style.backgroundColor = "#ffffff";
    d.style.border = "1px solid #d2d2d2";
    d.style.borderRadius = "6px";
    d.style.margin = ".5em auto";
    d.style.fontWeight = "bold";
    d.innerHTML = t2 || "确定";
    $(d).on("click", function () {

        $('html').css("overflow-y", "auto");
        $(a).remove();
        if (typeof(cb) == "function") {
            cb();
        } else if (typeof(cb) == "string") {
            alert(cb);
        } else {
            console.log(false);
            return false;
        }
        ;
    });
    $(a).on("click", function (e) {
        var x = $(this).attr("id");
        var y = e.target.id;
        if (x === y) {
            $('html').css("overflow-y", "auto");
            $(a).remove();
        }
        ;
    });
    $(b).append(c).append(d);
    $(a).append(b);
    $('html').css("overflow-y", "hidden").append(a);
}


/* 错误提示框 */
function el(text, obj, cb) {
    if (window.elFlag !== 1) {
        window.elFlag = 1;
        var o = null, l = null, t = null;
        var b = document.createElement("div");
        b.className = "al_boxa";
        b.style.position = "absolute";
        b.style.width = "70%";
        // b.style.height = "1.5em";
        b.style.backgroundColor = "#ffffff";
        b.style.backgroundColor = "rgba(0,0,0,.8)";
        b.style.border = "1px solid #d2d2d2";
        b.style.borderRadius = "6px";
        b.style.boxShadow = "0 1px 3px";
        b.style.zIndex = 999;
        b.style.padding = "20px";
        b.style.textAlign = "center";
        b.style.color = "#fff";
        if (typeof (obj) == "object") {
            o = $(obj);
            l = o.offset().left;
            t = o.offset().top + o.height() / 2;
            b.style.top = t + "px";
            b.style.left = l + "px";
            b.style.width = o.width() + "px";
        } else {
            o = $(window);
            b.style.top = (o.scrollTop() + o.height() / 2) + "px";
            b.style.left = "50%";
            b.style.marginTop = "-100px";
            b.style.marginLeft = -(o.width() * 0.7 / 2) + "px";
        }
        ;
        b.innerHTML = text;
        $('body').append(b);
        if (typeof (cb) == "function") {
            cb();
        } else if (typeof (cb) == "string") {
            alert(cb);
        } else {
            console.log(false);
            $(b).fadeOut(3000, function () {
                window.elFlag = null;
                $(b).remove();
            });
            return false;
        }
        ;
    }
}


//获取url参数
function getParameter(param) {
    var query = window.location.search;//获取URL地址中？后的所有字符  
    var iLen = param.length;//获取你的参数名称长度  
    var iStart = query.indexOf(param);//获取你该参数名称的其实索引  
    if (iStart == -1)//-1为没有该参数  
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);//获取第二个参数的其实索引  
    if (iEnd == -1)//只有一个参数  
        return query.substring(iStart);//获取单个参数的参数值
    return query.substring(iStart, iEnd);//获取第二个参数的值  
}
// 写入cookie信息
function setCookie(name, value, hour) {
    var exp = new Date();
    exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires="
        + exp.toGMTString() + "; path=/";
}

// 获取cookie信息
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length))
        }
    }
    return null
}

// 获取location信息
function LocaGS(name, val) {
    if (val) {
        localStorage[name] = val;
    } else {
        if (localStorage[name]) {
            return localStorage[name];
        } else {
            return "";
        }
    }
    ;

}

// 获取Session信息
function SessGS(name, val) {
    if (val) {
        sessionStorage[name] = val;
        return name + ' save OK!'
    } else {
        if (sessionStorage[name]) {
            return sessionStorage[name];
        } else {
            return "";
        }
    }
    ;

}


/*
 数据保存
 obj:数据对象{a:av,b:bv,c:cv}
 ns:存储时的名前缀'ts_'
 */

function saveData(obj, ns) {
    var t = ns || "";
    for (var x in obj) {
        var y = t + x;
        SessGS(y, obj[x]);
    }
}

/* 数据提取
 arr:数据名数组 ['a','b','c']
 ns:数据名前缀 'ts_'
 返回
 obj:数据对象{a:av,b:bv,c:cv}
 */

function getData(arr, ns) {
    var t = ns || "";
    var obj = {};
    for (var x in arr) {
        var y = t + arr[x];
        obj[arr[x]] = SessGS(y);
    }
    return obj;
}


function tojson(str) {
    return (new Function("return " + str))();
}

