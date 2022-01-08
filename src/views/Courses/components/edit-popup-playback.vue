<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" class="mr-3"> edit </v-icon>
    </template>

    <v-card>
      <v-card-title dark class="deep-purple darken-4 text-white">
        แก้ไข {{ courseItem.date }}
      </v-card-title>
      <div class="mt-10">
        <v-form v-model="valid">
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
          @click="courseUpdate(courseItem.courseVideoId)"
          :disabled="!valid || loading"
        >
          บันทึก
        </v-btn>

        <v-btn color="error" text @click="dialog = false"> ยกเลิก </v-btn>
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
      valid: true,
      loading: false,
      dialog: false,
      form: {
        url: "",
        note: "",
      },
      urlRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      try {
        this.form.url = this.courseItem.url;
        this.form.note = this.courseItem.note;
      } catch (error) {
        console.error(error);
      }
    },
    async courseUpdate(courseVideoId) {
      try {
        await axios({
          method: "put",
          url: `${process.env.VUE_APP_API_URL}/new-course-video/${courseVideoId}`,
          data: {
            url: this.form.name,
            note: this.form.note,
          },
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
