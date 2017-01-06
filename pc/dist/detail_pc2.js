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

var insure = "http://" + location.hostname;
var planCacheMap = [];
var planFactor = {};
var isCalc = false;
var calcObj = {};
var calcPrice;
var calcSuccess = false;
var receivePlanLiabilityList;

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
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

var productId = getProductId() || "errorProductId";
var applicationId = "errorApplicationId";
var applicationToken = "errorApplicationToken";
var platform = "pc";

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
var seedId = getQueryString("seedId");
var seedType = getQueryString("seedType");

function initApplication() {
    $.ajax({
        url: insure + "/hera_insure2/api/insure/v2/application/",
        type: "post",
        async: false,
        dataType: "json"
    }).done(function(data) {
        if (data.code == "0") {
            applicationId = data.data.applicationId;
            applicationToken = data.data.applicationToken;
        }
    }).fail(function() {
        console.log("生成Application失败！");
    });
}

$(function() {
    isCalc = $(".pcCalculateHidden").length > 0;
    isCalc && initCalculateObj();
    isCalc && calculate();

    returnMessageInit();
    planCacheMapInit();
    pageEventInit();
    initPremiumSet();
});

function initPremiumSet() {
    var $premiumFactor = $("[componentId=pcPremiumFactor]");

    $premiumFactor.each(function(index, el) {
        var $el = $(el);
        var premiumName = $el.attr("premiumFactorName");
        if ($el.find("input[type=radio]").length) {
            var label = $el.find("label").first();
            label.addClass('active');

            var input = label.find("input[type=radio]").first();
            input.prop("checked", true);
            input.trigger('change');
        }
    });
}

function initCalculateObj() {
    var applicantInfo = {};
    var insuredInfo = {};
    var $premiumFactor = $("[componentId=pcPremiumFactor]");

    $premiumFactor.each(function(index, el) {
        var $el = $(el);
        var premiumName = $el.attr("premiumFactorName");
        if (premiumName == "amount") {
            return;
        }

        if (premiumName == "planLiabilityList") {
            calcObj.planLiabilityList = [];
        } else {
            if (premiumName.indexOf("applicant") > -1) {
                if (premiumName == "applicantArea") {
                    applicantInfo.applicantProvince = $("#provinceArea").val();
                    applicantInfo.applicantCity = $("#cityArea").val();
                } else {
                    applicantInfo[premiumName] = "";
                }
            } else if (premiumName.indexOf("insured") > -1) {
                insuredInfo[premiumName] = "";
            } else {
                calcObj[premiumName] = "";
            }
        }
    });

    if (!$.isEmptyObject(applicantInfo)) {
        calcObj.applicantInfo = applicantInfo;
    }

    if (!$.isEmptyObject(insuredInfo)) {
        calcObj.insuredInfo = [insuredInfo];
    }

    calcObj.age = "";
    calcObj.planId = "1017";

    //写死的部分
    calcObj.gender = "";
    calcObj.buyNumber = "1";
    calcObj.familytype = "";
    calcObj.cardcode = "";

    calcObj.productId = productId;
    calcObj.platform = platform;
    calcObj.channelId = channelId;
    calcObj.applicationId = applicationId;
    calcObj.applicationToken = applicationToken;
}

function getAmount(amount) {
    var data = parseInt(amount);
    if (amount.indexOf("万") > -1) {
        data = data * 10000;
    }
    return data;
}

function calculatePremium() {
    //测算前要进行数据校验
    if (!checkPremiumData()) {
        calcSuccess = false;
        if (!$(".payBtn").hasClass('payBtnGrey')) {
            $(".payBtn").addClass('payBtnGrey');
        }
        return false;
    }

    $.ajax({
        url: insure + "/hera_insure2/api/insure/v2/productMetadata/" + productId + "/pc/calculator",
        type: "post",
        dataType: "json",
        data: JSON.stringify(calcObj),
        beforeSend: function() {
            calcSuccess = false;
            console.log(calcObj);
            if (!$(".payBtn").hasClass('payBtnGrey')) {
                $(".payBtn").addClass('payBtnGrey');
            }
        }
    }).done(function(result) {
        if (result.code == "0") {
            calcPrice = result.data.sumPremium;
            $(".priceData").html("￥" + calcPrice);
            receivePlanLiabilityList = result.data.planLiabilityList;
            $(".payBtn").removeClass('payBtnGrey');
            calcSuccess = true;
        }
    }).fail(function() {
        console.log("测算失败！");
    });
}

function checkPremiumData() {
    //投保人信息
    if (calcObj.applicantInfo) {
        var applicant = calcObj.applicantInfo;
        applicant.applicantProvince = applicant.applicantProvince || $("#provinceArea").val();
        applicant.applicantCity = applicant.applicantCity || $("#cityArea").val();
        applicant.applicantArea = applicant.applicantArea || $(".iptArea label input").val();

        if (applicant.applicantGender == "" ||
            applicant.applicantBirth == "" ||
            applicant.applicantProvince == "" ||
            applicant.applicantCity == "") {
            console.log("applicantInfo error!");
            return false;
        }
    } else {
        return false;
    }

    //被保人信息
    if (calcObj.insuredInfo.length) {
        var insuredInfo = calcObj.insuredInfo[0];

        if (insuredInfo.insuredRelationship == "") {
            return false;
        }

        if (insuredInfo.insuredRelationship == "01") {
            insuredInfo.insuredBirth = calcObj.applicantInfo.applicantBirth;
            insuredInfo.insuredGender = calcObj.applicantInfo.applicantGender;
        } else {
            if (insuredInfo.insuredBirth == "" || insuredInfo.insuredGender == "") {
                console.log("insuredInfo error!");
                return false;
            }
        }
    } else {
        return false
    }

    //投保期间
    if (calcObj.insurePeriod == "") {
        return false;
    }

    //交费频率
    if (calcObj.payPeriod == "") {
        return false;
    } else {
        if (calcObj.payPeriod != "SP") {
            // 交费方式
            if (calcObj.payType == "") {
                return false;
            }
        }
    }

    if (calcObj.planLiabilityList && calcObj.planLiabilityList) {
        for (var i = 0; i < calcObj.planLiabilityList.length; i++) {
            var liabilityId = calcObj.planLiabilityList[i].liabilityId;
            if (liabilityId == "") {
                console.log("planLiabilityList error!");
                return false;
            }

            var amount = calcObj.planLiabilityList[i].amount;
            if (amount == "") {
                console.log("planLiabilityList amount error!");
                return false;
            }
        }
    } else {
        return false;
    }

    if (calcObj.applicantInfo.applicantPhone == "") {
        return false;
    }

    return true;
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

    $(document).on("click", ".pcPackageName", function() {
        _smq.push(['custom', '投保流程_保费测算', '套餐分类', '财险_' + productName, '']);
        TKTrack({
            event: '套餐分类',
            subType: '财险_' + productName
        });

        $(".pcPackageName").removeClass("active");
        $(this).addClass("active");

        planFactor.name = $(this).attr("planNameIndex");
        showPlan();

        isCalc && updateCalculatePlan()
    });

    $(".pcPackageName:first").click();

    if (isCalc) {
        setPremiumEvent();
    } else {
        setPlanEvent();
    }

    $(document).on("click", ".pcLiability", function() {
        $(this).find(".liabilityDescription").toggle();
    });

    //快速投保
    $(document).on("click", ".quickBuy", function() {
        if (!calcSuccess) {
            return false;
        }
        initApplication();

        //插码
        _smq.push(['custom', '投保流程_保费测算', '直接投保', '财险_' + productName, '']);
        TKTrack({
            event: '直接投保',
            subType: '财险_' + productName,
            label: {
                "productID": productId,
                "productName": productName,
                "seedId": seedId,
                "seedType": seedType
            }
        });

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
            }
        } else {
            productAge = $(".insureAge .insureAge").text();
        }

        if ($(".packageNameList .pcPackageName").length > 1) {
            if ($(".packageNameList .pcPackageName").hasClass("active")) {
                planName = $(".packageNameList .pcPackageName.active").text();
            }
        } else {
            planName = $(".packageNameList .pcPackageName").text();
        }

        if (isCalc) {
            calcObj.planPrice = calcPrice;
            if (receivePlanLiabilityList) {
                calcObj.planLiabilityList = receivePlanLiabilityList;
            }

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
            url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(returnMessageObj)
        }).done(function(data) {
            if (data.code == "0") {
                window.top.location.href = "orderinfo2.html";
            } else {
                alert(data.message);
            }
        }).fail(function() {
            alert("网络异常");
        });
    });

    //会员投保
    $(document).on("click", ".login", function() {
        if (!calcSuccess) {
            return false;
        }

        //插码
        _smq.push(['custom', '投保流程_保费测算', '会员投保', '财险_' + productName, '']);
        TKTrack({
            event: '会员投保',
            subType: '财险_' + productName,
            label: {
                "productID": productId,
                "productName": productName,
                "seedId": seedId,
                "seedType": seedType
            }
        });

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
            initApplication();

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
            } else {
                productAge = $(".insureAge .insureAge").text();
            }

            if ($(".packageNameList .pcPackageName").length > 1) {
                if ($(".packageNameList .pcPackageName").hasClass("active")) {
                    planName = $(".packageNameList .pcPackageName.active").text();
                }
            } else {
                planName = $(".packageNameList .pcPackageName").text();
            }
            if (isCalc) {
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
                url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/details",
                type: "post",
                dataType: "json",
                data: JSON.stringify(returnMessageObj)
            }).done(function(data) {
                if (data.code == "0") {
                    window.top.location.href = "orderinfo2.html";
                } else {
                    alert(data.message);
                }
            }).fail(function() {
                alert("网络异常！");
            });
        }
    });
}

function setPremiumEvent() {
    var $premiumFactor = $("[componentId=pcPremiumFactor]");

    $premiumFactor.each(function(index, el) {
        var $el = $(el);
        var premiumName = $el.attr("premiumFactorName");

        if ($el.find("input[type=radio]").length) {
            $el.on("change", "label", function() {
                iframeHeight();
                $el.find("label").removeClass("active");
                $(this).addClass("active");
                updatePremiumObj(premiumName);
            });
        }

        $el.on("change", "input[type=text]", function() {
            updatePremiumObj(premiumName);
        });
    });
}

function updatePremiumObj(name) {
    //更新测算对象
    //calcObj.applicantInfo
    //calcObj.insuredInfo
    //calcObj.planLiabilityList

    var applicantInfo = calcObj.applicantInfo;
    applicantInfo.applicantGender = getPremiumValue("applicantGender");
    applicantInfo.applicantBirth = getPremiumValue("applicantBirth");
    applicantInfo.applicantPhone = getPremiumValue("applicantPhone");

    var area = getPremiumArea();
    applicantInfo.applicantProvince = area.applicantProvince;
    applicantInfo.applicantCity = area.applicantCity;
    applicantInfo.applicantArea = area.applicantArea;

    var insuredInfo = calcObj.insuredInfo[0];
    insuredInfo.insuredRelationship = getPremiumValue("insuredRelationship");
    insuredInfo.insuredGender = getPremiumValue("insuredGender");
    insuredInfo.insuredBirth = getPremiumValue("insuredBirth");

    if (insuredInfo.insuredRelationship == "01") {
        insuredInfo.insuredGender = applicantInfo.applicantGender;
        insuredInfo.insuredBirth = applicantInfo.applicantBirth;
    }

    var amount = $(".buyNum").val() + "0000";
    calcObj.planLiabilityList.length = 0;
    var liability = getPremiumValue("planLiabilityList") || "2981,2982";
    liability = liability.split(",");
    for (var i = 0; i < liability.length; i++) {
        calcObj.planLiabilityList.push({
            "liabilityId": liability[i],
            "amount": amount
        });
    }

    calcObj.insurePeriod = getPremiumValue("insurePeriod");
    calcObj.payPeriod = getPremiumValue("payPeriod");
    calcObj.payType = getPremiumValue("payType");
    calcObj.age = getAge(insuredInfo.insuredBirth);
    calcObj.gender = insuredInfo.insuredGender;

    calculatePremium();
}

function getPremiumValue(name) {
    var value = "";
    var $premium = $("div[premiumFactorName=" + name + "] :visible");
    if ($premium.find('input').length) {
        var type = $premium.find('input').first().attr("type");
        if (type == "radio") {
            value = $premium.find('input:checked').val();
        } else if (type == "text") {
            value = $premium.find('input').val();
        }
    }

    return value;
}

function getPremiumArea() {
    var areaObj = {};
    var $area = $("#live");
    areaObj.applicantArea = $area.attr("areaname");

    var code = $area.attr("areacode");
    if (code) {
        areaObj.applicantProvince = code.substr(0, 1);
        areaObj.applicantCity = code.substr(1);
    }
    return areaObj;
}

function setPlanEvent() {
    //投保期间
    var $period = $(".insurePeriod .insurePeriod");
    if ($period.length > 1) {
        $period.click(function() {
            $period.removeClass("active");
            $(this).addClass("active");
            planFactor.period = $(this).attr("factorIndex");
            showPlan();
            $(".insurePeriodMessage").html(getInsureDateStr($(this).html()));
        });
        $period.first().click();
    } else {
        $period.css({
            "border": "none",
            "padding": "0"
        }).parent().css({
            "border": "none",
            "cursor": "default"
        });

        if ($period.length > 0) {
            $(".insurePeriodMessage").html(getInsureDateStr($(periodStr + ":first").html()));
        }
    }

    //投保年龄
    var $insureAge = $(".insureAge .insureAge");
    if ($insureAge.length > 1) {
        $insureAge.click(function() {
            $insureAge.removeClass("active");
            $(this).addClass("active");
            planFactor.age = $(this).attr("factorIndex");
            showPlan();
        });
        $insureAge.first().click();
    } else {
        $insureAge.css({
            "border": "none",
            "padding": "0",
            "cursor": "default"
        });
    }
}

function updateCalculateAge($age) {
    calcObj.age = $age.attr("value");
    calculatePremium();
}

function updateCalculatePlan() {
    var $plan = $(".pcPackage:visible");
    calcObj.planId = $plan.attr("planId");
    calcObj.planLiabilityList = [];

    $plan.find(".pcLiability").each(function(index, el) {
        var liabilityId = $(el).attr("liabilityId");
        var amount = getAmount($(el).find(".liabilityAmount").text());
        calcObj.planLiabilityList.push({
            liabilityId: liabilityId,
            amount: amount
        });
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
        if ($(".insureAge .insureAge").length) {
            planFactor.age = "0";
        }
        //期间
        if ($(".insurePeriod .insurePeriod").length) {
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
    //   var URLLOAD="http://shop.taikang.com/eservice/login/login.jsp";
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
    });
}

//根据出生日期获取年龄
function getAge(birthday) {
    var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false
    };
    var birth = new Date(r[1], r[3] - 1, r[4]);
    if (birth.getFullYear() == r[1] && (birth.getMonth() + 1) == r[3] && birth.getDate() == r[4]) {
        var today = new Date();
        var age = today.getFullYear() - r[1];

        if (today.getMonth() > birth.getMonth()) {
            return age;
        }
        if (today.getMonth() == birth.getMonth()) {
            if ((today.getDate() + 1) >= birth.getDate()) {
                return age;
            } else {
                return age - 1;
            }
        }
        if (today.getMonth() < birth.getMonth()) {
            return age - 1;
        }
    }
    return age;
}
