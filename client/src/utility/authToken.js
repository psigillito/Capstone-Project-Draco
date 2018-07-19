import axios from 'axios';

// set the token for authorization
const setAuthToken = token => {
  if(token) {
    // add token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete the authorization header if token not found
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;