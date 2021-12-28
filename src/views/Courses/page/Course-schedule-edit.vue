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
    <h1 class="text-center">แก้ไขตารางเรียน</h1>
    <v-row class="mt-15"></v-row>
    <v-row class="mt-8"></v-row>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12" sm="6" md="4">
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
                :rules="formRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" locale="th" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateModal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dateDialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="12" sm="6" md="4">
          <v-dialog
            ref="startTimeDialog"
            v-model="startTimeModal"
            :return-value.sync="startTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTime"
                label="เวลาเริ่ม"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="formRules"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="startTimeModal"
              v-model="startTime"
              format="24hr"
              full-width
              :max="endTime"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startTimeModal = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startTimeDialog.save(startTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-dialog
            ref="endTimeDialog"
            v-model="endTimeModal"
            :return-value.sync="endTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endTime"
                label="เวลาสิ้นสุด"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="formRules"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="endTimeModal"
              v-model="endTime"
              format="24hr"
              :min="startTime"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endTimeModal = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.endTimeDialog.save(endTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field
            label="URL ห้องเรียน"
            type="text"
            v-model="classUrl"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12" sm="12" class="justify-start px-15">
        <v-row class="mb-3 justify-end">
          <v-btn
            color="success"
            :disabled="!valid || loading"
            @click="addCourseDate"
            >เพิ่ม</v-btn
          >
        </v-row>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-container class="rounded elevation-3 mt-12">
      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="dateShow"
          item-key="id"
          sort-by="date"
          hide-default-footer
        >
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title> คุณต้องการลบเวลาเรียนนี้ ? </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >ยกเลิก</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm"
                    >ตกลง</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    loading: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateModal: false,
    startTime: null,
    startTimeModal: false,
    endTime: null,
    endTimeModal: false,
    dateShow: [],
    arrDate: [],
    dialogDelete: false,
    editedIndex: -1,
    classUrl: "",
    headers: [
      {
        text: "วัน/เดือน/วันที่/ปี",
        value: "date",
      },
      {
        text: "เวลาเริ่ม",
        value: "start",
      },
      {
        text: "เวลาสิ้นสุด",
        value: "end",
      },
      {
        text: "URL ห้องเรียน",
        value: "url",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
      },
    ],
    formRules: [(v) => !!v || "กรุณาเลือกเวลา"],
  }),
  methods: {
    async getCourseDate() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.arrDate = data.data[0].date;
        console.log(this.arrDate);
        this.formatDate();

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async addCourseDate() {
      this.loading = true;
      const datetime = {
        start: `${this.date}T${this.startTime}:00.000+07:00`,
        end: `${this.date}T${this.endTime}:00.000+07:00`,
        url: this.classUrl,
      };
      this.arrDate.push(datetime);

      try {
        await axios({
          method: "put",
          url: `${process.env.VUE_APP_API_URL}course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
          data: { date: this.arrDate },
        });
        this.getCourseDate();
      } catch (error) {
        console.log("error", error);
      }
    },
    formatDate() {
      this.dateShow = [];
      this.arrDate.map((item) => {
        const result = {
          date: new Date(item.start).toString().substr(0, 15),
          start: new Date(item.start).toString().substr(16, 5),
          end: new Date(item.end).toString().substr(16, 5),
          url: item.url,
        };
        this.dateShow.push(result);
      });
    },
    deleteItem(item) {
      this.editedIndex = this.dateShow.indexOf(item);
      console.log(this.editedIndex);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.loading = true;
      this.arrDate.splice(this.editedIndex, 1);

      try {
        await axios({
          method: "put",
          url: `${process.env.VUE_APP_API_URL}course/${this.$route.params.courseId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
          data: { date: this.arrDate },
        });

        this.closeDelete();
        this.getCourseDate();
      } catch (error) {
        console.error("error", error);
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
  },
  mounted() {
    this.getCourseDate();
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>

<style></style>
