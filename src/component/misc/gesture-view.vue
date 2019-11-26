<template>
    <view
        class="gesture-view__body"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd">
        <slot />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'GestureView'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: 1
    }) private swipeThreshold!: number;

    private touchStartX: number = 0;
    private touchStartY: number = 0;
    private touchStartTime: number = 0;
    private touchCurrentX: number = 0;
    private touchCurrentY: number = 0;
    private touchCurrentTime: number = 0;
    private windowWidth: number = uni.getSystemInfoSync().windowWidth || 250;

    private onTouchStart({ changedTouches: [changedTouch] }: TouchEvent) {
        this.touchStartX = changedTouch.clientX
        this.touchStartY = changedTouch.clientY
        this.touchStartTime = new Date().getTime()
    }

    private onTouchMove({ changedTouches: [changedTouch] }: TouchEvent) {
        console.log(changedTouch)
    }

    private onTouchEnd({ changedTouches: [changedTouch] }: TouchEvent) {
        this.touchCurrentX = changedTouch.clientX
        this.touchCurrentY = changedTouch.clientY
        this.touchCurrentTime = new Date().getTime()

        const duration = this.touchCurrentTime - this.touchStartTime
        const distanceX = this.touchCurrentX - this.touchStartX
        const distanceY = this.touchCurrentY - this.touchStartY

        const absX = Math.abs(distanceX)
        const absY = Math.abs(distanceY)

        if (duration < 50) {
            return 0
        }
        if (absX >= absY) { // 横向判定
            if (this.speedCheck(absX, duration)) {
                this.$emit(distanceX > 0 ? 'swiperight' : 'swipeleft')
            }
        } else { // 纵向判定
            if (this.speedCheck(absY, duration)) {
                this.$emit(distanceY > 0 ? 'swipedown' : 'swipeup')
            }
        }
    }

    private speedCheck(distance: number, duration: number) {
        return distance * 1000 / duration / this.windowWidth >= this.swipeThreshold
    }
}
</script>

<style lang="scss" scoped>
.gesture-view__body {
    height: 100%;
    touch-action: pan-x;
}
</style>
