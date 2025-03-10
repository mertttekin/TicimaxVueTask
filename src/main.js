import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Import Pinia
import router from './router';
import './assets/styles.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
