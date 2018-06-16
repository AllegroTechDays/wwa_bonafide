import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      helloMessage: {
       who: 'bot',
       text: 'Hej :) jak mogę Ci pomóc?' 
      },
      messeges: []
    },
    getters: {
      getMessages(state) {
        return state.messeges
      }
    },
    actions: {
      addMessage(vuexContext, message) {
        vuexContext.commit('addMessage', message)
      }
    },
    mutations: {
      addMessage(state, message) {
        state.messeges.push(message)
      }
    }
  })
}

export default createStore