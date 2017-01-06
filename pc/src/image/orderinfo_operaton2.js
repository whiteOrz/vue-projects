var metadata_scope = "pc";
var platform = "pc";
var metadata_platform = "pc";
var duties = "";
var dutiesArr = [];
//兼容ie6的sessionStorage
var storage = new Storage('session');
var getMessage = JSON.parse(storage.get("returnMessage"));
var productName = storage.get("productName") || ""; //产品名称
var productDesc = storage.get("productDesc") || ""; //产品描述
var productAge = storage.get("productAge") || ""; //产品投保年龄
var planName = storage.get("planName") || ""; //套餐
var appminAge = storage.get("minAge") || 18; //投保人最小年龄
var appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
var productAgeArr = productAge.split("-");
var insminAge = productAgeArr[0]; //被保人最小年龄
var insmaxAge = productAgeArr[1]; //被保人最大年龄
var member = storage.get("member") || "";

var _smq = _smq || [];

//点击"同意以上声明，下一步"对页面的校验
var submitCheck = {
	"phApplicantContainer": function() {
		var phData = {};
		phData.name = {};
		phData.cidtype_id = {};
		phData.cid_number = {};
		//姓名
		phData.name.onOff = phContaine.phNameContainer({
			selector: '#ph_name',
			value: $('#ph_name input').val(),
			mark: true,
			subTip: true
		});

		if(!phData.name.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
		TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
			//证件类型
		if($('#ph_cid option:selected').val() == "") {
			layer.msg('请选择证件类型');
			phContaine.checkTipInfor('#ph_cid', '请选择证件类型', false, true);
			phContaine.subScrollTop($('#ph_cid'));
			return false;
		}

		//证件号码
		phData.cid_number.onOff = phContaine.phCidNumContainer({
			selector: '#ph_cid',
			value: $('#ph_cid input').val(),
			mark: true,
			subTip: true,
			minAge: appminAge,
			maxAge: appmaxAge,
			type: true
		});
		if(!phData.cid_number.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
		TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
			//性别 非身份证
		if($('#applicant-gender').is(':visible')) {
			phData.gender = {};
			phData.birthday = {};
			if($('#applicant-gender input:checked').val() == "") {
				layer.msg('请选择投保人性别');
				phContaine.checkTipInfor('#applicant-gender', '请选择投保人性别', false, true);
				phContaine.subScrollTop($('#applicant-gender'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '性别', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}

		//出生日期
		if($('#applicant-birth').is(':visible')) {
			phData.birthday = {};
			phData.birthday.onOff = phContaine.phBirthdayContainer({
				selector: '#applicant-birth',
				value: $('#applicant-birth .birth').val(),
				mark: true,
				subTip: true
			});
			if(!phData.birthday.onOff) {
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		phData.mobile = {};
		phData.mobile.onOff = phContaine.phPhone({
			selector: '#ph_mobile',
			value: $('#ph_mobile input').val(),
			mark: true,
			subTip: true
		});
		if(!phData.mobile.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '手机号码', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
		phData.email = {};
		phData.email.onOff = phContaine.phEmail({
			selector: '#ph_email',
			value: $('#ph_email input').val(),
			mark: true,
			subTip: true
		});
		if(!phData.email.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '邮箱', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
		if($('#ph_area').is(':visible')) {
			phData.phArea = {};
			if($('#ph_area').find("#provinceId").val() == "" || $('#ph_area').find("#cityId").val() == "") {
				layer.msg('请选择地区');
				phContaine.checkTipInfor('#ph_area', '请选择地区', false, true);
				phContaine.subScrollTop($('#ph_area'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '投保地区', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		//职业
		if($('#applicant-profess').is(':visible')) {
			phData.industry = {};
			if($('#applicant-profess option:selected').val() == '' || $('#applicant-profess option:selected').val() == "0") {
				layer.msg('请选择投保人的职业');
				phContaine.checkTipInfor('#applicant-profess', '请选择职业', false, true);
				phContaine.subScrollTop($('#applicant-profess'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '职业分类', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		//房屋地址
		if($("#ph_houseAddress").is(":visible")) {
			phData.houseAddress = {};
			if($('#ph_houseAddress input').val() == '') {
				layer.msg('请填写房屋地址');
				phContaine.checkTipInfor('#ph_houseAddress', '请填写房屋地址', false, true);
				phContaine.subScrollTop($('#ph_houseAddress'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			});
		}
		//房屋地区
		if($("#ph_houseArea").is(":visible")) {
			phData.houseArea = {};
			if($('#ph_houseArea input#houseprovince').attr("data-code") == '' || $('#ph_houseArea input#houseCity').attr("data-code") == '' || $('#ph_houseArea input#houseArea').attr("data-code") == '') {
				layer.msg('请选择房屋地区');
				phContaine.checkTipInfor('#ph_houseArea', '请选择房屋地区', false, true);
				phContaine.subScrollTop($('#ph_houseArea'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '房屋地区', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			});
		}
		return true;
	},
	"phInsuredContainer": function() {
		var insData = {};
		insData.name = {};
		insData.cidtype_id = {};
		insData.cid_number = {};
		//姓名
		if(document.getElementById("ins_name")) {
			insData.name.onOff = phContaine.phNameContainer({
				selector: '#ins_name',
				value: $('#ins_name input').val(),
				mark: true,
				subTip: true
			});

			if(!insData.name.onOff) {
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		if(document.getElementById("ins_cid")) {
			//证件类型
			if($('#ins_cid option:selected').val() == "") {
				layer.msg('请选择证件类型');
				phContaine.checkTipInfor('#insh_cid', '请选择证件类型', false, true);
				phContaine.subScrollTop($('#insh_cid'));
				return false;
			}
			if($('#ins_cid input.main_inpt6').is(":visible")) {
				//证件号码
				insData.cid_number.onOff = phContaine.phCidNumContainer({
					selector: '#ins_cid',
					value: $('#ins_cid input.main_inpt6').val(),
					mark: true,
					subTip: true,
					minAge: insminAge,
					maxAge: insmaxAge,
					type: false
				});
				if(!insData.cid_number.onOff) {
					return false;
				}
			}
			if($('#ins_cid input.ipt-birth').is(":visible")) {
				//证件号码
				insData.cid_number.onBirth = phContaine.insBirthdayContainer({
					selector: '#ins_cid',
					value: $('#ins_cid input.ipt-birth').val(),
					mark: true,
					subTip: true,
					age: productAge
				});
				if(!insData.cid_number.onBirth) {
					return false;
				}
			}

			_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}

		//出生日期
		if($('#ins_birth').is(':visible')) {
			insData.birthday = {};
			insData.birthday.onOff = phContaine.phBirthdayContainer({
				selector: '#ins_birth',
				value: $('#ins_birth input').val(),
				mark: true,
				subTip: true
			});
			if(!insData.birthday.onOff) {
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		//性别 非身份证
		if($('#ins_gender').is(':visible')) {
			insData.gender = {};
			insData.birthday = {};
			if($('#ins_gender input:checked').val() == "") {
				layer.msg('请选择投保人性别');
				phContaine.checkTipInfor('#ins_gender', '请选择投保人性别', false, true);
				phContaine.subScrollTop($('#ins_gender'));
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '性别', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		return true;
	},
	phBeneficiaryContainer: function() {
		var benData = {};
		benData.name = {};
		benData.cidtype_id = {};
		benData.cid_number = {};
		/*需要修改的地方*/
		//姓名
		//		if (document.getElementById("")) {
		//			benData.name.onOff = phContaine.phNameContainer({
		//				selector: '',
		//				value: $(' input').val(),
		//				mark: true,
		//				subTip: true
		//			});
		//
		//			if (!benData.name.onOff) {
		//				return false;
		//			}
		//			_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
		//			TKTrack({
		//				event: '投保流程_填写投保信息',
		//				subType: '财险_' + productName
		//			})
		//		}
		//		if (document.getElementById()) {
		//			//证件类型
		//			if ($('#insh_cid option:selected').val() == "") {
		//				layer.msg('请选择证件类型');
		//				phContaine.checkTipInfor('#insh_cid', '请选择证件类型', false, true);
		//				phContaine.subScrollTop($('#insh_cid'));
		//				return false;
		//			}
		//			if ($('#ins_cid input.main_inpt6').is(":visible")) {
		//				//证件号码
		//				benData.cid_number.onOff = phContaine.phCidNumContainer({
		//					selector: '#ins_cid',
		//					value: $('#ins_cid input.main_inpt6').val(),
		//					mark: true,
		//					subTip: true,
		//					minAge: insminAge,
		//					maxAge: insmaxAge,
		//					type: false
		//				});
		//				if (!benData.cid_number.onOff) {
		//					return false;
		//				}
		//			}
		//			if ($('#ins_cid input.ipt-birth').is(":visible")) {
		//				//证件号码
		//				benData.cid_number.onBirth = phContaine.insBirthdayContainer({
		//					selector: '#ins_cid',
		//					value: $('#ins_cid input.ipt-birth').val(),
		//					mark: true,
		//					subTip: true,
		//					age: productAge
		//				});
		//				if (!benData.cid_number.onBirth) {
		//					return false;
		//				}
		//			}
		//
		//			_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
		//			TKTrack({
		//				event: '投保流程_填写投保信息',
		//				subType: '财险_' + productName
		//			})
		//		}

		//出生日期
		//		if ($('#ins_birth').is(':visible')) {
		//			benData.birthday = {};
		//			benData.birthday.onOff = phContaine.phBirthdayContainer({
		//				selector: '#ins_birth',
		//				value: $('#ins_birth input').val(),
		//				mark: true,
		//				subTip: true
		//			});
		//			if (!benData.birthday.onOff) {
		//				return false;
		//			}
		//			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
		//			TKTrack({
		//				event: '投保流程_填写投保信息',
		//				subType: '财险_' + productName
		//			})
		//		}
		//性别 非身份证
		//		if ($('#ins_gender').is(':visible')) {
		//			benData.gender = {};
		//			benData.birthday = {};
		//			if ($('#ins_gender input:checked').val() == "") {
		//				layer.msg('请选择投保人性别');
		//				phContaine.checkTipInfor('#ins_gender', '请选择投保人性别', false, true);
		//				phContaine.subScrollTop($('#ins_gender'));
		//				return false;
		//			}
		//			_smq.push(['custom', '投保流程_填写投保信息', '性别', '财险_' + productName, '']);
		//			TKTrack({
		//				event: '投保流程_填写投保信息',
		//				subType: '财险_' + productName
		//			})
		//		}
		/*需要修改的地方*/

		return true;
	}
}

if($.isEmptyObject(getMessage)) {
	var plan = "";
	var applicationId = "";
	var productId = "";
	var channelId = "";
	var applicationToken = "";
	var openId = "";
	var memberId = "";
	var memberToken = "";
	var duties = "";
	var planPrice = ""; //产品价格
	var planScore = ""; //产品积分

	var iApplicantBitrth = ""; //投保人出生日期
	var iApplicantGender = ""; //投保人性别
	var iApplicantPhone = ""; //投保人手机号码
	var iApplicantArea = ""; //投保地区

	var iApplicantProvince = ""; //投保地区 省代码
	var iApplicantArea = ""; //投保地区  市代码

	var iInsuredRelationship = ""; //投保人与被报人关系

	var iInsuredGender = ""; //被保人性别
	var iInsuredBirth = ""; //被保人出生日期

} else {
	var plan = getMessage.plan;
	var applicationId = getMessage.applicationId;
	var productId = getMessage.productId;
	var channelId = getMessage.channelId;
	var applicationToken = getMessage.applicationToken;
	var openId = getMessage.openId;
	var memberId = getMessage.memberId;
	var memberToken = getMessage.memberToken;
	var planPrice = getMessage.details.planPrice; //产品价格
	var planScore = getMessage.details.planScore; //产品积分

	var iApplicantBitrth = getMessage.details.applicantInfo.applicantBirth; //投保人出生日期
	var iApplicantGender = getMessage.details.applicantInfo.applicantGender; //投保人性别
	var iApplicantPhone = getMessage.details.applicantInfo.applicantPhone; //投保人手机号码
	var iApplicantArea = getMessage.details.applicantInfo.applicantArea; //投保地区

	var iApplicantProvince = getMessage.details.applicantProvince; //投保地区 省代码
	var iApplicantArea = getMessage.details.applicantCity; //投保地区  市代码

	var iInsuredRelationship = getMessage.details.insuredInfo[0].insuredRelationship; //投保人与被报人关系

	var iInsuredGender = getMessage.details.insuredInfo[0].insuredGender; //被保人性别
	var iInsuredBirth = getMessage.details.insuredInfo[0].insuredBirth; //被保人出生日期

	$.each(getMessage.details.planLiabilityList, function(key, value) {

		dutiesArr.push(value.liabilityId);
	})
	duties = dutiesArr.join(",").replace(/，/g, ",");
}
storage.set("duties", duties);

//returnMessage ->保存用户填写信息接口
var returnMessage = {
	"platform": platform,
	"channelId": channelId,
	"productId": productId,
	"applicationId": applicationId,
	"seedId": "",
	"applicationToken": applicationToken,
	"openId": openId,
	"memberId": memberId,
	"memberToken": memberToken,
	"processHandler": "property",
	"checkCode": "1234",
	"inputs": {
		//新加
		"policyInfo": {
			"policyType": "保单类型", //[0电子、1纸质、2挂号、3自取、5电子+纸质]
			"postFee": "邮递费"
		},

		"applicantInfo": {},
		"insuredInfo": [],

		//新加
		"recommendInfo": {
			"recommendMobile": "推荐人手机号码"
		},
		"invoiceInfo": {
			"invoiceHeader": " 抬头",
			"invoiceReceiverName": " 收件人姓名",
			"invoiceReceiverMobile": " 收件人手机号",
			"invoiceReceiverAddress": " 收件人地址",
			"invoiceReceiverZipCode": " 收件人邮编"
		}

		//新加
	}
};

var insuredMessage = {}; // 被保人信息     {}->存于returnMessage.inputs.insureInfo
insuredMessage.beneficiaryInfo = []; //受益人信息  []->存于returnMessage.inputs.insureInfo

//returnObj->存入sessionStorage
var returnObj = {
	"platform": platform,
	"channelId": channelId,
	"productId": productId,
	"applicationId": applicationId,
	"seedId": "",
	"applicationToken": applicationToken,
	"openId": openId,
	"memberId": memberId,
	"memberToken": memberToken,
	"processHandler": "property",
	"checkCode": ""
};
if(!$.isEmptyObject(getMessage)) {
	returnObj.details = getMessage.details;
}

//排序
function Sorts(a, b) {
	return a.code - b.code;
}
//查找相同
function findSame(arr, item) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == item) {
			return true;
		}
		return false;
	}
}
/**************************投保人操作  start**************************/
//投保人证件类型
function initApplicantIdType(arr) {
	var str = "";
	var cardIdArr = [];
	var applicantInfo = arr.applicantInfo;
	$.each(applicantInfo, function(index, item) {
		if(item["componentId"] == "tkApplicantIdType") {
			if($.isEmptyObject(item["tkOptions"])) {
				str += '<option  value="01">居民身份证</option>'
			} else {
				$.each(item["tkOptions"], function(key, value) {
					var item = {
						"code": value, //证件代码
						"value": key //证件名称
					};
					cardIdArr.push(item);
				});
				cardIdArr.sort(Sorts);
				$.each(cardIdArr, function(key, value) {
					str += '<option  value="' + value.code + '">' + value.value + '</option>';
				});
				str += '<option  value="99">其他</option>';
			}
		}
	})
	$("#applicantcard-type").append(str);
}
//投保人投保地区
var areaPc = {
	"person_area": function(prm) {
		var $el = $(prm.el);
		var $provinceId = $(prm.provinceId); //省代码
		var $cityId = $(prm.cityId); //城市代码

		var areaJson = prm.areaJson;
		var province = areaJson.province;
		var city = areaJson.city;

		var provinceArr = [];
		var cityArr = [];

		var str = "";
		var cityStr = "";
		var descArr;

		$.each(province, function(key, value) {
			var item = {
				"code": value, //地区代码
				"value": key //地区名称
			};
			provinceArr.push(item);
		});
		provinceArr.sort(Sorts);

		$.each(provinceArr, function(key, value) {
			str += '<li data-id="' + value.code + '">' + value.value + '</li>';
		})

		var wrap = '<div class="area-wrap cleafix" id="area-wrap">' +
			'<div class="area-province"><ul>' + str + '</ul></div>' +
			'<div class="area-city"><ul class="ul"></ul></div>' +
			'</div>';

		$el.unbind().bind({
			click: function(e) {
				$("body").append(wrap);
				var offset = $(this).offset();
				var iptH = $(this).height();

				$("#area-wrap").css({
					left: offset.left + "px",
					top: (offset.top + iptH) + "px"
				});

				$(".area-province").find("li").click(function(e) {
					var provinceCode = $(this).attr("data-id");
					var provinceTxt = $(this).text();
					if($provinceId.val() != "") {
						$provinceId.val("")
					}
					if($cityId.val() != "") {
						$cityId.val("");
					}

					$provinceId.val(provinceCode);
					$provinceId.attr("data-txt", provinceTxt);

					cityStr = "";
					$.each(city["C" + provinceCode], function(key, value) {
						cityStr += '<li data-id="' + key + '">' + value + '</li>';
					})
					if($provinceId.val() == "" || $cityId.val() == "") {
						$('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");

					} else {
						$('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");

					}
					$(".ul").html(cityStr);
					$el.val(provinceTxt);
					e.stopPropagation();
				});

				$(".area-city").on("click", "li", function(e) {
					var cityId = $(this).attr("data-id");
					var cityTxt = $(this).text();
					var iptTxt = $("#provinceId").attr("data-txt");

					$cityId.val(cityId);
					$cityId.attr("data-id", cityTxt);
					$el.val(iptTxt + " " + cityTxt);

					if($provinceId.val() == "" || $cityId.val() == "") {
						$('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");
					} else {
						$('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
					}
					$("#area-wrap").remove();
					e.stopPropagation();
				});
				e.stopPropagation();
			},
			blur: function() {
				//$("#area-wrap").remove();
			}
		});
		$("body").click(function(e) {
			$("#area-wrap").remove();
			e.stopPropagation();
		});
	}
}

function initApplicantArea(arr) {
	if(iApplicantArea != "" && iApplicantProvince != "" && iApplicantArea != "") {
		$("#applicant-area").val(iApplicantArea);
		$("#provinceId").val(iApplicantProvince);
		$("#cityId").val(iApplicantArea);
		return;
	}

	var applicantInfo = arr.applicantInfo;
	var opt;
	$.each(applicantInfo, function(index, item) {
		if(item["componentId"] == "tkApplicantArea") {
			opt = item.tkOptions;
		}
	})

	if($.isEmptyObject(opt)) {
		return;
	}

	var prm = {
		el: '#applicant-area',
		areaJson: opt,
		provinceId: "#provinceId",
		cityId: "#cityId"
	}
	areaPc.person_area(prm)
}
//投保人职业
var professPc = {
	"person_profession": function(prm) {
		var $el = $(prm.el)
		var $worktypeid = $(prm.worktypeid);

		var professionJson = prm.professJson;
		var value = professionJson.value;
		var desc = professionJson.desc;
		var desc_type = professionJson.desc_type;

		var str = "";
		var professArr = [];
		var descArr;

		var descWrap = '<div class="profess-desc" id="profess-desc">' +
			'<h3 class="title"></h3>' +
			'<ul class="ul"></ul>' +
			'<div class="btn_area clearfix">' +
			'<input type="button" value="我已知悉" class="btn_work_l"/>' +
			'<input type="button" value="取消" class="btn_work_r"/>' +
			'</div>' +
			'</div>';

		str += '<option value="0" selected="selected">请选择</option>';
		$.each(value, function(index, key) {
			var item = {
				"code": key,
				"value": index
			}
			professArr.push(item);

		});

		professArr.sort(Sorts);
		$.each(professArr, function(key, vlaue) {
			str += '<option value="' + vlaue.code + '">' + vlaue.value + '</option>';
		})
		$el.html(str);

		function initProfess(code) {
			var strJson = {
				"strTitle": "",
				"strDesc": ""
			}
			if(desc_type[code] == "不限") {
				strJson.strTitle = "所有职业都能投保";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
			} else if(desc_type[code] == "不含") {
				strJson.strTitle = "以下职业不在本产品保障范围中，请您知悉 ";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
				$("body").append(descWrap);

			} else if(desc_type[code] == "仅限") {
				strJson.strTitle = "本产品保障范围仅包含以下职业，请您知悉";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
				$("body").append(descWrap);

			}

			descArr = desc[code].split("、");
			for(var i = 0; i < descArr.length; i++) {
				strJson.strDesc += '<li>' + descArr[i] + '</li>';
			}

			return strJson;
		}
		$el.unbind().bind("change", function() {
			var codeProess = $(this).find("option:selected").val();
			if(codeProess == "" || codeProess == "0") {
				$('#applicant-profess').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择职业");
			} else {
				$('#applicant-profess').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
				var str = initProfess(codeProess);
				$worktypeid.val(codeProess);
				$(".title").html(str.strTitle);
				$(".ul").html(str.strDesc);
			}
			$(".btn_work_l").click(function() {
				$("#profess-desc").remove();
			});
			$(".btn_work_r").click(function() {
				$("#profess-desc").remove();
				$el.find("option[value='0']").attr("selected", true);
				$('#applicant-profess').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择职业");
			});
		});
	}
}

function initApplicantProfess(arr) {
	var applicantInfo = arr.applicantInfo;
	var opt;
	$.each(applicantInfo, function(index, item) {
		if(item["componentId"] == "tkApplicantProfession") {
			opt = item.tkOptions;
		}
	})

	if($.isEmptyObject(opt)) {
		return;
	}

	var prm = {
		el: '#pal_profession',
		professJson: opt,
		worktypeid: '#ph_worktype'

	}

	professPc.person_profession(prm)
}
//投保人显示描述信息
function initApplicantTxt(arr) {
	var applicantInfo = arr.applicantInfo;
	$.each(applicantInfo, function(index, item) {
		if(item["componentId"] == "tkApplicantName") {
			$("#ph_name .tip").text(item['tkTip']);
		}
		if(item["componentId"] == "tkApplicantIdType") {
			$("#ph_cid .tip").text(item['tkTip']);
		}
		if(item["componentId"] == "tkApplicantEmail") {
			$("#ph_email .tip").text(item['tkTip']);
		}
		if(item["componentId"] == "tkApplicantArea") {
			$("#ph_area .tip").text(item['tkTip']);
		}
	});
}
//健康告知
function initHealth(arr) {
	var applicantInfo = arr.applicantInfo;
	$.each(applicantInfo, function(index, item) {
		if(item['componentId'] == "tkApplicantHealth") {
			var isHealth = item.tkDefaultValue;
			$("#applicantHealth").attr("isHealth", isHealth);
		}
	})
}
//房屋地区
function houseArea(opt) {

	var el = $(opt.el)
	var str = '';

	var json = opt.json.cities;

	function fnAjax(id, obj) {
		var w = $("#house-wrap").width();
		$.ajax({
			type: "get",
			url: insure + "/hera_insure/api/insure/v2/element/city?parentCode=" + id,
			dataType: "json",
			async: false,
			success: function(msg) {
				if(msg.code == "0") {
					var city = msg.data.cities;
					var cityStr = '';

					$.each(city, function(indexs, items) {
						cityStr += '<li data-id="' + items.cityCode + '">' + items.cityName + '</li>';
					});
					$(obj).show();

					$(obj).find(".ul").append(cityStr);
					$("#house-wrap").width(w + 200);
				}
			},
			error: function(msg) {
				alert("房屋地区");
			}
		});
	}

	$.each(json, function(index, item) {
		str += '<li data-id="' + item.cityCode + '">' + item.cityName + '</li>';
	});

	var wrap = '<div class="house-wrap cleafix" id="house-wrap">' +
		'<div class="house-province"><ul>' + str + '</ul></div>' +
		'<div class="house-city"><ul class="ul"></ul></div>' +
		'<div class="house-area"><ul class="ul"></ul></div>' +
		'</div>';
	el.unbind().bind({
		"click": function(e) {
			e.stopPropagation();
			$("body").append(wrap);
			var offset = $(this).offset();
			var iptH = $(this).height();

			$("#house-wrap").css({
				left: offset.left + "px",
				top: (offset.top + iptH) + "px"
			});
			$(".house-province").on("click", "li", function(e) {
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();

				if($(".house-city .ul li").length >= 1) {
					$(".house-city .ul").empty();
				}
				if($(".house-area .ul li").length >= 1) {
					$(".house-area .ul").empty();
				}
				fnAjax(code, $(".house-city"));
				$("#houseprovince").attr("data-code", code);
				$("#houseprovince").attr("data-txt", txt);
			});
			$(".house-city").on("click", "li", function(e) {
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();

				fnAjax(code, $(".house-area"));

				$("#houseCity").attr("data-code", code);
				$("#houseCity").attr("data-txt", txt);
			});
			$(".house-area").on("click", "li", function() {
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();

				fnAjax(code, $(".house-area"));

				$("#houseArea").attr("data-code", code);
				$("#houseArea").attr("data-txt", txt);

				el.val($("#houseprovince").attr("data-txt") + " " + $("#houseCity").attr("data-txt") + " " + $("#houseArea").attr("data-txt"));

				if($("#houseprovince").attr("data-id") == "" || $("#houseCity").attr("data-id") == "" || $("#houseArea").attr("data-id") == "") {
					$('#ph_houseArea').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");
				} else {
					$('#ph_houseArea').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
				}
				$("#house-wrap").remove();

			});

		},
		"blur": function() {

		}
	});
	$("body").click(function(e) {
		$("#house-wrap").remove();
		e.stopPropagation();
	});
}

function initHouseArea() {
	$.ajax({
		type: "get",
		url: insure + "/hera_insure/api/insure/v2/element/city?parentCode=100000",
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				if(!$.isEmptyObject(msg.data)) {
					var prm = {
						el: '#ph_houseArea input.main_inpt4',
						json: msg.data,
						provinceId: "#houseprovince",
						cityId: "#houseCity",
						areaId: "#houseArea"
					}
					houseArea(prm);
				}
			}
		},
		error: function(msg) {
			alert("房屋地区");
		}
	});

}
//我与房屋的关系
function initApplicantHouseRelationship(arr) {
	var applicantInfo = arr.applicantInfo;
	var str = "";
	var optArr = [];
	$.each(applicantInfo, function(index, item) {
		if(item['componentId'] == "tkHouseRelationship") {
			var tkOptions = item.tkOptions;
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				optArr.push(option);
			});
			optArr.sort(Sorts);
			$.each(optArr, function(indexs, items) {
				str += '<option  value="' + items.code + '">' + items.txt + '</option>';
			});
		}
	})

	$("#ph_houseRelationship select").append(str);
}
/**************************投保人操作  end**************************/
/**************************被保人操作  start**************************/
//被保人与投保人关系 
function initInsuredRelationship(arr) {
	//session 有关系	
	var insuredInfo = arr.insuredInfo;
	var optArr = [];
	var str = ""
	$.each(insuredInfo, function(index, item) {
		if(item.componentId == "tkInsuredRelationship") {
			var tkOptions = item.tkOptions;
			//本人：01 这种格式
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				optArr.push(option);
			})
			if(optArr.length == 1) {
				$("#ins_relationship").attr("data-relationship", optArr[0].code);
				$("#ins_relationship").find("select").remove();
				$("#ins_relationship").append('<span class="relationshipTxt" id="relationshipTxt"></span>');

				$(".relationshipTxt").text(optArr[0].txt);
				$(".relationshipTxt").css({
					"color": "#333",
					"line-height": "28px",
					"padding-left": "6px"
				});
			} else {
				$.each(optArr, function(index, item) {
					str += '<option  value="' + item.code + '">' + item.txt + '</option>';
				});
				$("#ins_relationship select").append(str);
			}

		}
	});
}
//被保人证件类型
function initInsuredIdType(arr) {
	var insuredInfo = arr.insuredInfo;
	var str = "";
	var cardIdArr = [];
	$.each(insuredInfo, function(index, item) {
		if(item["componentId"] == "tkInsuredIdType") {
			if($.isEmptyObject(item["tkOptions"])) {
				str += '<option  value="01">居民身份证</option>'
			} else {
				$.each(item["tkOptions"], function(key, value) {
					var item = {
						"code": value, //证件代码
						"value": key //证件名称
					};
					cardIdArr.push(item);
				});
				cardIdArr.sort(Sorts);
				$.each(cardIdArr, function(key, value) {
					str += '<option  value="' + value.code + '">' + value.value + '</option>'
				});
			}
			$("#ins_cid select").append(str);

		}
	});
}
/**************************被保人操作  end**************************/

/**************************受益人操作  start**************************/
//受益人 
function initBeneficiaryPerson(arr) {
	var beneficiaryInfo = arr.beneficiaryInfo;
	var str = "";
	var benPersonArr = [];
	$.each(beneficiaryInfo, function(index, item) {
		if(item.componentId == "tkBeneficiaryPerson") {
			var tkOptions = item.tkOptions;
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				benPersonArr.push(option);
			})
			if(benPersonArr.length == 1) {
				$("#ben_person").attr("data-person", benPersonArr[0].code);
				$("#ben_person").find("select").remove();
				$("#ben_person").append('<span class="personTxt" id="personTxt"></span>');

				$(".personTxt").text(benPersonArr[0].txt);
				$(".personTxt").css({
					"color": "#333",
					"line-height": "28px",
					"padding-left": "6px"
				});
				$("#ben_legal").show();
				$("#ben_desig").hide();

			} else {
				$.each(benPersonArr, function(index, item) {
					str += '<option  value="' + item.code + '">' + item.txt + '</option>';
				});
				$("#ben_person select").append(str);
			}
		}
	})
}
//受益人与投保人关系
function initBeneficiaryRelationship(arr) {
	var beneficiaryInfo = arr.beneficiaryInfo;
	var optArr = [];
	var str = ""
	$.each(beneficiaryInfo, function(index, item) {
		if(item.componentId == "tkBeneficiaryRelationship") {
			var tkOptions = item.tkOptions;
			//本人：01 这种格式
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				optArr.push(option);
			});

			$.each(optArr, function(index, item) {
				str += '<option  value="' + item.code + '">' + item.txt + '</option>';
			});
			$("#ben_part .ben_list:first .ben_relation select").append(str);

		}
	});
}

//受益人证件类型
function initeneficiaryIdType(arr) {
	var beneficiaryInfo = arr.beneficiaryInfo;
	var str = "";
	var cardIdArr = [];
	$.each(beneficiaryInfo, function(index, item) {
		if(item["componentId"] == "tkBeneficiaryId") {
			if($.isEmptyObject(item["tkOptions"])) {
				str += '<option  value="01">居民身份证</option>'
			} else {
				$.each(item["tkOptions"], function(key, value) {
					var item = {
						"code": value, //证件代码
						"value": key //证件名称
					};
					cardIdArr.push(item);
				});
				cardIdArr.sort(Sorts);
				$.each(cardIdArr, function(key, value) {
					str += '<option  value="' + value.code + '">' + value.value + '</option>'
				});
			}
			$("#ben_part .ben_list:first .ben_cid select").append(str);
		}
	});
}

/**************************受益人操作  end**************************/

/**************************发票  start**************************/
function initInvoice(arr) {
	var str = "";
	var opt;
	$.each(arr, function(index, item) {
		if(item.componentId == "tkOtherInvoice") {
			opt = item.tkOptions;
		}
	});
	$("#inv_infor .rowElem").each(function(index, el) {
		var $el = $(el);
		if($el.attr("componentId")) {

		}
	});

}

/**************************发票  end**************************/
/**************************投保声明  start**************************/
function formatNotice(str) {
	var p = "";
	$(str).each(function(inndex, el) {
		var text = $(el).text();
		p += "<p>" + text + "</p>"
	});
	return p;
}

function initNotice() {
	var html = "";
	$.ajax({
		type: "get",
		url: insure + "/hera_insure2/api/insure/v2/productMetadata/" + productId + "/" + metadata_platform + "/notice",
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				if(msg.data.pcNotice) {
					html = $.base64.atob(msg.data.pcNotice, true);
					html = formatNotice(html);
					$("#agreeStatement").find(".p_group").html(html);
				}
			}
		},
		error: function() {}
	})
}
/**************************投保声明  end**************************/
/**************************会员信息带出  start**************************/
function iniMemberInfo() {
	$.ajax({
		type: "get",
		url: insure + "/hera_insure2/api/insure/v2/customer/info?memberId=" + memberId + "&memberToken=" + memberToken,
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				if(!$.isEmptyObject(msg.data)) {
					initMemberInputs(msg.data)
				}
			}
		},
		error: function(msg) {
			alert("网络异常1");
		}
	});
}

function initMemberInputs(msg) {
	if($("#ph_name").is(':visible')) {
		$("#ph_name input").val(msg.name).attr("disabled", true);
	}
	if($("#ph_cid").is(':visible')) {
		var opt = $("#ph_cid select option");
		var len = $("#ph_cid select option").length;
		for(var i = 0; i < len; i++) {
			if(opt.eq(i).val() == msg.cidType) {
				$("#ph_cid select").val(msg.cidType).attr("disabled", true);
				$("#ph_cid input").val(msg.cid).attr("disabled", true);
				break;
			} else {
				$("#ph_cid select").text("其他").attr("disabled", true);
				$("#ph_cid input").val(msg.cid).attr("disabled", true);
			}
		}
	}
	if($("#applicant-birth").is(":visible")) {
		$("#applicant-birth input.tkApplicantBirth").val(msg.birthday);
	}
	if($("#applicant-gender").is(":visible")) {
		$("#applicant-gender input[value='" + msg.gender + "']").attr({
			"checked": "checked",
			"disabled": "disabled"
		});
	}
	// if ($("#ph_mobile").is(':visible')) {
	// 	$("#ph_mobile input[value='"+msg.gender+"']").attr({"checked":"checked","disabled":true});
	// }
	if($("#ph_email").is(":visible")) {
		$("#ph_email input").val(msg.email);
	}
	if($("#ph_area").is(":visible")) {
		$("#ph_area").val(msg.address);
	}

}
/**************************会员信息带出  end**************************/
//拼接html
function cerateInputs() {
	$.ajax({
		type: "get",
		url: insure + "/hera_insure2/api/insure/v2/productMetadata/html/" + productId + "/pc/inputs",
		dataType: "json",
		async: false,
		success: function(msg) {
			if(!msg) {
				return;
			}

			if(msg.tkApplicantInfo) {
				var str = msg.tkApplicantInfo.replace(/\\/, "");
				$(".applicant").append(str);
			}

			if(msg.tkInsuredInfo) {
				var str = msg.tkInsuredInfo.replace(/\\/, "");
				$(".insured").append(str);
			}

			if(msg.tkBeneficiaryInfo) {
				var str = msg.tkBeneficiaryInfo.replace(/\\/, "");
				$(str).each(function(index, el) {
					var $el = $(el);
					if($el.attr("componentId")=="tkBeneficiaryPerson"){
						$(".beneficiary #pal_perInfo").after($el);
					}else{
						$("#ben_part .ben_list:first .del").after($el);
					}	
				})
			}

			if(msg.tkOtherInfo) {
				var str = msg.tkOtherInfo.replace(/\\/, "");
				$(str).each(function(index, el) {
					var $el = $(el);
					if($el.attr("componentId") == "tkOtherPerson") {
						$("#recommend").append($el);
					} else if($el.attr("componentId") == "tkOtherInvoice") {
						$("#invoice").append($el);
					}
				});
			}

			initInputs();

			if(member == "true") {
				iniMemberInfo();
			}

		},
		error: function(msg) {
			alert("网络异常");
		}
	});
}
//请求源数据
function initInputs() {
	$.ajax({
		type: "get",
		url: insure + "/hera_insure2/api/insure/v2/productMetadata/" + productId + "/" + metadata_platform + "/inputs?duties=" + duties,
		dataType: "json",
		async: false,
		success: function(msg) {
			if(msg.code == "0") {
				var pcInput = msg.data.pcInputs;
				var applicantInfo = pcInput[0], //投保人
					insuredInfo = pcInput[1], //被保人
					BeneficiaryInfo = pcInput[2],
					OtherInfo = pcInput[3];

				initApplicantIdType(applicantInfo);
				initApplicantArea(applicantInfo);
				initApplicantProfess(applicantInfo);
				initApplicantTxt(applicantInfo);
				initHealth(applicantInfo);

				initApplicantHouseRelationship(applicantInfo);

				initInsuredRelationship(insuredInfo);
				initInsuredIdType(insuredInfo);

				initBeneficiaryPerson(BeneficiaryInfo);
				initBeneficiaryRelationship(BeneficiaryInfo);
				initeneficiaryIdType(BeneficiaryInfo);

				if(!$.isEmptyObject(OtherInfo)) {
					initInvoice(OtherInfo);
				}

			} else {
				alert(msg.message);
			}
		},
		error: function(msg) {
			alert("网络异常");
		}
	});
}

$(function() {

	cerateInputs();
	//房屋地址
	if(document.getElementById("ph_houseArea")) {
		initHouseArea();
	}

	//initNotice();

	var time = new Date();
	/**************************页面一些文字显示 start**************************/

	// if (planPrice.toString().indexOf(".") == -1) {
	// 	planPrice = planPrice + ".00";
	// }

	$("#planPrice").text(planPrice);
	$(".insurd_tit").text(productName);
	$("#orderProductName").text(productName);
	$("#planDesc").text(productDesc);
	$("#planName").text(planName);
	$("#productAge").text(productAge);
	$("#orderPrice").text(planPrice);
	$("#orderTotlePrice").text(planPrice);
	$("#agreeStatement .p_group p").eq(0).hide();

	

	
	
	
	/**************************页面一些文字显示 end**************************/

	/**************************投保人 start**************************/
	
	
	
	
	
	//投保人证件  身份证 01
	var iApplicantIdType = $("#applicantcard-type").find("option:selected").val();
	if(iApplicantIdType == "01") {
		$("#applicant-gender").hide();
		$("#applicant-birth").hide();

		$("#ph_homeland").hide();
		$("#ph_idExpireDate").hide();
	} else {
		$("#ph_homeland").hide();

		$("#applicant-gender").show();
		$("#applicant-birth").show();

		if(iInsuredRelationship == "01") {
			$("#ph_homeland").show();
		} else {
			$("#ph_homeland").hide();
		}
		$("#ph_idExpireDate").show();
	}
	$("#applicantcard-type").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		if(value == "01") {
			$("#applicant-gender").hide();
			$("#applicant-birth").hide();

			$("#ph_homeland").hide();
			$("#ph_idExpireDate").hide();
		} else {
			$("#applicant-gender").show();
			$("#applicant-birth").show();

			if(iInsuredRelationship == "01") {
				$("#ph_homeland").show();
			} else {
				$("#ph_homeland").hide();
			}
			$("#ph_idExpireDate").show();
		}

		if($("#ph_cid").find(".label2").hasClass("tipOk")) {
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipOk")
		}
		if($("#ph_cid").find(".label2").hasClass("tipError")) {
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipError")
		}
		$('#ph_cid input').val('');

	});
	//投保人 国籍
	if(document.getElementById("ph_homeland")) {
		$('#ph_homeland .titleTip').attr('title', '国籍');
		$('#ph_list_container').css({
			left: 5,
			top: 33,
			width: 328
		});
		var input = $('#ph_homeland').find(".nationality-suggest-input");
		var list = $('#ph_homeland').find(".nationality-suggest-list");
		input.val('');
		new nationality({
			input: input,
			list: list
		});
	}

	//投保人证件有效期
	if(document.getElementById("ph_idExpireDate")) {
		var iExpire = $("#ph_idExpireDate input[name='idExpire']:checked").attr("data-type");
		if(iExpire == "long") {
			$("#ph_idExpireDate input[type='text']").hide();
		} else {
			$("#ph_idExpireDate input[type='text']").show();
		}

		$("#ph_idExpireDate input[name='idExpire']").click(function() {
			if($(this).attr("data-type" == "short")) {
				$("#ph_idExpireDate input[type='text']").show();
			} else {
				$("#ph_idExpireDate input[type='text']").hide();
			}
		});
		$("#ph_idExpireDate input[type='text']").focus(function() {
			WdatePicker({
				dateFmt: 'yyyy-MM-dd'
			});
		});
	}
	//投保人出生日期
	if(parseInt(appmaxAge) >= 200) {
		var minY = "1900";
		var maxY = time.getFullYear() - parseInt(appminAge);
	} else {
		var minY = time.getFullYear() - appmaxAge - 1;
		var maxY = time.getFullYear() - parseInt(appminAge);

	}
	if(iApplicantBitrth!=""){
		$("#applicant-birth input[type=text]").val(iApplicantBitrth);
		return ;
	}else{
		$("#applicant-birth").find("input").focus(function() {
			WdatePicker({
				minDate: minY + '-%M-{%d+2}',
				maxDate: maxY + '-%M-%d',
				dateFmt: 'yyyy-MM-dd'
			})
		});
	}
	//投保人性别
	if(iApplicantGender!=""){
		$("#applicant-gender input[value="+iApplicantGender+"]").attr("checked",'checked');
	}
	//投保人手机号码
	if(iApplicantPhone!=""){
		$("#ph_mobile input").val(iApplicantPhone);
		
	}
	//实时校验投保人名字
	$("#ph_name input").blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_name',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phNameContainer(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});

	//实时校验投保人邮箱
	$("#ph_email input").blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_email',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phEmail(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '邮箱', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});

	//实时校验投保人电话
	$('#ph_mobile input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_mobile',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phPhone(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '手机号码', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});

	var isRelationship = $("#ins_relationship").attr("data-relationship");
	if(isRelationship == "01" || $("#ins_relationship select option:selected").val() == "01") {
		if(productAge != "") {
			var ageArr = productAge.split("-");
			appminAge = parseInt(ageArr[0]); //被保人最小年龄
			appmaxAge = parseInt(ageArr[1]); //被保人最大年龄	
		}
	}

	//实时校验投保人证件号码
	$('#ph_cid input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_cid',
			value: value,
			mark: true,
			subTip: false,
			minAge: appminAge,
			maxAge: appmaxAge,
			type: true
		}
		phContaine.phCidNumContainer(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})

	});

	
	
	
	
	
	//实时校验投保人出生日期
	$('#applicant-birth input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#applicant-birth',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phBirthdayContainer(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});

	//投保人的房屋地址
	$("#ph_houseAddress input").blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_houseAddress',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phHouseAddressContainer(opt)
		_smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});

	//投保人国籍实时校验
	if(document.getElementById("ph_homeland")) {
		$('#ph_homeland input').blur(function() {
			var value = $('#ph_homeland input').val();
			if(value) {
				$('#ph_homeland .tip').text('√').removeClass('tipError').addClass('tipOk');
			} else {
				$('#ph_homeland .tip').text('请填写国籍').removeClass('tipOk').addClass('tipError');
			}
			_smq.push(['custom', '投保流程_填写投保信息', '国籍', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			});
		});
	}

	/**************************投保人 end**************************/

	/**************************被保人 start**************************/

	//被保人同投保人被保人隐藏
	var insuredRelationshipJson = {
		"01": "本人",
		"40": "儿女"
	}
	console.log(iInsuredRelationship);
	if(iInsuredRelationship){
		$("#ins_relationship").attr("data-relationship", iInsuredRelationship);
		$("#ins_relationship").find("select").remove();
		$("#ins_relationship").append('<span class="relationshipTxt" id="relationshipTxt"></span>');
		$(".relationshipTxt").text(insuredRelationshipJson[iInsuredRelationship]);
		$(".relationshipTxt").css({
			"color": "#333",
			"line-height": "28px",
			"padding-left": "6px"
		})
		if(iInsuredRelationship=="01"){
			$(".insured").hide();
		}else{
			$(".insured").show();
		}
	}

	var iInsuredRelation = $("#ins_relationship").attr("data-relationship");

	if(iInsuredRelation == "01" || $("#ins_relationship select option:selected").val() == "01") {
		$("#ins_name").hide();
		$("#ins_cid").hide();

		$("#ins_homeland").hide();
		$("#ins_gender").hide();
		$("#ins_birth").hide();
	} else {
		$("#ins_name").show();
		$("#ins_cid").show();

		$("#ins_homeland").show();
		$("#ins_gender").hide();
		$("#ins_birth").hide();
	}

	$("#ins_relationship select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		$("#ins_relationship").attr("data-relationship", value);
		if(value == "01") {
			$("#ins_name").hide();
			$("#ins_cid").hide();
			$("#ins_gender").hide();
			$("#ins_birth").hide();

		} else {
			$("#ins_name").show();
			$("#ins_cid").show();
			$("#ins_gender").hide();
			$("#ins_birth").hide();
		}

	});

	var iInsuredIdType = $("#ins_cid select").find("option:selected").val();
	if(iInsuredIdType == "01") {
		$("#ins_birth").hide();
		$("#ins_gender").hide();
		//被保人国籍
		$("#ins_homeland").hide();
	} else {
		$("#ins_birth").show();
		$("#ins_gender").show();
		//被保人国籍
		$("#ins_homeland").show();
	}

	$("#ins_cid select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();

		if(value == "01") {
			$("#ins_birth").hide();
			$("#ins_gender").hide();

			$('#ins_cid input.main_inpt6').show();
			$('#ins_cid input.ipt-birth').hide();
			$("#ins_cid").find(".label2").html("");
			//被保人国籍
			$("#ins_homeland").hide();

		} else if(value == "99") {
			$("#ins_birth").hide();
			$("#ins_gender").show();

			$('#ins_cid input.main_inpt6').hide();
			$('#ins_cid input.ipt-birth').show();
			$("#ins_cid").find(".label2").html("仅支持0-2周岁（含）儿童使用出生日期作为证件号码");
			//被保人国籍
			$("#ins_homeland").show();

		} else {
			$("#ins_birth").show();
			$("#ins_gender").show();

			$('#ins_cid input.ipt-birth').hide();
			$('#ins_cid input.main_inpt6').show();
			$("#ins_cid").find(".label2").html("");
			//被保人国籍
			$("#ins_homeland").show();
		}
		$("#ins_cid input").val("");
		if($("#ins_cid").find(".label2").hasClass("tipOk")) {
			$("#ins_cid").find(".label2").text("");
			$("#ins_cid").find(".label2").removeClass("tipOk")
		}
		if($("#ins_cid").find(".label2").hasClass("tipError")) {
			$("#ins_cid").find(".label2").text("");
			$("#ins_cid").find(".label2").removeClass("tipError")
		}
	});

	//实时被保人校验名字
	if(document.getElementById("ins_name")) {
		$("#ins_name input").blur(function() {
			var value = $(this).val();
			var opt = {
				selector: '#ins_name',
				value: value,
				mark: true,
				subTip: false
			}
			phContaine.phNameContainer(opt);
			_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		});
	}
	//实时校验被保人证件类型
	if(document.getElementById("ins_cid")) {
		//证件类型为 出生日期
		$('#ins_cid input.ipt-birth').on("focus", function() {
			WdatePicker({
				minDate: '{%y-2}-%M-{%d+2}',
				maxDate: '%y-%M-{%d-30}',
				dateFmt: 'yyyy-MM-dd'
			})
		})
		$('#ins_cid input.ipt-birth').on("blur", function() {
			var value = $(this).val();
			var opt = {
				selector: '#ins_cid',
				value: value,
				mark: true,
				subTip: false,
				age: productAge
			}
			phContaine.insBirthdayContainer(opt);
			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		});

		//实时校验被保人证件号码
		$('#ins_cid input.main_inpt6').blur(function() {
			var value = $(this).val();
			var opt = {
				selector: '#ins_cid',
				value: value,
				mark: true,
				subTip: false,
				minAge: insminAge,
				maxAge: insmaxAge,
				type: false
			}
			phContaine.phCidNumContainer(opt);
			_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		});
	}
	if(document.getElementById("ins_birth")) {
		if(insminAge.indexOf("天") != -1) {
			var day = -parseInt(insminAge);
			var insmaxY = time.getFullYear();
			var insminY = time.getFullYear() - parseInt(insmaxAge);
		} else {
			var day = 1;
			var insminY = time.getFullYear() - parseInt(insmaxAge) - 1;
			var insMaxY = time.getFullYear() - parseInt(insminAge);
		}
		$("#ins_birth input").focus(function() {
			WdatePicker({
				minDate: insminY + '-%M-{%d+2}',
				maxDate: insMaxY + '-%M-{%d+' + (day) + '}',
				dateFmt: 'yyyy-MM-dd'
			})
		});
		//实时校验被保人出生日期
		$('#ins_birth input').blur(function() {
			var value = $(this).val();
			var opt = {
				selector: '#ins_birth',
				value: value,
				mark: true,
				subTip: false
			}
			phContaine.phBirthdayContainer(opt);
			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_全年综合意外保障'
			})
		});
	}
	if(document.getElementById("ins_gender")) {
		//实时校验性别
		var raIpt = $("#ins_gender").find("input[type='radio']:checked");
		if(raIpt.length < 1) {
			phContaine.checkTipInfor('#applicant-gender', '请选择投保人性别', true, false);
		}
	}

	/**************************被保人 end**************************/

	/*************************受益人 start**************************/
	//受益人指定法定
	var iBePerson = $("#ben_person").attr("data-person");

	;
	if(iBePerson == "01" || $("#ben_person select option:selected").val() == "01") {
		$("#ben-legal").show();
		$("#ben_desig").hide();
	} else {
		$("#ben-legal").hide();
		$("#ben_desig").show();
	}
	$("#ben_person select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		$("#ben_person").attr("data-person", value);
		if(value == "01") {
			$("#ben_legal").show();
			$("#ben_desig").hide();
		} else {
			$("#ben_legal").hide();
			$("#ben_desig").show();
		}
	});
	//受益人校验
	//	if($(".ben_desig").is(":hidden")){
	//		return ;
	//	}
	//展开受益人->校验
	//与投保人关系
	$(".ben_part").on("blur", ".ben_relation select", function() {
		var _this = $(this);
		if(_this.val() == "") {

		}
	});
	//受益姓名实时校验
	$(".ben_part").on("blur", ".ben_name input", function() {
		var value = $(this).val();
		var opt = {
			selector: '.ben_name',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phNameContainer(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		});
	});

	//受益证件类型实时校验
	$(".ben_part").on("blur", ".ben_cid select", function() {

	});
	//受益证件号码实时校验
	$(".ben_part").on("blur", ".ben_cid input", function() {

	});
	//受益人收益比例你实时校验
	$(".ben_part").on("blur", ".ben_percent input", function() {
		if($(this).val() == "") {
			$(this).val("0");
		}
	});

	//relationArr->受益人与投保人关系
	var relationArr = []
		//展开受益人->保存
	$("#ben_part").on("click", ".save", function() {
		var benList = $(this).closest(".ben_list");
		var index = $(".ben_list").index(benList);
		var perInfoList = $(".per_info").eq(index);

		//名字，关系文字，关系编码，证件类型编码，证件类型文字，证件号码，收益比例
		var benName = benList.find(".ben_name input").val();

		var benRelationTxt = benList.find(".ben_relation select option:selected").text();
		var benRelationValue = benList.find(".ben_relation select option:selected").val();

		var benCidTypeValue = benList.find(".ben_cid select option:selected").val();
		var benCidTypeTxt = benList.find(".ben_cid select option:selected").text();
		var benCid = benList.find(".ben_cid input").val();
		var benPercent = benList.find(".ben_percent input").val();
		var percentSumSave = 0;
		var PercnetObj = $(".ben_percent input");

		PercnetObj.each(function(index, el) {
			var value = $(el).val();
			percentSumSave += parseFloat(value);
		});

		relationArr.push(benRelationValue);
		if(!findSame(relationArr, benRelationValue)) {
			alert("受益人与投保人关系不能重复");
			return;
		}

		if(percentSumSave > 100) {
			alert("受益人受益比例之和应等于100%+save");
			return;
		}

		perInfoList.find(".perInfoName").text(benName);
		perInfoList.find(".perInfoTypeValue").val(benCidTypeValue);
		perInfoList.find(".perInfoTypeTxt").text(benCidTypeTxt);
		perInfoList.find(".perInfoCid").text(benCid);

		perInfoList.find(".perInfoPercent input").val(benPercent);

		perInfoList.find(".perInfoRelation").text(benRelationTxt).attr("data-type", benCidTypeValue);

		benList.attr("data-type", benName);
		perInfoList.attr("data-type", benName);

		benList.hide();
		perInfoList.show();
		if(perInfoList.hasClass("per_info_hov")) {
			perInfoList.removeClass("per_info_hov");
			perInfoList.find(".per_info_tool").hide();
		}
	});

	//展开受益人->取消
	$("#ben_part").on("click", ".cancel", function() {
		var benList = $(this).closest(".ben_list");
		var index = $(".ben_list").index(benList);
		$(this).closest(".ben_list").remove();
		$(".per_info").eq(index).remove();
	});
	//展开受益人->删除
	$("#ben_part").on("click", ".del", function() {
		var benList = $(this).closest(".ben_list");
		var index = $(".ben_list").index(benList);
		$(this).closest(".ben_list").remove();
		$(".per_info").eq(index).remove();
	});

	//折叠受益人->点击名字显示信息 但是不能编辑
	$("#ben_part").on("click", ".perInfoName", function() {
		var parent = $(this).closest(".per_info");
		//名字 关系 证件类型 证件类型 证件号码
		var iDataType = parent.attr("data-type");
		var name = parent.find(".perInfoName").text();
		var relation = parent.find(".perInfoRelation").text();
		var cidType = parent.find(".perInfoTypeTxt").text();
		var cid = parent.find(".perInfoCid").text();

		$("#ben_part").find(".ben_list").each(function(index, el) {
			if($(el).attr("data-type") == iDataType) {
				if(!$(el).is(":visible")) {

					parent.addClass("per_info_hov");
					parent.siblings(".per_info").removeClass("per_info_hov");
					parent.find(".per_info_tool").show();

					$(el).show().css("border", "none");
					$(el).find(".ben_percent").hide();

					$(el).find(".del").hide();

					$(el).find(".ben_relation select").hide();
					$(el).find(".ben_relation .formRelation").show().html(relation);

					$(el).find(".ben_name input.main_inpt4").hide();
					$(el).find(".ben_name .formName").show().html(name);

					$(el).find(".ben_cid select").hide();
					$(el).find(".ben_cid input.main_inpt6").hide();
					$(el).find(".ben_cid label.label2").hide();

					$(el).find(".ben_cid .formCid").show().html(cidType + "/" + cid);
				} else {
					parent.removeClass("per_info_hov");
					parent.find(".per_info_tool").hide();

					$(el).hide();
				}

			}
		});
	});
	//折叠受益人比例->同时修改展开受益人的比例
	$(".per_info").on("change", ".perInfoPercent input", function() {
		var value = $(this).val();
		var parent = $(this).closest(".per_info");
		var iDataType = parent.attr("data-type");
		$(".ben_part").find(".ben_list").each(function(index, el) {
			if($(el).attr("data-type") == iDataType) {
				$(el).find(".ben_percent input").val(value);
			}
		})
	});

	//折叠受益人->修改
	$("#ben_part").on("click", ".modify_a", function() {
		//名字，证件类型编码，证件类型文字，证件号码，收益比例，data-type;
		var parent = $(this).closest(".per_info");
		var iDataType = parent.attr("data-type");
		var iName = parent.find(".perInfoName").text();
		var iTypeValue = parent.find(".perInfoTypeValue").val();
		var iTypeTxt = parent.find(".perInfoTypeTxt").text();
		var iCid = parent.find("perInfoCid").text();
		var iPercent;

		$("#ben_part").find(".ben_list ").each(function(index, el) {
			if($(el).attr("data-type") == iDataType) {

				$(el).show().css("border", "none");

				$(el).find(".ben_percent").hide();

				$(el).find(".ben_relation select").show();
				$(el).find(".ben_relation .formRelation").hide();

				$(el).find(".ben_name input.main_inpt4").show();
				$(el).find(".ben_name .formName").hide();

				$(el).find(".ben_cid select").show();
				$(el).find(".ben_cid input.main_inpt6").show();
				$(el).find(".ben_cid label.label2").show();

				$(el).find(".ben_cid .formCid").hide();
			}
		});
	});
	//折叠受益人->删除
	$("#ben_part").on("click", ".del_a", function() {
		var perInfo = $(this).closest(".per_info");
		var index = $(".ben_list").index(perInfo);
		$(this).closest(".per_info").remove();
		$(".ben_list").eq(index).remove();
	});

	//受益人->添加受益人
	$("#addBtn").click(function() {
		var benStr = $(".ben_list").eq(0).clone(); //带有文本框
		var perInfoStr = $(".per_info").eq(0).clone(); //折叠行

		benStr.find(".formRelation").hide();
		benStr.find(".formName").hide();
		benStr.find(".formCid").hide();

		benStr.find(".del").show();
		benStr.find(".ben_relation select").show();
		benStr.find(".ben_name input").show();
		benStr.find(".ben_cid select").show();
		benStr.find(".ben_cid input").show();
		benStr.find(".ben_percent").show();

		var percentSumAdd = 0;
		var PercnetObj = $(".ben_percent input");
		PercnetObj.each(function(index, el) {
			var value = $(el).val();
			percentSumAdd += parseFloat(value);
		});
		console.log(percentSumAdd);
		if(percentSumAdd > 100) {
			alert("受益人受益比例之和应等于100%+add");
			return;
		}

		$(benStr).attr("data-type", "");
		$(benStr).find("input[data-class='txt']").val("");
		$(benStr).show();

		$(perInfoStr).attr("data-type", "");
		$(perInfoStr).find(".perInfoName").text("");
		$(perInfoStr).find(".perInfoTypeValue").val("");
		$(perInfoStr).find(".perInfoTypeTxt").text("");
		$(perInfoStr).find(".perInfoCid").text("");
		$(perInfoStr).hide();

		$("#ben_part").append(perInfoStr);
		$("#ben_part").append(benStr);

	});

	/*************************受益人 end**************************/

	/*************************发票 start**************************/
	$("#inv_chk").click(function() {
		if($(this).prop("checked")) {
			$("#inv_infor").show();
		} else {
			$("#inv_infor").hide();
		}
	});
	/*************************发票 end**************************/

	/*************************推荐人 start**************************/
	//recommedJson->用于实时校验推荐人手机号
	var recommedJson = {

	}
	$("#recommTit").click(function() {
		if($("#integral").is(":visible")) {
			$("#integral").hide();
		} else {
			$("#integral").show();
		}
	});

	$("#integral input[type='text']").blur(function() {
		//校验手机号是否正确
	});

	$("#integral .btn_use").click(function() {
		//校验手机号是否为合法的推荐人
		$.ajax({
			url: "",
			type: '',
			dataType: 'json',
			data: "",
			async: false,
			success: function(msg) {

			},
			error: function() {}
		});
	});

	/*************************推荐人 end**************************/

	/**************************声明提示框  start**************************/
	$("#agrChk").click(function() {
		if($(this).prop("checked")) {
			$("#statement").click();
		}
	})
	$("#statement").click(function(e) {
		$("#agreeStatementMask").show();
		$("#agreeStatement").show();
		e.stopPropagation();
	});
	$("#agreeStatement_close").click(function(e) {
		$("#agreeStatementMask").hide();
		$("#agreeStatement").hide();
		$("#agrChk").prop("checked", true);
		e.stopPropagation();
	});
	$("#statement-close").click(function(e) {
		$("#agreeStatementMask").hide();
		$("#agreeStatement").hide();
		e.stopPropagation();
	});

	/**************************声明提示框  end**************************/

	/**************************提交校验数据 start**************************/

	$("#check-form").on("click", function() {
		/**************************投保人 start**************************/
		var isApplicantPass = submitCheck.phApplicantContainer();
		if(!isApplicantPass) {
			return false;
		}

		//投保人 姓名
		returnMessage.inputs.applicantInfo.applicantName = $("#ph_name").find("input").val();
		//投保人 电话
		returnMessage.inputs.applicantInfo.applicantPhone = $("#ph_mobile").find("input").val();
		//投保人邮箱
		returnMessage.inputs.applicantInfo.applicantEmail = $("#ph_email").find("input").val();
		//投保人 证件类型
		returnMessage.inputs.applicantInfo.applicantIdType = $("#applicantcard-type").find("option:selected").val();
		//投保人证件号码
		returnMessage.inputs.applicantInfo.applicantId = $("#ph_cid").find("input").val();
		//性别 01:身份证
		if($("#applicantcard-type").val() == "01") {
			returnMessage.inputs.applicantInfo.applicantGender = "";
			returnMessage.inputs.applicantInfo.applicantBirth = "";
		} else {
			returnMessage.inputs.applicantInfo.applicantGender = $(".applicant-gender:checked").val();
			returnMessage.inputs.applicantInfo.applicantBirth = $("#applicant-birth").find(".birth").val();
		}
		//投保人 投保地区  省  城市  代码
		if(document.getElementById("ph_area")) {

			returnMessage.inputs.applicantInfo.applicantProvince = $("#provinceId").val();
			returnMessage.inputs.applicantInfo.applicantCity = $("#cityId").val();
		} else {

			returnMessage.inputs.applicantInfo.applicantProvince = "";
			returnMessage.inputs.applicantInfo.applicantCity = "";
		}

		//投保人 投保通讯地址   代码
		if(document.getElementById("ph_address")) {
			returnMessage.inputs.applicantInfo.applicantAddress = $("#ph_address input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantAddress = "";
		}
		//投保人  职业类别
		if(document.getElementById("applicant-profess")) {
			returnMessage.inputs.applicantInfo.applicantProfession = $("#ph_worktype").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantProfession = "";
		}

		//投保人房屋地区 省 市 区县代码  省 市 区县名称 
		if(document.getElementById("ph_houseArea")) {
			returnMessage.inputs.applicantInfo.applicantProvince = $("#houseprovince").attr("data-code");
			returnMessage.inputs.applicantInfo.applicantCity = $("#houseCity").attr("data-code");
			returnMessage.inputs.applicantInfo.applicantCounty = $("#houseArea").attr("data-code");

			returnMessage.inputs.applicantInfo.applicantProvinceName = $("#houseprovince").attr("data-txt");
			returnMessage.inputs.applicantInfo.applicantCityName = $("#houseCity").attr("data-txt");
			returnMessage.inputs.applicantInfo.applicantCountyName = $("#houseArea").attr("data-txt");

		} else {
			returnMessage.inputs.applicantInfo.applicantProvince = "";
			returnMessage.inputs.applicantInfo.applicantCity = "";
			returnMessage.inputs.applicantInfo.applicantCounty = "";

			returnMessage.inputs.applicantInfo.applicantProvinceName = "";
			returnMessage.inputs.applicantInfo.applicantCityName = "";
			returnMessage.inputs.applicantInfo.applicantCountyName = ""
		}
		//房屋详细地址
		if(document.getElementById("ph_houseAddress")) {
			returnMessage.inputs.applicantInfo.applicantAddressDetails = $("#ph_houseAddress input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantAddressDetails = "";
		}
		//我与房屋的关系
		if(document.getElementById("ph_houseRelationship")) {
			returnMessage.inputs.applicantInfo.applicantRelationHouse = $("#ph_houseRelationship select option:selected").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantRelationHouse = "";
		}

		/*新加  
		 邮编
		 国籍
		 证件有效期
		 */
		if(document.getElementById("ph_zipCode")) {
			returnMessage.inputs.applicantInfo.applicantZipCode = $("#ph_zipCode input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantZipCode = "";
		}
		if(document.getElementById("ph_homeland")) {
			returnMessage.inputs.applicantInfo.applicantHomeland = $("#ph_homeland input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantHomeland = "";
		}
		if(document.getElementById("ph_idExpireDate")) {
			returnMessage.inputs.applicantInfo.applicantIdExpireDate = $("#ph_idExpireDate input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantIdExpireDate = "";
		}

		/**************************投保人 end**************************/
		/**************************被保人 start**************************/
		//校验被保人
		//		var isInsPass = submitCheck.phInsuredContainer();
		//		if (!isInsPass) {
		//			return false;
		//		}
		var insRelationship = $("#ins_relationship").attr("data-relationship");

		if(insRelationship == "01" || ("#ins_relationship select option:selected").val() == "01" || iInsuredRelationship == "01") {
			insuredMessage.insuredRelationship = "01"; //代表本人
			insuredMessage.insuredName = returnMessage.inputs.applicantInfo.applicantName;
			insuredMessage.insuredIdType = returnMessage.inputs.applicantInfo.applicantIdType;
			insuredMessage.insuredId = returnMessage.inputs.applicantInfo.applicantId;
			insuredMessage.insuredGender = returnMessage.inputs.applicantInfo.applicantGender;
			insuredMessage.insuredBirth = returnMessage.inputs.applicantInfo.applicantBirth;
			insuredMessage.insuredPhone = returnMessage.inputs.applicantInfo.applicantPhone;
			insuredMessage.insuredEmail = returnMessage.inputs.applicantInfo.applicantEmail;
			/*
			 新加
			"insuredProfession": "职业类别",
			"insuredAddress": "通讯地址",
			“insuredZipCode”:”邮编”,
			“insuredHight”:”身高”,
			“insuredWeight”:”体重”,
			“insuredHomeland”:”国籍”,
			“insuredIdExpireDate”,”证件有效期，默认长期有效：2099-12-30”
			 
			  */
			insuredMessage.insuredProfession = returnMessage.inputs.applicantInfo.applicantProfession;
			insuredMessage.insuredAddress = returnMessage.inputs.applicantInfo.applicantAddress;
			insuredMessage.insuredZipCode = returnMessage.inputs.applicantInfo.applicantZipCode;

			//insuredMessage.insuredHight = returnMessage.inputs.applicantInfo.     ;
			//insuredMessage.insuredWeight = returnMessage.inputs.applicantInfo.     ;

			insuredMessage.insuredHomeland = returnMessage.inputs.applicantInfo.applicantHomeland;
			insuredMessage.insuredIdExpireDate = returnMessage.inputs.applicantInfo.applicantIdExpireDate;

		} else {

			insuredMessage.insuredRelationship = insRelationship;
			insuredMessage.insuredName = $("#ins_name input").val();
			insuredMessage.insuredIdType = $("#ins_cid select").find("option:selected").val();

			//被保人性别
			if($("#ins_cid select").find("option:selected").val() == "01") {
				insuredMessage.insuredId = $("#ins_cid input.main_inpt6").val();
				insuredMessage.insuredGender = "";
				insuredMessage.insuredBirth = "";
			} else if($("#ins_cid select").find("option:selected").val() == "99") {
				insuredMessage.insuredId = $("#ins_cid input.ipt-birth").val();
				insuredMessage.insuredGender = $("#ins_gender input:checked").val();;
				insuredMessage.insuredBirth = $("#ins_cid input.ipt-birth").val();
			} else {
				insuredMessage.insuredId = $("#ins_cid input").val();
				insuredMessage.insuredGender = $("#ins_gender input:checked").val();
				insuredMessage.insuredBirth = $("#ins_birth input").val();
			}

			insuredMessage.insuredPhone = "";
			insuredMessage.insuredEmail = "";

			/*
			 新加
			"insuredProfession": "职业类别",
			"insuredAddress": "通讯地址",
			“insuredZipCode”:”邮编”,
			“insuredHight”:”身高”,
			“insuredWeight”:”体重”,
			“insuredHomeland”:”国籍”,
			“insuredIdExpireDate”,”证件有效期，默认长期有效：2099-12-30”
			 
			  */
			insuredMessage.insuredProfession = "";
			insuredMessage.insuredAddress = "";
			insuredMessage.insuredZipCode = "";
			insuredMessage.insuredHight = "";
			insuredMessage.insuredWeight = "";

			insuredMessage.insuredHomeland = "";
			insuredMessage.insuredIdExpireDate = "";

		}

		/**************************被保人 end**************************/
		/**************************受益人 start**************************/
		//校验受益人
		//		var isBenPass = submitCheck.phBeneficiaryContainer();
		//		if (!isBenPass) {
		//			return false;
		//		}
		var benPerson = $("#ben_person").attr("data-person");
		if(benPerson == "01" || $("#ben_person select option:selected").val() == "01") {
			//法定
			insuredMessage.beneficiaryLegal = "true";
		} else {
			//指定
			insuredMessage.beneficiaryLegal = "false";
			console.log($(".per_info").length);
			$(".per_info").each(function(index, el) {
				var el = $(el);
				var beneficiaryOption = {
					"beneficiaryRelationship": el.find(".perInfoRelation").val(),
					"beneficiaryName": el.find(".perInfoName").text(),
					"beneficiaryIdType": el.find(".perInfoTypeValue").val(),
					"beneficiaryId": el.find(".perInfoCid").text(),
					"beneficiaryGender": "",
					"beneficiaryBirth": "",
					"beneficiaryPercent": el.find(".perInfoPercent input").attr("data-type")
				};
				insuredMessage.beneficiaryInfo.push(beneficiaryOption);
			});
		}
		returnMessage.inputs.insuredInfo.push(insuredMessage);

		returnObj.inputs = returnMessage.inputs;

		/**************************受益人 end**************************/

		/**************************保单类型 start**************************/

		//保单类型  0电子、1纸质、2挂号、3自取、5电子+纸质   邮费
		if($("#invoice").is(":visible")) {
			if($("#tkOtherPolicy input").is(":checked")) {
				returnMessage.inputs.policyInfo.policyType = "1";
				returnMessage.inputs.policyInfo.postFee = "";
			} else {
				returnMessage.inputs.policyInfo.policyType = "0";
				returnMessage.inputs.policyInfo.postFee = "";
			}
		} else {
			returnMessage.inputs.policyInfo.policyType = "";
			returnMessage.inputs.policyInfo.postFee = "";
		}
		/**************************保单类型 end**************************/

		/**************************发票 start**************************/

		//发票   抬头  收件人姓名  收件人手机号 收件人地址  收件人邮编
		if($("#invoice").is(":visible")) {
			returnMessage.inputs.invoiceInfo.invoiceHeader = ""; //$("#tkInvoiceTitle inut").val();
			returnMessage.inputs.invoiceInfo.invoiceReceiverName = ""; //$("#tkInvoiceName input").val();
			returnMessage.inputs.invoiceInfo.invoiceReceiverMobile = ""; //$("#tkInvoicePhone input").val();  
			returnMessage.inputs.invoiceInfo.invoiceReceiverAddress = "";
			returnMessage.inputs.invoiceInfo.invoiceReceiverZipCode = "";

		} else {
			returnMessage.inputs.invoiceInfo.invoiceHeader = "";
			returnMessage.inputs.invoiceInfo.invoiceReceiverName = "";
			returnMessage.inputs.invoiceInfo.invoiceReceiverMobile = "";
			returnMessage.inputs.invoiceInfo.invoiceReceiverAddress = "";
			returnMessage.inputs.invoiceInfo.invoiceReceiverZipCode = "";
		}

		/**************************发票 end**************************/
		/**************************推荐人 start**************************/
		if($("#recommend").is(":visible")) {
			returnMessage.inputs.recommendInfo.recommendMobile = $("#recommend input.int_inp3").val();
		} else {
			returnMessage.inputs.recommendInfo.recommendMobile = "";
		}
		/**************************推荐人 end**************************/

		storage.set("email", $("#ph_email").find("input").val());
		storage.set("returnMessage", JSON.stringify(returnObj));
		//已经阅读必选
		if(!$("#agrChk").is(":checked")) {
			layer.msg('您好，请阅读并同意投保声明');
			return;
		}
		var isHealth = $("#applicantHealth").attr("isHealth");
		//保存填写信息  
		console.log(returnMessage)
		$.ajax({
			type: "post",
			url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/inputs",
			data: JSON.stringify(returnMessage),
			dataType: "json",
			success: function(msg) {
				//0 无健康告知
				if(msg.code == "0") {
					if(isHealth == "true") {
						window.location.href = "healthinfo.html";
					} else {
						var proposalNo = msg.data.proposalNo;
						var proposalToken = msg.data.proposalToken;
						storage.set("proposalNo", JSON.stringify(proposalNo));
						storage.set("proposalToken", JSON.stringify(proposalToken));
						window.location.href = "pay.html";
					}
				}
			},
			error: function(msg) {
				alert("网络异常");

			}
		});
	});
	/**************************提交校验数据 end**************************/
});