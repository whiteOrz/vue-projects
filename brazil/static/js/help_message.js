window.onload=function(){
	var info=JSON.parse(localStorage.getItem("info"));
//	massage(info);
$(".go_help").on("tap",function(){
	var d=JSON.parse($(this).data("d"));
//	String openid = pd.getString("openid");//付钱、加步数
//	String otherOpenId = pd.getString("otherOpenId");//收钱 加保额
//	String orderid = pd.getString("orderid")==null?UuidUtil.generateOrderid():pd.getString("orderid");
//	String type = pd.getString("type");//1.互助集市直接买(来自market)  0.首页通知(来自挂起
	log(d);
	
	
	
//	massage(JSON.stringify({"openid":info.openid,"otherOpenId":d.otherOpenid,"orderid":d.serialno,"type":0}));
	$.post(getpre,{"openId":d.otherOpenid},function(r){
//		$.post(getpre,{"openId":"omCIGj0eiv1adqWo8Z8SM6IgAmtA"},function(r){
//		massage(r);
		
		var res=JSON.parse(r);
		if(res.code==0){
			var content=JSON.parse(res.content).data;
			if(content.length){
//			massage(content[0]);
				var select=content[0];
				$.post(addWechatInsure,{"openid":info.openid,"otherOpenId":d.otherOpenid,"orderid":d.serialno,"type":0,"prem":select.pay,"insured":select.amount},function(r){
//					massage(r);
					var res=JSON.parse(r);
					if(res.code==0){
						location.href=JSON.parse(res.content).bankurl;
						
					}else{
						massage(res.code+":"+res.errMsg);
					}
				});
			}else{
				massage("该好友没有加入微互助");
			}
		}else{
			massage(res.code+":"+res.errMsg);
		}
	});
});	
	
};

function show(content){
	for(var i =0;i< content.length;i++){
		log(content[i]);
		var str='<div class="help_list"><p class="help_xian"></p><div class="help_people"><img src="'+content[i].head_img+'"/></div><p class="help_txt"><span class="people_name">'+content[i].name+'</span>向您求助<span class="safe_num">1000</span>安全系数</p><img data-d='+JSON.stringify(content[i])+' class="go_help" src="http://whzt.taikang.com/brazil/static/images/go_help.png"/></div>';
		$("#thelist").append(str);
	}
}
