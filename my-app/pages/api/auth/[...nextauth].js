import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectDatabase } from '~server/database'

const fetchData = async () => {
  const db = await connectDatabase()
  const users = await db.users.find({}).toArray()
  return users
}
let users = fetchData()
const isCorrectCredentials = async function (credentials) {
  let data = await users
  return data.some(user => user.name === credentials.username)
}

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' }
      },
      authorize: async credentials => {
        if (await isCorrectCredentials(credentials)) {
          let data = await users
          const find = data.find(
            element => element.name === credentials.username
          )

          const user = find

          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    })
  ]
}

export default (req, res) => NextAuth(req, res, options)
