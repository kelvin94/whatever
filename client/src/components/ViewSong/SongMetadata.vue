<template>
  <panel title="song metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}   
        </div>
        <router-link :to="{
          name: 'songs-edit',
          params: {
            songId: song.id
          }
        }">
          <v-btn
            dark
            class="cyan"
          >
            Edit
          </v-btn>
        </router-link>
      </v-flex>
      <v-flex xs6>
        <img :src="song.albumImageUrl" class="album-image" alt=""/>
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
  export default {
    props: ['song'],
    components: {
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