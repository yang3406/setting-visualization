import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import VisualScreen from './visualScreen'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/visualScreen',
  component: () => import('../views/visualScreen/index'),
  meta: {
    name: '视化入口'
  },
  children: VisualScreen
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
