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
        >เพิ่มวิดีโอย้อนหลังวิชา:
        <span v-if="course">{{ course.title }}</span></v-card-title
      >
      <div class="mt-10">
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-select
                :items="allDate"
                label="วันเวลา"
                item-text="text"
                item-value="courseScheduleId"
                v-model="form.schedule"
                :rules="dateRules"
                prepend-icon="mdi-calendar"
                return-object
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
                v-model="form.note"
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
import dayjs from "dayjs";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      dialog: false,
      course: {},
      allDate: [],
      form: {
        schedule: {},
        url: "",
        note: "",
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
          url: `${process.env.VUE_APP_API_URL}/course-schedule/${this.$route.params.courseId}/course`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.course = data.data.docs[0].course;
        data.data.docs.map((item) => {
          this.allDate.push({
            courseScheduleId: item.courseScheduleId,
            text: `${dayjs(item.start).format("YYYY-MM-DD HH:mm")} - ${dayjs(
              item.end
            ).format("HH:mm")}`,
            start: item.start,
            end: item.end,
            note: item.note,
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
          url: `${process.env.VUE_APP_API_URL}/new-course-video`,
          data: {
            course: this.course,
            url: this.form.url,
            schedule: this.form.schedule,
            note: this.form.note,
          },
        });
        this.clearForm();
        this.$emit("getAllCourse");
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    clearForm() {
      this.form.url = "";
      this.form.schedule = {};
      this.form.note = "";
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
