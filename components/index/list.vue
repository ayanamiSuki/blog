<template>
  <ul class="list">
    <el-row
      class="list-item"
      v-for="(i,index) in listData"
      @click.native="corrugatedClick(index,$event,i._id)"
      :key="index"
    >
      <el-col :span="24" class="lf">{{i.title}}</el-col>
      <el-col :span="24" class="rt">
        <span>Author:{{i.user}}</span>
      </el-col>
      <span class="tips sm">{{i.time}}</span>
      <div class="changeCover" ref="corrugated"></div>
    </el-row>
  </ul>
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
  width: 940px;
  margin: 0 auto;
  .list-item {
    border-bottom: 1px solid #fff;
    display: flex;
    flex-direction: column;
    min-height: 150px;
    justify-content: space-between;
    transition: background 0.2s linear;
    overflow: hidden;
    padding: 10px 35px;
    &:hover {
      background: rgba($color: #000000, $alpha: 0.1);
      cursor: pointer;
    }
    .el-col {
      line-height: 24px;
      pointer-events: none;
    }
    .lf {
      color: #002d4a;
      font-size: 18px;
    }
    .rt {
      span:first-child {
        font-size: 12px;
        background-color: #002d4a;
        padding: 5px 10px;
        color: #fff;
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
      color: #a8a8a8;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>