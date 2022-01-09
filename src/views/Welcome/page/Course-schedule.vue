<template>
  <v-container class="app-container">
    <div class="d-flex justify-space-between align-center mx-5">
      <v-btn fab dark x-small color="red" link router :to="`/`">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> book </v-icon>
    </div>
    <h1 class="text-center mt-3">ตารางเรียนของคุณ</h1>
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-row class="mt-15 justify-center">
      <v-col cols="12" sm="10" v-for="(schedule, i) in schedule" :key="i">
        <v-card class="mx-auto mb-0" max-height="100%">
          <v-list-item tile size="100" rounded>
            <v-list-item-avatar tile size="100">
              <v-img :src="schedule.course.imgUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <h3>{{ schedule.course.title }}</h3>
              <h4>{{ schedule.start }}</h4>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import axios from "axios";

export default {
  data: () => ({
    student: {},
    schedule: [],
    course: [],
  }),
  methods: {
    async getStudentCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-student-course/${this.student.userId}/student`,
        });
        // this.allCourse = data.data[0].courseId;
        data.data.map((item) => {
          this.course.push(item.course.courseId);
        });

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async getScheduleByCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}/course-schedule/course`,
          data: { course: this.course },
        });
        this.schedule = data.data;

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.student = this.$store.state.student;
    this.getStudentCourse();
  },
};
</script>

<style scoped>
.app-container {
  margin-top: 15px !important;
}
</style>
