<template>
  <div class="comment-wrap">
    <el-dialog title="发表评论" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-content">
        <el-input v-model="content" placeholder="发表您的意见或看法"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,subcomment()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="icon-comment">
      <el-button
        type="primary"
        class="btnx"
        icon="el-icon-s-comment"
        circle
        @click.native="dialogVisible=true"
      ></el-button>
    </div>
    <el-card>
      <ul>
        <div class="comment-title">
          评论
          <span class="sm">{{commentList.length}}</span>
        </div>
        <li v-if="commentList.length==0" class="no-comment">目前尚未有评论</li>
        <li v-for="(item,index) in commentList" :key="index">
          <div class="user">
            <img :src="item.userId.avatar" :alt="item.userId.username" />
            <span>{{item.userId.username}}</span>
            <span class="time">
              <i class="el-icon-timer"></i>
              {{item.time}}
            </span>
          </div>
          <div class="comment">
            <div class="floor">
              #
              <span>{{index+1}}</span>
            </div>
            <div class="comment-content">{{item.content}}</div>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      dialogVisible: false,
      commentList: []
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    subcomment() {
      if (this.content.replace(/ /g, "") == "") {
        this.$message.error("请输入评论内容");
        return false;
      }
      let articleId = JSON.parse(this.$route.query.id);
      this.$axios
        .post("/comment/sendComment", { content: this.content, articleId })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getComment();
          }
        });
    },
    async getComment() {
      let articleId = JSON.parse(this.$route.query.id);
      let req = await this.$axios.get(
        "/comment/getComment?articleId=" + articleId
      );
      if (req.code === 0) {
        this.commentList = req.data;
      } else {
        this.$message.error("获取评论失败");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.comment-wrap {
  width: 1190px;
  margin: 10px auto;
  margin-bottom: 0;
  .no-comment {
    padding: 10px;
    font-style: italic;
  }
  .icon-comment {
    position: fixed;
    right: 5%;
    bottom: 15%;
    font-size: 30px;
    .btnx {
      font-size: 28px;
      background: #e7838c;
      border-color: #e7838c;
      transition: all 0.3s linear;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  ul {
    .comment-title {
      padding: 10px;
      font-size: 18px;
      color: #666;
      border-bottom: 1px solid #f2f2f2;
    }
    li {
      border-bottom: 1px solid #f2f2f2;
      .user {
        display: flex;
        padding: 3px 10px;
        align-items: center;
        font-size: 12px;
        background: rgba(224, 224, 224, 0.3);
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid #f2f2f2;
        }
        span {
          color: #e7838c;
          padding-left: 15px;
        }
      }
      .comment-content {
        padding-top: 5px;
        line-height: 24px;
        padding-right: 50px;
      }
      .comment {
        padding: 10px;
        padding-left: 15px;
        min-height: 100px;
        position: relative;
        .floor {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 18px;

          font-style: italic;
          color: #b5b5b5;
          span {
            font-size: 14px;
            color: #e7838c;
          }
        }
      }
    }
  }
}
</style>