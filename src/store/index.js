import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import persistedstate from './plugins/persistedstate'


Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {

    },
    plugins:[persistedstate()]
})