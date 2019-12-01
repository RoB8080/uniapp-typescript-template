<template>
    <view
        class="rb-grid-item"
        :style="style">
        <slot />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'GridItem'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: undefined
    }) pos!: [number, number] | undefined

    @Prop({
        required: false,
        default: [1, 1]
    }) size!: [number, number]

    @Prop({
        required: false,
        default: ''
    }) private gap!: string

    private get posStyle() {
        const { pos } = this
        return pos ? `grid-column-start:${pos[0]};grid-row-start:${pos[1]};` : ''
    }

    private get sizeStyle() {
        const { size } = this
        return `grid-column-end:span ${this.size[0]};grid-row-end:span ${this.size[1]};`
    }

    private get style() {
        return `${this.sizeStyle}${this.posStyle}`
    }
}
</script>
