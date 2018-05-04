<template>
  <div>
    <v-toolbar fixed class="cyan">
      <router-link :to="{name: 'root'}">
        <v-toolbar-title class="mr-4">
          tab tracker
        </v-toolbar-title>

      </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="navigateTo({ name: 'songs'})" flat dark>
          browser
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
        <!-- <router-link to="register">
          <v-btn flat dark>
          Sign Up
          </v-btn>
        </router-link> -->
        <!-- 不用router-linkTo的routing的方法 -->
        <v-btn  v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'register'})" flat dark>
          Sign Up
        </v-btn>
        <v-btn  v-if="!$store.state.isUserLoggedIn" @click="navigateTo({ name: 'login'})" flat dark>
          log in
        </v-btn>
        <v-btn  v-if="$store.state.isUserLoggedIn" @click="logout" flat dark>
          log out
        </v-btn>
    </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
  export default {
    methods: {
      ...mapActions({
        commitLogout: 'logout'
      }),
      navigateTo(route) {
        // $route.push will push a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL.
        // 其实router-link-to就系做紧route.push
        this.$router.push(route)
      },
      logout() {
        this.commitLogout();
        this.$router.push({
          name: 'root'
        })
      }
    }
  }
</script>

<style scoped>

</style>