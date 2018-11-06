import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({
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
