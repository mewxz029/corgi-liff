<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mx-10">
      <v-btn fab dark x-small color="red" link router :to="`/`">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> book </v-icon>
    </div>
    <h1 class="text-center mt-3">วิดีโอย้อนหลัง</h1>
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-row class="mt-15 justify-center" v-if="courseVideo.length">
      <v-col cols="12" sm="10" v-for="(course, i) in courseVideo" :key="i">
        <v-card
          class="mx-auto mb-0"
          max-height="100%"
          @click="openLink(course.url)"
        >
          <v-list-item tile size="100" rounded>
            <v-list-item-avatar tile size="100">
              <v-img :src="course.courseId.imgUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <h3>{{ course.courseId.title }}</h3>
              <h4>{{ new Date(course.date).toString().substr(0, 21) }}</h4>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <h3 v-else class="text-center mt-12">ไม่มีวิดีโอย้อนหลัง</h3>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      courseVideo: [],
    };
  },
  methods: {
    openLink(url) {
      window.open(url);
    },
    async getCourseVideo() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}course-video/${this.$route.params.courseId}/course?limit=0`,
        });

        this.courseVideo = data.data.result;
        console.log(this.courseVideo);
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
