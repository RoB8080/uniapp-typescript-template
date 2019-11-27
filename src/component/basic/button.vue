<template>
    <button
        class="rb-button__body"
        :class="[type, {round: round}, {plain: plain}]"
        :disabled="disabled">
        <view
            class="rb-button__text"
            :class="[type, {plain: plain}]">
            <slot />
        </view>
        <view
            v-if="disabled"
            class="rb-button__disable-wrap" />
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComponentSize } from '@/component/attributes'

export type ButtonType = 'default'|'primary'|'success'|'info'|'warning'|'danger'|'text'

@Component({
    name: 'Button'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: 'default'
    }) private type!: ButtonType

    @Prop({
        required: false,
        default: 'medium'
    }) private size!: ComponentSize

    @Prop({
        required: false,
        default: false
    }) private plain!: boolean

    @Prop({
        required: false,
        default: false
    }) private round!: boolean

    @Prop({
        required: false,
        default: false
    }) private disabled!: boolean
}
</script>

<style lang="scss" scoped>
button {
    margin: 0;
    padding: 0;

    overflow: visible;
    &::after {
        content: "";

        transform: none;

        border: none;
    }
}
.rb-button__body {
    position: relative;

    box-sizing: border-box;
    height: $--component-height-medium;

    font-size: 10px;

    border-radius: $--border-radius-base;

    background-color: $--color-white;
    transition: filter 50ms linear;
    &:active {
        filter: brightness(85%);
    }
    &::after {
        content: " ";

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: $--border-radius-base;

        border: $--color-border-base 1px solid;
    }
    &.plain::before {
        content: " ";

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: $--color-white;
        opacity: 0.9;
    }
    &.primary {
        background-color: $--color-primary;
        &::after {
            border-color: $--color-primary;
        }
    }
    &.success {
        background-color: $--color-success;
        &::after {
            border-color: $--color-success;
        }
    }
    &.info {
        background-color: $--color-info;
        &::after {
            border-color: $--color-info;
        }
    }
    &.warning {
        background-color: $--color-warning;
        &::after {
            border-color: $--color-warning;
        }
    }
    &.danger {
        background-color: $--color-danger;
        &::after {
            border-color: $--color-danger;
        }
    }
    &.round {
        border-radius: $--component-height-medium-half;
        &::after {
            border-radius: $--component-height-medium-half;
        }
    }
    &[disabled] {
        filter: none;
        &::after {
            background-color: rgba(200, 200, 200, 0.4);
        }
    }
}

.rb-button__text {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    padding: 0 $--font-size-base;
    box-sizing: border-box;

    font-size: $--font-size-base;
    line-height: $--component-height-medium;
    text-align: center;

    color: $--color-white;
    overflow: hidden;
    &.default {
        color: $--color-text-regular;
    }
    &.plain {
        &.primary {
            color: $--color-primary;
        }
        &.success {
            color: $--color-success;
        }
        &.info {
            color: $--color-info;
        }
        &.warning {
            color: $--color-warning;
        }
        &.danger {
            color: $--color-danger;
        }
    }
}
</style>
