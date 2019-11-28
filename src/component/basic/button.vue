<template>
    <button
        class="rb-button__body"
        :class="[type, {round: round}, {plain: plain}, size]"
        :disabled="disabled">
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
