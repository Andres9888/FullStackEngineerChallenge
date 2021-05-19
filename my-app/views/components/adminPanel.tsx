import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Table } from 'antd'
import { Form, Input, Button, Popconfirm, Comment, Tooltip, Avatar } from 'antd'
import moment from 'moment'

import 'antd/dist/antd.css'

const USERS = gql`
  query users {
    users {
      name
      review{
        author
        review
      }
    }
  }
`

const INCREMENT_COUNT = gql`
  mutation addEmployee($name: String!, $feedback: String! ) {
    addEmployee(name: $name, feedback: $feedback) {
      acknowledged
    }
  }
`
const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee($name: String!) {
    removeEmployee(name: $name) {
      acknowledged
    }
  }
`

type LayoutType = Parameters<typeof Form>[0]['layout']

const AdminPanel = () => {
  const { data, loading, error, refetch } = useQuery(USERS)
  const [incrementCount] = useMutation(INCREMENT_COUNT)
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE)
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal')

  const columns = [
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x',
      render: (text, record) => (
        <Popconfirm
          title='Are you sure you want to remove this employee?'
          onConfirm={() => handleRemove(record.name)}
        >
          <a>Delete</a>
        </Popconfirm>
      )
    }
  ]

  const handleSubmit = async e => {
    // grab form values
    let form_vals = form.getFieldsValue(['user', 'username'])
    let form_vals2 = form.getFieldsValue(['review', 'review2'])
    console.log(form_vals2.review.review2)
    // perform the rest of submit logic here...
    await incrementCount({ variables: { name: form_vals.user.username,feedback: form_vals2.review.review2 } })
    refetch()
  }

  const handleRemove = async name => {
    await removeEmployee({ variables: { name: name } })
    refetch()
  }

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 }
        }
      : null

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
      
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item name={['user', 'username']} label='Add Employee'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item name={['review', 'review2']} label='Add Review'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={handleSubmit} type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            
            
            record.review.map((element)=> <Comment
            actions={actions}
            author={<a>{element.author}</a>}
            avatar={<Avatar src='' alt='Han Solo' />}
            content={
              <p>
                {element.review}
              </p>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          /> )
            
            
          ),
          rowExpandable: record => record.name !== 'Not Expandable'
        }}
        dataSource={data.users}
      />
    </div>
  )
}
export default AdminPanel
