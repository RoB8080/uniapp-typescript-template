<template>
    <view clas="content">
        <progress-linear
            :percentage="pgLOptions.percentage"
            :stroke-width="pgLOptions.strokeWidth"
            :inline-label="pgLOptions.inlineLabel"
            :color="pgLOptions.color" />
        <button
            @click="pgLPercentage -= 5">
            -
        </button>
        <button @click="pgLPercentage += 5">
            +
        </button>
        <input
            v-model="pgLOptions.strokeWidth"
            type="number">
        <switch
            :checked="pgLOptions.inlineLabel"
            @change="pgLOptions.inlineLabel = $event.detail.value" />
        <textarea
            placeholder="颜色/数组/函数"
            :auto-height="true"
            @confirm="setColor"
            @blur="setColor" />
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProgressLinear from '@/component/data/progress-linear.vue'

@Component({
    name: 'components',
    components: {
        ProgressLinear
    }
})
export default class extends Vue {
    private pgLOptions = {
        percentage: 50,
        strokeWidth: 4,
        inlineLabel: false,
        color: '#000000'
    }

    private get pgLPercentage() {
        return this.pgLOptions.percentage
    }

    private set pgLPercentage(val: number) {
        this.pgLOptions.percentage = (val > 100 ? 100 : (val < 0 ? 0 : val))
    }

    private setColor(event: {detail: {value: string}}) {
        this.pgLOptions.color = event.detail.value
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 0 5vw;
}
</style>
