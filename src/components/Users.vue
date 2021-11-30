<template>
  <div class="user-container">
    <div>
      <h3>
        <i class="fas fa-database"></i> Users
        <i class="fas fa-plus" @click="onModalShow(true)"></i>
      </h3>
      <input
        type="text"
        class="searchUser"
        placeholder="Search User"
        v-model="searchInputValue"
      />
      <div class="users user-container__list">
        <div
          @dblclick="onDblClick"
          v-for="user in allUsersList"
          :key="user.id"
          class="user user-container__list-item"
          v-bind:class="{ 'is-complete': user.completed }"
        >
          <i class="fal fa-folder"></i>
          <span class="user-container__item-name">{{ user.username }}</span>
          <i class="fas fa-pencil-alt"></i>
          <i @click="deleteUser(user.id)" class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
    <div class="user-modal" v-bind:class="{ 'show-modal': show_modal }">
      <div class="user-modal__wrapper-inner">
        <div class="user-modal__header">
          <h3 class="user-modal__header-text">Add User</h3>
          <i class="fas fa-plus" @click="onModalShow(false)"></i>
        </div>
        <div class="user-modal__body">
          <AddUser />
        </div>
        <div class="user-modal__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddUser from "./AddUser.vue";

export default {
  name: "Users",
  data() {
    return {
      show_modal: false,
      searchInputValue: "",
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "updateUser"]),
    onDblClick(user) {
      const updUser = {
        id: user.id,
        username: user.username,
      };

      this.updateUser(updUser);
    },
    onModalShow(state) {
      this.show_modal = state;
    },
  },
  computed: {
    ...mapGetters(["allUsers"]),
    allUsersList() {
      if (!this.searchInputValue) {
        return this.allUsers;
      } else {
        return this.allUsers.filter((el) =>
          el.username
            .toLowerCase()
            .includes(this.searchInputValue.toLowerCase())
        );
      }
    },
  },
  created() {
    this.fetchUsers();
  },
  components: {
    AddUser,
  },
};
</script>

<style scoped>
h3 {
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

.searchUser {
  margin: 0 0 16px;
  width: calc(100% - 32px);
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
}

.users {
  display: grid;
  grid-template-columns: repeat(0, 1fr);
  grid-gap: 8px;
}

.user {
  border: 1px solid #ccc;
  background: white;
  color: black;
  font-weight: 500;
  padding: 4px 1rem;
  border-radius: 5px;
  text-align: start;
  position: relative;
  cursor: pointer;
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
  .users {
    grid-template-columns: 1fr;
  }
}

.user-modal {
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

.user-modal.show-modal {
  transform: scale(1);
}

.user-modal__wrapper-inner {
  max-width: 500px;
  background: white;
  transition: all 0.2 ease-in;
  justify-self: center;
  width: 500px;
}
.user-modal__header {
  position: relative;
}
.user-modal__body {
  position: relative;
  padding: 20px;
}
.user-modal__header i.fas {
  position: absolute;
  top: 8px;
  transform: rotate(45deg);
  right: 0;
  padding: 20px;
  color: black;
}

.user-modal__header-text {
  margin: 0;
  padding: 20px 40px 0 20px;
}
</style>