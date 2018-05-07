<template>
  <panel title="search panel">
    <v-text-field
      label="search"
      v-model="search"
    ></v-text-field>
  </panel>
  
</template>

<script>
import _ from 'lodash'
  export default {
    data() {
      return {
        search: ''
      }
    },
    watch: {
      // _.debounce sets a delay in executing the search function
      search: _.debounce(async function (value) { // 'watch' if search data changes
        const route = {
          name: 'songs'
        }
        if (this.search !== '') {
          route.query = {
            search: this.search
          }
        }
        this.$router.push(route)
      }, 700),
      // custom watcher
      '$route.query.search': {
        immediate: true,
        handler (value) {
          this.search = value
        }
      }
    },
    components: {
    }
  }
</script>

<style scoped>

</style>