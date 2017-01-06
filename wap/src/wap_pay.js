var proUrl = product.proUrl;
var server_url = product.server_url;

var paywayId = "";
var packagePrice = "100";
var isInWX = isWeiXin();
var openId = getLocVal("openId") || "";
var clock = 0;
var clockTimer;

var packagePrice = getLocVal("price") || "";
$(".price").text("￥" + packagePrice);

var appName = getLocVal("applicantName") || "";
$("#applicantName").text(appName);

var insureName = getLocVal("insuredName") || "";
$("#insurantName").text(insureName);

var productId = getLocVal("productId");
var applicationId = getLocVal("applicationId");
var applicationToken = getLocVal("applicationToken");
var platform = "wap";

var productName = getLocVal("productName") || "";
var liabilityContents = getLocVal("liabilityContents") || "";
if (liabilityContents) {
    liabilityContents = JSON.parse(liabilityContents);
    liabilityContents = liabilityContents.liabilityContents;
}

$(".productName").text(productName);
var liabilityHtml = "";
$.each(liabilityContents, function(index, el) {
    liabilityHtml += el.liabilityName + "&nbsp;&nbsp;&nbsp;" + el.liabilityAmount + "<br />";
});
$(".liabilitys").html(liabilityHtml);

var tradeId = "";
var tradeToken = "";

$.ajax({
    url: proUrl + "productMetadata/" + productId + "/" + platform + "/payment?payAmount=" + packagePrice,
    type: "get",
    dataType: "json"
}).done(function(data) {
    if (data.code == "0") {
        initPayInfo(data.data.wapPayment);
    } else {
        alertbox(data.message);
    }
}).fail(function() {

});

function initPayInfo(data) {
    data.forEach(function(component) {
        var currentCompId = "";
        var id = component.componentId;
        if (id != "tkPaymentList") {
            return;
        }
        var template = components[id];
        if (template) {
            currentCompId = id;
            $(".container").append(template);
        }

        for (var key in component) {
            if ($.isArray(component[key])) {
                var arr = component[key];
                arr.forEach(function(payway) {
                    var payTemp = components[payway.componentId];
                    if (payTemp) {
                        payTemp = payTemp.replace("$lable", payway.paymentDesc);
                        payTemp = payTemp.replace("$paywayId", payway.paywayId);
                        if (payway.paywayId == "32") {
                            payTemp = payTemp.replace("$imgUrl", "payZFB");
                        } else {
                            payTemp = payTemp.replace("$imgUrl", "payWX");
                        }

                        $("#" + currentCompId).append(payTemp);
                    }
                });
            }
        }
    });
    initPageEvent();
    var isInApp = getLocVal("isInApp");
    if (isInApp == "1") {
        $(".header").hide();
        $(".container").css("padding-top", "0");
    }
}

function initPageEvent() {
    $(".payWays").click(function() {
        var str = $(this).find("label").text();
        if (str.indexOf("支付宝") > -1) {
            str = "支付宝支付";
        }
        $("#payStyle").text(str);
        paywayId = $(this).find("input").val();
    });
    $(".payWays").eq(0).click();
    $(".payWays").eq(0).find('input').attr("checked", true);

    $("#paySuccess").click(checkPayStatus);

    $("#payFail").click(function(event) {
        $(".back_tips").hide();
    });

    $("#payBtn").click(function() {
        if (clock > 0) {
            alertbox("请" + clock + "秒后再进行支付！");
            return false;
        }

        var productName = getLocVal("productName");
        try {
            if (getLocVal("yonghuxinxi")) {
                _smq.push(['custom', '投保流程_选择支付', '确认支付', '财险_' + productName]);
            } else {
                _smq.push(['custom', '【免登录】投保流程_选择支付', '确认支付', '财险_' + productName]);
            }
            TKTrack({ "event": "确认支付", "subType": "财险_" + productName });
        } catch (e) {

        }

        if (isInWX && openId && paywayId == "72") {
            paywayId = "71";
        }

        var postData = {
            platform: "wap",
            applicationToken: applicationToken,
            processHandler: "property",
            successUrl: server_url + "/product/wap/insure/success.html",
            failUrl: server_url + "/product/wap/insure/tip.html",
            payment: {
                paywayId: paywayId,
                tradeCost: packagePrice
            }
        };

        if (openId) {
            postData.openId = openId;
        }

        $.ajax({
            url: proUrl + "application/" + applicationId + "/payment",
            type: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                clock = 30;
                clockTimer = setInterval(function() {
                    clock--;
                    if (clock <= 0) {
                        clearInterval(clockTimer);
                    }
                }, 1000);

                if (paywayId == "72") {
                    $(".back_tips").show();
                    setTimeout(function() {
                        $("#dialogbox").show();
                    }, 500);
                } else {
                    $(".leaveMasker").show();
                }
            }
        }).done(function(data) {
            $(".leaveMasker").hide();
            if (data.code == 0) {
                tradeId = data.data.tradeId;
                tradeToken = data.data.tradeToken;

                setLocVal("orderId", tradeId);

                if (paywayId == "32" && isInWX) {
                    location.href = server_url + '/proAllpayZFBGuide.html?' + data.data.payUrl;
                } else {
                    location.href = data.data.payUrl;
                }
            } else if (data.code == "200002005" || data.code == "200001003") {
                location.href = server_url + "/product/wap/insure/tip.html?a=1";
            } else {
                alertbox(data.message);
            }
        }).fail(function() {
            $(".leaveMasker").hide();
            alertbox("网络繁忙，支付失败");
        });
    });
}

function checkPayStatus() {
    $("#dialogbox").hide();
    $("#dialogbox2").show();
    var num = 0;

    var timer = setInterval(function() {
        $.ajax({
            url: proUrl + "application/getPayStatusByCache",
            type: "get",
            dataType: "json",
            data: {
                tradeId: tradeId,
                tradeToken: tradeToken
            }
        }).done(function(result) {
            if (!result.data) {
                return false;
            }
            num++;

            var status = result.data.payStatus;
            if (num > 10 && status == "-1") {
                clearInterval(timer);
                $(".back_tips").hide();
                $("#dialogbox").hide();
                $("#dialogbox2").hide();
            }

            if (status == "0" || status == "1") {
                clearInterval(timer);
                $(".back_tips").hide();
                $("#dialogbox").hide();
                $("#dialogbox2").hide();

                if (status == "0") { //支付成功
                    location.href = server_url + "/product/wap/insure/success.html";
                } else { //支付失败
                    location.href = server_url + "/product/wap/insure/tip.html";
                }
            }
        }).fail(function() {
            $(".back_tips").hide();
            location.href = server_url + "/product/wap/insure/tip.html";
        });
    }, 3000);
}

function alertbox(message) {
    $("#alertBox").show();
    $("#alertBox").animate({
        "opacity": "1"
    }, 400);
    $("#alertBox p").text(message);

    setTimeout(function() {
        $("#alertBox").animate({
            "opacity": "0"
        }, 400, function() {
            $("#alertBox").hide();
        });
    }, 2000);
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    return false;
}

var components = Object.freeze({
    tkTradeDetailList: '<article class="list detaillist"id="tkTradeDetailList"></article>',
    tkPaymentList: '<h2 class="title">支付方式</h2><article class="list paylist"><ul class="item"id="tkPaymentList"></ul></article>',
    tkPayment: '<li class="payWays $imgUrl"><label>$lable<input type="radio"name="pay"value="$paywayId"><span></span></label></li>'
});
