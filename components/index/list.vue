<template>
  <div class="list">
    <el-card
      class="list-item"
      v-for="(i,index) in listData"
      @click.native="corrugatedClick(index,$event,i._id)"
      :key="index"
    >
      <el-col class="list-bg">
        <img :src="i.bg" alt="i.title" />
        <span :span="24" class="lf">{{i.title}}</span>
      </el-col>
      <el-row class="list-content-wrap">
        <el-col :span="24" class="rt">
          <span>
            <i class="el-icon-user"></i>
            {{i.user}}
          </span>
          <span class="tips sm">
            <i class="el-icon-timer"></i>
            {{i.time}}
          </span>
        </el-col>
      </el-row>
      <div class="changeCover" ref="corrugated"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["listData"],
  data() {
    return { list: [] };
  },
  mounted() {},
  methods: {
    corrugatedClick(index, e, id) {
      let corrugatedDom = this.$refs["corrugated"][index];
      if (corrugatedDom.classList.contains("active")) {
        return false;
      }
      let x = e.offsetX;
      let y = e.offsetY;
      corrugatedDom.style.top = y - 15 + "px";
      corrugatedDom.style.left = x - 15 + "px";
      corrugatedDom.classList.add("active");
      this.$router.push({
        path: "/listDetail",
        query: { id: JSON.stringify(id) }
      });
      setTimeout(() => {
        corrugatedDom.classList.remove("active");
      }, 1000);
    }
  }
};
</script>

<style lang='scss' scoped>
.list {
  background-color: #fff;
  margin-top: 10px;

  .list-item {
    display: flex;
    flex-direction: column;
    min-height: 150px;
    justify-content: space-between;
    transition: background 0.2s linear;
    overflow: hidden;
    margin-bottom: 10px;
    .list-content-wrap {
      pointer-events: none;
    }
    .list-bg {
      height: 300px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .lf {
        position: absolute;
        bottom: 30px;
        left: 30px;
        background: #fff;
        display: inline-block;
        padding: 10px;
        font-size: 24px;
        max-width: 500px;
        line-height: 26px;
        text-align: left;
      }
    }
    &:hover {
      background: rgba($color: #7777771a, $alpha: 0.1);
      cursor: pointer;
    }
    .el-col {
      line-height: 24px;
      pointer-events: none;
      text-align: center;
    }
    .lf {
      color: #002d4a;
      font-size: 18px;
    }
    .rt {
      padding: 15px;
      span:first-child {
        font-size: 12px;
        color: #e7838c;
      }
    }
    .changeCover {
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      border-radius: 50%;
      background: #fff;
      transform: scale(0);
    }
    .active {
      animation: change 1s ease both 1;
    }
    @keyframes change {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(20);
        opacity: 0;
      }
    }
    .tips {
      color: #e7838c;
      padding-left: 15px;
    }
  }
}
</style>