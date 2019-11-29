<template>
    <view
        class="progress__container"
        :style="styleVariables">
        <view class="progress__body">
            <view
                class="progress__bar"
                :class="inlineLabel?'inline':''">
                <view class="inner" />
                <view
                    v-if="inlineLabel"
                    class="progress_inline-label">
                    {{ label }}
                </view>
            </view>
        </view>
        <view
            v-if="!inlineLabel"
            class="progress__label">
            <view class="content">
                {{ label }}
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

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
        default: 4
    }) private strokeWidth!: number

    @Prop({
        required: false,
        default: false
    }) private inlineLabel!: boolean

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
        return `--stroke-width:${this.strokeWidth}px;--percentage:${this.percentage}%;--color:${this.colorString}`
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

    display: grid;
    grid-template-areas: 'body label';
    grid-template-columns: 1fr auto;
}
.progress__body {
    position: relative;
}
.progress__bar {
    position: relative;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    height: var(--bar-width);
    width: 100%;

    background-color: $--bg-color-dark;
    border-radius: var(--stroke-width);
    overflow: hidden;
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
.progress_inline-label {
    position: absolute;

    box-sizing: border-box;
    height: 100%;
    width: var(--percentage);
    min-width: fit-content;
    padding: 0 var(--stroke-width);

    font-size: var(--stroke-width);
    line-height: var(--bar-width);
    text-align: right;

    color: $--color-white;

    transition: all $--animation-time-base ease;
}
.progress__label {
    padding-left: 12px;

    font-size: $--font-size-base;
    line-height: 1.5;

    color: var(--color);

    transition: $--animation-time-base ease;
    transition-property: color;
    .content {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
