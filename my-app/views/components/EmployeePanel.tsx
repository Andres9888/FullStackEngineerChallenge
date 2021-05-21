import React, { useState } from 'react'

import { Avatar, Button, Comment, Form, Input, Table, Tooltip, Skeleton } from 'antd'
import gql from 'graphql-tag'
import moment from 'moment'
import { useSession } from 'next-auth/client'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_ASSIGNED_EMPLOYEE } from '~graphql/queries/queries'
import { UserOutlined,InfoCircleOutlined  } from '@ant-design/icons'

//import { GIVE_FEEDBACK } from '~graphql/mutations/mutations'






const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
)

const EmployeePanel = () => {
  const [session] = useSession()
  const { data, loading, error, refetch } = useQuery(GET_ASSIGNED_EMPLOYEE, {
    variables: { name: session.user.name }
  })
  //const [giveFeedback] = useMutation(GIVE_FEEDBACK)

  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const columns = [
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x'
    }
  ]

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    if (!value) {
      return
    }
    setSubmitting(true)
  }

  const actions = [<span key='comment-basic-reply-to'>Reply to</span>]

  if (loading) {
    return <Skeleton active/>
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
       <Input
      placeholder="Enter your username"
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
      <Comment
        avatar={
          <Avatar
            src=''
            alt=''
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  )
}
export default EmployeePanel
