// @ts-nocheck
import { Collection, ObjectId } from 'mongodb'

type review = {
  author: string
  review: string
}
interface User {
  _id: ObjectId
  name: string
  review: review[]
}

interface Database {
  users: Collection<User>
}

export const resolvers = {
  Query: {
    users: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      return await db.users.find({}).toArray()
    },
    getAssignedEmployees: async (_root: undefined, _args: {}, { db }) => {
      return await db.users.find({
        name: {
          $in: ['test', 'test3']
        }
      })
    }
  },
  Mutation: {
    addEmployee: async (
      _root: undefined,
      { name, feedback }: { name: string; feedback: string },
      { db }: { db: Database }
    ) => {
      return await db.users.insert({
        name: name,
        review: [{ author: 'admin', review: feedback }],
        employeesToReview: []
      })
    },
    removeEmployee: async (
      _root: undefined,
      { name }: { name: string },
      { db }: { db: Database }
    ) => {
      return await db.users.deleteOne({ name: name })
    },

    assignEmployeeReview: async (
      _root: undefined,
      { assignEmployee, employeeNameToReview },
      { db }: { db: Database }
    ) => {
      return await db.users.updateOne(
        { name: assignEmployee },
        { $addToSet: { employeesToReview: employeeNameToReview } }
      )
    }
  }
}
