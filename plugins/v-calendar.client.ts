import VCalendar from 'v-calendar'
import { DatePicker } from 'v-calendar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VCalendar, {})
  nuxtApp.vueApp.component('DatePicker', DatePicker)
})
