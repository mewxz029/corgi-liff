import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    student: {},
  },
  mutations: {
    add(state, value) {
      state.student = value;
    },
  },
  actions: {
    addAction(context, value) {
      context.commit("add", value);
    },
  },
  modules: {},
});
