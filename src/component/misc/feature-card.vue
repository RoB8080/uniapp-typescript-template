<template>
    <view class="feature-card-body">
        <view
            v-if="title"
            class="title">
            <view class="inner">
                {{ title }}
            </view>
        </view>
        <view
            class="content"
            :class="showFunction ? 'function-mode' : ''">
            <view class="label">
                {{ label }}
            </view>
            <view class="function">
                <slot />
            </view>
        </view>
        <view
            v-if="reaction"
            class="button"
            @click="clickButton">
            <view class="inner">
                {{ buttonLabel }}
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'FeatureCard'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: 0
    }) private reaction!: number

    @Prop({
        required: false,
        default: ''
    }) private title!: string

    @Prop({
        required: true,
        default: ''
    }) private label!: string

    private showFunction: boolean = false

    private get buttonLabel(): string {
        switch (this.reaction) {
        case 1: return this.showFunction ? '介绍' : '尝试'
        case 2: return '查看'
        default: return ''
        }
    }

    private clickButton() {
        switch (this.reaction) {
        case 1: this.showFunction = !this.showFunction; break
        case 2: this.$emit('click'); break
        }
    }
}
</script>

<style lang="scss" scoped>
.feature-card-body {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'title content button';
    height: 120rpx;

    border-radius: 10rpx;

    overflow: hidden;
    background-color: white;
    filter: $--shadow-filter-base;
    > .title {
        position: relative;

        grid-area: title;
        width: 110rpx;

        font-size: 30rpx;
        font-weight: bold;

        color: $--color-text-regular;

        border-right: 1px solid $--color-border-lighter;
    }
    > .content {
        position: relative;
        > .label {
            height: 100%;
            padding: 15rpx;
            box-sizing: border-box;

            font-size: 24rpx;

            color: $--color-text-secondary;
            transition: all .2s linear;
        }
        > .function {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            transition: all .2s linear;

            opacity: 0;
            pointer-events: none;
        }
        &.function-mode {
            > .label {
                opacity: 0;
            }
            > .function {
                opacity: 1;
                pointer-events: all;
            }
        }
    }
    > .button {
        position: relative;

        width: calc(110rpx + 1px);

        font-size: 30rpx;

        color: $--color-white;
        background-color: var(--color-primary);
    }
}

.inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: fit-content;
}
</style>
