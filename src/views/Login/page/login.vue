<template>
  <v-container class="justify-center vh-100">
    <v-col id="main" class="px-10 justify-center">
      <v-form v-model="valid">
        <v-row class="justify-center">
          <h1 class="text-center text-red">LOGIN</h1>
        </v-row>
        <v-row class="justify-center mt-10">
          <v-text-field
            label="Username"
            v-model="form.username"
            :rules="usernameRules"
            type="text"
            required
          ></v-text-field>
        </v-row>
        <v-row class="justify-center mt-10">
          <v-text-field
            label="Password"
            v-model="form.password"
            :rules="passwordRules"
            type="password"
            required
          ></v-text-field>
        </v-row>
        <v-row class="mt-15">
          <v-btn
            block
            class="bg-red text-white"
            :disabled="!valid || loading"
            @click="login"
          >
            Login
          </v-btn>
        </v-row>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      form: {
        username: "",
        password: "",
      },
      usernameRules: [(v) => !!v || "ไม่สามารถเว้นว่างได้"],
      passwordRules: [(v) => !!v || "ไม่สามารถเว้นว่างได้"],
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const { data } = await axios({
          method: "post",
          url: `${process.env.VUE_APP_API_URL}admin/auth`,
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          this.loading = false;
          return this.$router.push({
            path: "/dashboard",
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
#header {
  margin-bottom: 12px;
}

h1 {
  color: #e50913;
  font-size: 25px;
  font-weight: 600;
}

.text-red {
  color: #e50913 !important;
}

.bg-red {
  background-color: #e50913 !important;
}

.vh-100 {
  height: 100vh;
}

.text-white {
  color: white;
}

.submit-btn {
  background: #e50913;
  font-size: 16px;
  font-weight: 600;
  margin-top: 35px;
  color: aliceblue;
  height: 45px;
}
</style>
