function initList(data) {
	var str = "";
	var valueList = data.valueList;
	$.each(valueList, function(index, item) {
		str += '<div class="health-list clearfix" id="health-list"><div class="health-q" data-informID="' + item.itemId + '">' + item.content + '</div>' +
			'<div class="health-option">' +
			'<label><input type="radio" name="' + item.itemId + '" value="yes" class="rad">是</label>' +
			'<label><input type="radio" name="' + item.itemId + '" value="no" checked="checked" class="rad">否</label>' +
			'</div></div>'
	});
	$("#health-con").append(str);

};
$(function() {
	var metadata_scope = "pc";
	var metadata_platform = "pc";
	var platform = "pc";
	var _smq = _smq || [];
	//兼容ie6的sessionStorage
	var storage = new Storage('session');

	var getMessage = JSON.parse(storage.get("returnMessage"));
	if($.isEmptyObject(getMessage)) {
		var plan = "";
		var	applicationId = "";
		var	productId = "";
		var	channelId = "";
		var	applicationToken = "";
		var	openId = "";
		var	memberId = "";
		var	memberToken = "";
		//产品价格	
		var planPrice = "";
		//产品积分
		var planScore = "";

	} else {
		var plan = getMessage.plan;
		var	applicationId = getMessage.applicationId;
		var	productId = getMessage.productId;
		var	channelId = getMessage.channelId;
		var	applicationToken = getMessage.applicationToken;
		var	openId = getMessage.openId;
		var	memberId = getMessage.memberId;
		var	memberToken = getMessage.memberToken;
		//产品价格	
		var planPrice = getMessage.details.planPrice;
		//产品积分
		var planScore = getMessage.details.planScore;
	}

	var proposalNo = storage.get("proposalNo") || "";
	var proposalToken = storage.get("proposalToken") || "";
	//产品名称
	var productName = storage.get("productName")||"";
	$(".insurd_tit").text(productName);
	//用于渲染健康告知页面
	var sendMessage = {
		"applicationId": applicationId,
		"applicationToken": applicationToken
	}

	$.ajax({
		url: insure + "/hera_insure2/api/insure/v2/productMetadata/" + productId + "/" + metadata_scope + "/healthinfo",
		type: "post",
		data: JSON.stringify(sendMessage),
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				data = msg.data;
				initList(data);
			} else {
				alert(msg.message);
			}
		},
		error: function() {
			alert("网络异常");
		}
	});
	//保存健康告知
	var returnMessage = {
		"platform":platform,
		"applicationToken": applicationToken,
		"memberId": memberId,
		"memberToken": memberToken,
		"processHandler": "property",
		"healthinfo": {
			"exceptionDesc":"",
			"informList": []
		}

	};


	$("#health-con input").click(function(){
		if($(this).is(":checked")&&$(this).val()=="yes"){
			$("#desc").show();
		}
	});

	var AnswerJson={
		"yes":"是",
		"no":"否"
	}


	$("#check-form").click(function() {
		_smq.push(['custom', '投保流程_健康告知页', '提交', '财险_'+productName, '']);
		TKTrack({event:'提交',subType:'财险_'+productName})

		if($("#desc textarea").val().length<50||$("#desc textarea").val().length>500){
				alert("描述信息不正确");
				return false;
		}
		returnMessage.healthinfo.exceptionDesc=$("#desc textarea").val();
		
		var healthList = $(".health-list");
		var chk = healthList.find("input:checked[value=yes]");
		healthList.each(function(index, el) {
			var informID = $(el).find(".health-q").attr("data-informID");
			var informAnswer=$(el).find("input[type=radio]:checked").val();
			var option = {
				"informAnswer": AnswerJson[informAnswer],
				"informID": informID
			}
			returnMessage.healthinfo.informList.push(option);
		});

		//保存健康告知
		$.ajax({
			url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/healthinfo",
			type: "post",
			dataType: "json",
			data: JSON.stringify(returnMessage),
			success: function(msg) {
				if(msg.code == "0") {
					var proposalNo = msg.data.proposalNo;
					var proposalToken = msg.data.proposalToken;
					storage.set("proposalNo", proposalNo);
					storage.set("proposalToken", proposalToken);
					window.location.href = "pay2.html";
				} else {
					alert(msg.message);
				}
			},
			error: function() {
				alert("网络异常");
			}
		});
	});
});