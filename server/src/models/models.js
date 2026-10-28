// this file will hold database models
// it will allow the server to create tables in the database if they do not exist
// database must exist before table creation

// import the sequelize package
// this is an ORM package (Object-Relational Mapping)
// it will allows us to use functions to call the SQL for talking to the database
// using parameterised queries

// Bring in JWT & bcrypt from the Users model's functions
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Sequelize, DataTypes } from "sequelize";

// bring in the confi file
import config from "../config/config.js";

// create the db object
let db = {};
console.log(config.db.options);

// Create new Sequelize object and pass in our database details
// this will initialise our database with options  we specified in our config

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
);

// todo: model placed here
// Set up Services Model and the User Model for Sequelize
// The define method tells sequelize we are creating a database model
// Sequelize will add an 's' to the model name to create the table in the database.
// DataTypes let the database know what type of data wee nee for each field  in our table

export const Service = sequelize.define("Service", {
  // this is our primary key.
  // use autoIncrement so the database adds it it
  // we don not need to pass value when creating new servcies
  serviceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
  fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

const User = sequelize.define("User", {
  // Primary Key
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  image: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Set up access variables
db.sequelize = sequelize;
// this will alow us to use the sequelize class
db.Sequelize = Sequelize;

// Database functions -> ModelName.prototype.functionName = function({...})
// Sign a token and it takes in the payload , returns the token and experies in 7 days
User.prototype.signToken = function (payload) {
  console.log("Signing token....");
  // without callback, jwt.sign returns the token straight away
  return jwt.sign(payload, config.auth.jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS512",
  });
};

// Hash a password and it takes in plain-text password and returns it hashed and salted
User.prototype.hashPwd = async function (password) {
  console.log("Hashing password....");
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// export variables
export default db;
// to allow database operations (like, and or others)
export const Op = Sequelize.Op;
