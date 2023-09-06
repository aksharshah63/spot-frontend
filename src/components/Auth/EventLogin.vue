<template>
     <div>
    <v-card class="align-center d-flex rounded-0 transparent avtar_card" outlined tile>
      <v-img
        height="90"
        width="90"
        class="rounded-circle flex-grow-0 top_event_image"
        :src="user_data['image']"
      />
      <div>
        <v-card-text class="title">{{user_data['description']}}
          </v-card-text>
      </div>
    </v-card>
    <div class="d-flex align-center my-12">
      <v-text-field
        @keyup.enter="login"
        label="Ton code ici"
        v-model="user_key"
        single-line
        outlined
        light
        background-color="white"
        color="black"
        height="50"
        hide-details
        class="event_login"
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
  name: "EventLogin",
  data() {
    return {
      is_login: false,
      user_id: "",
      limit: 2,
      user_data: {},
      event_id:'',
      event:'',
      user_key:'',
      code: '',
    };
  },
  async mounted() {
    let url = window.location.href;
    this.code = url.split("/");
    var data = ({
        id :this.code[3]
    });
    await axios
        .post(this.$hostname + "user/get_event_data", data)
        .then(response => {
        this.user_data = response.data;
        })
        .catch(() => {
        this.$toast.open({
            message: "Something Went Wrong!",
            type: "error",
          });
        });
  },
  methods: {
    login() {
      if (this.user_key == '') {
        this.$toast.open({
          message: "Code is required",
          type: "error",
        });
      } else {
        var data1 = ({
            event_code :this.code[3],
            user_key: this.user_key
        });
        axios
          .post(this.$hostname + "auth/signin", data1)
          .then(response => {
            this.$toast.open({
              message: "User login Succesfully",
              type: "info",
            });
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("user_role", "user");
            localStorage.setItem("url", window.location.href);
            localStorage.setItem(
              "event_json",
              JSON.stringify(response.data.event)
            );
            this.is_login = true;
            localStorage.setItem("user_memory",response.data.user_memory)
            this.$router.push({ name: "AddMemory", query:{check:response.data.user_memory} });
          })
          .catch(() => {
            this.$toast.open({
              message: "User Not Found!",
              type: "error",
            });

            this.user_key = '';
            this.recaptcha_token = null;
          });
      }
    },
  }

}

</script>

<style>
.event_login {
  width: 100%;
  max-width: 200px;
  margin: 0 auto !important;
}
</style>