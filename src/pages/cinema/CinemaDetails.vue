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
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinemaImg: "", //影院图片
      cinemaName: "", //影院名称
      cinemaPhone: "", //影院电话
      cinemaAddress: "" //影院地址
    };
  },
  methods: {},
  mounted() {}
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
    .movie_title {
      width: 300px;
      margin-top: 0;
      font-size: 26px;
      line-height: 32px;
      font-weight: 700;
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .movie_class,
    .movie_time,
    .movie_show {
      margin: 12px 0;
      line-height: 100%;
      font-size: 12px;
    }
  }
}
.details_banner > div {
  display: inline-block;
}
</style>
