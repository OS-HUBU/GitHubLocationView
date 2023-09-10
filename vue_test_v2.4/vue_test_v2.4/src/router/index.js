import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    
  },
  {
    path: '/china',
    name: 'china',
    component: () => import('../views/HomeView1.vue')
  },
  {
    path: '/world',
    name: 'world',
    component: () => import('../views/HomeView.vue'),
  },
   {
    path: '/main1',
    name: 'mian1',
    component: () => import('../views/MainView.vue')
  },   {
    path: '/main2',
    name: 'mian2',
    component: () => import('../views/MainView1.vue')
  },
  // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
