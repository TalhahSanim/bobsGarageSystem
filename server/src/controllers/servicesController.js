// File -> server/src/controllers/servicesController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Service Controllers route functions GET,getALL, getONE , edit and delete

import db, { Op } from "../models/models.js";

// pull service model to let controllers use them
const { Service } = db.sequelize.models;

/**
 * Get Every Service
 * @route GET /api/services
 * @access Public
 * @param {object} req - the request -> nothing read from it
 * @param {object} res res - sends 200 with list of services
 */
export const getAllServices = async (req, res) => {
  console.log("/api/services/ -> GET");
  // to get all data from a table in the database we use the findAll() method
  // the model  tells  Sequelize which table we are getting our data from
  const list = await Service.findAll();
  // console.log(list);
  // send the response
  res.status(200).send(list);
};

/**
 * Get Single Service
 * @route GET /api/services/edit/:id
 * @access Public
 * @param {object} req - req.params.id is the service id
 * @param {object} res - sends 200 with the service or 404 if no service has that id
 */
export const getOneService = async (req, res) => {
  console.log("/api/services/edit/:id - GET");
  // URL params are strings so typecast the id to number
  const id = Number(req.params.id);

  // findByPk finds one row via primary key
  const service = await Service.findByPk(id);
  // find byPK gives null when no row has id
  if (!service) {
    return res.status(404).json({ msg: "Service Not Found" });
  }
  res.status(200).send(service);
};

/**
 * Add a Service
 * @route POST /api/services/add
 * @access Admin
 * @param {object} req - req.body has name,type,description,image and fee checked via validateService first
 * @param {*} res - sends 200 with the new service including serviceId
 */
export const addService = async (req, res) => {
  // log the path and request
  console.log("/api/services -> POST");
  // we can only have one res.send in an endpoint
  // log the req from client
  //  Note don't log this as it exposes body in the server log
  // console.log(req.body);

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
  // send the response from the database to the client
  res.status(200).send(service);
};

/**
 * Update Service Details
 * @route PUT /api/services/edit/:id
 * @access Admin
 * @param {object} req - req.params.id is the service id and req.body has new name,type,description,image and fee
 * @param {object} res - sends 200 with the updated service or 404 if a service doesn't have that id
 */
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
  // 2.] the where object so we know which record we are changing
  const updated = await Service.update(
    { name, type, description, image, fee },
    { where: { serviceId: id } },
  );
  // update() returns an array with the number of rows altered eg. [1]

  // console.log(updated); // output the rows that changed

  // get the updated service.
  const service = await Service.findByPk(id);
  if (!service) {
    return res.status(404).json({ msg: "Service Not Found" });
  }
  // console.log("Service Updated..."); // output message a service got saved

  // send updated service to the client
  res.status(200).send(service);
};

/**
 * Deletes a service
 * @route DELETE /api/services/edit/:id
 * @access Admin
 * @param {object} req - req.params.id is the service id
 * @param {object} res - sends 204 with no body when deleted or 404 if no service has that id
 */

export const deleteService = async (req, res) => {
  console.log("/api/services/edit/:id -> DELETE");
  // to delete a service we need to know which service we are deleting.
  // we can get the edit from the params in the url: req.params.id
  // params are strings but serviceId is number so typecast it
  const id = Number(req.params.id);

  const service = await Service.findByPk(id);
  if (!service) {
    return res.status(404).json({ msg: "Service Not Found" });
  }
  // use the destroy method to remove that row from the table.
  //we must send through a where clause with the id
  await Service.destroy({ where: { serviceId: id } });
  res.status(204).send();
};

// Only these columns will be sorted
const sortFields = ["name", "type", "fee", "createdAt"];
const sortDirections = ["ASC", "DESC"];

/**
 * Gets every service sorted by one field
 * @route GET /api/services/o/:field/:direction
 * @access Public
 * @param {object} req - req.params.filed is name,type,fee or createdAt; req.params.direction is asc or desc
 * @param {*} res - sends a 200 with sorted list or 400 if field or direction isn't allowed
 */

export const getOrderedServices = async (req, res) => {
  console.log("/api/services/o/:field/:direction -> GET");
  const field = req.params.field;
  // Allows you to type desc or DESC
  const direction = req.params.direction.toUpperCase();

  // Anything not on the list -> is a 400

  if (!sortFields.includes(field) || !sortDirections.includes(direction)) {
    return res.status(400).json({ msg: "Invalid Sort Field Or Direction" });
  }

  const list = await Service.findAll({ order: [[field, direction]] });
  res.status(200).send(list);
};

/**
 * Find services whose name contains the search text
 * @route GET /api/services/s/:search
 * @access Public
 * @param {object} req - req.params.search is the text typed in the search box
 * @param {object} res - sends 200 with the matching service or empty list when none match
 */

export const searchServices = async (req, res) => {
  console.log("/api/services/s/search -> GET");
  const search = req.params.search;

  // %text% = the name contains text any where
  const list = await Service.findAll({
    where: { name: { [Op.like]: `%${search}%` } },
  });
  res.status(200).send(list);
};
