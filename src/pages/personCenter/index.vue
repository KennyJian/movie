<template>
  <div class="personCenter">
    <div class="person_left">
        <h1 class="title">个人中心</h1>
        <router-link to="/order"  :class="{'active': $route.path === '/order' }" >我的订单</router-link>
        <router-link to="/person"  :class="{'active':$route.path === '/person'}">我的信息</router-link>
    </div>
    <div class="person_right">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .personCenter {
    width: 1162px;
    min-height:900px;
    border:  1px solid #e1e1e1;
    margin-top: 110px;
  }
  .person_left {
    width: 200px;
    min-height:900px;
    border-right: 1px solid #e1e1e1;
    background-color: #f4f3f4;
    text-align: center;
    display: inline-block;
    .title {
      padding-top: 40px;
      margin-bottom: 30px;
      font-size: 22px;
      color: #222;
      font-weight: 400;
    }
    a{
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #333;
    }
    .active{
      background-color:#ef4238;
      color:#fff;
    }

  }
  .person_right {
    display: inline-block;
    width: 950px;
    vertical-align: top;
    padding-left: 40px;
  }
</style>
