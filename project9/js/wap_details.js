var returnMessageObj = {
    details: {}
};

var planCacheMap = [];
var planFactor = {};
planFactor.toString = toStr;

var application_id="12345";
var applicationToken="";
var platform = "wap";
var channel_id = "3";

$.ajax({
    url: "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/application/",
    type: "post",
    dataType: "json"
}).done(function(data) {
    console.log(data);
    if(data.error_code=="0"){
        application_id = data.applicationId;
        applicationToken=data.applicationToken;
    }
}).fail(function() {
    console.log("生成客户表单ID接口请求失败");
});

$(function() {
    returnMessageInit();
    planCacheMapInit();
    pageEventInit();
});

function pageEventInit() {
    $(".wapPlanName").click(function() {
        $(".wapPlanName").removeClass("active");
        $(this).addClass("active");
        $(".priceName").html($(this).html() + "：");

        planFactor.wapPlanNameList = $(this).attr("planNameIndex");
        showPlan();
    });

    $(".wapInsureAgeList input").change(function(event) {
        planFactor.wapInsureAgeList = $(this).parent().attr("insureAgeIndex");
        showPlan();
    });

    $(".wapInsurePeriodList input").change(function(event) {
        planFactor.wapInsurePeriodList = $(this).parent().attr("insurePeriodIndex");
        showPlan();
    });

    $(".wapLiability").click(function() {
        $(this).find(".liabilityDescription:not(:empty)").toggle();
    });

    $(".payBtn").click(function() {
        var productId = getProductId() || "1702";
        returnMessageObj.details.productId = productId;
        sessionStorage.setItem("product_id",productId);
        sessionStorage.setItem("platform",platform);
        sessionStorage.setItem("channel_id",channel_id);
        sessionStorage.setItem("application_id",application_id);
        sessionStorage.setItem("applicationToken",applicationToken);
        sessionStorage.setItem("returnMessage",JSON.stringify(returnMessageObj));

        console.log(returnMessageObj);

        var postData = {
            "platform": platform,
            "channelId": channel_id,
            "productId": productId,
            "applicationId": application_id,
            "applicationToken": applicationToken,
            "details" : returnMessageObj.details
        };

        $.ajax({
            url: "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/application/"+ application_id +"/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(postData)
        });

        //location.href = "orderInfo1.html";
    });

    $(".wapPlanName:first").click();
}

function planCacheMapInit() {
    $(".wapPlan").each(function(index, el) {
        var wapPlan = $(el);
        var planFactorList = JSON.parse(wapPlan.attr("planFactorList"));
        var factorValueList = JSON.parse(wapPlan.attr("planIndex"));
        var factor = {};
        factor.toString = toStr;

        for (var i = 0; i < planFactorList.length; i++) {
            factor[planFactorList[i]] = factorValueList[i];
            planFactor[planFactorList[i]] = "0";
        }

        planCacheMap.push({
            factor: factor,
            plan: el
        });
    });
}

function showPlan() {
    $(".wapPlan").hide();

    for(var i = 0;i<planCacheMap.length;i++){
        var el = planCacheMap[i];

        if(el.factor.toString() == planFactor.toString()){
            var $plan = $(el.plan);
            $plan.show();

            var price = $plan.attr("planPrice");
            $(".productPrice").html(price);
            $(".priceData").html("￥" + price);
            $(".scoreData").html($plan.attr("planScore"));

            var wapConditions = $plan.find(".wapPlanHide").html();
            $(".wapConditionList .conditions").html(wapConditions);

            returnMessageObj.details.planId = $plan.attr("planId");
            returnMessageObj.details.planPrice = $plan.attr("planPrice");

            var planLiabilityList = [];
            $plan.find(".wapLiability").each(function(index, ele) {
                planLiabilityList.push({
                    "liabilityId" : $(ele).attr("liabilityId")
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
    $.each(messageList,function(index, el) {
        returnMessageObj.details[el] = "";
    });
}

function getProductId() {
    var href = location.href;
    href = href.substr(href.lastIndexOf('/') + 1);
    href = href.substring(0, href.indexOf('_'));
    return href;
}

function toStr(){
    var str = "";
    for(var key in this){
        if(key!="toString"){
            str+=key+this[key];
        }
    }
    return str;
}
