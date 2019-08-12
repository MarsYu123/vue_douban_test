<template>
  <div id="app">
    <div class="app_content">
      <header-mod></header-mod>
      <router-view></router-view>
    </div>
    <guestCheck v-if="guest_show" @guest_done="guest_is_show" />
  </div>
</template>

<script>
import headerMod from "./components/header";
import guestCheck from "./components/module/guest";

export default {
  name: "app",
  data() {
    return {
      guest_show: true
    };
  },
  components: {
    headerMod,
    guestCheck
  },
  watch: {

  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      console.log(to);
      next(()=>{
        if (this.$store.state.guest_name == "") {
        this.$set(this, "guest_show", true);
      }
      });
    });
  },
  methods: {
    // 是否显示录入信息
    guest_is_show: function(state) {
      if (state) {
        this.$set(this, "guest_show", false);
      }
    },
    router_state: function() {
      console.log(this.$router);
      console.log("====", this.$store.state.guest_name);
    }
  }
};
</script>

<style>
.top_home {
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.app_content {
  box-sizing: border-box;
  padding: 60px 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
</style>