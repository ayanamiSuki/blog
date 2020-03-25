<template>
  <div class="main">
    <el-row class="banner">
      <img src="https://wx3.sinaimg.cn/large/9afd6f06gy1gctay1ir55j21yt0ik40w.jpg" alt="banner" />
      <transition name="silde-left">
        <span class="logo lg" v-show="isloading">ayanamiSuki.com</span>
      </transition>
    </el-row>
    <el-row class="ohter-intro lg">
      <span>取长补短</span>
      <span>自己的github，双倍的快乐</span>
      <el-button>
        <nuxt-link to="/editor">点我发布文章</nuxt-link>
      </el-button>
    </el-row>
    <el-row class="list-content">
      <list-item :listData="list" />
    </el-row>
  </div>
</template>

<script>
import listItem from "../components/index/list";
export default {
  components: {
    listItem
  },
  async asyncData(ctx) {
    let listRequest = await ctx.$axios.get("article/getarticle");
    if (listRequest.code === 0) {
      return { list: listRequest.data };
    }
  },
  data() {
    return {
      isloading: false,
      list: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.isloading = true;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.banner {
  max-height: 450px;
  overflow: hidden;
  border-bottom: 1px solid #f2f2f2;
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
  min-height: 200px;
  background-color: #002d4a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7cafcf;
  span {
    padding: 10px;
  }
  .el-button {
    margin-top: 10px;
  }
}
.list-content {
  background-color: #f2f2f2;
  min-height: 200px;
}
.silde-left-leave-active,
.silde-left-enter-active {
  transform: translateX(0);
  transition: transform 0.5s linear;
}
.silde-left-enter {
  transform: translateX(-100%);
}
</style>