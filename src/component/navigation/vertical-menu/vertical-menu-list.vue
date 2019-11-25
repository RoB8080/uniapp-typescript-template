<template>
    <view
        class="vertical-menu__list"
        :class="basePath ? '' : 'top'">
        <vertical-menu-item
            v-for="item in list"
            :key="item.value"
            :item="item"
            :base-path="basePath"
            :active="active" />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { VerticalMenuItem } from './vertical-menu.vue'
import VerticalMenuItemCp from './vertical-menu-item.vue'

@Component({
    name: 'VerticalMenuList',
    components: {
        VerticalMenuItem: VerticalMenuItemCp
    }
})
export default class extends Vue {
    @Prop({
        required: true
    }) private list!: VerticalMenuItem[]

    @Prop({
        required: true
    }) private active!: string

    @Prop({
        required: false,
        default: ''
    }) private basePath!: string
}
</script>

<style lang="scss" scoped>
.vertical-menu__list {
    padding-left: 20rpx;
}
</style>
