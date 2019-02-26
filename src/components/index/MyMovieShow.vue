<template>
  <div>
    <!-- 正在热映 -->
    <div v-if="type" class="content_item">
      <div class="item_head hot">
        <span class="label">正在热映（{{movielist.filmNum}}部）</span>
        <span class="all">
          <a href>全部</a>
        </span>
      </div>
      <div class="item_list">
        <div class="movie_list" v-for="(item, index) of movielist.filmInfoList" :key="index">
          <div class="list_head">
            <img :src="item.imgAddress" :alt="item.filmName">
            <div class="message">
              <span class="movie_name">{{item.filmName}}</span>
              <span class="score">{{item.filmScore}}</span>
            </div>
          </div>
          <div class="list_bottom">
            <a href="#">购票</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 即将上映 -->
    <div v-else class="content_item comming">
      <div class="item_head">
        <span class="label">即将上映（{{movielist.filmNum}}部）</span>
        <span class="all">
          <a href>全部</a>
        </span>
      </div>
      <div class="item_list">
        <div class="movie_list" v-for="(item, index) of movielist.filmInfoList" :key="index">
          <div class="list_head">
            <img :src="item.imgAddress" :alt="item.filmName">
            <div class="message">
              <span class="movie_name">{{item.filmName}}</span>
            </div>
          </div>
          <div class="list_bottom">
            <div class="number">{{item.expectNum}}人想看</div>
            <div class="options">
              <p class="trailer">预告片</p>
              <p class="pre_sale">预售</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyShow",
  props: {
    movielist:{},
    type: Boolean
  },
  data() {
    return {
      list:{}
    }
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
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
              display: inline-block;
              height: 21px;
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
        height: 39px;
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
</style>
