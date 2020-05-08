<template>
  <div class="queue">
    <router-link to="/">Back</router-link>
    <h1>Joining queue #{{ id }}</h1>
    <div v-if="queue.loading">Loading&hellip;</div>
    <div v-else-if="queue.error">
      {{ queue.error }}
    </div>
    <div v-else>Hello!</div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: ["id"],
  mounted() {
    this.$store.dispatch("joinQueue", this.id);
  },
  computed: {
    queue() {
      return this.$store.getters.getQueue(this.id);
    }
  }
};
</script>
