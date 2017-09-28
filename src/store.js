import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: 'test', details: 'these are test details', completed: false, dueDate: new Date(2017, 11, 17) },
      { id: 2, name: 'foo', details: 'these are foo details', completed: false, dueDate: new Date(2017, 11, 17) },
      { id: 3, name: 'bar', details: 'these are bar details', completed: true, dueDate: new Date(2017, 11, 17) },
      { id: 4, name: 'DUE TODAY', details: 'these are bar details', completed: true, dueDate: new Date(2017, 8, 28) },
      { id: 5, name: 'overdue', details: 'asdf sdf asdf asdf ', completed: false, dueDate: new Date(2017, 11, 17) },
      { id: 6, name: 'overdue2', details: 'asdfdsfasd dfd fd fdfasdfasd f', completed: false, dueDate: new Date(2017, 5, 17) },
      { id: 7, name: 'overdue3', details: 'adsf fef ef ecSc aerfaesdf', completed: false, dueDate: new Date(2017, 5, 17) },
      { id: 8, name: 'overdue4', details: 'tasdfa sdfefaw efa s adf', completed: false, dueDate: new Date(2017, 5, 17) },
      { id: 9, name: 'DUE TOM', details: 'these are asdfsadfasdetails', completed: false, dueDate: new Date(2017, 8, 29) },
      { id: 10, name: 'DUE TOM2', details: 'these afasdfasdfre bar details', completed: false, dueDate: new Date(2017, 8, 29) },
      { id: 11, name: 'DUE TOM3', details: 'these aasdfasdfasdfre bar details', completed: false, dueDate: new Date(2017, 8, 29) },
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
