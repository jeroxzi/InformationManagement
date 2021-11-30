import Vuex from 'vuex';
import Vue from 'vue';
import infos from './modules/infos';
import posts from './modules/posts';
import users from './modules/users';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        infos,
        posts,
        users
    }
});