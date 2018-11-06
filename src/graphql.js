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

export const CREATE_TASK_MUTATION = gql`
  mutation($projectId: ID!, $name: String!) {
    createTask(input: {
      projectId: $projectId,
      name: $name
    }) {
      task {
        id
        name
        done
        projectId
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const UPDATE_TASK_MUTATION = gql`
  mutation($id: ID!, $name: String, $done: Boolean) {
    updateTask(input: {
      id: $id,
      name: $name,
      done: $done
    }) {
      task {
        id
        name
        done
        projectId
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation($id: ID!) {
    destroyTask(input: {
      id: $id
    }) {
      errors {
        messages,
        path
      }
    }
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation($taskId: ID!, $body: String!, $attachment: Upload) {
    createComment(input: {
      body: $body,
      taskId: $taskId,
      attachment: $attachment
    }) {
      comment {
        id
        body
        attachmentUrl
        taskId
      },
      errors {
        messages,
        path
      }
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation($id: ID!) {
    destroyComment(input: {
      id: $id
    }) {
      errors {
        messages,
        path
      }
    }
  }
`
