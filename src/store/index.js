import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineUid: "",
    student: {},
  },
  mutations: {
    change(state, value) {
      state.lineUid = value;
    },
    add(state, value) {
      state.student = value;
    },
  },
  actions: {
    changeAction(context, value) {
      context.commit("change", value);
    },
    addAction(context, value) {
      context.commit("add", value);
    },
  },
  modules: {},
});
