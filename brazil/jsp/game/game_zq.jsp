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
<div class="game_wrapper game3_wrapper">
    <img class="game3_zq" src="http://whzt.taikang.com/brazil/static/images/zq/zq1.png"/>
    <img class="game3_smy hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/1.png"/>
    <img class="game3_start hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/2.png"/>
    <img class="game3_ing hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/3.png"/>
    <img class="game3_end hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/4.png"/>
    <img class="game3_success hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/success.png"/>
    <img class="game3_fail hideDiv" src="http://whzt.taikang.com/brazil/static/images/zq/failT.png"/>
    <div class="layout">
        <div class="help_main">
            <img class="role_title" src="http://whzt.taikang.com/brazil/static/images/jz/bsgz.png"/>
            <div class="role_txt">
                <p>点球射门。玩家左右移动足球，瞄准进行射门，每位玩家只有1次射门机会，球进即可获得相应奖励。</p>
            </div>
            <img class="start_btn" src="http://whzt.taikang.com/brazil/static/images/jz/ks.png"/>
        </div>
    </div>
</div>
<div class="layout3 hideDiv">
        <img class="game1_B" src="http://whzt.taikang.com/brazil/static/images/jz/success_b.png"/>
        <div class="help_main fail success">
            <img class="king" src="http://whzt.taikang.com/brazil/static/images/jz/king.png"/>
            <div class="game1_img cess_img">
                <img class="picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png">
            </div>
            <p class="chose_txt">恭喜你获得比赛优胜，你获得<span class="post_num">5000</span>步奖励。</p>
            <img class="get_btn" src="http://whzt.taikang.com/brazil/static/images/jz/get.png"/>
        </div>
    </div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
<script type="text/javascript">
window.onload = function(){
    document.addEventListener("touchmove",function(e){
        e.preventDefault();
    });
    
    var info = JSON.parse(localStorage.getItem("info")); //Portrait
    $(".picture").attr("src",info.Portrait);
    
    $(".layout").on("tap",function(){
       $(this).addClass("hideDiv");
        $(".game3_smy").removeClass("hideDiv");

        var page = { x:0, y:0 };
        $("body").on("touchstart",".game3_wrapper",function(e){
            page.x = e.changedTouches[0].pageX;
            page.y = e.changedTouches[0].pageY;
        });
        var LX;
        $("body").on("touchmove",".game3_wrapper",function(e){
            var pageX = e.changedTouches[0].pageX-page.x;
            var pageY = e.changedTouches[0].pageY-page.y;
            $(".game3_zq").css({"left":(4+pageX/500)+"rem"});
            LX = pageX;
        });
        $("body").on("touchend",".game3_wrapper",function(){
            console.log("LX:"+LX);
            if(LX > 0){//右射门
                var ran = parseInt(10*Math.random());console.log(ran);
                if(ran < 4){
                    $(".game3_zq").addClass("rightt");
                    setTimeout(function(){
                        $(".game3_success").removeClass("hideDiv");
                    },1000);
                    
                    setTimeout(function(){
                        $(".layout3").removeClass("hideDiv");
                    },1000);
                    
                    $(".get_btn").on("tap",function(){//massage("zou");
                    	var postNum = $(".post_num").html();
//                     	massage(JSON.stringify({"gestep":1,"stepcount":postNum,"gamecode":4}));
                    	$.post(gameStep,{"gestep":1,"stepcount":postNum,"gamecode":4},function(r){
//                     		massage(r);
                    		var res = JSON.parse(r);
                    		if(res.code == 0){
                    			setTimeout(function(){
                                	sessionStorage.setItem("game_zq","5000");
                                    history.go(-1);
                                },1000);
                    			return false;
                    		}else{
                    			massage(res.code+":"+res.errMsg);
                    		}
                    	});
                    });
                    
                }else{
                    $(".game3_zq").addClass("srt");
                    setTimeout(function(){
                        $(".game3_fail").removeClass("hideDiv");
                    },1000);
                    /* setTimeout(function(){
                    	sessionStorage.setItem("game_zq","4");
                        history.go(-1);
                    },1000); */
//                     massage(JSON.stringify({"gestep":1,"stepcount":0,"gamecode":4}));
                    $.post(gameStep,{"gestep":1,"stepcount":0,"gamecode":4},function(r){
//                     	massage(r);
                    	var res = JSON.parse(r);
                		if(res.code == 0){
                			setTimeout(function(){
                            	sessionStorage.setItem("game_zq","0");
                                history.go(-1);
                            },1000);
                			return false;
                		}else{
                			massage(res.code+":"+res.errMsg);
                		}
                    });
                };
                $(".game3_smy").addClass("hideDiv");
                $(".game3_start").removeClass("hideDiv");
                setTimeout(function(){
                    $(".game3_start").addClass("hideDiv");
                    $(".game3_ing").removeClass("hideDiv");
                },200);
                setTimeout(function(){
                    $(".game3_ing").addClass("hideDiv");
                    $(".game3_end").removeClass("hideDiv");
                },400);
                setTimeout(function(){
                    $(".game3_ing").addClass("hideDiv");
                    $(".game3_end").removeClass("hideDiv");
                },400);
            }else{//左射门
                var ran = parseInt(10*Math.random());console.log("ran:"+ran);
                if(ran < 4){
                    $(".game3_zq").addClass("zt");
                    setTimeout(function(){
                        $(".game3_success").removeClass("hideDiv");
                    },1000);
                    
                    setTimeout(function(){
                        $(".layout3").removeClass("hideDiv");
                    },1000);
                    
                    $(".get_btn").on("tap",function(){
                    	var postNum = $(".post_num").html();
//                     	massage(JSON.stringify({"gestep":1,"stepcount":postNum,"gamecode":4}));
                    	$.post(gameStep,{"gestep":1,"stepcount":postNum,"gamecode":4},function(r){
//                     		massage(r);
                    		var res = JSON.parse(r);
                    		if(res.code == 0){
                    			setTimeout(function(){
                                	sessionStorage.setItem("game_zq","5000");
                                    history.go(-1);
                                },1000);
                    			return false;
                    		}else{
                    			massage(res.code+":"+res.errMsg);
                    		}
                    	});
                    });
                }else{
                    $(".game3_zq").addClass("slt");
                    setTimeout(function(){
                        $(".game3_fail").removeClass("hideDiv");
                    },1000);
                    /* setTimeout(function(){
                    	sessionStorage.setItem("game_zq","4");
                        history.go(-1);
                    },1500); */
                    
//                     massage(JSON.stringify({"gestep":1,"stepcount":0,"gamecode":4}));
                    $.post(gameStep,{"gestep":1,"stepcount":0,"gamecode":4},function(r){
//                     	massage(r);
                    	var res = JSON.parse(r);
                		if(res.code == 0){
                			setTimeout(function(){
                            	sessionStorage.setItem("game_zq","0");
                                history.go(-1);
                            },1000);
                			return false;
                		}else{
                			massage(res.code+":"+res.errMsg);
                		}
                    });
                };
                $(".game3_smy").addClass("hideDiv");
                $(".game3_start").addClass("game3_startL").removeClass("hideDiv");
                setTimeout(function(){
                    $(".game3_start").addClass("hideDiv");
                    $(".game3_ing").addClass("game3_ingL").removeClass("hideDiv");
                },200);
                setTimeout(function(){
                    $(".game3_ing").addClass("hideDiv");
                    $(".game3_end").addClass("game3_endL").removeClass("hideDiv");
                },400);
            }
            $(".game3_wrapper").off("touchstart touchmove touchend")
        });
    });
}
</script>
</html>