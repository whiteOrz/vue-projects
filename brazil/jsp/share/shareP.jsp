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
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="mess_wrapper same_bg">
    <div class="mess_top">
        <div class="person_img mess_img">
            <img class="picture mess_picture" src="http://whzt.taikang.com/brazil/static/images/icon11.png"/>
        </div>
        <p class="mess_name">Sam</p>
    </div>
    <div class="mess_bottom power_bottom">
        <div class="share_baibj">
            <p class="share_txt">你的好友<span class="colorO">某某</span>正在向<span class="thissites">巴西</span>冲刺中，还差<span class="help_mian"></span>能量值到达<span class="nextsites">里约站</span>，需要你的协助。</p>
            <p class="share_txt nopadding">可否打赏1000能量值，助TA早日到达</p>
        </div>
        <img class="get_btn" src="http://whzt.taikang.com/brazil/static/images/get.png"/>
        <img class="give_btn" src="http://whzt.taikang.com/brazil/static/images/give.png"/>
        <img class="play_btn" src="http://whzt.taikang.com/brazil/static/images/play.png"/>
    </div>
</div>
<div class="alert-tip hide right">
    <h4>支付成功！</h4>
    <p>恭喜成功加入微互助防癌保障计划，你的安全系数已增加。</p>
</div>
<div class="alert-tip hide right git">
    <h4></h4>
    <p>已向好友索取，请保持能量值不少于1000，否则交易无法实现，对方同意后，你将收到1000安全系数。</p>
</div>
<div class="mask gitbox hide">
    <div class="alert">
        <img class="back" src="http://whzt.taikang.com/brazil/static/imgs/alert2.png" alt=""/>
        <p class="content">当前可捐赠能量值为<span></span>，是否以1000能量值向好友索取1000安全系数。</p>
        <img src="http://whzt.taikang.com/brazil/static/imgs/enter.png" alt="" class="enter"/>
        <img src="http://whzt.taikang.com/brazil/static/imgs/cancle.png" alt="" class="cancle"/>
    </div>
</div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/shareP.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/path.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>
<script type="text/javascript">
	var resultjson=JSON.parse('${result.content}');
</script>
</html>