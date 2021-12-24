<template>
  <div class="d-flex justify-center">
    <h1>ยินดีต้อนรับ</h1>
  </div>
</template>

<script>
import liff from "@line/liff";
import axios from "axios";

export default {
  data() {
    return {
      isUsed: false,
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
          this.$store.state.lineUid = userId;
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
        if (!this.isUsed) {
          this.$router.push({ path: "/register" });
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style></style>
