<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Memories</h1>
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="active_tab">
            <v-tab active @click="tab_type('all')">All</v-tab>
            <v-tab @click="tab_type('to_validate')">To Validate</v-tab>
            <v-tab @click="tab_type('validated')">Validated</v-tab>
            <v-tab @click="tab_type('refused')">Refused</v-tab>
          </v-tabs>
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-spacer></v-spacer>
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
              :headers="headers2"
              :items="result"
              :search="search"
              item-key="name"
              :loading="loader"
              loading-text="Loading... Please wait"
             >
              <template v-slot:item="row">
                <tr>
                  
                  <td>{{row.item.user_message}}</td>
                  <td><img v-if="row.item.user_photo_url" :src="row.item.user_photo_url" style="width: 50px; height: 50px" /></td>
                  <td>{{ row.item.event ? row.item.event.uniq_code : null }}</td>
                  <td>{{ row.item.email }}</td>
                  <td>{{ row.item.users ? row.item.users.user_key : '' }}</td>
                  <td v-if="tabtype =='all'" >
                    <v-chip class="ma-2" color="red" text-color="white" v-if="row.item.is_validate == -1">Refused</v-chip>  
                    <v-chip class="ma-2" color="blue" text-color="white" v-if="row.item.is_validate == 0">To Validate</v-chip> 
                    <v-chip class="ma-2" color="green" text-color="white" v-if="row.item.is_validate == 1">Validated</v-chip>
                  </td>
                  <td v-if="!filterHeaderByType.includes(tabtype)">
                    <v-btn dense dark class="ma-2 status text-none" color="green" outlined @click="update_status(1,row.item._id)">Approve</v-btn>   
                    <v-btn dense dark class="ma-2 status text-none" color="red" outlined @click="update_status(-1,row.item._id)">Decline</v-btn>   
                  </td>
                  <td v-if="tabtype =='validated'|| !tabtype== 'to_validate' && (!filterHeaderByType.includes(tabtype))">
                    <v-sheet
                    >
                      <v-switch
                        v-model="row.item.is_validate"
                        flat
                        @click="update_status(3,row.item._id)"
                      ></v-switch>
                    </v-sheet>
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
  name: 'MemoryComponent',
  data: () => ({
        selected: [],
        search: '',
        headers: [
            {
                text: 'User Message',
                align: 'start',
                sortable: true,
                value: 'user_message',
            },
            { text: 'User Image', value: 'user_photo_url' },
            { text: 'Event Code', value: 'event.uniq_code' },
            { text: 'Email', value: 'email' },
            { text: 'Code', value: 'users.user_key' },
            { text: 'Status', value: 'is_validate' },
            { text: 'Actions', value: 'actions', sortable: false },
            { text: 'Pause', value: 'pause', sortable: false },            
        ],
        headers2: [
            {
                text: 'User Message',
                align: 'start',
                sortable: true,
                value: 'user_message',
            },
            { text: 'User Image', value: 'user_photo_url' },
            { text: 'Event Code', value: 'event.uniq_code' },
            { text: 'Email', value: 'email' },
            { text: 'Code', value: 'users.user_key' },
            { text: 'Status', value: 'is_validate' },
            { text: 'Actions', value: 'actions', sortable: false },
            { text: 'Pause', value: 'pause', sortable: false },            
        ],
        result: [],
        is_login: false,
        tabtype:'',  
        loader: false,
        filterHeaderByType:['all','validated','refused'],
        active_tab: 0,
  }),
  mounted() {
    if (localStorage.getItem("adminAccessToken") == null) {
      this.$router.push({ name: "UserLogin" });
    }
    this.tabtype='all'

    //default header filter by type all
    this.headers2 = this.headers.filter(x => x.text !== "Actions" && x.text !== 'Pause')
    this.tab_type()
  },
  methods: {
    async tab_type(type)
    {
      this.tabtype=type || 'all'
      this.result=[];
      
      // filter headers based on type
      if(this.filterHeaderByType.includes(this.tabtype)){
        if(this.tabtype == "validated"){
          this.headers2 = this.headers.filter(x => x.text !== "Actions")
        }
        else{
          this.headers2 = this.headers.filter(x => x.text !== "Actions" && x.text !== 'Pause')
        }
        
      }else{
        this.headers2 = this.headers
      }
      
      if(this.tabtype !== "all"){
        this.headers2 = this.headers2.filter(x => x.text !== "Status")
        if(this.tabtype == "to_validate"){
          this.headers2 = this.headers2.filter(x => x.text !== "Pause")
        }
      }
      if(this.tabtype=='to_validate')
      {
        this.loader= true;
        axios
          .get(this.$hostname + "admin/get_pending_user_memories", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then((response) => {
            this.result = response.data.data
            this.loader= false;
          })
          .catch(() => {});
      }
      else if(this.tabtype=='validated')
      {
        this.loader= true;
        axios
          .get(this.$hostname + "admin/get_approved_user_memories", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then((response) => {
            this.result = response.data.data

            for(let i=0;i<this.result.length;i++) {
              if(this.result[i].is_validate == 2) {
                this.result[i].is_validate = 1
              } else {
                this.result[i].is_validate = 0
              }
            }
            
            this.loader= false;
          })
          .catch(() => {});
      }
      else if(this.tabtype=='refused')
      {
        this.loader= true;
        axios
          .get(this.$hostname + "admin/get_rejected_user_memories", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then((response) => {
            this.result = response.data.data
            this.loader= false;
          })
          .catch(() => {});
      }
      else
      {
        this.loader= true;
        axios
          .get(this.$hostname + "admin/get_users_memories", {
            headers: {
              "x-access-token": localStorage.getItem("adminAccessToken"),
            },
          })
          .then((response) => {
            this.result = response.data.data
            this.loader= false;
          })
          .catch(() => {});
      }
      
    },
    update_status(status,id)
    {
      let curr
      let tabs=-1
      if(status == 3) {
        tabs=1
        this.result.map(item => {
          if(item._id == id) {
            curr = item.is_validate
          }         
        })

        if(curr) {
          status=2
        } else {
          status=1
        }
      }

      axios
        .post(this.$hostname + "admin/update_users_memories_status",{'id':id,'status':status}, {
          headers: {
            "x-access-token": localStorage.getItem("adminAccessToken"),
          },
        })
        .then(() => {
          this.$toast.open({
            message: "User Memories Updated Successfully",
            type: "info",
          });
          this.loader= true;
          axios
            .get(this.$hostname + "admin/get_pending_user_memories", {
              headers: {
                "x-access-token": localStorage.getItem("adminAccessToken"),
              },
            })
            .then((response) => {
              this.result = response.data.data
              this.loader= false;
              if(tabs !=1 )
              { 
                this.active_tab = 0;
                this.tab_type('all')
              }
              else
              {
                this.active_tab = 2;
                this.tab_type('validated')
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
  
}

</script>

<style src="./Basic.scss" lang="scss"></style>
