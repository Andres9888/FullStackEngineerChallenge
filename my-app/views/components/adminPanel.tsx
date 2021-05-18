import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Table } from 'antd'
import { Form, Input, Button, Radio, Popconfirm } from 'antd'
import 'antd/dist/antd.css'

const USERS = gql`
  query users {
    users {
      name
    }
  }
`

const INCREMENT_COUNT = gql`
  mutation addEmployee( $name: String!) {
    addEmployee(name: $name) {
      acknowledged
    }
  }`
  const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee( $name: String!) {
    removeEmployee(name: $name) {
      acknowledged
    }
  }`



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
      render: (text, record) =>(
              <Popconfirm title="Are you sure you want to remove this employee?" onConfirm={() => handleRemove(record.name)}>
                <a>Delete</a>
              </Popconfirm>
            ) 
    }
  ]

  const handleSubmit = async (e) => {
    // grab form values
    let form_vals = form.getFieldsValue(['user', 'username']);
    // perform the rest of submit logic here...
    await incrementCount({ variables: { name: form_vals.user.username } });
    refetch();
    
  };

  const handleRemove = async (name) => {
    await removeEmployee({ variables: { name: name } });
    refetch();
  };

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
      <h1>add new employee</h1>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item name={['user', 'username']}  label='Field A'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={handleSubmit} type='primary'>Submit</Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record.name}</p>
          ),
          rowExpandable: record => record.name !== 'Not Expandable'
        }}
        dataSource={data.users}
      />
    </div>
  )
}
export default AdminPanel
