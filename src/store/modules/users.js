import axios from 'axios';

const state = {
  users: []
};

const getters = {
  allUsers: state => state.users
};

const actions = {
  async fetchUsers({
    commit
  }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    commit('setUsers', response.data);
  },

  async addUser({
    commit
  }, username) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
      username
    });

    commit('newUser', response.data);
  },

  async deleteUser({
    commit
  }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    commit('removeUser', id);

    window.alert("User has been Deleted");
  },

  async filterUsers({
    commit
  }, e) {
    // get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    commit('setUsers', response.data);
  },

  async updateUsers({
    commit
  }, updUser) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${updUser.id}`, updUser
    );

    commit('updateUsers', response.data);
  }

};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => state.users.unshift(user),
  removeUser: (state, id) => state.users = state.users.filter(user => user.id !== id),
  updateUser: (state, updUser) => {
    const index = state.users.findIndex(user => user.id === updUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updUser);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}