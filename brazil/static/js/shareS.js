window.log=function(v){
	console.log(v);
};
window.onload=function(){
	var name = resultjson.userInfo.name;
	var differRisk = resultjson.differRisk;
	var headImg = resultjson.userInfo.head_img;
	$(".help_mian").html(differRisk);
	$(".colorO").html(name);
	$(".mess_name").html(name);
	$(".picture").attr("src",headImg);

	/**
	 * 点击"前往打赏"触发
	 */
    $(".give_btn").on("tap", function () {

            //判断安全系数是不是超过150000
            if (resultjson.totalRisk <= 150000) {

    			$.post(getpre,{"openId":resultjson.otherOpenId},function(r){
//    				$.post(getpre,{"openId":"omCIGj0eiv1adqWo8Z8SM6IgAmtA"},function(r){
//    				massage(r);
    				var res=JSON.parse(r);
    				var content=JSON.parse(res.content).data;
    				if(res.code==0){
    					if(content.length){
//	    					massage(content[0]);
	    					var select=content[0];
	    					$.post(addWechatInsure,{"type":3,"openid":resultjson.openid,"otherOpenId":resultjson.otherOpenId,"prem":select.pay,"insured":select.amount},function(r){
	//    					$.post(addWechatInsure,{"openid":resultjson.openid,"otherOpenId":resultjson.otherOpenId,"type":3},function(r){
	    	                    var res=JSON.parse(r);
	    	                    if(res.code==0){
	    	                    	var content = JSON.parse(res.content);
	    	                        location.href=content.bankurl;
	    	                    }else{
	    	                        massage(res.errMsg);
	    	                    }
	    	                });
    					}else{
    						massage("该好友没有加入微互助");
    					}

    				}else{
    					massage(res.code+":"+res.errMsg);
    				}
    			});
                
            } else {
                massage("安全系数已经满150000");
            }
    });

};

function goIndex(){
	var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fa037cc7dfabad5&redirect_uri=http://hw.weixin.qq.com/steprank/auth?appid=wxcd7143c00e5bb6f7&scope=snsapi_userinfo,snsapi_health_realtime&response_type=code&scope=snsapi_base&state=A1&connect_redirect=1&other=step#wechat_redirect";
//	var url = localhostPaht + projectName + "/userto/login";
	window.location.href = url;
}
