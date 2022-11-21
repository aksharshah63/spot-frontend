<template>
  <div>
    <div class="text-center text-h6">
      Renseignez le code PIN et la CLE pour laisser votre souvenir !
    </div>
    <div class="d-flex align-center my-12">
      <v-text-field
        @keyup.enter="login"
        label="Your Pin"
        v-model="logindata.event_code"
        single-line
        outlined
        light
        background-color="white"
        color="black"
        height="50"
        hide-details
      />
      <v-icon color="white" class="mx-4"> mdi-minus </v-icon>
      <v-text-field
        @keyup.enter="login"
        label="Your Key"
        v-model="logindata.user_key"
        single-line
        outlined
        light
        background-color="white"
        color="black"
        height="50"
        hide-details
      />
    </div>
    <div class="justify-center text-center">
      <v-btn large color="teal" @click="login"> GO! </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserLogin",
  data() {
    return {
      logindata: {},
      is_login: false,
      sitekey: this.$recaptcha_site_key,
      vueWidgtId: 1,
      recaptcha_token: null,
    };
  },
  mounted() {
    window.render = this.render;
    if (localStorage.getItem("accessToken") != null) {
      this.$router.push({ name: "HomeComponent" });
      this.$toast.open({
        message: "You Are Successfully Logged In",
        type: "info",
      });
    }
  },
  methods: {
    execute() {
      window.grecaptcha.execute(this.vueWidgtId);
    },
    reset() {
      //reset using vuejs
      window.grecaptcha.reset(this.vueWidgtId);
    },
    render(response) {
      //render Functions using vuejs
      this.recaptcha_token = response;
      if (this.recaptcha_token) {
        this.$toast.open({
          message: "recaptcha Verify Successfully",
          type: "info",
        });
      } else {
        this.reset();
        this.$toast.open({
          message: "recaptcha Verify Failed",
          type: "error",
        });
      }
    },
    login() {
      if (
        this.logindata.event_code == null ||
        this.logindata.user_key == null
      ) {
        this.$toast.open({
          message: "All fields are required",
          type: "error",
        });
      } else {
        axios
          .post(this.$hostname + "auth/signin", this.logindata)
          .then(response => {
            this.$toast.open({
              message: "User login Succesfully",
              type: "info",
            });
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("is_admin", response.data.is_admin);
            localStorage.setItem(
              "event_json",
              JSON.stringify(response.data.event)
            );
            this.is_login = true;
            this.$router.push({ name: "HomeComponent" });
          })
          .catch(() => {
            this.$toast.open({
              message: "User Not Found!",
              type: "error",
            });

            this.reset();
            this.logindata = {};
            this.recaptcha_token = null;
          });
      }
    },
  },
};
</script>
