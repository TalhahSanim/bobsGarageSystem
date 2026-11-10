// File -> server/src/models/models.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// this file will hold database models
// it will allow the server to create tables in the database if they do not exist
// database must exist before table creation

// import the sequelize package
// this is an ORM package (Object-Relational Mapping)
// it will allows us to use functions to call the SQL for talking to the database
// using parameterized queries

// Bring in JWT & bcrypt from the Users model's functions
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Sequelize, DataTypes } from "sequelize";

// bring in the config file
import config from "../config/config.js";

// create the db object
let db = {};
//don't log this on production as it will leak your configuration which is security risk
// console.log(config.db.options);

// Create new Sequelize object and pass in our database details
// this will initialize our database with options  we specified in our config

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
);

// Set up models -> Service,User,Preference,Favourite,Enquiry
// The define method tells sequelize we are creating a database model
// Sequelize will makes model a plural for table such as Enquiry turns into Enquiries
// DataTypes let the database know what type of data we need for each field  in our table

export const Service = sequelize.define("Service", {
  // this is our primary key.
  // use autoIncrement so the database adds it it
  // we do not need to pass value when creating new services
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
// this will allow us to use the sequelize class
db.Sequelize = Sequelize;

//  Preference  -> one row of display settings per user which is one to one with users
const Preference = sequelize.define("Preference", {
  preferenceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Only these themes are allowed and they have same names the theme toggle uses
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "light",
    validate: { isIn: [["light", "dark"]] },
  },
  fontSize: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "medium",
    validate: { isIn: [["small", "medium", "large"]] },
  },
  // How user likes the service list sorted
  sortOrder: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "default",
    validate: {
      isIn: [["default", "fee-ASC", "fee-DESC", "name-ASC", "name-DESC"]],
    },
  },
});

// Favourite -> junction table which links users and services which is a many to many relationship
// Each row means this user favourited this service
const Favourite = sequelize.define(
  "Favourite",
  {
    // Primary Key
    favouriteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //  new -> not contacted yet  and contacted means business have been in touch
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "new",
      validate: { isIn: [["new", "contacted"]] },
    },
  },
  {
    // A user can only favourite the same service once
    indexes: [{ unique: true, fields: ["userId", "serviceId"] }],
  },
);

// Enquiry which is customers question about a specific service and contains the businesses reply
const Enquiry = sequelize.define("Enquiry", {
  // Primary key
  enquiryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Business question -> required with reasonable text length for their message
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [10, 1000] },
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: { len: [1, 1000] },
  },
  // pending means the customer is waiting for business response and responded means business made a response
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: { isIn: [["pending", "responded"]] },
  },
  // Date business replied
  repliedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Did the customer see reply
  readByUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Relationships or Associations
// One user has one Preference row and the foreign key of userId goes into Preferences
User.hasOne(Preference, {
  foreignKey: { name: "userId", allowNull: false, unique: true },
  onDelete: "CASCADE",
});
Preference.belongsTo(User, { foreignKey: "userId" });

// Users <--> Services is many to many through Favourites
// Each side has many Favourite rows and each Favourite  to one of each
User.hasMany(Favourite, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Favourite.belongsTo(User, { foreignKey: "userId" });

Service.hasMany(Favourite, {
  foreignKey: { name: "serviceId", allowNull: false },
  onDelete: "CASCADE",
});
Favourite.belongsTo(Service, { foreignKey: "serviceId" });

// Both Users and services have many enquiries so each enquiry belongs to one of each of them
User.hasMany(Enquiry, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

Enquiry.belongsTo(User, { foreignKey: "userId" });

Service.hasMany(Enquiry, {
  foreignKey: { name: "serviceId", allowNull: false },
  onDelete: "CASCADE",
});

Enquiry.belongsTo(Service, { foreignKey: "serviceId" });
// Database functions -> ModelName.prototype.functionName = function({...})
// Sign a token and it takes in the payload , returns the token and expires in 7 days
User.prototype.signToken = function (payload) {
  // console.log("Signing token...."); // Output token being signed
  // without callback, jwt.sign returns the token straight away
  return jwt.sign(payload, config.auth.jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS512",
  });
};

// Hash a password and it takes in plain-text password and returns it hashed and salted
User.prototype.hashPwd = async function (password) {
  // console.log("Hashing password...."); // Output password being hashed
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// export variables
export default db;
// to allow database operations (like, and or others)
export const Op = Sequelize.Op;
