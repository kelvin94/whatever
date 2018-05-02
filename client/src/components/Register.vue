<template>
  <div>
    <h1>Register component</h1>
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
    <button 
      @click="register"
    >
      Register
    </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: { 
      async register() {
        // The await operator is used to wait for a Promise. It can only be used inside an async function.
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        console.log('response', response.data);
      }
    }
  }
</script>

<style scoped>

</style>