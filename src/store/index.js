import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userinfo: {
      avatar: "",
      nickname: "",
      desc: "",
      email: "",
      username: ""
    },
    personInfo: {
      avatar: "",
      nickname: "",
      desc: "",
      email: "",
      username: "",
      createdTime: ""
    }
  },
  mutations: {
    CHANGE_USERINFO(state, userinfo) {
      state.userinfo = userinfo;
    },
    GET_PERSONINFO(state, personInfo) {
      state.personInfo = personInfo;
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
});
export default store;
