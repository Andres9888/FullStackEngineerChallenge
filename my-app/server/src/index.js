require('dotenv').config()

const express = require('express')
const port = 9000
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');




const mount = async app => {
  app.use(cors())

  const url =
    'mongodb+srv://andres9888:andresmongo@cluster0.8bama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('paypay-codetest-db')

    return {
      users: db.collection('paypay-codetest-collection')
    }
  }

  const db = await connectDatabase()
  const users = await db.users.find({}).toArray()

  // ...

  app.listen(port)
  app.get('/', (req, res) => res.send(users));

  console.log(`[app] : http://localhost:${port}`)
}

mount(express())
