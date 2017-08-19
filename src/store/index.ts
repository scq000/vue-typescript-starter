import 'es6-promise/auto'
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const mutations = {
  increment (state: any) {
    state.count++
  }
};

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: mutations
});


export default store;
