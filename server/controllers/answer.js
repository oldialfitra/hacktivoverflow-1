const Answer = require('../models/answer'),
    Question = require('../models/question'),
    checkComment = require('../helpers/checkComments')

class AnswerController {

    static createAnswer(req, res) {
        Answer
            .create({
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [],
                userId: req.userLoggedIn.id
            })
            .then(function (newAnswer) {
                return Question
                    .findByIdAndUpdate(req.params.id, {
                        $push: {
                            comments: newAnswer._id
                        }
                    }, {
                            new: true
                        })
            })
            .then(function (newAnswer) {
                res.status(201).json(newAnswer)
            })
            .catch(function (err) {
                console.log(err)
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

    static getAllAnswer(req, res) {
        Answer
            .find()
            .sort({ createdAt: -1 })
            .populate('upvotes')
            .populate('downvotes')
            .populate('userId')
            .then(function (allAnswer) {
                res.status(200).json(allAnswer)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneAnswer(req, res) {
        Answer
            .findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments')
            .populate('userId')
            .then(function (oneAnswer) {
                res.status(200).json(oneAnswer)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateAnswer(req, res) {
        Answer
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                    new: true
                })
            .then(function (oneAnswer) {
                res.status(200).json(oneAnswer)
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

    static deleteAnswer(req, res) {
        Question
            .find()
            .then(function (allQuestion) {
                allQuestion.forEach(e => {
                    checkComment(e, req.params.id)
                });
                return allQuestion
            })
            .then(function (allQuestion) {
                Answer
                    .findByIdAndDelete(req.params.id)
            })
            .then(function (oneAnswer) {
                res.status(200).json(oneAnswer)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static upvoteAnswer(req, res) {
        console.log('masuk ke up')
        Answer
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
                return Answer.findByIdAndUpdate(req.params.id, {
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

    static downvoteAnswer(req, res) {

        Answer
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
                return Answer.findByIdAndUpdate(req.params.id, {
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

module.exports = AnswerController