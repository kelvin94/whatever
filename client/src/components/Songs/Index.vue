<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <songs-search-panel/>
        <songs-panel class="mt-2"/>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import SongsSearchPanel from '@/components/Songs/SongsSearchPanel'
import SongsPanel from '@/components/Songs/SongsPanel'
// import SongsPanel from '@/components/Songs/SongsPanel'
// import SongService from '@/services/SongService'
  export default {
    // data() {
    //   return {
    //     songs: null
    //   }
    // },
    components: {
      SongsPanel,
      SongsSearchPanel
    },
    // async mounted() {
    //   // once Songs component is mounted to the page, do a get request
    //   this.songs = (await SongService.index()).data
    // }
  }
</script>

<style scoped>

</style>