<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>
            Register
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-r pr-4 pt-2 pb-2">
          <input
            type="email"
            name="email"
            placeholder="email"
            v-model="email"
          >
          <input
            type="password"
            name="password"
            placeholder="password"
            v-model="password"
          >
          <br>
          <div v-if="error">
            <p>Error is here: {{ error }}</p>

          </div>
          <hr>
          <div v-if="error !== null">
            <p>Error second usage of v-if: {{ error }}</p>
          </div>
          <v-btn
            class="cyan"
            @click="register"
          >
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: { 
      async register() {
        // The await operator is used to wait for a Promise. It can only be used inside an async function.
        try {
           await AuthenticationService.register({
            email: this.email,
            password: this.password
          });
          // console.log('response', response.data);
        } catch (err) {
          console.log('err obj ',err)
          console.log('err obj.respon ',err.response)
          console.log('err obj.response.data ', err.response.data)
          this.error = err.response.data.error;
        }
      }
    }
  }
</script>

<style scoped>

</style>