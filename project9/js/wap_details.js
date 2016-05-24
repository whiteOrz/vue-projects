$(function(){
    pageEventInit();
});

var returnMessageObj = {
    details : {}
}

function pageEventInit(){
    $(".wapPackageName:first").addClass("active");
    $(".wapPackage:first").addClass("active");
    $(".wapPackage").eq(0).click();

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
        var productId = getProductId() || "1702";
        returnMessageObj.details.packageId = productId;
        sessionStorage.setItem("returnMessage",JSON.stringify(returnMessageObj));
        sessionStorage.setItem("productId",productId);
        console.log(returnMessageObj);
        location.href = "orderinfo.html";
    });
}

function returnMessage(ent,returnKeyArr){
    returnKeyArr.forEach(function(item){
        var returnValue = $(ent).attr(item);
        returnMessageObj.details[item] = returnValue;
        returnMessageObj.details.packageLiabilityList = [];

        $(ent).find(".wapLiability").each(function(){
            returnMessageObj.details.packageLiabilityList.push({
                "liabilityId" : $(this).attr("liabilityId") || "001"
            });
        });
    });
}

function getProductId(){
    var href = location.href;
    href = href.substr(href.lastIndexOf('/')+1);
    href = href.substring(0,href.indexOf('_'));
    return href;
}
