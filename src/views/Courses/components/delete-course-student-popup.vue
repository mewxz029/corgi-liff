<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" color="red">delete</v-icon>
    </template>

    <v-card>
      <v-card-title class="red darken-1 text-white">
        คุณต้องการลบ {{ studentItem.studentId.firstname }} ?
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="red"
          text
          @click="studentDelete(studentItem.studentId._id)"
        >
          ตกลง
        </v-btn>

        <v-btn color="primary" text @click="dialog = false"> ยกเลิก </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    studentItem: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
      courseItem: [],
    };
  },
  methods: {
    async studentDelete(studentId) {
      try {
        this.filterCourse();
        await axios({
          method: "put",
          url: `http://localhost:3000/student-course/${studentId}`,
          data: {
            courseId: this.courseItem,
          },
        });

        this.dialog = false;
        this.$emit("getAllStudent");
      } catch (error) {
        console.error(error);
      }
    },
    filterCourse() {
      const data = this.studentItem.courseId.filter(
        (course) => course._id !== this.$route.params.courseId
      );
      data.map((item) => {
        this.courseItem.push(item._id);
      });
    },
  },
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
