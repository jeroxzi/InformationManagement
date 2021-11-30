<template>
  <div id="app">
    <div class="mainCointainer">
      <div class="bodyCointainer">
        <div class="sidebar">
          <div class="user-sidebar__container">
            <Users />
          </div>
          <div class="post-sidebar__container">
            <Posts />
          </div>
        </div>
        <div class="mainDataContainer">
          <Infos />
          <div class="filterInfoContainer">
            <FilterInfos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Infos from "./components/Infos.vue";
// import AddInfo from "./components/AddInfo.vue";
// import AddUser from "./components/AddUser.vue";
// import AddPost from "./components/AddPost.vue";
import Posts from "./components/Posts.vue";
import Users from "./components/Users.vue";
import FilterInfos from "./components/FilterInfos.vue";

export default {
  name: "App",
  components: {
    Infos,
    Posts,
    Users,
    FilterInfos,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;400;500&display=swap");
body {
  font-family: "Outfit", sans-serif;
  font-weight: 300;
  line-height: 1.6;
  background: #e8f7f0;
  padding: 0;
  margin: 0;
}

/* .sidebar {
} */

.container {
  max-width: 1000px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}

.filterInfoContainer {
  margin-top: 10px;
  text-align: right;
}

.mainCointainer {
  display: grid;
  grid-template-columns: 1fr;
}

.bodyCointainer {
  display: grid;
  grid-template-columns: auto 1fr;
  background: white;
}

.sidebar {
  height: auto;
  background: white;
  min-width: 300px;
  border-right: 2px solid gray;
}

.mainDataContainer {
  padding: 0 32px;
}

#Maintable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#Maintable td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
.fa-trash-alt {
  color: rgb(212, 69, 69);
}

#Maintable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#Maintable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #696969;
  color: white;
  text-align: center;
}

.user-sidebar__container {
  padding: 0 24px 24px 24px;
  color: white;
  height: 45vh;
  overflow: scroll;
}

.post-sidebar__container {
  padding: 0 24px 24px 24px;
  color: white;
  height: 50vh;
  overflow: scroll;
}
</style>
