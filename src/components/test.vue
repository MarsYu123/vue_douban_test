<template>
    <div id='b'>
        测试
        {{inp}}
        <input v-model="inp">
        {{add}}
        <!-- <model></model> -->
        <model @model_send="receive_model"></model>
        <div>这是由子元素传输过来的{{msg}}</div>
    </div>
</template>

<script>

import model from '@/components/model'

export default {
    name: 'test',
    data(){
        return {
            msg:'',
            inp:'',
        }
    },
    components:{
        model
    },
    computed: {
        add:e=>{
            console.log(e.inp)
            var num = parseInt(e.inp)+ 1
            return num
        }
    },
    methods: {
        receive_model:function(e){
            // this.$set(this,'msg',e)
            console.log(this.$data)
            this.$data.msg = e
        }
    },
}

</script>
