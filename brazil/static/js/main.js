/**
 * Created by lxj on 2016/7/19.
 */
window.log = function (v) {
    console.log(v);
};

var openId,login_flag,today_sc,next_stop,sum_sc,insured,Portrait,sites;

function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return
	unescape(r[2]); 
	return null;
} 

window.onload = function () {
	
	//massage("onload");
	openId = content.openid;
	
	login_flag = content.login_flag;//是否首次登陆
	today_sc = content.today_sc;//今儿步数
	next_stop = content.next_stop;//距下一站步数
	sum_sc = content.sum_sc;//当前能量值
	insured = content.insured;//当前安全系数
	Portrait = content.Portrait;//头像地址
	sites = content.sites;//当前站点
	nextsum_sc = content.nextsum_sc;//能量总值
	eggshow = content.eggshow;//是否显示菜单
	nickname = content.nickname;//昵称
	gameshow_flag = content.gameshow_flag;//是否显示游戏
	eggshow = content.eggshow;//是否显示彩蛋
	passsites=content.passsites;//进入站点时穿越判断
	stieslist = content.stieslist;//穿越需要达到的能量值
	//massage(stieslist[0].code);
	
	
	localStorage.setItem("info", JSON.stringify(content));
	
	var j=[["T1","E1"],["E2","E3","T2"],["E2","T3"],["T4","T5","T6"],["T7","T8"],[]][content.sites];
	$(".current_site").empty();
	for(var i=0;i<j.length;i++){
		var img=$("<img/>");
		img.attr("src","http://whzt.taikang.com/brazil/static/images/jiang/"+j[i]+".png");
		$(".current_site").append(img);
	}
	//能量和安全系数的总数
	/*var powerAll = $(".all_step").html();
	var safeAll = $(".all_baoe").html();
	localStorage.setItem("powerAll",powerAll);
	localStorage.setItem("safeAll",safeAll);*/
	//进度条  能量
    function press(now, all) {
        var sum = now / all * 100;
        if (sum >= 90) {
        	$(".shan_pross_ju").css({"width": Math.min(100,sum)+"%", "border-radius": "10px"});
        }
        $(".shan_pross_ju").css("width", sum + "%");
    }
    //安全系数
    function press2(now, all) {
        var sum = now / all * 100;
        if (sum >= 100) {
            $(".bao_pross_ju").css({"width": Math.min(100,sum) + "%", "border-radius": "10px"});
        }
        $(".bao_pross_ju").css("width", sum + "%");
    }

    	log(localStorage.getItem("currentIndex"));
    	
		//是否首次进入该站点
		/*var current=localStorage.getItem("currentIndex");
		function stepChange(){
			if(current){//
				var json=JSON.parse(current);
				massage("json:"+json);
				if(json[sites-1]){
					//
					massage("该站点不是首次进入");
				}else{
					massage("第一次进入");
					//第一次进入
					json[sites-1]=1;
					localStorage.setItem("currentIndex",JSON.stringify(json));
					dom.showwelcome(1,sites-1);
				}
//					localStorage.setItem("currentIndex","[1,0,0,0,0]");
			}else{
				
				//第一个站点第一次进入
				//第一次的要做的事情这编写
				localStorage.setItem("currentIndex","[1,0,0,0,0]");
				dom.showwelcome(1,1);
			}
		}*/	
		
		//massage(2);
//		var loadingMask = document.getElementById('loadingDiv');
//		loadingMask.parentNode.removeChild(loadingMask);
		//massage(3);
		$(".step_num").html(today_sc);
		$(".next_num").html(next_stop);
	    $(".jinb").html(sum_sc);
	    $(".anxi").html(insured);
	    //$(".all_step").html(nextsum_sc);
		var all_baoe = $(".all_baoe").html();
		
		//用户图像
		$(".picture").attr("src",Portrait);
		//上传
		$(".yate_click").on("tap",function(){
			$(".page2").addClass("hideDiv");
			$(".page4").removeClass("hideDiv");
//			$(".my_step").html(sum_sc);
			dom.stepChange();
		});
		
		//欢迎页
		$(".layout_close").on("tap",function(){
			$(".layout").addClass("hideDiv");
			
			//首次进入站点是否穿越
			if(passsites == 0){
				//自动穿越到下一站
				dom.showwelcome(2,sites);
			};
			
		});
		$(".help").on("tap",function(){
//			$(".layout").removeClass("hideDiv");
			$("#help").removeClass("hide");
		});
		
		$(".del").on("tap",function(){
			$("#help").addClass("hide");
		});
		$("body").on("tap",".page3_close ,.next_close2",function(){
			$("#aa").children().remove(".yadian_help");
		});
		//return;
				
		//彩蛋是否显示
		$(".noC").on("tap",function(){
			if(eggshow == 0){
				$(".cai_click").removeClass("hideDiv");
			}else{
				$(".cai_click").addClass("hideDiv");
			}
		});
		
		//首次进入点击下一站不传参
		$("body").on("tap",".no_next_close",function(){
//			massage(JSON.stringify({"sites":sites,"openid":openId}));
//			$.post(postPower,{"sites":sites,"openid":openId},function(r){
//				massage(r);
//				var res = JSON.parse(r);
//				if(res.code == 0){
//					//
//				}else{
//					massage(res.code+":"+res.errMsg);
//				}
//			});
			$("#aa").children().remove(".yadian_help");
			if(sites == 1){
				dom.yadian();
			}else if(sites == 2){
				dom.beijing();
			}else if(sites == 3){
				dom.liyue();
			}else if(sites == 4){
				dom.taikang();
			};
		});
		
		//点击彩蛋下一站传参
		$("body").on("tap",".cai_next_close",function(){
//			massage(JSON.stringify({"sites":sites,"openid":openId}));
			$.post(postPower,{"sites":sites,"openid":openId},function(r){
//				massage(r);
				var res = JSON.parse(r);
				if(res.code == 0){
					//
				}else{
					massage(res.code+":"+res.errMsg);
				}
			});
			$("#aa").children().remove(".yadian_help");
			if(sites == 1){
				dom.yadian();
			}else if(sites == 2){
				dom.beijing();
			}else if(sites == 3){
				dom.liyue();
			}else if(sites == 4){
				dom.taikang();
			};
		});
		
		var eml;
		//彩蛋
		$(".cai_click").on("tap",function(){
//			massage(JSON.stringify({"openId":openId,"sites":sites}));
			$.post(getEgg,{"openId":openId,"sites":sites},function(r){
//				massage(r);
				var res = JSON.parse(r);log("sites:"+sites);
//				massage(res);
				
				if(res.code==0){
					if(sites == 1){
						$(".yd_cai").addClass("hideDiv");
					}else if(sites == 2){
						$(".yt_cai").addClass("hideDiv");
					}else if(sites == 4){
						$(".ly_cai").addClass("hideDiv");
					}
					$(".yate_layout").removeClass("hideDiv");
					
										
					if(res.content == 0){
						$(".cai_power").removeClass("hideDiv");	
						$(".cai_gife").addClass("hideDiv");	
						
						//领能量
						$(".yate_cai_btn").on("tap",function(){
							
							//是否显示彩蛋
							if(eggshow == 0){
								if(sites == 1){
									$(".yd_cai").addClass("hideDiv");
								}else if(sites == 2){
									$(".yd_cai").addClass("hideDiv");
								}else if(sites ==4){
									$(".ly_cai").addClass("hideDiv");
								}
							};
							$(".yate_layout").addClass("hideDiv");
							$(".jinb").html(parseInt($(".jinb").html())+1000);
							var now_step = parseInt($(".jinb").html())+1000;
							/*setTimeout(function(){
								$(".shan_pross_ju").animate({"width": now_step/nextsum_sc*100+"%"});
							},300);*/
							var now_step = Number($(".jinb").html());
							sites = Number(sites)+1;
							if(sites == 2){//第一站
								if(now_step >= stieslist[0].codevalue){
									$(".page4").addClass("hideDiv");
									dom.showwelcome(3,1);
									//dom.yadian();
									$(".all_step").html(stieslist[0].codevalue);
								}
							}else if(sites == 3){//到北京
								if(now_step >= stieslist[1].codevalue){
									$(".page3").addClass("hideDiv");
									dom.showwelcome(3,0);
									//dom.beijing();
									$(".all_step").html(stieslist[1].codevalue);
								};
							}else if(sites == 4){//到里约
								if(now_step >= stieslist[3].codevalue){
									$(".page3").addClass("hideDiv");
									dom.showwelcome(3,2);
									//dom.beijing();
									$(".all_step").html(stieslist[3].codevalue);
								};
							}
							
							//能量领取成功给后台传参数
//							massage(JSON.stringify({"sites":sites,"openid":openId,"codevalue":now_step}));
							$.post(postPower,{"sites":sites,"openid":openId,"codevalue":now_step},function(r){
//								massage(r);
								var res = JSON.parse(r);
								if(code == 0){
									return false;
								}else{
									massage(res.code+":"+res.errMsg);
								}
							});
						});
						
					}else{
						
						//信息弹框显示
						$(".yate_cai_btn").on("tap",function(){
				            $(".yate_layout").addClass("hideDiv");
				            $(".xinxi_layout").removeClass("hideDiv");log(eml);
				            if(eml == "E"){
				            	$(".address").addClass("hideDiv");
				            }else{
				            	$(".address").removeClass("hideDiv");
				            }
				        });
						
						eml = res.content.split("")[0];
						log(eml);
						$(".cai_power").addClass("hideDiv");	
						$(".cai_gife").removeClass("hideDiv");	
						if(eml == "E"){
							$(".cai_gife").css("background",'url(http://whzt.taikang.com/brazil/static/images/caidan/'+res.content+'.png) no-repeat center/contain');
						};
					}
					
				}else{
					massage(res.code+":"+res.errMsg);
				}
			});
		});
		
		
		var messages = {};
			messages.name = $(".xinxi_name").val(),
			messages.address = $(".xinxi_address").val(),
			messages.phone = $(".xinxi_phone").val();

		var str;
		
		//消息提交
		$(".submit_btn").on("tap",function(){
			var userName = $(".xinxi_name").val(),
				userPhone = $(".xinxi_phone").val(),
				userAddress = $(".xinxi_address").val();
			
			if(userName == ""){
				massage("请填写姓名！");
				return false; 
			}
			
//			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
//			massage(userPhone.length);
			if(userPhone.length<11) {
			    massage('请输入有效的手机号码！');
			    return false; 
			} 
			
			if(eml == "E"){
				str = {"name":userName,"mobile":userPhone,"post":userAddress,"sites":sites,"openid":openId};
			}else if(eml == "T"){
				if(userAddress == ""){
					massage("请填写地址！");
					return false; 
				}
				str = {"name":userName,"mobile":userPhone,"post":userAddress,"sites":sites,"openid":openId};
			}
//			massage(JSON.stringify(str));
			$.post(postMessages,str,function(r){
				var res=JSON.parse(r);
				if(res.code == 0){
					massage('领取成功！');
					$(".xinxi_layout").addClass("hideDiv");
					$(".massage-tip").removeClass("hide");
					setTimeout(function(){
						$(".massage-tip").addClass("hide");
						$(".page2").removeClass("hideDiv");
						//$(".page4").addClass("hideDiv");
						sites = sites+1;
						if(sites == 2){
							$(".xinxi_layout").addClass("hideDiv");
							//dom.yadian();
						}else if(sites == 3){
							//$(".page3").addClass("hideDiv");
							//dom.beijing();
						}else if(sites == 4){
							//dom.liyue();
						}else if(sites == 5){
							//dom.taikang();
						}
						
					},1000);
					$(".xinxi_name").val("");
					$(".xinxi_phone").val("");
					$(".xinxi_address").val("");
				}else{
					massage('领取失败！');
					//massage(res.code+":"+res.errMsg);
					$(".xinxi_name").val("");
					$(".xinxi_phone").val("");
					$(".xinxi_address").val("");
				}
			});
		});
			
		if(login_flag == 0){//首次进入
			
			$(".page2_top ").addClass("tk_top");
			
			$(".user_name").html(nickname);
			$(".page1").removeClass("hideDiv");
			$(".page1_txt").addClass("left");
			$(".page1_xin").addClass("bigger");
			$(".page1_xin").on("tap", function () {
		        $(".stage").addClass("hideDiv");
		        $(".page2_xin").addClass("bigger2");
		        $(".page1_txt_box").addClass("top");
		        $(".page1_wen2").addClass("left2");
		        $(".page1_btn").addClass("back");
		    });
		    $(".page1_btn ").on("tap", function () {
		        $(".page2").removeClass("hideDiv");
		        $(".page1").addClass("hideDiv");
		        //首次进入的黑谈层
		        if(login_flag == 0){
		    		$(".layout").removeClass("hideDiv");
		    	}else{
		    		$(".layout").addClass("hideDiv");
		    	}
		        
		    });
		    $(".jinb").html("0");
		    $(".anxi").html("0");
		    
		    $(".shangc_btn").on("tap",function(){
			    	//能够量			    
			    var Cnum = sum_sc / nextsum_sc * 100;
		        if (Cnum >= 100) {
		            $(".shan_pross_ju").animate({
		            	"width": Math.min(100,Cnum)+"%"			            	
		            }).css({"border-radius": "10px"});
		        }
		        $(".shan_pross_ju").animate({
		        	"width": Cnum+"%"		
		        });
		        
		        //安全系数
		        var Cnum2 = insured / all_baoe*100;
		        if (Cnum2 >= 100) {
		            $(".bao_pross_ju").animate({
		            	"width": Math.min(100,Cnum2)+"%"			            	
		            }).css({"border-radius": "10px"});
		        }
		        $(".bao_pross_ju").animate({
		        	"width": Cnum2+"%"		
		        });
		        $(".shangc_btn,.yadian_txt").addClass("hideDiv");
		    });
		    
		    //判断能量是否达到
//		    if(sum_sc >= 40000){
//				if(sites == 2){
//					//massage("能量达标")
//					//$(".xinxi_layout").addClass("hideDiv");
//					dom.yadian();
//				}else if(sites == 3){
//					//$(".page3").addClass("hideDiv");
//					//dom.beijing();
//				}else if(sites == 4){
//					//dom.liyue();
//				}else if(sites == 5){
//					//dom.taikang();
//				}
//			}
	        
		}else{
			
			//首次进入站点是否穿越
			if(passsites == 0){
				//自动穿越到下一站
				dom.showwelcome(2,sites);
			}
			
				$(".page2").removeClass("hideDiv");
				/*press(sum_sc,nextsum_sc);
				press2(insured,all_baoe);
				
				$(".jinb").html(sum_sc);
			    $(".anxi").html(insured);
			    
			    $(".shangc_btn,.yadian_txt").addClass("hideDiv");*/
			    
			  //判断能量是否达到
//			    if(sum_sc >= 40000){
//					if(sites == 2){
//						//massage("能量达标")
//						//$(".xinxi_layout").addClass("hideDiv");
//						dom.yadian();
//					}else if(sites == 3){
//						//$(".page3").addClass("hideDiv");
//						//dom.beijing();
//					}else if(sites == 4){
//						//dom.liyue();
//					}else if(sites == 5){
//						//dom.taikang();
//					}
//				}
				
				//站点
			    if(sites == 1){
			    	
			    	$(".page2_top ").addClass("tk_top");
			    	
			    	press(sum_sc,nextsum_sc);
					press2(insured,all_baoe);
					
					$(".jinb").html(sum_sc);
				    $(".anxi").html(insured);
				    
				    $(".shangc_btn,.yadian_txt").addClass("hideDiv");
				    
				  //亚特兰大欢迎弹窗
					$(".pages_click").on("tap",function(){
						dom.showwelcome(1,0);
					});
					
			    }else if(sites == 2){//雅典
					//dom.yadian();
			    	/*$(".page4_txt").addClass("hideDiv");
			    	$(".page4_btn").addClass("hideDiv");
					$(".yadian_click ").on("tap",function(){
						dom.showwelcome(1,0);
						
						setTimeout(function(){
							$(".page3_close").on("tap",function(){
						    	$(".page4_txt").removeClass("hideDiv");
						    	$(".page4_btn").removeClass("hideDiv");
							});
						},1000);
					});*/
					
			    	$(".step_num").html(today_sc);
			    	$(".next_num").html(next_stop);
			    	$(".jinb").html(sum_sc);
			    	$(".anxi").html(insured);
			    	$(".all_step").html(nextsum_sc);
			    	
			    	press(sum_sc,nextsum_sc);
					press2(insured,all_baoe);
			    	
			    	$(".page2").removeClass("hideDiv");
					$(".yate_click").removeClass("yaten").addClass("yate");
					$(".yate_click").off("tap");
					$(".yadian_click").addClass("yadian").removeClass("yadianw");
					$(".yadian_click").on("tap",function(){
						$(".page3").removeClass("hideDiv");
						$(".page2").addClass("hideDiv");
						dom.stepChange(1,0);
					});
					$(".beij_click").addClass("beijn").removeClass("beij");
					
					$(".pages_click").on("tap",function(){
						dom.showwelcome(1,1);	
					});
					
				}else if(sites == 3){//北京
					
					//stepChange();
					
					//dom.beijing();
										
					$(".step_num").html(today_sc);
			    	$(".next_num").html(next_stop);
			    	$(".jinb").html(sum_sc);
			    	$(".anxi").html(insured);
			    	$(".all_step").html(nextsum_sc);
			    	
			    	press(sum_sc,nextsum_sc);
					press2(insured,all_baoe);
			    	
					$(".yate_click").off("tap").addClass("yate").removeClass("yaten");
					$(".yadian_click").off("tap").addClass("yadianh").removeClass("yadianw");
					$(".beij_click").addClass("beijw").removeClass("beijn");
					$(".liyue_click").addClass("liyuen").removeClass("liyue");
					$(".beij_click").on("tap",function(){
						$(".page5").removeClass("hideDiv");
						$(".page3").addClass("hideDiv");
						dom.showwelcome(1,2);
					});
					$(".pages_click").on("tap",function(){
						dom.showwelcome(1,2);
					});
					
				}else if(sites == 4){//里约
					
					//dom.liyue();
					$(".step_num").html(today_sc);
			    	$(".next_num").html(next_stop);
			    	$(".jinb").html(sum_sc);
			    	$(".anxi").html(insured);
			    	$(".all_step").html(nextsum_sc);
			    	
			    	press(sum_sc,nextsum_sc);
					press2(insured,all_baoe);
			    	
			    	$(".yate_click").off("tap").addClass("yate").removeClass("yaten");
					$(".yadian_click").off("tap").addClass("yadianh").removeClass("yadianw");
					$(".beij_click").off("tap").addClass("beijh").removeClass("beijw");
					$(".liyue_click").addClass("liyuew").removeClass("liyue");
					$(".liyue_click").on("tap",function(){
						$(".page6").removeClass("hideDiv");
						$(".page5").addClass("hideDiv");
						dom.showwelcome(1,3);
					});
					$(".taik_click").addClass("taikn").removeClass("taik");
					$(".pages_click").on("tap",function(){
						dom.showwelcome(1,3);
					});
					
				}else if(sites == 5){//泰康
					
					//dom.taikang();
					$(".step_num").html(today_sc);
			    	$(".next_num").html(next_stop);
			    	$(".jinb").html(sum_sc);
			    	$(".anxi").html(insured);
			    	$(".all_step").html(nextsum_sc);
			    	
			    	press(sum_sc,nextsum_sc);
					press2(insured,all_baoe);
					
			    	$(".page2_top ").addClass("tk_top");
					$(".yate_click").addClass("yate").removeClass("yaten");
					$(".yadian_click").addClass("yadianh").removeClass("yadianw");
					$(".beij_click").off("tap").addClass("beijh").removeClass("beijw");
					$(".liyue_click").off("tap").addClass("liyueh").removeClass("liyuen");
					$(".taik_click").addClass("taikw").removeClass("taik");
					$(".taik_click").on("tap",function(){
						$(".page7").removeClass("hideDiv");
						$(".page6").addClass("hideDiv");
					});
					$(".pages_click").on("tap",function(){
						dom.showwelcome(1,4);
					});
					
				}
				
			};

    //每个入口的去向
    $(".jishi").on("tap", function () {
        window.location.href = "/seerkey/market/togo";
    });

    $(".picture").on("tap", function () {
        window.location.href = "/seerkey/userinfo/toCenter?openid="+openId;
    });

    $(".go_power").on("tap", function () {
        window.location.href = "/seerkey/userinfo/toPower?openid="+openId;
    });

    $(".go_save").on("tap", function () {
        window.location.href = "/seerkey/userinfo/toSafe?openid="+openId;
    });
    
    $(".xiaox").on("tap",function(){
    	window.location.href = "/seerkey/userinfo/toGetPayOrder?openid="+openId;
    });
    
    //跳游戏
    $(".page4_btn").on("tap",function(){
    	window.location.href = "/seerkey/game/game_jz?openid="+openId;
    });
    $(".page5_btn").on("tap",function(){
    	window.location.href = "/seerkey/game/game_sj?openid="+openId;
    });
    $(".page6_btn").on("tap",function(){
    	window.location.href = "/seerkey/game/game_zq?openid="+openId;
    });
    
    //游戏所得能量值
    /*var game_power = JSON.parse(sessionStorage.getItem("game_jz"));
    massage(game_power);*/
    
    //是否显示游戏
    if(gameshow_flag == 0){//游戏显示
//    	massage("gameshow_flag:"+gameshow_flag);
    	if(sites == 2){
    		$(".page4_txt").removeClass("hideDiv");
    		$(".page4_btn").removeClass("hideDiv");
    		$(".page5_txt").addClass("hideDiv");
    		$(".page5_btn").addClass("hideDiv");
    	}else if(sites == 3){
    		$(".page5_txt").removeClass("hideDiv");
    		$(".page4_btn").removeClass("hideDiv");
    	}else if(sites == 4){
    		$(".page6_txt").removeClass("hideDiv");
    		$(".page6_btn").removeClass("hideDiv");
    	}
    }else{//游戏不显示
//    	massage("gameshow_flag:"+gameshow_flag);
    	if(sites == 2){
    		$(".page4_txt").addClass("hideDiv");
    		$(".page4_btn").addClass("hideDiv");
    		$(".page5_txt").addClass("hideDiv");
    		$(".page5_btn").addClass("hideDiv");
    	}else if(sites == 3){
    		$(".page5_txt").addClass("hideDiv");
    		$(".page4_btn").addClass("hideDiv");
    	}else if(sites == 4){
    		$(".page6_txt").addClass("hideDiv");
    		$(".page6_btn").addClass("hideDiv");
    	}
    }
    
    //是否显示游戏
    $(".page4_btn").on("tap",function(){
    	if(gameshow_flag == 0){
    		if(sites == 2){
        		$(".page4_txt").removeClass("hideDiv");
        		$(".page4_btn").removeClass("hideDiv");
        		$(".page5_txt").addClass("hideDiv");
        		$(".page5_btn").addClass("hideDiv");
        	}else if(sites == 3){
        		$(".page5_txt").removeClass("hideDiv");
        		$(".page4_btn").removeClass("hideDiv");
        	}else if(sites == 4){
        		$(".page6_txt").removeClass("hideDiv");
        		$(".page6_btn").removeClass("hideDiv");
        	}
    	}
    });
    
    $("body").on("tap", function () {

        //showwelcome(1);

        //showwelcome(2);
    	$(".helpbox").addClass("hide");
    });

    $("body").on("tap",".help",function(){
    	$(".helpbox").removeClass("hide");
    });
};