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
          <v-card-text class="title pa-0 pl-3" ><span class="event_name">{{event['name']}}</span><br/> {{images_length ? images_length : ''}} souvenirs
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
    name: "AdminAllMemoriesComponent",
    components: {
    CoolLightBox,
  },
    data() {
      return {
        user_id: "",
        limit: 2,
        user_data: {},
        event_id:'',
        event:'',
        images:[],
        images_length:'',
        dialogCompose: false,
        result:[],
        items: [],
        index: null,
        memory_date: ''
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
              this.result = response.data.data;

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

/* slider image  start */

.memory_slider .slider_image {
  display: inline-block !important;
    width: 82px !important;
    height: 82px !important;
    object-fit: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 1px;
    cursor: pointer;
}

.memory_slider .images-wrapper {
  line-height: 0;
}
.cool-lightbox .cool-lightbox-button>.cool-lightbox-button__icon {
  background: none;
}
.cool-lightbox-button--prev .cool-lightbox-button__icon {
  position: relative;
}
.cool-lightbox-button__icon::before {
  position: absolute;
  left: 10px;
  color: white;
  font-size: 30px !important;
  display: inline-block;
  font: normal normal normal 24px/1 "Material Design Icons";
}
.cool-lightbox-button--prev .cool-lightbox-button__icon::before {
  content: "\F0141";
}
.cool-lightbox-button--next .cool-lightbox-button__icon::before {
  content: "\F0142";
}
.cool-lightbox-button__icon svg {
  display: none;
}

/* slider image end */


@media screen and (max-width: 481px) {
   .memory_slider .slider_image {
      width: 60px !important;
      height: 60px !important;
      margin: 0px;
  }
}

@media screen and (max-width: 380px) {
   .memory_slider .slider_image {
      width: 49px !important;
      height: 49px !important;
      margin: 0px;
  }
}
</style>
  