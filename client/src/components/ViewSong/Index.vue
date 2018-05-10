<template>
<div>
  <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>
    <v-flex xs6 class="ml-2">
      <you-tube :youtubeId="song.youtubeId"></you-tube>
    </v-flex>
  </v-layout>

      <v-layout class="mt-2">
        <v-flex xs6>
          <tab :song="song"/>
        </v-flex>
        
        <v-flex xs6 class="ml-2">
          <lyrics :song="song" />
        </v-flex>

      </v-layout>
      
</div>
</template>
 
<script>
import SongService from '@/services/SongService'
import SongMetadata from '@/components/ViewSong/SongMetadata'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
import YouTube from '@/components/ViewSong/YouTube'
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        song: {}
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
        'route'
      ])
    },
    async mounted() {
      // get the song id
      const songId = this.route.params.songId // store has synced with router via vuex-router-sync
      const songFromApi = await SongService.show(songId)
      this.song = songFromApi.data

      if(this.isUserLoggedIn) {
        SongHistoryService.post({
          songId: songId
        })
      }
    },
    components: {
      SongMetadata,
      YouTube,
      Lyrics,
      Tab
    }
  }
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 50%;
  margin: 0 auto;
}

</style>