<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Events</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-spacer></v-spacer>
              <v-btn
                depressed
                color="primary"
                class="add_event"
                :to="{ name: 'AddEvent' }"
                v-if="role=='admin'"
              >
                Add Event
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
                  <td>{{ row.item.uniq_code }}</td>
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.memories }}</td>
                  <td v-if="row.item.moderations > 0 "><router-link
                      :to="{ name: 'EventMemoryModeration', params: { id: row.item._id } }"
                      class="action_btn"
                    ><v-btn color="error"> {{ row.item.moderations }} </v-btn>
                    </router-link></td>
                  <td v-else>
                    <router-link
                      :to="{ name: 'EventMemoryModeration', params: { id: row.item._id } }"
                      class="action_btn"
                    ><v-btn color="default">{{ row.item.moderations }} </v-btn></router-link></td>
                  <td>{{ row.item.type }}</td>
                  <td>
                    <img
                      :src="row.item.photo_url"
                      style="width: 50px; height: 50px"
                    />
                  </td>
                  <td>{{ row.item.date }}</td>
                  <td>{{ row.item.location }}</td>
                  <!-- <td>
                    <img
                      :src="row.item.promo_QR_code_url"
                      style="width: 50px; height: 50px"
                    />
                  </td> -->
                  <td>
                    {{ row.item.wallet_balance }}
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'ViewEvent', params: { id: row.item._id } }"
                      class="action_btn"
                    >
                      <v-icon small class="mr-2" color="blue">mdi-eye</v-icon>
                    </router-link>
                    <router-link
                      :to="{ name: 'EditEvent', params: { id: row.item._id } }"
                      class="action_btn"
                    >
                      <v-icon small class="mr-2" color="blue"  v-if="role=='admin'"
                        >mdi-pencil</v-icon
                      >
                    </router-link>
                    <v-icon
                      small
                      class="mr-2"
                      color="red"
                      @click="delete_event(row.item._id,row.item.photo_url,row.item.promo_QR_code_url)"
                      v-if="role=='admin'"
                      >mdi-delete</v-icon
                    >
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'EventCreateUser',
                        params: {
                          event_code: row.item.uniq_code,
                          id: row.item._id,
                        },
                      }"
                    >
                      <v-btn color="primary"> codes </v-btn>
                    </router-link>
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'AdminAllMemories',
                        params: {
                          id: row.item._id,
                        },
                      }"
                      target="_blank"
                    >
                      <v-btn color="primary"> wall </v-btn>
                    </router-link>
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
import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "EventComponent",
  data: () => ({
    selected: [],
    search: "",
    headers: [
      {
        text: "Event Code",
        align: "start",
        sortable: true,
        value: "uniq_code",
      },
      { text: "Name", value: "name" },
      { text: "Memories", value: "memories" },
      { text: "Moderation", value: "moderation" },
      { text: "Event Type", value: "type" },
      { text: "Event Image", value: "photo_url" },
      { text: "Date", value: "date" },
      { text: "Location", value: "location" },
      // { text: "Promo QR Code", value: "promo_QR_code_url" },
      { text: "Wallet Balance", value: "wallet_balance" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "Codes", value: "codes", sortable: false },
      { text: "See", value: "see", sortable: false },
    ],
    result: [],
    is_login: false,
    loader: false,
    role: localStorage.getItem('role')
  }),
  async mounted() {
    if (localStorage.getItem("adminAccessToken") == null) {
      this.$router.push({ name: "UserLogin" });
    }
    this.get_all_events();
  },
  methods: {
    get_all_events() {
      if(localStorage.getItem('role')=='admin')
      {
        this.loader = true;
        axios
          .get(this.$hostname + "admin/events", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then(response => {
            this.result = response.data.data;
            this.loader = false;
          })
          .catch(() => {});
      }
      else if(localStorage.getItem('role')=='event_organiser')
      {
        let a=[];
          this.loader = true
        var data = JSON.stringify({
                "event_id": localStorage.getItem("event_id"),
        });
        axios
        .post(this.$hostname + "admin/event", data, {
            headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"), 
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
          a.push(response.data)
          this.result = a
            this.loader = false
        })
        .catch(() => {
            this.$toast.open({
                    message: "Something Went Wrong!",
                    type: "error",
            });
        });
      }
    },
    delete_event(id,event_image,qr_image) {
      if (confirm("Are you sure to delete this Event ?")) {
        var data = JSON.stringify({
          id: id,
        });
        
        this.delete_image(event_image)
        this.delete_image(qr_image)
    
        axios
          .post(this.$hostname + "admin/event/delete", data, {
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
            this.get_all_events();
          })
          .catch(() => {
            this.$toast.open({
              message: "Something Went Wrong!",
              type: "error",
            });
            this.get_all_events();
          });
      }
    },

    delete_image(url)
    {
      const storage = getStorage();

      // Create a reference to the file to delete
      const desertRef = ref(storage, url);

      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch(() => {
        // Uh-oh, an error occurred!
      });
    }
  },
};
</script>

<style src="./Event.scss" lang="scss"></style>
