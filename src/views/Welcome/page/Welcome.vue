<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">ยินดีต้อนรับ</h1>
      </v-col>
      <v-col cols="12">
        <h3 class="text-center">
          คุณ{{ student.firstname }} {{ student.lastname }}
        </h3>
      </v-col>
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-btn color="success" link router :to="`/check-course`" x-large
        >ดูคอร์สเรียนของคุณ</v-btn
      >
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-btn color="primary" link router :to="`/check-schedule`" x-large
        >ดูตารางเรียนของคุณ</v-btn
      >
    </v-row>
    <v-row class="mt-15"> </v-row>
    <v-row justify="center">
      <v-btn color="secondary" link router :to="`/check-playback`" x-large
        >ดูวิดีโอย้อนหลัง</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import liff from "@line/liff";
import axios from "axios";

export default {
  data() {
    return {
      isUsed: false,
      student: {},
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      try {
        await liff.init({ liffId: "1656648626-k0e1wr2Q" });
        if (liff.isLoggedIn()) {
          const { userId } = await liff.getProfile();
          this.$store.dispatch("changeAction", userId);
          this.checkLineUid();
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    async checkLineUid() {
      try {
        const { data } = await axios({
          method: "post",
          url: "http://localhost:3000/student/check",
          data: { lineUid: this.$store.state.lineUid },
        });

        this.isUsed = data.data.used;
        this.getStudent(this.$store.state.lineUid);

        if (!this.isUsed) {
          this.$router.push({ path: "/register" });
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    async getStudent(lineUid) {
      try {
        const { data } = await axios({
          method: "get",
          url: `http://localhost:3000/student/${lineUid}/lineUid`,
        });

        this.student = data.data;
        this.$store.dispatch("addAction", this.student);
      } catch (error) {
        console.error("error", error);
      }
    },
  },
};
</script>

<style></style>
