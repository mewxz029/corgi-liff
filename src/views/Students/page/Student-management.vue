<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="header ml-4">
      <v-icon color="black" large>people</v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-15"></v-row>
    <h1 class="text-center mb-5">จัดการนักเรียน</h1>

    <v-row class="d-flex justify-center">
      <v-img
        v-if="loading"
        alt=""
        max-height="105"
        max-width="105"
        :src="require('../../../assets/loading.gif')"
      ></v-img>
    </v-row>

    <v-row class="mt-15">
      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="allStudent"
          item-key="_id"
          hide-default-footer
        >
          <template v-slot:[`item.edit`]="{ item }">
            <edit-popup-student
              :studentItem="item"
              @getStudent="getStudent()"
            />
            <delete-popup-student
              :studentItem="item"
              @getStudent="getStudent()"
            />
          </template>
        </v-data-table>
      </v-col>

      <v-row class="mb-5">
        <pagination :pageData="pageData" @changePage="changePage" />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import pagination from "../../../components/pagination.vue";
import EditPopupStudent from "../components/edit-popup-student.vue";
import DeletePopupStudent from "../components/delete-popup-student.vue";

export default {
  components: { pagination, EditPopupStudent, DeletePopupStudent },
  data: () => ({
    loading: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "_id",
      },
      {
        text: "ชื่อ",
        value: "firstname",
      },
      {
        text: "นามสกุล",
        value: "lastname",
      },
      {
        text: "เบอร์โทรศัพท์",
        value: "tel",
      },
      {
        text: "จัดการ",
        value: "edit",
      },
    ],
    allStudent: [],
    allPages: "",
    currentPage: "",
    pageData: {},
  }),
  mounted() {
    this.getStudent();
  },
  methods: {
    async getStudent() {
      this.loading = true;

      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/student",
        });
        this.allStudent = data.data.results;

        this.allPages = data.data.pages;
        this.currentPage = data.data.page;
        this.pageData = {
          path: "admin",
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
      this.allAuth = data.data.results;
      this.pageData = data;
      this.loading = false;
    },
  },
};
</script>

<style></style>
