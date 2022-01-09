<template>
  <v-container class="app-container">
    <div class="d-flex justify-space-between align-center mx-5">
      <v-btn fab dark x-small color="red" link router :to="`/`">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> book </v-icon>
    </div>
    <h1 class="text-center mt-3">ตารางเรียนของคุณ</h1>
    
  </v-container>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    
  }),
  methods: {
    
  },
};
</script>

<style scoped>
.app-container {
  margin-top: 15px !important;
}
</style>
