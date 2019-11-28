<template>
    <view
        class="progress__container"
        :style="styleVariables">
        <view class="progress__base" />
        <view
            class="progress__bar"
            :style="percentageString" />
        <view
            class="progress__label">
            {{ label }}
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
    name: 'ProgressLinear'
})
export default class extends Vue {
    @Prop({
        required: true
    }) private percentage!: number

    @Prop({
        required: false
    }) private format!: (percentage: number) => string

    @Prop({
        required: false,
        default: '#000000'
    }) private color!: ColorGetter

    @Prop({
        required: false,
        default: 6
    }) private strokeWidth!: number

    @Prop({
        required: false,
        default: '750rpx'
    }) private width!: string

    private displayPercentage: number = 100;

    private mounted() {
        console.log(this.displayPercentage)
    }

    private timeout: number = 0;

    private stepPercentage() {
        const gap = (this.percentage - this.displayPercentage) / 10
        if (gap > 0.025 || gap < -0.025) {
            this.displayPercentage += gap
            this.$nextTick(() => {
                setTimeout(this.stepPercentage, 20)
            })
        } else {
            this.displayPercentage = this.percentage
        }
    }

    @Watch('percentage')
    private onPercentageChange() {
        if(this.percentage !== this.displayPercentage) {
            clearTimeout(this.timeout)
            setTimeout(this.stepPercentage, 20)
        }
    }

    private get percentageString(): string {
        return `--percentage:${Math.floor(this.displayPercentage * 1000) / 1000}%;`
    }

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

    private get styleVariables(): string {
        return `--stroke-width:${this.strokeWidth}px;--width:${this.width};--color:${this.colorString}`
    }

    private get label(): string {
        if (this.format) {
            return this.format(this.percentage)
        } else {
            return `${this.percentage}%`
        }
    }
}
</script>

<style lang="scss" scoped>
.progress__container {
    --bar-width: calc(var(--stroke-width) * 2);

    position: relative;

    width: var(--width);
    height: var(--width);
}
.progress__base {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    box-sizing: border-box;

    background-color: $--bg-color-dark;
    border-radius: var(--stroke-width);
    overflow: hidden;
    border: var(--bar-width) solid $--bg-color-dark;
    > .inner {
        position: absolute;
        left: -100%;
        transform: translateX(var(--percentage));

        height: 100%;
        width: 100%;

        background-color: var(--color);
        border-radius: var(--stroke-width);

        transition: $--animation-time-base ease;
        transition-property: transform, background-color;
    }
}
.progress__bar {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    box-sizing: border-box;

    border: var(--bar-width) var(--color) solid;
    border-radius: 50%;
    mask-image: conic-gradient(black var(--percentage), transparent var(--percentage));
    mask-mode: alpha;

    transition: all $--animation-time-base ease;
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
