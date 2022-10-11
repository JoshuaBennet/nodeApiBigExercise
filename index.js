const express = require('express')
const {ObjectId} = require("mongodb")
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 4000
const url = 'mongodb://root:password@localhost:27017'
const cors = require('cors')
app.use(express.json())
app.use(cors())

// need to functionalize and add the error catching and exceptions

app.get('/reminders', async (req, res) => {
    if (req.query.done === 'true') {
        const connection = await MongoClient.connect(url)
        const collection = connection.db('remindersExercise').collection('reminders')
        const reminders = await collection.find({done: true}).toArray();
        res.status(200).json({success: true, message: "Retrieved all reminders that are done", data: reminders})
    } else if (req.query.done === 'false') {
        const connection = await MongoClient.connect(url)
        const collection = connection.db('remindersExercise').collection('reminders')
        const reminders = await collection.find({done: false}).toArray();
        res.status(200).json({success: true, message: "Retrieved all reminders that are not done", data: reminders})
    } else {
        const connection = await MongoClient.connect(url)
        const collection = connection.db('remindersExercise').collection('reminders')
        const reminders = await collection.find({}).toArray()
        res.status(200).json({success: true, message: "Retrieved all reminders", data: reminders})
    }
})

app.post('/reminders', async (req, res) => {
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    const newReminderData = {
        done: req.body.done,
        title: req.body.title
    }
    await collection.insertOne(newReminderData)
    res.sendStatus(200)
})

app.delete('/reminders', async (req, res) => {
    const uselessObjectId = req.query.id
    // needs to be in try catch, this is a bomb in code
    const objectId = ObjectId(uselessObjectId)
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    await collection.deleteOne({_id: objectId})
    res.status(200).json({success: true, message: "Deleted reminder", data: []})
})


app.put('/reminders', async (req, res) => {
    const uselessObjectId = req.query.id
    const objectId = ObjectId(uselessObjectId)
    const connection = await MongoClient.connect(url)
    const collection = connection.db('remindersExercise').collection('reminders')
    await collection.updateOne({_id: ObjectId}, {$set: {done: req.body.done}})
    res.status(200).json({success: true, message: "Updated status", data: []})
})


app.listen(port)
