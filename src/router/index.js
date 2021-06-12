import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Activate from '../views/Activate.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResendActivationEmail from '../views/ResendActivationEmail.vue'
import NewPassword from '../views/NewPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },

  {
    path: '/reset-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guest: true
    }
  },
  {
    path: '/password-reset/:token',
    name: 'NewPassword',
    component: NewPassword,
    meta: {
      guest: true
    }
  },
  {
    path: '/resend-email',
    name: 'ResendActivationEmail',
    component: ResendActivationEmail,
    meta: {
      guest: true
    }
  },
  {
    path: '/activate/:token',
    name: 'Activate',
    component: Activate,
    meta: {
      guest: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
