<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <panel title="Login">
        <div class="pl-r pr-4 pt-2 pb-2">
          <v-text-field
            label="email"
            v-model="email"
          >
          </v-text-field>
          <v-text-field
            label="password"
            v-model="password"
          >
          </v-text-field>
          <br>
          <div class="danger-alert" v-if="error">
            <p class="danger-alert">Error is here: {{ error }}</p>

          </div>
          <hr>
          <div v-if="error !== null">
            <p class="danger-alert">Error second usage of v-if: {{ error }}</p>
          </div>
          <v-btn
            class="cyan"
            @click="login"
          >
            Login
          </v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      ...mapActions({
        setToken: 'setToken',
        setUser: 'setUser'
      }),
      async login() {
        // The await operator is used to wait for a Promise. It can only be used inside an async function.
        try {
           const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          });
          this.setToken(response.data.token)
          this.setUser(response.data.user)
          this.$router.push({ name: 'songs' })
          // console.log('response', response.data);
        } catch (err) {
          console.log('err obj ',err)
          // console.log('err obj.respon ',err.response)
          // console.log('err obj.response.data ', err.response.data)
          this.error = err.response.data.error;
        }
      }
    }
  }
</script>

<style scoped>

</style>