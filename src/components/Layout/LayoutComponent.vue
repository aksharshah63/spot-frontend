<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content">
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header/HeaderComponent";
import Sidebar from "@/components/Sidebar/SidebarComponent";
import Footer from "@/components/Footer/FooterComponent";
import "./Layout.scss";

export default {
  name: "LayoutComponent",
  components: { Footer, Header, Sidebar },
  mounted() {
    if (this.$route.path.includes("admin")) {
      this.$vuetify.theme.dark = false;
    } else {
      this.$vuetify.theme.dark = true;
    }
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
