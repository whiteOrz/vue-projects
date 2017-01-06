//返回值
var detailsArr = [];

function findArrSame(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

function findArrIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i
        }
    }
}
//测算因子->添加字段
function setDataConfig1() {
    var arr = [];
    var arrTxt = [];
    var label = $("#dataConfig1 label");
    var len = "";
    $("#dataConfig1 input:checked").each(function(index, el) {
        var $el = $(el);
        var chkIndex = $el.index(("#dataConfig1 input"));
        var val = $el.val();
        var txt = label.eq(chkIndex).text();
        arr.push(val);
        arrTxt.push(txt);
    });

    if ($("#dataConfig1 input:checked").length < 1) {
        alert("请选择添加项目");
        return;
    }

    function createTr(data, dataTxt, len) {
        var str = "";

        for (var i = 0; i < data.length; i++) {
            var dictId = "factorVal" + (len + i);
            str += '<tr data-type="' + data[i] + '">' +
                '<td class="factorName">' + dataTxt[i] + '</td>' +
                '<td class="factorCode"><input type="text" /></td>' +
                '<td class="factorVal" id="' + dictId + '"></td>' +
                '<td><input type="button" value="删除" class="btnDel"></td>' +
                '</tr>'
        }
        $("#tableFactor tbody").append(str);
    }
    if ($("#tableFactor tbody").children("tr").length <= 0) {
        len = $("#tableFactor tbody").children("tr").length;
        createTr(arr, arrTxt, len);
    } else {
        var childTr = $("#tableFactor tbody").children("tr");
        len = childTr.length;
        childTr.each(function(index, el) {
            var $el = $(el);
            var val = $el.attr("data-type");

            if (findArrSame(arr, val)) {
                var valIndex = findArrIndex(arr, val);
                var txt = arrTxt[valIndex];
                alert(txt + "已经添加了");
                arr.splice(valIndex, 1);
                arrTxt.splice(valIndex, 1);
            }
        });
        createTr(arr, arrTxt, len);
    }

    $("#dataConfig1").hide();
    $("#dataConfig1 input[type=checkbox]").prop("checked", false);
}
//测算因子->value 添加
function setDataConfig2() {
    var str = "";
    var objId = $("#dataConfig2").attr("data-id");
    var dataType = $("#dataConfig2").attr("data-type");
    var codeArr = [];
    var valueArr = [];
    $("#factorCon tbody tr").each(function(index, el) {
        var $el = $(el);
        var itemCode = $el.find(".itemCode").val();
        var itemValue = $el.find(".itemValue").val();
        codeArr.push(itemCode);
        valueArr.push(itemValue);

    });

    function createItemTr(arr, arr1) {
        for (var i = 0; i < arr.length; i++) {
            str += '<p data-type="' + arr[i] + '">' + arr[i] + ',' + arr1[i] + '</p>'
        }
        $("#" + objId).append(str);
    }

    if ($("#" + objId).find("p").length < 1) {
        createItemTr(codeArr, valueArr);
    } else {
        var childP = $("#" + objId).find("p");
        childP.each(function(index, el) {
            var $el = $(el);
            var type = $el.attr("data-type");
            if (findArrSame(codeArr, type)) {
                var itemIndex = findArrIndex(codeArr, type);
                alert(type + "已经添加了")
                codeArr.splice(itemIndex, 1);
                valueArr.splice(itemIndex, 1);

            }
        });
        createItemTr(codeArr, valueArr);
    }

    $("#dataConfig2").hide();
    $("#factorCon tbody tr").eq(0).find("input[type='text']").val("");
    $("#factorCon tbody tr:not(:first)").remove();
}

//添加保障责任
function initRespon() {
    var str = '';
    var responPriceArr = [];
    $("#tableList tbody").empty();

    $("#tableRespon tbody tr").each(function(index, el) {
        var $el = $(el);
        var txtResponName = $el.find("input.responName").val();
        var txtResponExplain = $el.find("textarea.responExplain").val();
        var txtResponCode = $el.find("input.responCode").val();
        var txtResponPrice = $el.find("input.responPrice").val();
        responPriceArr.length = 0;

        txtResponPrice = txtResponPrice.replace(/，/g, ",");
        responPriceArr = txtResponPrice.split(",");

        var options = '';
        for (var i = 0; i < responPriceArr.length; i++) {
            options += '<option value="' + responPriceArr[i] + '">' + responPriceArr[i] + '</option>';
        }

        str += '<tr>' +
            '<td><input type="checkbox"></td>' +
            '<td class="responName">' + txtResponName + '</td>' +
            '<td class="resopnPrice"><select>' + options + '</select><p class="responExplain" style="display:none;">' + txtResponExplain + '</p><p  class="responCode" style="display:none;">' + txtResponCode + '</p></td>' +
            '</tr>'
    });
    $("#tableList tbody").append(str);

}
//套餐->添加字段
function setDataConfig3() {
    var inputData = $.trim($("#config3Input").val());
    var str = "";
    var len = "";
    if (inputData == "") {
        alert("请填写套餐名称");
        return;
    }
    inputData = inputData.split("\n");
    var map = {};
    inputData = $.grep(inputData, function(el, i) {
        return el && (map[el] ? false : map[el] = true);
    });


    function createPackageTr(arr) {
        $.each(arr, function(index, value) {
            var id = "packageValue" + (len + index);
            str += '<tr data-type="' + value + '">' +
                '<td class="packageName">' + value + '</td>' +
                '<td class="packageValue" id="' + id + '"></td>' +
                '</tr>';
        });
        $("#tablePackage tbody").append(str);
    }


    if ($("#tablePackage tbody tr").length == 1) {
        len = $("#tablePackage tbody tr").length;
        createPackageTr(inputData);
    } else {
        var childTr = $("#tablePackage tbody").children("tr");
        len = childTr.length;
        childTr.each(function(index, el) {
            var $el = $(el);
            var val = $el.attr("data-type");

            if (findArrSame(inputData, val)) {
                var valIndex = findArrIndex(inputData, val);
                alert(val + "已经添加了");
                inputData.splice(valIndex, 1);
            }
        });
        createPackageTr(inputData, len);
    }


    $("#dataConfig3").hide();
    $("#config3Input").val("");
}
//套餐->value 添加保障责任
function setDataConfig4() {

    var str = '';
    $("#" + id).empty();
    if ($("#tableList tbody").find("input:checked").length < 1) {
        alert("请选择保障责任");
        return;
    }
    $("#tableList tbody tr").each(function(index, el) {
        var $el = $(el);
        if ($el.find("input[type=checkbox]").prop("checked")) {
            var txtName = $el.find(".responName").text();
            var txtPrice = $el.find(".resopnPrice select option:selected").val();
            var txtExplain = $el.find(".resopnPrice p.responExplain").text();
            var txtCode = $el.find(".resopnPrice p.responCode").text();

            str += '<p><span data-name>' + txtName + "," + txtPrice + '</span><span style="display:none" data-explain>' + txtExplain + '</span><span style="display:none" data-code>' + txtCode + '</span></p>';
        }

    });
    var id = $("#dataConfig4").attr("data-id");
    $("#" + id).append(str);
    $("#dataConfig4").hide();
}
//因子与因子关系 ->影响因子 拼接影响因子
function initFactor() {
    var str = "";
    $("#factorList").empty();
    $("#tableFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var val = $el.attr("data-type");
        var txt = $el.find(".factorName").text();
        str += '<input  type="checkbox" value="' + val + '">' +
            '<label >' + txt + '</label>';


    });
    $("#factorList").append(str);
}
//因子与因子关系 ->影响因子 点击“确定”按钮
function setDataConfig5() {
    var id = $("#dataConfig5").attr("data-id");
    if ($("#factorList input:checked").length < 1) {
        alert("请选择影响因子");
    } else if ($("#factorList input:checked").length == 1) {
        var val = $("#factorList input:checked").val();
        var txt = $("#factorList input:checked").next("label").text();

        $("#" + id).html(txt).attr("data-type", val);
        $("#dataConfig5").hide();
    } else {
        alert("一次只能选择一个影响因子");
    }
}
//因子与因子关系 ->影响因子值  拼接影响因子值
function initFactorValue(obj) {
    var str = "";
    var parentTr = obj.closest("tr");
    var factorType = parentTr.find(".factor").attr("data-type");
    $("#factorValueList").empty();
    $("#tableFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var type = $el.attr("data-type");
        if (type == factorType) {
            var p = $el.find(".factorVal").html();
            $(p).each(function(index, ele) {
                var pTxt = $(ele).text().replace(/，/g, ",").split(",")[1];
                str += '<input  type="checkbox" value="' + pTxt + '">' +
                    '<label >' + pTxt + '</label>';

            })
        }
    });
    $("#factorValueList").append(str);
}
//因子与因子关系 ->影响因子值 点击“确定”按钮
function setDataConfig6() {
    var id = $("#dataConfig6").attr("data-id");
    if ($("#factorValueList input:checked").length < 1) {
        alert("请选择因子值");
    } else if ($("#factorValueList input:checked").length == 1) {
        var val = $("#factorValueList input:checked").val();
        $("#" + id).html(val);
        $("#dataConfig6").hide();
    } else {
        alert("一次只能选择一个因子值");
    }
}
//因子与因子关系 ->被影响因子 拼接被影响因子
function initBeFactor(obj) {
    var str = "";
    var str1 = "";
    var txtArr = [];

    var parentTr = obj.closest("tr");
    var factorType = parentTr.find(".factor").attr("data-type");

    $("#befactorList").empty();
    $("#befactorValueList").empty();
    $("#tableFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var type = $el.attr("data-type");
        var txt = $el.find(".factorName").text();
        if (type == factorType) {
            return;
        }
        str += '<input  type="checkbox" value="' + type + '">' +
            '<label >' + txt + '</label>';

        var p = $el.find(".factorVal").html();

        str1 += '<p style="display:none" data-type="' + type + '">'
        $(p).each(function(ind, ele) {
            var pTxt = $(ele).text().replace(/，/g, ",").split(",");
            str1 += '<input  type="checkbox" value="' + pTxt[1] + '">' +
                '<label >' + pTxt[1] + '</label>';
        })
        str1 += '</p>'
    });
    $("#befactorList").append(str);

    $("#befactorValueList").append(str1);




}
//因子与因子关系 ->被影响被因子 点击“确定”按钮
function setDataConfig7() {
    var id = $("#dataConfig7").attr("data-id");
    var str = "";
    var arr = [];
    if ($("#befactorList input:checked").length < 1) {
        alert("请选择被影响因子");
        return;
    }
    $("#befactorList input:checked").each(function(index, el) {
        var options = {};
        var $el = $(el);
        var val = $el.val();
        var txt = $el.next("label").text();
        options.code = val;
        options.txt = txt;
        var p = $("#befactorValueList p[data-type='" + val + "']");
        if (p.find("input:checked").length < 1) {
            alert("请选择被影响因子值");
            return;
        }
        var valueArr = [];
        p.find("input:checked").each(function(ind, ele) {
            var $ele = $(ele);
            var value = $ele.val();
            valueArr.push(value);
        });

        options.value = valueArr;
        arr.push(options);
    });

    for (var i = 0; i < arr.length; i++) {
        str += "<p data-type='" + arr[i].code + "'>" + arr[i].txt + "," + arr[i].value + "</p>"
    }
    $("#" + id).append(str);
    $("#dataConfig7").hide();
}

//因子与保障责任关系-> 影响因子  拼接影响因子
function initFactoRespon() {
    var str = "";
    $("#factorResponList").empty();
    $("#tableFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var val = $el.attr("data-type");
        var txt = $el.find(".factorName").text();
        str += '<input  type="checkbox" value="' + val + '">' +
            '<label >' + txt + '</label>';


    });
    $("#factorResponList").append(str);
}
//因子与保障责任关系->影响因子 点击“确定”按钮
function setDataConfig9() {
    var id = $("#dataConfig9").attr("data-id");
    if ($("#factorResponList input:checked").length < 1) {
        alert("请选择影响因子");
    } else if ($("#factorResponList input:checked").length == 1) {
        var val = $("#factorResponList input:checked").val();
        var txt = $("#factorResponList input:checked").next("label").text();
        $("#" + id).html(txt).attr("data-type", val);
        $("#dataConfig9").hide();
    } else {
        alert("一次只能选择一个影响因子");
    }
}
//因子与保障责任关系-> 影响因子值  拼接影响因子值
function initFactoResponValue(obj) {
    var str = "";
    var parentTr = obj.closest("tr");
    var factorType = parentTr.find(".factoResponName").attr("data-type");
    $("#factorResponValueList").empty();
    $("#tableFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var type = $el.attr("data-type");
        if (type == factorType) {
            var p = $el.find(".factorVal").html();
            $(p).each(function(ind, ele) {
                var pTxt = $(ele).text().replace(/，/g, ",").split(",")[1];
                str += '<input  type="checkbox" value="' + pTxt + '">' +
                    '<label >' + pTxt + '</label>';
            });
        }
    });
    $("#factorResponValueList").append(str);
}
//因子与保障责任关系-> 影响因子值 点击"确认"按钮
function setDataConfig10() {
    var id = $("#dataConfig10").attr("data-id");
    if ($("#factorResponValueList input:checked").length < 1) {
        alert("请选择因子值");
    } else if ($("#factorResponValueList input:checked").length == 1) {
        var val = $("#factorResponValueList input:checked").val();
        $("#" + id).html(val);
        $("#dataConfig10").hide();
    } else {
        alert("一次只能选择一个因子值");
    }
}

function initFactoResponList() {
    var str = "";
    var str1 = "";
    var responPriceArr = [];
    $("#initfactorResponList").empty();
    $("#initfactorResponPriceList").empty();

    $("#tableRespon tbody tr").each(function(index, el) {
        var $el = $(el);
        var responName = $el.find(".responName").val();
        var responExplain = $el.find(".responExplain").val();
        var responCode = $el.find(".responCode").val();
        var responPrice = $el.find(".responPrice").val();
        str += '<input  type="checkbox" value="' + responName + '" data-code="' + responCode + '">' +
            '<label >' + responName + '</label>';

        responPriceArr = responPrice.replace(/，/g, ",").split(",");
        str1 += '<p style="display:none;" data-type="' + responName + '" data-code="' + responCode + '">';
        for (var i = 0; i < responPriceArr.length; i++) {
            str1 += '	<input  type="checkbox" value="' + responPriceArr[i] + '" >' +
                '<label >' + responPriceArr[i] + '</label>'
        }
        str1 += '</p>';
    });

    $("#initfactorResponList").append(str);
    $("#initfactorResponPriceList").append(str1);
}

function setDataConfig11() {
    var id = $("#dataConfig11").attr("data-id");
    var str = "";
    var arr = [];
    $("#" + id).empty();
    if ($("#initfactorResponList input:checked").length < 1) {
        alert("请选择保障责任");
        return;
    }

    $("#initfactorResponList input:checked").each(function(index, el) {
        var options = {};
        var $el = $(el);
        var val = $el.val();
        var txt = $el.next("label").text();
        options.code = $el.attr("data-code"); //责任编码
        options.txt = txt;
        var p = $("#initfactorResponPriceList p[data-type='" + txt + "']")
        if (p.find("input:checked").length < 1) {
            alert("请选择保额");
            return;
        }
        var valueArr = [];
        p.find("input:checked").each(function(ind, ele) {
            var $ele = $(ele);
            var value = $ele.val();
            valueArr.push(value);
        });
        options.value = valueArr;
        arr.push(options);
    });

    for (var i = 0; i < arr.length; i++) {
        str += "<p data-type=" + arr[i].code + ">" + arr[i].txt + "," + arr[i].value + "</p>"
    }

    $("#" + id).html(str);
    $("#dataConfig11").hide();
}
$(function() {
    /************************测算因子 start************************/
    //添加测算因子
    $("#configBtn1").click(function() {
        $("#dataConfig1").show();
    });
    $("#dataConfig1_Ok").click(function() {
        setDataConfig1();
    });
    $("#dataConfig1_Cancel").click(function() {
        $("#dataConfig1").hide();
    });
    //删除测算因子
    $("#tableFactor").on("click", ".btnDel", function() {
        $(this).closest("tr").remove();
    });


    //测算因子-> value
    $("#tableFactor").on("click", ".factorVal", function() {
        var type = $(this).closest("tr").attr("data-type");
        $("#dataConfig2").attr("data-type", type);
        $("#dataConfig2").attr("data-id", this.id);
        $("#dataConfig2").show();
    });

    $("#dataConfig2").on("click", ".addBtn", function() {
        var str = '<tr>' +
            '<td><input type="text" placeholder="请输入" class="itemCode"></td>' +
            '<td><input type="text" placeholder="请输入" class="itemValue"></td>' +
            '<td><input type="button" value="添加"  class="addBtn"/><input type="button" value="删除"  class="delBtn"/></td>' +
            '</tr>';

        $("#factorCon tbody").append(str);
    });
    $("#dataConfig2").on("click", ".delBtn", function() {
        var parentTr = $(this).closest("tr");
        parentTr.remove();
    });

    $("#dataConfig2_Ok").click(function() {
        setDataConfig2();
    })

    $("#dataConfig2_Cancel").click(function() {
            $('#dataConfig2').hide();
        })
        /************************测算因子 end************************/
        /************************保障责任 start************************/
    $("#tableRespon").on("click", ".addBtn", function() {
        var str = '<tr>' +
            '<td><input type="text" class="responName" placeholder="请输入保障责任名称"></td>' +
            '<td><textarea class="responExplain"></textarea></td>' +
            '<td><input type="text" class="responCode" placeholder="请输入保障责任编码"></td>' +
            '<td><input type="text" class="responPrice" placeholder="请输入保障责任保额"></td>' +
            '<td>' +
            '<input type="button" value="添加" class="addBtn">' +
            '<input type="button" value="删除" class="delBtn">' +
            '</td>' +
            '</tr>';
        $("#tableRespon tbody").append(str);
    });
    $("#tableRespon").on("click", ".delBtn", function() {
        var parent = $(this).closest("tr");
        parent.remove();
    });
    /************************保障责任 end************************/

    /************************套餐 start************************/
    $("#configBtn3").click(function() {
        var responTr = $("#tableRespon tbody tr").eq(0);
        var valResponName = responTr.find("input.responName").val();
        var valResponExplain = responTr.find("textarea.responExplain").val();
        var valResponCode = responTr.find("input.responCode").val();
        var valResponPrice = responTr.find("input.responPrice").val();
        $("#dataConfig3").show();
    });
    $("#dataConfig3_Ok").click(function() {
        setDataConfig3();
    })
    $("#dataConfig3_Cancel").click(function() {
        $("#dataConfig3").hide();
    });

    //套餐数据字典
    $("#tablePackage").on("click", ".packageValue", function() {
        initRespon();
        $("#dataConfig4").attr("data-id", this.id).show();
    });
    $("#dataConfig4_Ok").click(function() {
        setDataConfig4();
    });
    $("#dataConfig4_Cancel").click(function() {
        $("#dataConfig4").hide();
    })

    /************************套餐 end************************/

    /************************因子与因子关系 start************************/
    var factorIndex = 0;
    $("#tableInfFactor").on("click", ".addBtn", function() {
        factorIndex++;
        var factorId = "factor" + factorIndex;
        var factorValueId = "factorValue" + factorIndex
        var beFactorId = "beFactor" + factorIndex;
        var beFactorValueId = "beFactorValue" + factorIndex;
        var beWayId = "beWay" + factorIndex;
        var str = '<tr>' +
            '<td class="factor" id="' + factorId + '"></td>' +
            '<td class="factorValue" id="' + factorValueId + '"></td>' +
            '<td class="beFactor" id="' + beFactorId + '"></td>'
            //	+'<td class="beFactorValue" id="'+beFactorValueId+'"></td>'
            +
            '<td class="beWay" id="' + beWayId + '"><select><option >覆盖</option><option >隐藏</option></select></td>' +
            '<td><input type="button" value="添加" class="addBtn"><input type="button" value="删除" class="delBtn"></td>' +
            '</tr>';
        $("#tableInfFactor tbody").append(str);
    });
    $("#tableInfFactor").on("click", ".delBtn", function() {
        factorIndex--;
        var parent = $(this).closest("tr");
        parent.remove();
    });
    //影响因子
    $("#tableInfFactor").on("click", ".factor", function() {
        initFactor();
        $("#dataConfig5").attr("data-id", this.id).show();
    });
    $("#dataConfig5_Ok").click(function() {
        setDataConfig5()
    });
    $("#dataConfig5_Cancel").click(function() {
        $("#dataConfig5").hide();
    });
    //影响因子值
    $("#tableInfFactor").on("click", ".factorValue", function() {
        var obj = $(this);
        initFactorValue(obj);
        $("#dataConfig6").attr("data-id", this.id).show();
    });
    $("#dataConfig6_Cancel").click(function() {
        $("#dataConfig6").hide();
    });
    $("#dataConfig6_Ok").click(function() {
        setDataConfig6();
    });
    //被影响因子
    $("#tableInfFactor").on("click", ".beFactor", function() {
        var obj = $(this);
        initBeFactor(obj);
        $("#dataConfig7").attr("data-id", this.id).show();
    });
    $("#dataConfig7_Cancel").click(function() {
        $("#dataConfig7").hide();
    });
    $("#dataConfig7_Ok").click(function() {
        setDataConfig7();
    });
    $("#befactorList").on("click", "input", function() {
        if ($(this).prop("checked")) {
            var val = $(this).val();
            if ($("#befactorValueList p:visible").length == 1) {
                var vis = $("#befactorValueList p:visible");
                if (vis.find("input:checked").length < 1) {
                    alert("请选择保额");
                    $(this).prop('checked', false);
                    return
                }

            }
            var index = $("#befactorList input[type=checkbox]").index($(this));
            $("#befactorValueList p").hide();
            $("#befactorValueList p").eq(index).show();
        } else {
            $("#befactorValueList p").hide();
        }

    });

    /************************因子与因子关系 end************************/

    /************************因子与保障责任关系 start************************/
    var factorResponIndex = 0;
    $("#tableFactoRespon").on("click", ".addBtn", function() {
        factorResponIndex++;
        var factoResponNameId = "factoResponName" + factorResponIndex;
        var factoResponValueId = "factoResponValue" + factorResponIndex;
        var factoResponId = "factoRespon" + factorResponIndex;

        var str = '<tr>' +
            '<td class="factoResponName" id="' + factoResponNameId + '"></td>' +
            '<td class="factoResponValue" id="' + factoResponValueId + '"></td>' +
            '<td class="factoRespon" id="' + factoResponId + '"></td>'

        +'<td><input type="button" value="添加" class="addBtn"/><input type="button" value="删除" class="delBtn"/></td>' +
        '</tr>';

        $("#tableFactoRespon tbody").append(str);
    });
    //影响因子
    $("#tableFactoRespon").on("click", ".delBtn", function() {
        factorResponIndex--;
        var parentTr = $(this).closest("tr");
        parentTr.remove();
    });

    $("#tableFactoRespon").on("click", ".factoResponName", function() {
        initFactoRespon();
        $("#dataConfig9").attr("data-id", this.id).show();
    });
    $("#dataConfig9_Ok").click(function() {
        setDataConfig9()
    })
    $("#dataConfig9_Cancel").click(function() {
        $("#dataConfig9").hide();
    })

    //影响因子值
    $("#tableFactoRespon").on("click", ".factoResponValue", function() {
        var obj = $(this);
        initFactoResponValue(obj);
        $("#dataConfig10").attr("data-id", this.id).show();
    });
    $("#dataConfig10_Ok").click(function() {
        setDataConfig10()
    });
    $("#dataConfig10_Cancel").click(function() {
        $("#dataConfig10").hide();
    });
    //保障责任
    $("#tableFactoRespon").on("click", ".factoRespon", function() {
        var obj = $(this);
        initFactoResponList(obj);
        $("#dataConfig11").attr("data-id", this.id).show();
    });
    $("#dataConfig11_Ok").click(function() {
        setDataConfig11()
    });
    $("#dataConfig11_Cancel").click(function() {
        $("#dataConfig11").hide();
    })
    $("#initfactorResponList").on("click", "input", function() {
        if ($(this).prop("checked")) {
            if ($("#initfactorResponPriceList p:visible").length == 1) {
                var vis = $("#initfactorResponPriceList p:visible");
                var tit = $("#initfactorResponPriceList p:visible").attr("data-type");
                if (vis.find("input:checked").length < 1) {
                    alert("请选择保额");
                    $(this).prop("checked", false);
                    return
                }
            }
            var index = $("#initfactorResponList input[type=checkbox]").index($(this));
            $("#initfactorResponPriceList p").hide();
            $("#initfactorResponPriceList p").eq(index).show();
        } else {
            $("#initfactorResponPriceList p").hide();
        }
    })

    /************************因子与保障责任关系 end************************/

    /************************点击下一步 start************************/
    $("#nextBtn").click(function() {
        //测算因子
        detailsArr.length = 0;
        $("#tableFactor tbody tr").each(function(index, el) {
            var $el = $(el);
            //factorArr->测算因子
            var factorJson = {
                "componentId": "wapPremiumFactor",
                "componentTitle": $el.find("td.factorName").text(),
                "premiumFactorId": $el.attr("data-type"),
                "premiumFactorCode": $el.find("td.factorCode input").val(),
                "premiumFactorType": "tile",
                "factorList": []
            };
            $el.find("td.factorVal p").each(function(ind, ele) {
                var $ele = $(ele);
                var factorListJson = {
                    "componentId": "wapInsureAge",
                    "factorKey": $ele.text().split(",")[0],
                    "factorValue": $ele.text().split(",")[1]
                }
                factorJson.factorList.push(factorListJson);
            });
            detailsArr.push(factorJson);
        });
        //保障责任
        var responJson = {
            "componentId": "wapPlanNameList",
            "componentTitle": "保障责任",
            "planNameList": []
        };
        //套餐 Json
        var planListJson = {
            "componentId": "wapPlanList",
            "planList": []
        };
        //自定义
        if ($("#custom").prop("checked")) {
            var customPersonJson = {
                "componentId": "wapPlanName",
                "planName": "自定义",
                "planNameIndex": "-1"
            }
            responJson.planNameList.push(customPersonJson);
            var customPlanJson = {
                "componentId": "wapPlan",
                "planId": $("#planId").val(), //方案代码
                "planIndex": "-1",
                "planName": "自定义",
                "planPrice": "",
                "planScore": "",
                "planLiabilityList": []
            };
            $("#tableRespon tbody tr").each(function(index, el) {
                var $el = $(el);
                var itemJson = {
                    "componentId": "wapLiability",
                    "liabilityId": $el.find('input.responCode').val(), //责任编码
                    "liabilityName": $el.find("input.responName").val(), //责任名称
                    "liabilityAmount": $el.find("input.responPrice").val(), //责任价格
                    "liabilityDesc": $el.find('textarea.responExplain').val()

                }
                customPlanJson.planLiabilityList.push(itemJson);
            });
            planListJson.planList.push(customPlanJson);
        }

        $("#tablePackage tbody tr:not(:first)").each(function(index, el) {
            var $el = $(el);
            var planListArr = {
                "componentId": "wapPlan",
                "planId": $("#planId").val(), //方案代码
                "planIndex": index,
                "planName": $el.find(".packageName").text(),
                "planPrice": "",
                "planScore": "",
                "planLiabilityList": []
            };
            //保障责任
            var responItemJson = {
                "componentId": "wapPlanName",
                "planName": $el.find(".packageName").text(),
                "planNameIndex": index
            }
            responJson.planNameList.push(responItemJson);

            $el.find(".packageValue p").each(function(ind, ele) {
                var $ele = $(ele);
                var options = {
                    "componentId": "wapLiability",
                    "liabilityId": $ele.find('span[data-code]').text(), //责任编码
                    "liabilityName": $ele.find("span[data-name]").text().replace(/，/g, ",").split(",")[0], //责任名称
                    "liabilityAmount": $ele.find("span[data-name]").text().replace(/，/g, ",").split(",")[1], //责任价格
                    "liabilityDesc": $ele.find('span[data-explain]').text()
                }
                planListArr.planLiabilityList.push(options);
            });
            planListJson.planList.push(planListArr);
        });
        detailsArr.push(responJson);
        detailsArr.push(planListJson);

        var details = sessionStorage.getItem("details") || "";
        if (details) {
            details = JSON.parse(details);
            if (details.wapDetails) {
                for (var i = 0; i < detailsArr.length; i++) {
                    details.wapDetails[details.wapDetails.length] = detailsArr[i];
                }
            }
            if (details.appDetails) {
                var appData = [];
                $.extend(true, appData, detailsArr);
                appData = JSON.stringify(appData);
                appData = appData.replace(/wap/g, "app");
                appData = JSON.parse(appData);
                for (var i = 0; i < appData.length; i++) {
                    details.appDetails[details.appDetails.length] = appData[i];
                }
            }
            if (details.pcDetails) {
                var pcData = [];
                $.extend(true, pcData, detailsArr);
                pcData = JSON.stringify(pcData);
                pcData = pcData.replace(/wap/g, "pc");
                pcData = JSON.parse(pcData);
                for (var i = 0; i < pcData.length; i++) {
                    details.pcDetails[details.pcDetails.length] = pcData[i];
                }
            }
            if (details.wechatEntity) {
                var wechatData = [];
                $.extend(true, wechatData, detailsArr);
                wechatData = JSON.stringify(wechatData);
                wechatData = wechatData.replace(/wap/g, "wechat");
                wechatData = JSON.parse(wechatData);
                for (var i = 0; i < wechatData.length; i++) {
                    details.wechatEntity[details.wechatEntity.length] = wechatData[i];
                }
            }
            if (details.cpsEntity) {
                var cpsData = [];
                $.extend(true, cpsData, detailsArr);
                cpsData = JSON.stringify(cpsData);
                cpsData = cpsData.replace(/wap/g, "cps");
                cpsData = JSON.parse(cpsData);
                for (var i = 0; i < cpsData.length; i++) {
                    details.cpsEntity[details.cpsEntity.length] = cpsData[i];
                }
            }
        }

        sessionStorage.setItem("details", JSON.stringify(details));
        console.log(details);

        uploadDependency();
    });
    /************************点击下一步 end************************/
});

function uploadDependency() {
    var dependencyList1 = [];
    $("#tableInfFactor tbody tr").each(function(index, el) {
        var $el = $(el);
        var factor = $el.find(".factor").attr("data-type");
        if (!factor) {
            return;
        }

        var factorValue = $el.find(".factorValue").text();
        var affectFactorList = [];
        $el.find(".beFactor p").each(function(index, el2) {
            var $el2 = $(el2);
            var code = $el2.attr("data-type");
            var value = $el2.text();
            value = value.substr(value.indexOf(",") + 1);
            affectFactorList.push({
                "key": code,
                "value": value
            });
        });

        var affectType = $el.find(".beWay select").val();
        dependencyList1.push({
            factor: factor,
            factorValue: factorValue,
            affect: affectFactorList,
            type: affectType
        });
    });

    var dependencyList2 = [];
    $("#tableFactoRespon tbody tr").each(function(index, el) {
        var $el = $(el);
        var factor = $el.find(".factoResponName").attr("data-type");
        if (!factor) {
            return;
        }

        var factorValue = $el.find(".factoResponValue").text();
        var affectLiabilityList = [];
        $el.find(".factoRespon p").each(function(index, el2) {
            var $el2 = $(el2);
            var code = $el2.attr("data-type");
            var value = $el2.text();
            value = value.substr(value.indexOf(",") + 1);
            affectLiabilityList.push({
                "key": code,
                "value": value
            });
        });

        dependencyList2.push({
            factor: factor,
            factorValue: factorValue,
            affect: affectLiabilityList
        });
    });

    var obj = {};
    obj.subjectList = {};

    var factorList = {};

    for (var i = 0; i < dependencyList1.length; i++) {
        var item = dependencyList1[i];
        var factor = item.factor;
        var factorValue = item.factorValue;
        var affectType = item.type;

        if (!obj.subjectList[factor]) {
            obj.subjectList[factor] = [];
        }
        var target = obj.subjectList[factor];
        var list = item.affect;
        for (var j = 0; j < list.length; j++) {
            var key = list[j].key;
            var value = list[j].value;
            var affectFactor = "factor_" + key;

            if (target.indexOf(affectFactor) == -1) {
                target.push(affectFactor);
            }

            if (!factorList[key]) {
                factorList[key] = {
                    "type": "text",
                    "subjectList": {}
                };
            }

            var subjectList2 = factorList[key].subjectList;
            if (!subjectList2[factor]) {
                subjectList2[factor] = {};
                subjectList2[factor][factorValue] = {
                    "action": affectType,
                    "factorList": {
                        "factorValue": value
                    }
                };
            }
        }
    }

    var liabilityList = {};

    for (var i = 0; i < dependencyList2.length; i++) {
        var item = dependencyList2[i];
        var factor = item.factor;
        var factorValue = item.factorValue;

        if (!obj.subjectList[factor]) {
            obj.subjectList[factor] = [];
        }

        var target = obj.subjectList[factor];
        var list = item.affect;
        for (var j = 0; j < list.length; j++) {
            var key = list[j].key;
            var value = list[j].value;
            var affectLiability = "liability_" + key;
            if (target.indexOf(affectLiability) == -1) {
                target.push(affectLiability);
            }

            if (!liabilityList[key]) {
                liabilityList[key] = {
                    "type": "liability",
                    "subjectList": {}
                };
            }

            var subjectList1 = liabilityList[key].subjectList;
            if (!subjectList1[factor]) {
                subjectList1[factor] = {};
                subjectList1[factor][factorValue] = {
                    "action": "hidden",
                    "liabilityAmount": value
                };
            }
        }
    }

    obj.liabilityList = liabilityList;
    obj.factorList = factorList;
    console.log(obj);

    //上传依赖报文

    location.href = "inputsConfig.html";
}
