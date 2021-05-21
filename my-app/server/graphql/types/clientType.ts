//scalar IsoDate #declered for all .graphql files
import { gql } from '@apollo/client'

export const typeDefs = gql`
  type user {
    id: ID!
    name: String!
    review: [review!]!
    image: String
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
  
  type Acknowledged {
    acknowledged: Boolean
  }

  type Mutation {
    assignEmployeeReview( assignEmployee: String!, employeeNameToReview: String!): Acknowledged
    addEmployee( name: String!, feedback: String!, picture: String): Acknowledged
    removeEmployee( name: String! ): Acknowledged
    
  }

`
