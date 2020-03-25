<template>
  <div class="edit-container">
    <el-row class="title">
      <el-input v-model="title" placeholder="请填写文章标题"></el-input>
    </el-row>
    <div class="zone">
      <div>
        <el-button class="sm" @click="insertTitle">插入副标题</el-button>
      </div>
      <div id="editor"></div>
    </div>
    <el-row class="sub">
      <el-button @click="sub">发布文章</el-button>
    </el-row>
  </div>
</template>

<script>
import xss from "xss";
export default {
  data() {
    return {
      title: "",
      editor: "",
      update: false
    };
  },
  mounted() {
    this.editorInit();
  },
  methods: {
    editorInit() {
      const Editor = process.client ? require("wangeditor") : undefined;
      this.editor = new Editor("#editor");
      this.editor.customConfig.menus = ["code", "image"];
      this.editor.create();
    },
    insertTitle() {
      this.editor.cmd.do("insertHTML", "<h2>二级标题</h2>");
    },
    sub() {
      if (this.update) {
        return false;
      }
      this.update = true;
      let title = this.title;
      let html = this.editor.txt.html();
      let content = xss(html); // 此处进行 xss 攻击过滤
      this.$axios
        .post("/article/uploadarticle", { title, content })
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
    }
  }
};
</script>

<style lang='scss' scoped>
.title {
  background: url(http://www.51pptmoban.com/d/file/2018/10/14/1d4d444b09c12d773868791c3f57bf43.jpg)
    left top no-repeat;
  text-align: center;
  padding: 100px 30px;
  .el-input {
    width: 1190px;
  }
}
.zone {
  width: 1190px;
  margin: 0 auto;
  padding-top: 50px;
}

#editor {
  margin-top: 15px;
}
.sub {
  padding: 10px;
  text-align: center;
  button {
    background-color: #002d4a;
    color: #fff;
  }
}
</style>