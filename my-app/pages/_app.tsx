import { Provider } from "next-auth/client"
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    </ApolloProvider>
  )
}