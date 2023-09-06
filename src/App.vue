<template>
  <v-app
    v-if="!$route.path.includes('admin')"
    class="white--text"
    style="background: #1b192e"
  >
    <div class="v-main__wrap front_main_wrapper">
      <div class="container d-flex justify-center align-center">
        <div
          class="d-flex flex-column justify-center align-center pa-3 cardColor v-card theme--dark rounded-0" style="width:100%;"
        >
          <div class="justify-space-between mb-10 pa-0 text-h3 v-card__title header-text">
            <div
              class="text-h3"
            >
              <span class="font-weight-black">Spot</span>
              <span class="font-weight-thin">Chain</span>
            </div>

            <v-spacer />
            <div v-if="disconnect && toShow">
            <v-menu v-if="isMenuDisplayed" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" class="menu">mdi-cog</v-icon>
              </template>
              <v-list style="background-color: #1b192e;">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item.disabled ? '' : item.url"
                  :disabled="item.disabled"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><a href="mailto:admin.app@gmail.com" class="modification">Modification</a></v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>Me déconnecter</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            </div>
            <div v-else>
              <v-menu v-if="isMenuDisplayed" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" class="menu">mdi-cog</v-icon>
              </template>
              <v-list style="background-color: #1b192e;">
                <v-list-item @click="logout">
                  <v-list-item-title>Me déconnecter</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            </div>
          </div>
          <v-main class="front_content_wrapper">
            <v-container>
              <router-view />
            </v-container>
          </v-main>
        </div>
      </div>
    </div>
  </v-app>
  <router-view v-else />
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [
      // {
      //   title: "Tous mes spots (contributions)",
      //   url: "/mycontributions",
      //   disabled: true,
      // },
      { title: "Contributions & avantages", url: "/" },
      { title: "Trouver des bons plans", url: "/bonus-plan" },
      // { title: "Modification", url: "/" },
      // { title: "Me déconnecter", url: "/" },
    ],
    toShow:true
  }),
  computed: {
    isMenuDisplayed() {
      return this.$route.name != "UserLogin" && this.$route.name != "AdminAllMemories" && this.$route.name != "EventLogin";
    },
    disconnect() {
      if(window.location.search === "?check=false" || localStorage.getItem("user_memory") === "false") {        
        return false;
      }

      return true
    }   
  },
  beforeCreate()
  {
    if(localStorage.getItem("user_memory") === 'true') {
      this.toShow=true
      return
    } 

    if(window.location.search === '?check=false' || localStorage.getItem("user_memory") === 'false') {
      this.toShow = false
    } else {      
      this.toShow = true
    }
  },
  updated()
  {
    if(localStorage.getItem("user_memory") === 'true') {
      this.toShow=true
      return
    } 

    if(window.location.search === '?check=false' || localStorage.getItem("user_memory") === 'false') {
      this.toShow = false
    } else {      
      this.toShow = true
    }  
  },
  
  methods: {
    logout() {
      var url_login = localStorage.getItem("url")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("event_json");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_role");
      localStorage.removeItem("url");
      localStorage.removeItem("user_memory");
      window.location.href = url_login;
    },
  },
};
</script>
<style src="./styles/app.scss" lang="scss" />
