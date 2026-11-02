// Service Controllers route functions GET,getALL, getONE , edit and delete

import db from "../models/models.js";

// pull service model to let controllers use them

export const addService = async (req, res) => {
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
};

export const getOneService = async (req, res) => {
  console.log("/api/services/edit/:id - GET");
  // URL params are strings so typecast the id to number
  const id = Number(req.params.id);

  // findByPk finds one row via primary key
  const service = await Service.findByPk(id);
  res.status(200).send(service);
};

export const updateService = async (req, res) => {
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
};

export const deleteService = async (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  // to delete a service we need to know which service we are delting.
  // we can get the edit from the params in the url: req.params.id
  // params are strings but serviceId is number so typecast it
  const id = Number(req.params.id);

  // use the destroy method to remove that row from the table.
  //we must send through a where clause with the id
  await Service.destroy({ where: { serviceId: id } });
  res.status(204).send(`Id: ${id} deleted`);
};
