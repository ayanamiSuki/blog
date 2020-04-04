<template>
  <div class="detail-container">
    <div class="main">
      <div class="user">{{listDetail.user}}</div>
      <div class="time">{{listDetail.time}}</div>
      <div class="title">{{listDetail.title}}</div>
      <div v-html="listDetail.content" class="content"></div>
    </div>
    <comment class="comment-components" />
  </div>
</template>

<script>
import comment from "../components/listDetail/comment";
export default {
  components: {
    comment
  },
  async asyncData({ query, $axios }) {
    let getListDetail = await $axios.get("/article/getarticleDetail", {
      params: {
        _id: JSON.parse(query.id)
      }
    });
    if (getListDetail.code === 0) {
      return { listDetail: getListDetail.data };
    }
  },
  data() {
    return {
      listDetail: ""
    };
  }
};
</script>

<style lang="scss">
.detail-container {
  min-height: calc(100vh - 108px);
  background-color: #f2f2f2;
  padding-top: 30px;
  box-sizing: border-box;
  color: #595959;
  .main {
    width: 1190px;
    margin: 0 auto;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    .title {
      text-align: center;
      font-size: 28px;
      padding: 20px;
    }
    .user {
      font-size: 20px;
    }
    .time {
      padding-top: 10px;
      color: #a8a8a8;
      font-size: 14px;
    }
    .content {
      padding-top: 15px;
      line-height: 24px;
      h2 {
        color: #002d4a;
        padding: 20px 0;
        font-size: 21px;
      }
      pre {
        margin: 10px 0;
        background-color: #19425c;
        padding: 10px;
        code {
          color: #fff;
          white-space: pre-wrap;
        }
      }
      img {
        max-width: 100%;
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .detail-container .main {
    width: 100%;
  }
  .detail-container .comment-components {
    width: 100% !important;
  }
}
</style>
