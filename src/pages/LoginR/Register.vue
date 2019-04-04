<template>
  <div class="register">
    <div class="register_head">
      <router-link to="/index" class="head_logo">
        <img src="../../../static/imgs/logo.jpg" alt="logo">
      </router-link>
    </div>
    <div class="register_content">
      <div v-show="error_show" class="error_tip">{{error}}</div>
      <div class="contentn_item">
        <label>用户名</label>
        <input type="text" v-model="name" @blur.prevent="checkName" placeholder="请输入用户名">
      </div>
      <div class="contentn_item">
        <label>密码</label>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="contentn_item">
        <label>确认密码</label>
        <input type="password" v-model="repassword" placeholder="请确认密码">
      </div>
      <div class="submit" @click="register">注册</div>
    </div>
    <div class="register_bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error_show: false,
      error: "",
      name: "",
      password: "",
      repassword: ""
    };
  },
  methods: {
    // 检测用户名是否存在
    checkName() {
      if (!this.name) {
        this.errorTip("请输入用户名");
        return;
      }
      this.$api.post(
        { username: this.name },
        "/user/check",
        res => {
          if (res.status == 200) {
            return;
          } else {
            this.errorTip("用户名已被注册");
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    // 错误信息提示
    errorTip(error) {
      this.error_show = true;
      this.error = error;
      let that = this;
      setTimeout(function() {
        that.error_show = false;
        that.error = "";
      }, 1500);
      return;
    },
    // 注册
    register() {
      if (this.password == "" || this.repassword == "" || this.name == "") {
        this.errorTip("输入信息不完整");
        return;
      } else if (this.password != this.repassword) {
        this.errorTip("两次密码不一样");
        return;
      } else {
        var that = this;
        this.$api.post(
          { userName: this.name, userPwd: this.password },
          "/user/register",
          (res) => {
            if(res.status == 200) {
              that.errorTip("注册成功");
              setTimeout(function() {
                that.$router.push("/login")
              },1000)
            }else {
              that.errorTip(res.msg)
            }
          }
        )
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  color: #333;
  .register_head {
    width: 100%;
    height: 58px;
    border-bottom: 2px solid #e02025;
    .head_logo {
      width: 980px;
      margin: 0 auto;
      display: block;
      img {
        width: 133px;
        height: 56px;
      }
    }
  }
  .register_content {
    width: 980px;
    margin: 0 auto;
    padding-left: 80px;
    padding-top: 60px;
    .error_tip {
      height: 40px;
      width: 260px;
      padding-left: 10px;
      line-height: 40px;
      font-size: 16px;
      color: #ec454a;
      border: 1px solid #ee7f82;
      margin-bottom: 5px;
      margin-left: 116px;
    }
    .contentn_item {
      margin-bottom: 20px;
      label {
        width: 100px;
        font-size: 14px;
        text-align: right;
        display: inline-block;
      }
      input {
        width: 260px;
        height: 40px;
        border: 1px solid #aaa;
        padding: 5px;
        margin-left: 12px;
        outline-color: #e02025;
      }
    }
    .submit {
      margin-top: 40px;
      width: 260px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      background-color: #e02025;
      font-size: 15px;
      font-weight: 550;
      letter-spacing: 2px;
      cursor: pointer;
      margin-left: 112px;
    }
  }
}
</style>
