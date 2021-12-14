// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// Import global styles
import '~/assets/styles/root.scss'
import 'typeface-inter'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}