var json = {
    "wapDetails": [{
        "componentId": "wapProductDesc",
        "productName": "全年综合意外保障",
        "productDescription": "每天低至0.15元！大小意外全保，工作生活、居家旅行必备！"
    }, {
        "componentId": "wapProductPrice",
        "priceType": "会员价",
        "productPrice": "50",
        "discountInfo": "4.1-4.30返还两倍积分",
        "activityTitle": "促销信息"
    }, {
        "componentId": "wapIdentityList",
        "identityList": [{
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "透明理赔"
        }, {
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "超值低价"
        }, {
            "componentId": "wapIdentity",
            "identityURL": "",
            "identityDescription": "热销爆款"
        }]
    }, {
        "componentId": "wapPackageList",
        "componentTitle": "保障责任",
        "packageNameList": [{
            "componentId": "wapPackageName",
            "packageName": "基本款"
        }, {
            "componentId": "wapPackageName",
            "packageName": "白金款"
        }],
        "packageList": [{
            "componentId": "wapPackage",
            "packageId": "xxx",
            "packageName": "基本款",
            "packagePrice": "50",
            "packageLiabilityList": [{
                "componentId": "wapLiability",
                "liabilityId": "xx",
                "liabilityName": "意外身故",
                "liabilityAmount": "10",
                "liabilityDescription": "因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。"
            }, {
                "componentId": "wapLiability",
                "liabilityId": "xx",
                "liabilityName": "公共汽车、电车意外伤害",
                "liabilityAmount": "10",
                "liabilityDescription": "因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。"
            }]
        }, {
            "componentId": "wapPackage",
            "packageId": "xxx",
            "packageName": "白金款",
            "packagePrice": "100",
            "packageLiabilityList": [{
                "componentId": "wapLiability",
                "liabilityId": "xx",
                "liabilityName": "意外身故",
                "liabilityAmount": "10",
                "liabilityDescription": "因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。"
            }, {
                "componentId": "wapLiability",
                "liabilityId": "xx",
                "liabilityName": "公共汽车、电车意外伤害",
                "liabilityAmount": "10",
                "liabilityDescription": "因意外伤害事故直接导致被保险人在该意外伤害事故发生之日起180日内身故的，将按合同约定给付受益人意外身故保险金。"
            }]
        }]
    }, {
        "componentId": "wapConditionList",
        "componentTitle": "保障说明",
        "conditions": [{
            "componentId": "wapCondition",
            "conditionName": "投保年龄",
            "conditionDescription": "出生满30天-65周岁（含）"
        }, {
            "componentId": "wapCondition",
            "conditionName": "投保期间",
            "conditionDescription": "1年"
        }]
    }]
};




"<div id=wapIdentityList>",

<div id=wapIdentity>
"<img src='identityURL' /><span>$identityDescription</span>",
</div>

"</div>"

<div><img src='$identityURL' /><span>$identityDescription</span>
<img src='$identityURL' /><span>$identityDescription</span>
<img src='$identityURL' /><span>$identityDescription</span></div>

<div id="">
    for identity in identityList
    <div><img src='$identity.identityURL' /><span>$identity.identityDescription</span></div>
    endfor
</div>


var componentDefine = {
    "wapProductDesc" : "<div><div>$productName</div><div>$productDescription</div></div>",
    "wapProductPrice" : "<div>\
            <div><span>$priceType ：</span><span>￥ $productPrice</span></div>\
            <div><span>$activityTitle ：</span><span>$discountInfo</span></div>\
        </div>",
    "wapIdentityList" : "<div>$identityList</div>",
    "wapIdentity" : "<div><img src='$identityURL' /><span>$identityDescription</span></div>",
    "wapPackageList" : "<div>\
            <div>$componentTitle</div>\
            <div>$packageNameList</div>\
            <div>$packageList</div>\
        </div>",
    "wapPackageName" : "<div>$packageName</div>",
    "wapPackage" : "<div data-packageId='$packageId' data-price='$packagePrice'>$packageLiabilityList</div>",
    "wapLiability" : "<div data-liabilityId='$liabilityId'>\
            <div><span>$liabilityName</span><span>$liabilityAmount</span></div>\
            <div>$liabilityDescription</div>\
        </div>",
    "wapConditionList" : "<div><div>$componentTitle</div><div>$conditions</div></div>",
    "wapCondition" : "<div><span>$conditionName</span><span>$conditionDescription</span></div>"
};

function demoRun(){
    console.log(json);
    var detail = json.wapDetails;
    var parent = "<div>";



    for(var i=0;i<detail.length;i++){
        var component = detail[i];
        var cid = component.componentId;
        var define = getComponents(cid);

        if(cid=="wapProductDesc"){
            define = define.replace("$productName",component.productName);
            define = define.replace("$productDescription",component.productDescription);
        }else if(cid=="wapProductPrice"){
            define = define.replace("$priceType",component.priceType);
            define = define.replace("$productPrice",component.productPrice);
            define = define.replace("$activityTitle",component.activityTitle);
            define = define.replace("$discountInfo",component.discountInfo);
        }else if(cid=="wapIdentityList") {
            var subHTML = "";
            for(var j=0;j<component.identityList.length;j++){
                var subComponent = component.identityList[j];
                var subDefine = getComponents(subComponent.componentId);
                subDefine = subDefine.replace("$identityURL",subComponent.identityURL);
                subDefine = subDefine.replace("$identityDescription",subComponent.identityDescription);
                subHTML+=subDefine;
            }
            define = define.replace("$identityList",subHTML);
        }else if(cid=="wapPackageList"){
            var packageNameList="";
            for(var j=0;j<component.packageNameList.length;j++){
                var subComponent = component.packageNameList[j];
                var subDefine = getComponents(subComponent.componentId);
                subDefine = subDefine.replace("$packageName",subComponent.packageName);
                packageNameList+=subDefine;
            }

            var packageList ="";
            for(var j=0;j<component.packageList.length;j++){
                var subComponent = component.packageList[j];
                var subDefine = getComponents(subComponent.componentId);

                var packageLiabilityList="";

                for(var k=0;k<subComponent.packageLiabilityList.length;k++){
                    var subsubComponent = subComponent.packageLiabilityList[k];
                    var subsubDefine = getComponents(subsubComponent.componentId);

                    subsubDefine = subsubDefine.replace("$liabilityId",subsubComponent.liabilityId);
                    subsubDefine = subsubDefine.replace("$liabilityName",subsubComponent.liabilityName);
                    subsubDefine = subsubDefine.replace("$liabilityAmount",subsubComponent.liabilityAmount);
                    subsubDefine = subsubDefine.replace("$liabilityDescription",subsubComponent.liabilityDescription);
                    packageLiabilityList+=subsubDefine;
                }
                packageNameList+=packageLiabilityList;
            }

            define = define.replace("$componentTitle",component.componentTitle);
            define = define.replace("$packageNameList",packageNameList);
            define = define.replace("$packageList",packageList);
        }else if(cid=="wapConditionList"){
            var conditions = "";
            for(var j=0;j<component.conditions.length;j++){
                var subComponent = component.conditions[j];
                var subDefine = getComponents(subComponent.componentId);
                subDefine = subDefine.replace("$conditionName",subComponent.conditionName);
                subDefine = subDefine.replace("$conditionDescription",subComponent.conditionDescription);
                conditions+=subDefine;
            }
            define = define.replace("$componentTitle",component.componentTitle);
            define = define.replace("$conditions",conditions);
        }
        parent+=define;
    }

    parent+="</div>";
    $("#test").html(parent);
}



function getComponents(id){
    return componentDefine[id];
}
