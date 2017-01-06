/*
 * 姓名 
 * 证件号码
 * 手机号码 
 * 电子邮箱
 * 不同情况的提示信息
 * */
var phContaine = {
	"subScrollTop": function(selectorElem) {
		var scrollHeight = Number(selectorElem.offset().top - 230);
		$('html,body').animate({
			'scrollTop': scrollHeight
		});
	},
	"phAgeRange": function(opt) {
		var policyholder = INIT_SHOW_DATA.id_policy.policyholder;
		var max = policyholder.maximumDate.value;
		var min = policyholder.minimumDate.value;
		var max_age = calculateAge(max, INIT_GET_DATA.currentTime, 1, 'none', INIT_GET_DATA.currentTime);
		var min_age = calculateAge(min, INIT_GET_DATA.currentTime, 1, 'none', INIT_GET_DATA.currentTime);
		var maxDate = new Date(max.replace(new RegExp('-', 'gm'), '/'));
		var minDate = new Date(min.replace(new RegExp('-', 'gm'), '/'));
		var birthDate = new Date(opt.birthday.replace(new RegExp('-', 'gm'), '/'));
		if((birthDate - minDate) < 0) {
			checkTipInfor(opt.selector, '投保人年龄不能超过' + min_age + '岁', false, opt.mark);
			if(opt.subTip) {
				layer.msg('投保人年龄不能超过' + min_age + '岁');
				subScrollTop($(opt.selector));
			}
			return false;
		} else if((birthDate - maxDate) > 0) {
			checkTipInfor(opt.selector, '投保人年龄应不小于' + (Number(max_age)) + '岁', false, opt.mark);
			if(opt.subTip) {
				layer.msg('投保人年龄应不小于' + (Number(max_age)) + '岁');
				subScrollTop($(opt.selector));
			}
			return false;
		}
		return true;
	},
	"checkTipInfor": function(selector, tipStr, onOff, mark) {
		if(!mark) {
			return false;
		}
		if(onOff) {
			$(selector).find('.tip').text(tipStr).removeClass('tipError').addClass('tipOk');
		} else {
			$(selector).find('.tip').text(tipStr).removeClass('tipOk').addClass('tipError');
		}
		return onOff;
	},
	"phNameContainer": function(opt) {
		var ordcheckData = checkFn.basicValidateName(opt.value);
		if(!ordcheckData.onOff) {
			phContaine.checkTipInfor(opt.selector, ordcheckData.message, ordcheckData.onOff, opt.mark);
			if(opt.subTip) {
				layer.msg( ordcheckData.message);
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}

		if(!opt.subTip) {
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;
	},
	"phPhone": function(opt) {

		var data = checkFn.basicValidateMobile(opt.value);
		if(!data.onOff) {
			phContaine.checkTipInfor(opt.selector, data.message, data.onOff, opt.mark);
			if(opt.subTip) {
				layer.msg(data.message);
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}
		if(!opt.subTip) {
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;
	},
	"phEmail": function(opt) {
		var data = checkFn.basicValidateEmail(opt.value);
		if(!data.onOff) {
			phContaine.checkTipInfor(opt.selector, data.message, data.onOff, opt.mark);
			if(opt.subTip) {
				layer.msg(data.message);
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}
		if(!opt.subTip) {
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;
	},
	"phCidNumContainer": function(opt) {
		var cidtype_id = $(opt.selector + ' option:selected').val();
		var tip = '';
		//校验合法性  身份证的合法性
		var checkedData = checkFn.validateCid(cidtype_id, opt.value,opt.minAge,opt.maxAge,opt.type);
		if(!checkedData.onOff) {
			
			tip = opt.value ?  checkedData.message : '证件号码不能为空';
			phContaine.checkTipInfor(opt.selector, checkedData.message, checkedData.onOff, opt.mark,opt.type);
			
			if(opt.subTip) {
				layer.msg(tip);
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}

		
		
		
		//验证成功
		if(!opt.subTip) {
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;
	},
	//校验出生日期
//	selector: '#applicant-birth',
//			value: value,
//			mark: true,
//			subTip: false
	"phBirthdayContainer": function(opt) {
		if(opt.value=="") {
			phContaine.checkTipInfor(opt.selector, '请选择出生日期', false, opt.mark);
			if(opt.subTip) {
				layer.msg('请选择出生日期');
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}else{
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
			// var data = checkFn.birth(opt.value);
			// if(!data.onOff) {
			// 	phContaine.checkTipInfor(opt.selector, data.message, data.onOff, opt.mark);
			// 	if(opt.subTip) {
			// 		layer.msg(data.message);
			// 		phContaine.subScrollTop($(opt.selector));
			// 	}
			// 	return false;
			// }
			// if(!opt.subTip) {
			// 	phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
			// }
			
		}
		//	phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		
		return true;	
	},
	"phBirthday": function(opt) {
		if(opt.value=="") {
			phContaine.checkTipInfor(opt.selector, '请选择出生日期', false, opt.mark);
			if(opt.subTip) {
				layer.msg('请选择出生日期');
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}else{
			//phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
			var data = checkFn.birthFn(opt.value,opt.min,opt.max);
			if(!data.onOff) {
				phContaine.checkTipInfor(opt.selector, data.message, data.onOff, opt.mark);
				if(opt.subTip) {
					layer.msg(data.message);
					phContaine.subScrollTop($(opt.selector));
				}
				return false;
			}
			if(!opt.subTip) {
				phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
			}
				
		}

		//	phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		
		return true;	
	},
	"insBirthdayContainer": function(opt) {
		//一：校验是否存在
		
		if(opt.value=="") {
			phContaine.checkTipInfor(opt.selector, '请选择出生日期', false, opt.mark);
			if(opt.subTip) {
				layer.msg('请选择出生日期');
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}else if(opt.age.indexOf("10")!=-1&&opt.age.indexOf("17")!=-1){

			phContaine.checkTipInfor(opt.selector, '您选择的套餐与证件类型不符，请重新选择证件类型', false, opt.mark);
			if(opt.subTip){
				layer.msg('您选择的套餐与证件类型不符，请重新选择证件类型');
				phContaine.subScrollTop($(opt.selector));
			}			
			return false;	
				
		}else{
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;	
	},
	phHouseAddressContainer:function(opt){
		if(opt.value==""){
			phContaine.checkTipInfor(opt.selector, '请填写房屋地址', false, opt.mark);
			if(opt.subTip) {
				layer.msg('请填写房屋地址');
				phContaine.subScrollTop($(opt.selector));
			}
			return false;
		}else{
			phContaine.checkTipInfor(opt.selector, '√', true, opt.mark);
		}
		return true;
	}
}