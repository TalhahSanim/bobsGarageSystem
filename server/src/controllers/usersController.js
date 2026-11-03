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

//  name -> Get all users
// path -> /api/users
// request -> GET
// type -> admin
export const getUsers = async (req, res) => {
  console.log("/api/users -> GET");
  const userList = await User.findAll(noPassword);
  res.status(200).send(userList);
};

// name -> add user
// request -> POST
// path -> /api/users/add
// type-> admin
// description -> admin adds user and might make user admin

export const addUser = async (req, res) => {
  console.log("/api/users/add -> POST");
  const { firstName, lastName, email, image, password, isAdmin } = req.body;

  // Email is unique within the user table and to provide clear error message
  const exisiting = await User.findOne({ where: { email } });
  if (exisiting) {
    return res
      .status(400)
      .json({ errors: { email: "Email is already in use" } });
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

// name -> Edit User
// path -> /api/users/edit/:id
// request -> PUT
// type -> admin

export const updateUser = async (req, res) => {
  console.log("/api/users/edit/:id -> PUT");
  // Typecast becayse URL params are strings

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

// name -> delete user
// path -> /api/users/edit/:id
// request -> Delete
// type ->  admin
export const deleteUser = async (req, res) => {
  console.log("/api/users/edit/:id -> DELETE");
  const id = Number(req.params.id);
  const deleted = await User.destroy({ where: { userId: id } });
  if (deleted === 0) {
    return res.status(404).json({ msg: "User Not Found" });
  }

  res.status(204).send();
};
