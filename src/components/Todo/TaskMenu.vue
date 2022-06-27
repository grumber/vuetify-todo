<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close-dialog="dialogs.edit = false"
    />
    <dialog-duedates
      v-if="dialogs.duedates"
      :task="task"
      @close-dialog="dialogs.duedates = false"
    />
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close-dialog="dialogs.delete = false"
    />
  </div>
</template>

<script>
export default {
  props: ["task"],
  data: () => ({
    dialogs: {
      edit: false,
      duedates: false,
      delete: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Due date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.duedates = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          if (!this.$store.state.search) {
            this.$store.commit("toggleSorting");
          } else {
            this.$store.commit(
              "showSnackbar",
              "You can't sort while searching."
            );
          }
        },
      },
    ],
  }),
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    },
  },
  components: {
    "dialog-edit": require("@/components/Todo/Dialogs/DialogEdit.vue").default,
    "dialog-delete": require("@/components/Todo/Dialogs/DialogDelete.vue")
      .default,
    "dialog-duedates": require("@/components/Todo/Dialogs/DialogDuedates.vue")
      .default,
  },
};
</script>

<style>
</style>