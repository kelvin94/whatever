// setup a dedicated module for making ajax calls to our backend
// initalize/configure axios instance
import axios from 'axios'
import store from '@/store/store'

export default () => {
  // return an Axios connector, a connector to interact with the backend
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
