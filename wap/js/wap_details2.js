var server_url = "http://" + location.host;
var returnMessageObj = {
    details: {}
};

var planCacheMap = [];
var planFactor = {};
planFactor.toString = function() {
    var str = "";
    for (var key in this) {
        if (key != "toString") {
            str += this[key];
        }
    }
    return str;
}

var applicationId = "12345";
var applicationToken = "";
var platform = "wap";
var channelId = getChannelId();
var liabilityContents = [];
var insuredMinAge = "";
var insuredMaxAge = "";
var productName = "";
var productId = getProductId() || "";

var isCalc = false;
var calcObj = {};
var receivePlanLiabilityList;
var calcPrice;

$.ajax({
    url: server_url + "/hera_insure/api/insure/v2/application/",
    type: "post",
    dataType: "json"
}).done(function(data) {
    if (data.code == "0") {
        applicationId = data.data.applicationId;
        applicationToken = data.data.applicationToken;
    }
}).fail(function() {

});

$(function() {
    productName = $(".productName span").text();
    isCalc = $(".wapCalculate").length > 0;
    isCalc && initCalculateInfo();
    smq2({
        "event": "投保流程_测算页",
        "subType": "财险_" + productName
    });

    clearLocalData();
    returnMessageInit();
    planCacheMapInit();
    pageEventInit();
    pageControl();
});

function initCalculateInfo() {
    initCalculateComponent();
    initCalculateObj();
    calculate();
}

function initCalculateComponent() {
    $(".premiumFactor").each(function(index, el) {
        var premiumDataType = $(el).attr("premiumDataType");
        if (premiumDataType == "date") {
            initDateComponent(el)
        } else if (premiumDataType == "area") {
            initAreaComponent(el)
        }
    });
}

function initDateComponent(ent) {
    var trigger = $(ent).find("input")[0];
    var selectDate = new MobileSelectDate();
    selectDate.init({
        trigger: trigger,
        value: "1990-01-01"
    });
}

function initAreaComponent(ent) {

}

function loadJSFile(filename, fn) {
    var jsfile = document.createElement('script');
    jsfile.setAttribute("type", "text/javascript");
    jsfile.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(jsfile);
    jsfile.onload = function() {
        fn && fn();
    }
}

function initCalculateObj() {
    calcObj.age = $(".insureAge input").first().val();
    var period = getPeriod($(".insurePeriod input").first().val());
    calcObj.insurePeriod = period.insurePeriod;
    calcObj.periodUnit = period.periodUnit;

    var $plan = $(".wapPlan").first();
    calcObj.planId = $plan.attr("planId");
    calcObj.planLiabilityList = [];

    $plan.find(".wapLiability").each(function(index, el) {
        var liabilityId = $(el).attr("liabilityId");
        var amount = getAmount($(el).find(".liabilityAmount").text());
        calcObj.planLiabilityList.push({
            liabilityId: liabilityId,
            amount: amount
        });
    });

    //写死的部分
    calcObj.gender = "";
    calcObj.buyNumber = "1";
    calcObj.familytype = "";
    calcObj.cardcode = "";
}

function getAmount(amount) {
    var data = parseInt(amount);
    if (amount.indexOf("万") > -1) {
        data = data * 10000;
    }
    return data;
}

function calculatePremium() {
    return;

    $.ajax({
        url: server_url + "/hera_insure/api/insure/v2/productMetadata/" + productId + "/wap/calculator",
        type: "post",
        dataType: "json",
        data: JSON.stringify(calcObj)
    }).done(function(result) {
        if (result.code == "0") {
            calcPrice = result.data.sumPremium;
            $(".productPrice").html(calcPrice);
            $(".priceData").html("￥" + calcPrice);
            receivePlanLiabilityList = result.data.planLiabilityList;
        }
    }).fail(function() {
        alert("网络繁忙，测算失败！");
    });
}

function getPeriod(periodStr) {
    var period = {};
    period.insurePeriod = parseInt(periodStr);

    if (periodStr.indexOf("年") > -1) {
        period.periodUnit = "Y";
    } else if (periodStr.indexOf("天") > -1) {
        period.periodUnit = "D";
    }

    return period;
}

function pageEventInit() {
    $(".wapPlanName").click(function() {
        $(".wapPlanName").removeClass("active");
        $(this).addClass("active");
        $(".priceName").html($(this).html() + "：");

        planFactor.name = $(this).attr("planNameIndex");

        smq1("投保流程_测算页", "套餐选择");
        smq2({
            "event": "套餐选择",
            "subType": "财险_" + productName
        });

        showPlan();
        isCalc && updateCalculatePlan();
    });

    $(".insureAge input").change(function(event) {
        if (isCalc) {
            updateCalculateAge($(this));
        } else {
            planFactor.age = $(this).parent().attr("factorIndex");
            showPlan();
        }

        var ageStr = $(this).next().text();
        if (ageStr) {
            ageStr = ageStr.split("-");
            insuredMinAge = ageStr[0];
            insuredMaxAge = ageStr[1];
        }
    }).first().attr("checked", true);

    if ($(".insureAge").length) {
        var ageStr = $(".insureAge input").first().next().text();
        if (ageStr) {
            ageStr = ageStr.split("-");
            insuredMinAge = ageStr[0];
            insuredMaxAge = ageStr[1];
        }
    }

    $(".insurePeriod input").change(function(event) {
        if (isCalc) {

        } else {
            planFactor.period = $(this).parent().attr("factorIndex");
            showPlan();
        }

        var period = $(this).next().text();
        if (returnMessageObj.details.days != undefined) {
            returnMessageObj.details.days = parseInt(period);
        }
    }).first().attr("checked", true);

    if ($(".insurePeriod").length) {
        var period = $(".insurePeriod input").first().next().text();
        if (period && returnMessageObj.details.days != undefined) {
            returnMessageObj.details.days = parseInt(period);
        }
    }

    $(".wapLiability").click(showLiabilityContent);
    $(".liabilityBtnArea").click(hideLiabilityContent);

    $(".wapPlanName:first").click();

    $(".payBtn").click(function() {
        try {
            sessionStorage.setItem("productId", productId);
        } catch (e) {
            alertbox("无痕浏览模式暂时无法投保，更改成非无痕浏览模式立享好保障吧！");
            return false;
        }

        smq1("投保流程_测算页", "立即投保");
        smq2({
            "event": "立即投保",
            "subType": "财险_" + productName
        });

        setLocVal("productId", productId);
        setLocVal("productName", productName);
        setLocVal("applicationId", applicationId);
        setLocVal("applicationToken", applicationToken);
        setLocVal("price", returnMessageObj.details.planPrice);
        if (returnMessageObj.details.days) {
            setLocVal("insurePeriod", returnMessageObj.details.days);
        }

        var minAge = 18;
        if ($(".minAge").length) {
            minAge = $(".minAge").attr("age");
            if (minAge == "") {
                minAge = 18;
            }
        }

        var maxAge = 65;
        if ($(".maxAge").length) {
            maxAge = $(".maxAge").attr("age");
            if (maxAge == "") {
                maxAge = 65;
            }
        }
        setLocVal("minAge", minAge);
        setLocVal("maxAge", maxAge);

        setLocVal("insuredMinAge", insuredMinAge);
        setLocVal("insuredMaxAge", insuredMaxAge);

        returnMessageObj.platform = platform;
        returnMessageObj.channelId = channelId;
        returnMessageObj.seedId = getQueryString("seedId");
        returnMessageObj.seedType = getQueryString("seedType");
        returnMessageObj.productId = productId;
        returnMessageObj.applicationId = applicationId;
        returnMessageObj.applicationToken = applicationToken;
        returnMessageObj.processHandler = "property";

        var member = getLocVal("yonghuxinxi");
        if (member) {
            member = JSON.parse(member);
        }

        var sid = getLocVal("memberid");
        var token = getLocVal("mfpd_sign");

        if (!sid && member) {
            sid = member.member_sid;
        }
        if (!token && member) {
            token = member.token;
        }

        if (sid && token) {
            returnMessageObj.memberId = sid;
            returnMessageObj.memberToken = token;
        }

        if (isCalc) {
            calcObj.startDate = getStartInsureDate();
            calcObj.planPrice = calcPrice;
            calcObj.planLiabilityList = receivePlanLiabilityList;
            returnMessageObj.details = calcObj;
            setLocVal("price", calcPrice);
        }

        //缓存保障责任，在支付的时候回显
        setLocVal("liabilityContents", JSON.stringify({
            "liabilityContents": liabilityContents
        }));

        $.ajax({
            url: server_url + "/hera_insure/api/insure/v2/application/" + applicationId + "/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(returnMessageObj)
        }).done(function(data) {
            if (data.code == "0") {
                location.href = server_url + "/product/wap/insure/orderInfo1.html";
            } else {
                alert(data.message);
            }
        }).fail(function() {
            alert("网络繁忙，购买失败！");
        });
    });

    $(".wapProductDesc").click(function(event) {
        var url = $(".hideUrl").text();
        if (url) {
            location.href = server_url + $(".hideUrl").text();
        }
    });

    $(".service").click(function(event) {
        location.href = server_url + "/middleService.html";
    });

    $(".alertBoxBtn").click(function() {
        $("#alertBoxMasker").animate({
            "opacity": "0"
        }, 400, function() {
            $("#alertBoxMasker").hide();
        });
        $("body").removeClass("lockBody");
    });
}

function updateCalculateAge($input) {
    calcObj.age = $input.val();
    calculatePremium();
}

function updateCalculatePlan() {
    var $plan = $(".wapPlan:visible");

    calcObj.planId = $plan.attr("planId");
    calcObj.planLiabilityList = [];

    $plan.find(".wapLiability").each(function(index, el) {
        var liabilityId = $(el).attr("liabilityId");
        var amount = getAmount($(el).find(".liabilityAmount").text());
        calcObj.planLiabilityList.push({
            liabilityId: liabilityId,
            amount: amount
        });
    });
    calculatePremium();
}

function pageControl() {
    if ($(".insureAge label[factorindex]").length == 1) {
        $(".insureAge").hide();
    }

    if ($(".insurePeriod label[factorindex]").length == 1) {
        $(".insurePeriod").hide();
    }

    if ($(".wapPlanName").length == 1) {
        $(".wapPlanName").parent().hide();
    }
}

function planCacheMapInit() {
    $(".wapPlan").each(function(index, el) {
        var wapPlan = $(el);
        var index = wapPlan.attr("planIndex");

        planCacheMap.push({
            index: index,
            plan: el
        });
    });

    if (!isCalc) {
        if ($(".insureAge").length) {
            planFactor.age = "0";
        }
        if ($(".insurePeriod").length) {
            planFactor.period = "0";
        }
    }

    if ($(".wapPlanNameList").length) {
        planFactor.name = "0";
    }
}

function showPlan() {
    $(".wapPlan").hide();
    for (var i = 0; i < planCacheMap.length; i++) {
        var el = planCacheMap[i];

        if (el.index == planFactor.toString()) {
            var $plan = $(el.plan);
            $plan.show();

            var price = $plan.attr("planPrice");
            $(".productPrice").html(price);
            $(".priceData").html("￥" + price);
            $(".scoreData").html($plan.attr("planScore"));

            returnMessageObj.details.planId = $plan.attr("planId");
            returnMessageObj.details.planPrice = $plan.attr("planPrice");

            var planLiabilityList = [];
            liabilityContents.length = 0;

            $plan.find(".wapLiability").each(function(index, ele) {
                var lid = $(ele).attr("liabilityId");
                planLiabilityList.push({
                    "liabilityId": lid
                });

                liabilityContents.push({
                    "liabilityId": lid,
                    "liabilityName": $(ele).find(".liabilityName").text(),
                    "liabilityAmount": $(ele).find(".liabilityAmount").text()
                });
            });
            returnMessageObj.details.planLiabilityList = planLiabilityList;
            return;
        }
    }
}

function returnMessageInit() {
    var wapReturnMessage = $(".wapReturnMessage");
    var messageList = wapReturnMessage.attr("returnMessage").split(",");
    $.each(messageList, function(index, el) {
        returnMessageObj.details[el] = "";
    });
}

function getProductId() {
    var href = location.href;
    href = href.substr(href.lastIndexOf('/') + 1);
    href = href.substring(0, href.indexOf('.'));
    if (href.indexOf("_") > -1) {
        href = href.substring(0, href.indexOf('_'));
    }
    return href;
}

function showLiabilityContent() {
    var content = $(this).find(".liabilityDescription").html();
    if (content) {
        $("#liabilityMasker").show();
        $(".liabilityBox").addClass("ldown");
        $("#liabilityMasker .liabilityContent").html(content);
        $("body").addClass("lockBody");
    }
}

function hideLiabilityContent() {
    $(".liabilityBox").removeClass("ldown");
    $("#liabilityMasker").hide();
    $("body").removeClass("lockBody");
}

function getChannelId() {
    var channelId = getCookie("FROM_COOP");
    if (channelId && !isNaN(channelId)) {
        return channelId;
    }

    channelId = getQueryString("from");
    if (channelId && !isNaN(channelId)) {
        return channelId;
    }

    return "53686";
}

function getStartInsureDate() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate();
    return year + "-" + mon + "-" + dat + " 00:00:00";
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

function getCookie(c_name) {　　　　
    if (document.cookie.length > 0) {　　　　　　　　
        var c_start = document.cookie.indexOf(c_name + "=");

        if (c_start != -1) {　　　　　　　　
            c_start = c_start + c_name.length + 1;　　　　　　　　　　
            var c_end = document.cookie.indexOf(";", c_start);　　　　　　　　　　
            if (c_end == -1) {
                c_end = document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start, c_end));　　　　　　　　
        }　　　　
    }
    return "";
}

function alertbox(message) {
    $("#alertBoxMasker").show();
    $("#alertBoxMasker").animate({
        "opacity": "1"
    }, 400);
    $("#alertBoxMasker p").text(message);
    $("body").addClass("lockBody");
}

function clearLocalData() {
    clearLocVal("insurePeriod");
    clearLocVal("saveData");
    clearLocVal("productId");
    clearLocVal("applicationId");
    clearLocVal("price");
    clearLocVal("returnMessage");
    clearLocVal("liabilityContents");
    clearLocVal("productName");
}

function smq1(data1, data2) {
    try {
        _smq.push(['custom', data1, data2, '财险_' + productName]);
    } catch (e) {

    }
}

function smq2(options) {
    try {
        var openId = getLocVal("openId");
        if (openId) {
            options.userId = openId;
        }
        TKTrack(options);
    } catch (e) {

    }
}

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
    }
    return null;
}
