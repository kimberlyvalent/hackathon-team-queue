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
          loading: true,
          error: null
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
          loading: false,
          error: null
        }
      };
    }
  },
  actions: {
    async pollQueue({ commit, getters }, queueId) {
      const queue = getters.getQueue(queueId);
      if (queue.loading || queue.error) {
        return;
      }

      const response = await fetch(
        `${host}/queue/${queueId}/members/${queue.userId}`,
        { method: "POST" }
      );
      const { id, estimate, position } = await response.json();
      commit("joinQueueSuccess", { queueId, userId: id, estimate, position });
    },
    async joinQueue({ commit }, queueId) {
      commit("joinQueue", queueId);
      try {
        const response = await fetch(`${host}/queue/${queueId}/members`, {
          method: "POST"
        });
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
