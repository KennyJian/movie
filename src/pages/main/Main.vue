<template>
  <div class="page-container">
    <my-header></my-header>
    <router-view/>
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
  }
}
</script>

<style lang="">

</style>
