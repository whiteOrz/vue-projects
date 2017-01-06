$(function(){
	var insure="http://insure.test.hera.tk.cn";
	var deluat="http://deluat.taikang.com";
	//产品价格	
	var getMessage=JSON.parse(sessionStorage.getItem("returnMessage"))||{};
	var planPrice=getMessage.details.planPrice||"";
	
	if(planPrice.toString().indexOf(".")==-1){
		planPrice=planPrice+".00";
	}
	$(".planPrice").text(planPrice);
	
	$("#layer-close").click(function(){
		$("#layer-conent").hide()
		$("#layer").hide();
	});
	$("#wx-finish").click(function(){
		var tradeId=JSON.parse(sessionStorage.getItem("tradeId"))||"";
		var tradeToken=JSON.parse(sessionStorage.getItem("tradeToken"))||"";
		var returnMessage={
			"tradeId":tradeId,
			"tradeToken":tradeToken
		}
		
		$.ajax({
			type:"get",
			url:deluat+"/hera_insure/api/insure/v1/application/getPayStatus",
			data:returnMessage,
			dataType:"json",
			success:function(msg){
				if(msg.code=="0"){
					if(msg.data.payStatus=="0"){
						$("#layer-conent").hide()
						$("#layer").hide();
						window.location.href="paySuccess.html";
					}else if(msg.data.payStatus=="-2"){
						alert("订单不存在");
					}else if(msg.data.payStatus=="-1"){
						alert("订单未支付");
					}else if(msg.data.payStatus=="1"){
						alert("订单支付失败");
					}
				}else{
					alert(msg.message);
				}
				
			},
			error:function(){
				alert("网络异常");
			}
		})
	});
})