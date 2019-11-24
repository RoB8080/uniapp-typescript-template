<template>
    <view class="menu__body">
        <view class="content">
            <template
                v-for="menuItem in menuItems">
                <view
                    :key="menuItem.label"
                    class="menu-item">
                    <view
                        v-if="menuItem.icon"
                        class="icon" />
                    <view class="label">
                        {{ menuItem.label }}
                    </view>
                </view>
                <view
                    v-for="subItem in menuItem.subItems"
                    :key="subItem.label"
                    class="sub-menu-item">
                    <view
                        v-if="subItem.icon"
                        class="icon" />
                    <view class="label">
                        {{ subItem.label }}
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export interface MenuItem {
    label: string,
    route?: string,
    icon?: string,
    sizeFactor?: number,
    subItems?: MenuItem[]
}

@Component({
    name: 'VerticalMenu'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: []
    }) private menuItems!: MenuItem[]
}
</script>

<style lang="scss" scoped>
.menu__body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    padding: 20rpx;
}

.menu-item {
    font-size: 36rpx;
    font-weight: bold;
    line-height: 2;

    color: $--color-text-regular;
}

.sub-menu-item {
    padding-left: 20rpx;

    font-size: 32rpx;
    line-height: 1.5;

    color: $--color-text-secondary;
}
</style>
