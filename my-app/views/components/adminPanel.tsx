import React from 'react'

import {
  Avatar,
  Button,
  Comment,
  Dropdown,
  Menu,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Spin,
  Table,
  Tooltip
} from 'antd'
import moment from 'moment'
import { ASSIGN_EMPLOYEE, REMOVE_EMPLOYEE } from '~graphql/mutations/mutations'
import { USERS } from '~graphql/queries/queries'
import {
  users as usersData
} from "~graphql/queries/__generated__/users";
import {
  assignEmployeeReview as assignEmployeeReviewData,assignEmployeeReviewVariables
} from "~graphql/mutations/__generated__/assignEmployeeReview";
import AdminForm from '~views/components/AdminForm'

import { UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/react-hooks'

const AdminPanel = () => {
  const { data, loading, error, refetch } = useQuery<usersData>(USERS)
  const [assignEmployee] = useMutation<assignEmployeeReviewData,assignEmployeeReviewVariables>(ASSIGN_EMPLOYEE)
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE)

  const menu = function (record) {
    if (loading) {
      return <Spin />
    } else {
      return (
        <Menu onClick={handleButtonClick}>
          {data.users.map(element => (
            <Menu.Item
              onClick={() => handleMenuClick(record.name, element.name)}
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
    { title: 'image', dataIndex: 'image', key: 'image', render: (text, record) => (
      <Avatar src={record.image}/>
    ) },
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
            onConfirm={() => handleRemove(record.name)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const actions = [<span key='comment-basic-reply-to'>Reply to</span>]

  const handleRemove = async name => {
    
    if(name === "admin"){
      alert('Can not delete an admin')
    }else{
    await removeEmployee({ variables: { name: name } })
    refetch()}
  }

  function handleButtonClick (e) {
    message.info('Click on right button.')
  }

  const handleMenuClick = async (employee, assignedEmployee) => {
    return await assignEmployee({
      variables: {
        assignEmployee: employee,
        employeeNameToReview: assignedEmployee
      }
    })
  }

  if (loading) {
    return <Skeleton loading={loading} active></Skeleton>
  }
  if (error) {
    return (
      <h1>Error more than likely a database connection issue or network</h1>
    )
  }

  return (
    <div>
      <AdminForm refetch={refetch} />
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
        dataSource={data.users}
      />
    </div>
  )
}
export default AdminPanel
