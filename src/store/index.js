import Vue from 'vue'
import Vuex from 'vuex'
import apolloClient from '@/utils/apolloClient'

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  MY_PROJECTS_QUERY,
  CREATE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  DELETE_TASK_MUTATION
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
  },
  setProjects (state, projects) {
    state.projects = projects
  },
  createProject (state, project) {
    state.projects = [
      ...state.projects,
      project
    ]
  },
  updateProject (state, project) {
    state.projects = [
      ...state.projects.filter(element => element.id !== project.id),
      project
    ]
  },
  deleteProject (state, id) {
    state.projects = [
      ...state.projects.filter(element => element.id !== id)
    ]
  },
  createTask (state, task) {
    const project = state.projects.find(element => element.id === String(task.projectId))
    project.tasks = [
      ...project.tasks,
      task
    ]
  },
  updateTask (state, task) {
    const project = state.projects.find(element => element.id === String(task.projectId))
    project.tasks = [
      ...project.tasks.filter(element => element.id !== task.id),
      task
    ]
  },
  deleteTask (state, task) {
    const project = state.projects.find(element => element.id === String(task.projectId))
    project.tasks = [
      ...project.tasks.filter(element => element.id !== task.id)
    ]
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
  },
  async fetchProjects ({ commit }) {
    await apolloClient
      .query({
        query: MY_PROJECTS_QUERY
      })
      .then(response => {
        commit('setProjects', response.data.me.projects)
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async createProject ({ commit }, { title }) {
    await apolloClient
      .mutate({
        mutation: CREATE_PROJECT_MUTATION,
        variables: {
          title: title
        }
      })
      .then(response => {
        if (response.data.createProject.errors.length === 0) {
          commit('createProject', response.data.createProject.project)
        } else {
          commit('addError', response.data.createProject.errors)
        }
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async updateProject ({ commit }, { id, title }) {
    await apolloClient
      .mutate({
        mutation: UPDATE_PROJECT_MUTATION,
        variables: {
          id: id,
          title: title
        }
      })
      .then(response => {
        if (response.data.updateProject.errors.length === 0) {
          commit('updateProject', response.data.updateProject.project)
        } else {
          commit('addError', response.data.updateProject.errors)
        }
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async deleteProject ({ commit }, { id }) {
    await apolloClient
      .mutate({
        mutation: DELETE_PROJECT_MUTATION,
        variables: {
          id: id
        }
      })
      .then(() => {
        commit('deleteProject', id)
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async createTask ({ commit }, { projectId, name }) {
    await apolloClient
      .mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          projectId: parseInt(projectId),
          name: name
        }
      })
      .then(response => {
        if (response.data.createTask.errors.length === 0) {
          commit('createTask', response.data.createTask.task)
        } else {
          commit('addError', response.data.createTask.errors)
        }
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async updateTask ({ commit }, task) {
    await apolloClient
      .mutate({
        mutation: UPDATE_TASK_MUTATION,
        variables: {
          ...task
        }
      })
      .then(response => {
        if (response.data.updateTask.errors.length === 0) {
          commit('updateTask', response.data.updateTask.task)
        } else {
          commit('addError', response.data.updateTask.errors)
        }
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  },
  async deleteTask ({ commit }, task) {
    await apolloClient
      .mutate({
        mutation: DELETE_TASK_MUTATION,
        variables: {
          id: task.id
        }
      })
      .then(() => {
        commit('deleteTask', task)
      })
      .catch(response => {
        commit('addGraphQlError', response.graphQLErrors)
      })
  }
}

export const state = {
  alert: null,
  projects: []
}

export default new Vuex.Store({
  mutations,
  actions,
  state
})
