const jwt = require('jsonwebtoken'),
    Question = require('../models/question'),
    Answer = require('../models/answer'),
    User = require('../models/user')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try {
                req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
                console.log(req.userLoggedIn)
                next();
            }
            catch {
                res.status(401).json({ message: `You are not Authenticate` })
            }
        }
        else {
            res.status(401).json({ message: `Login First` })
        }
    },
    authorizationUser(req, res, next) {
        User
            .findById(req.userLoggedIn.id)
            .then(function (oneUser) {
                if (!oneUser) {
                    res.status(401).json({ message: `You are not Authorized` })
                } else {
                    next()
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    },
    authorizationQuestion(req, res, next) {
        Question
            .findById(req.params.id)
            .then(function (oneQuestion) {
                if (oneQuestion.userId.toString() === req.userLoggedIn.id) {
                    next()
                } else {
                    res.status(401).json({ message: `You are not Authorized` })
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    },
    authorizationAnswer(req, res, next) {
        Answer
            .findById(req.params.id)
            .then(function (oneAnswer) {
                if (oneAnswer.userId.toString() === req.userLoggedIn.id) {
                    next()
                } else {
                    res.status(401).json({ message: `You are not Authorized` })
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}