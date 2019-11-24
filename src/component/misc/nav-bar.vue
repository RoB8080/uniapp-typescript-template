<template>
    <view
        class="nav-bar-body"
        :style="barStyle">
        <slot />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AppModule } from '@/store/module/app'

@Component({
    name: 'navBarFrame'
})
export default class extends Vue {
    @Prop({
        required: false,
        default: '#ffffff'
    }) private backgrounColor!: string;
    private get barStyle() {
        return `height:${AppModule.placeholderHeight}px;`
    }
    private mounted() {
        AppModule.GetSystemInfo()
    }
}
</script>

<style lang="scss" scoped>
.nav-bar-body {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    background-color: var(--background-color);
}
</style>
