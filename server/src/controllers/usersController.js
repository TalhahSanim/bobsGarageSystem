// File -> server/src/controllers/usersController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Users controllers [ADMIN]-> getALL, add,edit,delete
// user routes add auth and admin in front for everyone

import db from "../models/models.js";

const { User } = db.sequelize.models;
// middleware auth ->  must be logged in and admin  must be an admin to be in route and authenticated. validateUser checks the req.body
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { validateUser } from "../utils/validate.js";
// Leave out password from column of every result
const noPassword = { attributes: { exclude: ["password"] } };

/**
 * Gets every user without passwords
 * @route GET /api/users
 * @access Admin
 * @param {object} req - the request and nothing is read from it
 * @param {object} res - sends 200 with the list of users
 */
export const getUsers = async (req, res) => {
  console.log("/api/users -> GET");
  const userList = await User.findAll(noPassword);
  res.status(200).send(userList);
};

/**
 * Adds a user -> customer or admin with a hashed password
 * @route POST /api/users/add
 * @access Admin
 * @param {object} req - req.body has firstName,lastName,email,image,password and isAdmin is checked by validateUser
 * @param {object} res - sends 200 with the new user  and no password or 400 if email is in use
 */

export const addUser = async (req, res) => {
  console.log("/api/users/add -> POST");
  const { firstName, lastName, email, image, password, isAdmin } = req.body;

  // Email is unique within the user table and to provide clear error message
  const exisiting = await User.findOne({ where: { email } });
  if (exisiting) {
    return res.status(400).json({ msg: "Email Is Already In Use" });
  }

  const hashedPassword = await User.prototype.hashPwd(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    image,
    password: hashedPassword,
    isAdmin,
  });
  //  Never send the password hash back even to the admin
  const { password: hashed, ...safeUser } = user.toJSON();
  res.status(200).send(safeUser);
};
/**
 * Updates a user's details and not password
 * @route PUT /api/users/edit/:id
 * @access Admin
 * @param {object} req - req.params.id is the user id , req.body has firstName,lastName,email, image and isAdmin
 * @param {object} res - sends 200 with the updated user no password or 404 if no user has that id
 */

export const updateUser = async (req, res) => {
  console.log("/api/users/edit/:id -> PUT");
  // Typecast because URL params are strings

  const id = Number(req.params.id);
  const user = await User.findByPk(id, noPassword);
  if (!user) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  const { firstName, lastName, email, image, isAdmin } = req.body;

  await user.update(
    { firstName, lastName, email, image, isAdmin },
    { where: { userId: id } },
  );
  // update() only returns count so get the saved user to send back

  res.status(200).send(user);
};

/**
 * Deletes a user
 * @route DELETE /api/users/edit/:id
 * @access Admin
 * @param {object} req - req.params.id is the user id
 * @param {object} res - sends 204 with no body when deleted or 404 if no user has that id
 */
export const deleteUser = async (req, res) => {
  console.log("/api/users/edit/:id -> DELETE");
  const id = Number(req.params.id);
  const deleted = await User.destroy({ where: { userId: id } });
  if (deleted === 0) {
    return res.status(404).json({ msg: "User Not Found" });
  }

  res.status(204).send();
};
