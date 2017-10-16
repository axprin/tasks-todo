import Vue from 'vue';
import App from '@/components/App';

describe('App.vue', () => {
  it('should load the to-do list app with proper template', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h2.title').textContent)
      .to.equal('My Tasks:');
  });

  it('should launch the add a task modal', () => {
    // setup the test stuff...
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    // launch the new task modal
    const launchButton = vm.$el.querySelector('.button.launch');
    const clickEvent = new window.Event('click');
    launchButton.dispatchEvent(clickEvent);

    expect(vm.showForm).to.equal(true);
  });

  it('should close the add a task modal', () => {
    // setup the test stuff...
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    // launch the new task modal
    const launchButton = vm.$el.querySelector('.button.launch');
    const clickEvent = new window.Event('click');
    launchButton.dispatchEvent(clickEvent);

    // close the new task modal
    const closeButton = vm.$el.querySelector('.exit-modal-button');
    closeButton.dispatchEvent(clickEvent);

    expect(vm.showForm).to.equal(false);
  });

  it('should expand the filters', () => {
    // setup the test stuff...
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    // expand the filters
    const expandFilters = vm.$el.querySelector('.filters-toggle');
    const clickEvent = new window.Event('click');
    expandFilters.dispatchEvent(clickEvent);

    expect(vm.showFilters).to.equal(true);
  });

  it('should collapse the filters', () => {
    // setup the test stuff...
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    // expand the filters
    const filters = vm.$el.querySelector('.filters-toggle');
    const clickEvent = new window.Event('click');
    filters.dispatchEvent(clickEvent);

    // collapse the filters
    filters.dispatchEvent(clickEvent);

    expect(vm.showForm).to.equal(false);
  });

  it('should add a task', () => {
    // setup the test stuff...
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    // store the original number of tasks
    const taskNum = vm.tasks.length;

    // launch the new task modal
    const launchButton = vm.$el.querySelector('.button.launch');
    const clickEvent = new window.Event('click');
    launchButton.dispatchEvent(clickEvent);

    // stub values for new task
    vm.newTask.name = 'test task';
    vm.newTask.details = 'test details';
    vm.newTask.dueDate = new Date();

    // save the new task
    const saveButton = vm.$el.querySelector('.button.popup-button.save');
    saveButton.dispatchEvent(clickEvent);

    // assert:
    expect(vm.tasks.length).to.equal(taskNum + 1);
  });
});
