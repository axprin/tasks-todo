import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line
import moment from 'moment';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [
      // // un-comment these lines for some test data:
      // { id: 1, name: 'Test task 1', details: 'This task is due today', completed: false, dueDate: moment(new Date()).toDate() },
      // { id: 2, name: 'Test task 2', details: 'This task is due tomorrow', completed: false, dueDate: moment(new Date()).add(1, 'days').toDate() },
      // { id: 3, name: 'Test task 3', details: 'This task was due yesterday', completed: true, dueDate: moment(new Date()).add(-1, 'days').toDate() },
      // { id: 4, name: 'Test task 4', details: 'This task is due a ways into the future', completed: false, dueDate: moment(new Date()).add(12, 'days').toDate() },
      // { id: 5, name: 'Overdue task 1', details: 'This was already due', completed: false, dueDate: moment(new Date()).add(-10, 'days').toDate() },
      // { id: 6, name: 'Overdue task 2', details: 'This was already due', completed: false, dueDate: moment(new Date()).add(-4, 'days').toDate() },
    ],
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push(task);
    },
    deleteTask: (state, task) => {
      // eslint-disable-next-line
      state.tasks = state.tasks.filter(obj => obj.id !== task.id);
    },
  },
});

export default store;
