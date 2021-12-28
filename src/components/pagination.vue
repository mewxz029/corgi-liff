<template>
  <v-col cols="12" class="d-flex justify-end px-10">
    <v-btn fab x-small elevation="1" @click="backPage()">
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-btn
      fab
      x-small
      elevation="1"
      v-for="(page, i) in allPages"
      :key="i"
      class="mx-1"
      @click="changePage(i)"
      >{{ i + 1 }}</v-btn
    >
    <v-btn fab x-small elevation="1" @click="nextPage()">
      <v-icon>navigate_next</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  name: "Pagination",
  props: {
    pageData: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      allPages: null,
      currentPage: null,
      path: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.path = this.pageData.path;
      this.allPages = this.pageData.allPages;
      this.currentPage = this.pageData.currentPage;
    }, 500);
  },
  methods: {
    async changePage(index) {
      this.loading = true;

      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}${this.path}?page=${index + 1}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.allPages = data.data.pages;
        this.currentPage = data.data.page;
        this.$emit("changePage", data);

        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async nextPage() {
      if (parseInt(this.currentPage) + 1 > this.allPages) {
        return null;
      }
      this.loading = true;

      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}${this.path}?page=${
            parseInt(this.currentPage) + 1
          }`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.allPages = data.data.pages;
        this.currentPage = data.data.page;
        this.$emit("changePage", data);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async backPage() {
      this.loading = true;

      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}${this.path}?page=${
            parseInt(this.currentPage) - 1
          }`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.allPages = data.data.pages;
        this.currentPage = data.data.page;
        this.$emit("changePage", data);
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
