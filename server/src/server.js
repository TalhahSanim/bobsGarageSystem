// Bring in sequelize and our db from our models folder
// we do not need to include a file name with the folder,
// as it will automaticaly load in models.js
import "dotenv/config";
import db from "./models/models.js";

import express from "express"; // bring in express and required mmodules
import cors from "cors";
// bring in bcrypt  which hashes and salts password and compare them upon login
import bcrypt from "bcrypt";

// bring in jsonwebtoken which creates the token we send back after login and register
import jwt from "jsonwebtoken";

// load the route files
import servicesRoutes from "./routes/services.js";
import authRoutes from "./routes/auth.js";

import config from "./config/config.js";
// intialise express app variable

// Descructure the models from our db so we use them in our routes
const { Service, User } = db.sequelize.models;
const app = express();

// Intialise Middleware
// Setup the server to handle json data
// setup server to handle urlencoded data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// use cors middleware with all routes
// remember cors is a function
app.use(cors());

//  use the route

// Routes
// can be post,get,put,delete
// rember the route takes a path and callback function
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);

// Update the listen so we can sync to our database
// we use the sync() method
// we need to careful here as this method can delete all data in the database

db.sequelize.sync().then(() => {
  app.listen(config.port, () =>
    console.log(
      `Bob's Garage Server is running on http://localhost:${config.port}`,
    ),
  );
});
