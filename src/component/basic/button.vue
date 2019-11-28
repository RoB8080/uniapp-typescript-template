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
