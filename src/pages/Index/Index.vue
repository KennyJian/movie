<template>
  <div class="movie_content">
    <!-- 轮播图 -->
    <my-swiper :imgList="banner" :show="loaded"></my-swiper>
    <!-- 主内容 -->
    <div class="index_content">
      <!-- 正在热映 -->
      <my-show :movielist="movieList" :type="type" ></my-show>
      <!-- 即将上映 -->
      <my-show :movielist="expeactList" :type="!type" ></my-show>
    </div>
    <!-- 侧边栏 -->
    <aside class="index_aside">
      <!-- 今日票房 -->
      <my-list :list="todayGrossed" :type="type"></my-list>
      <!-- 最受期待 -->
      <my-list :list="expect" :type="!type"></my-list>
    </aside>
  </div>
</template>

<script>
import MySwiper from "@/components/swiper/Swiper";
import MyShow from "@/components/index/MyMovieShow.vue";
import MyList from "@/components/index/MyMovieList.vue";
export default {
  components: {
    MySwiper,
    MyShow,
    MyList
  },
  data() {
    return {
      // 轮播图
      banner: [],
      // 正在热映
      movieList: [],
      // 即将上映
      expeactList:[],
      // 今日票房
      todayGrossed: [],
      // 最受期待
      expect:[],
      loaded: true, // 是否加载完成
      type: true, //判断热映还是预约 true热映 false预约
    };
  },
  methods: {
    getBannerList(list) {
      for(let i = 0; i < list.length; i++) {
        this.banner.push(list[i]);
      }
    }
  },
  mounted() {
    this.$api.get({},'/film/getIndex',
     (res) => {
       let data = res.data;
       this.getBannerList(data.banners);
       this.movieList = {...data.hotFilms};
       this.expeactList = {...data.soonFilms};
       this.todayGrossed = {...data.boxRanking};
       this.expect = {...data.expectRanking};
    })
  }
};
</script>

<style lang="less" >
.movie_content {
  width: 1200px;
  margin: 100px auto 0;
}
.index_content {
  margin: 60px 0 0 0;
  width: 700px;
  display: inline-block;
}
// 侧边栏项目
.index_aside {
  margin: 60px 0 0 0;
  vertical-align: top;
  width: 495px;
  height: 500px;
  display: inline-block;
}
</style>
