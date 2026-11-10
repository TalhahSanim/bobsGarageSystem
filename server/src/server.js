// File -> server/src/server.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Express Server -> includes security headers, middleware, api routes, 404 and errors handles which then syncs and listens
import helmet from "helmet";
// Bring in our database (models and Sequelize) from models.js
import "dotenv/config";
import db from "./models/models.js";
import express from "express"; // bring in express and required modules
import cors from "cors";
import { morganMiddleware } from "./logger/logger.js";

// load the route files
import servicesRoutes from "./routes/services.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import favouriteRoutes from "./routes/favourites.js";
import preferenceRoutes from "./routes/preferences.js";
import enquiryRoutes from "./routes/enquiries.js";

import config from "./config/config.js";
// initialise express app variable

const app = express();

// Security headers -> cross origin enables client port 5173 to display images from uploads on port 3000
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Initialise Middleware
// Setup the server to handle json data
// setup server to handle urlencoded data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// use cors middleware with all routes
// remember cors is a function
app.use(cors());

// Log each request
app.use(morganMiddleware);

//  use the route

// Routes
// Mount each router under each endpoint
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/enquiries", enquiryRoutes);

// serve files in server uploads -> /uploads
app.use("/uploads", express.static("uploads"));

//  404-> No route matched the request
app.use((req, res) => {
  res.status(404).json({ msg: `Not Found: ${req.method} ${req.originalUrl}` });
});

// 500 -> any error produced in a route ends up here and catches error in async routes as well
// it takes in four parameters so express knows the error handler
app.use((err, req, res, next) => {
  // log details but never to browser
  console.error(err.message);
  //  Multer's size limit  ->  the file is too big, so 400 fits than a 500 error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ msg: "Images Must Be 25MB Or Less" });
  }
  // Some errors already have a status (400 bad JSON, 406 request aborted). Any error without one becomes a 500
  const status = err.status || 500;
  res
    .status(status)
    .json({ msg: status === 500 ? "Server Error" : err.message });
});

// Update the listen so we can sync to our database
// sync() creates any missing tables. It never deletes data but (only sync({force:true})) would

db.sequelize.sync().then(() => {
  app.listen(config.port, () =>
    console.log(
      `Bob's Garage Server is running on http://localhost:${config.port}`,
    ),
  );
});
