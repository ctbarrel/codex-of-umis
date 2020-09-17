const express = require('express')
const router = express.Router()
const db = require('../../../db/mongo')
const app = require('../../../app')
const bcrypt = require('bcrypt')

async function formatUser(user) {

    let rtnVal
    //check for username
    if (!user.hasOwnProperty('username')) {
        throw new Error('No username property')
    } else {
        //copy user object and set username
        rtnVal = {...user}
        rtnVal.username = rtnVal.username.toLowerCase()

        if (user.hasOwnProperty('password')) {
            
            try {
                rtnVal.password = await bcrypt.hash(user.password, bcryptSalt)
            }
            catch (err) {
                HTMLFormControlsCollection.log("BCRYPT", err.message)
                throw err
            }
        }
    }

    return rtnVal
}

// GET users listing
router.get('/', function (req, res, next) {

    const info = {
        query: {},
        collection: req.app.locals.collectionUsers
    }
    
    db.readAll(info)
    .then(users => {
        console.log(users)
        res.json(users)
    })
    .catch(err => {
        res.status(500).send('Unable to GET document', err.message)
    })
})

router.post('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {
        
        const username = req.params.username.toLowerCase()
        const info = {
            query: {
                username: username
            },
            collection: req.app.locals.collectionUsers
        }

        db.readOne(info)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
    } else {
        res.status(400).send('Username not found')
    }
})

router.post('/', function (req, res, next) {

    formatUser(req.body)
    .then(user => {
        console.log("USER", user)

        const info = {
            doc: user,
            collection: req.app.locals.collectionUsers
        }
        
        db.readOne({
            query: {username: user.username},
            collection: req.app.locals.collectionUsers
        })
        .then(foundUser => {
            
            if (foundUser !== null) {
                res.status(400).send(`User ${user.username} already exists`)
            }
            return db.createOne(info)
        })
        .then(resDoc => {
            
            if (resDoc.insertedCount === 1) {
                //ops is an array of all inserted docs
                res.json(resDoc.ops[0])
            }
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
    }, err => {

        console.log(err.message)
        res.status(400).send(err.message)
    })
})

router.put('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {
        const username = req.params.username.toLowerCase()
        const info = {
            query: {
                username: username
            },
            doc: req.body,
            collection: req.app.locals.collectionUsers
        }

        db.replaceOne(info)
        .then(response => {

            if (response.value === null) {
                return db.createOne()
            }
            res.json(response)
        })
        .catch(err => {
            res.status(500).send('Failed to Replace', err)
        })
    } else {
        res.status(400).send('Username is undefined')
    }
})

router.patch('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {

        const username = req.params.username.toLowerCase()
        let user = req.body

        const info = {
            query: {
                username: username
            },
            doc: user,
            collection: req.app.locals.collectionUsers
        }

        db.changeOne(info)
        .then(response => {
            if (response.ok !== 1) {
                throw new Error(`Username ${username} not found`)
            }

            return db.readOneById({
                id: response.value._id,
                collection: req.app.locals.collectionUsers
            })
        })
        .then(resDoc => {
            res.json(response)
        })
        .catch(err => {
            res.status(500).send('Failed to update', err.message)
        }) 
    } else {
        res.status(400).send('Username is undefined')
    }
})

router.delete('/:username', function (req, res, next) {
    if (req.params.username !== undefined) {
        const username = req.params.username.toLowerCase()
        const info = {
            query: {username: username},
            collection: req.app.locals.collectionUsers
        }

        db.deleteOne(info)
        .then(response => {
            if (response.deletedCount === 1) {
                res.json({})
            } else {
                res.json(username)
            }
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
    } else {
        res.status(400).send('Username is undefined')
    }
})

module.exports = router