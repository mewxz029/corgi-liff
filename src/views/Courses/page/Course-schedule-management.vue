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
      <v-icon color="black" large> book </v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <h1 class="text-center">
      จัดการตารางเรียนวิชา:
      <span v-if="allSchedule.length !== 0">{{ courseTitle }}</span>
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
            <add-schedule-course @getAllSchedule="getSchedule()" />
          </v-row>
        </v-col>
      </v-row>

      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="allSchedule"
          item-key="name"
          hide-default-footer
        >
          <template v-slot:[`item.url`]="{ value }">
            <a :href="value" target="_blank">{{ value }}</a>
          </template>
          <!-- <template v-slot:[`item.edit`]="{ item }">
            <edit-popup-admin
              :scheduleItem="item"
              @getAllSchedule="getSchedule()"
            />
            <delete-popup-admin
              :scheduleItem="item"
              @getAllSchedule="getSchedule()"
            />
          </template> -->
        </v-data-table>
      </v-col>

      <v-row class="mb-5">
        <pagination
          v-if="allSchedule.length !== 0"
          :pageData="pageData"
          @changePage="changePage"
        />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import AddScheduleCourse from "../components/course-schedule/add-schedule-course.vue";
import Pagination from "../../../components/pagination.vue";
export default {
  components: { AddScheduleCourse, Pagination },
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "courseScheduleId",
        },
        {
          text: "เวลาเริ่ม",
          value: "start.show",
        },
        {
          text: "เวลาสิ้นสุด",
          value: "end.show",
        },
        {
          text: "URL",
          value: "url",
        },
        {
          text: "หมายเหตุ",
          value: "note",
        },
        {
          text: "จัดการ",
          value: "edit",
        },
      ],
      allSchedule: [],
      courseTitle: "",
      allPages: "",
      currentPage: "",
      pageData: {},
    };
  },
  methods: {
    async getSchedule() {
      this.allSchedule = [];
      this.loading = false;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/course-schedule/${this.$route.params.courseId}/course`,
        });

        data.data.docs.map((item) => {
          this.allSchedule.push({
            courseScheduleId: item.courseScheduleId,
            course: item.course,
            start: {
              real: item.start,
              show: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
            },
            end: {
              real: item.end,
              show: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
            },
            url: item.url,
            note: item.note,
          });
        });

        this.courseTitle = data.data.docs[0].course.title;
        this.allPages = data.data.totalPages;
        this.currentPage = data.data.page;
        this.pageData = {
          path: `/course-schedule/${this.$route.params.courseId}/course`,
          allPages: data.data.totalPages,
          currentPage: data.data.page,
        };
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    changePage(data) {
      this.loading = true;
      this.allSchedule = [];
      data.data.docs.map((item) => {
        this.allSchedule.push({
          courseScheduleId: item.courseScheduleId,
          start: {
            real: item.start,
            show: dayjs(item.start).format("YYYY-MM-DD HH:mm"),
          },
          end: {
            real: item.end,
            show: dayjs(item.end).format("YYYY-MM-DD HH:mm"),
          },
          url: item.url,
          note: item.note,
        });
      });
      this.pageData = data;
      this.loading = false;
    },
  },
  mounted() {
    this.getSchedule();
  },
};
</script>

<style></style>
