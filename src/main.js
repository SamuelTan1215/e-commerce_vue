import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Loading } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
// app.use(Loading);
app.component('Loading',Loading)
app.mount('#app')
