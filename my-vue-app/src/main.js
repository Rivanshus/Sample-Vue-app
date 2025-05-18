import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css';                   // Icons
import 'primeflex/primeflex.css';                     // Utility classes


const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
