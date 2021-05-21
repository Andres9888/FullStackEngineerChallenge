import React from 'react'

import { useSession } from 'next-auth/client'
import AdminPanel from '~views/components/AdminPanel'
import EmployeePanel from '~views/components/EmployeePanel'
import Nav from '~views/components/Nav'

export default function Page () {
  const [session, loading] = useSession()
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Nav />
      {session && session.user.name === 'admin' && <AdminPanel />}
      {session && session.user.name !== 'admin' && <EmployeePanel />}
    </>
  )
}
