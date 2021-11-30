<template>
  <div>
    <h3>Add Info</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="username" placeholder="Add info..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddInfo",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    ...mapActions(["addInfo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addInfo(this.username);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
}
</style>