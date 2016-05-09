<template>
    <div id="header">保单详情</div>
    <div id="content">
        <div>保险名称：{{product.name}}</div>
        <div class="content-item">套餐种类：{{product.type}}</div>
        <div class="content-item">保费：{{product.price}}元</div>
        <div class="content-item" v-for="app in order.applicant">
           <template v-if="app.id=='sex'">
                {{app.label}}：{{app.value=='0'?'男':'女'}}   
           </template>
           <template v-else>
               {{app.label}}：{{app.value}}
           </template>
        </div>
    </div>
</template>

<script>
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    export default{
        data(){
            return data;
        }
    }
</script>

<style scoped>
    #header{
        padding:10px;
        border-bottom:1px solid #ccc;
        text-align: center;
    }
    
    #content{
        padding:10px;
        border-bottom:1px solid #ccc;
    }
    
    .content-item{
        margin-top:10px;
    }
</style>