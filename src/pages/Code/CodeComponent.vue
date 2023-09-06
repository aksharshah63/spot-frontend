<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Codes</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-spacer></v-spacer>
               <v-btn
                depressed
                color="primary"
                class="add_code"
                @click="add_code"
              >
                Add Code
              </v-btn>
              <v-dialog
                v-model="dialog"
                max-width="600"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Add Code
                  </v-card-title>

                  <v-card-text>
                    <v-form  v-model="isFormValid">
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-text-field
                              label="Enter no of Code"
                              v-model="no_of_code"
                              :error-messages="onofcodeErrors"
                              required
                              @input="$v.no_of_code.$touch()"
                              @blur="$v.no_of_code.$touch()"
                              type="number"
                              min="1"
                              v-on:keypress="NumbersOnly"
                              id="test"
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="6"
                          >
                          <v-btn
                          depressed
                          color="primary"
                          @click="save()"
                          :disabled="!isFormValid"
                          :loading="loading"
                          >
                          Add
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </template>
                          </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      depressed
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialog2"
                max-width="600"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Code
                  </v-card-title>

                  <v-card-text>
                    <p id="copycode" v-for="item in result2" :key="item._id">
                    Event Code: {{temp}}<br/>
                    User Key: {{item.user_key}}
                    </p>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed
                color="primary" @click="exportData" class="mr-3" v-if="result2.length > 0">Export to CSV</v-btn>
                    <v-btn
                      color="red"
                      depressed
                      @click="dialog2 = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                clearable
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="result"
              :search="search"
              item-key="name"
              :loading="loader"
              loading-text="Loading... Please wait"
             >
              <template v-slot:item="row">
                  <tr>
                    <td>{{temp}}</td>
                    <td>{{row.item.user_key}}</td>
                    <td>
                    <v-icon
                      small
                      class="mr-2"
                      color="red"
                      @click="delete_code(row.item.event_code,row.item.user_key)"
                      >mdi-delete</v-icon
                    >
                  </td>
                  </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import axios from "axios";
import { excelParser } from "../../../excel-parser";

export default {
  name: 'CodeComponent',
  mixins: [validationMixin],
  
  validations: {
    no_of_code: {
      required
    },
  },
  data: () => ({
      selected: [],
        search: '',
        headers: [
            {
                text: 'Event Code',
                align: 'start',
                sortable: true,
                value: 'event_code',
            },
            { text: 'User Key', value: 'user_key' },
            { text: "Actions", value: "actions", sortable: false },
        ],
        result: [],
        is_login: false,
        loader: false,
        dialog: false,
        event_id:'',
        temp:'',
        isFormValid: false,
        loading: false,
        no_of_code:'',
        dialog2: false,
        result2:[],
        listData: [],
    }),
    computed: {
        onofcodeErrors() {
          const errors = []
          if (!this.$v.no_of_code.$dirty) return errors
          !this.$v.no_of_code.required && errors.push('Event no of Code is required.')
          return errors
        },
    },
    async mounted() {
      let url = window.location.href;
      this.event_id = url.split("/");
      this.temp = this.event_id[7].replace(/%20/g, "-");
      if (localStorage.getItem("adminAccessToken") == null) {
        this.$router.push({ name: "UserLogin" });
      }
      this.get_codes()
    },
    methods: {
      get_codes()
      {
        this.loader= true;
        var data = JSON.stringify({
          "event_id": this.event_id[8],
        });
        axios
        .post(this.$hostname + "admin/event/users", data, {
          headers: {
            "x-access-token": localStorage.getItem("adminAccessToken"), 
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          this.result = response.data.filter(item => item.is_memory ==false)
          this.loader= false;
        })
        .catch(() => {});
      },
      add_code()
      {
        this.dialog=true
        this.loading=false
      },
      async save()
      {
        this.$v.$touch()
        if (this.$v.$anyError) {
          return;
        }
        this.loading=true;
        var data = JSON.stringify({
          "event_id": this.event_id[8],
          "totalReqNo" : this.no_of_code
        });
        axios
        .post(this.$hostname + "admin/event/user/create", data, {
          headers: {
            "x-access-token": localStorage.getItem("adminAccessToken"), 
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          this.result2 = response.data.data.user
          this.dialog=false
          this.dialog2=true
          this.loading=false;
          this.no_of_code=''
          this.get_codes()
        
        })
        .catch(() => {});
      },
      NumbersOnly(evt) {
        if (evt.srcElement.value.length == 0 && evt.which == 48) {
                evt.preventDefault();
                return false;
        }
      },
      delete_code(event_id,user_key)
      {
        if (confirm("Are you sure to delete this Code ?")) {
        var data = JSON.stringify({
          event_id: event_id,
          user_key: user_key
        });
      
        axios
          .post(this.$hostname + "admin/event/user/delete", data, {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
              "Content-Type": "application/json",
            },
          })
          .then(response => {
            this.loading = false;
            this.$toast.open({
              message: response.data.message,
              type: "info",
            });
            this.get_codes()
          })
          .catch(() => {
            this.$toast.open({
              message: "Something Went Wrong!",
              type: "error",
            });
            this.get_codes()
          });
      }
      },
      exportData() {
        this.result2.forEach(element => {
          this.listData.push({Event_Code: this.temp,User_Key: element.user_key})
        });
     excelParser().exportDataFromJSON(this.listData, this.event_id[7], "csv");
    },
    }
}

</script>

<style src="./Code.scss" lang="scss"></style>