<template>
  <div id="app">
    <div class="new-task-wrapper" v-bind:class="{ active: showForm }">
      <form class="new-task-form">
        <div v-on:click="closeForm" class="exit-modal-button"><i class="fa fa-times" aria-hidden="true"></i></div>
        <h2>Create New Task</h2>
        <datepicker class="form-element date-picker" v-model="newTask.dueDate" format="M/d/yyyy" placeholder="Select Due Date"></datepicker>
        <input class="form-element name" type="text" placeholder="Task Name" v-model="newTask.name">
        <textarea class="form-element details" placeholder="Task Details" v-model="newTask.details"></textarea>
        <div v-on:click="addTask">Save Task</div>
        <div v-on:click="closeForm">Cancel</div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div v-on:click="launchForm" class="button">New task <i class="fa fa-plus-square-o" aria-hidden="true"></i></div>
    <div class="filters-toggle" v-on:click="toggleFilters" v-if="!showFilters"><h3>Filters <i class="fa fa-chevron-down" aria-hidden="true"></i></h3></div>
    <div class="filters-toggle" v-on:click="toggleFilters" v-if="showFilters"><h3>Filters <i class="fa fa-chevron-up" aria-hidden="true"></i></h3></div>
    <div class="filters-wrapper" v-if="showFilters">
      <ul class="filters">
        <li v-for="(val, key) in completeFilters">
          <div
            class="filter"
            v-on:click="setCompleteFilters($event.target, key)"
            :class="{ active: isActive(key) }">
            {{ val.name }}
          </div>
        </li>
      </ul>
      <ul class="filters">
        <li v-for="(val, key) in timeFilters">
          <div
            class="filter"
            v-on:click="setTimeFilters($event.target, key)">
            {{ val.name }}
          </div>
        </li>
      </ul>
    </div>
    <h2>My Tasks:</h2>
    <div class="task-wrapper" v-if="filteredTasks.length > 0">
      <Task v-for="task in filteredTasks" :task="task" :key="task.id"></Task>
    </div>
    <div v-else>
      NO TASKS
    </div>
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
      showForm: false,
      completeFilters: {
        existing: {
          name: 'Existing',
          filter: (task => !task.completed),
        },
        completed: {
          name: 'Completed',
          filter: (task => task.completed),
        },
      },
      timeFilters: {
        overdue: {
          name: 'Previously Due',
          filter: (task => (moment(task.dueDate).isBefore(moment(), 'date'))),
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
      showFilters: false,
      activeFilters: {
        complete: null,
        time: [],
      },
    };
  },
  computed: {
    tasks() {
      // get all the tasks from the vuex store obj:
      return store.state.tasks;
    },
    filteredTasks() {
      // set local var to build results
      let filteredResults = [];

      // check if any filters are applied:
      if (this.activeFilters.time.length > 0) {
        // loop through all active time-based filters:
        this.activeFilters.time.forEach((fil) => {
          // run each filter to get an array
          const filArr = this.tasks.filter(this.timeFilters[fil].filter);
          filArr.forEach((task) => {
            // within each filter, push all unique tasks into filterdResults
            if (filteredResults.indexOf(task) === -1) {
              filteredResults.push(task);
            }
          });
        });
      } else {
        // if no time-based filters are applied, use all tasks available
        filteredResults = this.tasks;
      }

      if (this.activeFilters.complete) {
        // filter down the existing filteredResults by complete or not:
        filteredResults = filteredResults.filter(this.completeFilters[this.activeFilters.complete].filter);
      }

      // return data
      return filteredResults;
    },
  },
  methods: {
    toggleFilters() {
      if (this.showFilters) {
        this.showFilters = false;
      } else {
        this.showFilters = true;
      }
    },
    launchForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    addTask() {
      // basic error handling
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
      this.showForm = false;
    },
    setTimeFilters(target, key) {
      if (!target.classList.contains('active')) {
        this.activeFilters.time.push(key);
      } else {
        const index = this.activeFilters.time.indexOf(key);
        this.activeFilters.time.splice(index, 1);
      }
      target.classList.toggle('active');
    },
    setCompleteFilters(target, key) {
      if (target.classList.contains('active')) {
        this.activeFilters.complete = null;
      } else {
        this.activeFilters.complete = key;
      }

      target.classList.toggle('active');
    },
    isActive(item) {
      return this.activeFilters.complete === item;
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
  text-align: center;
  color: #2c3e50;
  margin: 50px 0 50px;

  .new-task-wrapper {
    display: none;
    &.active {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      overflow: hidden;
    }
    .new-task-form {
      max-width: 500px;
      margin: 0 auto;
      position: relative;
      background-color: #fefefe;
      margin: 10% auto;
      padding: 20px;
      .form-element {
        display: block;
        width: 100%;
        &.name {
          width: calc(100% - 150px);
          display: inline;
          float: right;
        }
        &.date-picker {
          float: left;
          display: inline;
          width: 100px;
          text-align: center;
        }
      }
      .exit-modal-button {
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
      }
    }
  }

  .button {
    cursor: pointer;
    padding: 10px 20px;
    margin: 5px auto;
    background-color: lightgray;
    color: black;
    max-width: 140px;
    user-select: none;
    &:hover {
      background-color: blue;
      color: white;
    }
  }

  .filters-toggle {
    max-width: 500px;
    margin: 0 auto;
    cursor: pointer;
  }
  .filters-wrapper {

    .filters {
      list-style: none;
      padding-left: 0;
      li {
        display: inline-block;
        text-align: center;
      }
      .filter {
        cursor: pointer;
        padding: 10px 20px;
        margin: 5px;
        background-color: lightgray;
        color: black;
        user-select: none;
        &.active {
          background-color: blue;
          color: white;
        }
      }
    }
  }

  .task-wrapper {
    border: 1px solid black;
    width: 500px;
    margin: 0 auto;
  }
}
</style>
