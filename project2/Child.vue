<template>
    <div style="margin-top:20px;">
        <input type="text" v-model="mm.value"/>
    </div>
</template>

<script>
    export default {
        props : {
            mm : {
                default () {
                    return {
                         value : "222222"
                    }
                   
                }
            }
        }
    }
</script>
