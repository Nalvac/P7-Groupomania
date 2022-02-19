import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";
const app = createApp(App);
// utilisation d'axios comme variable global dans le front
app.config.globalProperties.axios = axios;
createApp(App).use(store).use(router).mount('#app');