import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Validation from '@/Validation/Validation'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import  'sweetalert2'
import {
  faUser,
  faBars,
  faBarsStaggered,
  faUserPlus,
  faGear,
  faClipboardUser,
  faMagnifyingGlass,
  faEllipsis,
  faArrowDown,
  faCircle,
  faChartSimple,
  faHandHoldingDollar,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBuilding,
  faCloudArrowUp,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faTwitter,
  faUser,
  faBars,
  faBarsStaggered,
  faUserPlus,
  faGear,
  faClipboardUser,
  faMagnifyingGlass,
  faEllipsis,
  faArrowDown,
  faCircle,
  faChartSimple,
  faHandHoldingDollar,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBuilding,
  faCloudArrowUp,
  faRightToBracket
)
const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(Validation)
app.use(router)
// app.use(axios)
app.mount('#app')
