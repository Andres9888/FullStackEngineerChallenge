import React from 'react'

import { useSession } from 'next-auth/client'
import AdminPanel from '~views/components/AdminPanel'
import EmployeePanel from '~views/components/EmployeePanel'
import Nav from '~views/components/Nav'
import { Row, Skeleton } from 'antd'

export default function Page () {
  const [session, loading] = useSession()

  if (loading) {
    return (
      <>
        <Nav />
        <Skeleton active />
      </>
    )
  }

  return (
    <>
      <Nav />
      {!session && <Row justify="center"> <h1>log in to view your data</h1></Row>}
      {session && session.user.name === 'admin' && <AdminPanel />}
      {session && session.user.name !== 'admin' && <EmployeePanel />}
    </>
  )
}
