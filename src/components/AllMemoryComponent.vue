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
        <div>
          <v-card-text class="title pa-0 pl-3" ><span class="event_name">{{event['name']}}</span><br/> {{images_length ? images_length : ''}} souvenirs blockchainés
            depuis le {{ new Date(event['updatedAt']).toLocaleDateString() }}
            </v-card-text>
        </div>
        <!-- <v-card-text class="title"> </v-card-text> -->
      </v-card>
  <div class="memory_images">
    <div
        v-for="(img, index) in images"
        :key="index"
        class=""
        outlined
        tile
      >
        <a target="_blank" :href="img" >
        <v-img
          :src="img"
          :lazy-src="img"
          width="80px"
          height="80px"
          class="event_images"
        />
      </a>
        
      </div>
  </div>
      
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
        event_id:'',
        event:'',
        images:[],
        images_length:'',
      };
    },
    async mounted() {
      if (localStorage.getItem("accessToken") == null) {
        this.$router.push({ name: "UserLogin" });
      } else {
        this.is_login = true;
  
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

          var data1 = {
            "uniq_code": this.event_id.uniq_code,
          }

          await axios
          .post(this.$hostname + "user/get_event_memories/", data1,{
            headers: {
              "x-access-token": localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            this.images=[];
            this.images_length = response.data.length;
            this.images = response.data.map(item => item.user_photo_url);
            this.images = this.images.filter(el => {
              return el != null && el != '';
            });
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
  };
  </script>
  <style>
  .memory_images {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 40px;
}
.memory_images .v-image__image--cover {
    background-size: contain;
}
  </style>
  