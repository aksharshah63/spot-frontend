<template>
  <v-footer class="px-0 mt-10" color="transparent">
    <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">© {{year}} SpotChain. All rights reserved.</div>
              </v-footer>
            </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import config from '../../config';

export default {
  name: 'FooterComponent',

  data: () => ({
    config,
     year:'',
  }),
  mounted(){
      this.year = new Date().getFullYear(); 
    },
}
</script>

<style src="./Footer.scss" lang="scss"/>

