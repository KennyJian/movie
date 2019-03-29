<template>
  <div class="page-container">
    <my-header></my-header>
    <div class="content">
      <router-view/>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/head/MyHeader'
import MyFooter from '@/components/footer/MyFooter'
export default {
  name: 'Main',
  components: {
    MyHeader,
    MyFooter
  },
  mounted(){
    // console.log(this.$route);
  }
}
</script>

<style lang="less">
  .content {
    margin: 80px auto 0;
    width: 1200px;
    max-width: 1200px;
  }
</style>
