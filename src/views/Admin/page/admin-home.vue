<template>
  <v-container class="rounded elevation-3 mt-12">
    <div class="header ml-4">
      <v-icon color="white" large> business </v-icon>
    </div>
    <div class="d-flex justify-end align-center mx-10"></div>

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
          <v-row class="mb-3 justify-end"> </v-row>
        </v-col>
      </v-row>

      <v-col cols="12" class="px-10 mb-5">
        <v-data-table
          :headers="headers"
          :items="allAuth"
          item-key="name"
          hide-default-footer
        >
          <!-- <template v-slot:[`item.edit`]="{ item }">
              
            </template> -->
        </v-data-table>
      </v-col>

      <v-row class="mb-5">

      </v-row>

    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
