/**
 * Created by wuzheng on 2016/7/20.
 */
window.log = function(v) {
    console.log(v);
};
var selected, headurl, myopenid, myP;
// myopenid="omCIGj3mOm01EoxfpHzhengzheng";

var info;
// 所有加载已完成
window.onload = function() {
    info = JSON.parse(localStorage.getItem("info"));
    $(".market").removeClass("hide");
    $(".tab1 ,.tab2").on(
        "tap",
        function() {

            if ($(this).hasClass("tab1")) {
                $($(".tab1")[0]).removeClass("hide").addClass("active");
                $($(".tab1")[1]).removeClass("hide");

                $($(".tab2")[0]).addClass("hide").removeClass("active");
                $($(".tab2")[1]).removeClass("hide");
                if ($(".l1").hasClass("hide")) {
                    refurbishdata(1);
                }
                $(".l1").removeClass("hide");
                $(".l0").addClass("hide");
                selected = null;
                $(".list .redio").attr("src",
                    "http://whzt.taikang.com/brazil/static/imgs/market/redio1.png");
            } else {
                $($(".tab2")[0]).removeClass("hide").addClass("active");
                $($(".tab2")[1]).removeClass("hide");

                $($(".tab1")[0]).addClass("hide").removeClass("active");
                $($(".tab1")[1]).removeClass("hide");

                if ($(".l0").hasClass("hide")) {
                    refurbishdata(0);
                }
                $(".l1").addClass("hide");
                $(".l0").removeClass("hide");
                selected = null;
                $(".list .redio").attr("src",
                    "http://whzt.taikang.com/brazil/static/imgs/market/redio1.png");
            }
            // window.location.href = window.location.href + "?v=" +
            // Math.random();
        });
    $(".list li").on("tap",function() {
        $(".list .redio").attr("src","http://whzt.taikang.com/brazil/static/imgs/market/redio1.png");
        $(this).find(".redio").attr("src","http://whzt.taikang.com/brazil/static/imgs/market/redio2.png");
        selected = JSON.parse($(this).data("res"));
    });

    $(".publish_btn").on("tap", function() {
        var index = Number($(".active").data("v"));
        $.post(toPub, {
            "type": index
        }, function(r) {
            var res = JSON.parse(r);
            if (res.code == 0) {
                massage("发送成功！");
            } else if(res.code == -1){

            }else{
                massage(res.errMsg);
            }

            $(".publish_box").addClass("hide");
        });
    });
    $(".publish").on("tap", function() {
        var index = Number($(".active").data("v"));
        if (index) {
            $($(".publish_box .alert .content")[0]).addClass("hide");
            $($(".publish_box .alert .content")[1]).removeClass("hide");
        } else {
            $($(".publish_box .alert .content")[0]).removeClass("hide");
            $($(".publish_box .alert .content")[1]).addClass("hide");
        }
        $(".publish_box").removeClass("hide");
    });
    $(".i_get").on(
        "tap",
        function() {

            if (selected) {
                $(".i_get_box .headimg").css(
                    "background",
                    "url('" + selected.head_img +
                    "') no-repeat center/cover");
                $(".i_get_box .i_name").html(selected.name);
                $(".i_get_box").removeClass("hide");
            } else {
                massage("请选择一个人");
            }
        });
    $(".addInsure_btn").on("tap", function() {
        //		massage(JSON.stringify({
        //			"openid" : info.openid,
        //			"otherOpenid" : selected.openid,
        //			"serialno":selected.orderid
        //		}));
        $.post(addInsure, {
            "openid": info.openid,
            "otherOpenid": selected.openid,
            "serialno": selected.orderid
        }, function(r) {
            //			massage(r);
            var res = JSON.parse(r);
            if (res.code == 0) {
                $(".addInsure").addClass("hide");
            } else if (res.code = 1) {
                $(".fail_addInsure").removeClass("hide");
            }
            log(res);
        });
    });
    $(".return").on("tap", function() {
        $(".i_get_box").addClass("hide");
        $(".publish_box").addClass("hide");
        $(".addInsure").addClass("hide");
        $(".fail_addInsure").addClass("hide");
    });
    $(".toup").on("tap", function() {
        // alert("来~~刚哥~~要啥有啥勒！\n我的openid:\n"+myopenid+"\n选中的那个人的openid：\n"+selected.openid);

        // selected.openid="omCIGj3mOm01EoxfpH_PTLBcnnvw";//刚
        // myopenid="omCIGj4jKh4vdT2oR1P3exnRh8_Y";//陈程
        //		alert(JSON.stringify({
        //			"openid" : info.openid,
        //			"otherOpenId" : selected.openid,
        //			"type" : 1,
        //			"orderid" : selected.orderid
        //		}));
        //		massage("zheng:"+JSON.stringify({"openId":selected .openid}));
        $.post(getpre, {
            "openId": selected.openid
        }, function(r) {
            //			$.post(getpre,{"openId":"omCIGj0eiv1adqWo8Z8SM6IgAmtA"},function(r){
            //			massage("wuzheng:"+r);
            var res = JSON.parse(r);
            if (res.code == 0) {
                var content = JSON.parse(res.content).data;
                //				massage(JSON.stringify(content[0]));
                if (content.length) {
                    var select = content[0];

                    $.post(addWechatInsure, {
                        "openid": info.openid,
                        "otherOpenId": selected.openid,
                        "type": 1,
                        "orderid": selected.orderid,
                        "prem": select.pay,
                        "insured": (select.amount < 9 ? select.amount * 10000 : select.amount)
                    }, function(r) {
                        //						massage(r);
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
                } else {
                    massage("该好友没有加入微互助");
                }
            } else {
                massage(res.code + ":" + res.errMsg);
            }
        });


    });
    $(".plusSafety").on("tap", function() {
        if (info.sum_sc < 1000) {
            massage("能量值小于1000时不能向好友索取安全系数！");
            return;
        }
        if (selected) {
            $(".addInsure").removeClass("hide");
            $(".addInsure .myP").html(myP);
            // var index = $(".active").data("v");console.log(index);
            // $.post(toPub,{"type":index,"openid":selectedid},function(res){
            // log(res.code);
            //
            // });
        } else {
            massage("请选择一个人");
        }
    });
    $(".refurbish").on("tap", function() {
        var index = $(".active").data("v");
        refurbishdata(index);
    });
    $(".creat").on("tap", function() {
        location.href = "../userinfo/toPay";
    });
    $(".give").on("tap", function() {
        $(".addInsure").addClass("hide");
        $(".fail_addInsure").addClass("hide");
        if (confirm("捐赠1000能量值（确认后将扣除你1000能量值）")) {
            //			massage(JSON.stringify({
            //				"openid" : info.openid,
            //				"otherOpenid" : selected.openid,
            //				"type" : 1,
            //				"orderid" : selected.orderid
            //			}));
            $.post(toDonation, {
                "openid": info.openid,
                "otherOpenid": selected.openid,
            }, function(r) {
                //				massage(r);
                var res = JSON.parse(r);
                if (res.code == 0) {
                    massage("捐赠成功！");
                } else {
                    massage(res.code + ":" + res.errMsg);
                }
            });
        };
    });

};

function fill(r) {
    var index = $(".active").data("v");
    for (var i = 0; i < 5; i++) {
        if (r.length > i) {
            $($(".l" + index + " .i_name")[i]).parent().parent().show();
            $($(".l" + index + " .i_name")[i]).html(r[i].name);
            $($(".l" + index + " .headimg")[i]).attr("src", r[i].head_img);
            $($(".l" + index + " li")[i]).data("res", JSON.stringify(r[i]));
        } else {
            $($(".l" + index + " .i_name")[i]).parent().parent().hide();
        }
    }
}

function refurbishdata(type) {

    $(".list .redio").attr("src", "http://whzt.taikang.com/brazil/static/imgs/market/redio1.png");

    //	massage(JSON.stringify({
    //		"type" : type,
    //		"openid" : info.openid
    //	}));
    $.post(market_refurbishURL, {
        "type": type,
        "openid": info.openid
    }, function(res) {
        // console.log(market_refurbishURL);
        //		massage(res);
        var r = JSON.parse(res);
        if (r.code == 0) {
            // var nameList = JSON.parse(r.data);
            fill(JSON.parse(r.content));
        } else {
            massage(r.code + ":" + r.error);
        }
    });
}
