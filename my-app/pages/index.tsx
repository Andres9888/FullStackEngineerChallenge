import React from 'react'

import { Skeleton } from 'antd'
import { useSession } from 'next-auth/client'
import AdminPanel from '~views/components/AdminPanel'
import EmployeePanel from '~views/components/EmployeePanel'
import NoLoginPanel from '~views/components/NoLoginPanel'

export default function Page () {
  const [session, loading] = useSession()

  if (loading) {
    return (
      <>
        <Skeleton active />
      </>
    )
  }

  return (
    <>
      {!session && <NoLoginPanel />}
      {session && session.user.name === 'admin' && <AdminPanel />}
      {session && session.user.name !== 'admin' && <EmployeePanel />}
    </>
  )
}
