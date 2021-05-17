// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDatabase } from '../../server/database/index.js'


const user = async () => {
  const db = await connectDatabase()
  return await db.users.find({}).toArray()
}




export default (req, res) => {
  res.status(200).json(user)
}
