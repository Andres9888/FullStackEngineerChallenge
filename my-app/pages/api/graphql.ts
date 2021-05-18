import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '~server/graphql/types/clientType'
import { resolvers } from '~server/graphql/resolvers/clientResolver'
import { schema } from '~lib/schema'
import { connectDatabase } from '~server/database'

const playground = {
  endpoint: `/api/graphql`
}

const apolloServerMicro = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  playground,
  context: async () => {
    const db = await connectDatabase()
    return {db}
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServerMicro.createHandler({ path: '/api/graphql' })
