<template>
  <div class="index_roll" ref="index_roll">
    <div class="title_hot">
      <div class="title_left">
        <p class="chapter">正在热映 当前切换到{{hot_active}}</p>
        <p class="all_hot">
          全部正在热映
          <span>>></span>
        </p>
        <p class="wait_movie">即将上映</p>
      </div>

      <div class="roll_nav">
        <span class="nav_num">{{ roll_style.index + 1 }}/3</span>
        <p class="roll_control">
          <span @click="roll_nav('prev')"></span>
          <span @click="roll_nav('next')"></span>
        </p>
      </div>
    </div>

    <div class="roll" :style="{height: roll_style.box_height+'px'}">
      <div
        class="roll_box"
        :class="roll_style.transition"
        :style="{ left: roll_style.left + 'px' }"
        @mouseleave="roll_auto()"
        @mousemove="carousel"
        ref="roll_box"
      >
        <div
          class="roll_item"
          v-for="item in roll_list"
          :key="item.dataId"
          :style="{ width: roll_style.img_w + 'px' }"
        >
          <router-link :to="{ name: 'move_detail', query: { movie_id: item.id } }">
            <img
              :src="item.images.medium"
              :alt="item.title"
              :style="{height:roll_style.img_height+'px'}"
            />
            <p class="title">{{item.title}}</p>
            <el-rate
              :value="item.rating.average/2"
              disabled
              allow-half
              text-color="#ff9900"
              show-score
              score-template="{value}"
            ></el-rate>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comment from "./comment";
export default {
  props: ["now_hot_active"],
  data() {
    return {
      roll_data: {},
      roll_list: {},
      roll_style: {
        img_w: 0,
        left: 0,
        transition: "none",
        index: 0,
        length: 0,
        click_date: 0,
        timeOut: {},
        _async: true,
        box_height: "",
        img_height: ""
      },
      timeOut: {},
      is_roll_auto: false,
      hot_active: this.now_hot_active
    };
  },
  mounted() {
    var that = this;
    var local_data = {};
    if (localStorage.roll_data != undefined) {
      local_data = eval("(" + localStorage.roll_data + ")");
      fill_data(local_data);
    } else {
      that.axios
        .get("/api/movie/in_theaters" + comment.url_apikey, {
          params: {
            start: 0,
            count: 15
          }
        })
        .then(function(e) {
          fill_data(e);
        })
        .catch(function(e) {});
    }

    // 获取数据后组装轮播图
    function fill_data(e) {
      var new_data = JSON.parse(JSON.stringify(e.data.subjects));
      var _length = new_data.length / 5;
      var new_index = 5; //每页数量
      for (var i in e.data.subjects) {
        //将第一页和最后一页复制达到无缝轮播
        if (new_index > 0) {
          new_data.unshift(
            e.data.subjects[e.data.subjects.length - parseInt(i) - 1]
          );
          new_data.push(e.data.subjects[i]);
          new_index--;
        } else {
          break;
        }
      }

      for (var i in new_data) {
        //添加唯一key值
        new_data[i].dataId = "new_" + i + 1;
      }
      that.$set(that, "roll_data", e);
      that.$set(that, "roll_list", new_data);
      localStorage.roll_data = JSON.stringify(e); //加入缓存，由于api接口有请求限制
      var roll_width = that.$refs.index_roll.offsetWidth; //获取轮播窗口宽度
      var img_w = (roll_width - 4 * 15) / 5; //设置每个图片宽度
      var img_l = -(roll_width + 15);
      var img_h = img_w / 0.716;
      var index_data = that.roll_style;
      index_data.left = img_l;
      index_data.img_w = img_w;
      index_data.roll_width = roll_width;
      index_data._length = _length;
      index_data.img_height = img_h;
      that.$set(that, "roll_style", index_data);
      // 是否开启自动轮播
      that.$set(that, "is_roll_auto", true);
      that.roll_auto();
    }
  },

  updated() {
    var height = this.$refs.roll_box.offsetHeight;
    this.$set(this.roll_style, "box_height", height);
  },

  methods: {
    // 自动轮播热点
    roll_auto: function() {
      var that = this;
      var left = Math.abs(that.roll_style.left);
      var roll_w = that.roll_style.roll_width;
      var index = that.roll_style.index;
      var s = 3000;
      var _length = that.roll_style._length;
      if (!that.is_roll_auto) {
        return false;
      }
      function auto_f(length) {
        left += parseInt(roll_w) + 15;
        index++;
        var data = that.roll_style;
        data.index = index;
        data.left = -left;
        if (index < length) {
          data.transition = "";
          that.$set(that, "roll_style", data);
        } else {
          index = 0;
          data.index = index;
          that.$set(that, "roll_style", data);
          // return false
          setTimeout(function() {
            left = roll_w + 15;
            data.transition = "none";
            data.left = -left;
            that.$set(that, "roll_style", data);
          }, 500);
        }
        that.timeOut = setTimeout(function() {
          auto_f(_length);
        }, s);
      }
      that.roll_style.timeOut = setTimeout(auto_f, s, _length);
    },
    carousel: function() {
      var that = this;
      clearTimeout(that.timeOut);
      clearTimeout(that.roll_style.timeOut);
    },
    roll_nav: function(type) {
      var type = type;
      var that = this;
      var left = Math.abs(that.roll_style.left);
      var roll_w = that.roll_style.roll_width;
      var index = that.roll_style.index;
      var _length = parseInt(that.roll_style._length);
      that.carousel();
      if (that.roll_style._async) {
        that.roll_style._async = false;
        setTimeout(function() {
          that.roll_style._async = true;
        }, 500);
        var data = that.roll_style;
        if (type == "prev") {
          if (index > 0) {
            //如果大于0 则每次减去窗口大小并且减去右间距
            left = (roll_w + 15) * index;
            index--;
            data.transition = "";
            data.left = -left;
            data.index = index;
            that.$set(that, "roll_style", data);
          } else {
            //如果小于0 则先回到0 然后切换到倒数第二的位置保证无缝切换
            left = 0;
            index = _length - 1;
            data.transition = "";
            data.left = -left;
            data.index = index;
            that.$set(that, "roll_style", data);
            setTimeout(function() {
              left = roll_w * _length + _length * 15; //减去响应数量的右间距
              data.transition = "none";
              data.left = -left;
              that.$set(that, "roll_style", data);
            }, 500);
          }
        } else {
          if (index == _length - 1) {
            left = left + roll_w + 15;
            index = 0;
            data.transition = "";
            data.left = -left;
            data.index = index;
            that.$set(that, "roll_style", data);
            setTimeout(function() {
              left = roll_w + 15; //减去响应数量的右间距
              data.transition = "none";
              data.left = -left;
              that.$set(that, "roll_style", data);
            }, 500);
          } else {
            index++;
            left = (roll_w + 15) * (index + 1);
            data.transition = "";
            data.left = -left;
            data.index = index;
            that.$set(that, "roll_style", data);
          }
        }
        that.roll_auto();
      }
    }
  },
  computed: {
    up_hot_active: function(){
      this.hot
    }
  },
  watch:{
    now_hot_active:function () {
      this.$set(this,'hot_active',this.now_hot_active)
    }
  }
};
</script>

<style lang="scss">
.roll {
  position: relative;
  height: 230px;
  overflow: hidden;
}
.title_hot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 30px;
  .title_left {
    display: flex;
    align-items: flex-end;
    .chapter {
      margin-right: 10px;
    }
    .all_hot,
    .wait_movie {
      cursor: pointer;
      color: cadetblue;
      margin-right: 10px;
      font-size: 14px;
      &:hover {
        background: cadetblue;
        color: #ffffff;
      }
    }
  }

  .roll_nav {
    display: flex;
    align-items: center;
    .nav_num {
      font-size: 12px;
      margin-right: 15px;
    }
    .roll_control {
      display: flex;
      span {
        display: block;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #37a;
        cursor: pointer;
        position: relative;
        &:first-child {
          margin-right: 5px;
        }
        &:first-child::after {
          content: "";
          display: block;
          position: absolute;
          width: 6px;
          height: 6px;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(135deg) translateY(-50%);
          transform-origin: 50% -1%;
          top: 50%;
          left: 7px;
        }
        &:last-child::after {
          content: "";
          display: block;
          position: absolute;
          width: 6px;
          height: 6px;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(-45deg) translateY(-50%);
          transform-origin: 50% -1%;
          top: 50%;
          left: 5px;
        }
      }
    }
  }
}

.roll_box {
  position: absolute;
  top: 0;
  display: flex;
  transition: all 0.5s;
  &.none {
    transition: none;
  }
  .roll_item {
    flex-grow: 0;
    flex-shrink: 1;
    width: 128px;
    // height: 170px;
    margin-right: 15px;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    &:last-child {
      margin: 0;
    }
    .title {
      margin: 10px 0;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-rate__icon {
      font-size: 12px;
    }
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
