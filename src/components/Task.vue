<template>
  <div
    v-if="!editMode"
    class="task"
    v-bind:class="{ active: isActive }">
    <div class="task-content">
      <div><span class="heading">Task</span>: {{ task.name }}</div>
      <div v-if="task.completed">
        <span class="heading">Status</span>: Completed
      </div>
      <div v-else>
        <span class="heading">Status</span>: Not Completed
      </div>
      <div>
        <span class="heading">Due date</span>: {{ this.formatDate(this.task.dueDate) }}
      </div>
    </div>
    <div class="details">
      <h4 class="heading">Task details:&nbsp;</h4>
      <div>{{ task.details }}</div>
    </div>
    <div class="button-controls">
      <div v-on:click="hideDetails" class="hide-details"><i class="fa fa-compress" aria-hidden="true"></i></div>
      <div v-on:click="showDetails" class="expand-details"><i class="fa fa-expand" aria-hidden="true"></i></div>
      <div v-on:click="editTask" class="edit-button"><i class="fa fa-pencil" aria-hidden="true"></i></div>

    </div>
  </div>
  <div
    class="task edit"
    v-else>
    <div class="form-el"><span class="heading">Task: </span><input type="text" v-model="task.name" class="task-name"></div>
    <div class="form-el"><span class="heading">Completed: </span><input type="checkbox" class="completed-checkbox" v-model="task.completed"></div>
    <div class="form-el"><span class="heading">Details: </span><textarea v-model="task.details" class="task-name"></textarea></div>
    <div class="form-el datepicker"><span class="heading">Due date: </span><datepicker v-model="task.dueDate" format="M/d/yyyy" class="datepicker"></datepicker></div>
    <div class="button-controls">
      <div v-on:click="deleteTask" class="delete-button"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
      <div v-on:click="saveTask" class="save-button"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>
    </div>
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
    },
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="scss" scoped>
.task {
  border: 1px solid black;
  position: relative;
  padding: 5px;
  &.active {
    .details, .hide-details {
      display: block;
    }
    .expand-details {
      display: none;
    }
  }
  &.edit {
    min-height: 120px;
  }
  .details, .hide-details {
    display: none;
  }
  .task-content {
    max-width: 95%;
    text-align: left;
  }
  .details {
    text-align: left;
  }
  .form-el {
    display: block;
    height: 24px;
    &.datepicker {
      position: absolute;
      bottom: 22px;
    }
  }
  .heading {
    margin: 0px;
    font-weight: bold;
    float: left;
  }
  .task-name {
    float: left;
    display: block;
    resize: none;
    left: 107px;
    position: absolute;
  }
  .completed-checkbox {
    position: relative;
    left: -180px;
  }
  .button-controls {
    position: absolute;
    display: block;
    float: right;
    top: 0px;
    right: 5px;
  }
}
</style>
