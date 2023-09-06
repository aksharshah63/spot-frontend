<template>
   <v-stepper v-model="e1" dark class="transparent" height="600px;" style="box-shadow: unset;">
        <v-stepper-items>
            <v-stepper-content step="4" class="pa-0">
        <div class="">
          <div class="teal--text checkLabel text-center mb-6 pa-3">
            <v-icon color="teal mb-6 pa-3"> mdi-checkbox-outline</v-icon>
            <span class="mb-6 pa-3">Félicitations !</span>
          </div>
          <v-card-text class="title teal--text text-center pt-0 mb-6 pa-3 text-desc">
            On se souviendra de vous pour la <br/>vie à <span class="event_name">{{ event['name'] }}</span>
          </v-card-text>
        </div>
        <div class="d-flex align-center mt-12" outlined
      tile>
          <!-- <div
            class="d-flex justify-center align-center mr-3 subtitle-1 text-center white--text" style="
    background-color: #D522A8 !important;
    border-color: #D522A8 !important;
    padding: 10px;
"
          >
            {{ event['promo_text'] }}
          </div> -->
      <v-card-text class="align-center d-flex mr-2 pa-3 rounded-0 text-body-1 v-card v-card__text v-sheet v-sheet--outlined" style="background-color: #D522A8 !important;
    border-color: #D522A8 !important;">
        <b style="margin: 0 auto;color: #FFFFFF;">{{ event['promo_text'] }}</b>
      </v-card-text>
          <!-- <div width="90" height="90"> -->
            <v-img
              :lazy-src="event['promo_QR_code_url']"
              height=""
              width=""
              :src="event['promo_QR_code_url']"
              class="event_img"
              style="
    max-width: 120px;
"
            ></v-img>
          <!-- </div> -->
        </div>
        <v-card-text class="pa-0 text-h6 mt-3 text-center">
          <div class="teal--text"></div>
        </v-card-text>
        <p class="text-center">
          
        </p>
        <p class="text-center">
          
        </p>
        <v-card-actions class="justify-center" @click="homepage">
          <v-btn large color="teal">
            Voir mon souvenir
          </v-btn>
        </v-card-actions>
        <v-card-text class="text-right pa-0" @click="homepage">
        </v-card-text
        >
      </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleViewMemory",
  data() {
    return {
      is_login: false,
      submitbutton: true,
      e1: 4,
      user_data: {
        email: "",
        user_photo_url: "",
        user_message: "",
        digital_work_toureiffel: false,
        fondation_tout_eiffel: false,
        i_validate_the_cgv_standards: false,
      },
      user_image_url: "",
      uploadValue: null,
      user_image: null,
      percentage: null,
      event_id:'',
      event:'',
    };
  },  
  async mounted() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.push({ name: "UserLogin" });
      this.$toast.open({
        message: "Please Login to Add Your Memory",
        type: "error",
      });
    } else {
      this.is_login = true;
    }
    
    if(localStorage.getItem("user_memory") === "true" && window.location.search!=="?check=true") {
        this.$router.push({ name: "HomeComponent" });
    }

    // await axios
    //   .post(
    //     this.$hostname + "user/get_user_memories",
    //     { user_id: localStorage.getItem("user_id") },
    //     {
    //       headers: {
    //         "x-access-token": localStorage.getItem("accessToken"),
    //       },
    //     }
    //   )
    //   .then(response => {
    //     let data;
    //     if (response.data.length <= 1) {
    //       data = response.data;
    //     } else {
    //       data = [response.data[0]];
    //     }
    //     this.user_data = data;
    //     if(this.user_data.length!=0)
    //     {
    //       this.$router.push({ name: "HomeComponent" });
    //     }
    //     // localStorage.setItem("user_memory", JSON.stringify(data));
    //   })
    //   .catch(() => {
    //   });

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
            localStorage.setItem(
              "event_json",
              JSON.stringify(response.data[0])
            );
          })
          .catch(() => {});
  },
  methods:
  {
    homepage() {
      this.$router.push({ name: "HomeComponent" });
    },
  }
}
</script>
