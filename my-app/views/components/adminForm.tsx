import 'antd/dist/antd.css'

import React, { useState } from 'react'

import { Button, Form, Input } from 'antd'
import { ADD_EMPLOYEE } from '~graphql/mutations/mutations'

import { useMutation } from '@apollo/react-hooks'

type LayoutType = Parameters<typeof Form>[0]['layout']

const AdminForm = ({ refetch }) => {
  const [incrementCount] = useMutation(ADD_EMPLOYEE)

  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal')

  const handleSubmit = async e => {
    let formUserNameInput = form.getFieldsValue(['user', 'username'])
    let formReviewInput = form.getFieldsValue(['userReview', 'review'])

    await incrementCount({
      variables: {
        name: formUserNameInput.user.username,
        feedback: formReviewInput.userReview.review
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
        name={['userReview', 'review']}
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
  )
}
export default AdminForm
