<template>
  <v-container class="rounded elevation-3 mt-12 mb-12">
    <div class="d-flex justify-space-between align-center mx-10 mt-5">
      <v-btn fab dark x-small color="red" link router :to="courseHome">
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-icon color="black" large> business </v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-8"></v-row>

    <h1 class="text-center">เพิ่มคอร์สเรียนใหม่</h1>
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>
    <v-row class="d-flex justify-center mb-10">
      <v-col cols="12" sm="8">
        <v-form v-model="valid" @submit.prevent="submitCourse()">
          <v-row class="px-15 mt-8">
            <v-text-field
              prepend-icon="title"
              label="ชื่อคอร์ส"
              type="text"
              :rules="titleRules"
              v-model="form.title"
              required
            ></v-text-field>
          </v-row>
          <v-row class="px-15 mt-8">
            <v-textarea
              counter
              prepend-icon="mdi-comment"
              label="รายละเอียด"
              v-model="form.desc"
              auto-grow
            ></v-textarea>
          </v-row>
          <v-row class="px-15 mt-8">
            <v-select
              prepend-icon="man"
              :items="teachers"
              item-text="name"
              item-value="id"
              v-model="form.teacherId"
              label="ผู้สอน"
              :rules="teacherRules"
              outlined
              dense
            ></v-select>
          </v-row>
          <v-row class="px-15 mt-8">
            <v-text-field
              prepend-icon="mdi-camera"
              label="Thumbnail URL"
              v-model="form.imgUrl"
              type="text"
            ></v-text-field>
          </v-row>

          <v-row class="justify-center mt-15 px-3">
            <v-btn
              depressed
              block
              id="submit-btn"
              type="submit"
              :disabled="!valid || loading"
              class="px-10"
              color="success"
            >
              เพิ่มคอร์สเรียน
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      loading: false,
      courseHome: "/course",
      teachers: [],
      form: {
        title: "",
        desc: "",
        teacherId: "",
        imgUrl: "",
        createdBy: "",
        updatedBy: "",
      },

      titleRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
      teacherRules: [(v) => !!v || "กรุณาเลือก"],
    };
  },

  methods: {
    async getAllTeacher() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/admin?limit=0",
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        if (data.data) {
          for (let teacher of data.data.results) {
            this.teachers.push({
              id: teacher._id,
              name: teacher.name,
            });
          }
        }
        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async submitCourse() {
      this.loading = true;
      try {
        // Test post before use store
        this.form.createdBy = this.form.teacherId;
        this.form.updatedBy = this.form.teacherId;
        await axios({
          method: "post",
          url: "http://localhost:3000/course",
          headers: { Authorization: `Bearer ${localStorage.token}` },
          data: this.form,
        });
        this.$router.push({
          path: "/course/",
        });

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  mounted() {
    this.getAllTeacher();
  },
};
</script>

<style></style>
