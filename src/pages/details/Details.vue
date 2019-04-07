<template>
  <div class="movie_details">
    <div class="details_banner">
      <div class="details_img">
        <img :src="movieImg" alt>
      </div>
      <div class="details_movie">
        <p class="movie_title">复仇者联盟4：终局之战</p>
        <p class="movie_class">动作,冒险,科幻</p>
        <p class="movie_time">美国 / 180分钟</p>
        <p class="movie_show">2019-05大陆上映</p>
      </div>
    </div>
    <div class="details_content">
      <div class="movie_msg">
        <div class="intro_select">
          <div
            class="select_item"
            :class="{active:item.id == selected}"
            v-for="item of select"
            :key="item.id"
          >{{item.name}}</div>
        </div>
        <div v-if="selected == 1" class="intro">
          <div class="intro_intro">
            <div class="intro_head">剧情简介</div>
            <p class="intro_detail">
              《复仇者联盟4》（Untitled Avengers film）是未上映的美国超级英雄电影，改编自漫威漫画，也是漫威电影宇宙第22部影片。由安东尼·罗素和乔·罗素执导，小罗伯特·唐尼、乔什·布洛林、马克·鲁法洛、
              汤姆·希德勒斯顿、克里斯·埃文斯、汤姆·赫兰德等主演。最终定档于2019年5月3日在美国上映。
            </p>
          </div>
          <div class="intro_acter">
            <div class="intro_head">演职人员</div>
            <div class=""></div>
          </div>
          <div class="intro_img">
            <div class="intro_head">图集</div>
          </div>
        </div>
        <div v-else-if="selected == 2" class="acter"></div>
        <div v-else class="movie_img"></div>
      </div>
      <div class="movie_relevant"></div>
    </div>
    <div class="details_comment"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieImg:
        "https://p0.meituan.net/movie/7f3e50c79645ba76e90b3f70a6b2f4f5300277.jpg",
      select: [
        {
          name: "介绍",
          id: 1
        },
        {
          name: "演职人员",
          id: 2
        },
        {
          name: "图集",
          id: 3
        }
      ],
      selected: 1
    };
  },
  methods:{
    getFilm(url) {
      this.$api.get({search:0},"/film/films/"+url,(res)=>{
        console.log(res);
      })
    }
  },
  mounted() {
    this.getFilm(2);
  }
};
</script>

<style lang="less" scoped>
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
.details_content {
  margin-top: 100px;
  width: 100%;
  .movie_msg {
    width: 750px;
    border-bottom: 2px solid #eee;
    .intro_select {
      margin-bottom: 20px;
      .select_item {
        cursor: pointer;
        float: left;
        margin-right: 30px;
        margin-bottom: -2px;
        padding-bottom: 10px;
        font-size: 18px;
        color: #333;
        line-height: 100%;
        border-bottom: 2px solid transparent;
      }
      .active {
        color: #ef4238;
        border-bottom-color: #ef4238;
      }
    }

    .intro {
      .intro_intro {
        margin-top: 60px;
        .intro_detail {
          margin-top: 20px;
          font-size: 12px;
        }
      }
      .intro_head {
        margin-top: 20px;
        font-size: 18px;
        color: #333;
        border-left: 4px solid #f03d37;
        padding-left: 6px;
        line-height: 18px;
        margin: 0;
      }
    }
  }
}
.details_content > div {
  display: inline-block;
}
</style>
