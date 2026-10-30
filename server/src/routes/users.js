// the admin routes for users -> getALL, add,edit, delete
// auth and admin are added to every route
import express from "express";
import db from "../models/models.js";

// secure every route -> MUST be logged (auth) and an admin
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();
const { User } = db.sequelize.models;

// Leave out password from column of every result
const noPassword = { attributes: { exclude: ["password"] } };

//  name -> Get all users
// path -> /api/users
// request -> GET
// type -> admin
router.get("/", auth, admin, async (req, res) => {
  console.log("/api/users -> GET");
  const userList = await User.findAll(noPassword);
  res.status(200).send(userList);
});

// name -> add user
// request -> POST
// path -> /api/users/add
// type-> admin
// description -> admin adds user and might make user admin
router.post("/add", auth, admin, async (req, res) => {
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
});

// name -> Edit User
// path -> /api/users/edit/:id
// request -> PUT
// type -> admin

router.put("/edit/:id", auth, admin, async (req, res) => {
  console.log("/api/users/edit/:id -> PUT");
  // Typecast becayse URL params are strings

  const id = Number(req.params.id);
  const { firstName, lastName, email, image, password, isAdmin } = req.body;
  // a changed password must be hashed again
  const hashedPassword = await User.prototype.hashPwd(password);
  await User.update(
    { firstName, lastName, email, image, password: hashedPassword, isAdmin },
    { where: { userId: id } },
  );
  // update() only returns count so get the saved user to send back
  const user = await User.findByPk(id, noPassword);
  res.status(200).send(user);
});

// name -> delete user
// path -> /api/users/edit/:id
// request -> Delete
// type ->  admin

router.delete("/edit/:id", auth, admin, async (req, res) => {
  console.log("/api/users/edit/:id -> DELETE");
  const id = Number(req.params.id);
  await User.destroy({ where: { userId: id } });
  res.status(204).send();
});

export default router;
