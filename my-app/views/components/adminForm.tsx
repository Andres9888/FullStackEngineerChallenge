import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USERS } from '~graphql/queries/queries'
import { ADD_EMPLOYEE, ASSIGN_EMPLOYEE, REMOVE_EMPLOYEE } from '~graphql/mutations/mutations'
import {
  Table,
  Form,
  Input,
  Button,
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

import moment from 'moment'


type LayoutType = Parameters<typeof Form>[0]['layout']

const AdminForm = ({refetch}) => {
  const [incrementCount] = useMutation(ADD_EMPLOYEE)
  

  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal')

  
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
  

  
  return (
    <div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item
          name={['user', 'username']}
          rules={[{ required: true, message: 'Please input employee name!' }]}
          label='Add Employee'
        >
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item
          name={['review', 'review2']}
          rules={[{ required: true, message: 'Please input your review!' }]}
          label='Add Review'
        >
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={handleSubmit} type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AdminForm
