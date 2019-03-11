<template>
  <div id="app">
    <header-mod></header-mod>
    <router-view></router-view>
  </div>
</template>

<script>

import headerMod from './components/header'

export default {
  name: 'app',
  components: {
    headerMod
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>