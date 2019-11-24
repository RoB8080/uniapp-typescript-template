import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export enum DevicePlatform {
    iOS = 'iOS',
    Android = 'Android',
}

export interface IAppState {
    platform: DevicePlatform
    statusBarHeight: number
    darkMode: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public platform = DevicePlatform.iOS
    public statusBarHeight = 20
    public darkMode: boolean = false

    public get placeholderHeight() {
        return this.statusBarHeight + 44
    }

    @Mutation
    private SET_PLATFORM(platform: DevicePlatform) {
        this.platform = platform
    }

    @Mutation
    private SET_STATUS_BAR_HEIGHT(height: number) {
        this.statusBarHeight = height
    }

    @Action
    public async GetSystemInfo() {
        return new Promise((resolve) => {
            uni.getSystemInfo({
                success: (res) => {
                    this.SET_PLATFORM(res.platform === 'ios' ? DevicePlatform.iOS : DevicePlatform.Android)
                    this.SET_STATUS_BAR_HEIGHT(res.statusBarHeight || this.statusBarHeight)
                    console.log(res)
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
