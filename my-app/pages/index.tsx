import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import AdminPanel from '~views/components/adminPanel'
import EmployeePanel from '~views/components/EmployeePanel'
import NavBlank from '~views/components/NavBlank'

export default function Page () {
  const [session, loading] = useSession()
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      <NavBlank />
      {session && session.user.name === 'admin' && <AdminPanel />}
      {session && session.user.name !== 'admin' && <EmployeePanel />}
    </>
  )
}
