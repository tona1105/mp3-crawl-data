import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listPlay: null,
    idPlay: -1
  },
  mutations: {
    updateSharedData(state, {data,num}) {
      state.listPlay = data;
      state.idPlay = num;
    },
    nextPlay(state) {
      state.idPlay++
    },
    previousPlay(state) {
      state.idPlay--
    },
    randomPlay(state) {{
      const length = state.listPlay.length
      const randomNum = Math.floor(Math.random() * length)
      console.log(randomNum);
      state.idPlay = randomNum
    }}
  },
  getters: {
    getPlaylist(state) {
      return state.listPlay;
    },
  }

});

export default store