window.log = function(v) {
	console.log(v);
};
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var url = (localhostPaht + projectName);
log(curWwwPath);
var strUrl = location.href;
var arrUrl = strUrl.split("/");
var strPage = arrUrl[arrUrl.length - 1];
log(strPage);
var str;
if (str) {

} else {
	str = [ "让你赏我点步数咋的了?又没让你赏我金子！", "桃花潭水深千尺，也不及你动动拇指为我增加步数的恩情～",
			"路漫漫吾奔跑兮，左右逢源小伙伴都来助我一臂之力！" ][Math.random() * 3 >> 0];
}
//massage(JSON.stringify({
//	"url" : curWwwPath
//}));
$.post(localhostPaht + projectName + "/share/getsigniture", {
	"url" : curWwwPath
}, function(res) {
	log(res);
	//massage(r);
	if (res.code == 0) {
		log(res);
		var r = JSON.parse(res.content);
		share(r.data);
	} else {
		massage(r.error_code + "" + r.error_message);
	}
}, "json");
function share(res) {
	// result=JSON.parse(res);
	//massage("http://whzt.taikang.com/brazil/static/images/share2.png");
	log("http://whzt.taikang.com/brazil/static/images/share2.png");
	wx.config({
		debug : false,
		appId : "wxcd7143c00e5bb6f7",
		timestamp : res.timestamp,
		nonceStr : res.noncestr,
		signature : res.signature,
		jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","hideMenuItems","showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "checkJsApi","chooseWXPay", "openProductSpecificView"]
	});

};
var title="";
if(title.lenght<=0){
	title="听说，跑步可以赢大奖哦~";
}

wx.ready(function() {
	wx.hideMenuItems({ // 隐藏的菜单
		menuList : [ "menuItem:readMode", "menuItem:openWithQQBrowser",
				"menuItem:openWithSafari", "menuItem:originPage",
				"menuItem:share:qq", "menuItem:share:weiboApp",
				"menuItem:share:facebook", "menuItem:share:QZone",
				"menuItem:copyUrl" ]
	});
	wx.showMenuItems({ // 显示的菜单
		menuList : [ "menuItem:share:appMessage", "menuItem:share:timeline" ]
	});

	wx.onMenuShareTimeline({
		title : str, // 分享标题
		desc : str, // 分享描述
		link : url + "#", // 分享链接
		imgUrl : "http://whzt.taikang.com/brazil/static/images/share2.png", // 分享图标
		success : function() {
			// 用户确认分享后执行的回调函数
			// massage("这就分享成功了~~想干嘛干嘛");
		},
		cancel : function(e) {
			// 用户取消分享后执行的回调函数
			// massage("这就是分享失败了~~找原因去");
		}
	});
	// 分享给朋友
	wx.onMenuShareAppMessage({
		title : title, // 分享标题
		desc : str, // 分享描述
		link : url + "#", // 分享链接
		imgUrl : "http://whzt.taikang.com/brazil/static/images/share2.png", // 分享图标
		type : '', // 分享类型,music、video或link，不填默认为link
		dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
		success : function() {
			// 用户确认分享后执行的回调函数
			// massage("这就分享成功了~~想干嘛干嘛");
		},
		cancel : function() {
			// 用户取消分享后执行的回调函数
			// massage("这就是分享失败了~~找原因去");
		}
	});
});
