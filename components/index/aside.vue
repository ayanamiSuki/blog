<template>
  <div class="list">
    <el-card class="article-recommend">
      <el-row class="recommend-title">文章推荐</el-row>
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
  </div>
</template>

<script>
export default {
  props: ["asideList"],
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
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  .article-recommend {
    padding: 10px;
    .recommend-title {
      font-size: 18px;
      border-bottom: 1px solid #dadada;
      padding-bottom: 10px;
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
    margin-top: 50px;
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
}
</style>