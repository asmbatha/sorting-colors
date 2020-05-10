<template>
    <span class="color" :style="{backgroundColor: color}" ></span>
</template>

<script>
export default {
    name: 'ColoItem',
    props: ['color'],
}
</script>

<style scoped lang="scss">
    .color {
        display: inline-block;
        border: none;
        padding: 0;
        margin: 0;
        height: 24px;
        width: 18px;
        cursor: pointer;
    }
</style>
