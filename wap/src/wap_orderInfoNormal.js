import $ from "jquery";
import {
    product
} from "../js/common";
import {
    EmailAutoComplete
} from "../js/emailAutoComplete";
import componentTable from "../data/componentTable";

var proUrl = product.proUrl;
var memberUrl = product.memberUrl;
var server_url = product.server_url;

var platform = "wap";
var productId = getLocVal("productId");
var applicationId = getLocVal("applicationId");
var applicationToken = getLocVal("applicationToken");

var duties = "";
var plans = getLocVal("liabilityContents");
if (plans) {
    plans = JSON.parse(plans);
    $.each(plans.liabilityContents, function(index, el) {
        var p = index ? "," : "";
        duties += p + el.liabilityId;
    });
    duties = duties.replace(/，/g, ",");
}

var minAge = getLocVal("minAge") || "18";
var maxAge = getLocVal("maxAge") || "65";

var insuredMinAge = getLocVal("insuredMinAge") || "";
var insuredMaxAge = getLocVal("insuredMaxAge") || "";

var addPersonList = {};
var returnObj = {};
var loginStatus = false; //false未登录 true登录

//var wap_inputs = require("../data/wap_inputs3");
var profession = require("../data/profession");
var postInputsKeys = {};
var client_ip = "";

$(function() {
    //pageInit(wap_inputs);
    $.ajax({
        url: proUrl + "productMetadata/" + productId + "/" + platform + "/inputs?duties=" + duties,
        type: "get",
        dataType: "json",
        success: function(data) {
            if (data.code == 0) {
                client_ip = data.client_ip;
                pageInit(data.data);
            }
        },
        error: function() {
            alertbox("网络繁忙，页面初始化失败！");
        }
    });
});

function pageInit(wap_inputs) {
    loadInfolist(wap_inputs);
    initRelation();

    product.tab('tab2', true);
    getLoginStatus();

    new EmailAutoComplete();
    pageEventInit();
    pageDataShow();
}

function checkIsInApp(){
    var isInApp = getLocVal("isInApp");
    if(isInApp == "1"){
        $(".header").hide();
        $("#insureTab").hide();
    }
}

function pageEventInit() {
    // 页面事件
    $("#addPerson").on('click', addPerson);
    $(".beneficiaryPerson").on("change", relationPersonChange);
    $(".applicantId ,.insuredId,.beneficiaryId").on("change", idChange);
    $(".insuredRelationship").on("change", relationshipChange);
    $(".beneficiaryRelationship").on("change", beneRelationshipChange);
    $(".wapInsure").on("click", buySubmitFn);
    $(".professSelect").click(function() {
        $(".applicantProfession").blur();
        $("#profession").show();
    });

    //benePerson
    $("#benePerson img").click(function() {
        var text = $("#legalInfo p").text();
        $("#alertBoxMasker h2").text("受益人说明");
        $("#alertBoxMasker p").text(text);
        $("#alertBoxMasker").show().animate({
            "opacity": "1"
        }, 400);
    });
}

function alertbox(message) {
    $("#alertBox").show();
    $("#alertBox").animate({
        "opacity": "1"
    }, 400);
    $("#alertBox p").text(message);

    setTimeout(function() {
        $("#alertBox").animate({
            "opacity": "0"
        }, 400, function() {
            $("#alertBox").hide();
        });
    }, 2000);
}

function loadComponent(componentId) {
    var template = "<div></div>";
    if (componentTable.table.indexOf(componentId) > -1) {
        template = require("../template/" + componentId);
    } else {
        alert("未知组件：" + componentId);
    }
    return template;
}

//加载页面显示组件
function loadInfolist(wap_inputs) {
    var currentCompId = "";
    wap_inputs.wapInputs.forEach(function(component) {
        var num = 0;

        var template = loadComponent(component.componentId);
        currentCompId = component.componentId;
        returnObj[currentCompId] = [];
        $("#wap_inputs").append(template);

        for (var key in component) {
            if ($.isArray(component[key])) {
                postInputsKeys[key] = [];
                var arr = component[key];
                var idTypeOptions = null;
                arr.forEach(function(input) {
                    postInputsKeys[key].push(input.tkId);
                    returnObj[currentCompId].push({
                        "id": input.tkId,
                        "lable": input.tkTip
                    });
                    var inputId = input.tkId;
                    if (inputId.indexOf("IdType") >= 0) {
                        idTypeOptions = input.tkOptions;
                        var obj = null;
                        if (key == "applicantInfo") {
                            obj = $(".applicantId").eq(0);
                        } else if (key == "insuredInfo") {
                            obj = $(".insuredId").eq(0);
                        } else if (key == "beneficiaryInfo") {
                            obj = $(".beneficiaryId").eq(0);
                        }
                        init_options(obj, idTypeOptions);
                        return;
                    }

                    var inputTemp = loadComponent(input.componentId);
                    inputTemp = inputTemp.replace("$lable", input.tkLable);
                    inputTemp = inputTemp.replace("$placeholder", input.tkDesc);
                    inputTemp = inputTemp.replace("$tkDefaultValue", input.tkDefaultValue);

                    var inputObj = $(inputTemp);
                    var attrId = inputObj.find("p input");
                    if (!isDefine(attrId.attr("id"))) {
                        attrId.addClass(inputId);
                    }
                    var selectObj = inputObj.find("select").addClass(inputId);
                    if ($.type(input.tkOptions) == "object") {
                        if (inputId.indexOf("Profession") >= 0) {
                            //initProfession(input.tkOptions);
                            initProfession(profession);
                        } else {
                            var options = input.tkOptions;
                            if (inputId == "insuredRelationship") {
                                var insuredRela = getLocVal("insuredRelationship");
                                if (insuredRela) {
                                    options = JSON.parse(insuredRela);
                                }
                            }
                            init_options(selectObj, options);
                        }
                    }
                    if (inputId.indexOf("Id") == (inputId.length - 2)) {
                        init_options(selectObj, idTypeOptions);
                    }
                    $("." + currentCompId).eq(num).append(inputObj);
                    if (inputId.indexOf("Birth") >= 0) {
                        if (inputId.indexOf("applicant") >= 0) {
                            initPolDate(inputId);
                        } else {
                            initChildDate(inputId);
                        }
                    }
                    if (inputId.indexOf("applicantArea") >= 0) {
                        initArea(input.tkOptions, client_ip);
                    }

                    if (inputId.indexOf("houseArea") >= 0) {
                        initHouseArea();
                    }
                });
                addPersonList[currentCompId] = $("." + currentCompId).eq(num).html();
            }
        }
    });
}

function initRelation() {
    var $insRela = $(".tkinsuredRelationship");
    var data = "01";
    if ($insRela.find("select").length) {
        data = $insRela.find("select").val();
    } else {
        data = $insRela.find("div").attr("value");
    }

    if (data == "01") {
        $(".tkInsuredInfo").children().hide().first().show();
    } else if (data == "40") {
        $(".tkapplicantProfession").parent().parent().hide();
    }
}

function getLoginStatus() {
    $.ajax({
        url: memberUrl + "member?function_code=checkLoginStatus",
        type: "get",
        dataType: "json",
        success: function success(data) {
            if (data.result == "0000") {
                var member = getLocVal("yonghuxinxi");
                if (isDefine(member)) {
                    member = JSON.parse(member);
                }

                var sid = getLocVal("memberid");
                var token = getLocVal("mfpd_sign");

                if (!isDefine(sid) && member) {
                    sid = member.member_sid;
                    setLocVal("memberid", sid);
                }

                if (!isDefine(token) && member) {
                    token = member.token;
                    setLocVal("mfpd_sign", token);
                }

                if (sid && token) {
                    loginStatus = true;
                    $("#insureTab").hide();
                    setMemberInfo(sid, token);
                } else {
                    yazheng();
                    loginStatus = false;
                    $("#insureTab").show();
                    $(".code").click(yazheng);
                    $(".btn-log").click(login);
                }
            } else {
                yazheng();
                loginStatus = false;
                $("#insureTab").show();
                $(".code").click(yazheng);
                $(".btn-log").click(login);

                clearLocVal("yonghuxinxi");
                clearLocVal("memberid");
                clearLocVal("mfpd_sign");
            }
            checkIsInApp();
        },
        error: function error(_error) {
            yazheng();
            $(".code").click(yazheng);
            $(".btn-log").click(login);
            checkIsInApp();
        }
    });
}

function yazheng() {
    var severimg = memberUrl + 'image?' + Math.random();
    $('.code').css({
        "background-image": "url(" + severimg + ")",
        "background-size": "contain"
    });
}

function login() {
    var membername = $("#longinName").val();
    var password = $("#loginPassword").val();
    var mark = $("#loginCode").val();

    if (membername == '') {
        alertbox('用户名不能为空');
        return;
    }
    if (password == '') {
        alertbox('密码不能为空');
        return;
    }
    if (mark == '') {
        alertbox('验证码不能为空');
        return;
    }

    var url = memberUrl + "member?function_code=login&login_type=0";
    $.ajax({
        url: url + "&membername=" + membername + "&password=" + password + "&mark=" + mark,
        dataType: "json",
        type: "get",
        success: function(data) {
            if (data.result == '0000') {
                loginStatus = true;

                setLocVal("title", data.info.member_name);
                setLocVal("username", data.info.member_name);
                setLocVal("memberid", data.info.member_sid);
                setLocVal("mfpd_sign", data.info.token);
                setLocVal("yonghuxinxi", JSON.stringify(data.info));
                setMemberInfo(data.info.member_sid, data.info.token);

                $("#loginContent").hide();
                $("#content").show();
                product.tab('tab2', false);
                $("#insureTab").hide();
            } else {
                alertbox(data.errordesc);
                yazheng();
            }
        },
        error: function(err) {
            alertbox("网络繁忙，登录失败！");
        }
    });
}

function addPerson() {
    var parentObj = $(this).parents(".list .item");
    var closestObj = $(this).closest("li");
    var currClass = parentObj.attr("class").split(" ")[1];
    var div = $("<div class='list tm10'><ul class='item " + currClass + "'></ul></div>");
    div.find("ul").append($(addPersonList[currClass]));
    $("#wap_inputs").append(div);

    //给新增元素绑定事件
    $(".insuredRelationship").on("change", relationshipChange);
    $(".applicantId ,.insuredId,.beneficiaryId").on("change", idChange);
}

function relationPersonChange() {
    var value = $(this).val();
    var parentObj = $(this).parents(".list .item");
    var infolist = parentObj.find("li:not(#benePerson)");
    var beneRelationship = $(".beneficiaryRelationship").val();
    if (value == product.benePerson["本人"]) { //本人
        infolist.hide();
        $("#legalInfo").show();
    } else {
        infolist.show();
        if (beneRelationship == product.beneRelation["本人"]) {
            $(".beneficiaryRelationship").parents(".list .item").find("li:not(#benePerson,.beneRelation)").hide();
        }
        $("#legalInfo").hide();
        parentObj.find(".otherType").hide();
    }
}

function relationshipChange() {
    var value = $(this).val();
    var parentObj = $(this).parents(".list .item");
    var insuredlist = parentObj.find("li:not(.insRelation,#insPerson)");
    if (value == "01") { //本人 被保人模块
        insuredlist.hide();
    } else {
        if (value == "40") {
            $(".tkapplicantProfession").parent().parent().hide();
        }
        insuredlist.show();
        $("#insPerson").hide();
        parentObj.find(".otherType").hide();
    }
}

function beneRelationshipChange() {
    var value = $(this).val();
    var parentObj = $(this).parents(".list .item");
    var insuredlist = parentObj.find("li:not(#benePerson,#legalInfo)");
    if (value == "01") { //本人 被保人模块
        insuredlist.hide();
    } else {
        insuredlist.show();
        parentObj.find(".otherType").hide();
    }
    $(this).parents("li").show();
}

function idChange() {
    var IdType = $(this).val();
    var parentObj = $(this).parents(".list .item");
    var closestObj = $(this).closest("li");

    if (IdType == "01") {
        parentObj.find(".otherType").hide();
        closestObj.find("p:eq(0)").show();
        closestObj.find("p:eq(1)").hide();
    } else if (IdType == "99") {
        parentObj.find(".otherType").eq(1).show();
        parentObj.find(".otherType").eq(0).hide();
        initChildDate("idDate");
        closestObj.find("p").eq(0).hide();
        closestObj.find("p").eq(1).show();
    } else {
        parentObj.find(".otherType").show();
        closestObj.find("p:eq(0)").show();
        closestObj.find("p:eq(1)").hide();
    }
}

function buySubmitFn() {
    var inputsData = getPostInputsData();
    if (!checkAllInputs(inputsData)) {
        return;
    }

    if (this.unSubmit) {
        alertbox("请阅读并认可重要声明！");
        return false;
    }

    _smq1('投保流程_填写个人信息', '确认提交');
    _smq2('确认提交');

    var postData = {};
    postData.platform = platform;
    postData.applicationToken = applicationToken;
    postData.processHandler = "property";
    postData.checkCode = "";
    postData.inputs = inputsData;

    var member = getLocVal("yonghuxinxi");
    if (isDefine(member)) {
        member = JSON.parse(member);
    }

    var sid = getLocVal("memberid");
    var token = getLocVal("mfpd_sign");

    if (!isDefine(sid) && member) {
        sid = member.member_sid;
    }

    if (!isDefine(token) && member) {
        token = member.token;
    }

    if (sid && token) {
        postData.memberId = sid;
        postData.memberToken = token;
    }

    var healthFlag = $("#applicantHealth").attr("tkDefaultValue");
    $.ajax({
        url: proUrl + "application/" + applicationId + "/inputs",
        type: "post",
        dataType: "json",
        data: JSON.stringify(postData)
    }).done(function(data) {
        savePageData();
        if (data.code == 0) {
            if (healthFlag == "true") { //有健康告知
                location.href = server_url + "/product/wap/insure/healthinform.html";
            } else {
                location.href = server_url + "/product/wap/insure/pay.html";
            }
        } else {
            if (healthFlag != "true") {
                setLocVal("errorMsg", data.message);
                location.href = server_url + "/product/wap/insure/fail.html";
            }
        }
    }).fail(function(error) {
        alertbox("网络繁忙，请稍后再试！");
    });
}

function checkAllInputs(inputs) {
    if (inputs.applicantInfo) {
        var app = inputs.applicantInfo;
        var label = "投保人";
        if (!checkusername(label, app.applicantName)) {
            return false;
        }

        if (!checkInputCid(label, app.applicantId, app.applicantIdType)) {
            return false;
        }

        if (app.applicantIdType != "01" && app.applicantGender == "0") {
            alertbox("投保人性别不能为空");
            return false;
        }

        var insuredRela = "";
        if (inputs.insuredInfo) {
            insuredRela = inputs.insuredInfo[0].insuredRelationship;
            if (insuredRela == "01") {
                minAge = insuredMinAge;
                maxAge = insuredMaxAge;
            } else {
                minAge = getLocVal("minAge") || "18";
                maxAge = getLocVal("maxAge") || "65";
            }
        }

        if (!checkApplicantAge(app)) {
            return false;
        }

        if (!basicValidateMobile(label, app.applicantPhone)) {
            return false;
        }

        if (!checkEmail(label, app.applicantEmail)) {
            return false;
        }

        if ($(".tkapplicantArea").length) {
            if (!isDefine(app.applicantProvince)) {
                alertbox("投保地区未选择！");
                return false;
            }
        }

        if ($(".tkhouseArea").length) {
            if (!isDefine(app.applicantProvince)) {
                alertbox("房屋地区未选择！");
                return false;
            }
        }

        if ($(".tkapplicantAddressDetails").length) {
            if (!isDefine(app.applicantAddressDetails)) {
                alertbox("房屋地址不能为空！");
                return false;
            }
        }

        if ($(".tkapplicantProfession").length && insuredRela != "40") {
            if (!isDefine(app.applicantProfession)) {
                alertbox("投保人职业未选择！");
                return false;
            }
        }
    } else {
        alertBox("投保人信息错误!");
        return false;
    }

    if (inputs.insuredInfo) {
        if (inputs.insuredInfo.length == 0) {
            alertBox("被保人信息错误!");
            return false;
        }

        var ins = inputs.insuredInfo[0];
        var appInfo = inputs.applicantInfo;
        if (ins.insuredRelationship == "01") {
            ins.insuredName = appInfo.applicantName;
            ins.insuredIdType = appInfo.applicantIdType;
            ins.insuredId = appInfo.applicantId;
            ins.insuredGender = appInfo.applicantGender;
            ins.insuredBirth = appInfo.applicantBirth;
            ins.insuredPhone = appInfo.applicantPhone;
            ins.insuredEmail = appInfo.applicantEmail;
        } else {
            var label2 = "被保人";
            if (!checkusername(label2, ins.insuredName)) {
                return false;
            }

            if (ins.insuredName == appInfo.applicantName) {
                alertbox("被保人与投保人姓名相同");
                return false;
            }

            if (!checkInputCid(label2, ins.insuredId, ins.insuredIdType)) {
                return false;
            }

            if (ins.insuredId == appInfo.insuredId) {
                alertbox("被保人与投保人证件号码相同");
                return false;
            }

            if (ins.insuredIdType != "01" && ins.insuredGender == "0") {
                alertbox("被保人性别不能为空");
                return false;
            }

            if (ins.insuredIdType == "99") {
                ins.insuredBirth = ins.insuredId;
                if (getAge(ins.insuredBirth) > 2) {
                    alertbox("被保人年龄小于2岁时，证件类型才能选择出生日期");
                    return false;
                }
            }

            //被保人年龄校验
            if (!checkInsuredAge(ins)) {
                return false;
            }
        }
    } else {
        alertBox("被保人信息错误!");
        return false;
    }

    var appName = inputs.applicantInfo.applicantName;
    var insName = inputs.insuredInfo[0].insuredName;
    setLocVal("applicantName", appName);
    setLocVal("insuredName", insName);

    return true;
}

function getPostInputsData() {
    var inputs = {};

    $.each(postInputsKeys, function(key, postInputs) {
        var postData = {};
        $.each(postInputs, function(index, name) {
            if (name == "applicantHealth") {
                return;
            }

            var clsName = ".tk" + name;
            if (name == "applicantArea") {
                var code = $(clsName).attr("areacode");
                if (isDefine(code)) {
                    code = code.split(",");
                    postData.applicantProvince = code[0];
                    postData.applicantCity = code[1];
                    return;
                }
            }

            if (name == "applicantProfession") {
                postData[name] = $(clsName).attr("procode");
                return;
            }

            if (name == "insuredRelationship") {
                var data = "01";
                if ($(clsName).find("select").length) {
                    data = $(clsName).find("select").val();
                } else {
                    data = $(clsName).find("div").attr("value");
                }
                postData[name] = data;
                return;
            }

            if (name == "insuredId") {
                postData[name] = $(".tkinsuredId:visible").val()
                return;
            }

            if (name == "houseArea") {
                var code = $(clsName).attr("areacode");
                var names = $(clsName).val();
                if (isDefine(code)) {
                    code = code.split(",");
                    postData.applicantProvince = code[0];
                    postData.applicantCity = code[1];
                    postData.applicantCounty = code[2];
                }
                if (isDefine(names)) {
                    names = names.split(" ");
                    postData.applicantProvinceName = names[0];
                    postData.applicantCityName = names[1];
                    postData.applicantCountyName = names[2];
                }
                return;
            }

            postData[name] = $(clsName).val();
        });

        if (key == "applicantInfo") {
            inputs[key] = postData;
        } else if (key == "insuredInfo") {
            postData.beneficiaryLegal = "true";
            postData.beneficiaryInfo = [];
            inputs[key] = [postData];
        }
    });

    return inputs;
}

function checkInsuredAge(insured) {
    if (insuredMinAge == "" || insuredMaxAge == "") {
        return true;
    }

    var birthday = "";
    if (insured.insuredIdType == "01") {
        birthday = getBirthByCid(insured.insuredId).birth;
    } else {
        if (insured.insuredBirth == "") {
            alertbox("被保人出生日期不能为空");
            return false;
        }
        birthday = insured.insuredBirth;
    }

    var birth = new Date(birthday);
    var errorMessage = "被保人年龄应在" + insuredMinAge + "到" + insuredMaxAge + "之间";

    if (insuredMinAge.indexOf("天") > -1) {
        var insuredMinAgeNum = insuredMinAge.replace(/[\u4e00-\u9fa5]+/g, "");
        var dayNum = parseInt(insuredMinAgeNum);
        dayNum = dayNum * 24 * 60 * 60 * 1000;
        if (Date.now() - birth < dayNum) {
            alertbox(errorMessage);
            return false;
        }
    } else {
        var min = parseInt(insuredMinAge);
        if (!compareBirth(birthday, min, 1)) {
            alertbox(errorMessage);
            return false;
        }
    }

    var max = parseInt(insuredMaxAge) + 1;
    if (!compareBirth(birthday, max, 0)) {
        alertbox(errorMessage);
        return false;
    }

    return true;
}

function checkApplicantAge(applicant) {
    var birthday = "";
    if (applicant.applicantIdType == "01") {
        birthday = getBirthByCid(applicant.applicantId).birth;
    } else {
        if (applicant.applicantBirth == "") {
            alertbox("投保人出生日期不能为空");
            return false;
        }
        birthday = applicant.applicantBirth;
    }

    var min = parseInt(minAge);
    var max = parseInt(maxAge);
    var errorMessage = "投保人年龄应在" + min + "到" + max + "周岁之间";
    if (max >= 200) {
        errorMessage = "投保人年龄应大于" + min + "周岁";
    }
    max++;
    if (!compareBirth(birthday, min, 1)) {
        alertbox(errorMessage);
        return false;
    }

    if (!compareBirth(birthday, max, 0)) {
        alertbox(errorMessage);
        return false;
    }

    return true;
}

function compareBirth(brithStr, ageData, isMin) {
    var birth = new Date(brithStr);
    var now = new Date();
    now.setDate(now.getDate());

    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();

    var birthYear = birth.getFullYear();
    var birthMonth = birth.getMonth();
    var birthDate = birth.getDate();
    var offsetYear = year - birthYear;

    if (isMin) {
        if (offsetYear < ageData) {
            //fail
            return false;
        } else if (offsetYear == ageData) {
            if (birthMonth > month) {
                //fail
                return false;
            } else if (birthMonth == month) {
                if (birthDate > date) {
                    //fail
                    return false;
                }
            }
        }
    } else {
        if (offsetYear > ageData) {
            //fail
            return false;
        } else if (offsetYear == ageData) {
            if (birthMonth < month) {
                //fail
                return false;
            } else if (birthMonth == month) {
                if (birthDate <= date) {
                    //fail
                    return false;
                }
            }
        }
    }

    return true;
}

/*证件号证件类型特殊处理*/
function checkInputCid(lable, cid, cidtype) {
    if (!isDefine(cidtype)) {
        alertbox(lable + "请选择证件类型");
        return false;
    }

    if (!isDefine(cid)) {
        alertbox(lable + "证件号码不能为空！");
        return false;
    }
    if (!checkCid(lable, cid, cidtype)) {
        return false;
    }

    return true;
}

/*初始化下拉框选项*/
function init_options(selectObj, options) {
    if (options.province) { //地区数据就不应该进来
        return;
    }

    var oArray = [];
    for (var key in options) {
        oArray.push({
            key: key,
            value: options[key]
        });
    }

    if (oArray.length > 1) {
        oArray.sort(function(p1, p2) {
            var num1 = parseInt(p1.value);
            var num2 = parseInt(p2.value);
            return num1 - num2;
        });

        options = {};
        $.each(oArray, function(index, el) {
            options[el.key] = el.value;
        });

        selectObj.empty();
        var optionStr = "";
        for (var key in options) {
            if (options[key] == "01") {
                optionStr += "<option value='" + options[key] + "' selected>" + key + "</option>";
            } else {
                optionStr += "<option value='" + options[key] + "'>" + key + "</option>";
            }
        }
        selectObj.html(optionStr);
    } else if (oArray.length == 1) {
        var parent = selectObj.parent();
        var div = '<div value="' + oArray[0].value + '">' + oArray[0].key + '</div>';
        parent.html(div);
    }
}

/*获取指定日期*/
function getDate(year, month, day) {
    var date = new Date();
    Date.prototype.addDay = function(num) {
            if (!isNaN(num)) this.setDate(this.getDate() + parseInt(num));
            return this;
        } //给日期原型加个方法
    date = date.addDay(day);
    var fullYear = date.getFullYear() + year;
    var month = (date.getMonth() + 1) + month;
    var day = date.getDate();
    var retStr = fullYear + "-" + toTwo(month) + "-" + toTwo(day);
    return retStr;
}

function initPolDate(id) {
    var selectDate = new MobileSelectDate();
    selectDate.init({
        trigger: '.' + id,
        value: "1990-01-01"
    });
}

function initChildDate(id) {
    var selectDate = new MobileSelectDate();
    selectDate.init({
        trigger: '.' + id,
        value: '2010-01-01'
    });
}

/*投保地区初始化*/
function initArea(areaData, ip) {
    if (!isDefine(areaData)) {
        return;
    }

    // 根据客户所在IP获取客户所在地区
    //ip = "119.40.48.4";
    if (ip) {
        var script = "<script src='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=jsonp&ip=" + ip + "'/>";
        $("head").append($(script));
        setTimeout(function() {
            if (remote_ip_info) {
                var province = remote_ip_info["province"];
                var city = remote_ip_info["city"];
                setCurrentArea(province, city, areaData);
            }
        }, 500);
    }

    //applicantArea
    var selectArea = new MobileSelectArea();
    sortArea(areaData);

    selectArea.init({
        trigger: $('.applicantArea'),
        level: 2,
        data: areaData
    });
}

function initHouseArea() {
    var url = proUrl + "element/city";
    var selectArea2 = new MobileSelectArea2();
    selectArea2.init({
        trigger: $('.houseArea'),
        level: 3,
        url: url
    });
}

function setCurrentArea(province, city, areaData) {
    var pData = null;
    for (var pName in areaData.province) {
        if (pName.indexOf(province) > -1) {
            pData = {
                name: pName,
                code: areaData.province[pName]
            };
            break;
        }
    }

    var cData = null;

    for (var cName in areaData.city) {
        var subCity = areaData.city[cName];
        if (cData) {
            break;
        }

        for (var subKey in subCity) {
            var subName = subCity[subKey];
            if (subName.indexOf(city) > -1) {
                cData = {
                    name: subName,
                    code: subKey
                };
                break;
            }
        }
    }

    if (pData && cData) {
        $(".applicantArea").val(pData.name + " " + cData.name).attr("areacode", pData.code + "," + cData.code);
    }
}

function sortArea(areaData) {
    var pData = areaData.province;
    var pArray = [];
    for (var key in pData) {
        pArray.push({
            key: key,
            value: pData[key]
        });
    }

    pArray.sort(function(p1, p2) {
        var num1 = parseInt(p1.value);
        var num2 = parseInt(p2.value);
        return num1 - num2;
    });

    areaData.province = {};
    $.each(pArray, function(index, el) {
        areaData.province[el.key] = el.value;
    });
}

/*初始化职业接口*/
function initProfession(professionOptions) {
    var valList = professionOptions.value;
    var descList = professionOptions.desc;
    var desc_typeList = professionOptions.desc_type;

    var professionHtml = "";
    var professionInformHtml = "";

    $.each(valList, function(key, value) {
        var descs = descList[value].split(";");
        var desc_type = desc_typeList[value];

        professionHtml += '<li proCode="' + value + '">' + key + "</li>";

        var content = "";
        if (desc_type == "不限") {
            content = "所选职业类别下所有职业都能投保";
        } else if (desc_type == "不含") {
            content = "所选职业类别下以下职业不能投保";
        } else if (desc_type == "仅限") {
            content = "所选职业类别下只有以下职业可以投保";
        } else {
            content = "错误";
        }
        professionInformHtml += "<article><h3>职业告知<br><span>" + content + "</span></h3>";

        var ol = "<ol>";
        if (descList[value]) {
            $.each(descs, function(index, el) {
                ol += "<li>" + (index + 1) + "、" + el + "</li>";
            });
            ol += "</ol>";
        }
        professionInformHtml += ol + "</article>";
    });

    $("#professionList").html(professionHtml);
    $("#professionInformList").html(professionInformHtml);

    $("#professionList").children().eq(0).addClass("active");
    $("#professionInformList article").eq(0).show();

    $("#professionList").children().on("click", function() {
        $(this).addClass('active').siblings().removeClass('active');
        $("#professionInformList article").hide().eq($(this).index()).show();
    });

    $("#profession .icon-back,.occup-btn input").on("click", function() {
        $("#profession").hide();

        if (this.value == "确定") {
            var selli = $("#professionList li.active");
            var text = selli.text();
            var code = selli.attr("proCode");
            $(".applicantProfession").val(text);
            $(".applicantProfession").attr("proCode", code);
        }
    });
}

/*初始化页面信息  用于回显 数据带出*/
function initPageInfo(id, value, perData, IdType) {
    if (id.indexOf("IdType") >= 0) {
        IdType = perData[id];
        return IdType;
    } else if (id.indexOf("insuredRelationship") >= 0) {
        var parentObj = $("#" + id).parents(".list .item");
        var insuredlist = parentObj.find("li:not(:first)");
        if (value == "01") { //本人 被保人模块
            insuredlist.hide();
        } else {
            insuredlist.show();
            parentObj.find(".otherType").hide();
        }
    } else if (id.indexOf("Id") == (id.length - 2)) {
        var parentObj = $("#" + id).parents(".list .item");
        var closestObj = $("#" + id).closest("li");
        closestObj.find("input").val(value);
        $("#" + id).val(IdType);
        if (IdType == "01") {
            var birthSex = getBirthByCid(value);
            parentObj.find(".birth").val(birthSex.birth);
            parentObj.find(".gender").val(birthSex.sex == "男" ? "0" : "1");
            parentObj.find(".otherType").hide();
        } else if (IdType == "06") {
            parentObj.find(".birth").val(value);
            parentObj.find(".otherType").eq(0).show();
            parentObj.find(".otherType").eq(1).hide();
            closestObj.find("p").eq(0).hide();
            closestObj.find("p").eq(1).show();
        } else {
            parentObj.find(".otherType").show();
        }
    } else {
        $("#" + id).val(value);
    }
}

/*判断元素是否为空*/
function isDefine(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined') {
        return false;
    } else {
        value = value + "";
        value = value.replace(/\s/g, "");
        if (value == "") {
            return false;
        }
        return true;
    }
}

//根据出生日期获取年龄
function getAge(birthday) {
    var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false
    };
    var birth = new Date(r[1], r[3] - 1, r[4]);
    if (birth.getFullYear() == r[1] && (birth.getMonth() + 1) == r[3] && birth.getDate() == r[4]) {
        var today = new Date();
        var age = today.getFullYear() - r[1];

        if (today.getMonth() > birth.getMonth()) {
            return age;
        }
        if (today.getMonth() == birth.getMonth()) {
            if ((today.getDate() + 1) >= birth.getDate()) {
                return age;
            } else {
                return age - 1;
            }
        }
        if (today.getMonth() < birth.getMonth()) {
            return age - 1;
        }
    }
    return age;
}

/*小于10的数字前补零*/
function toTwo(n) {
    return n < 10 ? '0' + n : '' + n;
}

//校验姓名格式是否正确
function checkusername(lable, name) {
    var strlength = getInputLength(name);
    if (strlength <= 0) {
        alertbox(lable + "姓名不能为空！");
        return false;
    }

    if (strlength < 3) {
        alertbox(lable + "姓名长度太短");
        return false;
    }

    if (strlength > 30) {
        alertbox(lable + "姓名长度太长");
        return false;
    }

    var test1 = /[\|]|[&]|[_]|[;]|["]|[%]|[@]|[']|["]|[\\']|[\\"]|[<]|[>]|[(]|[)]|[\+]|[CR]|[LF]|[,]|[\\]|[\r]|[\n]|[\t]/g;
    var test2 = new RegExp("[`~!@#$^&()=|{}':;',\\[\\].<>/?~！@#￥……&（）—|{}——【】‘；：”“'。，、？]"); //姓名正则
    if (test1.test(name) || test2.test(name)) {
        alertbox(lable + "姓名不能包含特殊字符");
        return false;
    }

    var test3 = /\d+/g;
    var test4 = /\w/g;
    if (test3.test(name) || test4.test(name)) {
        alertbox(lable + "姓名不能包含数字或字母");
        return false;
    }
    return true;
}

function getInputLength(inputStr) {
    var strlength = inputStr.length;
    for (var i = 0; i < inputStr.length; i++) {
        if (inputStr.charCodeAt(i) > 255) { // 判断输入的是否是汉字，如果是汉字的话，则字符串长度加2
            strlength += 1;
        }
    }
    return strlength;
}

function checkAddress(address) {
    if (!checkInput(address, "通讯地址")) {
        return false;
    }

    var strlength = 0;
    var re = /[\u4e00-\u9fa5]+/g;

    if ($.trim(address) == "" || $.trim(address).length < address.length) {
        alertbox("通讯地址格式错误");
        return false;
    }

    var result = address.match(re);
    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            strlength += result[i].length;
        }
    }

    if (strlength < 6) {
        alertbox("通讯地址格式错误");
        return false;
    }

    return true;
}

function checkInput(content, title) {
    var t = title || "";

    if (!isDefine(content)) {
        alertbox(t + "不能为空");
        return false;
    }

    if (chkStr(content)) {
        alertbox(t + "不能包含特殊字符");
        return false;
    }

    return true;
}

/*校验手机号码*/
function basicValidateMobile(lable, phone_num) {
    var re = /^0*(86)*(13|15|14|18|17)\d{9}$/;
    var req = /^\d*$/;
    var mobile = $.trim(phone_num);
    if (mobile.length == 0 || mobile == null || mobile == undefined) {
        alertbox(lable + "手机号码不能为空");
        return false;
    } else if (!re.test(mobile)) {
        if (req.test(mobile) && mobile.length < 11) {
            alertbox(lable + "手机号不可少于11位，请正确填写！");
            return false;
        } else {
            alertbox(lable + "手机号格式不对，请正确填写！");
            return false;
        }
    }

    var subNum = phone_num.substr(3);
    var o = 11;
    for (var i = 0; i < subNum.length - 1; i++) {
        var n = parseInt(subNum.charAt(i));
        var n1 = parseInt(subNum.charAt(i + 1));
        var offset = n - n1;

        if (Math.abs(offset) != 1) {
            return true;
        }

        if (o == 11) {
            o = offset;
        } else {
            if (o != offset) {
                return true;
            }
            o = offset;
        }
    }

    if (Math.abs(o) == 1) {
        alertbox("手机号码不能连续！");
        return false;
    }

    return true;
}

function checkEmail(lable, email) {
    if (!isDefine(email)) {
        alertbox(lable + "电子邮箱不能为空");
        return false;
    }

    if (email.length > 50) {
        alertbox(lable + "电子邮箱长度错误");
        return false;
    }

    var emailext = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱正则
    if (!emailext.test(email)) {
        alertbox(lable + "电子邮箱格式错误");
        return false;
    }

    return true;
}

function checkCid(lable, cid, cidTypeId) {
    if (!validate(lable, cid, cidTypeId)) {
        return false;
    }

    var len = getInputLength(cid);

    var strTest = /^[GE][0-9]{8}$/;
    if (cidTypeId == "02") {
        if (len != 9 || !strTest.test(cid)) {
            alertbox(lable + "护照格式错误");
            return false;
        }
    }

    strTest = /^[\u4e00-\u9fa5]{3,5}[0-9]{6,12}$/;
    if (cidTypeId == "03") {
        if (cid.length < 9 || cid.length > 17 || !strTest.test(cid)) {
            alertbox(lable + "军人证格式错误");
            return false;
        }
    }

    strTest = /^[HM]{1}[0-9]{10}$/;
    if (cidTypeId == "05") {
        if (len != 11 || !strTest.test(cid)) {
            alertbox(lable + "港台同胞证格式错误");
            return false;
        }
    }
    return true;
}

function validate(lable, str, type) {
    str = str.replace("x", "X");
    if (type == "01") {
        return !checkcid(lable, str);
    }

    return true;
}

function checkcid(lable, cid) {
    var result = false;
    var cidext = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[X])$/;

    if (cid.length != 18) {
        alertbox(lable + "身份证格式错误");
        return true;
    }

    //身份证正则
    if (!cidext.test(cid) || checkidcard(cid)) {
        result = true;
        alertbox(lable + "身份证格式错误");
    } else if (xycodegz(cid)) {
        result = true;
        alertbox(lable + "身份证格式错误");
    }
    return result;
}

function checkidcard(idcard) {
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
}

function xycodegz(cid) {
    var xycodeparam = cid.substr(0, 6);
    var biaoshi = false;
    if (xycodeparam == "110226") {
        biaoshi = true;
    }
    return biaoshi;
}

function getBirthByCid(iIdNo) {
    var rel = {};
    var tmpStr = "";
    var sexStr = "";
    iIdNo = $.trim(iIdNo);
    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        var year = tmpStr.substring(0, 2);
        if (parseInt(year) < 20) {
            tmpStr = "20" + tmpStr;
        } else {
            tmpStr = "19" + tmpStr;
        }
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
}

function savePageData() {
    var saveData = {};

    saveData.applicantName = $(".applicantName").val(); //input
    saveData.applicantIdType = $("#appCidtype").val(); //select
    saveData.applicantId = $("#appCidNumber").val(); //input
    saveData.applicantGender = $(".applicantGender").val(); //select
    saveData.applicantBirth = $(".applicantBirth").val(); //input
    saveData.applicantPhone = $(".applicantPhone").val(); //input
    saveData.applicantEmail = $(".applicantEmail").val(); //input
    saveData.applicantArea = $(".applicantArea").val(); //input
    saveData.applicantAreaCode = $(".applicantArea").attr("areacode");
    saveData.applicantProfession = $(".applicantProfession").val(); //input
    saveData.applicantProfessionCode = $(".applicantProfession").attr("procode");
    saveData.applicantRelationHouse = $(".applicantRelationHouse").val(); //select
    saveData.applicantAddressDetails = $(".applicantAddressDetails").val(); //input

    saveData.insuredRelationship = "01";
    var $rela = $(".tkinsuredRelationship");
    if ($rela.find("select").length) {
        saveData.insuredRelationship = $rela.find("select").val();
    } else {
        saveData.insuredRelationship = $rela.find("div").attr("value");
    }

    saveData.insuredName = $(".insuredName").val();
    saveData.insuredIdType = $("#insCidtype").val();
    if (saveData.insuredIdType == "99") {
        saveData.insuredId = $(".insIdDate input").val();
    } else {
        saveData.insuredId = $(".insIdNumber input").val();
    }
    saveData.insuredBirth = $(".insuredBirth").val();
    saveData.insuredGender = $(".insuredGender").val();

    setLocVal("saveData", JSON.stringify(saveData));
}

function pageDataShow() {
    var saveData = getLocVal("saveData");
    if (saveData) {
        saveData = JSON.parse(saveData);
        $(".applicantName").val(saveData.applicantName);
        $("#appCidNumber").val(saveData.applicantId);
        $(".applicantBirth").val(saveData.applicantBirth);
        $(".applicantPhone").val(saveData.applicantPhone);
        $(".applicantEmail").val(saveData.applicantEmail);
        $(".applicantArea").val(saveData.applicantArea);
        $(".applicantProfession").val(saveData.applicantProfession);
        $(".applicantAddressDetails").val(saveData.applicantAddressDetails);

        $(".applicantArea").attr("areacode", saveData.applicantAreaCode);
        $(".applicantProfession").attr("procode", saveData.applicantProfessionCode);

        $("#appCidtype option[value=" + saveData.applicantIdType + "]").prop("selected", true);
        $(".applicantGender option[value=" + saveData.applicantGender + "]").prop("selected", true);
        $(".applicantRelationHouse option[value=" + saveData.applicantRelationHouse + "]").prop("selected", true);

        if (saveData.applicantIdType != "01") {
            $(".applicantBirth").parents("li").show();
            $(".applicantGender").parents("li").show();
        }

        var $rela = $(".tkinsuredRelationship");
        if ($rela.find("select").length) {
            $rela.find("select option[value=" + saveData.insuredRelationship + "]").prop("selected", true);
            $(".insuredRelationship").trigger('change');
        }

        $(".insuredName").val(saveData.insuredName);
        $(".insuredBirth").val(saveData.insuredBirth);
        $(".insuredGender").val(saveData.insuredGender);

        $("#insCidtype option[value=" + saveData.insuredIdType + "]").prop("selected", true);

        if (saveData.insuredIdType == "01") {
            $(".insIdNumber input").val(saveData.insuredId);
        } else if (saveData.insuredIdType == "99") {
            $(".insIdDate input").val(saveData.insuredId);
            $(".insIdNumber").hide();
            $(".insIdDate").show();
            $(".insuredBirth").parents("li").show();
        } else {
            $(".insIdNumber input").val(saveData.insuredId);
            $(".insuredBirth").parents("li").show();
            $(".insuredGender").parents("li").show();
        }

        $(".wapInsure").prop("unSubmit", false);
    }
}

function setMemberInfo(sid, token) {
    $.ajax({
        url: proUrl + "customer/info",
        type: "get",
        data: {
            memberId: sid,
            memberToken: token
        },
        dataType: "json"
    }).done(function(data) {
        if (data.code == 0) {
            if (data.data) {
                var info = data.data;
                $(".applicantName").val(info.name);
                $(".applicantBirth").val(info.birthday);
                $(".applicantPhone").val(info.mobile);
                $(".applicantEmail").val(info.email);
                $(".applicantGender option[value=" + info.gender + "]").prop("selected", true);

                if ($("#appCidtype option[value=" + info.cidType + "]").length) {
                    $("#appCidtype option[value=" + info.cidType + "]").prop("selected", true);
                    $("#appCidNumber").val(info.cid);
                    if (info.cidType != "01") {
                        $(".applicantBirth").parents("li").show();
                        $(".applicantGender").parents("li").show();
                    }
                } else {
                    if ($("#appCidtype option[value=99]").length) {
                        $("#appCidtype option[value=99]").prop("selected", true);
                    } else {
                        $("#appCidtype").append("<option value=99 selected>其他</option>");
                    }

                    $("#appCidNumber").val(info.cid);
                }

                $(".applicantName").attr("readonly", true);
                $("#appCidNumber").attr("readonly", true);
                $(".applicantBirth").attr("disabled", true);
                $(".applicantGender").attr("disabled", true);
                $("#appCidtype").attr("disabled", true);
            }
        }
    }).fail(function(error) {
        alertbox("网络繁忙，请稍后再试！");
    });
}

function getInsureMaxBirth() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    date.setDate(date.getDate() + 1);

    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function getInsureMinBirth() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 66);
    date.setDate(date.getDate() + 2);

    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

var isLs = window.localStorage ? 1 : 0;
var shibie = 1;

function setLocVal(key, value) {
    try {
        window.localStorage[key] = value;
        shibie = 1;
    } catch (err) {
        shibie = 2;
        clearLocVal(key);
        document.cookie = key + "=" + escape(value) + ";";
    }
}

function getLocVal(key) {
    try {
        window.localStorage["1"] = 1;
        var value = window.localStorage[key];
        return value;
    } catch (e) {
        c_start = document.cookie.indexOf(key + "=");
        if (c_start != -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

function clearLocVal(key) {
    try {
        if (key)
            window.localStorage.removeItem(key);
        else
            window.localStorage.clear();
    } catch (e) {
        if (key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(key);
            if (cval != null) {
                document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
            }
        } else {
            var keys = document.cookie.match(/[^=;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i >= 0; i--) {
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toGMTString();
                }
            }
        }
    }
}

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";";
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    } else {
        return null;
    }
}
