import mongoose from "mongoose";

const Schema = mongoose.Schema;
const pictureSchema = new Schema({
  user: {
    type: String,
    require: true
  },
  bg: {
    type: String,
    default: "https://wx1.sinaimg.cn/mw690/9afd6f06gy1gct7zcioagj20p00irwiw.jpg"
  },
  desc: {
    type: String,
    default: "没有描述"
  }
});
export default mongoose.model("Picture", pictureSchema);
