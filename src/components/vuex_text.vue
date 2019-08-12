<template>
    <div class="text">
        {{count}}
    </div>
</template>
<script>

export default {
    data(){
        return{
            a:0
        }
    },
    mounted() {
        console.log(this.$store.state.count)
    },
    computed: {
        count(){
            return this.$store.commit('add')
        }
    },
    methods:{

    }
}
</script>

