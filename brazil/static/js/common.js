var dom = {};
$(function(){
	$(".goj_btn,.goj_btn").on("tap",function(){
		window.location.href = "/seerkey/market/togo";
	});
	
	$(".add_btn2").on("tap",function(){
		window.location.href = "/seerkey/userinfo/toPay";
	});
	
	function press(now, all) {
        var sum = now / all * 100;
        if (sum >= 100) {
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
	
	/*
     * @step 站点下标 0|1|2|3|4
     * */
    dom.showwelcome = function(page,step) {
        $("#aa").html(html);
        $.get("http://whzt.taikang.com/brazil/static/model/"+page+"/wellC" + step+".html", function (r) {
            $("#aa").html(r);
        });
    };
    
    /*
     * @step 站点下标 0|1|2|3|4
     * */
    dom.showwelcome = function(page,step) {
        $.get("http://whzt.taikang.com/brazil/static/model/"+page+"/wellC" + step+".html", function (r) {
            $("#aa").html(r);
        });
    };
    
    //设置进入站点的次数
    var current=localStorage.getItem("currentIndex");
    dom.stepChange = function(){
		if(current){//
			var json=JSON.parse(current);
			if(json[sites-1]){
				//
			}else{
				//第一次进入
				json[sites-1]=1;
				localStorage.setItem("currentIndex",JSON.stringify(json));
				dom.showwelcome(1,sites-1);
			}
//				localStorage.setItem("currentIndex","[1,0,0,0,0]");
		}else{
			
			//第一个站点第一次进入
			//第一次的要做的事情这编写
			localStorage.setItem("currentIndex","[1,0,0,0,0]");
			dom.showwelcome(1,0);
		}
	};
	
	//进入雅典
	dom.yadian = function(sites){
		var info = JSON.parse(localStorage.getItem("info"));log(info);
		info.sites=2;
		localStorage.setItem("info",JSON.stringify(info));
		
		$(".jinb").html(sum_sc+1000-nextsum_sc);
		var step = $(".jinb").html();
		$(".all_step").html(nextsum_sc);
		var power = $(".all_step").html();
		console.log(step);console.log(power);console.log(step/power);
		press(step,power);
		
		$(".page2").removeClass("hideDiv");
		$(".yate_click").removeClass("yaten").addClass("yate");
		$(".yate_click").off("tap");
		$(".yadian_click").addClass("yadian").removeClass("yadianw");
		$(".yadian_click").on("tap",function(){
			$(".page3").removeClass("hideDiv");
			$(".page2").addClass("hideDiv");
			dom.stepChange();
		});
		$(".beij_click").addClass("beijn").removeClass("beij");
		
		$(".pages_click").on("tap",function(){
			dom.showwelcome(1,1);
		});
	};
	
	
	//进入北京
	dom.beijing = function(){
		var info = JSON.parse(localStorage.getItem("info"));log(info);
		info.sites=3;
		localStorage.setItem("info",JSON.stringify(info));
		
		$(".jinb").html(sum_sc+1000-nextsum_sc);
		var step = $(".jinb").html();
		$(".all_step").html(nextsum_sc);
		var power = $(".all_step").html();
		console.log(step);console.log(power);console.log(step/power);
		press(step,power);
		
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
	}
	
	//进入里约
	dom.liyue = function(){
		var info = JSON.parse(localStorage.getItem("info"));log(info);
		info.sites=4;
		localStorage.setItem("info",JSON.stringify(info));
		
		$(".jinb").html(sum_sc+1000-nextsum_sc);
		var step = $(".jinb").html();
		$(".all_step").html(nextsum_sc);
		var power = $(".all_step").html();
		press(step,power);
		
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
	}
	
	//进入泰康
	dom.taikang = function(){
		var info = JSON.parse(localStorage.getItem("info"));log(info);
		info.sites=5;
		localStorage.setItem("info",JSON.stringify(info));
		
		$(".jinb").html(sum_sc+1000-nextsum_sc);
		var step = $(".jinb").html();
		$(".all_step").html(nextsum_sc);
		var power = $(".all_step").html();
		press(step,power);
		
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
	
	//游戏成功返首页
//	dom.backIndex = function(a,b){
//		if(a == 2){//返回雅典
//			$(".wrapper").addClass("hideDiv");
//			dom.yadian();
//		}
//	};
	
	
	
	
});