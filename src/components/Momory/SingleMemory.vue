<template>
  <div>
    <v-card class="transparent d-flex align-center" outlined tile>
      <v-img
        v-if="user_data.user_photo_url"
        :src="user_data.user_photo_url"
        :lazy-src="user_data.user_photo_url"
        width="500"
        class="cmBorder"
      />
      <v-card v-else outlined class="pa-8" width="500px">
        {{ user_data.user_message }}
      </v-card>
      <v-card-text>
        <div class="text-h5 mb-8">
          Souvenir blockchainé à vie à
          <b>{{ event.name }}</b> le
          <i>{{ new Date(user_data.updatedAt).toLocaleDateString() }}</i>
        </div>
        <router-link to="/details" class="mt-8">Details</router-link>
      </v-card-text>
    </v-card>
    <div class="d-flex justify-center my-12">
      <div
        class="teal d-flex justify-center align-center mr-3 subtitle-1 text-center white--text pa-4"
      >
        {{ event.promo_text }}
      </div>
      <div width="90" height="90">
        <v-img height="90" width="90" :src="event.promo_QR_code_url"></v-img>
      </div>
    </div>
    <v-row>
      <v-col class="d-flex child-flex mt-3">
        <v-img
          height="210px"
          width="315px"
          :src="
            user_data.user_photo_url
              ? user_data.user_photo_url
              : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
          "
          :lazy-src="
            user_data.user_photo_url
              ? user_data.user_photo_url
              : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
          "
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SingleMemory",
  data() {
    return {
      is_login: false,
      memory_id: this.$route.params.id,
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
      this.$toast.open({
        message: "Please Login to Add Your Memory",
        type: "error",
      });
    } else {
      this.is_login = true;
      if (this.memory_id) {
        this.memory_id = { memory_id: this.memory_id };
        axios
          .post(
            this.$hostname + "user/get_user_single_memory",
            this.memory_id,
            {
              headers: {
                "x-access-token": localStorage.getItem("accessToken"),
              },
            }
          )
          .then(response => {
            this.user_data = response.data;
            this.$toast.open({
              message: "User Data Fetch Succesfully",
              type: "info",
            });

            const createdat_date = new Date(this.user_data.createdAt);
            this.user_data.createdAt =
              createdat_date.getDate() +
              "/" +
              (createdat_date.getMonth() + 1) +
              "/" +
              createdat_date.getFullYear();
          })
          .catch(() => {
            this.$toast.open({
              message: "Something Went Wrong!",
              type: "error",
            });
            this.$router.push({ name: "HomeComponent" });
          });
      } else {
        this.$router.push({ name: "HomeComponent" });
      }
    }
  },
  methods: {},
  computed: {
    event() {
      const json = localStorage.getItem("event_json");

      return JSON.parse(json);
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
.v-text-field--enclosed .v-input__prepend-outer,
.v-input--selection-controls {
  margin-top: 0 !important;
}
.cmBorder {
  border: 1px solid white;
}
.tealBorder {
  border: 1px solid #009688;
}
.cursor-pointer {
  cursor: pointer;
}
.v-text-field--enclosed .v-input__prepend-outer,
.v-input--selection-controls {
  margin-top: 0 !important;
}
.cmBorder {
  border: 1px solid white;
}
.tealBorder {
  border: 1px solid #009688;
}
.tealLabel .v-input__slot {
  justify-content: center;
}
.tealLabel .v-input--selection-controls__input {
  margin-right: 20px;
}
.checkLabel {
  font-size: 1.25rem !important;
}
.checkLabel .v-icon {
  font-size: 40px;
  margin-right: 20px;
}
</style>
