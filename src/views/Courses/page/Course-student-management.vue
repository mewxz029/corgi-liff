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
        :to="`/course/${$route.params.courseId}`"
      >
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="primary" large>people</v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-15"></v-row>
    <h1 class="text-center mb-5">
      รายชื่อนักเรียนที่ลงทะเบียนวิชา: {{ courseName }}
    </h1>
    <p class="px-5">มีจำนวนนักเรียนที่ลงทะเบียน: {{ totalStudent }} คน</p>
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
      <add-course-student-popup />

      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="allStudent"
          item-key="userId"
          hide-default-footer
        >
          <template v-slot:[`item.edit`]="{ item }">
            <delete-course-student-popup
              :studentItem="item"
              @getAllStudent="getStudent()"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import deleteCourseStudentPopup from "../components/delete-course-student-popup.vue";
import AddCourseStudentPopup from "../components/add-course-student-popup.vue";
export default {
  components: { deleteCourseStudentPopup, AddCourseStudentPopup },
  data: () => ({
    loading: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "student.userId",
      },
      {
        text: "ชื่อ-สกุล",
        value: "student.name",
      },
      {
        text: "เบอร์โทรศัพท์",
        value: "student.tel",
      },
      {
        text: "จัดการ",
        value: "edit",
      },
    ],
    allStudent: [],
    courseName: "",
    totalStudent: "",
  }),
  methods: {
    async getStudent() {
      this.loading = true;
      this.allStudent = [];
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-student-course/${this.$route.params.courseId}/course`,
        });

        data.data.docs.map((element) => {
          console.log(element);
          const studentItem = element;
          this.allStudent.push(studentItem);
        });
        this.totalStudent = data.data.totalDocs;

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async getCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.courseName = data.data.title;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.getCourse();
    this.getStudent();
  },
};
</script>

<style></style>
