import Vue from 'vue';
import Task from '@/components/Task';

describe('Task.vue', () => {
  let vm;

  beforeEach(() => {
    const Constructor = Vue.extend(Task);
    vm = new Constructor({
      template: '<div><Task></Task></div>',
      propsData: {
        task: {
          id: 1,
          name: 'test task',
          details: 'test details',
          dueDate: new Date(),
          completed: false,
        },
      },
      components: {
        Task,
      },
    }).$mount();
  });

  it('should go into edit mode', () => {
    // put task into edit mode
    const editButton = vm.$el.querySelector('.edit-button');
    const clickEvent = new window.Event('click');
    editButton.dispatchEvent(clickEvent);

    // assert:
    expect(vm.editMode).to.equal(true);
  });

  it('should update task', () => {
    // put task into edit mode
    const editButton = vm.$el.querySelector('.edit-button');
    const clickEvent = new window.Event('click');
    editButton.dispatchEvent(clickEvent);

    // update task name
    vm.task.name = 'updated test task';

    // assert:
    expect(vm.task.name).to.equal('updated test task');
  });
});
