<template>
  <v-container v-if="loading">
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">ยินดีต้อนรับ</h1>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">คุณ{{ student.name }}</h3>
      </v-col>
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="4" class="mx-auto">
        <v-btn
          color="success"
          link
          router
          :to="`/check-course`"
          x-large
          width="100%"
          >ดูคอร์สเรียนของคุณ</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="4" class="mx-auto">
        <v-btn
          color="primary"
          link
          router
          :to="`/check-schedule`"
          x-large
          width="100%"
          >ดูตารางเรียนของคุณ</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="4" class="mx-auto">
        <v-btn
          color="secondary"
          link
          router
          :to="`/check-playback`"
          x-large
          width="100%"
          >ดูวิดีโอย้อนหลัง</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import liff from "@line/liff";
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      isUsed: false,
      student: {},
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      this.loading = true;
      try {
        await liff.init({ liffId: "1656648626-k0e1wr2Q" });
        if (liff.isLoggedIn()) {
          const { userId } = await liff.getProfile();
          this.$store.dispatch("setAction", userId);
          this.checkLineUid(userId);
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    async checkLineUid(userId) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}/user/check`,
          data: { lineUid: userId },
        });

        this.isUsed = data.used;

        if (!this.isUsed) {
          this.$router.push({ path: "/register" });
        } else {
          this.getStudent(userId);
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    async getStudent(lineUid) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}/user/login/student`,
          data: { lineUid },
        });
        console.log(data);
        this.student = data.data.user;
        this.$store.dispatch("addAction", this.student);
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
};
</script>

<style></style>
