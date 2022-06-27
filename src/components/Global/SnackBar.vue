<template>
  <v-snackbar v-model="$store.state.snackbar.show" :timeout="timeout">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="$store.commit('hideSnackbar')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    timeout: 2000,
  }),
};
</script>

<style lang="sass">
div.v-snack:not(.v-snack--absolute)
  height: 100%
</style>