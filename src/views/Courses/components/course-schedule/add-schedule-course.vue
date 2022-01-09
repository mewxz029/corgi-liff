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
        เพิ่มเวลาเรียน
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="teal darken-1 text-white"
        >เพิ่มเวลาเรียน</v-card-title
      >
      <div class="mt-10">
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-dialog
                ref="dateDialog"
                v-model="dateModal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="ปี/เดือน/วันที่"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="dateRules"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" locale="th" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateModal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dateDialog.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="10" class="mb-0">
              <p>เวลาเริ่ม</p>
              <div class="d-flex">
                <v-select
                  :items="hour"
                  v-model="startHour"
                  label="ชั่วโมง"
                ></v-select>
                <v-select
                  :items="minute"
                  v-model="startMinute"
                  label="นาที"
                ></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <p>เวลาสิ้นสุด</p>
              <div class="d-flex">
                <v-select
                  :items="hour"
                  v-model="endHour"
                  label="ชั่วโมง"
                ></v-select>
                <v-select
                  :items="minute"
                  v-model="endMinute"
                  label="นาที"
                ></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="link"
                :rules="textRules"
                v-model="form.url"
                label="URL"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="book"
                v-model="form.note"
                label="หมายเหตุ"
                type="text"
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
          @click="createSchedule()"
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
      course: {},
      valid: true,
      loading: false,
      dialog: false,
      dateModal: false,
      date: dayjs(Date.now()).format("YYYY-MM-DD"),
      hour: [],
      minute: [],
      startHour: null,
      startMinute: null,
      endHour: null,
      endMinute: null,
      form: {
        course: {
          courseId: "",
          title: "",
          desc: "",
          imgUrl: "",
        },
        start: "",
        end: "",
        url: "",
        note: "",
      },
      textRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
      dateRules: [(v) => !!v || "กรุณาเลือกเวลา"],
    };
  },
  methods: {
    initTimePicker() {
      for (let i = 0; i <= 23; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        this.hour.push(`${i}`);
      }
      for (let i = 0; i <= 59; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        this.minute.push(`${i}`);
      }
    },
    clearForm() {
      this.form.start = "";
      this.form.end = "";
      this.form.url = "";
      this.form.note = "";
      this.startHour = null;
      this.startMinute = null;
      this.endHour = null;
      this.endMinute = null;
      this.dialog = false;
    },
    async createSchedule() {
      this.loading = true;

      this.form.start = `${this.date} ${this.startHour}:${this.startMinute}`;
      this.form.end = `${this.date} ${this.endHour}:${this.endMinute}`;
      this.form.course = {
        courseId: this.course.courseId,
        title: this.course.title,
        desc: this.course.desc,
        imgUrl: this.course.imgUrl,
      };
      try {
        await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}/course-schedule`,
          data: this.form,
        });
        this.loading = false;
        this.clearForm();
        this.$emit("getAllSchedule");
      } catch (error) {
        console.error("error", error);
      }
    },
    async getCourse() {
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/new-course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.course = data.data;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.initTimePicker();
    this.getCourse();
  },
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
