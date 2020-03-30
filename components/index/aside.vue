<template>
  <div class="list">
    <div class="about-aya" @click="dialogVisible=true">
      <span class="about-ayanami">
        about
        <br />ayanamiSuki
      </span>
      <img src="https://wx2.sinaimg.cn/mw690/9afd6f06gy1gdbw349et0j20mi140k65.jpg" alt="关于ayanami" />
    </div>
    <el-card class="article-recommend">
      <el-row class="recommend-title">
        推荐
        <i class="el-icon-refresh" @click="refresh" :class="isRe?'re-active':''"></i>
      </el-row>
      <div class="sm refresh">偶尔刷一刷，会有新发现</div>
      <el-row
        class="recommend-content"
        v-for="(item,index) in asideList"
        :key="'article'+index"
        @click.native="toDetail(item._id)"
      >
        <em>{{index+1}}</em>
        <span class="item-title">{{item.title}}</span>
      </el-row>
    </el-card>

    <el-card class="picture-recommend">
      <el-row class="recommend-title">图片推荐</el-row>
      <el-row class="recommend-content" @click.native="toPicture">
        <div v-for="(item,index) in 6" :key="'image'+index">
          <img src="https://wx3.sinaimg.cn/mw690/9afd6f06gy1gd7peyq4v8j20f80e90t6.jpg" alt="title" />
        </div>
      </el-row>
    </el-card>

    <el-dialog title="关于" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-content">
        <div>
          <span class="main-color">ayanamiSuki</span>，本质上是对二次元游戏[碧蓝航线[凌波]]中人物角色喜爱所以注册的网站
        </div>
        <div>
          <span class="bold">朔月十六夜</span>，网站唯一神，服务器掌控者XD
        </div>
        <div>
          本人只是个卑微的有着ACG爱好的程序员，网站采用
          <span class="bold">vue +nuxt +koa +redis+mongodb</span>打造，单人打造正在磨合中
        </div>
        <div>如果您偶然进入的这里，Thanks♪(･ω･)ﾉ</div>
        <div>如果你对前端开发（全栈开发）有兴趣。欢迎交流</div>
        <div>如果你对我有合作意向，也欢迎交流</div>
        <div>唯一指定QQ 244802956</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["asideList"],
  data() {
    return {
      isRe: false,
      dialogVisible: false
    };
  },
  mounted() {
    // console.log(this.asideList);
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: "/listDetail",
        query: { id: JSON.stringify(id) }
      });
    },
    toPicture() {
      this.$notify({
        title: "提示",
        message: "对不起，图片模块施工中，请过几天再试",
        type: "error"
      });
    },
    async refresh() {
      let asideReq = await this.$axios.get("/article/recommend");
      this.isRe = true;
      if (asideReq.code === 0) {
        this.asideList = asideReq.data;
        this.isRe = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-content {
  div {
    padding: 5px;
    line-height: 24px;
  }
}
.list {
  .about-aya {
    overflow: hidden;
    height: 350px;
    border-radius: 3px;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
    .about-ayanami {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: #fff;
      font-size: 20px;
      padding: 15px;
      z-index: 1;
    }
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: all 0.3s linear;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .article-recommend {
    padding: 10px;
    .refresh {
      padding: 10px 0;
      color: #666;
    }
    .recommend-title {
      font-size: 18px;
      border-bottom: 1px solid #dadada;
      padding-bottom: 10px;
      .el-icon-refresh {
        cursor: pointer;
        color: #e7838c;
      }
    }
    .recommend-content {
      padding: 5px;
      margin: 10px 0;
      word-break: break-all;
      line-height: 20px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }
      em {
        font-style: italic;
        font-weight: bold;
        padding-right: 10px;
        font-size: 24px;
        color: #ff9d00;
      }
    }
  }
  .picture-recommend {
    padding: 10px;
    margin-top: 15px;
    .recommend-title {
      border-bottom: 1px solid #dadada;
      padding-bottom: 10px;
    }
    .recommend-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      & > div {
        width: 48%;
        box-sizing: border-box;
        overflow: hidden;
        margin: 1%;
      }
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }
    }
  }
  .re-active {
    animation: routate 1s linear infinite;
  }
  @keyframes routate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>