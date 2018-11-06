import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/components/ProjectList'
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
      name: 'ProjectList',
      component: ProjectList,
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
