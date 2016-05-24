$(function(){
    var a ='<div class=\"wapProductDesc\" componentId=\"wapProductDesc\">\r\n        <div class=\"productName\">全年综合意外保障</div>\r\n        <div class=\"productDescription\">每天低至0.15元！大小意外全保，工作生活、居家旅行必备！</div>\r\n    </div><div class=\"wapProductPrice\" componentId=\"wapProductPrice\">\r\n        <div><span class=\"priceType\">会员价</span><span class=\"productPrice\">50</span></div>\r\n        <div><span class=\"activityTitle\">促销信息</span><span class=\"discountInfo\">4.1-4.30返还两倍积分</span></div>\r\n    </div><div class=\"wapIdentityList\" componentId=\"wapIdentityList\">\r\n                <div class=\"wapIdentity\" componentId=\"wapIdentity\"><img src=\"\" /><span>透明理赔</span></div>\r\n                <div class=\"wapIdentity\" componentId=\"wapIdentity\"><img src=\"\" /><span>超值低价</span></div>\r\n                <div class=\"wapIdentity\" componentId=\"wapIdentity\"><img src=\"\" /><span>热销爆款</span></div>\r\n            </div><div componentId=\"wapPackageList\">\r\n        <div class=\"componentTitle\">保障责任</div>\r\n        <div class=\"packageNameList\">\r\n                        <div class=\"wapPackageName\" componentId=\"wapPackageName\">基本款</div>\r\n                        <div class=\"wapPackageName\" componentId=\"wapPackageName\">白金款</div>\r\n                    </div>\r\n        <div class=\"packageList\">\r\n                        <div  class=\"wapPackage\" componentId=\"wapPackage\" packageId="001" packagePrice="50" onclick=\"returnMessage(this,[\'packageId\',\'packagePrice\']);\">\r\n                                <div  class=\"wapLiability\" componentId=\"wapLiability\">\r\n                    <div>\r\n                        <span class=\"liabilityName\">意外身故</span>\r\n                        <span class=\"liabilityAmount\">10</span>\r\n                    </div>\r\n                    <div class=\"liabilityDescription\">因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。</div>\r\n                </div>\r\n                                <div  class=\"wapLiability\" componentId=\"wapLiability\">\r\n                    <div>\r\n                        <span class=\"liabilityName\">公共汽车、电车意外伤害</span>\r\n                        <span class=\"liabilityAmount\">10</span>\r\n                    </div>\r\n                    <div class=\"liabilityDescription\">因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。</div>\r\n                </div>\r\n                            </div>\r\n                        <div  class=\"wapPackage\" componentId=\"wapPackage\" packageId="002" packagePrice="100" onclick=\"returnMessage(this,[\'packageId\',\'packagePrice\']);\">\r\n                                <div  class=\"wapLiability\" componentId=\"wapLiability\">\r\n                    <div>\r\n                        <span class=\"liabilityName\">意外身故</span>\r\n                        <span class=\"liabilityAmount\">20</span>\r\n                    </div>\r\n                    <div class=\"liabilityDescription\">因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。</div>\r\n                </div>\r\n                                <div  class=\"wapLiability\" componentId=\"wapLiability\">\r\n                    <div>\r\n                        <span class=\"liabilityName\">公共汽车、电车意外伤害</span>\r\n                        <span class=\"liabilityAmount\">20</span>\r\n                    </div>\r\n                    <div class=\"liabilityDescription\">因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。</div>\r\n                </div>\r\n                            </div>\r\n                    </div>\r\n    </div><div class=\"wapConditionList\" componentId=\"wapConditionList\">\r\n        <div class=\"componentTitle\">保障说明</div>\r\n        <div class=\"conditions\">\r\n                        <div class=\"wapCondition\" componentId=\"wapCondition\">\r\n                <span class=\"conditionName\">投保年龄</span>\r\n                <span class=\"conditionDescription\">出生满30天-65周岁（含）</span>\r\n            </div>\r\n                        <div class=\"wapCondition\" componentId=\"wapCondition\">\r\n                <span class=\"conditionName\">投保期间</span>\r\n                <span class=\"conditionDescription\">1年</span>\r\n            </div>\r\n                    </div>\r\n    </div><div class=\"wapReturnMessage\" componentId=\"wapReturnMessage\">\r\n                    <input type=\"hidden\" id=\"packageId\" value=\" /\">\r\n                    <input type=\"hidden\" id=\"packagePrice\" value=\" /\">\r\n            </div><div class=\"wapPayment\" componentId=\"wapPayment\">\r\n        <div class=\"payPrice\">基本款：50</div>\r\n        <div class=\"service\">客服</div>\r\n        <div class=\"payBtn\">立即投保</div>\r\n    </div>';
    $("body").html(a);
    pageEventInit();
});

function pageEventInit(){
    $(".wapPackageName:first").addClass("active");
    $(".wapPackage:first").addClass("active");

    $(".wapPackageName").click(function(){
        var index = $(this).index();
        $(".wapPackageName").removeClass("active");
        $(this).addClass("active");

        $(".wapPackage").hide();

        var wapPackage = $(".wapPackage").eq(index);
        wapPackage.click();
        wapPackage.show();

        var price = wapPackage.attr("packagePrice");
        $(".productPrice").html(price);
        $(".payPrice").html($(this).html()+"："+price);
    });

    $(".wapLiability").click(function(){
        $(this).find(".liabilityDescription").toggle();
    });

    $(".payBtn").click(function(){
        var returnObj = {};
        $(".wapReturnMessage input").each(function(){
            var key = this.id;
            var value = this.value;
            returnObj[key] = value;
            sessionStorage.setItem(key,value);
        });

        sessionStorage.setItem("returnMessage",JSON.stringify(returnObj));
        alert(JSON.stringify(returnObj));
        location.href="../orderinfo/orderinfo.html";
    });
}

function returnMessage(ent,returnKeyArr){
    returnKeyArr.forEach(function(item){
        var returnValue = $(ent).attr(item);
        $("#"+item).val(returnValue);
    });
}
