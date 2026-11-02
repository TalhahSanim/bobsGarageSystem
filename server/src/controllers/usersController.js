// Users controllers [ADMIN]-> getALL, add,edit,delete
// user routes add auth and admin in front for everyone

import db from "../models/models.js";

const { User } = db.sequelize.models;

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
  const { firstName, lastName, email, image, isAdmin } = req.body;

  await User.update(
    { firstName, lastName, email, image, isAdmin },
    { where: { userId: id } },
  );
  // update() only returns count so get the saved user to send back
  const user = await User.findByPk(id, noPassword);
  res.status(200).send(user);
};

// name -> delete user
// path -> /api/users/edit/:id
// request -> Delete
// type ->  admin
export const deleteUser = async (req, res) => {
  console.log("/api/users/edit/:id -> DELETE");
  const id = Number(req.params.id);
  await User.destroy({ where: { userId: id } });
  res.status(204).send();
};
