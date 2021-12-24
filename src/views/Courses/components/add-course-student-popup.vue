<template>
  <v-row>
    <v-col cols="12" sm="12" class="justify-start px-15">
      <v-row class="mb-3 justify-end">
        <v-btn
          color="success"
          link
          router
          :to="`/course/student/add/${$route.params.courseId}`"
        >
          รายชื่อนักเรียนที่ไม่ได้ลงทะเบียน
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
