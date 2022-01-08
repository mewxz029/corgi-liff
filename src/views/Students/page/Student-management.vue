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
          item-key="userId"
          hide-default-footer
        >
          <template v-slot:[`item.edit`]="{ item }">
            <detail-button-student :studentItem="item" />
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
        <pagination
          v-if="allStudent.length !== 0"
          :pageData="pageData"
          @changePage="changePage"
        />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import pagination from "../../../components/pagination.vue";
import EditPopupStudent from "../components/edit-popup-student.vue";
import DeletePopupStudent from "../components/delete-popup-student.vue";
import DetailButtonStudent from "../components/detail-button-student.vue";

export default {
  components: {
    pagination,
    EditPopupStudent,
    DeletePopupStudent,
    DetailButtonStudent,
  },
  data: () => ({
    loading: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "userId",
      },
      {
        text: "ชื่อ-สกุล",
        value: "name",
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
          url: `${process.env.VUE_APP_API_URL}/user/student`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.allStudent = data.data.docs;
        this.allPages = data.data.totalPages;
        this.currentPage = data.data.page;
        this.pageData = {
          path: "/user/student",
          allPages: data.data.totalPages,
          currentPage: data.data.page,
        };

        this.loading = false;
      } catch (error) {
        console.error("error", error);
      }
    },
    async changePage(data) {
      this.loading = true;
      this.allStudent = data.data.docs;
      this.pageData = data;
      this.loading = false;
    },
  },
};
</script>

<style></style>
