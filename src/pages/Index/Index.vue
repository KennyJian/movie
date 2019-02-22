<template>
  <div class="movie_content">
    <!-- 轮播图 -->
    <my-swiper :imgList="banner" :show="loaded"></my-swiper>
    <!-- 主内容 -->
    <div class="index_content">
      <!-- 正在热映 -->
      <my-show :movielist="movieList" :type="type" ></my-show>
      <!-- 即将上映 -->
      <my-show :movielist="movieList" :type="!type" ></my-show>
    </div>
    <!-- 侧边栏 -->
    <aside class="index_aside">
      <!-- 今日票房 -->
      <my-list :list="todayGrossed" :type="type"></my-list>
      <!-- 最受期待 -->
      <my-list :list="todayGrossed" :type="!type"></my-list>
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
      banner: [
        {
          img_path:
            "http://img.yyzz.com.cn/Uploads/video/2019-01/20190118155458_43043.png"
        },
        {
          img_path:
            "http://img.yyzz.com.cn/Uploads/video/2019-01/20190117170729_80167.png"
        }
      ],
      // 电影列表
      movieList: [
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        },
        {
          img:
            "https://p1.meituan.net/movie/bd06ffeec9538535d657abdc6a98f23f1622889.jpg",
          name: "大人物",
          score: "9.3"
        }
      ],
      // 榜单
      todayGrossed: [
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        },
        {
          name: "阿丽塔：战斗天使",
          num: "10000.34"
        }
      ],
      loaded: true, // 是否加载完成
      type: true, //判断热映还是预约 true热映 false预约
    };
  }
};
</script>

<style lang="less" scope>
.movie_content {
  width: 1200px;
  margin: 100px auto 0;
}
.index_content {
  width: 700px;
  display: inline-block;
}
// 侧边栏项目
.index_aside {
  vertical-align: top;
  width: 495px;
  height: 500px;
  display: inline-block;
}
</style>
