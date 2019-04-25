<template>
  <div class="movie_details">
    <div class="details_banner">
      <div class="details_img">
        <img :src="movieImg" alt>
      </div>
      <div class="details_movie">
        <p class="movie_title">{{filmName}}</p>
        <p class="movie_class">{{inforClass}}</p>
        <p class="movie_time">{{inforTime}}</p>
        <p class="movie_show">{{inforDate}}</p>
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
            @click="selectShow(item.id)"
          >{{item.name}}</div>
        </div>
        <div v-if="selected == 1" class="intro">
          <div class="intro_intro">
            <div class="intro_head">剧情简介</div>
            <p class="intro_detail">{{filmR.biography}}</p>
          </div>
          <div class="intro_acter">
            <div class="intro_head">演职人员</div>
            <div class="actor_content">
              <div class="director">
                <p>导演</p>
                <div class="director_item">
                  <div class="director_img">
                    <img :src="filmR.actors.director.imgAddress" alt>
                  </div>
                  <p>{{filmR.actors.director.directorName}}</p>
                </div>
              </div>
              <div class="actor">
                <p class="actor_title">演员</p>
                <div
                  class="actor_item"
                  v-for="(actorItem,index) of filmR.actors.actors"
                  :key="index"
                >
                  <div class="actor_img">
                    <img :src="actorItem.imgAddress" alt>
                  </div>
                  <p>{{actorItem.directorName}}</p>
                  <p class="character">饰：{{actorItem.roleName}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="intro_img">
            <div class="intro_head">图集</div>
            <div class="img_content">
              <div class="img_main">
                <img :src="filmR.imgVO.mainImg" alt>
              </div>
              <div class="img_aside">
                <div class="aside_item">
                  <img :src="filmR.imgVO.img01" alt>
                </div>
                <div class="aside_item">
                  <img :src="filmR.imgVO.img02" alt>
                </div>
                <div class="aside_item">
                  <img :src="filmR.imgVO.img03" alt>
                </div>
                <div class="aside_item">
                  <img :src="filmR.imgVO.img04" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="intor_comment">
            <div class="comment_head">
              <div class="intro_head">热门短评</div>
              <review @commit="review" :filmId="filmId"></review>
            </div>
            <div class="comment_content">
              <div class="comment_item" v-for="(item,index) of comment" :key="index">
                <div class="item_head">
                  <div class="commit_img">
                    <img :src="imgUrl+item.headUrl" alt>
                  </div>
                  <div class="commit_intro">
                    <span>{{item.userName}}</span>
                    <p>{{item.createTime}}</p>
                  </div>
                </div>
                <div class="item_content">
                  <p>{{item.comment}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selected == 2" class="cast_member">
          <div class="cast_director">
            <p>导演(1)</p>
            <div class="direct_show">
              <div class="direct_img">
                <img :src="filmR.actors.director.imgAddress" alt>
              </div>
              <p>{{filmR.actors.director.directorName}}</p>
            </div>
          </div>
          <div class="cast_actor">
            <p>演员({{filmR.actors.actors.length}})</p>
            <div class="actor_item" v-for="(actorItem,index) of filmR.actors.actors" :key="index">
              <div class="actor_img">
                <img :src="actorItem.imgAddress" alt>
              </div>
              <p>{{actorItem.directorName}}</p>
              <p class="character">饰：{{actorItem.roleName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="movie_relevant">
        <div class="intro_head">相关电影</div>
        <div class="relevant_content">
          <div class="relevant_item" v-for="(rele,index) of recommends" :key="index">
            <div class="relevant_img">
              <img :src="rele.imgAddress" alt>
            </div>
            <p class="relevant_title">{{rele.filmName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Review from "@/components/reviews/review"
export default {
  components:{
    Review
  },
  data() {
    return {
      movieImg: "",
      select: [
        {
          name: "介绍",
          id: 1
        },
        {
          name: "演职人员",
          id: 2
        }
      ],
      filmId:'',
      selected: 1,
      filmName: "", //电影名称
      inforClass: "", //电影类型
      inforTime: "", //电影时长
      inforDate: "", //电影时间
      filmR: {}, //电影相关
      recommends: {}, //相关电影
      actors: [], //演员
      comment: [], //评论
      imgUrl: "ftp://www.chong10010.cn/pub/temp" //图片地址头部
    };
  },
  methods: {
    getFilm(url) {
      var that = this;
      this.$api.get({ searchType: 0 }, "/film/films/" + url, res => {
        let data = res.data;
        if (res.status == 200) {
          that.movieImg = data.imgAddress;
          that.filmName = data.filmName;
          that.inforClass = data.info01;
          that.inforTime = data.info02;
          that.inforDate = data.info03;
          that.filmR = { ...data.info04 };
          that.recommends = { ...data.recommends };
          that.actors = { ...data.info04.actors.actors };
          that.comment = { ...data.comments };
        }
      });
    },
    selectShow(item) {
      this.selected = item;
    },
    review(res) {

    }
  },
  mounted() {
    this.filmId = this.$route.query.filmId;
    this.getFilm(this.filmId);
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
.intro_head {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  border-left: 4px solid #f03d37;
  padding-left: 6px;
  line-height: 18px;
  margin: 0;
}
.details_content {
  margin-top: 100px;
  width: 100%;
  .movie_msg {
    width: 750px;
    border-bottom: 2px solid #eee;
    display: inline-block;
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
    // 介绍
    .intro {
      .intro_intro {
        margin-top: 60px;
        .intro_detail {
          margin-top: 20px;
          font-size: 12px;
        }
      }
      .intro_acter {
        margin-top: 20px;
        .actor_content {
          width: 100%;
          display: flex;
          padding-top: 20px;
          p {
            font-size: 16px;
            margin-bottom: 16px;
          }
          .director_item {
            text-align: center;
            .director_img,
            .actor_img {
              width: 128px;
              height: 170px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .actor {
            .actor_title {
              margin-left: 20px;
            }
            .actor_item {
              margin-left: 20px;
              text-align: center;
              display: inline-block;
            }
            .character {
              font-size: 14px;
              color: #666;
              margin-top: -10px;
            }
          }
        }
      }
      .intro_img {
        .img_content {
          margin-top: 20px;
          .img_main {
            display: inline-block;
            width: 450px;
            height: 258px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .img_aside {
            display: inline-block;
            width: 280px;
            .aside_item {
              display: inline-block;
              width: 126px;
              height: 126px;
              margin-left: 6px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .aside_item:nth-child(n + 3) {
              margin-top: 6px;
            }
          }
        }
      }
      .intor_comment {
        margin-top: 20px;
        .comment_head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .commit_button {
            cursor: pointer;
            height: 30px;
            padding: 0 10px;
            border-radius: 15px;
            border: 1px solid #ef4238;
            text-align: center;
            font-size: 14px;
            line-height: 30px;
            color: #ef4238;
          }
        }
        .comment_content {
          .comment_item {
            margin-top: 20px;
            .item_head {
              display: flex;
              .commit_img {
                width: 50px;
                height: 50px;
                border-radius: 30px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 30px;
                }
              }
              .commit_intro {
                vertical-align: middle;
                color: #333;
                font-size: 16px;
                margin-left: 5px;
                span {
                  display: block;
                }
                p {
                  margin-top: 2px;
                  color: #999;
                }
              }
            }
            .item_content {
              margin-top: 20px;
              padding-bottom: 30px;
              border-bottom: 1px solid #e5e5e5;
              color: #666;
              line-height: 26px;
              font-size: 14px;
              margin-left: 55px;
            }
          }
        }
      }
    }
    .img_item {
      width: 104px;
      height: 104px;
      margin-top: 20px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img_item:nth-child(5n + 1) {
      margin-left: 0;
    }
    .cast_member {
      padding-top: 20px;
      .cast_director {
        margin-bottom: 40px;
        .direct_show {
          margin-top: 20px;
          text-align: center;
          width: 128px;
          // height:170px;
          .direct_img {
            width: 128px;
            height: 170px;
            img {
              width: 100%;
              height: 100%;
            }
            p {
              margin-top: 5px;
            }
          }
        }
      }
      .cast_actor {
        margin-top: 20px;
        .actor_item {
          display: inline-block;
          width: 128px;
          margin-top: 20px;
          text-align: center;
          margin-left: 20px;
          .actor_img {
            width: 100%;
            height: 170px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .actor_item:nth-child(1) {
          margin-left: -20px;
        }
      }
    }
  }
  .movie_relevant {
    vertical-align: top;
    max-width: 400px;
    display: inline-block;
    margin-left: 45px;
    .relevant_content {
      margin-top: 20px;
      .intro_head {
        margin-left: 20px;
      }
      .relevant_item {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        margin-left: 20px;
        margin-top: 20px;
        .relevant_img {
          width: 106px;
          height: 145px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .relevant_title {
          margin-top: 10px;
          color: #333;
          font-size: 14px;
        }
        .relevant_score {
          font-size: 14px;
          color: #ffb400;
        }
      }
    }
  }
}
.details_content > div {
  display: inline-block;
}
</style>
