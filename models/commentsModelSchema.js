const mongoose = require('mongoose')

const commSchema = mongoose.Schema({
    blogComment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blog'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
})

commSchema.set('timestamps', true)
module.exports = mongoose.model('comment', commSchema)