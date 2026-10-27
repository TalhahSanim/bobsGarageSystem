// sends our token to http headers with each axios request

import axios from "axios";

// addt he token to each axios request or remove it when theres no token

const setAuthToken = (token) => {
  console.log("setAuthToken -> utils");
  if (token) {
    // creates the header x-auth-token -> <token> on each requets from now
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // No token logged out stop sending the header through
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
