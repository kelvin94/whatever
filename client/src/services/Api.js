// setup a dedicated module for making ajax calls to our backend
import axios from 'axios';

export default () => {
  // return an Axios connector, a connector to interact with the backend
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
