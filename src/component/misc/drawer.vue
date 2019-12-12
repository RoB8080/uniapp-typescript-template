<template>
    <movable-area
        class="drawer__wrap"
        :class="active? 'active' : ''"
        :style="variablesStyle"
        @touchmove.stop>
        <movable-view
            class="drawer__slider"
            :class="_direction"
            direction="all"
            :animation="animation"
            :x="x"
            :y="y"
            :damping="100"
            @change="onPosChange"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @click.stop="closeHelper">
            <view
                class="drawer__body"
                @click.stop>
                <slot />
            </view>
        </movable-view>
    </movable-area>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type Direction = 'left'|'right'|'top'|'bottom'

@Component({
    name: 'Drawer'
})
export default class extends Vue {
    private active: boolean = false

    @Prop({
        required: false,
        default: 0.4
    }) private maxWrapOpacity!: number;

    private get _maxWrapOpacity(): number {
        const input = this.maxWrapOpacity
        if (input > 1) {
            return 1
        } else if (input < 0) {
            return 0
        } else {
            return input
        }
    }

    @Prop({
        required: false,
        default: 'left'
    }) private direction!: string

    private get _direction() {
        if (/^(left|right|top|bottom)$/.test(this.direction)) {
            return this.direction as Direction
        } else {
            return 'left'
        }
    }

    @Prop({
        required: false,
        default: '500rpx'
    }) private depth!: string

    private opacityFactor: number = 0;

    private get pixelDepth(): number {
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

    private get variablesStyle() {
        return `--drawer-depth:${this.pixelDepth}px;--wrap-opacity:${this._maxWrapOpacity * this.opacityFactor};`
    }

    private get opacityFactorHelper() {
        let calc: (pos: [number, number]) => number
        switch (this._direction) {
        case 'top': calc = (pos) => { return 1 + pos[1] / this.pixelDepth }; break
        case 'right': calc = (pos) => { return -pos[0] / this.pixelDepth }; break
        case 'bottom': calc = (pos) => { return -pos[1] / this.pixelDepth }; break
        case 'left': calc = (pos) => { return 1 + pos[0] / this.pixelDepth }; break
        }
        return (pos: [number, number]) => {
            return new Promise((resolve) => {
                this.opacityFactor = calc(pos)
                resolve()
            })
        }
    }

    private animation: boolean = false

    private windowWidth: number = 0
    private windowHeight: number = 0
    private x: number = 0
    private y: number = 0
    private touchingX: number | null = null
    private touchingY: number | null = null

    private get closeHelper() {
        let target: [number, number]
        switch (this._direction) {
        case 'top': target = [0, -this.pixelDepth]; break
        case 'right': target = [this.windowWidth, 0]; break
        case 'bottom': target = [0, this.windowHeight]; break
        case 'left':target = [-this.pixelDepth, 0]; break
        }
        return () => {
            return new Promise((resolve) => {
                this.$nextTick(function() {
                    this.active = false
                    this.opacityFactor = 0
                    this.x = target[0]
                    this.y = target[1]
                    resolve()
                })
            })
        }
    }
    private get openHelper() {
        let target: [number, number]
        switch (this._direction) {
        case 'top': target = [0, 0]; break
        case 'right': target = [-this.pixelDepth, 0]; break
        case 'bottom': target = [0, -this.pixelDepth]; break
        case 'left': target = [0, 0]; break
        }
        return () => {
            return new Promise((resolve) => {
                this.$nextTick(function() {
                    this.active = true
                    this.opacityFactor = 1
                    this.x = target[0]
                    this.y = target[1]
                    resolve()
                })
            })
        }
    }

    opacityFactorHelperTimeoutID: number = 0;

    private onPosChange(event: {detail: {x: number, y: number, source: string}}) {
        const { x, y, source } = event.detail
        if (source === 'touch') {
            this.touchingX = x
            this.touchingY = y
        }
        if (!this.opacityFactorHelperTimeoutID) {
            this.opacityFactorHelperTimeoutID = setTimeout(() => {
                this.opacityFactorHelperTimeoutID = 0
                this.opacityFactorHelper([x, y])
            }, 17)
        }
    }

    private onTouchEnd() {
        if (this.touchingX === null || this.touchingY === null) {
            return 0
        }
        let toClose: boolean = false
        switch (this._direction) {
        case 'top': toClose = this.touchingY <= -this.pixelDepth * (this.active ? 0.2 : 0.8); break
        case 'right': toClose = this.touchingX >= -this.pixelDepth * (this.active ? 0.8 : 0.2); break
        case 'bottom': toClose = this.touchingY >= -this.pixelDepth * (this.active ? 0.8 : 0.2); break
        case 'left': toClose = this.touchingX <= -this.pixelDepth * (this.active ? 0.2 : 0.8); break
        }
        this.x = this.touchingX
        this.y = this.touchingY
        if (toClose) {
            this.touchingX = this.touchingY = null
            this.closeHelper()
        } else {
            this.touchingX = this.touchingY = null
            this.openHelper()
        }
    }

    private async created() {
        const { windowWidth, windowHeight } = uni.getSystemInfoSync()
        this.windowWidth = windowWidth || 100
        this.windowHeight = windowHeight || 100
        await this.closeHelper()
        this.animation = true
    }

    // 外部方法

    public open() {
        return new Promise(async(resolve) => {
            await this.openHelper()
            resolve()
        })
    }

    public close() {
        return new Promise(async(resolve) => {
            await this.closeHelper()
            resolve()
        })
    }

    private modifierX = 0
    private modifierY = 0

    private get singleLimiter() {
        const { pixelDepth } = this
        return (x: number) => { return x > 0 ? 0 : x < -pixelDepth ? -pixelDepth : x }
    }

    private get posLimiter() {
        let xLimiter: (x: number) => number
        let yLimiter: (y: number) => number
        switch (this._direction) {
        case 'top':
        case 'bottom':
            xLimiter = () => 0
            yLimiter = this.singleLimiter
            break
        case 'left':
        case 'right':
            xLimiter = this.singleLimiter
            yLimiter = () => 0
            break
        }
        return (pos: [number, number]) => {
            return [xLimiter(pos[0]), yLimiter(pos[1])]
        }
    }

    public touchStart(event: TouchEvent) {
        return new Promise(() => {
            const { clientX: x, clientY: y } = event.changedTouches[0]
            this.modifierX = this.x - x
            this.modifierY = this.y - y
        })
    }

    public touchMove(event: TouchEvent) {
        return new Promise(() => {
            const { clientX: x, clientY: y } = event.changedTouches[0]
            const [tx, ty] = this.posLimiter([
                this.modifierX + x,
                this.modifierY + y
            ])
            this.$nextTick(() => {
                this.x = tx
                this.y = ty
                this.onPosChange({ detail: { x: tx, y: ty, source: 'touch' } })
            })
        })
    }

    public touchEnd() {
        return new Promise(() => {
            this.onTouchEnd()
        })
    }
}
</script>

<style lang="scss" scoped>
.drawer__wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    width: auto;
    height: auto;

    background-color: rgba(0, 0, 0, var(--wrap-opacity));

    transition: all $--animation-time-base linear;

    pointer-events: none;
    &.active {
        pointer-events: all;
    }
}

.drawer__slider {
    position: absolute;
    > .drawer__body {
        position: absolute;
    }
    &.left, &.right {
        height: 100%;
        width: calc(var(--drawer-depth) + 100vw);
        > .drawer__body {
            height: 100%;
            width: var(--drawer-depth);
        }
    }
    &.top, &.bottom {
        width: 100%;
        height: calc(var(--drawer-depth) + 100vh);
        > .drawer__body {
            width: 100%;
            height: var(--drawer-depth);
        }
    }
    &.left > .drawer__body {
        left: 0;
    }
    &.right > .drawer__body {
        right: 0;
    }
    &.top > .drawer__body {
        top: 0;
    }
    &.bottom > .drawer__body {
        bottom: 0;
    }
}
</style>
