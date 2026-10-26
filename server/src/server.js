// Bring in sequelize and our db from our models folder
// we do not need to include a file name with the folder,
// as it will automaticaly load in models.js
import "dotenv/config";
import db from "./models/models.js";
import express from "express"; // bring in express and required mmodules
import cors from "cors";
import config from "./config/config.js";
// intialise express ap variable

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

// Routes
// can be post,get,put,delete
// rember the route takes a path and callback function

// Add a New Service
app.post("/api/services/add", async (req, res) => {
  // log the path and request
  console.log("/api/services -> POST");
  // we can only have one res.send in an endpoint
  // log the req from client
  console.log(req.body);

  // Destructure the request
  const { name, type, description, image, fee } = req.body;
  // Model.create() saves a row to the Services table
  const service = await Service.create({
    name,
    type,
    description,
    image,
    fee,
  });
  console.log(service.toJSON());
  // send the respons from the database to the client
  res.status(200).send(service);
});

// get All Services
// request: GET
//type : public route
// Description: This route returns all products from the database Services table
app.get("/api/services", async (req, res) => {
  console.log("/api/services/ -> GET");
  // to get all data from a table in the database we use the findAll() method
  // the model used too tells us the database which tale where getting the data from
  const list = await Service.findAll();
  console.log(list);
  // send the response
  res.status(200).send(list);
});

// Get Single Service
app.get("/api/services/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id - GET");
  // get the id  from params and typecast to a number
  let id = req.params.id;
  id = Number(id);
  console.log(id);
  // to get service by id we use the findByPk() method dind by primary key
  const service = await Service.findByPk(id);
  console.log(service);
  res.status(200).send(service);
});

//  Edit/update service
app.put("/api/services/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id -> PUT");
  // get the id from params and typecast it to a number
  let id = req.params.id;
  id = Number(id);
  console.log(id);
  // Destructure the req.body
  const { name, type, description, image } = req.body;
  // fee comes in as a string so typecast it as well
  let fee = Number(req.body.fee);
  // the update method takes in two objects:
  // 1.] the data we wish to save
  // 2.] the where object so we know which record we are chanaging
  const service = await Service.update(
    { name, type, description, image, fee },
    { where: { serviceId: id } },
  );
  // update() returns and array with the number of rows altered eg. [1]
  console.log(service);
  res.status(204).send(service);
});

// Delete Service
app.delete("/api/services/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  // to delete a service we need to know which service we are delting.
  // we can get th eid from the params in the url: req.params.id
  let id = req.params.id;
  // params are strings but serviceId is number so typecast it
  id = Number(id);
  console.log(id);
  // use the destroy method to remove that row from the table.
  //we must send through a where clause with the id
  await Service.destroy({ where: { serviceId: id } });
  res.status(204).send(`Id: ${id} deleted`);
});

// Update the listen so we can sync to our database
// we use the sync() method
// we need to careful here as this method can delete all data in the database

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(config.port, () =>
    console.log(
      `Bob's Garage Server is running on http://localhost:${config.port}`,
    ),
  );
});
