import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineUid: "",
    student: {},
  },
  mutations: {
    set(state, value) {
      state.lineUid = value;
    },
    add(state, value) {
      state.student = value;
    },
  },
  actions: {
    addAction(context, value) {
      context.commit("add", value);
    },
    setAction(context, value) {
      context.commit("set", value);
    },
  },
  modules: {},
});
