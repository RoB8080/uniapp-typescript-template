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
// 挂载theme
Vue.prototype.$theme = theme
// 使用gesture
Vue.use(gesture)

Vue.config.productionTip = false

new App().$mount()
