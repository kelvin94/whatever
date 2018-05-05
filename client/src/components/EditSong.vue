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
      <v-btn dark class="cyan" @click="save">
        save song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
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
      async save() {
        const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
        if(!areAllFieldsFilledIn) {
          this.error = 'fill in every field before submit'
          return
        }
        const songId = this.$store.state.route.params.songId

        try {
          await SongServie.put(this.song);
          this.$router.push({
            name: 'songs-edit',
            params: {
              songId: songId
            }
          })
        } catch (error) {
          console.log('save song error: ', error)
        }
      },
      required (value) {
        return !!value || 'Required.'
      }
    },
    async mounted() {
        try {
          const songId = this.$store.state.route.params.songId
          this.song = (await SongServie.show(songId)).data
        } catch (error){
          console.log(error)
        }
    },
    components: {
      Panel
    }
  }
</script>

<style scoped>

</style>