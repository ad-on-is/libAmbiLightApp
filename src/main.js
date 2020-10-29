process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { createApp, provide } from 'vue'
import App from './App.vue'
import './index.css'
import lightModel from './lightModel';




const app = createApp(App);
app.provide('lightModel', lightModel);
app.mount('#app');

