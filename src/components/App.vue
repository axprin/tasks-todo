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
          {{ val.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Guid from 'guid';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import Task from './Task';
import store from './../store';

// required for moment.js
moment().format();

export default {
  name: 'App',
  data() {
    return {
      newTask: {},
      filters: {
        all: {
          name: 'All',
          filter: (task => task),
        },
        existing: {
          name: 'Existing',
          filter: (task => !task.completed),
        },
        completed: {
          name: 'Completed',
          filter: (task => task.completed),
        },
        overdue: {
          name: 'Previously Due',
          filter: (task => !task.completed && (moment(task.dueDate).isBefore(moment(), 'date'))),
        },
        dueToday: {
          name: 'Due Today',
          filter: (task => moment(task.dueDate).isSame(moment(), 'date')),
        },
        dueTomorrow: {
          name: 'Due Tomorrow',
          filter: (task => moment(task.dueDate).isSame(moment().add(1, 'day'), 'date')),
        },
      },
      error: null,
      activeFilters: [],
    };
  },
  computed: {
    tasks() {
      // get all the tasks from the vuex store obj:
      return store.state.tasks;
    },
    filteredTasks() {
      // set local variable to all tasks before filtering begins:
      let filteredResults = this.tasks;

      // check if any filters are applied:
      if (this.activeFilters.length > 0) {
        // apply each filter to results:
        this.activeFilters.forEach((fil) => {
          // reset filteredResults for each filter:
          filteredResults = filteredResults.filter(this.filters[fil].filter);
        });
      }

      return filteredResults;
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
    },
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
