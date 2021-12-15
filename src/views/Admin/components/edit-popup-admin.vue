<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" class="mr-3"> edit </v-icon>
    </template>

    <v-card>
      <v-card-title dark class="deep-purple darken-4 text-white">
        แก้ไข {{ adminItem.username }}
      </v-card-title>
      <div class="mt-10">
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="person"
                :rules="nameRules"
                v-model="form.name"
                label="ชื่อ"
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
          @click="authUpdate(adminItem._id)"
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
    adminItem: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
      dialog: false,
      form: {
        name: "",
      },
      nameRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const result = await axios({
          method: "get",
          url: `http://localhost:3000/admin/${this.adminItem._id}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        this.form.name = result.data.data.name;
      } catch (error) {
        console.error(error);
      }
    },
    async authUpdate(adminId) {
      try {
        await axios({
          method: "put",
          url: `http://localhost:3000/admin/${adminId}`,
          headers: { Authorization: `Bearer ${localStorage.token}` },
          data: {
            name: this.form.name,
          },
        });

        this.dialog = false;
        this.$emit("getAllAuth");
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
