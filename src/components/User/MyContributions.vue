<template>
<v-app>
    <v-main style="background: #1b192e">
      <v-container
        tag="div"
        style="height: 100%"
        class="d-flex justify-center align-center"
      >
  <div>
    <v-card tile dark outline class="pa-md-10 pa-5 cardColor">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card class="transparent d-flex justify-end" outlined tile>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-cog</v-icon>
          </template>
          <v-list>
            <router-link
              :to="item.url"
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </v-card>
      <v-card-title class="text-h3 justify-center">
        <span class="font-weight-black">Spot</span
        ><span class="font-weight-thin">Chain</span>
      </v-card-title>
      <v-card-text class="pa-0 text-h6 my-5 text-center">
        <div class="teal--text">Mes contributions</div>
      </v-card-text>

      <v-row>
        <v-col
          v-for="(user_image, index) in user_data"
          :key="index"
          class="d-flex child-flex"
          cols="4"
        >
          <router-link
            :to="{ name: 'SingleMemory', params: { id: user_image._id } }"
          >
            <v-img
              :src="
                user_image.user_photo_url
                  ? user_image.user_photo_url
                  : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
              "
              :lazy-src="user_image.user_photo_url"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </router-link>
        </v-col>
        <v-col @click="add_new_memory">
          <div
            color="teal"
            class="teal d-flex justify-center align-center"
            style="height: 100%"
          >
            <v-icon class="text-h2">mdi-plus</v-icon>
            <span>Trouvez votre prochain Spot ! jusqu’à -70% </span>
          </div>
        </v-col>
      </v-row>

      <div class="text-center">
        <v-btn @click="logout" color="teal" class="mt-5">logout</v-btn>
      </div>
    </v-card>
  </div>
  </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "MyContributions",
  data() {
    return {
      is_login: false,
      user_id: "",
      limit:6,
      user_data: {},
      items: [
        { title: "-Home", url: "/" },
        { title: "-Tous mes spots (contributions)", url: "/mycontributions" },
        { title: "-Mes bons plans", url: "/" },
        { title: "-Mon identité", url: "/" },
        { title: "-Mes Préférences (Optin,...)", url: "/" },
        { title: "-Modifs (suppression, mdp, )", url: "/" },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.push({ name: "UserLogin" });
    } else {
      this.is_login = true;
      axios
        .post(this.$hostname + "user/get_user_memories",{'limit':this.limit,'user_id':localStorage.getItem("user_id")}, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          this.user_data = response.data;
          this.$toast.open({
            message: "User Data Fetch Succesfully",
            type: "info",
          });
        })
        .catch(() => {
          this.$toast.open({
            message: "Something Went Wrong!",
            type: "error",
          });
        });
    }
  },
  methods: {
    add_new_memory() {
      this.$router.push({ name: "AddMemory" });
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("_grecaptcha");
      localStorage.removeItem("user_role");
      this.is_login = false;
      this.$toast.open({
        message: "User Successfully Logout",
        type: "info",
      });
      this.$router.push({ name: "UserLogin" });
    },
  },
};
</script>
<style>
.cardColor {
  background-color: rgba(255, 255, 255, 0) !important;
  /* border-color: white !important;
  border-style: solid;
  border-width: 2px; */
}
</style>