import Vue from "vue";
import insure from "./views/Insure";
import tkHeader from "./components/Header";

new Vue({
    el: "body",
    components: {
        insure,
        tkHeader
    }
});