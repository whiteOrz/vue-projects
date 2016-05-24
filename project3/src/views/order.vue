<template>
	<div id="header">
		<div class="header-col1" @click="goBcak">返回</div>
		<div class="header-col2">填写订单信息</div>
		<div class="header-col1"></div>
	</div>
	<div id="content">
        <template v-for="app in order.applicant">
            <template v-if="app.id==='sex'">
                <tk-sex-item :app="app"></tk-sex-item>
            </template>
            <template v-else>
                <tk-common-item :app="app"></tk-common-item>
            </template>
        </template>
	</div>
    <div id="submit-btn">
        <div @click="submit">确认无误，购买</div>
    </div>
</template>

<script>
    import TkCommonItem from "../components/commonItem";
    import TkSexItem from "../components/sexItem";

    var data = localStorage.getItem("data");
    data = JSON.parse(data);

    export default{
        ready(){

        },
        data (){
            return data;
        },
        components : {
            TkCommonItem,
            TkSexItem
        },
        methods : {
            goBcak () {
                history.go(-1);
            },
            submit () {
                console.log(JSON.stringify(this.$data));
                if(!checkData(this.order)){
                    return false;
                }

                localStorage.setItem("data",JSON.stringify(this.$data));
                location.href="pay.html";
            }
        }
    }

    function checkData(data){
        for(var i=0;i<data.applicant.length;i++){
            var app =data.applicant[i];
            if(app.value===""){
                alert(app.label+"不能为空！");
                return false;
            }
        }
        return true;
    }

</script>

<style scoped>
	#header{
		padding:10px;
		display: -webkit-box;
        border-bottom : 1px solid #ccc;
	}

	.header-col1{
		width:20%;
	}

	.header-col2{
		-webkit-box-flex:1;
		text-align: center;
	}

    #submit-btn{
        margin-top:1em;
        padding:0.5em 1.5em;
    }

    #submit-btn > div {
        padding :0.5em 1.5em;
        text-align: center;
        background: #d61b04;
        color:#fff;
    }

    #content{
        margin-top:1em;
    }
</style>
