<template>
  <v-app-bar elevation="4" dark fixed dense>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          id="list-item"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn text @click="logout">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "dashboard",
          route: "/dashboard",
        },
        {
          title: "จัดการนักเรียน",
          icon: "people",
          route: "student",
        },
        {
          title: "จัดการคอร์สเรียน",
          icon: "book",
          route: "course",
        },
        {
          title: "จัดการแอดมิน",
          icon: "assignment_ind",
          route: "/auth",
        },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style></style>
