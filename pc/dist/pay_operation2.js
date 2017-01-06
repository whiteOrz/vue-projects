/**************************微信扫码支付 start**************************/
function initPay(arr) {
	var payment=arr;
	//var payment = arr.pcPayment;
	var str = "";
	$.each(payment[1].paymentList, function(index, item) {

		str += '<div class="bank_part">' +
			'<input type="radio" name="payway-list"  checked="checked" paywayId="' + item.paywayId + '" />' +
			'<img src="../src/image/pay/pay2.png" width="45" height="45" />' +
			'<p class="pay-icon">' + item.paymentDesc + '</p>' +
			'</div>';

	});

	$("#pay").append(str);
}
/**************************微信扫码支付 end**************************/

/**************************银行start**************************/
//首期银行
var tabJson = {
	"creditArea": "信用卡",
	"payPlatformArea": "支付平台",
	"debitArea": "储蓄卡"
};
var firstPayJson={
	"debitArea": "",
	"creditArea": "",
	"payPlatformArea": "",
}
//银行
function initFirstPay(arr) {
	var fist = arr;
	//tab ->用于tab切换
	var tab = '';
	//str ->支付方式列表
	var str = '';
	var icon;

	
	$.each(fist,function(index,item){
		if(index=="debitArea"){
			firstPayJson["debitArea"]=fist[index];	
		}else if(index=="creditArea"){
			firstPayJson["creditArea"]=fist[index];
		}else{
			firstPayJson["payPlatformArea"]=fist[index];
		}
	});

	tab += '<div class="otherPay-tab-c clearfix">';
	$.each(firstPayJson, function(index, item) {

		tab += '<p class="tab-hd " data-type="' + index + '">' + tabJson[index] + '</p>'

		str += '<div class="other-card-c clearfix  '+index+' " data-type="'+index+'" id="'+index+'">';
		if (index == "debitArea") {
			$.each(firstPayJson[index].cmb, function(indexs, items) {
				icon = items.bankNo;
				icon = icon.toLowerCase();
				str += '<div class="noIntbackb-c">' 
						+ '<div class="noIntbackimg-c clearfix" data-id="' + items.id + '" >' 
							+ '<input type="radio" name="'+index+'" id="bank_'+icon+'" paywayId="' + items.paywayId + '" bankId="' + items.bankId + '" bankCode="'+items.payBankCode+'"  cardType="'+items.cardType+'" payBankCode="'+items.payBankCode+'"/>'
							+ '<label class="backimgbox" for="bank_'+icon+'">' 
								+ '<img src="../src/image/bank1/bank_' + icon + '.png" alt="' + items.bankName + '" />' 
							+ '</label>' 
						+ '</div>'
					+ '</div>';
			});
		} else {
			$.each(firstPayJson[index], function(indexs, items) {
				icon = items.bankNo;
				icon = icon.toLowerCase();
				str += '<div class="noIntbackb-c">' 
							+ '<div class="noIntbackimg-c clearfix" data-id="' + items.id + '" >'
								+ '<input type="radio" name="'+index+'" id="bank_'+icon+'" paywayId="' + items.paywayId + '" bankId="' + items.bankId + '" bankCode="'+items.payBankCode+'" cardType="'+items.cardType+'" payBankCode="'+items.payBankCode+'"/>' 
								+ '<label class="backimgbox" for="bank_'+icon+'">' 
									+ '<img src="../src/image/bank1/bank_' + icon + '.png" alt="' + items.bankName + '" />'
								+ '</label>' 
							+ '</div>'
						+ '</div>';
			});
		}
		str += '</div>';
	});
	tab += '</div>';
	$("#pay").append(tab);
	$("#pay").append(str);
}
//续期银行
function initRenewal(arr) {
	var renewal=arr;

	var str = '';
	var icon = '';
	$.each(renewal, function(index, item) {
		icon = item.paybankCode;
		icon = icon.toLowerCase();
		str += '<div class="noIntbackb-c clearfix">' 
				+ '<div class="noIntbackimg-c clearfix">' 
					+ '<input type="radio" name="bank-c"  bankNo="' + item.bankNo + '" paybankCode="'+item.paybankCode+'" bankCode="'+item.bankCode+'" paywayId="' + item.paywayId+'"/>' 
					+ '<label class="backimgbox">' 
						+ '<img src="../src/image/bank1/bank_' + icon + '.png" alt="' + item.bankName + '" />'
					+ '</label>' 
					+ '</div>'
				+ '</div>';
	});
	$("#payRenewal").append(str);
}
/**************************银行 end**************************/

//兼容ie6的sessionStorage
var storage = new Storage('session');
var getMessage = storage.get("returnMessage");
var proposalNo = storage.get("proposalNo") || "";
var proposalToken = storage.get("proposalToken") || "";
var metadata_platform = "pc";
var metadata_scope = "pc";
var platform = "pc";



var _smq = _smq || [];
//产品名称
var productName = storage.get("productName") || "";
if(getMessage!=""){
	getMessage=JSON.parse(getMessage);
}
if ($.isEmptyObject(getMessage)) {
	var plan = "";
	var applicationId = "";
	var productId = "";
	var channelId = "";
	var applicationToken = "";
	var openId = "";
	var memberId = "";
	var memberToken = "";
	//产品价格	 产品积分
	var planPrice = "";
	var planScore = "";

	var iApplicantName=""; //姓名
	var iApplicantId=""; //身份证号
	var iApplicantIdTye="";
} else {
	var plan = getMessage.plan;
	var applicationId = getMessage.applicationId;
	var productId = getMessage.productId;
	var channelId = getMessage.channelId;
	var applicationToken = getMessage.applicationToken;
	var openId = getMessage.openId;
	var memberId = getMessage.memberId;
	var memberToken = getMessage.memberToken;
	var planPrice = JSON.parse(getMessage.details.planPrice);
	var planScore = getMessage.details.planScore;

	var iApplicantName=getMessage.inputs.applicantInfo.applicantName; //姓名
	var iApplicantId=getMessage.inputs.applicantInfo.applicantId; //身份证号
	var iApplicantIdTye=getMessage.inputs.applicantInfo.applicantIdType;
	
}

//returnMessage->用于提交保存支付信息接口
var returnMessage = {
	"platform": platform,
	"applicationToken": applicationToken,
	"processHandler": "property",
	"payment": {
		"paywayId": "",
		"tradeCost": planPrice,
		//新加
		"premium": planPrice,
		"successUrl": "",
		"failUrl": "",
		"callback_code": "201",

		"payFirst": {
			// "paywayId": "",
			// "bankId": "",
			// "backCode": "",
			// "payerName": "",
			// "payerIdType": "",
			// "payerId": "",
			// "backAccount": ""
		},
		"payRenewal": {
			// "payerName": "",
			// "payerIdType": "",
			// "payerId": "",
			// "bankCode": "",
			// "bankAccount": ""
		}
		//新加
	}
};
var renewalArr=[];
$(function(){
	//绑定银行->隐藏
	 $("#payFirstBind").hide();
	//续期银行->隐藏
	 $("#payRenewalMethod").hide();
	

	/**************************渲染页面 start**************************/
	$.ajax({
		type: "get",
		url: insure + "/hera_insure2/api/insure/v2/productMetadata/" + productId + "/" + metadata_platform + "/payment?proposalNo="+proposalNo+"&proposalToken="+proposalToken,
		dataType: "json",
		async: false,
		success: function(msg) {
			if (msg.code == "0") {
				//data = msg.data;
				if(msg.data.pcPayment){
					//财险->微信扫码
					initPay(msg.data.pcPayment);
					
					
				}else{
					
					//寿险->银行
					initFirstPay(msg.data.fist);
					if(msg.data.renewal){
						//续期
						renewalArr=msg.data.renewal;
						initRenewal(msg.data.renewal);
						 $("#payRenewalMethod").attr("data-type","true");
						//$("#payRenewalMethod").show();
					}
				}
				
			} else {
				alert(msg.message);
			}
		},
		error: function() {
			alert("网络异常");
		}
	});
	/**************************渲染页面 end**************************/



	/**************************整数的价格添加".00"字样  srart**************************/
	if (planPrice.toString().indexOf(".") == -1) {
		planPrice = planPrice + ".00";
	}
	/**************************整数的价格添加".00"字样  end**************************/

	/**************************页面一些文字显示 start**************************/
	var applicantIdTypeJson={
		"01":"身份证"
	};
	$("#proposalNo").text(proposalNo);
	$("#planPrice").text(planPrice);
	$("#price").text(planPrice);
	$(".planPrice").text(planPrice);


	$("#applicantName").html(iApplicantName);
	$("#applicantType").html(applicantIdTypeJson[iApplicantIdTye]);
	$("#applicantId").html(iApplicantId);
	

	$("#renewalName").html(iApplicantName);
	$("#renewalIdType").html(applicantIdTypeJson[iApplicantIdTye]);
	$("#renewalId").html(iApplicantId);

	/**************************页面一些文字显示 end**************************/

	/**************************支付方式切换 end**************************/

	if ($(".otherPay-tab-c .tab-hd").length > 1) {
		$(".otherPay-tab-c .tab-hd").on("click", function() {
			var num = $(this).index();
			$(".otherPay-tab-c .tab-hd").removeClass("current");
			$(this).addClass("current");
			$(".other-card-c").hide();
			$(".other-card-c").eq(num).show();
			if($(this).attr("data-type")=="debitArea"&& $("#payRenewalMethod").attr("data-type")=="true"){
				 $("#payRenewalMethod").show();

			}else{
				 $("#payRenewalMethod").hide();
			}
			$("#payFirstBind").hide();
		});
		$(".otherPay-tab-c .tab-hd:first").click();
	} else {
		$(".otherPay-tab-c .tab-hd:first").addClass("current");
	}
	/**************************支付方式切换 end**************************/

	/**************************点击信用卡 储蓄卡银行 显示绑卡div end**************************/

	$(".other-card-c").on("click","input[type='radio']",function(){
		var  iType=$(this).closest(".other-card-c").attr("data-type");
		$("#payFirstBind").find("#applicantBank").val("");
		if(iType!="payPlatformArea"){
			if($(this).prop("checked")){
				
				$("#payFirstBind").show();
			}else{
				$("#payFirstBind").hide();
			}
		}
	});
	/**************************点击信用卡储蓄卡的银行 显示绑卡div end**************************/




	/**************************留存续期账号 按钮 start**************************/
	function useAccountsRew(){
		if(renewalArr.length==0){
			return ;
		}
		if($("#debitArea input[type='radio']:checked").length) {
	        var payBankCode = $("#debitArea input[type='radio']:checked").attr("payBankCode");
	        var cardType=$("#debitArea input[type='radio']:checked").attr("cardType");
	       // var payblock = Bank_container[checkid];
        	var onOff = false;
	        for(var i =0;i<renewalArr.length;i++){
	            if(renewalArr[i].paybankCode== payBankCode) {
	                onOff = true;
	                break;
	            }
	        }
	        if(cardType == "DEBIT" && onOff) {
	            $('#saveFirst').show();
	        }else {
	            $('#saveFirst').hide();
	        }
  	  }
	}

	$(".pay_b_a input").click(function() {
		if ($(this).is(":checked")) {
			$("#saveIdenty").show();
			useAccountsRew();
		} else {
			$("#saveIdenty").hide();
		}
	});
	/**************************留存续期账号 按钮 end**************************/

	/**************************续期 “续期同首期” 按钮 start**************************/



	
	
	/**************************续期 “续期同首期” 按钮 end**************************/


	/**************************续期 “选择其他支付方式” 按钮 start**************************/
	$(".othermethod").click(function(){
		$("#payRenewalBox").show();
	});

	$("#payRenewal input[type=radio]").click(function(){
		if($(this).is(":checked")){
			$("#otherPayBox").show();
			$("#otherPayBox").find("#renewalBank").val("");
		}
	});
	/**************************续期 “选择其他支付方式” 按钮 end**************************/
	


	/**************************续期银行的 查看支付限额 start**************************/

	$(".paysee_link2_c").hover(
		function() {
			$(".pay_money2_c").show();
		},
		function() {
			$(".pay_money2_c").hide();
		}
	);

	/**************************续期银行的 查看支付限额 end**************************/




		/**************************支付按钮  start**************************/
	$("#payBtn").click(function() {
		_smq.push(['custom', '投保流程_支付页', '确认支付', '财险_' + productName, '']);
		TKTrack({
			event: '确认支付',
			subType: '财险_全年综合意外保障'
		});
		var timer = null;
		var index = 30;

		if($(".bank_part").is(":visible")){
			$(".bank_part input[name='payway-list']").each(function() {
				if ($(this).is(":checked")) {
					returnMessage.payment.paywayId = $(this).attr("paywayId");
				}
			});
		}
		/*	请同意保费自动转账授权声明 start*/
		
		// if(!$("#agrChk").prop(":checked")){
		// 	alert("请同意保费自动转账授权声明");
		// 	return ;
		// }
		/*	请同意保费自动转账授权声明 end*/

		if($(".other-card-c input[type='radio']:checked").length<1){
			alert("请选择支付支付方式");
			return ;
		}
		var iPayBankCode='';
		$(".other-card-c").each(function(index,el){
			var $el=$(el);
			$el.find("input[type=radio]:checked").each(function(){
				returnMessage.payment.paywayId = $(this).attr("paywayId");
				returnMessage.payment.payFirst.paywayId = $(this).attr("paywayId");
				returnMessage.payment.payFirst.bankId=$(this).attr("bankId");
				returnMessage.payment.payFirst.bankCode=$(this).attr("bankCode");
				iPayBankCode=$(this).attr("payBankCode");
			})	
		});

		if($("#payFirstBind").is(":visible")){
			returnMessage.payment.payFirst.payerName = $("#applicantName").html();	
			returnMessage.payment.payFirst.payerIdType =iApplicantIdTye ;
			returnMessage.payment.payFirst.payerId=$("#applicantId").html();
			returnMessage.payment.payFirst.bankAccount=$("#applicantBank").val();
		}
		//续期同首期	
		if($("#sameRenewal").is(":checked")){
			returnMessage.payment.payRenewal.payerName=returnMessage.payment.payFirst.payerName;
			returnMessage.payment.payRenewal.payerIdType=returnMessage.payment.payFirst.payerIdType;
			returnMessage.payment.payRenewal.payerId=returnMessage.payment.payFirst.payerId
			returnMessage.payment.payRenewal.bankAccount=returnMessage.payment.payFirst.bankAccount;

			$("#payRenewal input[type='radio']").each(function(index,el){
				var el=$(el);
				if(el.attr("payBankCode")==iPayBankCode){
					returnMessage.payment.payRenewal.bankCode=el.attr("bankCode");
				}
			});
		}else{
			
			
			returnMessage.payment.payRenewal.bankCode=$("#payRenewal input[type='radio']:checked").attr("bankCode");			
			returnMessage.payment.payRenewal.payerName=$("#renewalName").html();	
			returnMessage.payment.payRenewal.payerIdType=iApplicantIdTye;	
			returnMessage.payment.payRenewal.payerId=$("#renewalId").html();	
			returnMessage.payment.payRenewal.bankAccount=$("#renewalBank").val();	
		}

		getMessage.payment = returnMessage.payment;
		storage.set("returnMessage","getMessage")
		console.log(returnMessage)



		// //保存支付信息
		$.ajax({
			type: "post",
			url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/payment?t=" + Math.random(),
			data: JSON.stringify(returnMessage),
			dataType: "json",
			success: function(msg) {
				if (msg.code == "0") {
					var payUrl = msg.data.payUrl;
					var tradeId = msg.data.tradeId;
					var tradeToken = msg.data.tradeToken;

					storage.set("tradeId", tradeId);
					storage.set("tradeToken", tradeToken);

					if (payUrl.indexOf("http") != -1) {
						window.open(payUrl, "_blank")
					} else {
						$(".next-btn").prop("disabled", true);
						$(".next-btn").css("background", "gray");

						$(".next-btn").val(index + "s");
						timer = setInterval(function() {
							$(".next-btn").val(index + "s");
							index--;

							if (index == 0) {
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
		//保存支付信息
	});

	/**************************支付按钮  end**************************/









	/**************************微信扫码支付  start**************************/
	//点击  关闭微信扫码提示框
	$("#layer-close").click(function() {
		$("#layer-conent").hide()
		$("#layer").hide();
	});
	//点击支付完成
	$("#wx-finish").click(function() {
		_smq.push(['custom', '投保流程_支付页', '支付完成', '财险_' + productName, planPrice]);
		TKTrack({
			event: '支付完成',
			subType: '财险_' + productName
		})
		var tradeId = storage.get("tradeId") || "";
		var tradeToken = storage.get("tradeToken")|| "";
		//查询支付状态
		var returnMessagePay = {
			"tradeId": tradeId,
			"tradeToken": tradeToken
		}
		$.ajax({
			type: "get",
			url: insure + "/hera_insure2/api/insure/v2/application/getPayStatus?t=" + Math.random(),
			data: returnMessagePay,
			dataType: "json",
			success: function(msg) {
				if (msg.code == "0") {
					if (msg.data.payStatus == "0") {
						$("#layer-conent").hide()
						$("#layer").hide();
						window.location.href = "paySuccess.html";
					} else if (msg.data.payStatus == "-2") {
						alert("订单不存在");
					} else if (msg.data.payStatus == "-1") {
						alert("订单未支付");
					} else if (msg.data.payStatus == "1") {
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
	/**************************微信扫码支付  end**************************/

});