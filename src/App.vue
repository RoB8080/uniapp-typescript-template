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

<style>
    page {
        min-height: 100%
    }
    input {
        height: auto;
        min-height: auto;
    }
</style>
