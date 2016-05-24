<template>
    <div>
        <productdesc></productdesc>
        <productprice></productprice>
    </div>
</template>

<script>
    import productdesc from "./wap/WapProductDesc";
    import productprice from "./wap/WapProductPrice";

    export default{
        components : {
            productdesc,
            productprice
        }
    }

</script>
