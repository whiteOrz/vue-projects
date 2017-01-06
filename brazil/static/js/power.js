/**
 * Created by wuzheng on 2016/7/20.
 */
window.log = function(v) {
	console.log(v);
	
};
var info=JSON.parse(localStorage.getItem("info"));
var str="给我一个支点，我可以翘起地球，你赏我点步数，我就可以去趟%_%！";
if(info){
	str=str.replace("%_%",["亚特兰大","雅典","北京","里约","泰康"][info.sites-1]);	
}else{
	str=str.replace("%_%","info为null");
}


// 所有加载已完成
window.onload = function(){

	url = resultjson.oauthUrl;
//	massage("url:"+url);
	var content = JSON.parse(localStorage.getItem("info"));
	log(content);
	$(".picture").attr("src", content.Portrait);
	$(".change_num").html(content.sum_sc);
	 $(".power").html(content.sum_sc);
	 $(".mess_pross_ju").css("width",(Number(content.sum_sc)/150000)*100+"%");
	 $(".nezhi").html(content.sum_sc);
	 $(".shengbu").html(content.next_stop);
	 $(".mess_name").html(content.nickname);
	 $(".mess_all_num").html(content.nextsum_sc);
	 $(".mess_save_ju").css("width",(Number(content.sum_sc)/content.nextsum_sc)*100+"%");
	 $(".shengbu").html(content.next_stop);
	 
	var info=JSON.parse(localStorage.getItem("info"));
	$(".picture").attr("src",info.Portrait);
	
	$("body").on("tap",".tip-P",function(){
		$(".tipP").removeClass("hide");
	});
	$("body").on("tap",".help_btn",function(){
		$(".share").removeClass("hide");
	});
	$("body").on("touchend",function(){
		$(".share").addClass("hide");
		$(".tipP").addClass("hide");
	});
	$(".goj_btn").on("tap",function(){
		location.href="/seerkey/market/togo";
	});
};