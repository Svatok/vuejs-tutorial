import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: 'http://localhost:3000/graphql'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
