import { MongoClient } from 'mongodb'


export const connectDatabase = async () => {
  const client = await MongoClient.connect("mongodb+srv://andres9888:andresmongo@cluster0.8bama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db("paypay-codetest-db")

  return {
    users: db.collection('paypay-codetest-collection'),
  }
}
