<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="header ml-4 align-center d-flex">
      <v-icon color="black" large>book</v-icon>
      <h2 class="ml-2">จัดการคอร์สเรียน</h2>
    </div>

    <div class="d-flex justify-end align-center mx-10">
      <v-btn fab dark x-small color="green" link router :to="addCourse">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </div>

    <v-row class="mt-15"></v-row>
    <h1 class="text-center">คอร์สเรียนทั้งหมด</h1>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      addCourse: "/course/add",
    };
  },
};
</script>

<style></style>
