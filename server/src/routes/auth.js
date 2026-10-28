// Routes for authentication:
// Login -> POST /api/auth/login, public -> checks the details and sends a token
// Register -> POST /api/auth/register, public-> saves a user and sends a token
// loadUser -> GET /api/auth, private -_> send the loggedin user

import express from "express";
import bcrypt from "bcrypt";
import db from "../models/models.js";
import auth from "../middleware/auth.js";

// express router
const router = express.Router();
// pull out the User model
const { User } = db.sequelize.models;

// Build the token payload from a user and never put password here
const makePayload = (user) => ({
  user: {
    userId: user.userId,
    firstName: user.firstName,
    email: user.email,
    isAdmin: user.isAdmin,
  },
});

// Auth Routes
// Name -> Register
// path -> /api/auth/register
// request -> POST
// type -> PUBLIC
// Description -> Saves a new user with a hashed password and then sends back a token
router.post("/register", async (req, res) => {
  console.log("/api/auth/register -> POST");
  // Destructure req.body. NOT isAdmin as user never have capcity make themselves admin
  const { firstName, lastName, email, image, password } = req.body;
  try {
    //  First: does the user with this email already exist?
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(400)
        .json({ msg: "Error occured while registering this user" });
    }
    //  Hash the password then save new user
    const hashedPassword = await User.prototype.hashPwd(password);
    const userRes = await User.create({
      firstName,
      lastName,
      email,
      image,
      password: hashedPassword,
    });
    // Registering logs you in right away
    const token = User.prototype.signToken(makePayload(userRes));
    res.status(200).json({ token });
  } catch (err) {
    // Fail gracefully-> database error sends a 500 instead of crashing
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ! Login Route
// Name -> Login
// path -> /api/auth/login
// request -> POST
// Type -> Public
// Description -> Checks the email and password , then sends back a token
router.post("/login", async (req, res) => {
  console.log("/api/auth/login -> POST");
  // Destruture req.body
  const { email, password } = req.body;
  try {
    // is user in the database
    const user = await User.findOne({ where: { email: email } });
    //  Keep the message general like dont tell attackers it exists
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentails" });
    }

    // Does the typed password match the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Sign token with model function
    const token = User.prototype.signToken(makePayload(user));
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// name -> loadUser
// path -> /api/auth
// request-> GET
// type -> private which auth checks token first
// description -> sends back the logged in user without the password
router.get("/", auth, async (req, res) => {
  console.log("/api/auth -> GET");
  try {
    // req.user was set by auth middleware from the token
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

export default router;
