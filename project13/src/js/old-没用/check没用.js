import $ from "jquery";
var  checkFn={
	"checkNum":function(required,tip,ipt){
		var  val=ipt.val();
		var reNum=/^\d+$/;
		if(required&&val==""){
			alert(tip+"不能为空");
			return false;
			
		}
		if(reNum.test(val)){
			return true;
		}else{
			alert(tip+"必须为数字");
			return false;
		}
	},
	"checkusername":function(required,tip,ipt){
		var val=ipt.val();
		var strlength = 0;
		if(required&&val==""){
			alert(tip+"不能为空");
			return false;
		}
		strlength = val.length;
		for (var i = 0; i < val.length; i++) {
			if (val.charCodeAt(i) > 255) // 判断输入的是否是汉字，如果是汉字的话，则字符串长度加2
				strlength += 1;
		}
		if (strlength < 3) {
			alert(tip + "长度太短啦，再来一次！");
			return false;
		} else if (strlength > 30) {
			alert(tip + "长度太长啦，再来一次！");
			return false;
		} else {
			var uernameext = new RegExp("[`~!@%#$^&()=|{}'.:;',\\[\\]<>/?~！@#￥……&（）—|{}——【】‘；：”“'。，、？\\s]");
			if (uernameext.test(val)) { // 含有特殊字符
				alert(tip + "不能包含特殊字符，再来一次！");
				return false;
			}
		}
		return true;	
	},
	
	/*校验手机号码*/
	"checkPhone":function(required,tip, ipt){
		var val=ipt.val();
		var re = /^0*(86)*(13|15|14|18|17)\d{9}$/,
			req = /^\d*$/;
		var mobile = $.trim(ipt.val());
		if(required&&val==""){
			alert(tip+"不能为空");
			return false;
		}
		if (!re.test(mobile)) {
			if (req.test(mobile) && mobile.length < 11) {
				alert(tip + "不可少于11位，请正确填写！");
				return false;
			} else {
				alert(tip + "格式不对，请正确填写！");
				return false;
			}
		}
		return true;
	},
	//校验邮箱
	"checkEmail":function(required,tip,ipt){
		var val=ipt.val();
		if(required&&val==""){
			alert(tip+"不能为空");
			return false;
		}
		var emailext = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱正则
		if (!emailext.test(val)) {
			alert(tip + "格式错误");
			return false;
		}
		return true;
	},
	"checkCid":function(required,tip, ipt, cidTypeId){
		var val=ipt.val();		
		if(required&&val==""){
			alert(tip+"不能为空");
			return false;
		}
		if (!checkFn.validate(tip, ipt, cidTypeId)) {
			return false;
		}
		if (cidTypeId == "02" && val.length < 3) {
			alert("护照格式错误");
			return false;
		}
		if (cidTypeId == "03" && (val.length < 10 || val.length > 18)) {
			alert("军官证格式错误");
			return false;
		}
		if (cidTypeId == "05" && val.length < 8) {
			alert("港台同胞证格式错误");
			return false;
		}
		return true;
	},
	//校验证件号码
	"validate":function(tip, ipt,type){
		var str=ipt.val();
		var index;
		if (str.indexOf("x") > -1 || str.indexOf("X") > -1) {
			str = str.replace("x", "X");
		}
		/*
		 	01 身份证
		 	02 护照
		 	03 军官证
		 	05 港台同胞证
		 	
		 * */
		
		switch (type) {
		case "01":
			index = 0;
			break;
		case "02": 
			index = 1;
			break;
		case "03":
			index = 3;
			break;
		case "05":
			index = 3;
			break;
		case "07":
			index = 0;
			break; //户口本
		case "10":
			index = 4;
			break;
		}
	
		if (index == 0) {
			return !checkFn.checkcid(tip, str);
		} else {
			var valReg = [/(^\d{15}$)|(^\d{17}([0-9]|X)$)/, /^[a-zA-Z0-9]{3,21}$/, /^[a-zA-Z0-9]{10,18}$/, /^[a-zA-Z0-9]{8,21}$/, /^[a-zA-Z0-9]{3,21}$/];
			var reg = new RegExp(valReg[index]);
		
			if (reg.test(str)) {
				return true;
			} else {
				alert(tip+"格式不正确")
				return false;
			}
		}
	},
	"checkcid":function(tip, str, nubernmin, nubernmax, age_curTime){
		
		if (str.indexOf("x") > -1 || str.indexOf("X") > -1) {
			str = val.replace("x", "X");
		}
		var result = false;
		var cidext = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		//身份证正则
		if (!cidext.test(str) ||checkFn.checkidcard(str)) {
			result = true;
			alert(tip+"格式不正确");
		} /*else if (checkFn.xycodegz(val)) {
			result = true;
			alert("亲，您的户籍所在地不能投保此产品!");
		}*/
		return result;
	},
	"checkidcard":function(idcard){
		var result = false;
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
	
		var idcard,
			Y,
			JYM;
		var S,
			M;
		var idcard_array = new Array();
		idcard_array = idcard.split("");
		if (area[parseInt(idcard.substr(0, 2))] == null)
			result = true;
		var ereg = "";
		switch (idcard.length) {
		case 15:
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
				// 测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
				// 测试出生日期的合法性
			}
			if (ereg.test(idcard))
				result = false;
			else
				result = true;
			break;
		case 18:
			if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				// 闰年出生日期的合法性正则表达式
			} else {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				// 平年出生日期的合法性正则表达式
			}
			if (ereg.test(idcard)) {
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);
				if (M == idcard_array[17])
					result = false;
				else
					result = true;
			} else
				result = true;
			break;
		default:
			result = true;
			break;
		}
		return result;
	},
	"xycodegz":function(cid){
		var xycodeparam = cid.substr(0, 6);
		var biaoshi = false;
		if (xycodeparam == "110226") {
			biaoshi = true;
		}
		return biaoshi;
	},
	"getBirthByCid":function(iIdNo){
		var rel = {};
		var tmpStr = "";
		var sexStr = "";
		iIdNo = $.trim(iIdNo);
		if (iIdNo.length == 15) {
			tmpStr = iIdNo.substring(6, 12);
			tmpStr = "19" + tmpStr;
			tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
			sexStr = parseInt(iIdNo.substring(14, 1), 10) % 2 ? "男" : "女";
		} else {
			tmpStr = iIdNo.substring(6, 14);
			tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
			sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? "男" : "女";
		}
		rel.birth = tmpStr;
		rel.sex = sexStr;
		return rel;
	},
	"checkBirth":function(ipt){
		/*val 格式
		 2016-07-10
		*/
		var val=ipt.val();
		var iDate=val.split("-");
		
			year=val.split("-")[0],
			month=val.split("-")[1],
			day=val.split("-")[2];
		
		var str=iDate.join("");
		var re;
		
		//闰年	
		if(year%4==0||year%400==0){
			re = /^(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))$/;
		}else{
			re = /^(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))$/;
		}
		if(re.test(str)){
			return true;
		}else{
			return false;
		}
		
	},
	getEleByClass:function(parent,sClass){
		var ele=parent.getElementsByTagName("*"),
			arr=[],
			re=new RegExp("\\b"+sClass+"\\b");
		if(parent.getElementsByClassName){
			return parent.getElementsByClassName(sClass);
		}
		for(var i=0;i<ele.length;i++){
			if(re.test(ele[i].className)){
				arr.push(ele[i]);
			}
		}
		return arr;
	}
		
	
	
}




export {checkFn};


