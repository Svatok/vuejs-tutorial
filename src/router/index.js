import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  const token = localStorage.getItem('user-token')
  if (!token) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  const token = localStorage.getItem('user-token')
  if (token) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
