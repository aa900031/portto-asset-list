import 'normalize.css';
import { createApp } from 'vue'
import router from './router';
import App from './App'

const app = createApp(App)
  .use(router)
app.mount('#app')
