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
var platform = "pc";
var channelId = "3";

$.ajax({
    url: "http://weit.taikang.com/hera_insure/api/insure/v1/application/",
    type: "post",
    dataType: "json"
}).done(function(data) {
    console.log(data);
    if (data.error_code == "0") {
        applicationId = data.data.applicationId;
        applicationToken = data.data.applicationToken;
    }
}).fail(function() {
    console.log("applicationId请求失败");
});

$(function() {
    returnMessageInit();
    planCacheMapInit();
    pageEventInit();
});

function pageEventInit() {
    $(".pcPackageName").click(function() {
        $(".pcPackageName").removeClass("active");
        $(this).addClass("active");

        planFactor.name = $(this).attr("planNameIndex");
        showPlan();
    });
    $(".pcPackageName:first").click();

    //投保期间
    var periodStr = ".insurePeriod .insurePeriod";
    if ($(periodStr).length > 1) {
        $(periodStr).click(function() {
            $(periodStr).removeClass("active");
            $(this).addClass("active");

            planFactor.period = $(this).attr("factorIndex");
            showPlan();

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
            $(".insurePeriodMessage").html(getInsureDateStr($(periodStr+":first").html()));
        }
    }

    //投保年龄
    if ($(".insureAge .insureAge").length > 1) {
        $(".insureAge .insureAge").click(function() {
            $(".insureAge .insureAge").removeClass("active");
            $(this).addClass("active");

            planFactor.age = $(this).attr("factorIndex");
            showPlan();
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

    $(".payBtn").click(function() {
        var productId = getProductId() || "1702";

        returnMessageObj.productId = productId;
        returnMessageObj.platform = platform;
        returnMessageObj.channelId = channelId;
        returnMessageObj.applicationId = applicationId;
        returnMessageObj.applicationToken = applicationToken;
        returnMessageObj.seedId = "3";
        returnMessageObj.processHandler = "property";

        sessionStorage.setItem("productName", $(".productName").text());
        sessionStorage.setItem("productDesc", $(".productDescription").text());
        sessionStorage.setItem("returnMessage", JSON.stringify(returnMessageObj));

        console.log(returnMessageObj);

        $.ajax({
            url: "http://weit.taikang.com/hera_insure/api/insure/v1/application/" + applicationId + "/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(returnMessageObj)
        }).done(function(data) {
            if (data.error_code == "0") {
                location.href = "orderinfo.html";
            } else {
                alert(data.error_message);
            }
        }).fail(function() {
            alert("接口失败！");
        });
    });
}

function showPlan() {
    $(".pcPackage").hide();

    for (var i = 0; i < planCacheMap.length; i++) {
        var el = planCacheMap[i];

        if (el.index == planFactor.toString()) {
            var $plan = $(el.plan);
            $plan.show();

            var price = $plan.attr("planPrice");
            $(".productPrice").html("￥" + price + "元/年 起");

            returnMessageObj.details.planId = $plan.attr("planId");
            returnMessageObj.details.planPrice = $plan.attr("planPrice");

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
    //年龄
    if ($(".insureAge").find(".insureAge").length) {
        planFactor.age = "0";
    }
    //期间
    if ($(".insurePeriod").find(".insurePeriod").length) {
        planFactor.period = "0";
    }
    if ($(".pcPackageNameList").length) {
        planFactor.name = "0";
    }
}

function returnMessageInit() {
    var wapReturnMessage = $(".pcReturnMessage");
    var messageList = wapReturnMessage.attr("returnMessage").split(",");
    messageList.forEach(function(el) {
        returnMessageObj.details[el] = "";
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
    var dat = t.getDate();

    return year + "-" + mon + "-" + dat + "二十四时";
}
