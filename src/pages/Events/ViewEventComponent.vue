<template>
    <v-container fluid>
        <h1 class="page-title mt-10 mb-6">View Event</h1>
        <div v-if="loading" class="loader">
            <svg width="200px" height="200px"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
                <circle cx="75" cy="50" fill="#363a3c" r="6.39718">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.875s"></animate>
                </circle>
                <circle cx="67.678" cy="67.678" fill="#363a3c" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate>
                </circle>
                <circle cx="50" cy="75" fill="#363a3c" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.625s"></animate>
                </circle>
                <circle cx="32.322" cy="67.678" fill="#363a3c" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate>
                </circle>
                <circle cx="25" cy="50" fill="#363a3c" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.375s"></animate>
                </circle>
                <circle cx="32.322" cy="32.322" fill="#363a3c" r="4.80282">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate>
                </circle>
                <circle cx="50" cy="25" fill="#363a3c" r="6.40282">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.125s"></animate>
                </circle>
                <circle cx="67.678" cy="32.322" fill="#363a3c" r="7.99718">
                    <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate>
                </circle>
            </svg>
        </div>
        <v-form v-else>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
              >
               <label class="sm-3 eventtext">Event Code:- </label>
               <label class="sm-3 eventvalue">{{result['uniq_code']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
               <label class="sm-3 eventtext">Event Name:- </label>
               <label class="sm-3 eventvalue">{{result['name']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
               <label class="sm-3 eventtext">Event Type:- </label>
               <label class="sm-3 eventvalue">{{result['type']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                class="event_image"
              >
               <label class="sm-3 eventtext">Event Image:- </label>
               <label class="sm-3 eventvalue"><img :src="result['photo_url']" style="width: 200px; height: 200px" /></label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                class="event_image"
              >
               <label class="sm-3 eventtext">Event QR Code Image:- </label>
               <label class="sm-3 eventvalue"><img :src="result['promo_QR_code_url']" style="width: 200px; height: 200px" /></label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Event Description:- </label>
               <label class="sm-3 eventvalue">{{result['description']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Event Date:- </label>
               <label class="sm-3 eventvalue">{{result['date']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Event Location:- </label>
               <label class="sm-3 eventvalue">{{result['location']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Event Promo Text:- </label>
               <label class="sm-3 eventvalue">{{result['promo_text']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Event Organizer Email ID:- </label>
               <label class="sm-3 eventvalue">{{result['email']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Wallet Balance:- </label>
               <label class="sm-3 eventvalue">{{result['wallet_balance']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Memory Upload Charges:- </label>
               <label class="sm-3 eventvalue">{{result['memory_charges']}}</label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">URL:- </label>
               <label class="sm-3 eventvalue"><a :href="result['event_link']" target="blank">{{result['event_link']}}</a></label>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
               <label class="sm-3 eventtext">Auto approval:- </label>
               <label class="sm-3 eventvalue">{{result['auto_validate'] ? "Yes" : "No"}}</label>
              </v-col>
            </v-row>
  
            <v-row>
              <v-btn
              depressed
              color="error"
              class="cancel"
              :to='{name:"Events"}'
              >
              Back
            </v-btn>
          </v-row>
          </v-container>
        </v-form>
  </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'AddEventComponent',
    
    data () {
        return {
          result:[],
          event_id:'',
          loading: false
        }
      },
      async mounted() {
        this.loading = true
        let url = window.location.href;
        this.event_id = url.split("/");
        var data = JSON.stringify({
                "event_id": this.event_id[6],
        });
        axios
        .post(this.$hostname + "admin/event", data, {
            headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"), 
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            this.result = response.data
            this.loading = false
        })
        .catch(() => {
            this.$toast.open({
                    message: "Something Went Wrong!",
                    type: "error",
            });
        });
      },
  }
  </script>
  