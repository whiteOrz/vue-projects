	function checkData(data){
		//如果是证件类型  增加证件号的校验
		var pageData = data.wapInputs ;
        for(var i=0;i<pageData.length;i++){
            var app =pageData[i];
			var lable = app.tip ;
			var value = app.defaultValue ;
			if(!app.required){
				return true ;
			}
			if(app.id == "applicantName"  ){
				if(!checkusername(lable,value)){
					return false ;
				}
			}
			else if(app.id == "applicantId"){
				/*if(!isDefine(value)){
				 	alert("请选择投保人证件类型");  
					return false ;
				 }
				var cid = $("#cidnumber").val();
				if(!isDefine(cid)){
					alert("投保人证件号码不能为空！");	
					return false ;
				}
				checkCid(cid,value);*/
				if(!isDefine(value)){
					alert(lable + "不能为空！");
					return false ;
				}
				if(checkcid(value)){
					return false ;	
				}
			}
			else if (app.id == "applicantPhone"){
				if(!basicValidateMobile(value)){
					return false ;
				}
			}
			else if(app.id == "applicantEmail"){
				if(!checkEmail(value)){
					return false ;
				}
			}
			else if(app.id == "applicantProfession"){
				
			}
			else if(!isDefine(value)){
				 alert(app.lable+"不能为空！");
                return false;
			}
        }
        return true;
    }
	
	function checkPageInputData(data){
		var pageData = data.wapInputs ;
		for(var i = 0 ; i < pageData.length -1 ; i++){
			if(!checkPerData(pageData[i])){
				return false ;
			}
		}
		return true ;
	}
	
	function checkPerData(data){
		var checkData = "" ;
		if(!isDefine(data)){
			alert("数据错误！");
			return false ;
		}
		if(data.componentId == "wapApplicantInfo"){
			checkData = data.applicantInfo ;
		}else if(data.componentId == "wapInsuredInfo"){
			checkData = data.insuredInfo ;
		}else if(data.componentId == "wapBeneficiaryInfo"){
			checkData = data.wapInsuredRelationship ;
		}else{
			checkData = null ;
		}
		for(var i = 0 ; i < checkData.length ; i++){
			var per = checkData[i] ;
			var id = per.id ;
			var lable = per.tip ;
			var value = per.defaultValue ;
			if(!per.required){
				return true ;
			}
			if(id.indexOf('Name') > 0){
				if(!checkusername(lable,value)){
					return false ;
				}
			}
			else if(id.indexOf("IdType") > 0){
				if(!isDefine(value)){
				 	alert("请选择投保人证件类型");  
					return false ;
				 }
				var cid = $("#cidnumber").val();
				if(!isDefine(cid)){
					alert("证件号码不能为空！");	
					return false ;
				}
				checkCid(lable,cid,value);
				/*if(!isDefine(value)){
					alert(lable + "不能为空！");
					return false ;
				}
				if(checkcid(lable,value)){
					return false ;	
				}*/
			}
			else if(id.indexOf('Phone') > 0){
				if(!basicValidateMobile(lable,value)){
					return false ;
				}
			}
			else if(id.indexOf('Email') > 0){
				if(!checkEmail(lable,value)){
					return false ;
				}
			}
			/*else if(id.indexOf('Profession') > 0){
				alert(value);
				//校驗
				return false ;
			}*/
			else if(!isDefine(value)){
				 alert(lable+"不能为空！");
                return false;
			}
		}
		return true ;
	}
	
	function isDefine(value){
    if(value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined'){
        return false;
    }else{
        value = value+"";
        value = value.replace(/\s/g,"");
        if(value == ""){
            return false;
        }
        return true;
    }
}
	
	//校验姓名格式是否正确
    function checkusername(lable,name) {
        var strlength = 0;
        strlength = name.length;
        for ( var i = 0; i < name.length; i++) {
            if (name.charCodeAt(i) > 255) // 判断输入的是否是汉字，如果是汉字的话，则字符串长度加2
                strlength += 1;
        }
        if (strlength <= 0) {
            alert(lable + "不能为空！");
            return false;
        } else if (strlength < 3) {
            alert(lable +"长度太短啦，再来一次！");
            return false;
        } else if (strlength > 30) {
            alert(lable +"长度太长啦，再来一次！");
            return false;
        } else {
            var uernameext = new RegExp("[`~!@%#$^&()=|{}'.:;',\\[\\]<>/?~！@#￥……&（）—|{}——【】‘；：”“'。，、？\\s]");
            if (uernameext.test(name)) {	// 含有特殊字符
                alert(lable +"不能包含特殊字符，再来一次！");
                return false;
            }
        }
        return true;
    }
	
	function checkAddress(address){
        if(!checkInput(address,"通讯地址")){
            return false;
        }

        var strlength = 0;
        var re = /[\u4e00-\u9fa5]+/g;

        if(jq.trim(address) == "" || jq.trim(address).length < address.length){
            alert("通讯地址格式错误");
            return false;
        }

        var result = address.match(re);
        if (result != null) {
            for ( var i = 0; i < result.length; i++) {
                strlength += result[i].length;
            }
        }

        if (strlength < 6) {
            alert("通讯地址格式错误");
            return false;
        }

        return true;
    }
	
	
	function checkInput(content,title){
        var t = title || "";

        if(!isDefine(content)){
            alert(t + "不能为空");
            return false;
        }

        if(chkStr(content)){
            alert(t+"不能包含特殊字符");
            return false;
        }

        return true;
    }
	
	/*校验手机号码*/
    function basicValidateMobile(lable,phone_num) {
        var re = /^0*(86)*(13|15|14|18|17)\d{9}$/;
        var req = /^\d*$/;
        var mobile = $.trim(phone_num);
        if(mobile.length==0||mobile==null||mobile==undefined)
        {
            alert(lable + "不能为空");
            return false;
        }
        else if(!re.test(mobile))
        {
            if(req.test(mobile) && mobile.length < 11)
            {
                alert(lable + "不可少于11位，请正确填写！");
                return false;
            }
            else
            {
                alert(lable + "格式不对，请正确填写！");
                return false;
            }
        }
        return true;
    }
	
	function checkEmail(lable,email){
        if(!isDefine(email)){
            alert(lable + "不能为空");
            return false;
        }

        var emailext = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;	//邮箱正则
        if(!emailext.test(email)){
            alert( lable + "格式错误");
            return false;
        }

        return true;
    }

	function checkCid(cid,cidTypeId){
        if(!isDefine(cid)){
            alert("证件号码不能为空");
            return false;
        }

        if(!validate(cid,cidTypeId)){
            alert("证件格式错误");
            return false;
        }

        if(cidTypeId=="03" && cid.length<3){
            alert("护照格式错误");
            return false;
        }

        if(cidTypeId=="04" && (cid.length<10 || cid.length>18)){
            alert("军官证格式错误");
            return false;
        }

        if(cidTypeId=="05" && cid.length<8){
            alert("港台同胞证格式错误");
            return false;
        }

        return true;
    }
	
	function validate(str, type){
        if(str.indexOf("x") > -1 || str.indexOf("X") > -1){
            str = str.replace("x","X");
        }

        switch(type){
            case "01": type = 0;break;
            case "03": type = 1;break;
            case "04": type = 2;break;
            case "05": type = 3;break;
            case "07": type = 0;break;	//户口本
            case "10": type = 4;break;
        }

        if(type == 0){
            return !checkcid(str);
        }else{
            var valReg = [/(^\d{15}$)|(^\d{17}([0-9]|X)$)/, /^[a-zA-Z0-9]{3,21}$/, /^[a-zA-Z0-9]{10,18}$/, /^[a-zA-Z0-9]{8,21}$/, /^[a-zA-Z0-9]{3,21}$/];
            var reg = new RegExp(valReg[type]);
            if(reg.test(str)){
                return true;
            }else{
                return false;
            }
        }
    }
	
	 function checkcid(lable,cid, nubernmin, nubernmax, age_curTime) {
        if (cid.indexOf("x") > -1 || cid.indexOf("X") > -1) {
            cid = cid.replace("x", "X");
        }
        var result = false;
        var cidext = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        //身份证正则
        if (!cidext.test(cid) || checkidcard(cid)) {
            result = true;
            alert(lable + "格式错啦，再来一次！");
        } else if (xycodegz(cid)) {
            result = true;
            alert("亲，您的户籍所在地不能投保此产品!", "2000");
        }
        return result;
    }

    function checkidcard(idcard) {
        var result = false;
        var area = {
            11 : "北京",
            12 : "天津",
            13 : "河北",
            14 : "山西",
            15 : "内蒙古",
            21 : "辽宁",
            22 : "吉林",
            23 : "黑龙江",
            31 : "上海",
            32 : "江苏",
            33 : "浙江",
            34 : "安徽",
            35 : "福建",
            36 : "江西",
            37 : "山东",
            41 : "河南",
            42 : "湖北",
            43 : "湖南",
            44 : "广东",
            45 : "广西",
            46 : "海南",
            50 : "重庆",
            51 : "四川",
            52 : "贵州",
            53 : "云南",
            54 : "西藏",
            61 : "陕西",
            62 : "甘肃",
            63 : "青海",
            64 : "宁夏",
            65 : "新疆",
            71 : "台湾",
            81 : "香港",
            82 : "澳门",
            91 : "国外"
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
    }


    function xycodegz(cid) {
        var xycodeparam = cid.substr(0, 6);
        var biaoshi = false;
        if (xycodeparam == "110226") {
            biaoshi = true;
        }
        return biaoshi;
    }
