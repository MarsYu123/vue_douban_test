<template>
  <div class="index">
    
    <ElRow type="flex" justify="center">
      <ElCol :xl="16" :span="16">
        <ElCol :xl="18" :span="18">
          <indexRoll :now_hot_active="hot_nav.active"></indexRoll>
          <div class="hot">
            <div class="hot_title">
              <div class="hot_nav">
                <p>热门电影</p>
                <div class="two_nav">
                  <div
                    v-for="(i,index) in hot_nav.item"
                    :key="index"
                    :class="['mouse hot_nav_item', hot_nav.active == index ?'active':'']"
                    @click="hot_nav_click"
                    :data-index="index"
                  >{{i}}</div>
                </div>
              </div>
              <div class="more mouse">更多</div>
            </div>
            <div class="hot_list">
              <div class="hot_item" v-for="i in top_data" :key="i.id">
                <router-link :to="{ name: 'move_detail', query: { movie_id: i.id } }">
                  <div class="cover">
                    <img :src="i.images.medium" alt />
                  </div>
                  <p class="name">{{i.title}}</p>
                  <p class="rating">{{i.rating.average}}</p>
                </router-link>
              </div>
            </div>
          </div>
        </ElCol>
      </ElCol>
    </ElRow>

    
  </div>
</template>

<script>
import indexRoll from "./module/index_roll";
import comment from "./module/comment";


export default {
  name: "index",
  data() {
    return {
      top_data: {},
     
      hot_nav: {
        active: 0,
        item: ["热门", "最新", "豆瓣高分", "冷门佳片"]
      },
    };
  },
  components: {
    indexRoll,

  },

  /* 加载完毕 */
  mounted() {
    this.request_hot("/api/movie/top250");
  },

  /* 执行函数 */
  methods: {

   

    // 请求热门电影接口
    request_hot: function(url) {
      var that = this;
      that.axios
        .get(url + comment.url_apikey, {
          params: {
            start: 0,
            count: 10
          }
        })
        .then(function(e) {
          console.log(e);
          var data = e.data.subjects
          if(e.data.subjects[0].rank != undefined){
            for(var i in data)
              data[i] = data[i].subject
          }
          that.$set(that, "top_data", data);
        });
    },

    get_hot: function() {},

    // 切换导航
    hot_nav_click: function(e) {
      var index = e.target.dataset.index;
      this.$set(this.hot_nav, "active", index);

      if (index == 0) {
        this.request_hot("/api/movie/top250");
      }else if(index == 1){
        this.request_hot("/api/movie/new_movies")
      }else if(index == 2){
        this.request_hot("/api/movie/weekly")
      }else{
        this.request_hot("/api/movie/us_box")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hot {
  width: 100%;
  margin: 30px auto;
  .hot_title {
    padding: 15px 0;
    border-bottom: 1px solid #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .hot_nav {
      display: flex;
      align-items: flex-end;
      p {
        font-size: 18px;
        margin-right: 30px;
      }
      .two_nav {
        display: flex;
        align-items: center;
        .hot_nav_item {
          margin-right: 20px;
          font-size: 15px;
          color: rgb(173, 173, 173);
          &:hover {
            background: #37a;
            color: #ffffff;
          }
          &.active {
            color: #000;
            &:hover {
              background: transparent;
            }
          }
        }
      }
    }
    .more {
      color: #37a;
    }
  }
  .hot_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .hot_item {
      width: 19%;
      text-align: center;
      margin-bottom: 15px;
      
      .cover {
        width: 100%;
        height: 161px;
        display: block;
        margin-bottom: 15px;
        overflow: hidden;
        img{
          width: 100%;
          display: block
        }
      }
      .name {
        font-size: 16px;
        color: #37a;
        &:hover {
          background: #37a;
          color: #ffffff;
        }
      }
      .rating {
        color: #e09015;
        font-size: 14px;
      }
    }
  }
}
</style>