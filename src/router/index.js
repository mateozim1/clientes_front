import { createRouter, createWebHistory } from 'vue-router'
import ClientesList from '../components/ClientesList.vue'
import ClienteWizard from '../components/ClienteWizard.vue'

const routes = [
  { path: '/', name: 'ClientesList', component: ClientesList },
  { path: '/cadastrar', name: 'ClienteWizard', component: ClienteWizard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router