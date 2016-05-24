<template>
    <div style="margin-top:10px;" id="testContainer">
        <component :is="realComponents.component1"></component>
        <component :is="realComponents.component2"></component>
        <component :is="realComponents.component3"></component>
        <component :is="realComponents.component4"></component>
        <component :is="realComponents.component5"></component>
        <component :is="realComponents.component6"></component>
        <component :is="realComponents.component7"></component>
        <component :is="realComponents.component8"></component>
        <component :is="realComponents.component9"></component>
        <component :is="realComponents.component10"></component>
    </div>
</template>

<script>
    import data from "../util/data";
    console.log(data);

    var components = data.components;
    var realComponents={};
    components.forEach(function(el,index){
        var realComponent = require("../components/" + el);
        realComponents["component" + (index+1)] =realComponent;
    });
    realComponents = {
        "component1" : testb,
        "component2" : testa
    }
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
