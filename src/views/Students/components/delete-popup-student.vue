<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" color="red">delete</v-icon>
    </template>

    <v-card>
      <v-card-title class="red darken-1 text-white">
        คุณต้องการลบ {{ studentItem.firstname }} ?
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red" text @click="studentDelete(studentItem._id)">
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
    };
  },
  methods: {
    async studentDelete(studentId) {
      try {
        await axios({
          method: "delete",
          url: `http://localhost:3000/student/${studentId}`,
        });

        this.dialog = false;
        this.$emit("getStudent");
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
