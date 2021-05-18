// @ts-nocheck
import { ObjectId } from 'mongodb'
import { connectDatabase } from '~server/database'



// const cookieOptions = {
//   httpOnly: true,
//   sameSite: true,
//   signed: true,
//   secure: process.env.NODE_ENV === 'development' ? false : true,
// }

const getDb = async () => {
  const db = await connectDatabase()
  return db
}



export const resolvers = {
  // Query
  Query: {
    listings: async () => {
      const db = await getDb()
      return await db.users.find({}).toArray()
    }
  }
 
}
