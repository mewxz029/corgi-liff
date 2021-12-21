<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="d-flex justify-space-between align-center mx-10 mt-5">
      <v-btn fab dark x-small color="red" link router :to="courseHome">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> book </v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-8"></v-row>

    <div class="d-flex justify-end mx-10 mb-5">
      <v-btn
        color="primary"
        class="mr-1"
        link
        router
        :to="`/course/edit/${this.$route.params.courseId}`"
        >แก้ไขข้อมูล</v-btn
      >
      <v-btn
        color="success"
        link
        router
        :to="`/course/schedule/edit/${this.$route.params.courseId}`"
        >แก้ไขตารางเรียน</v-btn
      >
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

    <v-row class="d-flex justify-center mb-10">
      <v-col cols="12" sm="10">
        <v-card class="py-5 px-3">
          <v-row class="ml-3">
            <h1>
              {{ course.title }}
            </h1>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="d-flex justify-center">
                <v-img
                  :src="course.imgUrl"
                  alt=""
                  max-width="300"
                  class="my-2"
                ></v-img>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-card-title> รายละเอียด:</v-card-title>
            <v-card-text>
              {{ course.desc }}
            </v-card-text>
          </v-row>

          <v-row>
            <v-card-title>
              ผู้สอน:
              {{ teacher }}
            </v-card-title>
          </v-row>
        </v-card>
        <v-row class="mt-15"></v-row>
        <v-card>
          <v-card-title>ตารางเรียน: </v-card-title>
          <v-card-subtitle>คาบเรียนทั้งหมด: {{ event.length }}</v-card-subtitle>
          <v-date-picker
            locale="th"
            full-width
            event-color="green lighten-1"
            :events="event"
            v-model="date"
          ></v-date-picker>
          <v-card-title>{{ date }}</v-card-title>
          <v-card-subtitle v-if="isEvent"
            >เวลาเริ่ม {{ startTime }} เวลาสิ้นสุด
            {{ endTime }}</v-card-subtitle
          >
          <v-card-subtitle v-else>ไม่มีคาบเรียน</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    courseHome: "/course",
    loading: false,
    course: {},
    teacher: "",
    date: "",
    event: [],
    eventTime: [],
    isEvent: false,
    startTime: "",
    endTime: "",
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
        this.course = data.data[0];
        this.teacher = data.data[0].teacherId.name;

        data.data[0].date.map((item) => {
          const date = item.start.substr(0, 10);
          const time = {
            start: item.start.substr(11, 5),
            end: item.end.substr(11, 5),
          };
          this.event.push(date);
          this.eventTime.push(time);
        });
        this.date = this.event[0];

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    compareDate(date) {
      if (this.event.indexOf(date) !== -1) {
        const index = this.event.indexOf(date);
        this.isEvent = true;
        this.startTime = this.eventTime[index].start;
        this.endTime = this.eventTime[index].end;
      } else {
        this.isEvent = false;
        this.startTime = "";
        this.endTime = "";
      }
    },
  },
  mounted() {
    this.getCourse();
  },
  watch: {
    date(val) {
      this.compareDate(val);
    },
  },
};
</script>

<style></style>
