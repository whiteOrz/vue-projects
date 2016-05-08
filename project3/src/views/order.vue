<template>
	<div id="header">
		<div class="header-col1" @click="goBcak">返回</div>
		<div class="header-col2">填写订单信息</div>
		<div class="header-col1"></div>
	</div>
</template>

<script>

export default{
	methods : {
		goBcak () {
			history.go(-1);
		}
	}
}
	

</script>

<style scoped>
	#header{
		padding:10px;
		display: -webkit-box;
	}

	.header-col1{
		width:20%;
	}

	.header-col2{
		-webkit-box-flex:1;
		text-align: center;
	}
</style>