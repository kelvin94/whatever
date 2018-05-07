<template>
  <panel title="youtube">
    {{youtubeId}}
    <youtube 
    :video-id="youtubeId"
    :player-width="500"
    :player-height="400"></youtube>
  </panel>
</template>

<script>

  export default {
    props: ['youtubeId'],
    components: {
    }
  }
</script>

<style scoped>

</style>