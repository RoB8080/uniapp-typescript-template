<template>
    <view
        class="rb-drawer__viewport"
        :style="variablesStyle">
        <view
            class="rb-drawer__wrap"
            :class="direction">
            <view
                class="rb-drawer__body"
                @click.stop>
                <slot />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type Direction = 'left'|'right'|'top'|'bottom'

@Component({
    name: 'Drawer'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: '500rpx'
    }) depth!: string

    @Prop({
        required: false,
        default: 'left',
        validator: (val) => {
            return ['left', 'right', 'top', 'bottom'].includes(val)
        }
    }) private direction!: string

    windowWidth: number = 0
    windowHeight: number = 0

    get pixelDepth(): number {
        try {
            const t = /^([0-9]*[.]*[0-9]+)(rpx|px|vw|vh)$/.exec(this.depth)!
            const number = parseInt(t[1])
            switch (t[2]) {
            case 'rpx': return number / 750 * this.windowWidth
            case 'vw': return number / 100 * this.windowWidth
            case 'vh': return number / 100 * this.windowHeight
            case 'px':
            default: return number
            }
        } catch {
            return this.windowWidth * 0.5
        }
    }

    get variablesStyle() {
        return `--drawer-depth:${this.pixelDepth}px;`
    }

    created() {
        const { windowWidth, windowHeight } = uni.getSystemInfoSync()
        this.windowWidth = windowWidth || 100
        this.windowHeight = windowHeight || 100
    }
}
</script>

<style lang="scss" scoped>
.rb-drawer__viewport {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    overflow: scroll;
}

.rb-drawer__wrap {
    position: relative;

    background-color: red;
    > .rb-drawer__body {
        position: absolute;

        background-color: green;
    }
    &.left, &.right {
        height: 100%;
        width: calc(var(--drawer-depth) + 100vw);
        > .rb-drawer__body {
            height: 100%;
            width: var(--drawer-depth);
        }
    }
    &.top, &.bottom {
        width: 100%;
        height: calc(var(--drawer-depth) + 100vh);
        > .rb-drawer__body {
            width: 100%;
            height: var(--drawer-depth);
        }
    }
    &.left > .rb-drawer__body {
        left: 0;
    }
    &.right > .rb-drawer__body {
        right: 0;
    }
    &.top > .rb-drawer__body {
        top: 0;
    }
    &.bottom > .rb-drawer__body {
        bottom: 0;
    }
}
</style>
