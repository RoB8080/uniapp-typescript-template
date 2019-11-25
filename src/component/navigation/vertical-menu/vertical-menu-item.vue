<template>
    <view class="vertical-menu__item">
        <view
            class="item__body"
            :class="itemClass"
            @click="onClickItem">
            <view
                v-if="item.icon"
                class="icon" />
            <view class="label">
                {{ item.label }}
            </view>
            <view
                v-if="clickable"
                class="enter">
                <view class="icon icon-right" />
            </view>
        </view>
        <view
            class="item__sub">
            <vertical-menu-list
                :list="item.subItems"
                :active="active"
                :base-path="`${basePath}/${item.value}`" />
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { VerticalMenuItem } from './vertical-menu.vue'
import VerticalMenuList from './vertical-menu-list.vue'

@Component({
    name: 'VerticalMenuItem',
    components: {
        VerticalMenuList
    }
})
export default class extends Vue {
    @Prop({
        required: true
    }) private item!: VerticalMenuItem

    @Prop({
        required: true
    }) private active!: string

    @Prop({
        required: false,
        default: ''
    }) private basePath!: string

    private get itemClass(): string[] {
        const res = []
        if (this.active === `${this.basePath}/${this.item.value}`) {
            res.push('active')
        }
        if (!this.basePath || this.basePath === '/') {
            res.push('top')
        }
        return res
    }

    private get clickable(): boolean {
        return !this.item.subItems || this.item.accessible === true
    }

    @Inject('updateActive') updateActive!: (val: string) => void;

    private onClickItem() {
        if (this.clickable) {
            this.updateActive(`${this.basePath}/${this.item.value}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.item__body {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'icon label enter';
    > .icon {
        grid-area: icon;
    }
    > .label {
        grid-area: label;
    }
    > .icon, > .label {
        font-size: $--font-size-medium;
        line-height: 1.5;

        color: $--color-text-secondary;

        transition: color .2s linear;
    }
    > .enter {
        position: relative;

        width: 35rpx;
        grid-area: enter;
        > .icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            font-size: $--font-size-base;
        }
    }
    &.top {
        > .icon, > .label {
            font-size: $--font-size-large;
            font-weight: bold;
            line-height: 1.75;

            color: $--color-text-regular;
        }
    }
    &.active {
        > .icon, > .label, > .enter {
            color: var(--color-primary);
        }
    }
}
</style>
