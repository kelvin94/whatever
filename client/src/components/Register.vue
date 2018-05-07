<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <panel title="Register">
        <form name="tab-tracker-form" autocomplete="off">
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
        </form>
      </panel>
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