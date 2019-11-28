<template>
    <view class="rb-button-group">
        <slot />
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'ButtonGroup'
})
export default class extends Vue {}
</script>
