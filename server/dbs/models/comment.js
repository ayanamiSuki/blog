import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    articleId: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
})

export default mongoose.model('comment', commentSchema);