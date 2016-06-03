<template>
    <div style="margin-top:10px;" id="testContainer">
        <Component1></Component>
    </div>
</template>

<script>
    import data from "../util/data";
    console.log(data);

    var components = data.components;
    var realComponents={};
    components.forEach(function(el,index){
        var realComponent = require("../components/" + el);
        realComponents["Component" + (index+1)] =realComponent;
    });

    data.realComponents = realComponents;
    console.log(data.realComponents);

    export default {
        data () {
            return data;
        },
        components : realComponents
    }




</script>


<style scoped>
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

</style>
