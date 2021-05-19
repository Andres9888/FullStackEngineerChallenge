// @ts-nocheck
import { ObjectId } from 'mongodb'

export const resolvers = {
  // Query
  Query: {
    users: async (_root: undefined, _args: {}, { db }) => {
      return await db.users.find({}).toArray()
    }
  },
  Mutation: {
    addEmployee: async (
      _root: undefined,
      { name, feedback },
      { db }
    ) => {
      return await db.users.insert({
        name: name,
        review: [{ author: 'admin', review: feedback }],
        employeesToReview:[]
      })
    },
    removeEmployee: async (
      _root: undefined,
      { name }: { name: string },
      { db }
    ) => {
      return await db.users.deleteOne({ name: name })
    },
    

    assignEmployeeReview: async (
      _root: undefined,
      { assignEmployee, employeeNameToReview },
      { db }
    ) => {
      return await db.users.updateOne(
        { name: assignEmployee },
        { $addToSet: { employeesToReview: employeeNameToReview } }
      )
    }
  }
}
