import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from './store'

const app = createApp(App)

app.use(VueAxios, axios).use(router).use(store)
app.directive('focus', focus)
app.mount('#app')
