// this file will hold database models
// it will allow the server to create tables in the database if they do not exist
// database must exist before table creation

// import the sequelize package
// this is an ORM package (Object-Relational Mapping)
// it will allows us to use functions to call the SQL for talking to the database
// using parameterised queries

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

// export variables
export default db;
// to allow database operations (like, and or others)
export const Op = Sequelize.Op;
