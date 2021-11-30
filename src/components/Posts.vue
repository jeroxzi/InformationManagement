<template>
  <div>
    <h3>
      <i class="fas fa-database"></i> Posts
      <i class="fas fa-plus" @click="onModalShow(true)"></i>
    </h3>
    <input
      v-model="searchInputValue"
      type="text"
      class="searchPost"
      placeholder="Search Post"
      vplaceholder="Search"
    />
    <div class="posts">
      <div v-for="post in allPostsList" :key="post.id" class="post">
        <i class="fal fa-folder"></i>
        <i class="fas fa-pencil-alt"></i>
        {{ post.title }}
        <i @click="deletePost(post.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>

    <div class="post-modal" v-bind:class="{ 'show-modal': show_modal }">
      <div class="post-modal__wrapper-inner">
        <div class="post-modal__header">
          <h3 class="post-modal__header-text">Add Post</h3>
          <i class="fas fa-plus" @click="onModalShow(false)"></i>
        </div>
        <div class="post-modal__body">
          <AddPost />
        </div>
        <div class="post-modal__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddPost from "./AddPost.vue";

export default {
  name: "Posts",
  data() {
    return {
      show_modal: false,
      searchInputValue: "",
    };
  },
  methods: {
    ...mapActions(["fetchPosts", "deletePost", "updatePosts"]),
    onDblClick(post) {
      const updPost = {
        id: post.id,
        title: post.title,
      };

      this.updatePost(updPost);
    },
    onModalShow(state) {
      this.show_modal = state;
    },
  },
  computed: {
    ...mapGetters(["allPosts"]),
    allPostsList() {
      if (!this.searchInputValue) {
        return this.allPosts;
      } else {
        return this.allPosts.filter((el) =>
          el.title.toLowerCase().includes(this.searchInputValue.toLowerCase())
        );
      }
    },
  },
  created() {
    this.fetchPosts();
  },

  components: {
    AddPost,
  },
};
</script>

<style scoped>
h3 {
  margin-top: 50px;
  color: black;
  font-weight: 500;
  position: relative;
}

.fa-folder {
  color: gray;
  padding-right: 8px;
}
.fa-database {
  color: gray;
  padding-right: 8px;
}
.fa-plus {
  color: rgb(63, 63, 221);
  position: absolute;
  right: 10px;
  cursor: pointer;
  bottom: 4px;
}

.fa-pencil-alt {
  color: gray;
  position: absolute;
  bottom: 10px;
  right: 38px;
  cursor: pointer;
}

.fa-trash-alt {
  color: rgb(212, 69, 69);
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}

.searchPost {
  margin: 0 0 16px;
  width: calc(100% - 32px);
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
}

.posts {
  display: grid;
  grid-template-columns: repeat(0, 1fr);
  grid-gap: 8px;
}

.post {
  border: 1px solid #ccc;
  background: white;
  color: black;
  font-weight: 500;
  padding: 4px 1rem;
  border-radius: 5px;
  text-align: start;
  position: relative;
  cursor: pointer;
  padding-right: 64px;
  max-width: 220px;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #354953;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

.is-complete {
  background: #35495e;
  color: #fff;
}

@media (max-width: 500px) {
  .posts {
    grid-template-columns: 1fr;
  }
}

.post-modal {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  transform: scale(0);
}

.post-modal.show-modal {
  transform: scale(1);
}

.post-modal__wrapper-inner {
  max-width: 500px;
  background: white;
  transition: all 0.2 ease-in;
  justify-self: center;
  width: 500px;
}
.post-modal__header {
  position: relative;
}
.post-modal__body {
  position: relative;
  padding: 20px;
}
.post-modal__header i.fas {
  position: absolute;
  top: 8px;
  transform: rotate(45deg);
  right: 0;
  padding: 20px;
  color: black;
}

.post-modal__header-text {
  margin: 0;
  padding: 20px 40px 0 20px;
}
</style>
