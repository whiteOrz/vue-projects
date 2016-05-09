<template>
    <div class="row">
       <div class="col-left">{{app.label}}</div>
       <div class="col-right"><input type="text" v-model="app.value"/></div>        
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
    
    input{
        width : 100%;
    }
</style>