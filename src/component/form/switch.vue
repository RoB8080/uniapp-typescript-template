<template>
    <view
        class="rb-switch__container"
        :class="[size]"
        @click="_value = !value">
        <view
            class="rb-switch__body"
            :class="[size, {active: _value}, {disabled: disabled}]" />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'Switch'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: false
    }) inactiveValue!: boolean | string | number

    @Prop({
        required: false,
        default: true
    }) activeValue!: boolean | string | number

    @Prop({
        required: false,
        default: false
    }) value!: boolean | string | number

    @Prop({
        required: false,
        default: 'medium'
    }) size!: string

    @Prop({
        required: false,
        default: false
    }) disabled!: boolean

    get _value() {
        return this.value === this.activeValue
    }

    set _value(newVal: boolean) {
        if (!this.disabled) {
            this.$emit('input', newVal ? this.activeValue : this.inactiveValue)
        }
    }
}
</script>

<style lang="scss" scoped>
$--font-size-extra-small-double: calc(var(--font-size-base) * 1.72);
$--font-size-small-double: calc(var(--font-size-base) * 1.86);
$--font-size-base-double: calc(var(--font-size-base) * 2);
$--font-size-medium-double: calc(var(--font-size-base) * 2.28);

.rb-switch__container {
    height: $--component-medium-height;
    width: $--component-medium-height;
    box-sizing: border-box;
    &.large {
        height: $--component-large-height;
        width: $--component-large-height;
    }
    &.small {
        height: $--component-small-height;
        width: $--component-small-height;
    }
    &.mini {
        height: $--component-mini-height;
        width: $--component-mini-height;
    }
}
.rb-switch__body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    height: 50%;
    border-radius: $--component-large-height;

    background-color: $--bg-color-dark;
    overflow: hidden;

    transition: all $--animation-time-base ease;
    &::before {
        content: "";

        position: absolute;
        left: 0;
        top: 0;

        height: 100%;
        width: 50%;
        padding: 1px;
        border-radius: 50%;
        box-sizing: border-box;

        background-color: $--color-white;
        background-clip: content-box;

        transition: all $--animation-time-base ease;
    }
    &.active {
        background-color: $--color-primary;
        &::before {
            left: 50%;
        }
    }
    &.disabled::after {
        content: "";

        position: absolute;
        left: 0;
        top: 0;

        height: 100%;
        width: 100%;

        background-color: rgba(180, 180, 180, 0.6);
        mix-blend-mode: screen;
    }
}
</style>
