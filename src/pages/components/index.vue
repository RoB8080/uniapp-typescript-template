<template>
    <gesture-view
        class="content"
        :style="theme"
        @swipeleft="onSwipeLeft"
        @swiperight="onSwipeRight">
        <view
            class="menu-wrap"
            :class="showMenu ? '' : 'hide'">
            <vertical-menu
                class="menu"
                :menu-items="menu"
                :active.sync="active" />
        </view>
    </gesture-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ThemeVue from '@/mixins/theme.vue'
import VerticalMenu, { VerticalMenuItem } from '@/component/navigation/vertical-menu/vertical-menu.vue'
import GestureView from '@/component/misc/gesture-view.vue'

@Component({
    name: 'components',
    components: {
        VerticalMenu,
        GestureView
    }
})
export default class extends ThemeVue {
    private showMenu: boolean = false

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

    private onSwipeLeft() {
        this.showMenu = false
    }

    private onSwipeRight() {
        this.showMenu = true
    }
}
</script>

<style lang="scss" scoped>
.content {
    min-height: 100vh;

    display: grid;
    grid-template-rows: 1fr;
}

.menu-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-color: $--bg-color-mask;
    transition: all .3s linear;
    > .menu {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        width: 400rpx;

        background-color: $--color-white;
        transition: all .3s ease;
    }
    &.hide {
        background-color: transparent;
        > .menu {
            transform: translateX(-100%);
        }
    }
}
</style>
