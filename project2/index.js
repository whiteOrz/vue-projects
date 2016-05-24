import Vue from "vue";
import app from "./App";

var data = {
    mm: {
        value: "111111"
    }
};

new Vue({
    el: "body",
    data : data,
    components: {
        app
    }
});
