<template>
  <div class="userInfo">
    <img src="../../../../static/imgs/user_default.png" alt="头像">
    <span class="caret"></span>
    <ul></ul>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style lang="less">
.userInfo {
  display: inline-block;
  min-width: 56px;
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
</style>
