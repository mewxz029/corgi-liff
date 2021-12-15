<template>
  <v-app id="app">
    <app-bar class="hidden-sm-and-up" v-if="navbarEnable" />
    <v-row>
      <v-col lg="2" class="hidden-sm-and-down" v-show="navbarEnable">
        <Nav />
      </v-col>
      <v-col cols="12" xs="12" lg="8" class="mx-auto">
        <router-view class="mt-15" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import AppBar from "./components/app-bar.vue";

export default {
  name: "App",
  components: {
    Nav,
    AppBar,
  },
  computed: {
    navbarEnable() {
      return !this.forbidRoutes.includes(this.$route.name);
    },
  },
  data: () => ({
    forbidRoutes: ["Login"],
  }),
};
</script>

<style>
#app {
  font-family: "Prompt", sans-serif;
}
</style>
