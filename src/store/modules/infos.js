import axios from 'axios';

const state = {
  infos: []
};

const getters = {
  allInfos: state => state.infos
};

const actions = {
  async fetchInfos({
    commit
  }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    commit('setInfos', response.data);
  },

  async addInfo({
    commit
  }, username) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
      username,
      completed: false
    });

    commit('newInfo', response.data);
  },

  async deleteInfo({
    commit
  }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    commit('removeInfo', id);
    window.alert("User has been Deleted");
  },

  async filterInfos({
    commit
  }, e) {
    // get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    commit('setInfos', response.data);
  },

  async updateInfo({
    commit
  }, updInfo) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${updInfo.id}`, updInfo
    );

    commit('updateInfo', response.data);
  }

};

const mutations = {
  setInfos: (state, infos) => (state.infos = infos),
  newInfo: (state, info) => state.infos.unshift(info),
  removeInfo: (state, id) => state.infos = state.infos.filter(info => info.id !== id),
  updateInfo: (state, updInfo) => {
    const index = state.infos.findIndex(info => info.id === updInfo.id);
    if (index !== -1) {
      state.infos.splice(index, 1, updInfo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}