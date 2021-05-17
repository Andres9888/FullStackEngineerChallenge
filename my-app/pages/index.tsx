import React, {useEffect, useState} from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/client"
import axios from "axios"

export default function Page() {
  const [session, loading] = useSession()
  const [data, setData] = useState({ hits: [] });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:9000/',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);
 
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
      <div>
        <Link href="/private">
          <a>Go to private page</a>
        </Link>
      </div>
    </>
  )
}