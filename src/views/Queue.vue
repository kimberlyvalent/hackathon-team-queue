<template>
  <div class="queue">
    <router-link to="/">Back</router-link>
    <h1>{{ id }}</h1>
    <div v-if="queue.loading">
      <h1>Joining queue #{{ id }}</h1>
      <div>Loading&hellip;</div>
    </div>
    <div v-else-if="queue.error">
      {{ queue.error }}
    </div>
    <div v-else-if="typeof queue.position === 'undefined'">
        <h1>Thanks for waiting</h1>
        <div><strong>{{ queue.userId }}</strong> you're up!</div>
    </div>
    <div v-else-if="queue.position >= 0">
      <h2>You are now in the queue</h2>
      <div v-if="queue.positiion !== 1">There are <strong>{{ queue.position }}</strong> people ahead of you</div>
      <div v-else>There is <strong>{{ queue.position }}</strong> person ahead of you</div>

      Your number is <strong>{{ queue.userId }}</strong>

      <div v-if="typeof queue.estimate === 'number'">
        Estimated wait is <em>{{ `${queue.estimate/60/60} minutes` }}</em>
      </div>
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
