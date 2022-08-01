import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requireAuth: false },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('../views/MemberView.vue'),
    meta: { requireAuth: true },
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log('to: ', to, 'from: ', from);
  NProgress.start()
  if (to.meta.requireAuth) {
    const info = Cookies.get('login');
    const token = JSON.parse(info).token;
    console.log('token: ' + token);
    if (info) {
      if (token.length > 0 || token === undefined) {
        next()
      } else {
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done();
})


export default router
