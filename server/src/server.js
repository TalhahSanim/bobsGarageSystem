import "dotenv/config";
import express from "express"; // bring in express and required mmodules
import config from "./config/config.js";
// intialise express ap variable

const app = express();

// Intialise Middleware
// Setup the server to handle json data
// setup server to handle urlencoded data

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
// can be post,get,put,delete
// rember the route takes a path and callback function

// Add a New Service
app.post("/api/services/add", (req, res) => {
  // log the path and request
  console.log("/api/services -> POST");
  res.status(200).send("Add New Service, POST");
});

// get All Services
app.get("/api/services", (req, res) => {
  console.log("/api/services/ -> GET");
  res.status(200).send("Get all services, GET");
});

// Get Single Service
app.get("/api/services/edit/:id", (req, res) => {
  console.log("/api/services/edit/:id - GET");
  res.status(200).send("Get single service, GET");
});

//  Edit/update product
app.put("/api/services/edit/:id", (req, res) => {
  console.log("/api/services/edit/:id -> PUT");
  res.status(200).send("Edit service, PUT");
});

// Delete Service
app.delete("/api/services/edit/:id", (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  res.status(200).send("Delete service, DELETE");
});

//  Create Port Variable
const port = process.env.PORT || 3000;

// Listen for requests
app.listen(config.port, () =>
  console.log(`Bob's Garage Server is running on http:localhost:${port}`),
);
