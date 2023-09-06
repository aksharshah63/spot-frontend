<template>
    <v-container fluid>
        <h1 class="page-title mt-10 mb-6">Edit Event</h1>
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
                sm="4"
              >
                <v-text-field
                  label="Event Code"
                  v-model="event_code"
                  :error-messages="eventcodeErrors"
                  required
                  @input="$v.event_code.$touch()"
                  @blur="$v.event_code.$touch()"
                  readonly
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                sm="4"
              >
                <v-text-field
                  label="Name"
                  v-model="event_name"
                  :error-messages="nameErrors"
                  required
                  @input="$v.event_name.$touch()"
                  @blur="$v.event_name.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-select
                  label="Type"
                  :items="items"
                  :error-messages="typeErrors"
                  required
                  @input="$v.event_type.$touch()"
                  @blur="$v.event_type.$touch()"
                  v-model="event_type"
                  class="event_type"
                  dense
                ></v-select>
              </v-col>
  
              <v-col
                cols="12"
                sm="6"
              >
                <v-file-input
                  accept="image/png, image/jpeg, image/jpg"
                  label="Image"
                  v-model="event_image"
                ></v-file-input>
                <img :src="event_image_url" style="width: 200px; height: 200px" />
              </v-col>
              
              <v-col
                cols="12"
                sm="6"
              >
                <v-file-input
                  accept="image/png, image/jpeg, image/jpg"
                  label="Promo QR Code"
                  v-model="qrcode_image"
                ></v-file-input>
                <img :src="qrcode_image_url" style="width: 200px; height: 200px" />
              </v-col>
  
              <v-col
                  cols="12"
                  sm="6"
              >
                  <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="date"
                              label="Date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="dateErrors"
                              required
                              @input="$v.date.$touch()"
                              @blur="$v.date.$touch()"
                          ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="date"
                          @input="menu2 = false"
                          :min="new Date().toISOString().substr(0, 10)"
                      ></v-date-picker>
                  </v-menu>
              </v-col>
  
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Location"
                  v-model="location"
                  :error-messages="locationErrors"
                  required
                  @input="$v.location.$touch()"
                  @blur="$v.location.$touch()"
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Promo Text"
                  v-model="promo_text"
                  :error-messages="promotextErrors"
                  required
                  @input="$v.promo_text.$touch()"
                  @blur="$v.promo_text.$touch()"
                ></v-text-field>
              </v-col>
  
              <v-col
                  cols="12"
                  sm="6"
              >
                  <v-textarea
                  label="Description"
                  rows="1"
                  v-model="description"
                  :error-messages="descriptionErrors"
                  required
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                  ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
            <v-text-field
              label="Event Organizer Email ID"
              v-model="email"
              :error-messages="emailErrors"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              type="password"
              label="Event Organizer Password"
              v-model="password"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              type="number"
              label="Wallet Balance"
              v-model="wallet_balance"
              :error-messages="wallet_balanceErrors"
              required
              @input="$v.wallet_balance.$touch()"
              @blur="$v.wallet_balance.$touch()"
              min="1"
              id="test"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              type="number"
              label="Memory Upload Charges"
              v-model="memory_charge"
              :error-messages="memory_chargeErrors"
              required
              @input="$v.memory_charge.$touch()"
              @blur="$v.memory_charge.$touch()"
              min="1"
              id="test"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-switch
              v-model="auto_validate"
              :label="`Auto approval`"
            ></v-switch>
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
              :to='{name:"Events"}'
              >
              Cancel
            </v-btn>
          </v-row>
          </v-container>
        </v-form>
  </v-container>
  </template>
  
  <script>
  import { storage } from "../../main";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import axios from "axios";
  
  export default {
    name: 'AddEventComponent',
    mixins: [validationMixin],
  
    validations: {
      event_code: {
        required
      },
      event_name: {
        required
      },
      event_type: {
        required,
      },
      description:{
        required
      },
      date:{
        required
      },
      location:{
        required
      },
      promo_text:{
        required
      },
      email: {
        required,
      },
      wallet_balance: {
        required,
      },
      memory_charge: {
        required,
      },
    },
    data () {
        return {
          event_code: '',
          event_name: '',
          event_type: [],
          description: '',
          date:'',
          location: '',
          promo_text: '',
          menu2: false,
          event_image:null,
          event_image_url:null,
          percentage: '',
          qrcode_image:null,
          qrcode_image_url:null,
          isFormValid: false,
          loading: false,
          result:[],
          temp:[],
          event_id:'',
          eloading: false,
          id:'',
          result1: [],
          items: [],
          email: "",
          password: "",
          wallet_balance: "",
          memory_charge: "",
          auto_validate: false,
        }
      },
      computed: {
        eventcodeErrors() {
          const errors = []
          if (!this.$v.event_code.$dirty) return errors
          !this.$v.event_code.required && errors.push('Event Code is required.')
          return errors
        },
        nameErrors() {
          const errors = []
          if (!this.$v.event_name.$dirty) return errors
          !this.$v.event_name.required && errors.push('Event Name is required.')
          return errors
        },
        typeErrors() {
          const errors = [];
          if (!this.$v.event_type.$dirty) return errors;
          !this.$v.event_type.required && errors.push("Event Type is required.");
          return errors;
        },
        descriptionErrors() {
          const errors = []
          if (!this.$v.description.$dirty) return errors
          !this.$v.description.required && errors.push('Description is required.')
          return errors
        },
        dateErrors() {
          const errors = []
          if (!this.$v.date.$dirty) return errors
          !this.$v.date.required && errors.push('Date is required.')
          return errors
        },
        locationErrors() {
          const errors = []
          if (!this.$v.location.$dirty) return errors
          !this.$v.location.required && errors.push('Location is required.')
          return errors
        },
        promotextErrors() {
          const errors = []
          if (!this.$v.promo_text.$dirty) return errors
          !this.$v.promo_text.required && errors.push('Promo Text is required.')
          return errors
        },
        // qrcodeimageErrors() {
        //   const errors = []
        //   if (!this.$v.qrcode_image.$dirty) return errors
        //   !this.$v.qrcode_image.required && errors.push('QR Code Image is required.')
        //   return errors
        // },
        emailErrors() {
          const errors = [];
          if (!this.$v.email.$dirty) return errors;
          !this.$v.email.required && errors.push("Email is required.");
          return errors;
        },
        wallet_balanceErrors() {
          const errors = [];
          if (!this.$v.wallet_balance.$dirty) return errors;
          !this.$v.wallet_balance.required && errors.push("Wallet Balance is required.");
          return errors;
        },
        memory_chargeErrors() {
          const errors = [];
          if (!this.$v.memory_charge.$dirty) return errors;
          !this.$v.memory_charge.required && errors.push("Memory Charge is required.");
          return errors;
        },
      },
      async mounted() {
        this.eloading = true
        this.temp=[];
        let url = window.location.href;
        this.event_id = url.split("/");
        // await axios
        //   .get(this.$hostname + "admin/events", {
        //     headers: {
        //       "x-access-token": localStorage.getItem("adminAccessToken"),
        //     },
        //   })
        //   .then((response) => {
        //     this.result = response.data.data
        //     this.temp= this.result.filter(item => item.uniq_code).map(x => x.uniq_code)
        //   })
        //   .catch(() => {});

            var data = JSON.stringify({
                "event_id": this.event_id[6],
            });
            await axios
            .post(this.$hostname + "admin/event", data, {
                headers: {
                    "x-access-token": localStorage.getItem("adminAccessToken"), 
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                let date = response.data['date']
                let edate = date.split("/")
                this.id = response.data['_id'];
                this.event_code=response.data['uniq_code'];
                this.event_name=response.data['name'];
                this.event_type=response.data['type'];
                this.event_image_url=response.data['photo_url'];
                this.description=response.data['description'];
                this.date=edate[2]+"-"+edate[1].padStart(2, '0')+"-"+edate[0].padStart(2, '0')
                this.location=response.data['location'];
                this.promo_text=response.data['promo_text'];
                this.qrcode_image_url=response.data['promo_QR_code_url'];
                this.email = response.data['email'];
                this.wallet_balance = response.data['wallet_balance'];
                this.memory_charge = response.data['memory_charges'];
                this.auto_validate = response.data['auto_validate'];
                this.eloading = false
            })
            .catch(() => {
                this.$toast.open({
                        message: "Something Went Wrong!",
                        type: "error",
                });
            });

            await axios
            .get(this.$hostname + "admin/eventTypes", {
              headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"),
              },
            })
            .then(response => {
              this.result1 = response.data.data;
              this.items = this.result1
                .filter(item => item.type)
                .map(x => x.type);
            })
            .catch(() => {});
      },
      methods: {
          reset()
          {
              this.$v.$reset()
              this.event_code='';
              this.event_name='';
              this.event_type='';
              this.event_image=null;
              this.description='';
              this.date='';
              this.location='';
              this.promo_text='';
              this.qrcode_image=null;
              this.email='';
              this.password='';
              this.wallet_balance='';
              this.memory_charge='';
          },
          async image_upload(test1,test2) {
            return new Promise((resolve, reject) => {
              const storageRef = ref(
                storage,
                `Events/${test1}/${test2.name}`
              );
              const uploadTask = uploadBytesResumable(
                storageRef,
                test2
              );
  
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  this.percentage = percent;
                },
                (err) => {
                  reject(err);
                },
                async () => {
                  await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    if(test1 == 'Event_images'){
                      this.event_image_url = url;
                    }
                    else if(test1 == 'QRCode_images'){
                      this.qrcode_image_url= url
                    }
                    resolve();
                  });
                }
              );
            });
          },
          async save()
          {
            this.$v.$touch()
            if (this.$v.$anyError) {
              return;
            }
            try {
              // if(this.temp.includes(this.event_code))
              // {
              //   this.$toast.open({
              //         message: "Failed! Event Code is already in use!",
              //         type: "error",
              //   });
              //   window.location.reload();
              //   return;
              // }
              // else 
              // {
                this.loading=true;
                if (this.event_image) {
                  await this.image_upload('Event_images',this.event_image)
                } 
                if (this.qrcode_image) {
                  await this.image_upload('QRCode_images',this.qrcode_image)
                }
                const d = new Date(this.date);
                let day = d.getDate()
                let month = String(d.getMonth() + 1).padStart(2, '0');
                let year = d.getFullYear();
                const event_date = day+"/"+month+"/"+year
                var data = JSON.stringify({
                  "id":this.id,
                  "uniq_code": this.event_code,
                  "name": this.event_name,
                  "type": this.event_type,
                  "photo_url": this.event_image_url,
                  "description": this.description,
                  "date": event_date,
                  "location": this.location,
                  "promo_text": this.promo_text,
                  "promo_QR_code_url": this.qrcode_image_url,
                  "email": this.email,
                  "password": this.password,
                  "wallet_balance": parseInt(this.wallet_balance),
                  "memory_charges": parseInt(this.memory_charge),
                  "event_link" : window.location.origin+"/"+this.event_code.replace(/ /g, "-"),
                  "auto_validate": this.auto_validate
                });
                axios
                .post(this.$hostname + "admin/event/update", data, {
                  headers: {
                    "x-access-token": localStorage.getItem("adminAccessToken"), 
                    'Content-Type': 'application/json'
                  },
                })
                .then((response) => {
                  this.loading=false;
                  this.$router.push({ name: "Events" });
                  this.$toast.open({
                        message: response.data.message,
                        type: "info",
                  });
                
                })
                .catch(() => {
                  this.$router.push({ name: "Events" });
                  this.$toast.open({
                        message: "Something Went Wrong!",
                        type: "error",
                  });
           
                });
              // }
            } catch (e) {
              console.error(e);
            }
          },
         
      }
  }
  </script>

  