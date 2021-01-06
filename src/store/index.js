import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    sorting: false,
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false,
      //   dueDate: '2020-10-16',
      // },
      // {
      //   id: 2,
      //   title: 'Get apple',
      //   done: false,
      //   dueDate: '2020-10-17',
      // },
      // {
      //   id: 3,
      //   title: 'Eat apple',
      //   done: false,
      //   dueDate: null,
      // },
    ],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, payload) {
      state.tasks = payload;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
      state.snackbar.text = '';
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {
    async addTask({ commit }, newTaskTitle) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      await db.collection('tasks').add(newTask);
      commit('addTask', newTask);
      commit('showSnackbar', 'Task added!!');
    },
    async doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      await db
        .collection('tasks')
        .doc({ id: id })
        .update({
          done: !task.done,
        });
      commit('doneTask', id);
    },
    async deleteTask({ commit }, id) {
      await db
        .collection('tasks')
        .doc({ id: id })
        .delete();
      commit('deleteTask', id);
      commit('showSnackbar', 'Task deleted!!');
    },
    async updateTaskTitle({ commit }, payload) {
      await db
        .collection('tasks')
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        });
      commit('updateTaskTitle', payload);
      commit('showSnackbar', 'Task updated!!');
    },
    async updateTaskDueDate({ commit }, payload) {
      await db
        .collection('tasks')
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        });
      commit('updateTaskDueDate', payload);
      commit('showSnackbar', 'Due Date updated!!');
    },
    async setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks);
      commit('setTasks', tasks);
    },
    async getTasks({ commit }) {
      const tasks = await db.collection('tasks').get();
      commit('setTasks', tasks);
    },
  },
  getters: {
    taskFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }
      return state.tasks.filter(task =>
        task.title.toLowerCase().includes(state.search.toLowerCase()),
      );
    },
  },
});
