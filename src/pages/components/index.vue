<template>
    <view
        class="content"
        :style="theme"
        @touchstart="$refs['drawer'].touchStart($event)"
        @touchmove="$refs['drawer'].touchMove($event)"
        @touchend="$refs['drawer'].touchEnd($event)"
        @touchcancel="$refs['drawer'].touchEnd($event)">
        <view class="list">
            <progress-test />
        </view>
        <drawer
            ref="drawer"
            direction="left"
            depth="450rpx"
            style="z-index: 10;">
            <vertical-menu
                class="menu"
                :menu-items="menu"
                :active.sync="active" />
        </drawer>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ThemeVue from '@/mixins/theme.vue'
import VerticalMenu, { VerticalMenuItem } from '@/component/navigation/vertical-menu/vertical-menu.vue'
import GestureView from '@/component/misc/gesture-view.vue'
import Drawer from '@/component/misc/drawer.vue'
import ProgressTest from './component/example/progress.vue'
import ButtonGroup from '@/component/basic/button-group.vue'
import CustomButton from '@/component/basic/button.vue'

@Component({
    name: 'components',
    components: {
        VerticalMenu,
        GestureView,
        Drawer,
        ProgressTest,
        CustomButton,
        ButtonGroup
    }
})
export default class extends ThemeVue {
    private menu: VerticalMenuItem[] = [
        {
            label: 'Basic',
            value: 'basic',
            subItems: [
                { label: 'link 链接', value: 'link' }
            ]
        },
        {
            label: 'Form',
            value: 'form',
            subItems: [
                { label: 'Button 按钮', value: 'button' },
                { label: 'Radio 单选框', value: 'radio' },
                { label: 'Checkbox 多选框', value: 'checkbox' }
            ]
        },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Misc', value: 'misc' }
    ]

    private active: string = '/basic/link'

    private openDrawer() {
        // @ts-ignore
        this.$refs['drawer'].open()
    }
}
</script>

<style lang="scss" scoped>
.content {
    min-height: 100vh;

    display: grid;
    grid-template-rows: 1fr;
}
.menu {
    background-color: black;
}

.list {
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 15rpx;
    padding: 0 15rpx;
}
</style>
