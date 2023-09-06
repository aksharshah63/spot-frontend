<template>
  <div>
    <v-card class="align-center d-flex rounded-0 transparent avtar_card" outlined tile>
      <v-img
        height="90"
        width="90"
        class="rounded-circle flex-grow-0 top_event_image"
        v-if="event['photo_url']"
        :src="event['photo_url']"
      />
      <div v-if="user_data=='' || user_data==null">
        <v-card-text class="title">{{event['description']}}
          </v-card-text>
      </div>
      <div v-else>
      <div v-for="(user_data, index) in user_data" :key="index">
        <v-card-text class="title pa-0 pl-3" v-if="user_data.is_validate==0"><span class="event_name">{{event['name']}}</span><br/> Votre souvenir est en cours de validation
          </v-card-text>
          <v-card-text class="title pa-0 pl-3" v-else-if="user_data.is_validate==1"><span class="event_name">{{event['name']}}</span><br/> Souvenir déposé
              à vie le {{ new Date(event['updatedAt']).toLocaleDateString() }}
          </v-card-text>
          <v-card-text class="title pa-0 pl-3" v-else-if="user_data.is_validate==2"><span class="event_name">{{event['name']}}</span><br/> Souvenir mis 
            en pause par le modérateur le {{ new Date(event['updatedAt']).toLocaleDateString() }}
          </v-card-text>
          <v-card-text class="title pa-0 pl-3" v-else>Visite de la <span class="event_name">{{event['name']}}</span><br/> Souvenir rejeté par le modérateur le
            {{ new Date(event['updatedAt']).toLocaleDateString() }}
          </v-card-text>
      </div>
      </div>
      <!-- <v-card-text class="title"> </v-card-text> -->
    </v-card>
    <div class="text-center mt-3" v-if="user_data && user_data.length !== 0">
      <v-btn large color="teal" :to="{ name: 'AllMemoryComponent' }"> Voir tous les souvenirs</v-btn>
    </div>

    <div v-if="user_data.length != 0"
      class="d-flex align-center mt-12"
      outlined
      tile
    >
      <v-card-text class="align-center d-flex mr-2 pa-3 rounded-0 text-body-1 v-card v-card__text v-sheet v-sheet--outlined" style="background-color: #D522A8 !important;
    border-color: #D522A8 !important;">
        <b style="margin: 0 auto;color: #FFFFFF;">{{ event['promo_text'] }}</b>
      </v-card-text>
      <v-img
        v-if="event['promo_QR_code_url']"
        :src="event['promo_QR_code_url']"
        :lazy-src="event['promo_QR_code_url']"
        width=""
        class="qr_scan_img"
      />
    </div>

    <div
      v-for="(user_data, index) in user_data"
      :key="index"
      class="mt-12"
      outlined
      :to="{ name: 'SingleMemory', params: { id: user_data._id } }"
      tile
    >
      
      <v-img
        v-if="user_data.user_photo_url"
        :src="user_data.user_photo_url"
        :lazy-src="user_data.user_photo_url"
        width=""
        class="event_img"
      />
      
      <!-- <v-card v-else outlined class="pa-8" width="500px">
        {{ user_data.user_message }}
      </v-card> -->
      <v-card-text class="text-body-1">
        <b style="color: #FFFFFF;">{{ user_data.user_message }}</b>
      </v-card-text>
    </div>
    

    <v-card-actions
      v-if="!user_data || user_data.length === 0"
      class="justify-center mt-12"
    >
      <v-btn large color="teal" @click="participate"> JE PARTICIPE ! </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeComponent",
  data() {
    return {
      is_login: false,
      user_id: "",
      limit: 2,
      user_data: {},
      event_id:'',
      event:'',
    };
  },
  async mounted() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.push({ name: "UserLogin" });
    } else {
      this.is_login = true;
      await axios
        .post(
          this.$hostname + "user/get_user_memories",
          { user_id: localStorage.getItem("user_id") },
          {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          }
        )
        .then(response => {
          let data;
          if (response.data.length <= 1) {
            data = response.data;
          } else {
            data = [response.data[0]];
          }
          this.user_data = data;
          // localStorage.setItem("user_memory", JSON.stringify(data));
        })
        .catch(() => {
          this.$toast.open({
            message: "Something Went Wrong!",
            type: "error",
          });
        });

        const json = localStorage.getItem("event_json");
        this.event_id = JSON.parse(json);
        var data = JSON.stringify({
            "id": this.event_id._id,
          });
          await axios
          .post(this.$hostname + "user/get_event", data, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"), 
              'Content-Type': 'application/json'
            },
          })
          .then((response) => {
            this.event =response.data[0]
          })
          .catch(() => {});
    }
  },
  // computed: {
  //   event() {
  //     const json = localStorage.getItem("event_json");

  //     return JSON.parse(json);
  //   },
  // },
  methods: {
    participate() {
      this.$router.push({ name: "AddMemory" });
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
.front_main_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
.front_main_wrapper .v-card__title{
  width: 100%;
  text-align: center;
  display: block;
}
.front_main_wrapper .container {
  max-width: 600px;
}
.front_content_wrapper .v-main__wrap {
  padding: 0;
}
.front_content_wrapper .event_img {
  max-height: 300px;
}
.front_content_wrapper .qr_scan_img {
  max-width: 120px;
}
a.modification {
    color: #ffffff !important;
    text-decoration: none;
}
.front_main_wrapper .header-text {
  position: relative;
}
.front_main_wrapper .header-text .menu{
  position: absolute !important;
  top: 10px;
  right: 0;
}
span.event_name {
    color: #009688;
}
.front_content_wrapper .title{
    color: #FFFFFF !important;
}
.event_img .v-image__image--cover {
    background-size: contain;
}
.qr_scan_img .v-image__image--cover {
    background-size: contain;
}
.top_event_image .v-image__image--cover {
    background-size: cover !important;
}
@media screen and (max-width: 767px) {
  .front_content_wrapper .avtar_card .title{
    font-size: 1rem !important;
  }
  .front_main_wrapper .v-card__title{
  width: 100%;
  text-align: center;
  display: block;
}
.front_main_wrapper .header-text .text-h3 {
  font-size: 2.6rem !important;
}
.front_main_wrapper .title b br {
  display: none;
}
}
</style>
