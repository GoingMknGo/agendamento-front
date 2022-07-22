import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';

<script src="sweetalert2.all.min.js"></script>

const app = createApp(App)

window.Swal =  app.config.globalProperties.$swal;

app.use(store);
app.use(router);
app.use(VueSweetalert2);

app.mount('#app');
