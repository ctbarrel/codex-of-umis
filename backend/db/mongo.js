require('dotenv').config()
const {MongoClient} = require('mongodb')
const {query} = require('express')
const ObjectID = require ('mongodb').ObjectID

let client

function connect(locals) {
    
    const uri = `mongodb+srv://ctbarrel:${process.env.DBPASS}@cluster0.dnyub.mongodb.net/${process.env.DBDATABASE}?retryWrites=true&w=majority`

    client = new MongoClient(uri, {useUnifiedTopology: true})

    return client.connect()
    .then(connection => {
        locals.collectionChars = connection.db(`${process.env.DBDATABASE}`).collection('Characters')
        locals.collectionSpells = connection.db(`${process.env.DBDATABASE}`).collection('Spells')
        locals.collectionUsers = connection.db(`${process.env.DBDATABASE}`).collection('Users')
    })
    .catch (err => {
        console.log(err)
        process.exit()
    })
}

function readAll(info) {
    return info.collection.find(info.query).toArray()
}

function createOne(info) {
    return info.collection.insertOne(info.doc)
}

function readOne(info) {
    return info.collection.findOne(info.query)
}

function readOneById(info) {
    return info.collection.findOne({_id: ObjectID(info.id)}) //when looking up ID, need this function.
}

function replaceOne(info) {
    return info.collection.findOneAndReplace(info.query, info.doc, {returnOriginal: false})
}

function changeOne(info) {
    return info.collection.findOneAndUpdate(info.query, {$set: info.doc})
}

function deleteOne(info) {
    return info.collection.deleteOne(info.query)
}

function close() {
    client.close()
}

module.exports.connect = connect
module.exports.readAll = readAll
module.exports.createOne = createOne
module.exports.readOne = readOne
module.exports.replaceOne = replaceOne
module.exports.changeOne = changeOne
module.exports.deleteOne = deleteOne
module.exports.readOneById = readOneById
module.exports.close = close