import '@/assets/styles/sass/main.scss'
import 'vue3-toastify/dist/index.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

import router from '@/router'
import toastifyConfig from '@/config/vue-toastify'
import loadComponents from '@/plugins/componentsLoader'

import App from '@/App.vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(Vue3Toastify, toastifyConfig)

app.component('DatePicker', Vue3PersianDatetimePicker)

loadComponents(app)

export default app
