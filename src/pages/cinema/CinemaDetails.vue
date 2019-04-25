<template>
  <div class="c_details">
    <div class="details_banner">
      <div class="details_img">
        <img :src="cinemaImg" alt>
      </div>
      <div class="details_movie">
        <p class="cinema_title">{{cinemaName}}</p>
        <p class="cinema_class">{{cinemaAddress}}</p>
        <p class="cinema_time">电话：{{cinemaPhone}}</p>
      </div>
    </div>
    <div class="details_content">
      <div class="movie_light">
        <div class="movie_arrow">
          <div class="arrow_left"></div>
          <div class="arrow_right"></div>
        </div>
        <div class="light_center">
          <div
            class="light_item"
            :class="{active:index == selected}"
            @click="changeFilm(index)"
            v-for="(item,index) of filmList"
            :key="index"
          >
            <div class="light_img">
              <img :src="item.imgAddress" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="light_intro">
        <!-- <p class="light_name">{{filmList[selected].filmName}}</p>
        <p class="light_time">
          时长：
          <span>{{filmList[selected].filmLength}}</span>
        </p>
        <p class="light_class">
          类型：
          <span>{{filmList[selected].filmType}}</span>
        </p>
        <p class="light_actors">
          演员：
          <span>{{filmList[selected].actors}}</span>
        </p> -->
      </div>
      <div class="cinema_Session">
        <div class="session_title">
          <p>放映时间</p>
          <p>语言版本</p>
          <p>放映厅</p>
          <p>售价</p>
          <p>选座购票</p>
        </div>
        <div class="session_content">
          <div
            class="content_item"
            v-for="(item,index) of filmList[selected].filmFields"
            :key="index"
          >
            <p>
              {{item.beginDate}}
              {{item.beginTime}}
              <span>{{item.endTime}}散场</span>
            </p>
            <p>{{item.language}}</p>
            <p>{{item.hallName}}</p>
            <p>￥{{item.price}}</p>
            <p>
              <span @click="goSext(item.field)">选座购票</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "@/common/utils";
export default {
  data() {
    return {
      cinemaId: "", //影院id
      cinemaImg: "", //影院图片
      cinemaName: "", //影院名称
      cinemaPhone: "", //影院电话
      cinemaAddress: "", //影院地址
      filmList: [], //电影列表
      selected: 0, //选择的电影


    };
  },
  methods: {
    getCinema(id) {
      var that = this;
      this.$api.post(
        {
          cinemaId: id
        },
        "/cinema/getFields",
        res => {
          let data = res.data;
          if (res.status == 200) {
            that.cinemaImg = res.imgPre + data.cinemaInfo.imgUrl;
            that.cinemaName = data.cinemaInfo.cinemaName;
            that.cinemaAddress = data.cinemaInfo.cinemaAddress;
            that.cinemaPhone = data.cinemaInfo.cinemaPhone;
            that.filmList = { ...data.filmList };
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    changeFilm(index, id) {
      this.selected = index;
    },
    goSext(id) {
      var that = this;
      if (getCookie("key") != "") {
        this.$router.push({
          path: "/sxeat",
          query: {  field: id }
        });
      } else {
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    var cinema = this.$route.query.cinemaId;
    this.cinemaId = this.$route.query.cinemaId;
    this.getCinema(cinema);
  }
};
</script>

<style lang="less">
.details_banner {
  width: 1200px;
  height: 326px;
  background-color: #513855;
  padding-top: 70px;
  .details_img {
    border: 4px solid #fff;
    height: 302px;
    width: 222px;
    margin-left: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .details_movie {
    padding-top: 40px;
    width: 300px;
    vertical-align: top;
    color: #fff;
    margin-left: 20px;
    .cinema_title {
      width: 300px;
      margin-top: 0;
      font-size: 26px;
      line-height: 32px;
      font-weight: 700;
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cinema_class,
    .cinema_time {
      margin: 12px 0;
      line-height: 100%;
      font-size: 16px;
    }
  }
}
.details_banner > div {
  display: inline-block;
}
.details_content {
  margin-top: 60px;
  .movie_light {
    height: 280px;
    padding: 20px 5px;
    overflow: hidden;
    background-color: #ededed;
    .light_center {
      display: flex;
      align-items: center;
      .light_item {
        width: 162px;
        height: 227px;
        border: 4px solid #fff;
        margin-left: 25px;
        .light_img {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .active {
        border-color: #f24030;
        width: 180px;
        height: 250px;
        z-index: 555;
      }
    }
  }
  .light_intro {
    margin-top: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 28px;
    .light_name {
      margin: 0 20px 20px 0;
      font-size: 26px;
      font-weight: 400;
      color: #333;
    }
    .light_time,
    .light_class,
    .light_actors {
      display: inline-block;
      font-size: 14px;
      margin-top: 10px;
      color: #999;
      span {
        color: #151515;
      }
    }
    .light_class,
    .light_actors {
      margin-left: 40px;
    }
  }
  .cinema_Session {
    margin-top: 20px;
    .session_title {
      display: flex;
      align-items: center;
      text-align: center;
      padding: 16px 0;
      background-color: #e5e5e5;
      p {
        flex: 1;
        color: #333;
        font-size: 16px;
      }
    }
    .session_content {
      .content_item {
        display: flex;
        height: 82px;
        align-items: center;
        text-align: center;
        p {
          flex: 1;
          span {
            display: block;
            font-size: 12px;
            color: #999;
          }
        }
        p:nth-child(1) {
          font-size: 18px;
          color: #333;
          font-weight: 700;
        }
        p:nth-child(2),
        p:nth-child(3) {
          font-size: 14px;
          color: #333;
        }
        p:nth-child(4) {
          font-size: 18px;
          color: #f03d37;
          font-weight: 700;
        }
        p:last-child {
          text-align: center;
          span {
            cursor: pointer;
            display: inline-block;
            width: 80px;
            height: 30px;
            color: #fff;
            background-color: #f03d37;
            font-size: 14px;
            line-height: 30px;
            border-radius: 100px;
          }
        }
      }
      .content_item:nth-child(2n) {
        background-color: #e5e5e5;
      }
    }
  }
}
</style>
