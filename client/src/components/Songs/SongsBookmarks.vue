// Purpose of this component: make a request to backend to fetch all bookmarks a user has
<template>
  <panel title="songsBookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <!-- "props === bookmarks we have in data" -->
        {{props.item.title}}
      </td>
      <td class="text-xs-right">
        {{props.item.artist}}
      </td>
    </template>
    </v-data-table>
  </panel>
</template>

<script>
  import {mapState} from 'vuex'
  import BookmarksService from '@/services/BookmarksService'
  export default {
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },
    async mounted () {
      if(this.isUserLoggedIn) {
        this.bookmarks = (await BookmarksService.index({
          userId: this.user.id
        })).data
        console.log('this.bookmark', this.bookmarks)
      }
    },
    data() {
      return {
        headers: [
          {
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Artist',
            value: 'artist'
          }
        ],
        pagination: {
          sortBy: 'createdAt',
          descending: true
        },
        bookmarks:  []
      }
    }
  }
</script>

<style scoped>

</style>