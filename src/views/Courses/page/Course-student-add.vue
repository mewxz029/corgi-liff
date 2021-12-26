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
      รายชื่อนักเรียนที่ไม่ได้ลงทะเบียนวิชา: {{ courseName }}
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
          item-key="_id"
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
    courseName: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "studentId._id",
      },
      {
        text: "ชื่อ",
        value: "studentId.firstname",
      },
      {
        text: "นามสกุล",
        value: "studentId.lastname",
      },
      {
        text: "เบอร์โทรศัพท์",
        value: "studentId.tel",
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
          url: `http://localhost:3000/course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.courseName = data.data[0].title;
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
          url: `http://localhost:3000/student-course/${this.$route.params.courseId}/not-course?limit=0`,
        });
        data.data.results.map((element) => {
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
        const addStudentId = [];
        const addStudentCourseId = [];
        this.selected.map((item) => {
          addStudentId.push(item.studentId._id);
          addStudentCourseId.push(item.courseId);
        });

        addStudentId.forEach(async (student, index) => {
          await axios({
            method: "put",
            url: `http://localhost:3000/student-course/${student}`,
            data: {
              courseId: [
                this.$route.params.courseId,
                ...addStudentCourseId[index],
              ],
            },
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
