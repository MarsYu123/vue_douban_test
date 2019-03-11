<template>
  <div class="index">
    <indexRoll :parent_roll_data="roll_data"></indexRoll>
  </div>
</template>

<script>
import indexRoll from './module/index_roll'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      roll_data: '123'
    }
  },
  components: {
    indexRoll
  },

  /* 加载完毕 */
  mounted () {

  },

  /* 执行函数 */
  methods: {
    get_hot: function () {

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>