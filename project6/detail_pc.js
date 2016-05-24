$(function(){
    pageEventInit();
});

var returnMessageObj = {
    details : {}
}

function pageEventInit(){
    $(".pcPackageName:first").addClass("active");
    $(".pcPackage:first").addClass("active");

    $(".pcPackageName").click(function(){
        var index = $(this).index();
        $(".pcPackageName").removeClass("active");
        $(this).addClass("active");

        $(".pcPackage").hide();

        var pcPackage = $(".pcPackage").eq(index);
        pcPackage.click();
        pcPackage.show();

        var price = pcPackage.attr("packagePrice");
        $(".productPrice").html("￥" + price+".00/年 起");
        $(".payPrice").html($(this).html()+"："+price);
    });

    $(".pcLiability").click(function(){
        $(this).find(".liabilityDescription").toggle();
    });

    $(".payBtn").click(function(){
        var productId = getProductId() || "1702";
        returnMessageObj.details.packageId = productId;
        sessionStorage.setItem("productId",productId);
        sessionStorage.setItem("returnMessage",JSON.stringify(returnMessageObj));
        console.log(returnMessageObj);

        //location.href="../orderinfo/orderinfo.html";
    });
}

function returnMessage(ent,returnKeyArr){
    returnKeyArr.forEach(function(item){
        var returnValue = $(ent).attr(item);
        returnMessageObj.details[item] = returnValue;
        returnMessageObj.details.packageLiabilityList = [];

        $(ent).find(".pcLiability").each(function(){
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
