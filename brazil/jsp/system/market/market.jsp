<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--
 * Created by wuzheng on 2016/7/21..
-->
<html>
<head lang="cn">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="http://whzt.taikang.com/brazil/static/css/main.css?v=1">
    <title>奔跑吧巴西</title>
</head>
<body>
<div class="market market1 hide">
    <img class="box" src="http://whzt.taikang.com/brazil/static/imgs/market/box.png" alt=""/>

    <img class="tab1 active" src="http://whzt.taikang.com/brazil/static/imgs/market/t1_1.png" alt="" data-v="1"/>
    <img class="tab1 hide" src="http://whzt.taikang.com/brazil/static/imgs/market/t1_2.png" alt=""/>

    <img class="tab2 hide" src="http://whzt.taikang.com/brazil/static/imgs/market/t2_1.png" alt=""  data-v="0"/>
    <img class="tab2 " src="http://whzt.taikang.com/brazil/static/imgs/market/t2_2.png" alt=""/>
    <img class="refurbish" src="http://whzt.taikang.com/brazil/static/imgs/market/refurbish.png" alt=""/>

    <ul class="list l1">
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg" /><span class="txt"><em class="i_name"></em><span>抛售</span><em class="red">1000</em><span>能量值；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg" /><span class="txt"><em class="i_name"></em><span>抛售</span><em class="red">1000</em><span>能量值；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg" /><span class="txt"><em class="i_name"></em><span>抛售</span><em class="red">1000</em><span>能量值；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg" /><span class="txt"><em class="i_name"></em><span>抛售</span><em class="red">1000</em><span>能量值；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg" /><span class="txt"><em class="i_name"></em><span>抛售</span><em class="red">1000</em><span>能量值；</span></span></li>
        <div class="btns"><img class="publish" src="http://whzt.taikang.com/brazil/static/imgs/market/publish.png" alt=""/><img class="i_get" src="http://whzt.taikang.com/brazil/static/imgs/market/i_get.png" alt=""/></div>
    </ul>
    <ul class="list l0 hide">
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg"/><span class="txt"><em class="i_name"></em><span>愿为您增加</span><em class="red">1000</em><span>安全系数；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg"/><span class="txt"><em class="i_name"></em><span>愿为您增加</span><em class="red">1000</em><span>安全系数；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg"/><span class="txt"><em class="i_name"></em><span>愿为您增加</span><em class="red">1000</em><span>安全系数；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg"/><span class="txt"><em class="i_name"></em><span>愿为您增加</span><em class="red">1000</em><span>安全系数；</span></span></li>
        <li><img class="redio" src="http://whzt.taikang.com/brazil/static/imgs/market/redio1.png"/><img class="headimg"/><span class="txt"><em class="i_name"></em><span>愿为您增加</span><em class="red">1000</em><span>安全系数；</span></span></li>
        <div class="btns"><img class="publish" src="http://whzt.taikang.com/brazil/static/imgs/market/publish.png" alt=""/><img class="plusSafety" src="http://whzt.taikang.com/brazil/static/imgs/market/plusSafety.png" alt=""/></div>
    </ul>
</div>
<!-- 
我要能量值
 -->

<div class="i_get_box mask hide">
    <div class="alert">
    
        <img class="back " src="http://whzt.taikang.com/brazil/static/imgs/alert.png" alt=""/>
        <div class="headimg"></div>
        <p class="content ">你将获得<span class="i_name">Mary</span>的1000能量，需要为她添加1000安全系数。</p>
        <p class="pay center">支付金额：<span class="red">1.00</span>元</p>
        <div class="btns">
            <img src="http://whzt.taikang.com/brazil/static/imgs/transaction.png" alt="" class=" toup "/>
            <img src="http://whzt.taikang.com/brazil/static/imgs/return.png" alt="" class=" return"/>
        </div>
    </div>
</div>

<div class="publish_box mask hide">
    <div class="alert">
    
        <img class="back " src="http://whzt.taikang.com/brazil/static/imgs/alert.png" alt=""/>
        <p class="content hide">为TA增加1000安全系数，换取1000能量值，是否发布此信息？</p>
        <p class="content hide">出售1000能量值，换取1000安全系数，是否发布此信息？</p>
        <div class="btns">
            <img src="http://whzt.taikang.com/brazil/static/imgs/publish.png" alt="" class="publish_btn"/>
            <img src="http://whzt.taikang.com/brazil/static/imgs/return.png" alt="" class=" return"/>
        </div>
    </div>
</div>
<!-- 我要能量值 -->
<div class="addInsure mask hide">
    <div class="alert">
    
        <img class="back " src="http://whzt.taikang.com/brazil/static/imgs/alert.png" alt=""/>
        <p class="content">当前可捐赠能量值为<span class="myP"></span>，是否以1000能量值向好友索取1000安全系数。</p>
        <div class="btns">
            <img src="http://whzt.taikang.com/brazil/static/imgs/enter.png" alt="" class="addInsure_btn"/>
            <img src="http://whzt.taikang.com/brazil/static/imgs/cancle.png" alt="" class="return"/>
        </div>
    </div>
</div>

<!-- 未拥有账号 -->
<div class="fail_addInsure mask hide">
    <div class="alert">
    
        <img class="back " src="http://whzt.taikang.com/brazil/static/imgs/alert.png" alt=""/>
        <p class="content">您尚未拥有微互助账号，无法接收捐赠，是否立即创建？</p>
        <div class="btns">
            <img src="http://whzt.taikang.com/brazil/static/imgs/market/creat.png" alt="" class="creat"/>
            <img src="http://whzt.taikang.com/brazil/static/imgs/market/give.png" alt="" class="give"/>
            <img src="http://whzt.taikang.com/brazil/static/imgs/cancle.png" alt="" class="return"/>
        </div>
    </div>
</div>


</body>
<script src="http://whzt.taikang.com/brazil/static/js/zepto.min.js?v=1"></script>
<script src="http://whzt.taikang.com/brazil/static/js/landscape.js?v=1"></script>
<script src="http://whzt.taikang.com/brazil/static/js/path.js?v=1"></script>
<script src="http://whzt.taikang.com/brazil/static/js/market.js?v=1"></script>
	<script type="text/javascript">
	var path="http://whzt.taikang.com/brazil";
	var code=${result.code};
	var content=${result.content};
	alert(content);
// 	var errMsg=${result.errMsg};
		fill(content);
	</script>
</html>