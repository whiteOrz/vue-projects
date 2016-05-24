import $ from "jquery";
import wap_inputs from "../data/wap_inputs";
pageInit(wap_inputs);

function pageInit(){
    var returnObj = [];
    wap_inputs.wapInputs.forEach(function(component){
        var currentCompId ="";
        for(var key in component){
            if(key=="componentId"){
                var template = require("../template/" + component[key]);
                if(template){
                    currentCompId = component[key];
                    $("#wap_inputs").append(template);
                }
            }else{
                if($.type(component[key])=="array"){
                    var arr = component[key];
                    arr.forEach(function(input){
                        var inputTemp = require("../template/" + input.componentId);
                        inputTemp = inputTemp.replace("$lable" + input.lable,input.lable)
                        var inputObj = $(inputTemp);
                        inputObj.find("input").attr("id",input.id);
                        $("#"+currentCompId).append(inputObj);
                        returnObj.push({
                            "id" : input.id,
                            "label" : input.lable
                        });
                    })
                }
            }
        }
    });

    var returnMessage = sessionStorage.getItem("returnMessage") || {};
    returnMessage = JSON.parse(returnMessage);
    console.log(returnMessage);

    $(".wapInsure").click(function(){
        for(var i=0;i<returnObj.length;i++){
            var item = returnObj[i];
            var value = $("#" + item.id).val();
            if(value==""){
                alert(item.label + "为空");
                return false;
            }
            item.value = value;
        }

        returnObj.forEach(function(item){
            returnMessage[item.id] = item.value;
        });

        sessionStorage.setItem("returnMessage",JSON.stringify(returnMessage));
        location.href="../pay/pay.html";
    });
}
