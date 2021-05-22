import '~styles/globals.css'

import { Provider } from 'next-auth/client'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import Nav from '~views/components/Nav'
const apollo = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
})

export default function App ({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Provider session={pageProps.session}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}
