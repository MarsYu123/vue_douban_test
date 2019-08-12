<template>
  <div class="head_mode">
    <el-tag v-if="guest_name">欢迎您{{guest_name}}</el-tag>
    <ElRow type="flex" justify="center">
      <ElCol :span="16" :xs="16" :md="16">
        <ElCol :span="18" :xs="18" :md="16">
       
            <el-row class="nav_head"  type="flex" justify="start">
              <img
                src="https://img3.doubanio.com/dae/accounts/resources/0246c88/movie/assets/lg_movie_a12_2.png"
                @click="go_home"
              >
              <el-input
                class="head_input"
                v-model="nav_select"
                placeholder="搜索您感兴趣的电影"
                @keyup.enter.native="select_all"
              >
                <el-button slot="append" icon="el-icon-search" @click="select_all"></el-button>
              </el-input>
            </el-row>
        

          <!-- 导航 -->
          <el-row type="flex" justify="start" class="nav_link">
            <el-menu
              :default-active="this.$route.path"
              router
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :span="24"
            >
              <el-menu-item
                :index="item.path"
                v-for="(item, i) in navlist"
                :key="i"
              >{{ item.item_name }}</el-menu-item>
            </el-menu>
          </el-row>

          <div class="line"></div>
        </ElCol>
      </ElCol>
    </ElRow>
  </div>
</template>
<script>
export default {
  name: "headerMod",
  data() {
    return {
      navlist: [
        { path: "/", item_name: "首页" },
        { path: "/top", item_name: "排行榜" },
        { path: "/filmReview", item_name: "影评" },
        { path: "/tv", item_name: "电视剧" },
        { path: "/classify", item_name: "分类" }
      ],
      nav_select: "", //搜索框val
      uid: ''
    };
  },
  computed:{
    guest_name(){
      var name = this.$store.state.guest_name;
      var show_guest = false
      if(name != ''){
        show_guest = name
      }

      return show_guest
    }
  },

  methods: {
    /* 回到首页 */
    go_home: function() {
      this.$router.push({ name: "index" });
    },

    /* 导航栏点击*/
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    /* 全局搜索 */
    select_all: function() {
      var that = this;
      // 打开新页面
      const { href } = that.$router.resolve({
        name: "searchResults",
        query: { select: that.nav_select }
      });
      window.open(href, "_blank");
    },
    set_uid(){
      var id = this.uid;
      
      var that = this;
      that.axios.post('http://127.0.0.1:8001/data')
      .then(function (res) {
        console.log(res)
      })

      this.$store.commit('set_uid',id)
    }
  },
  /* 页面渲染完毕钩子 */
  mounted() {
    console.log(this.uid)
  }
};
</script>
<style>
.nav_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.nav_link{
  margin-bottom: 30px;
}
.nav_head .head_input {
  max-width: 65%;
}
</style>
