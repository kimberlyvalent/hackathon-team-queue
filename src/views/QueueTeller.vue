<template>
  <div class="queue-teller">
    <router-link to="/">Back</router-link>
    <h1>Joining queue as teller #{{ id }}</h1>
    <div>Loading&hellip;</div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: ["id"],
  mounted() {
    // TODO: We can attempt to join the queue here. If the REST API responds
    // 404, we can display a "Queue Not Found" error, otherwise we can commence
    // polling for queue updates.
    const token = this.$route.query.token;
    console.log("Dispatch teller join", this.id, token);
  }
};
</script>
