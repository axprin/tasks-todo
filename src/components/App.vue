<template>
  <div id="app">
    <h2>Create New Task</h2>
    <form>
      <input type="text" placeholder="Task Name" v-model="newTask.name">
      <textarea placeholder="Task Details" v-model="newTask.details"></textarea>
      <datepicker v-model="newTask.dueDate" format="M/d/yyyy" placeholder="Select Due Date"></datepicker>
    </form>
    <div v-on:click="addTask">Add Task</div>
    <div v-if="error" class="error">{{ error }}</div>
    <h2>My Tasks:</h2>
    <Task v-for="task in filteredTasks" :task="task" :key="task.id"></Task>
    <ul class="filters">
      <li v-for="(val, key) in filters">
        <div
          class="filter"
          v-on:click="toggleFilter($event.target, key)">
          {{ key }}
        </div>
        <!-- <a :href="'#/' + key"
          :class="{ selected: visibility === key }"
          @click="visibility = key">{{ key }}</a> -->
      </li>
    </ul>
  </div>
</template>

<script>
import Guid from 'guid';
import Datepicker from 'vuejs-datepicker';

import Task from './Task';
import store from './../store';

// const filters = {
// };

export default {
  name: 'App',
  data() {
    return {
      newTask: {},
      filters: {
        all: tasks => tasks,
        remaining: tasks => tasks.filter(task => !task.completed),
        completed: tasks => tasks.filter(task => task.completed),
        dueToday: tasks => tasks.filter(task => this.compareDates(task.dueDate, new Date())),
        dueTomorrow: tasks => tasks.filter(task => task),
        // eslint-disable-next-line
        // dueTomorrow: tasks => tasks.filter(task => this.compareDates(task.dueDate, this.getTomorrow())),
      },
      visibility: 'all',
      error: null,
      activeFilters: [],
    };
  },
  computed: {
    tasks() {
      return store.state.tasks;
    },
    filteredTasks() {
      return this.filters[this.visibility](this.tasks);
    },
  },
  methods: {
    addTask() {
      if (!this.newTask.name || !this.newTask.details || !this.newTask.dueDate) {
        this.error = 'You must gimme all required fields';
        return;
      }

      // set defaults
      this.newTask.id = Guid.raw();
      this.newTask.completed = false;

      // update the store with newTask data
      store.commit('addTask', this.newTask);

      // reset obj for more new tasks
      this.newTask = {};
      this.newTask.dueDate = null;
      this.error = null;
    },
    toggleFilter(target, key) {
      if (!target.classList.contains('active')) {
        this.activeFilters.push(key);
      } else {
        const index = this.activeFilters.indexOf(key);
        this.activeFilters.splice(index, 1);
      }
      target.classList.toggle('active');
      this.applyFilters();
    },
    applyFilters() {
      // eslint-disable-next-line
      console.log("activeFilters: ", this.activeFilters);
    },
    compareDates(date1, date2) {
      // options.date1
      // eslint-disable-next-line
      // console.log("date1, date2: ", date1, date2);
      const d1 = date1.setHours(0, 0, 0, 0);
      const d2 = date2.setHours(0, 0, 0, 0);
      if (d1 === d2) return true;
      return false;
    },

    // getTomorrow() {
    //   const tomorrow = new Date();
    //   // eslint-disable-next-line
    //   // console.log(tomorrow.setDate(tomorrow.getDate() + 1).toString);
    //   return tomorrow.setDate(tomorrow.getDate() + 1);
    // },
  },
  components: {
    Task,
    Datepicker,
  },
};

</script>

<style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;

  .filters {
    list-style: none;
    .filter {
      background-color: lightgray;
      &.active {
        background-color: blue;
      }
    }
  }
}
</style>
