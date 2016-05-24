import $ from "jquery";

var productId = sessionStorage.getItem("productId") || "1702";

$.ajax({
    url: "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/productMetadata/" + productId +"/wap/inputs",
    type: "get",
    dataType: "json"
}).done(function(data) {
    console.log(data.data);
    pageInit(data.data);
}).fail(function() {
    var wap_inputs = require("../data/wap_inputs");
    pageInit(wap_inputs);
});

function pageInit(wap_inputs) {
    var returnObj = [];
    wap_inputs.wapInputs.forEach(function(component) {
        var currentCompId = component.componentId;
        var template = require("../template/" + currentCompId);
        $("#wap_inputs").append(template);

        for (var key in component) {
            if ($.type(component[key]) == "array") {
                var arr = component[key];
                arr.forEach(function(input) {
                    var inputTemp = require("../template/" + input.componentId);
                    inputTemp = inputTemp.replace("$lable", input.lable)
                    var inputObj = $(inputTemp);
                    inputObj.find("input").attr("id", input.id);
                    $("#" + currentCompId).append(inputObj);
                    returnObj.push({
                        "id": input.id,
                        "label": input.lable
                    });
                });
            }
        }
    });

    var returnMessage = sessionStorage.getItem("returnMessage") || {};
    returnMessage = JSON.parse(returnMessage);
    console.log(returnMessage);
    var inputs = {};

    $(".wapInsure").click(function() {
        for (var i = 0; i < returnObj.length; i++) {
            var item = returnObj[i];
            var value = $("#" + item.id).val();
            if (value == "") {
                alert(item.label + "为空");
                return false;
            }
            item.value = value;
        }

        returnObj.forEach(function(item) {
            inputs[item.id] = item.value;
        });

        returnMessage.inputs = inputs;
        sessionStorage.setItem("returnMessage", JSON.stringify(returnMessage));
        location.href = "pay.html";
    });
}
