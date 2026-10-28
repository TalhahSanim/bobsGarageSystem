//checks the token in x-auth-token header
// when valid puts the user from the token on req.user and calls next()
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Auth middleware ->  takes in req,res, and next [All middleware requires next]
export default function auth(req, res, next) {
  // get the token from header which setAuthToekn on client adds it
  const token = req.header("x-auth-token");
  console.log(`Token in middleware: ${token}`);
  // no token : not logged equates to 401- UNAUTHORIZED
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization is denied" });
  }

  try {
    // Check the signature and decode the payload. Throws if tampered or expired
    console.log("Decoding token....");
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    // Every route after this knows who is asking
    req.user = decoded.user;
    //  Pass the control onto the next middleware or route
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Token not valid" });
  }
}
