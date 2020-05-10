<template>
    <div class="color-list-input">
        <div class="color-list">
            <color-item
                v-for="(color, i) in colors"
                :key="color + i"
                :color="color"
                @click.native="$emit('select', color)"
                class="color-item"
                :class="{ selected: selected == i }"
            ></color-item>
        </div>
    </div>
</template>

<script>
import ColorItem from '@/components/ColorItem'
export default {
    name: 'ColorList',
    props: ['colors', 'selected'],
    components: { ColorItem },
}
</script>

<style scoped lang="scss">
.color-list-input {
    user-select: none;
    touch-action: pan-x;
    overflow-x: scroll;
    white-space: nowrap;
    box-sizing: border-box;
    margin: 0;
    border-radius: 3px;

    &::-webkit-scrollbar { display: none; }

    .color-list {
        box-sizing: border-box;
        min-width: 100%;
        display: flex;

        .color-item {
            transition: all .2s;
        }
    }
}
</style>
