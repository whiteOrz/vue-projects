var returnMessageObj = {
    details: {}
};

var PAGE_DATA = {}; //存储页面操作的数据
var INIT_DATA = {}; //存储初始化调用接口的数据
var _smq = _smq || [];
//测试环境
//var insure = "http://deluat.taikang.com";
//生产环境
//var insure="http://shop.taikang.com/";  
var insure = "http://" + window.location.hostname;
var planCacheMap = [];
var planFactor = {};
var isCalc = false;
var calcObj = {};
var calcPrice;
var receivePlanLiabilityList;
var flagType = "";

planFactor.toString = function() {
    var str = "";
    for (var key in this) {
        if (key != "toString") {
            str += this[key];
        }
    }
    return str;
}

function getCookie(c_name) {　　　　
    if (document.cookie.length > 0) {　　　　　　　　
        var c_start = document.cookie.indexOf(c_name + "=")　;　　　
        if (c_start != -1) {　　　　　　　　
            c_start = c_start + c_name.length + 1　　
            c_end = document.cookie.indexOf(";", c_start)　　
            if (c_end == -1) c_end = document.cookie.length　　　　　　　　　　
            return unescape(document.cookie.substring(c_start, c_end))　　　　　　　　
        }　　　　
    }　　　　
    return ""　　
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.top.window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

var productId = getProductId() || "1702";
var applicationId = "12345";
var applicationToken = "";
var platform = "pc";
var seedId = getQueryString("seedId");
var seedType = getQueryString("seedType");

function getChannelId() {
    var channelId = getCookie("FROM_COOP");
    if (channelId) {
        return channelId;
    }

    channelId = getQueryString("from");
    if (channelId) {
        return channelId;
    }

    return "3";

}
var channelId = getChannelId();
//获取applicationId请求失败
$.ajax({
    url: insure + "/hera_insure/api/insure/v2/application/",
    type: "post",
    dataType: "json"
}).done(function(data) {
    //console.log(data);
    if (data.code == "0") {
        applicationId = data.data.applicationId;
        applicationToken = data.data.applicationToken;
    }
}).fail(function() {
    alert("网络异常");
    //console.log("applicationId请求失败");
});

$(function() {
    var productName = $(".productName").text();
    TKTrack({ event: '页面加载', subType: '财险_' + productName, label: { seedId: seedId, seedType: seedType, productId: productId } });
    isCalc = $(".pcCalculateHidden").length > 0;
    isCalc && 　initCalculateObj();

    returnMessageInit();
    planCacheMapInit();
    pageEventInit();
});

function initCalculateObj() {
    calcObj.age = $(".insureAge .insureAge").first().attr("value");
    calcObj.insurePeriod = $(".insurePeriod .insurePeriod").first().attr("value");

    var $plan = $(".pcPlan").first();
    calcObj.planId = $plan.attr("planId");
    calcObj.planLiabilityList = [];

    $plan.find(".pcLiability").each(function(index, el) {
        var liabilityId = $(el).attr("liabilityId");
        var liabilityIds = liabilityId.split(",");
        var amount = "99999";
        var $amount = $(el).find(".liabilityAmount");
        if ($amount.attr("value")) {
            amount = $amount.attr("value");
        } else {
            amount = getAmount($(el).find(".liabilityAmount").text());
        }

        for (var i = 0; i < liabilityIds.length; i++) {
            calcObj.planLiabilityList.push({
                liabilityId: liabilityIds[i],
                amount: amount
            });
        }
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
    $.ajax({
        url: insure + "/hera_insure/api/insure/v2/productMetadata/" + productId + "/pc/calculator",
        type: "post",
        dataType: "json",
        data: JSON.stringify(calcObj)
    }).done(function(result) {
        if (result.code == "0") {
            calcPrice = result.data.sumPremium;
            $(".priceData").html("￥" + calcPrice);
            receivePlanLiabilityList = result.data.planLiabilityList;
        }
    }).fail(function() {
        alert("网络异常");
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
    var productName = $(".productName").text();
    $(".pcPackageName").click(function() {
        _smq.push(['custom', '投保流程_保费测算', '套餐分类', '财险_' + productName, '']);
        TKTrack({ event: '套餐分类', subType: '财险_' + productName })
        $(".pcPackageName").removeClass("active");
        $(this).addClass("active");

        planFactor.name = $(this).attr("planNameIndex");
        showPlan();

        isCalc && updateCalculatePlan()

    });
    $(".pcPackageName:first").click();

    //投保期间
    var periodStr = ".insurePeriod .insurePeriod";
    if ($(periodStr).length > 1) {
        $(periodStr).click(function() {
            $(periodStr).removeClass("active");
            $(this).addClass("active");

            if (isCalc) {
                updateCalculatePeriod($(this));
            } else {
                planFactor.period = $(this).attr("factorIndex");
                showPlan();
            }

            $(".insurePeriodMessage").html(getInsureDateStr($(this).html()));
        });
        $(periodStr).first().click();
    } else {
        $(periodStr).css({
            "border": "none",
            "padding": "0"
        }).parent().css({
            "border": "none",
            "cursor": "default"
        });

        if ($(periodStr).length > 0) {
            $(".insurePeriodMessage").html(getInsureDateStr($(periodStr + ":first").html()));
        }
    }

    //投保年龄
    if ($(".insureAge .insureAge").length > 1) {
        $(".insureAge .insureAge").click(function() {
            $(".insureAge .insureAge").removeClass("active");
            $(this).addClass("active");

            if (isCalc) {
                updateCalculateAge($(this));
            } else {
                planFactor.age = $(this).attr("factorIndex");
                showPlan();
            }
        });
        $(".insureAge .insureAge").first().click();
    } else {
        $(".insureAge .insureAge").css({
            "border": "none",
            "padding": "0",
            "cursor": "default"
        });
    }

    $(".pcLiability").click(function() {
        $(this).find(".liabilityDescription").toggle();
    });
    //快速投保
    $(".quickBuy").click(function() {
        //插码
        _smq.push(['custom', '投保流程_保费测算', '直接投保', '财险_' + productName, '']);
        TKTrack({ event: '直接投保', subType: '财险_' + productName });

        var productAge = "";
        var planName = "";

        returnMessageObj.productId = productId;
        returnMessageObj.platform = platform;
        returnMessageObj.channelId = channelId;
        returnMessageObj.applicationId = applicationId;
        returnMessageObj.applicationToken = applicationToken;
        returnMessageObj.seedId = seedId;
        returnMessageObj.seedType = seedType;
        returnMessageObj.processHandler = "property";
        returnMessageObj.memberId = "";
        returnMessageObj.memberToken = "";

        if ($(".insureAge .insureAge").length > 1) {
            if ($(".insureAge .insureAge").hasClass("active")) {
                productAge = $(".insureAge .insureAge.active").text();
                if ($(".insureAge .insureAge.active").attr("data-type")) {
                    flagType = $(".insureAge .insureAge.active").attr("data-type");
                    var storage = new Storage('session');
                    if (storage.get("flagType")) {
                        storage.remove("flagType")
                    }
                    storage.set("flagType", flagType);
                }

            }
        } else {
            productAge = $(".insureAge .insureAge").text();
            if ($(".insureAge .insureAge").attr("data-type")) {
                flagType = $(".insureAge .insureAge").attr("data-type");
                var storage = new Storage('session');
                if (storage.get("flagType")) {
                    storage.remove("flagType")
                }
                storage.set("flagType", flagType);
            }

        }

        if ($(".packageNameList .pcPackageName").length > 1) {
            if ($(".packageNameList .pcPackageName").hasClass("active")) {
                planName = $(".packageNameList .pcPackageName.active").text();
            }
        } else {
            planName = $(".packageNameList .pcPackageName").text();
        }

        if (isCalc) {
            calcObj.startDate = getStartInsureDate1();
            calcObj.planPrice = calcPrice;
            calcObj.planLiabilityList = receivePlanLiabilityList;
            returnMessageObj.details = calcObj;
        }
        var storage = new Storage('session');
        storage.set("member", "false");
        storage.set("productName", $(".productName").text());
        storage.set("productDesc", $(".productDescription").text());
        storage.set("productAge", productAge);

        storage.set("planName", planName);
        storage.set("returnMessage", JSON.stringify(returnMessageObj));

        //快速投保
        $.ajax({
            url: insure + "/hera_insure/api/insure/v2/application/" + applicationId + "/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(returnMessageObj)
        }).done(function(data) {
            if (data.code == "0") {
                window.top.location.href = "orderinfo.html";
            } else {
                alert(data.message);
            }
        }).fail(function() {
            alert("网络异常");
        });



    });
    //会员投保
    $(".login").click(function() {

        //插码
        _smq.push(['custom', '投保流程_保费测算', '会员投保', '财险_' + productName, '']);
        TKTrack({ event: '会员投保', subType: '财险_' + productName });

        var tkmid = $.cookie('tkmid');
        var tkmname = $.cookie('tkmname');
        var tkmssid = $.cookie('tkmssid');
        var tkmtoken = $.cookie('tkmtoken');
        var tkmidtoken = $.cookie('tkmidtoken');
        var data_cookie = {};
        data_cookie.id_policy = {};

        if (!tkmid && !tkmname) {
            setload(); //登录
        } else {
            //校验会员信息
            data_cookie.id_policy.planCode = 'I0010';
            data_cookie.id_policy.isSupportCalc = "true";
            data_cookie.tkmid = tkmid;
            data_cookie.tkmname = tkmname;
            data_cookie.tkmssid = tkmssid;
            data_cookie.tkmtoken = tkmtoken;
            data_cookie = JSON.stringify(data_cookie);
            var productId = getProductId() || "";
            var productAge = "";
            var planName = "";

            returnMessageObj.productId = productId;
            returnMessageObj.platform = platform;
            returnMessageObj.channelId = channelId;
            returnMessageObj.applicationId = applicationId;
            returnMessageObj.applicationToken = applicationToken;
            returnMessageObj.seedId = seedId;
            returnMessageObj.seedType = seedType;
            returnMessageObj.processHandler = "property";

            returnMessageObj.memberId = tkmid;
            returnMessageObj.memberToken = tkmidtoken;

            if ($(".insureAge .insureAge").length > 1) {
                if ($(".insureAge .insureAge").hasClass("active")) {
                    productAge = $(".insureAge .insureAge.active").text();
                }
                if ($(".insureAge .insureAge.active").attr("data-type")) {
                    flagType = $(".insureAge .insureAge.active").attr("data-type");
                    var storage = new Storage('session');
                    if (storage.get("flagType")) {
                        storage.remove("flagType")
                    }
                    storage.set("flagType", flagType);
                }
            } else {
                productAge = $(".insureAge .insureAge").text();
                if ($(".insureAge .insureAge").attr("data-type")) {
                    flagType = $(".insureAge .insureAge").attr("data-type");
                    var storage = new Storage('session');
                    if (storage.get("flagType")) {
                        storage.remove("flagType")
                    }
                    storage.set("flagType", flagType);
                }
            }

            if ($(".packageNameList .pcPackageName").length > 1) {
                if ($(".packageNameList .pcPackageName").hasClass("active")) {
                    planName = $(".packageNameList .pcPackageName.active").text();
                }
            } else {
                planName = $(".packageNameList .pcPackageName").text();
            }
            if (isCalc) {
                calcObj.startDate = getStartInsureDate1();
                calcObj.planPrice = calcPrice;
                calcObj.planLiabilityList = receivePlanLiabilityList;
                returnMessageObj.details = calcObj;
            }
            var storage = new Storage('session');
            storage.set("member", "true");
            storage.set("productName", $(".productName").text());
            storage.set("productDesc", $(".productDescription").text());
            storage.set("productAge", productAge);

            storage.set("planName", planName);
            storage.set("returnMessage", JSON.stringify(returnMessageObj));
            //保存详情页
            $.ajax({
                url: insure + "/hera_insure/api/insure/v2/application/" + applicationId + "/details",
                type: "post",
                dataType: "json",
                data: JSON.stringify(returnMessageObj)
            }).done(function(data) {
                window.top.location.href = "orderinfo.html";
            }).fail(function() {
                alert("网络异常！");
            });


        }
    });
}

function updateCalculatePeriod($period) {
    calcObj.age = $period.attr("value");
    updateCalculatePlan();
}

function updateCalculateAge($age) {
    calcObj.age = $age.attr("value");
    updateCalculatePlan();
}

function updateCalculatePlan() {
    var $plan = $(".pcPackage:visible");
    calcObj.planId = $plan.attr("planId");
    calcObj.planLiabilityList = [];

    $plan.find(".pcLiability").each(function(index, el) {
        var liabilityId = $(el).attr("liabilityId");
        var liabilityIds = liabilityId.split(",");
        var amount = "99999";
        var $amount = $(el).find(".liabilityAmount");
        if ($amount.attr("value")) {
            amount = $amount.attr("value");
        } else {
            amount = getAmount($(el).find(".liabilityAmount").text());
        }

        for (var i = 0; i < liabilityIds.length; i++) {
            calcObj.planLiabilityList.push({
                liabilityId: liabilityIds[i],
                amount: amount
            });
        }
    });
    calculatePremium();
}

function showPlan() {
    $(".pcPackage").hide();

    for (var i = 0; i < planCacheMap.length; i++) {
        var el = planCacheMap[i];

        if (el.index == planFactor.toString()) {
            var $plan = $(el.plan);
            $plan.show();

            var price = $plan.attr("planPrice");
            var planScore = $plan.attr("planScore");
            $(".priceData").html("￥" + price);

            var days = ""
            returnMessageObj.details.planId = $.trim($plan.attr("planId"));
            returnMessageObj.details.planPrice = price;
            returnMessageObj.details.planScore = planScore;

            if ($(".insureAgeList .insurePeriod").hasClass("active")) {
                days = parseInt($(".insureAgeList .insurePeriod.active").html());
            }

            returnMessageObj.details.days = days;

            var planLiabilityList = [];
            $plan.find(".pcLiability").each(function(index, ele) {
                planLiabilityList.push({
                    "liabilityId": $(ele).attr("liabilityId")
                });
            });
            returnMessageObj.details.planLiabilityList = planLiabilityList;

            return;
        }
    }
}

function planCacheMapInit() {

    $(".pcPackage").each(function(index, el) {
        var wapPlan = $(el);
        var index = wapPlan.attr("planIndex");

        planCacheMap.push({
            index: index,
            plan: el
        });
    });
    if (!isCalc) {
        //年龄
        if ($(".insureAge").find(".insureAge").length) {
            planFactor.age = "0";
        }
        //期间
        if ($(".insurePeriod").find(".insurePeriod").length) {
            planFactor.period = "0";
        }
    }

    if ($(".pcPackageNameList").length) {
        planFactor.name = "0";
    }
}

function returnMessageInit() {
    var wapReturnMessage = $(".pcReturnMessage");
    var messageList = wapReturnMessage.attr("returnMessage").split(",");
    $.each(messageList, function(key, value) {
        returnMessageObj.details[value] = "";
    });

}

function getProductId() {
    var href = location.href;
    href = href.substr(href.lastIndexOf('/') + 1);
    href = href.substring(0, href.indexOf('_'));
    return href;
}

function getInsureDateStr(dayStr) {
    var days = 1;
    if (dayStr.indexOf("年") > -1) {
        days = 365;
    } else {
        days = parseInt(dayStr);
    }

    return "从" + getStartInsureDate() + "到" + getEndInsureDate(days) + "有效";
}

function getStartInsureDate() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate();

    return year + "-" + mon + "-" + dat + "零时";
}

function getStartInsureDate1() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate();

    return year + "-" + mon + "-" + dat + " 00:00:00";
}

function getEndInsureDate(days) {
    var t = new Date();
    t.setDate(t.getDate() + 1);

    if (days == 365) {
        t.setFullYear(t.getFullYear() + 1);
    } else {
        t.setDate(t.getDate() + days);
    }

    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate() - 1;

    return year + "-" + mon + "-" + dat + "二十四时";
}
//提交按钮样式
function setSubmitStyle() {
    if (PAGE_DATA.amount) {
        $('#calcSubmit').prop('disabled', false).css('background', '#f50');
        $('#submit').prop('disabled', false);
    } else {
        if (!PAGE_DATA.amount) {
            layer.msg("请填写投资金额");
            return false;
        }
    }
    return true;
}
//跳登录存cookie
function setload() {
    var page_data = JSON.stringify(PAGE_DATA);
    $.cookie('page_data', page_data);

    //跳转到登录
    skipLoad();
}

function skipLoad() {
    var _location = window.parent.location.href;
    $.cookie("tkreferrer", _location, {
        path: "/",
        domain: "taikang.com"
    });

    window.top.sAlertsumbet(window.top.strHtml);
    window.top.getRandomGif()

    /*测试环境*/
    //  var URLLOAD="http://ecuat.taikang.com/eservice/login/login.jsp"; 
    //	 var URLLOAD="http://shop.taikang.com/eservice/login/login.jsp"; 
    //  window.parent.location.href = URLLOAD;
}

function submit(member_id) {
    var formValidate = setSubmitStyle();
    if (!formValidate) {
        return false;
    }
    var data = {};
    data.id_user = {};
    if (member_id == "直接购买") {
        member_id = "";
        data.id_user.member_id = "";
        data.id_user.isMember = "false";
    } else {
        data.id_user.member_id = member_id;
    }
    data.id_eciSetup = {};
    data.id_eciSetup.flowid = '1013';
    data.id_policy = {};
    data.id_policy.amount = PAGE_DATA.amount;
    data.id_policy.lrt_id = '252';
    data.id_policy.investInsure = {};
    data.id_policy.investInsure.accountValue = PAGE_DATA.amount;
    data.id_policy.realPremium = PAGE_DATA.amount;
    data.id_policy.totalPremium = PAGE_DATA.amount;
    data.id_policy.insurants = [];
    data.id_policy.insurants[0] = {};
    data.id_policy.insurants[0].insureCompList = [];
    data.id_policy.insurants[0].insureCompList[0] = {};
    data.id_policy.insurants[0].insureCompList[0].risk = PAGE_DATA.amount;
    data.id_policy.insurants[0].insureCompList[0].fee = PAGE_DATA.amount;
    data.id_policy.insurants[0].insureCompList[0].buyNumber = PAGE_DATA.amount / 1000 + "";
    data.id_policy.insurants[0].insureCompList[0].lrtc_id = '2521';

    var result = JSON.stringify(data);
    var calc_url = insure + "/v1/PC/orders/calculator";
    $.ajax({
        url: calc_url,
        type: 'POST',
        dataType: 'json',
        data: {
            'data': result
        },
        timeout: 5000,
        async: false,
        success: function(data) {
            if (data.status != "201") {
                if (islogintimeout(data)) {
                    if (clearCookie()) {
                        layer.alert(data.message, {
                                icon: 0,
                                skin: 'layui-layer-hui',
                                closeBtn: 0
                            },
                            function() {
                                setload();
                            });
                    }
                    return false;
                } else {
                    fail_page("failPage", "details_main", data.message);
                    PAGE_DATA.form_id = data.id_policy.form_id;
                }
            } else {
                $.cookie("page_cookie", null); // 清除cookie
                var _url = "../individual/information.html?flow_id=1013&form_id=" + data.id_policy.form_id + "&member_id=" + member_id + "&sign=" + data.sign;
                if (window.top.document.getElementById('nextPages') != null) {
                    var parentFrame = window.top.document.getElementById('nextPages');

                    var framesrc = parentFrame.src;
                    parentFrame.src = TELEURI.concat(_url);
                } else {
                    window.parent.location.href = _url;
                }
            }
        },
        error: function() {
            layer.msg('error！');
        }

    })
}
