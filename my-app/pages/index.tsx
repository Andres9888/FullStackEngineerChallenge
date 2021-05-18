import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import AdminPanel from '~views/components/adminPanel'

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

      {session && session.user.name === "admin" &&(<AdminPanel /> )}

      <div>
        <Link href='/private'>
          <a>Go to private page</a>
        </Link>
      </div>
    </>
  )
}
