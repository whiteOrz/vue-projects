
import Vue from "vue";
import app from "./views/insure";
import $ from "jquery";
// import { MobileSelectDate } from "./js/test1";
//
// console.log(MobileSelectDate);

var a = require("./js/mobile-select-date");



new Vue({
    el : "body",
    components : {
        app
    }
});
