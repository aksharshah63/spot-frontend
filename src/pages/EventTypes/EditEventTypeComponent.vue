<template>
    <v-container fluid>
        <h1 class="page-title mt-10 mb-6">Edit Event Type</h1>
        <div v-if="eloading" class="loader">
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
        <v-form  v-model="isFormValid" v-else>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Event Type"
                  v-model="event_type"
                  :error-messages="eventtypeErrors"
                  required
                  @input="$v.event_type.$touch()"
                  @blur="$v.event_type.$touch()"
                ></v-text-field>
              </v-col>
              
              <v-col
                cols="12"
                sm="1"
              >
              </v-col>
            </v-row>
  
            <v-row>
              <v-btn
              depressed
              color="primary"
              @click="save()"
              :disabled="!isFormValid"
              :loading="loading"
              >
              Update
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
              </v-btn>
              <v-btn
              depressed
              color="secondary"
              class="cancel"
              @click="reset()"
              >
              Reset
              </v-btn>
              <v-btn
              depressed
              color="error"
              class="cancel"
              :to='{name:"EventTypes"}'
              >
              Cancel
            </v-btn>
          </v-row>
          </v-container>
        </v-form>
  </v-container>
  </template>
  
  <script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import axios from "axios";
  
  export default {
    name: 'EditEventTypeComponent',
    mixins: [validationMixin],
  
    validations: {
      event_type: {
        required
      },
    },
    data () {
        return {
          event_type: '',
          isFormValid: false,
          loading: false,
          eloading: false,
          id:'',
          event_type_id:'',
        }
      },
      computed: {
        eventtypeErrors() {
          const errors = []
          if (!this.$v.event_type.$dirty) return errors
          !this.$v.event_type.required && errors.push('Event Type is required.')
          return errors
        },
      },
      async mounted() {
        this.eloading = true
        this.temp=[];
        let url = window.location.href;
        this.event_type_id = url.split("/");

        var data = JSON.stringify({
            "id": this.event_type_id[6],
        });
        await axios
        .post(this.$hostname + "admin/eventType", data, {
            headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"), 
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            this.id = response.data['_id'];
            this.event_type=response.data['type'];
            this.eloading = false
        })
        .catch(() => {
            this.$toast.open({
                    message: "Event Type Not found",
                    type: "error",
            });
        });
      },
      methods: {
          reset()
          {
              this.$v.$reset()
              this.event_type='';
          },
          async save()
          {
            this.$v.$touch()
            if (this.$v.$anyError) {
              return;
            }
            try {
                this.loading=true;
                var data = JSON.stringify({
                  "id":this.id,
                  "type": this.event_type,
                });
                axios
                .post(this.$hostname + "admin/eventType/update", data, {
                  headers: {
                    "x-access-token": localStorage.getItem("adminAccessToken"), 
                    'Content-Type': 'application/json'
                  },
                })
                .then((response) => {
                  this.loading=false;
                  this.$router.push({ name: "EventTypes" });
                  this.$toast.open({
                        message: response.data.message,
                        type: "info",
                  });
                
                })
                .catch(() => {
                  this.$router.push({ name: "EventTypes" });
                  this.$toast.open({
                        message: "Something Went Wrong!",
                        type: "error",
                  });
           
                });
            } catch (e) {
              console.error(e);
            }
          }
         
      }
  }
  </script>

  