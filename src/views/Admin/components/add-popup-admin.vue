<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class=""
        dark
        small
        color="green"
        v-bind="attrs"
        v-on="on"
        :block="$vuetify.breakpoint.mobile"
      >
        <v-icon left>add</v-icon>
        เพิ่มแอดมิน
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="teal darken-1 text-white">เพิ่มแอดมิน</v-card-title>
      <div class="mt-10">
        <v-card-text
          v-if="isUsed"
          class="mt-0 mb-0 text-center"
          id="text-alert-isuser"
          >ชื่อผู้ใช้ถูกใช้งานแล้ว</v-card-text
        >
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="person"
                :rules="usernameRules"
                v-model="form.name"
                label="ชื่อ"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="person"
                :rules="usernameRules"
                v-model="form.username"
                @change="isUsed = false"
                label="Username"
                type="text"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="password"
                :rules="passwordRules"
                v-model="form.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="password"
                :rules="confirmPasswordRules"
                v-model="form.confirmPassword"
                label="Confirm Password"
                type="password"
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
          @click="createAdmin()"
          :disabled="!valid || loading"
        >
          ตกลง
        </v-btn>

        <v-btn color="error" text @click="clearForm()"> ยกเลิก </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      dialog: false,
      isUsed: false,
      form: {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      usernameRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
      passwordRules: [(v) => !!v || "กรุณาตั้งรหัสผ่าน"],
      confirmPasswordRules: [
        (v) => v === this.form.password || "รหัสผ่านไม่ถูกต้อง",
      ],
    };
  },
  methods: {
    clearForm() {
      this.form.name = "";
      this.form.username = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.dialog = false;
    },
    async createAdmin() {
      await this.checkUsername();
      this.loading = true;
      if (!this.isUsed) {
        try {
          await axios({
            method: "post",
            url: "http://localhost:3000/admin/",
            data: {
              name: this.form.name,
              username: this.form.username,
              password: this.form.password,
            },
            headers: { Authorization: `Bearer ${localStorage.token}` },
          });
          this.form.name = "";
          this.form.username = "";
          this.form.password = "";
          this.form.confirmPassword = "";
          this.loading = false;
          this.dialog = false;
          this.$emit("getAllAuth");
        } catch (err) {
          console.error(err);
        }
      }
      this.form.username = "";
      this.loading = false;
    },
    async checkUsername() {
      try {
        const { data } = await axios({
          method: "post",
          url: "http://localhost:3000/admin/check",
          data: {
            username: this.form.username,
          },
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });

        if (data.data.used) {
          this.isUsed = true;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
#text-alert-isuser {
  color: #e50913;
  margin-top: 30px;
  font-weight: 300;
}
.text-white {
  color: white !important;
}
</style>
