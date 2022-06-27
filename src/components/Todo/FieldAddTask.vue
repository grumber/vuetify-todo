<template>
  <v-text-field
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
    class="pa-1"
    outlined
    placeholder="Add task"
    append-icon="mdi-plus"
    hide-details
    clearable
    dense
  >
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="taskTitleInvalid"> mdi-plus </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    taskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (!this.taskTitleInvalid) {
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
};
</script>