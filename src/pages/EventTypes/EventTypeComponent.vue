<template>
    <v-container fluid>
      <div class="tables-basic">
        <h1 class="page-title mt-10 mb-6">Event Types</h1>
        <v-row>
          <v-col cols="12">
            <v-card class="employee-list mb-1">
              <v-card-title class="pa-6 pb-3">
                <v-spacer></v-spacer>
                 <v-btn
                  depressed
                  color="primary"
                  class="add_event"
                  :to='{name:"AddEventType"}'
                >
                  Add Event Type
                </v-btn>
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
                      <td>{{row.item.type}}</td>
                      <td>
                        <router-link
                          :to="{ name: 'EditEventType', params: { id: row.item._id } }"
                          class="action_btn"
                        >
                          <v-icon small class="mr-2" color="blue"
                            >mdi-pencil</v-icon
                          >
                        </router-link>
                        <v-icon small class="mr-2" color="red" @click="delete_event(row.item._id)">mdi-delete</v-icon>
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
  import axios from "axios";
  
  export default {
    name: 'EventTypeComponent',
    data: () => ({
        selected: [],
          search: '',
          headers: [
              {
                  text: 'Event Type',
                  align: 'start',
                  sortable: true,
                  value: 'type',
              },
              { text: 'Actions', value: 'actions', sortable: false },
          ],
          result: [],
          is_login: false,
          loader: false,
      }),
      async mounted() {
        if (localStorage.getItem("adminAccessToken") == null) {
          this.$router.push({ name: "UserLogin" });
        }
        this.get_all_event_types()
      },
      methods: {
        get_all_event_types()
        {
          this.loader= true;
          axios
          .get(this.$hostname + "admin/eventTypes", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then((response) => {
            this.result = response.data.data
            this.loader= false;
          })
          .catch(() => {});
        },
        delete_event(id)
        {
          if(confirm("Are you sure to delete this Event ?")){
            var data = JSON.stringify({
                  "id": id,
            });
            axios
            .post(this.$hostname + "admin/eventType/delete", data, {
              headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"), 
                'Content-Type': 'application/json'
              },
            })
            .then((response) => {
              this.loading=false;
              this.$toast.open({
                    message: response.data.message,
                    type: "info",
              });
              this.get_all_event_types();
            })
            .catch(() => {
              this.$toast.open({
                    message: "Something Went Wrong!",
                    type: "error",
              });
              this.get_all_event_types();
            });
          }
        }
      }
  }
  
  </script>
  
  <style src="./EventType.scss" lang="scss"></style>
  