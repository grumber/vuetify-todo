import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoView from '../views/TodoView.vue'
import goTo from 'vuetify/lib/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'todo',
    component: TodoView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  goTo(0, { duration: 0 });
})

export default router
