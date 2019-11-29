<template>
    <view
        id="progress"
        class="content">
        <progress-linear
            :percentage="pgLOptions.percentage"
            :stroke-width="pgLOptions.strokeWidth"
            :inline-label="pgLOptions.inlineLabel"
            :color="setColor" />
        <view class="value-control">
            <rb-button
                type="primary"
                plain
                size="mini"
                round
                @click="pgLPercentage -= 5">
                -
            </rb-button>
            <rb-button
                type="primary"
                plain
                size="mini"
                round
                @click="pgLPercentage += 5">
                +
            </rb-button>
            <progress-inline
                :percentage="pgLOptions.percentage"
                :color="setColor" />
            <input
                v-model="pgLPercentage"
                type="number">
        </view>
        <input
            v-model="pgLOptions.strokeWidth"
            type="number">
        <rb-switch
            v-model="pgLOptions.inlineLabel"
            size="large" />
        <rb-switch
            v-model="pgLOptions.inlineLabel"
            disabled />
        <rb-switch
            v-model="pgLOptions.inlineLabel"
            size="small" />
        <rb-switch
            v-model="pgLOptions.inlineLabel"
            disabled
            size="mini" />
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProgressLinear from '@/component/data/progress-linear.vue'
import RbButton from '@/component/basic/button.vue'
import RbSwitch from '@/component/form/switch.vue'
import ProgressInline from '@/component/data/progress-inline.vue'

@Component({
    name: 'components',
    components: {
        ProgressLinear,
        RbButton,
        RbSwitch,
        ProgressInline
    }
})
export default class extends Vue {
    private pgLOptions = {
        percentage: 50,
        strokeWidth: 4,
        inlineLabel: false
    }

    private setColor(percentage: number) {
        return `#0000${(percentage === 100 || percentage < 10) ? '00' : percentage}`
    }

    private get pgLPercentage() {
        return this.pgLOptions.percentage.toString()
    }

    private set pgLPercentage(val: string) {
        const t = parseInt(val)
        this.pgLOptions.percentage = (t > 100 ? 100 : (t < 0 ? 0 : t))
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 0 5vw;
}
.value-control {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10rpx;
}
</style>
