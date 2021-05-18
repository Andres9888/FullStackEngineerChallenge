// @ts-nocheck
import { ObjectId } from 'mongodb'



export const resolvers = {
  // Query
  Query: {
    users: async (_root: undefined, _args: {}, {db}) => {
      return await db.users.find({}).toArray()
    }
  },
  Mutation: {
    addEmployee: async (
      _root: undefined,
      { name  }: { name: string },
      {db}
    ) => {
        return await db.users.insertOne( { name: name });
    },
  }
 
}
