import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const host = process.env.VUE_APP_BACKEND_URL;

export default new Vuex.Store({
  state: {
    queues: {},
    position: null,
    estimate: null,
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
    joinQueueSuccess(state, { queueId, estimate, position, userId }) {
      state.queues = {
        ...state.queues,
        [queueId]: {
          loading: false,
          error: null,
          userId,
          estimate,
          position
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
        `${host}/queue/${queueId}/members/${queue.userId}`
      );
      const { userId, estimate, position } = await response.json();
      commit("joinQueueSuccess", { queueId, userId, estimate, position });
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

        const data = await response.json();
        commit("joinQueueSuccess", { ...data, queueId });
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
