<template>
  <div>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Enter title..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    onSubmit(e) {
      e.preventDefault();
      this.addPost(this.title);
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