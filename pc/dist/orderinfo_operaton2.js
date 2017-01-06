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
// var appminAge = storage.get("minAge") || 18; //投保人最小年龄
// var appmaxAge = storage.get("maxAge") || 65; //投保人最大年龄
// var productAgeArr = productAge.split("-");
// var insminAge = productAgeArr[0]; //被保人最小年龄
// var insmaxAge = productAgeArr[1]; //被保人最大年龄
var member = storage.get("member") || "";
var RELATIONSHIP_MAP = { none: "-1", husband: "11", wife: "12", son: "20", daughter: "30", father: "51", mother: "52" };
var IDTYPE_MAP = { none: "-1", "请选择": "-1", "身份证": "01", "护照": "02", "军官证": "03", "港台同胞证": "05", "出生日期": "06", "户口本": "08", "其他": "99" };
//回显 所有受益人
var returnMessageBene = [];
var getMessageBene = storage.get("returnMessageBene");
if (getMessageBene != "") {
    getMessageBene = JSON.parse(getMessageBene);
}

var _smq = _smq || [];
if (getMessage != "") {
    getMessage = JSON.parse(getMessage);
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
    var iApplicantBitrth = ""; //投保人出生日期
    var iApplicantGender = ""; //投保人性别
    var iApplicantPhone = ""; //投保人手机号码
    var iApplicantArea = ""; //投保地区
    var iApplicantProvince = ""; //投保地区 省代码
    var iApplicantArea = ""; //投保地区  市代码
    var iInsuredRelationship = ""; //投保人与被报人关系 从详情页获取
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
    var iApplicantProvince = getMessage.details.applicantInfo.applicantProvince; //投保地区 省代码
    var iApplicantCity = getMessage.details.applicantInfo.applicantCity; //投保地区  市代码
    var iInsuredRelationship = getMessage.details.insuredInfo[0].insuredRelationship; //投保人与被报人关系
    var iInsuredGender = getMessage.details.insuredInfo[0].insuredGender; //被保人性别
    var iInsuredBirth = getMessage.details.insuredInfo[0].insuredBirth; //被保人出生日期
    $.each(getMessage.details.planLiabilityList,
        function(key, value) {
            dutiesArr.push(value.liabilityId);
        });
    duties = dutiesArr.join(",").replace(/，/g, ",");
}
storage.set("duties", duties);

//returnMessage ->保存用户填写信息接口
var returnMessage = {
    "platform": platform,
    "applicationId": applicationId,
    "applicationToken": applicationToken,
    "memberId": memberId,
    "memberToken": memberToken,
    "processHandler": "",
    "checkCode": "",
    "inputs": {
        //新加
        "policyInfo": {
            //	"policyType": "保单类型", //[0电子、1纸质、2挂号、3自取、5电子+纸质]
            //	"postFee": "邮递费"
        },

        "applicantInfo": {},
        "insuredInfo": [],

        //新加
        "recommendInfo": {
            //"recommendMobile": "推荐人手机号码"
        },
        "invoiceInfo": {
            // "invoiceHeader": " 抬头",
            // "invoiceReceiverName": " 收件人姓名",
            // "invoiceReceiverMobile": " 收件人手机号",
            // "invoiceReceiverAddress": " 收件人地址",
            // "invoiceReceiverZipCode": " 收件人邮编"
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
if (!$.isEmptyObject(getMessage)) {
    returnObj.details = getMessage.details;
}
//投保为本人 被保人的年龄是18-68，子女是30天到17周岁
// if(iInsuredRelationship=="01"){
// 	 insminAge = "18"; //被保人最小年龄
// 	 insmaxAge = "65"; //被保人最大年龄
// }else if(iInsuredRelationship=="40"){
// 	 insminAge = "30天"; //被保人最小年龄
// 	 insmaxAge = "17"; //被保人最大年龄
// }

//点击"同意以上声明，下一步"对页面的校验
var submitCheck = {
    //投保人
    "phApplicantContainer": function() {
        var phData = {};
        //姓名
        if ($("#ph_name").is(":visible")) {
            phData.name = {};
            phData.name.onOff = nameContainer({
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
            });
        }

        //证件号码
        if ($("#ph_cid").is(":visible")) {
            phData.cidtype_id = {};
            phData.cid_number = {};
            // if ($('#ph_cid option:selected').val() == "-1") {
            // 	layer.msg('请选择证件类型');
            // 	checkTipInfor('#ph_cid', '请选择证件类型', false, true);
            // 	subScrollTop($('#ph_cid'));
            // 	return false;
            // }
            phData.cid_number.onOff = cidNumContainer({
                selector: '#ph_cid',
                value: $('#ph_cid input').val(),
                mark: true,
                subTip: true
            });
            if (!phData.cid_number.onOff) {
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }

        //证件有效期
        if ($("#ph_idExpireDate").is(":visible")) {
            phData.idExpireDate = {};
            if ($("#ph_idExpireDate input[type='radio']:checked").attr("data-type") == "long") {
                //return;
            } else {
                phData.idExpireDate.onOff = idExpireDateContainer({
                    selector: '#ph_idExpireDate',
                    value: $('#ph_idExpireDate input[type=text]').val(),
                    mark: true,
                    subTip: true
                });
                if (!phData.idExpireDate.onOff) {
                    return false;
                }
                _smq.push(['custom', '投保流程_填写投保信息', '证件有效期', '财险_' + productName, '']);
                TKTrack({
                    event: '投保流程_填写投保信息',
                    subType: '财险_' + productName
                })
            }
        }

        //国籍
        if ($("#ph_homeland").is(":visible")) {
            phData.homeland = {};
            phData.homeland.onOff = homelandContainer({
                selector: '#ph_homeland',
                value: $('#ph_homeland input').val(),
                mark: true,
                subTip: true
            });
            if (!phData.homeland.onOff) {
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '国籍', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            })
        }

        //手机号码
        if ($("#ph_mobile").is(":visible")) {
            phData.mobile = {};
            phData.mobile.onOff = phoneContainer({
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
            });
        }
        //邮箱
        if ($("#ph_email").is(":visible")) {
            phData.email = {};
            phData.email.onOff = emailContainer({
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
            });
        }
        //投保地区
        if ($('#ph_area').is(':visible')) {
            phData.phArea = {};
            if ($('#ph_area').find("#provinceId").val() == "" || $('#ph_area').find("#cityId").val() == "") {
                layer.msg('请选择地区');
                checkTipInfor('#ph_area', '请选择地区', false, true);
                subScrollTop($('#ph_area'));
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '投保地区', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }
        //通讯地址
        if ($("#ph_address").is(":visible")) {
            phData.address = {};
            phData.address.onOff = addressContainer({
                selector: '#ph_address',
                value: $('#ph_address input').val(),
                mark: true,
                subTip: true
            });

            if (!phData.address.onOff) {
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }
        //职业
        if ($('#ph_industr').is(':visible')) {
            phData.industry = {
                con: $('#ph_industr select option:selected').val()
            };
            if (phData.industry.con == "0") {
                layer.msg('请选择投保人的职业');
                checkTipInfor('#applicant-profess', '请选择职业', false, true);
                subScrollTop($('#applicant-profess'));
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '职业分类', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }

        //房屋地址
        if ($("#ph_houseAddress").is(":visible")) {
            phData.houseAddress = {};
            if ($('#ph_houseAddress input').val() == '') {
                layer.msg('请填写房屋地址');
                checkTipInfor('#ph_houseAddress', '请填写房屋地址', false, true);
                subScrollTop($('#ph_houseAddress'));
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }
        //房屋地区
        if ($("#ph_houseArea").is(":visible")) {
            phData.houseArea = {};
            if ($('#ph_houseArea input#houseprovince').attr("data-code") == '' || $('#ph_houseArea input#houseCity').attr("data-code") == '' || $('#ph_houseArea input#houseArea').attr("data-code") == '') {
                layer.msg('请选择房屋地区');
                checkTipInfor('#ph_houseArea', '请选择房屋地区', false, true);
                subScrollTop($('#ph_houseArea'));
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
    //被保人
    "phInsuredContainer": function() {
        var insData = {};
        insData.name = {};
        insData.cidtype_id = {};
        insData.cid_number = {};
        //姓名
        if ($("#ins_name").is(":visible")) {
            insData.name.onOff = nameContainer({
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
            });
        }

        //证件类型
        if ($("#ins_cid").is(":visible")) {
            if ($('#ins_cid option:selected').val() == "") {
                layer.msg('请选择证件类型');
                checkTipInfor('#insh_cid', '请选择证件类型', false, true);
                subScrollTop($('#insh_cid'));
                return false;
            }
            //证件号码
            if ($('#ins_cid input.main_inpt6').is(":visible")) {

                insData.cid_number.onOff = cidNumContainer({
                    selector: '#ins_cid',
                    value: $('#ins_cid input.main_inpt6').val(),
                    mark: true,
                    subTip: true

                });
                if (!insData.cid_number.onOff) {
                    return false;
                }
            }
            //证件类型的出生日期
            if ($('#ins_cid input.ipt-birth').is(":visible")) {

                insData.birth = {};
                insData.birth.onOff = cidNumContainer({
                    selector: '#ins_cid',
                    value: $('#ins_cid input.ipt-birth').val(),
                    mark: true,
                    subTip: true
                });
                if (!insData.birth.onOff) {
                    return false;
                }
                _smq.push(['custom', '投保流程_填写投保信息', '出生日期', '财险_' + productName, '']);
                TKTrack({
                    event: '投保流程_填写投保信息',
                    subType: '财险_' + productName
                });
            }

            _smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }

        //出生日期
        if ($('#ins_birth').is(':visible')) {
            insData.birthday = {};
            insData.birthday.onOff = birthdayContainer({
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
            });
        }
        //性别 非身份证
        if ($('#ins_gender').is(':visible')) {
            insData.gender = {};
            insData.birthday = {};
            if ($('#ins_gender input:checked').length < 1) {
                layer.msg('请选择投保人性别');
                checkTipInfor('#ins_gender', '请选择投保人性别', false, true);
                subScrollTop($('#ins_gender'));
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '性别', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            })
        }
        //国籍
        if ($("#ins_homeland").is(":visible")) {
            insData.homeland = {};
            insData.homeland.onOff = homelandContainer({
                selector: '#ins_homeland',
                value: $('#ins_homeland input').val(),
                mark: true,
                subTip: true
            });
            if (!insData.homeland.onOff) {
                return false;
            }
            _smq.push(['custom', '投保流程_填写投保信息', '国籍', '财险_' + productName, '']);
            TKTrack({
                event: '投保流程_填写投保信息',
                subType: '财险_' + productName
            });
        }

        if (iInsuredRelationship != "01") {
            var appName = $("#ph_name input").val();
            var insName = $("#ins_name input").val();
            if (appName == insName) {
                layer.msg("投保人与被保人姓名相同!");
                return false;
            }

            var appIdType = $('#ph_cid option:selected').val();
            var appId = $('#ph_cid input').val();
            var insIdType = $('#ins_cid option:selected').val();
            var insId = $('#ins_cid input.main_inpt6').val();

            if (appIdType == insIdType && appId == insId) {
                layer.msg("投保人与被保人证件信息相同!");
                return false;
            }
        }

        return true;
    }

}

//排序
function Sorts(a, b) {
    return a.code - b.code;
}
//查找相同
function findSame(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
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
    $.each(applicantInfo,
        function(index, item) {
            if (item["componentId"] == "tkApplicantIdType") {
                if ($.isEmptyObject(item["tkOptions"])) {
                    str += '<option  value="01">居民身份证</option>'
                } else {
                    $.each(item["tkOptions"],
                        function(key, value) {
                            var item = {
                                "code": value,
                                //证件代码
                                "value": key //证件名称
                            };
                            cardIdArr.push(item);
                        });
                    cardIdArr.sort(Sorts);
                    str += '<option  value="-1">请选择</option>';
                    $.each(cardIdArr,
                        function(key, value) {
                            str += '<option  value="' + value.code + '">' + value.value + '</option>';
                        });
                }
            }
        });
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
                "code": value,
                //地区代码
                "value": key //地区名称
            };
            provinceArr.push(item);
        });
        provinceArr.sort(Sorts);

        $.each(provinceArr, function(key, value) {
            str += '<li data-id="' + value.code + '">' + value.value + '</li>';
        });

        var wrap = '<div class="area-wrap cleafix" id="area-wrap">' + '<div class="area-province"><ul>' + str + '</ul></div>' + '<div class="area-city"><ul class="ul"></ul></div>' + '</div>';

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
                    if ($provinceId.val() != "") {
                        $provinceId.val("")
                    }
                    if ($cityId.val() != "") {
                        $cityId.val("");
                    }

                    $provinceId.val(provinceCode);
                    $provinceId.attr("data-txt", provinceTxt);

                    cityStr = "";
                    $.each(city["C" + provinceCode], function(key, value) {
                        cityStr += '<li data-id="' + key + '">' + value + '</li>';
                    });
                    if ($provinceId.val() == "" || $cityId.val() == "") {
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

                    if ($provinceId.val() == "" || $cityId.val() == "") {
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
    if (iApplicantArea != "" && iApplicantProvince != "" && iApplicantCity != "") {
        $("#applicant-area").val(iApplicantArea);
        $("#provinceId").val(iApplicantProvince);
        $("#cityId").val(iApplicantCity);
        return;
    }

    var applicantInfo = arr.applicantInfo;
    var opt;
    $.each(applicantInfo, function(index, item) {
        if (item["componentId"] == "tkApplicantArea") {
            opt = item.tkOptions;
        }
    });

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

function initApplicantProfess() {
    var prm = {
        //codeType:codeType,
        jobid: '#ph_job',
        worktypeid: '#ph_worktype',
        pal_profession: '#pal_profession',
        f: 'ph_'

    }
    person_profession(prm);
}
//投保人文本框显示信息
function initApplicantIptTxt(arr) {
    var applicantInfo = arr.applicantInfo;
    $.each(applicantInfo, function(index, item) {
        if (item["componentId"] == "tkApplicantName") {
            $("#ph_name input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantId") {
            $("#ph_cid input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantIdExpireDate") {
            $("#ph_idExpireDate input[type=text]").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantHomeland") {
            $("#ph_homeland input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantEmail") {
            $("#ph_email input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantPhone") {
            $("#ph_mobile input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantAddress") {
            $("#ph_address input").attr("placeholder", item['tkTip']);
        }
        if (item["componentId"] == "tkApplicantArea") {
            $("#ph_area input").attr("placeholder", item['tkTip']);
        }
    });
}
//投保人显示描述信息
function initApplicantTxt(arr) {
    var applicantInfo = arr.applicantInfo;
    $.each(applicantInfo, function(index, item) {
        if (item["componentId"] == "tkApplicantName") {
            $("#ph_name .tip").text(item['tkDesc']);
        }
        if (item["componentId"] == "tkApplicantId") {
            $("#ph_cid .tip").text(item['tkDesc']);
        }
        if (item["componentId"] == "tkApplicantEmail") {
            $("#ph_email .tip").text(item['tkDesc']);
        }
        if (item["componentId"] == "tkApplicantArea") {
            $("#ph_area .tip").text(item['tkDesc']);
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
    });
}
//房屋地区
function houseArea(opt) {
    var el = $(opt.el);
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
                if (msg.code == "0") {
                    var city = msg.data.cities;
                    var cityStr = '';

                    $.each(city,
                        function(indexs, items) {
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

    var wrap = '<div class="house-wrap cleafix" id="house-wrap">' + '<div class="house-province"><ul>' + str + '</ul></div>' + '<div class="house-city"><ul class="ul"></ul></div>' + '<div class="house-area"><ul class="ul"></ul></div>' + '</div>';
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
            $(".house-province").on("click", "li",
                function(e) {
                    e.stopPropagation();
                    var code = $(this).attr("data-id");
                    var txt = $(this).text();

                    if ($(".house-city .ul li").length >= 1) {
                        $(".house-city .ul").empty();
                    }
                    if ($(".house-area .ul li").length >= 1) {
                        $(".house-area .ul").empty();
                    }
                    fnAjax(code, $(".house-city"));
                    $("#houseprovince").attr("data-code", code);
                    $("#houseprovince").attr("data-txt", txt);
                });
            $(".house-city").on("click", "li",
                function(e) {
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

                if ($("#houseprovince").attr("data-id") == "" || $("#houseCity").attr("data-id") == "" || $("#houseArea").attr("data-id") == "") {
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
            if (msg.code == "0") {
                if (!$.isEmptyObject(msg.data)) {
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
    $.each(applicantInfo,
        function(index, item) {
            if (item['componentId'] == "tkHouseRelationship") {
                var tkOptions = item.tkOptions;
                $.each(tkOptions,
                    function(key, value) {
                        var option = {
                            "code": value,
                            "txt": key
                        };
                        optArr.push(option);
                    });
                optArr.sort(Sorts);
                $.each(optArr,
                    function(indexs, items) {
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
    var str = "";
    $.each(insuredInfo, function(index, item) {
        if (item.componentId == "tkInsuredRelationship") {
            var tkOptions = item.tkOptions;
            //本人：01 这种格式
            $.each(tkOptions,
                function(key, value) {
                    var option = {
                        "code": value,
                        "txt": key
                    };
                    optArr.push(option);
                });
            if (optArr.length == 1) {
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
    $.each(insuredInfo,
        function(index, item) {
            if (item["componentId"] == "tkInsuredIdType") {
                if ($.isEmptyObject(item["tkOptions"])) {
                    str += '<option  value="01">居民身份证</option>'
                } else {
                    $.each(item["tkOptions"],
                        function(key, value) {
                            var item = {
                                "code": value,
                                //证件代码
                                "value": key //证件名称
                            };
                            cardIdArr.push(item);
                        });
                    cardIdArr.sort(Sorts);
                    str += '<option  value="-1">请选择</option>';
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
    $.each(beneficiaryInfo,
        function(index, item) {
            if (item.componentId == "tkBeneficiaryPerson") {
                var tkOptions = item.tkOptions;
                $.each(tkOptions,
                    function(key, value) {
                        var option = {
                            "code": value,
                            "txt": key
                        };
                        benPersonArr.push(option);
                    });
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
    var str = "";
    $.each(beneficiaryInfo, function(index, item) {
        if (item.componentId == "tkBeneficiaryRelationship") {
            var tkOptions = item.tkOptions;
            //本人：01 这种格式
            $.each(tkOptions, function(key, value) {
                if (iInsuredRelationship == "01") {
                    if (iInsuredGender == "1") {
                        //投保人是本人且是男性 去除丈夫
                        if (value != "11") {
                            var option = {
                                "code": value,
                                "txt": key
                            };
                            optArr.push(option);
                        }

                    } else if (iInsuredGender == "2") {
                        //投保人是本人且是女性  去除妻子
                        if (value != "12") {
                            var option = {
                                "code": value,
                                "txt": key
                            };
                            optArr.push(option);
                        }
                    }
                } else if (iInsuredRelationship == "20" || iInsuredRelationship == "30") {
                    //被保人是子女 收益只能是父母
                    if (value == "52" || value == "51") {
                        var option = {
                            "code": value,
                            "txt": key
                        };
                        optArr.push(option);
                    }
                }
            });

            str += '<option  value="-1">请选择</option>';
            $.each(optArr, function(index, item) {
                str += '<option  value="' + item.code + '">' + item.txt + '</option>';
            });
            $("#ben_widget  .ben_relation select").append(str);
        }
    });
}

//受益人证件类型
function initeneficiaryIdType(arr) {
    var beneficiaryInfo = arr.beneficiaryInfo;
    var str = "";
    var cardIdArr = [];
    $.each(beneficiaryInfo,
        function(index, item) {
            if (item["componentId"] == "tkBeneficiaryIdType") {
                if ($.isEmptyObject(item["tkOptions"])) {
                    str += '<option  value="01">居民身份证</option>'
                } else {
                    $.each(item["tkOptions"],
                        function(key, value) {
                            var item = {
                                "code": value,
                                //证件代码
                                "value": key //证件名称
                            };
                            cardIdArr.push(item);
                        });
                    cardIdArr.sort(Sorts);
                    str += '<option  value="-1">请选择</option>';
                    $.each(cardIdArr, function(key, value) {
                        str += '<option  value="' + value.code + '">' + value.value + '</option>'
                    });
                }
                $("#ben_widget  .ben_cid select").append(str);
            }
        });
}

/**************************受益人操作  end**************************/

/**************************发票  start**************************/

function initInvoice() {

}

function initInvoiceArea() {
    var proviceStr = "";
    var cityStr = "";
    //定义 城市 数据数组
    var cityArray = new Array();
    cityArray[0] = new Array("北京市", "东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆");
    cityArray[1] = new Array("上海市", "黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明");
    cityArray[2] = new Array("天津市", "和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红挢|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县");
    cityArray[3] = new Array("重庆市", "万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双挢|渝北|巴南|黔江|长寿|綦江|潼南|铜梁 |大足|荣昌|壁山|梁平|城口|丰都|垫江|武隆|忠县|开县|云阳|奉节|巫山|巫溪|石柱|秀山|酉阳|彭水|江津|合川|永川|南川");
    cityArray[4] = new Array("河北省", "石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水");
    cityArray[5] = new Array("山西省", "太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");
    cityArray[6] = new Array("内蒙古自治区", "呼和浩特|包头|乌海|赤峰|呼伦贝尔盟|阿拉善盟|哲里木盟|兴安盟|乌兰察布盟|锡林郭勒盟|巴彦淖尔盟|伊克昭盟");
    cityArray[7] = new Array("辽宁省", "沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛");
    cityArray[8] = new Array("吉林省", "长春|吉林|四平|辽源|通化|白山|松原|白城|延边");
    cityArray[9] = new Array("黑龙江省", "哈尔滨|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|双鸭山|伊春|七台河|大兴安岭");
    cityArray[10] = new Array("江苏省", "南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");
    cityArray[11] = new Array("浙江省", "杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水");
    cityArray[12] = new Array("安徽省", "合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州");
    cityArray[13] = new Array("福建省", "福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");
    cityArray[14] = new Array("江西省", "南昌市|景德镇|九江|鹰潭|萍乡|新馀|赣州|吉安|宜春|抚州|上饶");
    cityArray[15] = new Array("山东省", "济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽");
    cityArray[16] = new Array("河南省", "郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源");
    cityArray[17] = new Array("湖北省", "武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州");
    cityArray[18] = new Array("湖南省", "长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");
    cityArray[19] = new Array("广东省", "广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|潮州|揭阳|云浮");
    cityArray[20] = new Array("广西壮族自治区", "南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|南宁地区|柳州地区|贺州|百色|河池");
    cityArray[21] = new Array("海南省", "海口|三亚");
    cityArray[22] = new Array("四川省", "成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达川|雅安|眉山|甘孜|凉山|泸州");
    cityArray[23] = new Array("贵州省", "贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南");
    cityArray[24] = new Array("云南省", "昆明|大理|曲靖|玉溪|昭通|楚雄|红河|文山|思茅|西双版纳|保山|德宏|丽江|怒江|迪庆|临沧");
    cityArray[25] = new Array("西藏自治区", "拉萨|日喀则|山南|林芝|昌都|阿里|那曲");
    cityArray[26] = new Array("陕西省", "西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛");
    cityArray[27] = new Array("甘肃省", "兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南");
    cityArray[28] = new Array("宁夏回族自治区", "银川|石嘴山|吴忠|固原");
    cityArray[29] = new Array("青海省", "西宁|海东|海南|海北|黄南|玉树|果洛|海西");
    cityArray[30] = new Array("新疆维吾尔族自治区", "乌鲁木齐|石河子|克拉玛依|伊犁|巴音郭勒|昌吉|克孜勒苏柯尔克孜|博尔塔拉|吐鲁番|哈密|喀什|和田|阿克苏");
    cityArray[31] = new Array("香港特别行政区", "香港特别行政区");
    cityArray[32] = new Array("澳门特别行政区", "澳门特别行政区");
    cityArray[33] = new Array("台湾省", "台北|高雄|台中|台南|屏东|南投|云林|新竹|彰化|苗栗|嘉义|花莲|桃园|宜兰|基隆|台东|金门|马祖|澎湖");
    cityArray[34] = new Array("其它", "北美洲|南美洲|亚洲|非洲|欧洲|大洋洲");

    proviceStr += '<option>请选择</option>';
    for (var i = 0; i < cityArray.length; i++) {

        var temp = $.trim(cityArray[i][0]);
        if (temp != "") {
            proviceStr += '<option value="' + temp + '">' + temp + '</option>';
        }
    }
    $("#tkInvoiceArea .areaProvince").append(proviceStr);

    cityStr = '<option>请选择</option>';
    $("#tkInvoiceArea .areaCity").append(cityStr);



    $("#tkInvoiceArea .areaProvince").change(function() {

        cityStr = '<option>请选择</option>';
        $("#tkInvoiceArea .areaCity").empty();

        var text = $(this).find("option:selected").text();

        for (var i = 0; i < cityArray.length; i++) {

            if (cityArray[i][0] == text) {
                var areaArry = cityArray[i][1].split("|");
                //cityStr+='<option>请选择<option>';
                for (var j = 0; j < areaArry.length; j++) {
                    cityStr += '<option value="' + areaArry[j] + '">' + areaArry[j] + '</option>';
                }
            }
        }
        $("#tkInvoiceArea .areaCity").append(cityStr);
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
        url: insure + "/hera_insure2/api/insure/v2/customer/info?memberId=" + memberId + "&memberToken=" + memberToken,
        dataType: "json",
        async: false,
        success: function(msg) {
            if (msg.code == "0") {
                if (!$.isEmptyObject(msg.data)) {
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
    if (msg.name != "") {
        $("#ph_name input").val(msg.name).prop("disabled", true);
    }
    if (msg.cidType != "") {
        //2016
        $("#ph_cid select").val(msg.cidType).prop("disabled", true);
        if (msg.cidType != "01") {
            $("#applicant-gender").show();
            $("#applicant-birth").show();
        } else {
            $("#applicant-gender").hide();
            $("#applicant-birth").hide();
        }
    }
    if (msg.cid != "") {
        $("#ph_cid input").val(msg.cid).prop("disabled", true);
    }
    if (msg.birthday != "") {
        $("#applicant-birth input").val(msg.birthday).prop("disabled", true);
    }
    if (msg.gender != "") {
        $("#applicant-gender input[value='" + msg.gender + "']").attr({
            "checked": "checked",
            "disabled": "disabled"
        });
        $("#applicant-gender input").prop("disabled", true);
    }

    if (msg.email != "") {
        $("#ph_email input").val(msg.email);
    }
    if (msg.address != "") {
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
            if (!msg) {
                return;
            }

            if (msg.tkApplicantInfo) {
                var str = msg.tkApplicantInfo.replace(/\\/, "");
                if ($("#ph_industr").is(":visible")) {
                    $("#ph_industr").before(str)
                } else {
                    $(".applicant").append(str);
                }

            }

            if (msg.tkInsuredInfo) {
                var str = msg.tkInsuredInfo.replace(/\\/, "");
                $(".insured").append(str);
            }

            if (msg.tkBeneficiaryInfo) {
                var str = msg.tkBeneficiaryInfo.replace(/\\/, "");
                $(str).each(function(index, el) {
                    var $el = $(el);
                    // console.log($el.attr("componentId"));
                    if ($el.attr("componentId") == 'tkBeneficiaryPerson') {
                        $(".beneficiary .pal_perInfo").after($el);
                    } else {

                        $("#ben_widget .btn_save ").before($el);
                    }
                })
            }

            if (msg.tkOtherInfo) {
                var str = msg.tkOtherInfo.replace(/\\/, "");
                $(str).each(function(index, el) {
                    var $el = $(el);
                    if ($el.attr("componentId") == "tkOtherPerson") {
                        $("#recommend").append($el);
                    } else if ($el.attr("componentId") == "tkOtherInvoice") {
                        $("#invoice").append($el);
                    }
                });
            }

            initInputs();

            if (member == "true") {
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
            if (msg.code == "0") {
                var pcInput = msg.data.pcInputs;
                var applicantInfo = pcInput[0],
                    //投保人
                    insuredInfo = pcInput[1],
                    //被保人
                    BeneficiaryInfo = pcInput[2],
                    OtherInfo = pcInput[3];

                initApplicantIdType(applicantInfo);
                initApplicantArea(applicantInfo);
                initApplicantProfess(applicantInfo);
                initApplicantIptTxt(applicantInfo);
                initApplicantTxt(applicantInfo);
                initHealth(applicantInfo);

                initApplicantHouseRelationship(applicantInfo);

                initInsuredRelationship(insuredInfo);
                initInsuredIdType(insuredInfo);

                initBeneficiaryPerson(BeneficiaryInfo);
                initBeneficiaryRelationship(BeneficiaryInfo);
                initeneficiaryIdType(BeneficiaryInfo);

                if (!$.isEmptyObject(OtherInfo)) {
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
//数据回显
function showBackData() {
    if (!$.isEmptyObject(getMessage.inputs)) {



        //投保人
        if (getMessage.inputs.applicantInfo.applicantName !== "") {
            $("#ph_name input").val(getMessage.inputs.applicantInfo.applicantName);
        }
        if (getMessage.inputs.applicantInfo.applicantIdType !== "") {
            $("#ph_cid select").val(getMessage.inputs.applicantInfo.applicantIdType);
            if (getMessage.inputs.applicantInfo.applicantIdType != "01") {
                $("#applicant-birth").show();
                $("#applicant-gender").show();
                if (getMessage.inputs.applicantInfo.applicantBirth != "") {
                    $("#applicant-birth input").val(getMessage.inputs.applicantInfo.applicantBirth)
                }
                if (getMessage.inputs.applicantInfo.applicantGender != "") {
                    $("#applicant-birth input[value=" + getMessage.inputs.applicantInfo.applicantGender + "]").prop("checked", true);
                    $("#applicant-birth input").prop("disabled", true);
                }

            }

        }
        if (getMessage.inputs.applicantInfo.applicantId !== "") {
            $("#ph_cid input").val(getMessage.inputs.applicantInfo.applicantId);
        }

        if (getMessage.inputs.applicantInfo.applicantHomeland != "") {
            $("#ph_homeland input.nationality-suggest-input").val(getMessage.inputs.applicantInfo.applicantHomeland);
        }
        if (getMessage.inputs.applicantInfo.applicantPhone != "") {
            $("#ph_mobile input").val(getMessage.inputs.applicantInfo.applicantPhone);
        }
        if (getMessage.inputs.applicantInfo.applicantEmail != "") {
            $("#ph_email input").val(getMessage.inputs.applicantInfo.applicantEmail);
        }
        if (getMessage.inputs.applicantInfo.applicantAddress != "") {
            $("#ph_address input").val(getMessage.inputs.applicantInfo.applicantAddress);
        }
        if (getMessage.inputs.applicantInfo.applicantIndustr != "") {
            $("#ph_industr select").val(getMessage.inputs.applicantInfo.applicantIndustr);
        }
        if (getMessage.inputs.applicantInfo.applicantProfession != "") {
            $("#ph_worktype").attr("worktypeid", returnMessage.inputs.applicantInfo.applicantProfession);
        }
        if (getMessage.inputs.applicantInfo.applicantProfessionTxt != "") {
            $("#ph_worktype input").val(getMessage.inputs.applicantInfo.applicantProfessionTxt);

        }
        //被保人
        if (getMessage.inputs.insuredInfo.insuredName != "") {
            $("#ins_name input").val(getMessage.inputs.insuredInfo[0].insuredName);
        }

        if (getMessage.inputs.insuredInfo.insuredIdType != "") {
            $("#ins_cid select").val(getMessage.inputs.insuredInfo[0].insuredIdType);
        }
        if (getMessage.inputs.insuredInfo[0].insuredId != "") {
            if (getMessage.inputs.insuredInfo[0].insuredIdType == "06") {
                //出生日期
                $("#ins_cid input.ipt-birth").val(getMessage.inputs.insuredInfo[0].insuredId);
            } else {
                $("#ins_cid input.main_inpt6").val(getMessage.inputs.insuredInfo[0].insuredId);
            }
        }
        if (getMessage.inputs.insuredInfo[0].insuredHomeland != "") {
            $("#ins_homeland input").val(getMessage.inputs.insuredInfo[0].insuredHomeland);
        }



        if (getMessage.inputs.insuredInfo[0].beneficiaryInfo.length == 0) {
            $("#ben_person select").val("01");
            $("#ben_person").attr("data-person", "01");
        } else {
            $("#ben_person select").val("02");
            $("#ben_person").attr("data-person", "02");
        }
    }
    //指定受益人
    if (!$.isEmptyObject(getMessageBene)) {
        createBackBenePerson(getMessageBene);
    }




}

$(function() {

    cerateInputs();
    //房屋地址
    if ($("#ph_houseArea").is(":visible")) {
        initHouseArea();
    }

    //initNotice();
    initInvoiceArea();

    showBackData();

    var time = new Date();
    /**************************页面一些文字显示 start**************************/

    if (planPrice.toString().indexOf(".") == -1) {
        planPrice = planPrice + ".00";
    }

    $("#planPrice").text(planPrice);
    $(".insurd_tit").text(productName);
    $("#orderProductName").text(productName);
    $("#planDesc").text(productDesc);
    $("#planDesc").attr("title", productDesc);


    $("#productAge").text("0-55周岁");
    $("#orderPrice").text(planPrice);
    $("#orderTotlePrice").text(planPrice);
    $("#agreeStatement .p_group p").eq(0).hide();

    /**************************页面一些文字显示 end**************************/


    /**************************投保人 start**************************/

    //投保人证件  身份证 01
    if (iInsuredRelationship == "01") {
        $(".applicant .pal_perInfo").html("投保人暨被保人信息");
        $("#ph_homeland").show();
    } else {
        $("#ph_homeland").hide();
    }
    if ($("#applicantcard-type option:selected").val() == "-1") {
        $("#applicant-gender").hide();
        $("#applicant-birth").hide();
        $("#ph_homeland").hide();
        $("#ph_idExpireDate").hide();

    } else if ($("#applicantcard-type option:selected").val() == "01") {
        $("#ph_homeland").hide();
        $("#ph_idExpireDate").show();
        $("#applicant-gender").hide();
        $("#applicant-birth").hide();
    } else {
        $("#applicant-gender").show();
        $("#applicant-birth").show();
        $("#ph_homeland").show();
        $("#ph_idExpireDate").hide();
    }
    $("#ph_idExpireDate").hide();

    $("#applicantcard-type").change(function() {
        var value = $(this).find("option:selected").val();
        var txt = $(this).find("option:selected").text();
        if (value == "01") {
            $("#applicant-gender").hide();
            $("#applicant-birth").hide();

            $("#ph_homeland").hide();
            $("#ph_idExpireDate").show();
        } else if (value == "-1") {
            $("#applicant-gender").hide();
            $("#applicant-birth").hide();

            $("#ph_homeland").hide();
            $("#ph_idExpireDate").hide();
        } else {
            $("#applicant-gender").show();
            $("#applicant-birth").show();

            if (iInsuredRelationship == "01") {
                $("#ph_homeland").show();
            } else {
                $("#ph_homeland").hide();
            }
            $("#ph_idExpireDate").hide();
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
    //国籍
    $('#ph_homeland .titleTip').attr('title', '国籍');
    $('#ph_list_container').css({
        left: 4,
        top: 33,
        width: 336
    });
    var phInput = $('#ph_homeland').find(".nationality-suggest-input");
    var phList = $('#ph_homeland').find(".nationality-suggest-list");
    //phInput.val('');
    new nationality({
        input: phInput,
        list: phList
    });

    //投保人证件有效期
    var iExpire = $("#ph_idExpireDate input[name='idExpire']:checked").attr("data-type");

    if (iExpire == "long") {
        $("#ph_idExpireDate input[type='text']").hide();
    } else {
        $("#ph_idExpireDate input[type='text']").show();
    }
    //投保人证件有效期->短期显示日期控件
    $("#ph_idExpireDate input[name='idExpire']").click(function() {
        if ($("#ph_idExpireDate .tip").hasClass("tipError")) {
            $("#ph_idExpireDate .tip").removeClass("tipError").html("");
        } else if ($("#ph_idExpireDate .tip").hasClass("tipOk")) {
            $("#ph_idExpireDate .tip").removeClass("tipOk").html("");
        }
        if ($(this).attr("data-type") == "short") {
            $("#ph_idExpireDate input[type='text']").show();
        } else {
            $("#ph_idExpireDate input[type='text']").hide();
        }
    });

    //证件有效期日期组
    var Y = time.getFullYear();
    var M = time.getMonth();
    var D = time.getDate();
    var maxDate = Y + "-" + (M + 1) + "-" + D;
    var minDate = (Y - 80) + "-" + (M + 1) + "-" + (D + 1);
    var currentDate = "";
    var startDate = "";
    $('#ph_idExpireDate  input.main_inpt6').val('');
    datademo({
            id: '#tkApplicantIdExpireDate',
            currentDate: maxDate,
            //INIT_GET_DATA.currentTime,
            startDate: "2016-09-26 11:28:07",
            //INIT_GET_DATA.currentTime,
            sale_mode: 'none',
            max: maxDate,
            //policyholder.maximumDate.value,
            min: minDate,
            //policyholder.minimumDate.value,
            startdate: {
                y: -20,
                m: '01',
                d: '01'
            }
        },
        function() {
            var value = $('#ph_idExpireDate  input').val();
            $('body').off();
            // if (value) {
            // 	var ageRange = phAgeRange({
            // 		selector: '#applicant-birth',
            // 		value: value,
            // 		birthday: value,
            // 		mark: true,
            // 		subTip: false
            // 	});
            // 	if (!ageRange) {
            // 		return false;
            // 	}
            // }			
        });

    //投保人出生日期
    if (iApplicantBitrth != "" && $("#applicant-birth input[type=text]").prop("disabled") != true) {
        $("#applicant-birth input[type=text]").val(iApplicantBitrth);
        $("#applicant-birth input[type=text]").attr("readonly", true);

    } else {
        //投保人出生日期组件
        //yanxf
        var minAppDate = "";
        var maxAppDate = Y + "-" + (M + 1) + "-" + D;
        if (iInsuredRelationship == "01") {
            minAppDate = (Y - 56) + "-" + (M + 1) + "-" + (D + 2);
        } else {
            if (getMessage.details.planLiabilityList) {
                minAppDate = (Y - 66) + "-" + (M + 1) + "-" + (D + 2);
            } else {
                minAppDate = "1900-01-01";
            }
        }

        datademo({
                id: '#applicant-birth  input',
                currentDate: maxAppDate,
                //INIT_GET_DATA.currentTime,
                startDate: "2016-09-26 11:28:07",
                //INIT_GET_DATA.currentTime,
                sale_mode: 'none',
                max: maxDate,
                //policyholder.maximumDate.value,
                min: minAppDate,
                //policyholder.minimumDate.value,
                startdate: {
                    y: -20,
                    m: '01',
                    d: '01'
                }
            },
            function() {
                var value = $('#applicant-birth  input').val();
                $('body').off();
                if (value) {
                    // var ageRange = phAgeRange({
                    // 	selector: '#applicant-birth',
                    // 	value: value,
                    // 	birthday: value,
                    // 	mark: true,
                    // 	subTip: false
                    // });
                    // if (!ageRange) {
                    // 	return false;
                    // }
                }
            });
    }

    //投保人性别
    if (iApplicantGender != "") {
        $("#applicant-gender input[value=" + iApplicantGender + "]").attr({ "checked": 'checked' });
        $("#applicant-gender input").prop("disabled", true);
    }
    //投保人手机号码
    if (iApplicantPhone != "") {
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
        nameContainer(opt) && checkInputNameByIdType($('#ph_cid select').val(), value, "#ph_name");

        _smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        })
    });

    $('#ph_cid select').change(function() {
        $('#ph_cid input').val("");

        if (this.value == IDTYPE_MAP.none) {
            showTipInfor("#ph_cid", "请选择证件类型", true);
        } else {
            showTipInfor("#ph_cid", "请输入证件号码", true);
        }
        checkInputNameByIdType(this.value, $("#ph_name input").val(), "#ph_name");
    });

    function checkInputNameByIdType(idType, name, tipSelector) {
        if (idType == IDTYPE_MAP.身份证 || idType == IDTYPE_MAP.军官证 || idType == IDTYPE_MAP.户口本) {
            if (name) {
                var result = Cidtype_name(idType, name);
                if (result.onOff) {
                    showTipInfor(tipSelector, result.message, false);
                } else {
                    showTipInfor(tipSelector, result.message, true);
                }
            }
        }
    }

    //实时校验投保人证件号码
    $('#ph_cid input').blur(function() {
        var idType = $('#ph_cid select').val();
        if (idType == IDTYPE_MAP.none) {
            showTipInfor("#ph_cid", "请选择证件类型", true);
            return false;
        }

        var value = $(this).val();
        var opt = {
            selector: '#ph_cid',
            value: value,
            mark: true,
            subTip: false
        }
        cidNumContainer(opt);

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
    //实时校验证件有效期
    $("#ph_idExpireDate input[type='text']").blur(function() {
        var value = $(this).val();
        var opt = {
            selector: '#ph_idExpireDate',
            value: value,
            mark: true,
            subTip: false
        }
        idExpireDateContainer(opt);
        _smq.push(['custom', '投保流程_填写投保信息', '证件有效期', '财险_' + productName, '']);
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
        emailContainer(opt);
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
        phoneContainer(opt);
        _smq.push(['custom', '投保流程_填写投保信息', '手机号码', '财险_' + productName, '']);
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
        phHouseAddressContainer(opt);
        _smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        })
    });

    //投保人国籍实时校验
    $('#ph_homeland input').blur(function() {
        setTimeout(function() {
                var value = $('#ph_homeland input').val();
                if (value) {
                    $('#ph_homeland .tip').text('√').removeClass('tipError').addClass('tipOk');
                } else {
                    $('#ph_homeland .tip').text('请填写国籍').removeClass('tipOk').addClass('tipError');
                }
            },
            250);

        _smq.push(['custom', '投保流程_填写投保信息', '房屋地址', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });
    });

    //通讯地址
    $('#ph_address input').blur(function() {
        var value = $(this).val();
        var opt = {
            selector: '#ph_address',
            value: value,
            mark: true,
            subTip: false
        }
        addressContainer(opt);
        _smq.push(['custom', '投保流程_填写投保信息', '通讯地址', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });
    });
    //行业 工种
    $("#pal_profession").change(function() {
        if ($(this).val() == "0") {
            $('#ph_industr .tip').text('请填写国籍').removeClass('tipOk').addClass('tipError');
        } else {
            $('#ph_industr .tip').text('√').removeClass('tipError').addClass('tipOk');
        }
    })

    /**************************投保人 end**************************/

    /**************************被保人 start**************************/
    //被保人同投保人被保人隐藏
    var insuredRelationshipJson = {
        "01": "本人",
        "20": "儿子",
        "30": "女儿"
    }

    if (iInsuredRelationship == "01") {
        $(".insured").hide();
    } else {
        $(".insured").show();

        $("#ins_relationship").find("select").remove();
        $("#ins_relationship").append('<span class="relationshipTxt" id="relationshipTxt"></span>');

        $(".relationshipTxt").css({
            "color": "#333",
            "line-height": "28px",
            "padding-left": "6px"
        });
        $("#ins_relationship").attr("data-relationship", iInsuredRelationship);

        if (iInsuredRelationship == "20") {
            $(".relationshipTxt").html("儿子");
        } else if (iInsuredRelationship == "30") {
            $(".relationshipTxt").html("女儿");
        }
    }

    if ($("#ins_relationship").attr("data-relationship") == "01" || $("#ins_relationship select option:selected").val() == "01") {
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
        if (value == "01") {
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

    $("#ins_gender").hide();
    $("#ins_birth").hide();
    $("#ins_homeland").hide();
    $("#ins_idExpireDate").hide();

    $("#ins_cid select").change(function() {
        var value = $(this).find("option:selected").val();
        var txt = $(this).find("option:selected").text();
        checkInputNameByIdType(value, $("#ins_name input").val(), "#ins_name");

        if (value == "01") {
            $("#ins_birth").hide();
            $("#ins_gender").hide();

            $('#ins_cid input.main_inpt6').show();
            $('#ins_cid input.ipt-birth').hide();
            $("#ins_cid").find(".label2").html("");
            //被保人国籍
            $("#ins_homeland").hide();
            $("#ins_idExpireDate").show();
        } else if (value == "-1") {
            $("#ins_idExpireDate").hide();
            $("#ins_gender").hide();
            $("#ins_birth").hide();
            $("#ins_homeland").hide();

        } else if (value == "06") {
            $("#ins_birth").hide();
            $("#ins_gender").show();

            $('#ins_cid input.main_inpt6').hide();
            $('#ins_cid input.ipt-birth').show()

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
            $("#ins_idExpireDate").hide();
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
        //被保人出生日期
        if (iInsuredBirth != "") {
            $("#ins_cid input.ipt-birth").val(iInsuredBirth).prop("disabled", true);
        }

        if ($('#ins_cid input.main_inpt6').is(":visible")) {
            showTipInfor("#ins_cid", "请输入证件号码", true);
        } else {
            showTipInfor("#ins_cid", "", false);
        }
    });

    //被保人证件有效期
    if ($("#ins_idExpireDate input[type=radio]:checked").attr("data-type") == "long") {
        $("#ins_idExpireDate input[type=text]").hide();
    }

    $("#ins_idExpireDate input[type=radio]").click(function() {
        var type = $(this).attr("data-type");
        if (type == "long") {
            $("#ins_idExpireDate input[type=text]").hide();
        } else {
            $("#ins_idExpireDate input[type=text]").show();
        }
    })

    //被保人证件有效期 日期控件
    $('#ins_idExpireDate input.main_inpt6').attr("id", "ins_Date");
    $('#ins_idExpireDate input.main_inpt6').val('');
    datademo({
            id: '#ins_Date',
            currentDate: maxDate,
            //INIT_GET_DATA.currentTime,
            startDate: "2016-09-26 11:28:07",
            //INIT_GET_DATA.currentTime,
            sale_mode: 'none',
            max: maxDate,
            //policyholder.maximumDate.value,
            min: minDate,
            //policyholder.minimumDate.value,
            startdate: {
                y: -20,
                m: '01',
                d: '01'
            }
        },
        function() {
            var value = $('#ins_Date').val();
            $('body').off();
            if (value) {
                // var ageRange = phAgeRange({
                // 	selector: '#applicant-birth',
                // 	value: value,
                // 	birthday: value,
                // 	mark: true,
                // 	subTip: false
                // });
                // if (!ageRange) {
                // 	return false;
                // }
            }
        });

    //被保人性别
    if (iInsuredGender != "") {
        $("#ins_gender input[value=" + iInsuredGender + "]").prop("checked", 'checked')
        $("#ins_gender input").prop("disabled", true);
    }
    //被保人出生日期
    if (iInsuredBirth != "") {
        $("#ins_birth input").val(iInsuredBirth).prop("disabled", true);
        $("#ins_cid input.ipt-birth").val(iInsuredBirth).prop("disabled", true);

    }

    //被保人国籍
    $('#ins_homeland .titleTip').attr('title', '国籍');
    $('#ph_list_container').css({
        left: 4,
        top: 33,
        width: 336
    });
    var insInput = $('#ins_homeland').find(".nationality-suggest-input");
    var insList = $('#ins_homeland').find(".nationality-suggest-list");
    insInput.val('');
    new nationality({
        input: insInput,
        list: insList
    });



    //实时被保人校验名字
    $("#ins_name input").blur(function() {
        var value = $(this).val();
        var opt = {
            selector: '#ins_name',
            value: value,
            mark: true,
            subTip: false
        }

        nameContainer(opt) && checkInputNameByIdType($("#ins_cid select").val(), value, "#ins_name");
        _smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        })
    });

    $('#ins_cid input.ipt-birth').on("blur", function() {
        var value = $(this).val();
        var opt = {
            selector: '#ins_cid',
            value: value,
            mark: true,
            subTip: false,
            age: productAge
        }

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
            subTip: false
        }

        if (cidNumContainer(opt)) {
            var idType = $("#ins_cid select").val();

            if (idType == IDTYPE_MAP.身份证 || idType == IDTYPE_MAP.户口本) {
                var insRela = $("#ins_relationship").attr("data-relationship");
                var gender = "-1";
                if (insRela == RELATIONSHIP_MAP.father || insRela == RELATIONSHIP_MAP.husband || insRela == RELATIONSHIP_MAP.son) {
                    gender = "0";
                } else if (insRela == RELATIONSHIP_MAP.mother || insRela == RELATIONSHIP_MAP.wife || insRela == RELATIONSHIP_MAP.daughter) {
                    gender = "1";
                }

                if (gender != "-1") {
                    var sex = calSexBirth(value).gender;
                    if (sex != gender) {
                        showTipInfor("#ins_cid", "身份证信息与关系不符", true);
                    } else {
                        showTipInfor("#ins_cid", "√", false);
                    }
                }
            }
        }

        _smq.push(['custom', '投保流程_填写投保信息', '证件号码', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        })
    });

    if ($("#ins_birth").is(":visible")) {
        if (insminAge.indexOf("天") != -1) {
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
    if ($("#ins_gender").is(":visible")) {
        //实时校验性别
        var raIpt = $("#ins_gender").find("input[type='radio']:checked");
        if (raIpt.length < 1) {
            checkTipInfor('#applicant-gender', '请选择投保人性别', true, false);
        }
    }
    //被保人国籍实时校验
    $('#ins_homeland input').blur(function() {
        setTimeout(function() {
                var value = $('#ins_homeland input').val();
                if (value) {
                    $('#ins_homeland .tip').text('√').removeClass('tipError').addClass('tipOk');
                } else {
                    $('#ins_homeland .tip').text('请填写国籍').removeClass('tipOk').addClass('tipError');
                }
            },
            250);
        _smq.push(['custom', '投保流程_填写投保信息', '国籍', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });

    });

    /**************************被保人 end**************************/

    /*************************受益人 start**************************/
    //受益人指定法定	
    if ($("#ben_person").attr("data-person") == "01" || $("#ben_person select option:selected").val() == "01") {
        $("#ben_legal").show();
        $("#ben_desig").hide();
    } else {
        $("#ben-legal").hide();
        $("#ben_desig").show();
    }

    $("#ben_person select").change(function() {
        var value = $(this).find("option:selected").val();
        var txt = $(this).find("option:selected").text();
        $("#ben_person").attr("data-person", value);
        if (value == "01") {
            $("#ben_legal").show();
            $("#ben_desig").hide();
            $(".beneTotalPercent").hide();
        } else {
            $("#ben_legal").hide();
            $("#ben_desig").show();
            $(".beneTotalPercent").show();
        }
    });
    //证件类型
    $("#ben_widget .ben_gender").hide();
    $("#ben_widget .ben_birth").hide();
    $("#ben_widget").on("change", ".ben_cid select",
        function() {
            var value = $(this).val();
            if (value == "01" || value == "-1") {
                $(".ben_gender").hide();
                $(".ben_birth").hide();
            } else {
                $(".ben_gender").show();
                $(".ben_birth").show();
            }
        })



    $("#ben_widget .birth").click(function() {
        $("#ben_widget .birth").attr("id", "ben_birth");
        datademo({
            id: '#ben_birth',
            currentDate: currentDate,
            startDate: "2016-09-26",
            sale_mode: 'none',
            max: maxDate,
            min: minDate,
            startdate: {
                y: -3,
                m: '10',
                d: '01'
            }
        }, function() {
            var value = $('#ben_widget .birth').val();
            $('body').off();
        });

    });

    //添加受益人按钮
    $("#addBenePersonBtn").click(function() {
        $(".insuredInfoDetail").hide();
        setBenePersonFormData();
        var $ben_widget = $("#ben_widget");
        $("#addBenePersonBtn").before($ben_widget);
        $("#ben_widget").show();

        $(".benePersion").prop("statue", "hidden");
        $(".per_info").removeClass("per_info_hov");
        $(".part2").hide();
        $(".per_info_tool").hide();
    });

    $(".save").click(createBenePerson);

    //取消按钮
    $(".cancel").click(function() {
        $("#ben_widget").hide();
        $(".per_info_tool").hide();
        $(".addwrap").show();
        setBenePersonFormData();

        var parent = $("#ben_widget").closest(".benePersion");
        if (parent.length) {
            parent[0].statue = "hidden";
            parent.find(".per_info").removeClass("per_info_hov");
            parent.find(".part2").hide();
            parent.find(".per_info_tool").hide();
        }

    });

    //受益人实时校验
    //受益人关系
    $("#ben_widget .ben_relation select").change(function() {
        newBenePersonRelationshipCheck();
        checkBeneInsertPass();
    });

    //受益人性别
    $("#ben_widget .ben_gender input").click(function() {
        var relaValue = $("#ben_widget .ben_relation select").val();
        if (relaValue != RELATIONSHIP_MAP.none) {
            return false;
        }
    });

    //受益人姓名
    $("#ben_widget .ben_name input").blur(function() {
        newBenePersonRelationshipCheck();
        newBenePersonNameCheck();
        checkBeneInsertPass();
    });

    //受益人证件类型
    $("#ben_widget .ben_cid select").change(function() {
        newBenePersonRelationshipCheck();
        newBenePersonIdTypeCheck();
        checkBeneInsertPass();
    });

    //受益人证件号码
    $("#ben_widget .ben_cid input").blur(function() {
        newBenePersonRelationshipCheck();
        newBenePersonIDCheck();
        checkBeneInsertPass();
    });

    //受益人出生日期
    $("#ben_widget .ben_birth input").blur(function() {
        newBenePersonBirthCheck();
        checkBeneInsertPass();
    });


    //受益人收益比例
    $("#ben_widget .ben_percent input").blur(function() {
        if (isNaN(this.value) || this.value == "") {
            this.value = "0";
        } else {
            var value = parseInt(this.value);
            if (value < 0) {
                value = 0;
            } else if (value > 100) {
                value = 100;
            }
            this.value = value;
        }
    });

    /*************************受益人 end**************************/

    /*************************发票 start**************************/
    $("#inv_chk").click(function() {
        if ($(this).prop("checked")) {
            $("#inv_infor").show();
        } else {
            $("#inv_infor").hide();
        }
    });

    if ($("#ph_name input").val() != "") {
        $("#tkInvoiceTitle input").remove();
        $("#tkInvoiceTitle .label1 ").after('<span class="invoiceSpan"></span>');
        $("#tkInvoiceTitle .invoiceSpan").html($("#ph_name input").val());
        $("#tkInvoiceTitle .invoiceSpan").css({
            "color": "rgb(51, 51, 51)",
            "line-height": "28px",
            "padding-left": "6px",
            "float": "left",
            "display": "block",
            "width": "330px"
        });
    }

    //yanxf
    //收件人姓名
    $("#tkInvoiceName input").blur(function() {
        var invoiceName = nameContainer({
            selector: '#tkInvoiceName',
            value: $('#tkInvoiceName input').val(),
            mark: true,
            subTip: false
        });

        if (!invoiceName) {
            return false;
        }
        _smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });
    });
    //收件人地区
    $("#tkInvoiceArea input").blur(function() {
        if ($(".areaProvince").val() == "" || $(".areaProvince").val() == "请选择") {
            $('#tkInvoiceArea .tip').text('请选择地区').removeClass('tipOk').addClass('tipError');
        } else {
            $('#tkInvoiceArea .tip').text('√').removeClass('tipError').addClass('tipOk');
        }
        if ($(".areaCity").val() == "" || $(".areaCity").val() == "请选择") {
            $('#tkInvoiceArea .tip').text('请选择地区').removeClass('tipOk').addClass('tipError');
        } else {
            $('#tkInvoiceArea .tip').text('√').removeClass('tipError').addClass('tipOk');
        }

        var invoiceArea = addressContainer({
            selector: '#tkInvoiceArea',
            value: $('#tkInvoiceArea input').val(),
            mark: true,
            subTip: false
        });

        if (!invoiceArea) {
            return false;
        }
        _smq.push(['custom', '投保流程_填写投保信息', '姓名', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });
    });
    //手机号码
    $("#tkInvoicePhone input").blur(function() {
        var invoicePhone = phoneContainer({
            selector: '#tkInvoicePhone',
            value: $('#tkInvoicePhone input').val(),
            mark: true,
            subTip: false
        });
        if (!invoicePhone) {
            return false;
        }
        _smq.push(['custom', '投保流程_填写投保信息', '手机号码', '财险_' + productName, '']);
        TKTrack({
            event: '投保流程_填写投保信息',
            subType: '财险_' + productName
        });
    });
    //yanxf 20161014
    function checkInvoice() {
        if ($("#tkInvoiceName").is(":visible")) {
            var chkName = nameContainer({
                selector: '#tkInvoiceName',
                value: $('#tkInvoiceName input').val(),
                mark: true,
                subTip: true
            });

            if (!chkName) {
                return false;
            }
        }
        if ($("#tkInvoiceArea").is(":visible")) {
            if ($(".areaProvince").val() == "请选择") {
                $('#tkInvoiceArea .tip').text('请选择地区').removeClass('tipOk').addClass('tipError');
            } else {
                $('#tkInvoiceArea .tip').text('√').removeClass('tipError').addClass('tipOk');
            }
            if ($(".areaCity").val() == "请选择") {
                $('#tkInvoiceArea .tip').text('请选择地区').removeClass('tipOk').addClass('tipError');
            } else {
                $('#tkInvoiceArea .tip').text('√').removeClass('tipError').addClass('tipOk');
            }
            var chkArea = addressContainer({
                selector: '#tkInvoiceArea',
                value: $('#tkInvoiceArea input').val(),
                mark: true,
                subTip: true
            });

            if (!chkArea) {
                return false;
            }
        }
        if ($("#tkInvoicePhone").is(":visible")) {
            var chkPhone = phoneContainer({
                selector: '#tkInvoicePhone',
                value: $('#tkInvoicePhone input').val(),
                mark: true,
                subTip: true
            })
            if (!chkPhone) {
                return false;
            }

        }
        return true;
    }
    /*************************发票 end**************************/

    /*************************推荐人 start**************************/
    //会员登录显示推荐人 否则不显示
    if (member == "true") {
        $("#recommend").show();
    } else {
        $("#recommend").hide();
    }

    $("#recommTit").click(function() {
        if ($("#integral").is(":visible")) {
            $("#integral").hide();
        } else {
            $("#integral").show();
        }
    });

    //yanxf
    $("#integral input.int_inp3").blur(function() {
        //校验手机号是否正确
        var mobile = "";
        mobile = phoneContainer({
            selector: '#ph_mobile',
            value: $('#ph_mobile input').val(),
            mark: true,
            subTip: true
        });
        if (!mobile) {
            return false;
        }
    });

    $("#integral .btn_use").click(function() {
        //校验手机号是否为合法的推荐人
        var recommendMobile = $("#integral input.int_inp3").val();
        $.ajax({
            url: insure + "/hera_insure2/api/insure/v2/application/validateRecommend?mobile=" + recommendMobile + "&memberId=" + memberId,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(msg) {
                if (msg.code == "0") {
                    layer.msg("推荐惊喜将在您成功过投保后告诉TA!")
                } else {
                    layer.msg("该号码还不是推荐人，请核实后重新填写")
                        //alert(msg.message)
                }
            },
            error: function() {
                alert("网络异常推荐人");
            }
        });
    });

    /*************************推荐人 end**************************/

    /**************************声明提示框  start**************************/
    $("#agrChk").click(function() {
        if ($(this).prop("checked")) {
            $("#statement").click();
        }
    });
    $("#statement").click(function(e) {
        $("#agreeStatementMask").show();
        $("#agreeStatement").show();
    });
    $("#agreeStatement_close").click(function() {
        $("#agreeStatementMask").hide();
        $("#agreeStatement").hide();
        $("#agrChk").prop("checked", true);
    });
    $("#statement-close").click(function() {
        $("#agreeStatementMask").hide();
        $("#agreeStatement").hide();
    });

    /**************************声明提示框  end**************************/

    /**************************提交校验数据 start**************************/

    $("#check-form").on("click", function() {
        /**************************投保人 start**************************/
        var isApplicantPass = submitCheck.phApplicantContainer();
        if (!isApplicantPass) {
            return false;
        }

        var appGender = "";
        var appBirth = "";
        var insGender = "";
        var insBirth = "";

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

        if (!Cidtype_name(returnMessage.inputs.applicantInfo.applicantIdType, returnMessage.inputs.applicantInfo.applicantName).onOff) {
            layer.msg("投保人姓名有误！");
            subScrollTop($('#ph_name'));
            return false;
        }

        //性别 01:身份证
        if ($("#applicantcard-type").val() == "01") {
            returnMessage.inputs.applicantInfo.applicantGender = "";
            returnMessage.inputs.applicantInfo.applicantBirth = "";
        } else {
            returnMessage.inputs.applicantInfo.applicantGender = $(".applicant-gender:checked").val();
            returnMessage.inputs.applicantInfo.applicantBirth = $("#applicant-birth").find(".birth").val();
            appGender = returnMessage.inputs.applicantInfo.applicantGender;
            appBirth = returnMessage.inputs.applicantInfo.applicantBirth;
        }
        //投保人房屋地区 省 市 区县代码  省 市 区县名称 
        if (document.getElementById("ph_area") || document.getElementById("ph_houseArea")) {
            if ($("#ph_area").is(":visible")) {
                returnMessage.inputs.applicantInfo.applicantProvince = $("#provinceId").val();
                returnMessage.inputs.applicantInfo.applicantCity = $("#cityId").val();
                returnMessage.inputs.applicantInfo.applicantCounty = "";

                returnMessage.inputs.applicantInfo.applicantProvinceName = "";
                returnMessage.inputs.applicantInfo.applicantCityName = "";
                returnMessage.inputs.applicantInfo.applicantCountyName = ""
            } else if ($("#ph_houseArea").is(":visible")) {
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
                returnMessage.inputs.applicantInfo.applicantCountyName = "";
            }
        }

        //投保人 投保通讯地址   代码
        if ($("#ph_address").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantAddress = $("#ph_address input").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantAddress = "";
        }
        //投保人 行业
        if ($("#ph_industr").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantIndustr = $("#ph_industr select option:selected").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantIndustr = "";
        }
        //投保人  职业类别
        if ($("#ph_worktype").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantProfession = $("#ph_job").attr("worktypeid");
            returnMessage.inputs.applicantInfo.applicantProfessionTxt = $("#ph_job").val();

        } else {
            returnMessage.inputs.applicantInfo.applicantProfession = "";
            returnMessage.inputs.applicantInfo.applicantProfessionTxt = "";
        }

        //房屋详细地址
        if ($("#ph_houseAddress").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantAddressDetails = $("#ph_houseAddress input").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantAddressDetails = "";
        }
        //我与房屋的关系
        if ($("#ph_houseRelationship").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantRelationHouse = $("#ph_houseRelationship select option:selected").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantRelationHouse = "";
        }

        /*新加  
         邮编
         国籍
         证件有效期
         */
        if ($("#ph_zipCode").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantZipCode = $("#ph_zipCode input").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantZipCode = "";
        }
        if ($("#ph_homeland").is(":visible")) {
            returnMessage.inputs.applicantInfo.applicantHomeland = $("#ph_homeland input.main_inpt4 ").val();
        } else {
            returnMessage.inputs.applicantInfo.applicantHomeland = "";
        }
        if ($("#ph_idExpireDate").is(":visible")) {

            if ($("#ph_idExpireDate input[name='idExpire']:checked").attr("data-type") == "long") {
                //长期
                returnMessage.inputs.applicantInfo.applicantIdExpireDate = "2099-12-31";
            } else {
                //短期
                returnMessage.inputs.applicantInfo.applicantIdExpireDate = $("#ph_idExpireDate input[type='text']").val();
            }
        } else {
            returnMessage.inputs.applicantInfo.applicantIdExpireDate = "";
        }

        /**************************投保人 end**************************/
        /**************************被保人 start**************************/
        //校验被保人
        if ($(".insured").is(":visible")) {
            var isInsPass = submitCheck.phInsuredContainer();
            if (!isInsPass) {
                return false;
            }
        }

        if (iInsuredRelationship == "01") {
            insuredMessage.insuredRelationship = "01"; //代表本人
            insuredMessage.insuredName = returnMessage.inputs.applicantInfo.applicantName;
            insuredMessage.insuredIdType = returnMessage.inputs.applicantInfo.applicantIdType;
            insuredMessage.insuredId = returnMessage.inputs.applicantInfo.applicantId;
            insuredMessage.insuredGender = returnMessage.inputs.applicantInfo.applicantGender;
            insuredMessage.insuredBirth = returnMessage.inputs.applicantInfo.applicantBirth;
            insuredMessage.insuredPhone = returnMessage.inputs.applicantInfo.applicantPhone;
            insuredMessage.insuredEmail = returnMessage.inputs.applicantInfo.applicantEmail;
            insuredMessage.insuredProfession = returnMessage.inputs.applicantInfo.applicantProfession;
            insuredMessage.insuredAddress = returnMessage.inputs.applicantInfo.applicantAddress;
            insuredMessage.insuredZipCode = returnMessage.inputs.applicantInfo.applicantZipCode;

            insuredMessage.insuredHight = "";
            insuredMessage.insuredWeight = "";

            insuredMessage.insuredHomeland = returnMessage.inputs.applicantInfo.applicantHomeland;
            insuredMessage.insuredIdExpireDate = returnMessage.inputs.applicantInfo.applicantIdExpireDate;
        } else {

            insuredMessage.insuredRelationship = $("#ins_relationship").attr("data-relationship");
            insuredMessage.insuredName = $("#ins_name input").val();
            //证件类型
            insuredMessage.insuredIdType = $("#ins_cid select").find("option:selected").val();

            //被保人 证件号码  性别出生日期
            if ($("#ins_cid select").find("option:selected").val() == "01") {
                insuredMessage.insuredId = $("#ins_cid input.main_inpt6").val();
                insuredMessage.insuredGender = "";
                insuredMessage.insuredBirth = "";

                var obj = calSexBirth(insuredMessage.insuredId);
                insGender = obj.gender;
                insBirth = obj.birthday;
            } else if ($("#ins_cid select").find("option:selected").val() == "06") {
                insuredMessage.insuredId = $("#ins_cid input.ipt-birth").val();
                insuredMessage.insuredGender = $("#ins_gender input:checked").val();;
                insuredMessage.insuredBirth = $("#ins_cid input.ipt-birth").val();

                insGender = insuredMessage.insuredGender;
                insBirth = insuredMessage.insuredBirth;
            } else {
                insuredMessage.insuredId = $("#ins_cid input").val();
                insuredMessage.insuredGender = $("#ins_gender input:checked").val();
                insuredMessage.insuredBirth = $("#ins_birth input").val();

                insGender = insuredMessage.insuredGender;
                insBirth = insuredMessage.insuredBirth;
            }

            insuredMessage.insuredPhone = "";
            insuredMessage.insuredEmail = "";
            insuredMessage.insuredProfession = "";
            insuredMessage.insuredAddress = "";
            insuredMessage.insuredZipCode = "";
            insuredMessage.insuredHight = "";
            insuredMessage.insuredWeight = "";
            //被保人国籍
            if ($("#ins_homeland").is(":visible")) {
                insuredMessage.insuredHomeland = $("#ins_homeland input.main_inpt4").val();
            } else {
                insuredMessage.insuredHomeland = "";
            }
            insuredMessage.insuredIdExpireDate = "";

            if (insuredMessage.insuredName == returnMessage.inputs.applicantInfo.applicantName) {
                layer.msg("被保人姓名与投保人姓名相同！");
                subScrollTop($('#ins_name'));
                return false;
            }

            if (insuredMessage.insuredIdType == returnMessage.inputs.applicantInfo.applicantIdType &&
                insuredMessage.insuredId == returnMessage.inputs.applicantInfo.applicantId) {
                layer.msg("被保人姓名与投保人证件信息相同！");
                subScrollTop($('#ins_name'));
                return false;
            }

            if (!Cidtype_name(insuredMessage.insuredIdType, insuredMessage.insuredName).onOff) {
                layer.msg("被保人姓名有误！");
                subScrollTop($('#ins_name'));
                return false;
            }

            var insRela = $("#ins_relationship").attr("data-relationship");
            if (insuredMessage.insuredIdType == IDTYPE_MAP.身份证 || insuredMessage.insuredIdType == IDTYPE_MAP.户口本) {
                var gender = "-1";
                if (insRela == RELATIONSHIP_MAP.father || insRela == RELATIONSHIP_MAP.husband || insRela == RELATIONSHIP_MAP.son) {
                    gender = "0";
                } else if (insRela == RELATIONSHIP_MAP.mother || insRela == RELATIONSHIP_MAP.wife || insRela == RELATIONSHIP_MAP.daughter) {
                    gender = "1";
                }

                if (gender != "-1" && gender != insGender) {
                    layer.msg("被保人证件类型与关系不符！");
                    subScrollTop($('#ins_cid'));
                    return false;
                }
            }

            if (iInsuredBirth != insBirth) {
                layer.msg("被保人出生日期与测算页不符!");
                subScrollTop($('#ins_cid'));
                return false;
            }

            var appBirthDay = getPersonBirthDate("0", "", appBirth);
            var insBirthDay = getPersonBirthDate("0", "", insBirth);


            if (insRela == RELATIONSHIP_MAP.father || insRela == RELATIONSHIP_MAP.mother) {
                if (insBirthDay >= appBirthDay) {
                    layer.msg("被保人与投保人年龄不相符!");
                    subScrollTop($('#ins_cid'));
                    return false;
                }
            }

            if (insRela == RELATIONSHIP_MAP.daughter || insRela == RELATIONSHIP_MAP.son) {
                if (insBirthDay <= appBirthDay) {
                    layer.msg("被保人与投保人年龄不相符!");
                    subScrollTop($('#ins_cid'));
                    return false;
                }
            }
        }

        /**************************被保人 end**************************/

        /**************************受益人 start**************************/
        //校验受益人
        if ($("#ben_person").attr("data-person") == "01" || $("#ben_person select option:selected").val() == "01") {
            //法定
            insuredMessage.beneficiaryLegal = "true";

        } else {
            //指定
            insuredMessage.beneficiaryLegal = "false";
            insuredMessage.beneficiaryInfo.length = 0;
            var beneficiaryInfoList = getSelectedBeneficiaryInfo();
            if (!checkBeneficiaryInfo(insuredMessage, beneficiaryInfoList)) {
                return false;
            }

            insuredMessage.beneficiaryInfo = beneficiaryInfoList;
        }
        returnMessage.inputs.insuredInfo.length = 0;
        returnMessage.inputs.insuredInfo.push(insuredMessage);

        returnObj.inputs = returnMessage.inputs;


        /**************************受益人 end**************************/

        /**************************保单类型 start**************************/

        //保单类型  0电子、1纸质、2挂号、3自取、5电子+纸质   邮费
        if ($("#invoice").is(":visible")) {
            if ($("#tkOtherPolicy input").is(":checked")) {
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

        //发票   收件人姓名  收件人手机号 收件人地址  收件人邮编

        if ($("#inv_chk").is(":checked")) {
            if (!checkInvoice()) {
                return false;
            }
        }
        if ($("#inv_chk").is(":checked")) {
            returnMessage.inputs.invoiceInfo.invoiceHeader = "";
            returnMessage.inputs.invoiceInfo.invoiceReceiverName = $("#tkInvoiceName input").val();
            returnMessage.inputs.invoiceInfo.invoiceReceiverMobile = $("#tkInvoicePhone input").val();
            returnMessage.inputs.invoiceInfo.invoiceReceiverAddress = $("#tkInvoiceArea .areaProvince option:selected").text() + $("#tkInvoiceArea .areaCity option:selected").text() + $("#tkInvoiceArea input").val();
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
        if ($("#integral").is(":visible")) {
            returnMessage.inputs.recommendInfo.recommendMobile = $("#recommend input.int_inp3").val();
        } else {
            returnMessage.inputs.recommendInfo.recommendMobile = "";
        }
        /**************************推荐人 end**************************/

        storage.set("email", $("#ph_email").find("input").val());
        storage.set("returnMessage", JSON.stringify(returnObj));
        //yanxf
        storage.set("returnMessageBene", JSON.stringify(getSelectedBeneficiaryInfo("1")));


        //已经阅读必选
        if (!$("#agrChk").is(":checked")) {
            layer.msg('您好，请阅读并同意投保声明');
            return;
        }
        var isHealth = $("#applicantHealth").attr("isHealth");
        //保存填写信息  
        //console.log(returnMessage)
        $.ajax({
            type: "post",
            url: insure + "/hera_insure2/api/insure/v2/application/" + applicationId + "/inputs",
            data: JSON.stringify(returnMessage),
            dataType: "json",
            success: function(msg) {
                //0 无健康告知
                if (msg.code == "0") {
                    if (isHealth == "true") {
                        window.location.href = "healthinfo2.html";
                    } else {
                        var proposalNo = msg.data.proposalNo;
                        var proposalToken = msg.data.proposalToken;
                        storage.set("proposalNo", proposalNo);
                        storage.set("proposalToken", proposalToken);
                        window.location.href = "pay2.html";
                    }
                } else {
                    layer.msg(msg.message);
                }
            },
            error: function(msg) {
                alert("网络异常");
            }
        });
    });
    /**************************提交校验数据 end**************************/
});

function saveCheck() {
    //受益人名字
    var benName = nameContainer({
        selector: '#ben_widget .ben_name',
        value: $('#ben_widget .ben_name input').val(),
        mark: true,
        subTip: true
    });

    if (!benName) {
        return false;
    }

    //受益人证件号码
    if ($('#ben_widget .ben_cid select').val() == "") {
        layer.msg('请选择证件类型');
        checkTipInfor('#ben_widget .ben_cid', '请选择证件类型', false, true);
        subScrollTop($('#ben_widget .ben_cid'));
        return false;
    }

    var benCid = cidNumContainer({
        selector: '#ben_widget .ben_cid',
        value: $('#ben_widget .ben_cid input').val(),
        mark: true,
        subTip: true
    });

    if (!benCid) {
        return false;
    }
    return true;
}

function createBenePerson(event) {
    var benePersonRela = $(".ben_relation select").val();
    var benePersonRelaName = $(".ben_relation select :selected").text();
    var benePersonName = $(".ben_name input").val();
    var benePersonIdType = $(".ben_cid select").val();
    var benePersonIdTypeName = $(".ben_cid select :selected").text();
    var benePersonId = $(".ben_cid input").val();;
    var benePersonGender = $(".ben_gender  input")[0].checked ? "1" : "2";
    var benePersonGenderName = benePersonGender == "1" ? "男" : "女";
    var benePersonBirth = $(".ben_birth input").val();
    var benePersonPercent = $(".ben_percent input").val();

    //受益人信息校验
    //yanxf
    var isSave = saveCheck();
    if (!isSave) {
        return false;
    }

    var benePersonInfo = {
        rela: benePersonRela,
        relaName: benePersonRelaName,
        name: benePersonName,
        idType: benePersonIdType,
        idTypeName: benePersonIdTypeName,
        id: benePersonId,
        gender: benePersonGender,
        genderName: benePersonGenderName,
        birth: benePersonBirth,
        percent: benePersonPercent
    };

    var isUpdate = $(".ben_percent").is(":hidden");
    var beneStr = getBenePersonStr(benePersonInfo);

    var $contaier = $('<div class="benePersion"></div>');
    if (isUpdate) {
        $contaier = $(this).closest(".benePersion");
        $contaier.find(".part1").html(beneStr.benePart1);
        $contaier.find(".part1 .per_info_tool").show();
        $contaier.find(".part2").html(beneStr.benePart2).show();
        $("#addBenePersonBtn").show();
        $contaier[0].statue = "show";
    } else {
        beneStr.benePart1 = '<div class="per_info clearfix part1">' + beneStr.benePart1 + '</div>';
        beneStr.benePart2 = '<div class="insuredInfoDetail clearfix part2" style="display:none;">' + beneStr.benePart2 + '</div>';
        $contaier.append(beneStr.benePart1 + beneStr.benePart2);
        $("#ben_part").append($contaier);
        $contaier[0].statue = "hidden";
    }

    $contaier[0].benePersonInfo = benePersonInfo;
    $("#ben_widget").hide();
    $contaier.find(".perInfoPercent input").focus();

    if (!isNaN(benePersonPercent) && parseInt(benePersonPercent) > 0) {
        var totalPercent = getTotalBenePercent();

        var newPercent = parseInt(benePersonPercent);
        if (totalPercent + newPercent > 100) {
            layer.msg("受益比例超过100%");
            newPercent = 100 - totalPercent;
        }

        if (newPercent > 0) {
            $contaier.find(".inpt_rad").prop("checked", true);
        } else {
            $contaier.find(".inpt_rad").prop("checked", false);
        }

        $contaier[0].benePersonInfo.percent = newPercent;
        $(".beneTotalPercent span").text(totalPercent + newPercent);
    }

    bindBenePersonInfoEvent($contaier);
}

function getBenePersonStr(benePersonInfo) {
    //2部分：一行显示、展开显示
    //part1:
    var benePart1 = '<div class="per_info_con"><input type="checkbox"name=""class="fl inpt_rad"><div class="fl  mrgin_r30 perInfoName">' + benePersonInfo.name + '</div><div class="fl perInfoType"><span class="perInfoTypeTxt"></span>' + benePersonInfo.idTypeName + '/<span class="perInfoCid">' + benePersonInfo.id + '</span></div><div class="fl perInfoPercent">收益比例：<input type="text"class="" value="' + benePersonInfo.percent + '">%</div><div class="perInfoRelation "></div></div><div class="per_info_tool"style="display: none;"><a href="javascript:;"class="info_a modify_a">[修改]</a><a href="javascript:;"class="info_a del_a">[删除]</a><span class="btn_spa"></span></div>';

    //part2:
    var benePart2 = '<div class="rowElem clearfix"><label class="label1 label11"><span class="color_red">*</span>与被保人关系：</label><div class="formRelation">' + benePersonInfo.relaName + '</div></div><div class="rowElem clearfix"><label class="label1 label11"><span class="color_red">*</span>姓名：</label><div class="formName">' + benePersonInfo.name + '</div></div><div class="rowElem clearfix"><label class="label1 label11"><span class="color_red">*</span>证件号码：</label><div class="formCid">' + benePersonInfo.idTypeName + "/" + benePersonInfo.id + '</div></div><div class="rowElem clearfix bene_p_sex"><label class="label1 label11"><span class="color_red">*</span>性别：</label><div class="formGender">' + benePersonInfo.genderName + '</div></div><div class="rowElem clearfix bene_p_birth"><label class="label1 label11"><span class="color_red">*</span>出生日期：</label><div class="formBirth">' + benePersonInfo.birth + '</div></div>';

    return {
        benePart1: benePart1,
        benePart2: benePart2
    }
}

function createBackBenePerson(beneInfoList) {
    for (var i = 0; i < beneInfoList.length; i++) {
        var benePersonInfo = beneInfoList[i];

        var $contaier = $('<div class="benePersion"></div>');
        var beneStr = getBenePersonStr(benePersonInfo);
        beneStr.benePart1 = '<div class="per_info clearfix part1">' + beneStr.benePart1 + '</div>';
        beneStr.benePart2 = '<div class="insuredInfoDetail clearfix part2" style="display:none;">' + beneStr.benePart2 + '</div>';
        $contaier.append(beneStr.benePart1 + beneStr.benePart2);
        $("#ben_part").append($contaier);
        $contaier[0].statue = "hidden";
        $contaier[0].benePersonInfo = benePersonInfo;

        bindBenePersonInfoEvent($contaier);
    }
}

function bindBenePersonInfoEvent($contaier) {
    $contaier.find(".perInfoName").click(function() {
        $("#ben_widget").hide();
        var parent = $(this).closest(".benePersion");
        var currentstatue = $contaier[0].statue;

        if (currentstatue == "hidden") {
            $contaier[0].statue = "show";
            parent.siblings().find(".insuredInfoDetail").hide();
            parent.siblings().find(".per_info_tool").hide();
            parent.siblings().find(".per_info").removeClass("per_info_hov");
            parent.siblings().prop("statue", "hidden");

            parent.find(".per_info").addClass("per_info_hov");
            parent.find(".part2").show();
            parent.find(".per_info_tool").show();
            var benePersonInfo = parent[0].benePersonInfo;
            if (benePersonInfo.idType == "01") {
                parent.find(".bene_p_sex").hide();
                parent.find(".bene_p_birth").hide();
            }
        } else if (currentstatue == "modify") {
            $contaier[0].statue = "show";
            parent.find(".part2").show();
            $("#addBenePersonBtn").show();
        } else if (currentstatue == "show") {
            $contaier[0].statue = "hidden";
            parent.find(".per_info").removeClass("per_info_hov");
            parent.find(".part2").hide();
            parent.find(".per_info_tool").hide();
        }
    });

    $contaier.find(".modify_a").click(function() {
        $(".insuredInfoDetail").hide();
        var parent = $(this).closest(".benePersion");
        var benePersonInfo = parent[0].benePersonInfo;
        setBenePersonFormData(benePersonInfo);

        var $ben_widget = $("#ben_widget");
        parent.append($ben_widget);
        $ben_widget.show();
        $("#addBenePersonBtn").hide();
        $contaier[0].statue = "modify";
    });

    $contaier.find(".del_a").click(function() {
        var $ben_widget = $("#ben_widget");
        $ben_widget.hide();
        $("#addBenePersonBtn").before($ben_widget);

        var parent = $(this).closest(".benePersion");
        parent.remove();
    });

    $contaier.find(".perInfoPercent input").change(function() {
        var percent = this.value;
        if (isNaN(percent) || percent == "") {
            percent = 0;
        }

        percent = parseInt(percent);
        if (percent < 0) {
            percent = 0;
        }

        if (percent > 100) {
            percent = 100;
        }

        var totalPercent = getTotalBenePercent($contaier.index());
        if ($contaier.find(".inpt_rad").prop("checked")) {
            if (totalPercent + percent > 100) {
                layer.msg("受益比例超过100%");
                percent = 100 - totalPercent;
            }
        } else {
            if (percent > 0) {
                if (totalPercent + percent > 100) {
                    layer.msg("受益比例超过100%");
                    percent = 100 - totalPercent;
                }
            }
        }

        $contaier[0].benePersonInfo.percent = percent;
        if (percent == 0) {
            $contaier.find(".inpt_rad").prop("checked", false);
        } else {
            $contaier.find(".inpt_rad").prop("checked", true);
        }
        $(".beneTotalPercent span").text(totalPercent + percent);

        this.value = percent;
    });

    $contaier.find(".inpt_rad").change(function() {
        $contaier.find(".perInfoPercent input").focus();
        var totalPercent = getTotalBenePercent();

        if (totalPercent > 100) {
            totalPercent = 100;

            if (this.checked) {
                var percent = 100 - totalPercent;
                $contaier.find(".perInfoPercent input").val(percent);
                $contaier[0].benePersonInfo.percent = percent;
                if (percent == 0) {
                    $contaier.find(".perInfoPercent input").val("");
                    this.checked = false;
                }
            }
            layer.msg("受益比例超过100%");
        }
        $(".beneTotalPercent span").text(totalPercent)
    });
}

function getTotalBenePercent(index1) {
    var totalPercent = 0;
    $(".benePersion").each(function(index, el) {
        if (index1 != index) {
            if ($(el).find(".inpt_rad").prop("checked")) {
                var percent = el.benePersonInfo.percent;
                if (!isNaN(percent)) {
                    totalPercent += parseInt(percent);
                }
            }
        }
    });

    return totalPercent;
}

function setBenePersonFormData(benePersonInfo) {
    var info;
    if (benePersonInfo) {
        info = benePersonInfo;
        $(".ben_percent").hide();
        $(".save").attr("disabled", false);
    } else {
        info = {
            rela: "-1",
            relaName: "",
            name: "",
            idType: "",
            idTypeName: "",
            id: "",
            gender: "",
            genderName: "",
            birth: "",
            percent: ""
        };
        $(".ben_percent input").val("");
        $(".ben_percent").show();
    }

    $(".ben_relation select option[value=" + info.rela + "]").prop("selected", true);
    $(".ben_name input").val(info.name);

    if (info.idType) {
        $(".ben_cid select option[value=" + info.idType + "]").prop("selected", true);
    } else {
        $(".ben_cid select option").eq(0).prop("selected", true);
    }

    $(".ben_cid input").val(info.id);

    if (info.gender == "2") {
        $(".ben_gender input").eq(1).prop("checked", true);
    }
    $(".ben_birth input").val(info.birth);

    if (info.rela == "-1") {
        $(".ben_relation select").trigger("change");
        $(".ben_cid select").trigger("change");
        $("#ben_widget .tipOk").empty();
        $("#ben_widget .tipError").empty();
    } else {
        if (info.idType == IDTYPE_MAP.身份证) {
            $(".ben_gender").hide();
            $(".ben_birth").hide();
        } else {
            $(".ben_gender").show();
            $(".ben_birth").show();
        }
    }
}

function showTipInfor(selector, message, show) {
    if (show) {
        $(selector).find('.tip').text(message).removeClass('tipOk').addClass('tipError');
    } else {
        $(selector).find('.tip').text("√").removeClass('tipError').addClass('tipOk');
    }
}

function newBenePersonRelationshipCheck() {
    var relaValue = $("#ben_widget .ben_relation select").val();
    if (relaValue == RELATIONSHIP_MAP.none) {
        showTipInfor("#ben_widget .ben_relation", "请选择与被保险人的关系", true);
        $("#ben_widget .ben_relation").find('.tip').text("请选择与被保险人的关系").removeClass('tipOk').addClass('tipError');
    } else {
        //查询关系的唯一性
        if (!checkBeneRelationshipOnly()) {
            return;
        }

        showTipInfor("#ben_widget .ben_relation", "√", false);
        var $genders = $("#ben_widget .ben_gender input[type=radio]");

        //控制性别
        var gender = 0;
        if ([RELATIONSHIP_MAP.husband, RELATIONSHIP_MAP.father, RELATIONSHIP_MAP.son].indexOf(relaValue) != "-1") {
            $genders.eq(0).prop("checked", true);
        } else {
            $genders.eq(1).prop("checked", true);
            gender = 1;
        }

        //如果填了身份证，在判断性别是否合适
        var idType = $("#ben_widget .ben_cid select").val();
        if (idType == IDTYPE_MAP.身份证) {
            newBenePersonIDCheckSub();
        }
    }

    return relaValue;
}

function checkBeneRelationshipOnly() {
    var relaValue = $("#ben_widget .ben_relation select").val();
    var currentIndex = $("#ben_widget").closest(".benePersion").index();
    var $beneInfoList = $(".benePersion");

    for (var i = 0; i < $beneInfoList.length; i++) {
        var beneInfo = $beneInfoList[i];

        if (beneInfo.benePersonInfo.rela == relaValue && i != currentIndex) {
            showTipInfor("#ben_widget .ben_relation", beneInfo.benePersonInfo.relaName + "关系不能多于两次", true);
            return false;
        }
    }

    return true;
}

function newBenePersonNameCheck() {
    var value = $("#ben_widget .ben_name input").val();
    var opt = {
        selector: '#ben_widget .ben_name',
        value: value,
        mark: true,
        subTip: false
    }

    if (nameContainer(opt)) {
        var idType = $("#ben_widget .ben_cid select").val();
        if (idType == IDTYPE_MAP.军官证 || idType == IDTYPE_MAP.身份证) {
            var result = Cidtype_name(idType, value);
            if (result.onOff) {
                showTipInfor("#ben_widget .ben_name", result.message, false);
            } else {
                showTipInfor("#ben_widget .ben_name", result.message, true);
            }
        }
        checkBeneNameOnly();
    }
}

function checkBeneNameOnly() {
    var name = $("#ben_widget .ben_name input").val();
    var currentNameList = []
    $(".benePersion").each(function(index, el) {
        currentNameList.push(el.benePersonInfo.name);
    });

    if (currentNameList.indexOf(name) > -1) {
        showTipInfor("#ben_widget .ben_name", "受益人姓名不能重复", false);
    }
}

function newBenePersonIdTypeCheck() {
    var idType = $("#ben_widget .ben_cid select").val();
    if (idType == IDTYPE_MAP.出生日期) {
        var birth = $("#ben_widget .ben_birth input").val();
        $("#ben_widget .ben_cid input").prop("disabled", true).val(birth);
        if (birth) {
            showTipInfor("#ben_widget .ben_cid", "√", false);
        } else {
            showTipInfor("#ben_widget .ben_cid", "请选择出生日期", true);
        }
    } else {
        $("#ben_widget .ben_cid input").prop("disabled", false).val("");
        if (idType == IDTYPE_MAP.none) {
            showTipInfor("#ben_widget .ben_cid", "请选择证件类型", true);
        } else {
            showTipInfor("#ben_widget .ben_cid", "请输入证件号码", true);
        }
    }

    //证件类型影响姓名
    if (idType == IDTYPE_MAP.军官证 || idType == IDTYPE_MAP.身份证) {
        var name = $(".ben_name input").val();

        var result = Cidtype_name(idType, name);
        if (!result.onOff) {
            showTipInfor("#ben_widget .ben_name", result.message, true);
        }
    }
}

function newBenePersonIDCheck() {
    var idType = $("#ben_widget .ben_cid select").val();
    if (idType == IDTYPE_MAP.none) {
        showTipInfor("#ben_widget .ben_cid", "请选择证件类型", true);
        return;
    }

    if (newBenePersonIDCheckSub()) {
        checkBeneIDOnly();
    }
}

function newBenePersonIDCheckSub() {
    var value = $("#ben_widget .ben_cid input").val();
    var opt = {
        selector: '#ben_widget .ben_cid',
        value: value,
        mark: true,
        subTip: false
    }

    var idType = $("#ben_widget .ben_cid select").val();
    if (cidNumContainer(opt) && idType == IDTYPE_MAP.身份证) {
        var sex = calSexBirth(value).gender;
        var gender = $(".ben_gender  input")[0].checked ? "0" : "1";
        if (sex != gender) {
            showTipInfor("#ben_widget .ben_cid", "身份证信息与关系不符", true);
            return false;
        } else {
            showTipInfor("#ben_widget .ben_cid", "√", false);
            return true;
        }
    }

    return false;
}

function checkBeneIDOnly() {
    var idType = $("#ben_widget .ben_cid select").val();
    var id = $("#ben_widget .ben_cid input").val();

    if (idType == IDTYPE_MAP.身份证 || idType == IDTYPE_MAP.军官证 || idType == IDTYPE_MAP.港台同胞证 ||
        idType == IDTYPE_MAP.护照) {

        var currentIdList = []
        $(".benePersion").each(function(index, el) {
            currentIdList.push(el.benePersonInfo.idType + el.benePersonInfo.id);
        });

        if (currentIdList.indexOf(idType + id) > -1) {
            showTipInfor("#ben_widget .ben_cid", "证件号码不能重复", false);
        }
    }
}

function newBenePersonBirthCheck() {
    var birth = $("#ben_widget .ben_birth input").val();
    if (birth) {
        showTipInfor("#ben_widget .ben_birth", "√", false);

        var idType = $("#ben_widget .ben_cid select").val();
        if (idType == IDTYPE_MAP.出生日期) {
            showTipInfor("#ben_widget .ben_cid", "√", false);
            $("#ben_widget .ben_cid input").val(birth);
        }
    } else {
        showTipInfor("#ben_widget .ben_birth", "请填写出生日期", true);
    }
}

function checkBeneInsertPass() {
    var benePersonName = $(".ben_name input").val();
    var benePersonId = $(".ben_cid input").val();
    var idType = $(".ben_cid select").val();

    if (idType == IDTYPE_MAP.身份证) {
        idType = true;
    } else {
        idType = $(".ben_birth input").val();
    }

    if (benePersonName && benePersonId && idType) {
        if ($("#ben_widget .tipError").length == 0) {
            $(".save").prop("disabled", false).css("background", "#ff6600");
            return;
        }
    }

    $(".save").prop("disabled", true).css("background", "#ccc");
}

function getSelectedBeneficiaryInfo(isALL) {
    var list = [];

    $(".benePersion").each(function(index, el) {
        var beneInfo = el.benePersonInfo;
        if (isALL) {
            list.push(beneInfo);
        } else {
            if ($(el).find(".inpt_rad").prop("checked") && parseInt(beneInfo.percent) > 0) {
                var beneficiaryOption = {
                    "beneficiaryRelationship": beneInfo.rela,
                    "beneficiaryName": beneInfo.name,
                    "beneficiaryIdType": beneInfo.idType,
                    "beneficiaryId": beneInfo.id,
                    "beneficiaryGender": beneInfo.gender,
                    "beneficiaryBirth": beneInfo.birth,
                    "beneficiaryPercent": beneInfo.percent
                };
                list.push(beneficiaryOption);
            }
        }
    });
    return list;
}

function checkBeneficiaryInfo(insuredInfo, beneficiaryInfoList) {
    var insName = insuredInfo.insuredName;
    var insIdType = insuredInfo.insuredIdType;
    var insId = insuredInfo.insuredId;
    var insBirth = getPersonBirthDate(insIdType, insId, insuredInfo.insuredBirth);
    var totalPercent = 0;

    for (var i = 0; i < beneficiaryInfoList.length; i++) {
        var beneInfo = beneficiaryInfoList[i];
        var beneName = beneInfo.beneficiaryName;
        var beneIdType = beneInfo.beneficiaryIdType;
        var beneId = beneInfo.beneficiaryId;
        var beneBirth = beneInfo.beneficiaryBirth;

        if (beneName == insName) {
            layer.msg("受益人与被保人姓名相同!");
            return false;
        }

        if (beneIdType == insIdType && beneId == insId) {
            layer.msg("受益人与被保人证件信息相同!");
            return false;
        }
        beneBirth = getPersonBirthDate(beneIdType, beneId, beneBirth);

        var beneRela = beneInfo.beneficiaryRelationship;
        if (beneRela == RELATIONSHIP_MAP.father || beneRela == RELATIONSHIP_MAP.mother) {
            if (beneBirth >= insBirth) {
                layer.msg("受益人与被保人年龄不相符!");
                return false;
            }
        }

        if (beneRela == RELATIONSHIP_MAP.daughter || beneRela == RELATIONSHIP_MAP.son) {
            if (beneBirth <= insBirth) {
                layer.msg("受益人与被保人年龄不相符!");
                return false;
            }
        }
        totalPercent += parseInt(beneInfo.beneficiaryPercent);
    }

    if (totalPercent != 100) {
        layer.msg("受益比例总和必须为100!");
        return false;
    }

    return true;
}

function getPersonBirthDate(idType, id, birth) {
    var birthStr = "";
    if (idType == "01") {
        birthStr = calSexBirth(id).birthday;
    } else {
        birthStr = birth;
    }

    birthStr = birthStr.replace(new RegExp('-', 'gm'), '/');

    var birthday = new Date(birthStr);
    return birthday;
}
