import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export enum DevicePlatform {
    iOS = 'iOS',
    Android = 'Android',
}

export interface IAppState {
    platform: DevicePlatform
    darkMode: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public platform = DevicePlatform.iOS
    public darkMode: boolean = false

    @Mutation
    private SET_PLATFORM(platform: DevicePlatform) {
        this.platform = platform
    }

    @Action
    public SetPlatForm(platform: DevicePlatform) {
        this.SET_PLATFORM(platform)
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
