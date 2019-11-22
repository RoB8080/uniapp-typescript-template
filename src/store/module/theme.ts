import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Vue, { VueConstructor } from 'vue'

const defaultTheme: ThemeRules = {
    '--color-primary': '#90c8fd'
}

export interface ThemeRuleOption {
    key: string
    value: string
}

export interface ThemeRules {
    [key: string]: string;
}

export interface IThemeState {
    rules: ThemeRules;
}

@Module({ dynamic: true, namespaced: true, store, name: 'theme' })
class Theme extends VuexModule implements IThemeState {
    public rules: ThemeRules = uni.getStorageSync('theme') || defaultTheme;

    public get themeStyleString() {
        let string = ''
        for (const [key, value] of Object.entries(this.rules)) {
            string = `${string}${key}:${value};`
        }
        return string
    }

    @Mutation
    private SET_RULE(option: ThemeRuleOption) {
        this.rules[option.key] = option.value
        uni.setStorageSync('theme', this.rules)
    }

    @Mutation
    private REMOVE_RULE(key: string) {
        delete this.rules[key]
        uni.setStorageSync('theme', this.rules)
    }

    @Action
    public SetRule(option: ThemeRuleOption) {
        this.SET_RULE(option)
    }

    @Action
    public RemoveRule(key: string) {
        this.REMOVE_RULE(key)
    }
}

export const ThemeModule = getModule(Theme)

// 为Vue实例附加$theme属性
declare module 'vue/types/vue' {
    interface Vue {
        $theme: string
    }
}

export default ThemeModule.themeStyleString
