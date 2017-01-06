var metadata_scope = "pc";
var platform = "pc";
var metadata_platform = "pc";
var duties = "";
var dutiesArr = [];
//兼容ie6的sessionStorage
var storage = new Storage('session');
var getMessage = storage.get("returnMessage");
var productName = storage.get("productName") || ""; //产品名称
var productDesc = storage.get("productDesc") || ""; //产品描述
var productAge = storage.get("productAge") || ""; //产品投保年龄
var planName = storage.get("planName") || ""; //套餐
var appminAge = storage.get("minAge") || 18; //投保人最小年龄
var appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
var productAgeArr = productAge.split("-");
var insminAge = productAgeArr[0]; //被保人最小年龄
var insmaxAge = productAgeArr[1]; //被保人最大年龄
var member=storage.get("member")||"";
var flagType=storage.get("flagType"); //根据选项判断被保人
var _smq = _smq || [];

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
	var duties = "";
	var planPrice = ""; //产品价格
	var planScore = ""; //产品积分

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
	if(getMessage.details.planLiabilityList){
		$.each(getMessage.details.planLiabilityList, function(key, value) {
			dutiesArr.push(value.liabilityId);
		})
		duties = dutiesArr.join(",").replace(/，/g, ",");
	}
	

}
storage.set("duties", duties);
//returnMessage ->保存用户填写信息接口
var returnMessage = {
	"platform": platform,
	"applicationId": applicationId,
	"applicationToken": applicationToken,
	"openId": "",
	"memberId": memberId,
	"memberToken": memberToken,
	"checkCode": "",
	"inputs": {
		"applicantInfo": {},
		"insuredInfo": []
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
if (!$.isEmptyObject(getMessage)) {
	returnObj.details = getMessage.details;
}




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

		if (!phData.name.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
		TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
			//证件类型
		if ($('#ph_cid option:selected').val() == "") {
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
		if (!phData.cid_number.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
		TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
			//性别 非身份证
		if ($('#applicant-gender').is(':visible')) {
			phData.gender = {};
			phData.birthday = {};
			if ($('#applicant-gender input:checked').val() == "") {
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
		if ($('#applicant-birth').is(':visible')) {
			isRelationship = $("#ins_relationship").attr("data-relationship");
			if (isRelationship == "01") {
				if (productAge != "") {
					var ageArr = productAge.split("-");
					appminAge = parseInt(ageArr[0]); //被保人最小年龄
					appmaxAge = parseInt(ageArr[1]); //被保人最大年龄	
				}
			}else{
				appminAge = storage.get("minAge") || 18; //投保人最小年龄
				appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
			}



			phData.birthday = {};
			phData.birthday.onOff = phContaine.phBirthday({
				selector: '#applicant-birth',
				value: $('#applicant-birth .birth').val(),
				mark: true,
				subTip: true,
				min:appminAge,
				max:appmaxAge
			});
			
			if (!phData.birthday.onOff) {
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
		if (!phData.mobile.onOff) {
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

		if (!phData.email.onOff) {
			return false;
		}
		_smq.push(['custom', '投保流程_填写投保信息', '邮箱', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
		if ($('#ph_area').is(':visible')) {
			phData.phArea = {};
			if ($('#ph_area').find("#provinceId").val() == "" || $('#ph_area').find("#cityId").val() == "") {
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
		if ($('#applicant-profess').is(':visible')) {
			phData.industry = {};
			if ($('#applicant-profess option:selected').val() == '' || $('#applicant-profess option:selected').val() == "0") {
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
		if($("#ph_houseAddress").is(":visible")){
			phData.houseAddress = {};
			if ($('#ph_houseAddress input').val() == '' ) {
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
		if($("#ph_houseArea").is(":visible")){
			phData.houseArea = {};
			if ($('#ph_houseArea input#houseprovince').attr("data-code") == '' ||$('#ph_houseArea input#houseCity').attr("data-code") == '' ||$('#ph_houseArea input#houseArea').attr("data-code") == '' ) {
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
		if ($("#ins_name").is(":visible")) {
			insData.name.onOff = phContaine.phNameContainer({
				selector: '#ins_name',
				value: $('#ins_name input').val(),
				mark: true,
				subTip: true
			});

			if (!insData.name.onOff) {
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		if ($("#ins_cid").is(":visible")) {
			//证件类型
			if ($('#ins_cid option:selected').val() == "") {
				layer.msg('请选择证件类型');
				phContaine.checkTipInfor('#insh_cid', '请选择证件类型', false, true);
				phContaine.subScrollTop($('#insh_cid'));
				return false;
			}
			if ($('#ins_cid input.main_inpt6').is(":visible")) {
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
				if (!insData.cid_number.onOff) {
					return false;
				}
			}
			if ($('#ins_cid input.ipt-birth').is(":visible")) {
				//证件号码
				insData.cid_number.onBirth = phContaine.insBirthdayContainer({
					selector: '#ins_cid',
					value: $('#ins_cid input.ipt-birth').val(),
					mark: true,
					subTip: true,
					age: productAge
				});
				if (!insData.cid_number.onBirth) {
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
		if ($('#ins_birth').is(':visible')) {
			insData.birthday = {};
			insData.birthday.onOff = phContaine.phBirthdayContainer({
				selector: '#ins_birth',
				value: $('#ins_birth input').val(),
				mark: true,
				subTip: true
			});
			if (!insData.birthday.onOff) {
				return false;
			}
			_smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
			TKTrack({
				event: '投保流程_填写投保信息',
				subType: '财险_' + productName
			})
		}
		//性别 非身份证
		if ($('#ins_gender').is(':visible')) {
			insData.gender = {};
			insData.birthday = {};
			if ($('#ins_gender input:checked').val() == "") {
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
	}
}
















//排序
function Sorts(a, b) {
	return a.code - b.code;
}
/**************************投保人操作  start**************************/
//投保人证件类型
function initApplicantIdType(arr) {
	var str = "";
	var cardIdArr = [];
	var applicantInfo = arr.applicantInfo;
	$.each(applicantInfo, function(index, item) {
		if (item["componentId"] == "tkApplicantIdType") {
			if ($.isEmptyObject(item["tkOptions"])) {
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
			str += '<li data-province="' + value.code + '">' + value.value + '</li>';
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
					var provinceCode = $(this).attr("data-province");
					var provinceTxt = $(this).text();
					if ($("#provinceId").val() != "") {
						$("#provinceId").val("")
					}
					if ($("#cityId").val() != "") {
						$("#cityId").val("");
					}

					$("#provinceId").val(provinceCode);
					$("#provinceId").attr("data-provice", provinceTxt);

					cityStr = "";
					$.each(city["C" + provinceCode], function(key, value) {
						cityStr += '<li data-city="' + key + '">' + value + '</li>';
					})
					if ($("#provinceId").val() == "" || $("#cityId").val() == "") {
						$('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");

					} else {
						$('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");

					}
					$(".ul").html(cityStr);
					$el.val(provinceTxt);
					e.stopPropagation();
				});

				$(".area-city").on("click", "li", function(e) {
					var cityId = $(this).attr("data-city");
					var cityTxt = $(this).text();
					var iptTxt = $("#provinceId").attr("data-provice");

					$("#cityId").val(cityId);
					$("#cityId").attr("data-city", cityTxt);
					$el.val(iptTxt + " " + cityTxt);

					if ($("#provinceId").val() == "" || $("#cityId").val() == "") {
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
	var applicantInfo = arr.applicantInfo;
	var opt;
	$.each(applicantInfo, function(index, item) {
		if (item["componentId"] == "tkApplicantArea") {
			opt = item.tkOptions;
		}
	})

	if ($.isEmptyObject(opt)) {
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
			if(codeProess == "" || codeProess== "0") {
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
		if (item["componentId"] == "tkApplicantProfession") {
			opt = item.tkOptions;
		}
	})

	if ($.isEmptyObject(opt)) {
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
		if (item["componentId"] == "tkApplicantName") {
			$("#ph_name .tip").text(item['tkTip']);
		}
		if (item["componentId"] == "tkApplicantIdType") {
			$("#ph_cid .tip").text(item['tkTip']);
		}
		if (item["componentId"] == "tkApplicantEmail") {
			$("#ph_email .tip").text(item['tkTip']);
		}
		if (item["componentId"] == "tkApplicantArea") {
			$("#ph_area .tip").text(item['tkTip']);
		}
	});
}
//健康告知
function initHealth(arr) {
	var applicantInfo = arr.applicantInfo;
	$.each(applicantInfo, function(index, item) {
		if (item['componentId'] == "tkApplicantHealth") {
			var isHealth = item.tkDefaultValue;
			$("#applicantHealth").attr("isHealth", isHealth);
		}
	})
}
//房屋地区
function houseArea(opt){
	
	var el=$(opt.el)
	var str='';
	
	var json=opt.json.cities;
	function fnAjax(id,obj){
		var w=$("#house-wrap").width();
		$.ajax({
			type: "get",
			url: insure + "/hera_insure/api/insure/v2/element/city?parentCode="+id,
			dataType: "json",
			async: false,
			success: function(msg) {
				if (msg.code == "0") {
					var city=msg.data.cities;
					var cityStr='';
					
					$.each(city,function(indexs,items){
						cityStr += '<li data-id="' +items.cityCode+ '">' + items.cityName + '</li>';
					});
					$(obj).show();

					$(obj).find(".ul").append(cityStr);
					$("#house-wrap").width(w+200);
				}
			},
			error: function(msg) {
				alert("房屋地区");
			}
		});
	}
	
	
	$.each(json,function(index,item){
		str += '<li data-id="' + item.cityCode + '">' + item.cityName + '</li>';
	});
	
	var wrap = '<div class="house-wrap cleafix" id="house-wrap">' +
			'<div class="house-province"><ul>' + str + '</ul></div>' +
			'<div class="house-city"><ul class="ul"></ul></div>' +
			'<div class="house-area"><ul class="ul"></ul></div>' +
			'</div>';
	el.unbind().bind({
		"click":function(e){
			e.stopPropagation();
			$("body").append(wrap);
			var offset = $(this).offset();
			var iptH = $(this).height();

			$("#house-wrap").css({
				left: offset.left + "px",
				top: (offset.top + iptH) + "px"
			});
			$(".house-province").on("click","li",function(e){
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();
				
				if($(".house-city .ul li").length>=1){
					$(".house-city .ul").empty();
				}
				if($(".house-area .ul li").length>=1){
					$(".house-area .ul").empty();
				}
				fnAjax(code,$(".house-city"));
				$("#houseprovince").attr("data-code",code);
				$("#houseprovince").attr("data-txt",txt);
			});
			$(".house-city").on("click","li",function(e){
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();
				
				fnAjax(code,$(".house-area"));

				$("#houseCity").attr("data-code",code);
				$("#houseCity").attr("data-txt",txt);
			});
			$(".house-area").on("click","li",function(){
				e.stopPropagation();
				var code = $(this).attr("data-id");
				var txt = $(this).text();
				
				fnAjax(code,$(".house-area"));

				$("#houseArea").attr("data-code",code);
				$("#houseArea").attr("data-txt",txt);

				el.val($("#houseprovince").attr("data-txt")+" "+$("#houseCity").attr("data-txt")+" "+$("#houseArea").attr("data-txt"));
				
				if ($("#houseprovince").attr("data-id") == "" || $("#houseCity").attr("data-id") == ""||$("#houseArea").attr("data-id")=="") {
						$('#ph_houseArea').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");
				} else {
						$('#ph_houseArea').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
				}
				$("#house-wrap").remove();

			});

		},
		"blur":function(){
			
		}
	});	
	$("body").click(function(e) {
		$("#house-wrap").remove();
		e.stopPropagation();
	});			
}
function initHouseArea(){
	$.ajax({
		type: "get",
		url: insure + "/hera_insure/api/insure/v2/element/city?parentCode=100000",
		dataType: "json",
		async: false,
		success: function(msg) {
			if (msg.code == "0") {
				if(!$.isEmptyObject(msg.data)){
					var prm = {
						el: '#ph_houseArea input.main_inpt4',
						json: msg.data,
						provinceId: "#houseprovince",
						cityId: "#houseCity",
						areaId:"#houseArea"
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
function initApplicantHouseRelationship(arr){
	var applicantInfo = arr.applicantInfo;
	var str="";
	var optArr = [];
	$.each(applicantInfo, function(index, item) {
		if (item['componentId'] == "tkHouseRelationship") {
			var tkOptions = item.tkOptions;
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				optArr.push(option);
			});
			optArr.sort(Sorts);
			$.each(optArr,function(indexs,items){
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
	var insuredInfo = arr.insuredInfo;
	var optArr = [];
	var str = ""
	$.each(insuredInfo, function(index, item) {
		if (item.componentId == "tkInsuredRelationship") {
			var tkOptions = item.tkOptions;
			//本人：01 这种格式
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				optArr.push(option);
			})
			if (optArr.length == 1) {
				$("#ins_relationship").attr("data-relationship", optArr[0].code);
				$("#ins_relationship").find("select").remove();
				$("#ins_relationship").append('<span class="relationshipTxt" id="relationshipTxt"></span>');

				$(".relationshipTxt").text(optArr[0].txt);
				$(".relationshipTxt").css({
					"color": "#333",
					"line-height": "28px",
					"padding-left": "6px"
				})
			} else {
				$.each(optArr, function(index, item) {
					str += '<option  value="' + item.code + '">' + item.txt + '</option>';
				});
				$("#ins_relationship select").append(str);
				$("#ins_relationship").attr("data-relationship", optArr[0].code);
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
		if (item["componentId"] == "tkInsuredIdType") {
			if ($.isEmptyObject(item["tkOptions"])) {
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
				$("#ins_cid select").append(str);
			}

		}
	})

}
/**************************被保人操作  end**************************/

/**************************受益人操作  start**************************/
//受益人 
function initBeneficiaryPerson(arr) {
	var beneficiaryInfo = arr.beneficiaryInfo;
	var str = "";
	var benPersonArr = [];
	$.each(beneficiaryInfo, function(index, item) {
		if (item.componentId == "tkBeneficiaryPerson") {
			var tkOptions = item.tkOptions;
			$.each(tkOptions, function(key, value) {
				var option = {
					"code": value,
					"txt": key
				};
				benPersonArr.push(option);
			})
			if (benPersonArr.length == 1) {
				$("#ben_person").attr("data-person", benPersonArr[0].code);
				$("#ben_person").find("select").remove();
				$("#ben_person").append('<span class="personTxt" id="personTxt"></span>');

				$(".personTxt").text(benPersonArr[0].txt);
				$(".personTxt").css({
					"color": "#333",
					"line-height": "28px",
					"padding-left": "6px"
				});
			} else {
				$.each(benPersonArr, function(index, item) {
					str += '<option  value="' + item.code + '">' + item.txt + '</option>';
				});
				$("#ben_person select").append(str);
			}
		}
	})
}

/**************************受益人操作  end**************************/
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
		url: insure + "/hera_insure/api/insure/v2/productMetadata/" + productId + "/" + metadata_platform + "/notice",
		dataType: "json",
		async: false,
		success: function(msg) {
			if (msg.code == "0") {
				if (msg.data.pcNotice) {
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
		url: insure + "/hera_insure/api/insure/v2/customer/info?memberId=" + memberId + "&memberToken=" + memberToken,
		dataType: "json",
		async: false,
		success: function(msg) {
			if (msg.code == "0") {
				if(!$.isEmptyObject(msg.data)){
					initMemberInputs(msg.data)
				}
			}
		},
		error: function(msg) {
			alert("网络异常1");
		}
	});
}
/**************************会员信息带出  end**************************/
function initMemberInputs(msg) {
	if ($("#ph_name").is(':visible')) {
		$("#ph_name input").val(msg.name).attr("disabled",true);
	}
	if ($("#ph_cid").is(':visible')) {
		var opt=$("#ph_cid select option");
		var len=$("#ph_cid select option").length;
		for(var i=0;i<len;i++){
			if(opt.eq(i).val()==msg.cidType){
				$("#ph_cid select").val(msg.cidType).attr("disabled",true);
				$("#ph_cid input").val(msg.cid).attr("disabled",true);	
				break;
			}else{
				$("#ph_cid select").val("01").attr("disabled",true);
				$("#ph_cid input").val("").attr("disabled",true);
			}
		}		
	}
	if($("#applicant-birth").is(":visible")){
		$("#applicant-birth input.tkApplicantBirth").val(msg.birthday);
	}
	if($("#applicant-gender").is(":visible")){
		$("#applicant-gender input[value='"+msg.gender+"']").attr({"checked":"checked","disabled":"disabled"});
	}
	// if ($("#ph_mobile").is(':visible')) {
	// 	$("#ph_mobile input[value='"+msg.gender+"']").attr({"checked":"checked","disabled":true});
	// }
	if ($("#ph_email").is(":visible")) {
		$("#ph_email input").val(msg.email);
	}
	if ($("#ph_area").is(":visible")) {
		$("#ph_area").val(msg.address);
	}

}
/**************************会员信息带出  end**************************/
//拼接html
function cerateInputs() {
	///hera_insure/api/insure/v1/productMetadata/html/S2016011601/pc/inputs
	$.ajax({
		type: "get",
		url: insure + "/hera_insure/api/insure/v2/productMetadata/html/" + productId + "/pc/inputs",
		dataType: "json",
		async: false,
		success: function(msg) {
			if (!msg) {
				return;
			}

			if (msg.tkApplicantInfo) {
				var str = msg.tkApplicantInfo.replace(/\\/, "");
				$(".applicant").append(str);
			}

			if (msg.tkInsuredInfo) {
				var str = msg.tkInsuredInfo.replace(/\\/, "");
				$(".insured").append(str);
			}

			if (msg.tkBeneficiaryInfo) {
				var str = msg.tkBeneficiaryInfo.replace(/\\/, "");
				$(str).each(function(index, el) {
					var $el = $(el);
					if($el.attr("componentId")=="tkBeneficiaryPerson"){
						$(".beneficiary .pal_perInfo").after($el);
					}	
				})
				//$(".beneficiary").append(str);
			}

			initInputs();
			if(member=="true"){
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
		url: insure + "/hera_insure/api/insure/v2/productMetadata/" + productId + "/" + metadata_platform + "/inputs?duties=" + duties,
		dataType: "json",
		async: false,
		success: function(msg) {
			if (msg.code == "0") {
				if($.isEmptyObject(msg.data)){
					return;
				}
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
	initNotice();
	initHouseArea();
	var time = new Date();
	var isRelationship;
	/**************************页面一些文字显示 start**************************/

	if (planPrice.toString().indexOf(".") == -1) {
		planPrice = planPrice + ".00";
	}

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
	// 身份证 01
	var iApplicantIdType = $("#applicantcard-type").find("option:selected").val();
	if (iApplicantIdType == "01") {
		$("#applicant-gender").hide();
		$("#applicant-birth").hide();
	} else {
		$("#applicant-gender").show();
		$("#applicant-birth").show();
	}
	$("#applicantcard-type").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		if (value == "01") {
			$("#applicant-gender").hide();
			$("#applicant-birth").hide();
		} else {
			$("#applicant-gender").show();
			$("#applicant-birth").show();
		}

		if ($("#ph_cid").find(".label2").hasClass("tipOk")) {
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipOk")
		}
		if ($("#ph_cid").find(".label2").hasClass("tipError")) {
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipError")
		}
		$('#ph_cid input').val('');

	});
	if(flagType){
		if(flagType=="01"){
			$("#applicant-profess").show();
		}else{
			$("#applicant-profess").hide();
		}
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
	
	//实时校验投保人证件号码
	$('#ph_cid input').blur(function() {
		isRelationship = $("#ins_relationship").attr("data-relationship");
		if (isRelationship == "01") {
			if (productAge != "") {
				var ageArr = productAge.split("-");
				appminAge = parseInt(ageArr[0]); //被保人最小年龄
				appmaxAge = parseInt(ageArr[1]); //被保人最大年龄	
			}
		}else{
			appminAge = storage.get("minAge") || 18; //投保人最小年龄
			appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
		}
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
	$("#applicant-birth").find("input").focus(function() {
		isRelationship = $("#ins_relationship").attr("data-relationship");
		if (isRelationship == "01") {
			if (productAge != "") {
				var ageArr = productAge.split("-");
				appminAge = parseInt(ageArr[0]); //被保人最小年龄
				appmaxAge = parseInt(ageArr[1]); //被保人最大年龄	
			}
		}else{
			appminAge = storage.get("minAge") || 18; //投保人最小年龄
			appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
		}

		if (parseInt(appmaxAge) >= 200) {
			var minY = "1900";
			var maxY = time.getFullYear() - parseInt(appminAge);
		} else {
			var minY = time.getFullYear() - appmaxAge - 1;
			var maxY = time.getFullYear() - parseInt(appminAge);
		}



		WdatePicker({
			minDate: minY + '-%M-{%d+1}',
			maxDate: maxY + '-%M-%d',
			dateFmt: 'yyyy-MM-dd'
		})
	});
	$('#applicant-birth input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#applicant-birth',
			value: value,
			mark: true,
			subTip: false,
			min:appminAge,
			max:appmaxAge
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
		
		//phContaine.phNameContainer(opt);
		_smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
		TKTrack({
			event: '投保流程_填写投保信息',
			subType: '财险_' + productName
		})
	});
	/**************************投保人 end**************************/
	/**************************被保人 start**************************/
	var insRelationJson={
		"01":"本人",
		"40":"儿女",
		"50":"父母"
	}
	if(flagType){
		$("#ins_relationship").find("select").remove();
		$("#ins_relationship").append('<span class="relationshipTxt" id="relationshipTxt"></span>');

		$(".relationshipTxt").text(insRelationJson[flagType]);
		$(".relationshipTxt").css({
			"color": "#333",
			"line-height": "28px",
			"padding-left": "6px"
		})
		$("#ins_relationship").attr("data-relationship",flagType);
	}

	if($("#ins_relationship").attr("data-relationship")=="01"||$("#ins_relationship select option:selected").val()=="01"){
		$("#ins_name").hide();
		$("#ins_cid").hide();
	}else{
		$("#ins_name").show();
		$("#ins_cid").show();
	}
	$("#ins_relationship select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		$("#ins_relationship").attr("data-relationship", value);
		isRelationship = $("#ins_relationship").attr("data-relationship");
		$("#ph_cid input").blur();

		if(value=="01"){
			$("#ins_name").hide();
			$("#ins_cid").hide();
		}else{
			$("#ins_name").show();
			$("#ins_cid").show();
		}
	});
	var iInsuredIdType = $("#ins_cid select").find("option:selected").val();
	if (iInsuredIdType == "01") {
		$("#ins_birth").hide();
		$("#ins_gender").hide();
	} else {
		$("#ins_birth").show();
		$("#ins_gender").show();
	}

	$("#ins_cid select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();

		if (value == "01") {
			$("#ins_birth").hide();
			$("#ins_gender").hide();

			$('#ins_cid input.main_inpt6').show();
			$('#ins_cid input.ipt-birth').hide();
			$("#ins_cid").find(".label2").html("");

		} else if (value == "99") {
			$("#ins_birth").hide();
			$("#ins_gender").show();

			$('#ins_cid input.main_inpt6').hide();
			$('#ins_cid input.ipt-birth').show();
			$("#ins_cid").find(".label2").html("仅支持0-2周岁（含）儿童使用出生日期作为证件号码");

		} else {
			$("#ins_birth").show();
			$("#ins_gender").show();

			$('#ins_cid input.ipt-birth').hide();
			$('#ins_cid input.main_inpt6').show();
			$("#ins_cid").find(".label2").html("");
		}
		$("#ins_cid input").val("");
		if ($("#ins_cid").find(".label2").hasClass("tipOk")) {
			$("#ins_cid").find(".label2").text("");
			$("#ins_cid").find(".label2").removeClass("tipOk")
		}
		if ($("#ins_cid").find(".label2").hasClass("tipError")) {
			$("#ins_cid").find(".label2").text("");
			$("#ins_cid").find(".label2").removeClass("tipError")
		}
	});

	//实时被保人校验名字
	if (document.getElementById("ins_name")) {
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
	if (document.getElementById("ins_cid")) {
		//证件类型为 出生日期
		$('#ins_cid input.ipt-birth').on("focus", function() {
			WdatePicker({
				minDate: '{%y-2}-%M-{%d+1}',
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
	if (document.getElementById("ins_birth")) {
		if (insminAge.indexOf("天") != -1) {
			
			var day=insminAge.match(/\d+/);
			day = -parseInt(day);
			
			//var day = -parseInt(30);
			var insmaxY = time.getFullYear();
			var insminY = time.getFullYear() - parseInt(insmaxAge);
		} else {
			var day = 0;
			var insminY = time.getFullYear() - parseInt(insmaxAge) - 1;
			var insMaxY = time.getFullYear() - parseInt(insminAge);
		}
		$("#ins_birth input").focus(function() {
			WdatePicker({
				minDate: insminY + '-%M-{%d+1}',
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
	if (document.getElementById("ins_gender")) {
		//实时校验性别
		var raIpt = $("#ins_gender").find("input[type='radio']:checked");
		if (raIpt.length < 1) {
			phContaine.checkTipInfor('#applicant-gender', '请选择投保人性别', true, false);
		}
	}

	/**************************被保人 end**************************/

	/*************************受益人 start**************************/
	$("#ben_person select").change(function() {
		var value = $(this).find("option:selected").val();
		var txt = $(this).find("option:selected").text();
		$("#ben_person").attr("data-person", value);

	});
	/*************************受益人 end**************************/
	/**************************声明提示框  start**************************/
	$("#agrChk").click(function() {
		if ($(this).prop("checked")) {
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
		if (!isApplicantPass) {
			return false;
		}

		//投保人 姓名
		returnMessage.inputs.applicantInfo.applicantName = $("#ph_name").find("input").val();
		//投保人 电话呢
		returnMessage.inputs.applicantInfo.applicantPhone = $("#ph_mobile").find("input").val();
		//投保人邮箱
		returnMessage.inputs.applicantInfo.applicantEmail = $("#ph_email").find("input").val();
		//投保人 证件类型
		returnMessage.inputs.applicantInfo.applicantIdType = $("#applicantcard-type").find("option:selected").val();
		//投保人证件号码
		returnMessage.inputs.applicantInfo.applicantId = $("#ph_cid").find("input").val();
		//性别 01:身份证
		if ($("#applicantcard-type").val() == "01") {
			returnMessage.inputs.applicantInfo.applicantGender = "";
			returnMessage.inputs.applicantInfo.applicantBirth = "";
		} else {
			returnMessage.inputs.applicantInfo.applicantGender = $(".applicant-gender:checked").val();
			returnMessage.inputs.applicantInfo.applicantBirth = $("#applicant-birth").find(".birth").val();
		}
		//投保人房屋地区 省 市 区县代码  省 市 区县名称 
		if(document.getElementById("ph_area")||document.getElementById("ph_houseArea")){
			if($("#ph_area").is(":visible")){
				returnMessage.inputs.applicantInfo.applicantProvince = $("#provinceId").val();
				returnMessage.inputs.applicantInfo.applicantCity = $("#cityId").val();
				returnMessage.inputs.applicantInfo.applicantCounty = "";

				returnMessage.inputs.applicantInfo.applicantProvinceName = "";
				returnMessage.inputs.applicantInfo.applicantCityName = "";
				returnMessage.inputs.applicantInfo.applicantCountyName = ""
			}else if($("#ph_houseArea").is(":visible")){
				returnMessage.inputs.applicantInfo.applicantProvince = $("#houseprovince").attr("data-code");
				returnMessage.inputs.applicantInfo.applicantCity = $("#houseCity").attr("data-code");
				returnMessage.inputs.applicantInfo.applicantCounty = $("#houseArea").attr("data-code");

				returnMessage.inputs.applicantInfo.applicantProvinceName = $("#houseprovince").attr("data-txt");
				returnMessage.inputs.applicantInfo.applicantCityName = $("#houseCity").attr("data-txt");
				returnMessage.inputs.applicantInfo.applicantCountyName = $("#houseArea").attr("data-txt");
			}else{
				returnMessage.inputs.applicantInfo.applicantProvince = "";
				returnMessage.inputs.applicantInfo.applicantCity = "";
				returnMessage.inputs.applicantInfo.applicantCounty = "";

				returnMessage.inputs.applicantInfo.applicantProvinceName = "";
				returnMessage.inputs.applicantInfo.applicantCityName = "";
				returnMessage.inputs.applicantInfo.applicantCountyName = "";
			}
		}
		
		//投保人 投保通讯地址  城市 代码
		if ($("#ph_address").is(":visible")) {
			returnMessage.inputs.applicantInfo.applicantAddress = $("#ph_address input").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantAddress = "";
		}
		//投保人  职业类别
		if ($("#applicant-profess").is(":visible")) {
			returnMessage.inputs.applicantInfo.applicantProfession = $("#ph_worktype").val();
		} else {
			returnMessage.inputs.applicantInfo.applicantProfession = "";
		}
		
		//房屋详细地址
		if($("#ph_houseAddress").is(":visible")){
			returnMessage.inputs.applicantInfo.applicantAddressDetails =$("#ph_houseAddress input").val() ;
		}else{
			returnMessage.inputs.applicantInfo.applicantAddressDetails ="" ;
		}
		//我与房屋的关系
		if($("#ph_houseRelationship").is(":visible")){
			returnMessage.inputs.applicantInfo.applicantRelationHouse =$("#ph_houseRelationship select option:selected").val() ;
		}else{
			returnMessage.inputs.applicantInfo.applicantRelationHouse ="" ;
		}
		
		/**************************投保人 end**************************/
		/**************************被保人 start**************************/
		var isInsPass = submitCheck.phInsuredContainer();
		if (!isInsPass) {
			return false;
		}

		if ($("#ins_relationship").attr("data-relationship") == "01"||$("#ins_relationship select option:selected").val()=="01") {
			insuredMessage.insuredRelationship = "01"; //代表本人
			insuredMessage.insuredName = returnMessage.inputs.applicantInfo.applicantName;
			insuredMessage.insuredIdType = returnMessage.inputs.applicantInfo.applicantIdType;
			insuredMessage.insuredId = returnMessage.inputs.applicantInfo.applicantId;
			insuredMessage.insuredGender = returnMessage.inputs.applicantInfo.applicantGender;
			insuredMessage.insuredBirth = returnMessage.inputs.applicantInfo.applicantBirth;
			insuredMessage.insuredPhone = returnMessage.inputs.applicantInfo.applicantPhone;
			insuredMessage.insuredEmail = returnMessage.inputs.applicantInfo.applicantEmail;
		} else {

			insuredMessage.insuredRelationship = $("#ins_relationship").attr("data-relationship");
			insuredMessage.insuredName = $("#ins_name input").val();
			insuredMessage.insuredIdType = $("#ins_cid select").find("option:selected").val();

			//被保人性别
			if ($("#ins_cid select").find("option:selected").val() == "01") {
				insuredMessage.insuredId = $("#ins_cid input.main_inpt6").val();
				insuredMessage.insuredGender = "";
				insuredMessage.insuredBirth = "";
			} else if ($("#ins_cid select").find("option:selected").val() == "99") {
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
		}

		/**************************被保人 end**************************/
		/**************************受益人 start**************************/
		if ($("#ben_person").attr("data-person") == "01") {
			insuredMessage.beneficiaryLegal = "true";
		} else {
			insuredMessage.beneficiaryLegal = "false";
			//						$循环所有的受益人.each(function() {
			//									var beneficiaryOption = {
			//										"beneficiaryRelationship": "与被保人关系",
			//										"beneficiaryName": "受益人姓名",
			//										"beneficiaryIdType": "证件类型",
			//										"beneficiaryId": "证件号码",
			//										"beneficiaryGender": "性别",
			//										"beneficiaryBirth": "出生日期",
			//										"beneficiaryPercent": "受益比例"
			//
			//									};
			//									insuredMessage.beneficiaryInfo.push(beneficiaryOption);
			//		});

		}
		returnMessage.inputs.insuredInfo.length=0;
		returnMessage.inputs.insuredInfo.push(insuredMessage);

		returnObj.inputs = returnMessage.inputs;

		/**************************受益人 end**************************/
		storage.set("email", $("#ph_email").find("input").val());
		storage.set("returnMessage", JSON.stringify(returnObj));
		//已经阅读必选
		if (!$("#agrChk").is(":checked")) {
			layer.msg('您好，请阅读并同意投保声明');
			return;
		}
		var isHealth = $("#applicantHealth").attr("isHealth");
		//保存填写信息  
		$.ajax({
			type: "post",
			url: insure + "/hera_insure/api/insure/v2/application/" + applicationId + "/inputs",
			data: JSON.stringify(returnMessage),
			dataType: "json",
			success: function(msg) {
				//0 无健康告知
				if (msg.code == "0") {
					if (isHealth == "true") {
						window.location.href = "healthinfo.html";
					} else {
						var proposalNo = msg.data.proposalNo;
						var proposalToken = msg.data.proposalToken;
						storage.set("proposalNo", proposalNo);
						storage.set("proposalToken", proposalToken);
						window.location.href = "pay.html";
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
	/**************************提交校验数据 end**************************/
});