<template>
  <div class="itemBtn-wrap">
    <el-button
      type="success"
      class="edit"
      icon="el-icon-top"
      style="margin-left: 10px;"
      circle
      @click="backTop"
    ></el-button>
    <!-- <el-button type="warning" class="edit" icon="el-icon-star-off" circle></el-button>
    <el-button type="danger" class="edit" icon="el-icon-user" circle></el-button>-->
    <el-button type="primary" class="edit" icon="el-icon-edit" circle @click="punish"></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    punish() {
      // console.log(this.$store.state.userInfo.username == "");
      if (this.$store.state.userInfo.username == "") {
        this.$message.error("请先登录");
      } else {
        this.$router.push("/editor", null);
      }
    },
    //返回顶部
    backTop() {
      var scrollToptimer = setInterval(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;

        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed;
        } else {
          document.documentElement.scrollTop -= speed;
        }

        if (top == 0) {
          clearInterval(scrollToptimer);
        }
      }, 15);
    }
  }
};
</script>

<style lang="scss" scoped>
.itemBtn-wrap {
  position: fixed;
  right: 5%;
  bottom: 15%;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  z-index: 11;
  .edit {
    transition: all 0.3s linear;
    margin-top: 10px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.2);
    background: #ff909b;
    border-color: #ff909b;
    color: #fff;
    font-size: 21px;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>