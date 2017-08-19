import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  increment (state: any) {
    state.count++;
  },
};

const store = new Vuex.Store({
  mutations,
  state: {
    count: 0,
  },
});


export default store;
