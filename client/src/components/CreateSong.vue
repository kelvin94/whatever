<template>
  <v-layout>
    <v-flex xs4>

      <panel title="song metadata">
        <v-text-field
              label="title"
              v-model="song.title"
              :rules="[required]"
        >
        </v-text-field>

        <v-text-field
              label="artist"
              v-model="song.artist"
        >
        </v-text-field>

        <v-text-field
              label="genre"
              v-model="song.genre"
        >
        </v-text-field>

        <v-text-field
              label="album"
              v-model="song.album"
        >
        </v-text-field>

        <v-text-field
              label="albumImageUrl"
              v-model="song.albumImageUrl"
        >
        </v-text-field>

        <v-text-field
              label="youtubeId"
              v-model="song.youtubeId"
        >
        </v-text-field>


      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure">
        <v-text-field
          label="lyrics"
          v-model="song.lyrics"
          multi-line
        >
        </v-text-field>

        <v-text-field
          label="tab"
          v-model="song.tab"
          multi-line
        >
        </v-text-field>
      </panel>
      <div class="error" v-if="error">
        {{error}}
      </div>
      <v-btn dark class="cyan" @click="createSong">
        Create song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongServie from '@/services/SongService'
import { mapActions } from 'vuex';
  export default {
    data() {
      return {
          song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImageUrl: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        error: null
      }
    },
    methods: {
      async createSong() {
        const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
        if(!areAllFieldsFilledIn) {
          this.error = 'fill in every field before submit'
          return
        }
        try {
          await SongServie.createSong(this.song);
          this.$router.push({
            name: 'songs'
          })
        } catch (error) {
          console.log('create song error: ', error)
        }
      },
      required (value) {
        return !!value || 'Required.'
      }
    }
  }
</script>

<style scoped>

</style>