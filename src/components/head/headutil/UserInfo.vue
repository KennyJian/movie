<template>
  <div class="userInfo" @mouseleave="hidden">
    <div class="userInfo_head" @mouseover="showuser">
      <img :src="userImg" alt="头像">
      <span class="caret"></span>
    </div>
    <div v-show="show" class="user_list">
      <div v-if="ISLOGIN" class="login">
        <router-link to="/order">我的订单</router-link>
        <router-link to="/person">基本信息</router-link>
        <p @click="checkOut()">退出登录</p>
      </div>
      <div v-else class="personCenter">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie,setCookie} from "../../../common/utils.js"
export default {
  name: "UserInfo",
  data() {
    return {
      ISLOGIN: false,
      show: false,
      userImg:'../../../../static/imgs/user_default.png'
    }
  },
  methods: {
    showuser() {
      this.show = true;
    },
    hidden() {
      this.show = false;
    },
    getUser() {
      this.$api.post({},"/user/getUserInfo", (res)=> {
        if(res.data) {
          this.ISLOGIN = true;
          let user = res.imgPre + res.data.headUrl;
          // console.log(user);
          this.userImg = res.imgPre + res.data.headUrl;
        }
      })
    },
    checkOut() {
      this.$api.post({},"/user/logout",(res) => {
        this.ISLOGIN == false;
        setCookie('key','');
        this.userImg == "../../../../static/imgs/user_default.png"
        this.$router.push('/index');
      })
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  position: relative;
  .userInfo_head {
    display: inline-block;
    width: 70px;
    height: 80px;
    line-height: 80px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 30px;
      vertical-align: middle;
      padding-left: 2px;
    }
    .caret {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 4px;
      vertical-align: middle;
      border-top: 5px solid #666;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
  }
  .userInfo_head:hover {
    border: 1px solid #dedede;
    border-width: 0 1px;
    .caret {
      border-bottom: 5px solid #666;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-top: 0;
    }
  }
  .user_list {
    position: absolute;
    top: 80px;
    right: 0;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    font-size: 14px;
    color: #333;
    text-align: center;
    z-index: 1000;
    width: 100px;
    p,a{
      font-size: 14px;
      display: block;
      height: 30px;
      line-height: 30px;
      color: #333;
    }
    p:hover,a:hover {
      background-color:#e0d9d9;
    }
  }

}
</style>
