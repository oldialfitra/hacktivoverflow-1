const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'answer'
    }],
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
        timestamps: {}
    })

const Question = mongoose.model('question', questionSchema)
module.exports = Question