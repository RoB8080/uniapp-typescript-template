import Vue from 'vue'
import App from './App.vue'

import { setUpdateManager } from '@/utils/update-manager'
import store from '@/store/index'
import theme from '@/store/module/theme'
import gesture from '@/utils/gesture'

// 设置更新管理
setUpdateManager()
// 挂载store
Vue.prototype.$store = store

Vue.config.productionTip = false

new App().$mount()
