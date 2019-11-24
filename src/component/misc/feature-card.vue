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
            v-if="enableFunction"
            class="button"
            @click="toggleFunction">
            <view class="inner">
                {{ showFunction ? '介绍' : '尝试' }}
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
        default: false
    }) private enableFunction!: boolean

    @Prop({
        required: false,
        default: ''
    }) private title!: string

    @Prop({
        required: true,
        default: ''
    }) private label!: string

    private showFunction: boolean = false

    private toggleFunction() {
        if (this.enableFunction) {
            this.showFunction = !this.showFunction
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

    border: 1px solid $--color-border-light;
    border-radius: 10rpx;

    background-color: white;
    filter: $--shadow-filter;
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
            padding: 15rpx;
            grid-area: label;

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

        height: 100%;
        width: 110rpx;

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
