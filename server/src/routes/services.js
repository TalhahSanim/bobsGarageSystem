// The routes for service-> add,getALL, getOne,edit & delete
// server.js uses the file on /api/services so every path starts here starts after that

import express from "express";
import db from "../models/models.js";

// router path of express
const router = express.Router();

// Pull services model which this route requires
const { Service } = db.sequelize.models;

// ! Service Routes

// name: add a New Service
// path: /api/services/add
// request: POST
// type: PUBLIC
router.post("/add", async (req, res) => {
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

// name: get All Services
// path: /api/services
// request: GET
//type : public
router.get("/", async (req, res) => {
  console.log("/api/services/ -> GET");
  // to get all data from a table in the database we use the findAll() method
  // the model used too tells us the database which tale where getting the data from
  const list = await Service.findAll();
  console.log(list);
  // send the response
  res.status(200).send(list);
});

// name: get single service
// path: /api/services/edit/:id
// request : GET
// Type: public

router.get("/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id - GET");
  // URL params are strings so typecast the id to number
  const id = Number(req.params.id);

  // findByPk finds one row via primary key
  const service = await Service.findByPk(id);
  res.status(200).send(service);
});

//  name: edit a service
// path : /api/services/edit/:id
router.put("/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id -> PUT");
  // get the id from params and typecast it to a number
  const id = Number(req.params.id);

  // Destructure the req.body
  const { name, type, description, image } = req.body;
  // fee comes in as a string so typecast it as well
  const fee = Number(req.body.fee);
  // the update method takes in two objects:
  // 1.] the data we wish to save
  // 2.] the where object so we know which record we are chanaging
  const updated = await Service.update(
    { name, type, description, image, fee },
    { where: { serviceId: id } },
  );
  // update() returns and array with the number of rows altered eg. [1]

  console.log(updated);
  // Send back upon sucessful update
  if (updated) {
    console.log("Service Updated...");
    // get the updated service.
    const service = await Service.findByPk(id);
    // send updated service to the client
    res.status(200).send(service);
  }
});

// name: delete a service
// path /api/services/edit/:id
router.delete("/edit/:id", async (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  // to delete a service we need to know which service we are delting.
  // we can get the edit from the params in the url: req.params.id
  // params are strings but serviceId is number so typecast it
  const id = Number(req.params.id);

  // use the destroy method to remove that row from the table.
  //we must send through a where clause with the id
  await Service.destroy({ where: { serviceId: id } });
  res.status(204).send(`Id: ${id} deleted`);
});

export default router;
