<template>
  <v-stepper v-model="e1" dark class="transparent" height="600px;" style="box-shadow: unset;">
    <v-stepper-items>
      <v-stepper-content step="1" class="pa-0">
        <v-card class="transparent d-flex align-center" outlined tile>
          <v-img
            v-if="!user_image_url"
            height="110"
            width="110"
            class=""
            :src="event['photo_url']"
          ></v-img>
          <img
            v-else
            :src="user_image_url"
            height="110"
            width="110"
            class="cmBorder"
          />
          <v-card-text class="title">
            <div>
              Bravo, vous allez maintenant laisser votre souvenir à vie à 
              <span class="event_name">{{ event['name'] }}</span>
            </div>
          </v-card-text>
        </v-card>
        <v-card-text class="pa-0 text-h6 teal--text my-5">
          <div>Etape 1/3</div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <input
            type="file"
            style="display: none"
            accept="image/png, image/gif, image/jpeg"
            ref="fileinput"
            @change="onfilepicked"
          />
          <v-btn large color="teal" @click="onpickfile" class="my-5 pa-10">
            Choisir une image
          </v-btn>
        </v-card-actions>
        <v-card class="transparent d-flex justify-space-between" outlined tile>
          <v-card-text class="subtitle-1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon>mdi-information-variant</v-icon> Modération
                </span>
              </template>
              <span
                >Le souvenir déposé sera contrôlé par un modérateur avant d’être publié. Il ne doit être ni 
                violent ni explicite (voir CGV à l’étape 3).
              </span>
            </v-tooltip></v-card-text
          >
          <v-card-text
            @click="step1"
            class="subtitle-1 cursor-pointer text-right"
          >
            <v-icon>mdi-arrow-right</v-icon> Ignorer</v-card-text
          >
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2" class="pa-0">
        <v-card class="transparent d-flex align-center" outlined tile>
          <v-img
            v-if="!user_image_url"
            height="110"
            width="110"
            class=""
            :src="event['photo_url']"
          ></v-img>
          <img
            v-else
            :src="user_image_url"
            height="110"
            width="110"
            class="cmBorder"
          />
          <v-card-text class="title">
            <div>
              Vous allez rentrer dans l’Histoire de
              <span class="event_name">{{ event['name'] }}</span>
            </div>
          </v-card-text>
        </v-card>
        <v-card-text class="pa-0 text-h6 teal--text my-5">
          <div>Etape 2/3</div>
        </v-card-text>
        <v-col cols="12" md="12">
          <v-textarea
            solo
            name="input-7-4"
            label="C’est le moment de laisser ici votre plus beau message !"
            v-model="user_data.user_message"
            outlined
            light
            hide-details="auto"
            background-color="white"
            color="black"
            class="message"
          ></v-textarea>
        </v-col>
        <div style="width: 100%" class="text-right">
          <v-btn
            v-if="submitbutton"
            large
            color="teal"
            class="mr-3"
            :disabled="!user_image && !user_data.user_message"
            @click="step2"
          >
            Enregistrer
          </v-btn>
        </div>
        <v-card class="transparent d-flex justify-space-between" outlined tile>
          <v-card-text
            style="width: 40%"
            @click="e1 = 1"
            class="subtitle-1 cursor-pointer text-left"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-card-text>

          <v-card-text
            @click="skip_step2"
            class="subtitle-1 cursor-pointer text-right"
          >
            <v-icon>mdi-arrow-right</v-icon> 
          </v-card-text>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3" class="pa-0">
        <v-card-text class="title text-center pb-0">
        </v-card-text>
        <v-card-text class="pa-0 text-h6 my-2 d-flex justify-space-between">
          <div class="teal--text">Etape 3/3</div>
          <div class="white--text" style="margin-left:15px;">Dernière étape avant de rejoindre la grande photo de famille de <span class="event_name">{{ event['name'] }}</span></div>
        </v-card-text>
        <!-- <div class="d-flex flex-wrap justify-space-between tealBorder pa-3">
          <div class="text-h6 teal--text text-center mb-1" style="width: 100%">
            CGV particulières à ce spot
          </div>
          <div class="d-flex">
            <v-checkbox
              v-model="user_data.digital_work_toureiffel"
              label=""
              color="teal"
              hide-details
            ></v-checkbox>
            <p class="mb-1 subtitle-1">
              L’image transmise contribuera à une œuvre digitale qui sera
              exposée sur le site www.toureiffel.com
            </p>
          </div>
          <div class="d-flex">
            <v-checkbox
              v-model="user_data.fondation_tout_eiffel"
              label=""
              color="red darken-3"
              hide-details
            ></v-checkbox>
            <p class="mb-1 subtitle-1">
              L’image transmise contribuera à une œuvre digitale qui sera vendue
              aux enchères pour le compte de la Fondation Tout Eiffel
            </p>
          </div>
        </div> -->

        <div class="d-flex my-3 justify-center mt-12 mb-6 pa-3">
          <v-checkbox
            v-model="user_data.i_validate_the_cgv_standards"
            label=" Je valide les"
            color="teal"
            hide-details
          ></v-checkbox>
          <button style="margin-top: 5px;margin-left: 5px;" @click="downloadcgv"><u><b>CGV</b></u></button>
        </div>
        <v-text-field
          v-model="user_data.email"
          class="my-4 mb-6 pa-3"
          outlined
          type="email"
          dense
          label="Vérification de votre email *"
          placeholder="jean@francois.fr"
        />
        <v-progress-linear
          v-if="!submitbutton"
          v-model="percentage"
          color="teal"
          height="47"
        >
          Je laisse mon souvenir</v-progress-linear
        >
        <v-card-actions>
          <v-btn
            v-if="submitbutton"
            large
            color="teal"
            @click="savedata"
            width="100%"
          >
            Je laisse mon souvenir
          </v-btn>
        </v-card-actions>
      </v-stepper-content>

      <!-- <v-stepper-content step="4" class="pa-0">
        <div class="">
          <div class="teal--text checkLabel text-center mb-6 pa-3">
            <v-icon color="teal mb-6 pa-3"> mdi-checkbox-outline</v-icon>
            <span class="mb-6 pa-3">Félicitations !</span>
          </div>
          <v-card-text class="title teal--text text-center pt-0 mb-6 pa-3 text-desc">
            On se souviendra de vous pour la<br/>vie à <span class="event_name">{{ event['name'] }}</span>
          </v-card-text>
        </div>
        <div class="d-flex align-center mt-12" outlined
      tile>
      <v-card-text class="align-center d-flex mr-2 pa-3 rounded-0 text-body-1 v-card v-card__text v-sheet v-sheet--outlined" style="background-color: #D522A8 !important;
    border-color: #D522A8 !important;">
        <b style="margin: 0 auto;color: #FFFFFF;">{{ event['promo_text'] }}</b>
      </v-card-text>
            <v-img
              :lazy-src="event['promo_QR_code_url']"
              height=""
              width=""
              :src="event['promo_QR_code_url']"
              class="event_img"
              style="
    max-width: 120px;
"
            ></v-img>
        </div>
        <v-card-text class="pa-0 text-h6 mt-3 text-center">
          <div class="teal--text"></div>
        </v-card-text>
        <p class="text-center">
          
        </p>
        <p class="text-center">
          
        </p>
        <v-card-actions class="justify-center" @click="homepage">
          <v-btn large color="teal">
            Voir mon souvenir
          </v-btn>
        </v-card-actions>
        <v-card-text class="text-right pa-0" @click="homepage">
        </v-card-text
        >
      </v-stepper-content> -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { storage } from "../../main";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
export default {
  name: "AddMemory",
  data() {
    return {
      is_login: false,
      submitbutton: true,
      e1: 1,
      user_data: {
        email: "",
        user_photo_url: "",
        user_message: "",
        digital_work_toureiffel: false,
        fondation_tout_eiffel: false,
        i_validate_the_cgv_standards: false,
      },
      user_image_url: "",
      uploadValue: null,
      user_image: null,
      percentage: null,
      event_id:'',
      event:'',
    };
  },
  async mounted() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.push({ name: "UserLogin" });
      this.$toast.open({
        message: "Please Login to Add Your Memory",
        type: "error",
      });
    } else {
      this.is_login = true;
    }

    await axios
      .post(
        this.$hostname + "user/get_user_memories",
        { user_id: localStorage.getItem("user_id") },
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
      .then(response => {
        let data;
        if (response.data.length <= 1) {
          data = response.data;
        } else {
          data = [response.data[0]];
        }
        this.user_data = data;
        if(this.user_data.length!=0)
        {
          this.$router.push({ name: "HomeComponent" });
        }
        // localStorage.setItem("user_memory", JSON.stringify(data));
      })
      .catch(() => {
      });

      const json = localStorage.getItem("event_json");
        this.event_id = JSON.parse(json);
        var data = JSON.stringify({
            "id": this.event_id._id,
          });
          await axios
          .post(this.$hostname + "user/get_event", data, {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"), 
              'Content-Type': 'application/json'
            },
          })
          .then((response) => {
            this.event =response.data[0]
            localStorage.setItem(
              "event_json",
              JSON.stringify(response.data[0])
            );
          })
          .catch(() => {});
  },
  // computed: {
  //   event() {
  //     const json = localStorage.getItem("event_json");

  //     return JSON.parse(json);
  //   },
  // },
  methods: {
    checkmessagelength() {
      if (this.user_data.user_message.length > 0) {
        this.step_2_text = "";
      }
    },
    onpickfile() {
      this.$refs.fileinput.click();
    },
    onfilepicked(event) {
      this.user_image = event.target.files[0];
      let filename = this.user_image.name;
      if (filename.lastIndexOf(".") <= 0) {
        this.$toast.open({
          message: "Please Select Valid Image",
          type: "error",
        });
      }
      const filereader = new FileReader();
      filereader.addEventListener("load", () => {
        this.user_image_url = filereader.result;
      });
      filereader.readAsDataURL(this.user_image);
      this.e1 = 2;
    },
    step1() {
      this.e1 = 2;
    },
    step2() {
      this.e1 = 3;
    },
    skip_step2() {
      this.user_data.user_message = "";
      this.e1 = 3;
    },
    save_user_data() {
      const event = JSON.parse(localStorage.getItem("event_json"));
      this.user_data.user_id = localStorage.getItem("user_id");

      axios
        .post(this.$hostname + "user/save_user_memory", {
          ...this.user_data,
          event,
        }, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .then(response => {
          this.$toast.open({
            message: response.data.message,
            type: "info",
          });
          this.user_data = {};
          //this.e1 = 4;
          localStorage.setItem("user_memory",true)
          setTimeout(() => {
            this.$router.push({ name: "SingleViewMemory", query:{check:true} });
          },250)
        })
        .catch((error) => {
          this.$toast.open({
            message: error.response.data.message,
            type: "error",
          });
          this.e1 = 1;
        });
    },
    savedata() {
      if (this.user_image_url == "" && this.user_data.user_message == "") {
        this.e1 = 1;
        this.$toast.open({
          message: "Please Add One Field",
          type: "error",
        });
      } else {
        if (this.user_data.i_validate_the_cgv_standards == undefined) {
          this.$toast.open({
            message: "Please Accept Terms and Conditions",
            type: "error",
          });
        }
        else if (this.user_data.email == undefined) {
          this.$toast.open({
            message: "Please Enter the Email",
            type: "error",
          });
        } else {
          this.submitbutton = false;
          if (this.user_image) {
            const storageRef = ref(
              storage,
              `/User_Memory_images/${this.user_image.name}`
            );
            const uploadTask = uploadBytesResumable(
              storageRef,
              this.user_image
            );

            uploadTask.on(
              "state_changed",
              snapshot => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                this.percentage = percent;
                // setPercent(percent);
              },
              err => err,
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                  this.user_data.user_photo_url = url;
                  this.save_user_data();
                });
              }
            );
          } else {
            this.save_user_data();
          }
        }
      }
    },
    homepage() {
      this.$router.push({ name: "HomeComponent" });
    },
    downloadcgv()
    {
      axios
        .get(this.$hostname + "user/getCGV", {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
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
    }
  },
};
</script>
<style>
.message .v-label {
    overflow: unset;
    text-overflow: unset;
    white-space: unset;
}
.cardColor {
  background-color: rgba(255, 255, 255, 0) !important;
  /* border-color: white !important;
  border-style: solid;
  border-width: 2px; */
}
.v-text-field--enclosed .v-input__prepend-outer,
.v-input--selection-controls {
  margin-top: 0 !important;
}
.cmBorder {
  border: 1px solid white;
}
.tealBorder {
  border: 1px solid #009688;
}
.cursor-pointer {
  cursor: pointer;
}
.v-text-field--enclosed .v-input__prepend-outer,
.v-input--selection-controls {
  margin-top: 0 !important;
}
.cmBorder {
  border: 1px solid white;
}
.tealBorder {
  border: 1px solid #009688;
}
.tealLabel .v-input__slot {
  justify-content: center;
}
.tealLabel .v-input--selection-controls__input {
  margin-right: 20px;
}
.checkLabel {
  font-size: 1.25rem !important;
}
.checkLabel .v-icon {
  font-size: 40px;
  margin-right: 20px;
}
.front_content_wrapper .theme--dark.v-label {
  color: #FFFFFF !important;
}
.front_content_wrapper .subtitle-1 {
  color: #FFFFFF !important;
}
@media screen and (max-width: 767px) {
.text-desc br {
  display: none;
}
 
}
</style>
