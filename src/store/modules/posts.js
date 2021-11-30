import axios from 'axios';

const state = {
  posts: []
};

const getters = {
  allPosts: state => state.posts
};

const actions = {
  async fetchPosts({
    commit
  }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
      // 'https://jsonplaceholder.typicode.com/posts?_limit=10'
    );
    commit('setPosts', response.data);
  },
  async addPost({
    commit
  }, userId) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId
    });

    commit('newPost', response.data);
  },

  async deletePost({
    commit
  }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    commit('removePost', id);
    window.alert("User has been Deleted");
  },

  async filterPosts({
    commit
  }, e) {
    // get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    commit('setPosts', response.data);
  },

  async updatePost({
    commit
  }, updPost) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${updPost.id}`, updPost
    );

    commit('updatePost', response.data);
  }


};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  newPost: (state, post) => state.posts.unshift(post),
  removePost: (state, id) => state.posts = state.posts.filter(post => post.id !== id),
  updatePost: (state, updPost) => {
    const index = state.posts.findIndex(post => post.id === updPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updPost);
    }
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}