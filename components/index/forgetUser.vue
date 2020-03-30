<template>
  <el-card class="wrap">
    <i class="el-icon-circle-close" @click="closeModel"></i>
    <el-row class="welcome">welcome to ayanamiSuki</el-row>
    <el-row class="th" type="flex" justify="center">
      <el-col :span="12" @click.native="islogin=false" class="registerbtn lg">忘记密码</el-col>
    </el-row>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="verify">
        <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
        <el-button @click="sendMessage()">{{verifyInfo}}</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" class="subbtn" @click="submitForm('ruleForm')">确定</el-button>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        pass: "",
        code: "",
        username: ""
      },
      rules: {
        email: [
          {
            required: true,
            trigger: "blur",
            type: "email",
            message: "请输入邮箱"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      verifyInfo: "发送验证码",
      islogin: true,
      count: 60
    };
  },
  methods: {
    submitForm(formName) {
      let s = this;
      s.$refs[formName].validate(valid => {
        if (valid) {
          s.$axios
            .post("/users/changePass", {
              username: s.ruleForm.username,
              email: s.ruleForm.email,
              code: s.ruleForm.code,
              password: s.ruleForm.pass
            })
            .then(res => {
              if (res.code === 0) {
                s.$message({
                  type: "success",
                  message: res.msg
                });
                s.closeModel();
              } else {
                s.$message.error(res.msg);
              }
            });
        }
      });
    },
    sendMessage() {
      let that = this;
      if (this.count !== 60) {
        return false;
      }
      that.$refs["ruleForm"].validateField("email", valid => {
        if (!valid) {
          this.$axios
            .post("/users/verify", {
              username: this.ruleForm.username,
              email: this.ruleForm.email
            })
            .then(res => {
              if (res.code === 0) {
                that.$message({
                  type: "success",
                  message: res.msg
                });
                that.interval();
              } else {
                that.$message.error(res.msg);
              }
            });
        }
      });
    },
    interval() {
      let timer = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          clearInterval(timer);
          this.verifyInfo = "发送验证码";
          this.count = 60;
          return false;
        }
        this.verifyInfo = `${this.count}秒后可再次发送`;
      }, 1000);
    },
    closeModel() {
      this.$emit("closeModel", null);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/login.scss";
</style>