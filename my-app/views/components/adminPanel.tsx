import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USERS } from '~graphql/queries/queries'
import { ASSIGN_EMPLOYEE, REMOVE_EMPLOYEE } from '~graphql/mutations/mutations'
import {
  Table,
  Popconfirm,
  Comment,
  Tooltip,
  Avatar,
  Menu,
  Dropdown,
  message,
  Space,
  Spin
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import AdminForm from '~views/components/AdminForm'

import moment from 'moment'

const AdminPanel = () => {
  const { data, loading, error, refetch } = useQuery(USERS)
  console.log(data)
  const [assignEmployee] = useMutation(ASSIGN_EMPLOYEE)
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
            <a>Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]
  
  const actions = [<span key='comment-basic-reply-to'>Reply to</span>]

  const handleRemove = async name => {
    await removeEmployee({ variables: { name: name } })
    refetch()
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
    return <h1>Loading...</h1>
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
