<template>
    <div class="row">
       <div class="col-left">性别</div>
       <div class="col-right">
           <input type="radio" name="sex" value="0" v-model="app.value"/>男
       </div>
       <div class="col-right">
           <input type="radio" name="sex" value="1" v-model="app.value"/>女
       </div>    
    </div>
</template>

<script>
    export default {
        props : ["app"]
    }
</script>

<style scoped>
    .row {
        padding : 0.5em 1em;
        display: -webkit-box;
    }
    .col-left {
        width:30%;
    }
    .col-right {
        -webkit-box-flex:1;
    }
</style>
