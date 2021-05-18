//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

export const typeDefs = gql`
  type user {
    id: ID!
    name: String!
  }

  
  type Query {
    users: [user!]!
  }
  
  type CountResult {
    acknowledged: Boolean
  }

  type Mutation {
    addEmployee( name: String!): CountResult
    removeEmployee( name: String!): CountResult
  }

`
