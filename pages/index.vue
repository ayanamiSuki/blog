<template>
  <div class="main">
    <el-row class="ohter-intro lg">
      <span>Talk is cheap. Show me the code. ----Linus Torvalds</span>
    </el-row>
    <div class="switch">
      <span class="active">code</span>
      <span>picture</span>
    </div>
    <el-row class="banner">
      <carousel :carouselList="carouselList" />
    </el-row>
    <el-row class="list-content">
      <list-item class="list-item-wrap" :listData="list" />
      <aside-item class="aside-item-wrap" :asideList="asideList" />
    </el-row>
    <el-row class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChage"
      ></el-pagination>
    </el-row>
    <el-row class="fixed-btn">
      <itemBtn />
    </el-row>
  </div>
</template>

<script>
import listItem from "../components/index/list";
import carousel from "../components/index/carousel";
import itemBtn from "../components/public/itemBtn";
import asideItem from "../components/index/aside";
export default {
  components: {
    listItem,
    carousel,
    itemBtn,
    asideItem
  },
  async asyncData(ctx) {
    let listRequest = await ctx.$axios.get("article/getarticle?page=1");
    let carouselReq = await ctx.$axios.get("/article/getCarousel");
    let asideReq = await ctx.$axios.get("/article/recommend");
    if (
      listRequest.code === 0 &&
      carouselReq.code === 0 &&
      asideReq.code === 0
    ) {
      return {
        list: listRequest.data.result,
        count: listRequest.data.count,
        carouselList: carouselReq.data,
        asideList: asideReq.data
      };
    }
  },
  data() {
    return {
      isloading: false,
      list: [],
      carouselList: [],
      asideList: [],
      count: 1
    };
  },
  mounted() {
    setTimeout(() => {
      this.isloading = true;
    }, 1000);
  },
  methods: {
    async pageChage(val) {
      let listRequest = await this.$axios.get("article/getarticle?page=" + val);
      if (listRequest.code === 0) {
        this.list = listRequest.data.result;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 1190px;
  margin: 0 auto;
  padding: 10px 0;
}
.switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  span {
    display: inline-block;
    width: 100px;
    padding: 5px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #002d4a;
    }
    &:first-child {
      border-right: 1px solid #666;
    }
  }
  .active {
    color: #e7838c;
  }
}
.banner {
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
  }
}
.ohter-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #00243b;
  span {
    padding: 10px;
  }
  .el-button {
    margin-top: 10px;
  }
}
.list-content {
  min-height: 200px;
  display: flex;
  width: 1190px;
  margin: 0 auto;
  margin-top: 20px;
  .list-item-wrap {
    width: 70%;
    margin-top: 5px;
  }
  .aside-item-wrap {
    width: 28%;
    margin-left: 2%;
    margin-top: 5px;
  }
}
.silde-left-leave-active,
.silde-left-enter-active {
  transform: translateX(0);
  transition: transform 0.5s linear;
}
.silde-left-enter {
  transform: translateX(-100%);
}

@media screen and (max-width: 960px) {
  .page {
    width: 100%;
  }
  .list-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .list-item-wrap {
      width: 100%;
    }
    .aside-item-wrap {
      width: 100%;
      padding: 5px;
      margin: 5px 0;
      box-sizing: border-box;
    }
  }
}
</style>