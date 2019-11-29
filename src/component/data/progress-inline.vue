<template>
    <view
        class="progress__container"
        :class="[size]"
        :style="styleVariables">
        <view
            class="progress__body"
            :class="[size]">
            <canvas
                v-if="canvasID"
                :canvas-id="canvasID"
                class="progress__canvas" />
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

interface ColorRule {
    color: string
    percentage: 20
}

interface ColorFunction {
    (percentage: number): string
}

export type ColorGetter = string | ColorRule[] | ColorFunction
@Component({
    name: 'ProgressInline'
})
export default class extends Vue {
    @Prop({
        required: true
    }) private percentage!: number

    private displayPercentage: number = 0
    private timeoutID: number = 0

    private chasingStep() {
        const step = (this.percentage - this.displayPercentage) / 10
        if (Math.abs(step) > 0.05) {
            this.displayPercentage += step
            this.timeoutID = setTimeout(this.chasingStep, 17)
        } else {
            this.displayPercentage = this.percentage
        }
    }

    @Watch('percentage')
    private onPercentageChange() {
        clearTimeout(this.timeoutID)
        this.timeoutID = setTimeout(this.chasingStep, 17)
    }

    @Prop({
        required: false
    }) private color!: ColorGetter

    @Prop({
        required: false,
        default: 'medium'
    }) size!: string

    private get colorHelper() {
        if (typeof this.color === 'string') {
            return (percentage: number) => this.color as string
        } else if (Array.isArray(this.color)) {
            return (percentage: number) => {
                const color = this.color as ColorRule[]
                const len = color.length
                for (let i = 0; i < len; i++) {
                    if (percentage < color[i].percentage) {
                        return color[i].color
                    }
                }
                return color[len - 1].color
            }
        } else {
            return this.color
        }
    }

    private get colorString(): string {
        if (this.colorHelper) {
            return this.colorHelper(this.percentage)
        } else {
            return '#c1c4c8'
        }
    }

    private get styleVariables(): string {
        return this.colorString ? `--color:${this.colorString};` : ''
    }

    private canvasID: string = ''
    private canvasContext!: CanvasContext
    private canvasLengthBase: number = uni.getSystemInfoSync().fontSizeSetting || 16

    private get ringR() {
        const r = this.canvasLengthBase
        switch (this.size) {
        case 'mini': return r * 0.43
        case 'small': return r * 0.465
        case 'large': return r * 0.57
        default: return r * 0.5
        }
    }

    private get ringDeg() {
        return (2 * Math.PI / 100 * this.displayPercentage) - 0.5 * Math.PI
    }

    private drawRing() {
        const context = this.canvasContext
        const r = this.ringR
        const d = this.ringDeg
        context.beginPath()
        context.moveTo(r, r)
        context.arc(r, r, r - 2, -0.5 * Math.PI, d)
        context.fillStyle = this.colorString
        context.fill()
        context.draw()
    }

    @Watch('displayPercentage')
    private onDisplayPercentageChange() {
        this.drawRing()
    }

    private created() {
        this.canvasID = new Date().getTime().toString()
    }

    private mounted() {
        this.canvasContext = uni.createCanvasContext(this.canvasID, this)
        this.drawRing()
        this.$nextTick(this.chasingStep)
    }
}
</script>

<style lang="scss" scoped>
.progress__container {
    --color: #{$--bg-color-dark};

    position: relative;

    height: $--component-medium-height;
    width: $--font-size-base;
    &.large {
        height: $--component-large-height;
        width: $--font-size-medium;
    }
    &.small {
        height: $--component-large-height;
        width: $--font-size-medium;
    }
    &.mini {
        height: $--component-large-height;
        width: $--font-size-medium;
    }
}
.progress__body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: $--font-size-base;
    width: 100%;

    &.large {
        height: $--font-size-medium;
    }

    &::after {
        content: "";

        position: absolute;
        left: 0;
        top: 0;

        display: block;
        height: 100%;
        width: 100%;
        box-sizing: border-box;

        border: 1px solid var(--color);
        border-radius: $--font-size-base;
    }
}
.progress__canvas {
    width: 100%;
    height: 100%;
}
</style>
