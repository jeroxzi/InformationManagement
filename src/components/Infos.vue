<template>
  <div class="">
    <div class="information">
      <h3>Information</h3>
      <!-- <div class="legend">
           <span>Double click to mark as complete</span>
           <span>
               <span class="incomplete-box"></span> = Incomplete
           </span>
           <span>
               <span class="complete-box"></span> = Complete
           </span>
       </div> -->

      <input
        type="text"
        class="information__input-search"
        placeholder="Search"
        v-model="searchInputValue"
      />
      <div class="">
        <table class="information__table" id="Maintable">
          <thead class="information__table-head">
            <tr>
              <th>Name</th>
              <th>User name</th>
              <th>Email</th>
              <th>City</th>
              <th>Street</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in allInfosList" :key="info.id" class="info">
              <td>{{ info.name }}</td>
              <td>{{ info.username }}</td>
              <td>{{ info.email }}</td>
              <td>{{ info.address.city }}</td>
              <td>{{ info.address.street }}</td>
              <td>
                <i class="fas fa-pencil-alt"></i>
                <i @click="deleteInfo(info.id)" class="fas fa-trash-alt"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="infos">
           <div @dblclick="onDblClick" v-for="info in allInfos" :key="info.id" class="info"
                v-bind:class="{'is-complete':info.completed}">
               {{ info.name }}
             <i @click="deleteInfo(info.id)" class="fas fa-trash-alt"></i>
           </div>  
        </div>  -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Infos",
  data() {
    return {
      searchInputValue: "",
    };
  },
  methods: {
    ...mapActions(["fetchInfos", "deleteInfo", "updateInfo"]),
    onDblClick(info) {
      const updInfo = {
        id: info.id,
        name: info.name,
        completed: !info.completed,
      };

      this.updateInfo(updInfo);
    },
  },
  computed: {
    ...mapGetters(["allInfos"]),
    allInfosList() {
      if (!this.searchInputValue) {
        return this.allInfos;
      } else {
        return this.allInfos.filter(
          (el) =>
            el.name
              .toLowerCase()
              .includes(this.searchInputValue.toLowerCase()) ||
            el.username
              .toLowerCase()
              .includes(this.searchInputValue.toLowerCase()) ||
            el.email.toLowerCase().includes(this.searchInputValue.toLowerCase())
        );
      }
    },
  },
  created() {
    this.fetchInfos();
  },
};
</script>

<style scoped>
.information {
  display: grid;
  margin-top: 20px;
}

.information__input-search {
  margin: 0 0 16px;
  min-width: 50px;
  /* width: calc(100% - 32px); */
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  justify-self: end;
}

.fa-trash-alt {
  color: rgb(212, 69, 69);
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.fa-pencil-alt {
  color: gray;
  bottom: 10px;
  right: 38px;
  cursor: pointer;
  padding-right: 10px;
}

.infos {
  display: grid;
  grid-template-columns: repeat(0, 1fr);
  grid-gap: 1rem;
}

.info {
  border: 1px solid #ccc;
  background: #e4e4e4;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  /* position: absolute;
    bottom: 10px;
    right: 10px; */
  color: #fff;
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
  .infos {
    grid-template-columns: 1fr;
  }
}
</style>