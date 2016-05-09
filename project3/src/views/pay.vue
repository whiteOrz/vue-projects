<template>
    <div id="header" class="bb">
        <div class="header-col1" @click="goBcak">返回</div>
        <div class="header-col2">选择支付方式</div>
        <div class="header-col1"></div>
    </div>
    
    <div id="content">
        <div class="content-title">订单详情</div>
        <div>
            <div class="content-item">保险名称：{{product.name}}</div>
            <div class="content-item">套餐类型：{{currentType}}</div>
            <div class="content-item">保费：{{price}}元</div>
        </div>
    </div>
    
    <div id="payStyle">
        <div class="payStyle-title">支付方式</div>
        <div class="payStyle-item">
            <input type="radio" name="pay" value="0" checked/>微信支付
        </div>
    </div>
    
    <div id="pay" class="row">
        <div class="col2">微信支付：¥{{price}}元</div>
        <div class="col1" @click="goPay">确认支付</div>
    </div>
</template>

<script>
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    export default {
        data () {
            return data;
        },
        methods : {
            goBcak() {
                history.go(-1);
            },
            goPay(){
                location.href="payResult.html";
            }
        },
        computed :{
            currentType(){
                var index = this.product.select;
                return this.product.types[index].type;
            },
            price(){
                var index = this.product.select;
                return this.product.types[index].price;
            }
        }
    }
</script>

<style scoped>
    #header{
		padding:10px;
		display: -webkit-box;
        border-bottom:1px solid #ccc;
	}
    
    #content{
        padding:10px;
        border-bottom:1px solid #ccc;
    }
    
    .content-title{
        padding-bottom:10px;
         border-bottom:1px solid #ccc;
    }
    
    .content-item{
        padding:10px 0;
    }
    
    #payStyle{
        padding:10px;
        border-bottom:1px solid #ccc;
    }
    
    .payStyle-title{
        padding-bottom:10px;
         border-bottom:1px solid #ccc;
    }
    
    .payStyle-item{
        padding-top:10px;
    }

	.header-col1{
		width:20%;
	}

	.header-col2{
		-webkit-box-flex:1;
		text-align: center;
	}
    
    #pay{
        margin-top:20px;
        padding :0 10px;
        line-height: 40px;
        border-bottom:1px solid #ccc;
        border-top:1px solid #ccc;
    }
    
    .row{
        display: -webkit-box;
    }
    
    .col2{
       -webkit-box-flex:2; 
        border-right:1px solid #ccc;
    }
    
    .col1{
        -webkit-box-flex:1; 
        text-align: center;
    }
</style>