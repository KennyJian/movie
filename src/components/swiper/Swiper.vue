<template>
  <div class="swiper" v-if="show">
    <swiper ref="myBanner" :options="swiperOption" v-if="imgList.length > 0">
      <swiper-slide v-for="(item, index) in imgList" :key="index">
        <div class="img-box" @click="doJump(item.jump_type, item.h_url)">
          <img :src="item.bannerAddress" alt="banner图" :key="new Date().getTime()+'_'+item.bannerAddress">
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "MySwiper",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // notNextTick: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        lazy: {
          loadPrevNext: true
        }
      }
    };
  },
  props: {
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    show: { type: Boolean, default: false }
  },
  methods: {
    // 点击banner跳转
    doJump(type, url) {
      if (type == 2) {
        window.open(url, "_blank");
      }
    }
  },
  mounted() {
    this.swiperOption = {
      notNextTick: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      loop: true,
      autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination"
      },
      lazy: {
        loadPrevNext: true
      }
    };
  }
};
</script>

<style lang="less" scoped>
.swiper {
  min-width: 1200px;
  height: 400px;
}
.img-box {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 380px;
  }
}
</style>
