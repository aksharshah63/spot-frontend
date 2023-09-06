<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <div class="v-card__title text-h3 justify-center mb-10">
              <span class="font-weight-black">Spot</span
              ><span class="font-weight-thin">Chain</span>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="login-part d-flex align-center justify-center"
        >
          <v-row no-gutters class="align-start">
            <v-col
              cols="12"
              class="login-part d-flex align-center justify-center flex-column"
            >
              <div class="login-wrapper pt-md-4 pt-0">
                <v-form>
                  <v-container>
                    <v-row class="flex-column">
                      <v-form v-model="isFormValid">
                        <v-col>
                          <v-text-field
                            v-model="form.email"
                            light
                            outlined
                            label="Email Address"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="form.password"
                            light
                            outlined
                            type="password"
                            label="Password"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex justify-space-between">
                          <v-btn
                            class="text-capitalize"
                            depressed
                            color="primary"
                            @click="login"
                            :disabled="!isFormValid"
                            :loading="loading"
                          >
                            Login
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon light>mdi-cached</v-icon>
                              </span>
                            </template>
                            </v-btn>
                        </v-col>
                      </v-form>
                    </v-row>
                  </v-container>
                </v-form>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">
                  © {{ year }} SpotChain. All rights reserved.
                </div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      is_login: false,
      year: "",
      isFormValid: false,
      loading: false,
    };
  },
  mounted() {
    this.year = new Date().getFullYear();
    if (localStorage.getItem("adminaccessToken") != null) {
      this.$router.push({ name: "HomeComponent" });
      this.$toast.open({
        message: "You Are Successfully Logged In",
        type: "info",
      });
    }
  },
  methods: {
    login() {
      // window.localStorage.setItem('authenticated', true);
      // this.$router.push('/dashboard');

      if (this.form.email == "" && this.form.password == "") {
        this.$toast.open({
          message: "All fields are required!",
          type: "error",
        });
      } else {
        if (this.form.email == "") {
          this.$toast.open({
            message: "email is required!",
            type: "error",
          });
        } else if (this.form.password == "") {
          this.$toast.open({
            message: "password is required!",
            type: "error",
          });
        } else {
          this.loading=true;
          axios
            .post(this.$hostname + "auth/admin/signin", this.form)
            .then(response => {
              this.loading=false;
              this.$toast.open({
                message: "User Login Succesfully",
                type: "info",
              });
              localStorage.setItem("adminAccessToken", response.data.accessToken);
              localStorage.setItem("admin_user_id", response.data.user_id);
              localStorage.setItem("role", response.data.role);
              localStorage.setItem("event_id", response.data.event_id);
              this.is_login = true;
              if(localStorage.getItem("role")=='admin')
              {
                this.$router.push({ name: "Events" , params: { id: response.data.event_id }});
              }
              else if(localStorage.getItem("role")=='event_organiser')
              {
                this.$router.push({ name: "Events",params: { id: response.data.event_id }  });
              }
              
              
            })
            .catch(() => {
              this.loading=false;
              this.$toast.open({
                message: "User Not Found!",
                type: "error",
              });
              this.form = {};
            });
        }
      }
    },
  },
  created() {
    if (localStorage.getItem("adminAccessToken") != null) {
      this.$router.push({ name: "EventTypes" });
    }
  },
};
</script>

<style src="./Login.scss" lang="scss" />
