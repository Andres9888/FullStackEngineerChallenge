import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  Table,
  Popconfirm,
  Comment,
  Tooltip,
  Avatar,
  Menu,
  Dropdown,
  Space,
  Spin
} from 'antd'
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons'
import { signIn, signOut, useSession } from 'next-auth/client'
import 'antd/dist/antd.css'

const USERS = gql`
  query getAssignedEmployees($name: String!) {
    getAssignedEmployees(name: $name) {
      profileReview {
        name
        review {
          author
          review
        }
      }
    }
  }
`

const INCREMENT_COUNT = gql`
  mutation addEmployee($name: String!, $feedback: String!) {
    addEmployee(name: $name, feedback: $feedback) {
      acknowledged
    }
  }
`

const EmployeePanel = ({ currentEmployee }) => {
  const [session] = useSession()
 
  const { data, loading, error, refetch } = useQuery(USERS, {
     variables: { name: session.user.name }
   })
  const [incrementCount] = useMutation(INCREMENT_COUNT)
  const columns = [
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x',
    }
  ]
  
  const actions = [<span key='comment-basic-reply-to'>Reply to</span>]

  if (loading) {
     return <h1>Loading...</h1>
  }
   if (error) {
     return (
     <h1>Error more than likely a database connection issue or network</h1>
    )
   }
  return (
    
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record =>
            record.review.map(element => (
              <Comment
                actions={actions}
                author={<a>{element.author}</a>}
                avatar={<Avatar src='' alt='' />}
                content={<p>{element.review}</p>}
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            )),
          rowExpandable: record => record.name !== 'Not Expandable'
        }}
        dataSource={data.getAssignedEmployees[0].profileReview}
      />
    </div>
  )
}
export default EmployeePanel
