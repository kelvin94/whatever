<template>
  <panel title="song metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          Title: {{song.title}}
        </div>
        <div class="song-artist">
          Artist: {{song.artist}}
        </div>
        <div class="song-genre">
          Genre: {{song.genre}}   
        </div>
        <!-- <router-link :to="{
          name: 'songs-edit',
          params: {
            songId: song.id
          }
        }"> -->
        <!-- 下面这个router link不能像上面那样做是因为songId是props from index.vue, 然而当这个component在mount到Dom的时候props还没传到这个child component所以在console里就会有warning, 下面把params变成function能解决这个问题是因为function不会自动execute -->
        <router-link :to="{
          name: 'songs-edit',
          params() {
            return {
              songId: song.id
            }
          }
        }">
          <v-btn
            dark
            class="cyan"
          >
            Edit
          </v-btn>
        </router-link>
        <v-btn
          dark
          class="cyan"
          v-if="isUserLoggedIn  && !bookmark"
          @click="setBookmark"
        >
          Bookmark
        </v-btn>

        <v-btn
          dark
          class="cyan"
          v-if="isUserLoggedIn && bookmark"
          @click="unsetBookmark"
        >
          Unbookmark
        </v-btn>

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
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

  export default {
    props: ['song'],
    data() {
      return {
        bookmark: null
      }
    },
    components: {
    },
    computed: {
      ...mapState({
        isUserLoggedIn: 'isUserLoggedIn',
        user: 'user'
      })
    },
    methods: {
      async setBookmark() {
        try {
          this.bookmark = (await BookmarksService.post({
            songId: this.song.id,
            userId: this.user.id
          })).data
        } catch (error) {
          console.log('bookmark err')
        }
      },
      async unsetBookmark() {
        try {
          console.log(this.bookmark)
          await BookmarksService.delete(this.bookmark.id)
          this.bookmark = null
        } catch (error) {
          console.log('unbookmark failed')
        }
      }
    },
    watch: {
      async song () {
        if(!this.isUserLoggedIn) {
          return
        }
        try {
          const bookmarks = (await BookmarksService.index({
            songId: this.song.id,
            userId: this.user.id
          })).data
          if(bookmarks.length) {
            this.bookmark = bookmarks[0]
          }
        } catch (error) {
          console.log('error when getting bookmarks in mounted hook')
        }
      }
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