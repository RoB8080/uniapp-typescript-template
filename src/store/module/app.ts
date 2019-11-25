import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export enum DevicePlatform {
    iOS = 'iOS',
    Android = 'Android',
}

export interface IAppState {
    platform: DevicePlatform
    darkMode: boolean
    isTablet: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public platform = DevicePlatform.iOS
    public darkMode: boolean = false
    public isTablet: boolean = false

    @Mutation
    private SET_HARDWARE_INFO(info: GetSystemInfoResult) {
        const { platform, screenWidth } = info
        this.platform = platform === 'ios' ? DevicePlatform.iOS : DevicePlatform.Android
        this.isTablet = (screenWidth || 0) >= 768
    }

    @Action
    public async GetSystemInfo() {
        return new Promise((resolve) => {
            uni.getSystemInfo({
                success: (res) => {
                    this.SET_HARDWARE_INFO(res)
                },
                complete: () => {
                    resolve()
                }
            })
        })
    }

    @Mutation
    private TOGGLE_DARK_MODE() {
        this.darkMode = !this.darkMode
    }

    @Action
    public ToggleDarkMode() {
        this.TOGGLE_DARK_MODE()
    }
}

export const AppModule = getModule(App)
