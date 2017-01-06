var template = '<li itemId="$id">$content<label><input type="checkbox"name="question"><span></span></label></li>';
var proUrl = product.proUrl;
var server_url = product.server_url;

var productId = getLocVal("productId");
var applicationId = getLocVal("applicationId");
var applicationToken = getLocVal("applicationToken");
var packagePrice = getLocVal("price") || "";
var productName = getLocVal("productName");
var openId = getLocVal("openId");

$(function() {
    TKTrack({
        "event": "健康告知页面",
        "subType": "财险_" + productName
    });
    $("#formTotal").text(packagePrice);

    $.ajax({
        url: proUrl + "productMetadata/" + productId + "/wap/healthinfo",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
            "applicationId": applicationId,
            "applicationToken": applicationToken
        })
    }).done(function(data) {
        if (data.code == "0") {
            initHealthInfo(data.data.valueList);
        } else {
            alertbox(data.message);
        }
    }).fail(function(error) {
        alertbox("网络繁忙，健康告知加载失败!");
    });

    var isInApp = getLocVal("isInApp");
    if (isInApp == "1") {
        $(".header").hide();
        $(".index-wrap").css("padding-top", "0");
    }
});

function initHealthInfo(data) {
    var html = "";
    data.forEach(function(item) {
        var healthInfo = template.replace("$id", item.itemId);
        healthInfo = healthInfo.replace("$content", item.content);
        html += healthInfo;
    });

    $("#valueListCont").html(html);
}

$("#paysubmit").on("click", function() {
    try {
        if (getLocVal("yonghuxinxi")) {
            _smq.push(['custom', '投保流程_健康告知', '确认支付', '财险_' + productName]);
        } else {
            _smq.push(['custom', '【免登录】投保流程_健康告知', '确认支付', '财险_' + productName]);
        }
        TKTrack({
            "event": "确认支付",
            "subType": "财险_" + productName
        });
    } catch (e) {

    }

    //如果存在选择是，显示描述框
    var checklist = $(".questionlist").find("input[type=checkbox]");
    for (var i = 0; i < checklist.length; i++) {
        if ($(checklist[i]).prop("checked")) {
            showHealthInfoErrorMessage();
            return false;
        }
    }

    var informList = [];
    checklist.each(function(index, el) {
        informList[index] = {
            "informID": $(el).parent().parent().attr("itemId"),
            "informAnswer": "否"
        }
    });

    if (informList.length == 0) {
        alertbox("没有健康告知信息无法投保！");
        return false;
    }

    /*接口保存健康告知信息*/
    var postData = {
        "applicationToken": applicationToken,
        "processHandler": "property",
        "platform": "wap",
        "healthinfo": {
            "informList": informList
        }
    }

    var member = getLocVal("yonghuxinxi");
    if (member) {
        member = JSON.parse(member);
    }

    var sid = getLocVal("memberid");
    var token = getLocVal("mfpd_sign");

    if (!sid && member) {
        sid = member.member_sid;
    }
    if (!token && member) {
        token = member.token;
    }

    if (sid && token) {
        postData.memberId = sid;
        postData.memberToken = token;
    }

    $.ajax({
        url: proUrl + "application/" + applicationId + "/healthinfo",
        type: "post",
        dataType: "json",
        data: JSON.stringify(postData),
        beforeSend: function() {
            $("#leaveMasker").show();
        }
    }).done(function(result) {
        if (result.code == "0") {
            location.href = server_url + "/product/wap/insure/pay.html";
        } else {
            setLocVal("errorMsg", result.message);
            location.href = server_url + "/product/wap/insure/fail.html";
        }
        $("#leaveMasker").hide();
    }).fail(function() {
        alertbox("网络繁忙，订单生成失败！");
        $("#leaveMasker").hide();
    });
});

function showHealthInfoErrorMessage() {
    $("#liabilityMasker").show();
    $(".liabilityBox").addClass("ldown");
    $("#liabilityMasker h2").html("健康告知不通过");
    $("#liabilityMasker .liabilityContent").html("啊哦，您的健康告知信息不符合核保规定，再去看看别的产品吧~");
    $("body").addClass("lockBody");
}

$(".liabilityBtnArea").click(function() {
    $(".liabilityBox").removeClass("ldown");
    $("#liabilityMasker").hide();
    $("body").removeClass("lockBody");
});

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
