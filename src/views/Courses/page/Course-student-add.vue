<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="d-flex justify-space-between align-center mx-10 mt-5">
      <v-btn
        fab
        dark
        x-small
        color="red"
        link
        router
        :to="`/course/student/${$route.params.courseId}`"
      >
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="primary" large>people</v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-15"></v-row>
    <h1 class="text-center mb-5">
      รายชื่อนักเรียนที่ไม่ได้ลงทะเบียนวิชา:
      <span v-if="course">{{ course.title }}</span>
    </h1>
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-row class="mt-15">
      <v-row>
        <v-col cols="12" sm="12" class="justify-start px-15">
          <v-row class="mb-3 justify-end">
            <v-btn
              color="success"
              :disabled="!selected.length"
              @click="addStudentToCourse"
              >เพิ่มนักเรียน</v-btn
            >
          </v-row>
        </v-col>
      </v-row>

      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="allStudent"
          item-key="userId"
          show-select
          hide-default-footer
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    selected: [],
    loading: false,
    course: {},
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "userId",
      },
      {
        text: "ชื่อ-สกุล",
        value: "name",
      },
      {
        text: "เบอร์โทรศัพท์",
        value: "tel",
      },
    ],
    allStudent: [],
  }),
  methods: {
    async getCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.course = data.data;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async getStudentNotCourse() {
      this.loading = true;
      this.allStudent = [];
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-student-course/${this.$route.params.courseId}/not-course`,
        });

        data.data.map((element) => {
          const studentItem = element;
          this.allStudent.push(studentItem);
        });
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async addStudentToCourse() {
      this.loading = true;
      try {
        this.selected.map(async (student) => {
          const data = {
            student: {
              userId: student.userId,
              name: student.name,
              tel: student.tel,
              lineUid: student.lineUid,
            },
            course: {
              courseId: this.course.courseId,
              title: this.course.title,
              desc: this.course.desc,
              imgUrl: this.course.imgUrl,
            },
          };
          await axios({
            method: "post",
            url: `${process.env.VUE_APP_API_URL}/new-student-course`,
            data,
          });
        });
        this.selected = [];
        this.getStudentNotCourse();
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.getCourse();
    this.getStudentNotCourse();
  },
};
</script>

<style></style>
