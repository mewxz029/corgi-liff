<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="d-flex justify-space-between align-center mx-10 mt-5">
      <v-btn fab dark x-small color="red" link router :to="`/student`">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> person </v-icon>
    </div>

    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-row class="mt-12">
      <v-col cols="12" class="mb-5">
        <h1 class="text-center">รายละเอียด</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-card class="mx-auto" max-width="400" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-baseline"
              ><h3>ID:</h3>
              <v-col class="mr-1"></v-col>
              <span>{{ $route.params.studentId }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-baseline"
              ><h3>ชื่อ-นามสกุล:</h3>
              <v-spacer></v-spacer>
              <span>{{ student.firstname }} {{ student.lastname }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-baseline"
              ><h3>เบอร์โทรศัพท์:</h3>
              <v-spacer></v-spacer>
              <span>{{ student.tel }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row>
      <v-col cols="12" class="mb-5 mt-7">
        <h1 class="text-center">คอร์สที่ลงทะเบียน</h1>
      </v-col>
      <v-card class="mx-auto mb-5" max-width="600" tile>
        <div
          v-for="course in studentCourse"
          :key="course._id"
          class="d-flex justify-space-between"
        >
          <v-img :src="course.imgUrl" alt="" max-width="100" max-height="100" />
          <v-card-title>{{ course.title }}</v-card-title>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    student: {},
    studentCourse: [],
  }),
  methods: {
    async getStudentById() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}student/${this.$route.params.studentId}`,
        });
        this.student = data.data;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async getStudentCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}student-course/${this.$route.params.studentId}/student`,
        });
        this.studentCourse = data.data[0].courseId;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.getStudentById();
    this.getStudentCourse();
  },
};
</script>

<style></style>
