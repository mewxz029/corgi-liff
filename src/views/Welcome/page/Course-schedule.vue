<template>
  <v-container class="app">
    <div class="d-flex justify-space-between align-center mx-10">
      <v-btn fab dark x-small color="red" link router :to="`/`">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> book </v-icon>
    </div>
    <h1 class="text-center mt-3">ตารางเรียนของคุณ</h1>
    <v-col>
      <v-col cols="12">
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
      </v-col>

      <v-col cols="12">
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          วันนี้
        </v-btn>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>วัน</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>เดือน</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          locale="th"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                ปิด
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "เดือน",
      day: "วัน",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    courses: [],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    async updateRange() {
      await this.getStudentCourse();
      const allTitle = [];
      const allDate = [];
      const events = [];

      this.courses.map((event) => {
        allTitle.push(event.title);
        allDate.push(event.date);
      });

      allDate.map((event, index) => {
        let start = null;
        let end = null;
        event.map((date) => {
          start = new Date(date.start);
          end = new Date(date.end);

          events.push({
            name: allTitle[index],
            start: start,
            end: end,
            timed: true,
            details: `เริ่ม ${start}`,
          });
        });
      });

      this.events = events;
    },

    async getStudentCourse() {
      try {
        const { data } = await axios({
          method: "get",
          url: `http://localhost:3000/student-course/${this.$store.state.student._id}/student`,
        });
        this.courses = data.data[0].courseId;
        // console.log(this.courses);
      } catch (error) {
        console.error("error", error);
      }
    },
  },
};
</script>

<style scoped>
.app {
  margin-top: 0 !important;
}
</style>
