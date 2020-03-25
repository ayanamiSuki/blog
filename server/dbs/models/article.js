import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const editorSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    }
})
export default mongoose.model('Article', editorSchema)