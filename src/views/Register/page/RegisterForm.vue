<template>
  <v-container class="justify-center">
    <v-col id="main" class="px-10 justify-center">
      <v-row id="header" class="justify-center px-3">
        <h1 class="text-center">ลงทะเบียน</h1>
      </v-row>
      <v-form class="px-4" @submit.prevent="submit()" v-model="valid">
        <v-row>
          <v-text-field
            prepend-icon="person"
            v-model="form.firstname"
            label="ชื่อ"
            type="text"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            prepend-icon="person"
            v-model="form.lastname"
            label="นามสกุล"
            type="text"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            prepend-icon="phone"
            v-model="form.tel"
            label="เบอร์โทรศัพท์"
            type="tel"
            :rules="telRules"
            required
          ></v-text-field>
        </v-row>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-row class="justify-center">
                <v-btn
                  color="success"
                  depressed
                  block
                  id="submit-btn"
                  type="submit"
                  :disabled="!valid || loading"
                  v-bind="attrs"
                  v-on="on"
                >
                  ลงทะเบียน
                </v-btn>
              </v-row>
            </template>

            <v-card class="py-3 px-3" v-if="success">
              <v-card-title primary-title>ลงทะเบียนสำเร็จ</v-card-title>
              <div class="d-flex justify-center">
                <v-btn color="success" @click="closeDialog">ตกลง</v-btn>
              </div>
            </v-card>

            <v-card class="py-3 px-3" v-else>
              <v-card-title primary-title>ลงทะเบียนไม่สำเร็จ</v-card-title>
              <div class="d-flex justify-center">
                <v-btn color="error" @click="closeDialog">ตกลง</v-btn>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    loading: false,
    dialog: false,
    success: true,
    form: {
      firstname: "",
      lastname: "",
      tel: "",
      lineUid: "",
    },
    nameRules: [(v) => !!v || "ไม่สามารถเว้นว่างได้"],
    telRules: [
      (v) => !!v || "กรุณากรอกเบอร์โทรศัพท์",
      (v) => v.length === 10 || "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
      (v) => /[0]{1}[0-9]{9}/.test(v) || "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
    ],
  }),
  methods: {
    async submit() {
      this.loading = true;
      try {
        const { data } = await axios({
          method: "post",
          url: "http://localhost:3000/student",
          data: this.form,
        });

        this.createStudentCourse(data.doc._id);
        this.success = true;
        this.loading = false;
      } catch (error) {
        console.error("error", error);
        this.success = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      if (this.success) {
        this.$router.push("/");
      }
    },
    async createStudentCourse(id) {
      try {
        await axios({
          method: "post",
          url: `http://localhost:3000/student-course/`,
          data: {
            studentId: id,
            courseId: [],
            note: "first registered",
          },
        });
      } catch (error) {
        console.log();
      }
    },
  },
  mounted() {
    this.form.lineUid = this.$store.state.lineUid;
  },
};
</script>

<style scoped>
#main {
  margin-top: 50px;
}

#header {
  margin-bottom: 12px;
}

#submit-btn {
  font-size: 16px;
  font-weight: 600;
  margin-top: 35px;
  color: aliceblue;
  height: 45px;
}
</style>
