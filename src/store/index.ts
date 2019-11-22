import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './module/app'
import { IThemeState } from './module/theme'

Vue.use(Vuex)

export interface IRootState {
    app: IAppState,
    theme: IThemeState,
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
