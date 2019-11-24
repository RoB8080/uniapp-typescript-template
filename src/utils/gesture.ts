import { VueConstructor, VNode } from 'vue'
import { DirectiveBinding, DirectiveFunction } from 'vue/types/options'

const dispatcher: DirectiveFunction = (el, binding, vnode, oldVnode) => {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    console.log(oldVnode)
}

export default {
    install: (Vue: VueConstructor) => {
        console.log('install gesture')
        Vue.directive('gesture', dispatcher)
    }
}
