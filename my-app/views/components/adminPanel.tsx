import React from 'react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'


const USERS = gql`
query users {
  users {
    name
  }
}
`

const AdminPanel = () =>{ 
  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery(USERS)
  
  

  return(
 <h1>{console.log(data)}</h1>
)
  }
export default AdminPanel
