<template>
    <view class="menu__body">
        <vertical-menu-list
            :list="menuItems"
            :active="active" />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import VerticalMenuList from './vertical-menu-list.vue'

export interface VerticalMenuItem {
    label: string,
    value: string,
    accessible?: boolean,
    icon?: string,
    sizeFactor?: number,
    subItems?: VerticalMenuItem[]
}

@Component({
    name: 'VerticalMenu',
    components: {
        VerticalMenuList
    }
})
export default class extends Vue {
    @Prop({
        required: false,
        default: []
    }) private menuItems!: VerticalMenuItem[]

    @Prop({
        required: false,
        default: ''
    }) private active!: string

    @Provide('updateActive')
    private updateActive(val: string) {
        console.log(val)
        this.$emit('update:active', val)
    }
}
</script>

<style lang="scss" scoped>

.menu__body {
    display: grid;
    height: 100%;
    padding: 20rpx 20rpx 20rpx 0;

    background: white;
}
</style>
