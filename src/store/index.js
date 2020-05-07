import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const socket = new WebSocket(process.env.VUE_APP_BACKEND_URL);

function createWebSocketPlugin(socket) {
  return store => {
    socket.onmessage = function(event) {
      console.log(event);
      store.commit("receiveData", event);
    };
    store.subscribe(mutation => {
      if (mutation.type === "UPDATE_DATA") {
        socket.emit("update", mutation.payload);
      }
    });
  };
}

const plugin = createWebSocketPlugin(socket);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [plugin]
});
