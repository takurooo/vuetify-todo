<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        height="170"
        src="village.jpg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="avatar.jpg" alt="Avatar" />
        </v-avatar>

        <div class="white--text text-subtitle-1 font-weight-bold">
          Takurooo
        </div>
        <div class="white--text text-subtitle-2">
          takurooo
        </div>
      </v-img>

      <v-divider></v-divider>

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
      src="village.jpg"
      prominent
      :height="$route.path === '/' ? '210' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer" />
          <v-spacer></v-spacer>
          <search />
        </v-row>

        <v-row>
          <v-app-bar-title class="text-h5 ml-4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>

        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
  }),
  mounted() {
    this.$store.dispatch('getTasks');
  },
  components: {
    search: require('@/components/Tools/Search.vue').default,
    'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
    'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
    snackbar: require('@/components/Shared/Snackbar.vue').default,
  },
};
</script>

<style lang="scss">
.header-container {
  max-width: none !important;
}
</style>
