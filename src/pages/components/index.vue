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
                :menu-items="menu" />
        </view>
    </gesture-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VerticalMenu, { MenuItem } from '@/component/navigation/vertical-menu.vue'
import GestureView from '@/component/misc/gesture-view.vue'

@Component({
    name: 'components',
    components: {
        VerticalMenu,
        GestureView
    }
})
export default class extends Vue {
    private showMenu: boolean = false

    private get theme() {
        return this.$store.getters['theme/themeStyleString']
    }

    private menu: MenuItem[] = [
        { label: 'Basic' },
        { label: 'Form' },
        { label: 'Navigation' },
        { label: 'Misc' }
    ]

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

        width: 350rpx;

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
