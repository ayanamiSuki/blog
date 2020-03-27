<template>
  <div class="edit-container">
    <el-row class="title">
      <el-input v-model="title" placeholder="请填写文章标题"></el-input>
      <el-row class="upload-activex">
        <label @click="dialogVisible=true">
          <i class="el-icon-picture-outline-round"></i>
          上传头图
        </label>
      </el-row>
      <div class="head-img">
        <img :src="headImg" alt="朔月十六夜的小窝" />
      </div>
    </el-row>
    <div class="zone">
      <div>
        <el-button class="sm se-title" @click="insertTitle">插入副标题</el-button>
      </div>
      <div id="editor"></div>
    </div>
    <el-row class="sub">
      <el-button @click="updateImage">发布文章</el-button>
    </el-row>

    <el-dialog
      title="您可以选择"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
      class="dialog"
    >
      <div>
        <span style="padding-bottom:10px;display:inline-block">网络图片:</span>
        <el-input type="text" v-model="netImg" />
      </div>
      <div>或者</div>
      <label for="file">本地上传</label>
      <input
        id="file"
        class="file"
        name="file"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        @change="getImage"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button class="dialog-sub" @click="dialogSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xss from "xss";
export default {
  data() {
    return {
      title: "",
      editor: "",
      update: false,
      dialogVisible: false,
      headImg:
        "http://www.51pptmoban.com/d/file/2018/10/14/1d4d444b09c12d773868791c3f57bf43.jpg",
      file: "",
      netImg: "http://www."
    };
  },
  mounted() {
    this.editorInit();
  },
  methods: {
    editorInit() {
      // const Editor = process.client ? require("wangeditor") : undefined;
      const Editor = window.wangEditor;
      this.editor = new Editor("#editor");
      this.editor.customConfig.menus = ["code", "image"];
      this.editor.create();
    },
    insertTitle() {
      this.editor.cmd.do("insertHTML", "<h2>二级标题</h2>");
    },
    sub(bg) {
      if (this.update) {
        return false;
      }
      this.update = true;
      let title = this.title;
      let html = this.editor.txt.html();
      let content = xss(html); // 此处进行 xss 攻击过滤
      this.$axios
        .post("/article/uploadarticle", { title, content, bg })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: res.msg
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          } else {
            this.$message.error(res.msg);
            this.update = false;
          }
        });
    },
    getImage(e) {
      this.file = e.target.files[0];
      this.headImg = URL.createObjectURL(this.file); //使用本地图片路径
      this.dialogVisible = false;
      this.netImg = "";
    },
    updateImage() {
      if (this.file == "" && this.netImg == "") {
        this.$message.error("请上传头图");
        return false;
      }
      if (this.title.length < 2 || this.title.length > 30) {
        this.$message.error("标题字数为2-30字");
        return false;
      } else if (
        this.editor.txt
          .text()
          .replace(/&nbsp;/g, "")
          .replace(/ /g, "") == ""
      ) {
        this.$message.error("请编辑内容");
        return false;
      }
      if (this.netImg == "") {
        let param = new FormData(); //创建form对象
        param.append("file", this.file); //通过append向form对象添加数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        }; //添加请求头
        this.$axios.post("article/image", param, config).then(response => {
          // console.log(response.data);
          // this.headImg = response.data.url;
          this.sub(response.data.url);
        });
      } else {
        this.sub(this.headImg);
      }
    },
    dialogSub() {
      let image = new Image();
      let that = this;
      image.onload = function() {
        that.dialogVisible = false;
        that.headImg = that.netImg;
      };
      image.onerror = function(err) {
        that.$message.error(err);
      };

      image.src = this.netImg;
    }
  }
};
</script>

<style lang='scss' scoped>
.dialog {
  div {
    padding: 5px 0;
  }
  #file {
    display: none;
  }
  label {
    cursor: pointer;
    background: #ff909b;
    color: #fff;
    display: inline-block;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    box-shadow: 0px 2px 10px #c3c3c3;
  }
  .dialog-sub {
    background: #ff909b;
    color: #fff;
  }
}
.title {
  text-align: center;
  padding: 130px 30px;
  position: relative;
  overflow: hidden;
  .el-input {
    width: 1190px;
  }
  .upload-activex {
    position: absolute;
    bottom: 0;
    z-index: 1;
    left: 50%;
    margin-left: -50px;
    label {
      cursor: pointer;
      background: #ff909b;
      color: #fff;
      display: inline-block;
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      box-shadow: 0px 2px 10px #c3c3c3;
    }
  }

  .head-img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.zone {
  width: 1190px;
  margin: 0 auto;
  padding-top: 50px;
  .se-title {
    background: #ff909b;
    color: #fff;
  }
}

#editor {
  margin-top: 15px;
}
.sub {
  padding: 10px;
  text-align: center;
  button {
    background-color: #ff909b;
    color: #fff;
  }
}
</style>