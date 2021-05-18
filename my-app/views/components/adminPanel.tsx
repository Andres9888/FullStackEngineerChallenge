import React from 'react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Table } from "antd";

const USERS = gql`
query users {
  users {
    name
  }
}
`
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const AdminPanel = () =>{ 
  const {
    data:{users},
    loading,
    error,
    refetch,
  } = useQuery(USERS)

  return(
<Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={users}
  />
  )}
export default AdminPanel
