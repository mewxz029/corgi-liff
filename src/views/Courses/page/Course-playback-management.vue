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
    <v-row class="mt-8"></v-row>

    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <h1 class="text-center">จัดการวิดีโอย้อนหลัง</h1>
    <v-row class="mt-15">
      <v-row>
        <v-col cols="12" sm="12" class="justify-start px-15">
          <v-row class="mb-3 justify-end">
            <add-popup-playback @getAllCourse="getCourseVideo()" />
          </v-row>
        </v-col>
      </v-row>
    </v-row>

    <v-col cols="12" class="px-10 mb-5">
      <v-data-table
        :headers="headers"
        :items="allCourseVideo"
        item-key="courseVideoId"
        hide-default-footer
      >
        <template v-slot:[`item.url`]="{ value }">
          <a :href="value" target="_blank">{{ value }}</a>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <edit-popup-playback
            :courseItem="item"
            @getAllCourse="getCourseVideo()"
          />
          <delete-popup-playback
            :courseItem="item"
            @getAllCourse="getCourseVideo()"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import addPopupPlayback from "../components/add-popup-playback.vue";
import EditPopupPlayback from "../components/edit-popup-playback.vue";
import DeletePopupPlayback from "../components/delete-popup-playback.vue";
import dayjs from "dayjs";

export default {
  components: { addPopupPlayback, EditPopupPlayback, DeletePopupPlayback },
  data() {
    return {
      valid: true,
      loading: false,
      headers: [
        {
          text: "วันเวลา",
          value: "date",
        },
        {
          text: "Video URL",
          value: "url",
        },
        {
          text: "รายละเอียด",
          value: "note",
        },
        {
          text: "จัดการ",
          value: "edit",
        },
      ],
      allCourseVideo: [],
    };
  },
  methods: {
    async getCourseVideo() {
      this.loading = true;
      this.allCourseVideo = [];
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-course-video/`,
        });

        data.data.docs.map((item) => {
          this.allCourseVideo.push({
            courseVideoId: item.courseVideoId,
            course: item.course,
            date: `${dayjs(item.schedule.start).format(
              "YYYY-MM-DD HH:mm"
            )} - ${dayjs(item.schedule.end).format("HH:mm")}`,
            schedule: item.schedule,
            note: item.note,
            url: item.url,
          });
        });
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.getCourseVideo();
  },
};
</script>

<style></style>
