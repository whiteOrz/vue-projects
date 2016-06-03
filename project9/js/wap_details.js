var returnMessageObj = {
    details: {}
}
var packageFactor = {
    
};

$(function() {
    returnMessageInit();
    packageFactorInit();
    pageEventInit();
});

function pageEventInit() {
    $(".wapPackageName").click(function() {
        $(".wapPackageName").removeClass("active");
        $(this).addClass("active");

        packageFactor.wapPackageNameList = $(this).attr("packageNameIndex");
        showPackage();

        // var index = $(this).index();
        // $(".wapPackage").hide();
        //
        // var wapPackage = $(".wapPackage").eq(index);
        // wapPackage.show();
        //
        // var price = wapPackage.attr("packagePrice");
        // $(".productPrice").html(price);
        // $(".priceName").html($(this).html() + "：");
        // $(".priceData").html("￥" + price);
        // $(".scoreData").html(price);
    });



    $(".wapLiability").click(function() {
        $(this).find(".liabilityDescription:not(:empty)").toggle();
    });

    $(".payBtn").click(function() {
        var productId = getProductId() || "1702";
        returnMessageObj.details.packageId = productId;
        sessionStorage.setItem("returnMessage", JSON.stringify(returnMessageObj));
        sessionStorage.setItem("productId", productId);
        console.log(returnMessageObj);
        //location.href = "orderinfo.html";
    });

    $(".wapPackageName:first").click();
}

function packageFactorInit() {
    var wapPackage = $(".wapPackage:first");
    var packageFactorList = JSON.parse(wapPackage.attr("packageFactorList"));
    var factorValueList = JSON.parse(wapPackage.attr("packageIndex"));

    for (var i = 0; i < packageFactorList.length; i++) {
        packageFactor[packageFactorList[i]] = factorValueList[i];
    }
    console.log(packageFactor);
}

function showPackage() {
    $(".wapPackage").hide();
}

function findPackage() {
    var package = null;

    $(".wapPackage").each(function(index, el) {
        var wapPackage = $(el);
        var packageFactorList = JSON.parse(wapPackage.attr("packageFactorList"));
        var factorValueList = JSON.parse(wapPackage.attr("packageIndex"));


    });
}


function returnMessageInit() {
    var wapReturnMessage = $(".wapReturnMessage");
    var messageList = wapReturnMessage.attr("returnMessage").split(",");
    messageList.forEach(function(el) {
        returnMessageObj.details[el] = "";
    });
    console.log(returnMessageObj);
}

function getProductId() {
    var href = location.href;
    href = href.substr(href.lastIndexOf('/') + 1);
    href = href.substring(0, href.indexOf('_'));
    return href;
}
