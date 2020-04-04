<template>
  <ul class="list">
    <div class="new-list">每日更新</div>
    <li
      class="list-item"
      v-for="(i,index) in listData"
      @click="corrugatedClick(index,$event,i._id)"
      :key="index"
    >
      <div class="list-content-wrap">
        <div>
          <span class="lf">{{i.title}}</span>
        </div>
        <div class="rt">
          <span>
            <i class="el-icon-user"></i>
            {{i.user}}
          </span>
          <span class="tips sm">
            <i class="el-icon-timer"></i>
            {{i.time}}
          </span>
          <span class="click-count sm">
            <i class="el-icon-view"></i>
            {{i.click}}
          </span>
          <span class="sm from">
            from:
            <span style="color:#666">code</span>
          </span>
        </div>
      </div>
      <el-row>
        <el-col class="list-bg">
          <img :src="i.bg" alt="i.title" />
        </el-col>
      </el-row>
      <div class="changeCover" ref="corrugated"></div>
    </li>
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
  background-color: #fff;
  margin-top: 10px;
  .new-list {
    color: #e7838c;
    position: relative;
    padding-left: 10px;
    font-size: 18px;
    margin-bottom: 15px;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background: #e7838c;
      border-radius: 2px;
    }
  }
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: all 0.2s linear;
    overflow: hidden;
    padding: 20px 15px;
    border-bottom: 1px solid #d1d1d1;
    position: relative;
    .list-content-wrap {
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: stretch;
      .from {
        color: #e7838c;
        float: right;
        padding-right: 15px;
        padding-left: 5px;
      }
      .click-count {
        color: #e7838c;
        display: inline-block;
        padding: 0 5px;
      }
    }
    .list-bg {
      height: 100px;
      width: 150px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
      }
    }
    &:hover {
      background: #ffb5b51a;
      cursor: pointer;
    }
    .lf {
      color: #002d4a;
      font-size: 18px;
      line-height: 24px;
    }
    .rt {
      span:first-child {
        font-size: 12px;
        color: #e7838c;
        padding: 0 5px;
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
      padding: 0 5px;
    }
  }
}
@media screen and (max-width: 960px) {
  .list .list-item .list-content-wrap .from {
    float: none;
    display: inline-block;
  }
}
</style>