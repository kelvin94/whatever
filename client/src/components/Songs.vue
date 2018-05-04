<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <panel title="Songs">
          <div v-for="song in songs" :key="song.id">
            {{song.title}}
            {{song.artist}} -
            {{song.album}} -
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

</style>