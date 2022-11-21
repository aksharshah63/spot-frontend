<template>
  <v-container fluid>
    <h1 class="page-title mt-10 mb-6">Add CGV</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <label>CGV
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
          </v-col>
        </v-row>

        <v-row>
          <v-btn
            depressed
            color="primary"
            @click="save()"
            :loading="loading"
          >
            Save
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn depressed color="secondary" class="cancel" @click="reset()">
            Reset
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="download()"
            class="cancel"
          >
            Download
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CGVComponent",
  data() {
    return {
      file: null,
      loading: false,
      fileName : ''
    };
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    async save() {
      this.loading = true;
      if(this.file=='' || this.file==null)
      {
        this.$toast.open({
          message: "Please select file.",
          type: "error",
        });
        this.loading = false;
      }
      else 
      {
          var FormData = require('form-data');
          var data = new FormData();
          data.append('cgv', this.file);
          
          var config = {
            method: 'post',
            url: this.$hostname + "admin/uploadCGV",
            headers: { 
              'x-access-token': localStorage.getItem("adminAccessToken"), 
            },
            data : data
          };
          
          try {
            const response = await axios(config)
            if(response.data.success === true) {
              this.$toast.open({
                message: response.data.message,
                type: "info",
              });
              this.loading = false;
            } else {
              this.$toast.open({
                message: response.data.message,
                type: "info",
              });
              this.loading = false;
            }
          } catch(err) {
            this.$toast.open({
                message: "Please select proper pdf file.",
                type: "error",
              });
              this.loading = false;
              this.fileName = ''
              this.file=''
              this.$refs.file.value = null;
          }
      }
    },
    async download()
    {
        await axios
        .get(this.$hostname + "admin/getCGV", {
        headers: {
          "x-access-token": localStorage.getItem("adminAccessToken"),
        },
        responseType: 'blob', // important
        }).then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cgv.pdf');
            document.body.appendChild(link);
            link.click();
        })
    },
    reset() {
      this.fileName = ''
      this.file=''
      this.$refs.file.value = null;
    },
  },
};
</script>
