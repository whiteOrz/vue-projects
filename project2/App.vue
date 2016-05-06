<template>
    <div>
        <h1>{{mm.value}}</h1>
        <input type="text" v-model="mm.value" :mm="mm"/>
        <child></child>
    </div>
    
</template>


<script>
    import child from "./Child";
    
    export default {
        data (){
            return {
                mm : {
                    value : "111111"
                }
            }
        },
        components : {
            child
        }
    }
</script>