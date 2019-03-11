<template> </template>

<script>
export default {
  name: 'move_detail',
  data () {
    return {
      id: null
    }
  },
  created () {
    var that = this;
    var id = that.$route.params.movie_id
    if ( id ) {
      that.$set( that, 'id', id )
    }
    console.log( that.axios )

  },
  mounted () {
    var that = this;
    console.log( that.axios )
    that.axios.get( '/api/movie/subject/'+that.id, {
    } ).then( function ( e ) {
      console.log( e )
    } ).catch( function ( e ) {
      console.log( e )
    } )
  }
}
</script>
<style lang="sass">

</style>
