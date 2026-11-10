// File -> client/src/utils/setAuth.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// sends our token to http headers with each axios request

import axios from "axios";

// adds the token to each axios request or remove it when there's no token

const setAuthToken = (token) => {
  // console.log("setAuthToken -> utils");
  if (token) {
    // creates the header x-auth-token -> <token> on each request from now
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // No token logged out stop sending the header through
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
