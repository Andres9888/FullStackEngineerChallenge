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

import 'antd/dist/antd.css'

const USERS = gql`
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

const INCREMENT_COUNT = gql`
  mutation addEmployee($name: String!, $feedback: String!) {
    addEmployee(name: $name, feedback: $feedback) {
      acknowledged
    }
  }
`


const EmployeePanel = () => {
  const { data, loading, error, refetch } = useQuery(USERS)
  const [incrementCount] = useMutation(INCREMENT_COUNT)
  

  const menu = function(record){
    if (loading) {
      return <Spin />
    } else {
      return (
        <Menu>
          {data.users.map(element => (
            <Menu.Item 
              onClick={() => handleMenuClick(record.name,element.name)}
              key='1'
              icon={<UserOutlined />}
            >
              {element.name}
            </Menu.Item>
          ))}
        </Menu>
      )
    }
  }
  const columns = [
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x',
      render: (text, record) => (
        <Space wrap>
          <Dropdown.Button
            overlay={menu(record)}
            placement='bottomCenter'
            icon={<UserOutlined />}
          >
            Assign To Review
          </Dropdown.Button>
          <Popconfirm
            title='Are you sure you want to remove this employee?'
            //onConfirm={() => handleRemove(record.name)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleSubmit = async e => {
    // grab form values
    let form_vals = form.getFieldsValue(['user', 'username'])
    let form_vals2 = form.getFieldsValue(['review', 'review2'])
    console.log(form_vals2.review.review2)
    // perform the rest of submit logic here...
    await incrementCount({
      variables: {
        name: form_vals.user.username,
        feedback: form_vals2.review.review2
      }
    })
    refetch()
  }

  
  
  

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
                avatar={<Avatar src='' alt='Han Solo' />}
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
        dataSource={data.users}
      />
    </div>
  )
}
export default EmployeePanel
