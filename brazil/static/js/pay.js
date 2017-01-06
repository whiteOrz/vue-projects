var info=JSON.parse(localStorage.getItem("info"));
//massage(1);log(111);
window.onload=function(){
//	$.post(getpre,{"openId":"omCIGj0eiv1adqWo8Z8SM6IgAmtA"},function(r){
////	$.post(getpre,{"openId":info.openid},function(r){
//		alert(r);
//		var res=JSON.parse(r);
//		log(res);
//		if(res.result){
////			alert(res.data[0]);
////			var select=res.data[0];
//			
//			for(var i in res.data){
//				log(res.data[i]);
//				var option=$("<option>");
//				var item=res.data[i];
//				option.attr("value",i);
//				option.html(item.pay+"元保"+item.amount+(item.amount<10?"万元":"元"));
//				$("#select").append(option);
//			}
//		}
//	});
	
    function changeSelect(index){
        var money;
        var k = [{pay:"1元保1000元",safe:"1,000元"},
            {pay:"10元保1万元",safe:"10,000元"},
            {pay:"20元保2万元",safe:"20,000元"},
            {pay:"50元保5万元",safe:"50,000元"},
            {pay:"100元保10万元",safe:"100,000元"},
            {pay:"150元保15万元",safe:"150,000元"}];
        log(index);
        money = k[index].safe;
        log(money);
//        alert(1);
        $("#money").html(money);
    }

    $("#select").change(function(){

//        var index = $("#select").find("option:selected").val();
        changeSelect($("#select").get(0).selectedIndex);

    });

    $("#read").on("touchend",function(){

        $(this).val("√");

    });

    $("#button").on("touchend touchcancle",function() {
    	
    	var obj={};
    	var arr=$("#myform").serializeArray();
        for(var o in arr){
        	obj[arr[o].name]=arr[o].value;
        }
        obj.openid=info.openid;
//        var arr=obj.total_prem.split(",");
//        obj.total_prem=arr[0];
//        obj.insured=arr[1];
        if ($("#name").val() == "") {  
        	massage("姓名不能为空！");
            return false;
        } else if ($("#name").val().length > 9) {
        	massage("姓名最多9个字符！");
            return false;
        }

        var card = $("#card").val();
		var isnomalidcard = idCardNoUtil.checkIdCardNo(card);
		if(!isnomalidcard){
			massage("身份证号格式错误！");
			 return false;
		}
//        if(!card || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(card)) {
//      	massage("身份证号格式错误！");
//         return false;
//        }

        if ($("#tel").val() == "") {
        	massage("电话号不能为空！");
         return false;
         } else if ($("#tel").val().length != 11) {
        	 massage("电话号应为11位！");
         return false;
         }

        var boolean = $("input[type='checkbox']").is(':checked');
        if(boolean == false){
        	massage("请勾选我已阅读并同意！");
            return;
        }
//        massage(JSON.stringify(obj));
//        Object {name: "total_prem", value: "20,20000"}
        
        
        $.post(newJoinWechat,obj,function(r){
			
        	if(r.code==0){
        		var content=JSON.parse(r.content);
        		location.href=content.bankurl;
        	}else{
        		massage(r.code+":"+r.errMsg);
        	}
        },'json');
    });

    var mydate = new Date();
    var str = mydate.getFullYear() + "年";
    str += (mydate.getMonth()+1) + "月";
    str += mydate.getDate() + "日";
    var str1 = (mydate.getFullYear()+1) + "年";
    str1 += (mydate.getMonth()+1) + "月";
    str1 += mydate.getDate() + "日";

    $("#time").html(str+"至"+str1);
    
    $(".pag_gaoT").on("tap",function(){
    	$(".alert-tip").removeClass("hide");
    });
    $(".row").on("tap",function(){
    	$(".alert-tip").addClass("hide");
    });
   
}