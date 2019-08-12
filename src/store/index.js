import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

import auth from './Auth'
import app from './App'
import news from './News'
import transValor from './transValor'

import params from '../assets/params/params.js'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: localforage,
  key: 'offlinetranferenciaV'
})

Vue.prototype.$API_Path = params.path

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      app,
      news,
      transValor,
    },
    plugins: [vuexLocal.plugin]
  })

  return Store
}
