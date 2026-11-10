// File -> /src/controllers/favouritesController.js
// Author -> Talhah Sanim
// Application Version -> 1.0
// Favourite controllers -> Im interested in this service
// get mine, get all [ADMIN], add, remove, and update the status [ADMIN]
//  routes.favourites.js puts auth and ADMIN in front of each one

import db from "../models/models.js";

const { Favourite, Service, User } = db.sequelize.models;

//  name -> get my favourites
// path -> /api/favourites
// request -> GET
// type -> PRIVATE
// Description -> gets the logged in users favorites newest first with each services details
export const getMyFavourites = async (req, res) => {
  console.log("/api/favourites -> GET");
  try {
    const list = await Favourite.findAll({
      where: { userId: req.user.userId },
      include: [{ model: Service }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

//  name -> get all favourites
// path -> /api/favourites/all
// request -> GET
// type -> admin
// Description -> Each favorite with the customers contact details and the service to let the business know who to contact
export const getAllFavourites = async (req, res) => {
  console.log("/api/favourites/all -> GET");
  try {
    const list = await Favourite.findAll({
      include: [
        // Never send passwords and only select the fields we require
        {
          model: User,
          attributes: ["userId", "firstName", "lastName", "email"],
        },
        { model: Service, attributes: ["serviceId", "name", "type", "fee"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// name -> Add Favourite
// path -> /api/favourites/:serviceId
// request -> POST
// type -> private
// Description -> saves this service as favourite for this user and return a thank you response

export const addFavourite = async (req, res) => {
  console.log("/api/favourites/:serviceId -> POST");
  // URL params are strings but serviceId is a number
  const serviceId = Number(req.params.serviceId);
  try {
    // ensure service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service Not Found" });
    }

    // findOrCreate -> Add it or find it if its already a favourite and also no duplicates
    const [favourite, created] = await Favourite.findOrCreate({
      where: { userId: req.user.userId, serviceId },
    });

    // Send back with service details and ready for client to show
    const fullFavourite = await Favourite.findByPk(favourite.favouriteId, {
      include: [{ model: Service }],
    });
    const msg = created
      ? `Thanks, ${req.user.firstName}! we'll contact you shortly on this ${service.name}.`
      : `${service.name} is already in your favorites we be in soon!`;
    res.status(created ? 201 : 200).json({ msg, favourite: fullFavourite });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

//  name -> Remove favourite
// path -> /api/favourites/:serviceId
// request -> DELETE
// type -> private
// Description -> removes one of the logged in  user's favourites
// the where clause includes userId so only users can remove their favourites
export const removeFavourite = async (req, res) => {
  console.log("/api/favourites/:serviceId -> DELETE");
  const serviceId = Number(req.params.serviceId);
  try {
    await Favourite.destroy({ where: { userId: req.user.userId, serviceId } });
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// name -> Update a favourite status
// path -> /api/favourites/:favouriteId/status
// request -> PUT
// type -> admin
// Description -> ticks of favourite as new or contacted
export const updateFavouriteStatus = async (req, res) => {
  console.log("/api/favourites/:favouriteId/status -> PUT");
  const favouriteId = Number(req.params.favouriteId);
  const { status } = req.body;

  //  Only allow two statues
  if (!["new", "contacted"].includes(status)) {
    return res.status(400).json({ msg: "Status Must Be New Or Contacted" });
  }
  try {
    const [count] = await Favourite.update(
      { status },
      { where: { favouriteId } },
    );
    if (!count) {
      return res.status(404).json({ msg: "Saved Service Not Found" });
    }
    const favourite = await Favourite.findByPk(favouriteId);
    res.status(200).json(favourite);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
