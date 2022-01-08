<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" class="mr-3"> edit </v-icon>
    </template>

    <v-card>
      <v-card-title dark class="deep-purple darken-4 text-white">
        แก้ไข {{ studentItem.name }}
      </v-card-title>
      <div class="mt-10">
        <v-form v-model="valid">
          <v-row class="justify-center">
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="person"
                :rules="nameRules"
                v-model="form.name"
                label="ชื่อ-สกุล"
                type="text"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="10" class="mb-0">
              <v-text-field
                prepend-icon="phone"
                :rules="telRules"
                v-model="form.tel"
                label="เบอร์โทรศัพท์"
                type="tel"
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
          @click="authUpdate(studentItem.userId)"
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
    studentItem: {
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
        tel: "",
      },
      nameRules: [(v) => !!v || "กรุณาใส่ข้อความ"],
      telRules: [
        (v) => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        (v) => v.length === 10 || "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
        (v) => /[0]{1}[0-9]{9}/.test(v) || "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const { data } = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API_URL}/user/${this.studentItem.userId}`,
        });
        this.form.name = data.data.name;
        this.form.tel = data.data.tel;
      } catch (error) {
        console.error(error);
      }
    },
    async authUpdate(studentId) {
      try {
        await axios({
          method: "put",
          url: `${process.env.VUE_APP_API_URL}/user/${studentId}`,
          data: {
            name: this.form.name,
            tel: this.form.tel,
          },
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
