var returnMessageObj = {
	details: {}
};
//兼容ie6的sessionStorage
var sessionStorage = new Storage('local');


var PAGE_DATA = {}; //存储页面操作的数据
var INIT_DATA = {}; //存储初始化调用接口的数据

var insure = "http://insure.test.hera.tk.cn";
var deluat = "http://deluat.taikang.com";

var URLSER = "http://ecuat.taikang.com/tkecs/api/rest"; //登录接口
var planCacheMap = [];
var planFactor = {};
planFactor.toString = function() {
	var str = "";
	for(var key in this) {
		if(key != "toString") {
			str += this[key];
		}
	}
	return str;
}

var applicationId = "12345";
var applicationToken = "";
var platform = "pc";
var channelId = "3";

$.ajax({
	url: deluat + "/hera_insure/api/insure/v1/application/",
	type: "post",
	dataType: "json"
}).done(function(data) {
	console.log(data);
	if(data.code == "0") {
		applicationId = data.data.applicationId;
		applicationToken = data.data.applicationToken;
	}
}).fail(function() {
	alert("网络异常");
	console.log("applicationId请求失败");
});

$(function() {
	$("body").append('<script src="../src/js/jquery.cookie.js"></script>');
	$("body").append('<script src="../src/js/layer/layer.js"></script>');
	$("body").append('<script src="../src/js/json.js"></script>');
	$("body").append('<script src="../src/js/sessionStorage.js"></script>');
	returnMessageInit();
	planCacheMapInit();
	pageEventInit();

});

function pageEventInit() {
	$(".pcPackageName").click(function() {
		$(".pcPackageName").removeClass("active");
		$(this).addClass("active");

		planFactor.name = $(this).attr("planNameIndex");
		showPlan();
		iframeHeight();
	});
	$(".pcPackageName:first").click();

	//投保期间
	var periodStr = ".insurePeriod .insurePeriod";
	if($(periodStr).length > 1) {
		$(periodStr).click(function() {
			$(periodStr).removeClass("active");
			$(this).addClass("active");

			planFactor.period = $(this).attr("factorIndex");
			showPlan();

			$(".insurePeriodMessage").html(getInsureDateStr($(this).html()));
		});
		$(periodStr).first().click();
	} else {
		$(periodStr).css({
			"border": "none",
			"padding": "0"
		}).parent().css({
			"border": "none",
			"cursor": "default"
		});

		if($(periodStr).length > 0) {
			$(".insurePeriodMessage").html(getInsureDateStr($(periodStr + ":first").html()));
		}
	}

	//投保年龄
	if($(".insureAge .insureAge").length > 1) {
		$(".insureAge .insureAge").click(function() {
			$(".insureAge .insureAge").removeClass("active");
			$(this).addClass("active");

			planFactor.age = $(this).attr("factorIndex");
			showPlan();
		});
		$(".insureAge .insureAge").first().click();
	} else {
		$(".insureAge .insureAge").css({
			"border": "none",
			"padding": "0",
			"cursor": "default"
		});
	}

	$(".pcLiability").click(function() {
		$(this).find(".liabilityDescription").toggle();
	});
	//快速投保
	$(".quickBuy").click(function() {
		var productId = getProductId() || "1702";
		var productAge = "";
		var planName = "";
		returnMessageObj.productId = productId;
		returnMessageObj.platform = platform;
		returnMessageObj.channelId = channelId;
		returnMessageObj.applicationId = applicationId;
		returnMessageObj.applicationToken = applicationToken;
		returnMessageObj.seedId = "3";
		returnMessageObj.processHandler = "property";

		returnMessageObj.memberId = "";
		returnMessageObj.memberToken = "";

		if($(".insureAge .insureAge").length > 1) {
			if($(".insureAge .insureAge").hasClass("active")) {
				productAge = $(".insureAge .insureAge.active").text();
			}
		} else {
			productAge = $(".insureAge .insureAge").text();
		}

		if($(".packageNameList .pcPackageName").length > 1) {
			if($(".packageNameList .pcPackageName").hasClass("active")) {
				planName = $(".packageNameList .pcPackageName.active").text();
			}
		} else {
			planName = $(".packageNameList .pcPackageName").text();
		}
//2016-07-20
//		sessionStorage.setItem("productName", $(".productName").text());
//		sessionStorage.setItem("productDesc", $(".productDescription").text());
//		sessionStorage.setItem("productAge", productAge);
//		sessionStorage.setItem("planName", planName);
//		sessionStorage.setItem("returnMessage", JSON.stringify(returnMessageObj));

		//兼容 ie6的sessionStorage
		
   		sessionStorage.set("productName", $(".productName").text());
		sessionStorage.set("productDesc", $(".productDescription").text());
		sessionStorage.set("productAge", productAge);
		sessionStorage.set("planName", planName);
		sessionStorage.set("returnMessage", JSON.stringify(returnMessageObj));
		
		console.log(returnMessageObj);

		//快速投保
		$.ajax({
			url: deluat + "/hera_insure/api/insure/v1/application/" + applicationId + "/details",
			type: "post",
			dataType: "json",
			data: JSON.stringify(returnMessageObj)
		}).done(function(data) {
			if(data.code == "0") {
				window.top.location.href = "orderinfo.html";
			} else {
				alert(data.message);
			}
		}).fail(function() {
			alert("网络异常");
		});
	});
	//会员投保
	$(".login").click(function() {
		//		var formValidate = setSubmitStyle();
		//      if(!formValidate){
		//          return false;
		//      }
		var tkmid = $.cookie('tkmid');
		var tkmname = $.cookie('tkmname');
		var tkmssid = $.cookie('tkmssid');
		var tkmtoken = $.cookie('tkmtoken');
		var data_cookie = {};
		data_cookie.id_policy = {};

		if(!tkmid && !tkmname) {
			setload(); //登录
		} else {
			//校验会员信息
			data_cookie.id_policy.planCode = 'I0010';
			data_cookie.id_policy.isSupportCalc = "true";
			data_cookie.tkmid = tkmid;
			data_cookie.tkmname = tkmname;
			data_cookie.tkmssid = tkmssid;
			data_cookie.tkmtoken = tkmtoken;
			data_cookie = JSON.stringify(data_cookie);
			var productId = getProductId() || "1702";
			var productAge = "";
			var planName = "";
			returnMessageObj.productId = productId;
			returnMessageObj.platform = platform;
			returnMessageObj.channelId = channelId;
			returnMessageObj.applicationId = applicationId;
			returnMessageObj.applicationToken = applicationToken;
			returnMessageObj.seedId = "3";
			returnMessageObj.processHandler = "property";
			returnMessageObj.memberId = "";
			returnMessageObj.memberToken = "";
			if($(".insureAge .insureAge").length > 1) {
				if($(".insureAge .insureAge").hasClass("active")) {
					productAge = $(".insureAge .insureAge.active").text();
				}
			} else {
				productAge = $(".insureAge .insureAge").text();
			}

			if($(".packageNameList .pcPackageName").length > 1) {
				if($(".packageNameList .pcPackageName").hasClass("active")) {
					planName = $(".packageNameList .pcPackageName.active").text();
				}
			} else {
				planName = $(".packageNameList .pcPackageName").text();
			}
//2016-07-20			
//			sessionStorage.setItem("productName", $(".productName").text());
//			sessionStorage.setItem("productDesc", $(".productDescription").text());
//			sessionStorage.setItem("productAge", productAge);
//			sessionStorage.setItem("planName", planName);
//			sessionStorage.setItem("returnMessage", JSON.stringify(returnMessageObj));

			sessionStorage.set("productName", $(".productName").text());
			sessionStorage.set("productDesc", $(".productDescription").text());
			sessionStorage.set("productAge", productAge);
			sessionStorage.set("planName", planName);
			sessionStorage.set("returnMessage", JSON.stringify(returnMessageObj));	

			//保存详情页
			$.ajax({
				url: deluat + "/hera_insure/api/insure/v1/application/" + applicationId + "/details",
				type: "post",
				dataType: "json",
				data: JSON.stringify(returnMessageObj)
			}).done(function(data) {
				if(data.code == "0") {
					window.top.location.href = "orderinfo.html";
				} else {
					alert(data.message);
				}
			}).fail(function() {
				alert("网络异常！");
			});
			//查询登录状态
			$.ajax({
				url: deluat + "/hera_insure/api/insure/v1/customer/info",
				type: 'get',
				dataType: 'json',
				data: {
					"data": data_cookie
				},
				async: 'false',
				success: function(data) {
					//  if(data.result == 'false') {
					//     layer.msg(data.errorinfo);
					//                      return false;
					//                  }
					//
					//                  if(!data.id_user||!data.id_user.member_id) {
					//                      setload();
					//                      return;
					//                  }else {
					//                      submit(data.id_user.member_id);
					//                  }
					if(data.code == "0") {

						window.top.location.href = "orderinfo.html";
					} else {
						alert(data.message);
					}

				},
				error: function() {
					layer.msg('超时');
				}
			});
		}
	});
}

function showPlan() {
	$(".pcPackage").hide();

	for(var i = 0; i < planCacheMap.length; i++) {
		var el = planCacheMap[i];

		if(el.index == planFactor.toString()) {
			var $plan = $(el.plan);
			$plan.show();

			var price = $plan.attr("planPrice");
			var planScore = $plan.attr("planScore");
			$(".priceData").html("￥" + price);

			returnMessageObj.details.planId = $plan.attr("planId");
			returnMessageObj.details.planPrice = price;
			returnMessageObj.details.planScore = planScore;
			var planLiabilityList = [];
			$plan.find(".pcLiability").each(function(index, ele) {
				planLiabilityList.push({
					"liabilityId": $(ele).attr("liabilityId")
				});
			});
			returnMessageObj.details.planLiabilityList = planLiabilityList;

			return;
		}
	}
}

function planCacheMapInit() {
	$(".pcPackage").each(function(index, el) {
		var wapPlan = $(el);
		var index = wapPlan.attr("planIndex");

		planCacheMap.push({
			index: index,
			plan: el
		});
	});
	//年龄
	if($(".insureAge").find(".insureAge").length) {
		planFactor.age = "0";
	}
	//期间
	if($(".insurePeriod").find(".insurePeriod").length) {
		planFactor.period = "0";
	}
	if($(".pcPackageNameList").length) {
		planFactor.name = "0";
	}
}

function returnMessageInit() {
	var wapReturnMessage = $(".pcReturnMessage");
	var messageList = wapReturnMessage.attr("returnMessage").split(",");
	$.each(messageList, function(key, value) {
		returnMessageObj.details[value] = "";
	});
	// messageList.forEach(function(el) {
	//     returnMessageObj.details[el] = "";
	// });
}

function getProductId() {
	var href = location.href;
	href = href.substr(href.lastIndexOf('/') + 1);
	href = href.substring(0, href.indexOf('_'));
	return href;
}

function getInsureDateStr(dayStr) {
	var days = 1;
	if(dayStr.indexOf("年") > -1) {
		days = 365;
	} else {
		days = parseInt(dayStr);
	}

	return "从" + getStartInsureDate() + "到" + getEndInsureDate(days) + "有效";
}

function getStartInsureDate() {
	var t = new Date();
	t.setDate(t.getDate() + 1);
	var year = t.getFullYear();
	var mon = t.getMonth() + 1;
	var dat = t.getDate();

	return year + "-" + mon + "-" + dat + "零时";
}

function getEndInsureDate(days) {
	var t = new Date();
	t.setDate(t.getDate() + 1);

	if(days == 365) {
		t.setFullYear(t.getFullYear() + 1);
	} else {
		t.setDate(t.getDate() + days);
	}

	var year = t.getFullYear();
	var mon = t.getMonth() + 1;
	var dat = t.getDate();

	return year + "-" + mon + "-" + dat + "二十四时";
}
//提交按钮样式
function setSubmitStyle() {
	if(PAGE_DATA.amount) {
		$('#calcSubmit').prop('disabled', false).css('background', '#f50');
		$('#submit').prop('disabled', false);
	} else {
		if(!PAGE_DATA.amount) {
			layer.msg("请填写投资金额");
			return false;
		}
	}
	return true;
}
//跳登录存cookie
function setload() {
	var page_data = JSON.stringify(PAGE_DATA);
	$.cookie('page_data', page_data);

	//跳转到登录
	skipLoad();
}

function skipLoad() {
	var _location = window.parent.location.href;
	$.cookie("tkreferrer", _location, {
		path: "/",
		domain: "taikang.com"
	});

	window.top.sAlertsumbet(window.top.strHtml);
	window.top.getRandomGif()

	/*测试环境*/
	//  var URLLOAD="http://ecuat.taikang.com/eservice/login/login.jsp"; 
	//	 var URLLOAD="http://shop.taikang.com/eservice/login/login.jsp"; 
	//  window.parent.location.href = URLLOAD;
}

function submit(member_id) {
	var formValidate = setSubmitStyle();
	if(!formValidate) {
		return false;
	}
	var data = {};
	data.id_user = {};
	if(member_id == "直接购买") {
		member_id = "";
		data.id_user.member_id = "";
		data.id_user.isMember = "false";
	} else {
		data.id_user.member_id = member_id;
	}
	data.id_eciSetup = {};
	data.id_eciSetup.flowid = '1013';
	data.id_policy = {};
	data.id_policy.amount = PAGE_DATA.amount;
	data.id_policy.lrt_id = '252';
	data.id_policy.investInsure = {};
	data.id_policy.investInsure.accountValue = PAGE_DATA.amount;
	data.id_policy.realPremium = PAGE_DATA.amount;
	data.id_policy.totalPremium = PAGE_DATA.amount;
	data.id_policy.insurants = [];
	data.id_policy.insurants[0] = {};
	data.id_policy.insurants[0].insureCompList = [];
	data.id_policy.insurants[0].insureCompList[0] = {};
	data.id_policy.insurants[0].insureCompList[0].risk = PAGE_DATA.amount;
	data.id_policy.insurants[0].insureCompList[0].fee = PAGE_DATA.amount;
	data.id_policy.insurants[0].insureCompList[0].buyNumber = PAGE_DATA.amount / 1000 + "";
	data.id_policy.insurants[0].insureCompList[0].lrtc_id = '2521';

	var result = JSON.stringify(data);
	var calc_url = deluat + "/v1/PC/orders/calculator";
	$.ajax({
		url: calc_url,
		type: 'POST',
		dataType: 'json',
		data: {
			'data': result
		},
		timeout: 5000,
		async: false,
		success: function(data) {
			if(data.status != "201") {
				if(islogintimeout(data)) {
					if(clearCookie()) {
						layer.alert(data.message, {
								icon: 0,
								skin: 'layui-layer-hui',
								closeBtn: 0
							},
							function() {
								setload();
							});
					}
					return false;
				} else {
					fail_page("failPage", "details_main", data.message);
					PAGE_DATA.form_id = data.id_policy.form_id;
				}
			} else {
				$.cookie("page_cookie", null); // 清除cookie
				var _url = "../individual/information.html?flow_id=1013&form_id=" + data.id_policy.form_id + "&member_id=" + member_id + "&sign=" + data.sign;
				if(window.top.document.getElementById('nextPages') != null) {
					var parentFrame = window.top.document.getElementById('nextPages');

					var framesrc = parentFrame.src;
					parentFrame.src = TELEURI.concat(_url);
				} else {
					window.parent.location.href = _url;
				}
			}
		},
		error: function() {
			layer.msg('error！');
		}

	})
}