<template>
  <div class="header">
    <span class="iconfont active" @click="toCode">
      <i class="el-icon-picture-outline"></i>
    </span>
    <span class="iconfont">
      <i class="el-icon-document"></i>
    </span>
    <transition name="slide-down">
      <login
        @loginSuccess="loginStatus=false"
        @closeModel="loginStatus=false"
        @logined="login"
        v-if="loginStatus"
        ref="loginComponent"
      />
    </transition>
    <el-row class="user-content">
      <el-dropdown v-if="user">
        <span class="avatar el-dropdown-link">
          <img src="https://wx3.sinaimg.cn/mw690/9afd6f06gy1gct7ybm61qj20hs0p4gni.jpg" alt="头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>返回首页</el-dropdown-item>
          <el-dropdown-item @click.native="exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-if="!user" @click="loginStatus=true" class="not-login">注册/登录</span>
    </el-row>
  </div>
</template>

<script>
import login from "../index/login";
export default {
  components: {
    login
  },
  data() {
    return {
      user: "",
      loginStatus: false
    };
  },
  mounted() {
    this.loginState();
  },
  methods: {
    loginState() {
      if (this.$store.state.userInfo.username) {
        this.loginStatus = false;
        this.user = this.$store.state.userInfo.username;
      }
    },
    toCode() {
      this.$router.replace("/");
    },
    login() {
      this.$axios.get("/users/getUser").then(res => {
        this.user = res.user;
        this.loginStatus = false;
      });
    },
    exit() {
      this.$axios.get("users/exit").then(res => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.user = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  background-color: #002d4a;
  position: relative;
  .not-login {
    color: #fff;
    line-height: 44px;
    letter-spacing: 1px;
    font-size: 12px;
    padding-right: 20px;
  }
  > .iconfont {
    color: #fff;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s linear;
    display: inline-block;
    &:hover {
      background: rgba(231, 231, 231, 0.1);
    }
  }
  > .active {
    background: rgba(255, 255, 255, 0.3);
  }
  .user-content {
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
    .avatar {
      height: 44px;
      width: 44px;
      display: flex;
      align-items: center;
      color: #fff;
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      span {
        white-space: nowrap;
        padding-left: 15px;
      }
    }
  }
}
</style>