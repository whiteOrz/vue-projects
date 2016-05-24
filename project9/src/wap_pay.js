var $ = require("jquery");
var productId = sessionStorage.getItem("productId") || "1702";

$.ajax({
    url : "http://weit.taikang.com/wechat_hera_v5/rest/insure/v1/productMetadata/"+productId+"/wap/payment",
    type : "get",
    dataType : "json"
}).done(function(data){
    var temp1 = require("../template/wapPayOrderinfo");
    var temp2 = require("../template/wapPayWays");
    $(".container").html(temp1 + temp2);

    var temps = data.data.wapPayment;
    temps.forEach(function(component) {
        if (component.componentId == "wapPaymentList") {
            component.paymentList.forEach(function(payComp){
                $("#payment").append('<li class="payWays"><label>'+ payComp.paymentDesction +'<input type="radio" name="pay"><span></span></label></li>');
            });
        }
    });
    pageInit();
});

function pageInit(){
    var returnMessage = sessionStorage.getItem("returnMessage");
    returnMessage = JSON.parse(returnMessage);
    console.log(returnMessage);

    var price = returnMessage.details.packagePrice;
    price && $(".price").text("￥" + price);

    var payment = {};
    $(".payWays").click(function(){
        var mess = $(this).find("label").text();
        if(mess=="支付宝"){
            $("#payStyle").text("支付宝支付");
            payment.paywayId = "zfb";
        }else{
            $("#payStyle").text("微信支付");
            payment.paywayId = "wx";
        }
    });

    $("#payBtn").click(function(){
        if(returnMessage){
            returnMessage.payment = payment;
            returnMessage.channelId="wap";

            $.ajax({
                url : "http://weit.taikang.com/wechat_hera_v5/rest/v1/insure/proposal",
                type : "post",
                data : JSON.stringify(returnMessage),
                dataType : "json"
            }).done(function(data){
                console.log(returnMessage);
                var result = require("../template/postResult");
                $("body").append(result);
                $("#data1").html(JSON.stringify(returnMessage));
                $("#data2").html(JSON.stringify(data));
            }).fail(function(){
                alert("数据回传失败！");
                console.log(returnMessage);
                var result = require("../template/postResult");
                $("body").append(result);
                $("#data1").html(JSON.stringify(returnMessage));
            });
        }
    });
}
