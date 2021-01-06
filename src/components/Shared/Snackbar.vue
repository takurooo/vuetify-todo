<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
    color="primary"
    elevation="24"
  >
    <div class="text-subtitle-2">
      {{ $store.state.snackbar.text }}
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$store.commit('hideSnackbar')">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {};
</script>

<style lang="scss">
div.v-snack:not(.v-snack--absolute) {
  height: 100%;
}
</style>
