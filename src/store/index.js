import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userinfo: {
      avatar: "",
      nickname: "",
      desc: "",
      email: "",
      username: ""
    }
  },
  mutations: {
    CHANGE_USERINFO(state,userinfo) {
        state.userinfo = userinfo;
    }
  }
});
export default store;
