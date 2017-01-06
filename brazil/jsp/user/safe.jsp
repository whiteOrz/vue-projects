<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <link rel="apple-touch-icon" href="http://whzt.taikang.com/brazil/static/favicon.png">
    <link rel="Shortcut Icon" href="http://whzt.taikang.com/brazil/static/favicon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/style.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/animate.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/main.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/aid.css" />
    <script src="http://whzt.taikang.com/brazil/static/js/adaptational.js"></script>
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="mess_wrapper same_bg">
    <div class="mess_top safe_top">
        <img class="biao safe_biao wid20" src="http://whzt.taikang.com/brazil/static/images/safe.png">
        <div class="person_img mess_img">
            <img class="picture mess_picture msg_wh" src="http://whzt.taikang.com/brazil/static/images/icon11.png"/>
        </div>
        <p class="mess_name">高冷的小主</p>
    </div>
    <div class="mess_bottom power_bottom power_bt">
        <div class="baibj">
            <div class="list safe_list list_pad">
                <div class="mess_pross">
                    <img class="power_name power_name_posi" src="http://whzt.taikang.com/brazil/static/images/name2.png">
                    <div class="baodun_main mess_power_press mess_power_press_posi">
  						<img class="mess_Pname tip-S mess_Pname_posi" src="http://whzt.taikang.com/brazil/static/images/qu.png">
                        <img class="mess_pressImg mess_save_pressImg mess_pressImg_posi" src="http://whzt.taikang.com/brazil/static/images/icon10.png">
                        <p class="bao_pross mess_save_di"><span class="bao_pross_ju mess_save_ju"></span></p>
                    </div>
                    <p class="mess_num mess_num_save mess_num_posi"><span class="change_num">120000</span>/<span class="mess_all_num">150000</span></p>
                </div>
            </div>
            <p class="power_txt power_txt1">当前安全系数:<span class="nezhi nezhi1">300</span></p>
            <p class="power_txt2 linehei power_txt2_ft" >已有<span class="colorG realFriends colorG_ft">300</span>位好友为你助力，<br>还差<span class="shengbu shengbu_ft colorG colorG_ft">10</span>点可以升级时光机。</p>
        </div>
        <img class="add_btn2 add_btn2_wid" src="http://whzt.taikang.com/brazil/static/images/btn11.png"/>
        <img class="help_btn noTop" src="http://whzt.taikang.com/brazil/static/images/btn9.png"/>
        <img class="goj_btn" src="http://whzt.taikang.com/brazil/static/images/btn10.png"/>
    </div>
</div>
<div class="share mask hide">
    	<img class="sharenav" src="http://whzt.taikang.com/brazil/static/images/share.png"/>
    </div>
   <div class="alert-tip tipS hide">
	<h3>关于安全系数</h3>
	<p>穿越过程时光机会产生损耗，需【安全系数】维护才能确保顺利到达。用户可通过购买微互助防癌险增加安全系数，每购买1元微互助可增加1000安全系数，最高可购买150元。</p>
</div>
<div class="windowBox hide">
    <div class="windowCont2">
        <div class="clearFix">
            <span class="upMoney fontSize28 txt_c select l marginR12 marginB42" id="up1">提升<span id="upFee1">1000</span>元</span>
            <span class="upMoney fontSize28 txt_c l marginR12 marginB42" id="up2">提升<span id="upFee2">1</span>万</span>
            <span class="upMoney fontSize28 txt_c l marginR12 marginB42" id="up5">提升<span id="upFee3">5</span>万</span>
            <span class="upMoney fontSize28 txt_c l marginR12 marginB42" id="up10">提升<span id="upFee4">10</span>万</span>
            <span class="upMoney fontSize28 txt_c l marginR12 marginB42" id="up100">提升<span id="upFee5">100</span>万</span>
            <span class="upMoney full txt_c fontSize28 l marginR12 marginB42" id="full">一键加满</span>
        </div>
        <p class="payMoney fontSize28" style="display: block;" id="payTip">支付金额：<span class="moneyNum" id="moneyNum"></span><span class="moneyNum">元</span></p>
        <div class="surePayBox clearFix">
            <span class="btnCancelPay txt_c fontSize28 l" id="errordescVar">取消</span>
            <span class="btnSurePay txt_c fontSize28 r" id="btnSurePay">确认支付</span>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/safe.js"></script>

<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
<script type="text/javascript">
var resultJson = JSON.parse('${result.content}');
</script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>
</html>
