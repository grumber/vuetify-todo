<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app mobile-breakpoint="768">
      <v-img
        class="pt-2"
        src="mountains.jpg"
        height="150"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mt-3 ml-3 mb-1">
          <img src="grumber.png" alt="Grumber" />
        </v-avatar>
        <div class="white--text subtitle2 ml-3 font-weight-bold">
          The Grumber
        </div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="mountains.jpg"
      prominent
      height="150"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="text-h5">
        Vuetify Todo
        <v-spacer></v-spacer>
        <live-date-time />
        <field-add-task v-if="$route.path === '/'" />
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <search-tasks />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    "search-tasks": require("@/components/Tools/SearchTasks.vue").default,
    "snack-bar": require("@/components/Global/SnackBar.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
    "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
};
</script>

<style lang="sass">
.v-app-bar-title__content
  width: 225px
</style>