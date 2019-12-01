<template>
    <view
        class="input__body"
        :class="[{focus: inputFocus},{'has-border': !noBorder}]">
        <input
            ref="core"
            v-model="iValue"
            class="input__core"
            :class="[size]"
            :focus="focus"
            :maxlength="maxlength"
            @input="validateInput"
            @focus="onFocus"
            @blur="onBlur">
        <view
            v-if="!iValue"
            class="input__placeholder">
            {{ placeholder }}
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import {
    componentSize,
    inputNumber as validateInputNumber,
    completeNumber as validateCompleteNumber,
    inputIDCard as validateInputIDCard,
    completeIDCard as validateCompleteIDCard } from '../utils/validator'

@Component({
    name: 'Input'
})
export default class extends Vue {
    @Prop({
        required: true
    }) value!: string

    @Prop({
        required: false,
        default: 'text',
        validator: (value) => {
            return ['text', 'number'].includes(value)
        }
    }) type!: string

    @Prop({
        required: false,
        default: false
    }) noBorder!: boolean

    @Prop({
        required: false,
        default: 'medium',
        validator: componentSize
    }) size!: string

    @Prop({
        required: false,
        default: ''
    }) placeholder!: string

    @Watch('value')
    onValueChange(val: string) {
        if (val !== this.iValue) {
            this.iValue = val
        }
    }

    iValue: string = ''

    // 输入时验证
    get inputValidator(): (text: string) => boolean {
        switch (this.type) {
        default:
        case 'text': return () => true
        case 'number': return validateInputNumber
        case 'idcard': return validateInputIDCard
        }
    }

    validateInput(event: any) {
        const val: string = event.detail.value
        if (this.inputValidator(val)) {
            this.$emit('input', val)
        } else {
            setTimeout(() => {
                this.iValue = this.value
            }, 0)
        }
    }
    // 完成时验证
    valid: boolean = true

    get completeValidator(): () => void {
        switch (this.type) {
        default:
        case 'text': return () => {
            this.valid = true
        }
        case 'number': return () => {
            this.valid = validateCompleteNumber(this.iValue)
        }
        case 'idcard': return () => {
            this.valid = validateCompleteIDCard(this.iValue)
        }
        }
    }

    // 记录focus状态
    inputFocus: boolean = false
    onFocus() {
        this.inputFocus = true
    }
    onBlur() {
        this.inputFocus = false
    }
    // 向外提供事件
    focus() {
        // @ts-ignore
        this.inputFocus = true
    }
    blur() {
        // @ts-ignore
        this.inputFocus = false
        this.completeValidator()
    }

    // 传递原生Prop
    @Prop({
        required: false,
        default: 140
    }) maxlength!: number;

    mounted() {
        this.iValue = this.value
    }
}
</script>

<style lang="scss" scoped>
.input__body {
    position: relative;

    width: 100%;

    background-color: $--color-white;
    &.has-border::after {
        content: "";

        position: absolute;
        left: 0;
        top: 0;

        width: 100%;
        height: 100%;
        box-sizing: border-box;

        border: 1px solid $--color-border-base;
        border-radius: $--border-radius-base;

        transition: all linear $--animation-time-extra-short;
    }
    &.focus::after {
        border-color: $--color-primary;
    }
}
.input__core {
    position: relative;

    width: 100%;
    height: $--component-medium-height;
    padding: 0 $--font-size-base;
    border-radius: $--border-radius-base;
    box-sizing: border-box;

    font-size: $--font-size-base;
    line-height: $--component-medium-height;
    text-align: left;

    overflow: hidden;
    &.small {
        height: $--component-small-height;

        line-height: $--component-small-height;
        font-size: $--font-size-small;
    }
    &.mini {
        height: $--component-mini-height;

        line-height: $--component-mini-height;
        font-size: $--font-size-extra-small;
    }
    &.large {
        height: $--component-large-height;

        line-height: $--component-large-height;
        font-size: $--font-size-medium;
    }
}

.input__placeholder {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 $--font-size-base;

    font-size: $--font-size-base;
    line-height: $--component-medium-height;
    text-align: left;

    color: $--color-text-placeholder;
}
</style>
