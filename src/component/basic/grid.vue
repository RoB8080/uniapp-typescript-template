<template>
    <view
        class="grid"
        :style="styleVariables" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'Grid'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: 4
    }) private columns!: number

    @Prop({
        required: false,
        default: 1
    }) private rows!: number

    @Prop({
        required: false,
        default: ''
    }) private gap!: string

    private get styleVariables() {
        return `--columns:${this.columns};--rows:${this.rows};--gap:${this.gap};`
    }
}
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    // grid-gap:
}
</style>
