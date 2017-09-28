import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: 'test', details: 'these are test details', completed: false, dueDate: new Date(2017, 11, 17) },
      { id: 2, name: 'foo', details: 'these are foo details', completed: false, dueDate: new Date(2017, 11, 17) },
      { id: 3, name: 'bar', details: 'these are bar details', completed: true, dueDate: new Date(2017, 11, 17) },
      { id: 4, name: 'DUE TODAY', details: 'these are bar details', completed: true, dueDate: new Date() },
    ],
  },
  getters: {
    // getTasks: state => state.tasks,
    // getCompletedTasks: state => state.tasks.filter(task => task.completed),
    // getOutstandingTasks: state => state.tasks.filter(task => !task.completed),
    // getTaskById: state => id => state.tasks.find(task => task.id === id),
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push(task);
    },
    deleteTask: (state, task) => {
      // eslint-disable-next-line
      state.tasks = state.tasks.filter(obj => obj.id !== task.id);
      // state.tasks = state.tasks.filter(task => task.id !== )
    },
    // updateTask: (state, task) => {
    //   const taskToUpdate = state.tasks.findIndex(obj => obj.id === task.id);
    //   // eslint-disable-next-line
    //   state.tasks[taskToUpdate] = task;
    // },
  },
  actions: {
    // add: context => context.commit('addTask'),
  },
});

export default store;
