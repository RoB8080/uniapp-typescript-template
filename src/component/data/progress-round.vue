<template>
    <view
        class="progress__container"
        :style="styleVariables">
        <canvas
            v-if="canvasID"
            :canvas-id="canvasID"
            class="progress__canvas" />
        <view
            class="progress__label">
            {{ label }}
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { toPixel } from '../utils/length'

interface ColorRule {
    color: string
    percentage: 20
}

interface ColorFunction {
    (percentage: number): string
}

export type ColorGetter = string | ColorRule[] | ColorFunction
@Component({
    name: 'ProgressLinear'
})
export default class extends Vue {
    @Prop({
        required: true
    }) percentage!: number

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
    }) format!: (percentage: number) => string

    @Prop({
        required: false,
        default: '#000000'
    }) color!: ColorGetter

    @Prop({
        required: false
    }) fontColor!: string

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
        return this.colorHelper(this.percentage)
    }

    @Prop({
        required: false,
        default: '6px'
    }) lineWidth!: string

    @Prop({
        required: false,
        default: '50px'
    }) width!: string

    get pixelWidth(): number {
        return toPixel(this.width) || 6
    }

    get pixelLineWidth(): number {
        return toPixel(this.lineWidth) || 50
    }

    get styleVariables(): string {
        return `--width:${this.pixelWidth}px;--color:${this.fontColor || this.colorString};--line-width:${this.lineWidth}px;`
    }

    get label(): string {
        if (this.format) {
            return this.format(this.percentage)
        } else {
            return `${this.percentage}%`
        }
    }

    get ringP() {
        return this.pixelWidth / 2
    }
    get ringR() {
        return (this.pixelWidth - this.pixelLineWidth) / 2.1
    }
    get ringDeg() {
        return (2 * Math.PI / 100 * this.displayPercentage) - 0.5 * Math.PI
    }

    private canvasID: string = ''
    private canvasContext!: CanvasContext
    private canvasLengthBase: number = uni.getSystemInfoSync().fontSizeSetting || 16

    private drawRing() {
        const context = this.canvasContext
        const r = this.ringR
        const p = this.ringP

        context.lineWidth = this.pixelLineWidth

        context.beginPath()
        context.arc(p, p, r, 0, 2 * Math.PI)
        context.strokeStyle = '#c1c4c8'
        context.stroke()

        if (this.displayPercentage !== 0) {
            context.beginPath()
            context.arc(p, p, r, -0.5 * Math.PI, this.ringDeg)
            context.lineCap = 'round'
            context.strokeStyle = this.colorString
            context.stroke()
        }

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
    position: relative;

    width: var(--width);
    height: var(--width);
}
.progress__canvas {
    width: 100%;
    height: 100%;
}
.progress__label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    font-size: $--font-size-base;
    line-height: 1.5;

    color: var(--color);

    transition: $--animation-time-base ease;
    transition-property: color;
}
</style>
