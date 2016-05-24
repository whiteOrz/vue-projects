import Vue from "vue";
import app from "./components/app";

new Vue({
    el : "body",
    components : {
        app
    },
    ready(){
        console.log("app load");
    }
});
