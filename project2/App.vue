<template>
    <div>
        <slot></slot>
        <h1>{{mm.value}}</h1>
        <input type="text" v-model="mm.value" :mm="mm" />
    </div>
</template>

<script>
    export default {
        props : ["mm"]
    }
</script>
