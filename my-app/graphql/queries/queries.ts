import gql from 'graphql-tag'

export const USERS = gql`
  query users {
    users {
      name
      review {
        author
        review
      }
    }
  }
`

