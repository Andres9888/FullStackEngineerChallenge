import gql from 'graphql-tag'

export const USERS = gql`
  query users {
    users {
      name
      image
      review {
        author
        review
      }
    }
  }
`
// export const GET_CURRENT_USER = gql`
//   query getCurrentuser($currentUser: String!) {
//     getCurrentuser(currentUser: $currentUser) {
//       name
//       image
//     }
//   }
// `

export const GET_ASSIGNED_EMPLOYEE = gql`
  query getAssignedEmployees($name: String!) {
    getAssignedEmployees(name: $name) {
      profileReview {
        name
        image
        review {
          author
          review
        }
      }
    }
  }
`

