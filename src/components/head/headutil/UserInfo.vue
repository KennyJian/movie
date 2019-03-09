<template>
  <div class="userInfo">
    <div class="userInfo_head">
      <img src="../../../../static/imgs/user_default.png" alt="头像">
      <span class="caret"></span>
    </div>
    <div class="user_list">
      <div v-if="ISLOGIN" class="login">
        <p>我的订单</p>
        <p>基本信息</p>
        <p>退出登录</p>
      </div>
      <div v-else class="personCenter">
        <p>登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      ISLOGIN: true
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.userInfo {
  position: relative;
  .userInfo_head {
    display: inline-block;
    min-width: 62px;
    height: 80px;
    line-height: 80px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 30px;
      vertical-align: middle;
    }
    .caret {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 2px;
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
    width: 58px;
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
    padding: 5px 15px 5px;
    text-align: center;
    z-index: 1000;
    width: 100px;
    p{
      font-size: 14px;
      margin: 4px auto;
    }
  }
}
</style>
