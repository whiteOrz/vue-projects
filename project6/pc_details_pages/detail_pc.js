var returnMessageObj = {
    details: {}
};

var packageCacheMap = [];
var packageFactor = {};
packageFactor.toString = toStr;

var application_id="12345";
var platform = "pc";
var channel_id = "3";

$.ajax({
    url: "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/application/",
    type: "post",
    dataType: "json"
}).done(function(data) {
    console.log(data);
    if(data.error_code=="0"){
        application_id = data.data;
    }
}).fail(function() {
    console.log("application_id请求失败");
});

$(function(){
    returnMessageInit();
    packageCacheMapInit();
    pageEventInit();
});

function pageEventInit(){

    $(".pcPackageName").click(function(){
        $(".pcPackageName").removeClass("active");
        $(this).addClass("active");

        packageFactor.pcPackageNameList = $(this).attr("packageNameIndex");
        showPackage();
    });
    $(".pcPackageName:first").click();

    if($(".insurePeriod").length > 1){
        $(".insurePeriod").click(function(){
            $(".insurePeriod").removeClass("active");
            $(this).addClass("active");

            packageFactor.pcInsurePeriodList = $(this).attr("insurePeriodIndex");
            showPackage();

            $(".insurePeriodMessage").html(getInsureDateStr($(this).html()));
        });
        $(".insurePeriod:first").click();
    }else{
        $(".insurePeriod").css({"border":"none","padding" : "0"});
        $(".insurePeriod").parent().css("border","none");
        $(".insurePeriodMessage").html(getInsureDateStr($(".insurePeriod:first").html()));
    }

    if($(".pcInsureAgeRange").length > 1){
        $(".pcInsureAgeRange").click(function(){
            $(".pcInsureAgeRange").removeClass("active");
            $(this).addClass("active");

            packageFactor.pcInsureAgeRangeList = $(this).attr("insureAgeRangeIndex");
            showPackage();
        });
        $(".pcInsureAgeRange:first").click();
    }else{
        $(".pcInsureAgeRange").css({"border":"none","padding" : "0"});
    }

    $(".pcLiability").click(function(){
        $(this).find(".liabilityDescription").toggle();
    });

    $(".payBtn").click(function(){
        var productId = getProductId() || "1702";
        returnMessageObj.details.packageId = productId;
        sessionStorage.setItem("product_id",productId);
        sessionStorage.setItem("platform",platform);
        sessionStorage.setItem("channel_id",channel_id);
        sessionStorage.setItem("application_id",application_id);
        sessionStorage.setItem("returnMessage",JSON.stringify(returnMessageObj));

        console.log(returnMessageObj);

        var postData = {
            "platform": platform,
            "channelId": channel_id,
            "productId": productId,
            "applicationId": application_id,
            "details" : returnMessageObj.details
        };

        $.ajax({
            url: "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/application/"+ application_id +"/details",
            type: "post",
            dataType: "json",
            data: JSON.stringify(postData)
        });

        //location.href="../orderinfo/orderinfo.html";
    });
}

function showPackage() {
    $(".pcPackage").hide();

    for(var i = 0;i<packageCacheMap.length;i++){
        var el = packageCacheMap[i];

        if(el.factor.toString() == packageFactor.toString()){
            var $package = $(el.package);
            $package.show();

            var price = $package.attr("packagePrice");
            $(".productPrice").html("￥" + price+"元/年 起");

            returnMessageObj.details.packageId = $package.attr("packageId");
            returnMessageObj.details.packagePrice = $package.attr("packagePrice");

            var packageLiabilityList = [];
            $package.find(".pcLiability").each(function(index, ele) {
                packageLiabilityList.push({
                    "liabilityId" : $(ele).attr("liabilityId")
                });
            });
            returnMessageObj.details.packageLiabilityList = packageLiabilityList;

            return;
        }
    }
}

function packageCacheMapInit() {
    $(".pcPackage").each(function(index, el) {
        var wapPackage = $(el);
        var packageFactorList = JSON.parse(wapPackage.attr("packageFactorList"));
        var factorValueList = JSON.parse(wapPackage.attr("packageIndex"));
        var factor = {};
        factor.toString = toStr;

        for (var i = 0; i < packageFactorList.length; i++) {
            factor[packageFactorList[i]] = factorValueList[i];
            packageFactor[packageFactorList[i]] = "0";
        }

        packageCacheMap.push({
            factor: factor,
            package: el
        });
    });
}

function returnMessageInit() {
    var wapReturnMessage = $(".pcReturnMessage");
    var messageList = wapReturnMessage.attr("returnMessage").split(",");
    messageList.forEach(function(el) {
        returnMessageObj.details[el] = "";
    });
}

function getProductId(){
    var href = location.href;
    href = href.substr(href.lastIndexOf('/')+1);
    href = href.substring(0,href.indexOf('_'));
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

function getInsureDateStr(dayStr){
    var days = 1;
    if(dayStr.indexOf("年") > -1){
        days = 365;
    }else{
        days = parseInt(dayStr);
    }

    return "从" + getStartInsureDate() +"到" + getEndInsureDate(days) + "有效";
}

function getStartInsureDate(){
    var t = new Date();
    t.setDate(t.getDate() + 1);
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate();

    return year+"-"+mon+"-"+dat+"零时";
}

function getEndInsureDate(days){
    var t = new Date();
    t.setDate(t.getDate() + 1);

    if(days==365){
        t.setFullYear(t.getFullYear()+1);
    }else{
        t.setDate(t.getDate() + days);
    }

    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var dat = t.getDate();

    return year+"-"+mon+"-"+dat+"二十四时";
}
