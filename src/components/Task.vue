<template>
  <div
    v-if="!editMode"
    class="task"
    v-bind:class="{ active: isActive }"
    v-on:click="showDetails">
    <span>{{ task.name }} - </span>
    <span>Completed: {{ task.completed }}</span>
    <span>Due Date: {{ this.formatDate(this.task.dueDate) }}</span>
    <div class="details">
      <span>{{ task.details }}</span>
      <div v-on:click="hideDetails">hide</div>
    </div>
    <div v-on:click="deleteTask">X</div>
    <div v-on:click="editTask">EDIT</div>
  </div>
  <div
    v-else>
    <input type="text" v-model="task.name">
    <textarea v-model="task.details"></textarea>
    <datepicker v-model="task.dueDate" format="M/d/yyyy"></datepicker>
    <label for="completed-checkbox">Completed: </label>
    <input type="checkbox" id="completed-checkbox" v-model="task.completed">
    <div v-on:click="deleteTask">X</div>
    <div v-on:click="saveTask">SAVE</div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

import store from './../store';

export default {
  name: 'Task',
  props: ['task'],
  data() {
    return {
      editMode: false,
      isActive: false,
    };
  },
  methods: {
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
    showDetails() {
      // eslint-disable-next-line
      // console.log('before isActive changed: ', this.isActive);
      this.isActive = true;
    },
    hideDetails(e) {
      e.stopPropagation();
      // eslint-disable-next-line
      // console.log('before isActive changed: ', this.isActive, e);
      this.isActive = false;
    },
    deleteTask() {
      // eslint-disable-next-line
      // console.log('clicking an X' );
      store.commit('deleteTask', this.task);
    },
    editTask() {
      this.editMode = true;
      // this.friendlyDate = this.formatDate(this.task.dueDate);
      // eslint-disable-next-line
      // console.log('clicking edit' );
      // store.commit('updateTask', this.task);
    },
    saveTask() {
      this.editMode = false;
      // store.commit('updateTask', this.task);
    },
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="scss" scoped>
.task {
  border: 1px solid green;
  &.active {
    .details {
      display: block;
    }
  }
  .details {
    display: none;
  }
}
</style>
