import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myComponents from '@/components/library'

// css
import 'normalize.css'
import '@/assets/style/common.less'


createApp(App).use(store).use(router).use(myComponents).mount('#app')
