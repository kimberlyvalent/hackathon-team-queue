<template>
  <div class="queue">
    <router-link to="/">Back</router-link>
    <div v-if="queue.loading">
      <h1>Joining queue #{{ id }}</h1>
      <div>Loading&hellip;</div>
    </div>
    <div v-else-if="queue.error">
      {{ queue.error }}
    </div>
    <div v-else>
      <h1>You are now in the queue</h1>
      {{ queue.position }}
      {{ queue.estimate }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: ["id"],
  data() {
    return {
      polling: null
    };
  },
  mounted() {
    this.$store.dispatch("joinQueue", this.id);
    this.polling = setInterval(() => {
      this.$store.dispatch("pollQueue", this.id);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  computed: {
    queue() {
      return this.$store.getters.getQueue(this.id);
    }
  }
};
</script>
