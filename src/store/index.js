import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const host = process.env.VUE_APP_BACKEND_URL;

export default new Vuex.Store({
  state: {
    queues: {},
    position: null,
    estimate: null,
    queueUsers: {}
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
    },
    listQueue(state, queueId) {
      state.queueUsers = {
        ...state.queueUsers,
        [queueId]: {
          ...state.queueUsers[queueId],
          error: null,
        }
      };
    },
    listQueueError(state, { queueId, message }) {
      state.queueUsers = {
        ...state.queueUsers,
        [queueId]: {
          ...state.queueUsers[queueId],
          count: null,
          error: message
        }
      };
    },
    listQueueSuccess(state, { queueId, count }) {
      console.log(count);
      state.queueUsers = {
        ...state.queueUsers,
        [queueId]: {
          ...state.queueUsers[queueId],
          error: null,
          count,
        }
      };
    },
    shiftQueue(state, queueId) {
      state.queueUsers = {
        ...state.queueUsers,
        [queueId]: {
          ...state.queueUsers[queueId],
          serving: null,
          shifting: true,
        }
      };
    },
    shiftQueueSuccess(state, { queueId, userId }) {
      state.queueUsers = {
        ...state.queueUsers,
        [queueId]: {
          ...state.queueUsers[queueId],
          count: state.queueUsers[queueId].count - 1,
          serving: userId,
          shifting: false,
        }
      };
    },
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
    },
    async listQueueUsers({ commit }, queueId) {
      commit("listQueue", queueId);
      try {
        const response = await fetch(`${host}/queue/${queueId}`);
        if (response.status === 404) {
          commit("listQueueError", { queueId, message: "Queue not found" });
          return;
        }

        const data = await response.json();
        commit("listQueueSuccess", { ...data, queueId });
      } catch (_) {
        commit("listQueueError", {
          queueId,
          message: "Cannot connect to queue service"
        });
      }
    },
    async shiftQueue({ commit }, queueId) {
      commit("shiftQueue", queueId);
      try {
        const response = await fetch(`${host}/queue/${queueId}/members`, { method: 'DELETE' });
        if (response.status == 200) {
          const data = await response.json();
          commit("shiftQueueSuccess", { ...data, queueId });
        } else {
          console.error(response);
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  getters: {
    getQueue: state => queueId => state.queues[queueId] || { loading: true },
    getQueueUsers: state => queueId => state.queueUsers[queueId] || { count: null },
  },
  modules: {}
});
