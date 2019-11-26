<template>
    <view class="progress__container">
        <view class="progress__body" />
        <view class="progress__label" />
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

type ColorHelper = string | ColorRule[] | ColorFunction
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
    }) private color!: ColorHelper;
}
</script>

<style lang="scss" scoped>
.progress__container {
    display: grid;
    grid-template-areas: 'body label';
    grid-template-columns: 1fr auto;
}
</style>
