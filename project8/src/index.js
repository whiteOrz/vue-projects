import $ from "jquery";
var temp1 = require("../template/wapPayOrderinfo");
var temp2 = require("../template/wapPayWays");
$(".container").html(temp1 + temp2);

var price = sessionStorage.getItem("packagePrice");
console.log(price);
price && $(".price").text("￥" + price);

$(".payWays").click(function(){
    if($(this).index()==0){
        $("#payStyle").text("支付宝支付");
    }else{
        $("#payStyle").text("微信支付");
    }
});

$("#payBtn").click(function(){
    var returnMessage = sessionStorage.getItem("returnMessage");
    console.log(returnMessage);
});
