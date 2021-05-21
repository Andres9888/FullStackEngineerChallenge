import React, { useState } from 'react'

import { Avatar, Button, Comment, Form, Input, Table, Tooltip, Skeleton } from 'antd'
import gql from 'graphql-tag'
import moment from 'moment'
import { useSession } from 'next-auth/client'

import { useMutation, useQuery } from '@apollo/react-hooks'

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
  const { data, loading, error, refetch } = useQuery(USERS, {
    variables: { name: session.user.name }
  })
  const [incrementCount] = useMutation(INCREMENT_COUNT)

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
      <Comment
        avatar={
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            alt='Han Solo'
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
