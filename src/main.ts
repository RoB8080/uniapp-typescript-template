import Vue from 'vue'
import App from './App.vue'

// 设置更新管理
import { setUpdateManager } from '@/utils/update-manager'
setUpdateManager()

Vue.config.productionTip = false

new App().$mount()
