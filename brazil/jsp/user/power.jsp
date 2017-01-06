<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <link rel="apple-touch-icon" href="http://whzt.taikang.com/brazil/static/favicon.png">
    <link rel="Shortcut Icon" href="http://whzt.taikang.com/brazil/static/favicon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/style.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/animate.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/main.css">
    <script src="http://whzt.taikang.com/brazil/static/js/adaptational.js"></script>
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="mess_wrapper same_bg">
    <div class="mess_top power_top safe_top">
        <img class="biao wid20" src="http://whzt.taikang.com/brazil/static/images/power2.png"/>
        <div class="person_img mess_img">
            <img class="picture mess_picture msg_wh" src="http://whzt.taikang.com/brazil/static/images/icon11.png"/>
        </div>
        <p class="mess_name">高冷的小主</p>
    </div>
    <div class="mess_bottom power_bottom power_bt">
        <div class="baibj">
            <div class="list safe_list list_pad">
                <div class="mess_pross">
                    
                    <img class="power_name power_name_posi" src="http://whzt.taikang.com/brazil/static/images/name.png">
                    <div class="baodun_main mess_power_press mess_power_press_posi">
                        <img class="mess_Pname tip-P mess_Pname_posi" src="http://whzt.taikang.com/brazil/static/images/qu.png">
                        <img class="mess_pressImg mess_save_pressImg mess_pressImg_posi" src="http://whzt.taikang.com/brazil/static/images/icon9.png">
                        <p class="bao_pross mess_save_di"><span class="bao_pross_ju mess_save_ju"></span></p>
                    </div>
                    <p class="mess_num mess_num_save mess_num_posi"><span class="change_num">120000</span>/<span class="mess_all_num">150000</span></p>
                </div>
            </div>
            <p class="power_txt power_txt12 power_txt1">当前能量值:<span class="nezhi nezhi1">0</span></p>
            <p class="power_txt2 linehei power_txt2_ft">还差<span class="shengbu colorG colorG_ft">0</span>步，<br/>可存满能量穿越下一步。</p>
        </div>
        <img class="help_btn" src="http://whzt.taikang.com/brazil/static/images/btn9.png"/>
        <img class="goj_btn" src="http://whzt.taikang.com/brazil/static/images/btn10.png"/>
    </div>
    <div class="share mask hide">
    	<img class="sharenav" src="http://whzt.taikang.com/brazil/static/images/share.png"/>
    </div>
    <div class="alert-tip hide tipP">
	<h3>关于能量值</h3>
	<p>时光机穿越需使用【能量值】，当能量值存满即可穿越至下一站。用户可通过每日进入页面上传微信运动【步数】累计，1步=1能量值。若未进入页面，则当天步数无法计入能量值。</p>
</div>
</div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/power.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>

<script>
// 	var code="${result.code}";
// 	var content='${result.content}';
// 	share(content);

var oauthUrl;
var resultjson = JSON.parse('${result.content}');


</script>
</html>