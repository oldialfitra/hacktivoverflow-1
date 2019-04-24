const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
        timestamps: {}
    })

const Answer = mongoose.model('answer', answerSchema)
module.exports = Answer