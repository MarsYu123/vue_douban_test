<template>
  <div class="move_detail">
    <el-row type="flex" justify="center">
      <ElCol :span="16" :md="16" :lg="16" :sm="14">
        <el-row type="flex" justify="space-between">
          <el-col :span="14" :md="16" :lg="16" :sm="10">
            <div class="content" v-if="reload">
              <div class="title">
                {{detail.title}}
                <span>（{{detail.year}}）</span>
              </div>

              <div class="movie_head">
                <div class="movie_info">
                  <div class="cover">
                    <img :src="detail.images.medium" alt />
                  </div>
                  <div class="info">
                    <div class="info_td">
                      <div class="info_title">导演：</div>
                      <div class="info_msg">
                        <span
                          :data-id="item.id"
                          v-for="(item, index) in detail.directors"
                          :key="item.id"
                        >
                          {{item.name}}
                          {{index == (detail.directors.length -1)?'':' / '}}
                        </span>
                      </div>
                    </div>

                    <div class="info_td">
                      <div class="info_title">主演：</div>
                      <div class="info_msg">
                        <span
                          :data-id="item.id"
                          v-for="(item, index) in detail.casts"
                          :key="item.id"
                        >
                          {{item.name}}
                          {{index == (detail.casts.length -1)?'':' / '}}
                        </span>
                      </div>
                    </div>

                    <div class="info_td">
                      <div class="info_title">类型：</div>
                      <div class="info_msg">
                        <span v-for="(item, index) in detail.genres" :key="index">
                          {{item}}
                          {{index == (detail.genres.length -1)?'':' / '}}
                        </span>
                      </div>
                    </div>

                    <div class="info_td">
                      <div class="info_title">制片国家/地区：</div>
                      <div class="info_msg">
                        <span v-for="(item, index) in detail.countries" :key="index">
                          {{item}}
                          {{index == (detail.countries.length -1)?'':' / '}}
                        </span>
                      </div>
                    </div>

                    <div class="info_td">
                      <div class="info_title">别名：</div>
                      <div class="info_msg">{{detail.aka}}</div>
                    </div>
                  </div>
                </div>
                <div class="grade">
                  <div class="grade_title">豆瓣评分</div>
                  <div class="rate">
                    <div class="rate_num">{{detail.rating.average}}</div>
                    <div class="rate_box">
                      <ElRate :value="detail.rating.average/2" allow-half disabled></ElRate>
                      <p class="mouse">
                        <span>{{detail.ratings_count}}</span>人评价
                      </p>
                    </div>
                  </div>
                  <div class="rate_detail">
                    <div class="rate_detail_item" v-for="(i,index) in 5" :key="index">
                      <span class="level">{{6-i}}星</span>
                      <span class="rate_line" :style="{width:rating[6-i].width+'px'}"></span>
                      <span class="rate_per">{{rating[6-i].pct}}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="movie_cont">
                <div class="cont_title">{{detail.title}}的剧情简介······</div>
                <span class="movie_intro" v-html="detail.summary"></span>
                <span class="douban_moive">
                  <a href="http://help.douban.com/movie?app=movie#t0-qs">©豆瓣</a>
                </span>
                <div class="cont_title">{{detail.title}}的演职员······(全部{{detail.casts.length}}人)</div>
                <div class="casts_list">
                  <!-- 导演 -->
                  <div class="casts_item" v-for="item in detail.directors" :key="item.id">
                    <router-link :to="{name:'celebrity_detail',query:{id:item.id}}">
                      <img :src="item.avatars.medium" alt :data-id="item.id" />
                      <p>{{item.name}}</p>
                    </router-link>
                  </div>
                  <div
                    class="casts_item"
                    v-for="item in detail.casts.slice(0,5)"
                    :key="item.id"
                    :data-id="item.id"
                  >
                    <router-link :to="{name:'celebrity_detail',query:{id:item.id}}">
                      <img :src="item.avatars.medium" alt />
                      <p>{{item.name}}</p>
                    </router-link>
                  </div>
                </div>
                <div class="cont_title">
                  {{detail.title}}的图片······(
                  <a :href="detail_photo[0].album_url">图片{{photo_cont}}</a>)
                </div>
                <div class="photo_list">
                  <div
                    class="photo_item"
                    v-for="(item,index) in detail_photo.slice(0,6)"
                    :key="index"
                  >
                    <a :href="item.alt">
                      <img :src="item.cover" alt />
                    </a>
                  </div>
                </div>
                <div class="cont_title">{{detail.title}}的影评······(</div>
                <div class="reviews_list">
                  <div class="item" v-for="(i,index) in reviews" :key="i.id">
                    <div class="head">
                      <a :href="i.author.alt" target="_block">
                        <img class="mouse" :src="i.author.avatar" alt />
                      </a>
                      <a :href="i.author.alt" target="_block">
                        <div class="name mouse">{{i.author.name}}</div>
                      </a>
                      <div class="time">{{i.updated_at}}</div>
                    </div>
                    <div class="title mouse">
                      <a :href="i.alt" target="_block">{{i.title}}</a>
                    </div>
                    <div class="cont">
                      {{i.cont}}
                      <span class="mouse" @click="unfold(index)">(展开)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="loading" v-else>
              <img src="../assets/loading1.svg" alt />
            </div>
          </el-col>
          <el-col :span="4" :md="4" :lg="4" :sm="6">
            <div class="recommend">
              <div class="title">为您推荐</div>
              <div class="recommend_cont">
                <div class="item" v-for="(item,index) in recommend" :key="index">
                  <router-link
                    :to="{name: 'move_detail', query:{movie_id: item.subject.id}}"
                    v-if="index<3"
                  >
                    <img :src="item.subject.images.medium" alt />
                    <p>{{item.subject.title}}</p>
                  </router-link>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </ElCol>
    </el-row>
  </div>
</template>

<script>
import comment_js from "./module/comment";

export default {
  name: "move_detail",
  data() {
    return {
      id: null,
      detail: {},
      detail_photo: {},
      photo_cont: "",
      rating: {},
      reviews: {},
      recommend: {},
      reload: false
    };
  },
  created() {
    var that = this;
    var id = that.$route.query.movie_id;
    if (that.$route.query.movie_id) {
      that.$set(that, "id", id);
      console.log("===========");
      that.load_data();
    }
  },
  computed: {
    get_uid() {
      return this.$store.state.uid;
    }
  },
  watch: {
    $route: function() {
      this.$set(this, "id", this.$route.query.movie_id);
      this.$set(this,'reload',false)
      this.load_data();
    }
  },
  methods: {
    extract_local: function(data) {
      return eval("(" + data + ")");
    },

    load_data: function() {
      console.log("ss");
      var that = this;

      console.log(
        typeof localStorage.movie_detail_photo != "undefined" &&
          (typeof localStorage.movie_detail_photo != "null") === false
      );
      if (
        typeof localStorage.movie_detail_photo != "undefined" &&
        (typeof localStorage.movie_detail_photo != "null") === false
      ) {
        that.$set(
          that,
          "photo_cont",
          that.extract_local(localStorage.movie_detail_photo_cont)
        );
        that.$set(
          that,
          "reviews",
          that.extract_local(localStorage.movie_datail_reviews)
        );
        that.$set(
          that,
          "recommend",
          that.extract_local(localStorage.recommend)
        );
        that.fill_data(
          that.extract_local(localStorage.movie_detail),
          that.extract_local(localStorage.movie_detail_photo)
        );
      } else {
        console.log("123");
        function ax1() {
          return that.axios.get("/api/movie/subject/" + that.id);
        }
        function ax2() {
          return that.axios.get(
            "/api/movie/subject/" + that.id + "/photos" + comment_js.url_apikey
          );
        }
        function ax3() {
          return that.axios.get(
            "/api/movie/subject/" + that.id + "/reviews" + comment_js.url_apikey
          );
        }

        function recommend() {
          return that.axios.get("/api/movie/weekly" + comment_js.url_apikey);
        }

        that.axios
          .all([ax2(), ax3(), recommend()])
          .then(
            that.axios.spread(function(res1, res2, res3) {
              console.log(res3);
              res2.data.reviews.forEach(element => {
                element.cont = element.summary;
              });
              console.log(that);
              that.fill_data(res1.data.subject, res1.data.photos);
              that.$set(that, "photo_cont", res1.data.total);
              that.$set(that, "reviews", res2.data.reviews);
              that.$set(that, "recommend", res3.data.subjects);
              // that.$set(that, "recommend", res3.data)
              localStorage.movie_detail_photo_cont = JSON.stringify(
                res1.data.total
              );
              localStorage.movie_datail_reviews = JSON.stringify(
                res2.data.reviews
              );
              localStorage.recommend = JSON.stringify(res3.data.subjects);
            })
          )
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    fill_data: function(data, data_photo) {
      var that = this;
      if (typeof data.aka == "array") {
        data.aka = data.aka.join("/");
      }
      data.summary = "&emsp;&emsp;" + data.summary;
      data.summary = data.summary.replace(/\n/g, "<br/>&emsp;&emsp;");
      data.summary = data.summary.replace(/©豆瓣/g, "");
      var rat_detail = data.rating.details;
      var rat_sum = 0;
      var rating = {};
      for (var i in rat_detail) {
        rat_sum += parseInt(rat_detail[i]);
        rating[i] = {};
        rating[i].score = rat_detail[i];
      }
      for (var i in rating) {
        rating[i].pct = ((rating[i].score / rat_sum) * 100).toFixed(2);
        if (rating[i].pct > 40) {
          rating[i].width = "64";
        } else {
          rating[i].width = Math.round((64 * rating[i].pct) / 100);
        }
      }

      localStorage.movie_detail = JSON.stringify(data);
      that.$set(that, "detail", data);
      that.$set(that, "detail_photo", data_photo);
      that.$set(that, "rating", rating);
      localStorage.movie_detail_photo = JSON.stringify(data_photo);
       this.$set(this,'reload',false)
    },

    unfold: function(index) {
      console.log(index);
      this.reviews[index].cont = this.reviews[index].content;
      this.$set(this.reviews, index, this.reviews[index]);
    }
  },
  updated(){
    setTimeout(()=> {
        this.$set(this,'reload',true)
    },1000)
  }
};
</script>
<style lang="scss" scoped>
  @import "./css/move_detail.scss";
</style>
 