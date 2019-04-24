const Question = require('../models/question'),
    Answer = require('../models/answer')

class QuestionController {

    static createQuestion(req, res) {
        Question
            .create({
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [],
                comments: [],
                tags: req.body.tags,
                userId: req.userLoggedIn.id
            })
            .then(function (newQuestion) {
                res.status(201).json(newQuestion)
            })
            .catch(function (err) {
                if (err.errors.title) {
                    res.status(400).json({
                        message: err.errors.title.message
                    })
                } else if (err.errors.description) {
                    res.status(400).json({
                        message: err.errors.description.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static getAllQuestion(req, res) {
        Question
            .find()
            .sort({ createdAt: -1 })
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments')
            .populate('userId')
            .then(function (allQuestion) {
                res.status(200).json(allQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getMyQuestion(req, res) {
        Question
            .find({
                userId: req.userLoggedIn.id
            })
            .sort({ createdAt: -1 })
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments')
            .populate('userId')
            .then(function (oneQuestion) {
                res.status(200).json(oneQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneQuestion(req, res) {
        Question
            .findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments')
            .populate('userId')
            .then(function (oneQuestion) {
                res.status(200).json(oneQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateQuestion(req, res) {
        Question
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                    new: true
                })
            .then(function (oneQuestion) {
                res.status(200).json(oneQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deleteQuestion(req, res) {
        Question
            .findByIdAndDelete(req.params.id)
            .then(function (oneQuestion) {
                res.status(200).json(oneQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static upvoteQuestion(req, res) {
        console.log('masuk ke up')
        Question
            .findById(req.params.id)
            .then(function (onePost) {
                let flagUp = true
                console.log('masuk ke then')
                let vote = {
                    oneUpvote: onePost.upvotes,
                    oneDownvote: onePost.downvotes
                }
                if (vote.oneUpvote.length > 0) {
                    console.log('masuk ke if pertama')
                    for (let i = 0; i < vote.oneUpvote.length; i++) {
                        if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.userLoggedIn.id)) {
                            flagUp = false
                            break
                        }
                    }
                    console.log(flagUp)
                    if (flagUp === false) {
                        throw ({
                            message: `You already upvote this post`
                        })
                    }
                    else {
                        vote.oneUpvote.push(req.userLoggedIn.id)
                        return vote
                    }
                }
                else {
                    vote.oneUpvote.push(req.userLoggedIn.id)
                    return vote
                }
            })
            .then(function (vote) {
                if (vote.oneDownvote.length > 0) {
                    for (let i = 0; i < vote.oneDownvote.length; i++) {
                        if (JSON.stringify(vote.oneDownvote[i]) === JSON.stringify(req.userLoggedIn.id)) {
                            vote.oneDownvote.splice(i, 1)
                        }
                    }
                }
                return Question.findByIdAndUpdate(req.params.id, {
                    upvotes: vote.oneUpvote,
                    downvotes: vote.oneDownvote
                })
            })
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static downvoteQuestion(req, res) {

        Question
            .findById(req.params.id)
            .then(function (onePost) {
                let flagUp = true
                let vote = {
                    oneUpvote: onePost.upvotes,
                    oneDownvote: onePost.downvotes
                }
                if (vote.oneDownvote.length > 0) {
                    for (let i = 0; i < vote.oneDownvote.length; i++) {
                        if (JSON.stringify(vote.oneDownvote[i]) === JSON.stringify(req.userLoggedIn.id)) {
                            flagUp = false
                            break
                        }
                    }
                    if (!flagUp) {
                        throw ({
                            message: `You already downvote this post`
                        })
                    }
                    else {
                        vote.oneDownvote.push(req.userLoggedIn.id)
                        return vote
                    }
                }
                else {
                    vote.oneDownvote.push(req.userLoggedIn.id)
                    return vote
                }
            })
            .then(function (vote) {
                if (vote.oneUpvote.length > 0) {
                    for (let i = 0; i < vote.oneUpvote.length; i++) {
                        if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.userLoggedIn.id)) {
                            vote.oneUpvote.splice(i, 1)
                        }
                    }
                }
                return Question.findByIdAndUpdate(req.params.id, {
                    upvotes: vote.oneUpvote,
                    downvotes: vote.oneDownvote
                })
            })
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = QuestionController