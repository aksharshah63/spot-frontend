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
          <v-card-text class="title pa-0 pl-3" ><span class="event_name">{{event['name']}}</span><br/> {{images_length ? images_length : ''}} souvenirs déposés
            depuis le {{ memory_date ? new Date(memory_date).toLocaleDateString() : event['date']}}
            </v-card-text>
        </div>
      </v-card>
  <div class="memory_images">
    <div class="memory_slider">
      <CoolLightBox 
        :items="items" 
        :index="index"
        @close="index = null">
      </CoolLightBox>

      <div class="images-wrapper">
        <div
          class="slider_image"
          v-for="(image, imageIndex) in items"
          :key="imageIndex"
          @click="index = imageIndex"
          :style="{ backgroundImage: 'url(' + image.src + ')' }"
        ></div>
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
  export default {
    name: "HomeComponent",
    components: {
    CoolLightBox,
  },
    data() {
      return {
        is_login: false,
        user_id: "",
        limit: 2,
        event_id:'',
        event:'',
        images:[],
        images_length:'',
        dialogCompose: false,
        items: [],
        index: null,
        memory_date: ''
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
            this.images_length = response.data.filter(item => item.is_validate ==1).length;
            this.images = response.data.filter(item => item.is_validate ==1);
            this.result = response.data;

            this.result.forEach(element => {
                if(element.event.first_memory && element.event.first_memory != undefined)
                {
                  this.memory_date = element.event.first_memory;
                  return true
                }
              })
              
              this.result.forEach(element => {
                if(element.is_validate==1)
                {
                  if(element.user_photo_url=='' || element.user_photo_url==null)
                  {
                    this.items.push({title: element.user_message,src: "https://firebasestorage.googleapis.com/v0/b/spot-55221.appspot.com/o/Text_Icon.jpg?alt=media&token=8274f065-af06-4e48-9f96-b5bc2aeaed65"})
                  }
                  else
                  {
                    this.items.push({title: element.user_message,src: element.user_photo_url})
                  }
                }
              });
          })
          .catch(() => {});

      }
    },
    methods: {
      saveDraft() {
          this.dialogCompose = false
      },
    },
  };
  </script>
  <style>
  .memory_images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 40px;
    gap: 1px;
}
.memory_images .v-image__image--cover {
    background-size: cover;
}
  </style>
  