import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const host = process.env.VUE_APP_BACKEND_URL;

export default new Vuex.Store({
  state: {
    queues: {}
  },
  mutations: {
    joinQueue(state, queueId) {
      state.queues = {
        ...state.queues,
        [queueId]: {
          loading: true
        }
      };
    },
    joinQueueError(state, { queueId, message }) {
      state.queues = {
        ...state.queues,
        [queueId]: {
          loading: false,
          error: message
        }
      };
    },
    joinQueueSuccess(state, { queueId }) {
      state.queues = {
        ...state.queues,
        [queueId]: {
          loading: false
        }
      };
    }
  },
  actions: {
    async joinQueue({ commit }, queueId) {
      commit("joinQueue", queueId);
      try {
        const response = await fetch(`${host}/queue/${queueId}/members`, { method: 'POST' });
        if (response.status === 404) {
          commit("joinQueueError", { queueId, message: "Queue not found" });
          return;
        }

        const { id, estimate, position } = await response.json();
        commit("joinQueueSuccess", { queueId, userId: id, estimate, position });
      } catch (_) {
        commit("joinQueueError", {
          queueId,
          message: "Cannot connect to queue service"
        });
      }
    }
  },
  getters: {
    getQueue: state => queueId => state.queues[queueId] || { loading: true }
  },
  modules: {}
});
