<template>
  <div class="search">
    <div v-if="searchRetrun" class="search_content"></div>
    <div v-else class="search_empty"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchReturn:true,
      searchVal:''
    };
  },
  methods: {
    searchFilm(val) {
      this.$api.get(
        { filmName: val },
        "/film/searchFilm",
        res => {
          if (res.data) {
            console.log(res.data);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    let search = this.$route.query.search;
    if(search) {
      this.searchReturn = false;
    }
    this.searchFilm(search);
  }
};
</script>

<style lang="less" scoped>

</style>
