import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
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
)
const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
