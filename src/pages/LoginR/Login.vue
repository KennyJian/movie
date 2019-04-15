<template>
  <div class="login">
    <router-link class="login_logo" to="/index">
      <img src="../../../static/imgs/logo.jpg" alt="">
    </router-link>
    <div class="login_content">
      <div class="content_left">
        <img src="../../../static/imgs/login.png" alt="">
      </div>
      <div class="contennt_table">
        <div v-show="error_show" class="error_tip">{{error}}</div>
        <p class="table_title">账号登录</p>
        <div class="table_item">
          <img src="../../../static/imgs/user.png">
          <input type="text" v-model="username"  placeholder="用户名">
        </div>
        <div class="table_item">
          <img src="../../../static/imgs/pass.png">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <router-link class="login_forget" to="/register">忘记密码?直接注册新的吧</router-link>
        <div class="login_submit" @click="checkout">登录</div>
        <p class="login_tip">还没有账号？<router-link  class="login_to" to="/register">免费注册</router-link></p>
      </div>
    </div>
    <div class="login_bottom">
      <p>©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
    </div>
  </div>
</template>

<script>
import {setCookie} from "../../common/utils.js"
export default {
  data() {
    return {
      username:'',
      password:'',
      error:"请输入账号和密码",
      error_show:false
    }
  },
  methods: {
    // 检测账号密码是否为空
    checkout() {
      if(this.username == "" || this.password == "") {
        this.errorTip("请输入账号或密码");
      } else {
        this.submit(this.username,this.password);
      }
    },
    // 验证账号密码
    submit(username,password) {
      this.$api.post({
        userName:username,
        password:password
      },'/auth',(res) => {
        if(res.status == 200) {
          this.errorTip("登陆成功");
          setCookie("key",res.data.token,7);
          let that = this;
          setTimeout(function() {
            that.$router.push('/index');
          },1000);
        } else {
          this.errorTip(res.msg);
        }
      })
    },
    errorTip(error){
      this.error_show = true;
      this.error = error;
      let that = this;
      setTimeout(function() {
        that.error_show = false;
        that.error = "";
      },1500);
      return;
    }
  }
}
</script>
<style lang="less" scoped>
  .login {
    width: 980px;
    margin: 0 auto;
    .login_logo{
      display: block;
      width:400px;
      height: 90px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login_content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .content_left {
       width: 480px;
       height: 370px;
       img {
         width: 100%;
         height: 100%;
       }
      }
      .contennt_table {
        margin: 0 100px 0 0;
        .error_tip {
          height: 40px;
          width: 100%;
          padding-left: 10px;
          line-height: 40px;
          font-size: 16px;
          color:#ec454a;
          border: 1px solid #ee7f82;
          margin-bottom: 5px;
        }
        .table_title {
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 5px;
        }
        .table_item{
          width: 270px;
          height: 36px;
          margin-bottom: 8px;
          border: 1px solid #333;
          padding-top:5px;
          img{
            display: inline-block;
            width: 25px;
            height: 24px;
            margin-left:4px;
          }
          input {
            vertical-align: top;
            border: 0;
            height: 24px;
            outline: none;
            width: 200px;
          }
        }
        .login_forget {
          float: right;
          font-size:12px;
          color:#ec454a;
        }
        .login_submit {
          margin-top: 40px;
          width: 100%;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          background-color: #e02025;
          font-size: 15px;
          font-weight: 550;
          letter-spacing: 2px;
          cursor: pointer;
        }
        .login_tip {
          margin-top: 8px;
          font-size:16px;
          color: #666;
          a {
            color: #e02025;
            font-size: 15px;
          }
        }
      }
    }
    .login_bottom {
      width: 100%;
      margin-top: 60px;
      text-align: center;
      color: #ccc;
      font-size: 12px;
    }
  }
</style>
