<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <panel title="Songs">
          <router-link :to="{ name: 'songs-create' }"  slot="action">
            <v-btn fab medium light absolute right class="cyan accent-2">
              <v-icon>
                add
              </v-icon>
            </v-btn>
          </router-link>
          <div v-for="song in songs" class="song" :key="song.id">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{song.title}}
                </div>
                <div class="song-artist">
                  {{song.artist}}
                </div>
                <div class="song-genre">
                  {{song.album}}   
                </div>
                <router-link to="{ name: 'song', params: {songId: song.id }}">
                  <v-btn
                    dark
                    class="cyan"
                  >
                    Edit
                  </v-btn>
                </router-link>
              </v-flex>

              <v-flex xs6>
                <img :src=song.albumImageUrl alt="" class="album-image">
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
  export default {
    data() {
      return {
        songs: null
      }
    },
    components: {
      Panel
    },
    async mounted() {
      // once Songs component is mounted to the page, do a get request
      this.songs = (await SongService.index()).data
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