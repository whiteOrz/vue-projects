window.log = function (v) {
    console.log(v);
};
window.onload = function () {

    var isJoin = resultjson.isJoin;
    var sites = resultjson.sites;
    var nextstlg = resultjson.xia;
    var myTotal = resultjson.myTotal;
//    massage("nextstlg:"+nextstlg);
    var orderid = resultjson.orderid;
    $(".help_mian").html(nextstlg);

    var nextsites;//下一站
    if(sites==1){
        nextsites="雅典";
    }else if(sites==2){
        nextsites="北京";
    }else if(sites==3){
        nextsites="里约";
    }else if(sites==4){
        nextsites="泰康大厦";
    }
    $(".thissites").html(nextsites);
    $(".nextsites").html(nextsites);

//    $(".picture").attr("src", resultjson.otherUserInfo.head_img);
//    $(".mess_name").html(resultjson.otherUserInfo.name);

//    $(".colorO").html(resultjson.otherUserInfo.name);
    $(".content span").html(myTotal);
    $(".picture").attr("src", resultjson.headImg);
    $(".mess_name").html(resultjson.nickname);
    $(".colorO").html(resultjson.nickname);

    $(".get_btn").on("tap", function () {
        if (isJoin) {
        	if(myTotal>=1000){
				$(".gitbox").removeClass("hide");
				//$(".gitbox").css("display","block");
			}else{
				massage("步数不够1000")
			}
        } else {
//            massage("去二维码关注页面")
        	location.href="http://weit.taikang.com/seerkey/subscribe";
        }
    });

    $(".gitbox").on("tap",".enter",function () {
        $(".gitbox").addClass("hide");
        $(".git").removeClass("hide");
		setTimeout(function(){
			$(".git").addClass("hide");
		},2000);
        //增加到挂起订单表
        var postUrl =  localhostPaht + projectName + "/market/addPending";
        $.post(postUrl,{"openid":resultjson.openid,"otherOpenid":resultjson.otheropenid,"serialno":orderid},function(r){
            var res=JSON.parse(r);
//            massage("挂起返回数据"+r);
            if(res.code==0){
//                massage("成功挂起订单到列表")
                location.href=localhostPaht + projectName + "/userinfo/toPower?openid="+resultjson.openid;
            }else{
                massage(res.content);
            }
            $(".gitbox").addClass("hide");
        });
    });
    $(".gitbox").on("tap",".cancle", function () {
        $(".gitbox").addClass("hide");
    });

    $(".give_btn").on("tap", function () {
		
    	if(myTotal>=1000){
        if (isJoin) {
            var postUrl =  localhostPaht + projectName + "/userinfo/toDonation";
            $.post(postUrl,{"openid":resultjson.openid,"otherOpenid":resultjson.otheropenid},function(res){
                log(res);
                if(res.code=="T"){
                    massage(res.errMsg);
                    location.href =localhostPaht + projectName + "/userinfo/toPower?openid="+resultjson.openid;
                }else{
                    massage(res.errMsg);
                }
            },'json');
        } else {
//            massage("去二维码关注页面")
        	location.href="http://weit.taikang.com/seerkey/subscribe";
        }
        }else{
        	massage("步数不够1000");
        }
    });

    $(".play_btn").on("tap", function () {
        //massage(localhostPaht+projectName);
		var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fa037cc7dfabad5&redirect_uri=http://hw.weixin.qq.com/steprank/auth?appid=wxcd7143c00e5bb6f7&scope=snsapi_userinfo,snsapi_health_realtime&response_type=code&scope=snsapi_base&state=A1&connect_redirect=1&other=step#wechat_redirect";
	//	var url = localhostPaht + projectName + "/userto/login";
        window.location.href = url;
    });
};