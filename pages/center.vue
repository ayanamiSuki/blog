<template>
  <div class="container">
    <el-row class="fixed-btn">
      <itemBtn />
    </el-row>
    <aside>
      <el-card>
        <div class="user-info">
          <img :src="userInfo.avatar" alt="userInfo.username+'的小窝，ayanami.com'" />
          <span>{{userInfo.username}}</span>
          <span class="intro">{{userInfo.email}}</span>
          <span class="intro">(*´▽｀)ノノ这是简介,当然，他还在施工中</span>
        </div>
      </el-card>
    </aside>
    <main class="main">
      <el-card>
        <div class="card-wrap">
          <el-row class="my-article">我的动态</el-row>

          <div class="list-wrap">
            <div class="my-artitle">
              <span>
                <i class="el-icon-document"></i> 我的文章
              </span>
            </div>
            <ul class="list-item">
              <li v-if="listItem.length===0">您还没有发布文章</li>
              <li v-for="(item,index) in listItem" :key="index" @click="toDetail(item._id)">
                <div class="revise" @click.stop="toEditor(item._id)">
                  <i class="el-icon-edit"></i> 编辑此文章
                </div>
                <div class="lf-img">
                  <img :src="item.bg" alt="item.title" />
                </div>
                <div class="rt-words">
                  <div class="title">{{item.title}}</div>
                  <div class="user">
                    <span>
                      <i class="el-icon-user"></i>
                      {{item.user}}
                    </span>
                    <span>
                      <i class="el-icon-timer"></i>
                      {{item.time}}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import itemBtn from "../components/public/itemBtn";
export default {
  components: {
    itemBtn
  },
  head: {
    title: "个人中心"
  },
  data() {
    return {
      userInfo: {},
      listItem: []
    };
  },
  async asyncData({ $axios, store }) {
    let list = await $axios.get("/article/myArticle");
    if (list.code === 0) {
      return { userInfo: store.state.userInfo, listItem: list.data };
    }
  },
  mounted() {},
  methods: {
    toDetail(id) {
      this.$router.push({
        path: "/listDetail",
        query: { id: JSON.stringify(id) }
      });
    },
    toEditor(id) {
      this.$router.push({
        path: "/editor",
        query: { id: JSON.stringify(id) }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/center.scss";
</style>