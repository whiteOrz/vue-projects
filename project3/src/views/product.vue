<template>
	<div id="header">产品详情</div>
	<div id="productImg">高端私立医院、进口药都赔！每年最高可报销300万</div>
	<div id="prodcutIntr">
		<div>悦享中华-【贵宾专享】高端医疗险</div>
		<div style="margin-top:10px;color:#666;">民价的高端医疗险，高端私立医院、进口药都可报，终身累计最高可报1000万，意外、大病住院不再愁！</div>
		<div style="margin-top:10px;">会员价  ￥1070元起</div>
		<div style="margin-top:10px;color:#666;">促销信息    4.1-4.30返还两倍积分</div>
	</div>
	<div style="padding:10px;border-bottom:1px solid #ccc;">热销爆款 超值低价 透明理赔</div>
	<div id="ageSelect">
		<div>年龄范围（周岁）</div>
		<div class="age">0-17</div>
		<div class="age">18-30</div>
		<div class="age">31-65</div>
	</div>
	<div id="config">
		<div style="padding:10px;">保障责任</div>
		<div style="display:-webkit-box;" class="bt bb">
			<div class="col br" style="background:#ccc;">基本款</div>
			<div class="col br">白金款</div>
			<div class="col">钻石款</div>
		</div>
		<div class="bb">
			<div class="row">
				<div class="col3">房屋主体</div>
				<div class="col1">50万</div>
			</div>
			<div class="row">
				<div class="col3">室内附属设备</div>
				<div class="col1">10万</div>
			</div>
			<div class="row">
				<div class="col3">室内装潢</div>
				<div class="col1">10万</div>
			</div>
			<div class="row">
				<div class="col3">投保人室内意外</div>
				<div class="col1">5万</div>
			</div>
		</div>
	</div>
	<div style="padding:10px;margin-top:10px;" class="bt">
		<div style="padding-bottom:10px;" class="bb">
			<span>性别</span>
			<div style="float:right;color:#666;">请选择></div>
		</div>
		<div style="padding-top:10px;">
			<span>保障期限</span>
			<div style="float:right;color:#666;">3天></div>
		</div>
	</div>

	<div style="margin-top:10px;padding:10px;" class="bt bb">
		<span>更多详情</span>
		<div style="float:right;color:#666;">></div>
	</div>
	<div class="row bt bb" style="margin-top:10px;">
		<div class="col3 br">基本款：￥1070元起</div>
		<div class="col1" @click="goBuy">立即投保</div>
	</div>
</template>

<script>
	export default{
		methods : {
			goBuy () {
				location.href="order.html";
			}
		}
	}	
</script>

<style scoped>
	#header{
		text-align: center;
		padding:10px 0;
		border:1px solid #ccc;
	}

	#productImg{
		padding:30px 10px;
		border-bottom: 1px solid #ccc;
	}

	#prodcutIntr{
		padding : 10px;
		border-bottom: 1px solid #ccc;
	}

	#ageSelect{
		padding : 10px;
		display: -webkit-box;
		border-bottom:1px solid #ccc;
	}
	.age{
		padding : 0 10px;
	}

	.col{
		-webkit-box-flex:1;
		text-align: center;
		padding:10px 0;
	}

	.bt{
		border-top: 1px solid #ccc;
	}

	.bb{
		border-bottom: 1px solid #ccc;
	}

	.br{
		border-right: 1px solid #ccc;
	}

	.row{
		display: -webkit-box;
	}

	.col3{
		-webkit-box-flex:3;
		padding:10px;
	}

	.col1{
		-webkit-box-flex:1;
		padding:10px;
		text-align: center;

	}
</style>