<template>
    <view
        class="content"
        :style="theme">
        <view class="banner">
            <view class="title">
                Uniapp Typescript Template
            </view>
            <view class="desc">
                uni-app模板，用于快速初始化项目并提高开发效率。
            </view>
        </view>
        <view class="features">
            <view class="title">
                特性 Features
            </view>
            <feature-card
                :reaction="1"
                title="主题"
                label="内置Theme模块，由CSS变量实现，使用方法参考README。">
                <view class="input-form">
                    <view>主题色:</view>
                    <input v-model="tempPrimaryColor">
                </view>
            </feature-card>
            <feature-card
                :reaction="2"
                title="组件"
                label="内置基础组件库，涵盖多个方面。"
                @click="navigateTo('/pages/components/index')" />
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/module/app'
import { ThemeModule } from '@/store/module/theme'
import FeatureCard from '@/component/misc/feature-card.vue'

@Component({
    name: 'index',
    components: {
        FeatureCard
    }
})
export default class extends Vue {
    private get theme() {
        return this.$store.getters['theme/themeStyleString']
    }

    // Store中主题色的setter/getter
    private get primaryColor() {
        return ThemeModule.rules['--color-primary']
    }
    private set primaryColor(val: string) {
        ThemeModule.SetRule({ key: '--color-primary', value: val })
    }

    // 临时编辑主题色
    private tempPrimaryColor: string = '#ffffff'

    // 相应Store中主题色变化
    @Watch('primaryColor')
    private onPrimaryColorChange(val: string) {
        this.tempPrimaryColor = val
    }

    // 临时编辑值合法时，赋值给Store
    @Watch('tempPrimaryColor')
    private onTempPrimaryColorChange(val: string) {
        if (/^#[0-9a-f]{6}$/.test(val) && this.primaryColor !== val) {
            this.primaryColor = val
        }
    }

    private navigateTo(route: string) {
        console.log(route)
        uni.navigateTo({ url: route })
    }

    private mounted() {
        this.tempPrimaryColor = this.primaryColor
    }
}
</script>

<style lang="scss">
.banner {
    padding: 30rpx 0;
    > .title {
        font-size: $--font-size-extra-large;
        font-weight: bolder;
        line-height: 1.25;
        text-align: center;

        color: $--color-text-regular;
    }
    > .desc {
        padding: 15rpx 15rpx 0 15rpx;

        font-size: $--font-size-medium;
        line-height: 1.25;
        text-align: center;

        color: $--color-text-secondary;
    }
}
.features {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-gap: 30rpx;
    padding: 0 30rpx 30rpx 30rpx;
    >.title {
        font-size: $--font-size-large;
        font-weight: bolder;
        line-height: 1.25;
        text-align: center;

        color: $--color-text-regular;
    }
}
.input-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 15rpx;
    width: fit-content;

    font-size: $--font-size-base;

    color: $--color-text-regular;
    > view {
        width: fit-content;
        padding: 2rpx 0;

        color: var(--color-primary);
    }
    > input {
        box-sizing: border-box;
        width: 130rpx;
        padding-top: 2rpx;
        border-bottom: 2rpx solid $--color-border-light;

        text-align: center;
    }
}
</style>
