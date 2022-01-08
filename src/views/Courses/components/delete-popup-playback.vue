<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" color="red">delete</v-icon>
    </template>

    <v-card>
      <v-card-title class="red darken-1 text-white">
        คุณต้องการลบวิดีโอย้อนหลัง {{ courseItem.date }} ?
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red" text @click="courseDelete(courseItem.courseVideoId)">
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
    courseItem: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async courseDelete(courseId) {
      try {
        await axios({
          method: "delete",
          url: `${process.env.VUE_APP_API_URL}/new-course-video/${courseId}`,
        });

        this.dialog = false;
        this.$emit("getAllCourse");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
