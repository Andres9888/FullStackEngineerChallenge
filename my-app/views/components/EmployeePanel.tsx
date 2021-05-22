import React, { useState } from 'react'

import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  Table,
  Tooltip,
  Skeleton,
  Select,
  Row
} from 'antd'
import gql from 'graphql-tag'
import moment from 'moment'
import { useSession } from 'next-auth/client'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { GET_ASSIGNED_EMPLOYEE } from '~graphql/queries/queries'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons'

import { GIVE_FEEDBACK } from '~graphql/mutations/mutations'

const { Option } = Select

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

  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [dropdown, setDropdown] = useState('')


  const { data, loading, error, refetch } = useQuery(GET_ASSIGNED_EMPLOYEE, {
    variables: { name: session.user.name }
  })
  const [giveFeedback] = useMutation(GIVE_FEEDBACK,{variables: { reviewEmployee: dropdown,reviewer: session.user.name, feedback: value }})

  console.log(data)
  

  const columns = [
    { title: 'image', dataIndex: 'image', key: 'image', render: (text, record) => (
      <Avatar src={record.image}/>
    ) },
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x'
    }
  ]
  const handleChangeDropdown = value => {
    setDropdown(value)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit =  async () => {
    await giveFeedback()
    refetch()
    setSubmitting(true)
  }

  const actions = [<span key='comment-basic-reply-to'>Reply to</span>]

  if (loading) {
    return <Skeleton active />
  }
  if (error) {
    return (
      <h1>Error more than likely a database connection issue or network</h1>
    )
  }
  if (!data.getAssignedEmployees[0]) {
    return (
      <h1>No Performance Reviews</h1>
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
      /><Row>
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder='Search to Select'
        optionFilterProp='children'
        onChange={value => {
          handleChangeDropdown(value)
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {data.getAssignedEmployees[0].profileReview.map((element, index) => (
          <Option value={element.name}>{element.name}</Option>
        ))}
      </Select></Row>
      ,
      <Comment
        avatar={<Avatar src='' alt='' />}
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
