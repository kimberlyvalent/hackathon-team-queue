<template>
  <div class="queue-teller">
    <router-link to="/">Back</router-link>
    <div v-if="users.serving">Now serving {{ users.serving }}</div>
    <div v-if="users.count === null">
      Loading&hellip;
    </div>
    <div v-else-if="users.count === 0">
      There are <strong>no</strong> users in the queue
    </div>
    <div v-else-if="users.count === 1">
      There is <strong>1</strong> user in the queue
    </div>
    <div v-else-if="users.count > 1">
      There are <strong>{{ users.count }}</strong> users in the queue
    </div>
    <div v-else-if="users.error">
      {{ queue.error }}
    </div>

    <button v-if="users.count > 0" @click="shiftQueue" :disabled="users.shifting">Next please!</button>
  </div>
</template>

<script>
export default {
  name: "QueueTeller",
  props: ["id"],
  data() {
    return {
      polling: null
    };
  },
  methods: {
    shiftQueue() {
      this.$store.dispatch("shiftQueue", this.id);
    },
  },
  mounted() {
    this.$store.dispatch("listQueueUsers", this.id);
    this.polling = setInterval(() => {
      this.$store.dispatch("listQueueUsers", this.id);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  computed: {
    users() {
      return this.$store.getters.getQueueUsers(this.id);
    }
  }
};
</script>
