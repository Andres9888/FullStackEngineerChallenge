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
    // getCurrentuser: async (
    //   _root: undefined,
    //    {name: currentUser}:{name:string},
    //   { db }: { db: Database }
    // ): Promise<User> => {
    //   return await db.users.find({ name: currentUser }).toArray()
    // },
    getAssignedEmployees: async (
      _root: undefined,
      { name }: { name: string },
      { db }: { db: Database }
    ) => {
      return await db.users
        .aggregate([
          {
            $match: {
              name: name
            }
          },
          {
            $unwind: {
              path: '$employeesToReview'
            }
          },
          {
            $lookup: {
              from: 'paypay-codetest-collection',
              localField: 'employeesToReview',
              foreignField: 'name',
              as: 'employeesProfile'
            }
          },
          {
            $project: {
              name: 0,
              employeesToReview: 0,
              _id: 0,
              review: 0,
              employeesProfile: {
                employeesToReview: 0
              }
            }
          },
          {
            $group: {
              _id: '$id',
              profileReview: {
                $addToSet: '$employeesProfile'
              }
            }
          },
          {
            $project: {
              _id: 0,
              profileReview: {
                $reduce: {
                  input: '$profileReview',
                  initialValue: [],
                  in: {
                    $concatArrays: ['$$value', '$$this']
                  }
                }
              }
            }
          }
        ])
        .toArray()
    }
  },
  Mutation: {
    addEmployee: async (
      _root: undefined,
      { name, feedback, picture }: { name: string; feedback: string, picture: string },
      { db }: { db: Database }
    ) => {
      return await db.users.insert({
        name: name,
        image: picture,
        review: [{ author: 'admin', review: feedback }],
        employeesToReview: []
      })
    },
    giveFeedback: async (
      _root: undefined,
      { reviewEmployee, feedback, reviewer  } : { reviewEmployee: string, feedback : string, reviewer: string  } ,
       { db }: { db: Database }
    ) => {
       return await db.users.update({ name: reviewEmployee },
       {$push :{ review: { author: reviewer, review: feedback }}},
     )
       
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
      {
        assignEmployee,
        employeeNameToReview
      }: { assignEmployee: string; employeeNameToReview: string },
      { db }: { db: Database }
    ) => {
      return await db.users.updateOne(
        { name: assignEmployee },
        { $addToSet: { employeesToReview: employeeNameToReview } }
      )
    }
  }
}
