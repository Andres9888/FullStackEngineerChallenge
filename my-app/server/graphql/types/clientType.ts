//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

export const typeDefs = gql`
  type user {
    id: ID!
    name: String!
    review: [review!]!
  }

  type review {
    author: String!
    review: String!
  }

  
  type Query {
    users: [user!]!
  }
  
  type CountResult {
    acknowledged: Boolean
  }

  type Mutation {
    assignEmployeeReview( assignEmployee: String!, employeeNameToReview: String!): CountResult
    addEmployee( name: String!, feedback: String!): CountResult
    removeEmployee( name: String! ): CountResult
  }

`
