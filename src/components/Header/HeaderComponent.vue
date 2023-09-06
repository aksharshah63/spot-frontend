<template>
  <v-app-bar class="main-header" height="64" fixed color="primary" dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-toolbar-title>SpotChain Admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <p v-if="this.role=='event_organiser'" style="margin-bottom: 0px;">Wallet Balance : {{result['wallet_balance']}}</p>
    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
          <v-icon style="font-size: 28px" :color="config.light.iconColor"
            >mdi-account</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logOut"
            >Sign Out
          </v-btn>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
 import axios from "axios";
import { mapActions, mapState } from "vuex";
import config from "../../config";

export default {
  name: "HeaderComponent",
  data: () => ({
    config,
    searchCollapse: true,
    notifications: [
      {
        text: "Check out this awesome ticket",
        icon: "mdi-tag",
        color: "warning",
      },
      {
        text: "What is the best way to get ...",
        icon: "mdi-thumb-up",
        color: "success",
      },
      {
        text: "This is just a simple notification",
        icon: "mdi-flag",
        color: "error",
      },
      {
        text: "12 new orders has arrived today",
        icon: "mdi-cart",
        color: "primary",
      },
    ],
    messages: [
      {
        text: "JH",
        name: "Jane Hew",
        message: "Hey! How is it going?",
        time: "09:32",
        color: "warning",
      },
      {
        text: "LB",
        name: "Lloyd Brown",
        message: "Check out my new Dashboard",
        time: "10:02",
        color: "success",
      },
      {
        text: "MW",
        name: "Mark Winstein",
        message: "I want rearrange the appointment",
        time: "12:16",
        color: "error",
      },
      {
        text: "LD",
        name: "Liana Dutti",
        message: "Good news from sale department",
        time: "14:56",
        color: "primary",
      },
    ],
    account: [
      { text: "Profile", icon: "mdi-account", color: "textColor" },
      { text: "Tasks", icon: "mdi-thumb-up", color: "textColor" },
      { text: "Messages", icon: "mdi-flag", color: "textColor" },
    ],
    notificationsBadge: true,
    messageBadge: true,
    result:[],
    event_id:'',
    role:'',
    id:'',
  }),
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  async mounted() {
        this.loading = true
        let url = window.location.href;
        this.id = url.split("/");
        if(this.id[5]==undefined)
        {
          this.event_id = localStorage.getItem('event_id')
        }
        else
        {
          this.event_id = this.id[5]
        }
        var data = JSON.stringify({
                "event_id": this.event_id,
        });
        this.role=localStorage.getItem("role");
        if(this.role=='event_organiser')
        {
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
        }
        
      },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    logOut: function () {
      // window.localStorage.setItem('authenticated', false);
      // this.$router.push('/admin/login');
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("admin_user_id");
      localStorage.removeItem("role");
      localStorage.removeItem("event_id");
      this.is_login = false;
      this.$toast.open({
        message: "User Successfully Logout",
        type: "info",
      });
      location.href = "/admin/login";
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
