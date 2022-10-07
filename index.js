const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3000
const url = 'mongodb://root:password@localhost:27017'

app.get('/reminders', async (req, res) => {
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    const names = await collection.find({}).toArray()
    res.json(names)
})