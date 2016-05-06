<template>
    <div class="row">
       <div class="col-left">{{label}}</div>
       <div class="col-right"><input type="text" v-model="aaa" @keyup.enter="addTodo"/></div>        
    </div>
</template>

<script>
    export default {
        props : ["label","aaa"],
        data () {
            return {
                inputText : "123456"
            }
        },
        methods : {
            addTodo () {
                this.aaa="33333333333";
                console.log(this.aaa);
            }
        }
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
        -webkit-box-flex:2;
    }
    
    input{
        width : 100%;
    }
</style>