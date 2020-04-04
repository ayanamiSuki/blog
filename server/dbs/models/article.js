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
    },
    bg: {
        type: String,
        default: 'https://wx1.sinaimg.cn/mw690/9afd6f06gy1gct7zcioagj20p00irwiw.jpg'
    },
    click: {
        type: Number,
        default: 1
    }
})
export default mongoose.model('Article', editorSchema)