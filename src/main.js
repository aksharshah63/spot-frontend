import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueToast from 'vue-toast-notification';
import store from './store/index';

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import Vuelidate from 'vuelidate'

import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
  position: 'top-right'
})
Vue.use(Vuelidate)

Vue.prototype.$hostname = process.env.VUE_APP_API_URL || 'http://localhost:8000/api/'
Vue.prototype.$recaptcha_site_key = process.env.VUE_APP_RECAPTCHA_SITE_KEY

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export { storage }
Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes: routes,
})
new Vue({
  vuetify,
  router: router,
  render: (h) => h(App), store
}).$mount('#app')
