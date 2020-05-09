import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Computers from '../views/Computers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/computers',
    name: 'computers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Computers
  },
  {
    path: '/cellphones',
    name: 'cellphones',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Cellphones.vue')
    }
  },
  {
    path: '/breakout',
    name: 'breakout',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/BreakoutView.vue')
    }
  },
  {
    path: '/resources',
    name: 'resources',
    component: function(){
      return import('../views/Resources.vue')
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
