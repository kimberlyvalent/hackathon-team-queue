<template>
  <div class="home">
    <h1>Welcome</h1>
    <div>
      <sub>To join a queue, enter the queue ID here</sub>
    </div>
    <form @submit.prevent="joinQueue">
      <div>
        <input inputmode="numeric" type="text" v-model="code" />
      </div>
      <button type="submit">Join</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    joinQueue() {
      this.$router.push(`/queue/${this.code}`);
    }
  },
  components: {
  }
};
</script>
