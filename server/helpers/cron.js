const cron = require('node-cron'),
    kue = require('kue'),
    Question = require('../models/question')
    mail = require('./mail'),
    queue = kue.createQueue()

module.exports = () => {
    cron.schedule('00 07 * * 7', () => {
        Question
            .find()
            .populate('userId')
            .then(function (allQuestion) {
                allQuestion.forEach(e => {
                    let text = `Hello, ${e.userId.email}!<br>
                Your question for "${e.title}" has commented for ${e.comments.length} time(s).<br>
                Also your question been upvoted for ${e.upvotes.length} time(s) and downvoted for ${e.downvotes.length} time(s).<br>
                Thank you!`
                    let email = e.userId.email
                    queue.create('email', {
                        email,
                        text
                    }).save()
                });
            })
            .catch(function (err) {
                console.log(err)
            })
        queue.process('email', function (job, done) {
            mail(job.data.email, job.data.text)
            done()
        })
    })
}