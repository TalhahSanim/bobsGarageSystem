import helmet from "helmet";
// Bring in sequelize and our db from our models folder
// we do not need to include a file name with the folder,
// as it will automaticaly load in models.js
import "dotenv/config";
import db from "./models/models.js";
import express from "express"; // bring in express and required mmodules
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
// intialise express app variable

const app = express();

// Security headers -> cross origin enables client port 5174 to display images from uploads on port 3000
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Intialise Middleware
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
// can be post,get,put,delete
// rember the route takes a path and callback function
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

// 500 -> any error produced in a route ends up hera nd catches error in async routes as well
// it takes in four paremeters so express knows the error handler
app.use((err, req, res, next) => {
  // log details but never to browser
  console.error(err.message);
  //  Mullters size limit such as too big image user sends so 404 would be more appropriate then 500
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ msg: "Images must be 2 MB or smaller" });
  }
  // few eerors have own statues such as 400 badly formed json & request aborted  406 and this makes any without an status a 500
  const status = err.status || 500;
  res
    .status(status)
    .json({ msg: status === 500 ? "Server Error" : err.message });
});

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
