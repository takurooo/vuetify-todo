<template>
  <div class="no-tasks">
    <v-icon size="100" color="primary">
      mdi-check
    </v-icon>
    <div class="text-h5 primary--text">No tasks</div>
  </div>
</template>

<style>
.no-tasks {
  left: 50%;
  opacity: 0.5;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%); /* %は自身の幅に対する割合 */
}
</style>
