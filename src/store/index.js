import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db');
db.config.debug = false;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake up",
      //   done: false,
      //   dueDate: "2022-06-25"
      // },
      // {
      //   id: 2,
      //   title: "Go to work",
      //   done: false,
      //   dueDate: "2023-01-30"
      // },
      // {
      //   id: 3,
      //   title: "Go to bed",
      //   done: false,
      //   dueDate: null
      // },
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      const task = state.tasks.find((task) => task.id === id);
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
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
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.find((task) => task.id === payload.id);
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      const task = state.tasks.find((task) => task.id === payload.id);
      task.dueDate = payload.dueDate;
    },
    updateTaskListOrder(state, taskList) {
      state.tasks = taskList;
    },
    setSearch(state, value) {
      state.search = value;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask);
        commit('showSnackbar', "Task Added");
      })
    },
    doneTask({ state, commit }, id) {
      const task = state.tasks.find((task) => task.id === id);
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit("doneTask", id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id);
        commit('showSnackbar', "Task Deleted");
      })
    },
    updateTaskTitle({ state, commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit("updateTaskTitle", payload);
        commit("showSnackbar", "Edited Task Saved");
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit("updateTaskDueDate", payload)
        commit("showSnackbar", "Due Date Saved");
      })
    },
    updateTaskListOrder({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit("updateTaskListOrder", tasks)
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('updateTaskListOrder', tasks)
      })
    },
  },
  modules: {
  },
})
