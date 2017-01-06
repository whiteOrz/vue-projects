(function(global, factory) {
    global.component_inputs = factory()
}(this, function() {
    var components = {};

    components.tkApplicantInfo = '<div class="list"><ul class="item tkApplicantInfo"></ul></div>';
    components.tkApplicantName = '<li><h3>$lable</h3><p><input type="text"class="tkapplicantName"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"姓名\");_smq2(\"投保流程_填写个人信息姓名\");"></p></li>';
    components.tkApplicantId = '<li><h3 class="selarea"><select id="appCidtype"class="tkapplicantIdType"><option>身份证</option></select><span class="icon-arr2"></span></h3><p><input type="email"class="tkapplicantId cidNumber"placeholder="请输入证件号码"id="appCidNumber"onblur="_smq1(\"投保流程_填写个人信息\",\"证件号码\");_smq2(\"投保流程_填写个人信息证件号码\");"></p></li>';
    components.tkApplicantGender = '<li style="display:none;"class="otherType"><h3>$lable</h3><p class="selarea"><select class="c2 gender tkapplicantGender"onchange="_smq1(\"投保流程_填写个人信息\",\"性别\");_smq2(\"投保流程_填写个人信息性别\");"><option value="1">男</option></select><span class="icon-arr2"></span></p></li>';
    components.tkApplicantBirth = '<li style="display:none;"class="otherType"><h3>$lable</h3><p class="selarea"><input type="text"class="tkapplicantBirth"value=""placeholder="请选择"readonly="readonly"class="birth"onchange="_smq1(\"投保流程_填写个人信息\",\"出生日期\");_smq2(\"投保流程_填写个人信息出生日期\");"><span class="icon-arr2"></span></p></li>';
    components.tkApplicantPhone = '<li><h3>$lable</h3><p><input type="tel"class="tkapplicantPhone"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"电话号码\");_smq2(\"投保流程_填写个人信息电话号码\");"/></p></li>';
    components.tkApplicantEmail = '<li><h3>$lable</h3><p class="parentCls"><input type="email"value=""class="inputElem tkapplicantEmail"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"电子邮箱\");_smq2(\"投保流程_填写个人信息电子邮箱\");"></p></li>';
    components.tkApplicantAddress = '<li><h3>$lable</h3><p><input type="text"class="tkapplicantAddress"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"地址\");_smq2(\"投保流程_填写个人信息地址\");"></p></li>';
    components.tkApplicantArea = '<li><h3>$lable</h3><p class="selarea"><input type="text"class="tkapplicantArea"value=""placeholder="请选择"onchange="_smq1(\"投保流程_填写个人信息\",\"投保地区\");_smq2(\"投保流程_填写个人信息投保地区\");"/><span class="icon-arr2"></span></p><input type="hidden"id="hd_area"value=","/></li>';
    components.tkApplicantProfession = '<li><h3>$lable</h3><p class="selarea professSelect"><input type="text"value=""class="inputElem tkapplicantProfession"placeholder="$placeholder"readonly="readonly"onblur="_smq1(\"投保流程_填写个人信息\",\"职业\");_smq2(\"投保流程_填写个人信息职业\");"/><span class="icon-arr2"></span></p></li>';
    components.tkHouseArea = '<li><h3>$lable</h3><p class="selarea"><input type="text"class="tkhouseArea"value=""placeholder="请选择"onchange="_smq1(\"投保流程_填写个人信息\",\"房屋地区\");_smq2(\"投保流程_房屋地区\");"/><span class="icon-arr2"></span></p><input type="hidden"id="hd_area1"value=","/></li>';
    components.tkHouseAddress = '<li><h3>$lable</h3><p><input type="text"class="tkapplicantAddressDetails"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"房屋地址\");_smq2(\"投保流程_填写房屋地址\");"></p></li>';
    components.tkHouseRelationship = '<li><h3>$lable</h3><p class="selarea"><select class="c2  tkapplicantRelationHouse"onchange="_smq1(\"投保流程_填写个人信息\",\"房屋关系\");_smq2(\"投保流程_填写房屋关系\");"><option value="01">房主</option><option value="02">房主亲戚</option><option value="03">租户</option></select><span class="icon-arr2"></span></p></li>';
    components.tkApplicantHealth = '<div tkDefaultValue="$tkDefaultValue"id="applicantHealth"class="applicantHealth"style="display:none;"></div>';
    components.tkInsuredInfo = '<div class="list tm10"><ul class="item tkInsuredInfo"></ul></div>';
    components.tkInsuredRelationship = '<li class="insRelation"><h3>$lable</h3><p class="selarea tkinsuredRelationship"><select class="c2"><option value="1">本人</option></select><span class="icon-arr2"></span></p></li>';
    components.tkInsuredName = '<li><h3>$lable</h3><p><input type="text"class="tkinsuredName"placeholder="$placeholder"onblur="_smq1(\"投保流程_填写个人信息\",\"被保人姓名\");_smq2(\"投保流程_填写个人信息被保人姓名\");"></p></li>';
    components.tkInsuredId = '<li><h3 class="selarea"><select id="insCidtype"class="tkinsuredIdType"><option>身份证</option></select><span class="icon-arr2"></span></h3><p class="insIdNumber"><input type="email"class="tkinsuredId"placeholder="请输入证件号码"id="insCidNumber"/></p><p class="insIdDate"style="display:none;"><input type="text"value=""placeholder="请选择"readonly="readonly"id="insIdDate"class="idDate tkinsuredId"onblur="_smq1(\"投保流程_填写被保人信息\",\"地址\");_smq2(\"投保流程_填写被保人信息地址\");"/><span class="icon-arr2"></span></p></li>';
    components.tkInsuredGender = '<li style="display:none;"class="otherType"><h3>$lable</h3><p class="selarea"><select class="c2 gender tkinsuredGender"onchange="_smq1(\"投保流程_填写个人信息\",\" 被保人性别\");_smq2(\"投保流程_填写个人信息被保人性别\");"><option value="1">男</option></select><span class="icon-arr2"></span></p></li>';
    components.tkInsuredBirth = '<li style="display:none;"class="otherType"><h3>$lable</h3><p class="selarea"><input type="text"value=""placeholder="请选择"readonly="readonly"class="birth tkinsuredBirth"/><span class="icon-arr2"></span></p></li>';
    components.tkBeneficiaryInfo = '<div class="list tm10"><ul class="item tkBeneficiaryInfo"></ul></div>';
    components.beneficiaryRelationship = '<li class="beneRelation"><h3>$lable</h3><p class="selarea"><select class="c2"><option>本人</option></select><span class="icon-arr2"></span></p></li>';

    return function(componentId) {
        if (components[componentId]) {
            return components[componentId];
        }

        return "<div></div>";
    }
}));
