<template>
    <view
        class="container"
        :style="theme">
        <view class="body">
            <view class="title">
                <text class="highlight">
                    U
                </text>
                <text>niapp </text>
                <text class="highlight">
                    T
                </text>
                <text>ypescript </text>
                <text class="highlight">
                    T
                </text>
                <text>emplate</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Index'
})
export default class extends Vue {
    private get theme() {
        return this.$store.getters['theme/themeStyleString']
    }
    private mounted() {
        console.log(this.$store, this.$theme)
    }
}
</script>

<style lang="scss">
    .content {
        position: relative;

        height: 100%;
    }
    .body {
        position: absolute;
    }
    .title {
        font-size: 0;
        > text {
            font-size: 36rpx;
            &.highlight {
                color: var(--color-primary);
            }
        }
    }
</style>
