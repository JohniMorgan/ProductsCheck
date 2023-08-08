import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '/vuetify.js'
import './style.css'
import App from './App.vue'

createApp(App).use(vuetify).use(createPinia()).mount('#app')
