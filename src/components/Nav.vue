<template>
  <div class="px-2 py-3">
    <v-navigation-drawer dark permanent fixed width="300">
      <v-list-item class="px-2">
        <v-list-item-title>Corgi Management</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

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

      <div class="justify-center mt-3">
        <v-btn block @click="logout">LOGOUT</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
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
          route: "/student",
        },
        {
          title: "จัดการคอร์สเรียน",
          icon: "book",
          route: "/course",
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
