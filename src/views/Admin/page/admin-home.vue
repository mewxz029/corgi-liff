<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="header ml-4">
      <v-icon color="white" large> business </v-icon>
    </div>

    <v-row class="mt-15"></v-row>
    <v-row class="mt-15"></v-row>
    <h1 class="text-center mb-5">จัดการแอดมิน</h1>

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
      <v-row>
        <v-col cols="12" sm="12" class="justify-start px-15">
          <v-row class="mb-3 justify-end">
            <add-popup-admin @getAllAuth="getAuth()" />
          </v-row>
        </v-col>
      </v-row>

      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="allAuth"
          item-key="name"
          hide-default-footer
        >
          <template v-slot:[`item.edit`]="{ item }">
            <edit-popup-admin :adminItem="item" @getAllAuth="getAuth()" />
            <delete-popup-admin :adminItem="item" @getAllAuth="getAuth()" />
          </template>
        </v-data-table>
      </v-col>

      <v-row class="mb-5">
        <pagination
          v-if="allAuth.length !== 0"
          :pageData="pageData"
          @changePage="changePage"
        />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Pagination from "../../../components/pagination.vue";
import addPopupAdmin from "../components/add-popup-admin.vue";
import EditPopupAdmin from "../components/edit-popup-admin.vue";
import DeletePopupAdmin from "../components/delete-popup-admin.vue";

export default {
  name: "Admin-home",
  components: { addPopupAdmin, Pagination, EditPopupAdmin, DeletePopupAdmin },
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "userId",
        },
        {
          text: "ชื่อ",
          value: "name",
        },
        {
          text: "ชื่อผู้ใช้",
          value: "username",
        },
        {
          text: "สถานะ",
          value: "status",
        },
        {
          text: "จัดการ",
          value: "edit",
        },
      ],
      allAuth: [],
      allPages: "",
      currentPage: "",
      pageData: {},
    };
  },
  mounted() {
    this.getAuth();
  },
  methods: {
    async getAuth() {
      this.loading = true;

      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/user/teacher-admin`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        this.allAuth = data.data.docs;
        this.allPages = data.data.totalPages;
        this.currentPage = data.data.page;
        this.pageData = {
          path: "/user/teacher-admin",
          allPages: data.data.totalPages,
          currentPage: data.data.page,
        };

        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async changePage(data) {
      this.loading = true;
      this.allAuth = data.data.docs;
      this.pageData = data;
      this.loading = false;
    },
  },
};
</script>

<style></style>
