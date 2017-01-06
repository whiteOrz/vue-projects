<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,target-densitydpi=medium-dpi">
    <link rel="apple-touch-icon" href="http://whzt.taikang.com/brazil/static/favicon.png">
    <link rel="Shortcut Icon" href="http://whzt.taikang.com/brazil/static/favicon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/style1.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/main1.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/animate.css">
    <script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
    <script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
    <title>奔跑吧巴西</title>
</head>

<body>
    <div class="mess_wrapper same_bg">
        <div class="mess_top">
            <div class="person_img mess_img">
                <img class="picture mess_picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png" />
            </div>
            <p class="mess_name">高冷的小主</p>
        </div>
        <div class="mess_bottom power_bottom">
            <div class="share_baibj">
                <p class="share_txt">你的好友<span class="colorO">某某</span>正在向巴西冲刺中，还差<span class="help_mian">1000</span> 安全系数，就有机会获得大奖啦！</p>
                <p class="share_txt nopadding">可否打赏1000安全系数，助TA圆梦</p>
            </div>
            <img class="give_btn" src="http://whzt.taikang.com/brazil/static/images/send.png" />
            <img class="play_btn" onclick="goIndex()" src="http://whzt.taikang.com/brazil/static/images/play.png" />
        </div>
    </div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/main.js"></script>
<script type="text/javascript">
var resultjson = JSON.parse('${result.content}');
</script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/shareS.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>
</html>
