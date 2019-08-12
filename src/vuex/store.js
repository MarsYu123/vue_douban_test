import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    guest_name:'',
    count: 0,
    uid: ''
  },
  mutations: {
    add(state){
      state.count ++
    },
    set_uid(state,id){
      state.uid = id
    },
    set_guest(state,name){
      state.guest_name = name
    }
  },
  actions: {

  }
})
