<template>
  <div class="header">
    <transition name="slide-down">
      <login
        @loginSuccess="loginStatus=false"
        @closeModel="loginStatus=false"
        @logined="login"
        @showForget="forgetStatus=true,loginStatus=false"
        v-if="loginStatus"
        ref="loginComponent"
      />
    </transition>
    <transition name="slide-down">
      <forget
        @forgetSuccess="forgetStatus=false"
        @closeModel="forgetStatus=false"
        v-if="forgetStatus"
        ref="forgetComponent"
      />
    </transition>
    <el-row class="user-content">
      <el-dropdown v-if="username">
        <span class="avatar el-dropdown-link">
          <img
            :src="$store.state.userInfo.avatar||'https://wx3.sinaimg.cn/mw690/9afd6f06gy1gd7peyq4v8j20f80e90t6.jpg'"
            :alt="'欢迎'+$store.state.userInfo.username+'来到朔月十六夜的小窝'"
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/center')">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="$router.push('/')">返回首页</el-dropdown-item>
          <el-dropdown-item @click.native="exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-row v-else>
        <span @click="loginStatus=true" class="not-login">注册/登录</span>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import login from "../index/login";
import forget from "../index/forgetUser";
export default {
  components: {
    login,
    forget
  },
  data() {
    return {
      username: "",
      loginStatus: false,
      forgetStatus: false
    };
  },
  mounted() {
    this.loginState();
  },
  methods: {
    loginState() {
      if (this.$store.state.userInfo.username) {
        this.loginStatus = false;
        this.username = this.$store.state.userInfo.username;
      }
    },
    toCode() {
      this.$router.replace("/");
    },
    login() {
      this.$axios.get("/users/getUser").then(res => {
        this.username = res.username;
        this.loginStatus = false;
        this.$store.dispatch("loginUser", res);
      });
    },
    exit() {
      this.$axios.get("users/exit").then(res => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.username = "";
          this.$store.dispatch("exitUser");
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: url(https://wx2.sinaimg.cn/mw690/9afd6f06gy1gd7keltxwnj20ro03ywef.jpg)
    center center no-repeat;
  background-size: 15%;
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .not-login {
    color: #666;
    line-height: 100px;
    letter-spacing: 1px;
    font-size: 12px;
    padding-right: 20px;
    cursor: pointer;
  }
  .user-content {
    .avatar {
      height: 50px;
      width: 50px;
      margin-right: 20px;
      display: inline-block;
      overflow: hidden;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #f8d9dc;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        white-space: nowrap;
        padding-left: 15px;
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .header {
    background-size: 50%;
  }
}
</style>