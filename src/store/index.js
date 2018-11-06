import Vue from 'vue'
import Vuex from 'vuex'
import apolloClient from '@/utils/apolloClient'

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION
} from '@/graphql'

Vue.use(Vuex)

export const mutations = {
  removeAlert (state) {
    state.alert = null
  },
  addError (state, errors) {
    if (errors.length === 0) {
      return null
    }
    state.alert = {
      messages: errors.map((error) => {
        return `${error.path[error.path.length - 1]}: ${error.messages.join()}`
      }),
      alertType: 'danger'
    }
  },
  addGraphQlError (state, errors) {
    if (errors.length === 0) {
      return null
    }
    state.alert = {
      messages: errors.map((error) => { return error.message }),
      alertType: 'danger'
    }
  },
  addSuccess (state, messages) {
    state.alert = {
      messages: messages,
      alertType: 'success'
    }
  }
}

export const actions = {
  removeAlert ({ commit }) {
    commit('removeAlert')
  },
  async login ({ commit }, { email, password, router }) {
    await apolloClient
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: email,
          password: password
        }
      })
      .then(response => {
        localStorage.setItem('user-token', response.data.createSession.token)
        router.replace('/')
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async signup ({ commit }, { email, password, passwordConfirmation, router }) {
    await apolloClient
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation
        }
      })
      .then(response => {
        if (response.data.createUser.errors.length === 0) {
          commit('addSuccess', ['You have successfully registered!'])
          router.replace('/login')
        } else {
          commit('addError', response.data.createUser.errors)
        }
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  }
}

export const state = {
  alert: null
}

export default new Vuex.Store({
  mutations,
  actions,
  state
})
