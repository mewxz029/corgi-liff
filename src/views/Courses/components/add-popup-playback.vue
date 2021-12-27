<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class=""
        dark
        small
        color="green"
        v-bind="attrs"
        v-on="on"
        :block="$vuetify.breakpoint.mobile"
      >
        <v-icon left>add</v-icon>
        เพิ่มวิดีโอย้อนหลัง
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="teal darken-1 text-white"
        >เพิ่มวิดีโอย้อนหลัง</v-card-title
      >
      <div class="mt-10">
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-select
                :items="allDate"
                label="วันเวลา"
                item-text="text"
                item-value="date"
                v-model="form.date"
                :rules="dateRules"
                prepend-icon="mdi-calendar"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="link"
                :rules="urlRules"
                v-model="form.url"
                label="Video URL"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="chat"
                v-model="form.desc"
                label="รายละเอียด"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          text
          @click="createPlayback()"
          :disabled="!valid || loading"
        >
          ตกลง
        </v-btn>

        <v-btn color="error" text @click="clearForm()"> ยกเลิก </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      dialog: false,
      allDate: [],
      form: {
        url: "",
        date: "",
        desc: "",
      },
      urlRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
      dateRules: [(v) => !!v || "กรุณาเลือก"],
    };
  },
  mounted() {
    this.getCourseDate();
  },
  methods: {
    async getCourseDate() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        data.data[0].date.map((item) => {
          this.allDate.push({
            date: item.start,
            text: new Date(item.start).toString().substr(0, 21),
          });
        });
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async createPlayback() {
      this.loading = true;
      try {
        await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}course-video`,
          data: {
            courseId: this.$route.params.courseId,
            url: this.form.url,
            date: this.form.date,
            desc: this.form.desc,
          },
        });
        this.clearForm();
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    clearForm() {
      this.form.url = "";
      this.form.date = "";
      this.form.desc = "";
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
