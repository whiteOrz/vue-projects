/**
 * Created by wuzheng on 2016/7/20.
 */
window.log = function(v) {
    console.log(v);
};
var str = "没有安全系数，感觉身体被掏空，快来助我一“币”之力，冲向里约赢大奖！";

// 所有加载已完成
window.onload = function() {
    var oauthUrl = "";
    if (resultJson) {
        oauthUrl = resultJson.oauthUrl;
        url = oauthUrl;
    }

    var content = JSON.parse(localStorage.getItem("info"));
    //	var center=JSON.parse(localStorage.getItem("center"));

    if (content) {
        $(".picture").attr("src", content.Portrait); //头像
        if (resultJson) {
            $(".change_num").html(resultJson.totalRisk); //能力值
            $(".mess_save_ju").css("width", (Number(resultJson.totalRisk) / 150000) * 100 + "%");
            $(".nezhi").html(content.totalRisk);
            $(".shengbu").html(150000 - content.totalRisk);
        } else {
            $(".change_num").html(content.insured); //能力值
            $(".mess_save_ju").css("width", (Number(content.insured) / 150000) * 100 + "%");
            $(".nezhi").html(content.insured);
            $(".shengbu").html(150000 - content.insured);
        }
        $(".realFriends").html(resultJson.realFriends);
        $(".mess_name").html(resultJson.userInfo.name);
    } else {
        $(".picture").attr("src", resultJson.userInfo.head_img); //头像
        $(".change_num").html(resultJson.totalRisk); //安全系数
        $(".mess_save_ju").css("width", (Number(resultJson.totalRisk) / 150000) * 100 + "%");
        $(".nezhi").html(resultJson.totalRisk);
        $(".shengbu").html(resultJson.differRisk);
        $(".realFriends").html(resultJson.realFriends);
        $(".mess_name").html(resultJson.userInfo.name);
    }

    $("body").on("tap", ".tip-S", function() {
        $(".tipS").removeClass("hide");
    });
    $("body").on("tap", ".help_btn", function() {
        if (resultJson) {
            if(content.totalRisk=="0"){
                massage("未加入微互助！")
            }else{
                $(".share").removeClass("hide");
            }
        }else{
            if(content.insured=="0"){
                massage("未加入微互助！")
            }else{
                $(".share").removeClass("hide");
            }
        }
    });
    $("body").on("touchend", function() {
        $(".share").addClass("hide");
        $(".tipS").addClass("hide");
    });
    $(".goj_btn").on("tap", function() {
        location.href = "/seerkey/market/togo";
    });

    $(".upMoney").on("tap", function() {
        //		massage($(this).data("money"));
        var item = JSON.parse($(this).data("money"));
        $("#moneyNum").html(item.pay);
        $(".upMoney").removeClass("select");
        $(this).addClass("select");
    });
    $("#errordescVar").on("tap", function() {
        $(".windowBox").addClass("hide");
    });
    $("#btnSurePay").on("tap", function() {
        var select = JSON.parse($(".select").data("money"));
        $.post(addWechatInsure, {
            "type": 2,
            "openid": content.openid,
            "otherOpenId": content.openid,
            "prem": select.pay,
            "insured": select.amount
        }, function(r) {
            //			massage(r);
            var res = JSON.parse(r);
            var content = JSON.parse(res.content);
            log(res);
            if (res.code == 0) {
                log(content.result + "/" + content.bankurl);
                location.href = content.bankurl;
            } else {
                massage(res.code + ":" + res.errMsg);
            }
        });
    });
    $(".add_btn2").on("tap", function() {
        if(isNaN(content.insured)){
            massage("数据错误");
            return false;
        }

        var offset = 150000 - Number(content.insured);
        if (offset < 150000) {
            $.post(getpre, {
                "openId": content.openid
            }, function(r) {

                var res = JSON.parse(r);
                var content = JSON.parse(res.content).data;
                $(".upMoney").removeClass("select");
                $($(".upMoney")[0]).addClass("select");
                $("#moneyNum").html(content[0].pay);
                if (res.code == 0) {
                    if (content.length) {
                        $(".upMoney").css("display", "none");
                        for (var i = 0; i < content.length; i++) {
                            var item = JSON.stringify(content[i]);
                            $(".upMoney").eq(i).data("money", item);
                            $(".upMoney").eq(i).find("span").html(content[i].amount);
                            $(".upMoney").eq(i).css("display", "block");

                            if(content[i].amount=="1000" && offset==1000){
                                break;
                            }

                            if(offset/10000 == content[i].amount){
                                break;
                            }
                        }
                        $(".windowBox").removeClass("hide");
                    } else {
                        massage("该好友没有加入微互助");
                    }
                } else {
                    massage(res.code + ":" + res.errMsg);
                }
            });

        } else {
            location.href = "/seerkey/userinfo/toPay?openid=" + content.openid;
        }
    });
};
