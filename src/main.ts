import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import router from './router';
const app = createApp(App);
app.use(vuetify); // Use Vuetify
app.use(router)
app.mount('#app');
