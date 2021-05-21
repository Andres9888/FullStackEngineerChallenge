//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

export const typeDefs = gql`
  type user {
    id: ID!
    name: String!
    review: [review!]!
  }
  
  type employeesProfile {
    profileReview:[user]
  }

  type review {
    author: String!
    review: String!
  }

  
  type Query {
    users: [user!]!
    getAssignedEmployees(name: String!): [employeesProfile]
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
