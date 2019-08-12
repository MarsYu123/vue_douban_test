<template>
  <ElRow type="flex" justify="center">
    <ElCol :span="13">
      <div class="search_cont">
        <div class="search_item" v-for="(item, index) in select_data" :key="index">
          <img :src="item.images.medium" alt />
          <div class="item_info">
            <div class="item_title">{{ item.title }}</div>
            <div class="rate">
              <el-rate
                :value="item.rating.average / 2"
                disabled
                show-score
                allow-half
                text-color="#ff9900"
              ></el-rate>
              <span>（{{ item.rating.stars }}人评价）</span>
            </div>
            <div class="info">
              <span v-for="info_item in item.genres" :key="info_item">{{ info_item }}/</span>
              <span>{{ item.title }}</span>
            </div>
            <div class="actor">
              <span v-for="actor_item in item.directors" :key="actor_item.id">{{ actor_item.name }}/</span>
              <span v-for="casts_item in item.casts" :key="casts_item.id">{{ casts_item.name }}/</span>
            </div>
          </div>
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script>
import comment from "./module/comment";
export default {
  name: "search_results",
  data() {
    return {
      select_val: "",
      select_data: {},
      a: 123
    };
  },
  methods: {},
  computed: {},
  mounted() {
    var that = this;
    that.select_val = that.$route.query.select;
    // 获取搜索内容
    that.axios
      .get("/api/movie/search" + comment.url_apikey, {
        params: {
          q: that.select_val,
          start: 0,
          count: 10
        }
      })
      .then(function(res) {
        console.log(res);
        that.select_data = res.data.subjects;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
// 搜索页面
.search_cont {
  width: 100%;
  .search_item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    img {
      display: block;
      width: 65px;
      margin-right: 20px;
    }
    .item_info {
      text-align: left;
      .item_title {
        display: inline;
        color: #37a;
        &:hover {
          color: #ffffff;
          text-decoration: none;
          background: #37a;
        }
      }
      .rate {
        margin-top: 5px;
        display: flex;
        font-size: 12px;
        align-items: center;
        .el-rate {
          height: 13px;
        }
        .el-rate__text {
          font-size: 12px;
        }
        .el-rate__icon {
          font-size: 13px;
        }
      }
      .info,
      .actor {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

