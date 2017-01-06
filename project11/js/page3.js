//创建行
function createRow(obj, arr, ind) {
    ind = ind || 0;
    var str = "";
    var className = "";
    obj.eq(ind).empty();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].tkId == "applicantIdType" || arr[i].tkId == "insuredIdType" || arr[i].tkId == "beneficiaryIdType") {
            className = "cidtype";
        } else if (arr[i].tkId == "applicantGender" || arr[i].tkId == "insuredGender" || arr[i].tkId == "beneficiaryGender") {
            className = "gender";
        } else if (arr[i].tkId == "beneficiaryRelationship" || arr[i].tkId == "insuredRelationship") {
            className = "relationship";
        } else if (arr[i].tkId == "beneficiaryPerson") {
            className = "beneficiaryPerson";
        } else if (arr[i].tkId == "applicantProfession") {
            className = "profession";
        } else if (arr[i].tkId == "applicantArea") {
            className = "area";
        } else {
            className = " ";
        }
        str += '<div class="row" tkId="' + arr[i].tkId + '" componentId="' + arr[i]["componentId"] + '">' +
            '<div class="col-id">' + arr[i].tkId + '</div>' +
            '<div class="col-name">' + arr[i].tkLable + '</div>' +
            '<div class="col-initValue">' + arr[i].tkDefaultValue + '</div>' +
            '<div class="col-dataDict ' + className + '"></div>' +
            '<div class="col-require"><input type="checkbox" checked = "checked" value = "checkbox"></div>' +
            '<div class="col-tipText">' + arr[i].tkTip + '</div>' +
            '<div class="col-desc">' + arr[i].tkDesc + '</div>' +
            '<div class="col-sort">' + (i + 1) + '</div>' +
            '</div>';

    }
    console.log(str)
    obj.eq(ind).append($(str));

}
//创建配置信息的弹框内容
function creatTr(arr, obj) {
    var oTr = $("<tr></tr>");
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        var str_td = '<td><input type="checkbox" value="' + el.tkId + '" componentId="' + el.componentId + '" tkDefaultValue = "' + el.tkDefaultValue + '" tkDesc  = "' + el.tkDesc + '" tkTip = "' + el.tkTip + '"><label>' + el.tkLable + '</label></td>';
        oTr.append($(str_td));
        if ((i + 1) % 5 == 0) {
            obj.find("tbody").append(oTr);
            oTr = $("<tr></tr>");
        } else if (i == arr.length - 1) {
            obj.find("tbody").append(oTr);

        } else {
            continue;
        }
    }
}

$(function() {
    var config = {
        init: function() {
            //全局变量的定义
            this.city = {};
            this.obj = null;
            this.newcity = {};
            this.index = new Number();
            this.oArea = null;
            this.oProfession = null;
            this.that = null;
            this.data = {};
            //让表格可以编辑
            $(".table-applicant,.table-insured,.table-beneficiary,.table-other").attr({
                "contentEditable": "true"
            });
            //让第一个平台高亮状态
            $(".tab").css("background", "").eq(0).css("background", "#FF5F2F");
        },
        dom: function() {
            var _this = this;
            //点击配置套餐显示配置框
            $("#modify-btn").click(function() {
                $("#comfim3").show();
            });
            //配置不同的项配置框内容的改变
            $("#options").change(function() {
                var val = $(this).val();
                $(".msg").find("tbody").empty();
                creatTr(_this.obj[val], $(".msg"))
            });
            //修改套餐之后确认按钮
            $("#ok-btn").click(function() {
                var type = $("#options").val();
                var arr = [];
                $(".msg").find('input[type="checkbox"]').each(function(index, item) {
                    if ($(item).prop("checked")) {
                        var tkId = $(item).val(),
                            tkLable = $(item).siblings("label").text();
                        var tkDefaultValue = $(item).attr("tkDefaultValue");
                        var componentId = $(item).attr("componentId");
                        var tkDesc = $(item).attr("tkDesc");
                        var tkTip = $(item).attr("tkTip");
                        var json = {
                            "tkId": tkId,
                            "componentId": componentId,
                            "tkLable": tkLable,
                            "tkDefaultValue": tkDefaultValue,
                            "tkDesc": tkDesc,
                            "tkTip": tkTip
                        };
                        arr.push(json);
                    } else {}
                })
                createRow($((".table-" + type)), arr, _this.index)
                $("#comfim3").hide();
                //表格的排序
                _this.methods.sort()
            });
            //数组字典的弹框
            $(".tableContent").each(function(index, item) {
                $(item).on("click", ".cidtype,.gender,.relationship,.beneficiaryPerson,.profession,.area", function() {
                    _this.that = $(this);
                    var offset = _this.that.offset();
                    var l = offset.left,
                        t = offset.top;
                    var type = _this.that.attr("class");
                    if (type.indexOf("cidtype") != -1) {
                        $("#comfim4").css({
                            left: (l + 20) + "px",
                            top: (t + 20) + "px",
                            background: "#FFF"
                        }).show();
                    } else if (type.indexOf("gender") != -1) {
                        $("#comfim5").css({
                            left: (l + 20) + "px",
                            top: (t + 20) + "px",
                            background: "#fff"
                        }).show();
                    } else if (type.indexOf("relationship") != -1) {
                        $("#comfim8").css({
                            left: (l + 20) + "px",
                            top: (t + 20) + "px",
                            background: "#FFF"
                        }).show();
                    } else if (type.indexOf("beneficiaryPerson") != -1) {
                        $("#comfim7").css({
                            left: (l + 20) + "px",
                            top: (t + 20) + "px",
                            background: "#FFF"
                        }).show();
                    } else if (type.indexOf("profession") != -1) {
                        $("#comfim6").css({
                            left: (l - 30) + "px",
                            top: (t - 30) + "px",
                            background: "#fff"
                        }).show();
                        _this.oProfession = $(this);
                    } else if (type.indexOf("area") != -1) {
                        $("#comfim9").css({
                            left: (l + 20) + "px",
                            top: (t + 20) + "px",
                            background: "#fff"
                        }).show();
                        _this.oArea = $(this);
                    }
                });
            });
            //简单通用数据字典弹框里面确定按钮
            $(".ok-btn").click(function() {
                    var label = "";
                    var key = "";
                    $(this).siblings().find(".chk").each(function(index, item) {
                        var el = $(item);
                        if (el.prop("checked")) {
                            key += el.val() + ",";
                            label += el.parent().next().text() + ",";
                        }
                    });
                    _this.that.text("");
                    _this.that.attr("key", "");
                    _this.that.text(label);
                    _this.that.attr("key", key);
                    $(this).parent().hide();
                })
                //职业弹框的确定按钮
            $("#comfim6-ok-btn").click(function() {
                var label = "";
                var key = "";
                var desc = "";
                var desc_type = "";
                for (var i = 0; i < $("#comfim6").find(".chk").length; i++) {
                    if ($("#comfim6").find(".chk").eq(i).prop("checked")) {
                        var el = $("#comfim6").find(".chk").eq(i);
                        key += $(el).val() + ",";
                        label += $(el).parent().siblings(".profession-name").text() + ",";
                        desc += $(el).parent().siblings(".profession-desc").text() + ",";
                        desc_type += $(el).parent().siblings(".profession-desc").attr("desc_type") + ",";
                    }
                }
                _this.oProfession.attr("key", "");
                _this.oProfession.text("");
                _this.oProfession.attr("desc", "");
                _this.oProfession.attr("desc_type", "");
                _this.oProfession.text(label);
                _this.oProfession.attr("key", key);
                _this.oProfession.attr("desc", desc);
                _this.oProfession.attr("desc_type", desc_type);
                $("#comfim6").hide();
            });
            //地区弹框的确定按钮
            $("#comfim9-ok-btn").click(function() {
                var label = "";
                var key = "";
                for (var i = 0; i < $("#comfim9").find(".chk").length; i++) {
                    if ($("#comfim9").find(".chk").eq(i).prop("checked")) {
                        key += $("#comfim9").find(".chk").eq(i).parent().siblings(".area-province").attr("province_code") + ",";
                        label += $("#comfim9").find(".chk").eq(i).parent().siblings(".area-province").text() + ",";
                        if ($("#comfim9").find(".chk").eq(i).parent().siblings(".area-cities").attr("key")) {
                            var province_code = "C" + $("#comfim9").find(".chk").eq(i).val();
                            var cities = $("#comfim9").find(".chk").eq(i).parent().siblings(".area-cities").text().split(",");
                            var cities_code = $("#comfim9").find(".chk").eq(i).parent().siblings(".area-cities").attr("key").split(",");
                            _this.newcity[province_code] = {};
                            for (var j = 0; j < cities_code.length - 1; j++) {
                                _this.newcity[province_code][cities_code[j]] = cities[j]
                            }
                        }
                    }
                }
                _this.oArea.attr("key", "");
                _this.oArea.text("");
                _this.oArea.text(label);
                _this.oArea.attr("key", key);
                $("#comfim9").hide();
            });
            //下一步提交按钮的操作
            $("#next-btn").click(function() {
                var conform_str = $(".content_table").length == $(".tab").length ? "您已经配完所有产品。确认不在修改啦吗？" : ("您才配置到" + $(".tab").eq($(".content_table").length - 1).text() + "您要其他产品和第一个产品一样吗？");
                var user_sure = confirm(conform_str);
                //修改健康告知状态
                var healthInfo = sessionStorage.getItem("healthConfig");
                healthInfo = JSON.parse(healthInfo);
                if (user_sure) {
                    var content_table_length = $(".content_table").length;
                    for (var i = 0; i < $(".tab").length - content_table_length; i++) {
                        $(".content_table").eq(0).clone(true).insertAfter($(".content_table").eq($(".content_table").length - 1));
                    }
                    //遍历各个平台
                    for (var i = 0; i < $(".tab").length; i++) {
                        _this.data[$(".tab").eq(i).text() + "Inputs"] = [];
                        //投保人
                        var applicant = {
                            "componentId": "tkApplicantInfo",
                            "componentTitle": "投保人信息",
                            "applicantInfo": [{
                                "componentId": "tkApplicantHealth",
                                "tkId": "applicantHealth",
                                "tkLable": "健康告知",
                                "tkTip": "健康告知",
                                "tkDesc": "有无健康告知",
                                "tkRequired": true,
                                "tkDefaultValue": false,
                                "tkType": "",
                                "tkOptions": "",
                                "tkIndex": 0
                            }]
                        };
                        applicant.applicantInfo[0].tkDefaultValue = healthInfo[$(".tab").eq(i).text()];
                        //被保人
                        var insured = {
                            "componentId": "tkInsuredInfo",
                            "componentTitle": "被保险人信息",
                            "insuredInfo": []
                        };
                        //受益人
                        var beneficiary = {
                            "componentId": "tkBeneficiaryInfo",
                            "componentTitle": "受益人信息",
                            "beneficiaryInfo": []
                        };
                        // 其他
                        var other = {
                                "componentId": "tkOtherInfo",
                                "componentTitle": "其他信息",
                                "otherInfo": []
                            }
                            //投保人
                        $(".table-applicant").eq(i).find(".row").each(function(index, el) {

                            var el = $(el);
                            var isRequired;
                            if (el.find(".col-require").find("input[type=checkbox]").prop("checked")) {
                                isRequired = "true";
                            } else {
                                isRequired = "false";
                            }
                            var applicantOption = {};
                            applicantOption.componentId = el.attr("componentId");
                            applicantOption.tkId = el.attr("tkId");
                            applicantOption.tkLable = el.find(".col-name").text();
                            applicantOption.tkTip = el.find(".col-tipText").text();
                            applicantOption.tkDesc = el.find(".col-desc").text();
                            applicantOption.tkRequired = isRequired;
                            applicantOption.tkDefaultValue = el.find(".col-initValue").text();
                            applicantOption.tkType = ""
                            applicantOption.tkOptions = {};
                            if (el.find(".col-dataDict").attr("key")) {
                                if (el.find(".col-dataDict").hasClass("profession")) {
                                    var arr_value1 = el.find(".col-dataDict").text().split(",");
                                    var arr_key1 = el.find(".col-dataDict").attr("key").split(",");
                                    var arr_desc = el.find(".col-dataDict").attr("desc").split(",");
                                    var arr_desc_type = el.find(".col-dataDict").attr("desc_type").split(",");
                                    applicantOption.tkOptions.value = {};
                                    applicantOption.tkOptions.desc = {};
                                    applicantOption.tkOptions.desc_type = {};
                                    for (var i = 0; i < arr_value1.length - 1; i++) {
                                        applicantOption.tkOptions.value[arr_value1[i]] = arr_key1[i];
                                        applicantOption.tkOptions.desc[arr_key1[i]] = arr_desc[i];
                                        applicantOption.tkOptions.desc_type[arr_key1[i]] = arr_desc_type[i];
                                    }
                                } else if (el.find(".col-dataDict").hasClass("area")) {
                                    var province_text = el.find(".col-dataDict").text().split(",");
                                    var province_key = el.find(".col-dataDict").attr("key").split(",");
                                    var sendCity = {};
                                    applicantOption.tkOptions.province = {};
                                    applicantOption.tkOptions.city = {};
                                    for (var i = 0; i < province_key.length - 1; i++) {
                                        applicantOption.tkOptions.province[province_text[i]] = province_key[i];
                                        applicantOption.tkOptions.city[("C" + province_key[i])] = _this.newcity[("C" + province_key[i])] || _this.city[("C" + province_key[i])]
                                    }
                                } else {
                                    var arr_value = el.find(".col-dataDict").text().split(",");
                                    var arr_key = el.find(".col-dataDict").attr("key").split(",");
                                    for (var i = 0; i < arr_value.length - 1; i++) {
                                        applicantOption.tkOptions[arr_value[i]] = arr_key[i];
                                    }
                                }
                            } else {
                                applicantOption.tkOptions = "";
                            }

                            applicant.applicantInfo.push(applicantOption);

                        })

                        //被保人
                        $(".table-insured").eq(i).find(".row").each(function(index, el) {
                                var el = $(el);
                                var isRequired;
                                if (el.find(".col-require").find("input[type=checkbox]").prop("checked")) {
                                    isRequired = "true";
                                } else {
                                    isRequired = "false";
                                }
                                var insuredOption = {};
                                insuredOption.componentId = el.attr("componentId");
                                insuredOption.tkId = el.attr("tkId");
                                insuredOption.tkLable = el.find(".col-name").text();
                                insuredOption.tkTip = el.find(".col-tipText").text();
                                insuredOption.tkDesc = el.find(".col-desc").text();
                                insuredOption.tkRequired = isRequired;
                                insuredOption.tkDefaultValue = el.find(".col-initValue").text();
                                insuredOption.tkType = ""
                                insuredOption.tkOptions = {};
                                if (el.find(".col-dataDict").attr("key")) {
                                    var arr_value = el.find(".col-dataDict").text().split(",");
                                    var arr_key = el.find(".col-dataDict").attr("key").split(",");

                                    for (var i = 0; i < arr_value.length - 1; i++) {
                                        insuredOption.tkOptions[arr_value[i]] = arr_key[i];
                                    }
                                } else {
                                    insuredOption.tkOptions = "";
                                }

                                insured.insuredInfo.push(insuredOption)
                            })
                            //受益人
                        $(".table-beneficiary").eq(i).find(".row").each(function(index, el) {
                                var el = $(el);
                                var isRequired;
                                if (el.find(".col-require").find("input[type=checkbox]").prop("checked")) {
                                    isRequired = "true";
                                } else {
                                    isRequired = "false";
                                }
                                var beneficiaryOption = {}
                                beneficiaryOption.componentId = el.attr("componentId");
                                beneficiaryOption.tkId = el.attr("tkId");
                                beneficiaryOption.tkLable = el.find(".col-name").text();
                                beneficiaryOption.tkTip = el.find(".col-tipText").text()
                                beneficiaryOption.tkDesc = el.find(".col-desc").text();
                                beneficiaryOption.tkRequired = isRequired;
                                beneficiaryOption.tkDefaultValue = el.find(".col-initValue").text();
                                beneficiaryOption.tkType = ""
                                beneficiaryOption.tkOptions = {};
                                if (el.find(".col-dataDict").attr("key")) {
                                    var arr_value = el.find(".col-dataDict").text().split(",");
                                    var arr_key = el.find(".col-dataDict").attr("key").split(",");

                                    for (var i = 0; i < arr_value.length - 1; i++) {
                                        beneficiaryOption.tkOptions[arr_value[i]] = arr_key[i];
                                    }
                                } else {
                                    beneficiaryOption.tkOptions = "";
                                }

                                beneficiary.beneficiaryInfo.push(beneficiaryOption);

                            })
                            //其他信息
                        $(".table-other").eq(i).find(".row").each(function(index, el) {

                            var el = $(el);
                            var isRequired;
                            if (el.find(".col-require").find("input[type=checkbox]").prop("checked")) {
                                isRequired = "true";
                            } else {
                                isRequired = "false";
                            }
                            var otherOption = {};
                            otherOption.componentId = el.attr("componentId");
                            otherOption.tkId = el.attr("tkId");
                            otherOption.tkLable = el.find(".col-name").text();
                            otherOption.tkTip = el.find(".col-tipText").text();
                            otherOption.tkDesc = el.find(".col-desc").text();
                            otherOption.tkRequired = isRequired;
                            otherOption.tkDefaultValue = el.find(".col-initValue").text();
                            otherOption.tkType = ""
                            otherOption.tkOptions = {};
                            if (el.find(".col-dataDict").attr("key")) {
                                var arr_value = el.find(".col-dataDict").text().split(",");
                                var arr_key = el.find(".col-dataDict").attr("key").split(",");

                                for (var i = 0; i < arr_value.length - 1; i++) {
                                    otherOption.tkOptions[arr_value[i]] = arr_key[i];
                                }
                            } else {
                                otherOption.tkOptions = "";
                            }

                            other.otherInfo.push(otherOption);

                        });
                        var platform = $(".tab").eq(i).text();
                        _this.data[platform + "Inputs"].push(applicant);
                        _this.data[platform + "Inputs"].push(insured);
                        if (platform != "wechat" && platform != "cps") {
                            _this.data[platform + "Inputs"].push(beneficiary);
                            _this.data[platform + "Inputs"].push(other);
                        }
                    }

                    var wechat_data = sessionStorage.getItem("details") || "";
                    if (wechat_data) {
                        wechat_data = JSON.parse(wechat_data);
                        wechat_data = wechat_data.wechatEntity;
                        if (wechat_data) {
                            wechat_data = wechat_data.concat(_this.data.wechatInputs);
                            var wechatLink = sessionStorage.getItem("wechatLink");
                            if (wechatLink) {
                                wechatLink = JSON.parse(wechatLink);
                                wechat_data.push(wechatLink);
                            }
                        }
                    }
                    var cps_data = sessionStorage.getItem("details") || "";
                    if (cps_data) {
                        cps_data = JSON.parse(cps_data);
                        cps_data = cps_data.cpsEntity;
                        if (cps_data) {
                            cps_data = cps_data.concat(_this.data.cpsInputs);
                            var cpsLink = sessionStorage.getItem("cpsLink");
                            if (cpsLink) {
                                cpsLink = JSON.parse(cpsLink);
                                cps_data.push(cpsLink);
                            }
                        }
                    }
                    sessionStorage.setItem("data", JSON.stringify(_this.data));
                    var productId = sessionStorage.getItem("productId");
                    var success = true;
                    $.each(_this.data, function(index, item) {
                        if (index == "pcInputs") {
                            var pc_data = {};
                            pc_data[index] = item;
                            $.ajax({
                                type: "post",
                                url: "http://insure.test.hera.tk.cn/hera_center/rest/product/v1/metadata/" + productId + "/pc/inputs",
                                async: false,
                                data: JSON.stringify(pc_data),
                                dataType: "json"
                            }).done(function() {
                                alert("pcInputs upload success!");
                            }).fail(function() {
                                alert("pcInputs upload fail!");
                                success = false;
                            });
                        } else if (index == "wapInputs") {
                            var wap_data = {};
                            wap_data[index] = item;
                            $.ajax({
                                type: "post",
                                url: "http://insure.test.hera.tk.cn/hera_center/rest/product/v1/metadata/" + productId + "/wap/inputs",
                                async: false,
                                data: JSON.stringify(wap_data),
                                dataType: "json"
                            }).done(function() {
                                alert("wapInputs upload success!");
                            }).fail(function() {
                                alert("wapInputs upload fail!");
                                success = false;
                            });;
                        } else if (index == "appInputs") {
                            var app_data = {};
                            app_data[index] = item;
                            $.ajax({
                                type: "post",
                                url: "http://insure.test.hera.tk.cn/hera_center/rest/product/v1/metadata/" + productId + "/app/inputs",
                                async: false,
                                data: JSON.stringify(app_data),
                                dataType: "json"
                            }).done(function() {
                                alert("appInputs upload success!");
                            }).fail(function() {
                                alert("appInputs upload fail!");
                                success = false;
                            });;
                        } else if (index == "wechatInputs") {
                            if (wechat_data) {
                                $.ajax({
                                    type: "post",
                                    url: "http://insure.test.hera.tk.cn/hera_center/rest/product/v1/metadata/" + productId + "/wechat/entity",
                                    async: false,
                                    data: JSON.stringify({
                                        "wechatEntity": wechat_data
                                    }),
                                    dataType: "json"
                                }).done(function() {
                                    alert("wechatInputs upload success!");
                                }).fail(function() {
                                    alert("wechatInputs upload fail!");
                                    success = false;
                                });;
                            }
                        } else if (index == "cpsInputs") {
                            if (cps_data) {
                                $.ajax({
                                    type: "post",
                                    url: "http://insure.test.hera.tk.cn/hera_center/rest/product/v1/metadata/" + productId + "/cps/entity",
                                    async: false,
                                    data: JSON.stringify({
                                        "cpsEntity": cps_data
                                    }),
                                    dataType: "json"
                                }).done(function() {
                                    alert("cpsInputs upload success!");
                                }).fail(function() {
                                    alert("cpsInputs upload fail!");
                                    success = false;
                                });
                                // sessionStorage.setItem("cpsData",JSON.stringify({"cpsEntity":cps_data}))
                            }

                        }
                    });
                    if (success) {
                        //location.href = "paymentConfig.html";
                        location.href = "noticeAndTerms.html";
                    }
                }
            });
            //tab切换配置不同产品
            $(".tab").click(function() {
                var ind = $(this).index();
                // console.log($(this));
                $(".tab").css("background", "").eq(ind).css("background", "#FF5F2F");
                if ($(".content_table").eq(ind).length == 0) {
                    if ($(".content_table").eq(ind - 1).length == 0) {
                        var ind_num = (ind + 1) - $(".content_table").length;
                        for (var i = 0; i < ind_num; i++) {
                            $(".content_table").eq(i).clone(true).insertAfter($(".content_table").eq($(".content_table").length - 1));
                        }
                    } else {
                        $(".content_table").eq(ind - 1).clone(true).insertAfter($(".content_table").eq(ind - 1));
                    }
                }
                $(".content_table").hide().eq(ind).show();
                $(".table-applicant,.table-insured,.table-beneficiary,.table-other").attr({
                    "contentEditable": "true"
                })
                _this.index = ind;
                _this.methods.sort();
            });
        },
        methods: {
            sort: function() {
                var _this = config;
                var eleDrag = null;
                var outerHTML = "";
                var ind = null;
                $(".col-sort").attr("draggable", "true")
                for (var i = 0; i < $(".col-sort").length; i += 1) {
                    $(".col-sort")[i].onselectstart = function() {
                        //阻止被选中
                        return false;
                    };
                    $(".col-sort")[i].ondrag = function(ev) {
                        /*拖拽开始*/
                        //拖拽效果
                        // ev.dataTransfer.effectAllowed = "move";
                        // ev.dataTransfer.setData("text", ev.target.parentNode.outerHTML);
                        // ev.dataTransfer.setDragImage(ev.target, 0, 0);
                        eleDrag = ev.target;
                        ev.preventDefault();
                        return false;
                    };
                    $(".col-sort")[i].ondragover = function(ev) {
                        /*拖拽元素在目标元素头上移动的时候*/
                        ev.preventDefault();
                        this.parentNode.style.background = "#f00";
                        // this.style.backgroundColor = "#f00";
                        return false;
                    };
                    $(".col-sort")[i].ondragleave = function(ev) {
                        /*拖拽元素在目标元素头上离开的时候*/
                        ev.preventDefault();
                        this.parentNode.style.background = "#fff";
                        // this.style.backgroundColor = "#f00";
                        return false;
                    };
                    $(".col-sort")[i].ondrop = function(ev) {
                        this.parentNode.style.background = "#fff"
                            /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
                        if (eleDrag != this) {
                            var ind = eleDrag.innerHTML;
                            eleDrag.innerHTML = this.innerHTML;
                            this.innerHTML = ind;
                            var html = eleDrag.parentNode.outerHTML;
                            eleDrag.parentNode.outerHTML = this.parentNode.outerHTML;
                            this.parentNode.outerHTML = html;

                            // $(eleDrag.parentNode).clone(true).insertBefore($(ev.target.parentNode))
                            // eleDrag.parentNode.parentNode.removeChild(eleDrag.parentNode);
                        }
                        _this.methods.sort()
                        return false;
                    };
                }
            },
            dele: function() {
                $(".col-delete").click(function() {
                    $(this).parent().nextAll().each(function(index, item) {
                        var index = $(item).find(".col-sort").html();
                        $(item).find(".col-sort").html(index - 1)
                    })
                    $(this).parent().remove();
                })
            },
            quxiao: function() {
                $(".cancal-btn").click(function() {
                    $(this).parent().hide()
                })
            },
            //判断发布平台的目录有几个
            list: function() {
                var list = sessionStorage.getItem("returnMessage");
                var oList = JSON.parse(list);
                for (var item in oList) {
                    if (!oList[item]) {
                        $((".tab:contains(" + item + ")")).remove();
                    }
                }
                $(".tab").css("background", "").eq(0).css("background", "#FF5F2F");
            },
            //弹框的插入
            tankuang: function() {
                var _this = config;
                $.ajax({
                    type: "get",
                    url: "http://insure.test.hera.tk.cn/hera_center/rest/config/v1/business/list?businessType=identityType,gender,occupation,relationToApplicant,relationBenToInsured,area",
                    async: true,
                    dataType: "json"
                }).done(aaa)

                function aaa(msg) {
                    var obj = msg;
                    _this.city = obj.area.city;
                    var relationToApplicant = obj.relationToApplicant;
                    for (var item in obj.relationToApplicant) {
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + obj.relationToApplicant[item] + '" class="chk"></td>' +
                            '<td class="relationship-name">' + item + '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            '</tr>';

                        $(".comfim8").find("tbody").append(oTr);
                    }
                    for (var item in obj.occupation.value) {
                        var desc = obj.occupation.desc[item].substring((obj.occupation.desc[item].indexOf("：") + 1));
                        var desc_type = obj.occupation.desc[item].substring(0, (obj.occupation.desc[item].indexOf("："))) || "不限";
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + item + '" class="chk"></td>' +
                            '<td class="profession-name">' + obj.occupation.value[item] + '</td>' +
                            '<td></td>' +
                            '<td class="profession-desc" desc_type = "' + desc_type + '">' + desc + '</td>' +
                            '</tr>';
                        $(".comfim6").find("tbody").append(oTr);
                    }
                    for (var item in obj.identityType) {
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + obj.identityType[item] + '" class="chk"></td>' +
                            '<td class="type-name">' + item + '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            '</tr>';

                        $(".comfim4").find("tbody").append(oTr);
                    }
                    for (var item in obj.gender) {
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + obj.gender[item] + '" class="chk"></td>' +
                            '<td class="gender-name">' + item + '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            '</tr>';

                        $(".comfim5").find("tbody").append(oTr);
                    }
                    for (var item in obj.area.province) {
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + item + '" class="chk"></td>' +
                            '<td class="area-province" province_code = "' + item + '">' + obj.area.province[item] + '</td>' +
                            '<td class="area-cities" province_code = "' + item + '"></td>' +

                            '</tr>';

                        $(".comfim9").find("tbody").append(oTr);
                    }
                    _this.methods.profession_desc();
                    _this.methods.area_city();
                }
            },
            //配置input组件的动态获取
            peizhizujian: function() {
                var _this = config;
                $.ajax({
                    type: "get",
                    url: "http://insure.test.hera.tk.cn/hera_center/rest/component/v1/webComponent/list?category=applicant,insured,beneficiary,other",
                    async: true,
                    dataType: "json"
                }).done(bbb);
                // bbb();
                function bbb(msg) {
                    _this.obj = msg.data;
                    var oSelect = $("#options")[0];
                    for (var item in _this.obj) {
                        _this.obj[item].sort(function(arr1, arr2) {
                            return arr1["tkIndex"] - arr2["tkIndex"];
                        })

                        if (item == "applicant") {
                            oSelect[0] = new Option("投保人", "applicant");
                            var applicant = _this.obj[item];
                            creatTr(applicant, $("#applicant"));
                        } else if (item == "insured") {
                            oSelect[1] = new Option("被保人", "insured");
                            // creatTr(obj[item],$("#insured"));
                        } else if (item == "beneficiary") {
                            oSelect[2] = new Option("受益人", "beneficiary");
                            // creatTr(obj[item],$("#beneficiary"));
                        } else if (item == "other") {
                            oSelect[3] = new Option("其他信息", "other");
                            // creatTr(obj[item],$("#other"));
                        }
                    }
                }
            },
            //全选
            quanxuan: function() {
                //配置信息的全选
                $(".product-all").click(function() {
                    if ($(this).prop("checked")) {
                        $(".msg").find('input[type="checkbox"]').prop("checked", true);
                    } else {

                        $(".msg").find('input[type="checkbox"]').prop("checked", false);
                    }
                })
                $(".all").click(function() {
                    if ($(this).prop("checked")) {
                        $(this).parent().parent().siblings().find(".chk").prop("checked", true)
                    } else {
                        $(this).parent().parent().siblings().find(".chk").prop("checked", false)
                    }
                })
            },
            //职业描述弹框
            profession_desc: function() {
                var oProfessionDesc;
                $(".profession-desc").click(function() {
                    var that = $(this);
                    var offset = that.offset();
                    var l = offset.left,
                        t = offset.top;
                    var init_text = $(this).text().split("、");
                    var desc_type = $(this).attr("desc_type");
                    var str = "";
                    for (var i = 0; i < init_text.length; i++) {
                        str += init_text[i] + "\n";
                    }
                    $(".comfim-profession").find("textarea").val(str);
                    $(".comfim-profession").find(("input[value='" + desc_type + "']")).prop("checked", true);
                    $(".comfim-profession").css({
                        left: (l + 20) + "px",
                        top: (t + 20) + "px",
                        background: "#FFF"
                    }).show();
                    oProfessionDesc = $(this);
                })
                $(".comfim-ok-btn").click(function() {
                    var text = $(this).siblings("textarea").val();
                    var text_arr = text.split("\n");
                    oProfessionDesc.empty();
                    oProfessionDesc.attr("desc_type", "")
                    var desc_type = $(".comfim-profession").find("input[type='radio']:checked").val() || "不限";
                    for (var i = 0; i < text_arr.length; i++) {
                        if (text_arr[i]) {
                            oProfessionDesc.append((text_arr[i] + "、"))
                        }
                    }
                    oProfessionDesc.attr("desc_type", desc_type)
                    $(".comfim-profession").hide();
                })
            },
            //地区二级的弹框
            area_city: function() {
                var _this = config;
                var oArea_city;
                $(".area-cities").click(function() {
                    var that = $(this);
                    var offset = that.offset();
                    var l = offset.left,
                        t = offset.top;
                    var province_code = "C" + $(this).attr("province_code");
                    $("#comfim10").find("tbody").children("tr:eq(0)").siblings().remove();
                    for (var item in _this.city[province_code]) {
                        var oTr =
                            '<tr>' +
                            '<td><input type="checkbox" value="' + item + '" class="chk" checked></td>' +
                            '<td class="area-city">' + _this.city[province_code][item] + '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            '</tr>';
                        $("#comfim10").find("tbody").append(oTr);
                    }
                    $("#comfim10").css({
                        left: (l + 20) + "px",
                        top: (t + 20) + "px",
                        background: "#FFF"
                    }).show();
                    oArea_city = $(this);
                })
                $("#comfim10-ok-btn").click(function() {
                    var label = "";
                    var key = "";
                    for (var i = 0; i < $("#comfim10").find(".chk").length; i++) {
                        if ($("#comfim10").find(".chk").eq(i).prop("checked")) {
                            var text = $("#comfim10").find(".chk").eq(i).parent().siblings(".area-city").text();
                            var value = $("#comfim10").find(".chk").eq(i).val();
                            label += text + ",";
                            key += value + ",";
                        }
                    }
                    oArea_city.attr("key", "");
                    oArea_city.text("");
                    oArea_city.text(label);
                    oArea_city.attr("key", key);
                    $("#comfim10").hide();
                })
            }
        },
        ready: function() {
            this.init();
            this.methods.quxiao();
            this.methods.list();
            this.methods.tankuang();
            this.methods.quanxuan();
            this.methods.peizhizujian();
            this.dom();
        }
    }
    config.ready();
});
