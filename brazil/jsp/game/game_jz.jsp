<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"> -->
    <script src="http://whzt.taikang.com/brazil/static/js/flexible.debug.js"></script>
    <link rel="apple-touch-icon" href="http://whzt.taikang.com/brazil/static/favicon.png">
    <link rel="Shortcut Icon" href="http://whzt.taikang.com/brazil/static/favicon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/game.css">
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="game_wrapper game1_wrapper">
    <div class="slide"><p class="hongbiao"><span class="move_box"></span></p></div>
    <img class="game1_start hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/1.png"/>
    <img class="zj_btn hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/jz.png"/>
    <img class="game1_ing hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/2.png"/>
    <img class="game1_success hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/3.png"/>
    <img class="game1_successT hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/success.png"/>
    <img class="game1_fail hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/fail.png"/>
    <img class="game1_failT hideDiv" src="http://whzt.taikang.com/brazil/static/images/jz/failT.png"/>
    <div class="layout ">
        <div class="help_main">
            <img class="role_title" src="http://whzt.taikang.com/brazil/static/images/jz/bsgz.png"/>
            <div class="role_txt">
                <p>黑色光标在右侧力量条内不停移动，当光标移动到红色区域内力量达到最大，点击“举重”举起杠铃，完成项目，获得金牌，你拥有2次机会。</p>
            </div>
            <img class="start_btn" src="http://whzt.taikang.com/brazil/static/images/jz/ks.png"/>
        </div>
    </div>
    <div class="layout2 hideDiv">
        <div class="help_main fail">
            <div class="game1_img">
                <img class="picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png">
            </div>
            <img class="game1_sorry" src="http://whzt.taikang.com/brazil/static/images/jz/sorry.png"/>
            <p class="chose_txt has_once">您还有一次机会哦~</p>
            <p class="chose_txt no_chose hideDiv">您两次机会已经用完了！</p>
            <img class="once_btn" src="http://whzt.taikang.com/brazil/static/images/jz/yx_zlyc.png"/>
        </div>
    </div>
    <div class="layout3 hideDiv">
        <img class="game1_B" src="http://whzt.taikang.com/brazil/static/images/jz/success_b.png"/>
        <div class="help_main fail success">
            <img class="king" src="http://whzt.taikang.com/brazil/static/images/jz/king.png"/>
            <div class="game1_img cess_img">
                <img class="picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png">
            </div>
            <p class="chose_txt">恭喜你获得比赛优胜，你获得<span class="post_num">3000</span>步奖励。</p>
            <img class="get_btn" src="http://whzt.taikang.com/brazil/static/images/jz/get.png"/>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/common.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript">
window.onload = function(){
    document.addEventListener("touchmove",function(e){
        e.preventDefault();
    });
    
    console.log(localStorage.getItem("info"));
    var info = JSON.parse(localStorage.getItem("info")); //Portrait
    $(".picture").attr("src",info.Portrait);
    
    var flag = 0;
    if(flag == 2){console.log(flag)}
    $(".start_btn").on("tap",function(){
        $(".layout").addClass("hideDiv");
        $(".game1_start").removeClass("hideDiv").animate({
            bottom: 2.9+"rem"
        });
        $(".zj_btn").removeClass("hideDiv").addClass("bigger");
        $(".move_box").addClass("loop");
    })
    $(".zj_btn").on("tap",function(){
        flag ++;
        console.log("flag:"+flag);
        var milldle = parseInt($(".move_box").css("top"))/75;console.log(milldle);
        if(milldle >= 2.8 && milldle<=4.3){//成功
            $(".move_box").removeClass("loop");
            $(".game1_start").css("bottom","0rem");
            $(this).off("tap");
            $(".game1_start,.zj_btn").addClass("hideDiv");
            $(".game1_ing").removeClass("hideDiv");
            setTimeout(function(){
                $(".game1_ing").addClass("hideDiv");
                $(".game1_success").removeClass("hideDiv");
            },300);
            setTimeout(function(){
                $(".game1_successT").removeClass("hideDiv").addClass("bigger");
            },200);
            setTimeout(function(){
                $(".layout3").removeClass("hideDiv");
            },2000);
            //游戏成功传参
            $(".get_btn").on("tap",function(){
            	var postNum = $(".post_num").html();
//             	massage(JSON.stringify({"gestep":1,"stepcount":postNum,"gamecode":2}));
            	$.post(gameStep,{"gestep":1,"stepcount":postNum,"gamecode":2},function(r){
//             		massage(r);
            		var res = JSON.parse(r);
            		if(res.code == 0){
            			setTimeout(function(){
                        	sessionStorage.setItem("game_jz","3000");
                            history.go(-1);
                        },1000);
            			return false;
            		}else{
            			massage(res.code+":"+res.errMsg);
            		}
            	});
            });
        }else{//失败
            $(".move_box").removeClass("loop");
            if(flag ==3 ){
                $(".has_once").addClass("hideDiv");
                $(".no_chose").removeClass("hideDiv");
                $(".once_btn").addClass("hideDiv");
                //window.location.href = "/seerkey/userinfo/toCenter?openid="+openId+"sites="+sites;
                setTimeout(function(){
                	sessionStorage.setItem("game_jz","0");
                    history.go(-1);
                },1500);
            }
            $(".game1_start").css("bottom","0rem");
            $(".game1_fail").removeClass("hideDiv");
            $(".game1_failT").removeClass("hideDiv");
            $(".game1_start,.zj_btn").addClass("hideDiv");
            setTimeout(function(){
                $(".layout2").removeClass("hideDiv");
            },1000); 
        };
        
        //玩过游戏后返回参数给后台做标示
        $(".once_btn").on("tap",function(){
//         	massage(JSON.stringify({"gestep":1,"stepcount":0,"gamecode":2}))
        	$.post(gameStep,{"gestep":1,"stepcount":0,"gamecode":2},function(r){
//         		massage(r);
        		var res = JSON.parse(r);
        		if(res.code == 0){
        			//
        		}else{
        			massage(res.code+":"+res.errMsg);
        		}
        	});
        });
        
    });
    $(".once_btn").on("tap",function(){
        flag+=1;
        $(".layout2").addClass("hideDiv");
        $(".move_box").addClass("loop");
        $(".game1_fail,.game1_failT").addClass("hideDiv");
        $(".game1_start").removeClass("hideDiv").animate({
            bottom: 2.9+"rem"
        });
        $(".zj_btn").removeClass("hideDiv").addClass("bigger");
    });
}
</script>
</html>