import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation($email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(input: {
      email: $email,
      password: $password,
      passwordConfirmation: $passwordConfirmation
    }) {
      user {
        id,
        email
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    createSession(input: {
      email: $email,
      password: $password,
    }) {
      user {
        id,
        email
      },
      token,
      errors {
        messages,
        path
      }
    }
  }
`

export const MY_PROJECTS_QUERY = gql`
  query {
    me {
      id
      projects {
        id
        title
        tasks {
          id
          name
          done
          projectId
          comments {
            id
            body
            attachmentUrl
            taskId
          }
        }
      }
    }
  }
`

export const CREATE_PROJECT_MUTATION = gql`
  mutation($title: String!) {
    createProject(input: {
      title: $title
    }) {
      project {
        id,
        title
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const UPDATE_PROJECT_MUTATION = gql`
  mutation($id: ID!, $title: String!) {
    updateProject(input: {
      id: $id,
      title: $title
    }) {
      project {
        id,
        title
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation($id: ID!) {
    destroyProject(input: {
      id: $id
    }) {
      errors {
        messages,
        path
      }
    }
  }
`
