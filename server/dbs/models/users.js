import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: 'https://wx3.sinaimg.cn/mw690/9afd6f06gy1gct7ybm61qj20hs0p4gni.jpg'
    }
})


export default mongoose.model("Users", UserSchema);