<template>
  <div>
    <div class="movie_header">
      <!-- 电影状态 -->
      <div class="top_header">
        <ul>
          <li class="active">正在热映</li>
          <li>即将上映</li>
          <li>经典影片</li>
        </ul>
      </div>
      <!-- 电影类型 -->
      <div class="movies_channel">
        <ul class="channel_content">
          <li class="channel_list">
            <div class="list_title">类型：</div>
            <ul class="list_content">
              <li class="active"><p>爱情</p></li>
              <li><p>动作</p></li>
              <li><p>动画</p></li>
            </ul>
          </li>
          <li class="channel_list">
            <div class="list_title">类型：</div>
            <ul class="list_content">
              <li class="active"><p>爱情</p></li>
              <li><p>动作</p></li>
              <li><p>动画</p></li>
            </ul>
          </li>
          <li class="channel_list">
            <div class="list_title">类型：</div>
            <ul class="list_content">
              <li class="active"><p>爱情</p></li>
              <li><p>动作</p></li>
              <li><p>动画</p></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 电影内容 -->
    <div class="movie_content">
      <!-- 单选框 -->
      <div class="movie_sort">
        <div class="sort_item">
          <input type="radio">
          <span>按热门排序</span>
        </div>
        <div class="sort_item">
          <input type="radio">
          <span>按时间排序</span>
        </div>
        <div class="sort_item">
          <input type="radio">
          <span>按评价排序</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.top_header {
  width: 100%;
  height: 60px;
  background-color: #47464a;
  text-align: center;
  ul {
    display: inline-block;
    li {
      display: inline-block;
      line-height: 60px;
      color: #999;
      padding: 0 40px;
      cursor: pointer;
    }
    li:hover {
      color: #fff;
    }
    .active {
      color: #ef4238;
    }
    .active:hover {
      color: #ef4238;
    }
  }
}
.movies_channel {
  margin: 40px auto 0;
  width: 1078px;
  padding: 0 20px;
  border: 1px solid #e5e5e5;
  .channel_content {
    margin: 0;
    padding: 0;
    .channel_list {
      padding: 10px 0!important;
      font-size: 14px;
      .list_title {
        display: inline-block;
        color: #999;

      }
      .list_content {
        list-style: none;
        display: inline-block;
        li{
          cursor: pointer;
          display: inline-block;
          padding: 3px 9px;
          margin-left: 12px;
          border-radius: 14px;
          p{
            color: #333;
          }
          p:hover {
            color: #ef4238;
          }
        }
        .active {
          background-color: #f34d41;
          color: #fff;
          p{
            color: #fff;
          }
        }
      }
    }
    .channel_list:nth-child(n+2) {
    border-top: 1px dotted #e5e5e5;
  }

  }
}
.movie_content {
  margin-top: 40px;
  .movie_sort {

  }
}
</style>
