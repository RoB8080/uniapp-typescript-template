<script lang="ts">
import Vue from 'vue'
import { AppModule } from '@/store/module/app'

export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    }
})
</script>

<style lang="scss">
$icomoon-font-path: '~@/iconfont/fonts';

page {
    min-height: 100%
}

@import "~@/iconfont/style.scss";

@import '~@/component/theme/index.scss';
</style>
