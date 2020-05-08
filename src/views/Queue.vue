<template>
  <div class="queue">
    <router-link to="/">Back</router-link>
    <h1>Joining queue #{{ id }}</h1>
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
    console.log("Dispatch join", this.id);
  }
};
</script>
