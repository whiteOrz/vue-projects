window.log = function(v) {
	console.log(v);
};
var openid;
function show(content) {
	log(content.prizeList);
	log(content.realFriends);
	$(".realFriends").html(content.realFriends);
	$(".runDays").html(content.runDays);
	
	
	var content = JSON.parse(localStorage.getItem("info"));
	log(content.openid);
	openid=content.openid;
	$(".picture").attr("src", content.Portrait);
	$(".mess_name").html(content.nickname);
	 $(".power").html(content.sum_sc);
	 $(".end").html(content.nextsum_sc);
	 $(".safe").html(content.insured);
	 $(".mess_pross_ju").css("width",(Number(content.sum_sc)/content.nextsum_sc)*100+"%");
	 $(".mess_save_ju").css("width",(Number(content.insured)/150000)*100+"%");
	 $(".mess_name").html(content.nickname);
	 $(".next").html(content.next_stop);
	 
//	 $(".mess_pross_ju").css("width","50%");
}
window.onload = function() {
	$(".huzhu").on("tap",function() {
		$(".tab1").trigger("tap");
		$(".market2").removeClass("hide");
		return;
//		alert(JSON.stringify({"type":1,"openid":openid}));
		$.post(toHelpmessages,{"type":1,"openid":openid}, function(r) {
//			alert(r);
			var res = JSON.parse(r);
			if (res.code == 0) {
				var c = JSON.parse(res.content);
				var length = $(".l1 li").length;
				for (var i = 0; i < length; i++) {
					if (i<c.length) {
						log(length);
						$($(".l1 li")[i]).show();
						$($($(".l1 li")[i]).find(".headimg2")).attr("src", c[i].head_img);
						$($($(".l1 li")[i]).find(".i_name2")).html(c[i].name);
					} else {
						$($(".l1 li")[i]).hide();
					}
				}
			} else {
				alert(res.code + ":" + res.errMsg);
			}
		});
		$(".market2").removeClass("hide");

	});
	$(".power").on("tap", function() {
//		alert("获取openid:"+content.openid);
		location.href = "/seerkey/userinfo/toPower?openid="+openid;
	});
	$(".safe").on("tap", function() {
		location.href = "/seerkey/userinfo/toSafe?openid="+openid;
	});
	$(".btn_mess").on("tap", function() {
		location.href = "/seerkey/market/togo";
	});
	$(".close").on("tap", function() {
		$(".market2").addClass("hide");
	});
	$(".tab1 ,.tab2").on("tap", function() {
		
		if ($(this).hasClass("tab1")) {

//			alert(JSON.stringify({"type":1,"openid":openid}));
			$.post(toHelpmessages,{"type":1,"openid":openid}, function(r) {
//				alert(r);
				var res = JSON.parse(r);
				if (res.code == 0) {
					var c = JSON.parse(res.content);
					var length = $(".l1 li").length;
					for (var i = 0; i < length; i++) {
						if (i<c.length) {
							log(length);
							$($(".l1 li")[i]).show();
							$($($(".l1 li")[i]).find(".headimg2")).attr("src", c[i].head_img);
							$($($(".l1 li")[i]).find(".i_name2")).html(c[i].name);
						} else {
							log("hide");
							$($(".l1 li")[i]).hide();
						}
					}
				} else {
					alert(res.code + ":" + res.errMsg);
				}
			});
			
			$($(".tab1")[0]).removeClass("hide").addClass("active");
			$($(".tab1")[1]).removeClass("hide");

			$($(".tab2")[0]).addClass("hide").removeClass("active");
			$($(".tab2")[1]).removeClass("hide");
			if ($(".l1").hasClass("hide")) {

			}
			$(".l1").removeClass("hide");
			$(".l2").addClass("hide");
			$(".c_n").html("能量值");
			
		} else {
//			alert(JSON.stringify({"type":0,"openid":openid}));
			$.post(toHelpmessages,{"type":0,"openid":openid}, function(r) {
//				alert(r);
				var res = JSON.parse(r);
				if (res.code == 0) {
					var c = JSON.parse(res.content);
					var length = $(".l2 li").length;
					for (var i = 0; i < length; i++) {
						if (i<c.length) {
							log(length);
							$($(".l2 li")[i]).show();
							$($($(".l2 li")[i]).find(".headimg2")).attr("src", c[i].head_img);
							$($($(".l2 li")[i]).find(".i_name2")).html(c[i].name);
						} else {
							$($(".l2 li")[i]).hide();
						}
					}
				} else {
					alert(res.code + ":" + res.errMsg);
				}
			});
			$($(".tab2")[0]).removeClass("hide").addClass("active");
			$($(".tab2")[1]).removeClass("hide");

			$($(".tab1")[0]).addClass("hide").removeClass("active");
			$($(".tab1")[1]).removeClass("hide");

			if ($(".l0").hasClass("hide")) {

			}
			$(".l1").addClass("hide");
			$(".l2").removeClass("hide");
			$(".c_n").html("安全系数");
			
			$(".market2").removeClass("hide");
		}
	});
	$("body").on("tap", ".tip-P", function() {
		$(".tipP").removeClass("hide");
	});
	$("body").on("tap", ".tip-S", function() {
		$(".tipS").removeClass("hide");
	});
	$("body").on("touchend", function() {
		if (!$(".tipP").hasClass("hide")) {
			$(".tipP").addClass("hide");
		}
		if (!$(".tipS").hasClass("hide")) {
			$(".tipS").addClass("hide");
		}
	});
};