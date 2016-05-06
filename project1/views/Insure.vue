<template>
    <div style="margin-top:10px;">
        <div v-for="app in applicant">
            <tk-common-item :label="app.label" :aaa="app.aaa" v-if="app.show" track-by="$index"></tk-common-item>               
        </div>
        <div id="submit-btn">
            <div @click="submit" :style="canSubmit">确认无误，购买</div>
        </div>
    </div>
</template>

<script>
    import initData from "../util/util";
    var data = initData();
    
    import TkCommonItem from "../components/CommonItem";
    
    export default {
        data () {
            return data;
        },
        components : {
            TkCommonItem
        },
        methods : {
            submit () {
                alert(JSON.stringify(this.applicant));
            }
        },
        computed : {
            canSubmit () {
                return {
                    color : "#000"
                }
            }
        }
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