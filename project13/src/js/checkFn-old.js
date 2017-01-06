/*
 * 校验
 * 姓名 
 * 证件号码
 * 性别
 * 手机号码 
 * 电子邮箱
 * 是否合法
 * */
var checkFn = {
	//姓名
	"basicValidateName": function(name) {
		var re = /[0-9]+/;
		var  reChar=/[a-z]+/i;
		var strlength = 0;
		name = $.trim(name);
		strlength = name.length;
		
		if(name.lenth <= 0) {
			return {
				onOff: false,
				message: "姓名不能为空！"
			}
		} else if(name.length < 2) {
			return {
				onOff: false,
				message: "姓名不能少于2个字！"
			}
		} else if(name.length > 15) {
			return {
				onOff: false,
				message: "姓名不能大于15个字！"
			}
		} else {
			if(checkFn.validateSpec(name)) { // 含有特殊字符
				return {
					onOff: false,
					message: "姓名不能包含特殊字符！"
				}
			}
			if(re.test(name)) {
				return {
					onOff: false,
					message: "姓名不能包含数字！"
				}
			}
			if(reChar.test(name)) { 
				return {
					onOff: false,
					message: "姓名不能包含字母！"
				}
			}
		}
		return {
			onOff: true,
			message: "√"
		}
	},
	//姓名的特殊字符
	"validateSpec": function(str) {
		var re = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&（）—|{}——【】‘；：”“'。，、？]");
		for(var j = 0; j < str.length; j++) {
			var curchar = "";
			curchar = str.substr(j, 1);
			if(re.test(curchar)) {
				return true
			}
		}
		return false
	},
	"basicValidateMobile": function(mobile) {
		var re = /^0*(86)*(13|15|14|18|17)\d{9}$/;
		var req = /^\d*$/;

		var subNum = mobile.substr(3);
		var o = 0;

		if(mobile) {
			if($.trim(mobile) == "" || $.trim(mobile).length < mobile.length) {
				return {
					onOff: false,
					message: "手机号码不可填写空格，请仔细核对正确填写！"
				}
			} else {
				if(mobile.length != 11) {
					return {
						onOff: false,
						message: "手机号码格式不对，请正确填写！"
					}
				} else {
					if(!re.test(mobile)) {
						if(req.test(mobile) && mobile.length < 11) {
							return {
								onOff: false,
								message: "手机号码不可少于11位，请正确填写！"
							}
						} else {
							return {
								onOff: false,
								message: "手机号码格式不对，请正确填写！"
							}
						}
					} else {
						for(var i = 0; i < subNum.length - 1; i++) {
							var n = parseInt(subNum.charAt(i));
							var n1 = parseInt(subNum.charAt(i + 1));
							o += (n - n1);
						}

						if(Math.abs(o) == subNum.length - 1) {
							return {
								onOff: false,
								message: "手机号码格式不对，请正确填写！"
							}
						}

						return {
							onOff: true,
							message: "手机号正确"
						}
					}
				}
			}
		} else {
			return {
				onOff: false,
				message: "手机号码不能为空！"
			}
		}
	},
	"basicValidateEmail": function(email) {
		var re = new RegExp("^([a-zA-Z0-9]+[_|\\_|\\.|-|\\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.|-|\\-]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$");
		if(email.length > 50) {
			return {
				onOff: false,
				message: "电子邮件格式不正确，请仔细核对正确填写！"
			}
		}
		if(email) {
			if($.trim(email) == "" || $.trim(email).length < email.length) {
				return {
					onOff: false,
					message: "电子邮件不可填写空格，请仔细核对正确填写！"
				}

			} else {
				if(!re.test(email)) {
					return {
						onOff: false,
						message: "电子邮件格式不对，请正确填写！"
					}
				} else {
					return {
						onOff: true,
						message: "邮箱正确"
					}
				}
			}
		} else {
			return {
				onOff: false,
				message: "电子邮件不能为空！"
			}
		}
	},
	"basicValidatePassport": function(passport) {
		var re = /^[GE][0-9]{8}$/;

		if(re.test(passport)) {
			return true
		} else {
			return false;
		}

	},
	"basicValidateSoldier": function(val) {
		var re = /^[\u4e00-\u9fa5]{3,5}[0-9]{6,12}$/;
		if(re.test(val)) {
			return true;
		} else {
			return false;
		}

	},
	"basicValidateHMCode": function(val) {
		var re = /^[HM]{1}[0-9]{10}$/;
		if(re.test(val)) {
			return true;
		} else {
			return false;
		}
	},
	"validateCid": function(cid, val) {
		if(cid == "") {
			return {
				onOff: false,
				message: "请选择证件类型"
			}
		}
		
		
		if(val == "") {
			return {
				onOff: false,
				message: "证件号不能为空！"
			}
		}
		//身份证 
		if(cid == "01") {
			if(!checkFn.checkcid(val)) {
				return {
					onOff: false,
					message: "证件号码输入有误"
				}
			}
			if(!checkFn.birthRange(val)) {
				return {
					onOff: false,
					message: "投保人年龄应在18到65周岁之间"
				}
			}
		}
		//护照
		if(cid == "02") {
			if(val.length < 3) {
				return {
					onOff: false,
					message: "证件号码不能少于3个字符"
				}
			}
			if(!checkFn.basicValidatePassport(val)) {
				return {
					onOff: false,
					message: "证件号码输入有误"
				}
			}
		}
		//军官证
		if(cid == "03") {
			if(val.length < 9 || val.length > 17) {
				return {
					onOff: false,
					message: "证件号码为9-17个字符"
				}
			}
			if(!checkFn.basicValidateSoldier(val)) {
				return {
					onOff: false,
					message: "证件号码输入有误"
				}
			}
		}
		//港台同胞证
		if(cid == "05") {
			if(val.length < 11) {
				return {
					onOff: false,
					message: "证件号码不能少于11个字符"
				}
			}
			if(!checkFn.basicValidateHMCode(val)) {
				return {
					onOff: false,
					message: "证件号码输入有误"
				}
			}
		}
		return {
			onOff: true,
			message: "符合验证规则"
		}

	},

	"checkcid": function(cid) {
		return checkFn.checkidcard(cid);
	},
	"checkidcard": function(idcard) {
		var result = true;
		var area = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		};

		var idcard, Y, JYM;
		var S, M;
		var ereg = /a/;
		var idcard_array = new Array();
		idcard=idcard.toUpperCase();
		idcard_array = idcard.split("");
		if(area[parseInt(idcard.substr(0, 2))] == null)
			result = true;
		switch(idcard.length) {
			case 15:
				if((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
					console.log("if");
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
				} else {

					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
				}

				if(ereg.test(idcard)) {
					result = true;
				} else {
					result = false;
				}
				break;
			case 18:
				if(parseInt(idcard.substr(6, 4)) % 4 == 0 ||(parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
				} else {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/i; // 平年出生日期的合法性正则表达式
				}
				if(ereg.test(idcard)) {
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					if(M == idcard_array[17]) {
						result = true;
					} else {
						result = false;
					}
				} else {
					result = false;
				}
				break;
			default:
				result = false;
				break;
		}
		return result;
	},
	"birthRange": function(val) {
		var birthday,Y,M,D;
		if(val.length == 15) {
			Y="19"+val.substr(6, 2);
			M=val.substr(8, 2)-1;
			D=val.substr(10, 2)
			
		}
		if(val.length == 18) {
			Y=val.substr(6, 4);
			M=val.substr(10, 2)-1;
			D=val.substr(12, 2)
		}
		var birth = new Date(Y,M,D);
		var now = new Date();

		var year = now.getFullYear();
		var month = now.getMonth();
		var date = now.getDate();

		var birthYear = birth.getFullYear();
		var birthMonth = birth.getMonth();
		var birthDate = birth.getDate();
		var offsetYear = year - birthYear;

		if(offsetYear < 18) {
			//fail
			//alert("投保人年龄应在18到65周岁之间");
			return false;
		} else if(offsetYear == 18) {
			if(birthMonth > month) {
				//fail
				//alert("投保人年龄应在18到65周岁之间");
				return false;
			} else if(birthMonth == month) {
				if(birthDate > date) {
					//fail
					//alert("投保人年龄应在18到65周岁之间");
					return false;
				}
			}
		}

		if(offsetYear > 66) {
			//fail
			//  alert("投保人年龄应在18到65周岁之间");
			return false;
		} else if(offsetYear == 66) {
			if(birthMonth < month) {
				//fail
				// alert("投保人年龄应在18到65周岁之间");
				return false;
			} else if(birthMonth == month) {
				if(birthDate <= date) {
					//fail
					// alert("投保人年龄应在18到65周岁之间");
					return false;
				}
			}
		}
		return true;
	}
}