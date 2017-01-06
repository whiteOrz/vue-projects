window.addEventListener("orientationchange", function(r){
	
	if(window.orientation!=0){
//		alert(window.orientation);
		var div=$("<div>");
		div.addClass("landscape");
		div.css("position","fixed");
		div.css("width","100%");
		div.css("height","100%");
		div.css("background-color","black");
		div.css("color","white");
		div.css("font-size","1.5rem");
		div.css("z-index","999999");
		div.css("text-align","center");
		div.css("padding","10% 0");
//		div.css("opacity",".5");
		div.html("请竖屏显示！");
		$("body").append(div);
	}else{
		$(".landscape").remove();
	}
});