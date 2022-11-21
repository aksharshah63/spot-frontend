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
      </v-card>
  <div class="memory_images">
    <div
        v-for="(img, index) in images"
        :key="index"
        class=""
        outlined
        :to="{ name: 'SingleMemory', params: { id: user_data._id } }"
        tile
      >
        <a target="_blank" :href="img.user_photo_url" >
        <v-img
          :src="img.user_photo_url"
          :lazy-src="img.user_photo_url"
          width="80px"
          height="80px"
          class="event_images"
          v-if="img.user_photo_url != null && img.user_photo_url != ''"
        />
      </a>
        
      </div>
  </div>
      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "AdminAllMemoriesComponent",
    data() {
      return {
        user_id: "",
        limit: 2,
        user_data: {},
        event_id:'',
        event:'',
        images:[],
        images_length:'',
      };
    },
    async mounted() {
      if (localStorage.getItem("adminAccessToken") == null) {
        this.$router.push({ name: "Login" });
      } else {
        let url = window.location.href;
        this.event_id = url.split("/");

          var data = JSON.stringify({
              "event_id": this.event_id[4],
            });
            await axios
            .post(this.$hostname + "admin/event", data, {
              headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"), 
                'Content-Type': 'application/json'
              },
            })
            .then((response) => {
              this.event =response.data
            })
            .catch(() => {});

            await axios
            .get(this.$hostname + `admin/get_approved_event_memories/${this.$route.params.id}`, {
              headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"),
              },
            })
            .then((response) => {
              this.images=[];
              this.images_length = response.data.data.filter(item => item.is_validate ==1).length;
              this.images = response.data.data.filter(item => item.is_validate ==1);
              // this.images = this.images.filter(el => {
              //   return el != null && el != '';
              // });
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
  