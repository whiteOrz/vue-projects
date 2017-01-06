<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head lang="en">
    <meta charset="utf-8">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,target-densitydpi=medium-dpi">
    <link rel="apple-touch-icon" href="http://whzt.taikang.com/brazil/static/favicon.png">
    <link rel="Shortcut Icon" href="http://whzt.taikang.com/brazil/static/favicon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/style.css">
    <link rel="stylesheet" type="text/css" href="http://whzt.taikang.com/brazil/static/css/scrollbar.css">
    <title>奔跑吧巴西</title>
</head>

<body>
    <div class="page help_body">
        <img class="help_title" src="http://whzt.taikang.com/brazil/static/images/qiuz.png" />
        <div id="wrapper">
            <div id="scroller">
                <div id="pullDown" class="hideDiv">
                    <span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>
                </div>
                <div id="thelist" class="list">

                </div>
                <div id="pullUp">
                    <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
                </div>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/zepto.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/iscroll.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/add.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://whzt.taikang.com/brazil/static/js/path.js?v=1"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/help_message.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>
<script>
var path = "http://whzt.taikang.com/brazil/static/";
var code = "${result.code}";
var errMsg = "${result.errMsg}";
var content = JSON.parse('${result.content}');
show(content);
var title="奔跑奥运，一路泰康！";
var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fa037cc7dfabad5&redirect_uri=http://hw.weixin.qq.com/steprank/auth?appid=wxcd7143c00e5bb6f7&scope=snsapi_userinfo,snsapi_health_realtime&response_type=code&scope=snsapi_base&state=A1&connect_redirect=1#wechat_redirect";
var str="1996奥运百年，泰康诞生；2016泰康20岁，奔跑奥运，一路泰康！";
</script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
</html>
