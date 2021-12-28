<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="header ml-4 align-center d-flex">
      <v-icon color="black" large>book</v-icon>
      <h2 class="ml-2">จัดการคอร์สเรียน</h2>
    </div>

    <div class="d-flex justify-end align-center mx-10">
      <v-btn fab dark x-small color="green" link router :to="addCourse">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </div>

    <v-row class="mt-15"></v-row>
    <h1 class="text-center">คอร์สเรียนทั้งหมด</h1>
    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>
    <v-row class="mt-15 justify-center">
      <v-col cols="12" sm="10" v-for="(course, i) in allCourse" :key="i">
        <v-card
          class="mx-auto mb-0"
          max-height="100%"
          link
          router
          :to="`/course/${course._id}`"
        >
          <v-list-item tile size="100" rounded>
            <v-list-item-avatar tile size="100">
              <v-img :src="course.imgUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <h3>{{ course.title }}</h3>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" class="d-flex justify-end px-10 mb-5">
        <pagination
          v-if="allCourse.length !== 0"
          :pageData="pageData"
          @changePage="changePage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import pagination from "../../../components/pagination.vue";

export default {
  components: { pagination },
  data() {
    return {
      addCourse: "/course/add",
      loading: false,
      allCourse: [],
      allPages: "",
      currentPage: "",
      pageData: {},
    };
  },
  methods: {
    async getAllCourse() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}course`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.allCourse = data.data.results;
        this.allPages = data.data.pages;
        this.currentPage = data.data.page;
        this.pageData = {
          path: "course",
          allPages: data.data.pages,
          currentPage: data.data.page,
        };

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async changePage(data) {
      this.loading = true;
      this.allCourse = data.data.results;
      this.pageData = data;
      this.loading = false;
    },
  },
  mounted() {
    this.getAllCourse();
  },
};
</script>

<style></style>
