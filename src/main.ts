import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { setupFirebase } from './bootstrap/firebase'

async function bootstrap() {
    await setupFirebase()
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
}

await bootstrap()
