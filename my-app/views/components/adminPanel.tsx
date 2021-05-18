import React from 'react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Table } from "antd";
import 'antd/dist/antd.css'

const USERS = gql`
query users {
  users {
    name
  }
}
`
const columns = [
  { title: 'Employee', dataIndex: 'name', key: 'name' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const AdminPanel = () =>{ 
  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery(USERS)


if(loading){
  return <h1>Loading...</h1>
}
if(error){
  return <h1>Error more than likely a database connection issue or network</h1>
}


  return(
<Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data.users}
  />
  )}
export default AdminPanel
