//点击"同意以上声明，下一步"对页面的校验
var submitCheck = {
	//投保人校验
	"phApplicantContainer": function() {
		var phData = {};
		//G_BACK_STORAGE.id_policy = {};
		//G_BACK_STORAGE.id_policy.policyholder = {};
		phData.name = {
			// con: $('#ph_name input').val()
		};
		phData.cidtype_id = {
			// con: $('#ph_cid option:selected').val()
		};
		phData.cid_number = {
			// con: $('#ph_cid input').val()
		};
		//姓名
		phData.name.onOff = phContaine.phNameContainer({
			selector: '#ph_name',
			value: $('#ph_name input').val(),
			mark: true,
			subTip: true
		});

		if(!phData.name.onOff) {
			return false;
		} else {
			//G_BACK_STORAGE.id_policy.policyholder.name = $('#ph_name input').val();
		}
		//证件类型
		if(!($('#ph_cid option:selected').val())) {
			layer.msg('请选择证件类型');
			phContaine.checkTipInfor('#ph_cid', '请选择证件类型', false, true);
			phContaine.subScrollTop($('#ph_cid'));
			return false;
		} else {
			//G_BACK_STORAGE.id_policy.policyholder.cidTypeId = $('#ph_cid option:selected').val();
		}

		//证件号码
		phData.cid_number.onOff = phContaine.phCidNumContainer({
			selector: '#ph_cid',
			value: $('#ph_cid input').val(),
			mark: true,
			subTip: true
		});
		if(!phData.cid_number.onOff) {
			return false;
		} else {
			//G_BACK_STORAGE.id_policy.policyholder.cid = $('#ph_cid input').val();
		}
		//性别 非身份证
		if($('#applicant-gender').is(':visible')) {
			phData.gender = {
				//con: $('#applicant-gender input:checked').val()
			};
			phData.birthday = {
				//con: $('#applicant-birth input').val()
			};
			if(!($('#applicant-gender input:checked').val())) {
				layer.msg('请选择投保人性别');
				phContaine.checkTipInfor('#applicant-gender', '请选择投保人性别', false, true);
				phContaine.subScrollTop($('#applicant-gender'));
				return false;
			}
		}
		//G_BACK_STORAGE.id_policy.policyholder.sex = changeSex(phData.gender.con);

		//出生日期
		
		if($('#applicant-birth').is(':visible')) {

			phData.birthday = {
				//con: $('#applicant-birth input').val()
			};
			phData.birthday.onOff = phContaine.phBirthdayContainer({
				selector: '#applicant-birth',
				value: $('#applicant-birth .birth').val(),
				mark: true,
				subTip: true
			});
			if(!phData.birthday.onOff) {
				return false;
			}
		}

		//G_BACK_STORAGE.id_policy.policyholder.birthday = phData.birthday.con;

		phData.mobile = {
			//con: $('#ph_mobile input').val()
		};
		phData.mobile.onOff = phContaine.phPhone({
			selector: '#ph_mobile',
			value: $('#ph_mobile input').val(),
			mark: true,
			subTip: true
		});
		if(!phData.mobile.onOff) {
			return false;
		} else {
			//G_BACK_STORAGE.id_policy.policyholder.mobile = phData.mobile.con;
		}

		phData.email = {
			//con: $('#ph_email input').val()
		};
		phData.email.onOff = phContaine.phEmail({
			selector: '#ph_email',
			value: $('#ph_email input').val(),
			mark: true,
			subTip: true
		});
		if(!phData.email.onOff) {
			return false;
		} else {
			//G_BACK_STORAGE.id_policy.policyholder.email = phData.email.con;
		}

		if($('#ph_area').is(':visible')) {
			phData.phArea = {
				//con: $('#ph_area_input').text()
			};
			
			if($('#ph_area').find("#provinceId").val()==""||$('#ph_area').find("#cityId").val()=="") {
				layer.msg('请选择地区');
				phContaine.checkTipInfor('#ph_area', '请选择地区', false, true);
				phContaine.subScrollTop($('#ph_area'));
				return false;
			}
			//G_BACK_STORAGE.id_policy.areaCode = $('#ph_area_input').attr('areacode');
		}
		//职业
		if($('#applicant-profess').is(':visible')) {
			phData.industry = {
				//con: $('#ph_industry option:selected').val()
			};
			if($('#applicant-profess option:selected').val() == ''||$('#applicant-profess option:selected').val()=="0") {
				layer.msg('请选择投保人的职业');
				phContaine.checkTipInfor('#applicant-profess', '请选择职业', false, true);
				phContaine.subScrollTop($('#applicant-profess'));
				return false;
			}
			phData.workTypeId = {
					//con: $('#ph_job').attr('worktypeid')
				}
				//			G_BACK_STORAGE.id_policy.policyholder.occupation = $('#ph_job').val();
				//			G_BACK_STORAGE.id_policy.policyholder.workTypeId = phData.workTypeId.con;
		}
		
		return true;
	}
}

var insure = "http://insure.test.hera.tk.cn";
var deluat = "http://deluat.taikang.com";
//兼容ie6的sessionStorage
var storage = new Storage('session');

//获取表单id
//2016-07-20
//var getMessage = JSON.parse(sessionStorage.getItem("returnMessage")) || {};
var getMessage = JSON.parse(storage.get("returnMessage")) || {};
var plan = getMessage.plan || "",
	applicationId = getMessage.applicationId || "",
	productId = getMessage.productId || 1707,
	channelId = getMessage.channelId || "",
	applicationToken = getMessage.applicationToken || "",
	openId = getMessage.openId || "",
	memberId = getMessage.memberId || "",
	memberToken = getMessage.memberToken || "",
	metadata_scope = "pc",
	platform = "pc";

//returnMessage ->保存用户填写信息接口
var returnMessage = {
	"platform": platform,
	"channelId": channelId,
	"productId": productId,
	"applicationId": applicationId,
	"seedId": "3",
	"applicationToken": applicationToken,
	"openId": openId,
	"memberId": memberId,
	"memberToken": memberToken,
	"processHandler": "property",
	"checkCode": "1234"

};
returnMessage.inputs = {
	"applicantInfo": {},
	"insuredInfo": []
};
var insuredMessage = {};
insuredMessage.beneficiaryInfo = [];

//returnObj->存入sessionStorage
var returnObj = {
	"platform": platform,
	"channelId": channelId,
	"productId": productId,
	"applicationId": applicationId,
	"seedId": "3",
	"applicationToken": applicationToken,
	"openId": openId,
	"memberId": memberId,
	"memberToken": memberToken,
	"processHandler": "property",
	"checkCode": ""
};
returnObj.details = getMessage.details;

$(function() {
	var applicant = $("#tkApplicantInfo"),
		aApplicantIpt = applicant.find(".ipt"),
		oBirth = applicant.find(".birth"),
		aAdress = $("#applicant-address").find(".area"),
		aProfess = $("#applicant-profess").find(".profess"),
		insured = $("#tkInsuredInfo"),
		aInsuredIpt = insured.find(".ipt"),
		beneficiary = $("#tkBeneficiaryInfo"),
		beneficiaryList = beneficiary.find(".beneficiary-list");

	var isInsured = false,
		isBeneficiary = false,
		isHealth = $("#applicantHealth").attr("isHealth");

	var iBenNum = 0;
	/**************************投保人 start**************************/
	// 身份证 01
	var defineApplicantcard = $("#applicantcard-type").find("option:selected").val();
	if(defineApplicantcard == "01") {
		$("#applicant-gender").hide();
		$("#applicant-birth").hide();
	} else {
		$("#applicant-gender").show();
		$("#applicant-birth").show();
	}
	$("#applicantcard-type").change(function() {
		var value = $(this).val();

		//选择身份证 不显示 性别 出生日期
		if(value == "01") {
			$("#applicant-gender").hide();
			$("#applicant-birth").hide();
		} else {
			$("#applicant-gender").show();
			$("#applicant-birth").show();
		}
		$('#applicantcard-ipt').val('');
		if($("#ph_cid").find(".label2").hasClass("tipOk")){
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipOk")
		}
		if($("#ph_cid").find(".label2").hasClass("tipError")){
			$("#ph_cid").find(".label2").text("");
			$("#ph_cid").find(".label2").removeClass("tipError")
		}
		$('#applicantcard-ipt').val('');
		var cid_number = "";
		//var data = checkFn.validateCid(value, cid_number); //校验
		//phContaine.checkTipInfor('#ph_cid', data.message, data.onOff, true); //验证提示
	});
	//鼠标离开校验名字
	$("#ph_name input").blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_name',
			value: value,
			mark: true,
			subTip: false

		}
		phContaine.phNameContainer(opt);
	});
	//鼠标离开校验 邮箱
	$("#ph_email input").blur(function() {
			var value = $(this).val();
			var opt = {
				selector: '#ph_email',
				value: value,
				mark: true,
				subTip: false
			}
			phContaine.phEmail(opt);
		})
		//鼠标离开校验电话
	$('#ph_mobile input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_mobile',
			value: value,
			mark: true,
			subTip: false
		}

		phContaine.phPhone(opt);
	});
	//鼠标离开证件号码校验
	$('#ph_cid input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#ph_cid',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phCidNumContainer(opt);

	});
	//校验出生日期
	$('#applicant-birth input').blur(function() {
		var value = $(this).val();
		var opt = {
			selector: '#applicant-birth',
			value: value,
			mark: true,
			subTip: false
		}
		phContaine.phBirthdayContainer(opt);

	});



	/**************************投保人 end**************************/

	/**************************被保人 start**************************/
	//与投保人关系  {"本人":"01","指定":"02"}
	var defineInsured = $("#insured-relationship").val();
	if(defineInsured == "01") {
		$("#insured-info").hide();
		isInsured = false;
	} else {
		$("#insured-info").show();
		isInsured = true;
	}
	$("#insured-relationship").on("change", function() {
		var val = $(this).val();
		if(val == "01") {
			$("#insured-info").hide();
			isInsured = false;
		} else {
			$("#insured-info").show();
			isInsured = true;
		}
	});
	var defineInsureCard = $("#insuredcard-type").val();
	if(defineInsureCard == "01") {
		$("#insured-gender").hide();
		$("#insured-birth").hide();
	} else {
		$("#insured-gender").show();
		$("#insured-birth").show();
	}

	//切换证件
	$("#insured-info").on("change", "#insuredcard-type", function() {
			var value = $(this).val();
			if(value == "01") {
				$("#insured-gender").hide();
				$("#insured-birth").hide();

			} else {
				$("#insured-gender").show();
				$("#insured-birth").show();
			}
		})
		/**************************被保人  end**************************/

	/**************************受益人  start**************************/
	// 选择法定还是指定 "法定" : "01","指定" : "02"
	var defineBen = $("#tkBeneficiaryPerson").val();
	if(defineBen == "01") {
		$("#beneficiary-default").show();
		$("#beneficiary-info").hide();
		isBeneficiary = false;
	} else {
		$("#beneficiary-default").hide();
		$("#beneficiary-info").show();
		isBeneficiary = true;
	}

	$("#tkBeneficiaryPerson").change(function() {
		var isBeneficiaryPerson = $(this).val();
		if(isBeneficiaryPerson == "01") {
			$("#beneficiary-default").show();
			$("#beneficiary-info").hide();
			isBeneficiary = false;
		} else {
			$("#beneficiary-default").hide();
			$("#beneficiary-info").show();
			isBeneficiary = true;
		}
	});
	//受益人  默认性别 出生日期显示
	var defineBenCardType = $(".beneficiary-list").find(".beneficiarycard-type");
	if(defineBenCardType.val() == "01") {
		defineBenCardType.closest(".beneficiary-list").find(".beneficiary-gender").hide();
		defineBenCardType.closest(".beneficiary-list").find(".beneficiary-birth").hide();
	} else {
		defineBenCardType.closest(".beneficiary-list").find(".beneficiary-gender").show();
		defineBenCardType.closest(".beneficiary-list").find(".beneficiary-birth").show();
	}
	//切换证件
	$("#beneficiary-info").on("change", ".beneficiarycard-type", function() {
		var value = $(this).val(),
			parent = $(this).closest(".beneficiary-list");

		if(value == "01") {
			parent.find(".beneficiary-gender").hide();
			parent.find(".beneficiary-birth").hide();
		} else {
			parent.find(".beneficiary-birth").show();
			parent.find(".beneficiary-gender").show();
		}
	})

	var modifyType;
	//添加受益人
	$("#add-beneficiary-btn").click(function(e) {
		e.stopPropagation();
		modifyType = "";
		var str = $(".beneficiary-list").html();
		var container = '<div class="padding15  beneficiary-list w900">' + str + '</div>';
		var percent = $("#beneficiary-info").find(".percent");
		var BeneficiaryArr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
		iBenNum++;
		var sum = 0;
		var relationShipArr = [];

		for(var i = 0; i < beneficiaryList.length; i++) {
			var aBeneficiaryIpt = $(beneficiaryList[i]).find(".ipt");
			for(var j = 0; j < aBeneficiaryIpt.length; j++) {
				var ipt = $(aBeneficiaryIpt[j]),
					required = ipt.prop("required"),
					key = ipt.attr("key"),
					tip = ipt.attr("tip");

				if(key == "beneficiaryName") {
					//						if(!checkFn.checkusername(required,tip,ipt)){
					//							return false;
					//						}
				} else if(key == "beneficiaryId") {
					//						var insuredType=$("#beneficiarycard-type").val();
					//						if(!checkFn.checkCid(required,tip,ipt,insuredType)){
					//							return false;
					//						}
				} else if(key == "beneficiaryPercent") {
					//						if(!checkFn.checkNum(required,tip,ipt)){
					//							return false;
					//						}
				}
			}

		}

		//			for(var i=0;i<percent.length;i++){
		//				sum+=parseFloat($(percent[i]).val());
		//			}
		//			if(sum>=100){
		//				alert("受益比例之和必须为100%")
		//				return;
		//			}

		if($(".beneficiary-list:last").css("display") == "block") {
			alert("请先保存受益人");
			return;
		}
		$(container).insertBefore($(this).parent("#add-box"));
		$(".beneficiary-list:last").find(".i-beneficiary").text(BeneficiaryArr[iBenNum]);
	});
	//保存受益人
	var beneficiaryName, beneficiaryIdType, beneficiaryIdTypeTxt, beneficiaryId, beneficiaryPercent, beneficiaryType, beneficiaryRelationship;
	$("#beneficiary-info").on("click", ".save-ben", function(e) {
		e.stopPropagation();
		var newStr = '<div class="per_info clearfix" >' +
			'<div class="fl">' +
			'<input type="radio" name=""  class="fl inpt_rad"  id="lab10"> ' +
			'<label class="mrgin_r30 lab_cursor beneficiary-name"  for="" >' + beneficiaryName + '：</label>  ' +
			'<label class="mrgin_r30 lab_cursor beneficiary-idtype" for="">' + beneficiaryIdTypeTxt + '/' + beneficiaryId + '</label>' +
			'<label class="lab_cursor beneficiary-percent" for="">' + beneficiaryPercent + '</label>' +
			'<input type="hidden"  class="beneficiary-id" value="' + beneficiaryIdType + '">' +
			'<input type="hidden"  class="beneficiary-relationship" value="' + beneficiaryIdType + '">' +
			'</div>' +
			'<div class="fr per_tool" style="display:none;">' +
			'<a href="javascript:;" class="info_a fl modify-ben">[修改]</a>' +
			'<a href="javascript:;" class="info_a fl del-ben">[删除]</a>' +
			'<span class="btn_spa fr"></span>' +
			'</div>' +
			'</div>';

		var benLen = $(".beneficiary-list").length;
		var benObj = $(".beneficiary-list").eq(benLen - 1);
		if(modifyType) {
			$(".beneficiary-list").each(function(index, el) {

				if($(el).attr("data-type") == modifyType) {
					
					beneficiaryName = $(el).find("input[key='beneficiaryName']").val();
					beneficiaryId = $(el).find("input[key='beneficiaryId']").val(),
						beneficiaryPercent = $(el).find("input[key='beneficiaryPercent']").val(),

						beneficiaryIdType = $(el).find("select.beneficiarycard-type").val();
					beneficiaryIdTypeTxt = $(el).find("select.beneficiarycard-type").find("option:selected").text();
					beneficiaryRelationship = $(el).find("select.beneficiaryRelationship").val();

					beneficiaryType = $(el).find("input[key='beneficiaryName']").val();

					$(".per_info").eq(index).attr("data-type", beneficiaryType);
					$(".per_info").eq(index).find(".beneficiary-name").text(beneficiaryName);
					$(".per_info").eq(index).find(".beneficiary-idtype").text(beneficiaryIdTypeTxt + "/" + beneficiaryId);
					$(".per_info").eq(index).find(".beneficiary-percent").text("收益比例" + beneficiaryPercent);
					$(".per_info").eq(index).find(".beneficiary-id").val(beneficiaryIdType);

					$(".per_info").eq(index).find(".beneficiary-relationship").val(beneficiaryRelationship);

					$(el).attr("data-type", beneficiaryType);
					$(el).hide();
				}
			})

		} else {

			beneficiaryName = benObj.find("input[key='beneficiaryName']").val();
			beneficiaryIdType = benObj.find("select.beneficiarycard-type").val();
			beneficiaryIdTypeTxt = benObj.find("select.beneficiarycard-type").find("option:selected").text();
			beneficiaryId = benObj.find("input[key='beneficiaryId']").val(),
				beneficiaryPercent = benObj.find("input[key='beneficiaryPercent']").val();
			beneficiaryRelationship = benObj.find("select.beneficiaryRelationship").val();
			beneficiaryType = benObj.find("input[key='beneficiaryName']").val();

			benObj.before(newStr);
			$(".per_info").eq(benLen - 1).attr("data-type", beneficiaryType);
			$(".per_info").eq(benLen - 1).find(".beneficiary-name").text(beneficiaryName + "：");
			$(".per_info").eq(benLen - 1).find(".beneficiary-idtype").text(beneficiaryIdTypeTxt + "/" + beneficiaryId);
			$(".per_info").eq(benLen - 1).find(".beneficiary-percent").text("收益比例：" + beneficiaryPercent);
			$(".per_info").eq(benLen - 1).find(".beneficiary-id").val(beneficiaryIdType);
			$(".per_info").eq(benLen - 1).find(".beneficiary-relationship").val(beneficiaryRelationship);

			benObj.attr("data-type", beneficiaryType);
			benObj.hide();

		}

	});
	//修改受益人
	$("#beneficiary-info").on("click", ".modify-ben", function(e) {
		e.stopPropagation();
		modifyType = $(this).closest(".per_info").attr("data-type");

		$(".beneficiary-list").each(function(index, el) {
			if($(el).attr("data-type") == modifyType) {
				$(el).show();
			}
		})

		//$(this).closest(".per_info").hide()
	});
	//折叠行上的删除  同时删除框
	$("#beneficiary-info").on("click", ".del-ben", function(e) {
		e.stopPropagation();
		var benType = $(this).closest(".per_info").attr("data-type");

		$(this).closest(".per_info").remove();
		$(".beneficiary-list").each(function(index, el) {
			if($(el).attr("data-type") == benType) {
				$(el).remove();
			}

		})
	});
	//框内删除受益人 同时删除折叠行
	$("#beneficiary-info").on("click", ".del-btn", function(e) {
		e.stopPropagation();
		var len = $("#beneficiary-info").find(".beneficiary-list").length;
		var benListType = parent.attr("data-type");
		//			if(len==1){
		//				alert("至少填写一个受益人")
		//				return ;	
		//			}
		$(this).closest(".beneficiary-list").remove();
		$(".per_info").each(function(index, el) {
			if($(el).attr("data-type") == benListType) {
				$(el).remove();
			}
		})
	});
	$("#beneficiary-info").on("click", ".pay_link", function(e) {
		e.stopPropagation();
		if($(".beneficiary-list").length <= 1) {
			alert("不能取消");
			return;
		}
		$(this).closest(".beneficiary-list").remove();
		iBenNum--;

	});

	//折叠状态的鼠标悬浮
	$("#beneficiary-info").on("mouseover", ".per_info", function() {
		$(this).addClass("per_info_hov");
		$(this).find(".per_tool").show();

	});
	$("#beneficiary-info").on("mouseout", ".per_info", function() {
		$(this).removeClass("per_info_hov");
		$(this).find(".per_tool").hide();

	});
	/**************************受益人  end**************************/

	/**************************声明提示框  start**************************/
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

	$("#check-form").on("click", function(e) {
		e.stopPropagation();
			/**************************投保人校验数据 start**************************/
			var isPhPass = submitCheck.phApplicantContainer();
			if(!isPhPass) {
				return false;
			}

			//投保人 姓名
			returnMessage.inputs.applicantInfo.applicantName = $("#ph_name").find("input").val();
			//投保人 电话呢
			returnMessage.inputs.applicantInfo.applicantPhone = $("#ph_mobile").find("input").val();
			//投保人邮箱
			returnMessage.inputs.applicantInfo.applicantEmail = $("#ph_email").find("input").val();
			
			//2016-07-20
			//sessionStorage.setItem("email", $("#ph_email").find("input").val());
			storage.set("email", $("#ph_email").find("input").val());
			//投保人证件号码
			returnMessage.inputs.applicantInfo.applicantId = $("#ph_cid").find("input").val();
			//性别 01:身份证
			if($("#applicantcard-type").val() == "01") {
				
				returnMessage.inputs.applicantInfo.applicantGender = "";
				returnMessage.inputs.applicantInfo.applicantBirth = "";
			} else {
				$(".applicant-gender").each(function(index, el) {
						if($(el).is(":checked")) {
							returnMessage.inputs.applicantInfo.applicantGender = $(el).val();
						}
					})
					//投保人 出生日期
				returnMessage.inputs.applicantInfo.applicantBirth = $("#tkApplicantInfo").find(".birth").val();
			}
			//投保人 证件类型
			returnMessage.inputs.applicantInfo.applicantIdType = $("#applicantcard-type").val();

			//投保人 职业类别
			returnMessage.inputs.applicantInfo.applicantProfession = $("#ph_worktype").val();
			//投保人 投保地区  省 代码
			returnMessage.inputs.applicantInfo.applicantProvince = $("#provinceId").val();
			//投保人 投保地区  城市 代码
			returnMessage.inputs.applicantInfo.applicantCity = $("#cityId").val();
			//投保人 投保通讯地址  城市 代码
			if(document.getElementById("ph-address")) {
				returnMessage.inputs.applicantInfo.applicantAddress = $("#applicant-address").val();
			} else {
				returnMessage.inputs.applicantInfo.applicantAddress = "";
			}
			//投保人  职业类别
			returnMessage.inputs.applicantInfo.applicantProfession = $("#ph_worktype").val();

			/**************************投保人校验数据 end**************************/

			//被保人
			if(isInsured) {
				for(var i = 0; i < aInsuredIpt.length; i++) {
					var ipt = $(aInsuredIpt[i]),
						required = ipt.prop("required"),
						key = ipt.attr("key"),
						tip = ipt.attr("tip");
					if(key == "insuredName") {
						//						if(!checkFn.checkusername(required, tip, ipt)) {
						//							return false;
						//						}
					} else if(key == "insuredId") {
						var insuredType = $("#insuredcard-type").val();
						//						if(!checkFn.checkCid(required, tip, ipt, insuredType)) {
						//							return false;
						//						}
					}
					insuredMessage[key] = ipt.val();

				}
				$(".applicantGender").each(function() {
						if($(this).is(":checked")) {
							insuredMessage.insuredGender = $(this).val();
						}
					})
					//如果是身份证 出生日期 性别
				if($("#insuredcard-type").val() == "01") {
					insuredMessage.insuredBirth = "";
					insuredMessage.insuredGender = "";
				} else {
					$("#insured-gender").find(".applicant-gender").each(function(index, el) {
						if($(el).is(":checked")) {
							insuredMessage.insuredGender = $(this).val();
						}
					})
					insuredMessage.insuredBirth = $("#insured-birth-ipt").val();
				}

				insuredMessage.insuredRelationship = $("#insured-relationship").val();
				insuredMessage.insuredIdType = $("#insuredcard-type").val();
				//insuredMessage.insuredId=$("#insuredcard-ipt").val();
				//insuredMessage.insuredName=$("#insuredcard-ipt").val();
				insuredMessage.insuredPhone = "  ";
				insuredMessage.insuredEmail = " ";

			} else {
				insuredMessage.insuredRelationship = "01"; //代表本人
				insuredMessage.insuredName = returnMessage.inputs.applicantInfo.applicantName;
				insuredMessage.insuredIdType = returnMessage.inputs.applicantInfo.applicantIdType;
				insuredMessage.insuredId = returnMessage.inputs.applicantInfo.applicantId;
				insuredMessage.insuredGender = returnMessage.inputs.applicantInfo.applicantGender;
				insuredMessage.insuredBirth = returnMessage.inputs.applicantInfo.applicantBirth;
				insuredMessage.insuredPhone = returnMessage.inputs.applicantInfo.applicantPhone;
				insuredMessage.insuredEmail = returnMessage.inputs.applicantInfo.applicantEmail;

			}

			//受益人
			if(isBeneficiary) {
				//指定受益人
				var benList = $("#tkBeneficiaryInfo").find(".beneficiary-list");
				insuredMessage.beneficiaryInfo.length = 0;
				insuredMessage.beneficiaryLegal = "false";
				for(var i = 0; i < benList.length; i++) {
					var beneficiaryMessage = {};
					var aBeneficiaryIpt = $(benList[i]).find(".ipt"),
						beneficiaryRelationship = $(benList[i]).find(".beneficiaryRelationship"),
						beneficiaryIdType = $(benList[i]).find(".beneficiarycard-type"),

						beneficiaryGender = $(benList[i]).find(".beneficiaryGender"),
						beneficiaryBirth = $(benList[i]).find(".beneficiary-birth-ipt");
					for(var j = 0; j < aBeneficiaryIpt.length; j++) {
						var ipt = $(aBeneficiaryIpt[j]),
							required = ipt.prop("required"),
							key = ipt.attr("key"),
							tip = ipt.attr("tip");

						if(key == "beneficiaryName") {
							if(!checkFn.checkusername(required, tip, ipt)) {
								return false;
							}
						} else if(key == "beneficiaryId") {
							var insuredType = $("#beneficiarycard-type").val();
							if(!checkFn.checkCid(required, tip, ipt, insuredType)) {
								return false;
							}
						} else if(key == "beneficiaryPercent") {
							if(!checkFn.checkNum(required, tip, ipt)) {
								return false;
							}
						}
						beneficiaryMessage[key] = ipt.val();
					}
					//受益人 性别  出生日期 身份证：01
					if(beneficiaryIdType.val() == "01") {
						beneficiaryMessage.beneficiaryGender = "";
						beneficiaryMessage.beneficiaryBirth = "";
					} else {
						beneficiaryGender.each(function(index, el) {
								if($(el).is(":checked")) {
									beneficiaryMessage.beneficiaryGender = $(el).val()
								}
							})
							//受益人 出生日期
						beneficiaryMessage.beneficiaryBirth = beneficiaryBirth.val();
					}

					//受益人  与被保人关系
					beneficiaryMessage.beneficiaryRelationship = beneficiaryRelationship.val();
					//受益人 证件类型
					beneficiaryMessage.beneficiaryIdType = beneficiaryIdType.val();

					if(beneficiaryIdType.val() == "01") {
						beneficiaryMessage.beneficiaryGender = "";
						beneficiaryMessage.beneficiaryBirth = "";
					} else {
						beneficiaryGender.each(function(index, el) {
							if($(this).is(":checked")) {
								beneficiaryMessage.beneficiaryGender = $(this).val();
							}
						})
						beneficiaryMessage.beneficiaryBirth = beneficiaryBirth.val();
					}
					insuredMessage.beneficiaryInfo.push(beneficiaryMessage)
				}
			} else {
				//法定受益人
				insuredMessage.beneficiaryLegal = "true";
			}
			returnMessage.inputs.insuredInfo.length = 0;
			returnMessage.inputs.insuredInfo.push(insuredMessage);
//			console.log("returnMessage")
//			console.log(returnMessage);
			returnObj.inputs = returnMessage.inputs;

			//2016-7-20
			//sessionStorage.setItem("returnMessage", JSON.stringify(returnObj));
			storage.set("returnMessage", JSON.stringify(returnObj));
			//已经阅读必选
			if(!$("#agrChk").is(":checked")) {
				layer.msg('您好，请阅读并同意投保声明');
				//alert("您好，请阅读并同意投保声明");

				return;
			}
			//保存填写信息  2016-07-15注释  测试校验规则
			$.ajax({
				type: "post",
				url: deluat + "/hera_insure/api/insure/v1/application/" + applicationId + "/inputs",
				data: JSON.stringify(returnMessage),
				dataType: "json",
				success: function(msg) {
					//订单号

					//0 无健康告知
					if(msg.code == "0") {
						if(isHealth == "true") {
							//if(msg.data.healthinfoStatus="0"){
							window.location.href = "healthinfo.html";
						} else {
							var proposalNo = msg.data.proposalNo;
							var proposalToken = msg.data.proposalToken;
							//2026-07-20
//							sessionStorage.setItem("proposalNo", JSON.stringify(proposalNo));
//							sessionStorage.setItem("proposalToken", JSON.stringify(proposalToken));
						storage.set("proposalNo", JSON.stringify(proposalNo));
						storage.set("proposalToken", JSON.stringify(proposalToken));
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

		})
		/**************************提交校验数据 end**************************/
})