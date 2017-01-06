function initPay(arr) {
	var payment = arr.pcPayment;
	var str = "";
	$.each(payment[1].paymentList, function(index, item) {

		str += '<div class="bank_part">' +
			'<input type="radio" name="payway-list" : checked="checked" paywayId="' + item.paywayId + '" />' +
			'<img src="../src/image/pay/pay2.png" width="45" height="45" />' +
			'<p class="pay-icon">' + item.paymentDesc + '</p>' +
			'</div>';

	});

	$("#pay").append(str);
}
$(function() {
	//兼容ie6的sessionStorage
	var storage = new Storage('session');
	var getMessage = storage.get("returnMessage");
	var proposalNo = storage.get("proposalNo") || "";
	var proposalToken = storage.get("proposalToken") || "";
	var metadata_platform = "pc";
	var metadata_scope = "pc";
	var platform = "pc";
	var _smq = _smq || [];

	if(getMessage!=""){
		getMessage=JSON.parse(getMessage);
	}
	if($.isEmptyObject(getMessage)) {
		var plan = "";
		var applicationId = "";
		var productId = 1702;
		var channelId = "";
		var applicationToken = "";
		var openId = "";
		var memberId = "";
		var memberToken = "";
		//产品价格	
		var planPrice = "";
		//产品积分
		var planScore = "";
	} else {
		var plan = getMessage.plan;
		var applicationId = getMessage.applicationId;
		var productId = getMessage.productId;
		var channelId = getMessage.channelId;
		var applicationToken = getMessage.applicationToken;
		var openId = getMessage.openId;
		var memberId = getMessage.memberId;
		var memberToken = getMessage.memberToken;
		//产品价格	
		var planPrice = getMessage.details.planPrice;
		//产品积分
		var planScore = getMessage.details.planScore;
	}

	//整数的价格添加".00"字样；
	if(planPrice.toString().indexOf(".") == -1) {
		planPrice = planPrice + ".00";
	}
	//产品名称
	var productName = storage.get("productName")||"";
	
	$("#proposalNo").text(proposalNo);
	$("#planPrice").text(planPrice);
	$("#price").text(planPrice);
	$(".planPrice").text(planPrice);
	//查询支付页面元数据接口
	$.ajax({
		type: "get",
		url: insure + "/hera_insure/api/insure/v2/productMetadata/" + productId + "/" + metadata_scope + "/payment?payAmount="+planPrice,
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				if($.isEmptyObject(msg.data)){
					return;
				}
				data = msg.data;
				initPay(data)
			} else {
				alert(msg.message);
			}
		},
		error: function() {
			alert("网络异常");
		}
	});
	//用于提交保存支付信息接口
	var returnMessage = {
		"platform":platform,
		"applicationToken": applicationToken,
		"processHandler": "property",
		"successUrl": "http://www.baidu.com",
		"failUrl": "http://www.baidu.com",
		"payment": {
			"paywayId": "",
			"tradeCost": planPrice
		}
	};
	$("#payBtn").click(function() {
		_smq.push(['custom', '投保流程_支付页', '确认支付', '财险_'+productName, '']);
		TKTrack({event:'确认支付',subType:'财险_全年综合意外保障'})
		var timer = null;
		var index = 30;

		$("input[name='payway-list']").each(function() {
			if($(this).is(":checked")) {
				returnMessage.payment.paywayId = $(this).attr("paywayId");
			}
		})
		getMessage.payment = returnMessage.payment;

		//保存支付信息
		$.ajax({
			type: "post",
			url: insure + "/hera_insure/api/insure/v2/application/" + applicationId + "/payment?t="+Math.random(),
			data: JSON.stringify(returnMessage),
			dataType: "json",
			success: function(msg) {
				if(msg.code == "0") {
					var payUrl = msg.data.payUrl;
					var tradeId = msg.data.tradeId;
					var tradeToken = msg.data.tradeToken;

					storage.set("tradeId", JSON.stringify(tradeId));
					storage.set("tradeToken", JSON.stringify(tradeToken));

					if(payUrl.indexOf("http") != -1) {
						window.open(payUrl, "_blank")
					} else {
						$(".next-btn").prop("disabled", true);
						$(".next-btn").css("background", "gray");

						$(".next-btn").val(index + "s");
						timer = setInterval(function() {
							$(".next-btn").val(index + "s");
							index--;

							if(index == 0) {
								clearInterval(timer);
								index = 30;
								$(".next-btn").prop("disabled", false);
								$(".next-btn").css("background", "#f60");
								$(".next-btn").val("支付");
							}

						}, 1000)

						setTimeout(function() {
							$(".next-btn").prop("disabled", false);
						}, 30000);

						$("#layer-conent").show();
						$("#layer").show();
						$(".wx-img").css({
							background: 'url("data:image/png;base64,' + payUrl + '")'
						});
					}
				} else {
					alert(msg.message);
				}

			},
			error: function(msg) {
				alert("网络异常");
			}
		});

	});

	$("#layer-close").click(function() {
		$("#layer-conent").hide()
		$("#layer").hide();
	});
	$("#wx-finish").click(function() {
		_smq.push(['custom', '投保流程_支付页', '支付完成', '财险_'+productName, planPrice]);
		TKTrack({event:'支付完成',subType:'财险_'+productName})
		var tradeId = JSON.parse(storage.get("tradeId")) || "";
		var tradeToken = JSON.parse(storage.get("tradeToken")) || "";
		//查询支付状态
		var returnMessagePay = {
				"tradeId": tradeId,
				"tradeToken": tradeToken
			}
		//查询支付状态
		$.ajax({
			type: "get",
			url: insure + "/hera_insure/api/insure/v2/application/getPayStatus?t="+Math.random(),
			data: returnMessagePay,
			dataType: "json",
			success: function(msg) {
				if(msg.code == "0") {
					if(msg.data.payStatus == "0") {
						$("#layer-conent").hide()
						$("#layer").hide();
						window.location.href = "paySuccess.html";
					} else if(msg.data.payStatus == "-2") {
						alert("订单不存在");
					} else if(msg.data.payStatus == "-1") {
						alert("订单未支付");
					} else if(msg.data.payStatus == "1") {
						alert("订单支付失败");
					}
				} else {
					alert(msg.message);
				}

			},
			error: function() {
				alert("网络异常");
			}
		})
	});
});