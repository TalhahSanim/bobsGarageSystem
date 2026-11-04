// Service Controllers route functions GET,getALL, getONE , edit and delete

import db, { Op } from "../models/models.js";

// pull service model to let controllers use them
const { Service } = db.sequelize.models;

// name: get All Services
// path: /api/services
// request: GET
// type: public
export const getAllServices = async (req, res) => {
  console.log("/api/services/ -> GET");
  // to get all data from a table in the database we use the findAll() method
  // the model used too tells us the database which tale where getting the data from
  const list = await Service.findAll();
  console.log(list);
  // send the response
  res.status(200).send(list);
};

// name: get single service
// path: /api/services/edit/:id
// request : GET
// Type: public
export const getOneService = async (req, res) => {
  console.log("/api/services/edit/:id - GET");
  // URL params are strings so typecast the id to number
  const id = Number(req.params.id);

  // findByPk finds one row via primary key
  const service = await Service.findByPk(id);
  // find byPK gives null when no row has id
  if (!service) {
    return res.status(404).json({ msg: "Service not found" });
  }
  res.status(200).send(service);
};

// name: add a New Service
// path: /api/services/add
// request: POST
// type: PUBLIC
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

//  name: edit a service
// path : /api/services/edit/:id
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

  // get the updated service.
  const service = await Service.findByPk(id);
  if (!service) {
    return res.status(404).json({ msg: "Service not found" });
  }
  console.log("Service Updated...");

  // send updated service to the client
  res.status(200).send(service);
};

// name-> delete a service
// path /api/services/edit/:id
// request -> DELETE
// type -> Admin
// Description -> deletes one service or 404 if no product with that id

export const deleteService = async (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  // to delete a service we need to know which service we are delting.
  // we can get the edit from the params in the url: req.params.id
  // params are strings but serviceId is number so typecast it
  const id = Number(req.params.id);

  const service = await Service.findByPk(id);
  if (!service) {
    return res.status(404).json({ msg: "Service not found" });
  }
  // use the destroy method to remove that row from the table.
  //we must send through a where clause with the id
  await Service.destroy({ where: { serviceId: id } });
  res.status(204).send();
};

// Only these columns will be sorted
const sortFields = ["name", "type", "fee", "createdAt"];
const sortDirections = ["ASC", "DESC"];

// name -> ordered services
// path -> /api/services/o/:field/:direction
// request -> GET
// type -> public
// description -> the service list sorted by a column , ASC for low to high and DESC for High to Low

export const getOrderedServices = async (req, res) => {
  console.log("/api/services/o/:field/:direction -> GET");
  const field = req.params.field;
  // Allows you to type desc or DESC
  const direction = req.params.direction.toUpperCase();

  // Anything not on the list -> is a 400

  if (!sortFields.includes(field) || !sortDirections.includes(direction)) {
    return res.status(400).json({ msg: "Invalid sort field or direction" });
  }

  const list = await Service.findAll({ order: [[field, direction]] });
  res.status(200).send(list);
};

//  name -> search services
// path -> /api/services/s/search
// request -> GET
// type -> public
// description -> services whose name contains the search text

export const searchServices = async (req, res) => {
  console.log("/api/services/s/search -> GET");
  const search = req.params.search;

  // %text% = the name contains text any where
  const list = await Service.findAll({
    where: { name: { [Op.like]: `%${search}` } },
  });
  res.status(200).send(list);
};
