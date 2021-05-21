import gql from 'graphql-tag'

export const ADD_EMPLOYEE = gql`
  mutation addEmployee($name: String!, $feedback: String!, $picture: String) {
    addEmployee(name: $name, feedback: $feedback, picture: $picture) {
      acknowledged
    }
  }
`
export const ASSIGN_EMPLOYEE = gql`
  mutation assignEmployeeReview($assignEmployee: String!, $employeeNameToReview: String!) {
    assignEmployeeReview(assignEmployee: $assignEmployee, employeeNameToReview: $employeeNameToReview) {
      acknowledged
    }
  }
`

export const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee($name: String!) {
    removeEmployee(name: $name) {
      acknowledged
    }
  }
`