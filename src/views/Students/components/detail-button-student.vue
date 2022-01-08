<template>
  <v-icon color="blue-grey" class="mr-3" @click="goToDetail">mdi-eye</v-icon>
</template>

<script>
export default {
  props: {
    studentItem: {
      type: Object,
    },
  },
  methods: {
    goToDetail() {
      this.$router.push(`/student/${this.studentItem.userId}`);
    },
  },
};
</script>

<style></style>
