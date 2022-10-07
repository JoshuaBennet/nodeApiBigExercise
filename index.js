const express = require('express')
const {ObjectId} = require("mongodb");
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


// filter reminders on if they are done


app.get('/reminders/:id', async (req, res) => {
    const uselessObjectId = req.params._id
    const objectId = ObjectId(uselessObjectId)
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    const nameData = collection.findOne({_id: objectId})
    res.json(nameData)
})

app.post('/reminder', async (req, res) => {
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    const newReminderData = {
        deleted: false,
        done: false,
        title: req.body.title
    }
    await collection.insertOne(newReminderData)
    res.sendStatus(200)
})

app.delete('/reminders/:id', async (req, res) => {
    const uselessObjectId = req.params.id
    const objectId = ObjectId(uselessObjectId)
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    const reminder = collection.deleteOne({_id: objectId})
})


// Reminder is done/undone


app.listen(port)
