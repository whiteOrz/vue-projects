<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,target-densitydpi=medium-dpi">
    <link type="text/css" rel="stylesheet" href="http://whzt.taikang.com/brazil/static/css/base.css">
    <link type="text/css" rel="stylesheet" href="http://whzt.taikang.com/brazil/static/css/pay.css">
    <link type="text/css" rel="stylesheet" href="http://whzt.taikang.com/brazil/static/css/main.css">
    <script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/landscape.js"></script>
    <title>奔跑吧巴西</title>
</head>
<body>
    <form id="myform" class="myform" method="" action="">
        <div class="row">
            <span class="jz right">姓 名：</span>
            <input type="text" name="username" id="name" class="content">
        </div>
        <div class="row">
            <span class="jz1 right">身 份 证：</span>
            <input type="text" name="cidnumber" id="card" class="content">
        </div>
        <div class="row row1">
            <span class="jz1 right">手 机 号：</span>
            <input type="text" name="phonenumber" id="tel" class="content">
        </div>
        <div class="row">
            <span class="right">支付金额：</span>
            <select name="total_prem" class="content" id="select">
                <option value="1,1000">1元保1000元</option>
                <option value="10,10000">10元保1万元</option>
                <option value="20,20000">20元保2万元</option>
                <option value="50,50000">50元保5万元</option>
                <option value="100,100000">100元保10万元</option>
                <option value="150,150000">150元保15万元</option>
            </select>
        </div>
        <div class="row">
            <span class="right">保障金额：</span>
            <span class="content money" id="money">1,000元</span>
        </div>
        <div class="row">
            <span class="right">保障期间：</span>
            <span class="content" id="time"></span>
        </div>
        <div class="row">
            <span class="right">保障责任：</span>
            <span class="duty">乳腺癌、肺癌、子宫癌、胃癌、肝癌、食道癌等所有常见癌症，免责除外</span>
        </div>
        <div class="row3">
            <input type="checkbox" name="read" class="read" id="read">
            <span class="agree">我已阅读并同意<a class="pag_gaoT">《健康告知》、</a><a href="http://whzt.taikang.com/wechatecs/Regulations.html">《产品条款》</a></span>
        </div>
    </form>
    <div class="btn" id="button">
        <img src="http://whzt.taikang.com/brazil/static/images/pay_btn.png" width="100%">
    </div>
    <div class="alert-tip  tipP hide">
        <h4 class="center">健康告知</h4>
        <p class="pay_txt">您需要先加入微互助，提升安全系数，可以提高您的中奖几率哦！</p>
        <p class="pay_gaozhi hide">我承诺未患过以下任何一种疾病：</br>
            1.癌症</br>
            2.恶性肿瘤</br>
            3.白血病</br>
            4.脑血管疾病</br>
            5.冠心病</br>
            6.心肌病</br>
            7.主动脉疾病</br>
            8.肝硬化</br>
            9.急/慢性肾炎
        </p>
    </div>
</body>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/msg.js"></script>
<script src="http://whzt.taikang.com/brazil/static/js/zepto.min.js?v=1"></script>
<script src="http://whzt.taikang.com/brazil/static/js/path.js?v=1"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/share.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/pay.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/regular.js"></script>
</html>
