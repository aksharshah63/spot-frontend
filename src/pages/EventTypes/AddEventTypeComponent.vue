<template>
    <v-container fluid>
        <h1 class="page-title mt-10 mb-6">Add Event Type</h1>
        <v-form  v-model="isFormValid">
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
            </v-row>
  
            <v-row>
              <v-btn
              depressed
              color="primary"
              @click="save()"
              :disabled="!isFormValid"
              :loading="loading"
              >
              Save
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
    name: 'AddEventTypeComponent',
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
                  "type": this.event_type,
                });
                axios
                .post(this.$hostname + "admin/eventType/create", data, {
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