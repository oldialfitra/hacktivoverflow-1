const User = require('../models/user'),
    { decrypt } = require('../helpers/bcrypt'),
    jwt = require('jsonwebtoken')

class UserController {
    static signUp(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function (newUser) {
                res.status(201).json(newUser)
            })
            .catch(function (err) {
                console.log(err)
                if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static signIn(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function (uLogin) {
                console.log(uLogin)
                if (!uLogin) {
                    res.status(400).json({
                        message: 'email / password wrong'
                    })
                }
                else {
                    if (decrypt(req.body.password, uLogin.password) === false) {
                        res.status(400).json({
                            message: 'email / password wrong'
                        })
                    }
                    else {
                        let token = jwt.sign({ email: uLogin.email, id: uLogin._id }, process.env.SECRET)
                        res.status(200).json({ token, id: uLogin._id })
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static watchedTag(req, res) {
        User
            .findByIdAndUpdate(req.userLoggedIn.id, {
                tags: req.body.tags
            }, {
                    new: true
                })
            .then(function (myTag) {
                res.status(200).json(myTag)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getMyTags(req, res) {
        User
            .findById(req.userLoggedIn.id)
            .then(function (myTags) {
                res.status(200).json(myTags)
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = UserController