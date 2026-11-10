// File -> server/src/middleware/auth.js
// Author -> Talhah Sanim
// Application Version -> 1.0

//checks the token in x-auth-token header
// when valid puts the user from the token on req.user and calls next()
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Auth middleware ->  takes in req,res, and next [All middleware requires next]
export default function auth(req, res, next) {
  // get the token from header which setAuthToken on client adds it
  const token = req.header("x-auth-token");
  // Do not log token on production as it security risk of unknown user logging in with someone elses credentials
  // console.log(`Token in middleware: ${token}`);
  // no token : not logged equates to 401- UNAUTHORIZED
  if (!token) {
    return res.status(401).json({ msg: "Please Login First" });
  }

  try {
    // Check the signature and decode the payload. Throws if tampered or expired
    // console.log("Decoding token...."); // output that token is decoding
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    // Every route after this knows who is asking
    req.user = decoded.user;
    //  Pass the control onto the next middleware or route
    next();
  } catch (err) {
    console.log(err.message);
    res
      .status(401)
      .json({ msg: "Your Session Has Expired. Please Log in Again" });
  }
}
