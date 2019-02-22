<template>
  <div class="movie_content">
    <!-- 轮播图 -->
    <my-swiper :imgList="banner" :show="loaded"></my-swiper>
    <!-- 主内容 -->
    <div class="index_content">

      <!-- 正在热映 -->
      <div class="content_item">
        <div class="item_head hot">
          <span class="label">正在热映（9部）</span>
          <span class="all">
            <a href>全部</a>
          </span>
        </div>
        <div class="item_list">
          <div class="movie_list" v-for="(item, index) of movieList" :key="index">
            <div class="list_head">
              <img :src="item.img" alt="影片海报">
              <div class="message">
                <span class="movie_name">{{item.name}}</span>
                <span class="score">{{item.score}}</span>
              </div>
            </div>
            <div class="list_bottom">
              <a href="#">购票</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 即将上映 -->
      <div class="content_item comming">
        <div class="item_head">
          <span class="label">即将上映（107部）</span>
          <span class="all">
            <a href>全部</a>
          </span>
        </div>
        <div class="item_list">
          <div class="movie_list" v-for="(item, index) of movieList" :key="index">
            <div class="list_head">
              <img :src="item.img" alt="影片海报">
              <div class="message">
                <span class="movie_name">{{item.name}}</span>
              </div>
            </div>
            <div class="list_bottom">
              <div class="number">12220202人想看</div>
              <div class="options">
                <p class="trailer">预告片</p>
                <p class="pre_sale">预售</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <aside class="index_aside">
      <!-- 今日票房 -->
      <div class="leaderboard">
        <p id="leaderboard_title">今日票房</p>
        <div class="content">
          <div id="list_item" v-for="(item,index) of todayGrossed" :key="index">
            <div v-if="index ==0" class="item_top">
              <img src="https://p0.meituan.net/movie/879735a49da60134497e13c2d95e877c58219.jpg" alt>
              <div class="top_right">
                <p>{{item.name}}</p>
                <p>{{item.num}}万</p>
              </div>
            </div>
            <div class="grossed_last" v-else>
              <p class="movie_name">
                <span :class="{top:index < 3 }">{{index + 1}}</span>
                {{item.name}}
              </p>
              <p class="movie_grossed">{{item.num}}万</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 最受期待 -->
      <div class="leaderboard expect">
        <p id="leaderboard_title">最受期待</p>
        <div class="content">
          <div id="list_item" v-for="(item,index) of todayGrossed" :key="index">
            <div v-if="index ==0" class="item_top">
              <img src="https://p0.meituan.net/movie/879735a49da60134497e13c2d95e877c58219.jpg" alt>
              <div class="top_right">
                <p>{{item.name}}</p>
                <p>{{item.num}}万</p>
              </div>
            </div>
            <div class="grossed_last" v-else>
              <p class="movie_name">
                <span :class="{top:index < 3 }">{{index + 1}}</span>
                {{item.name}}
              </p>
              <p class="movie_grossed">{{item.num}}万</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import MySwiper from '@/components/swiper/Swiper'
import MovieShow from "@/components/index/MovieShow.vue";
import MovieList from "@/components/index/MovieList.vue";
export default {
  components: {
    MySwiper,
    MovieShow,
    MovieList
  },
  data() {
    return {
      banner: [
        {
          img_path: 'http://img.yyzz.com.cn/Uploads/video/2019-01/20190118155458_43043.png'
        },
        {
          img_path: 'http://img.yyzz.com.cn/Uploads/video/2019-01/20190117170729_80167.png'
        }
      ],
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
  .content_item {
    .hot {
      color: #ef4238;
    }
    .item_head {
      width: 100%;
      height: 26px;
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 26px;
      }
      .all {
        font-size: 14px;
        position: relative;
        top: 11px;
        a {
          text-decoration: none;
          color: #ef4238;
        }
      }
    }
    .item_list {
      margin-top: 15px;
      .movie_list {
        display: inline-block;
        width: 160px;
        height: 260px;
        margin-right: 20px;
        margin-top: 15px;
        border: 1px solid #efefef;
        .list_head {
          img {
            width: 160px;
            height: 220px;
          }
          .message {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: relative;
            bottom: 30px;
            color: #fff;
            .movie_name {
              margin-left: 10px;
              font-size: 16px;
            }
            .score {
              margin-right: 10px;
              color: #ffb400;
              font-size: 18px;
            }
          }
        }
        .list_bottom {
          width: 100%;
          height: 40px;
          position: relative;
          bottom: 25px;

          a {
            display: block;
            text-align: center;
            width: 100%;
            height: 100%;
            line-height: 40px;
            color: #ef4238;
          }
          a:hover {
            background-color: #ef4238;
            color: #fff;
          }
        }
      }
      .movie_list:hover {
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      }
      .movie_list:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
  }
  .comming {
    margin: 62px 0 0 0;
    .item_head {
      color: #2d98f3;
      a {
        color: #2d98f3 !important;
      }
    }
    .movie_list {
      height: 295px !important;
      .number {
        height: 34px;
        color: #ffb400;
        padding-left: 10px;
        text-align: left;
        font-size: 14px;
        line-height: 35px;
        background-color: #fbfbfb;
      }
      .options {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        text-align: center;
        background-color: #fff;
        font-size: 14px;
        p {
          flex: 1;
          line-height: 40px;
        }
        .trailer {
          border-right: 1px solid #efefef;
          color: #999;
        }
        .pre_sale {
          color: #2d98f3;
          cursor: pointer;
        }
        .pre_sale:hover {
          background-color: #2d98f3;
          color: #fff;
        }
      }
    }
  }
}
// 侧边栏项目
.index_aside {
  vertical-align: top;
  width: 495px;
  height: 500px;
  display: inline-block;
}
.leaderboard {
  width: 360px;
  margin-left: 120px;
  #leaderboard_title {
    font-size: 26px;
    color: #ef4238;
  }
  .content {
    margin-top: 15px;
    width: 100%;
    #list_item {
      cursor: pointer;
      width: 100%;
      // 排行第一
      .item_top {
        width: 100%;
        height: 78px;
        border: 1px solid #efefef;
        margin-bottom: 10px;
        img {
          display: inline-block;
          width: 120px;
          height: 78px;
        }
        .top_right {
          display: inline-block;
          height: 78px;
          vertical-align: top;
          padding:20px 0 0 10px;
          p:first-child {
            font-size: 18px;
          }
          p:last-child {
            font-size: 14px;
            color: #ef4238;
            margin-top: 5px;
          }
        }
      }
      // 其他
      .grossed_last {
        width: 100%;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .movie_name {
          display: inline-block;
          font-size: 16px;
          span {
            display: inline-block;
            width: 20px;
            font-size: 18px;
          }
          .top {
            color: #ef4238;
          }
        }
        .movie_grossed {
          font-size: 14px;
          color: #ef4238;
        }
      }
    }
    #list_item:hover {
      background-color: #f7f7f7;
    }
  }
}
.expect {
  margin-top: 210px;
  #leaderboard_title {
    color:#ffb400;
  }
}
</style>
