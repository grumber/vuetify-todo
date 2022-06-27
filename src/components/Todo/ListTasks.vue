<template>
  <v-list flat class="pt-0">
    <draggable v-model="taskList" handle=".handle">
      <one-task v-for="task in taskList" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    "one-task": require("@/components/Todo/OneTask.vue").default,
    draggable,
  },
  computed: {
    taskList: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch("updateTaskListOrder", value);
      },
    },
  },
};
</script>