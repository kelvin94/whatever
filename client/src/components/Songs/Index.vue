<template>
    <v-layout>
      <v-flex xs6>
        <songs-bookmarks />
        <recently-viewed-songs class="mt-2" />
      </v-flex>
      <v-flex xs6 class="ml-2">
        <songs-search-panel />
        <songs-panel class="mt-2"/>
      </v-flex>
    </v-layout>
</template>

<script>
import SongsBookmarks from '@/components/Songs/SongsBookmarks'
import RecentlyViewedSongs from '@/components/Songs/RecentlyViewedSongs'
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
      SongsSearchPanel,
      SongsBookmarks,
      RecentlyViewedSongs
    },
    // async mounted() {
    //   // once Songs component is mounted to the page, do a get request
    //   this.songs = (await SongService.index()).data
    // }
  }
</script>

<style scoped>

</style>