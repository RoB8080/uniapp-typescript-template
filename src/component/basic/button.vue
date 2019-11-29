<template>
    <button
        class="rb-button__body"
        :class="[type, {round: round}, {plain: plain}, size]"
        :disabled="disabled"
        :hover-start-time="10"
        :hover-stay-time="90"
        @click="$emit('click', $event)">
        <view
            class="rb-button__text"
            :class="[type, {plain: plain}, size]">
            <slot />
        </view>
        <view
            v-if="disabled"
            class="rb-button__disabled-wrap" />
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

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
    }) private size!: string

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

<style lang="scss">
.rb-button__disabled-wrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    border-radius: $--border-radius-base;

    background-color: rgba(180, 180, 180, 0.6);
    mix-blend-mode: screen;
}

.rb-button__body {
    position: relative;

    box-sizing: border-box;
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
    &[disabled] {
        filter: none;
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
    &.primary, &.primary[disabled] {
        background-color: $--color-primary;
        &::after {
            border-color: $--color-primary;
        }
    }
    &.success, &.success[disabled] {
        background-color: $--color-success;
        &::after {
            border-color: $--color-success;
        }
    }
    &.info, &.info[disabled] {
        background-color: $--color-info;
        &::after {
            border-color: $--color-info;
        }
    }
    &.warning, &.warning[disabled] {
        background-color: $--color-warning;
        &::after {
            border-color: $--color-warning;
        }
    }
    &.danger, &.danger[disabled]  {
        background-color: $--color-danger;
        &::after {
            border-color: $--color-danger;
        }
    }
    &.round {
        &, &::before, &::after, > .rb-button__disabled-wrap {
            border-radius: $--component-large-height;
        }
    }
}

.rb-button__text {
    position: relative;

    padding: 0 $--font-size-base;
    box-sizing: border-box;

    font-size: $--font-size-base;
    line-height: $--component-medium-height;
    text-align: center;

    color: $--color-white;
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
    &.large {
        padding: 0 $--font-size-medium;

        font-size: $--font-size-medium;
        line-height: $--component-large-height;
    }
    &.small {
        padding: 0 $--font-size-small;

        font-size: $--font-size-small;
        line-height: $--component-small-height;
    }
    &.mini {
        padding: 0 $--font-size-extra-small;

        font-size: $--font-size-extra-small;
        line-height: $--component-mini-height;
    }
}
</style>
