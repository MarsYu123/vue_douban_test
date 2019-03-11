<template name="aa">
  <div>
    aaaabbbb{{val_con}}
    <input type="text" v-model="val_con" @keyup.13="send_parent">
  </div>
</template>

<script>
// 暴露一个组件
  export default {
    data() {
      return {
        val_con: 'bdsads'
      }
    },
    // props: ['val_con'],
    methods: {
      send_parent:function (){
        this.$emit("model_send",this.val_con)
      }
    },
  }
</script>