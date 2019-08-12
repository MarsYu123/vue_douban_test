<template>
  <div class="guest">
    <div class="mb"></div>
    <div class="guest_box">
      <div class="title">初次来到网站，请留下您的访客姓名吧</div>
      <div class="guest_cont">
        <ElInput v-model="name" placeholder="留下您的名称"></ElInput>

        <div class="button_box">
          <el-popover
            placement="bottom"
            title="标题"
            width="200"
            trigger="manual"
            :content="name_state.content"
            v-model="name_state.state"
          >
            <ElButton slot="reference" type="primary" @click="submit_guest">确认</ElButton>
          </el-popover>
          <ElButton type="info" @click="close" style="margin-left:30px">先逛逛</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guest_check",
  data() {
    return {
      name: "",
      name_state: {}
    };
  },

  // 输入名称并存档
  methods: {
    submit_guest() {
      var that = this;
      var name = this.name;
      var verify_state = this.verify_name(this.name);
      var state;
      if (verify_state == "") {
        state = {
          state: true,
          content: "请填写名称"
        };
      } else if (verify_state == "is_null") {
        state = {
          state: true,
          content: "请勿输出空格"
        };
      } else if (verify_state == "is_illegal") {
        state = {
          state: true,
          content: "请勿输入非法字符"
        };
      } else {
        state = {
          state: false,
          content: ""
        };
      }
      that.$set(that, "name_state", state);
      this.$store.commit("set_guest", this.name);
      this.$emit("guest_done", true);
    },
    
    close(){
        this.$emit("guest_done", 'close');
    }
  }
};
</script>

<style lang="scss">
.guest {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  .mb {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .guest_box {
    width: 500px;
    border-radius: 6px;
    box-shadow: 0, 0, 10px, 5px, rgba(224, 224, 224, 0.671);
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 60px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
    }
    input {
      margin-bottom: 40px;
    }
  }
}
</style>
