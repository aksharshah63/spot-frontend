<template>
    <div>
      <div
        outlined
            tile
      >
        <v-card-text class="mb-6 pa-3 title text-center">
          <b>Nous savons que vous aimez les <br/>
            <span class="event_name">{{event['type']}}</span></b>
        </v-card-text>
        <v-card-text class="mb-6 pa-3 title text-center">
          <b>  &#128526;  Bonne nouvelle !</b>
          
        </v-card-text>
        <v-card-text class="mb-6 pa-3 title text-center">
          <b>Notre équipe vous a déniché de<br/> nombreux bons plans parmi<br/> nos partenaires !</b>
        </v-card-text>
      </div>

      <v-card-actions
        class="justify-center mt-12"
      > 
        <v-btn large color="teal" style="height: auto" class="cm_btn">
           <v-icon style="font-size:50px">mdi-plus</v-icon> 
           <span style="line-height: 1.5">Votre prochain Spot<br/> jusqu’à -70%</span> 
        </v-btn>
      </v-card-actions>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "BonusPlanComponent",
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
  };
</script>
  <style>
.cm_btn.v-btn.v-btn {
  padding: 15px 10px;

}
  @media screen and (max-width: 767px) {
    
  }
  </style>
  