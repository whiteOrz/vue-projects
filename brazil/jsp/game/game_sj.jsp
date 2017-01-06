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
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/game.css">
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="game_wrapper game2_wrapper">
    <img class="zhongb hideDiv" src="http://whzt.taikang.com/brazil/static/images/sj/d_jb.png"/>
    <img class="game2_zhong hideDiv" src="http://whzt.taikang.com/brazil/static/images/sj/j.png"/>
    <img class="game2_start hideDiv" src="http://whzt.taikang.com/brazil/static/images/sj/sjw_shou.png"/>
    <img class="game2_ing hideDiv" src="http://whzt.taikang.com/brazil/static/images/sj/sj_shou.png"/>
    <img class="game2_end help hideDiv" src="http://whzt.taikang.com/brazil/static/images/sj/sj_shou_wj.png"/>
    <p class="dott hideDiv"></p>
    <div class="layout ">
        <div class="help_main">
            <img class="role_title" src="http://whzt.taikang.com/brazil/static/images/jz/bsgz.png"/>
            <div class="role_txt">
                <p>玩家左右移动弓箭，瞄准箭靶进行发射，每位玩家共有3次射箭机会，射中即可获得相应奖励。</p>
            </div>
            <img class="start_btn" src="http://whzt.taikang.com/brazil/static/images/jz/ks.png"/>
        </div>
    </div>
</div>
<div class="layout2 hideDiv">
        <div class="help_main fail">
            <div class="game1_img">
                <img class="picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png">
            </div>
            <img class="game1_sorry" src="http://whzt.taikang.com/brazil/static/images/jz/sorry.png"/>
            <p class="chose_txt has_once">您还有一次机会哦~</p>
            <p class="chose_txt no_chose hideDiv">您三次机会已经用完了！</p>
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
            <p class="chose_txt">恭喜你获得比赛优胜，你获得<span class="post_num">2000</span>步奖励。</p>
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
    
    var flag = 0;
    if(flag == 2){console.log(flag)}
    
    $(".game2_wrapper").on("tap",".start_btn",function(){
        $(".layout").addClass("hideDiv");
        $(".zhongb").removeClass("hideDiv");
        //$(".game2_zhong").removeClass("hideDiv");
        $(".game2_start").removeClass("hideDiv");

        var page = { x:0, y:0 };
        $("body").on("touchstart",".game2_wrapper",function(e){
        	flag ++;
            page.x = e.changedTouches[0].pageX;
            page.y = e.changedTouches[0].pageY;
            $(".game2_start").addClass("hideDiv");
            $(".game2_ing").removeClass("hideDiv");
        });
        var left2,top2;
        $("body").on("touchmove",".game2_wrapper",function(e){
            var pageX = e.changedTouches[0].pageX-page.x;
            var pageY = e.changedTouches[0].pageY-page.y;
            $(".game2_ing").css({"left":(4+pageX/500)+"rem","bottom":Math.min(0,(-.3-pageY/500))+"rem"});
            left2 = $(".game2_ing").css("left"),
            top2 = $(".game2_ing").css("top");
        });
        $("body").on("touchend touchcancle",".game2_wrapper",function(){
            $(".game2_ing").addClass("hideDiv");
            $(".game2_end").removeClass("hideDiv").css({"top":top2,"left":left2});
            $(".dott").removeClass("hideDiv");
            var top = (Math.random()*(200-100)+100)/75,
                left = (Math.random()*(200-100)+100)/75;
            $(".game2_zhong").css({"top":top+"rem","left":left+"rem"}).removeClass("hideDiv");
            $(".game2_wrapper").off("touchstart touchmove touchend");

            if( top>1.7 && top<3.2 ){
                if(left<2.4 && left>0.8){
                    //massage("成功2")//成功
                    
                    setTimeout(function(){
		                $(".layout3").removeClass("hideDiv");
		            },400);
                    
                    $(".get_btn").on("tap",function(){
                    	
                    	var postNum = $(".post_num").html();
//                 		massage(JSON.stringify({"gestep":1,"stepcount":postNum,"gamecode":3}));
                		
                        $.post(gameStep,{"gestep":1,"stepcount":postNum,"gamecode":3},function(r){
                        	
//                         	massage(r);
                    		var res = JSON.parse(r); 
                    		if(res.code == 0){
                    			setTimeout(function(){
                                	sessionStorage.setItem("game_sj","2000");
                                    history.go(-1);
                                },1000);
                    		}else{
                    			massage(res.code+":"+res.errMsg);
                    		}                    	
                        }); 
                    }); 
                                        
                }else{
                    //massage("失败1")//失败
                    if(flag == 3){
                    	setTimeout(function(){
        	                $(".layout2").removeClass("hideDiv");
        	                $(".no_chose").removeClass("hideDiv");
    		                $(".has_once").addClass("hideDiv");
    		                $(".once_btn").addClass("hideDiv");
        	            },400);
               			
                    	setTimeout(function(){
                        	sessionStorage.setItem("game_sj","0");
                            history.go(-1);
                        },1500);
                    }
                    setTimeout(function(){
		                $(".layout2").removeClass("hideDiv");
		                $(".no_chose").removeClass("hideDiv");
		                $(".has_once").addClass("hideDiv");
		            },1000);
                   $("body").on("tap",".once_btn",function(){
	                   	$(".game2_wrapper").on("touchstart touchmove touchend");
	                   	$(".layout2").addClass("hideDiv");
	                   	$(".layout2").addClass("hideDiv");
	                   	$(".game2_end").addClass("hideDiv");
	                   	$(".game2_start").removeClass("hideDiv");
	                   	$(".game2_zhong").addClass("hideDiv");
	                   	$(".dott").addClass("hideDiv");
                   });
                    
                    /* setTimeout(function(){
                    	sessionStorage.setItem("game_sj","3");
                        history.go(-1);
                    },2000); */
                }
            }else{
            	if(flag == 3){
           			//massage("失败")//失败
                	setTimeout(function(){
    	                $(".layout2").removeClass("hideDiv");
    	                $(".no_chose").removeClass("hideDiv");
		                $(".has_once").addClass("hideDiv");
		                $(".once_btn").addClass("hideDiv");
    	            },400);
           			
                	setTimeout(function(){
                    	sessionStorage.setItem("game_sj","0");
                        history.go(-1);
                    },1500);
               	}
            	setTimeout(function(){
	                $(".layout2").removeClass("hideDiv");
	                $(".no_chose").addClass("hideDiv");
	                $(".has_once").removeClass("hideDiv");
	            },1000);
               	$("body").on("tap",".once_btn",function(){
               		$(".game2_wrapper").on("touchstart touchmove touchend");
                   	$(".layout2").addClass("hideDiv");
                   	$(".game2_end").addClass("hideDiv");
                   	$(".game2_start").removeClass("hideDiv");
                   	$(".game2_zhong").addClass("hideDiv");
                   	$(".dott").addClass("hideDiv");
               	});
            };
            
          //玩过游戏后返回参数给后台做标示
            $(".once_btn").on("tap",function(){
//             	massage(JSON.stringify({"gestep":1,"stepcount":0,"gamecode":3}))
            	$.post(gameStep,{"gestep":1,"stepcount":0,"gamecode":3},function(r){
//             		massage(r);
            		var res = JSON.parse(r);
            		if(res.code == 0){
            			//
            		}else{
            			massage(res.code+":"+res.errMsg);
            		}
            	});
            });
          
        });
    });

}
</script>
</html>