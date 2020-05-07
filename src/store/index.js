import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const protocol = window.location.protocol === 'https' ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${window.location.hostname}:3000`);

function createWebSocketPlugin (socket) {
  return store => {
    socket.onmessage = function(event) {
        console.log(event);
        store.commit('receiveData', event);
    }
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}

const plugin = createWebSocketPlugin(socket);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [plugin],
});
