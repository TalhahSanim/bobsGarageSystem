// File -> server/src/controllers/authController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

//  Auth Controller -> Register, Login and loadUser
import bcrypt from "bcrypt";
import db from "../models/models.js";

// Pull out user Model
const { User } = db.sequelize.models;

/**
 * Build what goes inside login token without password
 * @param {object} user - the user from the database
 * @returns {object} {user:{user,firstName,email,isAdmin}}
 */
const makePayload = (user) => ({
  user: {
    userId: user.userId,
    firstName: user.firstName,
    email: user.email,
    isAdmin: user.isAdmin,
  },
});

/**
 * Create a customer account and logs them in
 * @route POST /api/auth/register
 * @access Public
 * @param {object} req - req.body has firstName,lastName,email,image and password checked by validateRegister
 * @param {object} res - send 200 with a token and 400 if email already in use or 500 on server error
 */
export const register = async (req, res) => {
  console.log("/api/auth/register -> POST");
  // Destructure req.body. NOT isAdmin as can never make themselves admin
  const { firstName, lastName, email, image, password } = req.body;
  try {
    //  First: does the user with this email already exist?
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(400)
        .json({ msg: "That Email Already Exists. Try Logging In Again" });
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
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * Logs a user in
 * @route POST /api/auth/login
 * @access Public
 * @param {object} req - req.body has email and password checked by validateLogin
 * @param {object} res - sends 200 with a token and 400 if the email or password is wrong or 500 on server error
 */

export const login = async (req, res) => {
  console.log("/api/auth/login -> POST");
  // Destructure req.body
  const { email, password } = req.body;
  try {
    // is user in the database
    const user = await User.findOne({ where: { email: email } });
    //  Keep the message general like don't tell attackers it exists
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email Or Password" });
    }

    // Does the typed password match the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email Or Password" });
    }

    // Sign token with model function
    const token = User.prototype.signToken(makePayload(user));
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * Gets the logged-in user's details without password
 * @route GET /api/auth
 * @access Logged in
 * @param {object} req - req.user is set by auth from the token
 * @param {object} res - sends 200 with the user or 500 on a server error
 */

export const loadUser = async (req, res) => {
  console.log("/api/auth -> GET");
  try {
    // req.user was set by auth middleware from the token
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
