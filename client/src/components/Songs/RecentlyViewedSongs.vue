// Purpose of this component: make a request to backend to fetch all bookmarks a user has
<template>
  <panel title="recently viewed songs">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="histories"
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
  import SongHistoryService from '@/services/SongHistoryService'
  export default {
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },
    async mounted () {
      if(this.isUserLoggedIn) {
        this.histories = (await SongHistoryService.index()).data
        console.log('this.bookmark', this.histories)
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
        histories:  []
      }
    }
  }
</script>

<style scoped>

</style>